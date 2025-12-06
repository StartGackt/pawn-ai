import { NextRequest, NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { tool } from "@langchain/core/tools";
import { TavilySearch } from "@langchain/tavily";
import { z } from "zod";
import { HumanMessage, AIMessage, SystemMessage, ToolMessage, BaseMessage } from "@langchain/core/messages";

// ===== OpenRouter Model Configuration =====
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

// Create OpenRouter LLM instance
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

// ===== Agent Tools - ค้นหาข้อมูลจริงจากอินเทอร์เน็ต =====

// Tool 1: ค้นหาราคาทองคำไทยวันนี้
const searchThaiGoldPriceTool = tool(
  async () => {
    try {
      const tavilySearch = new TavilySearch({
        maxResults: 5,
        tavilyApiKey: process.env.TAVILY_API_KEY,
        topic: "news",
      });

      const results = await tavilySearch._call({
        query: "ราคาทองคำแท่ง ราคาทองรูปพรรณ วันนี้ สมาคมค้าทองคำ",
      });

      return JSON.stringify({
        source: "Tavily Search - Thai Gold Price",
        query: "ราคาทองคำไทยวันนี้",
        timestamp: new Date().toISOString(),
        results: results,
      });
    } catch {
      // Fallback to alternative search
      try {
        const response = await fetch(
          "https://www.goldtraders.or.th/default.aspx",
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (compatible; PawnAI/1.0)",
            },
          }
        );
        const html = await response.text();
        
        // ดึงราคาจาก HTML (simplified)
        const priceMatch = html.match(/ราคาทองแท่ง.*?(\d{1,2},?\d{3})/);
        const ornamentMatch = html.match(/ราคาทองรูปพรรณ.*?(\d{1,2},?\d{3})/);

        return JSON.stringify({
          source: "Gold Traders Association",
          timestamp: new Date().toISOString(),
          goldBar: priceMatch ? priceMatch[1] : "ไม่สามารถดึงข้อมูลได้",
          goldOrnament: ornamentMatch ? ornamentMatch[1] : "ไม่สามารถดึงข้อมูลได้",
          note: "กรุณาตรวจสอบราคาล่าสุดจากเว็บไซต์สมาคมค้าทองคำ",
        });
      } catch {
        return JSON.stringify({
          error: "ไม่สามารถดึงข้อมูลราคาทองไทยได้",
          suggestion: "กรุณาตรวจสอบที่ https://www.goldtraders.or.th/",
          timestamp: new Date().toISOString(),
        });
      }
    }
  },
  {
    name: "search_thai_gold_price",
    description:
      "ค้นหาราคาทองคำไทยล่าสุดวันนี้ ทั้งทองแท่งและทองรูปพรรณ จากสมาคมค้าทองคำ",
    schema: z.object({}),
  }
);

// Tool 2: ค้นหาราคาทองคำโลก
const searchGlobalGoldPriceTool = tool(
  async () => {
    try {
      const tavilySearch = new TavilySearch({
        maxResults: 5,
        tavilyApiKey: process.env.TAVILY_API_KEY,
        topic: "finance",
      });

      const results = await tavilySearch._call({
        query: "gold price XAU USD spot price today COMEX",
      });

      return JSON.stringify({
        source: "Tavily Search - Global Gold Price",
        query: "Gold XAU/USD Spot Price",
        timestamp: new Date().toISOString(),
        results: results,
      });
    } catch {
      // Fallback: ใช้ข้อมูลจาก public API
      try {
        const response = await fetch(
          "https://api.metalpriceapi.com/v1/latest?api_key=demo&base=USD&currencies=XAU,XAG"
        );
        const data = await response.json();

        return JSON.stringify({
          source: "Metal Price API",
          timestamp: new Date().toISOString(),
          goldPriceUSD: data.rates?.XAU ? (1 / data.rates.XAU).toFixed(2) : "N/A",
          silverPriceUSD: data.rates?.XAG ? (1 / data.rates.XAG).toFixed(2) : "N/A",
          note: "ราคาโดยประมาณ กรุณาตรวจสอบแหล่งข้อมูลอื่นเพิ่มเติม",
        });
      } catch {
        return JSON.stringify({
          error: "ไม่สามารถดึงข้อมูลราคาทองโลกได้",
          suggestion: "กรุณาตรวจสอบที่ https://www.kitco.com/ หรือ https://www.investing.com/",
          timestamp: new Date().toISOString(),
        });
      }
    }
  },
  {
    name: "search_global_gold_price",
    description:
      "ค้นหาราคาทองคำโลก (XAU/USD) ราคา spot จาก COMEX และตลาดโลก",
    schema: z.object({}),
  }
);

