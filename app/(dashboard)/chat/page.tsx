"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, TrendingUp, BarChart3, FileText, MessageSquare, Database, Globe, LineChart, PieChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoldPriceDisplay } from "@/components/gold-price-display";
import { WorldGoldPriceDisplay } from "@/components/world-gold-price-display";
import { GoldPredictionDisplay } from "@/components/gold-prediction-display";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    model?: string;
}

const MODEL_ICONS: Record<string, string> = {
    gpt: "🤖",
    claude: "🧠",
    grok: "⚡",
    internal: "🏠",
};

// =============================================
// EXTERNAL CHAT DATA
// =============================================
const externalQuickActions = [
    { icon: TrendingUp, label: "วิเคราะห์แนวโน้มราคาทอง", query: "ช่วยวิเคราะห์แนวโน้มราคาทองคำในช่วง 7 วันที่ผ่านมา" },
    { icon: MessageSquare, label: "แนะนำกลยุทธ์ธุรกิจ", query: "ให้คำแนะนำเกี่ยวกับกลยุทธ์การบริหารสำนักงานธนานุเคราะห์" },
    { icon: Globe, label: "สถานการณ์ตลาดโลก", query: "สรุปสถานการณ์ราคาทองคำในตลาดโลกวันนี้" },
];

const externalExampleQuestions = [
    "ราคาทองคำวันนี้เป็นอย่างไร?",
    "คาดการณ์แนวโน้มราคาทองใน 7 วันข้างหน้า",
    "ปัจจัยที่มีผลต่อราคาทองคำช่วงนี้มีอะไรบ้าง?",
    "ข่าวเศรษฐกิจที่น่าสนใจวันนี้",
];

// =============================================
// INTERNAL CHAT DATA (MOCK)
// =============================================
const internalQuickActions = [
    { icon: BarChart3, label: "สรุปยอดรับจำนำวันนี้", query: "ขอสรุปยอดการรับจำนำประจำวันที่ 7 ธ.ค. 2567" },
    { icon: PieChart, label: "โครงสร้างทรัพย์คงเหลือ", query: "แสดงสัดส่วนทรัพย์จำนำคงเหลือแยกตามประเภท" },
    { icon: LineChart, label: "แนวโน้มการไถ่ถอน", query: "วิเคราะห์แนวโน้มการไถ่ถอนในเดือนที่ผ่านมา" },
];

const internalExampleQuestions = [
    "ยอดรับจำนำวันนี้มีกี่รายการ?",
    "ทรัพย์ประเภทไหนรับจำนำมากที่สุดวันนี้?",
    "มูลค่าทรัพย์จำนำคงเหลือทั้งหมดเท่าไหร่?",
    "ตั๋วจำนำที่จะครบกำหนดเดือนนี้มีกี่ฉบับ?",
];

