from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel
from sqlalchemy.orm import Session
import uvicorn
from database import Base, engine
from routers import news
from models import News  # Import the News model

app = FastAPI(title="News Analyzer API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
     # allow any one for now
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(news.router)

# Startup event to initialize database
@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)

# Health check endpoint
@app.get("/")
async def read_root():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

async def _main():
    # Run the application with uvicorn
    config = uvicorn.Config(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
    server = uvicorn.Server(config)
    await server.serve()

if __name__ == "__main__":
    import asyncio
    asyncio.run(_main())