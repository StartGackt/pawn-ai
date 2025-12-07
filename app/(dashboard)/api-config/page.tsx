"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Server, RefreshCw, Database, CloudCog, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function ApiConfigPage() {
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<"idle" | "connected" | "error">("idle");

    const handleTestConnection = () => {
        setIsConnecting(true);
        setConnectionStatus("idle");
        setTimeout(() => {
            setIsConnecting(false);
            setConnectionStatus("connected");
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6 max-w-4xl">
            {/* Page Header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 font-medium">
                        <Settings className="mr-1.5 h-3 w-3" />
                        Configuration
                    </Badge>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">ตั้งค่าการเชื่อมต่อ</h1>
                <p className="text-sm text-slate-500 mt-0.5">จัดการการเชื่อมต่อกับระบบภายนอกและบริการต่างๆ</p>
            </div>

            {/* Main Config Card */}
            <Card className="border-slate-200 shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-slate-700 flex items-center gap-2">
                        <Server className="h-4 w-4 text-slate-500" />
                        การเชื่อมต่อฐานข้อมูลกลาง
                    </CardTitle>
                    <CardDescription className="text-xs">ตั้งค่าการดึงข้อมูลทรัพย์หลุดจำนำ, อัตราดอกเบี้ย, และสาขา</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div className="grid gap-3">
                        <div className="grid gap-1.5">
                            <Label htmlFor="url" className="text-xs text-slate-600">API Endpoint URL</Label>
                            <Input id="url" defaultValue="https://api.pawn.stgk.go.th/v1/services" className="h-9 text-sm" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="grid gap-1.5">
                                <Label htmlFor="key" className="text-xs text-slate-600">Service Key</Label>
                                <Input id="key" type="password" value="sk_live_pawn_service_998877" readOnly className="h-9 text-sm" />
                            </div>
                            <div className="grid gap-1.5">
                                <Label htmlFor="version" className="text-xs text-slate-600">API Version</Label>
                                <Input id="version" value="v2.5.0 (Latest)" readOnly className="h-9 text-sm bg-slate-50" />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <h3 className="text-xs font-medium text-slate-600">Service Modules</h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div className="flex items-center justify-between p-2.5 border border-slate-200 rounded-lg bg-slate-50/50">
                                <div className="flex items-center gap-2">
                                    <CloudCog className="h-4 w-4 text-blue-500" />
                                    <span className="text-xs text-slate-600">Interest Calculator</span>
                                </div>
                                <Switch checked disabled className="scale-90" />
                            </div>
                            <div className="flex items-center justify-between p-2.5 border border-slate-200 rounded-lg bg-slate-50/50">
                                <div className="flex items-center gap-2">
                                    <Database className="h-4 w-4 text-emerald-500" />
                                    <span className="text-xs text-slate-600">Online Appraisal</span>
                                </div>
                                <Switch checked disabled className="scale-90" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2.5">
                            <div className={`h-2.5 w-2.5 rounded-full ${connectionStatus === 'connected' ? 'bg-emerald-500' :
                                    connectionStatus === 'error' ? 'bg-red-500' :
                                        'bg-slate-300'
                                }`} />
                            <div className="flex flex-col">
                                <span className="font-medium text-xs text-slate-700">สถานะระบบ</span>
                                <span className="text-xs text-slate-500">
                                    {connectionStatus === 'idle' && "รอการตรวจสอบ"}
                                    {connectionStatus === 'connected' && "ระบบทำงานปกติ"}
                                    {connectionStatus === 'error' && "พบข้อผิดพลาด"}
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleTestConnection}
                            disabled={isConnecting}
                            className="h-8 text-xs"
                        >
                            {isConnecting ? (
                                <>
                                    <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                    ตรวจสอบ...
                                </>
                            ) : (
                                "ตรวจสอบระบบ"
                            )}
                        </Button>
                    </div>

                    {connectionStatus === 'connected' && (
                        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                            <CheckCircle2 className="h-4 w-4" />
                            เชื่อมต่อกับเซิร์ฟเวอร์ สธค. เรียบร้อยแล้ว
                        </div>
                    )}
                </CardContent>
                <CardFooter className="justify-end gap-2 pt-4 border-t">
                    <Button variant="ghost" size="sm" className="h-8 text-xs">รีเซ็ต</Button>
                    <Button size="sm" className="h-8 text-xs">บันทึกการเปลี่ยนแปลง</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
