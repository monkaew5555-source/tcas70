import React from 'react';
import { useApp } from '../context/AppContext';
import { COMPANION_AVATAR } from '../data/initialData';

export const SideNavBar: React.FC = () => {
  const { activeTab, setActiveTab, setAuthModalOpen, tasks, achievements } = useApp();

  const pendingCount = tasks.filter(t => t.status !== 'completed').length;
  const unlockedBadgesCount = achievements.filter(t => t.isUnlocked).length;

  const navItems = [
    { id: 'dashboard', label: 'หน้าหลัก & เหรียญตรา', icon: 'dashboard', badge: `${unlockedBadgesCount} เหรียญ` },
    { id: 'today', label: 'วันนี้', icon: 'today', badge: `${pendingCount} งาน` },
    { id: 'plan', label: 'แผนการเรียน', icon: 'event_note' },
    { id: 'university', label: 'มหาวิทยาลัย', icon: 'school' },
    { id: 'portfolio', label: 'พอร์ตโฟลิโอ', icon: 'folder_special' },
    { id: 'exams', label: 'คลังข้อสอบ', icon: 'history_edu' },
    { id: 'english', label: 'ภาษาอังกฤษ', icon: 'translate' },
    { id: 'interview', label: 'เตรียมสัมภาษณ์', icon: 'record_voice_over' },
    { id: 'finance', label: 'การเงิน', icon: 'payments' },
    { id: 'settings', label: 'ตั้งค่า', icon: 'settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full z-40 bg-white border-r border-[#bdc8d1]/30 shadow-sm h-screen w-64 flex flex-col justify-between rounded-r-2xl select-none hidden lg:flex">
      {/* Upper Section */}
      <div className="flex flex-col">
        {/* Logo & Mini Header */}
        <div className="p-5 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#c4e7ff] flex items-center justify-center text-[#00668a] shadow-xs ring-2 ring-[#00668a]/10">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                school
              </span>
            </div>
            <div>
              <div className="text-[18px] font-extrabold text-[#00668a] tracking-tight">TCAS70 Mission</div>
              <div className="text-[11px] font-bold text-[#5f5a7c]">สู้เพื่อฝัน KKUIC ✦</div>
            </div>
          </div>
        </div>

        {/* Companion Mini Banner Card */}
        <div className="mx-3 mb-2 p-2.5 rounded-2xl bg-[#f2f3ff] border border-[#c4e7ff]/60 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[#38bdf8] shadow-xs shrink-0 bg-[#c4e7ff]">
            <img src={COMPANION_AVATAR} alt="Companion" className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22c990] ring-2 ring-white" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[12px] font-bold text-[#131b2e] truncate">น้องสกายบลู (ผู้ช่วย)</div>
            <div className="text-[11px] text-[#00668a] flex items-center gap-1 font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00668a] animate-pulse" />
              พร้อมลุยไปด้วยกันนะ!
            </div>
          </div>
        </div>

        {/* Main Navigation Links */}
        <nav className="px-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-270px)] pr-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-full transition-all text-left cursor-pointer active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#c4e7ff] text-[#001e2c] font-bold shadow-xs'
                    : 'text-[#3e484f] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#00668a]' : 'text-[#6e7980]'}`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                <span className="text-[13px] flex-1">{item.label}</span>
                {item.badge && !isActive && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#f2f3ff] text-[#5f5a7c] border border-[#bdc8d1]/30">
                    {item.badge}
                  </span>
                )}
                {item.badge && isActive && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#00668a] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Lower Section: Action CTA + Help/Logout Footer */}
      <div className="p-3 pt-2 space-y-2 border-t border-[#bdc8d1]/30">
        <button
          onClick={() => setActiveTab('today')}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#00668a] text-white font-bold text-[13px] shadow-sm hover:bg-[#004965] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_task</span>
          <span>บันทึกการอ่านหนังสือ</span>
        </button>

        <div className="flex items-center justify-between px-1 pt-1">
          <button
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-1.5 text-[#3e484f] hover:text-[#00668a] transition-colors text-[12px] font-bold py-1 px-2 rounded-lg cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span>ช่วยเหลือ</span>
          </button>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="flex items-center gap-1.5 text-[#5f5a7c] hover:text-rose-600 transition-colors text-[12px] font-bold py-1 px-2 rounded-lg cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>จัดการบัญชี</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
