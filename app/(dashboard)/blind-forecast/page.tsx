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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    Area,
    AreaChart,
    Bar,
    BarChart
} from "recharts";
import {
    RefreshCw,
    BrainCircuit,
    Maximize2,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    Globe,
    Landmark,
    ArrowRight,
    Activity,
    Target,
    Zap,
    ChevronRight,
    Play,
    Pause,
    SkipForward,
    Clock,
    CheckCircle2,
    ArrowRightLeft,
    DollarSign,
    Percent,
    BarChart3,
    LineChart,
    Layers,
    Settings2,
    Info
} from "lucide-react";
import {
    generateMultiFrameData,
    MultiTimeframeData,
    PredictionDataPoint
} from "@/app/data/prediction-data";

// =============================================
// SAMPLE DATA FOR VISUALIZATION
// =============================================

// ข้อมูล External Factors (X7-X10)
const EXTERNAL_FACTORS_DATA = [
    { date: '01 Dec', x7_assoc: 42150, x8_usd: 34.85, x9_rate: 2.50, x10_global: 2045.20, x7_pred: null, x8_pred: null, x9_pred: null, x10_pred: null },
    { date: '02 Dec', x7_assoc: 42200, x8_usd: 34.92, x9_rate: 2.50, x10_global: 2048.50, x7_pred: null, x8_pred: null, x9_pred: null, x10_pred: null },
    { date: '03 Dec', x7_assoc: 42180, x8_usd: 34.88, x9_rate: 2.50, x10_global: 2052.30, x7_pred: null, x8_pred: null, x9_pred: null, x10_pred: null },
    { date: '04 Dec', x7_assoc: 42250, x8_usd: 34.95, x9_rate: 2.50, x10_global: 2058.80, x7_pred: null, x8_pred: null, x9_pred: null, x10_pred: null },
    { date: '05 Dec', x7_assoc: 42300, x8_usd: 35.02, x9_rate: 2.50, x10_global: 2062.40, x7_pred: null, x8_pred: null, x9_pred: null, x10_pred: null },
    { date: '06 Dec', x7_assoc: 42280, x8_usd: 34.98, x9_rate: 2.50, x10_global: 2055.60, x7_pred: null, x8_pred: null, x9_pred: null, x10_pred: null },
    { date: '07 Dec', x7_assoc: 42350, x8_usd: 35.05, x9_rate: 2.50, x10_global: 2068.90, x7_pred: null, x8_pred: null, x9_pred: null, x10_pred: null },
    // Predictions (future)
    { date: '08 Dec', x7_assoc: null, x8_usd: null, x9_rate: null, x10_global: null, x7_pred: 42400, x8_pred: 35.12, x9_pred: 2.50, x10_pred: 2072.50 },
    { date: '09 Dec', x7_assoc: null, x8_usd: null, x9_rate: null, x10_global: null, x7_pred: 42450, x8_pred: 35.18, x9_pred: 2.50, x10_pred: 2078.30 },
    { date: '10 Dec', x7_assoc: null, x8_usd: null, x9_rate: null, x10_global: null, x7_pred: 42380, x8_pred: 35.08, x9_pred: 2.50, x10_pred: 2065.80 },
];

// ข้อมูล Technical Indicators
const TECHNICAL_INDICATORS_DATA = [
    { date: '01 Dec', price: 42150, rsi: 52, macd: 120, signal: 95, rolling_mean: 42050 },
    { date: '02 Dec', price: 42200, rsi: 55, macd: 135, signal: 105, rolling_mean: 42080 },
    { date: '03 Dec', price: 42180, rsi: 54, macd: 128, signal: 112, rolling_mean: 42100 },
    { date: '04 Dec', price: 42250, rsi: 58, macd: 145, signal: 120, rolling_mean: 42150 },
    { date: '05 Dec', price: 42300, rsi: 62, macd: 160, signal: 130, rolling_mean: 42180 },
    { date: '06 Dec', price: 42280, rsi: 60, macd: 155, signal: 138, rolling_mean: 42210 },
    { date: '07 Dec', price: 42350, rsi: 65, macd: 175, signal: 148, rolling_mean: 42250 },
];

