from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class Asset(BaseModel):
  id: str
  title: str
  status: str = "draft"


mock_assets = [
  Asset(id="a_001", title="Placeholder Asset"),
]


@router.get("/", response_model=list[Asset])
async def list_assets() -> list[Asset]:
  # TODO: integrate with catalog database and search index
  return mock_assets
