"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ArrowRightLeft, Database, Building2, Coins } from "lucide-react";

// ราคาทองคำประจำวัน (Mock Data)
const mockGoldPriceData = [
    { date: "10 พ.ย.", domesticBuy: 31500, domesticSell: 31600, globalUSD: 1950, globalTHB: 30200, usdthb: 35.20 },
    { date: "11 พ.ย.", domesticBuy: 31650, domesticSell: 31750, globalUSD: 1965, globalTHB: 30350, usdthb: 35.25 },
    { date: "12 พ.ย.", domesticBuy: 31800, domesticSell: 31900, globalUSD: 1980, globalTHB: 30500, usdthb: 35.30 },
    { date: "13 พ.ย.", domesticBuy: 31700, domesticSell: 31800, globalUSD: 1975, globalTHB: 30450, usdthb: 35.28 },
    { date: "14 พ.ย.", domesticBuy: 31900, domesticSell: 32000, globalUSD: 1990, globalTHB: 30600, usdthb: 35.35 },
    { date: "15 พ.ย.", domesticBuy: 32100, domesticSell: 32200, globalUSD: 2005, globalTHB: 30800, usdthb: 35.40 },
    { date: "16 พ.ย.", domesticBuy: 32050, domesticSell: 32150, globalUSD: 2000, globalTHB: 30750, usdthb: 35.38 },
    { date: "17 พ.ย.", domesticBuy: 32200, domesticSell: 32300, globalUSD: 2015, globalTHB: 30900, usdthb: 35.42 },
    { date: "18 พ.ย.", domesticBuy: 32350, domesticSell: 32450, globalUSD: 2030, globalTHB: 31050, usdthb: 35.45 },
    { date: "19 พ.ย.", domesticBuy: 32500, domesticSell: 32600, globalUSD: 2045, globalTHB: 31200, usdthb: 35.50 },
];

// ข้อมูลภายใน สธค. - ประวัติการรับจำนำ
const mockPawnHistory = [
    { id: "P-2025-001", date: "19/11/2568", assetType: "ทองคำแท่ง", weight: "2 บาท", appraisedValue: 65000, loanAmount: 50000, goldPrice: 32500, officer: "สมชาย ใจดี" },
    { id: "P-2025-002", date: "18/11/2568", assetType: "สร้อยคอทอง 96.5%", weight: "3 บาท", appraisedValue: 93960, loanAmount: 75000, goldPrice: 31320, officer: "มาลี สวยงาม" },
    { id: "P-2025-003", date: "17/11/2568", assetType: "แหวนทอง 99.9%", weight: "1 บาท", appraisedValue: 32200, loanAmount: 25000, goldPrice: 32200, officer: "วิชัย แกร่ง" },
    { id: "P-2025-004", date: "16/11/2568", assetType: "กำไลทอง", weight: "2.5 บาท", appraisedValue: 80125, loanAmount: 65000, goldPrice: 32050, officer: "สมหญิง รักดี" },
    { id: "P-2025-005", date: "15/11/2568", assetType: "ทองคำแท่ง", weight: "5 บาท", appraisedValue: 160500, loanAmount: 130000, goldPrice: 32100, officer: "บุญมี โชคดี" },
];

// ข้อมูลการไถ่ถอน / ส่งดอกเบี้ย
const mockRedemptionHistory = [
    { id: "P-2024-998", redeemDate: "18/11/2568", loanAmount: 50000, interest: 2500, totalPaid: 52500, status: "ไถ่สำเร็จ", daysOverdue: 0 },
    { id: "P-2024-997", redeemDate: "17/11/2568", loanAmount: 75000, interest: 4500, totalPaid: 79500, status: "ไถ่สำเร็จ", daysOverdue: 0 },
    { id: "P-2024-996", redeemDate: "16/11/2568", loanAmount: 30000, interest: 2100, totalPaid: 32100, status: "เกินกำหนด", daysOverdue: 5 },
    { id: "P-2024-995", redeemDate: "15/11/2568", loanAmount: 45000, interest: 2700, totalPaid: 47700, status: "ไถ่สำเร็จ", daysOverdue: 0 },
    { id: "P-2024-994", redeemDate: "14/11/2568", loanAmount: 60000, interest: 3600, totalPaid: 63600, status: "ไถ่สำเร็จ", daysOverdue: 0 },
];

