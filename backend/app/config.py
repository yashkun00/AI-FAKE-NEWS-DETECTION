import os
from dotenv import load_dotenv

# Load env variables
load_dotenv()


# Model Paths


MODEL_PATH = "models/model.pkl"
VECTORIZER_PATH = "models/vectorizer.pkl"


# Gemini API


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-2.5-flash"


# API Configuration


API_TITLE = "AI Fake News Detection API"
API_VERSION = "1.0.0"

SUPPORTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png"
]