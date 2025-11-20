import pandas as pd
import numpy as np
from prophet import Prophet
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import os

# Config Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "raw")
MODEL_PATH = os.path.join(BASE_DIR, "saved_models")
os.makedirs(MODEL_PATH, exist_ok=True)


def train_gold_price_model():
    print("\n--- Training Gold Price Model (Prophet) ---")
    try:
        df = pd.read_csv(os.path.join(DATA_PATH, "gold_price_history.csv"))
        df_prophet = df[["date", "gold_price_thai", "usd_thb"]].rename(
            columns={"date": "ds", "gold_price_thai": "y"}
        )

        model = Prophet()
        model.add_regressor("usd_thb")
        model.fit(df_prophet)

        joblib.dump(model, os.path.join(MODEL_PATH, "prophet_gold_price.pkl"))
        print(f"✅ Model saved to {MODEL_PATH}/prophet_gold_price.pkl")
    except Exception as e:
        print(f"❌ Error: {e}")


def train_forfeited_model():
    print("\n--- Training Forfeited Asset Model (XGBoost) ---")
    try:
        df = pd.read_csv(os.path.join(DATA_PATH, "pawn_transactions.csv"))

        # Simple Preprocessing
        df = pd.get_dummies(df, columns=["item_type"], drop_first=True)

        X = df.drop("is_forfeited", axis=1)
        y = df["is_forfeited"]

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        model = xgb.XGBClassifier(use_label_encoder=False, eval_metric="logloss")
        model.fit(X_train, y_train)

        acc = accuracy_score(y_test, model.predict(X_test))
        print(f"📊 Accuracy: {acc:.4f}")

        joblib.dump(model, os.path.join(MODEL_PATH, "xgboost_forfeited.pkl"))
        joblib.dump(
            X.columns.tolist(), os.path.join(MODEL_PATH, "xgboost_features.pkl")
        )
        print(f"✅ Model saved to {MODEL_PATH}/xgboost_forfeited.pkl")
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    train_gold_price_model()
    train_forfeited_model()
