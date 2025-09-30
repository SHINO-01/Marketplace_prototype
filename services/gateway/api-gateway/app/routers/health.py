from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/healthz", summary="Liveness probe")
async def healthz():
  return {"status": "ok"}


@router.get("/readyz", summary="Readiness probe")
async def readyz():
  # TODO: check downstream service connectivity
  return {"status": "ready"}
