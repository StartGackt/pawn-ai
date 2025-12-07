import { Database, Brain, Monitor, Shield, Server, Cloud, RefreshCw, Users, FileText, MessageSquare, BarChart3, Layers, Globe, Building2, Calendar, TrendingUp, Lock, Key, AlertTriangle, CheckCircle2, ArrowRight, ArrowDown, Cpu, HardDrive, Network } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ArchitecturePage() {
    return (
        <div className="container mx-auto space-y-8 py-8 px-4">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold">
                    สถาปัตยกรรมระบบปัญญาประดิษฐ์
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    AI System Architecture - ระบบวิเคราะห์และพยากรณ์ทรัพย์สินด้วย Predictive Data Model
                    <br />สำนักงานธนานุเคราะห์ (สธค.)
                </p>
            </div>

            {/* Main Architecture Diagram */}
            <Card className="border-2 border-primary/20">
                <CardHeader className="text-center bg-muted/30">
                    <CardTitle className="text-2xl">🏗️ System Architecture Overview</CardTitle>
                    <p className="text-sm text-muted-foreground">การแบ่งชั้นของระบบตามมาตรฐาน Enterprise Architecture</p>
                </CardHeader>
                <CardContent className="p-6 space-y-4">

                    {/* Layer 1: Application Layer */}
                    <div className="rounded-xl border-2 border-blue-500 bg-blue-500/5 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500 rounded-lg">
                                <Monitor className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-blue-600">Application Layer</h3>
                                <p className="text-sm text-muted-foreground">ชั้นแอปพลิเคชัน - ส่วนติดต่อผู้ใช้งาน</p>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-4">
                            <Card className="bg-background">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Globe className="h-4 w-4 text-blue-500" />
                                        <h4 className="font-semibold text-sm">Web UI</h4>
                                    </div>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• Next.js 15 + React 19</li>
                                        <li>• Responsive Design</li>
                                        <li>• Thai Language Support</li>
                                        <li>• Real-time Dashboard</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MessageSquare className="h-4 w-4 text-blue-500" />
                                        <h4 className="font-semibold text-sm">AI Chatbot</h4>
                                    </div>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• Prompt-based Interface</li>
                                        <li>• ถาม-ตอบอัตโนมัติ</li>
                                        <li>• ภาษาธรรมชาติไทย</li>
                                        <li>• Context Awareness</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BarChart3 className="h-4 w-4 text-blue-500" />
                                        <h4 className="font-semibold text-sm">Dashboard & Reports</h4>
                                    </div>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• ราคารับจำนำ</li>
                                        <li>• ประวัติการรับจำนำ</li>
                                        <li>• ทรัพย์หลุดจำนำ</li>
                                        <li>• Export Excel</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Users className="h-4 w-4 text-blue-500" />
                                        <h4 className="font-semibold text-sm">User Management</h4>
                                    </div>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• ผู้ใช้งานระบบ</li>
                                        <li>• ผู้ดูแลระบบ</li>
                                        <li>• Role-based Access</li>
                                        <li>• Activity Logging</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Arrow Down */}
                    <div className="flex justify-center">
                        <ArrowDown className="h-8 w-8 text-muted-foreground" />
                    </div>

                    {/* Layer 2: API Gateway */}
                    <div className="rounded-xl border-2 border-green-500 bg-green-500/5 p-4">
                        <div className="flex items-center justify-center gap-3">
                            <Network className="h-6 w-6 text-green-600" />
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-green-600">API Gateway Layer</h3>
                                <p className="text-sm text-muted-foreground">REST API | Authentication | Rate Limiting | Load Balancing</p>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-3 flex-wrap">
                            <Badge variant="secondary">REST API เชื่อมต่อฐานข้อมูล สธค.</Badge>
                            <Badge variant="secondary">JWT Authentication</Badge>
                            <Badge variant="secondary">API Rate Limiting</Badge>
                            <Badge variant="secondary">Request Validation</Badge>
                        </div>
                    </div>

                    {/* Arrow Down */}
                    <div className="flex justify-center">
                        <ArrowDown className="h-8 w-8 text-muted-foreground" />
                    </div>

                    {/* Layer 3: Model Layer */}
                    <div className="rounded-xl border-2 border-purple-500 bg-purple-500/5 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-500 rounded-lg">
                                <Brain className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-purple-600">Model Layer</h3>
                                <p className="text-sm text-muted-foreground">ชั้นโมเดล AI - Predictive Data Model & LLM</p>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="bg-background border-purple-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Cpu className="h-4 w-4 text-purple-500" />
                                        <h4 className="font-semibold text-sm">LLM AI Model</h4>
                                    </div>
                                    <Badge className="mb-2 bg-purple-100 text-purple-700">Open Source</Badge>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• LLAMA / Mistral</li>
                                        <li>• Fine-tuning for สธค.</li>
                                        <li>• Thai NLP Optimized</li>
                                        <li>• RAG Integration</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background border-purple-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="h-4 w-4 text-purple-500" />
                                        <h4 className="font-semibold text-sm">Gold Price Prediction</h4>
                                    </div>
                                    <Badge className="mb-2 bg-amber-100 text-amber-700">Forecasting</Badge>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• ระยะสั้น (1-7 วัน)</li>
                                        <li>• ระยะกลาง (1-4 สัปดาห์)</li>
                                        <li>• ระยะยาว (1-3 เดือน)</li>
                                        <li>• LSTM / Prophet</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background border-purple-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="h-4 w-4 text-purple-500" />
                                        <h4 className="font-semibold text-sm">Forfeiture Prediction</h4>
                                    </div>
                                    <Badge className="mb-2 bg-red-100 text-red-700">Risk Analysis</Badge>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• คาดการณ์หลุดจำนำ</li>
                                        <li>• เลือกช่วงเวลาได้</li>
                                        <li>• ความน่าจะเป็นไถ่ถอน</li>
                                        <li>• Risk Assessment</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background border-purple-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BarChart3 className="h-4 w-4 text-purple-500" />
                                        <h4 className="font-semibold text-sm">Data Analysis</h4>
                                    </div>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• วิเคราะห์ทรัพย์สิน สธค.</li>
                                        <li>• แนวโน้มหลุดจำนำ</li>
                                        <li>• Pattern Recognition</li>
                                        <li>• Statistical Analysis</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Arrow Down */}
                    <div className="flex justify-center">
                        <ArrowDown className="h-8 w-8 text-muted-foreground" />
                    </div>

                    {/* Layer 4: Data Layer */}
                    <div className="rounded-xl border-2 border-orange-500 bg-orange-500/5 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-orange-500 rounded-lg">
                                <Database className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-orange-600">Data Layer</h3>
                                <p className="text-sm text-muted-foreground">ชั้นข้อมูล - Data Collection & Preparation</p>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="bg-background">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Building2 className="h-4 w-4 text-orange-500" />
                                        <h4 className="font-semibold text-sm">ข้อมูลภายใน สธค.</h4>
                                    </div>
                                    <Badge className="mb-2 bg-orange-100 text-orange-700">Internal Data</Badge>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• ประวัติการรับจำนำ</li>
                                        <li>• ข้อมูลการไถ่ถอน</li>
                                        <li>• ทรัพย์หลุดจำนำ</li>
                                        <li>• ราคารับจำนำ</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Globe className="h-4 w-4 text-orange-500" />
                                        <h4 className="font-semibold text-sm">ข้อมูลภายในประเทศ</h4>
                                    </div>
                                    <Badge className="mb-2 bg-green-100 text-green-700">Domestic</Badge>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• ราคาทอง (สมาคมค้าทองคำ)</li>
                                        <li>• อัตราแลกเปลี่ยน (BOT)</li>
                                        <li>• อัตราดอกเบี้ย</li>
                                        <li>• อัตราเงินเฟ้อ</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <TrendingUp className="h-4 w-4 text-orange-500" />
                                        <h4 className="font-semibold text-sm">ข้อมูลตลาดโลก</h4>
                                    </div>
                                    <Badge className="mb-2 bg-blue-100 text-blue-700">Global</Badge>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• ราคาทองคำโลก (XAU)</li>
                                        <li>• Gold Futures</li>
                                        <li>• วิกฤตภูมิรัฐศาสตร์</li>
                                        <li>• เศรษฐกิจโลก</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="h-4 w-4 text-orange-500" />
                                        <h4 className="font-semibold text-sm">ข้อมูลฤดูกาล</h4>
                                    </div>
                                    <Badge className="mb-2 bg-pink-100 text-pink-700">Seasonal</Badge>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• เทศกาลสำคัญ</li>
                                        <li>• พฤติกรรมซื้อทอง</li>
                                        <li>• ฤดูแต่งงาน</li>
                                        <li>• ช่วงจ่ายโบนัส</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Arrow Down */}
                    <div className="flex justify-center">
                        <ArrowDown className="h-8 w-8 text-muted-foreground" />
                    </div>

                    {/* Layer 5: Infrastructure Layer */}
                    <div className="rounded-xl border-2 border-red-500 bg-red-500/5 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-red-500 rounded-lg">
                                <Server className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-red-600">Infrastructure Layer</h3>
                                <p className="text-sm text-muted-foreground">ชั้นโครงสร้างพื้นฐาน - Primary/Secondary Systems</p>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            <Card className="bg-background border-green-300">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Server className="h-4 w-4 text-green-600" />
                                        <h4 className="font-semibold text-sm text-green-600">Primary System</h4>
                                        <Badge className="bg-green-500 text-white text-xs">ACTIVE</Badge>
                                    </div>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• Main Production Server</li>
                                        <li>• Load Balancer</li>
                                        <li>• Auto-scaling</li>
                                        <li>• 99.9% Uptime SLA</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background border-yellow-300">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <HardDrive className="h-4 w-4 text-yellow-600" />
                                        <h4 className="font-semibold text-sm text-yellow-600">Secondary System</h4>
                                        <Badge variant="outline" className="text-xs">STANDBY</Badge>
                                    </div>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• Hot Standby Server</li>
                                        <li>• Auto Failover (&lt;30s)</li>
                                        <li>• Data Replication</li>
                                        <li>• Disaster Recovery</li>
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-background">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <RefreshCw className="h-4 w-4 text-blue-500" />
                                        <h4 className="font-semibold text-sm">Monitoring & Logging</h4>
                                    </div>
                                    <Badge className="mb-2 bg-blue-100 text-blue-700">Monitoring</Badge>
                                    <ul className="space-y-1 text-xs text-muted-foreground">
                                        <li>• บันทึกการใช้งาน</li>
                                        <li>• Health Monitoring</li>
                                        <li>• Alert System</li>
                                        <li>• Performance Metrics</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Security & Compliance Section */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Security Measures */}
                <Card className="border-2 border-yellow-500">
                    <CardHeader className="bg-yellow-500/10">
                        <CardTitle className="flex items-center gap-2 text-yellow-600">
                            <Shield className="h-5 w-5" />
                            มาตรการความมั่นคงปลอดภัยข้อมูล
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">SSL/TLS Encryption</p>
                                <p className="text-xs text-muted-foreground">เข้ารหัสการสื่อสารทั้งหมดด้วย HTTPS</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Authentication & Authorization</p>
                                <p className="text-xs text-muted-foreground">ระบบยืนยันตัวตนและสิทธิ์การเข้าถึง</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">API Security</p>
                                <p className="text-xs text-muted-foreground">API Key Management, Rate Limiting, Input Validation</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Data Protection</p>
                                <p className="text-xs text-muted-foreground">เข้ารหัสข้อมูลสำคัญ, Secure Storage</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Audit Logging</p>
                                <p className="text-xs text-muted-foreground">บันทึกการใช้งานระบบทั้งหมด</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Compliance */}
                <Card className="border-2 border-cyan-500">
                    <CardHeader className="bg-cyan-500/10">
                        <CardTitle className="flex items-center gap-2 text-cyan-600">
                            <FileText className="h-5 w-5" />
                            การปฏิบัติตามมาตรฐาน
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-3">
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">PDPA Compliance</p>
                                <p className="text-xs text-muted-foreground">พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Data Retention Policy</p>
                                <p className="text-xs text-muted-foreground">นโยบายการเก็บรักษาข้อมูลตามกฎหมาย</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Access Control</p>
                                <p className="text-xs text-muted-foreground">Role-based Access Control (RBAC)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Business Continuity</p>
                                <p className="text-xs text-muted-foreground">แผนความต่อเนื่องทางธุรกิจ (BCP/DR)</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Regular Security Audit</p>
                                <p className="text-xs text-muted-foreground">ตรวจสอบความปลอดภัยเป็นประจำ</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Technical Stack */}
            <Card className="border-2">
                <CardHeader className="bg-muted/30">
                    <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        Technical Stack
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-4">
                        <div>
                            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                <Monitor className="h-4 w-4 text-blue-500" />
                                Frontend
                            </h4>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                <li>• Next.js 15 (App Router)</li>
                                <li>• React 19</li>
                                <li>• TypeScript</li>
                                <li>• TailwindCSS</li>
                                <li>• shadcn/ui</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                <Brain className="h-4 w-4 text-purple-500" />
                                AI/ML
                            </h4>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                <li>• LLAMA / Mistral (Open Source)</li>
                                <li>• LangChain</li>
                                <li>• Prophet / LSTM</li>
                                <li>• RAG System</li>
                                <li>• Vector Database</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                <Network className="h-4 w-4 text-green-500" />
                                APIs
                            </h4>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                <li>• RESTful API</li>
                                <li>• Next.js API Routes</li>
                                <li>• สธค. Database API</li>
                                <li>• External Data APIs</li>
                                <li>• WebSocket (Real-time)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                                <Cloud className="h-4 w-4 text-red-500" />
                                Infrastructure
                            </h4>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                <li>• Cloud Hosting (HA)</li>
                                <li>• Auto-scaling</li>
                                <li>• CDN (Global)</li>
                                <li>• Backup & DR</li>
                                <li>• Monitoring & Logging</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
