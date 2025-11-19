"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { AlertTriangle, TrendingUp, TrendingDown, Package, Download, Info } from "lucide-react";

const forfeitedForecast = [
  { month: "ม.ค.", actual: 120, predicted: 118 },
  { month: "ก.พ.", actual: 135, predicted: 132 },
  { month: "มี.ค.", actual: 128, predicted: 130 },
  { month: "เม.ย.", actual: 145, predicted: 142 },
  { month: "พ.ค.", actual: 110, predicted: 115 },
  { month: "มิ.ย.", actual: null, predicted: 125 },
  { month: "ก.ค.", actual: null, predicted: 135 },
  { month: "ส.ค.", actual: null, predicted: 140 },
];

const categoryBreakdown = [
  { category: "สร้อยคอ", current: 45, predicted: 52, value: 2850000 },
  { category: "แหวน", current: 38, predicted: 42, value: 2100000 },
  { category: "สร้อยข้อมือ", current: 25, predicted: 28, value: 1680000 },
  { category: "ต่างหู", current: 12, predicted: 13, value: 720000 },
];

const riskSegments = [
  { risk: "สูง (>30 วัน)", count: 156, percentage: 24, action: "ติดตามเร่งด่วน" },
  { risk: "ปานกลาง (20-30 วัน)", count: 234, percentage: 36, action: "ติดตามปกติ" },
  { risk: "ต่ำ (<20 วัน)", count: 260, percentage: 40, action: "เฝ้าระวัง" },
];

