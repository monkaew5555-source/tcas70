import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANION_AVATAR } from '../data/initialData';

export const SettingsView: React.FC = () => {
  const {
    currentUser,
    updateUserProfile,
    setAuthModalOpen,
    energyMode,
    setEnergyMode,
    exportDataJSON,
    importDataJSON,
    resetAllData,
    setAuthToast,
    loginWithGoogle,
    logout,
    firebaseAuthUser,
    isLoggingInWithGoogle,
    isFirebaseConnected
  } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [school, setSchool] = useState(currentUser.school);
  const [educationPlan, setEducationPlan] = useState(currentUser.educationPlan || 'สายศิลป์-ภาษา / วิทย์-คอมฯ');
  const [gpax, setGpax] = useState(currentUser.gpax.toString());
  const [targetUni, setTargetUni] = useState(currentUser.targetUniversity);
  const [targetFaculty, setTargetFaculty] = useState(currentUser.targetFaculty || '');
  const [targetProgram, setTargetProgram] = useState(currentUser.targetProgram || '');
  const [dreamCareer, setDreamCareer] = useState(currentUser.dreamCareer || 'ผู้กำกับสื่อดิจิทัล / วิศวกรซอฟต์แวร์');
  const [studyStyle, setStudyStyle] = useState(currentUser.studyStyle || 'เน้นทำแบบฝึกหัดสม่ำเสมอ');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);
  const [personality, setPersonality] = useState<'warm' | 'concise' | 'calm'>('warm');
  const [focusLength, setFocusLength] = useState(currentUser.focusDuration || 45);
  const [dndNight, setDndNight] = useState(currentUser.dndNight ?? true);

  const { clearToCleanState } = useApp();

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      school,
      educationPlan,
      gpax: parseFloat(gpax) || currentUser.gpax,
      targetUniversity: targetUni,
      targetFaculty,
      targetProgram,
      dreamCareer,
      studyStyle,
      avatarUrl,
      focusDuration: focusLength,
      dndNight
    });
    setAuthToast('บันทึกการเปลี่ยนแปลงโปรไฟล์เรียบร้อยแล้ว ✓');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        importDataJSON(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-3xl soft-cloud-card border border-[#bdc8d1]/30">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#00668a] mb-1">
            <span>TCAS70 MISSION CONTROL</span>
            <span>•</span>
            <span className="text-[#5f5a7c]">ระบบและการตั้งค่า</span>
          </div>
          <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#131b2e] tracking-tight flex items-center gap-2">
            <span>ตั้งค่าและปรับแต่งระบบ</span>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#c4e7ff] text-[#001e2c] font-bold">Preferences</span>
          </h1>
          <p className="text-[13px] text-[#5f5a7c] mt-0.5 max-w-xl">
            ปรับแต่งประสบการณ์เตรียมสอบ TCAS70 จัดการเป้าหมาย คณะ และการแจ้งเตือนเพื่อสุขภาพจิตที่ดี
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={resetAllData}
            className="px-4 py-2 rounded-full text-[#5f5a7c] hover:bg-[#f2f3ff] text-[12px] font-bold transition-all cursor-pointer"
          >
            รีเซ็ตค่าเริ่มต้น
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-5 py-2.5 rounded-full bg-[#38bdf8] text-[#001e2c] hover:bg-[#0284c7] hover:text-white text-[12px] font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>บันทึกการเปลี่ยนแปลง</span>
          </button>
        </div>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 Cols): Profile & Companion Tone */}
        <div className="lg:col-span-7 space-y-6">
          {/* Student Profile Card */}
          <section className="bg-white p-6 rounded-3xl soft-cloud-card border border-[#bdc8d1]/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#bdc8d1]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00668a] text-[22px]">account_circle</span>
                <h2 className="text-[16px] font-bold text-[#131b2e]">ข้อมูลโปรไฟล์และเป้าหมายการสอบ</h2>
              </div>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-[11px] font-bold text-[#00668a] hover:underline cursor-pointer"
              >
                สลับผู้ใช้ / เข้าสู่ระบบ
              </button>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#f2f3ff]/70 border border-[#bdc8d1]/30">
              <img src={currentUser.avatarUrl} alt="" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#38bdf8]" />
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#131b2e] truncate">{currentUser.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#c4e7ff] text-[#00668a] text-[11px] font-bold">
                    GPAX: {currentUser.gpax}
                  </span>
                </div>
                <p className="text-[12px] text-[#5f5a7c] truncate">{currentUser.school}</p>
                <div className="text-[11px] text-[#00668a] font-semibold">{currentUser.targetProgram}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
              <div>
                <label className="block font-bold text-[#3e484f] mb-1">ชื่อที่แสดง / ชื่อเล่น</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#bdc8d1]/60 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[#3e484f] mb-1">โรงเรียน</label>
                <input
                  type="text"
                  value={school}
                  onChange={e => setSchool(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#bdc8d1]/60 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[#3e484f] mb-1">สายการเรียน</label>
                <input
                  type="text"
                  value={educationPlan}
                  onChange={e => setEducationPlan(e.target.value)}
                  placeholder="เช่น สายวิทย์-คณิต หรือ ศิลป์-ภาษา"
                  className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#bdc8d1]/60 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[#3e484f] mb-1">เกรดเฉลี่ยสะสม (GPAX)</label>
                <input
                  type="text"
                  value={gpax}
                  onChange={e => setGpax(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#bdc8d1]/60 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[#3e484f] mb-1">อาชีพในฝัน (Dream Career)</label>
                <input
                  type="text"
                  value={dreamCareer}
                  onChange={e => setDreamCareer(e.target.value)}
                  placeholder="เช่น วิศวกร, ผู้กำกับภาพยนตร์, ครีเอทีฟ"
                  className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#bdc8d1]/60 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-[#3e484f] mb-1">สไตล์การอ่านหนังสือ</label>
                <input
                  type="text"
                  value={studyStyle}
                  onChange={e => setStudyStyle(e.target.value)}
                  placeholder="เช่น โฟกัสสั้น 25 นาที, ชอบอ่านดึก"
                  className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#bdc8d1]/60 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-[#3e484f] mb-1">เป้าหมายมหาวิทยาลัยหลัก</label>
                <input
                  type="text"
                  value={targetUni}
                  onChange={e => setTargetUni(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#bdc8d1]/60 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2 pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={clearToCleanState}
                  className="px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 text-[11px] font-bold border border-rose-200 cursor-pointer"
                >
                  ✨ ล้างข้อมูลตัวอย่างเพื่อเริ่มต้นใหม่
                </button>
                <button
                  type="button"
                  onClick={handleSaveAll}
                  className="px-4 py-2 rounded-full bg-[#00668a] text-white text-[12px] font-bold hover:bg-[#004965] shadow-xs cursor-pointer"
                >
                  บันทึกโปรไฟล์
                </button>
              </div>
            </div>
          </section>

          {/* AI Companion Personality Card */}
          <section className="bg-white p-6 rounded-3xl soft-cloud-card border border-[#bdc8d1]/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#bdc8d1]/20">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00668a] text-[22px]">smart_toy</span>
                <h2 className="text-[16px] font-bold text-[#131b2e]">ปรับแต่งผู้ช่วย AI "น้องสกายบลู"</h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                พร้อมช่วยเหลือ 24/7
              </span>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#f2f3ff]">
              <img src={COMPANION_AVATAR} alt="" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#38bdf8]" />
              <div>
                <strong className="text-[13px] text-[#00668a] block">น้องสกายบลู (SkyBlue Companion VER 2.4)</strong>
                <p className="text-[11px] text-[#5f5a7c]">คอยตรวจเช็กระดับความเครียด ช่วยคำนวณคะแนน และส่งกำลังใจให้เธอ</p>
              </div>
            </div>

            {/* Personality Choices */}
            <div className="space-y-2 text-[12px]">
              <div
                onClick={() => setPersonality('warm')}
                className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                  personality === 'warm' ? 'border-2 border-[#38bdf8] bg-[#c4e7ff]/20 font-bold' : 'border-[#bdc8d1]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>อบอุ่น ให้กำลังใจ สดใส สไตล์น้องสาวคนสนิท (Default)</span>
                  <span className="material-symbols-outlined text-[16px] text-[#00668a]">sentiment_satisfied</span>
                </div>
                <p className="text-[11px] text-[#5f5a7c] font-normal mt-0.5">
                  เน้นคำพูดปลอบโยนเมื่อคะแนนตก ชวนพักทานขนม ใช้น้ำเสียงเป็นกันเอง
                </p>
              </div>

              <div
                onClick={() => setPersonality('concise')}
                className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                  personality === 'concise' ? 'border-2 border-[#38bdf8] bg-[#c4e7ff]/20 font-bold' : 'border-[#bdc8d1]/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>กระชับ ตรงประเด็น จริงจังแบบโค้ชติวเตอร์</span>
                  <span className="material-symbols-outlined text-[16px] text-[#5f5a7c]">sports</span>
                </div>
                <p className="text-[11px] text-[#5f5a7c] font-normal mt-0.5">
                  เน้นสถิติข้อสอบ วิเคราะห์จุดบกพร่อง ไม่พูดพร่ำเพื่อ
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right (5 Cols): Energy & Storage/Backup */}
        <div className="lg:col-span-5 space-y-6">
          {/* Energy Mode Card */}
          <section className="bg-white p-6 rounded-3xl soft-cloud-card border border-[#bdc8d1]/30 space-y-4">
            <h3 className="text-[15px] font-bold text-[#131b2e] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00668a]">battery_charging_full</span>
              <span>การจัดการเวลาและโหมดพลังงาน</span>
            </h3>

            <div>
              <label className="block text-[11px] font-bold text-[#5f5a7c] mb-1.5">ระดับพลังงานวันนี้</label>
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setEnergyMode('normal')}
                  className={`p-2.5 rounded-2xl border cursor-pointer ${
                    energyMode === 'normal' ? 'border-2 border-[#22c990] bg-[#68fcbf]/20 text-[#006c4b]' : 'border-[#bdc8d1]/30 text-[#5f5a7c]'
                  }`}
                >
                  <span className="block text-[18px]">✨</span>
                  <span>วันปกติ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEnergyMode('low')}
                  className={`p-2.5 rounded-2xl border cursor-pointer ${
                    energyMode === 'low' ? 'border-2 border-amber-400 bg-amber-50 text-amber-700' : 'border-[#bdc8d1]/30 text-[#5f5a7c]'
                  }`}
                >
                  <span className="block text-[18px]">🌱</span>
                  <span>วันพลังน้อย</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEnergyMode('catchup')}
                  className={`p-2.5 rounded-2xl border cursor-pointer ${
                    energyMode === 'catchup' ? 'border-2 border-purple-400 bg-purple-50 text-purple-700' : 'border-[#bdc8d1]/30 text-[#5f5a7c]'
                  }`}
                >
                  <span className="block text-[18px]">⚡</span>
                  <span>วันตามงาน</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#5f5a7c] mb-1.5">ช่วงเวลาโฟกัส (Focus Time)</label>
              <div className="flex gap-2 text-[11px] font-bold">
                {[25, 45, 60].map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setFocusLength(mins)}
                    className={`flex-1 py-1.5 rounded-xl border cursor-pointer ${
                      focusLength === mins ? 'bg-[#00668a] text-white border-[#00668a]' : 'bg-[#f2f3ff] text-[#5f5a7c] border-[#bdc8d1]/30'
                    }`}
                  >
                    {mins} นาที
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#f2f3ff] flex items-center justify-between text-[12px]">
              <div>
                <strong className="text-[#131b2e] block">โหมดห้ามรบกวนช่วงกลางคืน</strong>
                <span className="text-[11px] text-[#6e7980]">หลัง 22:30 น. ปิดการแจ้งเตือนเรื่องสอบ</span>
              </div>
              <button
                type="button"
                onClick={() => setDndNight(!dndNight)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                  dndNight ? 'bg-[#38bdf8]' : 'bg-[#bdc8d1]'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    dndNight ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Firebase Cloud & Google Account Card */}
          <section className="bg-white p-6 rounded-3xl soft-cloud-card border border-amber-200/70 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#bdc8d1]/20">
              <h3 className="text-[15px] font-bold text-[#131b2e] flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
                <span>ระบบคลาวด์ Firebase & บัญชี Google</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Firebase Connected
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-[12px] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#5f5a7c]">ชื่อโปรเจกต์:</span>
                <span className="font-extrabold text-[#131b2e]">TCAS70-Mission-Control</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5f5a7c]">ฐานข้อมูล Firestore:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  เชื่อมต่อและซิงก์เรียลไทม์
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#5f5a7c]">สถานะการเข้าสู่ระบบ:</span>
                <span className="font-bold text-[#00668a]">
                  {firebaseAuthUser ? `Google: ${firebaseAuthUser.displayName || firebaseAuthUser.email}` : 'ใช้งานแบบออฟไลน์ / จำลอง'}
                </span>
              </div>
            </div>

            {firebaseAuthUser ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="flex-1 py-2 px-3 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#00668a] text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">switch_account</span>
                  <span>สลับบัญชี Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="py-2 px-4 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => loginWithGoogle()}
                disabled={isLoggingInWithGoogle}
                className="w-full py-2.5 px-4 rounded-full bg-white border border-[#bdc8d1] hover:bg-[#f2f3ff] text-[#131b2e] text-[12px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-[0.98] disabled:opacity-60"
              >
                {isLoggingInWithGoogle ? (
                  <span className="flex items-center gap-2 text-[#00668a]">
                    <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                    กำลังเปิด Google Sign-In...
                  </span>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>เข้าสู่ระบบด้วย Google เพื่อซิงก์คลาวด์อัตโนมัติ</span>
                  </>
                )}
              </button>
            )}
          </section>

          {/* Backup & Privacy Card */}
          <section className="bg-white p-6 rounded-3xl soft-cloud-card border border-[#bdc8d1]/30 space-y-4">
            <h3 className="text-[15px] font-bold text-[#131b2e] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00668a]">lock</span>
              <span>ข้อมูลส่วนตัวและการสำรองข้อมูล (Backup)</span>
            </h3>

            <p className="text-[12px] text-[#5f5a7c]">
              ข้อมูลถูกจัดเก็บบนเครื่องของคุณและซิงก์ได้อย่างปลอดภัย คุณสามารถส่งออกหรือนำเข้าไฟล์สำรองข้อมูลได้ตลอดเวลา
            </p>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={exportDataJSON}
                className="w-full py-2.5 px-4 rounded-full bg-[#00668a] text-white hover:bg-[#004965] text-[12px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>ส่งออกข้อมูลทั้งหมด (Export Data JSON)</span>
              </button>

              <label className="w-full py-2.5 px-4 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#00668a] text-[12px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#bdc8d1]/40 block text-center">
                <span className="material-symbols-outlined text-[16px]">upload_file</span>
                <span>นำเข้าข้อมูลสำรอง (Import Data JSON)</span>
                <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
              </label>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
