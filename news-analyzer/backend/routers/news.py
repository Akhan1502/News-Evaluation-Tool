from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

from database import get_db
from models import News as NewsModel, Paragraph as ParagraphModel, AlternativeView as AlternativeViewModel
from schemas import NewsCreate, News, NewsUpdate, ParagraphCreate, AlternativeViewCreate

router = APIRouter(prefix="/api/news", tags=["news"])

@router.get("/", response_model=List[News])
async def get_news(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[str] = None,
    source: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(NewsModel)
    
    if category:
        query = query.filter(NewsModel.category == category)
    if source:
        query = query.filter(NewsModel.source == source)
    
    news = query.order_by(NewsModel.published_date.desc()).offset(skip).limit(limit).all()
    return news

@router.get("/{news_id}", response_model=News)
async def get_news_by_id(news_id: int, db: Session = Depends(get_db)):
    news = db.query(NewsModel).filter(NewsModel.id == news_id).first()
    if news is None:
        raise HTTPException(status_code=404, detail="News not found")
    return news

@router.post("/", response_model=News, status_code=201)
async def create_news(news_data: dict, db: Session = Depends(get_db)):
    # Ensure paragraphs are properly structured
    if "paragraphs" not in news_data:
        news_data["paragraphs"] = [
            {
                "content": news_data.get("content", ""),
                "source": news_data.get("source", "Original Source"),
                "order": 1
            }
        ]
    
    # Set default trust score if not provided
    if "trust_score" not in news_data:
        news_data["trust_score"] = 85
    try:
        # Create news article
        news_dict = {
            k: v for k, v in news_data.items()
            if k not in ["paragraphs", "alternative_views"]
        }
        db_news = NewsModel(**news_dict)
        db.add(db_news)
        db.flush()

        # Create paragraphs
        if "paragraphs" in news_data:
            for paragraph_data in news_data["paragraphs"]:
                paragraph_dict = {
                    k: v for k, v in paragraph_data.items()
                    if k != "alternative_views"
                }
                paragraph_dict["news_id"] = db_news.id
                db_paragraph = ParagraphModel(**paragraph_dict)
                db.add(db_paragraph)
                db.flush()

                # Create alternative views
                if "alternative_views" in paragraph_data:
                    for alt_view_data in paragraph_data["alternative_views"]:
                        alt_view_dict = alt_view_data.copy()
                        alt_view_dict["paragraph_id"] = db_paragraph.id
                        db_alt_view = AlternativeViewModel(**alt_view_dict)
                        db.add(db_alt_view)

        db.commit()
        db.refresh(db_news)
        return db_news
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{news_id}", response_model=News)
async def update_news(news_id: int, news_data: dict, db: Session = Depends(get_db)):
    db_news = db.query(NewsModel).filter(NewsModel.id == news_id).first()
    if db_news is None:
        raise HTTPException(status_code=404, detail="News not found")
    
    try:
        # Update news fields
        news_dict = {k: v for k, v in news_data.items() if k not in ["paragraphs", "alternative_views"]}
        for field, value in news_dict.items():
            setattr(db_news, field, value)

        # Update paragraphs
        if "paragraphs" in news_data:
            # Remove existing paragraphs and their alternative views
            for paragraph in db_news.paragraphs:
                db.delete(paragraph)
            
            # Create new paragraphs
            for paragraph_data in news_data["paragraphs"]:
                paragraph_dict = {
                    k: v for k, v in paragraph_data.items()
                    if k != "alternative_views"
                }
                paragraph_dict["news_id"] = db_news.id
                db_paragraph = ParagraphModel(**paragraph_dict)
                db.add(db_paragraph)
                db.flush()

                # Create alternative views
                if "alternative_views" in paragraph_data:
                    for alt_view_data in paragraph_data["alternative_views"]:
                        alt_view_dict = alt_view_data.copy()
                        alt_view_dict["paragraph_id"] = db_paragraph.id
                        db_alt_view = AlternativeViewModel(**alt_view_dict)
                        db.add(db_alt_view)

        db.commit()
        db.refresh(db_news)
        return db_news
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{news_id}", status_code=204)
async def delete_news(news_id: int, db: Session = Depends(get_db)):
    db_news = db.query(NewsModel).filter(NewsModel.id == news_id).first()
    if db_news is None:
        raise HTTPException(status_code=404, detail="News not found")
    
    db.delete(db_news)
    db.commit()
    return None

@router.post("/analyze", status_code=200)
async def analyze_news(news_data: dict, db: Session = Depends(get_db)):
    # Validate required fields
    required_fields = ["title", "content", "url", "source"]
    missing_fields = [field for field in required_fields if field not in news_data]
    
    if missing_fields:
        raise HTTPException(
            status_code=400,
            detail=f"400: Missing required field: {', '.join(missing_fields)}"
        )
    
    try:
        # Process the analysis
        analysis_result = {
            "trustScore": 85,  # Example score
            "confidence": 0.9,
            "sentiment": {
                "score": 0.75,
                "label": "positive"
            },
            "criteria": [
                {
                    "name": "Source Credibility",
                    "met": True,
                    "score": 0.8
                }
            ],
            "analysisId": "test-analysis-1",
            "articleUrl": news_data["url"]
        }
        
        return analysis_result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))