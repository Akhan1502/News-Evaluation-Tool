from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List
import uuid

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

# In-memory storage for analyses
analyses_db: Dict[str, AnalysisResponse] = {}

@app.get("/analyses")
async def get_analyses() -> List[AnalysisResponse]:
    """Get all analyses"""
    return list(analyses_db.values())

@app.post("/analyses")
async def analyze_text(request: AnalysisRequest) -> AnalysisResponse:
    """Analyze new text and store the result"""
    # Simple mock analysis
    word_count = len(request.content.split())
    rating = min(100, word_count / 10)  # Simple rating based on word count
    
    analysis = AnalysisResponse(
        id=str(uuid.uuid4()),
        title=request.title,
        rating=rating,
        summary=f"Analyzed content from {request.url}"
    )
    
    # Store the analysis
    analyses_db[analysis.id] = analysis
    
    return analysis

@app.get("/analyses/{analysis_id}")
async def get_analysis(analysis_id: str) -> AnalysisResponse:
    """Get a specific analysis by ID"""
    if analysis_id not in analyses_db:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analyses_db[analysis_id] 