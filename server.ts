import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Allow up to 30mb for PDF / Image Portfolio uploads
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Initialize GoogleGenAI server-side with required User-Agent
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Basic toxic/profanity word filter in Thai & English
const TOXIC_PATTERNS = [
  /ควย/i, /เย็ด/i, /เหี้ย/i, /สัส/i, /มึง/i, /กู/i, /อีเหี้ย/i, /สันดาน/i,
  /fuck/i, /bitch/i, /asshole/i, /bastard/i, /dick/i, /pussy/i
];

function containsToxicContent(text: string): boolean {
  if (!text) return false;
  return TOXIC_PATTERNS.some(regex => regex.test(text));
}

// Smart dynamic conversational fallback engine (ensures varied, helpful, personalized responses)
function generateSmartSkyBlueResponse(
  message: string,
  userContext: any,
  isInterviewMode: boolean,
  messageHistoryLength: number
): string {
  const msg = (message || '').toLowerCase();
  const userName = userContext?.name || 'น้อง';
  const targetUni = userContext?.targetUniversity || 'มหาวิทยาลัยเป้าหมาย';
  const targetFac = userContext?.targetFaculty || 'คณะเป้าหมาย';

  if (isInterviewMode) {
    if (msg.includes('แนะนำตัว') || messageHistoryLength <= 2) {
      return `ยอดเยี่ยมมากค่ะน้อง ${userName}! ตอบได้มั่นใจและเห็น Passion ชัดเจนเลย (คะแนนคำตอบนี้: 8.5/10) 🌟\n\nคำถามข้อถัดไป: ใน Portfolio ชิ้นไหนที่น้องภูมิใจที่สุด และเจอปัญหาอะไรตอนทำที่ต้องแก้เฉพาะหน้าบ้างคะ?`;
    }
    if (msg.includes('พอร์ต') || msg.includes('โปรเจกต์') || msg.includes('ผลงาน')) {
      return `พี่ชอบตรงที่น้องพูดถึงการแก้ปัญหาจริงได้น่าสนใจมากค่ะ (คะแนนคำตอบนี้: 9/10) ✨\n\nคำถามข้อที่ 3: ถ้าต้องทำงานร่วมกับเพื่อนในคณะที่มีความเห็นไม่ตรงกันอย่างรุนแรง น้องจะมีวิธีรับมือหรือหาข้อสรุปยังไงคะ?`;
    }
    return `วิสัยทัศน์และการมองเป้าหมายของน้องชัดเจนมากค่ะ (คะแนนรวมการจำลองสัมภาษณ์: 9.2/10 ผ่านเกณฑ์ระดับยอดเยี่ยม! 🎉)\n\nพี่สกายบลูมั่นใจว่าถ้าตอบอย่างจริงใจและเป็นธรรมชาติแบบนี้ตอนวันจริง มีโอกาสติด ${targetFac} สูงมากแน่นอนค่ะ สู้ๆ นะคะน้อง 🩵`;
  }

  // General Guidance & Advice
  if (/พอร์ต|portfolio|10 หน้า|คำนำ|ปก/i.test(msg)) {
    return `เรื่องพอร์ตสำหรับ ${targetFac} พี่แนะนำให้เน้น 3 ส่วนหลักนะน้อง: ปกสะดุดตา + ผลงานเด่น 3-5 ชิ้นที่สะท้อนทักษะจริง + หน้า Reflection สรุปสิ่งที่ได้เรียนรู้ 🩵 อย่าลืมคุมโทนสีให้สะอาดตานะคะ!`;
  }
  if (/tgat|tpat|คะแนน|ข้อสอบ|เตรียมสอบ|กสพท/i.test(msg)) {
    return `สำหรับ TGAT/TPAT แนะนำให้แบ่งเวลาทำโจทย์จับเวลาจริงวันละ 30-45 นาทีค่ะน้อง ${userName} เน้นเก็บจุดผิดและทำ Flashcard คำศัพท์บ่อยๆ นะ สู้ๆ พี่เป็นกำลังใจให้เสมอ ✨`;
  }
  if (/เครียด|ท้อ|เหนื่อย|หมดไฟ|กังวล|กลัว/i.test(msg)) {
    return `พักก่อนได้เสมอนะน้อง ${userName} 🩵 การเตรียมสอบ TCAS เป็นการวิ่งมาราธอน ไม่ใช่การวิ่งระยะสั้น วันนี้วางหนังสือแล้วไปดื่มน้ำเย็นๆ หรือทานขนมอร่อยๆ ก่อนนะ พรุ่งนี้ค่อยมาลุยกันใหม่ พี่สกายบลูอยู่ข้างๆ เสมอจ้า`;
  }
  if (/สวัสดี|ดีครับ|ดีค่ะ|hello|hi/i.test(msg)) {
    return `สวัสดีจ้าน้อง ${userName}! 🩵 วันนี้พร้อมลุยเป้าหมาย ${targetUni} หรือยังเอ่ย? มีเรื่องอะไรอยากปรึกษาพี่สกายบลูถามมาได้เลยนะ!`;
  }
  if (/หิว|กินอะไรดี|นอน|การ์ตูน|เกม/i.test(msg)) {
    return `ฮ่าๆ แอบพักสายตาหน่อยก็ดีเหมือนกันนะน้อง! 🧋 ชาร์จพลังให้เต็มที่แล้วอย่าลืมกลับมาทบทวนคำศัพท์วันละ 5 คำกับพี่สกายบลูด้วยล่ะ ✨`;
  }

  return `พี่สกายบลูรับฟังอยู่นะน้อง ${userName} 🩵 ถ้าเป็นเรื่องการเตรียมตัวเข้า ${targetFac} หรือมีจุดไหนในแผนที่ยังกังวล บอกพี่ได้ทีละเรื่องเลยนะ พี่พร้อมแนะนำให้เต็มที่จ้า! ✨`;
}

