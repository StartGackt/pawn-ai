"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, AlertTriangle, CheckCircle2, Activity } from "lucide-react";

const predictionData = [
    { date: "1 ม.ค.", actual: 32500, predicted: 32480 },
    { date: "2 ม.ค.", actual: 32650, predicted: 32600 },
    { date: "3 ม.ค.", actual: 32800, predicted: 32750 },
    { date: "4 ม.ค.", actual: 32950, predicted: 32900 },
    { date: "5 ม.ค.", actual: 33100, predicted: 33050 },
    { date: "6 ม.ค.", actual: null, predicted: 33200 },
    { date: "7 ม.ค.", actual: null, predicted: 33350 },
    { date: "8 ม.ค.", actual: null, predicted: 33500 },
    { date: "9 ม.ค.", actual: null, predicted: 33400 },
    { date: "10 ม.ค.", actual: null, predicted: 33300 },
];

const modelPerformance = [
    {
        name: "LSTM Deep Learning",
        accuracy: 94.5,
        mae: 45.2,
        rmse: 58.3,
        status: "active",
        lastTrained: "2025-01-15",
    },
    {
        name: "Prophet",
        accuracy: 92.8,
        mae: 62.5,
        rmse: 78.1,
        status: "active",
        lastTrained: "2025-01-15",
    },
    {
        name: "ARIMA",
        accuracy: 89.3,
        mae: 85.3,
        rmse: 102.4,
        status: "backup",
        lastTrained: "2025-01-10",
    },
];

