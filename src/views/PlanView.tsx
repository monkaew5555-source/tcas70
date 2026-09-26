import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANION_AVATAR } from '../data/initialData';

export const PlanView: React.FC = () => {
  const { currentPrimaryTarget, setActiveTab, setAuthToast } = useApp();
  const [activeSegment, setActiveSegment] = useState<'timeline' | 'sprint' | 'backup'>('sprint');

  const targetUniName = currentPrimaryTarget.name;
  const targetFacultyName = currentPrimaryTarget.faculty;
  const targetProgramName = currentPrimaryTarget.program;

  // Dynamically constructed 11 phases based on currently selected university
  const roadmapPhases = [
    {
      phase: 1,
      title: 'วางระบบ & สรุปเป้าหมาย',
      date: 'กันยายน 2569',
      desc: `คัดเลือกสาขาในฝัน (${targetFacultyName} ${targetUniName}) เช็กเกณฑ์ขั้นต่ำ GPAX ${currentPrimaryTarget.gpaxRequired}+ และวางสูตรจัดสรรเวลาเรียนรายสัปดาห์`,
      status: 'completed',
      tag: 'สำเร็จแล้ว ✓',
      stat: 'ภารกิจ 4/4 สำเร็จ'
    },
    {
      phase: 2,
      title: 'ปูพื้นฐาน & สะสมผลงาน',
      date: 'ต.ค. - พ.ย. 2569',
      desc: `จัดเตรียมโปรเจกต์และผลงานใส่ Portfolio 10 หน้าให้ตรงสเปกของ ${targetFacultyName} พร้อมฝึกทำแบบทดสอบเก่าปี 67 ทุกสัปดาห์`,
      status: 'active',
      tag: 'เฟสปัจจุบัน 🚀',
      stat: 'ความคืบหน้า 80%'
    },
    {
      phase: 3,
      title: 'สนามสอบ TGAT / TPAT',
      date: 'ธันวาคม 2569',
      desc: `ลงสนามสอบวัดสมรรถนะทั่วไป TGAT 1-2-3 และ TPAT ที่ต้องใช้ใน ${targetFacultyName} อย่างมั่นใจ`,
      status: 'planned',
      tag: 'วางแผนแล้ว',
      stat: `เน้น ${currentPrimaryTarget.requiredExams?.[0] || 'TGAT / TPAT'}`
    },
    {
      phase: 4,
      title: 'ยื่นรอบที่ 1 Portfolio',
      date: 'มกราคม 2570',
      desc: `อัปโหลดแฟ้มสะสมผลงานฉบับสมบูรณ์ 10 หน้า เข้าระบบรับสมัครของ ${targetUniName} (${targetFacultyName})`,
      status: 'planned',
      tag: 'รอบ 1 Portfolio',
      stat: 'เป้าหมายหลัก'
    },
    {
      phase: 5,
      title: 'สอบสัมภาษณ์รอบพอร์ต',
      date: 'กุมภาพันธ์ 2570',
      desc: `เข้าสอบสัมภาษณ์ตรงตามเกณฑ์ของ ${targetFacultyName} นำเสนอผลงานและทัศนคติต่อคณะกรรมการ`,
      status: 'planned',
      tag: 'การสอบสัมภาษณ์',
      stat: 'ซ้อมห้อง AI Mock'
    },
    {
      phase: 6,
      title: 'โควตาตามภูมิภาค / เครือข่าย',
      date: 'มีนาคม 2570',
      desc: `ใช้คะแนนสมรรถนะร่วมยื่นโควตาในสาขาที่เกี่ยวข้องกับ ${targetFacultyName} เพื่อเป็นแผนคู่ขนาน`,
      status: 'planned',
      tag: 'รอบ 2 Quota',
      stat: 'แผนสำรองรอบโควตา'
    },
    {
      phase: 7,
      title: 'สอบข้อสอบ A-Level',
      date: 'มีนาคม 2570',
      desc: 'สอบวัดความรู้เชิงวิชาการประยุกต์ A-Level เพื่อใช้คะแนนสำหรับรอบ Admission กลาง',
      status: 'planned',
      tag: 'สนาม A-Level',
      stat: 'เสริมความมั่นใจรอบ 3'
    },
    {
      phase: 8,
      title: 'คัดเลือกรอบกลาง Admission',
      date: 'พฤษภาคม 2570',
      desc: 'จัดอันดับ 10 สาขา ผ่านระบบ mytcas.com ตามการคำนวณคะแนนที่ปลอดภัยที่สุด',
      status: 'planned',
      tag: 'รอบ 3 Admission',
      stat: 'คำนวณตามแผนสำรอง'
    },
    {
      phase: 9,
      title: 'Direct Admission รับตรงอิสระ',
      date: 'มิถุนายน 2570',
      desc: 'ทางเลือกเสริมกรณีต้องการสมัครตรงกับมหาวิทยาลัยที่เปิดรับเพิ่มเติมในรอบสุดท้าย',
      status: 'planned',
      tag: 'รอบ 4 รับตรง',
      stat: 'เตรียมเอกสารสำรอง'
    },
    {
      phase: 10,
      title: 'สรุปผล & จัดการสิทธิ์ MyTCAS',
      date: 'มิถุนายน 2570',
      desc: 'กด "ยืนยันสิทธิ์" ภายในเวลาที่กำหนด และพิมพ์ใบหลักฐานการผ่านการคัดเลือก',
      status: 'planned',
      tag: 'MyTCAS ยืนยันสิทธิ์',
      stat: 'ป้องกันสละสิทธิ์ผิดพลาด'
    },
    {
      phase: 11,
      title: `ก้าวสู่รั้วมหาวิทยาลัยในฝัน (${targetUniName}) 🎓`,
      date: 'สิงหาคม 2570',
      desc: `รายงานตัวนักศึกษาใหม่ ${targetFacultyName} ปฐมนิเทศ และเริ่มต้นชีวิตปริญญาตรีอย่างภาคภูมิใจ ทุกหยาดเหงื่อจะเบ่งบานในวันนี้`,
      status: 'destination',
      tag: 'จุดหมายปลายทางแห่งความสำเร็จ',
      stat: `#Dek70${targetUniName.split(' ')[0]}`
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header & Actions */}
      <section className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e5deff] text-[#1b1735] text-[11px] font-bold mb-2 shadow-xs">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>TCAS70 Milestone Roadmap</span>
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#00668a] tracking-tight">
              แผนการเรียนและไทม์ไลน์: {targetUniName}
            </h1>
            <p className="text-[14px] text-[#5f5a7c] mt-0.5">
              เส้นทางพิชิตเป้าหมาย {targetFacultyName} ({targetProgramName}) — ปรับเปลี่ยนข้อมูลตามมหาวิทยาลัยที่คุณเลือกแบบเรียลไทม์ ✨
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('university')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#00668a] text-white hover:bg-[#004965] text-[12px] font-bold transition-all shadow-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">school</span>
              <span>เปลี่ยนคณะ/มหาวิทยาลัย</span>
            </button>
            <a
              href="https://www.mytcas.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#bdc8d1]/60 text-[#5f5a7c] hover:border-[#00668a] hover:text-[#00668a] text-[12px] font-bold transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              <span>ดูเกณฑ์ ทปอ.</span>
            </a>
          </div>
        </div>

        {/* Dynamic Segment Buttons with clear active state */}
        <div className="flex items-center gap-2 border-b border-[#bdc8d1]/30 pb-2 overflow-x-auto">
          <button
            onClick={() => {
              setActiveSegment('sprint');
              setAuthToast('สลับมุมมอง: เฟสเตรียมตัวปัจจุบัน (Sprint) 🚀');
            }}
            className={`px-4 py-2 rounded-full font-bold text-[12px] transition-all flex items-center gap-2 cursor-pointer ${
              activeSegment === 'sprint'
                ? 'bg-[#00668a] text-white shadow-xs'
                : 'text-[#5f5a7c] hover:bg-[#eaedff] bg-white border border-[#bdc8d1]/30'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>เฟสเตรียมตัวปัจจุบัน (Sprint)</span>
          </button>

          <button
            onClick={() => {
              setActiveSegment('timeline');
              setAuthToast('สลับมุมมอง: ไทม์ไลน์ภาพรวม 11 เฟส ✦');
            }}
            className={`px-4 py-2 rounded-full font-bold text-[12px] transition-all flex items-center gap-2 cursor-pointer ${
              activeSegment === 'timeline'
                ? 'bg-[#00668a] text-white shadow-xs'
                : 'text-[#5f5a7c] hover:bg-[#eaedff] bg-white border border-[#bdc8d1]/30'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">timeline</span>
            <span>ไทม์ไลน์ภาพรวม (11 เฟส)</span>
          </button>

          <button
            onClick={() => {
              setActiveSegment('backup');
              setAuthToast('สลับมุมมอง: แผนสำรองทางใจ (Backup Plan) 🛡️');
            }}
            className={`px-4 py-2 rounded-full font-bold text-[12px] transition-all flex items-center gap-2 cursor-pointer ${
              activeSegment === 'backup'
                ? 'bg-[#00668a] text-white shadow-xs'
                : 'text-[#5f5a7c] hover:bg-[#eaedff] bg-white border border-[#bdc8d1]/30'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            <span>แผนสำรองทางใจ (Backup Plan)</span>
          </button>
        </div>
      </section>

      {/* 2. CONDITIONAL VIEW: SPRINT VIEW */}
      {activeSegment === 'sprint' && (
        <section className="space-y-5 animate-in fade-in duration-200">
          <div className="rounded-3xl p-6 bg-gradient-to-r from-sky-50 via-white to-purple-50/70 border border-[#c4e7ff]/70 soft-cloud-card relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] bg-[#38bdf8] text-[#001e2c] font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                    <span>เฟส 2 กำลังดำเนินการ (Current Sprint)</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] bg-rose-100 text-rose-700 font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">alarm</span>
                    <span>โฟกัสเตรียมตัวยื่นรอบที่ 1</span>
                  </span>
                </div>

                <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#131b2e] tracking-tight">
                  เป้าหมายสำคัญเดือนนี้: Portfolio 10 หน้า & เกณฑ์รับเข้า {targetUniName}
                </h2>

                <p className="text-[13px] text-[#5f5a7c] leading-relaxed">
                  เตรียมยื่น {currentPrimaryTarget.round || 'รอบ 1 Portfolio'} คณะ {targetFacultyName} ({targetProgramName}) เน้นเก็บผลงานที่ตรงสเปก เกรดขั้นต่ำ {currentPrimaryTarget.gpaxRequired}+ และเตรียมตัวสอบสัมภาษณ์
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-white border border-[#bdc8d1]/40 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#22c990]/20 text-[#006c4b] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[#131b2e]">เกณฑ์ขั้นต่ำ GPAX</div>
                      <div className="text-[10px] text-[#006c4b] font-bold">{currentPrimaryTarget.gpaxRequired}+ พร้อมยื่น</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-[#bdc8d1]/40 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#c4e7ff] text-[#00668a] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[#131b2e]">พอร์ต 10 หน้า</div>
                      <div className="text-[10px] text-[#00668a] font-bold">จัดสรรหน้าผลงาน</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white border border-[#bdc8d1]/40 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#e5deff] text-[#5f5a7c] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">psychology</span>
                    </div>
                    <div>
                      <div className="text-[12px] font-bold text-[#131b2e]">วิชาที่จำเป็น</div>
                      <div className="text-[10px] text-[#5f5a7c] font-bold truncate max-w-[130px]">
                        {currentPrimaryTarget.requiredExams?.[0] || 'TGAT / TPAT'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Companion Card */}
              <div className="p-5 rounded-2xl bg-white border border-[#c4e7ff] soft-cloud-card w-full lg:w-72 shrink-0 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-[#38bdf8] to-[#dcd5fd] mb-2">
                  <img src={COMPANION_AVATAR} alt="" className="w-full h-full rounded-full object-cover shadow-sm bg-white" />
                </div>
                <div className="text-[13px] font-bold text-[#00668a]">พี่สกายบลู เป็นกำลังใจให้!</div>
                <div className="text-[12px] text-[#5f5a7c] mb-3">
                  "ค่อยๆ เก็บผลงานและซ้อมข้อสอบวันละนิด สปีดนี้ถึงเป้าหมาย {targetUniName} แน่นอนนะน้อง 🩵"
                </div>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className="w-full py-2 rounded-full bg-[#00668a] text-white text-[12px] font-bold hover:bg-[#004965] cursor-pointer shadow-xs"
                >
                  ไปจัดหน้าพอร์ต 10 หน้า
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. CONDITIONAL VIEW: 11-PHASE TIMELINE */}
      {activeSegment === 'timeline' && (
        <section className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-extrabold text-[#131b2e] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00668a]">route</span>
              <span>เส้นทางไทม์ไลน์ 11 เฟส สู่ {targetUniName}</span>
            </h2>
            <span className="text-[12px] text-[#5f5a7c]">
              กันยายน 2569 — สิงหาคม 2570
            </span>
          </div>

          <div className="space-y-3">
            {roadmapPhases.map(phase => (
              <div
                key={phase.phase}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  phase.status === 'completed'
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : phase.status === 'active'
                    ? 'bg-white border-[#38bdf8] shadow-md ring-2 ring-[#38bdf8]/20'
                    : phase.status === 'destination'
                    ? 'bg-gradient-to-r from-amber-50 to-sky-50 border-amber-300'
                    : 'bg-[#faf8ff] border-[#bdc8d1]/30 opacity-90'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-[13px] shrink-0 mt-0.5 ${
                    phase.status === 'completed'
                      ? 'bg-emerald-500 text-white'
                      : phase.status === 'active'
                      ? 'bg-[#00668a] text-white'
                      : phase.status === 'destination'
                      ? 'bg-amber-500 text-white'
                      : 'bg-[#e5deff] text-[#5f5a7c]'
                  }`}>
                    {phase.phase}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-[14px] font-bold text-[#131b2e]">
                        {phase.title}
                      </span>
                      <span className="text-[11px] font-semibold text-[#00668a] bg-sky-50 px-2 py-0.2 rounded-md">
                        {phase.date}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        phase.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                        phase.status === 'active' ? 'bg-[#c4e7ff] text-[#001e2c]' :
                        phase.status === 'destination' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {phase.tag}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#5f5a7c] leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] font-bold text-[#5f5a7c] shrink-0 sm:text-right">
                  {phase.stat}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. CONDITIONAL VIEW: BACKUP PSYCHOLOGICAL PLAN */}
      {activeSegment === 'backup' && (
        <section className="bg-white rounded-3xl p-6 border border-[#c4e7ff] card-sky-shadow space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">shield</span>
            </div>
            <div>
              <h2 className="text-[17px] font-extrabold text-[#131b2e]">
                แผนสำรองทางใจและยุทธศาสตร์คู่ขนาน (Plan B Safety Net)
              </h2>
              <p className="text-[12px] text-[#5f5a7c]">
                เตรียมความพร้อมทางจิตวิทยา และตัวเลือกสำรองรอบ 2-3 เผื่อกรณีเกิดเหตุไม่คาดฝัน
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#f0fdf4] border border-emerald-200 space-y-2">
              <span className="text-[11px] font-extrabold text-emerald-800 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                แผนหลัก (Plan A)
              </span>
              <h3 className="text-[14px] font-bold text-[#131b2e]">{targetUniName}</h3>
              <p className="text-[12px] text-[#3e484f] leading-relaxed">
                รอบ 1 Portfolio คณะ {targetFacultyName} ทุ่มเทเตรียมผลงาน 10 หน้าให้ดีที่สุดตามเกณฑ์ที่วางไว้
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#eff6ff] border border-sky-200 space-y-2">
              <span className="text-[11px] font-extrabold text-sky-800 bg-white px-2 py-0.5 rounded-full border border-sky-300">
                แผนรองรอบ 2 (Plan B: Quota)
              </span>
              <h3 className="text-[14px] font-bold text-[#131b2e]">โควตาภูมิภาคหรือเครือข่าย</h3>
              <p className="text-[12px] text-[#3e484f] leading-relaxed">
                ใช้คะแนนสอบ TGAT และสมรรถนะยื่นรอบโควตาในสาขาที่ใกล้เคียง โดยไม่ต้องใช้คะแนน A-Level ที่สูงเกินไป
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#faf5ff] border border-purple-200 space-y-2">
              <span className="text-[11px] font-extrabold text-purple-800 bg-white px-2 py-0.5 rounded-full border border-purple-300">
                ตาข่ายนิรภัย (Safety Net: Admission)
              </span>
              <h3 className="text-[14px] font-bold text-[#131b2e]">จัดอันดับ 10 สาขารอบ 3</h3>
              <p className="text-[12px] text-[#3e484f] leading-relaxed">
                วางแผนจัดอันดับ 1-3 เลือกคณะในฝัน, 4-7 คณะที่คะแนนปลอดภัย, 8-10 คณะที่โอกาสติด 95%+ ป้องกันการหลุดรอบ
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-[12px] text-amber-950 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-amber-700 shrink-0 mt-0.5">sentiment_satisfied</span>
            <p className="leading-relaxed">
              <strong>ข้อคิดจากพี่สกายบลู:</strong> "การมีแผนสำรองไม่ได้แปลว่าเราไม่เชื่อมั่นในเป้าหมายหลัก แต่คือการสร้างเกราะป้องกันความเครียด เพื่อให้เราเดินหน้าเตรียมตัวสู่ {targetUniName} ได้อย่างสบายใจและมั่นคงที่สุดค่ะ 🩵"
            </p>
          </div>
        </section>
      )}
    </div>
  );
};
