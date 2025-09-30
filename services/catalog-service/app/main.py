from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import Depends, FastAPI
from pydantic import BaseModel

from .routers import health, assets


class Settings(BaseModel):
  service_name: str = "temuhash-catalog-service"
  version: str = "0.1.0"


def get_settings() -> Settings:
  return Settings()


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
  # TODO: connect to PostgreSQL, OpenSearch, and event bus
  yield
  # TODO: close DB pools, flush producer queues


app = FastAPI(title="TemuHash Catalog Service", version="0.1.0", lifespan=lifespan)
app.include_router(health.router)
app.include_router(assets.router, prefix="/assets", tags=["assets"])


@app.get("/", include_in_schema=False)
async def root(settings: Settings = Depends(get_settings)):
  return {"service": settings.service_name, "version": settings.version}