// Walk-Forward Steps Data
const WALK_FORWARD_STEPS = [
    { step: 1, date: '08 Dec', actual: null, predicted: 42420, confidence_low: 42280, confidence_high: 42560, error: null },
    { step: 2, date: '09 Dec', actual: null, predicted: 42480, confidence_low: 42300, confidence_high: 42660, error: null },
    { step: 3, date: '10 Dec', actual: null, predicted: 42390, confidence_low: 42180, confidence_high: 42600, error: null },
    { step: 4, date: '11 Dec', actual: null, predicted: 42520, confidence_low: 42280, confidence_high: 42760, error: null },
    { step: 5, date: '12 Dec', actual: null, predicted: 42610, confidence_low: 42340, confidence_high: 42880, error: null },
];

// Model Performance Metrics
const MODEL_METRICS = {
    xgboost: {
        mae: 45.2,
        rmse: 62.8,
        mape: 0.12,
        r2: 0.94
    },
    sarimax: {
        mae: 185.5,
        rmse: 245.3,
        mape: 0.44,
        r2: 0.89,
        aic: 1245.6,
        bic: 1298.4
    }
};

// =============================================
// CUSTOM COMPONENTS
// =============================================

// Custom Cross Marker for Blind Forecast
const CustomCross = (props: { cx?: number; cy?: number; stroke?: string; strokeWidth?: number }) => {
    const { cx, cy, stroke, strokeWidth } = props;
    if (cx === undefined || cy === undefined) return null;
    const r = 5;
    return (
        <g stroke={stroke} strokeWidth={strokeWidth || 2}>
            <line x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} />
            <line x1={cx + r} y1={cy - r} x2={cx - r} y2={cy + r} />
        </g>
    );
};

// Forecast Chart Component
const ForecastChart = ({ title, mae, data, lastHistoryPrice }: {
    title: string;
    mae: string;
    data: PredictionDataPoint[];
    lastHistoryPrice: number;
}) => {
    return (
        <Card className="border-slate-200 shadow-sm">
            <CardHeader className="py-3 px-4 border-b bg-slate-50/50">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                        {title}
                        <Badge variant="secondary" className="text-xs bg-slate-200 text-slate-700">
                            MAE: {mae}
                        </Badge>
                    </CardTitle>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Maximize2 className="h-3 w-3 text-slate-400" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="h-[220px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={true} className="stroke-slate-100" />
                            <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} interval="preserveStartEnd" />
                            <YAxis domain={['auto', 'auto']} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `${val.toLocaleString()}`} />
                            <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px', border: '1px solid #e2e8f0' }}
                                formatter={(value: string | number | (string | number)[], name: string) => {
                                    if (!value) return [];
                                    const val = Number(value).toLocaleString();
                                    if (name === 'historyPrice') return [val, 'ประวัติ'];
                                    if (name === 'actualPrice') return [val, 'จริง'];
                                    if (name === 'predictedPrice') return [val, 'ทำนาย'];
                                    return [val, name];
                                }}
                            />
                            <Legend iconType="plainline" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                            <Line type="monotone" dataKey="historyPrice" stroke="#94a3b8" strokeWidth={1.5} dot={false} name="ประวัติ" connectNulls={false} />
                            <Line type="monotone" dataKey="actualPrice" stroke="#16a34a" strokeWidth={2} dot={{ r: 3, fill: '#16a34a', strokeWidth: 0 }} name="ราคาจริง" connectNulls={true} />
                            <Line type="monotone" dataKey="predictedPrice" stroke="transparent" strokeWidth={0} dot={<CustomCross stroke="#dc2626" strokeWidth={2} />} name="ทำนาย (Blind)" isAnimationActive={false} />
                            <ReferenceLine y={lastHistoryPrice} stroke="#64748b" strokeDasharray="3 3" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

