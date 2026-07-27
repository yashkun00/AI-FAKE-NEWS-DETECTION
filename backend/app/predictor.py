import joblib

from app.config import MODEL_PATH, VECTORIZER_PATH
from app.utils import clean_text


# Load model once when server starts
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)


def predict_news(text: str):

    # Clean the text
    text = clean_text(text)

    
    cleaned_text = clean_text(text)
    transformed_text = vectorizer.transform([cleaned_text])

    # Prediction
    prediction = model.predict(transformed_text)[0]

    # Confidence
    confidence = float(model.predict_proba(transformed_text).max() * 100)

    # Convert number to label
    label = "Real" if prediction == 1 else "Fake"

    # Risk Level
    if confidence >= 95:
        risk = "High"
    elif confidence >= 80:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "prediction": label,
        "confidence": round(confidence, 2),
        "risk_level": risk
    }