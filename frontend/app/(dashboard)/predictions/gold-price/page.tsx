"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUp, TrendingDown, AlertCircle, Info, Download } from "lucide-react";

const goldPriceForecast = [
    { date: "01/01", actual: 32500, predicted: 32480, upper: 32650, lower: 32310 },
    { date: "02/01", actual: 32650, predicted: 32600, upper: 32780, lower: 32420 },
    { date: "03/01", actual: 32800, predicted: 32750, upper: 32950, lower: 32550 },
    { date: "04/01", actual: 32950, predicted: 32900, upper: 33120, lower: 32680 },
    { date: "05/01", actual: 33100, predicted: 33050, upper: 33280, lower: 32820 },
    { date: "06/01", actual: null, predicted: 33200, upper: 33450, lower: 32950 },
    { date: "07/01", actual: null, predicted: 33350, upper: 33620, lower: 33080 },
    { date: "08/01", actual: null, predicted: 33500, upper: 33790, lower: 33210 },
    { date: "09/01", actual: null, predicted: 33450, upper: 33760, lower: 33140 },
    { date: "10/01", actual: null, predicted: 33400, upper: 33730, lower: 33070 },
    { date: "11/01", actual: null, predicted: 33550, upper: 33900, lower: 33200 },
    { date: "12/01", actual: null, predicted: 33650, upper: 34020, lower: 33280 },
    { date: "13/01", actual: null, predicted: 33700, upper: 34090, lower: 33310 },
    { date: "14/01", actual: null, predicted: 33600, upper: 34010, lower: 33190 },
];

const factorsData = [
    { factor: "ราคาทองโลก", impact: 92, trend: "up" },
    { factor: "อัตราแลกเปลี่ยน USD/THB", impact: 85, trend: "up" },
    { factor: "อัตราดอกเบี้ย Fed", impact: 78, trend: "down" },
    { factor: "ความไม่แน่นอนทางการเมือง", impact: 65, trend: "neutral" },
    { factor: "อุปสงค์จีน-อินเดีย", impact: 72, trend: "up" },
];

