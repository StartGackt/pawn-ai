# ML Models Recommendation for Pawn AI

## 1. Gold Price Prediction

### Primary: Prophet (Facebook)

- **Accuracy**: 92-94% (1-7 days)
- **Use Case**: Short-term forecasting
- **Pros**:
  - Handles seasonality automatically
  - Robust to missing data
  - Fast training
  - Interpretable (trend + seasonality)
  - Confidence intervals out-of-the-box
- **Cons**:
  - Less accurate for very long-term (>1 month)

**Installation**:

```bash
uv add prophet
```

**Key Features**:

```python
- Daily/Weekly/Yearly seasonality
- Holiday effects (Thai holidays)
- Trend changepoints detection
- Uncertainty intervals
```

### Secondary: LSTM (Long Short-Term Memory)

- **Accuracy**: 88-92% (1-4 weeks)
- **Use Case**: Medium-term forecasting
- **Pros**:
  - Captures complex patterns
  - Good for longer forecasts
  - Handles multivariate data
- **Cons**:
  - Slower training
  - Requires more data (>2 years)
  - Black box
  - Needs GPU for efficient training

**Installation**:

```bash
uv add tensorflow torch
```

### NOT Recommended: ARIMA/SARIMA

- Manual parameter tuning required
- Less accurate than Prophet/LSTM
- Not flexible for external features

---

## 2. Forfeited Asset Risk Prediction

### Primary: XGBoost

- **Accuracy**: 90-95%
- **Use Case**: Binary/Multi-class classification
- **Pros**:
  - Extremely accurate
  - Handles imbalanced data well
  - Feature importance ranking
  - Fast inference
  - Robust to outliers
- **Cons**:
  - Requires hyperparameter tuning

**Installation**:

```bash
uv add xgboost
```

**Key Features for Training**:

```python
features = [
    'days_overdue',              # Days past due date
    'loan_amount',               # Loan amount (THB)
    'item_type',                 # gold, phone, notebook, camera
    'customer_history_score',    # Past payment behavior
    'gold_price_trend',          # Recent gold price movement
    'payment_history',           # Number of previous pawns
    'average_repayment_days',    # Avg days to repay
    'forfeited_history_count',   # Previous forfeited items
]

target = 'is_forfeited'  # 0 = redeemed, 1 = forfeited
```

**Output Classes**:

- `high_risk`: >70% probability
- `medium_risk`: 40-70% probability
- `low_risk`: <40% probability

### Secondary: Random Forest

- **Accuracy**: 88-92%
- **Pros**:
  - Less prone to overfitting
  - Feature importance
- **Cons**:
  - Larger model size
  - Slower inference

### NOT Recommended: Neural Networks

- Overkill for tabular data
- Requires much more data
- Slower training

---

## 3. Customer Segmentation

### Primary: K-Means Clustering

- **Use Case**: Customer grouping (RFM Analysis)
- **Pros**:
  - Simple and fast
  - Interpretable results
  - Works well with RFM features
- **Cons**:
  - Need to choose K (number of clusters)
  - Sensitive to outliers

**Installation**:

```bash
uv add scikit-learn
```

**RFM Features**:

```python
features = [
    'recency',              # Days since last pawn
    'frequency',            # Number of pawn transactions
    'monetary',             # Total loan amount
    'avg_repayment_time',   # Average days to repay
    'forfeited_rate',       # Percentage of forfeited items
]

segments = [
    'VIP',        # High value, frequent, always repays
    'Regular',    # Normal customer, repays on time
    'At-Risk',    # Starting to miss payments
    'Lost',       # Hasn't returned
]
```

### Secondary: DBSCAN

- Good for finding outliers
- Doesn't require specifying number of clusters
- More complex parameter tuning

---

## 4. Ensemble Approaches (Advanced)

### Prophet + LSTM Ensemble

For 1-3 month forecasts:

```python
final_prediction = 0.6 * prophet_pred + 0.4 * lstm_pred
```

