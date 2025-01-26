from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class AlternativeViewBase(BaseModel):
    content: str
    source: Optional[str] = None

class AlternativeViewCreate(AlternativeViewBase):
    pass

class AlternativeView(AlternativeViewBase):
    id: int
    paragraph_id: int

    class Config:
        from_attributes = True

class ParagraphBase(BaseModel):
    content: str
    source: Optional[str] = None
    order: int

class ParagraphCreate(ParagraphBase):
    pass

class Paragraph(ParagraphBase):
    id: int
    news_id: int
    alternative_views: List[AlternativeView] = []

    class Config:
        from_attributes = True

class NewsBase(BaseModel):
    title: str
    content: str
    source: Optional[str] = None
    url: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    image_url: Optional[str] = None
    trust_score: Optional[float] = None

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: int
    published_date: datetime
    paragraphs: List[Paragraph] = []

    class Config:
        from_attributes = True

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    source: Optional[str] = None
    url: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None
    image_url: Optional[str] = None
    trust_score: Optional[float] = None