// Tool 3: ค้นหาอัตราแลกเปลี่ยน USD/THB
const searchExchangeRateTool = tool(
  async () => {
    try {
      const tavilySearch = new TavilySearch({
        maxResults: 5,
        tavilyApiKey: process.env.TAVILY_API_KEY,
        topic: "finance",
      });

      const results = await tavilySearch._call({
        query: "อัตราแลกเปลี่ยน USD THB วันนี้ ธนาคารแห่งประเทศไทย",
      });

      return JSON.stringify({
        source: "Tavily Search - Exchange Rate",
        query: "USD/THB Exchange Rate",
        timestamp: new Date().toISOString(),
        results: results,
      });
    } catch {
      // Fallback: ใช้ public API
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();

        return JSON.stringify({
          source: "Exchange Rate API",
          timestamp: new Date().toISOString(),
          usdToThb: data.rates?.THB?.toFixed(4) || "N/A",
          baseDate: data.date || new Date().toISOString().split("T")[0],
          note: "อัตราแลกเปลี่ยนกลาง อาจแตกต่างจากอัตราธนาคาร",
        });
      } catch {
        return JSON.stringify({
          error: "ไม่สามารถดึงข้อมูลอัตราแลกเปลี่ยนได้",
          suggestion: "กรุณาตรวจสอบที่ https://www.bot.or.th/",
          timestamp: new Date().toISOString(),
        });
      }
    }
  },
  {
    name: "search_exchange_rate",
    description:
      "ค้นหาอัตราแลกเปลี่ยน USD/THB วันนี้ จาก BOT และแหล่งข้อมูลการเงิน",
    schema: z.object({}),
  }
);

// Tool 4: ค้นหาข่าวทองคำและเศรษฐกิจ
const searchGoldNewsTool = tool(
  async ({ topic }: { topic: string }) => {
    try {
      const tavilySearch = new TavilySearch({
        maxResults: 5,
        tavilyApiKey: process.env.TAVILY_API_KEY,
        topic: "news",
      });

      const searchQuery =
        topic === "thai"
          ? "ข่าวราคาทองคำ ตลาดทอง ไทย วันนี้"
          : topic === "global"
          ? "gold market news Federal Reserve interest rate"
          : "gold price forecast analysis prediction";

      const results = await tavilySearch._call({
        query: searchQuery,
      });

      return JSON.stringify({
        source: "Tavily Search - Gold News",
        topic: topic,
        timestamp: new Date().toISOString(),
        results: results,
      });
    } catch {
      return JSON.stringify({
        error: "ไม่สามารถค้นหาข่าวได้",
        timestamp: new Date().toISOString(),
      });
    }
  },
  {
    name: "search_gold_news",
    description:
      "ค้นหาข่าวเกี่ยวกับทองคำและปัจจัยที่มีผลต่อราคา เช่น ดอกเบี้ย Fed, เศรษฐกิจโลก",
    schema: z.object({
      topic: z
        .enum(["thai", "global", "forecast"])
        .describe("หัวข้อข่าว: thai (ข่าวไทย), global (ข่าวโลก), forecast (การคาดการณ์)"),
    }),
  }
);

