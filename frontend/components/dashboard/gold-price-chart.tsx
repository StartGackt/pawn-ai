"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
    { date: "1 พ.ย.", buy: 32500, sell: 32800 },
    { date: "2 พ.ย.", buy: 32600, sell: 32900 },
    { date: "3 พ.ย.", buy: 32400, sell: 32700 },
    { date: "4 พ.ย.", buy: 32700, sell: 33000 },
    { date: "5 พ.ย.", buy: 32800, sell: 33100 },
    { date: "6 พ.ย.", buy: 32900, sell: 33200 },
    { date: "7 พ.ย.", buy: 33000, sell: 33300 },
];

const chartConfig = {
    buy: {
        label: "ราคารับซื้อ",
        color: "hsl(var(--chart-1))",
    },
    sell: {
        label: "ราคาขาย",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export function GoldPriceChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>แนวโน้มราคาทองคำ (7 วันย้อนหลัง)</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="date"
                                className="text-xs"
                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                            />
                            <YAxis
                                className="text-xs"
                                tick={{ fill: "hsl(var(--muted-foreground))" }}
                                tickFormatter={(value) => `฿${(value / 1000).toFixed(0)}k`}
                            />
                            <ChartTooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            รับซื้อ
                                                        </span>
                                                        <span className="font-bold text-muted-foreground">
                                                            ฿{payload[0].value?.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                                            ขาย
                                                        </span>
                                                        <span className="font-bold">
                                                            ฿{payload[1].value?.toLocaleString()}
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
                                type="monotone"
                                dataKey="buy"
                                stroke="var(--color-buy)"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="sell"
                                stroke="var(--color-sell)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
