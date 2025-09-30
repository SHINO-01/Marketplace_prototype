from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/healthz")
async def healthz():
  return {"status": "ok"}


@router.get("/readyz")
async def readyz():
  # TODO: verify PostgreSQL and OpenSearch connectivity
  return {"status": "ready"}
