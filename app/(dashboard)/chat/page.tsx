"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, TrendingUp, BarChart3, FileText, MessageSquare, Trash2, Download, Bot, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GoldPriceDisplay } from "@/components/gold-price-display";
import { WorldGoldPriceDisplay } from "@/components/world-gold-price-display";
import { GoldPredictionDisplay } from "@/components/gold-prediction-display";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    model?: string;
}

interface ModelOption {
    id: string;
    name: string;
    modelName: string;
}

const MODEL_ICONS: Record<string, string> = {
    gpt: "🤖",
    claude: "🧠",
    grok: "⚡",
};

const quickActions = [
    { icon: TrendingUp, label: "วิเคราะห์แนวโน้มราคาทอง", query: "ช่วยวิเคราะห์แนวโน้มราคาทองคำในช่วง 7 วันที่ผ่านมา" },
    { icon: BarChart3, label: "สรุปยอดจำนำวันนี้", query: "สรุปยอดการจำนำวันนี้และเปรียบเทียบกับวันก่อน" },
    { icon: FileText, label: "คาดการณ์ทรัพย์หลุดจำนำ", query: "คาดการณ์จำนวนทรัพย์ที่อาจหลุดจำนำในเดือนหน้า" },
    { icon: MessageSquare, label: "แนะนำกลยุทธ์ธุรกิจ", query: "ให้คำแนะนำเกี่ยวกับกลยุทธ์การบริหารสำนักงานธนานุเคราะห์" },
];

const exampleQuestions = [
    "ราคาทองคำมีแนวโน้มอย่างไรในช่วง 3 เดือนข้างหน้า?",
    "ควรปรับอัตราดอกเบี้ยอย่างไรตามสถานการณ์ปัจจุบัน?",
    "สาขาไหนมีประสิทธิภาพการดำเนินงานดีที่สุด?",
    "ปัจจัยใดบ้างที่มีผลต่ออัตราการไถ่ถอน?",
    "จะลดอัตราทรัพย์หลุดจำนำได้อย่างไร?",
];

