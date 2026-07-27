from pydantic import BaseModel


class NewsRequest(BaseModel):
    text: str


class URLRequest(BaseModel):
    url: str

class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    risk_level: str
    summary: str
    advice: str
    timestamp: str

SUPPORTED_IMAGE_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg"
]
