import React, { useRef, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Achievements } from '../components/Achievements';
import { COMPANION_AVATAR } from '../data/initialData';
import { QuestItem } from '../types';

export const DashboardView: React.FC = () => {
  const {
    currentUser,
    setActiveTab,
    filteredTasks,
    toggleTaskStatus,
    currentPrimaryTarget,
    achievements,
    quests,
    questDifficulty,
    setQuestDifficulty,
    completeQuest,
    projects,
    examScores,
    financialCalculations,
    setAiChatOpen,
    clearToCleanState,
    energyMode,
    setEnergyMode,
  } = useApp();

  const achievementsRef = useRef<HTMLDivElement>(null);

  const displayedQuests = useMemo<QuestItem[]>(() => {
    if (questDifficulty === 'easy') {
      return quests.slice(0, 4).map((q: QuestItem) => ({
        ...q,
        expReward: Math.round(q.expReward * 0.9),
      }));
    }
    if (questDifficulty === 'hard') {
      return quests.map((q: QuestItem) => ({
        ...q,
        expReward: Math.round(q.expReward * 1.5),
      }));
    }
    return quests;
  }, [quests, questDifficulty]);

  const top3Tasks = filteredTasks.slice(0, 3);
  const completedCount = top3Tasks.filter(t => t.status === 'completed').length;
  const unlockedBadgesCount = achievements.filter(b => b.isUnlocked).length;
  const unclaimedBadgesCount = achievements.filter(b => b.isUnlocked && !b.claimed).length;

  // Real calculations
  const readyProjectsCount = projects.filter(p => p.status === 'พร้อมใส่ Portfolio').length;
  const portfolioPages = Math.min(10, readyProjectsCount * 2);
  const portfolioPercent = Math.min(100, Math.round((portfolioPages / 10) * 100));

  const averageExamScore = examScores.length > 0
    ? Math.round(examScores.reduce((sum, s) => sum + (s.score / s.maxScore) * 100, 0) / examScores.length)
    : null;

  // Overall readiness based on real user actions
  const completedQuestsCount = quests.filter(q => q.isCompleted).length;
  const questPercent = Math.round((completedQuestsCount / quests.length) * 100);

  const scrollToAchievements = () => {
    if (achievementsRef.current) {
      achievementsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Main Goal Hero Card */}
      <section className="relative rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-white via-[#c4e7ff]/25 to-[#dcd5fd]/20 border border-[#c4e7ff]/80 card-sky-shadow inner-specular overflow-hidden">
        <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-[#38bdf8]/15 blur-2xl pointer-events-none" />
        <div className="absolute right-48 -bottom-16 w-48 h-48 rounded-full bg-[#e5deff]/40 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-2.5 max-w-2xl">
            {/* Badges & Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[14px]">stars</span>
                เป้าหมายอันดับ 1 • {currentPrimaryTarget.round}
              </span>
              <button
                onClick={scrollToAchievements}
                className="px-3 py-1 rounded-full text-[12px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span className="material-symbols-outlined text-[14px] text-amber-600">military_tech</span>
                <span>เหรียญตรา {unlockedBadgesCount}/{achievements.length}</span>
                {unclaimedBadgesCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-pulse">
                    +{unclaimedBadgesCount}
                  </span>
                )}
              </button>
              <button
                onClick={clearToCleanState}
                className="px-3 py-1 rounded-full text-[11px] font-bold bg-white text-[#5f5a7c] border border-[#bdc8d1]/60 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors cursor-pointer flex items-center gap-1"
                title="เคลียร์คำตอบและผลคะแนนตัวอย่างเพื่อเริ่มต้นกรอกของตนเอง"
              >
                <span className="material-symbols-outlined text-[13px]">refresh</span>
                <span>รีเซ็ตข้อมูลตัวอย่างให้สะอาด</span>
              </button>
            </div>

            {/* Target Headline */}
            <div>
              <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#131b2e] tracking-tight">
                {currentPrimaryTarget.name}
              </h1>
              <p className="text-[15px] sm:text-[16px] text-[#00668a] font-bold">
                {currentPrimaryTarget.faculty} • {currentPrimaryTarget.program}
              </p>
            </div>

            {/* Target Requirements Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[12px] text-[#5f5a7c]">
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-[#c4e7ff]">
                <span className="material-symbols-outlined text-[15px] text-[#00668a]">auto_stories</span>
                พอร์ตโฟลิโอ 10 หน้า
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-[#c4e7ff]">
                <span className="material-symbols-outlined text-[15px] text-[#006c4b]">grade</span>
                เกรดเฉลี่ยขั้นต่ำ {currentPrimaryTarget.gpaxRequired}+
              </span>
              <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-[#c4e7ff]">
                <span className="material-symbols-outlined text-[15px] text-purple-600">assignment</span>
                {currentPrimaryTarget.requiredExams?.[0] || 'TGAT / TPAT'}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
            <button
              onClick={() => setAiChatOpen(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#00668a] hover:bg-[#004965] text-white text-[13px] font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <img
                src={COMPANION_AVATAR}
                alt="สกายบลู"
                className="w-5 h-5 rounded-full object-cover border border-white"
              />
              <span>ถามน้องสกายบลู</span>
            </button>
            <button
              onClick={() => setActiveTab('university')}
              className="w-full sm:w-auto px-4 py-2 rounded-full bg-white hover:bg-[#f2f3ff] text-[#00668a] text-[12px] font-bold border border-[#c4e7ff] shadow-xs transition-colors cursor-pointer"
            >
              สลับหรือเลือกคณะอื่น ↗
            </button>
          </div>
        </div>
      </section>

      {/* 2. Quest Game System (เควสภารกิจสะสมแต้มเหมือนเล่นเกม มีพาติเคิล & หลอดคลื่นกระเพื่อม) */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#bdc8d1]/30 card-sky-shadow space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#bdc8d1]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <span className="material-symbols-outlined text-[20px]">sports_esports</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[16px] font-extrabold text-[#131b2e]">
                  ภารกิจเควสสะสมแต้ม (TCAS Quest Log)
                </h2>
                <span className="px-2 py-0.2 rounded-full bg-[#f2f3ff] text-[#00668a] text-[10px] font-bold border border-[#c4e7ff]">
                  Level {currentUser.level} ({currentUser.exp} EXP)
                </span>
              </div>
              <p className="text-[12px] text-[#5f5a7c]">
                ทำเควสเพื่อปลดล็อกแต้ม EXP สะสมเหรียญตรา และรับเอฟเฟกต์เฉลิมฉลอง
              </p>
            </div>
          </div>

          {/* Difficulty Adjustment (ปรับระดับความยาก-ง่ายในขอบเขตที่พอเหมาะ) */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#f2f3ff] p-1 rounded-2xl border border-[#c4e7ff]/70 text-[11px] font-bold">
            <span className="text-[#5f5a7c] px-2">ความยาก:</span>
            <button
              onClick={() => setQuestDifficulty('easy')}
              className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                questDifficulty === 'easy'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-[#5f5a7c] hover:text-[#131b2e]'
              }`}
            >
              🟢 ง่าย
            </button>
            <button
              onClick={() => setQuestDifficulty('normal')}
              className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                questDifficulty === 'normal'
                  ? 'bg-[#00668a] text-white shadow-xs'
                  : 'text-[#5f5a7c] hover:text-[#131b2e]'
              }`}
            >
              🔵 ปกติ
            </button>
            <button
              onClick={() => setQuestDifficulty('hard')}
              className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                questDifficulty === 'hard'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-[#5f5a7c] hover:text-[#131b2e]'
              }`}
            >
              🟣 ท้าทาย
            </button>
          </div>
        </div>

        {/* Fluid wave progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[12px] font-bold">
            <span className="text-[#5f5a7c]">ความคืบหน้าเควสทั้งหมด</span>
            <span className="text-[#00668a]">
              สำเร็จ {completedQuestsCount} / {quests.length} เควส ({questPercent}%)
            </span>
          </div>
          <div className="w-full bg-[#f2f3ff] rounded-full h-3.5 p-0.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] via-[#00668a] to-[#22c990] wave-progress transition-all duration-500"
              style={{ width: `${questPercent}%` }}
            />
          </div>
        </div>

        {/* Quests Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedQuests.map(quest => (
            <div
              key={quest.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                quest.isCompleted
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-[#faf8ff] border-[#c4e7ff]/80 hover:border-[#00668a] hover:bg-white shadow-xs'
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => completeQuest(quest.id)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                    quest.isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'border-2 border-[#38bdf8] hover:bg-[#c4e7ff]/40'
                  }`}
                  title={quest.isCompleted ? 'สำเร็จแล้ว' : 'กดเพื่อทำเครื่องหมายสำเร็จ'}
                >
                  {quest.isCompleted && <span className="material-symbols-outlined text-[16px]">check</span>}
                </button>
                <div className="min-w-0">
                  <div className={`text-[13px] font-bold ${quest.isCompleted ? 'line-through text-[#6e7980]' : 'text-[#131b2e]'}`}>
                    {quest.title}
                  </div>
                  <div className="text-[11px] text-[#5f5a7c] mt-0.5 line-clamp-2">
                    {quest.description}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold">
                    <span className="px-1.5 py-0.2 rounded bg-amber-50 text-amber-800 border border-amber-200">
                      +{quest.expReward} EXP
                    </span>
                    {quest.actionTab && (
                      <button
                        onClick={() => setActiveTab(quest.actionTab!)}
                        className="text-[#00668a] hover:underline cursor-pointer"
                      >
                        เปิดหน้านี้ →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Bento Grid: Analysis & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (8 Cols): Recommendations & Daily Top 3 */}
        <div className="lg:col-span-8 space-y-5">
          {/* Recommendation Engine */}
          <section className="rounded-3xl p-5 bg-white border border-[#bdc8d1]/30 card-sky-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#38bdf8]/20 text-[#00668a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#131b2e]">ระบบวิเคราะห์: ฉันควรทำอะไรต่อ?</h2>
                  <p className="text-[12px] text-[#5f5a7c]">คำนวณตามเดดไลน์และเกณฑ์รับเข้าของ {currentPrimaryTarget.name}</p>
                </div>
              </div>
              <button
                onClick={() => setAiChatOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f2f3ff] hover:bg-[#c4e7ff] text-[#00668a] text-[12px] font-bold transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                <span>ถามสกายบลู</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-[#f2f3ff]/70 hover:bg-[#f2f3ff] border border-[#c4e7ff]/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#00668a] text-white flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#131b2e]">
                      จัดเตรียมแฟ้มผลงาน Portfolio 10 หน้าให้ตรงกับ {currentPrimaryTarget.faculty}
                    </div>
                    <div className="text-[12px] text-[#5f5a7c] mt-0.5">
                      <span className="text-emerald-700 font-bold">สถานะจริง:</span> พร้อมแล้ว {portfolioPages}/10 หน้า
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="px-4 py-1.5 rounded-full bg-[#00668a] text-white text-[12px] font-bold hover:bg-[#004965] cursor-pointer shrink-0"
                >
                  จัดหน้าพอร์ต
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f2f3ff]/70 hover:bg-[#f2f3ff] border border-[#bdc8d1]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#5f5a7c] text-white flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#131b2e]">
                      บันทึกหรือซ้อมทำแบบทดสอบวิชา {currentPrimaryTarget.requiredExams?.[0] || 'TGAT / TPAT'}
                    </div>
                    <div className="text-[12px] text-[#5f5a7c] mt-0.5">
                      <span className="text-[#00668a] font-bold">สถานะจริง:</span> บันทึกแล้ว {examScores.length} วิชา
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('exams')}
                  className="px-4 py-1.5 rounded-full bg-[#f2f3ff] hover:bg-[#c4e7ff] text-[#00668a] text-[12px] font-bold cursor-pointer shrink-0"
                >
                  ซ้อมข้อสอบ
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f2f3ff]/70 hover:bg-[#f2f3ff] border border-[#bdc8d1]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#e5deff] text-[#1b1735] flex items-center justify-center font-bold text-[12px] shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-[#131b2e]">
                      คำนวณงบประมาณค่าใช้จ่ายและทุนการศึกษา 4 ปี
                    </div>
                    <div className="text-[12px] text-[#5f5a7c] mt-0.5">
                      ค่าเทอม {currentPrimaryTarget.name} ประมาณ ~{financialCalculations.totalTuition4Years.toLocaleString()} ฿
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('finance')}
                  className="px-4 py-1.5 rounded-full bg-[#f2f3ff] hover:bg-[#c4e7ff] text-[#00668a] text-[12px] font-bold cursor-pointer shrink-0"
                >
                  วางแผนการเงิน
                </button>
              </div>
            </div>
          </section>

          {/* Today's Top 3 Tasks */}
          <section className="rounded-3xl p-5 bg-white border border-[#bdc8d1]/30 card-sky-shadow space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#22c990]/25 text-[#006c4b] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#131b2e]">ภารกิจสำคัญวันนี้ (Today's Tasks)</h2>
                  <p className="text-[12px] text-[#5f5a7c]">
                    {energyMode === 'normal' && '🔋 วันปกติ: โฟกัส 3 งานสำคัญเพื่อให้งานเดินหน้าอย่างสมดุล'}
                    {energyMode === 'low' && '🍃 วันที่พลังงานน้อย: คัดเฉพาะงานสั้นๆ ไม่เกิน 20 นาที พักผ่อนได้นะ 🩵'}
                    {energyMode === 'catchup' && '⚡ วันเคลียร์งานค้าง: แสดงภารกิจที่ยังค้างอยู่เพื่อสะสาง'}
                  </p>
                </div>
              </div>

              {/* Energy Mode Toggle Buttons */}
              <div className="flex items-center gap-1 bg-[#f2f3ff] p-1 rounded-2xl border border-[#c4e7ff]/70 text-[11px] font-bold self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setEnergyMode('normal')}
                  className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                    energyMode === 'normal' ? 'bg-[#00668a] text-white shadow-xs' : 'text-[#5f5a7c] hover:text-[#131b2e]'
                  }`}
                >
                  🟢 วันปกติ
                </button>
                <button
                  type="button"
                  onClick={() => setEnergyMode('low')}
                  className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                    energyMode === 'low' ? 'bg-amber-600 text-white shadow-xs' : 'text-[#5f5a7c] hover:text-[#131b2e]'
                  }`}
                >
                  🟡 พลังน้อย
                </button>
                <button
                  type="button"
                  onClick={() => setEnergyMode('catchup')}
                  className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                    energyMode === 'catchup' ? 'bg-purple-600 text-white shadow-xs' : 'text-[#5f5a7c] hover:text-[#131b2e]'
                  }`}
                >
                  🟣 เคลียร์งาน
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#5f5a7c] pt-1 border-t border-[#bdc8d1]/10">
              <span>แสดงผลตามโหมดพลังงาน: <strong>{energyMode === 'normal' ? 'วันปกติ (สมดุล)' : energyMode === 'low' ? 'พลังน้อย (งานสั้น)' : 'เคลียร์งานค้าง'}</strong></span>
              <span className="font-bold text-[#00668a]">
                เสร็จแล้ว {completedCount}/{top3Tasks.length} งาน
              </span>
            </div>

            <div className="space-y-2.5">
              {top3Tasks.map(task => {
                const isDone = task.status === 'completed';
                return (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isDone
                        ? 'bg-[#f2f3ff]/40 border-[#bdc8d1]/30 opacity-75'
                        : 'bg-white border-[#38bdf8]/60 shadow-xs hover:border-[#00668a]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleTaskStatus(task.id)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                          isDone
                            ? 'bg-[#22c990] text-white'
                            : 'border-2 border-[#38bdf8] hover:bg-[#c4e7ff]/40'
                        }`}
                      >
                        {isDone && <span className="material-symbols-outlined text-[16px]">check</span>}
                      </button>
                      <div className="min-w-0">
                        <div className={`text-[13px] sm:text-[14px] font-bold truncate ${isDone ? 'line-through text-[#6e7980]' : 'text-[#131b2e]'}`}>
                          {task.title}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="px-2 py-0.2 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                            {task.category}
                          </span>
                          <span className="text-[11px] text-[#6e7980]">
                            {task.estimatedMinutes} นาที
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('today')}
                      className="px-3 py-1 rounded-full bg-[#f2f3ff] hover:bg-[#c4e7ff] text-[#00668a] text-[11px] font-bold cursor-pointer shrink-0"
                    >
                      จับเวลา
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column (4 Cols): Overall Readiness & Real Breakdown */}
        <div className="lg:col-span-4 space-y-5">
          <section className="rounded-3xl p-5 bg-white border border-[#bdc8d1]/30 card-sky-shadow space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#c4e7ff]/50 text-[#00668a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">pie_chart</span>
                </div>
                <h2 className="text-[16px] font-bold text-[#131b2e]">ภาพรวมความพร้อมจริง</h2>
              </div>
              <span className="text-[11px] font-bold bg-[#c4e7ff]/40 text-[#00668a] px-2.5 py-0.5 rounded-full">
                {currentPrimaryTarget.round}
              </span>
            </div>

            {/* 4 Core Pillars with Real Data */}
            <div className="space-y-3.5 text-[12px]">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-[#131b2e]">พอร์ตโฟลิโอ 10 หน้า</span>
                  <span className="text-[#5f5a7c] font-bold">{portfolioPages} / 10 หน้า ({portfolioPercent}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f2f3ff] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${portfolioPercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-[#131b2e]">คะแนนสอบที่บันทึกจริง</span>
                  <span className="text-[#5f5a7c] font-bold">
                    {averageExamScore !== null ? `${averageExamScore}% (เฉลี่ย)` : 'ยังไม่มีคะแนน'}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f2f3ff] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#38bdf8] transition-all duration-300"
                    style={{ width: `${averageExamScore || 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-[#131b2e]">งบประมาณการศึกษา 4 ปี</span>
                  <span className={financialCalculations.netBalance >= 0 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                    {financialCalculations.netBalance >= 0 ? 'งบเพียงพอ ✓' : 'ต้องวางแผนเสริม'}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f2f3ff] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${financialCalculations.netBalance >= 0 ? 'bg-emerald-500' : 'bg-amber-400'}`}
                    style={{ width: financialCalculations.netBalance >= 0 ? '100%' : '60%' }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#bdc8d1]/20 flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('university')}
                className="w-full py-2 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#00668a] text-[12px] font-bold text-center cursor-pointer transition-colors"
              >
                ดูเกณฑ์ละเอียดของ {currentPrimaryTarget.name}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* 4. Achievements & Milestones Component */}
      <div ref={achievementsRef} className="pt-2">
        <Achievements variant="dashboard" />
      </div>
    </div>
  );
};
