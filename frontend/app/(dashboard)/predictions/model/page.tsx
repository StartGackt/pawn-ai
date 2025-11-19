"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Legend,
    ReferenceLine,
} from "recharts";
import {
    TrendingUp,
    Activity,
    BarChart3,
    Calendar,
    Info,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

// ข้อมูลย้อนหลัง + คาดการณ์ 1-7 วัน
const dailyPrediction = [
    // ข้อมูลจริง (5 วันย้อนหลัง)
    { date: "15 พ.ย.", actual: 32100, predicted: null, lower: null, upper: null },
    { date: "16 พ.ย.", actual: 32050, predicted: null, lower: null, upper: null },
    { date: "17 พ.ย.", actual: 32200, predicted: null, lower: null, upper: null },
    { date: "18 พ.ย.", actual: 32350, predicted: null, lower: null, upper: null },
    { date: "19 พ.ย.", actual: 32500, predicted: null, lower: null, upper: null },
    // คาดการณ์ (7 วันข้างหน้า)
    { date: "20 พ.ย.", actual: null, predicted: 32650, lower: 32550, upper: 32750 },
    { date: "21 พ.ย.", actual: null, predicted: 32800, lower: 32650, upper: 32950 },
    { date: "22 พ.ย.", actual: null, predicted: 32950, lower: 32750, upper: 33150 },
    { date: "23 พ.ย.", actual: null, predicted: 33100, lower: 32850, upper: 33350 },
    { date: "24 พ.ย.", actual: null, predicted: 33250, lower: 32950, upper: 33550 },
    { date: "25 พ.ย.", actual: null, predicted: 33400, lower: 33050, upper: 33750 },
    { date: "26 พ.ย.", actual: null, predicted: 33550, lower: 33150, upper: 33950 },
];

// คาดการณ์ 1-4 สัปดาห์
const weeklyPrediction = [
    { week: "สัปดาห์ที่ 1", actual: 32300, predicted: null, lower: null, upper: null },
    { week: "สัปดาห์ที่ 2", actual: 32500, predicted: null, lower: null, upper: null },
    { week: "สัปดาห์ที่ 3", actual: null, predicted: 32900, lower: 32700, upper: 33100 },
    { week: "สัปดาห์ที่ 4", actual: null, predicted: 33300, lower: 33000, upper: 33600 },
    { week: "สัปดาห์ที่ 5", actual: null, predicted: 33700, lower: 33300, upper: 34100 },
    { week: "สัปดาห์ที่ 6", actual: null, predicted: 34100, lower: 33600, upper: 34600 },
];

// คาดการณ์ 1-3 เดือน
const monthlyPrediction = [
    { month: "ต.ค. 68", actual: 31800, predicted: null, lower: null, upper: null },
    { month: "พ.ย. 68", actual: 32500, predicted: null, lower: null, upper: null },
    { month: "ธ.ค. 68", actual: null, predicted: 33200, lower: 32800, upper: 33600 },
    { month: "ม.ค. 69", actual: null, predicted: 33900, lower: 33400, upper: 34400 },
    { month: "ก.พ. 69", actual: null, predicted: 34600, lower: 34000, upper: 35200 },
];

// ข้อมูล Model Performance
const modelMetrics = {
    daily: {
        model: "Prophet + Linear Regression",
        accuracy: 92.3,
        mae: 85.5,
        rmse: 120.8,
        r2: 0.89,
    },
    weekly: {
        model: "ARIMA + Moving Average",
        accuracy: 88.7,
        mae: 125.2,
        rmse: 180.5,
        r2: 0.84,
    },
    monthly: {
        model: "LSTM + Seasonal Decomposition",
        accuracy: 85.4,
        mae: 185.7,
        rmse: 245.3,
        r2: 0.79,
    },
};

// ข้อมูลที่ใช้ในการคาดการณ์
const dataSourcesInfo = [
    { name: "ราคาทองไทย", source: "สมาคมค้าทองคำไทย", status: "active", quality: "high" },
    { name: "ราคาทองโลก", source: "Yahoo Finance / Metals-API", status: "active", quality: "high" },
    { name: "อัตราแลกเปลี่ยน", source: "BOT Open Data API", status: "active", quality: "high" },
    { name: "CPI (เงินเฟ้อ)", source: "BOT Open Data API", status: "active", quality: "medium" },
    { name: "ข้อมูลจำลอง", source: "Excel Mock Data", status: "demo", quality: "medium" },
];

export default function PredictiveModelPage() {
    const [selectedHorizon, setSelectedHorizon] = React.useState("daily");

    const getCurrentMetrics = () => {
        switch (selectedHorizon) {
            case "daily": return modelMetrics.daily;
            case "weekly": return modelMetrics.weekly;
            case "monthly": return modelMetrics.monthly;
            default: return modelMetrics.daily;
        }
    };

    const metrics = getCurrentMetrics();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Predictive Model (สาธิต)</h1>
                <p className="text-muted-foreground">
                    โมเดลคาดการณ์ราคาทองคำ - แสดงความสามารถของระบบ (ไม่จำเป็นต้องแม่น 100%)
                </p>
            </div>

            {/* Demo Notice */}
            <Card className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                                📌 หมายเหตุ: นี่เป็นโมเดลสาธิตการทำงาน
                            </p>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                ใช้ Prophet, Linear Regression, ARIMA และข้อมูลฟรี (ราคาทองย้อนหลัง, อัตราแลกเปลี่ยน, CPI)
                                ไม่ต้อง train โมเดลใหญ่ แต่แสดงให้เห็นว่าระบบสามารถทำได้
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Model Selection */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <label className="text-sm font-medium">ช่วงเวลาคาดการณ์:</label>
                    <Select value={selectedHorizon} onValueChange={setSelectedHorizon}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="daily">1-7 วัน</SelectItem>
                            <SelectItem value="weekly">1-4 สัปดาห์</SelectItem>
                            <SelectItem value="monthly">1-3 เดือน</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Badge variant="outline" className="text-sm">
                    <Activity className="h-3 w-3 mr-1" />
                    Model: {metrics.model}
                </Badge>
            </div>

            {/* Model Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{metrics.accuracy}%</div>
                        <p className="text-xs text-muted-foreground mt-1">ความแม่นยำโดยรวม</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">MAE</CardTitle>
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿{metrics.mae.toFixed(1)}</div>
                        <p className="text-xs text-muted-foreground mt-1">ค่าเฉลี่ยความคลาดเคลื่อน</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">RMSE</CardTitle>
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿{metrics.rmse.toFixed(1)}</div>
                        <p className="text-xs text-muted-foreground mt-1">Root Mean Square Error</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">R² Score</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.r2.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground mt-1">คุณภาพการทำนาย</p>
                    </CardContent>
                </Card>
            </div>

            {/* Prediction Charts */}
            <Tabs value={selectedHorizon} onValueChange={setSelectedHorizon} className="w-full">
                <TabsList className="grid w-full max-w-2xl grid-cols-3">
                    <TabsTrigger value="daily">
                        <Calendar className="h-4 w-4 mr-2" />
                        1-7 วัน
                    </TabsTrigger>
                    <TabsTrigger value="weekly">
                        <Calendar className="h-4 w-4 mr-2" />
                        1-4 สัปดาห์
                    </TabsTrigger>
                    <TabsTrigger value="monthly">
                        <Calendar className="h-4 w-4 mr-2" />
                        1-3 เดือน
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="daily" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>คาดการณ์ราคาทองคำ 1-7 วันข้างหน้า</CardTitle>
                            <CardDescription>
                                ใช้ Prophet + Linear Regression | แถบสีฟ้า = ช่วงความเชื่อมั่น (Confidence Interval)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={dailyPrediction}>
                                        <defs>
                                            <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis
                                            dataKey="date"
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <YAxis
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            domain={['dataMin - 300', 'dataMax + 300']}
                                            tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
                                        />
                                        <Tooltip
                                            formatter={(value: number) => `฿${value?.toLocaleString() || 'N/A'}`}
                                            contentStyle={{
                                                backgroundColor: "hsl(var(--background))",
                                                border: "1px solid hsl(var(--border))",
                                                borderRadius: "8px"
                                            }}
                                        />
                                        <Legend />
                                        <ReferenceLine
                                            x="19 พ.ย."
                                            stroke="hsl(var(--border))"
                                            strokeDasharray="5 5"
                                            label={{ value: "วันนี้", position: "top" }}
                                        />
                                        {/* Support Level */}
                                        <ReferenceLine
                                            y={32000}
                                            stroke="#10b981"
                                            strokeDasharray="3 3"
                                            strokeWidth={1.5}
                                            label={{ value: "Support ฿32k", position: "left", fill: "#10b981", fontSize: 11 }}
                                        />
                                        {/* Resistance Level */}
                                        <ReferenceLine
                                            y={34000}
                                            stroke="#ef4444"
                                            strokeDasharray="3 3"
                                            strokeWidth={1.5}
                                            label={{ value: "Resistance ฿34k", position: "left", fill: "#ef4444", fontSize: 11 }}
                                        />
                                        {/* Confidence Interval */}
                                        <Area
                                            type="monotone"
                                            dataKey="upper"
                                            stroke="none"
                                            fill="#93c5fd"
                                            fillOpacity={0.2}
                                            name="Upper Bound"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="lower"
                                            stroke="none"
                                            fill="#93c5fd"
                                            fillOpacity={0.2}
                                            name="Lower Bound"
                                        />
                                        {/* Actual Data */}
                                        <Line
                                            type="monotone"
                                            dataKey="actual"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ fill: "#3b82f6", r: 5 }}
                                            name="ราคาจริง"
                                            connectNulls={false}
                                        />
                                        {/* Predicted Data */}
                                        <Line
                                            type="monotone"
                                            dataKey="predicted"
                                            stroke="#60a5fa"
                                            strokeWidth={3}
                                            strokeDasharray="5 5"
                                            dot={{ fill: "#60a5fa", r: 5 }}
                                            name="คาดการณ์"
                                            connectNulls={false}
                                        />
                                        {/* Trend Line */}
                                        <Line
                                            type="linear"
                                            dataKey="actual"
                                            stroke="#f59e0b"
                                            strokeWidth={2}
                                            strokeDasharray="8 4"
                                            dot={false}
                                            name="เส้นเทรนด์"
                                            connectNulls={true}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">สรุปการคาดการณ์</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">ราคาวันนี้:</span>
                                        <span className="font-semibold">฿32,500</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">คาดการณ์ 7 วัน:</span>
                                        <span className="font-semibold text-green-600">฿33,550</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">เปลี่ยนแปลง:</span>
                                        <Badge className="bg-green-500">
                                            <TrendingUp className="h-3 w-3 mr-1" />
                                            +3.23%
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Confidence:</span>
                                        <span className="text-xs text-muted-foreground">95%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                            <CardHeader>
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                    เทรนด์ขาขึ้น
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">Momentum:</span>
                                        <Badge className="bg-green-500 text-xs">แข็งแกร่ง</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">Volatility:</span>
                                        <span className="text-xs font-medium">ปานกลาง</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">Support:</span>
                                        <span className="text-xs font-medium text-green-600">฿32,000</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs">Resistance:</span>
                                        <span className="text-xs font-medium text-red-600">฿34,000</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm">ปัจจัยที่ใช้</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        <span>ราคาทองย้อนหลัง 30 วัน</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        <span>อัตราแลกเปลี่ยน USD/THB</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        <span>ราคาทองโลก (USD/oz)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                        <span>CPI (ข้อมูลล่าสุด)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <AlertCircle className="h-4 w-4 text-orange-500" />
                                        <span>Seasonality Pattern</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="weekly" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>คาดการณ์ราคาทองคำ 1-4 สัปดาห์ข้างหน้า</CardTitle>
                            <CardDescription>
                                ใช้ ARIMA + Moving Average | เหมาะสำหรับการวางแผนระยะกลาง
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={weeklyPrediction}>
                                        <defs>
                                            <linearGradient id="colorWeeklyConf" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis
                                            dataKey="week"
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <YAxis
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            domain={['dataMin - 500', 'dataMax + 500']}
                                            tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
                                        />
                                        <Tooltip formatter={(value: number) => `฿${value?.toLocaleString() || 'N/A'}`} />
                                        <Legend />
                                        <ReferenceLine
                                            x="สัปดาห์ที่ 2"
                                            stroke="hsl(var(--border))"
                                            strokeDasharray="5 5"
                                            label={{ value: "ปัจจุบัน", position: "top" }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="upper"
                                            stroke="none"
                                            fill="#93c5fd"
                                            fillOpacity={0.2}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="lower"
                                            stroke="none"
                                            fill="#93c5fd"
                                            fillOpacity={0.2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="actual"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ fill: "#3b82f6", r: 6 }}
                                            name="ราคาจริง"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="predicted"
                                            stroke="#60a5fa"
                                            strokeWidth={3}
                                            strokeDasharray="5 5"
                                            dot={{ fill: "#60a5fa", r: 6 }}
                                            name="คาดการณ์"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="monthly" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>คาดการณ์ราคาทองคำ 1-3 เดือนข้างหน้า</CardTitle>
                            <CardDescription>
                                ใช้ LSTM + Seasonal Decomposition | เหมาะสำหรับการวางแผนระยะยาว
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyPrediction}>
                                        <defs>
                                            <linearGradient id="colorMonthlyConf" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#93c5fd" stopOpacity={0.1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis
                                            dataKey="month"
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <YAxis
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            domain={['dataMin - 800', 'dataMax + 800']}
                                            tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
                                        />
                                        <Tooltip formatter={(value: number) => `฿${value?.toLocaleString() || 'N/A'}`} />
                                        <Legend />
                                        <ReferenceLine
                                            x="พ.ย. 68"
                                            stroke="hsl(var(--border))"
                                            strokeDasharray="5 5"
                                            label={{ value: "เดือนนี้", position: "top" }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="upper"
                                            stroke="none"
                                            fill="#93c5fd"
                                            fillOpacity={0.2}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="lower"
                                            stroke="none"
                                            fill="#93c5fd"
                                            fillOpacity={0.2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="actual"
                                            stroke="#3b82f6"
                                            strokeWidth={3}
                                            dot={{ fill: "#3b82f6", r: 7 }}
                                            name="ราคาจริง"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="predicted"
                                            stroke="#60a5fa"
                                            strokeWidth={3}
                                            strokeDasharray="5 5"
                                            dot={{ fill: "#60a5fa", r: 7 }}
                                            name="คาดการณ์"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Trend Analysis */}
            <Card>
                <CardHeader>
                    <CardTitle>การวิเคราะห์เทรนด์</CardTitle>
                    <CardDescription>
                        ตัวชี้วัดทางเทคนิคและสัญญาณการซื้อขาย
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                        <Card className="border-green-200">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium">Trend Direction</span>
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                </div>
                                <p className="text-2xl font-bold text-green-600">ขาขึ้น</p>
                                <p className="text-xs text-muted-foreground mt-1">Bullish Momentum</p>
                            </CardContent>
                        </Card>

                        <Card className="border-blue-200">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium">RSI (14)</span>
                                    <Activity className="h-4 w-4 text-blue-600" />
                                </div>
                                <p className="text-2xl font-bold text-blue-600">62.5</p>
                                <p className="text-xs text-muted-foreground mt-1">Neutral Zone</p>
                            </CardContent>
                        </Card>

                        <Card className="border-purple-200">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium">MACD</span>
                                    <BarChart3 className="h-4 w-4 text-purple-600" />
                                </div>
                                <p className="text-2xl font-bold text-green-600">+125</p>
                                <p className="text-xs text-muted-foreground mt-1">Bullish Signal</p>
                            </CardContent>
                        </Card>

                        <Card className="border-orange-200">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium">Volatility</span>
                                    <Activity className="h-4 w-4 text-orange-600" />
                                </div>
                                <p className="text-2xl font-bold text-orange-600">8.2%</p>
                                <p className="text-xs text-muted-foreground mt-1">Moderate</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-4 p-4 rounded-lg bg-muted/50">
                        <h4 className="text-sm font-semibold mb-3">สัญญาณการซื้อขาย</h4>
                        <div className="grid gap-2 md:grid-cols-3">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-xs">Moving Average: <span className="font-semibold text-green-600">Golden Cross</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-xs">Bollinger Bands: <span className="font-semibold text-green-600">ทะลุขึ้น</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 text-orange-500" />
                                <span className="text-xs">Stochastic: <span className="font-semibold text-orange-600">ใกล้ Overbought</span></span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Data Sources */}
            <Card>
                <CardHeader>
                    <CardTitle>แหล่งข้อมูลที่ใช้ในการคาดการณ์</CardTitle>
                    <CardDescription>
                        ข้อมูลฟรีและข้อมูลจำลอง - ไม่ต้อง train โมเดลใหญ่
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {dataSourcesInfo.map((source, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    {source.status === "active" ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <AlertCircle className="h-5 w-5 text-orange-500" />
                                    )}
                                    <div>
                                        <p className="font-medium text-sm">{source.name}</p>
                                        <p className="text-xs text-muted-foreground">{source.source}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant={source.status === "active" ? "default" : "secondary"}
                                        className="text-xs"
                                    >
                                        {source.status === "active" ? "ใช้งาน" : "สาธิต"}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className={`text-xs ${source.quality === "high" ? "border-green-500 text-green-600" :
                                            "border-orange-500 text-orange-600"
                                            }`}
                                    >
                                        {source.quality === "high" ? "คุณภาพสูง" : "คุณภาพปานกลาง"}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
