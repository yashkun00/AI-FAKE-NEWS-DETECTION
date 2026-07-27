import hashlib
import google.generativeai as genai

from app.config import GEMINI_API_KEY, GEMINI_MODEL

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel(GEMINI_MODEL)

# In-memory cache
summary_cache = {}


def generate_summary(news: str, prediction: str):

    # Create unique cache key
    cache_key = hashlib.md5(
        (prediction + news).encode()
    ).hexdigest()

    # Return cached response
    if cache_key in summary_cache:
        return summary_cache[cache_key]

    prompt = f"""
You are an AI Fake News Detection Assistant.

The ML model has already classified this article as:

Prediction: {prediction}

Do NOT change the prediction.

Return ONLY this format:

Summary: <one sentence>

Advice: <one sentence>

Keep both sentences short and professional.

Article:
{news}
"""

    try:

        response = model.generate_content(prompt)

        text = response.text.strip()

        summary = ""
        advice = ""

        for line in text.split("\n"):

            if line.startswith("Summary:"):
                summary = line.replace("Summary:", "").strip()

            elif line.startswith("Advice:"):
                advice = line.replace("Advice:", "").strip()

        # Default fallback if parsing fails
        if summary == "":
            summary = f"This news is classified as {prediction}."

        if advice == "":
            advice = "Verify important information using trusted news sources."

    except Exception:
        summary = f"This news is classified as {prediction}."
        advice = "Verify important information using trusted news sources."

    # Save in cache
    summary_cache[cache_key] = (summary, advice)

    return summary, advice