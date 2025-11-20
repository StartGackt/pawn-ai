"""
Pydantic schemas for Google Trends API endpoints
"""

from datetime import datetime
from typing import Dict, List, Optional

from pydantic import BaseModel, Field


class TrendsRequest(BaseModel):
    """Request schema for fetching trends data"""

    keywords: List[str] = Field(
        ...,
        description="List of keywords to search (max 5)",
        min_length=1,
        max_length=5,
        examples=[["ซื้อทอง", "ราคาทอง", "ขายทอง"]],
    )
    timeframe: str = Field(
        default="today 12-m",
        description="Time range (e.g., 'today 3-m', 'today 12-m', 'all', or 'YYYY-MM-DD YYYY-MM-DD')",
        examples=["today 12-m", "today 3-m", "2024-01-01 2024-12-31"],
    )
    geo: str = Field(
        default="TH",
        description="Geographic location (ISO country code)",
        examples=["TH", "US", "JP"],
    )


class SeasonalTrendsRequest(BaseModel):
    """Request schema for seasonal trends analysis"""

    keywords: Optional[List[str]] = Field(
        default=None,
        description="Custom keywords (default: seasonal keywords)",
        max_length=5,
    )
    timeframe: str = Field(
        default="today 12-m",
        description="Time range",
        examples=["today 12-m"],
    )


class ComparisonRequest(BaseModel):
    """Request schema for comparing multiple keywords"""

    keywords: List[str] = Field(
        ...,
        description="Keywords to compare (max 5)",
        min_length=2,
        max_length=5,
        examples=[["ซื้อทอง", "ขายทอง", "จำนำทอง"]],
    )
    timeframe: str = Field(
        default="today 12-m",
        description="Time range",
        examples=["today 12-m"],
    )


class TrendScoreRequest(BaseModel):
    """Request schema for getting current trend score"""

    keyword: str = Field(
        ...,
        description="Keyword to analyze",
        examples=["ซื้อทอง"],
    )


class BehavioralInsightsRequest(BaseModel):
    """Request schema for behavioral insights"""

    timeframe: str = Field(
        default="today 12-m",
        description="Time range for analysis",
        examples=["today 12-m", "today 3-m"],
    )


# Response Schemas


class TrendsDataPoint(BaseModel):
    """Single data point in trends data"""

    date: str = Field(..., description="Date in YYYY-MM-DD format")
    value: float = Field(..., description="Interest value (0-100)")


class TrendsResponse(BaseModel):
    """Response schema for trends data"""

    keyword: str = Field(..., description="Keyword")
    timeframe: str = Field(..., description="Time range")
    geo: str = Field(..., description="Geographic location")
    data: List[TrendsDataPoint] = Field(..., description="Trends data points")
    statistics: Dict[str, float] = Field(
        ...,
        description="Statistical summary",
        examples=[
            {
                "mean": 45.5,
                "std": 12.3,
                "max": 100.0,
                "min": 10.0,
            }
        ],
    )


class SeasonalPeak(BaseModel):
    """Seasonal peak information"""

    date: str = Field(..., description="Peak date")
    value: float = Field(..., description="Interest value")


class FestivalAnalysis(BaseModel):
    """Festival-related analysis"""

    average_interest: float = Field(..., description="Average interest during festival")
    overall_average: float = Field(..., description="Overall average interest")
    increase_percentage: float = Field(..., description="Percentage increase")
    has_significant_increase: bool = Field(
        ..., description="Whether increase is significant (>20%)"
    )
    peak_count: int = Field(..., description="Number of peaks during festival")
    peak_dates: List[str] = Field(..., description="Dates of peaks")


class SeasonalPattern(BaseModel):
    """Seasonal pattern analysis"""

    peak_months: Dict[int, float] = Field(..., description="Top 3 peak months")
    monthly_average: Dict[int, float] = Field(
        ..., description="Average interest by month"
    )


class SeasonalAnalysisResponse(BaseModel):
    """Response schema for seasonal analysis"""

    keyword: str = Field(..., description="Keyword analyzed")
    statistics: Dict[str, float] = Field(..., description="Statistical summary")
    peaks: Dict[str, any] = Field(
        ...,
        description="Peak information",
        examples=[
            {
                "count": 5,
                "dates": ["2024-02-10", "2024-02-11"],
                "values": [85.0, 92.0],
            }
        ],
    )
    seasonal_pattern: SeasonalPattern = Field(..., description="Seasonal patterns")
    festival_peaks: Dict[str, FestivalAnalysis] = Field(
        ..., description="Festival-related peaks"
    )


class KeywordComparison(BaseModel):
    """Keyword comparison data"""

    keyword: str = Field(..., description="Keyword")
    average_interest: float = Field(..., description="Average interest")
    max_value: float = Field(..., description="Maximum value")
    peak_date: str = Field(..., description="Date of peak")


class ComparisonResponse(BaseModel):
    """Response schema for keyword comparison"""

    timeframe: str = Field(..., description="Time range")
    keywords: List[str] = Field(..., description="Keywords compared")
    averages: Dict[str, float] = Field(..., description="Average interest by keyword")
    peaks: Dict[str, Dict[str, any]] = Field(..., description="Peak information")
    most_popular: Dict[str, any] = Field(..., description="Most popular keyword")
    trends: Dict[str, List[float]] = Field(..., description="Full trends data")
    dates: List[str] = Field(..., description="Date labels")


class TrendScoreResponse(BaseModel):
    """Response schema for current trend score"""

    keyword: str = Field(..., description="Keyword")
    current_score: float = Field(..., description="Current 7-day average")
    previous_score: float = Field(..., description="Previous 7-day average")
    momentum_percentage: float = Field(..., description="Momentum percentage")
    trend_direction: str = Field(
        ...,
        description="Trend direction: increasing, decreasing, or stable",
        examples=["increasing"],
    )
    last_updated: str = Field(..., description="Last update timestamp")


class BehavioralInsight(BaseModel):
    """Behavioral insight for a category"""

    comparison: Optional[ComparisonResponse] = Field(
        default=None, description="Keyword comparison"
    )
    analysis: Optional[Dict[str, SeasonalAnalysisResponse]] = Field(
        default=None, description="Seasonal analysis by keyword"
    )


class BehavioralInsightsResponse(BaseModel):
    """Response schema for comprehensive behavioral insights"""

    timeframe: str = Field(..., description="Time range")
    seasonal_behavior: Dict[str, SeasonalAnalysisResponse] = Field(
        ..., description="Seasonal behavior analysis"
    )
    general_behavior: BehavioralInsight = Field(
        ..., description="General gold buying behavior"
    )
    investment_behavior: BehavioralInsight = Field(
        ..., description="Investment behavior"
    )


class ErrorResponse(BaseModel):
    """Error response schema"""

    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(default=None, description="Error details")


class HealthResponse(BaseModel):
    """Health check response"""

    status: str = Field(..., description="Service status", examples=["healthy"])
    service: str = Field(..., description="Service name", examples=["trends"])
    timestamp: str = Field(..., description="Current timestamp")