export default function ForfeitedAssetsPredictionPage() {
  const [timeHorizon, setTimeHorizon] = React.useState("3months");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">คาดการณ์ทรัพย์หลุดจำนำ</h1>
          <p className="text-muted-foreground">
            พยากรณ์ทรัพย์หลุดจำนำและวางแผนการจัดการสินค้า
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          ส่งออกรายงาน
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
                <SelectItem value="1month">1 เดือน</SelectItem>
                <SelectItem value="3months">3 เดือน</SelectItem>
                <SelectItem value="6months">6 เดือน</SelectItem>
                <SelectItem value="1year">1 ปี</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">คาดการณ์ 3 เดือนข้างหน้า</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">400 รายการ</div>
            <p className="text-xs text-muted-foreground mt-1">
              +45 รายการ (+12.7%) จากปัจจุบัน
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">มูลค่ารวมคาดการณ์</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿24.5M</div>
            <p className="text-xs text-muted-foreground mt-1">
              +฿3.2M (+15.0%) จากปัจจุบัน
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ความแม่นยำ</CardTitle>
            <Info className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.8%</div>
            <p className="text-xs text-muted-foreground mt-1">
              MAE: 8.2 รายการ
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">แนวโน้ม</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">เพิ่มขึ้น</div>
            <p className="text-xs text-muted-foreground mt-1">
              ควรเตรียมพร้อมรับทรัพย์
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Forecast Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>การคาดการณ์ทรัพย์หลุดจำนำรายเดือน</CardTitle>
            <Badge variant="outline" className="text-green-600 border-green-600">
              Random Forest Model - Accuracy: 91.8%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forfeitedForecast}>
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
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-3 shadow-lg">
                          <div className="grid gap-2">
                            <div className="font-medium">{payload[0].payload.month}</div>
                            {payload[0].payload.actual && (
                              <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">จำนวนจริง</span>
                                <span className="font-bold text-primary">
                                  {payload[0].payload.actual} รายการ
                                </span>
                              </div>
                            )}
                            <div className="flex flex-col">
                              <span className="text-xs text-muted-foreground">คาดการณ์</span>
                              <span className="font-bold text-orange-600">
                                {payload[0].payload.predicted} รายการ
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
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 5 }}
                  name="จำนวนจริง"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="hsl(25 95% 53%)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 5 }}
                  name="คาดการณ์"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="breakdown">รายหมวด</TabsTrigger>
          <TabsTrigger value="risk">ความเสี่ยง</TabsTrigger>
          <TabsTrigger value="actions">แผนปฏิบัติการ</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>การคาดการณ์แยกตามประเภททรัพย์</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="category" 
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="current"
                      fill="hsl(var(--primary))"
                      name="ปัจจุบัน"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar
                      dataKey="predicted"
                      fill="hsl(25 95% 53%)"
                      name="คาดการณ์ (3 เดือน)"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">รายละเอียดตามหมวด</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 text-sm font-medium">หมวดหมู่</th>
                      <th className="text-right p-3 text-sm font-medium">ปัจจุบัน</th>
                      <th className="text-right p-3 text-sm font-medium">คาดการณ์</th>
                      <th className="text-right p-3 text-sm font-medium">การเปลี่ยนแปลง</th>
                      <th className="text-right p-3 text-sm font-medium">มูลค่าโดยประมาณ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryBreakdown.map((item, index) => {
                      const change = ((item.predicted - item.current) / item.current) * 100;
                      return (
                        <tr key={index} className="border-b">
                          <td className="p-3 text-sm font-medium">{item.category}</td>
                          <td className="p-3 text-sm text-right">{item.current}</td>
                          <td className="p-3 text-sm text-right">{item.predicted}</td>
                          <td className="p-3 text-right">
                            <Badge 
                              variant="outline" 
                              className={change > 0 ? "text-orange-600 border-orange-600" : "text-green-600 border-green-600"}
                            >
                              {change > 0 ? <TrendingUp className="h-3 w-3 mr-1 inline" /> : <TrendingDown className="h-3 w-3 mr-1 inline" />}
                              {change > 0 ? "+" : ""}{change.toFixed(1)}%
                            </Badge>
                          </td>
                          <td className="p-3 text-sm text-right font-medium">
                            ฿{item.value.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>การแบ่งกลุ่มตามความเสี่ยงหลุดจำนำ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskSegments.map((segment, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{segment.risk}</h3>
                        <Badge 
                          variant="outline"
                          className={
                            index === 0 ? "text-red-600 border-red-600" :
                            index === 1 ? "text-orange-600 border-orange-600" :
                            "text-green-600 border-green-600"
                          }
                        >
                          {segment.percentage}%
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{segment.count}</p>
                        <p className="text-xs text-muted-foreground">รายการ</p>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          index === 0 ? "bg-red-500" :
                          index === 1 ? "bg-orange-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${segment.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>แนะนำ:</strong> {segment.action}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">🔴 รายการเสี่ยงสูง</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  รายการที่เหลือเวลาน้อยกว่า 10 วันและมีมูลค่าสูง
                </p>
                <div className="space-y-2">
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">สร้อยคอทอง 96.5%</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">5 วัน</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">มูลค่า: ฿185,000</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">แหวนเพชร 1.2 ct</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">7 วัน</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">มูลค่า: ฿220,000</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">สร้อยข้อมือ 99.9%</span>
                      <Badge variant="outline" className="text-red-600 border-red-600">8 วัน</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">มูลค่า: ฿95,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">💡 คำแนะนำการจัดการ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                  <h4 className="font-medium text-sm mb-1 text-blue-900 dark:text-blue-100">
                    เตรียมพื้นที่จัดเก็บ
                  </h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    คาดว่าจะมีทรัพย์หลุดจำนำเพิ่มขึ้น 15% ควรเตรียมพื้นที่เพิ่มเติม
                  </p>
                </div>
                <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                  <h4 className="font-medium text-sm mb-1 text-amber-900 dark:text-amber-100">
                    วางแผนการขาย
                  </h4>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    เริ่มวางแผนการจัดงานประมูลหรือขายทอดตลาด โดยเฉพาะสร้อยคอที่มีจำนวนมาก
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-3">
                  <h4 className="font-medium text-sm mb-1 text-purple-900 dark:text-purple-100">
                    ติดตามลูกค้า
                  </h4>
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    เพิ่มความถี่ในการติดตามลูกค้ากลุ่มเสี่ยงสูง เพื่อส่งเสริมการไถ่ถอน
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>แผนปฏิบัติการตามการคาดการณ์</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <h3 className="font-semibold">ระยะสั้น (1-2 สัปดาห์)</h3>
                  </div>
                  <ul className="space-y-2 ml-10 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>ติดต่อลูกค้ากลุ่มเสี่ยงสูง 156 ราย เพื่อส่งเสริมการไถ่ถอน</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>ตรวจสอบคุณภาพและมูลค่าทรัพย์สินที่ใกล้หลุดจำนำ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>เตรียมเอกสารและระบบรับทรัพย์หลุดจำนำ</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <h3 className="font-semibold">ระยะกลาง (1 เดือน)</h3>
                  </div>
                  <ul className="space-y-2 ml-10 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>วางแผนการจัดงานขายทอดตลาด/ประมูล สำหรับ 125 รายการที่คาดว่าจะหลุดจำนำ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>ประเมินราคาขายและจัดทำเอกสารประกอบการขาย</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>ประชาสัมพันธ์งานขายผ่านช่องทางต่างๆ</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                      <span className="text-amber-600 font-bold">3</span>
                    </div>
                    <h3 className="font-semibold">ระยะยาว (3 เดือน)</h3>
                  </div>
                  <ul className="space-y-2 ml-10 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>จัดหาพื้นที่เพิ่มเติม 20% สำหรับรองรับทรัพย์ที่จะหลุดจำนำ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>วางแผนงบประมาณและกระแสเงินสดรองรับการคืนเงินจำนำ</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">•</span>
                      <span>ปรับกลยุทธ์การตลาดและอัตราดอกเบี้ยเพื่อลดอัตราหลุดจำนำ</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">📊 ผลกระทบทางการเงิน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">เงินสดที่ต้องคืน</span>
                  <span className="text-sm font-medium">฿18.5M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">มูลค่าทรัพย์รับเข้า</span>
                  <span className="text-sm font-medium">฿24.5M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">กำไรคาดหวังจากการขาย</span>
                  <span className="text-sm font-medium text-green-600">฿6.0M</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-sm font-medium">ROI คาดการณ์</span>
                  <span className="text-sm font-bold text-green-600">32.4%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">⚠️ ความเสี่ยง</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium mb-1">ราคาทองผันผวน</p>
                  <p className="text-xs text-muted-foreground">
                    อาจมีผลต่อมูลค่าทรัพย์และกำไรจากการขาย
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium mb-1">พื้นที่จัดเก็บไม่เพียงพอ</p>
                  <p className="text-xs text-muted-foreground">
                    ต้องเตรียมพื้นที่หรือเร่งขายสินค้าเก่า
                  </p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium mb-1">ความต้องการซื้อต่ำกว่าคาด</p>
                  <p className="text-xs text-muted-foreground">
                    อาจต้องลดราคาหรือเก็บสินค้านานขึ้น
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