// ข้อมูลทรัพย์หลุดจำนำ
const mockForfeitedAssets = [
    { id: "P-2024-850", forfeitDate: "10/11/2568", assetType: "ทองคำแท่ง", weight: "2 บาท", loanAmount: 55000, goldPriceAtForfeit: 31500, currentGoldPrice: 32500, costBasis: 55000, currentValue: 65000, profitLoss: 10000 },
    { id: "P-2024-851", forfeitDate: "12/11/2568", assetType: "สร้อยคอทอง", weight: "1.5 บาท", loanAmount: 42000, goldPriceAtForfeit: 31800, currentGoldPrice: 32500, costBasis: 42000, currentValue: 48750, profitLoss: 6750 },
    { id: "P-2024-852", forfeitDate: "14/11/2568", assetType: "แหวนทอง", weight: "1 บาท", loanAmount: 28000, goldPriceAtForfeit: 31900, currentGoldPrice: 32500, costBasis: 28000, currentValue: 32500, profitLoss: 4500 },
    { id: "P-2024-853", forfeitDate: "15/11/2568", assetType: "กำไลทอง", weight: "3 บาท", loanAmount: 88000, goldPriceAtForfeit: 32100, currentGoldPrice: 32500, costBasis: 88000, currentValue: 97500, profitLoss: 9500 },
];

