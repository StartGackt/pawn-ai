import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { TavilySearch } from "@langchain/tavily";

// OpenRouter Model Configuration
type ModelProvider = "gpt" | "claude" | "grok";

interface ModelConfig {
  modelName: string;
  displayName: string;
}

const OPENROUTER_MODELS: Record<ModelProvider, ModelConfig> = {
  gpt: {
    modelName: "openai/gpt-4o",
    displayName: "GPT-4o (OpenAI)",
  },
  claude: {
    modelName: "anthropic/claude-sonnet-4",
    displayName: "Claude Sonnet 4 (Anthropic)",
  },
  grok: {
    modelName: "x-ai/grok-3-beta",
    displayName: "Grok 3 Beta (xAI)",
  },
};

// Create OpenRouter LLM
function createOpenRouterLLM(provider: ModelProvider = "claude") {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const modelConfig = OPENROUTER_MODELS[provider];

  return new ChatOpenAI({
    model: modelConfig.modelName,
    apiKey: apiKey,
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
        "X-Title": "Pawn AI Assistant",
      },
    },
    temperature: 0.7,
    maxTokens: 4096,
  });
}

// Search function
async function searchWithTavily(query: string): Promise<string> {
  try {
    const tavilySearch = new TavilySearch({
      maxResults: 5,
      tavilyApiKey: process.env.TAVILY_API_KEY,
      topic: "news",
    });

    const results = await tavilySearch._call({ query });
    return JSON.stringify(results, null, 2);
  } catch (error) {
    console.error("Tavily search error:", error);
    return JSON.stringify({ error: "ไม่สามารถค้นหาข้อมูลได้" });
  }
}

// API Handler
export async function POST(request: NextRequest) {
  try {
    const { messages, model = "claude" } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const validModels: ModelProvider[] = ["gpt", "claude", "grok"];
    const selectedModel: ModelProvider = validModels.includes(model) ? model : "claude";
    const modelConfig = OPENROUTER_MODELS[selectedModel];

    // Check API Keys
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    if (!openrouterKey) {
      return NextResponse.json({
        role: "assistant",
        content: "กรุณาตั้งค่า OPENROUTER_API_KEY ใน .env file",
        model: selectedModel,
      });
    }

    // Get user's last message
    const lastMessage = messages[messages.length - 1]?.content || "";
    const lowerQuery = lastMessage.toLowerCase();

    // Check if need to search
    let searchContext = "";
    if (
      lowerQuery.includes("ราคาทอง") ||
      lowerQuery.includes("gold") ||
      lowerQuery.includes("ทองคำ")
    ) {
      console.log("Fetching Thai gold price...");
      const thaiGoldData = await fetch("https://api.chnwt.dev/thai-gold-api/latest");
      const goldJson = await thaiGoldData.json();
      
      if (goldJson.status === "success") {
        searchContext = `\n\n<ข้อมูลราคาทองไทยจาก API>\n${JSON.stringify(goldJson.response, null, 2)}\n</ข้อมูลราคาทองไทยจาก API>`;
      }
    } else if (
      lowerQuery.includes("อัตราแลกเปลี่ยน") ||
      lowerQuery.includes("usd") ||
      lowerQuery.includes("thb")
    ) {
      console.log("Searching for exchange rate...");
      const searchResult = await searchWithTavily("อัตราแลกเปลี่ยน USD THB วันนี้ ธนาคารแห่งประเทศไทย");
      searchContext = `\n\n<ข้อมูลที่ค้นหาได้>\n${searchResult}\n</ข้อมูลที่ค้นหาได้>`;
    } else if (
      lowerQuery.includes("ข่าว") ||
      lowerQuery.includes("news")
    ) {
      console.log("Searching for news...");
      const searchResult = await searchWithTavily("ข่าวราคาทองคำ ตลาดทอง ไทย วันนี้");
      searchContext = `\n\n<ข้อมูลที่ค้นหาได้>\n${searchResult}\n</ข้อมูลที่ค้นหาได้>`;
    }

    // Build prompt
    const now = new Date();
    const currentTime = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    const currentDate = now.toLocaleDateString('th-TH', { day: '2-digit', month: 'long', year: 'numeric' });
    
    const systemPrompt = `คุณเป็น AI Assistant ผู้เชี่ยวชาญด้านทองคำสำหรับระบบสำนักงานธนานุเคราะห์
ชื่อ "Pawn AI Assistant"

เมื่อได้รับข้อมูลราคาทองจาก API ให้จัดรูปแบบตามนี้:

# 💰 ราคาทองคำไทยวันนี้

📅 **[วันที่จาก date]**
🕐 **อัปเดตล่าสุด:** [เวลาจาก update_time]
⏰ **ดึงข้อมูลเมื่อ:** ${currentTime} น.

### 🏅 ทองแท่ง 96.5%
- 🟢 รับซื้อ: **[price.gold_bar.buy พร้อมใส่ ,]** บาท
- 🔴 ขายออก: **[price.gold_bar.sell พร้อมใส่ ,]** บาท

### 💍 ทองรูปพรรณ 96.5%
- 🟢 รับซื้อ: **[price.gold.buy]** บาท  
- 🔴 ขายออก: **[price.gold.sell]** บาท

---
📈 **เปลี่ยนแปลง**
- เมื่อครั้งก่อน: [price.change.compare_previous] บาท [ถ้า + ให้ ⬆️ ถ้า - ให้ ⬇️]
- เมื่อวาน: [price.change.compare_yesterday] บาท [ถ้า + ให้ ⬆️ ถ้า - ให้ ⬇️]

💡 *[วิเคราะห์แนวโน้มสั้นๆ 1 ประโยค จากการเปลี่ยนแปลง]*

กฎสำคัญ:
- ห้ามแสดง JSON หรือข้อมูลดิบ
- ใช้ตัวเลขจาก API เท่านั้น อย่าแต่งเอง
- ถ้าราคาเป็นทศนิยม ให้แสดงครบทุกหลัก
- วิเคราะห์แนวโน้มให้มีประโยชน์ต่อร้านรับจำนำ
- แสดงเวลาดึงข้อมูลด้วย (${currentTime} น.)`;

    const fullPrompt = `${systemPrompt}\n\n${searchContext}\n\nคำถาม: ${lastMessage}`;

    // Call LLM
    const llm = createOpenRouterLLM(selectedModel);
    const response = await llm.invoke(fullPrompt);

    let content = "";
    if (typeof response.content === "string") {
      content = response.content;
    } else if (Array.isArray(response.content)) {
      content = response.content
        .map((c) => {
          if (typeof c === "string") return c;
          if ("text" in c) return c.text;
          return String(c);
        })
        .join("");
    } else {
      content = String(response.content);
    }

    if (!content || content.trim() === "") {
      content = "ขออภัยครับ ไม่สามารถประมวลผลได้ กรุณาลองใหม่อีกครั้ง";
    }

    return NextResponse.json({
      role: "assistant",
      content: content,
      model: selectedModel,
      modelName: modelConfig.displayName,
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({
      role: "assistant",
      content: "ขออภัยครับ เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้ง",
    });
  }
}

// GET Handler - ดึงรายชื่อ Models
export async function GET() {
  const models = Object.entries(OPENROUTER_MODELS).map(([key, config]) => ({
    id: key,
    name: config.displayName,
    modelName: config.modelName,
  }));

  return NextResponse.json({
    models,
    defaultModel: "claude",
    hasApiKey: !!process.env.OPENROUTER_API_KEY,
  });
}