export default function GoldPricePredictionPage() {
    const [timeHorizon, setTimeHorizon] = React.useState("14days");
    const [confidenceLevel, setConfidenceLevel] = React.useState("95");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">คาดการณ์ราคาทอง</h1>
                    <p className="text-muted-foreground">
                        พยากรณ์ราคาทองคำด้วย AI และ Machine Learning
                    </p>
                </div>
                <Button>
                    <Download className="mr-2 h-4 w-4" />
                    ส่งออกการคาดการณ์
                </Button>
            </div>

            {/* Configuration */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="ช่วงเวลาคาดการณ์" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7days">7 วัน</SelectItem>
                                <SelectItem value="14days">14 วัน</SelectItem>
                                <SelectItem value="30days">30 วัน</SelectItem>
                                <SelectItem value="90days">90 วัน</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="ระดับความเชื่อมั่น" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="80">80%</SelectItem>
                                <SelectItem value="90">90%</SelectItem>
                                <SelectItem value="95">95%</SelectItem>
                                <SelectItem value="99">99%</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Prediction Summary */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ราคาคาดการณ์ (14 วัน)</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">฿33,600</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            +฿500 (+1.5%) จากปัจจุบัน
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ช่วงความเชื่อมั่น 95%</CardTitle>
                        <Info className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿33,190 - ฿34,010</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            ช่วงราคาที่น่าจะเป็น
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ความแม่นยำโมเดล</CardTitle>
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94.5%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            MAE: ฿45.2, RMSE: ฿58.3
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">แนวโน้ม</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">ขาขึ้น</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            มีแนวโน้มเพิ่มขึ้นต่อเนื่อง
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Chart */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>การคาดการณ์ราคาทองคำ 14 วันข้างหน้า</CardTitle>
                        <div className="flex gap-2">
                            <Badge variant="outline">LSTM Model</Badge>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                                Accuracy: 94.5%
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[450px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={goldPriceForecast}>
                                <defs>
                                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--muted))" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="hsl(var(--muted))" stopOpacity={0.1} />
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
                                    domain={[32000, 34500]}
                                    tickFormatter={(value) => `฿${(value / 1000).toFixed(1)}k`}
                                />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-4 shadow-lg">
                                                    <div className="grid gap-2">
                                                        <div className="font-medium text-sm">{payload[0].payload.date}</div>
                                                        {payload[0].payload.actual && (
                                                            <div className="flex items-center justify-between gap-3">
                                                                <span className="text-xs text-muted-foreground">ราคาจริง:</span>
                                                                <span className="font-bold text-primary">
                                                                    ฿{payload[0].payload.actual?.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center justify-between gap-3">
                                                            <span className="text-xs text-muted-foreground">คาดการณ์:</span>
                                                            <span className="font-bold text-green-600">
                                                                ฿{payload[0].payload.predicted?.toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between gap-3">
                                                            <span className="text-xs text-muted-foreground">สูงสุด (95%):</span>
                                                            <span className="text-xs">
                                                                ฿{payload[0].payload.upper?.toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center justify-between gap-3">
                                                            <span className="text-xs text-muted-foreground">ต่ำสุด (95%):</span>
                                                            <span className="text-xs">
                                                                ฿{payload[0].payload.lower?.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="upper"
                                    stroke="transparent"
                                    fill="url(#colorConfidence)"
                                    name="ช่วงความเชื่อมั่น"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="lower"
                                    stroke="transparent"
                                    fill="hsl(var(--background))"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="actual"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    name="ราคาจริง"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="predicted"
                                    stroke="#60a5fa"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{ r: 4 }}
                                    name="ราคาคาดการณ์"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="factors" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="factors">ปัจจัย</TabsTrigger>
                    <TabsTrigger value="insights">ข้อมูลเชิงลึก</TabsTrigger>
                    <TabsTrigger value="scenarios">สถานการณ์</TabsTrigger>
                </TabsList>

                <TabsContent value="factors" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>ปัจจัยที่มีผลต่อราคาทอง</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {factorsData.map((factor, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{factor.factor}</span>
                                                {factor.trend === "up" && (
                                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                                )}
                                                {factor.trend === "down" && (
                                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                                )}
                                            </div>
                                            <span className="text-sm font-bold">{factor.impact}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${factor.impact >= 80 ? "bg-green-500" :
                                                    factor.impact >= 60 ? "bg-blue-500" :
                                                        "bg-amber-500"
                                                    }`}
                                                style={{ width: `${factor.impact}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="insights" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">📈 แนวโน้มที่สำคัญ</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">ราคาทองโลกเพิ่มขึ้น</h4>
                                    <p className="text-xs text-muted-foreground">
                                        COMEX Gold Futures ทำจุดสูงสุดใหม่ที่ $2,150/oz เนื่องจากความกังวลเศรษฐกิจโลก
                                    </p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">ค่าเงินบาทอ่อนค่า</h4>
                                    <p className="text-xs text-muted-foreground">
                                        USD/THB แตะ 35.50 ทำให้ราคาทองในประเทศปรับขึ้นตาม
                                    </p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">Fed คงอัตราดอกเบี้ย</h4>
                                    <p className="text-xs text-muted-foreground">
                                        การคงดอกเบี้ยไว้ที่ 5.25-5.50% ส่งผลดีต่อราคาทอง
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">💡 คำแนะนำ</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 p-3">
                                    <h4 className="font-medium text-sm mb-1 text-green-900 dark:text-green-100">
                                        เหมาะสมสำหรับการรับจำนำ
                                    </h4>
                                    <p className="text-xs text-green-700 dark:text-green-300">
                                        ราคาทองมีแนวโน้มเพิ่มขึ้น การรับจำนำในช่วงนี้มีความเสี่ยงต่ำ
                                    </p>
                                </div>
                                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                                    <h4 className="font-medium text-sm mb-1 text-blue-900 dark:text-blue-100">
                                        ควรปรับอัตราดอกเบี้ย
                                    </h4>
                                    <p className="text-xs text-blue-700 dark:text-blue-300">
                                        พิจารณาปรับอัตราดอกเบี้ยให้สอดคล้องกับราคาทองที่เพิ่มขึ้น
                                    </p>
                                </div>
                                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                                    <h4 className="font-medium text-sm mb-1 text-amber-900 dark:text-amber-100">
                                        ติดตามปัจจัยระหว่างประเทศ
                                    </h4>
                                    <p className="text-xs text-amber-700 dark:text-amber-300">
                                        ความไม่แน่นอนทางการเมืองโลกอาจส่งผลกระทบอย่างมาก
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="scenarios" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>สถานการณ์ที่อาจเกิดขึ้น (Scenario Analysis)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="rounded-lg border p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Badge variant="default" className="bg-green-500">แนวโน้มดี (60%)</Badge>
                                        <h3 className="font-semibold">Base Case</h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground text-xs mb-1">ราคา 7 วัน</p>
                                            <p className="font-bold text-green-600">฿33,450</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs mb-1">ราคา 14 วัน</p>
                                            <p className="font-bold text-green-600">฿33,600</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs mb-1">การเปลี่ยนแปลง</p>
                                            <p className="font-bold text-green-600">+1.5%</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-3">
                                        สมมุติฐาน: เศรษฐกิจโลกเติบโตตามคาด, Fed คงดอกเบี้ย, ไม่มีเหตุการณ์พิเศษ
                                    </p>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Badge variant="outline" className="border-green-500 text-green-600">
                                            แนวโน้มดีมาก (25%)
                                        </Badge>
                                        <h3 className="font-semibold">Bull Case</h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground text-xs mb-1">ราคา 7 วัน</p>
                                            <p className="font-bold text-green-600">฿34,200</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs mb-1">ราคา 14 วัน</p>
                                            <p className="font-bold text-green-600">฿34,500</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs mb-1">การเปลี่ยนแปลง</p>
                                            <p className="font-bold text-green-600">+4.2%</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-3">
                                        สมมุติฐาน: ความกังวลเศรษฐกิจโลกเพิ่มขึ้น, อุปสงค์ทองคำแข็งแกร่ง, ค่าเงินบาทอ่อนค่าต่อ
                                    </p>
                                </div>

                                <div className="rounded-lg border p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Badge variant="outline" className="border-red-500 text-red-600">
                                            แนวโน้มไม่ดี (15%)
                                        </Badge>
                                        <h3 className="font-semibold">Bear Case</h3>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground text-xs mb-1">ราคา 7 วัน</p>
                                            <p className="font-bold text-red-600">฿32,800</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs mb-1">ราคา 14 วัน</p>
                                            <p className="font-bold text-red-600">฿32,500</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-xs mb-1">การเปลี่ยนแปลง</p>
                                            <p className="font-bold text-red-600">-1.8%</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-3">
                                        สมมุติฐาน: Fed ขึ้นดอกเบี้ย, เศรษฐกิจโลกดีขึ้น, ความต้องการทองคำลดลง
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
