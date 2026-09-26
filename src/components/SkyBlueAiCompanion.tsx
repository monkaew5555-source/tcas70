import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANION_AVATAR } from '../data/initialData';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  time: string;
}

const TOXIC_PATTERNS = [
  /ควย/i, /เย็ด/i, /เหี้ย/i, /สัส/i, /มึง/i, /กู/i, /อีเหี้ย/i, /สันดาน/i,
  /fuck/i, /bitch/i, /asshole/i, /bastard/i, /dick/i, /pussy/i
];

export const SkyBlueAiCompanion: React.FC = () => {
  const {
    currentUser,
    currentPrimaryTarget,
    financialCalculations,
    projects,
    examScores,
    isAiChatOpen,
    setAiChatOpen,
    setActiveTab,
    completeQuest,
    setAuthToast,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isInterviewMode, setIsInterviewMode] = useState(false);

  const defaultGreeting: ChatMessage = {
    id: 'welcome',
    sender: 'assistant',
    text: `สวัสดีจ้าน้อง${currentUser.name ? ` ${currentUser.name}` : ''}! 🩵 พี่สกายบลูพร้อมช่วยวางแผนสู่ **${currentPrimaryTarget.name}** (${currentPrimaryTarget.faculty}) แล้วนะ\n\nมีอะไรสงสัยเรื่องพอร์ต เรื่องสอบ หรืออยากซ้อมสัมภาษณ์พิมพ์คุยกับพี่ได้เลยนะ สู้ๆ! ✨`,
    time: 'ตอนนี้',
  };

  // Load chat isolated per user account
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(`tcas70_chat_${currentUser.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [defaultGreeting];
  });

  // When user switches or logs in, load that user's chat specifically
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`tcas70_chat_${currentUser.id}`);
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages([defaultGreeting]);
      }
    } catch {
      setMessages([defaultGreeting]);
    }
  }, [currentUser.id]);

  // Persist chat per user
  useEffect(() => {
    try {
      localStorage.setItem(`tcas70_chat_${currentUser.id}`, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages, currentUser.id]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAiChatOpen) {
      scrollToBottom();
    }
  }, [messages, isAiChatOpen, isThinking]);

  // Reset Session Handler
  const handleResetSession = () => {
    const freshMessages = [
      {
        id: `reset-${Date.now()}`,
        sender: 'assistant' as const,
        text: `รีเซ็ตการสนทนาเรียบร้อยจ้า! 🩵 พี่สกายบลูลืมบทบาทเก่าและพร้อมคุยเรื่องแนะแนวปกติ หรือวางแผนใหม่อีกรอบแล้วนะน้อง อยากให้ช่วยเรื่องอะไรบอกได้เลย! ✨`,
        time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(freshMessages);
    setIsInterviewMode(false);
    setInputMessage('');
    try {
      localStorage.setItem(`tcas70_chat_${currentUser.id}`, JSON.stringify(freshMessages));
    } catch {
      // ignore
    }
    setAuthToast('รีเซ็ตเซสชันแชทกับพี่สกายบลูเรียบร้อยแล้ว ✓');
  };

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = (textToSend || inputMessage).trim();
    if (!rawText || isThinking) return;

    // Check toxic / profanity words
    const isToxic = TOXIC_PATTERNS.some(rx => rx.test(rawText));
    if (isToxic) {
      setAuthToast('โปรดใช้คำสุภาพและสร้างสรรค์ในการสนทนานะคะ 🩵');
      return;
    }

    // Limit text length to max 400 chars
    const text = rawText.slice(0, 400);

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsThinking(true);

    // Complete the AI quest
    completeQuest('q-5');

    // Check if activating interview mode
    const enteringInterview = isInterviewMode || /เริ่มจำลองสัมภาษณ์|ซ้อมสัมภาษณ์|สัมภาษณ์จำลอง/i.test(text);
    if (enteringInterview && !isInterviewMode) {
      setIsInterviewMode(true);
    }

    const pagesReady = projects.filter(p => p.status === 'พร้อมใส่ Portfolio').length;

    const userContext = {
      name: currentUser.name,
      targetUniversity: currentPrimaryTarget.name,
      targetFaculty: currentPrimaryTarget.faculty,
      targetProgram: currentPrimaryTarget.program,
      gpax: currentUser.gpax,
      portfolioPagesDone: pagesReady,
      financeSummary: `ค่าใช้จ่าย 4 ปี: ~${financialCalculations.total4YearCost.toLocaleString()} บาท`,
      examScoresCount: examScores.length,
      isInternational: (currentPrimaryTarget.program || '').toLowerCase().includes('international') ||
        (currentPrimaryTarget.faculty || '').toLowerCase().includes('international') ||
        (currentPrimaryTarget.name || '').toLowerCase().includes('kkuic'),
    };

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
          userContext,
          mode: enteringInterview ? 'interview' : 'advisory',
        }),
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'พี่สกายบลูพร้อมช่วยน้องเสมอนะคะ 🩵',
        time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: `พี่สกายบลูอยู่นี่แล้วนะน้อง! 🩵 สำหรับ ${currentPrimaryTarget.name} แนะนำโฟกัสเกรดขั้นต่ำ ${currentPrimaryTarget.gpaxRequired || '3.00'}+ และเตรียมพอร์ต 10 หน้าให้ตรงจุด มีข้อไหนอยากถามพี่เจาะจงบอกได้เลยน้า ✨`,
          time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const quickPrompts = [
    { label: '🎙️ เริ่มจำลองสัมภาษณ์', text: 'เริ่มจำลองสัมภาษณ์' },
    { label: '📋 ควรทำอะไรก่อน-หลัง?', text: `ตอนนี้ฉันกำลังเตรียมเข้า ${currentPrimaryTarget.name} ${currentPrimaryTarget.faculty} ควรเริ่มทำอะไรก่อน-หลังดีคะ?` },
    { label: '📄 พอร์ตคณะนี้ใส่อะไรบ้าง?', text: `คณะ ${currentPrimaryTarget.faculty} ${currentPrimaryTarget.name} พอร์ต 10 หน้าควรใส่ผลงานประเภทไหนบ้าง และ GPAX เท่าไหร่ปลอดภัย?` },
    { label: '🎯 คณะนี้สอบวิชาอะไรบ้าง?', text: `คณะ ${currentPrimaryTarget.faculty} ${currentPrimaryTarget.program} ม. ${currentPrimaryTarget.name} ต้องสอบวิชาอะไรบ้างคะ?` },
    { label: '💰 วางแผนการเงิน/ทำงานเสริม', text: `ช่วยแนะนำเรื่องค่าใช้จ่ายและควรหางานเสริมหรือกู้ กยศ. สำหรับเรียน ${currentPrimaryTarget.name} ดีไหม?` },
    { label: 'เหนื่อยจัง / ขอกำลังใจ', text: 'เหนื่อยจังเลยช่วงนี้ ขอกำลังใจหน่อยได้ไหม' },
  ];

  return (
    <>
      {/* Floating Action Button */}
      {!isAiChatOpen && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2">
          {/* Helpful Speech Bubble Preview */}
          <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-[#c4e7ff] text-[12px] text-[#131b2e] animate-bounce duration-1000">
            <span className="font-bold text-[#00668a]">พี่สกายบลู</span>
            <span>คุยปรึกษาหรือซ้อมสัมภาษณ์ได้นะ 🩵</span>
          </div>

          <button
            onClick={() => setAiChatOpen(true)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#00668a] to-[#38bdf8] p-0.5 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center pulse-glow relative group"
            title="คุยกับพี่สกายบลู (AI แนะแนว)"
            aria-label="เปิดแชทกับพี่สกายบลู"
          >
            <img
              src={COMPANION_AVATAR}
              alt="พี่สกายบลู"
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-300" />
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-xs">
              AI
            </span>
          </button>
        </div>
      )}

      {/* Floating Chat Modal */}
      {isAiChatOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex flex-col w-full sm:w-[440px] h-full sm:h-[620px] bg-white sm:rounded-3xl shadow-2xl border border-[#c4e7ff] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <header className="p-3.5 sm:p-4 bg-gradient-to-r from-[#00668a] via-[#0284c7] to-[#38bdf8] text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={COMPANION_AVATAR}
                  alt="พี่สกายบลู"
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[15px] font-extrabold tracking-tight">น้องสกายบลู (พี่สกายบลู)</h3>
                  {isInterviewMode ? (
                    <span className="px-1.5 py-0.2 bg-amber-400 text-amber-950 text-[10px] font-extrabold rounded-md animate-pulse">
                      โหมดกรรมการสัมภาษณ์
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.2 bg-white/20 text-[10px] font-bold rounded-md">
                      พี่เลี้ยงแนะแนว
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-white/90 truncate max-w-[210px]">
                  เป้าหมาย: {currentPrimaryTarget.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Reset Session Button */}
              <button
                type="button"
                onClick={handleResetSession}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white cursor-pointer"
                title="ล้างการสนทนา (Reset Session)"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('university');
                  setAiChatOpen(false);
                }}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white cursor-pointer"
                title="เปลี่ยนเป้าหมายมหาวิทยาลัย"
              >
                <span className="material-symbols-outlined text-[18px]">school</span>
              </button>
              <button
                type="button"
                onClick={() => setAiChatOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white cursor-pointer"
                title="ปิดหน้าต่าง"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </header>

          {/* Target Status Ribbon */}
          <div className="bg-[#f0f9ff] px-4 py-2 border-b border-[#c4e7ff] text-[11px] text-[#004965] flex items-center justify-between shrink-0">
            <span className="flex items-center gap-1.5 font-bold truncate">
              <span className="material-symbols-outlined text-[15px] text-[#00668a]">target</span>
              {currentPrimaryTarget.faculty} • {currentPrimaryTarget.program}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {isInterviewMode && (
                <button
                  onClick={handleResetSession}
                  className="text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 hover:bg-rose-100 cursor-pointer font-bold"
                >
                  ออกจากการสัมภาษณ์
                </button>
              )}
              <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#c4e7ff]">
                GPAX {currentPrimaryTarget.gpaxRequired}+
              </span>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-[#faf8ff]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <img
                    src={COMPANION_AVATAR}
                    alt="พี่สกายบลู"
                    className="w-7 h-7 rounded-full object-cover border border-[#c4e7ff] shrink-0 mt-0.5"
                  />
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#00668a] text-white rounded-br-none'
                      : 'bg-white text-[#131b2e] border border-[#c4e7ff]/80 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-normal">{msg.text}</div>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-[#6e7980]'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-2.5 justify-start">
                <img
                  src={COMPANION_AVATAR}
                  alt="พี่สกายบลู"
                  className="w-7 h-7 rounded-full object-cover border border-[#c4e7ff] shrink-0"
                />
                <div className="bg-white text-[#5f5a7c] border border-[#c4e7ff] rounded-2xl rounded-bl-none px-4 py-2.5 text-[12px] flex items-center gap-2 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
                  <span>พี่สกายบลูกำลังพิมพ์ตอบนะน้อง... 🩵</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-white border-t border-[#c4e7ff]/60 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.text)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors border cursor-pointer shrink-0 ${
                    p.label.includes('จำลองสัมภาษณ์')
                      ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                      : 'bg-[#f2f3ff] hover:bg-[#c4e7ff] text-[#00668a] border-[#c4e7ff]/60'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input & Send Form with Character Limit Counter */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#bdc8d1]/30 flex flex-col gap-1.5 shrink-0"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                maxLength={400}
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                placeholder={isInterviewMode ? "พิมพ์คำตอบสัมภาษณ์ของคุณ..." : "พิมพ์คุยกับพี่สกายบลู (ไม่เกิน 400 ตัวอักษร)..."}
                className="flex-1 px-4 py-2.5 bg-[#f2f3ff] rounded-full border border-[#c4e7ff] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white transition-all text-[#131b2e] placeholder:text-[#6e7980]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isThinking}
                className="w-10 h-10 rounded-full bg-[#00668a] hover:bg-[#004965] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0"
                title="ส่งข้อความ"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#6e7980] px-2">
              <span>{isInterviewMode ? '🎯 โหมดสัมภาษณ์: ตอบทีละข้อพร้อมรับฟีดแบ็ก' : '💡 คุยสั้นกระชับ เป็นกันเอง 2-3 บรรทัด'}</span>
              <span className={inputMessage.length > 350 ? 'text-rose-600 font-bold' : ''}>
                {inputMessage.length} / 400
              </span>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
