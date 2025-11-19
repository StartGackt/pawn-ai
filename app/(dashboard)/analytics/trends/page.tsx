"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, Activity, Calendar } from "lucide-react";

const pawnTrendData = [
  { month: "ม.ค.", count: 450, amount: 14500000 },
  { month: "ก.พ.", count: 520, amount: 16800000 },
  { month: "มี.ค.", count: 580, amount: 18200000 },
  { month: "เม.ย.", count: 620, amount: 19500000 },
  { month: "พ.ค.", count: 480, amount: 15200000 },
  { month: "มิ.ย.", count: 510, amount: 16500000 },
  { month: "ก.ค.", count: 550, amount: 17800000 },
  { month: "ส.ค.", count: 590, amount: 19200000 },
  { month: "ก.ย.", count: 570, amount: 18500000 },
  { month: "ต.ค.", count: 610, amount: 19800000 },
  { month: "พ.ย.", count: 650, amount: 21000000 },
];

const goldPriceTrendData = [
  { week: "สัปดาห์ 1", price: 32500, volume: 450 },
  { week: "สัปดาห์ 2", price: 32800, volume: 520 },
  { week: "สัปดาห์ 3", price: 32600, volume: 480 },
  { week: "สัปดาห์ 4", price: 33000, volume: 550 },
  { week: "สัปดาห์ 5", price: 33200, volume: 580 },
];

const seasonalData = [
  { period: "ปกติ", avgPawns: 480, avgAmount: 15500000 },
  { period: "เทศกาล", avgPawns: 650, avgAmount: 20800000 },
  { period: "เปิดเทอม", avgPawns: 550, avgAmount: 17500000 },
];

export default function TrendsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">แนวโน้มข้อมูล</h1>
        <p className="text-muted-foreground">
          วิเคราะห์แนวโน้มการจำนำและราคาทองคำ
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">แนวโน้มการจำนำ</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">↑ 15.8%</div>
            <p className="text-xs text-muted-foreground mt-1">
              เพิ่มขึ้นจากปีที่แล้ว
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ช่วงเวลายอดนิยม</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">09:00 - 11:00</div>
            <p className="text-xs text-muted-foreground mt-1">
              มีการจำนำมากที่สุด
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ฤดูกาลสูงสุด</CardTitle>
            <Calendar className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">ธ.ค. - ม.ค.</div>
            <p className="text-xs text-muted-foreground mt-1">
              ช่วงเทศกาลปีใหม่
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis Tabs */}
      <Tabs defaultValue="pawn" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="pawn">การจำนำ</TabsTrigger>
          <TabsTrigger value="gold">ราคาทอง</TabsTrigger>
          <TabsTrigger value="seasonal">ฤดูกาล</TabsTrigger>
        </TabsList>

        <TabsContent value="pawn" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>แนวโน้มการจำนำรายเดือน (2025)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pawnTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="month" 
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
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-3 shadow-sm">
                              <div className="grid gap-2">
                                <div className="font-medium">{payload[0].payload.month}</div>
                                <div className="flex flex-col">
                                  <span className="text-xs text-muted-foreground">จำนวนครั้ง</span>
                                  <span className="font-bold">{payload[0].value} รายการ</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs text-muted-foreground">มูลค่า</span>
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
                      yAxisId="left"
                      type="monotone"
                      dataKey="count"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name="จำนวนครั้ง"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="amount"
                      stroke="hsl(142 76% 36%)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      name="มูลค่า"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">สรุปแนวโน้ม</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">การเติบโตเฉลี่ย/เดือน</span>
                  <span className="text-sm font-medium text-green-600">+5.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">เดือนสูงสุด</span>
                  <span className="text-sm font-medium">พฤศจิกายน (650 ครั้ง)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">เดือนต่ำสุด</span>
                  <span className="text-sm font-medium">มกราคม (450 ครั้ง)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">ความผันผวน</span>
                  <span className="text-sm font-medium">ปานกลาง</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">ปัจจัยที่มีผล</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-sm">ราคาทองคำเพิ่มขึ้น → การจำนำเพิ่ม</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-sm">ช่วงเทศกาล → การจำนำเพิ่ม 35%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  <span className="text-sm">เปิดเทอม → การจำนำเพิ่ม 15%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <span className="text-sm">เศรษฐกิจ → สหสัมพันธ์ 0.65</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gold" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>ความสัมพันธ์ราคาทอง - ปริมาณการจำนำ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={goldPriceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="week" 
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
                    />
                    <Tooltip />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="price"
                      stroke="hsl(45 93% 47%)"
                      fill="hsl(45 93% 47% / 0.2)"
                      name="ราคาทอง"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="volume"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary) / 0.2)"
                      name="ปริมาณจำนำ"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>การเปรียบเทียบตามช่วงเวลา</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={seasonalData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="period" 
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
                    <Bar
                      yAxisId="left"
                      dataKey="avgPawns"
                      fill="hsl(var(--primary))"
                      name="จำนวนครั้งเฉลี่ย"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="avgAmount"
                      fill="hsl(142 76% 36%)"
                      name="มูลค่าเฉลี่ย"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">ข้อสังเกตเชิงฤดูกาล</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-lg border p-3">
                <h4 className="font-medium text-sm mb-2">🎉 ช่วงเทศกาล</h4>
                <p className="text-xs text-muted-foreground">
                  ปีใหม่และสงกรานต์มีการจำนำเพิ่มขึ้นเฉลี่ย 30-35% เนื่องจากค่าใช้จ่ายในช่วงเทศกาล
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <h4 className="font-medium text-sm mb-2">📚 ช่วงเปิดเทอม</h4>
                <p className="text-xs text-muted-foreground">
                  เดือนพฤษภาคมและตุลาคมมีการจำนำเพิ่มขึ้น 15-20% สำหรับค่าเทอมและอุปกรณ์การเรียน
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <h4 className="font-medium text-sm mb-2">📅 ช่วงปกติ</h4>
                <p className="text-xs text-muted-foreground">
                  เดือนอื่นๆ มีการจำนำในระดับปกติ ความผันผวนต่ำ อยู่ที่ประมาณ 480-520 รายการต่อเดือน
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
