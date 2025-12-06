import { NextResponse } from "next/server";

// Knowledge Base สำหรับสำนักงานธนานุเคราะห์
const KNOWLEDGE_BASE = {
  about: {
    title: "เกี่ยวกับสำนักงานธนานุเคราะห์",
    content: `สำนักงานธนานุเคราะห์ (สธค.) เป็นหน่วยงานรัฐวิสาหกิจ สังกัดกระทรวงการพัฒนาสังคมและความมั่นคงของมนุษย์
ก่อตั้งเมื่อปี พ.ศ. 2498 มีวัตถุประสงค์หลักในการให้บริการรับจำนำสิ่งของแก่ประชาชนในอัตราดอกเบี้ยต่ำ
เพื่อบรรเทาความเดือดร้อนทางการเงินและป้องกันการเอารัดเอาเปรียบจากเจ้าหนี้นอกระบบ

พันธกิจ:
- ให้บริการรับจำนำสิ่งของแก่ประชาชนในอัตราดอกเบี้ยต่ำ
- ส่งเสริมให้ประชาชนมีวินัยทางการเงิน
- เป็นแหล่งเงินทุนสำรองฉุกเฉินสำหรับผู้มีรายได้น้อย

สาขา: มีสาขาทั่วประเทศกว่า 37 สาขา`
  },
  pawnRates: {
    title: "อัตราดอกเบี้ยรับจำนำ",
    content: `อัตราดอกเบี้ยรับจำนำของสำนักงานธนานุเคราะห์ (อัตราต่อเดือน):

1. เงินต้นไม่เกิน 5,000 บาท
   - อัตราดอกเบี้ย: 0.50% ต่อเดือน

2. เงินต้น 5,001 - 10,000 บาท
   - อัตราดอกเบี้ย: 0.75% ต่อเดือน

3. เงินต้น 10,001 - 20,000 บาท
   - อัตราดอกเบี้ย: 1.00% ต่อเดือน

4. เงินต้น 20,001 - 100,000 บาท
   - อัตราดอกเบี้ย: 1.25% ต่อเดือน

5. เงินต้นเกิน 100,000 บาท
   - อัตราดอกเบี้ย: 1.25% ต่อเดือน

หมายเหตุ: อัตราดอกเบี้ยอาจเปลี่ยนแปลงตามนโยบายของสำนักงาน`
  },
  goldValuation: {
    title: "หลักเกณฑ์การประเมินราคาทองคำ",
    content: `หลักเกณฑ์การประเมินราคาทองคำรับจำนำ:

1. ทองคำแท่ง 96.5%
   - รับจำนำประมาณ 90-95% ของราคารับซื้อ
   - ต้องมีตราประทับจากร้านทองที่ได้รับการรับรอง

2. ทองรูปพรรณ 96.5%
   - รับจำนำประมาณ 85-90% ของราคารับซื้อ
   - หักค่ากำเหน็จตามน้ำหนัก

3. ทองรูปพรรณเก่า/ลายโบราณ
   - รับจำนำประมาณ 80-85% ของราคารับซื้อ
   - พิจารณาจากสภาพและความสมบูรณ์

เครื่องมือวัด:
- เครื่องชั่งดิจิตอลความละเอียด 0.01 กรัม
- เครื่องวัดความบริสุทธิ์ (XRF Analyzer)
- น้ำยาทดสอบทองคำ`
  },
  redemption: {
    title: "การไถ่ถอนทรัพย์สิน",
    content: `ระเบียบการไถ่ถอนทรัพย์สิน:

ระยะเวลาไถ่ถอน:
- ระยะเวลาจำนำ 4 เดือน 30 วัน
- สามารถต่อตั๋วได้ก่อนครบกำหนด 15 วัน
- ถ้าไม่ไถ่ถอนภายในกำหนด ทรัพย์จะหลุดจำนำ

ขั้นตอนการไถ่ถอน:
1. นำตั๋วจำนำมาแสดงที่สาขา
2. ชำระเงินต้นพร้อมดอกเบี้ย
3. รับทรัพย์สินคืน
4. ตรวจสอบทรัพย์สินก่อนลงนามรับ

การชำระเงิน:
- เงินสด
- บัตรเดบิต/เครดิต
- โอนผ่านธนาคาร
- QR Payment`
  },
  forfeitedProperty: {
    title: "ทรัพย์หลุดจำนำ",
    content: `การจัดการทรัพย์หลุดจำนำ:

ประเภททรัพย์หลุดจำนำ:
- ทองคำ (แท่ง/รูปพรรณ)
- เครื่องใช้ไฟฟ้า
- โทรศัพท์มือถือ
- กล้องถ่ายรูป
- นาฬิกา

การจำหน่าย:
1. ประมูลขายทอดตลาด (ทุกเดือน)
2. ขายหน้าร้านสาขา
3. ขายผ่านช่องทางออนไลน์

ราคาขาย:
- ทองคำ: ราคาตลาด ณ วันขาย
- สิ่งของอื่น: ราคาประเมินตามสภาพ (ถูกกว่าท้องตลาด 20-40%)

การซื้อทรัพย์หลุดจำนำ:
- ประชาชนทั่วไปสามารถเข้าร่วมประมูลได้
- ต้องลงทะเบียนก่อนเข้าร่วมประมูล
- ชำระเงินทันทีหลังประมูลชนะ`
  },
  goldAnalysis: {
    title: "การวิเคราะห์ตลาดทองคำ",
    content: `ปัจจัยที่มีผลต่อราคาทองคำ:

1. ปัจจัยระหว่างประเทศ:
   - นโยบายดอกเบี้ยของธนาคารกลางสหรัฐ (Fed)
   - ค่าเงินดอลลาร์สหรัฐ
   - ความตึงเครียดทางภูมิรัฐศาสตร์
   - อัตราเงินเฟ้อโลก

2. ปัจจัยในประเทศ:
   - อัตราแลกเปลี่ยน USD/THB
   - ความต้องการทองคำของผู้บริโภค
   - ฤดูกาลแต่งงาน/เทศกาล

แนวโน้มราคาทอง:
- ช่วงเศรษฐกิจถดถอย: ราคาทองมักปรับตัวสูงขึ้น (Safe Haven)
- ช่วงดอกเบี้ยขาขึ้น: ราคาทองมักปรับตัวลง
- ช่วงเงินเฟ้อสูง: ราคาทองมักปรับตัวสูงขึ้น

คำแนะนำสำหรับร้านรับจำนำ:
- ติดตามราคาทองคำอย่างใกล้ชิดทุกวัน
- ปรับอัตราการให้วงเงินตามความผันผวนของราคา
- เก็บสำรองเงินสดเพียงพอสำหรับช่วงราคาทองลดลง`
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category");

  try {
    // ถ้าระบุ category เฉพาะ
    if (category && category in KNOWLEDGE_BASE) {
      const item = KNOWLEDGE_BASE[category as keyof typeof KNOWLEDGE_BASE];
      return NextResponse.json({
        success: true,
        results: [item],
      });
    }

    // ค้นหาจาก query
    const queryLower = query.toLowerCase();
    const results = [];

    for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
      const titleMatch = value.title.toLowerCase().includes(queryLower);
      const contentMatch = value.content.toLowerCase().includes(queryLower);
      
      if (titleMatch || contentMatch || query === "") {
        results.push({
          category: key,
          ...value,
          relevance: titleMatch ? 2 : 1,
        });
      }
    }

    // เรียงตาม relevance
    results.sort((a, b) => b.relevance - a.relevance);

    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("Knowledge base error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to search knowledge base" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { question } = await request.json();
    
    if (!question) {
      return NextResponse.json(
        { success: false, error: "Question is required" },
        { status: 400 }
      );
    }

    const questionLower = question.toLowerCase();
    
    // ค้นหาข้อมูลที่เกี่ยวข้อง
    const relevantDocs = [];
    
    // ตรวจสอบคำสำคัญและเลือกเอกสารที่เกี่ยวข้อง
    if (questionLower.includes("อัตราดอกเบี้ย") || questionLower.includes("ดอกเบี้ย")) {
      relevantDocs.push(KNOWLEDGE_BASE.pawnRates);
    }
    if (questionLower.includes("ทองคำ") || questionLower.includes("ทอง") || questionLower.includes("ราคาทอง")) {
      relevantDocs.push(KNOWLEDGE_BASE.goldValuation);
      relevantDocs.push(KNOWLEDGE_BASE.goldAnalysis);
    }
    if (questionLower.includes("ไถ่ถอน") || questionLower.includes("ต่อตั๋ว")) {
      relevantDocs.push(KNOWLEDGE_BASE.redemption);
    }
    if (questionLower.includes("หลุดจำนำ") || questionLower.includes("ประมูล")) {
      relevantDocs.push(KNOWLEDGE_BASE.forfeitedProperty);
    }
    if (questionLower.includes("ธนานุเคราะห์") || questionLower.includes("สธค") || questionLower.includes("เกี่ยวกับ")) {
      relevantDocs.push(KNOWLEDGE_BASE.about);
    }

    // ถ้าไม่พบเอกสารที่เกี่ยวข้อง ส่งข้อมูลทั่วไป
    if (relevantDocs.length === 0) {
      relevantDocs.push(KNOWLEDGE_BASE.about);
      relevantDocs.push(KNOWLEDGE_BASE.goldAnalysis);
    }

    // สร้าง context สำหรับ LLM
    const context = relevantDocs
      .map(doc => `## ${doc.title}\n${doc.content}`)
      .join("\n\n---\n\n");

    return NextResponse.json({
      success: true,
      question,
      context,
      documentsUsed: relevantDocs.map(d => d.title),
    });
  } catch (error) {
    console.error("RAG error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process question" },
      { status: 500 }
    );
  }
}
