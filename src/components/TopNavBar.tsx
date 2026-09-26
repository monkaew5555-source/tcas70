import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { THEME_OPTIONS } from '../data/themesData';

export const TopNavBar: React.FC = () => {
  const {
    currentUser,
    setAuthModalOpen,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    searchResults,
    energyMode,
    setEnergyMode,
    universities,
    currentPrimaryTarget,
    setPrimaryTarget,
    lastSyncedText,
    logout,
    firebaseAuthUser,
    currentTheme,
    setCurrentTheme,
    isParticleEnabled,
    setIsParticleEnabled,
    openOnboardingPortal
  } = useApp();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isEnergyMenuOpen, setIsEnergyMenuOpen] = useState(false);
  const [isTargetMenuOpen, setIsTargetMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSearchResult = (tab: string) => {
    setActiveTab(tab);
    setIsSearchFocused(false);
  };

  return (
    <header className="docked full-width top-0 sticky z-30 bg-[#faf8ff]/85 backdrop-blur-md border-b border-[#bdc8d1]/30 shadow-xs flex justify-between items-center w-full px-4 sm:px-6 py-2.5 sm:py-3 select-none">
      {/* Left: Search Bar & Greeting */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-2xl">
        <div ref={searchRef} className="relative w-full max-w-xs sm:max-w-md">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6e7980] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="ค้นหาภารกิจ, วิชา, หรือเกณฑ์..."
            className="w-full pl-10 pr-9 py-1.5 sm:py-2 bg-[#f2f3ff] rounded-full border border-[#c4e7ff]/60 text-[13px] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:border-[#00668a] focus:bg-white transition-all placeholder:text-[#6e7980]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6e7980] hover:text-[#131b2e] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          )}

          {/* Search Live Results Dropdown */}
          {isSearchFocused && searchQuery.trim() && (
            <div className="absolute left-0 top-full mt-2 w-full sm:w-[420px] bg-white rounded-2xl p-3 shadow-xl border border-[#bdc8d1]/50 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-2 pb-2 border-b border-[#bdc8d1]/20">
                <span className="text-[11px] font-bold text-[#5f5a7c] uppercase">
                  ผลการค้นหา ({searchResults.length} รายการ)
                </span>
                <span className="text-[10px] text-[#00668a] font-medium">กดเพื่อไปยังหน้านั้น</span>
              </div>
              <div className="mt-2 max-h-72 overflow-y-auto space-y-1">
                {searchResults.length > 0 ? (
                  searchResults.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectSearchResult(item.tab)}
                      className="p-2 rounded-xl hover:bg-[#f2f3ff] cursor-pointer transition-colors flex items-start gap-2.5 text-left group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#c4e7ff] text-[#00668a] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#38bdf8] transition-colors">
                        <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[13px] font-bold text-[#131b2e] group-hover:text-[#00668a] truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] text-[#5f5a7c] px-1.5 py-0.2 bg-[#eaedff] rounded-md shrink-0">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5f5a7c] line-clamp-1 mt-0.5">{item.snippet}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-6 text-center text-[#5f5a7c]">
                    <span className="material-symbols-outlined text-[24px] text-[#bdc8d1] block mb-1">search_off</span>
                    <p className="text-[12px]">ไม่พบข้อมูลที่ตรงกับ "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Motivational Greeting on wide screens */}
        <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-[#bdc8d1]/40">
          <span className="text-[14px] font-bold text-[#131b2e]">สวัสดี 👋 วันนี้เรามาทำอะไรให้อนาคตกันดี?</span>
        </div>
      </div>

      {/* Right: Actions, Sync Badge, Energy Mode, Trailing Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Cloud Sync Status Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#68fcbf]/30 text-[#006c4b] text-[12px] font-bold border border-[#22c990]/40 shadow-xs">
          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            cloud_done
          </span>
          <span>{lastSyncedText}</span>
        </div>

        {/* Energy Day Toggle Mode (วันปกติ / พลังน้อย / ตามงาน) */}
        <div className="relative">
          <button
            onClick={() => { setIsEnergyMenuOpen(!isEnergyMenuOpen); setIsTargetMenuOpen(false); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#bdc8d1]/50 text-[#131b2e] text-[12px] font-bold shadow-xs hover:bg-[#f2f3ff] transition-colors cursor-pointer"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                energyMode === 'normal' ? 'bg-[#22c990]' : energyMode === 'low' ? 'bg-amber-400' : 'bg-purple-500'
              }`}
            />
            <span>
              {energyMode === 'normal' ? 'วันปกติ' : energyMode === 'low' ? 'วันที่พลังน้อย' : 'วันตามงานค้าง'} ▾
            </span>
          </button>

          {isEnergyMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl p-2 shadow-xl border border-[#bdc8d1]/40 z-50 space-y-1">
              <button
                onClick={() => { setEnergyMode('normal'); setIsEnergyMenuOpen(false); }}
                className={`w-full text-left p-2 rounded-xl text-[12px] font-bold flex items-center gap-2 cursor-pointer ${
                  energyMode === 'normal' ? 'bg-[#c4e7ff]/40 text-[#00668a]' : 'hover:bg-[#f2f3ff] text-[#3e484f]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c990]" />
                <span>วันปกติ (เต็มสูบ 4-5 งาน)</span>
              </button>
              <button
                onClick={() => { setEnergyMode('low'); setIsEnergyMenuOpen(false); }}
                className={`w-full text-left p-2 rounded-xl text-[12px] font-bold flex items-center gap-2 cursor-pointer ${
                  energyMode === 'low' ? 'bg-amber-50 text-amber-700' : 'hover:bg-[#f2f3ff] text-[#3e484f]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>วันที่พลังน้อย (1-2 งานจิ๋ว)</span>
              </button>
              <button
                onClick={() => { setEnergyMode('catchup'); setIsEnergyMenuOpen(false); }}
                className={`w-full text-left p-2 rounded-xl text-[12px] font-bold flex items-center gap-2 cursor-pointer ${
                  energyMode === 'catchup' ? 'bg-purple-50 text-purple-700' : 'hover:bg-[#f2f3ff] text-[#3e484f]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>วันตามงานค้าง (เคลียร์งาน)</span>
              </button>
            </div>
          )}
        </div>

        {/* Target Shortcut Trailing Button */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => { setIsTargetMenuOpen(!isTargetMenuOpen); setIsEnergyMenuOpen(false); }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38bdf8]/15 text-[#00668a] border border-[#38bdf8]/40 text-[12px] font-bold hover:bg-[#38bdf8]/25 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">flag</span>
            <span>เป้าหมายหลัก: {currentPrimaryTarget.name.replace(' (KKUIC)', '')} ▾</span>
          </button>

          {isTargetMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl p-2.5 shadow-xl border border-[#bdc8d1]/40 z-50 space-y-1.5">
              <span className="text-[11px] font-bold text-[#5f5a7c] px-2 block">เลือกมหาวิทยาลัยเป้าหมายหลัก:</span>
              {universities.map(u => (
                <button
                  key={u.id}
                  onClick={() => { setPrimaryTarget(u.id); setIsTargetMenuOpen(false); }}
                  className={`w-full text-left p-2 rounded-xl text-[12px] transition-all cursor-pointer flex items-center justify-between ${
                    u.rank === 1 ? 'bg-[#c4e7ff] text-[#00668a] font-bold' : 'hover:bg-[#f2f3ff] text-[#3e484f]'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="truncate">{u.name}</div>
                    <div className="text-[10px] text-[#5f5a7c] truncate">{u.program}</div>
                  </div>
                  {u.rank === 1 && <span className="material-symbols-outlined text-[16px]">check</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications & Help */}
        <div className="flex items-center gap-1 text-[#3e484f] border-l border-[#bdc8d1]/40 pl-2">
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#e2e7ff] hover:text-[#00668a] transition-colors relative cursor-pointer"
              title="การแจ้งเตือน"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {isNotificationOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-2xl p-3 shadow-xl border border-[#bdc8d1]/40 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#bdc8d1]/20">
                  <span className="text-[12px] font-bold text-[#131b2e]">การแจ้งเตือนสำคัญ</span>
                  <span className="text-[10px] text-[#00668a] font-semibold">TCAS70</span>
                </div>
                <div className="mt-2 space-y-2 text-[12px]">
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-amber-900">
                    <strong className="block text-[11px] text-amber-800">⏰ เดดไลน์ใกล้ที่สุด (อีก 14 วัน)</strong>
                    ยื่นตรวจฉบับร่าง Portfolio 10 หน้า KKUIC
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#c4e7ff]/40 border border-[#c4e7ff] text-[#004c69]">
                    <strong className="block text-[11px] text-[#00668a]">✨ ทบทวนคำศัพท์วันนี้</strong>
                    มีคำศัพท์พร้อมรีวิวในระบบ Spaced Repetition 5 คำ
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Theme Selector Button & Dropdown (12 Themes) */}
          <div ref={themeMenuRef} className="relative">
            <button
              onClick={() => { setIsThemeMenuOpen(!isThemeMenuOpen); setIsNotificationOpen(false); }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors relative cursor-pointer ${
                isThemeMenuOpen ? 'bg-sky-500 text-white' : 'hover:bg-[#e2e7ff] text-[#3e484f] hover:text-[#00668a]'
              }`}
              title="เปลี่ยนธีมสี (12 สไตล์) & พาติเคิล"
            >
              <span className="material-symbols-outlined text-[20px]">palette</span>
            </button>

            {isThemeMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-[#0f172a] rounded-3xl p-4 shadow-2xl border border-[#bdc8d1]/40 dark:border-slate-800 z-50 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#bdc8d1]/20 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sky-500 text-[18px]">palette</span>
                    <span className="text-[12px] font-extrabold text-[#131b2e] dark:text-white">เลือกธีมสี (12 ธีม)</span>
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    <input
                      type="checkbox"
                      checked={isParticleEnabled}
                      onChange={e => setIsParticleEnabled(e.target.checked)}
                      className="w-3.5 h-3.5 text-sky-600 rounded"
                    />
                    <span>✨ พาติเคิล</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {THEME_OPTIONS.map(theme => {
                    const isSelected = currentTheme === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => { setCurrentTheme(theme.id); }}
                        className={`p-2 rounded-xl text-left border flex items-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-2 border-sky-500 bg-sky-50/70 dark:bg-sky-950/60 font-bold shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full shrink-0 border border-black/10 shadow-xs"
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] text-[#131b2e] dark:text-white truncate font-bold">
                            {theme.name}
                          </div>
                          <div className="text-[9px] text-slate-400 truncate">
                            {theme.badge}
                          </div>
                        </div>
                        {isSelected && <span className="text-sky-500 text-[11px] font-black shrink-0">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab('settings')}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#e2e7ff] hover:text-[#00668a] transition-colors cursor-pointer"
            title="ข้อเสนอแนะและช่วยเหลือ"
          >
            <span className="material-symbols-outlined text-[20px]">help_outline</span>
          </button>
        </div>

        {/* User Profile Avatar Pill with Dropdown Menu */}
        <div ref={userMenuRef} className="relative flex items-center gap-2 pl-2">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-[#f2f3ff] transition-all cursor-pointer group"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full ring-2 ring-[#38bdf8] overflow-hidden bg-[#c4e7ff] shrink-0">
              <img src={currentUser.avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block text-left pr-1">
              <div className="text-[12px] font-bold text-[#131b2e] leading-tight truncate max-w-[120px]">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-[#5f5a7c] leading-tight truncate">
                {currentUser.targetRound}
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#5f5a7c]">expand_more</span>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl p-3 shadow-xl border border-[#bdc8d1]/40 z-50 space-y-2">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#bdc8d1]/20">
                <img src={currentUser.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-[#38bdf8]" />
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-[#131b2e] truncate">{currentUser.name}</div>
                  <div className="text-[11px] text-[#5f5a7c] truncate">{currentUser.email}</div>
                  <span className="inline-block mt-0.5 text-[10px] px-2 py-0.2 rounded-full bg-[#c4e7ff] text-[#00668a] font-bold">
                    {currentUser.googleSynced ? 'เชื่อมกับ Google แล้ว' : 'บัญชีนักเรียน'}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-[12px]">
                <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/50 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 font-bold text-amber-900">
                    <span className="material-symbols-outlined text-[14px] text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                      local_fire_department
                    </span>
                    Firebase
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-md font-bold">
                    TCAS70 Connected
                  </span>
                </div>
                <button
                  onClick={() => { openOnboardingPortal(); setIsUserMenuOpen(false); }}
                  className="w-full text-left p-2 rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/40 flex items-center gap-2 text-sky-700 dark:text-sky-300 font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  <span>เปลี่ยนมหาวิทยาลัย / หน้าตั้งค่าแรก</span>
                </button>
                <button
                  onClick={() => { setActiveTab('settings'); setIsUserMenuOpen(false); }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[#f2f3ff] flex items-center gap-2 text-[#3e484f] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">settings</span>
                  <span>ตั้งค่าโปรไฟล์ & การแจ้งเตือน</span>
                </button>
                <button
                  onClick={() => { setAuthModalOpen(true); setIsUserMenuOpen(false); }}
                  className="w-full text-left p-2 rounded-xl hover:bg-[#f2f3ff] flex items-center gap-2 text-[#00668a] font-bold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                  <span>{firebaseAuthUser ? 'สลับบัญชี Google' : 'เข้าสู่ระบบด้วย Google'}</span>
                </button>
                <button
                  onClick={async () => {
                    await logout();
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left p-2 rounded-xl hover:bg-rose-50 flex items-center gap-2 text-rose-600 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
