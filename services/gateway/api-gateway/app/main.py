from contextlib import asynccontextmanager
from typing import AsyncIterator

import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .routers import health, catalog, users


class Settings(BaseModel):
  service_name: str = "temuhash-api-gateway"
  version: str = "0.1.0"


def get_settings() -> Settings:
  return Settings()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
  # TODO: attach telemetry, initialize service clients, warm caches
  yield
  # TODO: gracefully close gRPC channels, flush metrics


app = FastAPI(title="TemuHash API Gateway", version="0.1.0", lifespan=lifespan)
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
async def root(settings: Settings = Depends(get_settings)):
  return {"service": settings.service_name, "version": settings.version}


app.include_router(health.router)
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(catalog.router, prefix="/catalog", tags=["catalog"])


if __name__ == "__main__":
  uvicorn.run("app.main:app", host="0.0.0.0", port=8080, reload=True)