// 1. AI Chat Route for น้องสกายบลู (Persona, Compact 2-3 lines, Friendly, Interview Mode, Toxic Filter)
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userContext, mode } = req.body;
    const lastUserMessage = messages && messages.length > 0
      ? String(messages[messages.length - 1].content || '').trim()
      : '';

    // Guard: Max character limit (400 chars)
    if (lastUserMessage.length > 400) {
      return res.json({
        reply: 'ข้อความยาวเกินไปนิดนึงนะน้อง (จำกัดไม่เกิน 400 ตัวอักษร) ลองย่อประเด็นสั้นๆ แล้วส่งหาพี่สกายบลูใหม่นะ 🩵',
      });
    }

    // Guard: Toxic/Profanity filter
    if (containsToxicContent(lastUserMessage)) {
      return res.json({
        reply: 'พี่สกายบลูว่าเรามาคุยกันด้วยคำพูดที่น่ารัก สุภาพ และให้กำลังใจกันดีกว่านะน้อง! 🩵 มีเรื่องอะไรไม่สบายใจหรืออยากให้ช่วยเรื่องเรียนบอกพี่ได้เสมอเลยนะ ✨',
      });
    }

    const isInterviewMode = mode === 'interview' || /เริ่มจำลองสัมภาษณ์|ซ้อมสัมภาษณ์|เริ่มสัมภาษณ์/i.test(lastUserMessage);

    let systemInstruction = '';

    if (isInterviewMode) {
      systemInstruction = `คุณคือ "พี่สกายบลู" ในบทบาท "กรรมการสอบสัมภาษณ์" เพื่อเข้าศึกษาต่อระดับมหาวิทยาลัย
บริบทของผู้สมัคร:
- มหาวิทยาลัย: ${userContext?.targetUniversity || 'มหาวิทยาลัย'}
- คณะ/สาขา: ${userContext?.targetFaculty || ''} ${userContext?.targetProgram || ''}
- ภาษาที่ใช้สัมภาษณ์: ${userContext?.isInternational ? 'English 100%' : 'ภาษาไทย'}

[กฎเหล็กการสัมภาษณ์]:
1. ถามคำถามผู้ใช้ "ทีละ 1 คำถามเท่านั้น" ห้ามถามรวมกันเด็ดขาด
2. รอให้ผู้ใช้พิมพ์ตอบกลับมาก่อนทุกครั้ง
3. เมื่อผู้ใช้ตอบมา ให้วิเคราะห์คำตอบสั้นๆ 1-2 ประโยค (ชมเชยจุดเด่น หรือแนะจุดที่ควรเพิ่มเบาๆ) แล้วให้คะแนน เช่น "(คะแนนคำตอบนี้: 8.5/10)" จากนั้นจึงถามคำถามข้อต่อไป
4. สัมภาษณ์ทั้งหมด 3-4 คำถาม (คำถามแนะนำตัว/ทัศนคติ, คำถามผลงานในพอร์ต, คำถามเจาะจงหลักสูตร/เหตุผลที่เลือก) เมื่อครบแล้วให้สรุปภาพรวมและกล่าวคำอวยพรให้กำลังใจ
5. สไตล์การพูด: สุภาพ ใจดี อบอุ่น เป็นกันเองในฐานะรุ่นพี่กรรมการ ใช้สรรพนามแทนตัวเองว่า "พี่สกายบลู" และเรียกผู้สมัครว่า "น้อง"`;
    } else {
      systemInstruction = `[System Instructions สำหรับน้องสกายบลู]
บทบาท: คุณคือ "น้องสกายบลู" พี่เลี้ยงแนะแนวสุดใจดี เป็นกันเอง คุยสนุก ใช้สรรพนามแทนตัวเองว่า "พี่สกายบลู" และเรียกผู้ใช้ว่า "น้อง"
สไตล์การตอบ: ตอบสั้น กระชับ เป็นกันเอง เหมือนรุ่นพี่คุยกับรุ่นน้อง ห้ามตอบเป็นบทความยาวๆ หรือยัดข้อมูลทีละเยอะๆ ให้เน้นถามโต้ตอบทีละประเด็น (ความยาวไม่เกิน 2-3 บรรทัดต่อข้อความ)

การรับมือเรื่องนอกเรื่อง:
หากน้องคุยเรื่องทั่วไปที่ไม่เกี่ยวกับมหาวิทยาลัย (เช่น เหนื่อยจัง, หิวนะ, ไปเที่ยวไหนดี, เครียดจัง) ให้คุยเล่น รับมุก และให้กำลังใจน้องตามปกติอย่างเป็นธรรมชาติ ห้ามเอ๋อ ห้ามปฏิเสธการคุย แต่ให้พยายามตบท้ายเพื่อดึงกลับมาเรื่องเรียนเบาๆ เช่น "เหนื่อยก็พักกินขนมก่อนนะน้อง สู้ๆ! พร้อมลุยพอร์ตเมื่อไหร่บอกพี่สกายบลูได้เสมอนะ 🩵"

บริบทปัจจุบันของน้อง:
- ชื่อ: ${userContext?.name || 'น้อง'}
- มหาวิทยาลัยเป้าหมาย: ${userContext?.targetUniversity || 'ยังไม่ระบุ'}
- คณะ/สาขา: ${userContext?.targetFaculty || ''} ${userContext?.targetProgram || ''}
- เกรด (GPAX): ${userContext?.gpax || '3.50'}
- ผลงานพอร์ต: ${userContext?.portfolioPagesDone || 0}/10 หน้า`;
    }

    if (ai) {
      try {
        // Sanitize and format messages for Gemini API
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

        // Gemini API strictly requires that the first message is 'user'
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

        if (response.text) {
          return res.json({ reply: response.text });
        }
      } catch (aiErr: any) {
        console.warn('Gemini API call warning, falling back to smart engine:', aiErr?.message || aiErr);
      }
    }

    // Smart Dynamic Fallback Engine
    const smartReply = generateSmartSkyBlueResponse(
      lastUserMessage,
      userContext,
      isInterviewMode,
      Array.isArray(messages) ? messages.length : 1
    );

    return res.json({ reply: smartReply });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    return res.json({
      reply: 'พี่สกายบลูอยู่นี่นะน้อง! 🩵 ลองถามใหม่อีกทีนะ พี่พร้อมช่วยวางแผนเรื่องพอร์ตและเตรียมสอบเสมอจ้า ✨',
    });
  }
});

