"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Download, TrendingUp, TrendingDown } from "lucide-react";

const branchComparisonData = [
    { branch: "สาขากลาง", pawns: 850, amount: 27500000, redemption: 85 },
    { branch: "สาขาเหนือ", pawns: 620, amount: 19800000, redemption: 78 },
    { branch: "สาขาใต้", pawns: 580, amount: 18500000, redemption: 82 },
    { branch: "สาขาตะวันออก", pawns: 720, amount: 23200000, redemption: 80 },
    { branch: "สาขาตะวันตก", pawns: 490, amount: 15600000, redemption: 76 },
];

const periodComparisonData = [
    { month: "ม.ค.", thisYear: 450, lastYear: 420 },
    { month: "ก.พ.", thisYear: 520, lastYear: 480 },
    { month: "มี.ค.", thisYear: 580, lastYear: 520 },
    { month: "เม.ย.", thisYear: 620, lastYear: 550 },
    { month: "พ.ค.", thisYear: 480, lastYear: 460 },
    { month: "มิ.ย.", thisYear: 510, lastYear: 490 },
    { month: "ก.ค.", thisYear: 550, lastYear: 500 },
    { month: "ส.ค.", thisYear: 590, lastYear: 530 },
    { month: "ก.ย.", thisYear: 570, lastYear: 520 },
    { month: "ต.ค.", thisYear: 610, lastYear: 560 },
    { month: "พ.ย.", thisYear: 650, lastYear: 580 },
];

const performanceRadarData = [
    { metric: "จำนวนจำนำ", สาขากลาง: 95, สาขาเหนือ: 70, สาขาใต้: 65 },
    { metric: "มูลค่า", สาขากลาง: 90, สาขาเหนือ: 65, สาขาใต้: 60 },
    { metric: "อัตราไถ่ถอน", สาขากลาง: 85, สาขาเหนือ: 78, สาขาใต้: 82 },
    { metric: "ประสิทธิภาพ", สาขากลาง: 92, สาขาเหนือ: 75, สาขาใต้: 70 },
    { metric: "ความพึงพอใจ", สาขากลาง: 88, สาขาเหนือ: 80, สาขาใต้: 85 },
];

