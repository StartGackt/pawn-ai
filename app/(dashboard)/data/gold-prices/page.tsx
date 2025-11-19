"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, Coins } from "lucide-react";

const goldPriceData = [
    { date: "1 พ.ย.", domestic: 32500, global: 2015 },
    { date: "2 พ.ย.", domestic: 32600, global: 2020 },
    { date: "3 พ.ย.", domestic: 32400, global: 2010 },
    { date: "4 พ.ย.", domestic: 32700, global: 2025 },
    { date: "5 พ.ย.", domestic: 32800, global: 2030 },
    { date: "6 พ.ย.", domestic: 32900, global: 2035 },
    { date: "7 พ.ย.", domestic: 33000, global: 2038 },
    { date: "8 พ.ย.", domestic: 33100, global: 2040 },
    { date: "9 พ.ย.", domestic: 33200, global: 2038 },
];

export default function GoldPricesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">ราคาทองคำ</h1>
                <p className="text-muted-foreground">
                    ข้อมูลราคาทองคำในประเทศและต่างประเทศ
                </p>
            </div>

            {/* Current Prices */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ทองคำแท่ง รับซื้อ</CardTitle>
                        <Coins className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿32,800</div>
                        <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                            <TrendingUp className="h-3 w-3" />
                            <span className="font-medium">+150 บาท</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            จากวันก่อนหน้า
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ทองรูปพรรณ ขาย</CardTitle>
                        <Coins className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">฿33,600</div>
                        <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                            <TrendingUp className="h-3 w-3" />
                            <span className="font-medium">+200 บาท</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            จากวันก่อนหน้า
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Gold Spot (XAU/USD)</CardTitle>
                        <Coins className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$2,038</div>
                        <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                            <TrendingUp className="h-3 w-3" />
                            <span className="font-medium">+$18 (+0.9%)</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            24h change
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Price History Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>ประวัติราคาทองคำ (9 วันย้อนหลัง)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={goldPriceData}>
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
                                    tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    className="text-xs"
                                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="rounded-lg border bg-background p-3 shadow-sm">
                                                    <div className="grid gap-2">
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                ในประเทศ
                                                            </span>
                                                            <span className="font-bold text-yellow-600">
                                                                ฿{payload[0].value?.toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                                โลก (USD)
                                                            </span>
                                                            <span className="font-bold text-amber-600">
                                                                ${payload[1].value}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="domestic"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    name="ในประเทศ"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="global"
                                    stroke="hsl(45 93% 47%)"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    name="โลก"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Market Info */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>ข้อมูลตลาดทองในประเทศ</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">แหล่งข้อมูล</span>
                            <span className="text-sm font-medium">สมาคมค้าทองคำไทย</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">อัพเดทล่าสุด</span>
                            <span className="text-sm font-medium">10:30 น.</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">จำนวนครั้ง/วัน</span>
                            <span className="text-sm font-medium">2 ครั้ง (09:30, 14:30)</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">ช่วงราคา 24h</span>
                            <span className="text-sm font-medium">฿32,400 - ฿33,200</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>ข้อมูลตลาดทองโลก</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">ตลาดหลัก</span>
                            <span className="text-sm font-medium">COMEX / London</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">24h Volume</span>
                            <span className="text-sm font-medium">285K contracts</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">24h High/Low</span>
                            <span className="text-sm font-medium">$2,045 / $2,010</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Market Cap</span>
                            <span className="text-sm font-medium">$13.5T</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
