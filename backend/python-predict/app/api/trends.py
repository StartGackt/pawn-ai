"""
FastAPI endpoints for Google Trends analysis
"""

import logging
from datetime import datetime

from fastapi import APIRouter, HTTPException

from app.schemas.trends import (
    BehavioralInsightsRequest,
    BehavioralInsightsResponse,
    ComparisonRequest,
    ComparisonResponse,
    ErrorResponse,
    HealthResponse,
    SeasonalAnalysisResponse,
    SeasonalTrendsRequest,
    TrendScoreRequest,
    TrendScoreResponse,
    TrendsRequest,
    TrendsResponse,
)
from app.services.trends_service import TrendsService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/trends", tags=["Google Trends"])

# Initialize trends service
trends_service = TrendsService(hl="th", tz=420, geo="TH")


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint for trends service"""
    return {
        "status": "healthy",
        "service": "trends",
        "timestamp": datetime.now().isoformat(),
    }


@router.post(
    "/fetch", response_model=TrendsResponse, responses={500: {"model": ErrorResponse}}
)
async def fetch_trends(request: TrendsRequest):
    """
    Fetch Google Trends data for specified keywords

    Args:
        request: TrendsRequest with keywords, timeframe, and geo

    Returns:
        TrendsResponse with trends data and statistics

    Example:
        ```json
        {
            "keywords": ["ซื้อทอง", "ราคาทอง"],
            "timeframe": "today 12-m",
            "geo": "TH"
        }
        ```
    """
    try:
        logger.info(f"Fetching trends for keywords: {request.keywords}")

        # Update geo if different from default
        if request.geo != trends_service.geo:
            trends_service.geo = request.geo

        df = trends_service.fetch_trends(
            keywords=request.keywords,
            timeframe=request.timeframe,
        )

        if df.empty:
            raise HTTPException(
                status_code=404,
                detail="No data found for the specified keywords",
            )

        # Return data for the first keyword
        keyword = request.keywords[0]
        data = df[keyword]

        response = {
            "keyword": keyword,
            "timeframe": request.timeframe,
            "geo": request.geo,
            "data": [
                {"date": date.strftime("%Y-%m-%d"), "value": float(value)}
                for date, value in data.items()
            ],
            "statistics": {
                "mean": float(data.mean()),
                "std": float(data.std()),
                "max": float(data.max()),
                "min": float(data.min()),
            },
        }

        return response

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching trends: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post(
    "/seasonal",
    response_model=dict,
    responses={500: {"model": ErrorResponse}},
)
async def analyze_seasonal_trends(request: SeasonalTrendsRequest):
    """
    Analyze seasonal gold buying trends

    Fetches and analyzes trends for seasonal keywords like:
    - "ซื้อทองตรุษจีน" (Buy gold Chinese New Year)
    - "ของขวัญวาเลนไทน์" (Valentine's gift)
    - "ออมทอง" (Gold savings)

    Returns:
        Dict with seasonal analysis for each keyword

    Example:
        ```json
        {
            "timeframe": "today 12-m"
        }
        ```
    """
    try:
        logger.info("Analyzing seasonal trends")

        df = trends_service.fetch_seasonal_trends(
            keywords=request.keywords,
            timeframe=request.timeframe,
        )

        if df.empty:
            raise HTTPException(
                status_code=404,
                detail="No seasonal data found",
            )

        # Analyze each keyword
        analyses = {}
        for keyword in df.columns:
            analysis = trends_service.analyze_seasonal_patterns(df, keyword)
            if analysis:
                analyses[keyword] = analysis

        return {
            "timeframe": request.timeframe,
            "analyses": analyses,
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error analyzing seasonal trends: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post(
    "/compare",
    response_model=ComparisonResponse,
    responses={500: {"model": ErrorResponse}},
)
async def compare_keywords(request: ComparisonRequest):
    """
    Compare multiple gold-related keywords

    Compare search interest across different keywords to identify
    the most popular terms and their trends.

    Returns:
        ComparisonResponse with comparison data

    Example:
        ```json
        {
            "keywords": ["ซื้อทอง", "ขายทอง", "จำนำทอง"],
            "timeframe": "today 12-m"
        }
        ```
    """
    try:
        logger.info(f"Comparing keywords: {request.keywords}")

        comparison = trends_service.compare_keywords(
            keywords=request.keywords,
            timeframe=request.timeframe,
        )

        if not comparison:
            raise HTTPException(
                status_code=404,
                detail="No comparison data found",
            )

        return comparison

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error comparing keywords: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post(
    "/score",
    response_model=TrendScoreResponse,
    responses={500: {"model": ErrorResponse}},
)
async def get_trend_score(request: TrendScoreRequest):
    """
    Get current trend score for a keyword

    Calculates the current momentum by comparing last 7 days
    with the previous 7 days.

    Returns:
        TrendScoreResponse with trend score and momentum

    Example:
        ```json
        {
            "keyword": "ซื้อทอง"
        }
        ```
    """
    try:
        logger.info(f"Calculating trend score for: {request.keyword}")

        score = trends_service.get_current_trend_score(request.keyword)

        if "error" in score:
            raise HTTPException(
                status_code=404,
                detail=score["error"],
            )

        return score

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error calculating trend score: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post(
    "/behavioral",
    response_model=dict,
    responses={500: {"model": ErrorResponse}},
)
async def get_behavioral_insights(request: BehavioralInsightsRequest):
    """
    Get comprehensive behavioral insights for gold buying

    Analyzes:
    - Seasonal buying patterns (festival-related)
    - General gold buying behavior
    - Investment behavior

    Returns detailed analysis including:
    - Seasonal patterns
    - Festival peaks
    - Keyword comparisons
    - Trend directions

    Example:
        ```json
        {
            "timeframe": "today 12-m"
        }
        ```
    """
    try:
        logger.info("Fetching behavioral insights")

        insights = trends_service.get_behavioral_insights(timeframe=request.timeframe)

        if not insights:
            raise HTTPException(
                status_code=404,
                detail="No behavioral insights found",
            )

        return insights

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching behavioral insights: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/keywords", response_model=dict)
async def get_available_keywords():
    """
    Get list of available gold-related keywords

    Returns all predefined keywords categorized by:
    - Seasonal (festival-related)
    - General (everyday gold buying)
    - Investment (investment-related)

    Returns:
        Dict with categorized keywords
    """
    return {
        "categories": {
            "seasonal": {
                "description": "Festival and seasonal gold buying",
                "keywords": trends_service.GOLD_KEYWORDS["seasonal"],
            },
            "general": {
                "description": "General gold buying and selling",
                "keywords": trends_service.GOLD_KEYWORDS["general"],
            },
            "investment": {
                "description": "Gold investment and savings",
                "keywords": trends_service.GOLD_KEYWORDS["investment"],
            },
        },
        "festivals": {
            "description": "Important Thai festivals",
            "events": list(trends_service.THAI_FESTIVALS.keys()),
        },
    }


@router.get("/festivals", response_model=dict)
async def get_thai_festivals():
    """
    Get information about Thai festivals and their gold buying patterns

    Returns:
        Dict with festival information and associated keywords
    """
    return {
        "festivals": trends_service.THAI_FESTIVALS,
        "description": "Important Thai festivals where gold buying typically increases",
    }
