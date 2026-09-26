import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UNIVERSITY_DATABASE, UniversityOption, convertProgramToTarget } from '../data/universityDatabase';
import { COMPANION_AVATAR } from '../data/initialData';
import { UniversityTarget } from '../types';

export const UniversityView: React.FC = () => {
  const {
    currentPrimaryTarget,
    setPrimaryTarget,
    setCustomPrimaryTarget,
    setAuthToast,
    setAiChatOpen,
    setActiveTab,
  } = useApp();

  const [selectedUniId, setSelectedUniId] = useState<string>(() => {
    if (currentPrimaryTarget.name.includes('บูรพา')) return 'buu';
    if (currentPrimaryTarget.name.includes('จุฬา')) return 'cu';
    if (currentPrimaryTarget.name.includes('ธรรมศาสตร์')) return 'tu';
    if (currentPrimaryTarget.name.includes('เชียงใหม่')) return 'cmu';
    if (currentPrimaryTarget.name.includes('ลาดกระบัง')) return 'kmitl';
    return 'kku';
  });

  const [isCustomFormOpen, setIsCustomFormOpen] = useState(false);
  const [customUniName, setCustomUniName] = useState('');
  const [customFaculty, setCustomFaculty] = useState('');
  const [customProgram, setCustomProgram] = useState('');
  const [customGpax, setCustomGpax] = useState(2.75);
  const [customRound, setCustomRound] = useState('รอบ 1 Portfolio');
  const [customExams, setCustomExams] = useState('TGAT 1-2-3');
  const [customTuition, setCustomTuition] = useState(20000);

  const activeUni = UNIVERSITY_DATABASE.find(u => u.id === selectedUniId) || UNIVERSITY_DATABASE[0];

  const handleSelectProgram = (uni: UniversityOption, facultyName: string, prog: any) => {
    const target = convertProgramToTarget(uni, facultyName, prog);
    setCustomPrimaryTarget(target);
  };

  const handleSaveCustomTarget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUniName.trim() || !customFaculty.trim()) {
      setAuthToast('กรุณาระบุชื่อมหาวิทยาลัยและคณะ');
      return;
    }

    const examsList = customExams.split(',').map(s => s.trim()).filter(Boolean);

    const newTarget: UniversityTarget = {
      id: `custom-${Date.now()}`,
      rank: 1,
      name: customUniName.trim(),
      faculty: customFaculty.trim(),
      program: customProgram.trim() || 'หลักสูตรปริญญาตรี',
      code: 'CUSTOM-01',
      round: customRound,
      seats: 30,
      applicantRatio: '1:5',
      gpaxRequired: Number(customGpax) || 2.50,
      readinessPercentage: 50,
      chance: 'ปานกลาง',
      highlights: ['เป้าหมายที่ผู้เรียนกำหนดขึ้นเองสำหรับ TCAS70'],
      requiredExams: examsList.length > 0 ? examsList : ['TGAT รวม', 'เกณฑ์ตามประกาศคณะ'],
      portfolioTips: ['ผลงานและเกียรติบัตรที่ตรงกับสายวิชาชีพของคณะ', 'ประวัติส่วนตัวและสะท้อนทัศนคติ'],
      priorityOrderAdvice: [
        'ขั้นตอนที่ 1: ตรวจสอบระเบียบการ TCAS70 ล่าสุดของมหาวิทยาลัย',
        'ขั้นตอนที่ 2: วางแผนการสอบ TGAT / TPAT ตามเกณฑ์',
        'ขั้นตอนที่ 3: เตรียมเอกสารและ Portfolio 10 หน้า'
      ],
      officialUrl: `https://www.google.com/search?q=${encodeURIComponent(customUniName + ' ' + customFaculty + ' TCAS70')}`,
      officialSearchQuery: `https://www.mytcas.com/search?q=${encodeURIComponent(customUniName + ' ' + customFaculty)}`,
      tuitionEstimate: Number(customTuition) || 22000,
      criteria: [
        { name: 'GPAX ขั้นต่ำ', weight: `ขั้นต่ำ ${customGpax}`, currentScore: 'กำลังประเมิน', status: 'พร้อมยื่น' },
        { name: 'การประเมินรอบ ' + customRound, weight: '100%', currentScore: 'กำลังจัดเตรียม', status: 'พร้อมยื่น' }
      ]
    };

    setCustomPrimaryTarget(newTarget);
    setIsCustomFormOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <section className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-sky-50 via-white to-indigo-50/40 border border-[#c4e7ff] card-sky-shadow relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#00668a] text-white flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[13px]">school</span>
                เป้าหมายหลักปัจจุบัน
              </span>
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                {currentPrimaryTarget.round}
              </span>
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#131b2e] tracking-tight">
              {currentPrimaryTarget.name}
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[#00668a] font-bold">
              {currentPrimaryTarget.faculty} • {currentPrimaryTarget.program}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#5f5a7c] pt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#00668a]">grade</span>
                GPAX ขั้นต่ำ: <strong>{currentPrimaryTarget.gpaxRequired}</strong>
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#006c4b]">payments</span>
                ค่าเทอมโดยประมาณ: <strong>~{currentPrimaryTarget.tuitionEstimate ? currentPrimaryTarget.tuitionEstimate.toLocaleString() + ' ฿/เทอม' : 'รอประกาศ'}</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={currentPrimaryTarget.officialSearchQuery || `https://www.mytcas.com/search?q=${encodeURIComponent(currentPrimaryTarget.name)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-white hover:bg-[#f2f3ff] text-[#00668a] border border-[#c4e7ff] text-[12px] font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">travel_explore</span>
              <span>ค้นหาบน myTCAS.com ↗</span>
            </a>
            <button
              onClick={() => setAiChatOpen(true)}
              className="px-4 py-2 rounded-full bg-[#00668a] hover:bg-[#004965] text-white text-[12px] font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">smart_toy</span>
              <span>ปรึกษาน้องสกายบลูเรื่องคณะนี้</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Nong SkyBlue Advisory Box (สิ่งที่ควรทำก่อน-หลัง และข้อกำหนดของคณะนี้) */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#c4e7ff] card-sky-shadow">
        <div className="flex items-start gap-3.5 mb-4">
          <img
            src={COMPANION_AVATAR}
            alt="น้องสกายบลู"
            className="w-11 h-11 rounded-full object-cover border-2 border-[#38bdf8] shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[16px] font-bold text-[#131b2e]">คำแนะนำวางแผนเฉพาะทางจากน้องสกายบลู</h2>
              <span className="px-2 py-0.5 bg-[#c4e7ff]/70 text-[#004c69] rounded-md text-[10px] font-bold">
                Smart Roadmap
              </span>
            </div>
            <p className="text-[12px] text-[#5f5a7c]">
              จัดลำดับสิ่งที่คุณควรทำก่อน-หลังเพื่อเพิ่มโอกาสสอบติดในสาขานี้
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: ลำดับสิ่งที่ควรทำ */}
          <div className="p-4 rounded-2xl bg-[#f0f9ff] border border-[#c4e7ff]/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#00668a] text-[13px] font-bold mb-2">
                <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
                <span>ควรทำอะไรก่อน-หลัง?</span>
              </div>
              <ul className="space-y-2 text-[12px] text-[#131b2e]">
                {currentPrimaryTarget.priorityOrderAdvice && currentPrimaryTarget.priorityOrderAdvice.length > 0 ? (
                  currentPrimaryTarget.priorityOrderAdvice.map((step, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-[#00668a] font-bold shrink-0">•</span>
                      <span>{step}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#00668a] font-bold shrink-0">1.</span>
                      <span>ตรวจสอบเกณฑ์ขั้นต่ำ GPAX และรอบที่เปิดรับ</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#00668a] font-bold shrink-0">2.</span>
                      <span>เตรียมผลงานพอร์ตโฟลิโอ 10 หน้าให้ตรงตามที่คณะต้องการ</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#00668a] font-bold shrink-0">3.</span>
                      <span>ฝึกทำข้อสอบจำลองวิชาที่กำหนด</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('today')}
              className="mt-3 text-[11px] font-bold text-[#00668a] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>ไปที่บันทึกภารกิจวันนี้</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </button>
          </div>

          {/* Card 2: ข้อสอบที่จำเป็น */}
          <div className="p-4 rounded-2xl bg-[#f5f3ff] border border-[#dcd5fd] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#5b21b6] text-[13px] font-bold mb-2">
                <span className="material-symbols-outlined text-[18px]">quiz</span>
                <span>วิชาที่จำเป็นต้องสอบ</span>
              </div>
              <div className="space-y-1.5 text-[12px] text-[#131b2e]">
                {currentPrimaryTarget.requiredExams && currentPrimaryTarget.requiredExams.length > 0 ? (
                  currentPrimaryTarget.requiredExams.map((exam, i) => (
                    <div key={i} className="p-2 rounded-xl bg-white border border-[#dcd5fd]/60 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#7c3aed] shrink-0" />
                      <span className="font-semibold text-[11px]">{exam}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-[12px] text-[#5f5a7c]">
                    ตรวจสอบระเบียบการทางการของคณะ
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setActiveTab('exams')}
              className="mt-3 text-[11px] font-bold text-[#5b21b6] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>ซ้อมทำข้อสอบวิชาเหล่านี้</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </button>
          </div>

          {/* Card 3: คำแนะนำพอร์ต */}
          <div className="p-4 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#065f46] text-[13px] font-bold mb-2">
                <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                <span>พอร์ตควรใส่อะไรบ้าง?</span>
              </div>
              <ul className="space-y-1.5 text-[11px] text-[#131b2e]">
                {currentPrimaryTarget.portfolioTips && currentPrimaryTarget.portfolioTips.length > 0 ? (
                  currentPrimaryTarget.portfolioTips.slice(0, 3).map((tip, i) => (
                    <li key={i} className="flex items-start gap-1 leading-snug">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))
                ) : (
                  <li>เน้นผลงานที่สะท้อนทักษะตรงสายและทัศนคติการเรียนรู้</li>
                )}
              </ul>
            </div>
            <button
              onClick={() => setActiveTab('portfolio')}
              className="mt-3 text-[11px] font-bold text-[#065f46] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>จัดหน้า Portfolio ของคุณ</span>
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. University Selector Hub & Variety */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#131b2e]">
              ค้นหาและเลือกมหาวิทยาลัย คณะ และสาขา
            </h2>
            <p className="text-[12px] sm:text-[13px] text-[#5f5a7c]">
              เปลี่ยนใจเมื่อไหร่ก็ปรับได้ทันที ระบบจะคำนวณและปรับคำแนะนำข้อสอบและพอร์ตให้ตรงคณะโดยอัตโนมัติ
            </p>
          </div>

          <button
            onClick={() => setIsCustomFormOpen(!isCustomFormOpen)}
            className="px-4 py-2 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#00668a] text-[12px] font-bold border border-[#c4e7ff] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>{isCustomFormOpen ? 'ปิดฟอร์มพิมพ์ระบุเอง' : '+ พิมพ์ระบุ มหาลัย/คณะ เอง'}</span>
          </button>
        </div>

        {/* Custom Target Input Form (Expandable) */}
        {isCustomFormOpen && (
          <form
            onSubmit={handleSaveCustomTarget}
            className="p-5 rounded-3xl bg-white border-2 border-[#38bdf8] card-sky-shadow space-y-4 animate-in fade-in"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#c4e7ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00668a]">edit_document</span>
                <h3 className="text-[14px] font-bold text-[#131b2e]">พิมพ์ระบุเป้าหมายมหาวิทยาลัยและคณะอิสระ</h3>
              </div>
              <span className="text-[11px] text-[#6e7980]">สามารถพิมพ์คณะใดก็ได้ในประเทศไทย</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-[13px]">
              <div>
                <label className="block text-[11px] font-bold text-[#5f5a7c] mb-1">ชื่อมหาวิทยาลัย *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น มหาวิทยาลัยบูรพา, จุฬาลงกรณ์มหาวิทยาลัย"
                  value={customUniName}
                  onChange={e => setCustomUniName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5f5a7c] mb-1">คณะ *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น คณะวิศวกรรมศาสตร์, คณะนิเทศศาสตร์"
                  value={customFaculty}
                  onChange={e => setCustomFaculty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5f5a7c] mb-1">สาขาวิชา</label>
                <input
                  type="text"
                  placeholder="เช่น วิศวกรรมคอมพิวเตอร์, วารสารสนเทศ"
                  value={customProgram}
                  onChange={e => setCustomProgram(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5f5a7c] mb-1">รอบที่ต้องการสมัคร</label>
                <select
                  value={customRound}
                  onChange={e => setCustomRound(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
                >
                  <option value="รอบ 1 Portfolio">รอบ 1 Portfolio</option>
                  <option value="รอบ 2 โควตา">รอบ 2 โควตา</option>
                  <option value="รอบ 3 Admission">รอบ 3 Admission</option>
                  <option value="รอบ 4 รับตรงอิสระ">รอบ 4 รับตรงอิสระ</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5f5a7c] mb-1">GPAX ขั้นต่ำ</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={customGpax}
                  onChange={e => setCustomGpax(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5f5a7c] mb-1">ค่าเทอมโดยประมาณ (บาท/เทอม)</label>
                <input
                  type="number"
                  step="500"
                  value={customTuition}
                  onChange={e => setCustomTuition(parseInt(e.target.value, 10))}
                  className="w-full px-3 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCustomFormOpen(false)}
                className="px-4 py-2 rounded-full text-[12px] font-bold text-[#5f5a7c] hover:bg-[#f2f3ff] cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-[#00668a] text-white text-[12px] font-bold hover:bg-[#004965] shadow-xs cursor-pointer"
              >
                บันทึกเป็นเป้าหมายหลัก
              </button>
            </div>
          </form>
        )}

        {/* University Pill Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {UNIVERSITY_DATABASE.map(u => {
            const isSelected = selectedUniId === u.id;
            return (
              <button
                key={u.id}
                onClick={() => setSelectedUniId(u.id)}
                className={`px-4 py-2 rounded-2xl text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-[#00668a] text-white shadow-md scale-[1.02]'
                    : 'bg-white text-[#5f5a7c] border border-[#c4e7ff] hover:bg-[#f2f3ff]'
                }`}
              >
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-extrabold">
                  {u.logoText}
                </span>
                <span>{u.name}</span>
              </button>
            );
          })}
        </div>

        {/* Faculties & Programs Grid for the selected University */}
        <div className="space-y-4">
          {activeUni.faculties.map((fac, facIdx) => (
            <div key={facIdx} className="bg-white rounded-3xl p-5 border border-[#bdc8d1]/30 card-sky-shadow space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#bdc8d1]/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#38bdf8]/20 text-[#00668a] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[16px]">domain</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-[#131b2e]">{fac.facultyName}</h3>
                </div>
                <span className="text-[11px] text-[#5f5a7c]">
                  เปิดสอน {fac.programs.length} หลักสูตรเด่น
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {fac.programs.map((prog, pIdx) => {
                  const isCurrentTarget =
                    currentPrimaryTarget.name === activeUni.name &&
                    currentPrimaryTarget.program === prog.programName;

                  return (
                    <div
                      key={pIdx}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                        isCurrentTarget
                          ? 'bg-[#f0f9ff] border-[#00668a] ring-2 ring-[#00668a]/20 shadow-sm'
                          : 'bg-white border-[#c4e7ff]/80 hover:border-[#00668a] hover:shadow-xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e5deff] text-[#1b1735]">
                            {prog.round}
                          </span>
                          <span className="text-[11px] font-bold text-[#006c4b]">
                            {prog.seats} ที่นั่ง ({prog.applicantRatio})
                          </span>
                        </div>

                        <h4 className="text-[14px] font-bold text-[#131b2e] leading-snug">
                          {prog.programName}
                        </h4>

                        <div className="mt-2 space-y-1 text-[11px] text-[#5f5a7c]">
                          <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[13px] text-[#00668a]">grade</span>
                            <span>GPAX ขั้นต่ำ: <strong>{prog.gpaxRequired}</strong></span>
                            <span className="text-[#bdc8d1]">•</span>
                            <span>ค่าเทอม: <strong>~{prog.tuitionEstimate.toLocaleString()} ฿</strong></span>
                          </div>
                          <div className="flex items-start gap-1.5 text-[11px] text-[#131b2e]">
                            <span className="material-symbols-outlined text-[13px] text-amber-600 shrink-0 mt-0.5">assignment</span>
                            <span className="truncate">ต้องใช้: {prog.requiredExams.slice(0, 2).join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#bdc8d1]/20 flex items-center justify-between gap-2">
                        <a
                          href={prog.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-[#00668a] font-bold hover:underline flex items-center gap-1"
                        >
                          <span>เว็บทางการ</span>
                          <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                        </a>

                        {isCurrentTarget ? (
                          <span className="px-3 py-1 rounded-full bg-[#00668a] text-white text-[11px] font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px]">check</span>
                            <span>เป้าหมายปัจจุบัน</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSelectProgram(activeUni, fac.facultyName, prog)}
                            className="px-3.5 py-1 rounded-full bg-[#f2f3ff] hover:bg-[#00668a] text-[#00668a] hover:text-white text-[11px] font-bold border border-[#c4e7ff] transition-all cursor-pointer"
                          >
                            เลือกเป็นเป้าหมายหลัก
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
