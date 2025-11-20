from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import predictions, health
from app.config import settings
import uvicorn

app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router, tags=["Health"])
app.include_router(
    predictions.router, prefix="/api/v1/predictions", tags=["Predictions"]
)


@app.get("/")
async def root():
    return {
        "message": settings.API_TITLE,
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info",
    )
