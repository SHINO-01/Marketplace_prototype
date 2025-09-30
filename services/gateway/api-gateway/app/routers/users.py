from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class User(BaseModel):
  id: str
  username: str
  role: str


mock_users = [
  User(id="u_123", username="neonstudio", role="creator"),
  User(id="u_456", username="atlasforge", role="studio"),
]


@router.get("/", response_model=list[User])
async def list_users() -> list[User]:
  # TODO: integrate with user-service via gRPC
  return mock_users
