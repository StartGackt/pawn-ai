"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, Server, RefreshCw, Database, CloudCog } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function ApiConfigPage() {
    const [isConnecting, setIsConnecting] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<"idle" | "connected" | "error">("idle");

    const handleTestConnection = () => {
        setIsConnecting(true);
        setConnectionStatus("idle");
        // Simulate API call
        setTimeout(() => {
            setIsConnecting(false);
            // Random success/fail for demo
            const success = true; // Force success for better UX in presentation
            setConnectionStatus(success ? "connected" : "error");
        }, 1500);
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">ตั้งค่าการเชื่อมต่อ (Service Configuration)</h1>
                <p className="text-slate-500">จัดการการเชื่อมต่อกับระบบภายนอกและบริการต่างๆ (External Services & Core Banking)</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-slate-500" />
                        การเชื่อมต่อฐานข้อมูลกลาง (Core Pawn DB)
                    </CardTitle>
                    <CardDescription>ตั้งค่าการดึงข้อมูลทรัพย์หลุดจำนำ, อัตราดอกเบี้ย, และสาขา</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="url">API Endpoint URL</Label>
                            <Input id="url" defaultValue="https://api.pawn.stgk.go.th/v1/services" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="grid gap-2">
                                <Label htmlFor="key">Service Key</Label>
                                <Input id="key" type="password" value="sk_live_pawn_service_998877" readOnly />
                            </div>
                             <div className="grid gap-2">
                                <Label htmlFor="version">API Version</Label>
                                <Input id="version" value="v2.5.0 (Latest)" readOnly />
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-700">Service Modules Status</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-2">
                                    <CloudCog className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">Interest Calculator Service</span>
                                </div>
                                <Switch checked disabled />
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-2">
                                    <Database className="h-4 w-4 text-green-500" />
                                    <span className="text-sm">Online Appraisal Service</span>
                                </div>
                                <Switch checked disabled />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border mt-2">
                        <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${
                                connectionStatus === 'connected' ? 'bg-green-500' :
                                connectionStatus === 'error' ? 'bg-red-500' :
                                'bg-slate-300'
                            }`} />
                            <div className="flex flex-col">
                                <span className="font-medium text-sm">สถานะระบบโดยรวม</span>
                                <span className="text-xs text-muted-foreground">
                                    {connectionStatus === 'idle' && "รอการตรวจสอบ"}
                                    {connectionStatus === 'connected' && "ระบบทำงานปกติ (Online)"}
                                    {connectionStatus === 'error' && "พบข้อผิดพลาด"}
                                </span>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            onClick={handleTestConnection} 
                            disabled={isConnecting}
                        >
                            {isConnecting ? (
                                <>
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                    กำลังตรวจสอบ...
                                </>
                            ) : (
                                "ตรวจสอบระบบ"
                            )}
                        </Button>
                    </div>

                    {connectionStatus === 'connected' && (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded border border-green-100">
                            <CheckCircle2 className="h-4 w-4" />
                            เชื่อมต่อกับเซิร์ฟเวอร์ สธค. เรียบร้อยแล้ว (All services synced)
                        </div>
                    )}
                </CardContent>
                <CardFooter className="justify-end gap-2">
                    <Button variant="ghost">รีเซ็ต</Button>
                    <Button>บันทึกการเปลี่ยนแปลง</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
