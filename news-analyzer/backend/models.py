from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    url = Column(String(512), nullable=False)
    source = Column(String(255), nullable=False)
    trust_score = Column(Float, default=0.0)
    published_date = Column(DateTime, default=datetime.utcnow)

    # Relationships
    paragraphs = relationship("Paragraph", back_populates="news", cascade="all, delete-orphan")

class Paragraph(Base):
    __tablename__ = "paragraphs"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    source = Column(String(255), nullable=False)
    order = Column(Integer, nullable=False)
    news_id = Column(Integer, ForeignKey("news.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    news = relationship("News", back_populates="paragraphs")
    alternative_views = relationship("AlternativeView", back_populates="paragraph", cascade="all, delete-orphan")

class AlternativeView(Base):
    __tablename__ = "alternative_views"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    source = Column(String(255), nullable=False)
    paragraph_id = Column(Integer, ForeignKey("paragraphs.id", ondelete="CASCADE"), nullable=False)

    # Relationships
    paragraph = relationship("Paragraph", back_populates="alternative_views")