- **Accuracy**: 85-88%
- Combines Prophet's interpretability with LSTM's pattern recognition

### XGBoost + Random Forest Ensemble

For risk prediction:

```python
final_risk = 0.7 * xgboost_pred + 0.3 * rf_pred
```

- **Accuracy**: 92-96%
- More robust predictions

---

## Implementation Priority

### Phase 1: MVP (Minimum Viable Product)

1. ✅ **Prophet** - Gold price forecasting (1-7 days)

   - Fast to implement
   - High accuracy
   - Users can see immediate value

2. ✅ **XGBoost** - Forfeited asset risk
   - Critical business need
   - Reduces losses
   - Actionable insights

### Phase 2: Enhancement

3. **LSTM** - Extended gold price forecasting (1-4 weeks)

   - For strategic planning
   - Requires more historical data

4. **K-Means** - Customer segmentation
   - Marketing optimization
   - Customer retention

### Phase 3: Advanced

5. **Ensemble Models** - Improved accuracy
6. **AutoML** - Automated model selection
7. **Online Learning** - Continuous model updates

---

## Data Requirements

### Gold Price Prediction

- **Minimum**: 2 years of daily gold prices
- **Optimal**: 5+ years
- **Features**: date, buy_price, sell_price, global_gold_price

### Forfeited Asset Prediction

- **Minimum**: 1,000+ pawn transactions (with outcomes)
- **Optimal**: 10,000+ transactions
- **Balance**: At least 20% forfeited cases

### Customer Segmentation

- **Minimum**: 500+ customers
- **Optimal**: 5,000+ customers
- **History**: 1+ year of transaction data

---

## Model Performance Metrics

### Gold Price Forecasting

```python
metrics = {
    'MAE': 'Mean Absolute Error (THB)',      # Target: <100 THB
    'MAPE': 'Mean Absolute Percentage Error', # Target: <3%
    'RMSE': 'Root Mean Squared Error',       # Target: <150 THB
    'R²': 'Coefficient of Determination',    # Target: >0.90
}
```

### Forfeited Asset Prediction

```python
metrics = {
    'Accuracy': 'Overall accuracy',           # Target: >90%
    'Precision': 'Avoid false alarms',        # Target: >85%
    'Recall': 'Catch all high risks',         # Target: >90%
    'F1-Score': 'Balance precision/recall',   # Target: >88%
    'AUC-ROC': 'Classification quality',      # Target: >0.92
}
```

### Customer Segmentation

```python
metrics = {
    'Silhouette Score': 'Cluster quality',    # Target: >0.5
    'Within-Cluster Sum': 'Compactness',      # Lower is better
    'Business Value': 'Marketing ROI',        # Measured separately
}
```

---

## Recommended Tech Stack

```bash
# Core ML Libraries
uv add prophet                # Time series forecasting
uv add xgboost               # Gradient boosting
uv add scikit-learn          # ML utilities, K-Means
uv add pandas                # Data manipulation
uv add numpy                 # Numerical computing

# Optional (Phase 2)
uv add tensorflow            # LSTM models
# or
uv add torch                 # PyTorch alternative

# Model Management
uv add mlflow                # Experiment tracking
uv add joblib                # Model serialization

# Visualization
uv add matplotlib            # Plotting
uv add seaborn              # Statistical plots
uv add plotly               # Interactive charts
```

---

## Tips for Success

1. **Start Simple**: Prophet + XGBoost first
2. **Collect Good Data**: Quality > Quantity
3. **Regular Retraining**: Update models monthly
4. **Monitor Performance**: Track prediction accuracy
5. **Business Validation**: Verify predictions make business sense
6. **A/B Testing**: Compare model predictions vs actual outcomes
7. **Explainability**: Use SHAP values for XGBoost interpretability

---

## References

- Prophet: https://facebook.github.io/prophet/
- XGBoost: https://xgboost.readthedocs.io/
- Scikit-learn: https://scikit-learn.org/
- Time Series Guide: https://otexts.com/fpp3/
