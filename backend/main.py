from typing import List, Optional, Dict, Annotated
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, String, Integer, Float, JSON
from sqlalchemy.orm import sessionmaker, Session, DeclarativeBase
from pydantic import BaseModel, ConfigDict

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database configuration
SQLALCHEMY_DATABASE_URL = "sqlite:///./news_analyzer.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Modern SQLAlchemy Base class
class Base(DeclarativeBase):
    pass

# Database Models
class ThemeDB(Base):
    __tablename__ = "themes"
    id: str = Column(String, primary_key=True)
    title: str = Column(String)
    description: str = Column(String)
    total_articles: int = Column(Integer)
    rating: float = Column(Float)

class DiffDB(Base):
    __tablename__ = "diffs"
    id: str = Column(String, primary_key=True)
    theme_id: str = Column(String)
    original_text: Dict = Column(JSON)
    opposing_text: Dict = Column(JSON)
    sentiment: str = Column(String)
    rating: float = Column(Float)
    source: str = Column(String)
    changed_lines: List[int] = Column(JSON)

Base.metadata.create_all(bind=engine)

# Pydantic Models with modern config
class Theme(BaseModel):
    id: str
    title: str
    description: str
    total_articles: int
    rating: float

    model_config = ConfigDict(from_attributes=True)

class DiffItem(BaseModel):
    id: str
    theme_id: str
    original_text: List[Dict]
    opposing_text: List[Dict]
    sentiment: str
    rating: float
    source: str
    changed_lines: List[int]

    model_config = ConfigDict(from_attributes=True)

class TextLine(BaseModel):
    line_number: int
    content: str

class Analysis(BaseModel):
    id: str
    title: str
    original_text: List[TextLine]
    rating: float

# Initialize empty list for storing analyses
analyses: List[Analysis] = []

# Add some sample data
sample_analysis = Analysis(
    id="news-1",
    title="Climate Change Report",
    original_text=[
        TextLine(line_number=1, content="Global temperatures continue to rise at unprecedented rates."),
        TextLine(line_number=2, content="Scientists warn of irreversible damage to ecosystems."),
    ],
    rating=85
)

# Add sample data to our storage
analyses.append(sample_analysis)

# Dependencies
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

DBDependency = Annotated[Session, Depends(get_db)]

# API Endpoints
@app.get("/themes", response_model=List[Theme])
async def get_themes(db: DBDependency) -> List[Theme]:
    themes = db.query(ThemeDB).all()
    return themes

@app.get("/themes/{theme_id}/diffs", response_model=List[DiffItem])
async def get_theme_diffs(theme_id: str, db: DBDependency) -> List[DiffItem]:
    diffs = db.query(DiffDB).filter(DiffDB.theme_id == theme_id).all()
    if not diffs:
        raise HTTPException(status_code=404, detail="Theme not found")
    return diffs

@app.post("/themes", response_model=Theme)
async def create_theme(theme: Theme, db: DBDependency) -> Theme:
    db_theme = ThemeDB(**theme.model_dump())
    db.add(db_theme)
    db.commit()
    db.refresh(db_theme)
    return db_theme

@app.post("/diffs", response_model=DiffItem)
async def create_diff(diff: DiffItem, db: DBDependency) -> DiffItem:
    db_diff = DiffDB(**diff.model_dump())
    db.add(db_diff)
    db.commit()
    db.refresh(db_diff)
    return db_diff

@app.get("/analyses")
async def get_analyses():
    return analyses

@app.post("/analyses")
async def create_analysis(analysis: Analysis):
    analyses.append(analysis)
    return analysis

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        workers=1
    ) 