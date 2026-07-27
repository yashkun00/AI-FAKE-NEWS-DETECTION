# AI — News Integrity Scanner (Frontend)

A React + Vite + Tailwind CSS frontend for an AI fake-news detection API. Submit text,
a URL, or an image, and get back a prediction, confidence score, risk level, summary,
and advice — rendered as a HUD-style scan readout.

## Stack

- React 18 + Vite
- Tailwind CSS (custom "tech HUD" theme, no default template look)
- shadcn/ui-style primitives (Button, Card, Tabs, Input, Textarea, Badge) built on Radix
- Axios for API calls
- Framer Motion for scan/loading animations
- lucide-react for icons

## Getting started

```bash
npm install
cp .env.example .env   # optional — only needed if your backend isn't on 127.0.0.1:8000
npm run dev
```

The app runs at `http://localhost:5173` and talks to your FastAPI backend at
`http://127.0.0.1:8000` by default.

## Backend contract

The frontend calls three endpoints and expects the same response shape from each:

- `POST /predict/text` — body: `{ "text": string }`
- `POST /predict/url` — body: `{ "url": string }`
- `POST /predict/image` — multipart form, field name `file`

Expected response:

```json
{
  "prediction": "Fake",
  "confidence": 0.87,
  "risk_level": "High",
  "summary": "...",
  "advice": "...",
  "timestamp": "2026-07-17T10:30:00Z"
}
```

Notes on how the frontend interprets this:

- `confidence` is accepted as either a 0–1 fraction or a 0–100 number; it's normalized
  to a percentage automatically (see `src/lib/risk.js`).
- `risk_level` and `prediction` are matched case-insensitively against keywords
  (`high`/`medium`/`low`, `fake`/`real`) to pick colors — any casing or extra wording
  from your backend still renders correctly.
- `summary`, `advice`, and `timestamp` are optional; sections are simply omitted if
  the backend doesn't send them.

## CORS

If the browser blocks requests to `127.0.0.1:8000`, enable CORS on the FastAPI side, e.g.:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Project structure

```
src/
  components/
    ui/              shadcn-style primitives (button, card, tabs, input, textarea, badge)
    AnalyzerPanel.jsx    Text/URL/Image tabbed input + submit
    ResultPanel.jsx      Renders the prediction response
    ConfidenceGauge.jsx  Animated HUD gauge for the confidence score
    ScanningLoader.jsx   Loading state
    ErrorState.jsx       Error state with retry
    BackgroundGrid.jsx   Ambient animated grid background
    Navbar.jsx
  lib/
    api.js           Axios client + predictText/predictUrl/predictImage
    risk.js          Maps backend strings to colors/labels, normalizes confidence
    utils.js         cn() class merge helper
  App.jsx
  index.css
```

No mock data is used anywhere — every result on screen comes from your live backend.
