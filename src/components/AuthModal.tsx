import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setAuthModalOpen, login, register, loginWithGoogle, isLoggingInWithGoogle, allUsers, switchUser, currentUser } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [targetUniversity, setTargetUniversity] = useState('มหาวิทยาลัยขอนแก่น (KKUIC)');
  const [targetProgram, setTargetProgram] = useState('สาขาวิชาเทคโนโลยีสื่อสร้างสรรค์ (Creative Media Technology)');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'login') {
      if (!email || !password) {
        setErrorMsg('กรุณากรอกอีเมลและรหัสผ่าน');
        return;
      }
      const success = login(email, password);
      if (!success) {
        setErrorMsg('ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบอีเมลหรือรหัสผ่าน');
      }
    } else {
      if (!name || !email || !password) {
        setErrorMsg('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
        return;
      }
      if (password.length < 4) {
        setErrorMsg('รหัสผ่านควรมีความยาวอย่างน้อย 4 ตัวอักษร');
        return;
      }
      const success = register(name, email, password, school, targetUniversity, targetProgram);
      if (!success) {
        setErrorMsg('อีเมลนี้มีอยู่ในระบบแล้ว');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 card-sky-shadow border border-[#bdc8d1]/40 relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Subtle Decorative Aura */}
        <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#c4e7ff]/50 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-[#dcd5fd]/40 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#5f5a7c] hover:text-[#131b2e] flex items-center justify-center transition-all cursor-pointer"
          title="ปิด"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#c4e7ff] text-[#00668a] mb-3 shadow-xs">
            <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              school
            </span>
          </div>
          <h2 className="text-[22px] font-bold text-[#131b2e] tracking-tight">
            {mode === 'login' ? 'เข้าสู่ระบบ TCAS70 Mission' : 'สร้างบัญชีนักเรียนใหม่'}
          </h2>
          <p className="text-[13px] text-[#5f5a7c] mt-1">
            {mode === 'login'
              ? 'บันทึกเป้าหมายและการอ่านหนังสือ ซิงก์ข้อมูลตรงกับทุกอุปกรณ์'
              : 'เริ่มต้นสร้างแผนสู่รั้วมหาวิทยาลัยในฝันไปด้วยกัน ✨'}
          </p>
        </div>

        {/* Tabs: Login vs Register */}
        <div className="flex bg-[#f2f3ff] p-1 rounded-full mb-5">
          <button
            type="button"
            onClick={() => { setMode('login'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
              mode === 'login' ? 'bg-white text-[#00668a] shadow-xs' : 'text-[#5f5a7c] hover:text-[#131b2e]'
            }`}
          >
            เข้าสู่ระบบ
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
              mode === 'register' ? 'bg-white text-[#00668a] shadow-xs' : 'text-[#5f5a7c] hover:text-[#131b2e]'
            }`}
          >
            สมัครสมาชิกใหม่
          </button>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[12px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">error</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'register' && (
            <div>
              <label className="block text-[12px] font-bold text-[#3e484f] mb-1">ชื่อ-นามสกุล / ชื่อเล่น</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="เช่น มิว สู้เพื่อฝัน"
                className="w-full px-3.5 py-2 text-[14px] bg-[#f2f3ff]/70 border border-[#bdc8d1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white text-[#131b2e] placeholder:text-[#6e7980] transition-all"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-[12px] font-bold text-[#3e484f] mb-1">อีเมล (Email)</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="student@example.com"
              className="w-full px-3.5 py-2 text-[14px] bg-[#f2f3ff]/70 border border-[#bdc8d1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white text-[#131b2e] placeholder:text-[#6e7980] transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#3e484f] mb-1">รหัสผ่าน (Password)</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 text-[14px] bg-[#f2f3ff]/70 border border-[#bdc8d1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white text-[#131b2e] placeholder:text-[#6e7980] transition-all"
              required
            />
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block text-[12px] font-bold text-[#3e484f] mb-1">โรงเรียนที่กำลังศึกษา</label>
                <input
                  type="text"
                  value={school}
                  onChange={e => setSchool(e.target.value)}
                  placeholder="เช่น โรงเรียนขอนแก่นวิทยายน"
                  className="w-full px-3.5 py-2 text-[14px] bg-[#f2f3ff]/70 border border-[#bdc8d1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white text-[#131b2e] placeholder:text-[#6e7980] transition-all"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#3e484f] mb-1">เป้าหมายมหาวิทยาลัยหลัก</label>
                <select
                  value={targetUniversity}
                  onChange={e => setTargetUniversity(e.target.value)}
                  className="w-full px-3.5 py-2 text-[13px] bg-[#f2f3ff]/70 border border-[#bdc8d1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white text-[#131b2e] transition-all"
                >
                  <option value="มหาวิทยาลัยขอนแก่น (KKUIC)">มหาวิทยาลัยขอนแก่น (KKUIC) - วิทยาลัยนานาชาติ</option>
                  <option value="มหาวิทยาลัยเชียงใหม่ (CMU)">มหาวิทยาลัยเชียงใหม่ (CMU) - การสื่อสารมวลชน</option>
                  <option value="มหาวิทยาลัยศรีนครินทรวิโรฒ (SWU)">มหาวิทยาลัยศรีนครินทรวิโรฒ (SWU) - COSCI</option>
                  <option value="จุฬาลงกรณ์มหาวิทยาลัย">จุฬาลงกรณ์มหาวิทยาลัย - นิเทศศาสตร์</option>
                  <option value="มหาวิทยาลัยธรรมศาสตร์">มหาวิทยาลัยธรรมศาสตร์ - วารสารศาสตร์</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-2.5 mt-2 bg-[#00668a] hover:bg-[#004965] text-white text-[14px] font-bold rounded-full shadow-md active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{mode === 'login' ? 'เข้าสู่ระบบทันที' : 'ลงทะเบียนและเริ่มใช้งาน'}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#bdc8d1]/40" />
          </div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
            <span className="bg-white px-3 text-[#5f5a7c]">หรือ</span>
          </div>
        </div>

        {/* Firebase Connected Indicator Badge */}
        <div className="mb-3.5 px-3 py-2 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-900 text-[11px] flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="material-symbols-outlined text-[15px] text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <span>Firebase: TCAS70-Mission-Control</span>
          </div>
          <span className="text-[10px] text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            เชื่อมต่อแล้ว
          </span>
        </div>

        {/* One-Click Google Login Button */}
        <button
          type="button"
          onClick={() => loginWithGoogle()}
          disabled={isLoggingInWithGoogle}
          className="w-full py-2.5 px-4 bg-white border border-[#bdc8d1] hover:bg-[#f2f3ff] text-[#131b2e] text-[13px] font-bold rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoggingInWithGoogle ? (
            <div className="flex items-center gap-2 text-[#00668a]">
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
              <span>กำลังเปิดหน้าต่าง Google Sign-In...</span>
            </div>
          ) : (
            <>
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>เข้าสู่ระบบด้วย Google (Google Sign-In)</span>
            </>
          )}
        </button>

        {/* Existing Accounts quick switcher */}
        {allUsers.length > 1 && (
          <div className="mt-5 pt-4 border-t border-[#bdc8d1]/30">
            <span className="text-[11px] font-bold text-[#5f5a7c] block mb-2 text-center">สลับบัญชีในเครื่องนี้:</span>
            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {allUsers.map(u => (
                <div
                  key={u.id}
                  onClick={() => switchUser(u.id)}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer text-[12px] transition-colors ${
                    u.id === currentUser.id ? 'bg-[#c4e7ff]/50 font-bold text-[#00668a]' : 'hover:bg-[#f2f3ff] text-[#3e484f]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <img src={u.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                    <span className="truncate">{u.name} ({u.email})</span>
                  </div>
                  {u.id === currentUser.id && (
                    <span className="material-symbols-outlined text-[16px] text-[#00668a]">check</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
