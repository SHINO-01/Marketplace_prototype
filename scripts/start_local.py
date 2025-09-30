"""Gradually start the TemuHash stack for local development.

The script bootstraps backend services first (user, catalog, gateway) and only
then launches the frontend once dependencies respond to readiness probes.

Usage
-----
python scripts/start_local.py                # start entire stack
python scripts/start_local.py --frontend-only
python scripts/start_local.py --skip gateway

Press Ctrl+C to terminate; services are stopped in reverse order.
"""
from __future__ import annotations

import argparse
import os
import signal
import subprocess
import sys
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_HEALTH_TIMEOUT = 120
POLL_INTERVAL_SECONDS = 2.0


@dataclass
class Service:
  name: str
  cwd: Path
  command: List[str]
  env_file: Optional[Path]
  health_url: Optional[str]
  timeout_seconds: int = DEFAULT_HEALTH_TIMEOUT


def load_env_file(path: Path) -> Dict[str, str]:
  env: Dict[str, str] = {}
  if not path or not path.exists():
    return env
  for raw_line in path.read_text(encoding="utf-8").splitlines():
    line = raw_line.strip()
    if not line or line.startswith("#"):
      continue
    if "=" not in line:
      continue
    key, value = line.split("=", 1)
    env[key.strip()] = value.strip()
  return env


def find_python_executable(service_dir: Path) -> str:
  if os.name == "nt":
    candidate = service_dir / ".venv" / "Scripts" / "python.exe"
  else:
    candidate = service_dir / ".venv" / "bin" / "python"
  return str(candidate) if candidate.exists() else sys.executable


def npm_command() -> str:
  if os.name == "nt":
    return "npm.cmd"
  return "npm"


def wait_for_health(url: str, timeout: int) -> bool:
  if not url:
    return True
  deadline = time.time() + timeout
  while time.time() < deadline:
    try:
      with urllib.request.urlopen(url, timeout=5) as response:  # nosec B310
        if response.status == 200:
          return True
    except (urllib.error.URLError, urllib.error.HTTPError):
      pass
    time.sleep(POLL_INTERVAL_SECONDS)
  return False


def build_service_plan(frontend_only: bool) -> List[Service]:
  services: List[Service] = []

  if not frontend_only:
    user_service_dir = REPO_ROOT / "services" / "user-service"
    catalog_service_dir = REPO_ROOT / "services" / "catalog-service"
    gateway_dir = REPO_ROOT / "services" / "gateway" / "api-gateway"

    services.extend(
      [
        Service(
          name="user-service",
          cwd=user_service_dir,
          command=[
            find_python_executable(user_service_dir),
            "-m",
            "uvicorn",
            "app.main:app",
            "--host",
            "0.0.0.0",
            "--port",
            "8081",
          ],
          env_file=user_service_dir / ".env",
          health_url="http://127.0.0.1:8081/readyz",
        ),
        Service(
          name="catalog-service",
          cwd=catalog_service_dir,
          command=[
            find_python_executable(catalog_service_dir),
            "-m",
            "uvicorn",
            "app.main:app",
            "--host",
            "0.0.0.0",
            "--port",
            "8082",
          ],
          env_file=catalog_service_dir / ".env",
          health_url="http://127.0.0.1:8082/readyz",
        ),
        Service(
          name="api-gateway",
          cwd=gateway_dir,
          command=[
            find_python_executable(gateway_dir),
            "-m",
            "uvicorn",
            "app.main:app",
            "--host",
            "0.0.0.0",
            "--port",
            "8080",
          ],
          env_file=gateway_dir / ".env",
          health_url="http://127.0.0.1:8080/readyz",
        ),
      ]
    )

  frontend_dir = REPO_ROOT / "frontend" / "temu-hash-app"
  services.append(
    Service(
      name="frontend",
      cwd=frontend_dir,
      command=[npm_command(), "run", "dev"],
      env_file=frontend_dir / ".env",
      health_url="http://127.0.0.1:3000",
      timeout_seconds=180,
    )
  )

  return services


def spawn_service(service: Service) -> subprocess.Popen:
  env = os.environ.copy()
  env.update(load_env_file(service.env_file) if service.env_file else {})

  creationflags = 0
  if os.name == "nt":
    creationflags = subprocess.CREATE_NEW_PROCESS_GROUP  # type: ignore[attr-defined]

  print(f"→ Starting {service.name}...")
  process = subprocess.Popen(
    service.command,
    cwd=service.cwd,
    env=env,
    stdout=sys.stdout,
    stderr=sys.stderr,
    creationflags=creationflags,
  )
  return process


def terminate_processes(procs: Iterable[subprocess.Popen]) -> None:
  for proc in procs:
    if proc.poll() is None:
      try:
        if os.name == "nt":
          proc.send_signal(signal.CTRL_BREAK_EVENT)  # type: ignore[attr-defined]
        else:
          proc.terminate()
      except Exception:
        pass
  for proc in procs:
    try:
      proc.wait(timeout=10)
    except Exception:
      proc.kill()


def parse_args() -> argparse.Namespace:
  parser = argparse.ArgumentParser(description="Gradually start TemuHash services")
  parser.add_argument(
    "--frontend-only",
    action="store_true",
    help="Skip backend services and launch only the Next.js frontend",
  )
  parser.add_argument(
    "--skip",
    nargs="*",
    default=[],
    help="List of service names to skip (e.g., --skip catalog-service frontend)",
  )
  return parser.parse_args()


def main() -> int:
  args = parse_args()
  plan = [svc for svc in build_service_plan(args.frontend_only) if svc.name not in set(args.skip)]

  if not plan:
    print("No services selected to run.")
    return 0

  running: List[subprocess.Popen] = []

  def handle_signal(signum, frame):  # type: ignore[override]
    print(f"\nReceived signal {signum}, shutting down...")
    terminate_processes(reversed(running))
    sys.exit(0)

  signal.signal(signal.SIGINT, handle_signal)
  signal.signal(signal.SIGTERM, handle_signal)

  try:
    for service in plan:
      proc = spawn_service(service)
      running.append(proc)
      if not wait_for_health(service.health_url, service.timeout_seconds):
        print(f"✗ {service.name} failed to report healthy within {service.timeout_seconds}s")
        raise SystemExit(1)
      print(f"✓ {service.name} is ready")

    print("\nAll services are running. Press Ctrl+C to stop.")
    while any(proc.poll() is None for proc in running):
      time.sleep(2)
  finally:
    terminate_processes(reversed(running))

  return 0


if __name__ == "__main__":
  raise SystemExit(main())
