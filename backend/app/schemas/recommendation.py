from pydantic import BaseModel


class RecommendationRequest(BaseModel):
    category: str
    budget: float
    usage: str
    performance_priority: str = "Medium"
    battery_priority: str = "Medium"
    camera_priority: str = "Medium"