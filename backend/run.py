from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List
import uuid
import logging
import uvicorn

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    title: str
    content: str
    url: str

class AnalysisResponse(BaseModel):
    id: str
    title: str
    rating: float
    summary: str
    content: str  # Added to store the full content

# In-memory storage for analyses
analyses_db: Dict[str, AnalysisResponse] = {}

@app.get("/analyses")
async def get_analyses() -> List[AnalysisResponse]:
    """Get all analyses"""
    return list(analyses_db.values())

@app.post("/analyses")
async def analyze_text(request: AnalysisRequest) -> AnalysisResponse:
    """Analyze new text and store the result"""
    # Log the incoming request
    logger.info("Received analysis request:")
    logger.info(f"Title: {request.title}")
    logger.info(f"URL: {request.url}")
    logger.info(f"Content length: {len(request.content)} characters")
    logger.info(f"Raw request data: {request.model_dump_json()}")
    
    # Simple mock analysis
    word_count = len(request.content.split())
    rating = min(100, word_count / 10)  # Simple rating based on word count
    
    analysis = AnalysisResponse(
        id=str(uuid.uuid4()),
        title=request.title,
        rating=rating,
        content=request.content,  # Store the full content
        summary=f"Article content ({word_count} words):\n\n{request.content[:500]}..." if len(request.content) > 500 else request.content
    )
    
    # Store the analysis
    analyses_db[analysis.id] = analysis
    
    # Log the response
    logger.info(f"Generated analysis response: {analysis.model_dump_json()}")
    
    return analysis

@app.get("/analyses/{analysis_id}")
async def get_analysis(analysis_id: str) -> AnalysisResponse:
    """Get a specific analysis by ID"""
    if analysis_id not in analyses_db:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analyses_db[analysis_id]

# Add this at the bottom of the file
if __name__ == "__main__":
    uvicorn.run("run:app", 
                host="0.0.0.0", 
                port=8000, 
                reload=True,
                log_level="info") 