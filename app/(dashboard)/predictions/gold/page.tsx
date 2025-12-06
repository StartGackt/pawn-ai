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
                        การทำนายราคาทองแบบ Blind <span className="text-slate-400 font-normal ml-2">(Strict Walk-Forward)</span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                        ระบบทำนายราคาทองโดยมองเห็นเฉพาะข้อมูลอดีต ไม่แอบดูข้อมูลอนาคต ใช้โมเดล ARIMAX + XGBoost ร่วมกับ Technical Indicators
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isSimulating}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isSimulating ? "animate-spin" : ""}`} />
                    สร้างการจำลองใหม่
                </Button>
            </div>

            {/* Model Explanation Section */}
            <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto w-full">
                <Card className="border-blue-200 bg-blue-50/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-blue-900">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold">1</span>
                            ทำนายปัจจัยภายนอก (X7–X10)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-700 space-y-2">
                        <p className="font-medium text-blue-900">ใช้โมเดล AutoReg (AR) ทำนาย:</p>
                        <ul className="space-y-1 ml-4 text-xs">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5">•</span>
                                <span><strong>X10:</strong> ราคาทองตลาดโลก (Global Gold Price)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5">•</span>
                                <span><strong>X8:</strong> อัตราแลกเปลี่ยน USD/THB</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5">•</span>
                                <span><strong>X9:</strong> อัตราดอกเบี้ย</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5">•</span>
                                <span><strong>X7:</strong> ราคาทองประเภทใกล้เคียง</span>
                            </li>
                        </ul>
                        <p className="text-xs text-slate-600 mt-2 italic">
                            เพราะในโลกจริงเราไม่มีข้อมูลอนาคต → จึงต้องทำนายปัจจัยเหล่านี้ก่อน
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50/50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2 text-green-900">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold">2</span>
                            ทำนายราคาทองด้วย ARIMAX
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-700 space-y-2">
                        <p className="font-medium text-green-900">นำปัจจัยที่ทำนายได้มารวมกับ:</p>
                        <ul className="space-y-1 ml-4 text-xs">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>ราคาทองย้อนหลัง (Historical Data)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>ปัจจัยภายนอกที่ทำนายไว้ (External Factors)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span><strong>RSI</strong> - วัดแรงซื้อแรงขาย</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span><strong>MACD/Signal</strong> - ดูแนวโน้มกำลังกลับตัว</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span><strong>Rolling Mean</strong> - ค่าเฉลี่ยเคลื่อนที่</span>
                            </li>
                        </ul>
                        <p className="text-xs text-slate-600 mt-2 italic">
                            ทำนายทีละ step แล้ว feed ค่า Predicted กลับเข้าโมเดล (Strict Walk-Forward)
                        </p>
                    </CardContent>
                </Card>
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
