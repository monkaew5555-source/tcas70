import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, userContext, mode } = req.body || {};
    const lastUserMessage = messages && messages.length > 0
      ? String(messages[messages.length - 1].content || '').trim()
      : '';

    const isInterviewMode = mode === 'interview';
    const userName = userContext?.name || 'น้อง (Guest)';
    const targetUni = userContext?.targetUniversity || 'มหาวิทยาลัยขอนแก่น (KKUIC)';
    const targetFac = userContext?.targetFaculty || 'วิทยาลัยนานาชาติ';

    const systemInstruction = isInterviewMode
      ? `คุณคือ "พี่สกายบลู" รุ่นพี่ติวเตอร์และกรรมการจำลองการสอบสัมภาษณ์เข้ามหาวิทยาลัย
บุคลิก: อบอุ่น สุภาพ เป็นกันเอง แต่ตั้งคำถามได้ตรงจุด เจาะลึกตามคณะ ${targetFac}
กฎสำคัญ:
1. ตอบสั้น กระชับ ไม่เกิน 3-4 บรรทัด
2. ให้คะแนนคำตอบของผู้ใช้ (เต็ม 10) พร้อมคอมเมนต์จุดเด่นและสิ่งที่ควรเพิ่ม 1 ข้อ
3. ถามคำถามถัดไป 1 คำถาม`
      : `คุณคือ "พี่สกายบลู" รุ่นพี่ที่ปรึกษาการเตรียมสอบและทำพอร์ต TCAS70
บุคลิก: สดใส อบอุ่น เป็นกันเอง สไตล์พี่สาวใจดี
กฎสำคัญ:
1. ตอบสั้น กระชับ 2-3 บรรทัด ไม่ส่งข้อความเป็นพารากราฟยาว
2. พูดคุยเรื่องทั่วไปได้เป็นธรรมชาติ แล้วเชื่อมโยงเข้ากับการเรียนอย่างอ่อนโยน
3. บริบทผู้ใช้: ชื่อ ${userName}, เป้าหมาย ${targetUni} คณะ ${targetFac}`;

    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      return res.status(200).json({
        reply: `พี่สกายบลูพร้อมช่วยน้อง ${userName} เสมอจ้า! 🩵 สำหรับเป้าหมาย ${targetFac} แนะนำเริ่มจากการจัดหมวดหมู่ผลงานและตรวจเช็กเกณฑ์คะแนนขั้นต่ำให้ครบถ้วนก่อนนะ หากติดปัญหาเรื่องไหนพิมพ์ถามพี่ได้เลย! ✨`,
        serverNote: 'API Key not set in Vercel Environment Variables. Using fallback mentor response.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Format chat history
    const formattedHistory: any[] = [];
    const rawList = Array.isArray(messages) ? messages.slice(-8) : [];
    for (const m of rawList) {
      const text = String(m.content || '').trim();
      if (!text) continue;
      const role = m.role === 'assistant' ? 'model' : 'user';
      if (formattedHistory.length > 0 && formattedHistory[formattedHistory.length - 1].role === role) {
        formattedHistory[formattedHistory.length - 1].parts[0].text += `\n${text}`;
      } else {
        formattedHistory.push({
          role,
          parts: [{ text }],
        });
      }
    }

    while (formattedHistory.length > 0 && formattedHistory[0].role !== 'user') {
      formattedHistory.shift();
    }

    if (formattedHistory.length === 0) {
      formattedHistory.push({
        role: 'user',
        parts: [{ text: lastUserMessage || 'สวัสดีครับพี่สกายบลู' }],
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.status(200).json({ reply: response.text || 'พี่สกายบลูพร้อมเคียงข้างน้องเสมอนะคะ 🩵' });
  } catch (error: any) {
    console.error('Error in Vercel serverless function /api/ai/chat:', error);
    return res.status(200).json({
      reply: 'พี่สกายบลูอยู่นี่นะน้อง! 🩵 พี่พร้อมช่วยวางแผนเรื่องพอร์ตและเตรียมสอบเสมอ ลองส่งคำถามอีกทีนะ ✨',
      errorDetails: error?.message || 'Server error',
    });
  }
}
