"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Activity, TrendingUp, CheckCircle2, AlertCircle, RefreshCw, Database, Cpu } from "lucide-react";

const mlModels = [
    {
        name: "LSTM Deep Learning",
        type: "Time Series Forecasting",
        purpose: "คาดการณ์ราคาทองคำ",
        status: "active",
        accuracy: 94.5,
        mae: 45.2,
        rmse: 58.3,
        lastTrained: "2025-01-15 02:00",
        nextTraining: "2025-01-22 02:00",
        dataPoints: 3650,
        features: ["ราคาทองโลก", "USD/THB", "อัตราดอกเบี้ย", "Seasonal", "Technical Indicators"],
    },
    {
        name: "Prophet",
        type: "Time Series with Seasonality",
        purpose: "คาดการณ์ราคาทองคำ (สำรอง)",
        status: "active",
        accuracy: 92.8,
        mae: 62.5,
        rmse: 78.1,
        lastTrained: "2025-01-15 02:00",
        nextTraining: "2025-01-22 02:00",
        dataPoints: 3650,
        features: ["ราคาทองโลก", "Trend", "Yearly Seasonality", "Weekly Seasonality"],
    },
    {
        name: "Random Forest",
        type: "Classification",
        purpose: "คาดการณ์ทรัพย์หลุดจำนำ",
        status: "active",
        accuracy: 91.8,
        mae: 8.2,
        rmse: 12.5,
        lastTrained: "2025-01-14 03:00",
        nextTraining: "2025-01-21 03:00",
        dataPoints: 5200,
        features: ["ระยะเวลาจำนำ", "มูลค่า", "ประวัติลูกค้า", "ราคาทอง", "ฤดูกาล"],
    },
    {
        name: "XGBoost",
        type: "Gradient Boosting",
        purpose: "วิเคราะห์ความเสี่ยงลูกค้า",
        status: "active",
        accuracy: 89.3,
        mae: 0.12,
        rmse: 0.18,
        lastTrained: "2025-01-13 04:00",
        nextTraining: "2025-01-20 04:00",
        dataPoints: 8500,
        features: ["จำนวนจำนำ", "อัตราไถ่ถอน", "ความถี่", "มูลค่าเฉลี่ย", "พฤติกรรม"],
    },
    {
        name: "ARIMA",
        type: "Autoregressive",
        purpose: "คาดการณ์ราคาทองคำ (สำรอง)",
        status: "backup",
        accuracy: 89.3,
        mae: 85.3,
        rmse: 102.4,
        lastTrained: "2025-01-10 02:00",
        nextTraining: "2025-01-24 02:00",
        dataPoints: 3650,
        features: ["ราคาทองอดีต", "Moving Average", "Seasonality"],
    },
];

const llmModels = [
    {
        name: "Ollama (Local LLM)",
        model: "llama2:13b",
        purpose: "AI Chatbot - Primary",
        status: "active",
        responseTime: "1.2s",
        tokens: "8K context",
        uptime: "99.8%",
    },
    {
        name: "OpenAI GPT-4",
        model: "gpt-4-turbo",
        purpose: "AI Chatbot - Fallback",
        status: "standby",
        responseTime: "0.8s",
        tokens: "128K context",
        uptime: "99.9%",
    },
    {
        name: "Anthropic Claude",
        model: "claude-3-sonnet",
        purpose: "AI Chatbot - Backup",
        status: "standby",
        responseTime: "1.0s",
        tokens: "200K context",
        uptime: "99.95%",
    },
];

