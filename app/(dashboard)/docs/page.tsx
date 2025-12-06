import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, BookOpen, Code, Database, Shield } from "lucide-react";

export default function DocumentationPage() {
    return (
        <div className="container mx-auto space-y-8 py-8">
            {/* Header */}
            <div>
                <h1 className="mb-4 text-4xl font-bold">เอกสารประกอบระบบ</h1>
                <p className="text-xl text-muted-foreground">
                    System Documentation - คู่มือการใช้งานและการพัฒนาระบบ
                </p>
            </div>

            {/* Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        ภาพรวมระบบ
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        ระบบ Pawn AI Analytics เป็นระบบถาม-ตอบอัตโนมัติด้วยปัญญาประดิษฐ์สำหรับสำนักงานธนานุเคราะห์
                        ที่สามารถสื่อสารเป็นภาษาไทยในรูปแบบภาษาธรรมชาติ วิเคราะห์ข้อมูล และคาดการณ์แนวโน้มทางธุรกิจได้อย่างแม่นยำ
                    </p>

                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <h3 className="mb-2 font-semibold">AI Chatbot</h3>
                            <p className="text-sm text-muted-foreground">
                                ตอบคำถามอัตโนมัติด้วย NLP และ Multi-LLM Support
                            </p>
                        </div>
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <h3 className="mb-2 font-semibold">Price Analysis</h3>
                            <p className="text-sm text-muted-foreground">
                                วิเคราะห์ราคาทองไทยและโลกแบบ Real-time
                            </p>
                        </div>
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <h3 className="mb-2 font-semibold">ML Prediction</h3>
                            <p className="text-sm text-muted-foreground">
                                คาดการณ์แนวโน้มด้วย Machine Learning Models
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* API Documentation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Code className="h-6 w-6" />
                        API Documentation
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* API 1 */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge>GET</Badge>
                            <code className="text-sm">/api/gold-price</code>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            ดึงข้อมูลราคาทองคำไทย (ทองแท่ง, ทองรูปพรรณ) จาก Thai Gold API
                        </p>
                        <div className="rounded-lg bg-muted p-3">
                            <pre className="text-xs">
                                {`{
  "date": "06 ธันวาคม 2568",
  "updateTime": "เวลา 09:13 น.",
  "data": [
    {
      "name": "ทองคำแท่ง 96.5%",
      "buy": "63,500.00",
      "sell": "63,400.00"
    }
  ]
}`}
                            </pre>
                        </div>
                    </div>

                    {/* API 2 */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge>GET</Badge>
                            <code className="text-sm">/api/gold-world</code>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            ดึงข้อมูลราคาทองโลก (XAU/USD) พร้อมข้อมูล 24h High/Low
                        </p>
                        <div className="rounded-lg bg-muted p-3">
                            <pre className="text-xs">
                                {`{
  "price": 2650.50,
  "change": 12.30,
  "changePercent": 0.47,
  "high24h": 2665.00,
  "low24h": 2638.00,
  "timestamp": "2025-12-06T10:00:00.000Z",
  "currency": "USD"
}`}
                            </pre>
                        </div>
                    </div>

                    {/* API 3 */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge>GET</Badge>
                            <code className="text-sm">/api/gold-prediction?days=7</code>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            คาดการณ์ราคาทองโดยใช้ Moving Average และ Trend Analysis
                        </p>
                        <div className="rounded-lg bg-muted p-3">
                            <pre className="text-xs">
                                {`{
  "predictions": [
    {
      "date": "2025-12-07",
      "predicted": 2655.30,
      "lower": 2640.30,
      "upper": 2670.30
    }
  ],
  "trend": "up",
  "confidence": 87,
  "analysis": "..."
}`}
                            </pre>
                        </div>
                    </div>

                    {/* API 4 */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">POST</Badge>
                            <code className="text-sm">/api/chat-simple</code>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            AI Chatbot API รองรับ Claude, GPT-4o, และ Grok พร้อม RAG System
                        </p>
                        <div className="rounded-lg bg-muted p-3">
                            <pre className="text-xs">
                                {`// Request
{
  "messages": [
    { "role": "user", "content": "ราคาทองวันนี้" }
  ],
  "model": "claude"
}

// Response
{
  "role": "assistant",
  "content": "ราคาทองคำไทยวันนี้...",
  "model": "claude"
}`}
                            </pre>
                        </div>
                    </div>

                    {/* API 5 */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary">POST</Badge>
                            <code className="text-sm">/api/knowledge</code>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Knowledge Base API สำหรับค้นหาข้อมูลธนานุเคราะห์
                        </p>
                        <div className="rounded-lg bg-muted p-3">
                            <pre className="text-xs">
                                {`// Request
{
  "question": "อัตราดอกเบี้ยรับจำนำ"
}

// Response
{
  "success": true,
  "context": "...",
  "documentsUsed": ["อัตราดอกเบี้ยรับจำนำ"]
}`}
                            </pre>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ML Models */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-6 w-6" />
                        Machine Learning Models
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-2 font-semibold">Time Series Forecasting</h3>
                            <p className="mb-3 text-sm text-muted-foreground">
                                ใช้ Moving Average และ Linear Trend สำหรับคาดการณ์ราคาทอง
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>Simple Moving Average (SMA)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>Trend Analysis</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>Confidence Interval Calculation</span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-lg border p-4">
                            <h3 className="mb-2 font-semibold">Natural Language Processing</h3>
                            <p className="mb-3 text-sm text-muted-foreground">
                                ประมวลผลภาษาไทยด้วย LLM และ RAG System
                            </p>
                            <ul className="space-y-1 text-sm">
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>Multi-LLM Support (Claude, GPT, Grok)</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>RAG with Knowledge Base</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                    <span>Context-Aware Responses</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="rounded-lg bg-blue-500/5 border-blue-500/20 border p-4">
                        <h3 className="mb-2 font-semibold text-blue-600">Future Enhancements</h3>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Prophet Model สำหรับคาดการณ์ระยะยาว</li>
                            <li>• LSTM Neural Network สำหรับ Time Series</li>
                            <li>• XGBoost สำหรับ Classification Tasks</li>
                            <li>• Vector Database (Pinecone/Weaviate) สำหรับ RAG</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Security & Compliance */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-6 w-6" />
                        Security & Compliance
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="mb-3 font-semibold">มาตรการความปลอดภัย</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                    <span><strong>SSL/TLS Encryption:</strong> การเข้ารหัสข้อมูลทั้งหมด</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                    <span><strong>API Key Management:</strong> จัดเก็บ Keys ใน Environment Variables</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                    <span><strong>Rate Limiting:</strong> จำกัดการเรียก API ป้องกัน Abuse</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                    <span><strong>Input Validation:</strong> ตรวจสอบข้อมูลนำเข้าทุกครั้ง</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-3 font-semibold">การปฏิบัติตามมาตรฐาน</h3>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                    <span><strong>PDPA Compliance:</strong> ปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                    <span><strong>Data Privacy:</strong> ไม่เก็บข้อมูลส่วนบุคคลโดยไม่จำเป็น</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                    <span><strong>Audit Logging:</strong> บันทึกการใช้งานระบบทั้งหมด</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                                    <span><strong>Regular Updates:</strong> อัพเดทความปลอดภัยเป็นประจำ</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Deployment */}
            <Card>
                <CardHeader>
                    <CardTitle>Deployment & Infrastructure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <h3 className="mb-2 font-semibold text-sm">Primary System</h3>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                <li>• Vercel Edge Network</li>
                                <li>• Auto-scaling</li>
                                <li>• Global CDN</li>
                                <li>• 99.9% Uptime SLA</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <h3 className="mb-2 font-semibold text-sm">Backup System</h3>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                <li>• Secondary Server</li>
                                <li>• Auto Failover</li>
                                <li>• Data Replication</li>
                                <li>• Disaster Recovery</li>
                            </ul>
                        </div>
                        <div className="rounded-lg border bg-muted/30 p-4">
                            <h3 className="mb-2 font-semibold text-sm">Monitoring</h3>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                                <li>• Health Checks (24/7)</li>
                                <li>• Performance Metrics</li>
                                <li>• Error Tracking</li>
                                <li>• Alert System</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* User Guide */}
            <Card>
                <CardHeader>
                    <CardTitle>คู่มือการใช้งาน</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div>
                            <h3 className="mb-2 font-semibold">1. การใช้งาน AI Chatbot</h3>
                            <p className="mb-2 text-sm text-muted-foreground">
                                เข้าใช้งานผ่านเมนู &ldquo;AI Chatbot&rdquo; พิมพ์คำถามเป็นภาษาไทยธรรมชาติ ระบบจะตอบโดยอัตโนมัติ
                            </p>
                            <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
                                <li>รองรับคำถามเกี่ยวกับราคาทองคำ</li>
                                <li>วิเคราะห์และคาดการณ์แนวโน้ม</li>
                                <li>ตอบคำถามเกี่ยวกับระเบียบธนานุเคราะห์</li>
                                <li>ให้คำแนะนำทางธุรกิจ</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-2 font-semibold">2. การดูข้อมูลราคาทอง</h3>
                            <p className="text-sm text-muted-foreground">
                                ราคาทองแสดงใน Sidebar ด้านขวา อัพเดทอัตโนมัติทุก 5 นาที คลิก Refresh เพื่ออัพเดททันที
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2 font-semibold">3. การดูคาดการณ์ราคา</h3>
                            <p className="text-sm text-muted-foreground">
                                Component &ldquo;คาดการณ์ราคาทอง&rdquo; แสดงแนวโน้ม 7/14/30 วัน พร้อมความเชื่อมั่นและช่วงราคา
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
