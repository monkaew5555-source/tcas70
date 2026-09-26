import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANION_AVATAR } from '../data/initialData';
import { examDatabase67, ExamQuestion67 } from '../data/examDatabase67';
import { ExamScoreRecord } from '../types';
import { triggerConfetti } from '../utils/particleEffect';

export const MockExamView: React.FC = () => {
  const {
    currentPrimaryTarget,
    examScores,
    addOrUpdateExamScore,
    deleteExamScore,
    setAuthToast,
    setAiChatOpen,
    completeQuest,
  } = useApp();

  // Test Drill Modes & Filter
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [passThreshold, setPassThreshold] = useState<number>(60); // Default 60% passing mark

  // Active Quiz State
  const [activeDrillQuestions, setActiveDrillQuestions] = useState<ExamQuestion67[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isDrillSubmitted, setIsDrillSubmitted] = useState<boolean>(false);
  const [drillScore, setDrillScore] = useState<number | null>(null);

  // Manual Score Record Modal
  const [isAddScoreModalOpen, setIsAddScoreModalOpen] = useState(false);
  const [manualSubject, setManualSubject] = useState(
    currentPrimaryTarget.requiredExams?.[0] || 'TGAT 1 การสื่อสารภาษาอังกฤษ'
  );
  const [manualScore, setManualScore] = useState<number>(65);
  const [manualMaxScore, setManualMaxScore] = useState<number>(100);
  const [manualTargetScore, setManualTargetScore] = useState<number>(75);
  const [manualNotes, setManualNotes] = useState('');

  // Filtered Questions from Database (62 questions)
  const filteredQuestions = useMemo(() => {
    return examDatabase67.filter(q => {
      const matchSubject = selectedSubjectFilter === 'all' || q.subjectCode === selectedSubjectFilter || q.subjectName.includes(selectedSubjectFilter);
      const matchDiff = selectedDifficultyFilter === 'all' || q.difficulty === selectedDifficultyFilter;
      return matchSubject && matchDiff;
    });
  }, [selectedSubjectFilter, selectedDifficultyFilter]);

  // Start Drill with current filters
  const handleStartDrill = () => {
    const list = [...filteredQuestions];
    // Shuffle or slice 5 questions for a focused drill
    const sliced = list.length <= 5 ? list : list.sort(() => 0.5 - Math.random()).slice(0, 5);
    setActiveDrillQuestions(sliced);
    setUserAnswers({});
    setIsDrillSubmitted(false);
    setDrillScore(null);
    setAuthToast(`เริ่มทำแบบทดสอบจำลอง ${sliced.length} ข้อ (เกณฑ์ผ่าน ${passThreshold}%) ✦`);
  };

  // Submit Active Drill
  const handleSubmitDrill = () => {
    if (activeDrillQuestions.length === 0) return;

    let correctCount = 0;
    activeDrillQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / activeDrillQuestions.length) * 100);
    setDrillScore(percent);
    setIsDrillSubmitted(true);

    const isPassed = percent >= passThreshold;

    if (isPassed) {
      triggerConfetti();
      completeQuest('q-6');
      setAuthToast(`🎉 ผ่านเกณฑ์! คุณทำได้ ${percent}% (ผ่านเกณฑ์ขั้นต่ำ ${passThreshold}%) ✨`);
    } else {
      setAuthToast(`ได้ ${percent}% ไม่เป็นไรนะน้อง ลองดูเฉลยแล้วฝึกซ้ำ หรือปรับความยากได้ตามใจชอบ 🩵`);
    }

    // Auto-record to user's real scores
    const subjectTitle = activeDrillQuestions[0]?.subjectName || 'แบบทดสอบ TCAS67';
    const newRecord: ExamScoreRecord = {
      id: `drill-${Date.now()}`,
      subjectCode: activeDrillQuestions[0]?.subjectCode || 'MOCK',
      subjectName: `${subjectTitle} (ข้อสอบชุด ปี 67)`,
      score: percent,
      maxScore: 100,
      targetScore: passThreshold,
      examDate: new Date().toISOString().split('T')[0],
      notes: `ทำถูก ${correctCount}/${activeDrillQuestions.length} ข้อ (${isPassed ? 'ผ่านเกณฑ์ ✓' : 'ฝึกฝนเพิ่มเติม'})`,
    };
    addOrUpdateExamScore(newRecord);
  };

  // Save Manual Score
  const handleSaveManualScore = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: ExamScoreRecord = {
      id: `score-${Date.now()}`,
      subjectCode: manualSubject.split(' ')[0],
      subjectName: manualSubject,
      score: Number(manualScore) || 0,
      maxScore: Number(manualMaxScore) || 100,
      targetScore: Number(manualTargetScore) || 75,
      examDate: new Date().toISOString().split('T')[0],
      notes: manualNotes,
    };
    addOrUpdateExamScore(newRecord);
    setIsAddScoreModalOpen(false);
    setManualNotes('');
  };

  const subjectOptions = [
    { code: 'all', label: 'ทุกวิชา (คลังข้อสอบทั้งหมด)' },
    { code: 'TPAT1', label: 'TPAT 1 ความถนัดทางแพทยศาสตร์' },
    { code: 'TPAT2', label: 'TPAT 2 ความถนัดทางศิลปกรรมศาสตร์' },
    { code: 'TPAT3', label: 'TPAT 3 วิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์' },
    { code: 'TGAT1', label: 'TGAT 1 การสื่อสารภาษาอังกฤษ' },
    { code: 'TGAT2', label: 'TGAT 2 การคิดอย่างมีเหตุผล' },
    { code: 'TGAT3', label: 'TGAT 3 สมรรถนะการทำงาน' },
    { code: 'MATH1', label: 'A-Level คณิตศาสตร์ประยุกต์ 1' },
    { code: 'PHYS', label: 'A-Level ฟิสิกส์' },
    { code: 'CHEM', label: 'A-Level เคมี' },
    { code: 'BIO', label: 'A-Level ชีววิทยา' },
    { code: 'THAI', label: 'A-Level ภาษาไทย' },
    { code: 'SOC', label: 'A-Level สังคมศึกษา' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <section className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-sky-50 via-white to-indigo-50 border border-[#c4e7ff] card-sky-shadow">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#00668a] text-white">
                คลังข้อสอบจริง 62 ข้อ (ข้อสอบชุด ปี 67)
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-[#5f5a7c] border border-[#c4e7ff]">
                เป้าหมาย: {currentPrimaryTarget.name}
              </span>
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#131b2e] tracking-tight">
              คลังข้อสอบและจำลองสอบ (ข้อสอบชุด ปี 67)
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#5f5a7c] mt-0.5">
              ฝึกทำข้อสอบเก่าปี 67 ครอบคลุม TPAT 1-3, TGAT 1-3, และ A-Level ปรับระดับความยากง่ายได้อิสระ ไม่มีการล็อกระดับ
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAddScoreModalOpen(true)}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#f2f3ff] text-[#00668a] border border-[#c4e7ff] text-[12px] font-bold shadow-xs cursor-pointer transition-all"
            >
              + บันทึกคะแนนจริงของคุณ
            </button>
            <button
              onClick={handleStartDrill}
              className="px-5 py-2 rounded-full bg-[#00668a] hover:bg-[#004965] text-white text-[12px] font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span>เริ่มทำข้อสอบจำลอง</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Drill Configuration & Free Difficulty Selector */}
      <section className="bg-white rounded-3xl p-5 border border-[#c4e7ff] card-sky-shadow space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#bdc8d1]/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#38bdf8]/20 text-[#00668a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-[#131b2e]">ปรับแต่งการฝึกสอบ (เลือกวิชาและความยากได้ตลอดเวลา)</h2>
              <p className="text-[11px] text-[#5f5a7c]">คุณสามารถเลือกระดับความยากที่ท้าทาย หรือลดลงมาได้ตามใจชอบ ไม่มีการล็อกระดับ</p>
            </div>
          </div>

          {/* Pass Threshold Selector */}
          <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-1.5 rounded-2xl border border-[#c4e7ff] text-[12px]">
            <span className="font-bold text-[#5f5a7c]">เกณฑ์คะแนนผ่าน:</span>
            <select
              value={passThreshold}
              onChange={e => setPassThreshold(Number(e.target.value))}
              className="bg-white px-2 py-0.5 rounded-lg border border-[#c4e7ff] font-extrabold text-[#00668a] outline-none"
            >
              <option value={40}>40%</option>
              <option value={50}>50%</option>
              <option value={60}>60% (มาตรฐานแนะนำ)</option>
              <option value={70}>70% (ระดับปลอดภัย)</option>
              <option value={80}>80% (เกียรตินิยม)</option>
            </select>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-bold text-[#131b2e] mb-1.5">
              เลือกวิชาที่ต้องการฝึกซ้อม
            </label>
            <select
              value={selectedSubjectFilter}
              onChange={e => setSelectedSubjectFilter(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[13px] font-bold text-[#131b2e] outline-none"
            >
              {subjectOptions.map(opt => (
                <option key={opt.code} value={opt.code}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#131b2e] mb-1.5">
              เลือกระดับความยาก (ปรับเปลี่ยนได้ตลอดเวลา)
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-[11px] font-bold">
              {[
                { key: 'all', label: 'ทั้งหมด' },
                { key: 'easy', label: '🟢 ง่าย' },
                { key: 'medium', label: '🔵 ปานกลาง' },
                { key: 'hard', label: '🟣 ท้าทายมาก' },
              ].map(d => (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setSelectedDifficultyFilter(d.key as any)}
                  className={`py-2 rounded-xl transition-all cursor-pointer text-center border ${
                    selectedDifficultyFilter === d.key
                      ? 'bg-[#00668a] text-white border-[#00668a] shadow-xs'
                      : 'bg-[#faf8ff] text-[#5f5a7c] border-[#bdc8d1]/40 hover:bg-[#f2f3ff]'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-[12px] text-[#5f5a7c]">
          <span>พบข้อสอบในหมวดนี้ทั้งหมด: <strong className="text-[#131b2e]">{filteredQuestions.length} ข้อ</strong></span>
          <button
            onClick={handleStartDrill}
            className="px-4 py-1.5 rounded-full bg-[#00668a] text-white font-bold hover:bg-[#004965] cursor-pointer"
          >
            เริ่มฝึกทำ 5 ข้อนี้ →
          </button>
        </div>
      </section>

      {/* 3. Interactive Active Quiz Area */}
      {activeDrillQuestions.length > 0 && (
        <section className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#38bdf8] shadow-lg space-y-5 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#bdc8d1]/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00668a] text-[24px]">assignment</span>
              <h2 className="text-[17px] font-extrabold text-[#131b2e]">
                ชุดแบบทดสอบจำลอง (ข้อสอบชุด ปี 67)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#5f5a7c]">
                ทำแล้ว {Object.keys(userAnswers).length} / {activeDrillQuestions.length} ข้อ
              </span>
            </div>
          </div>

          {/* Result Banner if submitted */}
          {isDrillSubmitted && drillScore !== null && (
            <div className={`p-5 rounded-2xl border text-center space-y-2 ${
              drillScore >= passThreshold
                ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-emerald-300'
                : 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-amber-300'
            }`}>
              <div className="flex items-center justify-center gap-3">
                <img
                  src={COMPANION_AVATAR}
                  alt="พี่สกายบลู"
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                />
                <div className="text-left">
                  <div className="text-[16px] font-extrabold text-[#131b2e]">
                    {drillScore >= passThreshold
                      ? `🎉 ยินดีด้วยนะน้อง! คุณสอบผ่านเกณฑ์ ${passThreshold}% สำเร็จ!`
                      : `สู้ต่อนะน้อง! ได้คะแนน ${drillScore}% (เกณฑ์ผ่าน ${passThreshold}%)`}
                  </div>
                  <p className="text-[12px] text-[#5f5a7c]">
                    {drillScore >= passThreshold
                      ? 'เก่งมากๆ! น้องสามารถกดทำซ้ำจนกว่าจะได้ 100% หรือปรับความยากไประดับท้าทายได้เลยนะ 🩵'
                      : 'ลองอ่านเฉลยละเอียดด้านล่าง แล้วฝึกซ้ำอีกรอบ หรือปรับระดับความยากให้พอเหมาะได้เสมอนะ ✨'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleStartDrill}
                  className="px-4 py-1.5 rounded-full bg-[#00668a] text-white text-[12px] font-bold hover:bg-[#004965] cursor-pointer shadow-xs"
                >
                  ฝึกทำชุดใหม่อีกรอบ
                </button>
                <button
                  onClick={() => setSelectedDifficultyFilter(drillScore >= passThreshold ? 'hard' : 'easy')}
                  className="px-4 py-1.5 rounded-full bg-white text-[#00668a] border border-[#c4e7ff] text-[12px] font-bold hover:bg-[#f2f3ff] cursor-pointer"
                >
                  {drillScore >= passThreshold ? 'ลองระดับท้าทายขึ้น 🚀' : 'ลองระดับที่ง่ายลง 💡'}
                </button>
              </div>
            </div>
          )}

          {/* Questions Stream */}
          <div className="space-y-5">
            {activeDrillQuestions.map((q, idx) => {
              const selectedAns = userAnswers[q.id];
              const isCorrect = selectedAns === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#faf8ff] border border-[#c4e7ff]/70 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#00668a] text-white">
                      ข้อที่ {idx + 1} • {q.subjectName} {q.yearLabel}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      q.difficulty === 'easy' ? 'bg-emerald-100 text-emerald-800' :
                      q.difficulty === 'medium' ? 'bg-sky-100 text-sky-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {q.difficultyLabel}
                    </span>
                  </div>

                  {q.contextText && (
                    <div className="p-3 rounded-xl bg-white border border-[#c4e7ff]/50 text-[12px] text-[#3e484f] leading-relaxed italic">
                      "{q.contextText}"
                    </div>
                  )}

                  <p className="text-[14px] font-bold text-[#131b2e] leading-snug">
                    {q.questionText}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map(opt => {
                      const isThisSelected = selectedAns === opt.key;
                      let btnStyle = 'bg-white border-[#bdc8d1]/40 text-[#131b2e] hover:bg-[#f2f3ff]';

                      if (isDrillSubmitted) {
                        if (opt.key === q.correctAnswer) {
                          btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                        } else if (isThisSelected && !isCorrect) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                        }
                      } else if (isThisSelected) {
                        btnStyle = 'bg-[#00668a] text-white border-[#00668a] shadow-xs';
                      }

                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => {
                            if (!isDrillSubmitted) {
                              setUserAnswers(prev => ({ ...prev, [q.id]: opt.key }));
                            }
                          }}
                          className={`p-3 rounded-xl border text-left text-[12px] transition-all flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 mt-0.5 ${
                            isThisSelected && !isDrillSubmitted ? 'bg-white text-[#00668a]' : 'bg-[#e5deff] text-[#1b1735]'
                          }`}>
                            {opt.key}
                          </span>
                          <div className="min-w-0">
                            <div>{opt.text}</div>
                            {opt.subText && <div className="text-[10px] opacity-80 mt-0.5">{opt.subText}</div>}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation if submitted */}
                  {isDrillSubmitted && (
                    <div className="p-3.5 rounded-xl bg-white border border-[#c4e7ff] text-[12px] space-y-1 mt-2">
                      <div className="font-bold flex items-center gap-1.5 text-[#00668a]">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        <span>เฉลยข้อ {q.correctAnswer}</span>
                      </div>
                      <p className="text-[#3e484f]">{q.explanation}</p>
                      <div className="text-[11px] text-[#5f5a7c] pt-1">
                        💡 <strong>คำใบ้ช่วยจำ:</strong> {q.hint}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          {!isDrillSubmitted && (
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#bdc8d1]/30">
              <span className="text-[12px] text-[#5f5a7c]">
                เกณฑ์ผ่านที่คุณตั้งไว้: <strong>{passThreshold}%</strong>
              </span>
              <button
                type="button"
                onClick={handleSubmitDrill}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-6 py-2.5 rounded-full bg-[#00668a] hover:bg-[#004965] disabled:opacity-40 text-white font-extrabold text-[13px] shadow-md cursor-pointer transition-all"
              >
                ส่งคำตอบและตรวจคะแนน
              </button>
            </div>
          )}
        </section>
      )}

      {/* 4. Score Log & Recorded Results */}
      <section className="bg-white rounded-3xl p-5 border border-[#bdc8d1]/30 card-sky-shadow space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#bdc8d1]/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00668a]">history_edu</span>
            <h2 className="text-[16px] font-bold text-[#131b2e]">
              ประวัติคะแนนสอบที่คุณบันทึก ({examScores.length} รายการ)
            </h2>
          </div>
          <button
            onClick={() => setIsAddScoreModalOpen(true)}
            className="text-[12px] text-[#00668a] hover:underline font-bold cursor-pointer"
          >
            + บันทึกคะแนนใหม่
          </button>
        </div>

        {examScores.length === 0 ? (
          <div className="py-8 text-center text-[#5f5a7c] space-y-2">
            <span className="material-symbols-outlined text-[32px] text-[#bdc8d1]">quiz</span>
            <p className="text-[13px]">ยังไม่มีประวัติคะแนนสอบที่คุณบันทึก</p>
            <p className="text-[11px] text-[#6e7980]">
              กดเริ่มทำข้อสอบจำลองด้านบน หรือกดปุ่ม "+ บันทึกคะแนนจริงของคุณ" เพื่อเริ่มต้น
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {examScores.map(score => (
              <div
                key={score.id}
                className="p-4 rounded-2xl bg-[#faf8ff] border border-[#c4e7ff]/60 flex items-start justify-between gap-3 group hover:border-[#00668a] transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.2 rounded-md bg-[#00668a] text-white text-[10px] font-bold">
                      {score.subjectCode}
                    </span>
                    <span className="text-[11px] text-[#6e7980]">{score.examDate}</span>
                  </div>
                  <div className="text-[13px] font-bold text-[#131b2e] leading-snug">
                    {score.subjectName}
                  </div>
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="text-[22px] font-extrabold text-[#00668a]">
                      {score.score}
                    </span>
                    <span className="text-[12px] text-[#5f5a7c]">
                      / {score.maxScore} (เป้าหมาย: {score.targetScore})
                    </span>
                  </div>
                  {score.notes && (
                    <p className="text-[11px] text-[#5f5a7c] line-clamp-1">{score.notes}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => deleteExamScore(score.id)}
                  className="text-rose-500 hover:text-rose-700 p-1 opacity-60 hover:opacity-100 cursor-pointer"
                  title="ลบรายการคะแนนนี้"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Manual Score Modal */}
      {isAddScoreModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#c4e7ff] space-y-4">
            <div className="flex items-center justify-between border-b border-[#bdc8d1]/30 pb-3">
              <h3 className="text-[17px] font-bold text-[#131b2e]">บันทึกคะแนนสอบจริงของคุณ</h3>
              <button
                onClick={() => setIsAddScoreModalOpen(false)}
                className="text-[#6e7980] hover:text-[#131b2e] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveManualScore} className="space-y-3.5 text-[13px]">
              <div>
                <label className="block font-bold text-[#131b2e] mb-1">วิชาที่สอบ</label>
                <select
                  value={manualSubject}
                  onChange={e => setManualSubject(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] outline-none font-bold"
                >
                  {subjectOptions.filter(o => o.code !== 'all').map(o => (
                    <option key={o.code} value={o.label}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">คะแนนที่ได้</label>
                  <input
                    type="number"
                    required
                    min={0}
                    max={100}
                    value={manualScore}
                    onChange={e => setManualScore(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] outline-none text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">คะแนนเต็ม</label>
                  <input
                    type="number"
                    required
                    value={manualMaxScore}
                    onChange={e => setManualMaxScore(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] outline-none text-center font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">เป้าหมาย</label>
                  <input
                    type="number"
                    required
                    value={manualTargetScore}
                    onChange={e => setManualTargetScore(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] outline-none text-center font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#131b2e] mb-1">บันทึกเพิ่มเติม (ไม่บังคับ)</label>
                <input
                  type="text"
                  placeholder="เช่น ซ้อมทำจับเวลาครั้งที่ 1 หรือ คะแนนสอบจริงสนามทดสอบ..."
                  value={manualNotes}
                  onChange={e => setManualNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#bdc8d1]/20">
                <button
                  type="button"
                  onClick={() => setIsAddScoreModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#bdc8d1]/50 text-[#5f5a7c] font-bold hover:bg-[#f2f3ff] cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#00668a] hover:bg-[#004965] text-white font-bold cursor-pointer shadow-md"
                >
                  บันทึกคะแนน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
