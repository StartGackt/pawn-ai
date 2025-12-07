"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
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
    ReferenceLine,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from "recharts";
import {
    RefreshCw,
    BrainCircuit,
    Maximize2,
    Database,
    Server,
    TrendingUp,
    AlertCircle,
    Globe,
    FileText,
    Landmark
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

// Data for Analysis Charts
const ASSET_DISTRIBUTION_DATA = [
    { name: 'Gold', value: 75, color: '#eab308' }, // Yellow-500
    { name: 'Diamond', value: 10, color: '#0ea5e9' }, // Sky-500
    { name: 'Watches', value: 10, color: '#64748b' }, // Slate-500
    { name: 'Electronics', value: 5, color: '#94a3b8' }, // Slate-400
];

const REDEMPTION_DATA = [
    { month: 'Jun', redeemed: 85, default: 15 },
    { month: 'Jul', redeemed: 88, default: 12 },
    { month: 'Aug', redeemed: 82, default: 18 },
    { month: 'Sep', redeemed: 90, default: 10 },
    { month: 'Oct', redeemed: 87, default: 13 },
    { month: 'Nov', redeemed: 89, default: 11 },
];

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
        <div className="flex flex-col gap-8 p-6 min-h-screen bg-slate-50/30">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 bg-white p-6 rounded-lg shadow-sm border-slate-100">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <BrainCircuit className="mr-1 h-3 w-3" />
                            AI Prediction Model
                        </Badge>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        การทำนายราคาทองคำ & การบริหารความเสี่ยง
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                        Data-Driven Decision Making for Pawn Shops
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isSimulating}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isSimulating ? "animate-spin" : ""}`} />
                    Update Model
                </Button>
            </div>

            {/* Section 1: Data Sources (Data Collection & Preparation) */}
            <div className="grid gap-6 max-w-6xl mx-auto w-full">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Database className="h-5 w-5 text-indigo-500" />
                    1. Data Collection & Preparation (แหล่งข้อมูล)
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Domestic Data */}
                    <Card className="border-slate-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                <Landmark className="h-4 w-4" />
                                ข้อมูลภายในประเทศ (Domestic)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    สมาคมค้าทองคำ
                                </span>
                                <span className="text-slate-400 text-xs">API Connected</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    อัตราแลกเปลี่ยน (BOT)
                                </span>
                                <span className="text-slate-400 text-xs">Daily Update</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    ดอกเบี้ย & เงินเฟ้อ
                                </span>
                                <span className="text-slate-400 text-xs">Monthly</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Global Data */}
                    <Card className="border-slate-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                ข้อมูลตลาดโลก (Global Market)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    ราคาทองตลาดโลก (Spot)
                                </span>
                                <span className="text-slate-400 text-xs">Real-time</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    Global Forecast Indexes
                                </span>
                                <span className="text-slate-400 text-xs">Aggregated</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    FED Rates / USD Index
                                </span>
                                <span className="text-slate-400 text-xs">Live</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Internal Data */}
                    <Card className="border-slate-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                <Server className="h-4 w-4" />
                                ข้อมูลภายในองค์กร (Internal)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    ประวัติการรับจำนำ
                                </span>
                                <span className="text-slate-600 font-mono text-xs">124,502 Records</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    สถิติไถ่ถอน/หลุดจำนำ
                                </span>
                                <span className="text-slate-600 font-mono text-xs">Updated</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    ทรัพย์สินในครอบครอง
                                </span>
                                <span className="text-slate-600 font-mono text-xs">Live Stock</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Section 2: Data Analysis */}
            <div className="grid gap-6 max-w-6xl mx-auto w-full">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-500" />
                    2. Data Analysis (วิเคราะห์ข้อมูล)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Assets Distribution */}
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-base text-slate-700">ทรัพย์สินที่อยู่ในครอบครอง (Portfolio Mix)</CardTitle>
                            <CardDescription>สัดส่วนทองคำเทียบกับทรัพย์สินอื่น</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div className="h-[200px] w-1/2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={ASSET_DISTRIBUTION_DATA}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {ASSET_DISTRIBUTION_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="w-1/2 space-y-2">
                                {ASSET_DISTRIBUTION_DATA.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-slate-600">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-slate-800">{item.value}%</span>
                                    </div>
                                ))}
                                <div className="pt-2 border-t mt-2">
                                    <p className="text-xs text-slate-500">
                                        *ความเสี่ยงกระจุกตัวสูงที่ทองคำ (75%) จึงต้องมีระบบทำนายราคาที่แม่นยำ
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Redemption Trends */}
                    <Card className="border-slate-200">
                        <CardHeader>
                            <CardTitle className="text-base text-slate-700">แนวโน้มการไถ่ถอน vs หลุดจำนำ</CardTitle>
                            <CardDescription>วิเคราะห์พฤติกรรมลูกค้า 6 เดือนย้อนหลัง</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={REDEMPTION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-100" />
                                        <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={11} tickLine={false} axisLine={false} />
                                        <Tooltip 
                                            cursor={{ fill: '#f1f5f9' }}
                                            contentStyle={{ borderRadius: '6px', fontSize: '12px' }}
                                        />
                                        <Legend fontSize={10} wrapperStyle={{fontSize: '11px', paddingTop: '10px'}} />
                                        <Bar dataKey="redeemed" name="ไถ่ถอนคืน (Redeemed)" stackId="a" fill="#22c55e" radius={[0, 0, 4, 4]} />
                                        <Bar dataKey="default" name="หลุดจำนำ (Default)" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                             </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Section 3: Prediction Models */}
            <div className="grid gap-6 max-w-6xl mx-auto w-full">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                   <BrainCircuit className="h-5 w-5 text-indigo-500" />
                   3. Gold Price Prediction (การทำนายราครา)
                </h2>
                
                {/* Model Explanation Section */}
                <div className="grid md:grid-cols-2 gap-4 w-full">
                    <Card className="border-blue-200 bg-blue-50/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2 text-blue-900">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold">A</span>
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
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-green-200 bg-green-50/50">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2 text-green-900">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold">B</span>
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
                                    <span><strong>RSI</strong> - วัดแรงซื้อแรงขาย</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-0.5">✓</span>
                                    <span><strong>MACD/Signal</strong> - ดูแนวโน้มกำลังกลับตัว</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Area - 3 Stacked Charts */}
                <div className="w-full">
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
        </div>
    );
}