// Tool 5: คำนวณราคาทองคำไทยจากราคาโลก
const calculateThaiGoldPriceTool = tool(
  async ({
    goldPriceUSD,
    exchangeRate,
  }: {
    goldPriceUSD: number;
    exchangeRate: number;
  }) => {
    // สูตรคำนวณ: ราคาทองไทย = (ราคาทองโลก USD/oz / 31.1035) * น้ำหนักบาททอง * อัตราแลกเปลี่ยน
    const troyOunceToGram = 31.1035;
    const bahtGoldWeight = 15.244; // กรัม
    const purity = 0.965; // 96.5%

    const pricePerGram = goldPriceUSD / troyOunceToGram;
    const rawPrice = pricePerGram * bahtGoldWeight * exchangeRate;
    const adjustedPrice = rawPrice * purity;

    // ปัดเป็นหลัก 50
    const roundedPrice = Math.round(adjustedPrice / 50) * 50;

    return JSON.stringify({
      input: {
        goldPriceUSD: goldPriceUSD,
        exchangeRate: exchangeRate,
      },
      calculation: {
        pricePerGramUSD: pricePerGram.toFixed(4),
        rawPriceTHB: rawPrice.toFixed(2),
        purityAdjusted: adjustedPrice.toFixed(2),
        finalPrice: roundedPrice,
      },
      result: {
        estimatedGoldBarBuy: roundedPrice,
        estimatedGoldBarSell: roundedPrice + 100,
        estimatedOrnamentBuy: roundedPrice + 400,
        estimatedOrnamentSell: roundedPrice + 500,
      },
      note: "ราคาโดยประมาณ อาจแตกต่างจากราคาตลาดจริงเนื่องจากค่าธรรมเนียมและ premium",
      timestamp: new Date().toISOString(),
    });
  },
  {
    name: "calculate_thai_gold_price",
    description:
      "คำนวณราคาทองคำไทยโดยประมาณจากราคาทองโลกและอัตราแลกเปลี่ยน",
    schema: z.object({
      goldPriceUSD: z.number().describe("ราคาทองโลก USD ต่อออนซ์"),
      exchangeRate: z.number().describe("อัตราแลกเปลี่ยน USD/THB"),
    }),
  }
);

// Tool 6: ดึงข้อมูลการจำนำ (Mock - สำหรับระบบจริงจะเชื่อมต่อ DB)
const getPawnDataTool = tool(
  async ({ type }: { type: string }) => {
    const mockData = {
      summary: {
        today: {
          totalPawns: 45,
          totalValue: 1485000,
          avgValue: 33000,
          byAssetType: {
            gold: { count: 25, value: 950000 },
            phone: { count: 12, value: 320000 },
            laptop: { count: 5, value: 150000 },
            other: { count: 3, value: 65000 },
          },
        },
        comparison: {
          yesterday: { pawns: 40, value: 1375000 },
          change: { pawns: "+12.5%", value: "+8.0%" },
        },
      },
      expiring: {
        next7Days: 12,
        next30Days: 45,
        totalValue: 2850000,
        highRisk: [
          { id: "P-001", value: 85000, daysLeft: 3, type: "gold" },
          { id: "P-002", value: 45000, daysLeft: 5, type: "phone" },
        ],
      },
      forfeited: {
        thisMonth: 25,
        totalValue: 850000,
        forecast: { nextMonth: 28, confidence: 0.87 },
      },
    };

    return JSON.stringify({
      type: type,
      data: mockData[type as keyof typeof mockData] || mockData.summary,
      timestamp: new Date().toISOString(),
    });
  },
  {
    name: "get_pawn_data",
    description:
      "ดึงข้อมูลการจำนำจากระบบ: summary (ภาพรวม), expiring (ใกล้ครบกำหนด), forfeited (หลุดจำนำ)",
    schema: z.object({
      type: z
        .enum(["summary", "expiring", "forfeited"])
        .describe("ประเภทข้อมูล"),
    }),
  }
);

// Tool 7: วิเคราะห์และให้คำแนะนำ
const analyzeAndAdviseTool = tool(
  async ({ context }: { context: string }) => {
    // วิเคราะห์บริบทและให้คำแนะนำ
    const recommendations = {
      goldPriceUp: [
        "พิจารณาปรับ LTV (Loan-to-Value) สำหรับทองคำให้สูงขึ้นได้",
        "เหมาะสมสำหรับการรับจำนำทองคำใหม่",
        "ลูกค้าอาจมาไถ่ถอนเพิ่มขึ้นเพราะทองมีมูลค่าสูง",
      ],
      goldPriceDown: [
        "ระวังการรับจำนำทองคำในช่วงนี้",
        "พิจารณาลด LTV เพื่อลดความเสี่ยง",
        "เตรียมพื้นที่สำหรับทรัพย์หลุดจำนำที่อาจเพิ่มขึ้น",
      ],
      highExpiring: [
        "ติดต่อลูกค้าล่วงหน้าก่อนครบกำหนด",
        "เสนอ refinance หรือต่ออายุสัญญา",
        "เตรียมแผนจัดการทรัพย์หลุดจำนำ",
      ],
      general: [
        "ติดตามราคาทองอย่างใกล้ชิด",
        "รักษาสภาพคล่องให้เพียงพอ",
        "วิเคราะห์พฤติกรรมลูกค้าเป็นประจำ",
      ],
    };

    const category = context.includes("ขึ้น")
      ? "goldPriceUp"
      : context.includes("ลง")
      ? "goldPriceDown"
      : context.includes("ครบกำหนด")
      ? "highExpiring"
      : "general";

    return JSON.stringify({
      context: context,
      category: category,
      recommendations: recommendations[category],
      timestamp: new Date().toISOString(),
    });
  },
  {
    name: "analyze_and_advise",
    description:
      "วิเคราะห์สถานการณ์และให้คำแนะนำเชิงธุรกิจสำหรับร้านรับจำนำ",
    schema: z.object({
      context: z.string().describe("บริบทหรือสถานการณ์ที่ต้องการวิเคราะห์"),
    }),
  }
);

