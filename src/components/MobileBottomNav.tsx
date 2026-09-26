import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setAiChatOpen } = useApp();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const mainTabs = [
    { id: 'dashboard', label: 'หน้าหลัก', icon: 'dashboard' },
    { id: 'university', label: 'มหาลัย', icon: 'school' },
    { id: 'portfolio', label: 'พอร์ต', icon: 'folder_special' },
    { id: 'exams', label: 'ข้อสอบ', icon: 'assignment' },
    { id: 'finance', label: 'การเงิน', icon: 'payments' },
  ];

  const moreTabs = [
    { id: 'today', label: 'ภารกิจวันนี้ (Today)', icon: 'today', desc: 'รายการสิ่งที่ต้องทำและตัวจับเวลา Pomodoro' },
    { id: 'english', label: 'คลังคำศัพท์ (Vocab)', icon: 'translate', desc: 'ท่องศัพท์ TGAT 1 และข้อสอบนานาชาติ' },
    { id: 'interview', label: 'ซ้อมสัมภาษณ์ (Interview)', icon: 'record_voice_over', desc: 'คลังคำถามและแนวการตอบ' },
    { id: 'plan', label: 'แผนเตรียมตัว (Study Plan)', icon: 'event_note', desc: 'ไทม์ไลน์และตารางสรุป 4 ปี' },
    { id: 'settings', label: 'ตั้งค่าโปรไฟล์ (Profile)', icon: 'settings', desc: 'ข้อมูลส่วนตัวและเป้าหมาย' },
  ];

  return (
    <>
      {/* Slide-up More Sheet */}
      {isMoreMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-150">
          <div className="bg-white rounded-t-3xl p-5 border-t border-[#c4e7ff] shadow-2xl space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#bdc8d1]/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00668a]">grid_view</span>
                <span className="font-extrabold text-[15px] text-[#131b2e]">เมนูเครื่องมือทั้งหมด</span>
              </div>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="p-1 rounded-full text-[#6e7980] hover:bg-[#f2f3ff] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {moreTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMoreMenuOpen(false);
                  }}
                  className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#f0f9ff] border-[#00668a] text-[#00668a]'
                      : 'bg-[#faf8ff] border-[#bdc8d1]/30 hover:bg-[#f2f3ff] text-[#131b2e]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px] text-[#00668a] shrink-0 mt-0.5">
                    {tab.icon}
                  </span>
                  <div>
                    <div className="font-bold text-[13px]">{tab.label}</div>
                    <div className="text-[11px] text-[#5f5a7c] line-clamp-1">{tab.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#bdc8d1]/20">
              <button
                onClick={() => {
                  setAiChatOpen(true);
                  setIsMoreMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-[#00668a] to-[#38bdf8] text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                <span>แชทปรึกษาน้องสกายบลู (AI Companion)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#c4e7ff] px-2 py-1 flex justify-around items-center shadow-lg select-none">
        {mainTabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all relative cursor-pointer ${
                isActive ? 'text-[#00668a] font-bold' : 'text-[#5f5a7c] hover:text-[#131b2e]'
              }`}
            >
              {isActive && (
                <span className="w-8 h-1 bg-[#38bdf8] rounded-full absolute -top-1 animate-in fade-in" />
              )}
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {tab.icon}
              </span>
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setIsMoreMenuOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all relative cursor-pointer ${
            moreTabs.some(t => t.id === activeTab) ? 'text-[#00668a] font-bold' : 'text-[#5f5a7c] hover:text-[#131b2e]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">more_horiz</span>
          <span className="text-[10px] mt-0.5">เพิ่มเติม</span>
        </button>
      </nav>
    </>
  );
};
