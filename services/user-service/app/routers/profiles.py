from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class Profile(BaseModel):
  id: str
  display_name: str
  bio: str | None = None
  social_links: list[str] = []


mock_profiles = [
  Profile(id="u_123", display_name="Neon Studio", bio="Sci-fi asset collective", social_links=["https://temuhash.com/neon"]),
  Profile(id="u_456", display_name="Atlas Forge", bio="Procedural world builders"),
]


@router.get("/", response_model=list[Profile])
async def list_profiles() -> list[Profile]:
  # TODO: integrate with PostgreSQL and Keycloak user store
  return mock_profiles
