from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import Optional
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

# Update CORS middleware with specific origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "chrome-extension://*", "moz-extension://*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ArticleData(BaseModel):
    title: str
    content: str
    url: Optional[str] = None  # Make URL optional

@app.post("/analyze")
async def analyze_content(article: ArticleData):
    try:
        logger.info(f"Received analysis request")
        logger.info(f"Title: {article.title}")
        logger.info(f"Content length: {len(article.content)}")
        logger.info(f"URL: {article.url}")

        # Generate analysis response
        analysis_response = {
            "trustScore": 85,
            "confidence": 92,
            "sentiment": {
                "score": 0.75,
                "label": "positive"
            },
            "criteria": [
                {
                    "name": "Accuracy and Fairness",
                    "met": True,
                    "score": 88
                },
                {
                    "name": "Independence",
                    "met": True,
                    "score": 85
                }
            ],
            "analysisId": f"analysis_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "articleUrl": article.url or "unknown"
        }
        
        logger.info(f"Sending analysis response for ID: {analysis_response['analysisId']}")
        return analysis_response

    except Exception as e:
        logger.error(f"Error processing analysis request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting extension communicator server...")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")