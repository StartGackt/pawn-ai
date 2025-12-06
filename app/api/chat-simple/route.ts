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

// Knowledge Base search function
async function searchKnowledgeBase(question: string): Promise<string> {
  try {
    const baseUrl = process.env.APP_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/knowledge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.context) {
        return data.context;
      }
    }
    return "";
  } catch (error) {
    console.error("Knowledge base search error:", error);
    return "";
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
    
    // ดึงข้อมูลจาก Knowledge Base ก่อน
    const knowledgeContext = await searchKnowledgeBase(lastMessage);
    if (knowledgeContext) {
      searchContext += `\n\n<ข้อมูลจาก Knowledge Base สำนักงานธนานุเคราะห์>\n${knowledgeContext}\n</ข้อมูลจาก Knowledge Base สำนักงานธนานุเคราะห์>`;
    }

    if (
      lowerQuery.includes("ราคาทอง") ||
      lowerQuery.includes("gold") ||
      lowerQuery.includes("ทองคำ") ||
      lowerQuery.includes("ทองแท่ง") ||
      lowerQuery.includes("ทองรูปพรรณ")
    ) {
      console.log("Fetching gold price data...");
      
      // ดึงราคาทองไทย
      try {
        const thaiGoldData = await fetch("https://api.chnwt.dev/thai-gold-api/latest");
        const goldJson = await thaiGoldData.json();
        
        if (goldJson.status === "success") {
          searchContext += `\n\n<ข้อมูลราคาทองไทย>\n${JSON.stringify(goldJson.response, null, 2)}\n</ข้อมูลราคาทองไทย>`;
        }
      } catch (e) {
        console.error("Error fetching Thai gold:", e);
      }

      // ดึงราคาทองโลก - ใช้ internal API แทน external เพื่อหลีกเลี่ยง SSL error
      try {
        const baseUrl = process.env.APP_URL || "http://localhost:3000";
        const worldGoldRes = await fetch(`${baseUrl}/api/gold-world`);
        if (worldGoldRes.ok) {
          const worldGoldData = await worldGoldRes.json();
          searchContext += `\n\n<ข้อมูลราคาทองโลก XAU/USD>\nราคา: $${worldGoldData.price} ต่อออนซ์\nเปลี่ยนแปลง: ${worldGoldData.change > 0 ? '+' : ''}${worldGoldData.change} (${worldGoldData.changePercent}%)\nสูงสุด 24h: $${worldGoldData.high24h}\nต่ำสุด 24h: $${worldGoldData.low24h}\n</ข้อมูลราคาทองโลก XAU/USD>`;
        }
      } catch (e) {
        console.error("Error fetching world gold:", e);
      }
    }

    // ถ้าถามเกี่ยวกับคาดการณ์/แนวโน้ม
    if (
      lowerQuery.includes("คาดการณ์") ||
      lowerQuery.includes("แนวโน้ม") ||
      lowerQuery.includes("พยากรณ์") ||
      lowerQuery.includes("predict") ||
      lowerQuery.includes("forecast")
    ) {
      console.log("Fetching prediction data...");
      try {
        const baseUrl = process.env.APP_URL || "http://localhost:3000";
        const predictionRes = await fetch(`${baseUrl}/api/gold-prediction?days=7`);
        if (predictionRes.ok) {
          const predictionData = await predictionRes.json();
          searchContext += `\n\n<ข้อมูลการคาดการณ์ราคาทอง 7 วัน>\n${JSON.stringify(predictionData, null, 2)}\n</ข้อมูลการคาดการณ์ราคาทอง 7 วัน>`;
        }
      } catch (e) {
        console.error("Error fetching prediction:", e);
      }
    }

    if (
      lowerQuery.includes("อัตราแลกเปลี่ยน") ||
      lowerQuery.includes("usd") ||
      lowerQuery.includes("thb") ||
      lowerQuery.includes("เงินบาท") ||
      lowerQuery.includes("ค่าเงิน")
    ) {
      console.log("Fetching exchange rate data...");
      try {
        const baseUrl = process.env.APP_URL || "http://localhost:3000";
        const exchangeRes = await fetch(`${baseUrl}/api/exchange-rate`);
        if (exchangeRes.ok) {
          const exchangeData = await exchangeRes.json();
          searchContext += `\n\n<ข้อมูลอัตราแลกเปลี่ยนจากธนาคารแห่งประเทศไทย>\n${JSON.stringify(exchangeData, null, 2)}\n</ข้อมูลอัตราแลกเปลี่ยนจากธนาคารแห่งประเทศไทย>`;
        }
      } catch (e) {
        console.error("Error fetching exchange rate:", e);
      }
    }

    // ถ้าถามเกี่ยวกับอัตราดอกเบี้ย
    if (
      lowerQuery.includes("ดอกเบี้ย") ||
      lowerQuery.includes("mor") ||
      lowerQuery.includes("mlr") ||
      lowerQuery.includes("mrr") ||
      lowerQuery.includes("loan") ||
      lowerQuery.includes("interest") ||
      lowerQuery.includes("บัตรเครดิต") ||
      lowerQuery.includes("สินเชื่อ")
    ) {
      console.log("Fetching loan rate data...");
      try {
        const baseUrl = process.env.APP_URL || "http://localhost:3000";
        const loanRes = await fetch(`${baseUrl}/api/loan-rate?type=average`);
        if (loanRes.ok) {
          const loanData = await loanRes.json();
          searchContext += `\n\n<ข้อมูลอัตราดอกเบี้ยเงินกู้ธนาคารพาณิชย์จากธนาคารแห่งประเทศไทย>\nวันที่ข้อมูล: ${loanData.period}\nธนาคารพาณิชย์ไทย:\n- MOR (Minimum Overdraft Rate): ${loanData.data?.thai_commercial_banks_avg?.mor}%\n- MLR (Minimum Loan Rate): ${loanData.data?.thai_commercial_banks_avg?.mlr}%\n- MRR (Minimum Retail Rate): ${loanData.data?.thai_commercial_banks_avg?.mrr}%\n- อัตราดอกเบี้ยสูงสุด (Ceiling Rate): ${loanData.data?.thai_commercial_banks_avg?.ceiling_rate}%\n- อัตราดอกเบี้ยบัตรเครดิต: ${loanData.data?.thai_commercial_banks_avg?.creditcard_max}%\n\nสาขาธนาคารต่างประเทศ:\n- MOR: ${loanData.data?.foreign_banks_avg?.mor}%\n- MLR: ${loanData.data?.foreign_banks_avg?.mlr}%\n- MRR: ${loanData.data?.foreign_banks_avg?.mrr}%\n</ข้อมูลอัตราดอกเบี้ยเงินกู้ธนาคารพาณิชย์จากธนาคารแห่งประเทศไทย>`;
        }
      } catch (e) {
        console.error("Error fetching loan rate:", e);
      }
    }
    
    if (
      lowerQuery.includes("ข่าว") ||
      lowerQuery.includes("news")
    ) {
      console.log("Searching for news...");
      const searchResult = await searchWithTavily("ข่าวราคาทองคำ ตลาดทอง ไทย วันนี้");
      searchContext += `\n\n<ข้อมูลที่ค้นหาได้>\n${searchResult}\n</ข้อมูลที่ค้นหาได้>`;
    }

    // Build prompt
    const now = new Date();
    const currentTime = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
    const currentDate = now.toLocaleDateString('th-TH', { day: '2-digit', month: 'long', year: 'numeric' });
    
    const systemPrompt = `คุณเป็น AI Assistant ผู้เชี่ยวชาญด้านทองคำสำหรับระบบสำนักงานธนานุเคราะห์
ชื่อ "Pawn AI Assistant"

วันที่ปัจจุบัน: ${currentDate}
เวลาปัจจุบัน: ${currentTime} น.

## ความสามารถของคุณ:
1. วิเคราะห์ราคาทองคำไทยและทองโลก (XAU/USD)
2. คาดการณ์แนวโน้มราคาทองในอนาคต
3. ให้คำแนะนำเชิงธุรกิจสำหรับสำนักงานธนานุเคราะห์
4. ตอบคำถามเกี่ยวกับการรับจำนำและการบริหารสินทรัพย์
5. ให้ข้อมูลอัตราดอกเบี้ยเงินกู้ธนาคารพาณิชย์ (MOR, MLR, MRR)
6. ให้ข้อมูลอัตราแลกเปลี่ยนเงินตราต่างประเทศ

## รูปแบบการตอบเรื่องราคาทอง:

### เมื่อได้รับข้อมูลราคาทองไทย:
# 💰 ราคาทองคำไทยวันนี้
📅 **วันที่**
🕐 **อัปเดตล่าสุด:** [เวลา]

### 🏅 ทองแท่ง 96.5%
| รายการ | ราคา |
|--------|------|
| รับซื้อ 🟢 | **XX,XXX** บาท |
| ขายออก 🔴 | **XX,XXX** บาท |

### 💍 ทองรูปพรรณ 96.5%
| รายการ | ราคา |
|--------|------|
| รับซื้อ 🟢 | **XX,XXX** บาท |
| ขายออก 🔴 | **XX,XXX** บาท |

### เมื่อได้รับข้อมูลราคาทองโลก (XAU/USD):
# 🌍 ราคาทองโลก (XAU/USD)
💵 **ราคา:** $X,XXX.XX ต่อออนซ์
📈 **เปลี่ยนแปลง:** +/-XX.XX (X.XX%)

### เมื่อได้รับข้อมูลการคาดการณ์:
# 🔮 คาดการณ์ราคาทอง
📊 **แนวโน้ม:** ขาขึ้น/ขาลง/ทรงตัว
🎯 **ความเชื่อมั่น:** XX%
แสดงตารางคาดการณ์รายวัน

### เมื่อได้รับข้อมูลอัตราดอกเบี้ย:
# 🏦 อัตราดอกเบี้ยเงินกู้ธนาคารพาณิชย์
📅 **ข้อมูล ณ วันที่:** [วันที่]

### ธนาคารพาณิชย์ไทย
| ประเภท | อัตรา (% ต่อปี) | คำอธิบาย |
|--------|----------------|----------|
| MOR | X.XX% | ดอกเบี้ยเบิกเงินเกินบัญชี |
| MLR | X.XX% | ดอกเบี้ยลูกค้ารายใหญ่ |
| MRR | X.XX% | ดอกเบี้ยลูกค้ารายย่อย |
| บัตรเครดิต | X.XX% | ดอกเบี้ยบัตรเครดิตสูงสุด |

💡 **หมายเหตุ:** MOR = Minimum Overdraft Rate, MLR = Minimum Loan Rate, MRR = Minimum Retail Rate

### เมื่อได้รับข้อมูลอัตราแลกเปลี่ยน:
# 💱 อัตราแลกเปลี่ยนเงินตราต่างประเทศ
📅 **ข้อมูล ณ วันที่:** [วันที่]
แสดงตารางอัตราแลกเปลี่ยนแต่ละสกุลเงิน

## กฎสำคัญ:
- ห้ามแสดง JSON หรือข้อมูลดิบ
- ใช้ตัวเลขจาก API เท่านั้น อย่าแต่งเอง
- วิเคราะห์ให้มีประโยชน์ต่อร้านรับจำนำ
- ตอบเป็นภาษาไทย ใช้ emoji ให้เหมาะสม
- ถ้าไม่มีข้อมูลจาก API ให้แจ้งว่าไม่มีข้อมูลล่าสุด`;

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