export default function PredictionsOverviewPage() {
    const [predictionHorizon, setPredictionHorizon] = React.useState("7days");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">ภาพรวมการคาดการณ์</h1>
                    <p className="text-muted-foreground">
                        ระบบคาดการณ์อัจฉริยะด้วย Machine Learning
                    </p>
                </div>
                <Select value={predictionHorizon} onValueChange={setPredictionHorizon}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="ช่วงเวลาคาดการณ์" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="3days">3 วัน</SelectItem>
                        <SelectItem value="7days">7 วัน</SelectItem>
                        <SelectItem value="14days">14 วัน</SelectItem>
                        <SelectItem value="30days">30 วัน</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* System Status */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">สถานะระบบ</CardTitle>
                        <Activity className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">ทำงานปกติ</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            อัปเดตล่าสุด: 5 นาทีที่แล้ว
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ความแม่นยำเฉลี่ย</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92.2%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            จากทุกโมเดล
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">โมเดลที่ใช้งาน</CardTitle>
                        <TrendingUp className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2/3</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            โมเดลหลัก
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">คำเตือน</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">0</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            ไม่มีคำเตือน
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Predictions Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
                    <TabsTrigger value="models">โมเดล</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                    {/* Prediction Chart */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>การคาดการณ์ราคาทอง (7 วันข้างหน้า)</CardTitle>
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                    ความแม่นยำ 94.5%
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={predictionData}>
                                        <defs>
                                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
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
                                            domain={[32000, 34000]}
                                            tickFormatter={(value) => `฿${(value / 1000).toFixed(1)}k`}
                                        />
                                        <Tooltip
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="rounded-lg border bg-background p-3 shadow-sm">
                                                            <div className="grid gap-2">
                                                                <div className="font-medium">{payload[0].payload.date}</div>
                                                                {payload[0].payload.actual && (
                                                                    <div className="flex flex-col">
                                                                        <span className="text-xs text-muted-foreground">ราคาจริง</span>
                                                                        <span className="font-bold text-primary">
                                                                            ฿{payload[0].payload.actual?.toLocaleString()}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                <div className="flex flex-col">
                                                                    <span className="text-xs text-muted-foreground">ราคาคาดการณ์</span>
                                                                    <span className="font-bold text-green-600">
                                                                        ฿{payload[0].payload.predicted?.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="actual"
                                            stroke="#3b82f6"
                                            fillOpacity={1}
                                            fill="url(#colorActual)"
                                            strokeWidth={2}
                                            name="ราคาจริง"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="predicted"
                                            stroke="#60a5fa"
                                            fillOpacity={1}
                                            fill="url(#colorPredicted)"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            name="คาดการณ์"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Predictions */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">การคาดการณ์ราคาทอง</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">วันนี้</span>
                                        <span className="font-medium">฿33,100</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">พรุ่งนี้</span>
                                        <span className="font-medium text-green-600">
                                            ฿33,200
                                            <TrendingUp className="inline ml-1 h-3 w-3" />
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">7 วันข้างหน้า</span>
                                        <span className="font-medium text-green-600">
                                            ฿33,300
                                            <TrendingUp className="inline ml-1 h-3 w-3" />
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">แนวโน้ม</span>
                                        <Badge variant="outline" className="text-green-600 border-green-600">
                                            เพิ่มขึ้น +0.6%
                                        </Badge>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-muted p-3">
                                    <p className="text-xs text-muted-foreground">
                                        💡 <strong>คำแนะนำ:</strong> ราคาทองคำมีแนวโน้มเพิ่มขึ้นเล็กน้อยในช่วง 7 วันข้างหน้า
                                        เหมาะสำหรับการรับจำนำ
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">การคาดการณ์ทรัพย์หลุดจำนำ</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">เดือนนี้</span>
                                        <span className="font-medium">120 รายการ</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">เดือนหน้า</span>
                                        <span className="font-medium text-orange-600">
                                            135 รายการ
                                            <TrendingUp className="inline ml-1 h-3 w-3" />
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">มูลค่ารวม</span>
                                        <span className="font-medium">฿8.2M</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">แนวโน้ม</span>
                                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                                            เพิ่มขึ้น +12.5%
                                        </Badge>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-muted p-3">
                                    <p className="text-xs text-muted-foreground">
                                        ⚠️ <strong>แจ้งเตือน:</strong> คาดการณ์ทรัพย์หลุดจำนำจะเพิ่มขึ้นในเดือนหน้า
                                        ควรเตรียมการจัดการสินค้า
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="models" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>โมเดล Machine Learning ที่ใช้งาน</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {modelPerformance.map((model, index) => (
                                    <div key={index} className="rounded-lg border p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold">{model.name}</h3>
                                                <Badge
                                                    variant={model.status === "active" ? "default" : "outline"}
                                                    className={model.status === "active" ? "bg-green-500" : ""}
                                                >
                                                    {model.status === "active" ? "ใช้งานอยู่" : "สำรอง"}
                                                </Badge>
                                            </div>
                                            <Button size="sm" variant="outline">
                                                ดูรายละเอียด
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <p className="text-muted-foreground text-xs mb-1">ความแม่นยำ</p>
                                                <p className="font-bold text-lg">{model.accuracy}%</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs mb-1">MAE</p>
                                                <p className="font-medium">{model.mae}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs mb-1">RMSE</p>
                                                <p className="font-medium">{model.rmse}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs mb-1">อัปเดตล่าสุด</p>
                                                <p className="font-medium text-xs">{model.lastTrained}</p>
                                            </div>
                                        </div>

                                        {/* Performance Bar */}
                                        <div className="mt-3">
                                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: `${model.accuracy}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">คุณสมบัติโมเดล</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">LSTM Deep Learning</h4>
                                    <p className="text-xs text-muted-foreground">
                                        โมเดลหลัก ใช้ข้อมูล 3 ปี เหมาะกับ time series ที่มีความซับซ้อน
                                    </p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">Prophet</h4>
                                    <p className="text-xs text-muted-foreground">
                                        โมเดลรอง จับ seasonality ได้ดี เหมาะกับการคาดการณ์ระยะยาว
                                    </p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">ARIMA</h4>
                                    <p className="text-xs text-muted-foreground">
                                        โมเดลสำรอง ใช้เมื่อข้อมูลมีรูปแบบ linear มากกว่า non-linear
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">กำหนดการอัปเดต</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-lg border">
                                    <div>
                                        <p className="font-medium text-sm">การเทรนโมเดล</p>
                                        <p className="text-xs text-muted-foreground">ทุกวันอาทิตย์ 02:00 น.</p>
                                    </div>
                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                        ตามกำหนด
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg border">
                                    <div>
                                        <p className="font-medium text-sm">การอัปเดตข้อมูล</p>
                                        <p className="text-xs text-muted-foreground">ทุก 1 ชั่วโมง</p>
                                    </div>
                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                        ตามกำหนด
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg border">
                                    <div>
                                        <p className="font-medium text-sm">การตรวจสอบประสิทธิภาพ</p>
                                        <p className="text-xs text-muted-foreground">ทุกวัน 00:00 น.</p>
                                    </div>
                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                        <CheckCircle2 className="mr-1 h-3 w-3" />
                                        ตามกำหนด
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
