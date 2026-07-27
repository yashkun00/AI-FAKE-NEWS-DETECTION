import easyocr
from PIL import Image

# Load OCR model only once
reader = easyocr.Reader(['en'])


def extract_text_from_image(image_path: str) -> str:
    """
    Extract text from an uploaded image.
    """

    # Verify image can be opened
    Image.open(image_path)

    # OCR
    result = reader.readtext(image_path, detail=0)

    # Join detected text
    text = " ".join(result)

    if not text.strip():
        raise Exception("No readable text found in the image.")

    return text