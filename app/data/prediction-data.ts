
import { addDays, format, subDays, startOfWeek, addWeeks, startOfMonth, addMonths, endOfMonth } from 'date-fns';

// Define types for our data
export interface PredictionDataPoint {
  date: string;
  historyPrice?: number | null; // Gray Line
  actualPrice?: number | null;  // Green Dot (Test Period)
  predictedPrice?: number | null; // Red X (Blind Forecast)
  isTestPeriod: boolean;
}

export interface MultiTimeframeData {
    daily: {
        title: string;
        mae: string;
        data: PredictionDataPoint[];
        lastHistoryPrice: number;
    };
    weekly: {
        title: string;
        mae: string;
        data: PredictionDataPoint[];
        lastHistoryPrice: number;
    };
    monthly: {
        title: string;
        mae: string;
        data: PredictionDataPoint[];
        lastHistoryPrice: number;
    };
}

// Helper to generate random walk
const generateRandomWalk = (startValue: number, steps: number, stepSize: number, drift: number = 0): number[] => {
  const data = [startValue];
  for (let i = 1; i < steps; i++) {
    const change = (Math.random() - 0.5) * stepSize + drift;
    data.push(data[i - 1] + change);
  }
  return data;
};

// Generate data for the 3 specific timeframes
export const generateMultiFrameData = (): MultiTimeframeData => {
    
    // --- 1. Daily Forecast (Retrain Daily) ---
    // Show ~45 days total: 30 days history + 15 days test
    const dailyStart = subDays(new Date(), 45);
    const dailyPrices = generateRandomWalk(61200, 60, 400, 50); // Volatility 400, Drift +50
    const dailyCutoffIndex = 35; // Where history ends
    
    const dailyData: PredictionDataPoint[] = dailyPrices.slice(0, 50).map((price, i) => {
        const isHistory = i <= dailyCutoffIndex;
        // Simulate Blind Forecast Error
        const error = (Math.random() - 0.5) * 500; 
        
        return {
            date: format(addDays(dailyStart, i), 'dd-MMM'),
            historyPrice: isHistory ? price : null,
            actualPrice: !isHistory ? price : null,
            predictedPrice: !isHistory ? price + error : null,
            isTestPeriod: !isHistory
        };
    });

    // --- 2. Weekly Forecast (Predicting Mondays) ---
    // Show ~15 weeks: 10 weeks history + 5 weeks test
    const weeklyStart = startOfWeek(subDays(new Date(), 100)); // Start 15 weeks ago
    const weeklyPrices = generateRandomWalk(61200, 20, 800, 100);
    const weeklyCutoffIndex = 11;

    const weeklyData: PredictionDataPoint[] = weeklyPrices.slice(0, 16).map((price, i) => {
        const isHistory = i <= weeklyCutoffIndex;
        const error = (Math.random() - 0.5) * 800; // Larger error for weekly
        const date = addWeeks(weeklyStart, i);
        
        return {
            date: format(date, 'dd-MMM'),
            historyPrice: isHistory ? price : null,
            actualPrice: !isHistory ? price : null,
            predictedPrice: !isHistory ? price + error : null,
            isTestPeriod: !isHistory
        };
    });

    // --- 3. Monthly Forecast (Predicting Month End) ---
    // Show ~12 months: 9 months history + 3 months test
    const monthlyStart = startOfMonth(subDays(new Date(), 365)); 
    const monthlyPrices = generateRandomWalk(58000, 15, 2000, 300);
    const monthlyCutoffIndex = 10;

    const monthlyData: PredictionDataPoint[] = monthlyPrices.slice(0, 13).map((price, i) => {
        const isHistory = i <= monthlyCutoffIndex;
        const error = (Math.random() - 0.5) * 3000; // Large error for monthly
        const date = endOfMonth(addMonths(monthlyStart, i));
        
        return {
            date: format(date, 'MMM-yyyy'),
            historyPrice: isHistory ? price : null,
            actualPrice: !isHistory ? price : null,
            predictedPrice: !isHistory ? price + error : null,
            isTestPeriod: !isHistory
        };
    });

    return {
        daily: {
            title: "1. Daily Forecast (Retrain Daily)",
            mae: "604",
            data: dailyData,
            lastHistoryPrice: dailyPrices[dailyCutoffIndex]
        },
        weekly: {
            title: "2. Weekly Forecast (Predicting Mondays)",
            mae: "617",
            data: weeklyData,
            lastHistoryPrice: weeklyPrices[weeklyCutoffIndex]
        },
        monthly: {
            title: "3. Monthly Forecast (Predicting Month End)",
            mae: "8,593",
            data: monthlyData,
            lastHistoryPrice: monthlyPrices[monthlyCutoffIndex]
        }
    };
};
