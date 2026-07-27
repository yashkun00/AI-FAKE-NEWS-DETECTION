from fastapi import APIRouter, HTTPException, UploadFile, File
from datetime import datetime
import tempfile
import os

from app.schemas import (
    NewsRequest,
    URLRequest,
    PredictionResponse
)

from app.predictor import predict_news
from app.gemini_service import generate_summary
from app.url_service import extract_text_from_url
from app.image_service import extract_text_from_image
from app.config import SUPPORTED_IMAGE_TYPES

router = APIRouter()


def build_response(news_text: str):

    result = predict_news(news_text)

    summary, advice = generate_summary(
        news_text,
        result["prediction"]
    )

    return PredictionResponse(
        prediction=result["prediction"],
        confidence=result["confidence"],
        risk_level=result["risk_level"],
        summary=summary,
        advice=advice,
        timestamp=datetime.now().isoformat()
    )


# -------------------------
# TEXT
# -------------------------

@router.post("/predict/text", response_model=PredictionResponse)
def predict_text(news: NewsRequest):
    print("Received:", news)
    return build_response(news.text)

# -------------------------
# URL
# -------------------------

@router.post(
    "/predict/url",
    response_model=PredictionResponse
)
def predict_url(request: URLRequest):

    try:

        article = extract_text_from_url(request.url)

        return build_response(article)

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )



# IMAGE


@router.post(
    "/predict/image",
    response_model=PredictionResponse
)
async def predict_image(
    image: UploadFile = File(...)
):

    if image.content_type not in SUPPORTED_IMAGE_TYPES:

        raise HTTPException(
            status_code=400,
            detail="Unsupported image format."
        )

    suffix = os.path.splitext(image.filename)[1]

    temp_file = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=suffix
    )

    try:

        contents = await image.read()

        temp_file.write(contents)

        temp_file.close()

        extracted_text = extract_text_from_image(
            temp_file.name
        )

        return build_response(extracted_text)

    except Exception as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    finally:

        if os.path.exists(temp_file.name):

            os.remove(temp_file.name)