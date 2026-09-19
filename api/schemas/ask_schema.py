from pydantic import BaseModel


class AskRequest(BaseModel):
    query: str
    top_k: int = 5
    temperature: float = 0.2


class AskResponse(BaseModel):
    query: str
    answer: str
    sources: list[str]
