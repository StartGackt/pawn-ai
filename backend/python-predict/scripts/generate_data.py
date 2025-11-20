import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

# ตั้งค่า Seed
np.random.seed(42)
random.seed(42)

# Path สำหรับเก็บข้อมูล (ถอยกลับไป 1 ชั้นจาก scripts/)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "raw")
os.makedirs(DATA_PATH, exist_ok=True)


def generate_gold_price_data(days=1825):  # 5 ปีย้อนหลัง
    print("Generating Gold Price Data...")
    start_date = datetime.now() - timedelta(days=days)
    dates = [start_date + timedelta(days=i) for i in range(days)]

    # สร้าง Trend + Seasonality + Noise
    t = np.linspace(0, 10, days)
    trend = 20000 + t * 2000  # Trend ขาขึ้น
    seasonality = 500 * np.sin(t * 2 * np.pi / 365)  # รายปี
    noise = np.random.normal(0, 200, days)

    prices = trend + seasonality + noise

    df = pd.DataFrame(
        {
            "date": dates,
            "gold_price_thai": prices.astype(int),
            "gold_price_global": (prices / 34).astype(float),
            "usd_thb": np.random.normal(34, 1, days),
            "cpi": np.random.normal(100, 2, days),
        }
    )

    df.to_csv(os.path.join(DATA_PATH, "gold_price_history.csv"), index=False)
    print(f"Saved to {DATA_PATH}/gold_price_history.csv")


def generate_pawn_transactions(n_samples=5000):
    print("Generating Pawn Transactions Data...")

    item_types = ["Gold", "Diamond", "Watch", "Electronics", "Bag"]

    data = []
    for _ in range(n_samples):
        item_type = random.choice(item_types)
        loan_amount = np.random.randint(5000, 100000)

        # Logic การหลุดจำนำ (Target)
        late_payment_count = np.random.randint(0, 5)
        days_overdue = np.random.randint(0, 60)

        score = (late_payment_count * 2) + (days_overdue / 10) + (loan_amount / 50000)
        is_forfeited = 1 if score > 5 + np.random.normal(0, 1) else 0

        data.append(
            {
                "loan_amount": loan_amount,
                "item_type": item_type,
                "days_overdue": days_overdue,
                "late_payment_count": late_payment_count,
                "customer_history_score": np.random.uniform(0, 1),
                "is_forfeited": is_forfeited,
            }
        )

    df = pd.DataFrame(data)
    df.to_csv(os.path.join(DATA_PATH, "pawn_transactions.csv"), index=False)
    print(f"Saved to {DATA_PATH}/pawn_transactions.csv")


if __name__ == "__main__":
    generate_gold_price_data()
    generate_pawn_transactions()
