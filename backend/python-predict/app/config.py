import os
from typing import List
from dotenv import load_dotenv

load_dotenv()


class Settings:
    # Server
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "true").lower() == "true"

    # CORS
    CORS_ORIGINS: List[str] = os.getenv(
        "CORS_ORIGINS", "http://localhost:3000,http://localhost:3002"
    ).split(",")

    # Model Paths
    MODEL_PATH: str = os.getenv("MODEL_PATH", "./saved_models")
    DATA_PATH: str = os.getenv("DATA_PATH", "./data")

    # Gold Price Model Settings
    GOLD_PRICE_MODEL_NAME: str = os.getenv(
        "GOLD_PRICE_MODEL_NAME", "prophet_gold_price"
    )
    GOLD_BASE_PRICE: float = float(os.getenv("GOLD_BASE_PRICE", "32500.0"))
    GOLD_ACCURACY_TARGET: float = float(os.getenv("GOLD_ACCURACY_TARGET", "0.923"))

    # Forfeited Asset Model Settings
    FORFEITED_MODEL_NAME: str = os.getenv("FORFEITED_MODEL_NAME", "xgboost_forfeited")
    HIGH_RISK_THRESHOLD: float = float(os.getenv("HIGH_RISK_THRESHOLD", "0.7"))
    MEDIUM_RISK_THRESHOLD: float = float(os.getenv("MEDIUM_RISK_THRESHOLD", "0.4"))
    FORFEITED_CONFIDENCE: float = float(os.getenv("FORFEITED_CONFIDENCE", "0.91"))

    # API Settings
    API_VERSION: str = os.getenv("API_VERSION", "v1")
    API_TITLE: str = os.getenv("API_TITLE", "Pawn AI ML Service")
    API_DESCRIPTION: str = os.getenv(
        "API_DESCRIPTION",
        "Machine Learning Service for Gold Price Prediction and Risk Assessment",
    )


settings = Settings()
