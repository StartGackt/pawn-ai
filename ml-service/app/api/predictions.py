from fastapi import APIRouter, HTTPException
from typing import List, Optional
from app.schemas.predictions import (
    GoldPricePredictionRequest,
    GoldPricePredictionResponse,
    ForfeitedAssetPredictionRequest,
    ForfeitedAssetPredictionResponse,
)
from app.services.gold_price_service import GoldPriceService
from app.services.forfeited_service import ForfeitedAssetService

router = APIRouter()

# Initialize services
gold_service = GoldPriceService()
forfeited_service = ForfeitedAssetService()


@router.post("/gold-price", response_model=GoldPricePredictionResponse)
async def predict_gold_price(request: GoldPricePredictionRequest):
    """
    Predict gold price for the specified number of days

    - **forecast_days**: Number of days to forecast (1-30)
    - **confidence_level**: Confidence level for prediction intervals (0.80-0.99)
    """
    try:
        prediction = await gold_service.predict(
            forecast_days=request.forecast_days,
            confidence_level=request.confidence_level,
        )
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/forfeited-assets", response_model=ForfeitedAssetPredictionResponse)
async def predict_forfeited_asset(request: ForfeitedAssetPredictionRequest):
    """
    Predict probability of asset being forfeited

    - **pawn_id**: ID of the pawn item
    - **days_overdue**: Number of days overdue
    - **item_type**: Type of item (gold, phone, notebook, camera)
    - **loan_amount**: Loan amount in THB
    """
    try:
        prediction = await forfeited_service.predict(request)
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/gold-price/history")
async def get_gold_price_history(days: int = 30):
    """Get historical gold price data"""
    try:
        history = await gold_service.get_history(days=days)
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
