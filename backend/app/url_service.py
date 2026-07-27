import requests
from bs4 import BeautifulSoup


def extract_text_from_url(url: str) -> str:
    """
    Extract article text from a webpage.
    """

    headers = {
        "User-Agent": (
            "Mozilla/5.0 "
            "(Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 "
            "(KHTML, like Gecko) "
            "Chrome/138.0 Safari/537.36"
        )
    }

    try:
        response = requests.get(
            url,
            headers=headers,
            timeout=10
        )
        response.raise_for_status()

    except requests.RequestException:
        raise Exception("Unable to access the webpage.")

    if response.status_code != 200:
        raise Exception("Unable to access the webpage.")

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    # Remove unnecessary tags
    for tag in soup([
        "script",
        "style",
        "nav",
        "footer",
        "header",
        "aside"
    ]):
        tag.decompose()

    paragraphs = soup.find_all("p")

    article = " ".join(
        p.get_text(strip=True)
        for p in paragraphs
    )

    if len(article.strip()) < 100:
        raise Exception("No article content found.")

    return article