export default function ComparisonPage() {
    const [comparisonType, setComparisonType] = React.useState("branch");
    const [selectedPeriod, setSelectedPeriod] = React.useState("monthly");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">เปรียบเทียบข้อมูล</h1>
                    <p className="text-muted-foreground">
                        วิเคราะห์เปรียบเทียบตามสาขา ช่วงเวลา และตัวชี้วัด
                    </p>
                </div>
                <Button>
                    <Download className="mr-2 h-4 w-4" />
                    ส่งออกรายงาน
                </Button>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex gap-4">
                        <Select value={comparisonType} onValueChange={setComparisonType}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="ประเภทการเปรียบเทียบ" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="branch">เปรียบเทียบสาขา</SelectItem>
                                <SelectItem value="period">เปรียบเทียบช่วงเวลา</SelectItem>
                                <SelectItem value="performance">ประสิทธิภาพ</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="ช่วงเวลา" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">รายวัน</SelectItem>
                                <SelectItem value="weekly">รายสัปดาห์</SelectItem>
                                <SelectItem value="monthly">รายเดือน</SelectItem>
                                <SelectItem value="yearly">รายปี</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Comparison Tabs */}
            <Tabs value={comparisonType} onValueChange={setComparisonType} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="branch">สาขา</TabsTrigger>
                    <TabsTrigger value="period">ช่วงเวลา</TabsTrigger>
                    <TabsTrigger value="performance">ประสิทธิภาพ</TabsTrigger>
                </TabsList>

                <TabsContent value="branch" className="space-y-4 mt-4">
                    {/* Branch Stats */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    สาขาที่มีจำนวนมากที่สุด
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">สาขากลาง</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    850 รายการ (+37% vs เฉลี่ย)
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    อัตราไถ่ถอนสูงสุด
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">สาขากลาง</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    85% (สูงกว่าเฉลี่ย 5%)
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    มูลค่ารวมสูงสุด
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">฿27.5M</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    สาขากลาง (+32% vs เฉลี่ย)
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Branch Comparison Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>เปรียบเทียบประสิทธิภาพแต่ละสาขา</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={branchComparisonData}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis
                                            dataKey="branch"
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <YAxis
                                            yAxisId="left"
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            tickFormatter={(value) => `฿${(value / 1000000).toFixed(0)}M`}
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Bar
                                            yAxisId="left"
                                            dataKey="pawns"
                                            fill="#3b82f6"
                                            name="จำนวนจำนำ"
                                            radius={[8, 8, 0, 0]}
                                        />
                                        <Bar
                                            yAxisId="right"
                                            dataKey="amount"
                                            fill="#60a5fa"
                                            name="มูลค่า (บาท)"
                                            radius={[8, 8, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Branch Details Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>รายละเอียดแต่ละสาขา</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-3 text-sm font-medium">สาขา</th>
                                            <th className="text-right p-3 text-sm font-medium">จำนวนจำนำ</th>
                                            <th className="text-right p-3 text-sm font-medium">มูลค่า</th>
                                            <th className="text-right p-3 text-sm font-medium">อัตราไถ่ถอน</th>
                                            <th className="text-right p-3 text-sm font-medium">เปรียบเทียบ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {branchComparisonData.map((branch, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="p-3 text-sm font-medium">{branch.branch}</td>
                                                <td className="p-3 text-sm text-right">{branch.pawns.toLocaleString()}</td>
                                                <td className="p-3 text-sm text-right">
                                                    ฿{branch.amount.toLocaleString()}
                                                </td>
                                                <td className="p-3 text-sm text-right">{branch.redemption}%</td>
                                                <td className="p-3 text-right">
                                                    {index === 0 ? (
                                                        <span className="inline-flex items-center text-xs text-green-600">
                                                            <TrendingUp className="h-3 w-3 mr-1" />
                                                            สูงสุด
                                                        </span>
                                                    ) : index === branchComparisonData.length - 1 ? (
                                                        <span className="inline-flex items-center text-xs text-red-600">
                                                            <TrendingDown className="h-3 w-3 mr-1" />
                                                            ต่ำสุด
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">ปานกลาง</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="period" className="space-y-4 mt-4">
                    {/* Period Comparison Stats */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    การเติบโต YoY
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">+12.1%</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    เปรียบเทียบกับปีที่แล้ว
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    เดือนที่ดีที่สุด
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">พฤศจิกายน</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    +12.1% vs ปีก่อน
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    ความสม่ำเสมอ
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">สูง</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    ส่วนเบี่ยงเบน ±8.5%
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Period Comparison Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>เปรียบเทียบปีนี้ vs ปีก่อน</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={periodComparisonData}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis
                                            dataKey="month"
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <YAxis
                                            className="text-xs"
                                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                                        />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="thisYear"
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            name="ปีนี้ (2025)"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="lastYear"
                                            stroke="hsl(var(--muted-foreground))"
                                            strokeWidth={2}
                                            strokeDasharray="5 5"
                                            dot={{ r: 4 }}
                                            name="ปีก่อน (2024)"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>การเปรียบเทียบประสิทธิภาพหลายมิติ</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[500px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart data={performanceRadarData}>
                                        <PolarGrid className="stroke-muted" />
                                        <PolarAngleAxis
                                            dataKey="metric"
                                            tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                                        />
                                        <PolarRadiusAxis
                                            angle={90}
                                            domain={[0, 100]}
                                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                                        />
                                        <Radar
                                            name="สาขากลาง"
                                            dataKey="สาขากลาง"
                                            stroke="#3b82f6"
                                            fill="#3b82f6"
                                            fillOpacity={0.3}
                                        />
                                        <Radar
                                            name="สาขาเหนือ"
                                            dataKey="สาขาเหนือ"
                                            stroke="#60a5fa"
                                            fill="#60a5fa"
                                            fillOpacity={0.3}
                                        />
                                        <Radar
                                            name="สาขาใต้"
                                            dataKey="สาขาใต้"
                                            stroke="#93c5fd"
                                            fill="#93c5fd"
                                            fillOpacity={0.3}
                                        />
                                        <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">จุดแข็ง</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">สาขากลาง</h4>
                                    <p className="text-xs text-muted-foreground">
                                        นำทุกด้าน โดยเฉพาะจำนวนจำนำและประสิทธิภาพการให้บริการ
                                    </p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">สาขาใต้</h4>
                                    <p className="text-xs text-muted-foreground">
                                        อัตราไถ่ถอนสูง (82%) และความพึงพอใจของลูกค้าดี (85%)
                                    </p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">สาขาตะวันออก</h4>
                                    <p className="text-xs text-muted-foreground">
                                        มูลค่าการจำนำสูง สมดุลระหว่างปริมาณและมูลค่า
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">จุดที่ควรปรับปรุง</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">สาขาตะวันตก</h4>
                                    <p className="text-xs text-muted-foreground">
                                        อัตราไถ่ถอนต่ำสุด (76%) ควรปรับกลยุทธ์การติดตามลูกค้า
                                    </p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">สาขาเหนือ</h4>
                                    <p className="text-xs text-muted-foreground">
                                        มูลค่าการจำนำต่อรายการต่ำ อาจต้องปรับกลุ่มเป้าหมาย
                                    </p>
                                </div>
                                <div className="rounded-lg border p-3">
                                    <h4 className="font-medium text-sm mb-1">สาขาใต้</h4>
                                    <p className="text-xs text-muted-foreground">
                                        ปริมาณการจำนำยังต่ำ ควรเพิ่มการตลาดและประชาสัมพันธ์
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
