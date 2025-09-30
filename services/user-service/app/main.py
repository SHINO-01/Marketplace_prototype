from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import Depends, FastAPI
from pydantic import BaseModel

from .routers import health, profiles


class Settings(BaseModel):
  service_name: str = "temuhash-user-service"
  version: str = "0.1.0"


def get_settings() -> Settings:
  return Settings()


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
  # TODO: initialize database, connect to Keycloak admin API, setup telemetry
  yield
  # TODO: close database connections


app = FastAPI(title="TemuHash User Service", version="0.1.0", lifespan=lifespan)
app.include_router(health.router)
app.include_router(profiles.router, prefix="/profiles", tags=["profiles"])


@app.get("/", include_in_schema=False)
async def root(settings: Settings = Depends(get_settings)):
  return {"service": settings.service_name, "version": settings.version}
