from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


# Gold Price Prediction Schemas
class GoldPricePredictionRequest(BaseModel):
    forecast_days: int = Field(
        default=7, ge=1, le=30, description="Number of days to forecast"
    )
    confidence_level: float = Field(
        default=0.95, ge=0.80, le=0.99, description="Confidence level for intervals"
    )


class GoldPricePrediction(BaseModel):
    date: str
    predicted_price: float
    lower_bound: Optional[float] = None
    upper_bound: Optional[float] = None


class GoldPricePredictionResponse(BaseModel):
    predictions: List[GoldPricePrediction]
    model: str = "prophet"
    accuracy: float = 92.3
    mae: float = 85.5
    trained_at: str
    forecast_days: int


# Forfeited Asset Prediction Schemas
class ForfeitedAssetPredictionRequest(BaseModel):
    pawn_id: str
    days_overdue: int = Field(ge=0, description="Number of days overdue")
    item_type: str = Field(description="Type of item: gold, phone, notebook, camera")
    loan_amount: float = Field(gt=0, description="Loan amount in THB")
    customer_history_score: Optional[float] = Field(default=None, ge=0, le=1)
    gold_price_trend: Optional[str] = Field(default=None)


class ForfeitedAssetPredictionResponse(BaseModel):
    pawn_id: str
    prediction: str = Field(description="high_risk, medium_risk, low_risk")
    probability: float = Field(ge=0, le=1, description="Probability of being forfeited")
    risk_factors: List[str]
    recommendation: str
    model: str = "xgboost"
    confidence: float


# Customer Segmentation Schemas
class CustomerSegmentRequest(BaseModel):
    customer_id: str


class CustomerSegmentResponse(BaseModel):
    customer_id: str
    segment: str = Field(description="VIP, Regular, At-Risk, Lost")
    characteristics: dict
    lifetime_value: float
    churn_risk: float = Field(ge=0, le=1)
