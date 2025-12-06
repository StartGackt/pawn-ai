export default function ArchitecturePage() {
    return (
        <div className="container mx-auto space-y-8 py-8">
            {/* Header */}
            <div className="text-center">
                <h1 className="mb-4 text-4xl font-bold">
                    สถาปัตยกรรมระบบปัญญาประดิษฐ์
                </h1>
                <p className="text-xl text-muted-foreground">
                    AI System Architecture - สำนักงานธนานุเคราะห์
                </p>
            </div>

            {/* Architecture Diagram */}
            <div className="rounded-lg border-2 border-primary/20 bg-linear-to-br from-background to-muted/20 p-8">
                <h2 className="mb-6 text-2xl font-bold text-center">System Architecture Diagram</h2>

                <div className="space-y-6">
                    {/* Application Layer */}
                    <div className="rounded-lg border-2 border-blue-500 bg-blue-500/5 p-6">
                        <h3 className="mb-4 text-xl font-bold text-blue-600">
                            📱 Application Layer (ชั้นแอปพลิเคชัน)
                        </h3>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold">Web Interface</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Next.js 15 (React)</li>
                                    <li>• Responsive UI</li>
                                    <li>• Real-time Updates</li>
                                </ul>
                            </div>
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold">AI Chatbot</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Thai NLP</li>
                                    <li>• Multi-model Support</li>
                                    <li>• Context Awareness</li>
                                </ul>
                            </div>
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold">Dashboard</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Analytics</li>
                                    <li>• Gold Price Charts</li>
                                    <li>• Predictions</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* API Gateway */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-md rounded-lg border-2 border-green-500 bg-green-500/5 p-4 text-center">
                            <h3 className="text-lg font-bold text-green-600">
                                🔌 API Gateway
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                RESTful APIs, Rate Limiting, Authentication
                            </p>
                        </div>
                    </div>

                    {/* Model Layer */}
                    <div className="rounded-lg border-2 border-purple-500 bg-purple-500/5 p-6">
                        <h3 className="mb-4 text-xl font-bold text-purple-600">
                            🧠 Model Layer (ชั้นโมเดล AI)
                        </h3>
                        <div className="grid gap-4 md:grid-cols-4">
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold text-sm">LLM (Primary)</h4>
                                <ul className="space-y-1 text-xs text-muted-foreground">
                                    <li>• Claude Sonnet 4</li>
                                    <li>• GPT-4o</li>
                                    <li>• Grok 3 Beta</li>
                                </ul>
                            </div>
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold text-sm">ML Models</h4>
                                <ul className="space-y-1 text-xs text-muted-foreground">
                                    <li>• Time Series</li>
                                    <li>• Regression</li>
                                    <li>• Classification</li>
                                </ul>
                            </div>
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold text-sm">RAG System</h4>
                                <ul className="space-y-1 text-xs text-muted-foreground">
                                    <li>• Vector DB</li>
                                    <li>• Embeddings</li>
                                    <li>• Retrieval</li>
                                </ul>
                            </div>
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold text-sm">NLP Pipeline</h4>
                                <ul className="space-y-1 text-xs text-muted-foreground">
                                    <li>• Thai Tokenizer</li>
                                    <li>• Intent Detection</li>
                                    <li>• Entity Extract</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Data Layer */}
                    <div className="rounded-lg border-2 border-orange-500 bg-orange-500/5 p-6">
                        <h3 className="mb-4 text-xl font-bold text-orange-600">
                            💾 Data Layer (ชั้นข้อมูล)
                        </h3>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold">External APIs</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Thai Gold API</li>
                                    <li>• World Gold Prices</li>
                                    <li>• Exchange Rates</li>
                                </ul>
                            </div>
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold">Knowledge Base</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Pawn Shop Rules</li>
                                    <li>• Historical Data</li>
                                    <li>• FAQs</li>
                                </ul>
                            </div>
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold">Cache Layer</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Redis Cache</li>
                                    <li>• API Response Cache</li>
                                    <li>• Session Storage</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure */}
                    <div className="rounded-lg border-2 border-red-500 bg-red-500/5 p-6">
                        <h3 className="mb-4 text-xl font-bold text-red-600">
                            ⚙️ Infrastructure Layer (โครงสร้างพื้นฐาน)
                        </h3>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold">Primary System</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Main Server (Vercel)</li>
                                    <li>• Load Balancer</li>
                                    <li>• Auto-scaling</li>
                                </ul>
                            </div>
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold">Secondary/Backup</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Standby Server</li>
                                    <li>• Auto Failover</li>
                                    <li>• Data Replication</li>
                                </ul>
                            </div>
                            <div className="rounded-lg border bg-background p-4">
                                <h4 className="mb-2 font-semibold">Monitoring</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Health Checks</li>
                                    <li>• Logging System</li>
                                    <li>• Alert System</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security & Compliance */}
            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border-2 border-yellow-500 bg-yellow-500/5 p-6">
                    <h3 className="mb-4 text-xl font-bold text-yellow-600">
                        🔒 Security Measures (มาตรการความปลอดภัย)
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>SSL/TLS Encryption - การเข้ารหัสการสื่อสาร</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>API Key Management - การจัดการ API Keys อย่างปลอดภัย</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Rate Limiting - จำกัดการเรียก API</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Input Validation - ตรวจสอบข้อมูลนำเข้า</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>CORS Policy - ควบคุมการเข้าถึง Cross-Origin</span>
                        </li>
                    </ul>
                </div>

                <div className="rounded-lg border-2 border-cyan-500 bg-cyan-500/5 p-6">
                    <h3 className="mb-4 text-xl font-bold text-cyan-600">
                        📋 Compliance (การปฏิบัติตามมาตรฐาน)
                    </h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>PDPA - พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Data Privacy - ความเป็นส่วนตัวของข้อมูล</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Audit Logging - บันทึกการใช้งานระบบ</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Data Retention Policy - นโยบายการเก็บรักษาข้อมูล</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Regular Security Audits - ตรวจสอบความปลอดภัยเป็นประจำ</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Technical Stack */}
            <div className="rounded-lg border-2 bg-muted/30 p-6">
                <h3 className="mb-4 text-xl font-bold">🛠️ Technical Stack (เทคโนโลยีที่ใช้)</h3>
                <div className="grid gap-4 md:grid-cols-4">
                    <div>
                        <h4 className="mb-2 font-semibold text-sm">Frontend</h4>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                            <li>• Next.js 15</li>
                            <li>• React 19</li>
                            <li>• TypeScript</li>
                            <li>• TailwindCSS</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-2 font-semibold text-sm">AI/ML</h4>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                            <li>• LangChain</li>
                            <li>• OpenRouter</li>
                            <li>• Prophet/LSTM</li>
                            <li>• RAG System</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-2 font-semibold text-sm">APIs</h4>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                            <li>• RESTful API</li>
                            <li>• Next.js API Routes</li>
                            <li>• External APIs</li>
                            <li>• WebSocket (future)</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-2 font-semibold text-sm">Deployment</h4>
                        <ul className="space-y-1 text-xs text-muted-foreground">
                            <li>• Vercel Edge</li>
                            <li>• Git-based Deploy</li>
                            <li>• Auto Scaling</li>
                            <li>• Global CDN</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