// ===== System Prompt =====
const systemPrompt = `คุณเป็น AI Assistant สำหรับระบบสำนักงานธนานุเคราะห์ (ร้านรับจำนำ)
ชื่อของคุณคือ "Pawn AI Assistant"

## กฎสำคัญ - ต้องทำทันที:
- เมื่อผู้ใช้ถามเรื่องราคาทอง → เรียก search_thai_gold_price และ search_global_gold_price ทันที
- เมื่อผู้ใช้ถามอัตราแลกเปลี่ยน → เรียก search_exchange_rate ทันที
- เมื่อผู้ใช้ถามข่าว → เรียก search_gold_news ทันที
- ห้ามถามกลับ ห้ามบอกว่าจะค้นหา ให้เรียก tool แล้วตอบเลย

## ความสามารถหลัก:
1. **ค้นหาราคาทองไทยวันนี้** - ใช้ search_thai_gold_price
2. **ค้นหาราคาทองโลก (XAU/USD)** - ใช้ search_global_gold_price  
3. **ค้นหาอัตราแลกเปลี่ยน USD/THB** - ใช้ search_exchange_rate
4. **ค้นหาข่าวทองคำ** - ใช้ search_gold_news (topic: thai/global/forecast)
5. **คำนวณราคาทองไทยจากราคาโลก** - ใช้ calculate_thai_gold_price
6. **ดึงข้อมูลการจำนำ** - ใช้ get_pawn_data (type: summary/expiring/forfeited)
7. **วิเคราะห์และให้คำแนะนำ** - ใช้ analyze_and_advise

## วิธีการตอบ:
- ใช้ภาษาไทยที่เป็นมิตรและเข้าใจง่าย
- จัดรูปแบบด้วย Markdown และใช้ Emoji เพื่อความน่าอ่าน
- ระบุแหล่งที่มาและเวลาของข้อมูลเสมอ
- สรุปข้อมูลให้กระชับและอ่านง่าย

## ข้อควรระวัง:
- ข้อมูลราคาเป็นข้อมูล ณ เวลาที่ค้นหา อาจมีการเปลี่ยนแปลง
- แนะนำให้ตรวจสอบราคาจากแหล่งข้อมูลหลักอีกครั้งก่อนทำธุรกรรม`;

// ===== Tools array =====
const allTools = [
  searchThaiGoldPriceTool,
  searchGlobalGoldPriceTool,
  searchExchangeRateTool,
  searchGoldNewsTool,
  calculateThaiGoldPriceTool,
  getPawnDataTool,
  analyzeAndAdviseTool,
];