export default function ModelsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Brain className="h-8 w-8" />
                    โมเดล AI & ML
                </h1>
                <p className="text-muted-foreground">
                    ข้อมูลและสถานะของโมเดล Machine Learning และ AI
                </p>
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
                            All systems operational
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">โมเดลทั้งหมด</CardTitle>
                        <Brain className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            5 ML + 3 LLM models
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">ความแม่นยำเฉลี่ย</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">91.5%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            จากโมเดล ML ทั้งหมด
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">อัปเดตล่าสุด</CardTitle>
                        <RefreshCw className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15 ม.ค.</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            5 นาทีที่แล้ว
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="ml" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="ml">Machine Learning</TabsTrigger>
                    <TabsTrigger value="llm">LLM / Chatbot</TabsTrigger>
                </TabsList>

                <TabsContent value="ml" className="space-y-4 mt-4">
                    {mlModels.map((model, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Cpu className="h-5 w-5 text-primary" />
                                        <div>
                                            <CardTitle className="text-lg">{model.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {model.type} • {model.purpose}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={model.status === "active" ? "default" : "outline"}
                                        className={model.status === "active" ? "bg-green-500" : ""}
                                    >
                                        {model.status === "active" ? (
                                            <>
                                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                                ใช้งานอยู่
                                            </>
                                        ) : (
                                            <>
                                                <AlertCircle className="mr-1 h-3 w-3" />
                                                สำรอง
                                            </>
                                        )}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Performance Metrics */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">ความแม่นยำ</p>
                                        <div className="flex items-center gap-2">
                                            <div className="text-2xl font-bold">{model.accuracy}%</div>
                                            {model.accuracy >= 92 ? (
                                                <TrendingUp className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Activity className="h-4 w-4 text-amber-500" />
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">MAE</p>
                                        <div className="text-lg font-medium">{model.mae}</div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">RMSE</p>
                                        <div className="text-lg font-medium">{model.rmse}</div>
                                    </div>
                                </div>

                                {/* Accuracy Bar */}
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-muted-foreground">Performance</span>
                                        <span className="font-medium">{model.accuracy}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${model.accuracy >= 92 ? "bg-green-500" :
                                                    model.accuracy >= 88 ? "bg-blue-500" :
                                                        "bg-amber-500"
                                                }`}
                                            style={{ width: `${model.accuracy}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Training Info */}
                                <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">เทรนล่าสุด</p>
                                        <p className="text-sm font-medium">{model.lastTrained}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">เทรนครั้งต่อไป</p>
                                        <p className="text-sm font-medium">{model.nextTraining}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">ข้อมูลที่ใช้</p>
                                        <p className="text-sm font-medium">
                                            <Database className="h-3 w-3 inline mr-1" />
                                            {model.dataPoints.toLocaleString()} records
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Features</p>
                                        <p className="text-sm font-medium">{model.features.length} features</p>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="pt-3 border-t">
                                    <p className="text-xs font-medium mb-2">Features ที่ใช้:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {model.features.map((feature, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                                {feature}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-3 border-t">
                                    <Button size="sm" variant="outline">
                                        <Activity className="mr-2 h-4 w-4" />
                                        ดูประสิทธิภาพ
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        เทรนใหม่
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <Database className="mr-2 h-4 w-4" />
                                        ดูข้อมูล
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                <TabsContent value="llm" className="space-y-4 mt-4">
                    {/* LLM Architecture */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Hybrid LLM Architecture</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="rounded-lg border p-4 bg-muted/50">
                                    <h3 className="font-semibold mb-2">📐 สถาปัตยกรรม</h3>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        ระบบใช้ Local LLM (Ollama) เป็นหลัก เพื่อความเป็นส่วนตัวและประหยัดค่าใช้จ่าย
                                        โดยมี Commercial LLM (GPT-4, Claude) เป็น fallback เมื่อคำถามซับซ้อนเกินไป
                                    </p>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Badge variant="default">Primary</Badge>
                                        <span>→ Ollama (Local)</span>
                                        <span className="mx-2">|</span>
                                        <Badge variant="outline">Fallback</Badge>
                                        <span>→ GPT-4 / Claude (Cloud)</span>
                                    </div>
                                </div>

                                <div className="rounded-lg border p-4 bg-muted/50">
                                    <h3 className="font-semibold mb-2">🔍 RAG (Retrieval-Augmented Generation)</h3>
                                    <p className="text-sm text-muted-foreground">
                                        ระบบใช้ ChromaDB เป็น Vector Database สำหรับเก็บข้อมูลธนานุเคราะห์
                                        ทำให้ AI สามารถตอบคำถามเฉพาะด้านได้แม่นยำและทันสมัย
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* LLM Models */}
                    {llmModels.map((model, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Brain className="h-5 w-5 text-purple-500" />
                                        <div>
                                            <CardTitle className="text-lg">{model.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {model.model} • {model.purpose}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={model.status === "active" ? "default" : "outline"}
                                        className={model.status === "active" ? "bg-green-500" : "bg-amber-500"}
                                    >
                                        {model.status === "active" ? (
                                            <>
                                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                                ใช้งานอยู่
                                            </>
                                        ) : (
                                            <>
                                                <AlertCircle className="mr-1 h-3 w-3" />
                                                พร้อมใช้งาน
                                            </>
                                        )}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Response Time</p>
                                        <div className="text-lg font-bold">{model.responseTime}</div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Context Window</p>
                                        <div className="text-lg font-bold">{model.tokens}</div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                                        <div className="text-lg font-bold text-green-600">{model.uptime}</div>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4 pt-4 border-t">
                                    <Button size="sm" variant="outline">
                                        <Activity className="mr-2 h-4 w-4" />
                                        ดูสถิติ
                                    </Button>
                                    <Button size="sm" variant="outline">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        รีสตาร์ท
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Additional Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">💡 ข้อมูลเพิ่มเติม</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="rounded-lg border p-3">
                                <h4 className="font-medium text-sm mb-1">ความเป็นส่วนตัว</h4>
                                <p className="text-xs text-muted-foreground">
                                    ข้อมูลลูกค้าและธุรกรรมจะประมวลผลโดย Local LLM ก่อน ไม่ส่งไปยัง Cloud
                                </p>
                            </div>
                            <div className="rounded-lg border p-3">
                                <h4 className="font-medium text-sm mb-1">ต้นทุน</h4>
                                <p className="text-xs text-muted-foreground">
                                    ลดค่าใช้จ่าย API โดยใช้ Local LLM 90% ของการใช้งาน
                                </p>
                            </div>
                            <div className="rounded-lg border p-3">
                                <h4 className="font-medium text-sm mb-1">ประสิทธิภาพ</h4>
                                <p className="text-xs text-muted-foreground">
                                    Response time เฉลี่ย 1.2s พร้อม fallback ที่รวดเร็วกว่าหากจำเป็น
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
