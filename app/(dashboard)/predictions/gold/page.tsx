"use client";

import { useEffect, useState } from "react";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ComposedChart,
    ReferenceLine
} from "recharts";
import { 
    RefreshCw,
    BrainCircuit,
    Maximize2
} from "lucide-react";
import { 
    generateMultiFrameData, 
    MultiTimeframeData,
    PredictionDataPoint
} from "@/app/data/prediction-data";

// Custom Cross Marker for "Blind Forecast"
const CustomCross = (props: { cx?: number; cy?: number; stroke?: string; strokeWidth?: number }) => {
    const { cx, cy, stroke, strokeWidth } = props;
    if (cx === undefined || cy === undefined) return null;
    const r = 4;
    return (
        <g stroke={stroke} strokeWidth={strokeWidth || 2}>
            <line x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} />
            <line x1={cx + r} y1={cy - r} x2={cx - r} y2={cy + r} />
        </g>
    );
};

// Reusable Chart Component
const ForecastChart = ({ title, mae, data, lastHistoryPrice }: { 
    title: string; 
    mae: string; 
    data: PredictionDataPoint[]; 
    lastHistoryPrice: number;
}) => {
    return (
        <Card className="border-slate-200 shadow-sm mb-6">
            <CardHeader className="py-3 px-4 border-b bg-slate-50/50">
                <div className="flex justify-between items-center h-8">
                    <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        {title}
                        <Badge variant="secondary" className="text-xs bg-slate-200 text-slate-700 hover:bg-slate-300">
                            MAE: {mae}
                        </Badge>
                    </CardTitle>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Maximize2 className="h-3 w-3 text-slate-400" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={true} className="stroke-slate-100" />
                            <XAxis 
                                dataKey="date" 
                                fontSize={11} 
                                tickLine={false} 
                                axisLine={false}
                                interval="preserveStartEnd"
                            />
                            <YAxis 
                                domain={['auto', 'auto']} 
                                fontSize={11} 
                                tickLine={false} 
                                axisLine={false}
                                tickFormatter={(val) => `${val.toLocaleString()}`} 
                            />
                            <Tooltip 
                                contentStyle={{ borderRadius: '6px', fontSize: '12px', border: '1px solid #e2e8f0' }}
                                formatter={(value: string | number | (string | number)[], name: string) => {
                                    if (!value) return [];
                                    const val = Number(value).toLocaleString();
                                    if (name === 'historyPrice') return [val, 'History (Daily)'];
                                    if (name === 'actualPrice') return [val, 'Actual'];
                                    if (name === 'predictedPrice') return [val, 'Forecast (Blind)'];
                                    return [val, name];
                                }}
                            />
                            <Legend 
                                iconType="plainline" 
                                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} 
                            />

                            {/* 1. History Line (Gray) */}
                            <Line 
                                type="monotone" 
                                dataKey="historyPrice" 
                                stroke="#94a3b8" 
                                strokeWidth={1.5} 
                                dot={false}
                                name="History"
                                connectNulls={false} // Don't bridge the gap to test period automatically
                            />
                             {/* Bridge line to connect last history to first test point? 
                                 Actually in the ref provided, history links to actual. 
                                 We can let 'Actual' overlap the last history point or use a separate line segment.
                                 For simplicity, let's keep them distinct segments or let Actual start from last history.
                             */}

                            {/* 2. Actual Price (Test Period) - Green Dots & Line */}
                            <Line
                                type="monotone"
                                dataKey="actualPrice"
                                stroke="#16a34a"
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#16a34a', strokeWidth: 0 }}
                                name="Actual"
                                connectNulls={true}
                            />

                            {/* 3. Forecast (Blind) - Red Crosses (Scatter style but using Line for legend/rendering convenience) */}
                            {/* We use Scatter for markers without line, or Line with opacity 0 stroke */}
                            <Line
                                type="monotone"
                                dataKey="predictedPrice"
                                stroke="transparent" // Invisible line
                                strokeWidth={0}
                                dot={<CustomCross stroke="#dc2626" strokeWidth={2} />}
                                name="Forecast (Blind)"
                                isAnimationActive={false}
                            />

                            {/* Reference Line for "Last History Price" */}
                            <ReferenceLine 
                                y={lastHistoryPrice} 
                                stroke="#64748b" 
                                strokeDasharray="3 3" 
                                label={{ 
                                    value: 'Last History Price', 
                                    position: 'insideLeft', 
                                    fontSize: 10, 
                                    fill: '#64748b' 
                                }} 
                            />

                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default function GoldPredictionPage() {
    const [data, setData] = useState<MultiTimeframeData | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);

    useEffect(() => {
        setData(generateMultiFrameData());
    }, []);

    const handleRegenerate = () => {
        setIsSimulating(true);
        setTimeout(() => {
            setData(generateMultiFrameData());
            setIsSimulating(false);
        }, 600);
    };

    if (!data) return <div className="flex h-screen items-center justify-center text-slate-500">Generating Models...</div>;

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen bg-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
                <div>
                     <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
                            <BrainCircuit className="mr-1 h-3 w-3" />
                            Model Configuration
                        </Badge>
                     </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Blind Gold Price Prediction <span className="text-slate-400 font-normal ml-2">(Strict Walk-Forward)</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                        Simulation of ARIMAX + XGBoost models predicting gold prices across 3 timeframes without future look-ahead.
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isSimulating}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isSimulating ? "animate-spin" : ""}`} />
                    Resimulate
                </Button>
            </div>

            {/* Charts Area - 3 Stacked Charts */}
            <div className="max-w-5xl mx-auto w-full">
                <ForecastChart 
                    title={data.daily.title} 
                    mae={data.daily.mae} 
                    data={data.daily.data} 
                    lastHistoryPrice={data.daily.lastHistoryPrice}
                />
                
                <ForecastChart 
                    title={data.weekly.title} 
                    mae={data.weekly.mae} 
                    data={data.weekly.data} 
                    lastHistoryPrice={data.weekly.lastHistoryPrice}
                />
                
                <ForecastChart 
                    title={data.monthly.title} 
                    mae={data.monthly.mae} 
                    data={data.monthly.data} 
                    lastHistoryPrice={data.monthly.lastHistoryPrice}
                />
            </div>
            
        </div>
    );
}