// ===== Create LLM with Tools =====
async function runAgentWithTools(
  provider: ModelProvider,
  messages: { role: string; content: string }[]
) {
  const llm = createOpenRouterLLM(provider);
  const llmWithTools = llm.bindTools(allTools);

  // Convert messages to LangChain format
  const langchainMessages: BaseMessage[] = [
    new SystemMessage(systemPrompt),
    ...messages.map((m) =>
      m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)
    ),
  ];

  // First call - may request tool calls
  let response = await llmWithTools.invoke(langchainMessages);
  
  console.log("Initial response tool_calls:", response.tool_calls?.length || 0);

  // Handle tool calls if any
  const maxIterations = 5;
  let iterations = 0;

  while (response.tool_calls && response.tool_calls.length > 0 && iterations < maxIterations) {
    iterations++;
    console.log(`Tool call iteration ${iterations}:`, response.tool_calls.map(tc => tc.name));
    
    // Execute tool calls
    const toolResults = await Promise.all(
      response.tool_calls.map(async (toolCall) => {
        const foundTool = allTools.find((t) => t.name === toolCall.name);
        if (foundTool) {
          try {
            console.log(`Executing tool: ${toolCall.name}`, toolCall.args);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await (foundTool as any).invoke(toolCall.args);
            console.log(`Tool ${toolCall.name} result:`, typeof result === "string" ? result.substring(0, 200) : "object");
            return {
              tool_call_id: toolCall.id,
              name: toolCall.name,
              content: typeof result === "string" ? result : JSON.stringify(result),
            };
          } catch (error) {
            console.error(`Tool ${toolCall.name} error:`, error);
            return {
              tool_call_id: toolCall.id,
              name: toolCall.name,
              content: JSON.stringify({ error: "Tool execution failed", details: String(error) }),
            };
          }
        }
        return {
          tool_call_id: toolCall.id,
          name: toolCall.name,
          content: JSON.stringify({ error: "Tool not found" }),
        };
      })
    );

    // Add AI response and tool results to messages
    langchainMessages.push(response);
    
    // Add tool messages
    for (const result of toolResults) {
      langchainMessages.push(
        new ToolMessage({
          content: result.content,
          tool_call_id: result.tool_call_id || "",
          name: result.name,
        })
      );
    }

    // Get next response
    console.log("Getting next response after tool results...");
    response = await llmWithTools.invoke(langchainMessages);
    console.log("Next response content:", typeof response.content === "string" ? response.content.substring(0, 100) : "non-string");
  }

  return response;
}

// ===== API Handler =====
export async function POST(request: NextRequest) {
  try {
    const { messages, model = "claude" } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // ตรวจสอบ model parameter
    const validModels: ModelProvider[] = ["gpt", "claude", "grok"];
    const selectedModel: ModelProvider = validModels.includes(model) ? model : "claude";

    // ตรวจสอบ API Keys
    const openrouterKey = process.env.OPENROUTER_API_KEY;

    if (!openrouterKey) {
      // Fallback: ใช้ mock response ถ้าไม่มี API key
      return NextResponse.json({
        role: "assistant",
        content: generateFallbackResponse(
          messages[messages.length - 1]?.content || ""
        ),
        model: selectedModel,
      });
    }

    // สร้าง agent และประมวลผล
    const modelConfig = OPENROUTER_MODELS[selectedModel];

    const result = await runAgentWithTools(
      selectedModel,
      messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      }))
    );

    // Debug logging
    console.log("Result type:", typeof result.content);
    console.log("Result content:", JSON.stringify(result.content).substring(0, 500));

    // ดึงข้อความตอบกลับ
    let content: string;
    if (typeof result.content === "string") {
      content = result.content;
    } else if (Array.isArray(result.content)) {
      content = result.content.map((c) => {
        if (typeof c === "string") return c;
        if ("text" in c && typeof c.text === "string") return c.text;
        return String(c);
      }).join("");
    } else {
      content = String(result.content);
    }

    // ถ้า content ว่าง ให้ใช้ fallback
    if (!content || content.trim() === "" || content === "undefined") {
      content = "ขออภัยครับ ไม่สามารถดึงข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง";
    }

    return NextResponse.json({
      role: "assistant",
      content: content,
      model: selectedModel,
      modelName: modelConfig.displayName,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    // Fallback response
    return NextResponse.json({
      role: "assistant",
      content: "ขออภัยครับ เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้ง",
    });
  }
}

