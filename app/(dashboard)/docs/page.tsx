import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, BookOpen, Code, Database, Shield, Rocket, HelpCircle } from "lucide-react";

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

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span className="hidden sm:inline">ภาพรวม</span>
                    </TabsTrigger>
                    <TabsTrigger value="internal-api" className="flex items-center gap-2">
                        <Code className="h-4 w-4" />
                        <span className="hidden sm:inline">Internal API</span>
                    </TabsTrigger>
                    <TabsTrigger value="external-api" className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span className="hidden sm:inline">External API</span>
                    </TabsTrigger>
                    <TabsTrigger value="ml" className="flex items-center gap-2">
                        <Rocket className="h-4 w-4" />
                        <span className="hidden sm:inline">ML Models</span>
                    </TabsTrigger>
                    <TabsTrigger value="security" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        <span className="hidden sm:inline">Security</span>
                    </TabsTrigger>
                    <TabsTrigger value="guide" className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">คู่มือ</span>
                    </TabsTrigger>
                </TabsList>

                {/* Tab: Overview */}
                <TabsContent value="overview" className="space-y-6 mt-6">
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
                </TabsContent>

                {/* Tab: Internal API */}
                <TabsContent value="internal-api" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Code className="h-6 w-6" />
                                API Documentation - Internal APIs
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
                                    <pre className="text-xs overflow-auto">
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
                                    <pre className="text-xs overflow-auto">
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
                                    <code className="text-sm">/api/exchange-rate</code>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    ดึงข้อมูลอัตราแลกเปลี่ยน THB/USD
                                </p>
                                <div className="rounded-lg bg-muted p-3">
                                    <pre className="text-xs overflow-auto">
                                        {`{
  "rate": 34.85,
  "change": 0.15,
  "changePercent": 0.43,
  "timestamp": "2025-12-06T10:00:00.000Z"
}`}
                                    </pre>
                                </div>
                            </div>

                            {/* API 4 */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge>GET</Badge>
                                    <code className="text-sm">/api/loan-rate</code>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    ดึงข้อมูลอัตราดอกเบี้ยรับจำนำของ สธค.
                                </p>
                                <div className="rounded-lg bg-muted p-3">
                                    <pre className="text-xs overflow-auto">
                                        {`{
  "rates": [
    {
      "type": "ทองคำ",
      "rate": "0.125%",
      "maxAmount": "100,000 บาท"
    }
  ],
  "effectiveDate": "2025-01-01"
}`}
                                    </pre>
                                </div>
                            </div>

                            {/* API 5 */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge>GET</Badge>
                                    <code className="text-sm">/api/gold-prediction?days=7</code>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    คาดการณ์ราคาทองโดยใช้ Moving Average และ Trend Analysis
                                </p>
                                <div className="rounded-lg bg-muted p-3">
                                    <pre className="text-xs overflow-auto">
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

                            {/* API 6 */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">POST</Badge>
                                    <code className="text-sm">/api/chat-simple</code>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    AI Chatbot API รองรับ Claude, GPT-4o, และ Grok พร้อม RAG System
                                </p>
                                <div className="rounded-lg bg-muted p-3">
                                    <pre className="text-xs overflow-auto">
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

                            {/* API 7 */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">POST</Badge>
                                    <code className="text-sm">/api/knowledge</code>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Knowledge Base API สำหรับค้นหาข้อมูลธนานุเคราะห์
                                </p>
                                <div className="rounded-lg bg-muted p-3">
                                    <pre className="text-xs overflow-auto">
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
                </TabsContent>

                {/* Tab: External API */}
                <TabsContent value="external-api" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Database className="h-6 w-6" />
                                External APIs - แหล่งข้อมูลภายนอก
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Gold Price API */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-yellow-500">External</Badge>
                                    <code className="text-sm">GoldAPI.io</code>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    ดึงข้อมูลราคาทองโลก XAU/USD แบบ Real-time
                                </p>
                                <div className="rounded-lg bg-muted p-3">
                                    <pre className="text-xs overflow-auto">
                                        {`GET https://www.goldapi.io/api/XAU/USD
Headers: x-access-token: {API_KEY}

Response:
{
  "price": 2650.50,
  "prev_close_price": 2638.20,
  "open_price": 2640.00,
  "high_price": 2665.00,
  "low_price": 2635.00
}`}
                                    </pre>
                                </div>
                            </div>

                            {/* Thai Gold API */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-yellow-500">External</Badge>
                                    <code className="text-sm">Thai Gold Traders Association</code>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    ดึงข้อมูลราคาทองไทยจากสมาคมค้าทองคำ (Web Scraping)
                                </p>
                                <div className="rounded-lg bg-muted p-3">
                                    <pre className="text-xs overflow-auto">
                                        {`Source: https://www.goldtraders.or.th/

Response:
{
  "date": "08 ธันวาคม 2568",
  "gold_bar": { "buy": 43,900, "sell": 43,800 },
  "gold_ornament": { "buy": 44,400, "sell": 43,400 }
}`}
                                    </pre>
                                </div>
                            </div>

                            {/* Exchange Rate API */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-yellow-500">External</Badge>
                                    <code className="text-sm">ExchangeRate-API</code>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    ดึงข้อมูลอัตราแลกเปลี่ยน USD/THB
                                </p>
                                <div className="rounded-lg bg-muted p-3">
                                    <pre className="text-xs overflow-auto">
                                        {`GET https://api.exchangerate-api.com/v4/latest/USD

Response:
{
  "rates": {
    "THB": 34.85
  },
  "time_last_updated": 1733616000
}`}
                                    </pre>
                                </div>
                            </div>

                            {/* LLM APIs */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-purple-500">AI</Badge>
                                    <code className="text-sm">LLM APIs (Multi-Provider)</code>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    AI Language Models สำหรับ Chatbot
                                </p>
                                <div className="rounded-lg bg-muted p-3">
                                    <pre className="text-xs overflow-auto">
                                        {`Providers:
• Claude (Anthropic) - api.anthropic.com
• GPT-4o (OpenAI) - api.openai.com
• Grok (xAI) - api.x.ai

All using Chat Completions API format`}
                                    </pre>
                                </div>
                            </div>

                            {/* API Summary Table */}
                            <div className="rounded-lg border p-4">
                                <h4 className="mb-3 font-semibold">สรุป External APIs ที่ใช้งาน</h4>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="py-2 text-left">API</th>
                                                <th className="py-2 text-left">ประเภท</th>
                                                <th className="py-2 text-left">ความถี่</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-2">GoldAPI.io</td>
                                                <td className="py-2">REST API</td>
                                                <td className="py-2">Real-time</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Thai Gold Association</td>
                                                <td className="py-2">Web Scraping</td>
                                                <td className="py-2">ทุก 5 นาที</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">ExchangeRate-API</td>
                                                <td className="py-2">REST API</td>
                                                <td className="py-2">รายวัน</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">Anthropic Claude</td>
                                                <td className="py-2">REST API</td>
                                                <td className="py-2">On-demand</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2">OpenAI GPT-4o</td>
                                                <td className="py-2">REST API</td>
                                                <td className="py-2">On-demand</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2">xAI Grok</td>
                                                <td className="py-2">REST API</td>
                                                <td className="py-2">On-demand</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: ML Models */}
                <TabsContent value="ml" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Rocket className="h-6 w-6" />
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

                    {/* Fine-tuning & Automated Data Preparation */}
                    <Card className="border-purple-500/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-purple-600">
                                <Rocket className="h-6 w-6" />
                                LLM Fine-tuning & Automated Data Preparation
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Fine-tuning Process */}
                            <div className="rounded-lg border border-purple-200 bg-purple-500/5 p-4">
                                <h3 className="mb-3 font-semibold text-purple-600">🔧 กระบวนการ Fine-tuning LLM</h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    การปรับแต่งโมเดล LLM (LLAMA/Mistral) ให้เหมาะสมกับบริบทของสำนักงานธนานุเคราะห์
                                    เพื่อให้สามารถตอบคำถามและวิเคราะห์ข้อมูลได้อย่างแม่นยำ
                                </p>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <h4 className="mb-2 font-medium text-sm">ขั้นตอนการ Fine-tuning:</h4>
                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <span>1. รวบรวม Training Data จากข้อมูล สธค.</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <span>2. สร้าง Instruction Dataset (Q&A pairs)</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <span>3. Fine-tune ด้วย LoRA/QLoRA technique</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <span>4. Evaluate และ Benchmark ผลลัพธ์</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <span>5. Deploy โมเดลที่ปรับแต่งแล้ว</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="mb-2 font-medium text-sm">ข้อมูลที่ใช้ Fine-tuning:</h4>
                                        <ul className="space-y-1 text-sm text-muted-foreground">
                                            <li>• ระเบียบ/ข้อบังคับของ สธค.</li>
                                            <li>• คู่มือการปฏิบัติงานรับจำนำ</li>
                                            <li>• ประวัติคำถาม-คำตอบจากพนักงาน</li>
                                            <li>• ข้อมูลราคาทองย้อนหลัง</li>
                                            <li>• รายงานวิเคราะห์แนวโน้มตลาด</li>
                                            <li>• เอกสารความรู้เฉพาะทาง (Domain Knowledge)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Fine-tuning Techniques */}
                            <div className="rounded-lg border border-indigo-200 bg-indigo-500/5 p-4">
                                <h3 className="mb-3 font-semibold text-indigo-600">🧠 Fine-tuning Techniques (เทคนิคการปรับแต่งโมเดล)</h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    เทคนิคการ Fine-tuning ที่ใช้ในการปรับแต่ง LLM ให้เหมาะสมกับงานของ สธค.
                                </p>

                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
                                    {/* LoRA */}
                                    <div className="rounded-lg border bg-background p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge className="bg-indigo-500">Recommended</Badge>
                                        </div>
                                        <h4 className="font-semibold text-sm mb-2">LoRA (Low-Rank Adaptation)</h4>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            เทคนิคที่ปรับแต่งเฉพาะ Low-rank matrices แทนการปรับทั้งโมเดล
                                        </p>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>ใช้ Memory น้อย (~10-20%)</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Training เร็ว</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>รักษา Performance เดิม</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>สลับ Adapter ได้</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* QLoRA */}
                                    <div className="rounded-lg border bg-background p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge className="bg-green-500">Memory Efficient</Badge>
                                        </div>
                                        <h4 className="font-semibold text-sm mb-2">QLoRA (Quantized LoRA)</h4>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            LoRA + 4-bit Quantization ประหยัด Memory มากที่สุด
                                        </p>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>ใช้ Memory น้อยมาก (~5%)</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Train 65B model บน GPU 48GB</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>NF4 Quantization</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Double Quantization</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Full Fine-tuning */}
                                    <div className="rounded-lg border bg-background p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline">Full Training</Badge>
                                        </div>
                                        <h4 className="font-semibold text-sm mb-2">Full Fine-tuning</h4>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            ปรับแต่งทุก Parameter ของโมเดล (ต้องใช้ทรัพยากรสูง)
                                        </p>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>ผลลัพธ์ดีที่สุด</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-yellow-500" />
                                                <span>ใช้ GPU/TPU มาก</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-yellow-500" />
                                                <span>Training นาน</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-yellow-500" />
                                                <span>เสี่ยง Catastrophic Forgetting</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* PEFT */}
                                    <div className="rounded-lg border bg-background p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge className="bg-purple-500">Framework</Badge>
                                        </div>
                                        <h4 className="font-semibold text-sm mb-2">PEFT (Parameter-Efficient)</h4>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            Framework รวมเทคนิค Fine-tuning ประสิทธิภาพสูง
                                        </p>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>รองรับ LoRA, Prefix Tuning</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>P-Tuning, Prompt Tuning</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>IA3, AdaLoRA</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>HuggingFace Integration</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* SFT */}
                                    <div className="rounded-lg border bg-background p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge className="bg-orange-500">Instruction</Badge>
                                        </div>
                                        <h4 className="font-semibold text-sm mb-2">SFT (Supervised Fine-Tuning)</h4>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            Fine-tune ด้วย Instruction-Response pairs
                                        </p>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>สอนให้ทำตามคำสั่ง</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>ใช้ Dataset Q&A</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>เหมาะกับ Chatbot</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>ใช้ร่วมกับ LoRA ได้</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* RLHF */}
                                    <div className="rounded-lg border bg-background p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge className="bg-pink-500">Advanced</Badge>
                                        </div>
                                        <h4 className="font-semibold text-sm mb-2">RLHF / DPO</h4>
                                        <p className="text-xs text-muted-foreground mb-3">
                                            ปรับแต่งตาม Human Feedback / Direct Preference
                                        </p>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>RLHF: Reward Model</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>DPO: ไม่ต้อง Reward Model</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>เรียนรู้จากการจัดอันดับ</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>ปรับให้ตอบตามที่ต้องการ</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Comparison Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b bg-indigo-50 dark:bg-indigo-950/30">
                                                <th className="py-2 px-3 text-left">เทคนิค</th>
                                                <th className="py-2 px-3 text-left">Memory</th>
                                                <th className="py-2 px-3 text-left">Speed</th>
                                                <th className="py-2 px-3 text-left">Quality</th>
                                                <th className="py-2 px-3 text-left">Use Case</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-2 px-3 font-medium">LoRA</td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-green-100 text-green-700">ต่ำ</Badge></td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-green-100 text-green-700">เร็ว</Badge></td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-blue-100 text-blue-700">ดี</Badge></td>
                                                <td className="py-2 px-3 text-muted-foreground">General Fine-tuning</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 px-3 font-medium">QLoRA</td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-green-100 text-green-700">ต่ำมาก</Badge></td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-yellow-100 text-yellow-700">ปานกลาง</Badge></td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-blue-100 text-blue-700">ดี</Badge></td>
                                                <td className="py-2 px-3 text-muted-foreground">Limited GPU Resource</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 px-3 font-medium">Full Fine-tune</td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-red-100 text-red-700">สูงมาก</Badge></td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-red-100 text-red-700">ช้า</Badge></td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-green-100 text-green-700">ดีที่สุด</Badge></td>
                                                <td className="py-2 px-3 text-muted-foreground">Maximum Performance</td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 px-3 font-medium">SFT + LoRA</td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-green-100 text-green-700">ต่ำ</Badge></td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-green-100 text-green-700">เร็ว</Badge></td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-green-100 text-green-700">ดีมาก</Badge></td>
                                                <td className="py-2 px-3 text-muted-foreground">Chatbot / Q&A (แนะนำ)</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-3 font-medium">DPO</td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-yellow-100 text-yellow-700">ปานกลาง</Badge></td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-yellow-100 text-yellow-700">ปานกลาง</Badge></td>
                                                <td className="py-2 px-3"><Badge variant="secondary" className="bg-green-100 text-green-700">ดีมาก</Badge></td>
                                                <td className="py-2 px-3 text-muted-foreground">Alignment / Preference</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* Code Example */}
                                <div className="mt-4 rounded-lg bg-muted p-3">
                                    <h4 className="mb-2 font-medium text-sm">💻 ตัวอย่าง Code Fine-tuning ด้วย LoRA + SFT:</h4>
                                    <pre className="text-xs overflow-auto">
                                        {`from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer
from datasets import load_dataset

# 1. Load Base Model (LLAMA / Mistral)
model_name = "meta-llama/Llama-2-7b-hf"
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    load_in_4bit=True,  # QLoRA: 4-bit quantization
    device_map="auto"
)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# 2. Configure LoRA
lora_config = LoraConfig(
    r=16,                          # Rank
    lora_alpha=32,                 # Alpha scaling
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],  # Attention layers
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

# 3. Apply LoRA to model
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()  # ~0.1% of total params

# 4. Prepare Dataset (สธค. Q&A pairs)
dataset = load_dataset("json", data_files="stgk_qa_dataset.json")

# Format: {"instruction": "คำถาม", "response": "คำตอบ"}
def format_prompt(example):
    return f"""### คำถาม:
{example['instruction']}

### คำตอบ:
{example['response']}"""

# 5. Training Arguments
training_args = TrainingArguments(
    output_dir="./stgk-llm-finetuned",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    warmup_ratio=0.03,
    logging_steps=10,
    save_strategy="epoch",
    fp16=True,
)

# 6. SFT Trainer
trainer = SFTTrainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    formatting_func=format_prompt,
    max_seq_length=2048,
)

# 7. Train!
trainer.train()

# 8. Save LoRA Adapter
model.save_pretrained("./stgk-lora-adapter")
tokenizer.save_pretrained("./stgk-lora-adapter")`}
                                    </pre>
                                </div>
                            </div>

                            {/* Dataset Preparation */}
                            <div className="rounded-lg border border-cyan-200 bg-cyan-500/5 p-4">
                                <h3 className="mb-3 font-semibold text-cyan-600">📁 Dataset Preparation (การเตรียม Training Data)</h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    การเตรียมข้อมูลที่มีคุณภาพเป็นปัจจัยสำคัญที่สุดในการ Fine-tune LLM ให้ได้ผลลัพธ์ที่ดี
                                </p>

                                <div className="grid gap-4 md:grid-cols-2 mb-4">
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm text-cyan-600">📝 รูปแบบ Dataset ที่แนะนำ:</h4>
                                        <div className="rounded bg-muted p-2 mb-2">
                                            <pre className="text-xs overflow-auto">
                                                {`// Instruction Format (Alpaca Style)
{
  "instruction": "อัตราดอกเบี้ยรับจำนำทองคำคือเท่าไร?",
  "input": "",  // optional context
  "output": "อัตราดอกเบี้ยรับจำนำทองคำของ สธค. 
             อยู่ที่ 0.125% ต่อเดือน สำหรับ
             วงเงินไม่เกิน 100,000 บาท"
}

// Chat Format (ShareGPT Style)  
{
  "conversations": [
    {"from": "human", "value": "ราคาทองวันนี้เท่าไร?"},
    {"from": "gpt", "value": "ราคาทองคำแท่ง 96.5% 
                              วันนี้อยู่ที่..."}
  ]
}`}
                                            </pre>
                                        </div>
                                    </div>

                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm text-cyan-600">✅ เกณฑ์คุณภาพ Dataset:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span><strong>Diversity:</strong> ครอบคลุมหลายหัวข้อ/สถานการณ์</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span><strong>Quality:</strong> คำตอบถูกต้อง ชัดเจน</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span><strong>Consistency:</strong> รูปแบบการตอบสม่ำเสมอ</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span><strong>Volume:</strong> อย่างน้อย 1,000-5,000 samples</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span><strong>Balance:</strong> สมดุลระหว่างหัวข้อต่างๆ</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span><strong>Clean:</strong> ไม่มี noise/ข้อมูลผิด</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-muted p-3">
                                    <h4 className="mb-2 font-medium text-sm">📊 ตัวอย่าง Dataset สธค.:</h4>
                                    <pre className="text-xs overflow-auto">
                                        {`[
  {
    "instruction": "สธค. คืออะไร?",
    "output": "สธค. หรือ สำนักงานธนานุเคราะห์ เป็นหน่วยงานรัฐวิสาหกิจ..."
  },
  {
    "instruction": "อัตราดอกเบี้ยรับจำนำทองคำคือเท่าไร?",
    "output": "อัตราดอกเบี้ยรับจำนำทองคำของ สธค. มีดังนี้:\\n- วงเงินไม่เกิน 5,000 บาท: 0.25%/เดือน\\n- วงเงิน 5,001-20,000 บาท: 0.75%/เดือน..."
  },
  {
    "instruction": "ราคาทองคำมีแนวโน้มอย่างไร?",
    "output": "จากการวิเคราะห์ข้อมูลราคาทองคำ พบว่า..."
  },
  {
    "instruction": "ขั้นตอนการจำนำทองมีอย่างไร?",
    "output": "ขั้นตอนการจำนำทองที่ สธค. มีดังนี้:\\n1. นำทองมาประเมินราคา\\n2. ยื่นบัตรประชาชน..."
  }
]`}
                                    </pre>
                                </div>
                            </div>

                            {/* Evaluation Metrics */}
                            <div className="rounded-lg border border-emerald-200 bg-emerald-500/5 p-4">
                                <h3 className="mb-3 font-semibold text-emerald-600">📈 Evaluation Metrics (การวัดผลและประเมิน)</h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    การวัดผล Performance ของโมเดลหลัง Fine-tune เพื่อให้มั่นใจว่าโมเดลทำงานได้ตามที่ต้องการ
                                </p>

                                <div className="grid gap-4 md:grid-cols-3 mb-4">
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm text-emerald-600">🎯 Accuracy Metrics:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li>• <strong>BLEU Score:</strong> วัดความคล้ายคลึงข้อความ</li>
                                            <li>• <strong>ROUGE Score:</strong> วัด Recall/Precision</li>
                                            <li>• <strong>Perplexity:</strong> วัดความมั่นใจของโมเดล</li>
                                            <li>• <strong>F1 Score:</strong> สำหรับ Classification</li>
                                        </ul>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm text-emerald-600">📊 Domain-Specific:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li>• <strong>Factual Accuracy:</strong> ข้อมูลถูกต้อง</li>
                                            <li>• <strong>Thai Language Quality:</strong> ภาษาไทยสละสลวย</li>
                                            <li>• <strong>Domain Relevance:</strong> ตรงประเด็น สธค.</li>
                                            <li>• <strong>Response Time:</strong> ความเร็วในการตอบ</li>
                                        </ul>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm text-emerald-600">👥 Human Evaluation:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li>• <strong>Helpfulness:</strong> ตอบได้ตรงคำถาม</li>
                                            <li>• <strong>Harmlessness:</strong> ไม่ให้ข้อมูลผิด/อันตราย</li>
                                            <li>• <strong>Honesty:</strong> ยอมรับเมื่อไม่รู้</li>
                                            <li>• <strong>User Satisfaction:</strong> ความพึงพอใจ</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-muted p-3">
                                    <h4 className="mb-2 font-medium text-sm">📊 Benchmark Results Target:</h4>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-xs">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="py-1 px-2 text-left">Metric</th>
                                                    <th className="py-1 px-2 text-left">Base Model</th>
                                                    <th className="py-1 px-2 text-left">After Fine-tune</th>
                                                    <th className="py-1 px-2 text-left">Target</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="py-1 px-2">สธค. Domain Accuracy</td>
                                                    <td className="py-1 px-2">~40%</td>
                                                    <td className="py-1 px-2 text-green-600">~85%</td>
                                                    <td className="py-1 px-2">&gt;80%</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-1 px-2">Thai Language Quality</td>
                                                    <td className="py-1 px-2">~70%</td>
                                                    <td className="py-1 px-2 text-green-600">~90%</td>
                                                    <td className="py-1 px-2">&gt;85%</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="py-1 px-2">Response Relevance</td>
                                                    <td className="py-1 px-2">~50%</td>
                                                    <td className="py-1 px-2 text-green-600">~88%</td>
                                                    <td className="py-1 px-2">&gt;85%</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-1 px-2">User Satisfaction</td>
                                                    <td className="py-1 px-2">~60%</td>
                                                    <td className="py-1 px-2 text-green-600">~90%</td>
                                                    <td className="py-1 px-2">&gt;85%</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Common Pitfalls */}
                            <div className="rounded-lg border border-red-200 bg-red-500/5 p-4">
                                <h3 className="mb-3 font-semibold text-red-600">⚠️ Common Pitfalls (ข้อควรระวัง)</h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    ปัญหาที่พบบ่อยในการ Fine-tune LLM และวิธีป้องกัน
                                </p>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-3">
                                        <div className="rounded-lg border border-red-100 p-3">
                                            <h4 className="mb-1 font-medium text-sm text-red-600">❌ Catastrophic Forgetting</h4>
                                            <p className="text-xs text-muted-foreground mb-2">โมเดลลืมความรู้เดิมหลัง Fine-tune</p>
                                            <p className="text-xs text-green-600">✅ แก้ไข: ใช้ LoRA, เพิ่ม general data, ลด learning rate</p>
                                        </div>
                                        <div className="rounded-lg border border-red-100 p-3">
                                            <h4 className="mb-1 font-medium text-sm text-red-600">❌ Overfitting</h4>
                                            <p className="text-xs text-muted-foreground mb-2">โมเดลจำ training data มากเกินไป</p>
                                            <p className="text-xs text-green-600">✅ แก้ไข: เพิ่ม dropout, early stopping, เพิ่ม data</p>
                                        </div>
                                        <div className="rounded-lg border border-red-100 p-3">
                                            <h4 className="mb-1 font-medium text-sm text-red-600">❌ Poor Data Quality</h4>
                                            <p className="text-xs text-muted-foreground mb-2">ข้อมูล training มีคุณภาพต่ำ/ผิดพลาด</p>
                                            <p className="text-xs text-green-600">✅ แก้ไข: ตรวจสอบ data, ทำ data cleaning, human review</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="rounded-lg border border-red-100 p-3">
                                            <h4 className="mb-1 font-medium text-sm text-red-600">❌ Hallucination</h4>
                                            <p className="text-xs text-muted-foreground mb-2">โมเดลสร้างข้อมูลเท็จ</p>
                                            <p className="text-xs text-green-600">✅ แก้ไข: ใช้ RAG, train ให้บอก &quot;ไม่รู้&quot;, fact-check</p>
                                        </div>
                                        <div className="rounded-lg border border-red-100 p-3">
                                            <h4 className="mb-1 font-medium text-sm text-red-600">❌ Mode Collapse</h4>
                                            <p className="text-xs text-muted-foreground mb-2">โมเดลตอบซ้ำๆ แบบเดิม</p>
                                            <p className="text-xs text-green-600">✅ แก้ไข: เพิ่ม diverse data, ปรับ temperature</p>
                                        </div>
                                        <div className="rounded-lg border border-red-100 p-3">
                                            <h4 className="mb-1 font-medium text-sm text-red-600">❌ Bias & Safety Issues</h4>
                                            <p className="text-xs text-muted-foreground mb-2">โมเดลมี bias หรือตอบไม่เหมาะสม</p>
                                            <p className="text-xs text-green-600">✅ แก้ไข: safety training, RLHF/DPO, content filtering</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Model Deployment */}
                            <div className="rounded-lg border border-amber-200 bg-amber-500/5 p-4">
                                <h3 className="mb-3 font-semibold text-amber-600">🚀 Model Deployment (การ Deploy โมเดล)</h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    ขั้นตอนและวิธีการ Deploy โมเดลที่ Fine-tune แล้วเข้าสู่ Production
                                </p>

                                <div className="grid gap-4 md:grid-cols-3 mb-4">
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm text-amber-600">🔧 Optimization:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Quantization (INT8/INT4)</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>ONNX Runtime</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>TensorRT / vLLM</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Model Pruning</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm text-amber-600">☁️ Hosting Options:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Self-hosted (On-premise)</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Cloud GPU (AWS/GCP/Azure)</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Serverless (Modal, RunPod)</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>HuggingFace Inference</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm text-amber-600">📊 Monitoring:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Response Latency</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Token Usage / Cost</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>Error Rate Tracking</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                <span>User Feedback Loop</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-muted p-3">
                                    <h4 className="mb-2 font-medium text-sm">🔄 Deployment Pipeline:</h4>
                                    <pre className="text-xs overflow-auto">
                                        {`┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Fine-tuned  │───►│  Optimize    │───►│   Deploy     │───►│  Monitor     │
│    Model     │    │  (Quantize)  │    │  (Serve API) │    │  & Iterate   │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
  LoRA Adapter       INT8/INT4 Model      FastAPI/vLLM      Prometheus
  + Base Model       ONNX Export          Docker/K8s        + Grafana
                                          Load Balancer      Feedback`}
                                    </pre>
                                </div>
                            </div>

                            {/* Continuous Improvement */}
                            <div className="rounded-lg border border-violet-200 bg-violet-500/5 p-4">
                                <h3 className="mb-3 font-semibold text-violet-600">🔄 Continuous Learning (การปรับปรุงต่อเนื่อง)</h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    กระบวนการปรับปรุงโมเดลอย่างต่อเนื่องเพื่อรักษาและเพิ่มประสิทธิภาพ
                                </p>

                                <div className="rounded-lg bg-muted p-3 mb-4">
                                    <pre className="text-xs overflow-auto">
                                        {`┌─────────────────────────────────────────────────────────────────────────┐
│                     Continuous Learning Cycle                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────┐      ┌─────────┐      ┌─────────┐      ┌─────────┐        │
│   │ Collect │ ───► │ Analyze │ ───► │ Retrain │ ───► │ Deploy  │        │
│   │Feedback │      │  Data   │      │  Model  │      │ Update  │        │
│   └────┬────┘      └─────────┘      └─────────┘      └────┬────┘        │
│        │                                                   │             │
│        └───────────────────────────────────────────────────┘             │
│                         Feedback Loop                                    │
│                                                                          │
│   Weekly: Review user feedback & failed responses                        │
│   Monthly: Re-train with new Q&A data                                    │
│   Quarterly: Full evaluation & benchmark                                 │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘`}
                                    </pre>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm text-violet-600">📥 Data Collection:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li>• บันทึก User Interactions</li>
                                            <li>• Feedback จากพนักงาน (👍/👎)</li>
                                            <li>• คำถามที่ตอบไม่ได้/ผิดพลาด</li>
                                            <li>• ข้อมูลใหม่จาก สธค. (ระเบียบ, ราคา)</li>
                                        </ul>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm text-violet-600">🔄 Update Strategy:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li>• Incremental Fine-tuning (ทุกเดือน)</li>
                                            <li>• RAG Knowledge Base Update (ทุกสัปดาห์)</li>
                                            <li>• A/B Testing ก่อน Deploy จริง</li>
                                            <li>• Rollback Strategy หากมีปัญหา</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Automated Data Preparation */}
                            <div className="rounded-lg border border-orange-200 bg-orange-500/5 p-4">
                                <h3 className="mb-3 font-semibold text-orange-600">📊 Automated Data Preparation (ระบบเตรียมข้อมูลอัตโนมัติ)</h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    ระบบค้นหาและจัดเตรียมข้อมูลที่เกี่ยวข้องล่วงหน้าโดยอัตโนมัติทุกวัน
                                    เพื่อให้พร้อมสำหรับการพยากรณ์ราคาทองคำและสนับสนุนการปฏิบัติงานของพนักงานในวันถัดไป
                                </p>
                                <div className="rounded-lg bg-muted p-3 mb-4">
                                    <pre className="text-xs overflow-auto">
                                        {`┌─────────────────────────────────────────────────────────────────┐
│                  Automated Daily Data Pipeline                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  [22:00] ─► Data Collection                                      │
│            • ดึงราคาทองคำไทย/โลก                                  │
│            • อัตราแลกเปลี่ยน USD/THB                              │
│            • ข่าวสารเศรษฐกิจ/ภูมิรัฐศาสตร์                         │
│                         ▼                                        │
│  [23:00] ─► Data Preprocessing                                   │
│            • Clean & Validate Data                               │
│            • Feature Engineering                                 │
│            • Normalize & Transform                               │
│                         ▼                                        │
│  [00:00] ─► Model Inference                                      │
│            • รัน Prediction Model                                │
│            • คำนวณ Confidence Interval                           │
│            • วิเคราะห์แนวโน้ม (Trend Analysis)                   │
│                         ▼                                        │
│  [01:00] ─► Report Generation                                    │
│            • สร้างรายงานพยากรณ์                                   │
│            • Update Dashboard Data                               │
│            • Cache ผลลัพธ์สำหรับวันถัดไป                          │
│                         ▼                                        │
│  [06:00] ─► Ready for Business Hours                             │
│            • พร้อมให้บริการพนักงาน                                │
│            • AI Chatbot มีข้อมูลล่าสุด                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘`}
                                    </pre>
                                </div>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm">ข้อมูลที่รวบรวมอัตโนมัติ:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li>• ราคาทองคำ (Thai Gold Association)</li>
                                            <li>• ราคาทองโลก (XAU/USD)</li>
                                            <li>• อัตราแลกเปลี่ยน THB/USD</li>
                                            <li>• ดัชนีตลาดหุ้น (SET, S&P500)</li>
                                            <li>• ข่าวสารเศรษฐกิจโลก</li>
                                        </ul>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm">การประมวลผล:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li>• Time Series Analysis</li>
                                            <li>• Sentiment Analysis (ข่าว)</li>
                                            <li>• Technical Indicators</li>
                                            <li>• Pattern Recognition</li>
                                            <li>• Anomaly Detection</li>
                                        </ul>
                                    </div>
                                    <div className="rounded-lg border p-3">
                                        <h4 className="mb-2 font-medium text-sm">ผลลัพธ์:</h4>
                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                            <li>• รายงานพยากรณ์ราคา 7 วัน</li>
                                            <li>• แนวโน้มตลาดทองคำ</li>
                                            <li>• คำแนะนำเชิงกลยุทธ์</li>
                                            <li>• Risk Assessment</li>
                                            <li>• Market Summary</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Scheduled Tasks */}
                            <div className="rounded-lg border border-green-200 bg-green-500/5 p-4">
                                <h3 className="mb-3 font-semibold text-green-600">⏰ Scheduled Tasks (งานตั้งเวลาอัตโนมัติ)</h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    ระบบทำงานนอกเวลาทำการของหน่วยงาน (22:00 - 06:00 น.) เพื่อไม่ให้กระทบต่อการใช้งานปกติ
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b bg-muted/50">
                                                <th className="py-2 px-3 text-left">เวลา</th>
                                                <th className="py-2 px-3 text-left">Task</th>
                                                <th className="py-2 px-3 text-left">รายละเอียด</th>
                                                <th className="py-2 px-3 text-left">Frequency</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b">
                                                <td className="py-2 px-3 font-mono text-xs">22:00</td>
                                                <td className="py-2 px-3">Data Collection</td>
                                                <td className="py-2 px-3 text-muted-foreground">ดึงข้อมูลจากแหล่งภายนอก</td>
                                                <td className="py-2 px-3"><Badge variant="secondary">Daily</Badge></td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 px-3 font-mono text-xs">23:00</td>
                                                <td className="py-2 px-3">Data Processing</td>
                                                <td className="py-2 px-3 text-muted-foreground">ประมวลผลและจัดเตรียมข้อมูล</td>
                                                <td className="py-2 px-3"><Badge variant="secondary">Daily</Badge></td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 px-3 font-mono text-xs">00:00</td>
                                                <td className="py-2 px-3">Model Prediction</td>
                                                <td className="py-2 px-3 text-muted-foreground">รัน AI Model พยากรณ์ราคา</td>
                                                <td className="py-2 px-3"><Badge variant="secondary">Daily</Badge></td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 px-3 font-mono text-xs">01:00</td>
                                                <td className="py-2 px-3">Report Generation</td>
                                                <td className="py-2 px-3 text-muted-foreground">สร้างรายงานและ Cache ข้อมูล</td>
                                                <td className="py-2 px-3"><Badge variant="secondary">Daily</Badge></td>
                                            </tr>
                                            <tr className="border-b">
                                                <td className="py-2 px-3 font-mono text-xs">02:00</td>
                                                <td className="py-2 px-3">Model Re-training</td>
                                                <td className="py-2 px-3 text-muted-foreground">ปรับปรุงโมเดลด้วยข้อมูลใหม่</td>
                                                <td className="py-2 px-3"><Badge variant="outline">Weekly</Badge></td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-3 font-mono text-xs">03:00</td>
                                                <td className="py-2 px-3">Fine-tuning Update</td>
                                                <td className="py-2 px-3 text-muted-foreground">อัปเดต LLM ด้วยข้อมูลใหม่</td>
                                                <td className="py-2 px-3"><Badge variant="outline">Monthly</Badge></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Technical Implementation */}
                            <div className="rounded-lg border p-4">
                                <h3 className="mb-3 font-semibold">🛠️ Technical Implementation</h3>
                                <div className="rounded-lg bg-muted p-3">
                                    <pre className="text-xs overflow-auto">
                                        {`// Cron Job Configuration (vercel.json / cron.yaml)
{
  "crons": [
    {
      "path": "/api/cron/collect-data",
      "schedule": "0 22 * * *"    // 22:00 ทุกวัน
    },
    {
      "path": "/api/cron/process-data", 
      "schedule": "0 23 * * *"    // 23:00 ทุกวัน
    },
    {
      "path": "/api/cron/predict",
      "schedule": "0 0 * * *"     // 00:00 ทุกวัน
    },
    {
      "path": "/api/cron/generate-report",
      "schedule": "0 1 * * *"     // 01:00 ทุกวัน
    },
    {
      "path": "/api/cron/retrain-model",
      "schedule": "0 2 * * 0"     // 02:00 ทุกวันอาทิตย์
    }
  ]
}

// Fine-tuning Script (Python)
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model

# Load base model
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-hf")

# Configure LoRA
lora_config = LoraConfig(
    r=16, lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05
)

# Apply LoRA and train
model = get_peft_model(model, lora_config)
trainer.train(dataset="stgk_knowledge_base")`}
                                    </pre>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab: Security */}
                <TabsContent value="security" className="space-y-6 mt-6">
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
                </TabsContent>

                {/* Tab: User Guide */}
                <TabsContent value="guide" className="space-y-6 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="h-6 w-6" />
                                คู่มือการใช้งาน
                            </CardTitle>
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
                </TabsContent>
            </Tabs>
        </div>
    );
}
