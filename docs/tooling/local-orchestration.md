# Local Orchestration Strategy

## Startup Order
1. **User Service** (`services/user-service`) – provides profile and auth-bound endpoints.
2. **Catalog Service** (`services/catalog-service`) – required for asset metadata.
3. **API Gateway** (`services/gateway/api-gateway`) – aggregates downstream services for the frontend.
4. **Frontend** (`frontend/temu-hash-app`) – Next.js application consuming the gateway APIs.

This order ensures downstream dependencies are healthy before upstream services start, reducing cascading failures.

## Health Checks & Backoff
- Each service exposes `/healthz` and `/readyz` endpoints. The orchestration script waits for `/readyz` to return HTTP 200 before moving to the next component.
- Exponential backoff with jitter prevents tight retry loops during slow startups.

## Environment Handling
- Each module provides a `.env` file generated from `.env.example` templates.
- The orchestration script loads these files (if present) and injects variables into the spawned process environment without requiring additional dependencies.

## Graceful Shutdown
- SIGINT/SIGTERM signals propagate from the orchestration script to child processes.
- On exit, processes are terminated in reverse order to avoid terminating upstream dependencies prematurely.

## Extensibility
- Additional services (e.g., Commerce, Recommendation) can be appended to the configuration list with their corresponding health checks.
- The script accepts CLI options to skip specific services or run frontend-only for UI development.
