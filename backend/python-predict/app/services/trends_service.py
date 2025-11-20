"""
Google Trends Service for Gold Price Analysis
Fetches and analyzes search trends related to gold buying behavior in Thailand
"""

import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple

import pandas as pd
from pytrends.request import TrendReq

logger = logging.getLogger(__name__)


class TrendsService:
    """Service for fetching and analyzing Google Trends data for gold-related keywords"""

    # Gold-related keywords in Thai
    GOLD_KEYWORDS = {
        "seasonal": [
            "ซื้อทองตรุษจีน",  # Buy gold Chinese New Year
            "ของขวัญวาเลนไทน์",  # Valentine's gift
            "ออมทอง",  # Gold savings
            "ทองคำแท่ง",  # Gold bar
            "ทองรูปพรรณ",  # Ornament gold
        ],
        "general": [
            "ราคาทอง",  # Gold price
            "ซื้อทอง",  # Buy gold
            "ขายทอง",  # Sell gold
            "จำนำทอง",  # Pawn gold
            "แลกทอง",  # Exchange gold
        ],
        "investment": [
            "ลงทุนทอง",  # Invest in gold
            "ทองคำลงทุน",  # Investment gold
            "กองทุนทอง",  # Gold fund
            "ซื้อทองออนไลน์",  # Buy gold online
        ],
    }

    # Important Thai festivals and events
    THAI_FESTIVALS = {
        "chinese_new_year": {"month": [1, 2], "keywords": ["ซื้อทองตรุษจีน", "ทองคำ"]},
        "valentines_day": {"month": [2], "keywords": ["ของขวัญวาเลนไทน์", "ทอง"]},
        "songkran": {"month": [4], "keywords": ["ซื้อทอง", "ทองคำ"]},
        "mothers_day": {"month": [8], "keywords": ["ซื้อทอง", "ทองคำ"]},
        "fathers_day": {"month": [12], "keywords": ["ซื้อทอง", "ทองคำ"]},
        "new_year": {"month": [12, 1], "keywords": ["ซื้อทอง", "ทองคำ"]},
    }

    def __init__(self, hl: str = "th", tz: int = 420, geo: str = "TH"):
        """
        Initialize Google Trends service

        Args:
            hl: Language (default: 'th' for Thai)
            tz: Timezone offset in minutes (default: 420 for Bangkok UTC+7)
            geo: Geographic location (default: 'TH' for Thailand)
        """
        self.hl = hl
        self.tz = tz
        self.geo = geo
        self.pytrends = TrendReq(hl=hl, tz=tz)
        logger.info(f"TrendsService initialized for geo={geo}, hl={hl}, tz={tz}")

    def fetch_trends(
        self,
        keywords: List[str],
        timeframe: str = "today 12-m",
        gprop: str = "",
    ) -> pd.DataFrame:
        """
        Fetch Google Trends data for specified keywords

        Args:
            keywords: List of keywords to search (max 5 per request)
            timeframe: Time range ('today 3-m', 'today 12-m', 'all', or 'YYYY-MM-DD YYYY-MM-DD')
            gprop: Property filter ('', 'images', 'news', 'youtube', 'froogle')

        Returns:
            DataFrame with trends data (index: date, columns: keywords)
        """
        try:
            if len(keywords) > 5:
                logger.warning(f"Too many keywords ({len(keywords)}). Taking first 5.")
                keywords = keywords[:5]

            logger.info(
                f"Fetching trends for keywords: {keywords}, timeframe: {timeframe}"
            )

            self.pytrends.build_payload(
                keywords, cat=0, timeframe=timeframe, geo=self.geo, gprop=gprop
            )

            # Get interest over time
            df = self.pytrends.interest_over_time()

            if df.empty:
                logger.warning(f"No data returned for keywords: {keywords}")
                return pd.DataFrame()

            # Remove 'isPartial' column if exists
            if "isPartial" in df.columns:
                df = df.drop(columns=["isPartial"])

            logger.info(f"Successfully fetched {len(df)} data points")
            return df

        except Exception as e:
            logger.error(f"Error fetching trends: {str(e)}")
            raise

    def fetch_seasonal_trends(
        self, keywords: Optional[List[str]] = None, timeframe: str = "today 12-m"
    ) -> pd.DataFrame:
        """
        Fetch seasonal gold buying trends

        Args:
            keywords: Custom keywords (default: seasonal keywords)
            timeframe: Time range

        Returns:
            DataFrame with seasonal trends data
        """
        if keywords is None:
            keywords = self.GOLD_KEYWORDS["seasonal"][:5]

        return self.fetch_trends(keywords, timeframe)

    def fetch_general_trends(
        self, keywords: Optional[List[str]] = None, timeframe: str = "today 12-m"
    ) -> pd.DataFrame:
        """
        Fetch general gold-related trends

        Args:
            keywords: Custom keywords (default: general keywords)
            timeframe: Time range

        Returns:
            DataFrame with general trends data
        """
        if keywords is None:
            keywords = self.GOLD_KEYWORDS["general"][:5]

        return self.fetch_trends(keywords, timeframe)

    def fetch_investment_trends(
        self, keywords: Optional[List[str]] = None, timeframe: str = "today 12-m"
    ) -> pd.DataFrame:
        """
        Fetch investment-related gold trends

        Args:
            keywords: Custom keywords (default: investment keywords)
            timeframe: Time range

        Returns:
            DataFrame with investment trends data
        """
        if keywords is None:
            keywords = self.GOLD_KEYWORDS["investment"][:5]

        return self.fetch_trends(keywords, timeframe)

    def analyze_seasonal_patterns(
        self, df: pd.DataFrame, keyword: str
    ) -> Dict[str, any]:
        """
        Analyze seasonal patterns in trends data

        Args:
            df: DataFrame with trends data
            keyword: Keyword to analyze

        Returns:
            Dict with seasonal analysis results
        """
        if df.empty or keyword not in df.columns:
            logger.warning(f"No data for keyword: {keyword}")
            return {}

        data = df[keyword]

        # Calculate statistics
        mean_interest = data.mean()
        std_interest = data.std()
        max_interest = data.max()
        min_interest = data.min()

        # Find peak periods (interest > mean + std)
        threshold = mean_interest + std_interest
        peaks = data[data > threshold]

        # Group by month to find seasonal patterns
        monthly_avg = data.groupby(data.index.month).mean()
        peak_months = monthly_avg.nlargest(3)

        # Detect festival periods
        festival_peaks = self._detect_festival_peaks(df, keyword)

        analysis = {
            "keyword": keyword,
            "statistics": {
                "mean": float(mean_interest),
                "std": float(std_interest),
                "max": float(max_interest),
                "min": float(min_interest),
            },
            "peaks": {
                "count": len(peaks),
                "dates": peaks.index.strftime("%Y-%m-%d").tolist(),
                "values": peaks.tolist(),
            },
            "seasonal_pattern": {
                "peak_months": {
                    int(month): float(value) for month, value in peak_months.items()
                },
                "monthly_average": {
                    int(month): float(value) for month, value in monthly_avg.items()
                },
            },
            "festival_peaks": festival_peaks,
        }

        return analysis

    def _detect_festival_peaks(
        self, df: pd.DataFrame, keyword: str
    ) -> Dict[str, List[Dict]]:
        """
        Detect if search interest peaks around Thai festivals

        Args:
            df: DataFrame with trends data
            keyword: Keyword to analyze

        Returns:
            Dict with festival-related peaks
        """
        festival_peaks = {}

        for festival_name, festival_info in self.THAI_FESTIVALS.items():
            festival_months = festival_info["month"]
            relevant_keywords = festival_info["keywords"]

            # Check if keyword is relevant to this festival
            keyword_relevant = any(kw in keyword for kw in relevant_keywords)

            if not keyword_relevant:
                continue

            # Filter data for festival months
            festival_data = df[df.index.month.isin(festival_months)][keyword]

            if not festival_data.empty:
                mean_all = df[keyword].mean()
                mean_festival = festival_data.mean()
                increase_pct = (
                    (mean_festival - mean_all) / mean_all * 100 if mean_all > 0 else 0
                )

                peaks_in_festival = festival_data[
                    festival_data > mean_all + df[keyword].std()
                ]

                festival_peaks[festival_name] = {
                    "average_interest": float(mean_festival),
                    "overall_average": float(mean_all),
                    "increase_percentage": float(increase_pct),
                    "has_significant_increase": increase_pct > 20,
                    "peak_count": len(peaks_in_festival),
                    "peak_dates": peaks_in_festival.index.strftime("%Y-%m-%d").tolist(),
                }

        return festival_peaks

    def compare_keywords(
        self, keywords: List[str], timeframe: str = "today 12-m"
    ) -> Dict[str, any]:
        """
        Compare multiple keywords and find the most popular

        Args:
            keywords: List of keywords to compare (max 5)
            timeframe: Time range

        Returns:
            Dict with comparison results
        """
        df = self.fetch_trends(keywords, timeframe)

        if df.empty:
            return {}

        comparison = {
            "timeframe": timeframe,
            "keywords": keywords,
            "averages": {keyword: float(df[keyword].mean()) for keyword in keywords},
            "peaks": {
                keyword: {
                    "max": float(df[keyword].max()),
                    "date": df[keyword].idxmax().strftime("%Y-%m-%d"),
                }
                for keyword in keywords
            },
            "trends": {keyword: df[keyword].tolist() for keyword in keywords},
            "dates": df.index.strftime("%Y-%m-%d").tolist(),
        }

        # Find most popular keyword
        most_popular = max(comparison["averages"].items(), key=lambda x: x[1])
        comparison["most_popular"] = {
            "keyword": most_popular[0],
            "average_interest": most_popular[1],
        }

        return comparison

    def get_behavioral_insights(self, timeframe: str = "today 12-m") -> Dict[str, any]:
        """
        Get comprehensive behavioral insights for gold buying

        Args:
            timeframe: Time range

        Returns:
            Dict with behavioral insights
        """
        insights = {
            "timeframe": timeframe,
            "seasonal_behavior": {},
            "general_behavior": {},
            "investment_behavior": {},
        }

        # Analyze seasonal keywords
        try:
            seasonal_df = self.fetch_seasonal_trends(timeframe=timeframe)
            if not seasonal_df.empty:
                for keyword in seasonal_df.columns:
                    insights["seasonal_behavior"][keyword] = (
                        self.analyze_seasonal_patterns(seasonal_df, keyword)
                    )
        except Exception as e:
            logger.error(f"Error analyzing seasonal trends: {str(e)}")

        # Analyze general keywords
        try:
            general_df = self.fetch_general_trends(timeframe=timeframe)
            if not general_df.empty:
                insights["general_behavior"]["comparison"] = self.compare_keywords(
                    self.GOLD_KEYWORDS["general"][:5], timeframe
                )
        except Exception as e:
            logger.error(f"Error analyzing general trends: {str(e)}")

        # Analyze investment keywords
        try:
            investment_df = self.fetch_investment_trends(timeframe=timeframe)
            if not investment_df.empty:
                insights["investment_behavior"]["comparison"] = self.compare_keywords(
                    self.GOLD_KEYWORDS["investment"][:5], timeframe
                )
        except Exception as e:
            logger.error(f"Error analyzing investment trends: {str(e)}")

        return insights

    def get_current_trend_score(self, keyword: str) -> Dict[str, any]:
        """
        Get current trend score for a keyword (last 7 days vs previous period)

        Args:
            keyword: Keyword to analyze

        Returns:
            Dict with trend score and momentum
        """
        try:
            # Get last 30 days of data
            df = self.fetch_trends([keyword], timeframe="today 1-m")

            if df.empty or keyword not in df.columns:
                return {"error": "No data available"}

            data = df[keyword]

            # Last 7 days
            last_7_days = data.tail(7).mean()

            # Previous 7 days
            prev_7_days = data.iloc[-14:-7].mean()

            # Calculate momentum
            momentum = (
                (last_7_days - prev_7_days) / prev_7_days * 100
                if prev_7_days > 0
                else 0
            )

            # Determine trend direction
            if momentum > 10:
                trend_direction = "increasing"
            elif momentum < -10:
                trend_direction = "decreasing"
            else:
                trend_direction = "stable"

            return {
                "keyword": keyword,
                "current_score": float(last_7_days),
                "previous_score": float(prev_7_days),
                "momentum_percentage": float(momentum),
                "trend_direction": trend_direction,
                "last_updated": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            }

        except Exception as e:
            logger.error(f"Error calculating trend score: {str(e)}")
            return {"error": str(e)}
