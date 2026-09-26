import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { quizQuestions } from '../data/initialData';
import { COMPANION_AVATAR } from '../data/initialData';

export const SpeedQuizModal: React.FC = () => {
  const { isQuizOpen, setQuizOpen, updateUserProfile, currentUser } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showHint, setShowHint] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);

  // Timer per question
  useEffect(() => {
    if (!isQuizOpen || isFinished) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isQuizOpen, isFinished, currentIndex]);

  if (!isQuizOpen) return null;

  const currentQ = quizQuestions[currentIndex];

  const handleSelectOption = (key: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: key }));
  };

  const handleUse5050 = () => {
    const wrongOptions = currentQ.options
      .filter(opt => opt.key !== currentQ.correctAnswer)
      .map(opt => opt.key);
    // Eliminate 2 wrong options
    const toEliminate = wrongOptions.slice(0, 2);
    setEliminatedOptions(toEliminate);
  };

  const handleNext = () => {
    setEliminatedOptions([]);
    setShowHint(false);
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimerSeconds(60);
    } else {
      setIsFinished(true);
      // Award EXP
      updateUserProfile({
        exp: currentUser.exp + 40,
        level: currentUser.level + (currentUser.exp + 40 > 4000 ? 1 : 0)
      });
    }
  };

  // Calculate score
  const score = Object.entries(selectedAnswers).reduce((acc, [qId, ans]) => {
    const q = quizQuestions.find(item => item.id === Number(qId));
    return q && q.correctAnswer === ans ? acc + 1 : acc;
  }, 0);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setEliminatedOptions([]);
    setShowHint(false);
    setIsFinished(false);
    setTimerSeconds(60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 card-sky-shadow border border-[#bdc8d1]/40 max-h-[92vh] overflow-y-auto relative">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#bdc8d1]/30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuizOpen(false)}
              className="p-1 rounded-full hover:bg-[#f2f3ff] text-[#5f5a7c] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-[#131b2e]">
                  {isFinished ? 'ผลคะแนน Speed Quiz' : 'แบบทดสอบด่วน 5 ข้อ'}
                </span>
                <span className="px-2 py-0.2 rounded-full bg-[#38bdf8]/20 text-[#00668a] text-[10px] font-extrabold uppercase">
                  SPEED
                </span>
              </div>
              <p className="text-[11px] text-[#5f5a7c]">⚡ TCAS70 • KKUIC Focus Mission</p>
            </div>
          </div>
          <button
            onClick={() => setQuizOpen(false)}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#5f5a7c] flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {!isFinished ? (
          /* ACTIVE QUIZ SCREEN */
          <div className="space-y-4 pt-3">
            {/* Step & Time Bar */}
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#00668a] bg-[#c4e7ff]/40 px-2.5 py-1 rounded-full">
                TGAT 1 Eng Comm ข้อ {currentIndex + 1} / {quizQuestions.length}
              </span>
              <span className="flex items-center gap-1 text-[12px] font-bold text-[#5f5a7c] bg-[#f2f3ff] px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[15px] text-[#38bdf8]">schedule</span>
                00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds} นาที
              </span>
            </div>

            {/* Progress Track */}
            <div className="w-full bg-[#f2f3ff] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#38bdf8] h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>

            {/* AI Companion Hint Bubble */}
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#c4e7ff]/30 border border-[#38bdf8]/30">
              <img src={COMPANION_AVATAR} alt="" className="w-9 h-9 rounded-full object-cover shrink-0 ring-2 ring-[#38bdf8]" />
              <div className="text-[12px] text-[#131b2e] leading-snug">
                <strong className="text-[#00668a] block font-bold">น้องสกายบลู (AI Companion)</strong>
                "{currentQ.hint}"
              </div>
            </div>

            {/* Question Card */}
            <div className="p-4 rounded-2xl bg-[#f2f3ff]/60 border border-[#bdc8d1]/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#00668a] bg-white px-2.5 py-0.5 rounded-md border border-[#c4e7ff]">
                  {currentQ.category} • {currentQ.difficulty}
                </span>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-[11px] text-[#5f5a7c] hover:text-[#00668a] flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">translate</span>
                  <span>{showHint ? 'ซ่อนคำแปล' : 'คำแปลโจทย์'}</span>
                </button>
              </div>

              <p className="text-[14px] font-semibold text-[#131b2e] leading-relaxed">
                {currentQ.questionText}
              </p>

              {showHint && (
                <p className="text-[12px] text-[#5f5a7c] p-2 rounded-xl bg-white/80 border border-[#bdc8d1]/30 italic">
                  💡 {currentQ.thaiTranslation}
                </p>
              )}
            </div>

            {/* Options */}
            <div className="space-y-2">
              {currentQ.options.map(opt => {
                const isSelected = selectedAnswers[currentQ.id] === opt.key;
                const isEliminated = eliminatedOptions.includes(opt.key);
                if (isEliminated) {
                  return (
                    <div
                      key={opt.key}
                      className="p-3 rounded-2xl border border-dashed border-[#bdc8d1]/40 bg-[#f2f3ff]/30 opacity-40 text-[12px] line-through text-[#6e7980]"
                    >
                      {opt.key}. {opt.text} ({opt.subText})
                    </div>
                  );
                }
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectOption(opt.key)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-2 border-[#38bdf8] bg-[#c4e7ff]/30 shadow-xs'
                        : 'border-[#bdc8d1]/40 bg-white hover:border-[#38bdf8]/60 hover:bg-[#f2f3ff]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold ${
                          isSelected ? 'bg-[#38bdf8] text-white' : 'bg-[#eaedff] text-[#00668a]'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <div>
                        <div className="text-[13px] font-bold text-[#131b2e]">{opt.text}</div>
                        <div className="text-[11px] text-[#5f5a7c]">{opt.subText}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[18px] text-[#00668a]">
                        check_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Lifeline Buttons */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleUse5050}
                disabled={eliminatedOptions.length > 0}
                className="px-3 py-1.5 rounded-full bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#00668a] text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[15px]">call_split</span>
                <span>ตัดชอยส์ 50:50 (เหลือ 2)</span>
              </button>

              <button
                type="button"
                className="px-3 py-1.5 rounded-full bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#5f5a7c] text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">flag</span>
                <span>ติดธงทบทวน</span>
              </button>
            </div>

            {/* Next / Submit Button */}
            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedAnswers[currentQ.id]}
              className="w-full py-3 bg-[#38bdf8] hover:bg-[#0284c7] disabled:bg-[#bdc8d1] text-[#001e2c] hover:text-white font-bold text-[14px] rounded-full shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span>{currentIndex === quizQuestions.length - 1 ? 'ตรวจผลคะแนนรวม' : 'ตรวจคำตอบ / ข้อถัดไป'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        ) : (
          /* RESULT SCREEN (Matching Image 18) */
          <div className="space-y-4 pt-3 text-center">
            {/* Circular Score Badge */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#eaedff" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="94.2"
                  strokeDashoffset={94.2 - (94.2 * (score / quizQuestions.length))}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-[26px] font-extrabold text-[#131b2e] leading-none">
                  {score}/{quizQuestions.length}
                </span>
                <span className="text-[10px] text-[#00668a] font-bold mt-0.5">
                  {Math.round((score / quizQuestions.length) * 100)}% แม่นยำ
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[12px] border border-emerald-200">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>{score >= 4 ? 'ยอดเยี่ยมมาก! (Great Job)' : 'ทำได้ดีแล้ว! ค่อยๆ พัฒนานะ'}</span>
            </div>

            <p className="text-[13px] text-[#5f5a7c]">
              ทำคะแนนผ่านเกณฑ์จำลองสนามสอบ TGAT 1 ของ KKUIC ได้อย่างสบายใจ!
            </p>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#bdc8d1]/30 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-[#00668a]">timer</span>
                <div>
                  <div className="text-[12px] font-bold text-[#131b2e]">28 วิ/ข้อ (เร็ว)</div>
                  <div className="text-[10px] text-[#5f5a7c]">ใช้เวลาเฉลี่ย</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#bdc8d1]/30 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-amber-500">local_fire_department</span>
                <div>
                  <div className="text-[12px] font-bold text-[#131b2e]">วันที่ 7 สำเร็จ 🔥</div>
                  <div className="text-[10px] text-[#5f5a7c]">สถิติการเรียน</div>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#c4e7ff]/40 text-[#004965] text-[12px] font-bold flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">stars</span>
              <span>ได้รับ +40 EXP โบนัสความเร็ว!</span>
            </div>

            {/* AI Companion Review */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#38bdf8]/40 text-left flex items-start gap-3 shadow-xs">
              <img src={COMPANION_AVATAR} alt="" className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-[#38bdf8]" />
              <div className="text-[12px] text-[#131b2e] leading-snug">
                <strong className="text-[#00668a] block font-bold">น้องสกายบลู (AI Companion)</strong>
                “เก่งมากเลยมิว! 🩵 ทำได้ {score} เต็ม 5 ข้อเลยนะ! สังเกต Context Clue เก่งขึ้นเยอะมาก เดี๋ยวเราไปดูคำอธิบายรายข้อเพื่อความแม่นยำ 100% กันนะ สู้ไปด้วยกันค่ะ 🩵✨”
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={resetQuiz}
                className="w-full py-2.5 bg-[#38bdf8] hover:bg-[#0284c7] text-[#001e2c] hover:text-white font-bold text-[13px] rounded-full shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>เริ่มควิซชุดถัดไป (Next Quiz)</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              <button
                type="button"
                onClick={() => setQuizOpen(false)}
                className="w-full py-2.5 bg-[#eaedff] hover:bg-[#dae2fd] text-[#00668a] font-bold text-[13px] rounded-full transition-colors cursor-pointer"
              >
                กลับสู่หน้าหลัก Vocab Hub
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
