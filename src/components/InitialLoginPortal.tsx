import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UNIVERSITY_DATABASE, UniversityOption } from '../data/universityDatabase';
import { UniversityTarget } from '../types';
import { COMPANION_AVATAR } from '../data/initialData';

export const InitialLoginPortal: React.FC = () => {
  const {
    currentUser,
    loginWithGoogle,
    isLoggingInWithGoogle,
    firebaseAuthUser,
    completeOnboarding,
    setAuthToast,
    currentTheme,
    setCurrentTheme,
  } = useApp();

  // Multi-step state: 1 = Login with Google, 2 = Select Target (Uni, Faculty, Major)
  const [step, setStep] = useState<1 | 2>(() => {
    return firebaseAuthUser ? 2 : 1;
  });

  const [domainError, setDomainError] = useState<string | null>(null);

  // Step 2: Target Selection states
  const [school, setSchool] = useState(currentUser.school || 'โรงเรียนมัธยมศึกษา');
  const [educationPlan, setEducationPlan] = useState(
    currentUser.educationPlan || 'สายศิลป์-ภาษา / วิทย์-คอมฯ'
  );
  const [gpax, setGpax] = useState(currentUser.gpax ? currentUser.gpax.toString() : '3.50');

  // Cascading University Dropdowns
  const [selectedUniId, setSelectedUniId] = useState<string>(() => {
    const found = UNIVERSITY_DATABASE.find(u => u.name === currentUser.targetUniversity);
    return found ? found.id : UNIVERSITY_DATABASE[0].id;
  });

  const selectedUni: UniversityOption =
    UNIVERSITY_DATABASE.find(u => u.id === selectedUniId) || UNIVERSITY_DATABASE[0];

  const [selectedFacultyName, setSelectedFacultyName] = useState<string>(() => {
    const found = selectedUni.faculties.find(f => f.facultyName === currentUser.targetFaculty);
    return found ? found.facultyName : selectedUni.faculties[0]?.facultyName || '';
  });

  const selectedFaculty =
    selectedUni.faculties.find(f => f.facultyName === selectedFacultyName) ||
    selectedUni.faculties[0];

  const [selectedProgramName, setSelectedProgramName] = useState<string>(() => {
    const found = selectedFaculty?.programs.find(p => p.programName === currentUser.targetProgram);
    return found ? found.programName : selectedFaculty?.programs[0]?.programName || '';
  });

  const selectedProgram =
    selectedFaculty?.programs.find(p => p.programName === selectedProgramName) ||
    selectedFaculty?.programs[0];

  const handleUniChange = (uniId: string) => {
    setSelectedUniId(uniId);
    const uni = UNIVERSITY_DATABASE.find(u => u.id === uniId) || UNIVERSITY_DATABASE[0];
    if (uni.faculties.length > 0) {
      const firstFac = uni.faculties[0];
      setSelectedFacultyName(firstFac.facultyName);
      if (firstFac.programs.length > 0) {
        setSelectedProgramName(firstFac.programs[0].programName);
      }
    }
  };

  const handleFacultyChange = (facName: string) => {
    setSelectedFacultyName(facName);
    const fac = selectedUni.faculties.find(f => f.facultyName === facName);
    if (fac && fac.programs.length > 0) {
      setSelectedProgramName(fac.programs[0].programName);
    }
  };

  // Google Login action
  const handleGoogleSignIn = async () => {
    setDomainError(null);
    try {
      await loginWithGoogle();
      setStep(2);
    } catch (err: any) {
      if (err?.code === 'auth/unauthorized-domain' || String(err?.message || '').includes('unauthorized-domain')) {
        setDomainError('auth/unauthorized-domain');
      }
    }
  };

  // Continue as Guest
  const handleContinueAsGuest = () => {
    setDomainError(null);
    setAuthToast('เข้าใช้งานในโหมดทดลอง (Guest Mode) เรียบร้อย ✨');
    setStep(2);
  };

  // Final Step 2 Submission (instant entry, smooth transition)
  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();

    const targetObj: UniversityTarget = {
      id: `uni-target-${Date.now()}`,
      rank: 1,
      name: selectedUni.name,
      faculty: selectedFaculty?.facultyName || '',
      program: selectedProgram?.programName || '',
      code: selectedProgram?.code || 'TCAS-70',
      round: selectedProgram?.round || 'รอบ 1 Portfolio',
      seats: selectedProgram?.seats || 35,
      applicantRatio: selectedProgram?.applicantRatio || '1:4',
      gpaxRequired: selectedProgram?.gpaxRequired || 2.75,
      readinessPercentage: 85,
      chance: selectedProgram?.chance || 'สูงมาก',
      highlights: selectedProgram?.highlights || ['เกียรติบัตรระดับโรงเรียน/จังหวัด', 'กิจกรรมสร้างสรรค์'],
      criteria: selectedProgram?.criteria || [],
      requiredExams: selectedProgram?.requiredExams || [],
      portfolioTips: selectedProgram?.portfolioTips || [],
      tuitionEstimate: selectedProgram?.tuitionEstimate || 48000,
    };

    const finalName = firebaseAuthUser?.displayName || currentUser.name || 'นักเรียน TCAS70';

    completeOnboarding({
      name: finalName,
      gpax: parseFloat(gpax) || 3.5,
      school: school.trim(),
      educationPlan: educationPlan.trim(),
      university: targetObj,
      theme: currentTheme || 'sky',
    });

    setAuthToast(`ยินดีต้อนรับสู่ TCAS70 Mission Control! ภารกิจ ${selectedUni.name} เริ่มต้นแล้ว 🚀`);
  };

  return (
    <div className="min-h-screen bg-[#e9f2fa] dark:bg-[#07101e] text-[#0f172a] dark:text-slate-100 flex flex-col justify-between selection:bg-[#c4e7ff] selection:text-[#001e2c] transition-colors duration-300">
      {/* Top Navigation Bar (matching image) */}
      <header className="w-full bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md border-b border-[#cde0f0] dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00668a] text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[16px] font-extrabold text-[#0f172a] dark:text-white tracking-tight">
                TCAS70 Mission Control
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#00668a] text-white text-[10px] font-bold">
                {step === 1 ? 'Step 1' : 'Step 2'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              สถานีเตรียมสอบและภารกิจพิชิตมหาวิทยาลัยในฝัน
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Quick theme toggle (light / dark) */}
          <button
            type="button"
            onClick={() => setCurrentTheme(currentTheme === 'sky-dark' ? 'sky' : 'sky-dark')}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors cursor-pointer"
            title="สลับโหมดสว่าง / โหมดมืด"
          >
            <span className="material-symbols-outlined text-[18px]">
              {currentTheme === 'sky-dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleContinueAsGuest()}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[12px] font-bold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>เข้าใช้งานแบบ Guest</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-5xl mx-auto">
          {/* STEP 1: Two Column Layout matching exact user image */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center view-enter">
              {/* Left Column: Mascot Greeting & Mission Motivation */}
              <div className="lg:col-span-6 space-y-4">
                <div className="bg-white dark:bg-[#131f3d] rounded-[32px] p-7 sm:p-8 border border-[#cde0f0] dark:border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
                  {/* Decorative subtle top right cloud */}
                  <div className="absolute top-6 right-6 text-slate-300 dark:text-slate-600 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                    <span className="material-symbols-outlined text-[22px]">cloud</span>
                  </div>

                  {/* Avatar & Badge */}
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={COMPANION_AVATAR}
                        alt="Nong SkyBlue"
                        className="w-16 h-16 rounded-full object-cover ring-4 ring-[#e0f2fe] dark:ring-sky-900 shadow-md"
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-[#00668a] dark:text-sky-300 text-[11px] font-bold">
                        <span>♡</span>
                        <span>น้องสกายบลู (AI Study Buddy)</span>
                      </div>
                      <h4 className="text-[14px] font-extrabold text-[#0f172a] dark:text-white mt-1">
                        พร้อมเคียงข้างทุกก้าว
                      </h4>
                    </div>
                  </div>

                  {/* Headline */}
                  <div className="space-y-2">
                    <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#0f172a] dark:text-white tracking-tight leading-snug">
                      ยินดีต้อนรับกลับสู่การภารกิจพิชิตฝัน TCAS70 ✨
                    </h2>
                  </div>

                  {/* Motivational Quote Card */}
                  <div className="p-5 rounded-2xl bg-[#f4f9fd] dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700/60 text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    “พร้อมเดินทางสู่มหาวิทยาลัยในฝันด้วยกันอีกวันนะ! ก้าวเล็กๆ ที่สม่ำเสมอพาไปถึงจุดหมายแน่นอน 🩵”
                  </div>

                  {/* 2 Stat Boxes side-by-side */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          local_fire_department
                        </span>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold">ความต่อเนื่อง</div>
                        <div className="text-[13px] font-extrabold text-slate-800 dark:text-slate-200">
                          สตรีค 7 วันติด 🔥
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">schedule</span>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold">KKUIC Round 1</div>
                        <div className="text-[13px] font-extrabold text-[#00668a] dark:text-sky-400 font-mono">
                          D-38 วัน
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card bottom notes */}
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      ระบบบันทึกความจำภารกิจอัตโนมัติ
                    </span>
                    <span>TCAS 2027 Ready</span>
                  </div>
                </div>

                {/* Bottom pill tag */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 text-[12px] text-slate-600 dark:text-slate-300 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>เพื่อนๆ TCAS70 ออนไลน์กำลังลุยโจทย์ตอนนี้ <strong className="text-[#00668a] dark:text-sky-400">1,420+ คน</strong></span>
                </div>
              </div>

              {/* Right Column: Sign In Card (Google Only + Guest Option) */}
              <div className="lg:col-span-6">
                <div className="bg-white dark:bg-[#131f3d] rounded-[32px] p-8 sm:p-10 border border-[#cde0f0] dark:border-slate-800 shadow-xl space-y-6">
                  {/* Top Status Header */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-[#00668a] dark:text-sky-300 text-[11px] font-bold border border-sky-200 dark:border-sky-800">
                      <span className="material-symbols-outlined text-[14px]">lock</span>
                      <span>เข้าสู่ระบบสถานีส่วนตัว</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <span>สถานะเซิร์ฟเวอร์: ปกติ</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#0f172a] dark:text-white tracking-tight">
                      เข้าสู่ระบบ (Sign In)
                    </h1>
                    <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
                      เข้าสู่สถานีเตรียมสอบ TCAS70 และ KKUIC ของคุณ
                    </p>
                  </div>

                  {/* Google Sign In Button (Prominent as requested) */}
                  <div className="space-y-3.5 pt-2">
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isLoggingInWithGoogle}
                      className="w-full py-4 px-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 text-slate-800 dark:text-white text-[14px] font-extrabold flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-98"
                    >
                      {isLoggingInWithGoogle ? (
                        <span className="flex items-center gap-2 text-sky-600">
                          <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                          กำลังเชื่อมต่อบัญชี Google...
                        </span>
                      ) : (
                        <>
                          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                          </svg>
                          <span>เข้าสู่ระบบด้วย Google</span>
                        </>
                      )}
                    </button>

                    {/* Vercel / Domain Error Helper Card if unauthorized-domain occurs */}
                    {domainError && (
                      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700/60 text-[12px] space-y-2 animate-in fade-in">
                        <div className="flex items-start gap-2 text-amber-800 dark:text-amber-200 font-bold">
                          <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0">warning</span>
                          <span>ตรวจพบโดเมนยังไม่ได้ลงทะเบียนใน Firebase Console</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                          หากรันบน Vercel ให้เปิด <strong>Firebase Console ➔ Authentication ➔ Settings ➔ Authorized domains</strong> แล้วกด "Add domain" เพิ่ม <code className="bg-amber-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-amber-900 dark:text-amber-300">tcas70-mission-control.vercel.app</code>
                        </p>
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={handleContinueAsGuest}
                            className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[12px] transition-colors cursor-pointer"
                          >
                            เข้าใช้งานแบบ Guest ทันที (ไม่ต้องตั้งค่าโดเมน) ➔
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Alternative Guest Access Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleContinueAsGuest}
                        className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#38bdf8] via-[#0284c7] to-[#00668a] hover:from-sky-400 hover:to-[#0284c7] text-white text-[14px] font-extrabold shadow-md shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                      >
                        <span>เข้าสู่ระบบสถานีภารกิจ (Guest Mode)</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                    </div>

                    <div className="text-center pt-2">
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        🛡️ ปลอดภัยสำหรับเครื่องส่วนตัว • แยกข้อมูลตามบัญชีอัตโนมัติ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: University, Faculty, Major Selection */}
          {step === 2 && (
            <div className="max-w-2xl mx-auto view-enter">
              <form onSubmit={handleFinish} className="bg-white dark:bg-[#131f3d] rounded-[32px] p-8 sm:p-10 border border-[#cde0f0] dark:border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-bold text-[#00668a] dark:text-sky-400 uppercase tracking-wide">
                      ขั้นตอนที่ 2 / 2
                    </span>
                    <h2 className="text-[22px] sm:text-[24px] font-extrabold text-[#0f172a] dark:text-white tracking-tight">
                      เลือกมหาวิทยาลัย คณะ และสาขาวิชา 🎯
                    </h2>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-0.5">
                      สวัสดีคุณ <strong className="text-[#00668a] dark:text-sky-400">{firebaseAuthUser?.displayName || currentUser.name || 'นักเรียน TCAS'}</strong>! เลือกรอบและหลักสูตรเพื่อเตรียมสเปกพอร์ตและแนวข้อสอบ
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">arrow_back</span>
                    <span>ย้อนกลับ</span>
                  </button>
                </div>

                {/* Cascading Selectors */}
                <div className="space-y-4">
                  {/* Dropdown 1: University */}
                  <div>
                    <label className="block text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[#00668a] dark:text-sky-300 flex items-center justify-center text-[10px] font-black">
                        1
                      </span>
                      <span>มหาวิทยาลัยเป้าหมาย</span>
                    </label>
                    <select
                      value={selectedUniId}
                      onChange={e => handleUniChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[13px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer font-bold"
                    >
                      {UNIVERSITY_DATABASE.map(uni => (
                        <option key={uni.id} value={uni.id}>
                          {uni.name} ({uni.shortName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown 2: Faculty */}
                  <div>
                    <label className="block text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[#00668a] dark:text-sky-300 flex items-center justify-center text-[10px] font-black">
                        2
                      </span>
                      <span>คณะ / วิทยาลัย</span>
                    </label>
                    <select
                      value={selectedFacultyName}
                      onChange={e => handleFacultyChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[13px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer font-medium"
                    >
                      {selectedUni.faculties.map((fac, idx) => (
                        <option key={idx} value={fac.facultyName}>
                          {fac.facultyName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown 3: Major */}
                  <div>
                    <label className="block text-[12px] font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-[#00668a] dark:text-sky-300 flex items-center justify-center text-[10px] font-black">
                        3
                      </span>
                      <span>สาขาวิชา / หลักสูตร</span>
                    </label>
                    <select
                      value={selectedProgramName}
                      onChange={e => setSelectedProgramName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[13px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer font-medium"
                    >
                      {selectedFaculty?.programs.map((prog, idx) => (
                        <option key={idx} value={prog.programName}>
                          {prog.programName} ({prog.round})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Target Spec Preview Box */}
                {selectedProgram && (
                  <div className="p-4 rounded-2xl bg-[#e9f2fa] dark:bg-slate-800/70 border border-[#cde0f0] dark:border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#00668a] dark:text-sky-300 uppercase tracking-wide">
                        สเปกเป้าหมายของสาขานี้
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white dark:bg-slate-900 text-[#00668a] dark:text-sky-400 text-[10px] font-extrabold border border-sky-200 dark:border-slate-700">
                        {selectedProgram.round}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 font-bold">จำนวนรับ</div>
                        <div className="text-[13px] font-extrabold text-[#00668a] dark:text-sky-400">
                          {selectedProgram.seats} ที่นั่ง
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 font-bold">GPAX ขั้นต่ำ</div>
                        <div className="text-[13px] font-extrabold text-[#00668a] dark:text-sky-400 font-mono">
                          {selectedProgram.gpaxRequired.toFixed(2)}
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 font-bold">อัตราแข่งขัน</div>
                        <div className="text-[13px] font-extrabold text-amber-600 dark:text-amber-400">
                          {selectedProgram.applicantRatio}
                        </div>
                      </div>
                    </div>

                    {selectedProgram.requiredExams && selectedProgram.requiredExams.length > 0 && (
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                        <strong className="block text-slate-800 dark:text-slate-200">ข้อสอบที่ต้องใช้:</strong>
                        <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400">
                          {selectedProgram.requiredExams.map((exam, i) => (
                            <li key={i} className="truncate">{exam}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* School & GPAX */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      โรงเรียนของคุณ
                    </label>
                    <input
                      type="text"
                      value={school}
                      onChange={e => setSchool(e.target.value)}
                      placeholder="เช่น ขอนแก่นวิทยายน"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[12px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      เกรดเฉลี่ย GPAX สะสม
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="1.00"
                      max="4.00"
                      value={gpax}
                      onChange={e => setGpax(e.target.value)}
                      placeholder="3.50"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[12px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400 font-mono"
                    />
                  </div>
                </div>

                {/* Action Finish Button - Instant Entry */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#38bdf8] via-[#0284c7] to-[#00668a] hover:from-sky-400 hover:to-[#0284c7] text-white text-[14px] font-extrabold shadow-lg shadow-sky-500/20 transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>ยืนยันเป้าหมายและเริ่มเข้าสู่ระบบทันที</span>
                    <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                  </button>
                  <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-2">
                    *สามารถสลับโหมดสว่าง/โหมดมืดได้ตลอดเวลาที่ไอคอนพระอาทิตย์/พระจันทร์
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Footer matching image */}
      <footer className="w-full border-t border-[#cde0f0] dark:border-slate-800 py-4 px-4 sm:px-8 text-center sm:flex sm:justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <div>© 2025 TCAS70 Mission Control. Built with soft sky optimism for Thai high school fighters.</div>
        <div className="flex justify-center gap-4 mt-2 sm:mt-0">
          <span>TCAS Regulations</span>
          <span>•</span>
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
          <span>•</span>
          <span>Study Companion FAQ</span>
        </div>
      </footer>
    </div>
  );
};