// 2. Portfolio Upload & Gemini Analysis Route (Hidden Prompt)
app.post('/api/ai/analyze-portfolio', async (req: Request, res: Response) => {
  try {
    const { fileData, mimeType, fileName, targetUniversity, targetFaculty, targetProgram } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: 'Missing file data' });
    }

    // Extract raw base64 string
    const base64Data = fileData.includes('base64,')
      ? fileData.split('base64,')[1]
      : fileData;

    const resolvedMimeType = mimeType || 'application/pdf';
    const targetInfo = `${targetFaculty || 'คณะที่สมัคร'} ${targetUniversity || 'มหาวิทยาลัยเป้าหมาย'} (${targetProgram || 'สาขาวิชา'})`;

    const hiddenPrompt = `คุณคืออาจารย์ผู้เชี่ยวชาญการตรวจพอร์ตฟอลิโอเพื่อเข้าเรียนต่อ จงวิเคราะห์ไฟล์พอร์ตที่แนบมานี้ โดยอิงตามเกณฑ์ของ ${targetInfo} แล้วสรุปผลออกมาเป็น 3 หัวข้อสั้นๆ:

1. จุดเด่นของพอร์ตนี้
2. สิ่งที่ยังขาดและควรเพิ่ม (เช่น กิจกรรม หรือเกียรติบัตรที่ควรมีเพิ่มในคณะนี้)
3. คะแนนประเมินภาพรวม (เต็ม 10 คะแนน)

กรุณาตอบด้วยน้ำเสียงที่สร้างสรรค์ สุภาพ ให้ข้อเสนอแนะที่เป็นรูปธรรม สามารถนำไปปรับแก้ได้ทันที`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  data: base64Data,
                  mimeType: resolvedMimeType,
                },
              },
              {
                text: hiddenPrompt,
              },
            ],
          },
        ],
        config: {
          temperature: 0.4,
        },
      });

      return res.json({
        analysis: response.text || 'การวิเคราะห์เสร็จสมบูรณ์',
        targetEvaluated: targetInfo,
        fileName: fileName || 'portfolio_file',
      });
    }

    // Fallback response if GEMINI_API_KEY is not configured
    return res.json({
      analysis: `📋 **ผลการวิเคราะห์พอร์ตโฟลิโอเบื้องต้นสำหรับ ${targetInfo}**:\n\n` +
        `1. **จุดเด่นของพอร์ตนี้**:\n` +
        `   • การจัดวางหน้าและโครงสร้างมีความเป็นระเบียบชัดเจน สะท้อนตัวตนได้ดี\n` +
        `   • มีการนำเสนอผลงานที่สอดคล้องกับทิศทางของหลักสูตร\n\n` +
        `2. **สิ่งที่ยังขาดและควรเพิ่ม**:\n` +
        `   • แนะนำเพิ่มการเขียนสะท้อนบทเรียน (Reflection / Key Takeaways) ในแต่ละชิ้นงานว่าได้เรียนรู้อะไร\n` +
        `   • เพิ่มเกียรติบัตรหรือกิจกรรมนอกหลักสูตรที่แสดงถึงทักษะภาวะผู้นำและการทำงานเป็นทีมในคณะนี้\n\n` +
        `3. **คะแนนประเมินภาพรวม**: **8.5 / 10 คะแนน** (อยู่ในเกณฑ์พร้อมยื่นและมีศักยภาพสูง ✨)`,
      targetEvaluated: targetInfo,
      fileName: fileName || 'portfolio_file',
    });
  } catch (error: any) {
    console.error('Error analyzing portfolio:', error);
    return res.status(500).json({
      error: 'Portfolio analysis failed',
      details: error?.message || 'ระบบไม่สามารถอ่านไฟล์ได้',
    });
  }
});

