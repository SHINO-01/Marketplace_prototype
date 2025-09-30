from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class AssetSummary(BaseModel):
  id: str
  title: str
  category: str
  tags: list[str]
  price: float


mock_assets = [
  AssetSummary(id="a_101", title="Cyber City Modular Pack", category="3D Models", tags=["Sci-fi", "Modular"], price=39.0),
  AssetSummary(id="a_205", title="Void Soundscapes SFX", category="Audio", tags=["Ambient"], price=0.0),
]


@router.get("/assets", response_model=list[AssetSummary])
async def list_assets() -> list[AssetSummary]:
  # TODO: call catalog-service via gRPC for actual catalog data
  return mock_assets
