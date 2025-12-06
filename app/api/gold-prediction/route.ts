import { NextResponse } from "next/server";

export interface PredictionData {
  predictions: {
    date: string;
    predicted: number;
    lower: number;
    upper: number;
  }[];
  trend: "up" | "down" | "stable";
  confidence: number;
  analysis: string;
}

// Historical gold prices (last 30 days mock data based on real trends)
const HISTORICAL_PRICES = [
  2580, 2595, 2610, 2605, 2620, 2635, 2628, 2640, 2655, 2648,
  2660, 2672, 2665, 2680, 2690, 2685, 2695, 2705, 2698, 2710,
  2720, 2715, 2728, 2735, 2742, 2750, 2645, 2652, 2648, 2655
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get("days") || "7");

  try {
    // Simple prediction using moving average and trend
    const predictions = generatePredictions(HISTORICAL_PRICES, days);
    const trend = calculateTrend(HISTORICAL_PRICES);
    const confidence = calculateConfidence(HISTORICAL_PRICES);

    const analysis = generateAnalysis(trend, predictions, confidence);

    const result: PredictionData = {
      predictions,
      trend,
      confidence,
      analysis,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating prediction:", error);
    return NextResponse.json(
      { error: "Failed to generate prediction" },
      { status: 500 }
    );
  }
}

function generatePredictions(prices: number[], days: number) {
  const lastPrice = prices[prices.length - 1];
  const sma5 = calculateSMA(prices, 5);
  const sma10 = calculateSMA(prices, 10);
  
  // Calculate trend slope
  const slope = (sma5 - sma10) / 5;
  
  // Generate predictions
  const predictions = [];
  const today = new Date();
  
  for (let i = 1; i <= days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    // Predict with trend and some randomness
    const trendComponent = slope * i;
    const predicted = lastPrice + trendComponent + (Math.random() * 10 - 5);
    
    // Confidence interval (widens over time)
    const intervalWidth = 15 + (i * 3);
    
    predictions.push({
      date: date.toISOString().split("T")[0],
      predicted: Math.round(predicted * 100) / 100,
      lower: Math.round((predicted - intervalWidth) * 100) / 100,
      upper: Math.round((predicted + intervalWidth) * 100) / 100,
    });
  }
  
  return predictions;
}

function calculateSMA(prices: number[], period: number): number {
  const slice = prices.slice(-period);
  return slice.reduce((a, b) => a + b, 0) / slice.length;
}

function calculateTrend(prices: number[]): "up" | "down" | "stable" {
  const sma5 = calculateSMA(prices, 5);
  const sma10 = calculateSMA(prices, 10);
  const diff = ((sma5 - sma10) / sma10) * 100;
  
  if (diff > 0.5) return "up";
  if (diff < -0.5) return "down";
  return "stable";
}

function calculateConfidence(prices: number[]): number {
  // Calculate based on volatility
  const returns = [];
  for (let i = 1; i < prices.length; i++) {
    returns.push((prices[i] - prices[i-1]) / prices[i-1]);
  }
  
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
  const volatility = Math.sqrt(variance);
  
  // Lower volatility = higher confidence
  const confidence = Math.max(60, Math.min(95, 95 - (volatility * 1000)));
  return Math.round(confidence);
}

function generateAnalysis(trend: string, predictions: { predicted: number }[], confidence: number): string {
  const lastPrediction = predictions[predictions.length - 1].predicted;
  const firstPrediction = predictions[0].predicted;
  const change = ((lastPrediction - firstPrediction) / firstPrediction * 100).toFixed(2);
  
  const trendText = trend === "up" ? "ขาขึ้น" : trend === "down" ? "ขาลง" : "ทรงตัว";
  
  return `📊 **สรุปการวิเคราะห์**

จากการวิเคราะห์ข้อมูลราคาทองคำย้อนหลัง 30 วัน พบว่า:

📈 **แนวโน้ม:** ${trendText}
💰 **คาดการณ์การเปลี่ยนแปลง:** ${change}%
🎯 **ความเชื่อมั่น:** ${confidence}%

**ปัจจัยที่มีผล:**
• อัตราดอกเบี้ยนโยบายของ Fed
• ความผันผวนของค่าเงินดอลลาร์
• สถานการณ์เศรษฐกิจโลก
• ความต้องการทองคำจากประเทศจีนและอินเดีย

**คำแนะนำ:**
${trend === "up" ? "แนวโน้มเป็นบวก เหมาะสำหรับการถือครองหรือรับจำนำ" : 
  trend === "down" ? "ควรระมัดระวังในการรับจำนำ และติดตามสถานการณ์อย่างใกล้ชิด" :
  "ราคามีเสถียรภาพ สามารถดำเนินธุรกิจได้ตามปกติ"}`;
}
