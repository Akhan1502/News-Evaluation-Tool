from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import logging
from datetime import datetime
import uuid

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()

# Allow specific origins including Chrome extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # For development
        "chrome-extension://*",    # For Chrome extension
        "moz-extension://*"        # For Firefox extension
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Origin"],
    expose_headers=["Content-Type"],
    max_age=3600
)

class ArticleData(BaseModel):
    title: str
    content: str
    url: Optional[str] = None  # Make URL optional

class SentimentHistoryResponse(BaseModel):
    history: List[Dict[str, Any]]

# In-memory storage for sentiment history
sentiment_history_db: Dict[str, List[Dict[str, Any]]] = {}

@app.post("/analyze")
async def analyze_content(article: ArticleData):
    try:
        logger.info(f"Received analysis request")
        logger.info(f"Title: {article.title}")
        logger.info(f"Content length: {len(article.content)}")
        logger.info(f"URL: {article.url}")

        # Generate placeholder analysis result
        analysis_result = {
            "rating": 85,  # Placeholder trust score
            "confidence": 92,  # Placeholder confidence score
            "sentiment": {
                "score": 0.75,  # Placeholder sentiment score (range: -1 to 1)
                "label": "positive"  # Placeholder sentiment label
            },
            "id": str(uuid.uuid4())  # Generate unique ID for analysis
        }

        # Store sentiment history for the URL
        if article.url:
            if article.url not in sentiment_history_db:
                sentiment_history_db[article.url] = []
            
            sentiment_history_db[article.url].append({
                "timestamp": datetime.now().isoformat(),
                "value": analysis_result["sentiment"]["score"]
            })

        # Format response
        analysis_response = {
            "trustScore": analysis_result["rating"],
            "confidence": analysis_result["confidence"],
            "sentiment": analysis_result["sentiment"],
            "criteria": [
                {
                    "name": "Content Trust Level",
                    "met": analysis_result["rating"] >= 70,
                    "score": analysis_result["rating"]
                },
                {
                    "name": "Accuracy and Fairness",
                    "met": analysis_result["rating"] >= 75,
                    "score": analysis_result["rating"] * 0.95
                },
                {
                    "name": "Independence",
                    "met": analysis_result["confidence"] >= 68,
                    "score": analysis_result["confidence"] * 100
                },
                {
                    "name": "Impartiality",
                    "met": abs(analysis_result["sentiment"]["score"]) <= 0.3,
                    "score": (1 - abs(analysis_result["sentiment"]["score"])) * 100
                },
                {
                    "name": "Accountability",
                    "met": analysis_result["rating"] >= 80 and analysis_result["confidence"] >= 0.85,
                    "score": (analysis_result["rating"] + analysis_result["confidence"] * 100) / 2
                }


            ],
            "analysisId": analysis_result["id"],
            "articleUrl": article.url or "unknown"
        }
        
        logger.info(f"Sending analysis response for ID: {analysis_response['analysisId']}")
        return analysis_response

    except Exception as e:
        logger.error(f"Error processing analysis request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/sentiment/history")
async def get_sentiment_history(url: str) -> SentimentHistoryResponse:
    """Get sentiment history for a specific URL"""
    logger.info(f"Fetching sentiment history for URL: {url}")
    
    if url not in sentiment_history_db:
        # If no history exists, return empty history
        return SentimentHistoryResponse(history=[])
    
    return SentimentHistoryResponse(history=sentiment_history_db[url])

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting extension communicator server...")
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