// Fallback response generator
function generateFallbackResponse(query: string): string {
  const lowercaseQuery = query.toLowerCase();
  const now = new Date().toLocaleString("th-TH", {
    dateStyle: "full",
    timeStyle: "short",
  });

  if (
    lowercaseQuery.includes("ราคาทอง") ||
    lowercaseQuery.includes("แนวโน้ม") ||
    lowercaseQuery.includes("gold")
  ) {
    return `📈 **ราคาทองคำวันนี้** (${now})

💰 **ราคาทองไทย (โดยประมาณ)**
- ทองแท่ง รับซื้อ: ~฿43,150/บาททองคำ
- ทองแท่ง ขายออก: ~฿43,250/บาททองคำ
- ทองรูปพรรณ รับซื้อ: ~฿42,650/บาททองคำ
- ทองรูปพรรณ ขายออก: ~฿43,750/บาททองคำ

🌍 **ราคาทองโลก**
- Gold Spot: ~$2,650/oz
- เปลี่ยนแปลง: +$8.50 (+0.32%)

💱 **อัตราแลกเปลี่ยน**
- USD/THB: ~34.50

⚠️ **หมายเหตุ**: ราคาโดยประมาณ กรุณาตรวจสอบราคาล่าสุดจาก:
- 🏛️ สมาคมค้าทองคำ: https://www.goldtraders.or.th/
- 🌐 Kitco: https://www.kitco.com/

ต้องการให้ช่วยวิเคราะห์เพิ่มเติมไหมครับ?`;
  }

  if (
    lowercaseQuery.includes("อัตราแลกเปลี่ยน") ||
    lowercaseQuery.includes("usd") ||
    lowercaseQuery.includes("thb")
  ) {
    return `💱 **อัตราแลกเปลี่ยนวันนี้** (${now})

🇺🇸🇹🇭 **USD/THB**
- อัตรากลาง: ~34.50 บาท
- อัตราซื้อ: ~34.30 บาท  
- อัตราขาย: ~34.70 บาท

📊 **แนวโน้ม**
- สัปดาห์นี้: ค่อนข้างทรงตัว
- ปัจจัย Fed ยังคงมีผลต่อค่าเงิน

⚠️ กรุณาตรวจสอบอัตราล่าสุดจาก:
- 🏦 ธนาคารแห่งประเทศไทย: https://www.bot.or.th/

มีอะไรให้ช่วยเพิ่มเติมไหมครับ?`;
  }

  if (
    lowercaseQuery.includes("ยอด") ||
    lowercaseQuery.includes("จำนำ") ||
    lowercaseQuery.includes("สรุป")
  ) {
    return `📊 **สรุปยอดจำนำวันนี้** (${now})

📈 **ภาพรวม**
- จำนวนรายการ: **45 รายการ** (+12.5%)
- มูลค่ารวม: **฿1,485,000** (+8.0%)
- เฉลี่ยต่อรายการ: **฿33,000**

🏷️ **แยกตามประเภท**
| ประเภท | จำนวน | มูลค่า |
|--------|-------|--------|
| ทองคำ | 25 | ฿950,000 |
| โทรศัพท์ | 12 | ฿320,000 |
| โน้ตบุ๊ก | 5 | ฿150,000 |
| อื่นๆ | 3 | ฿65,000 |

⚠️ **ใกล้ครบกำหนด**
- 7 วันข้างหน้า: 12 รายการ
- 30 วันข้างหน้า: 45 รายการ

มีอะไรให้ช่วยเพิ่มเติมไหมครับ?`;
  }

  if (lowercaseQuery.includes("ข่าว") || lowercaseQuery.includes("news")) {
    return `📰 **ข่าวทองคำล่าสุด**

🔸 **ข่าวในประเทศ**
- ราคาทองปรับตัวตามตลาดโลก
- นักลงทุนจับตา Fed

🔸 **ข่าวต่างประเทศ**
- Gold holds steady amid Fed rate expectations
- Central bank gold buying continues

💡 **ปัจจัยที่ต้องติดตาม**
- นโยบายดอกเบี้ย Fed
- ความตึงเครียดทางภูมิรัฐศาสตร์
- ค่าเงินดอลลาร์

ต้องการรายละเอียดเพิ่มเติมไหมครับ?`;
  }

  return `สวัสดีครับ! 😊 ผมเป็น **Pawn AI Assistant**

ผมช่วยคุณได้ในเรื่อง:
- 📈 **ราคาทองคำไทยวันนี้** - ค้นหาราคาล่าสุดจากสมาคมค้าทองคำ
- 🌍 **ราคาทองโลก (XAU/USD)** - ค้นหาราคา Spot จาก COMEX
- 💱 **อัตราแลกเปลี่ยน USD/THB** - ค้นหาอัตราล่าสุด
- 📰 **ข่าวทองคำ** - ข่าวสารที่มีผลต่อราคา
- 📊 **สรุปยอดจำนำ** - ข้อมูลการดำเนินงาน
- 💡 **คำแนะนำเชิงธุรกิจ** - วิเคราะห์และแนะนำ

ลองถามได้เลยครับ! เช่น:
- "ราคาทองวันนี้เท่าไหร่"
- "อัตราแลกเปลี่ยนวันนี้"
- "ข่าวทองคำล่าสุด"`;
}

// ===== GET Handler - ดึงรายชื่อ Models =====
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