export default function ChatPage() {
    const [messages, setMessages] = React.useState<Message[]>([
        {
            role: "assistant",
            content: "สวัสดีครับ! ผมเป็น AI Assistant สำหรับระบบสำนักงานธนานุเคราะห์ ผมสามารถช่วยคุณวิเคราะห์ข้อมูล คาดการณ์แนวโน้ม และให้คำแนะนำเชิงธุรกิจได้ มีอะไรให้ผมช่วยครับ?",
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedModel, setSelectedModel] = React.useState<string>("claude");
    const [availableModels, setAvailableModels] = React.useState<ModelOption[]>([
        { id: "gpt", name: "GPT-4o (OpenAI)", modelName: "openai/gpt-4o" },
        { id: "claude", name: "Claude Sonnet 4 (Anthropic)", modelName: "anthropic/claude-sonnet-4" },
        { id: "grok", name: "Grok 3 Beta (xAI)", modelName: "x-ai/grok-3-beta" },
    ]);
    const [hasApiKey, setHasApiKey] = React.useState(true);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    // Fetch available models on mount
    React.useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch("/api/chat-simple");
                if (response.ok) {
                    const data = await response.json();
                    setAvailableModels(data.models);
                    setSelectedModel(data.defaultModel);
                    setHasApiKey(data.hasApiKey);
                }
            } catch (error) {
                console.error("Failed to fetch models:", error);
            }
        };
        fetchModels();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // เรียก Chat API
            const response = await fetch("/api/chat-simple", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content,
                    })),
                    model: selectedModel,
                }),
            });

            if (!response.ok) {
                throw new Error("API Error");
            }

            const data = await response.json();

            const assistantMessage: Message = {
                role: "assistant",
                content: data.content,
                timestamp: new Date(),
                model: data.model || selectedModel,
            };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = {
                role: "assistant",
                content: "ขออภัยครับ เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง",
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const generateMockResponse = (query: string): string => {
        if (query.includes("ราคาทอง") || query.includes("แนวโน้ม")) {
            return `จากการวิเคราะห์ข้อมูลราคาทองคำ พบว่า:

📈 **แนวโน้มราคาทอง**
- ราคาทองคำในประเทศมีแนวโน้มเพิ่มขึ้นเล็กน้อย คาดว่าจะอยู่ที่ระดับ ฿33,200-33,500 ในช่วง 7 วันข้างหน้า
- ราคาทองคำโลก (COMEX) แข็งแกร่งที่ระดับ $2,150/oz
- อัตราแลกเปลี่ยน USD/THB อยู่ที่ 35.50 ส่งผลดีต่อราคาทองในประเทศ

💡 **คำแนะนำ**
- เหมาะสมสำหรับการรับจำนำในช่วงนี้ เนื่องจากราคามีเสถียรภาพ
- ควรติดตามข่าวสารจาก Fed เกี่ยวกับนโยบายดอกเบี้ย

มีอะไรให้ช่วยเพิ่มเติมไหมครับ?`;
        }

        if (query.includes("ยอดจำนำ") || query.includes("สรุป")) {
            return `สรุปข้อมูลการจำนำวันนี้:

📊 **ภาพรวม**
- จำนวนการจำนำวันนี้: **45 รายการ** (+12% จากวันก่อน)
- มูลค่ารวม: **฿1,485,000** (+8% จากวันก่อน)
- มูลค่าเฉลี่ยต่อรายการ: **฿33,000**

⏰ **ช่วงเวลายอดนิยม**
- 09:00-11:00 น. (18 รายการ)
- 14:00-16:00 น. (15 รายการ)

🏆 **สาขาที่มียอดสูงสุด**
- สาขากลาง: 12 รายการ
- สาขาตะวันออก: 9 รายการ

ต้องการดูข้อมูลเพิ่มเติมหรือไม่ครับ?`;
        }

        if (query.includes("คาดการณ์") || query.includes("ทรัพย์หลุดจำนำ")) {
            return `การคาดการณ์ทรัพย์หลุดจำนำเดือนหน้า:

📦 **ผลการคาดการณ์**
- จำนวนคาดการณ์: **135 รายการ** (+12.5% จากเดือนนี้)
- มูลค่าโดยประมาณ: **฿8.2M**
- ความแม่นยำโมเดล: **91.8%**

⚠️ **รายการเสี่ยงสูง**
- รายการที่เหลือเวลา < 10 วัน: 45 รายการ
- มูลค่ารวม: ฿2.8M

💡 **คำแนะนำ**
1. เตรียมพื้นที่จัดเก็บเพิ่มเติม 15%
2. ติดตามลูกค้ากลุ่มเสี่ยงอย่างใกล้ชิด
3. วางแผนจัดงานขายทอดตลาดล่วงหน้า

ต้องการดูรายละเอียดแยกตามประเภททรัพย์หรือไม่ครับ?`;
        }

        return `ขอบคุณสำหรับคำถามครับ ผมกำลังวิเคราะห์ข้อมูลตามที่คุณถาม...

ระบบ AI ของเราสามารถช่วย:
- วิเคราะห์แนวโน้มและข้อมูลทางสถิติ
- คาดการณ์ราคาทองและทรัพย์หลุดจำนำ
- ให้คำแนะนำเชิงกลยุทธ์
- สรุปรายงานและข้อมูลต่างๆ

คุณสามารถถามคำถามเฉพาะเจาะจงมากขึ้น หรือเลือกจากตัวเลือกด้านล่างได้เลยครับ`;
    };

    const handleQuickAction = (query: string) => {
        setInput(query);
    };

    const handleClearChat = () => {
        setMessages([
            {
                role: "assistant",
                content: "สวัสดีครับ! ผมเป็น AI Assistant สำหรับระบบสำนักงานธนานุเคราะห์ ผมสามารถช่วยคุณวิเคราะห์ข้อมูล คาดการณ์แนวโน้ม และให้คำแนะนำเชิงธุรกิจได้ มีอะไรให้ผมช่วยครับ?",
                timestamp: new Date(),
            }
        ]);
    };

    const handleExportChat = () => {
        const chatText = messages.map(m =>
            `[${m.timestamp.toLocaleTimeString('th-TH')}] ${m.role === 'user' ? 'คุณ' : 'AI'}: ${m.content}`
        ).join('\n\n');

        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-${Date.now()}.txt`;
        a.click();
    };

    return (
        <div className="space-y-6 h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Sparkles className="h-8 w-8 text-primary" />
                        AI Chatbot
                    </h1>
                    <p className="text-muted-foreground">
                        ผู้ช่วยอัจฉริยะสำหรับการวิเคราะห์และให้คำแนะนำ
                    </p>
                </div>
                <div className="flex gap-2">
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_300px] h-[calc(100%-5rem)]">
                {/* Chat Area */}
                <Card className="flex flex-col h-full">
                    <CardHeader className="border-b">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">การสนทนา</CardTitle>
                            <Badge variant="outline" className="text-green-600 border-green-600">
                                <span className="h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                                ออนไลน์
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-4 ${message.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                        }`}
                                >
                                    <div className="flex items-start gap-2">
                                        {message.role === "assistant" && (
                                            <span className="text-lg mt-0.5 shrink-0">
                                                {MODEL_ICONS[message.model || "claude"] || <Sparkles className="h-5 w-5" />}
                                            </span>
                                        )}
                                        <div className="flex-1">
                                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <p className="text-xs opacity-70">
                                                    {message.timestamp.toLocaleTimeString("th-TH")}
                                                </p>
                                                {message.role === "assistant" && message.model && (
                                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                                        {message.model.toUpperCase()}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-[80%] rounded-lg p-4 bg-muted">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 animate-pulse" />
                                        <div className="flex gap-1">
                                            <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" />
                                            <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.2s]" />
                                            <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </CardContent>

                    <div className="border-t p-4">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                                placeholder="พิมพ์คำถามของคุณ..."
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Sidebar */}
                <div className="space-y-4 overflow-auto">
                    {/* Gold Price Display */}
                    <GoldPriceDisplay />

                    {/* World Gold Price Display */}
                    <WorldGoldPriceDisplay />

                    {/* Gold Prediction */}
                    <GoldPredictionDisplay />

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">การกระทำด่วน</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {quickActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        className="w-full justify-start h-auto py-3 px-3"
                                        onClick={() => handleQuickAction(action.query)}
                                    >
                                        <Icon className="h-4 w-4 mr-2 shrink-0" />
                                        <span className="text-xs text-left">{action.label}</span>
                                    </Button>
                                );
                            })}
                        </CardContent>
                    </Card>

                    {/* Example Questions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">คำถามตัวอย่าง</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {exampleQuestions.map((question, index) => (
                                <button
                                    key={index}
                                    onClick={() => setInput(question)}
                                    className="w-full text-left text-xs p-3 rounded-lg border hover:bg-muted transition-colors"
                                >
                                    {question}
                                </button>
                            ))}
                        </CardContent>
                    </Card>

                    {/* AI Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">ข้อมูล AI</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-xs">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">โมเดล</span>
                                <Badge variant="outline">Deep Agent</Badge>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ข้อมูลอัปเดต</span>
                                <span className="font-medium">4 ธ.ค. 2568</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ภาษา</span>
                                <span className="font-medium">ไทย, English</span>
                            </div>
                            <div className="pt-2 border-t">
                                <p className="text-muted-foreground">
                                    💡 AI นี้ใช้ Deep Agent + LangChain สำหรับวิเคราะห์ข้อมูลธนานุเคราะห์
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
