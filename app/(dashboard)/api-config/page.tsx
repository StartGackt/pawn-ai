"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    CheckCircle2, Server, RefreshCw, Database, CloudCog, Settings,
    Key, Globe, Shield, Activity, Clock, AlertTriangle, Zap,
    ExternalLink, Copy, Eye, EyeOff, Brain, TrendingUp
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function ApiConfigPage() {
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<"idle" | "connected" | "error">("idle");
    const [showApiKey, setShowApiKey] = useState(false);
    const [showGoldApiKey, setShowGoldApiKey] = useState(false);

    const handleTestConnection = () => {
        setIsConnecting(true);
        setConnectionStatus("idle");
        setTimeout(() => {
            setIsConnecting(false);
            setConnectionStatus("connected");
        }, 1500);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="container mx-auto space-y-6 p-4 md:p-6">
            {/* Page Header */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 font-medium">
                        <Settings className="mr-1.5 h-3 w-3" />
                        System Configuration
                    </Badge>
                </div>
                <h1 className="text-3xl font-bold tracking-tight">ตั้งค่าการเชื่อมต่อ API</h1>
                <p className="text-muted-foreground mt-1">จัดการการเชื่อมต่อกับระบบภายนอก, บริการ AI และแหล่งข้อมูลต่างๆ</p>
            </div>

            {/* Status Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-green-200 bg-green-50/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500 rounded-lg">
                                <Server className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">สธค. Database</p>
                                <p className="font-semibold text-green-700">เชื่อมต่อแล้ว</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-green-200 bg-green-50/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500 rounded-lg">
                                <Brain className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">AI Models</p>
                                <p className="font-semibold text-green-700">พร้อมใช้งาน</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-green-200 bg-green-50/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-500 rounded-lg">
                                <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Gold API</p>
                                <p className="font-semibold text-green-700">ทำงานปกติ</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-blue-200 bg-blue-50/50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500 rounded-lg">
                                <Activity className="h-4 w-4 text-white" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">API Calls วันนี้</p>
                                <p className="font-semibold text-blue-700">1,247 calls</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="stgk" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="stgk" className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span className="hidden sm:inline">สธค. Database</span>
                    </TabsTrigger>
                    <TabsTrigger value="ai" className="flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        <span className="hidden sm:inline">AI Models</span>
                    </TabsTrigger>
                    <TabsTrigger value="external" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span className="hidden sm:inline">External APIs</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="hidden sm:inline">Security</span>
                    </TabsTrigger>
                </TabsList>

                {/* Tab: สธค. Database */}
                <TabsContent value="stgk" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Server className="h-5 w-5 text-blue-500" />
                                การเชื่อมต่อฐานข้อมูลกลาง สธค.
                            </CardTitle>
                            <CardDescription>ตั้งค่าการดึงข้อมูลทรัพย์หลุดจำนำ, อัตราดอกเบี้ย, ประวัติรับจำนำ และข้อมูลสาขา</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="url" className="text-sm">API Endpoint URL</Label>
                                    <div className="flex gap-2">
                                        <Input id="url" defaultValue="https://api.pawn.stgk.go.th/v1/services" className="flex-1" />
                                        <Button variant="outline" size="icon" onClick={() => copyToClipboard("https://api.pawn.stgk.go.th/v1/services")}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="key" className="text-sm">Service Key</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="key"
                                                type={showApiKey ? "text" : "password"}
                                                value="sk_live_pawn_service_998877"
                                                readOnly
                                            />
                                            <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                                                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="version" className="text-sm">API Version</Label>
                                        <Input id="version" value="v2.5.0 (Latest)" readOnly className="bg-muted" />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <h3 className="text-sm font-medium">Service Modules</h3>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <CloudCog className="h-5 w-5 text-blue-500" />
                                            <div>
                                                <span className="text-sm font-medium">Interest Calculator</span>
                                                <p className="text-xs text-muted-foreground">คำนวณดอกเบี้ยรับจำนำ</p>
                                            </div>
                                        </div>
                                        <Switch checked disabled />
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Database className="h-5 w-5 text-emerald-500" />
                                            <div>
                                                <span className="text-sm font-medium">Online Appraisal</span>
                                                <p className="text-xs text-muted-foreground">ประเมินราคาออนไลน์</p>
                                            </div>
                                        </div>
                                        <Switch checked disabled />
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Clock className="h-5 w-5 text-orange-500" />
                                            <div>
                                                <span className="text-sm font-medium">Transaction History</span>
                                                <p className="text-xs text-muted-foreground">ประวัติการทำรายการ</p>
                                            </div>
                                        </div>
                                        <Switch checked disabled />
                                    </div>
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <AlertTriangle className="h-5 w-5 text-red-500" />
                                            <div>
                                                <span className="text-sm font-medium">Forfeiture Alert</span>
                                                <p className="text-xs text-muted-foreground">แจ้งเตือนใกล้หลุดจำนำ</p>
                                            </div>
                                        </div>
                                        <Switch checked disabled />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    <div className={`h-3 w-3 rounded-full ${connectionStatus === 'connected' ? 'bg-emerald-500 animate-pulse' :
                                        connectionStatus === 'error' ? 'bg-red-500' :
                                            'bg-slate-300'
                                        }`} />
                                    <div>
                                        <span className="font-medium text-sm">สถานะระบบ</span>
                                        <p className="text-xs text-muted-foreground">
                                            {connectionStatus === 'idle' && "รอการตรวจสอบ"}
                                            {connectionStatus === 'connected' && "ระบบทำงานปกติ • Latency: 45ms"}
                                            {connectionStatus === 'error' && "พบข้อผิดพลาด"}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleTestConnection}
                                    disabled={isConnecting}
                                >
                                    {isConnecting ? (
                                        <>
                                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                            ตรวจสอบ...
                                        </>
                                    ) : (
                                        "ตรวจสอบระบบ"
                                    )}
                                </Button>
                            </div>

                            {connectionStatus === 'connected' && (
                                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                                    <CheckCircle2 className="h-5 w-5" />
                                    เชื่อมต่อกับเซิร์ฟเวอร์ สธค. เรียบร้อยแล้ว • Last sync: 2 นาทีที่แล้ว
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="justify-end gap-2 border-t pt-4">
                            <Button variant="ghost">รีเซ็ต</Button>
                            <Button>บันทึกการเปลี่ยนแปลง</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Tab: AI Models */}
                <TabsContent value="ai" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Brain className="h-5 w-5 text-purple-500" />
                                AI Language Models Configuration
                            </CardTitle>
                            <CardDescription>ตั้งค่า API Keys สำหรับ LLM Models ที่ใช้งานใน AI Chatbot</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Claude */}
                            <div className="rounded-lg border p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                            <Zap className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Claude (Anthropic)</h4>
                                            <p className="text-xs text-muted-foreground">Claude 3.5 Sonnet - แนะนำสำหรับภาษาไทย</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-sm">API Key</Label>
                                    <div className="flex gap-2">
                                        <Input type="password" value="sk-ant-api03-xxxx...xxxx" readOnly className="font-mono text-sm" />
                                        <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Model: claude-3-5-sonnet-20241022</span>
                                    <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                                        Manage <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </div>

                            {/* GPT-4 */}
                            <div className="rounded-lg border p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Brain className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">GPT-4o (OpenAI)</h4>
                                            <p className="text-xs text-muted-foreground">GPT-4o - Multi-modal capabilities</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-sm">API Key</Label>
                                    <div className="flex gap-2">
                                        <Input type="password" value="sk-proj-xxxx...xxxx" readOnly className="font-mono text-sm" />
                                        <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Model: gpt-4o</span>
                                    <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                                        Manage <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </div>

                            {/* Grok */}
                            <div className="rounded-lg border p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <Zap className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Grok (xAI)</h4>
                                            <p className="text-xs text-muted-foreground">Grok-2 - Real-time data access</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-sm">API Key</Label>
                                    <div className="flex gap-2">
                                        <Input type="password" value="xai-xxxx...xxxx" readOnly className="font-mono text-sm" />
                                        <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                                        <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Model: grok-2-latest</span>
                                    <a href="https://console.x.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                                        Manage <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </div>

                            {/* Fine-tuned Model */}
                            <div className="rounded-lg border border-purple-200 bg-purple-50/50 p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Brain className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">STGK Fine-tuned Model</h4>
                                            <p className="text-xs text-muted-foreground">LLAMA-2-7B Fine-tuned สำหรับ สธค.</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-purple-300 text-purple-700">Coming Soon</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    โมเดลที่ Fine-tune เฉพาะสำหรับงาน สธค. รองรับคำถามเกี่ยวกับระเบียบ, อัตราดอกเบี้ย, และข้อมูลเฉพาะทาง
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: External APIs */}
                <TabsContent value="external" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5 text-blue-500" />
                                External Data APIs
                            </CardTitle>
                            <CardDescription>ตั้งค่า API สำหรับดึงข้อมูลราคาทอง, อัตราแลกเปลี่ยน และข้อมูลภายนอก</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Gold API */}
                            <div className="rounded-lg border p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-yellow-100 rounded-lg">
                                            <TrendingUp className="h-5 w-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">GoldAPI.io</h4>
                                            <p className="text-xs text-muted-foreground">ราคาทองคำโลก XAU/USD Real-time</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700">Connected</Badge>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-sm">API Token</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type={showGoldApiKey ? "text" : "password"}
                                            value="goldapi-xxxxx-xxxxx"
                                            readOnly
                                            className="font-mono text-sm"
                                        />
                                        <Button variant="outline" size="icon" onClick={() => setShowGoldApiKey(!showGoldApiKey)}>
                                            {showGoldApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">Endpoint: https://www.goldapi.io/api/XAU/USD</span>
                                    <span className="text-green-600">Rate: 500 req/day</span>
                                </div>
                            </div>

                            {/* Thai Gold Association */}
                            <div className="rounded-lg border p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-amber-100 rounded-lg">
                                            <Database className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">Thai Gold Traders Association</h4>
                                            <p className="text-xs text-muted-foreground">ราคาทองคำไทย (สมาคมค้าทองคำ)</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    <p>Source: https://www.goldtraders.or.th/</p>
                                    <p>Method: Web Scraping • Update: ทุก 5 นาที</p>
                                </div>
                            </div>

                            {/* Exchange Rate API */}
                            <div className="rounded-lg border p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Globe className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">ExchangeRate-API</h4>
                                            <p className="text-xs text-muted-foreground">อัตราแลกเปลี่ยน USD/THB</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-green-100 text-green-700">Connected</Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    <p>Endpoint: https://api.exchangerate-api.com/v4/latest/USD</p>
                                    <p>Plan: Free Tier • Update: Daily</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Security */}
                <TabsContent value="security" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-green-500" />
                                Security Settings
                            </CardTitle>
                            <CardDescription>ตั้งค่าความปลอดภัยและการเข้าถึง API</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Key className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <h4 className="font-medium">API Key Rotation</h4>
                                            <p className="text-sm text-muted-foreground">เปลี่ยน API Key อัตโนมัติทุก 90 วัน</p>
                                        </div>
                                    </div>
                                    <Switch checked />
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Shield className="h-5 w-5 text-green-500" />
                                        <div>
                                            <h4 className="font-medium">Rate Limiting</h4>
                                            <p className="text-sm text-muted-foreground">จำกัด 1000 requests/minute</p>
                                        </div>
                                    </div>
                                    <Switch checked />
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Activity className="h-5 w-5 text-orange-500" />
                                        <div>
                                            <h4 className="font-medium">Audit Logging</h4>
                                            <p className="text-sm text-muted-foreground">บันทึกการเรียกใช้ API ทั้งหมด</p>
                                        </div>
                                    </div>
                                    <Switch checked />
                                </div>

                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="h-5 w-5 text-red-500" />
                                        <div>
                                            <h4 className="font-medium">Error Alerting</h4>
                                            <p className="text-sm text-muted-foreground">แจ้งเตือนเมื่อเกิด Error &gt; 5%</p>
                                        </div>
                                    </div>
                                    <Switch checked />
                                </div>
                            </div>

                            <Separator />

                            <div className="rounded-lg bg-muted/50 p-4">
                                <h4 className="font-medium mb-3">Environment Variables</h4>
                                <div className="space-y-2 font-mono text-xs">
                                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                                        <span className="text-muted-foreground">ANTHROPIC_API_KEY</span>
                                        <Badge variant="outline" className="text-green-600">Set</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                                        <span className="text-muted-foreground">OPENAI_API_KEY</span>
                                        <Badge variant="outline" className="text-green-600">Set</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                                        <span className="text-muted-foreground">XAI_API_KEY</span>
                                        <Badge variant="outline" className="text-green-600">Set</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                                        <span className="text-muted-foreground">GOLD_API_KEY</span>
                                        <Badge variant="outline" className="text-green-600">Set</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-2 bg-background rounded border">
                                        <span className="text-muted-foreground">STGK_SERVICE_KEY</span>
                                        <Badge variant="outline" className="text-green-600">Set</Badge>
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
