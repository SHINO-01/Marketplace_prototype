from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/healthz")
async def healthz():
  return {"status": "ok"}


@router.get("/readyz")
async def readyz():
  # TODO: verify database connectivity, Keycloak reachability
  return {"status": "ready"}