// =============================================
// MAIN COMPONENT
// =============================================
export default function BlindForecastPage() {
    const [predictionData, setPredictionData] = useState<MultiTimeframeData | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [timeframe, setTimeframe] = useState("daily");

    useEffect(() => {
        setPredictionData(generateMultiFrameData());
    }, []);

    const handleRegenerate = () => {
        setIsSimulating(true);
        setTimeout(() => {
            setPredictionData(generateMultiFrameData());
            setIsSimulating(false);
        }, 800);
    };

    const handleNextStep = () => {
        if (activeStep < WALK_FORWARD_STEPS.length - 1) {
            setActiveStep(prev => prev + 1);
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 min-h-screen bg-slate-50/30">
            {/* =============================================
                HEADER SECTION 
            ============================================= */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 bg-white p-6 rounded-xl shadow-sm border-slate-100">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            <BrainCircuit className="mr-1 h-3 w-3" />
                            AI Prediction Model
                        </Badge>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                            Strict Walk-Forward
                        </Badge>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        ทำนายราคาทองแบบ Blind (Strict Walk Forward)
                    </h1>
                    <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                        มองเห็นเฉพาะอดีต → ทำนายอนาคตทีละวัน โดยไม่แอบดูข้อมูลอนาคตจริงเลย
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Select value={timeframe} onValueChange={setTimeframe}>
                        <SelectTrigger className="w-[140px]">
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="daily">รายวัน</SelectItem>
                            <SelectItem value="weekly">รายสัปดาห์</SelectItem>
                            <SelectItem value="monthly">รายเดือน</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isSimulating}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${isSimulating ? "animate-spin" : ""}`} />
                        Update Model
                    </Button>
                </div>
            </div>

            {/* =============================================
                MODEL ARCHITECTURE OVERVIEW
            ============================================= */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600">
                        <Layers className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            สถาปัตยกรรมโมเดล (Model Architecture)
                        </h2>
                        <p className="text-sm text-slate-500">3 โมดูลหลักทำงานร่วมกัน</p>
                    </div>
                </div>

                {/* Architecture Flow */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Module 1: XGBoost */}
                    <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-bl-full opacity-50"></div>
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500 text-white text-sm font-bold">1</div>
                                <CardTitle className="text-base text-blue-900">XGBoost</CardTitle>
                            </div>
                            <CardDescription className="text-blue-700">ทำนายค่า External Factors (X7–X10)</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span><strong>X10:</strong> ราคาทองตลาดโลก</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span><strong>X8:</strong> ค่าเงินดอลลาร์ USD/THB</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span><strong>X9:</strong> อัตราดอกเบี้ย</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span><strong>X7:</strong> ราคาทองใกล้เคียง</span>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-blue-100">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-blue-600">MAE</span>
                                    <span className="font-bold text-blue-800">{MODEL_METRICS.xgboost.mae}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-blue-600">R²</span>
                                    <span className="font-bold text-blue-800">{MODEL_METRICS.xgboost.r2}</span>
                                </div>
                            </div>
                        </CardContent>
                        <div className="absolute bottom-4 right-4">
                            <ChevronRight className="h-6 w-6 text-blue-300" />
                        </div>
                    </Card>

                    {/* Module 2: SARIMAX */}
                    <Card className="border-green-200 bg-linear-to-br from-green-50 to-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-bl-full opacity-50"></div>
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500 text-white text-sm font-bold">2</div>
                                <CardTitle className="text-base text-green-900">SARIMAX (ARIMAX)</CardTitle>
                            </div>
                            <CardDescription className="text-green-700">ทำนายราคาทอง + Technical Indicators</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>ราคาทองย้อนหลัง (Historical)</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span><strong>RSI</strong> - วัดแรงซื้อแรงขาย</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span><strong>MACD/Signal</strong> - แนวโน้มกลับตัว</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span><strong>Rolling Mean</strong> - ค่าเฉลี่ยเคลื่อนที่</span>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-green-100">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-green-600">MAE</span>
                                    <span className="font-bold text-green-800">{MODEL_METRICS.sarimax.mae}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-green-600">AIC</span>
                                    <span className="font-bold text-green-800">{MODEL_METRICS.sarimax.aic}</span>
                                </div>
                            </div>
                        </CardContent>
                        <div className="absolute bottom-4 right-4">
                            <ChevronRight className="h-6 w-6 text-green-300" />
                        </div>
                    </Card>

                    {/* Module 3: Strict Walk-Forward */}
                    <Card className="border-amber-200 bg-linear-to-br from-amber-50 to-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-100 rounded-bl-full opacity-50"></div>
                        <CardHeader className="pb-2">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500 text-white text-sm font-bold">3</div>
                                <CardTitle className="text-base text-amber-900">Strict Walk-Forward</CardTitle>
                            </div>
                            <CardDescription className="text-amber-700">ทำนายทีละ step แบบ Blind</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-slate-600">
                                    <SkipForward className="h-4 w-4 text-amber-500" />
                                    <span>ทำนายทีละ 1 step</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <RefreshCw className="h-4 w-4 text-amber-500" />
                                    <span>Feed Predicted กลับเข้าโมเดล</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600">
                                    <AlertCircle className="h-4 w-4 text-amber-500" />
                                    <span>ไม่แอบดูข้อมูลอนาคต</span>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-amber-100">
                                <div className="p-2 bg-amber-100 rounded-lg text-xs text-amber-800">
                                    <strong>สำคัญ:</strong> ป้องกัน Data Leakage 100%
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Flow Diagram */}
                <Card className="border-slate-200">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                            <Activity className="h-5 w-5 text-indigo-500" />
                            Data Flow Pipeline
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-center justify-center gap-2 py-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                                <Globe className="h-4 w-4 text-slate-600" />
                                <span className="text-sm font-medium">Historical Data</span>
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-400" />
                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-lg">
                                <Zap className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-800">XGBoost (X7-X10)</span>
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-400" />
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-lg">
                                <LineChart className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium text-green-800">SARIMAX + Tech</span>
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-400" />
                            <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-lg">
                                <Target className="h-4 w-4 text-amber-600" />
                                <span className="text-sm font-medium text-amber-800">Walk-Forward</span>
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-400" />
                            <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg">
                                <TrendingUp className="h-4 w-4 text-purple-600" />
                                <span className="text-sm font-medium text-purple-800">Prediction</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* =============================================
                STEP 1: EXTERNAL FACTORS PREDICTION
            ============================================= */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 text-blue-600">
                        <span className="font-bold">1</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            🟦 ขั้นตอนที่ 1: ทำนายปัจจัยภายนอก (X7–X10)
                        </h2>
                        <p className="text-sm text-slate-500">ใช้ XGBoost/AutoReg เดาค่าปัจจัยภายนอกก่อนทำนายราคาทอง</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* X10: Global Gold Price */}
                    <Card className="border-slate-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                <Globe className="h-4 w-4 text-sky-500" />
                                X10: ราคาทองตลาดโลก (XAU/USD)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={EXTERNAL_FACTORS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100" />
                                        <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis domain={['auto', 'auto']} fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px' }} />
                                        <Line type="monotone" dataKey="x10_global" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} name="จริง" connectNulls={false} />
                                        <Line type="monotone" dataKey="x10_pred" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={<CustomCross stroke="#ef4444" />} name="ทำนาย" connectNulls={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* X8: USD/THB */}
                    <Card className="border-slate-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                <ArrowRightLeft className="h-4 w-4 text-blue-500" />
                                X8: อัตราแลกเปลี่ยน USD/THB
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={EXTERNAL_FACTORS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100" />
                                        <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis domain={['auto', 'auto']} fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px' }} />
                                        <Line type="monotone" dataKey="x8_usd" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="จริง" connectNulls={false} />
                                        <Line type="monotone" dataKey="x8_pred" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={<CustomCross stroke="#ef4444" />} name="ทำนาย" connectNulls={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary of Predicted Factors */}
                <Card className="border-blue-200 bg-blue-50/30">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Info className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-800">ค่าปัจจัยที่ทำนายได้ (สำหรับวันถัดไป)</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg p-3 border border-blue-100">
                                <p className="text-xs text-blue-600">X10: ทองโลก</p>
                                <p className="text-lg font-bold text-blue-900">$2,072.50</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-blue-100">
                                <p className="text-xs text-blue-600">X8: USD/THB</p>
                                <p className="text-lg font-bold text-blue-900">35.12</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-blue-100">
                                <p className="text-xs text-blue-600">X9: ดอกเบี้ย</p>
                                <p className="text-lg font-bold text-blue-900">2.50%</p>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-blue-100">
                                <p className="text-xs text-blue-600">X7: ทองสมาคม</p>
                                <p className="text-lg font-bold text-blue-900">42,400</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* =============================================
                STEP 2: SARIMAX + TECHNICAL INDICATORS
            ============================================= */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-green-100 text-green-600">
                        <span className="font-bold">2</span>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            🟩 ขั้นตอนที่ 2: ทำนายราคาทองด้วย SARIMAX + Technical Indicators
                        </h2>
                        <p className="text-sm text-slate-500">รวมข้อมูลราคาย้อนหลัง + ปัจจัยภายนอก + ตัวชี้วัดทางเทคนิค</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* RSI Chart */}
                    <Card className="border-slate-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                <Activity className="h-4 w-4 text-purple-500" />
                                RSI (Relative Strength Index)
                            </CardTitle>
                            <CardDescription className="text-xs">วัดแรงซื้อแรงขาย (0-100)</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[180px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={TECHNICAL_INDICATORS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100" />
                                        <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis domain={[0, 100]} fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px' }} />
                                        <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="3 3" />
                                        <ReferenceLine y={30} stroke="#22c55e" strokeDasharray="3 3" />
                                        <Area type="monotone" dataKey="rsi" stroke="#8b5cf6" fill="#ede9fe" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-between text-xs mt-2 px-2">
                                <span className="text-green-600">Oversold (&lt;30)</span>
                                <span className="text-slate-500">Neutral</span>
                                <span className="text-red-600">Overbought (&gt;70)</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* MACD Chart */}
                    <Card className="border-slate-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-indigo-500" />
                                MACD & Signal Line
                            </CardTitle>
                            <CardDescription className="text-xs">ดูแนวโน้มกำลังกลับตัว</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[180px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={TECHNICAL_INDICATORS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100" />
                                        <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px' }} />
                                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                                        <Bar dataKey="macd" name="MACD" fill="#6366f1" radius={[2, 2, 0, 0]} />
                                        <Line type="monotone" dataKey="signal" name="Signal" stroke="#f59e0b" strokeWidth={2} dot={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rolling Mean */}
                    <Card className="border-slate-200">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-700 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                                Price vs Rolling Mean
                            </CardTitle>
                            <CardDescription className="text-xs">ค่าเฉลี่ยเคลื่อนที่ 7 วัน</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[180px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={TECHNICAL_INDICATORS_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100" />
                                        <XAxis dataKey="date" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis domain={['auto', 'auto']} fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ borderRadius: '6px', fontSize: '11px' }} />
                                        <Legend wrapperStyle={{ fontSize: '10px' }} />
                                        <Line type="monotone" dataKey="price" name="ราคา" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                                        <Line type="monotone" dataKey="rolling_mean" name="MA(7)" stroke="#f97316" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Current Technical Summary */}
                <Card className="border-green-200 bg-green-50/30">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800">สรุป Technical Indicators ล่าสุด</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg p-3 border border-green-100">
                                <p className="text-xs text-green-600">RSI</p>
                                <p className="text-lg font-bold text-green-900">65</p>
                                <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200 mt-1">Neutral-High</Badge>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-green-100">
                                <p className="text-xs text-green-600">MACD</p>
                                <p className="text-lg font-bold text-green-900">175</p>
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 mt-1">Bullish</Badge>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-green-100">
                                <p className="text-xs text-green-600">Signal</p>
                                <p className="text-lg font-bold text-green-900">148</p>
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 mt-1">Above</Badge>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-green-100">
                                <p className="text-xs text-green-600">แนวโน้ม</p>
                                <p className="text-lg font-bold text-green-700 flex items-center gap-1">
                                    <TrendingUp className="h-4 w-4" /> ขาขึ้น
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* =============================================
                WALK-FORWARD PREDICTION RESULTS
            ============================================= */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 text-amber-600">
                        <Target className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            ผลการทำนายแบบ Strict Walk-Forward
                        </h2>
                        <p className="text-sm text-slate-500">ทำนายทีละ step โดยไม่แอบดูข้อมูลอนาคต</p>
                    </div>
                </div>

                {/* Walk-Forward Steps */}
                <Card className="border-slate-200">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                                <SkipForward className="h-5 w-5 text-amber-500" />
                                Walk-Forward Steps
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => setActiveStep(0)}>
                                    Reset
                                </Button>
                                <Button size="sm" onClick={handleNextStep} disabled={activeStep >= WALK_FORWARD_STEPS.length - 1}>
                                    <Play className="mr-1 h-4 w-4" />
                                    Next Step
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-2 px-3 text-slate-500 font-medium">Step</th>
                                        <th className="text-left py-2 px-3 text-slate-500 font-medium">วันที่</th>
                                        <th className="text-right py-2 px-3 text-slate-500 font-medium">ราคาทำนาย</th>
                                        <th className="text-right py-2 px-3 text-slate-500 font-medium">Confidence (95%)</th>
                                        <th className="text-center py-2 px-3 text-slate-500 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {WALK_FORWARD_STEPS.map((step, index) => (
                                        <tr key={step.step} className={`border-b ${index <= activeStep ? 'bg-amber-50' : ''}`}>
                                            <td className="py-3 px-3">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index <= activeStep ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                        {step.step}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-3 font-medium text-slate-700">{step.date}</td>
                                            <td className="py-3 px-3 text-right">
                                                <span className={`font-bold ${index <= activeStep ? 'text-amber-700' : 'text-slate-400'}`}>
                                                    {index <= activeStep ? `฿${step.predicted.toLocaleString()}` : '—'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3 text-right text-xs text-slate-500">
                                                {index <= activeStep ? `${step.confidence_low.toLocaleString()} - ${step.confidence_high.toLocaleString()}` : '—'}
                                            </td>
                                            <td className="py-3 px-3 text-center">
                                                {index < activeStep ? (
                                                    <Badge className="bg-green-100 text-green-700">Complete</Badge>
                                                ) : index === activeStep ? (
                                                    <Badge className="bg-amber-100 text-amber-700">Current</Badge>
                                                ) : (
                                                    <Badge variant="outline" className="text-slate-400">Pending</Badge>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Final Prediction Charts */}
                {predictionData && (
                    <div className="space-y-4">
                        <h3 className="text-base font-semibold text-slate-700 flex items-center gap-2">
                            <LineChart className="h-5 w-5 text-purple-500" />
                            ผลการทำนาย Multi-Timeframe
                        </h3>
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                            <ForecastChart
                                title={predictionData.daily.title}
                                mae={predictionData.daily.mae}
                                data={predictionData.daily.data}
                                lastHistoryPrice={predictionData.daily.lastHistoryPrice}
                            />
                            <ForecastChart
                                title={predictionData.weekly.title}
                                mae={predictionData.weekly.mae}
                                data={predictionData.weekly.data}
                                lastHistoryPrice={predictionData.weekly.lastHistoryPrice}
                            />
                            <ForecastChart
                                title={predictionData.monthly.title}
                                mae={predictionData.monthly.mae}
                                data={predictionData.monthly.data}
                                lastHistoryPrice={predictionData.monthly.lastHistoryPrice}
                            />
                        </div>
                    </div>
                )}
            </section>

            {/* =============================================
                KEY INSIGHTS
            ============================================= */}
            <section>
                <Card className="border-slate-200">
                    <CardHeader>
                        <CardTitle className="text-base text-slate-700 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-indigo-500" />
                            สรุปข้อมูลเชิงลึก (Key Insights)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Globe className="h-5 w-5 text-blue-600" />
                                    <span className="font-semibold text-blue-800">ปัจจัยหลัก</span>
                                </div>
                                <p className="text-sm text-blue-700">
                                    ราคาทองตลาดโลก (X10) มีอิทธิพลสูงสุดต่อราคาทองไทย โดยมี correlation &gt; 0.95
                                </p>
                            </div>
                            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                    <span className="font-semibold text-green-800">แนวโน้ม</span>
                                </div>
                                <p className="text-sm text-green-700">
                                    RSI อยู่ที่ 65 และ MACD เป็นบวก บ่งชี้แนวโน้มขาขึ้นระยะสั้น แต่ใกล้โซน Overbought
                                </p>
                            </div>
                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="h-5 w-5 text-amber-600" />
                                    <span className="font-semibold text-amber-800">ข้อควรระวัง</span>
                                </div>
                                <p className="text-sm text-amber-700">
                                    Strict Walk-Forward มีความแม่นยำลดลงเมื่อทำนายไกลขึ้น ควรใช้ร่วมกับการวิเคราะห์อื่น
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
