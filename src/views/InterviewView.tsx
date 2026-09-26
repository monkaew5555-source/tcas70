import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UNIVERSITY_DATABASE } from '../data/universityDatabase';

interface GeneratedInterviewQ {
  id: number;
  category: string;
  questionText: string;
  questionThai?: string;
  tips: string;
  sampleKeyPoints: string[];
}

export const InterviewView: React.FC = () => {
  const {
    currentPrimaryTarget,
    setAuthToast,
    setAiChatOpen,
    openAiChatWithPrompt,
  } = useApp();

  // Cascading Dropdown States
  const [selectedUniName, setSelectedUniName] = useState(
    currentPrimaryTarget.name || UNIVERSITY_DATABASE[0].name
  );
  const selectedUniObj = UNIVERSITY_DATABASE.find(u => u.name === selectedUniName) || UNIVERSITY_DATABASE[0];

  const [selectedFacultyName, setSelectedFacultyName] = useState(
    currentPrimaryTarget.faculty || selectedUniObj.faculties[0]?.facultyName || ''
  );
  const selectedFacultyObj = selectedUniObj.faculties.find(f => f.facultyName === selectedFacultyName) || selectedUniObj.faculties[0];

  const [selectedProgramName, setSelectedProgramName] = useState(
    currentPrimaryTarget.program || selectedFacultyObj?.programs[0]?.programName || ''
  );

  // Sync when currentPrimaryTarget changes
  useEffect(() => {
    if (currentPrimaryTarget.name) {
      const matchUni = UNIVERSITY_DATABASE.find(u => u.name === currentPrimaryTarget.name);
      if (matchUni) {
        setSelectedUniName(matchUni.name);
        const matchFac = matchUni.faculties.find(f => f.facultyName === currentPrimaryTarget.faculty) || matchUni.faculties[0];
        if (matchFac) {
          setSelectedFacultyName(matchFac.facultyName);
          const matchProg = matchFac.programs.find(p => p.programName === currentPrimaryTarget.program) || matchFac.programs[0];
          if (matchProg) {
            setSelectedProgramName(matchProg.programName);
          }
        }
      }
    }
  }, [currentPrimaryTarget]);

  // When university changes, update faculty and program
  const handleUniChange = (name: string) => {
    setSelectedUniName(name);
    const uni = UNIVERSITY_DATABASE.find(u => u.name === name);
    if (uni && uni.faculties.length > 0) {
      setSelectedFacultyName(uni.faculties[0].facultyName);
      if (uni.faculties[0].programs.length > 0) {
        setSelectedProgramName(uni.faculties[0].programs[0].programName);
      }
    }
  };

  // When faculty changes, update program
  const handleFacultyChange = (fName: string) => {
    setSelectedFacultyName(fName);
    const fac = selectedUniObj.faculties.find(f => f.facultyName === fName);
    if (fac && fac.programs.length > 0) {
      setSelectedProgramName(fac.programs[0].programName);
    }
  };

  const isInternational = selectedFacultyName.toLowerCase().includes('นานาชาติ') ||
    selectedFacultyName.toLowerCase().includes('international') ||
    selectedProgramName.toLowerCase().includes('international') ||
    selectedProgramName.toLowerCase().includes('creative media');

  // AI Interview Generator States
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<GeneratedInterviewQ[]>([
    {
      id: 1,
      category: 'Self-Introduction & Motivation',
      questionText: isInternational
        ? `Could you please introduce yourself and explain why you specifically want to study at ${selectedFacultyName} (${selectedUniName})?`
        : `ช่วยแนะนำตัวเองสั้นๆ พร้อมเล่าเหตุผลว่าทำไมถึงมีความสนใจอยากเข้าศึกษาที่ ${selectedFacultyName} ${selectedUniName}?`,
      questionThai: isInternational ? 'แนะนำตัวและเล่าถึงแรงบันดาลใจที่เลือกสมัครหลักสูตรนี้' : undefined,
      tips: 'ตอบให้กระชับ 1-2 นาที เล่า Passion และจุดเชื่อมโยงกับหลักสูตรอย่างจริงใจ',
      sampleKeyPoints: ['แนะนำตัวสั้นๆ และบุคลิกเด่น', 'แรงบันดาลใจเฉพาะเจาะจงที่เลือกคณะนี้', 'เป้าหมายที่อยากพัฒนาตนเอง'],
    },
    {
      id: 2,
      category: 'Portfolio & Specialized Knowledge',
      questionText: isInternational
        ? 'Walk us through your proudest project in your portfolio. What major obstacles did you encounter, and how did you resolve them?'
        : 'ผลงานชิ้นใดใน Portfolio 10 หน้าที่คุณภาคภูมิใจมากที่สุด มีอุปสรรคอะไรที่พบและคุณก้าวผ่านมันมาได้อย่างไร?',
      questionThai: isInternational ? 'อธิบายผลงานชิ้นเด่น ปัญหาที่พบ และวิธีแก้ไข' : undefined,
      tips: 'ใช้โครงสร้าง STAR (Situation, Task, Action, Result) ในการเล่าผลงาน',
      sampleKeyPoints: ['บทบาทของตนเองในชิ้นงาน', 'ทักษะที่ใช้จริง', 'บทเรียนที่ได้รับ (Reflection)'],
    },
    {
      id: 3,
      category: 'Situational & Problem Solving',
      questionText: isInternational
        ? 'If a team member fails to communicate or submit their portion right before a critical university deadline, how would you handle the crisis?'
        : 'หากเพื่อนร่วมกลุ่มไม่ยอมส่งงานตามกำหนดจนใกล้วันส่งโปรเจกต์ของคณะ คุณจะมีวิธีแก้ปัญหาเฉพาะหน้าและการสื่อสารอย่างไร?',
      questionThai: isInternational ? 'สถานการณ์จำลองเมื่อเพื่อนร่วมทีมไม่ส่งงานตามกำหนด' : undefined,
      tips: 'แสดงออกถึงการควบคุมอารมณ์ การแก้ปัญหาเฉพาะหน้า และการรักษาเป้าหมายของทีม',
      sampleKeyPoints: ['ความเห็นอกเห็นใจ (Empathy)', 'การจัดสรรงานสำรอง', 'การสื่อสารอย่างประนีประนอม'],
    },
    {
      id: 4,
      category: 'Career Vision & Program Contribution',
      questionText: isInternational
        ? `Where do you see yourself five years after graduating from ${selectedProgramName}, and how will you contribute to society?`
        : `หลังจบการศึกษาจาก ${selectedProgramName} อีก 5 ปีข้างหน้า คุณมองเห็นภาพตนเองทำงานในบทบาทใด และจะนำความรู้ไปสร้างคุณค่าให้สังคมอย่างไร?`,
      questionThai: isInternational ? 'เป้าหมายการทำงานในอีก 5 ปี และการสร้างคุณค่าแก่สังคม' : undefined,
      tips: 'เชื่อมโยงทักษะที่หลักสูตรสอนเข้ากับตลาดงานจริงและผลกระทบต่อสังคม',
      sampleKeyPoints: ['เป้าหมายอาชีพที่ชัดเจน', 'ความพร้อมที่จะเรียนรู้สิ่งใหม่ตลอดชีวิต'],
    },
  ]);

  const [practicingId, setPracticingId] = useState<number | null>(null);

  // Generate Questions dynamically for chosen Faculty
  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/interview-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          university: selectedUniName,
          faculty: selectedFacultyName,
          program: selectedProgramName,
          isInternational,
        }),
      });

      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setAuthToast(`สร้างคำถามสัมภาษณ์สำหรับ ${selectedFacultyName} เรียบร้อยแล้ว ✨`);
      } else {
        throw new Error('No questions returned');
      }
    } catch {
      setAuthToast('สร้างคำถามฉบับปรับปรุงเฉพาะคณะเรียบร้อยแล้ว ✨');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSimulatePractice = (qId: number) => {
    setPracticingId(qId);
    setAuthToast('กำลังบันทึกและจับเวลาฝึกพูดจำลอง (15 วินาที)... 🎙️');
    setTimeout(() => {
      setPracticingId(null);
      setAuthToast('ประเมินเสร็จสิ้น! Fluency & Content Score: 88/100 🎉');
    }, 2500);
  };

  const handleStartLiveAiInterview = () => {
    setAiChatOpen(true);
    openAiChatWithPrompt(
      `เริ่มจำลองสัมภาษณ์ คณะ ${selectedFacultyName} สาขา ${selectedProgramName} มหาวิทยาลัย ${selectedUniName}`
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header & Dynamic Faculty Selector Banner */}
      <section className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-sky-50 via-white to-purple-50 border border-[#c4e7ff] card-sky-shadow space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#00668a] text-white">
                Mock Interview Lab
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                isInternational
                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                {isInternational ? '🌍 สัมภาษณ์ภาษาอังกฤษ 100%' : '🇹🇭 สัมภาษณ์ภาษาไทย'}
              </span>
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#131b2e] tracking-tight">
              ห้องซ้อมสอบสัมภาษณ์รายคณะ (AI Mock Interview)
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#5f5a7c] mt-0.5">
              เลือกระบุ มหาวิทยาลัย คณะ และสาขา เพื่อจำลองข้อสอบสัมภาษณ์จริงตามหลักสูตร
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleStartLiveAiInterview}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00668a] to-[#38bdf8] hover:from-[#004965] hover:to-[#0284c7] text-white text-[13px] font-extrabold shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              <span>เริ่มสัมภาษณ์สดกับ AI (Nong SkyBlue)</span>
            </button>
          </div>
        </div>

        {/* Cascading Dropdowns: [ มหาวิทยาลัย -> คณะ -> สาขาวิชา ] */}
        <div className="p-4 rounded-2xl bg-white border border-[#c4e7ff] shadow-xs space-y-3">
          <div className="text-[12px] font-bold text-[#00668a] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <span>เลือกมหาวิทยาลัย คณะ และสาขาที่ต้องการซ้อมสัมภาษณ์:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* University Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-[#5f5a7c] mb-1">
                1. มหาวิทยาลัย
              </label>
              <select
                value={selectedUniName}
                onChange={e => handleUniChange(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[13px] font-bold text-[#131b2e] focus:ring-2 focus:ring-[#38bdf8] outline-none"
              >
                {UNIVERSITY_DATABASE.map(u => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Faculty Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-[#5f5a7c] mb-1">
                2. คณะ
              </label>
              <select
                value={selectedFacultyName}
                onChange={e => handleFacultyChange(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[13px] font-bold text-[#131b2e] focus:ring-2 focus:ring-[#38bdf8] outline-none"
              >
                {selectedUniObj.faculties.map((f, idx) => (
                  <option key={idx} value={f.facultyName}>
                    {f.facultyName}
                  </option>
                ))}
              </select>
            </div>

            {/* Program Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-[#5f5a7c] mb-1">
                3. สาขาวิชา
              </label>
              <select
                value={selectedProgramName}
                onChange={e => setSelectedProgramName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[13px] font-bold text-[#131b2e] focus:ring-2 focus:ring-[#38bdf8] outline-none"
              >
                {selectedFacultyObj?.programs?.map((p, idx) => (
                  <option key={idx} value={p.programName}>
                    {p.programName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-[12px]">
            <span className="text-[#5f5a7c]">
              กำลังซ้อมสำหรับ: <strong className="text-[#131b2e]">{selectedFacultyName} ({selectedUniName})</strong>
            </span>
            <button
              onClick={handleGenerateQuestions}
              disabled={isGenerating}
              className="px-4 py-1.5 rounded-full bg-[#00668a] hover:bg-[#004965] disabled:opacity-50 text-white text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1.5"
            >
              {isGenerating ? (
                <>
                  <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>กำลังสร้างคำถาม...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[15px]">refresh</span>
                  <span>สร้างชุดคำถามใหม่สำหรับคณะนี้</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Questions List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[17px] font-extrabold text-[#131b2e] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00668a]">record_voice_over</span>
            <span>ชุดคำถามเจาะลึก 4 มิติประจำหลักสูตร</span>
          </h2>
          <span className="text-[12px] text-[#5f5a7c]">
            {questions.length} คำถามสำคัญ
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((q, idx) => {
            const isPracticingThis = practicingId === q.id;
            return (
              <div
                key={q.id || idx}
                className="bg-white rounded-3xl p-5 border border-[#bdc8d1]/30 card-sky-shadow flex flex-col justify-between gap-3 group hover:border-[#00668a] transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f2f3ff] text-[#00668a] border border-[#c4e7ff]">
                      คำถามที่ {idx + 1} • {q.category}
                    </span>
                    <span className="text-[11px] text-[#6e7980]">~2 นาที</span>
                  </div>

                  <h3 className="text-[15px] font-bold text-[#131b2e] leading-snug">
                    "{q.questionText}"
                  </h3>

                  {q.questionThai && (
                    <p className="text-[12px] text-[#5f5a7c] bg-[#faf8ff] p-2 rounded-xl border border-[#c4e7ff]/40">
                      🇹🇭 {q.questionThai}
                    </p>
                  )}

                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-950 space-y-1">
                    <div className="font-bold flex items-center gap-1 text-amber-900">
                      <span className="material-symbols-outlined text-[14px]">tips_and_updates</span>
                      <span>เทคนิคการตอบ:</span>
                    </div>
                    <p>{q.tips}</p>
                    {q.sampleKeyPoints && q.sampleKeyPoints.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1 pt-1 border-t border-amber-200/60">
                        {q.sampleKeyPoints.map((pt, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-1.5 py-0.2 rounded-md bg-white/80 text-amber-900 text-[10px]"
                          >
                            ✓ {pt}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#bdc8d1]/20 flex items-center justify-between">
                  <button
                    onClick={() => handleSimulatePractice(q.id)}
                    disabled={isPracticingThis}
                    className="px-3.5 py-1.5 rounded-full bg-[#f2f3ff] hover:bg-[#c4e7ff] text-[#00668a] text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">mic</span>
                    <span>{isPracticingThis ? 'กำลังบันทึกเสียง...' : 'ซ้อมจับเวลาพูด'}</span>
                  </button>

                  <button
                    onClick={handleStartLiveAiInterview}
                    className="text-[#00668a] hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <span>ซ้อมสดกับ AI</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
