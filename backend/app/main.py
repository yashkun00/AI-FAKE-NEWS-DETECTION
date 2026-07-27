from fastapi import FastAPI

from app.routes import router

from fastapi.middleware.cors import CORSMiddleware

from app.config import API_TITLE, API_VERSION

app = FastAPI(
    title=API_TITLE,
    version=API_VERSION
)

app.include_router(router)


@app.get("/")
def home():

    return {
        "message": "AI Fake News Detection API is Running"
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)