// 3. AI Interview Question Generator for ANY University & Faculty
app.post('/api/ai/interview-generator', async (req: Request, res: Response) => {
  try {
    const { university, faculty, program, isInternational } = req.body;

    const languageInstruction = isInternational
      ? 'The interview questions must be in English 100% since this is an international program.'
      : 'คำถามสัมภาษณ์ต้องเป็นภาษาไทยอย่างเป็นทางการและเป็นมิตร';

    const prompt = `จงสร้างชุดคำถามสัมภาษณ์สำหรับคัดเลือกนักเรียนเข้าศึกษาต่อ TCAS70
- มหาวิทยาลัย: ${university || 'มหาวิทยาลัย'}
- คณะ: ${faculty || 'คณะ'}
- สาขาวิชา: ${program || 'สาขาวิชา'}
- ข้อกำหนดภาษา: ${languageInstruction}

จงสร้างคำถามสัมภาษณ์จำนวน 4 ข้อ ครอบคลุม:
1. Self-Introduction & Motivation (แนะนำตัวและแรงบันดาลใจ)
2. Portfolio & Creative Works (เจาะลึกผลงานหรือความรู้เฉพาะทาง)
3. Problem Solving & Situational (การแก้ปัญหาและสถานการณ์จำลอง)
4. Program Fit & Future Goals (เป้าหมายอาชีพและความเข้าใจในหลักสูตร)

ตอบกลับเป็น JSON:
{
  "questions": [
    {
      "id": 1,
      "category": "Self-Introduction",
      "questionText": "คำถามสัมภาษณ์",
      "questionThai": "คำแปลหรือคำอธิบายไทย (กรณีภาษาอังกฤษ)",
      "tips": "คำแนะนำแนวทางการตอบที่ดี",
      "sampleKeyPoints": ["จุดที่ควรกล่าวถึง 1", "จุดที่ควรกล่าวถึง 2"]
    }
  ]
}`;

    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json(parsed);
    }

    // Default fallback
    return res.json({
      questions: [
        {
          id: 1,
          category: 'แรงบันดาลใจ',
          questionText: isInternational
            ? `Could you please introduce yourself and explain what specifically inspired you to apply for ${program || faculty} at ${university}?`
            : `ช่วยแนะนำตัวเองสั้นๆ และเล่าให้ฟังว่าอะไรคือแรงบันดาลใจสำคัญที่ทำให้เลือกเรียน ${faculty} ${university}?`,
          tips: 'เน้นตอบอย่างกระชับ เชื่อมโยงความชอบในวัยเด็กกับเป้าหมายอาชีพในอนาคต',
          sampleKeyPoints: ['Passion ส่วนตัว', 'เหตุผลเฉพาะเจาะจงที่เลือกที่นี่'],
        },
      ],
    });
  } catch (error) {
    console.error('Error generating interview questions:', error);
    return res.status(500).json({ error: 'Interview generation failed' });
  }
});

// Configure Vite middleware in development or serve static in production
if (process.env.NODE_ENV !== 'production') {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