export default function GoldPricesPage() {
    const latestPrice = mockGoldPriceData[mockGoldPriceData.length - 1];
    const previousPrice = mockGoldPriceData[mockGoldPriceData.length - 2];

    const domesticChange = latestPrice.domesticBuy - previousPrice.domesticBuy;
    const globalChange = latestPrice.globalUSD - previousPrice.globalUSD;
    const usdthbChange = latestPrice.usdthb - previousPrice.usdthb;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">ข้อมูลราคาทองคำ</h1>
                <p className="text-muted-foreground">
                    ราคาทองไทย + ทองโลก, อัตราแลกเปลี่ยน และข้อมูลภายใน สธค.
                </p>
            </div>

            {/* Current Prices */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ทองไทย (ซื้อ)</CardTitle>
                        <Coins className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">฿{latestPrice.domesticBuy.toLocaleString()}</div>
                        <div className="flex items-center gap-2 mt-1">
                            {domesticChange >= 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <p className={`text-xs font-medium ${domesticChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {domesticChange >= 0 ? '+' : ''}{domesticChange.toLocaleString()} บาท
                            </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">บาท/บาททองคำ (สมาคมค้าทองคำ)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ทองไทย (ขาย)</CardTitle>
                        <Coins className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">฿{latestPrice.domesticSell.toLocaleString()}</div>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">Spread ฿{(latestPrice.domesticSell - latestPrice.domesticBuy).toLocaleString()}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">บาท/บาททองคำ (ราคาขายของร้าน)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ทองโลก</CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${latestPrice.globalUSD.toLocaleString()}</div>
                        <div className="flex items-center gap-2 mt-1">
                            {globalChange >= 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <p className={`text-xs font-medium ${globalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {globalChange >= 0 ? '+' : ''}${globalChange.toFixed(2)}/oz
                            </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">USD/oz (Yahoo Finance, Metals-API)</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">อัตราแลกเปลี่ยน</CardTitle>
                        <ArrowRightLeft className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿{latestPrice.usdthb.toFixed(2)}</div>
                        <div className="flex items-center gap-2 mt-1">
                            {usdthbChange >= 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            ) : (
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            )}
                            <p className={`text-xs font-medium ${usdthbChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {usdthbChange >= 0 ? '+' : ''}{usdthbChange.toFixed(2)}
                            </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">USD/THB (BOT Open Data API)</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="price-chart" className="w-full">
                <TabsList className="grid w-full max-w-2xl grid-cols-4">
                    <TabsTrigger value="price-chart">กราฟราคา</TabsTrigger>
                    <TabsTrigger value="pawn-history">ประวัติจำนำ</TabsTrigger>
                    <TabsTrigger value="redemption">การไถ่ถอน</TabsTrigger>
                    <TabsTrigger value="forfeited">ทรัพย์หลุดจำนำ</TabsTrigger>
                </TabsList>

                <TabsContent value="price-chart" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>ราคาทองไทย (10 วันล่าสุด)</CardTitle>
                                <CardDescription>บาท/บาททองคำ - ไม่ต้องแปลง</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={mockGoldPriceData}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis
                                                dataKey="date"
                                                className="text-xs"
                                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            />
                                            <YAxis
                                                className="text-xs"
                                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                                domain={['dataMin - 500', 'dataMax + 500']}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "hsl(var(--background))",
                                                    border: "1px solid hsl(var(--border))",
                                                    borderRadius: "8px"
                                                }}
                                                formatter={(value: number) => `฿${value.toLocaleString()}`}
                                            />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="domesticBuy"
                                                stroke="#3b82f6"
                                                strokeWidth={2}
                                                name="ราคารับซื้อ"
                                                dot={{ fill: "#3b82f6", r: 4 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="domesticSell"
                                                stroke="#60a5fa"
                                                strokeWidth={2}
                                                name="ราคาขาย"
                                                dot={{ fill: "#60a5fa", r: 4 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>ราคาทองโลก (แปลงเป็น THB)</CardTitle>
                                <CardDescription>USD/oz → บาท/บาททองคำ (ใช้อัตรา USD/THB)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[350px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={mockGoldPriceData}>
                                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                            <XAxis
                                                dataKey="date"
                                                className="text-xs"
                                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                            />
                                            <YAxis
                                                yAxisId="left"
                                                className="text-xs"
                                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                                tickFormatter={(value) => `$${value}`}
                                            />
                                            <YAxis
                                                yAxisId="right"
                                                orientation="right"
                                                className="text-xs"
                                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                                tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "hsl(var(--background))",
                                                    border: "1px solid hsl(var(--border))",
                                                    borderRadius: "8px"
                                                }}
                                            />
                                            <Legend />
                                            <Line
                                                yAxisId="left"
                                                type="monotone"
                                                dataKey="globalUSD"
                                                stroke="#93c5fd"
                                                strokeWidth={2}
                                                name="ราคา USD/oz"
                                                dot={{ fill: "#93c5fd", r: 4 }}
                                            />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="globalTHB"
                                                stroke="#3b82f6"
                                                strokeWidth={2}
                                                name="แปลงเป็น THB"
                                                dot={{ fill: "#3b82f6", r: 4 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>แหล่งข้อมูล (Data Sources)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="flex items-start gap-3">
                                    <Building2 className="h-5 w-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-sm">ราคาทองไทย</h4>
                                        <p className="text-xs text-muted-foreground mt-1">สมาคมค้าทองคำไทย</p>
                                        <p className="text-xs text-muted-foreground">Thai Gold API</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-sm">ราคาทองโลก</h4>
                                        <p className="text-xs text-muted-foreground mt-1">Metals-API / GoldAPI</p>
                                        <p className="text-xs text-muted-foreground">Yahoo Finance</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <ArrowRightLeft className="h-5 w-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-sm">อัตราแลกเปลี่ยน</h4>
                                        <p className="text-xs text-muted-foreground mt-1">ธนาคารแห่งประเทศไทย</p>
                                        <p className="text-xs text-muted-foreground">BOT Open Data API</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="pawn-history" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5 text-blue-500" />
                                ประวัติการรับจำนำย้อนหลัง (ข้อมูลภายใน สธค.)
                            </CardTitle>
                            <CardDescription>
                                บันทึกการรับจำนำทรัพย์สินทองคำ พร้อมราคาทองวันที่รับจำนำ
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>เลขที่ตั๋ว</TableHead>
                                        <TableHead>วันที่รับจำนำ</TableHead>
                                        <TableHead>ประเภททรัพย์</TableHead>
                                        <TableHead>น้ำหนัก</TableHead>
                                        <TableHead className="text-right">ราคาประเมิน</TableHead>
                                        <TableHead className="text-right">จำนวนเงินปล่อย</TableHead>
                                        <TableHead className="text-right">ราคาทองวันนั้น</TableHead>
                                        <TableHead>ผู้ทำรายการ</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockPawnHistory.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-mono text-sm">{item.id}</TableCell>
                                            <TableCell className="text-sm">{item.date}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-xs">{item.assetType}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm font-medium">{item.weight}</TableCell>
                                            <TableCell className="text-right">฿{item.appraisedValue.toLocaleString()}</TableCell>
                                            <TableCell className="text-right font-semibold text-blue-600">
                                                ฿{item.loanAmount.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right text-sm">฿{item.goldPrice.toLocaleString()}</TableCell>
                                            <TableCell className="text-sm">{item.officer}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-4 text-sm text-muted-foreground">
                                แสดง {mockPawnHistory.length} รายการล่าสุด
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="redemption" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5 text-blue-500" />
                                ประวัติการส่งดอกเบี้ย / ไถ่ถอน
                            </CardTitle>
                            <CardDescription>
                                บันทึกการชำระเงินไถ่ถอนทรัพย์สิน พร้อมดอกเบี้ยค้างและสถานะ
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>เลขที่ตั๋ว</TableHead>
                                        <TableHead>วันที่ไถ่ถอน</TableHead>
                                        <TableHead className="text-right">จำนวนเงินกู้</TableHead>
                                        <TableHead className="text-right">ดอกเบี้ยค้าง</TableHead>
                                        <TableHead className="text-right">ยอดชำระรวม</TableHead>
                                        <TableHead>วันเกินกำหนด</TableHead>
                                        <TableHead>สถานะ</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockRedemptionHistory.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-mono text-sm">{item.id}</TableCell>
                                            <TableCell className="text-sm">{item.redeemDate}</TableCell>
                                            <TableCell className="text-right">฿{item.loanAmount.toLocaleString()}</TableCell>
                                            <TableCell className="text-right text-orange-600">
                                                ฿{item.interest.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right font-semibold text-blue-600">
                                                ฿{item.totalPaid.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                {item.daysOverdue > 0 ? (
                                                    <Badge variant="destructive" className="text-xs">{item.daysOverdue} วัน</Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="text-xs">ตรงเวลา</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={item.status === "ไถ่สำเร็จ" ? "default" : "destructive"}
                                                    className="text-xs"
                                                >
                                                    {item.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-4 text-sm text-muted-foreground">
                                แสดง {mockRedemptionHistory.length} รายการล่าสุด
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="forfeited" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-5 w-5 text-blue-500" />
                                ข้อมูลทรัพย์หลุดจำนำ
                            </CardTitle>
                            <CardDescription>
                                เปรียบเทียบต้นทุน (ราคาที่ปล่อยกู้) กับมูลค่าปัจจุบัน (ราคาทองล่าสุด) เพื่อคำนวณกำไร/ขาดทุน
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>เลขที่ตั๋ว</TableHead>
                                        <TableHead>วันที่หลุด</TableHead>
                                        <TableHead>ประเภททรัพย์</TableHead>
                                        <TableHead>น้ำหนัก</TableHead>
                                        <TableHead className="text-right">ต้นทุน (เงินกู้)</TableHead>
                                        <TableHead className="text-right">ราคาทองวันหลุด</TableHead>
                                        <TableHead className="text-right">ราคาทองปัจจุบัน</TableHead>
                                        <TableHead className="text-right">มูลค่าปัจจุบัน</TableHead>
                                        <TableHead className="text-right">กำไร/ขาดทุน</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockForfeitedAssets.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-mono text-sm">{item.id}</TableCell>
                                            <TableCell className="text-sm">{item.forfeitDate}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-xs">{item.assetType}</Badge>
                                            </TableCell>
                                            <TableCell className="text-sm font-medium">{item.weight}</TableCell>
                                            <TableCell className="text-right">฿{item.costBasis.toLocaleString()}</TableCell>
                                            <TableCell className="text-right text-sm">
                                                ฿{item.goldPriceAtForfeit.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right text-sm font-semibold text-blue-600">
                                                ฿{item.currentGoldPrice.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">
                                                ฿{item.currentValue.toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right font-bold">
                                                {item.profitLoss >= 0 ? (
                                                    <span className="text-green-600">+฿{item.profitLoss.toLocaleString()}</span>
                                                ) : (
                                                    <span className="text-red-600">-฿{Math.abs(item.profitLoss).toLocaleString()}</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">แสดง {mockForfeitedAssets.length} รายการ</p>
                                <div className="flex items-center gap-4">
                                    <div className="text-sm">
                                        <span className="text-muted-foreground">กำไรรวม: </span>
                                        <span className="font-bold text-green-600">
                                            +฿{mockForfeitedAssets.reduce((sum, item) => sum + item.profitLoss, 0).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