export default function ChatPage() {
    const [messages, setMessages] = React.useState<Message[]>([
        {
            role: "assistant",
            content: "สวัสดีครับ! ผมเป็น AI Assistant สำหรับระบบสำนักงานธนานุเคราะห์ ผมสามารถช่วยคุณวิเคราะห์ข้อมูล คาดการณ์แนวโน้ม และให้คำแนะนำเชิงธุรกิจได้ เลือกโหมดการทำงานที่ต้องการได้เลยครับ",
            timestamp: new Date(),
        }
    ]);
    const [messagesInternal, setMessagesInternal] = React.useState<Message[]>([
        {
            role: "assistant",
            content: "สวัสดีครับ! นี่คือระบบวิเคราะห์ข้อมูลภายใน (Internal Data Analysis) ผมสามารถสรุปข้อมูลรับจำนำประจำวัน และวิเคราะห์ทรัพย์สินคงเหลือให้คุณได้ครับ",
            timestamp: new Date(),
            model: "internal"
        }
    ]);

    const [input, setInput] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedModel, setSelectedModel] = React.useState<string>("claude");
    const [activeTab, setActiveTab] = React.useState("external");
    
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const messagesInternalEndRef = React.useRef<HTMLDivElement>(null);

    // Fetch available models on mount
    React.useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch("/api/chat-simple");
                if (response.ok) {
                    const data = await response.json();
                    setSelectedModel(data.defaultModel);
                }
            } catch (error) {
                console.error("Failed to fetch models:", error);
            }
        };
        fetchModels();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        messagesInternalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages, messagesInternal, activeTab]);

    // HANDLE EXTERNAL CHAT (API)
    const handleSendExternal = async () => {
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
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
                    model: selectedModel,
                }),
            });

            if (!response.ok) throw new Error("API Error");

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

    // HANDLE INTERNAL CHAT (MOCK)
    const handleSendInternal = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            content: input,
            timestamp: new Date(),
        };

        setMessagesInternal(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            let responseContent = "";
            const query = userMessage.content.toLowerCase();

            if (query.includes("สรุปยอด") || query.includes("รับจำนำวันนี้") || query.includes("ประจำวัน")) {
                responseContent = `
**สรุปยอดการรับจำนำประจำวันที่ 7 ธันวาคม 2567**

📊 **ภาพรวม:**
- จำนวนรายการรับจำนำ: **42 รายการ**
- มูลค่ารวมทั้งสิ้น: **1,250,500 บาท**
- เทียบกับเมื่อวาน: +5.2% (จำนวนรายการ), +8.4% (มูลค่า)

🏆 **ประเภททรัพย์สินสูงสุด 3 อันดับแรก:**
1. **ทองคำรูปพรรณ**: 30 รายการ (850,000 บาท)
   - น้ำหนักรวม: 45 บาท
2. **ทองคำแท่ง**: 5 รายการ (280,000 บาท)
3. **เครื่องประดับเพชร**: 3 รายการ (120,500 บาท)

⏱️ **ช่วงเวลาที่มีธุรกรรมสูงสุด:** 10:00 - 11:00 น. (15 รายการ)
`;
            } else if (query.includes("ทรัพย์คงเหลือ") || query.includes("โครงสร้าง") || query.includes("ทั้งหมด")) {
                responseContent = `
**รายงานสถานะทรัพย์จำนำคงเหลือ (Outstanding Assets Portfolio)**
*ข้อมูล ณ วันที่ 7 ธันวาคม 2567*

💰 **มูลค่ารวมทรัพย์จำนำคงเหลือ:** **45,820,000 บาท**
📦 **จำนวนตั๋วจำนำคงค้าง:** 1,850 ฉบับ

📊 **แยกตามประเภททรัพย์สิน:**
- 🟡 **ทองคำ (Gold):** 75% (34.37 ลบ.)
- 💎 **อัญมณี (Gems):** 15% (6.87 ลบ.)
- ⌚ **นาฬิกา (Watches):** 7% (3.21 ลบ.)
- 📱 **เบ็ดเตล็ด (Others):** 3% (1.37 ลบ.)

⚠️ **การวิเคราะห์ความเสี่ยง:**
- ทรัพย์ที่ครบกำหนดเกิน 1 เดือน: 12 ฉบับ (มูลค่า 150,000 บาท)
- สัดส่วนทรัพย์สภาพคล่องสูง (ทองคำ): อยู่ในเกณฑ์ดีราย (75%)
`;
            } else if (query.includes("ไถ่ถอน") || query.includes("แนวโน้ม")) {
                responseContent = `
**วิเคราะห์แนวโน้มการไถ่ถอน (Redemption Trends)**

📈 **อัตราการไถ่ถอนเดือนพฤศจิกายน:** 88% (สูงกว่าค่าเฉลี่ย 85%)

📋 **รายละเอียด:**
- ไถ่ถอนปกติ: 80%
- ไถ่ถอนก่อนกำหนด: 5%
- ส่งดอกเบี้ยต่ออายุ: 12%
- หลุดจำนำ: 3% (ต่ำกว่าค่าเป้าหมายที่ 5%)

💡 **ข้อสังเกต:**
ลูกค้านิยมมาไถ่ถอนมากที่สุดในช่วงต้นเดือน (วันที่ 1-5) และช่วงปลายเดือน (วันที่ 25-30) สอดคล้องกับช่วงระยาเวลาการจ่ายเงินเดือน
`;
            } else {
                responseContent = `
ผมได้รับข้อมูลเรื่อง "${userMessage.content}" แล้วครับ
แต่เนื่องจากเป็นระบบทดสอบ (Demo) ผมสามารถตอบคำถามหลักๆ ได้ดังนี้ครับ:
1. **"สรุปยอดรับจำนำวันนี้"** - ดูรายงานประจำวัน
2. **"ทรัพย์คงเหลือ"** - ดูพอร์ตโฟลิโอปัจจุบัน
3. **"แนวโน้มการไถ่ถอน"** - ดูสถิติการไถ่ถอน

ลองพิมพ์คำว่า "สรุปยอด" ดูไหมครับ?
`;
            }

            const assistantMessage: Message = {
                role: "assistant",
                content: responseContent.trim(),
                timestamp: new Date(),
                model: "internal",
            };
            setMessagesInternal(prev => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1200);
    };

    const handleSend = () => {
        if (activeTab === "external") {
            handleSendExternal();
        } else {
            handleSendInternal();
        }
    };

    const handleQuickAction = (query: string) => {
        setInput(query);
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
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100%-5rem)]">
                <div className="flex items-center justify-between mb-4">
                    <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                        <TabsTrigger value="external" className="gap-2">
                            <Globe className="h-4 w-4" />
                            ข้อมูลภายนอก (External)
                        </TabsTrigger>
                        <TabsTrigger value="internal" className="gap-2">
                            <Database className="h-4 w-4" />
                            ข้อมูลภายใน (Internal)
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_300px] h-[calc(100%-3rem)]">
                    {/* Chat Area */}
                    <Card className="flex flex-col h-full overflow-hidden border-slate-200 shadow-sm">
                        <CardHeader className="border-b py-3 px-4 bg-slate-50/50">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                    {activeTab === 'external' ? (
                                        <>
                                            <Globe className="h-4 w-4 text-blue-500" />
                                            สนทนากับ External Data
                                        </>
                                    ) : (
                                        <>
                                            <Database className="h-4 w-4 text-emerald-500" />
                                            สนทนากับ Internal Database
                                        </>
                                    )}
                                </CardTitle>
                                <Badge variant="outline" className={activeTab === 'internal' ? "text-emerald-600 border-emerald-600" : "text-green-600 border-green-600"}>
                                    <span className={`h-2 w-2 rounded-full mr-2 animate-pulse ${activeTab === 'internal' ? 'bg-emerald-500' : 'bg-green-500'}`} />
                                    Online
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="flex-1 overflow-auto p-4 space-y-4 bg-white">
                            <TabsContent value="external" className="m-0 space-y-4 h-full">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${message.role === "user"
                                                ? "bg-blue-600 text-white rounded-tr-none"
                                                : "bg-slate-100 text-slate-800 rounded-tl-none"
                                                }`}
                                        >
                                            <div className="flex items-start gap-2">
                                                {message.role === "assistant" && (
                                                    <span className="text-lg mt-0.5 shrink-0">
                                                        {MODEL_ICONS[message.model || "claude"] || <Sparkles className="h-5 w-5" />}
                                                    </span>
                                                )}
                                                <div className="flex-1">
                                                    <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                                                    <div className={`flex items-center gap-2 mt-1.5 ${message.role === "user" ? "justify-end text-blue-100" : "text-slate-400"}`}>
                                                        <p className="text-[10px]">
                                                            {message.timestamp.toLocaleTimeString("th-TH")}
                                                        </p>
                                                        {message.role === "assistant" && message.model && (
                                                            <Badge variant="secondary" className="text-[9px] px-1 h-4 bg-white/50 text-slate-600">
                                                                {message.model.toUpperCase()}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </TabsContent>

                            <TabsContent value="internal" className="m-0 space-y-4 h-full">
                                {messagesInternal.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${message.role === "user"
                                                ? "bg-emerald-600 text-white rounded-tr-none"
                                                : "bg-emerald-50 text-emerald-900 border border-emerald-100 rounded-tl-none"
                                                }`}
                                        >
                                            <div className="flex items-start gap-2">
                                                {message.role === "assistant" && (
                                                    <span className="text-lg mt-0.5 shrink-0">
                                                        {MODEL_ICONS.internal}
                                                    </span>
                                                )}
                                                <div className="flex-1">
                                                    <div className="text-sm whitespace-pre-wrap leading-relaxed markdown-content">
                                                        {message.content}
                                                    </div>
                                                    <div className={`flex items-center gap-2 mt-1.5 ${message.role === "user" ? "justify-end text-emerald-100" : "text-emerald-400"}`}>
                                                        <p className="text-[10px]">
                                                            {message.timestamp.toLocaleTimeString("th-TH")}
                                                        </p>
                                                        {message.role === "assistant" && (
                                                            <Badge variant="secondary" className="text-[9px] px-1 h-4 bg-white/50 text-emerald-600">
                                                                INTERNAL DB
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
                                        <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-slate-50 border border-slate-100 rounded-tl-none">
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1">
                                                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
                                                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                                                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                                                </div>
                                                <span className="text-xs text-slate-400">กำลังวิเคราะห์ข้อมูล...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesInternalEndRef} />
                            </TabsContent>
                        </CardContent>

                        <div className="border-t p-4 bg-white">
                            <div className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                                    placeholder={activeTab === 'external' ? "ถามเกี่ยวกับราคาทอง แนวโน้มตลาด..." : "ถามยอดจำนำ ทรัพย์คงเหลือ..."}
                                    disabled={isLoading}
                                    className="flex-1"
                                />
                                <Button
                                    onClick={handleSend}
                                    disabled={isLoading || !input.trim()}
                                    className={activeTab === 'internal' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Sidebar */}
                    <div className="space-y-4 overflow-auto rounded-lg">
                        {activeTab === 'external' ? (
                            // EXTERNAL SIDEBAR
                            <>
                                <GoldPriceDisplay />
                                <WorldGoldPriceDisplay />
                                <GoldPredictionDisplay />

                                <Card className="border-slate-200 shadow-sm">
                                    <CardHeader className="py-3 px-4">
                                        <CardTitle className="text-sm font-medium0">คำถามแนะนำ</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 p-3 pt-0">
                                        {externalQuickActions.map((action, index) => {
                                            const Icon = action.icon;
                                            return (
                                                <Button
                                                    key={index}
                                                    variant="ghost"
                                                    className="w-full justify-start h-auto py-2 px-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                                                    onClick={() => handleQuickAction(action.query)}
                                                >
                                                    <Icon className="h-4 w-4 mr-2 shrink-0" />
                                                    <span className="text-xs text-left line-clamp-1">{action.label}</span>
                                                </Button>
                                            );
                                        })}
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            // INTERNAL SIDEBAR
                            <>
                                <Card className="bg-emerald-50 border-emerald-100 shadow-sm">
                                    <CardHeader className="py-3 px-4">
                                        <CardTitle className="text-sm font-medium text-emerald-800 flex items-center gap-2">
                                            <Database className="h-4 w-4" />
                                            สถานะระบบ
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 text-xs space-y-2 text-emerald-700">
                                        <div className="flex justify-between">
                                            <span>วันที่ข้อมูล:</span>
                                            <span className="font-semibold">7 ธ.ค. 2567</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>รายการวันนี้:</span>
                                            <span className="font-semibold">42 รายการ</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>ทรัพย์คงเหลือ:</span>
                                            <span className="font-semibold">1,850 ฉบับ</span>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-slate-200 shadow-sm">
                                    <CardHeader className="py-3 px-4">
                                        <CardTitle className="text-sm font-medium">รายงานด่วน (Quick Report)</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 p-3 pt-0">
                                        {internalQuickActions.map((action, index) => {
                                            const Icon = action.icon;
                                            return (
                                                <Button
                                                    key={index}
                                                    variant="ghost"
                                                    className="w-full justify-start h-auto py-2 px-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                                                    onClick={() => handleQuickAction(action.query)}
                                                >
                                                    <Icon className="h-4 w-4 mr-2 shrink-0" />
                                                    <div className="flex flex-col items-start gap-0.5">
                                                        <span className="text-xs font-medium text-left">{action.label}</span>
                                                    </div>
                                                </Button>
                                            );
                                        })}
                                    </CardContent>
                                </Card>

                                <Card className="border-slate-200 shadow-sm">
                                    <CardHeader className="py-3 px-4">
                                        <CardTitle className="text-sm font-medium">คำถามที่พบบ่อย</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2 p-3 pt-0">
                                        {internalExampleQuestions.map((question, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setInput(question)}
                                                className="w-full text-left text-xs p-2 rounded-md hover:bg-slate-100 transition-colors text-slate-600"
                                            >
                                                • {question}
                                            </button>
                                        ))}
                                    </CardContent>
                                </Card>
                            </>
                        )}
                    </div>
                </div>
            </Tabs>
        </div>
    );
}
