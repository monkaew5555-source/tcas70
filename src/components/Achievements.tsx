import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AchievementBadge, BadgeCategory } from '../types';
import { COMPANION_AVATAR } from '../data/initialData';

interface AchievementsProps {
  variant?: 'dashboard' | 'full';
  onNavigateToTab?: (tab: string) => void;
}

export const Achievements: React.FC<AchievementsProps> = ({ variant = 'dashboard', onNavigateToTab }) => {
  const { achievements, claimBadgeReward, currentUser, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(variant === 'full');
  const [justClaimedId, setJustClaimedId] = useState<string | null>(null);

  const navigate = onNavigateToTab || setActiveTab;

  // Calculations
  const totalBadges = achievements.length;
  const unlockedBadges = achievements.filter(b => b.isUnlocked);
  const unlockedCount = unlockedBadges.length;
  const unclaimedCount = achievements.filter(b => b.isUnlocked && !b.claimed).length;
  const completionPercentage = Math.round((unlockedCount / totalBadges) * 100);

  // Total EXP earned from achievements
  const totalExpEarned = unlockedBadges.reduce((acc, b) => acc + (b.claimed ? b.rewardExp : 0), 0);

  // Filtered badges
  const filteredBadges = achievements.filter(badge => {
    // Category match
    if (selectedCategory !== 'all' && badge.category !== selectedCategory) {
      return false;
    }
    // Status match
    if (filterStatus === 'unlocked' && !badge.isUnlocked) return false;
    if (filterStatus === 'locked' && badge.isUnlocked) return false;
    return true;
  });

  // Display badges in dashboard mode (show 4-6 badges if collapsed, all if expanded)
  const displayBadges = isExpanded ? filteredBadges : filteredBadges.slice(0, 4);

  const handleClaim = (badge: AchievementBadge, e: React.MouseEvent) => {
    e.stopPropagation();
    setJustClaimedId(badge.id);
    claimBadgeReward(badge.id);
    setTimeout(() => {
      setJustClaimedId(null);
    }, 1500);
  };

  const getRarityBadge = (rarity: AchievementBadge['rarity']) => {
    switch (rarity) {
      case 'legendary':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1 shadow-xs">
            <span className="material-symbols-outlined text-[12px] text-amber-600" style={{ fontVariationSettings: "'FILL' 1" }}>
              stars
            </span>
            ระดับตำนาน (Legendary)
          </span>
        );
      case 'epic':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px] text-purple-600" style={{ fontVariationSettings: "'FILL' 1" }}>
              diamond
            </span>
            ระดับสูง (Epic)
          </span>
        );
      case 'rare':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px] text-sky-600" style={{ fontVariationSettings: "'FILL' 1" }}>
              award_star
            </span>
            หายาก (Rare)
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">verified</span>
            ทั่วไป (Common)
          </span>
        );
    }
  };

  return (
    <section className="rounded-3xl p-5 sm:p-6 bg-white border border-[#bdc8d1]/30 card-sky-shadow inner-specular relative overflow-hidden transition-all duration-300">
      {/* Background Decorative Glow */}
      <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 -bottom-20 w-64 h-64 rounded-full bg-[#38bdf8]/10 blur-3xl pointer-events-none" />

      {/* Header Zone */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#bdc8d1]/25">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              military_tech
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#131b2e] tracking-tight">
                เหรียญตรา & ความสำเร็จการเรียน (Study Milestones)
              </h2>
              {unclaimedCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[11px] font-bold animate-pulse shadow-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">redeem</span>
                  รอเคลม {unclaimedCount} รางวัล!
                </span>
              )}
            </div>
            <p className="text-[12px] sm:text-[13px] text-[#5f5a7c]">
              พิชิตเป้าหมายรายก้าว เก็บเหรียญรางวัล เพิ่ม EXP สู่รั้ว มข. KKUIC ✦
            </p>
          </div>
        </div>

        {/* Milestone Quick Stats Bar */}
        <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
          <div className="px-3 py-1.5 rounded-2xl bg-[#f2f3ff] border border-[#c4e7ff]/70 flex items-center gap-2 text-[12px]">
            <span className="text-[#5f5a7c] font-semibold">ปลดล็อกแล้ว:</span>
            <span className="font-extrabold text-[#00668a]">
              {unlockedCount} / {totalBadges}
            </span>
            <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-md">
              {completionPercentage}%
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center gap-1.5 text-[12px] text-amber-800 font-bold">
            <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
              bolt
            </span>
            <span>+{totalExpEarned.toLocaleString()} EXP</span>
          </div>

          {variant === 'dashboard' && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1.5 rounded-2xl bg-[#00668a]/10 hover:bg-[#00668a]/15 text-[#00668a] text-[12px] font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <span>{isExpanded ? 'ย่อมุมมอง' : `ดูทั้งหมด (${totalBadges})`}</span>
              <span className="material-symbols-outlined text-[16px]">
                {isExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Level Progression & Nong SkyBlue Motivation Card */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3.5 my-4">
        {/* Level Progression Bar (7 cols) */}
        <div className="lg:col-span-7 p-4 rounded-2xl bg-gradient-to-r from-[#f2f3ff] via-white to-[#c4e7ff]/25 border border-[#c4e7ff]/60 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#00668a] text-white text-[11px] font-extrabold">
                Lv. {currentUser.level}
              </span>
              <span className="text-[13px] font-bold text-[#131b2e]">
                {currentUser.name} • สู่เป้าหมาย KKUIC
              </span>
            </div>
            <span className="text-[12px] font-extrabold text-[#00668a]">
              {currentUser.exp.toLocaleString()} EXP
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full">
            <div className="w-full h-2.5 rounded-full bg-[#dae2fd] overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-[#38bdf8] to-[#00668a] transition-all duration-700"
                style={{ width: `${Math.min(100, ((currentUser.exp % 500) / 500) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-[#5f5a7c] mt-1.5 font-medium">
              <span>สะสม EXP เพิ่มเพื่อปลดสิทธิพิเศษของระบบ</span>
              <span>อีก {500 - (currentUser.exp % 500)} EXP ถึง Lv. {currentUser.level + 1} ✦</span>
            </div>
          </div>
        </div>

        {/* Nong Skyblue Encouragement (5 cols) */}
        <div className="lg:col-span-5 p-3.5 rounded-2xl bg-gradient-to-br from-[#c4e7ff]/30 to-[#f2f3ff] border border-[#c4e7ff]/60 flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={COMPANION_AVATAR}
              alt="Nong Skyblue"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-[#00668a] flex items-center gap-1">
              <span>น้องสกายบลู (AI Companion)</span>
              <span className="text-[10px] text-amber-600 bg-amber-100/80 px-1.5 py-0.2 rounded-md font-semibold">
                กำลังเชียร์มิว
              </span>
            </div>
            <p className="text-[11px] sm:text-[12px] text-[#3e484f] leading-snug line-clamp-2 mt-0.5 font-medium">
              {unclaimedCount > 0
                ? `ยินดีด้วยนะมิว! มีเหรียญใหม่พร้อมให้กดเคลม ${unclaimedCount} เหรียญ กดรับ EXP แล้วไปต่อกันเลย!`
                : `เก่งมากเลยมิว! ปลดล็อกเหรียญไปแล้ว ${unlockedCount} เหรียญ วินัยสม่ำเสมอแบบนี้ มข. อยู่แค่เอื้อมแน่นอน 🩵`}
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs Zone */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-[12px]">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-[#00668a] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#5f5a7c] hover:bg-[#eaedff]'
            }`}
          >
            ทั้งหมด ({achievements.length})
          </button>
          <button
            onClick={() => setSelectedCategory('streak')}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'streak'
                ? 'bg-[#00668a] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#5f5a7c] hover:bg-[#eaedff]'
            }`}
          >
            <span>🔥 Streak วินัย</span>
          </button>
          <button
            onClick={() => setSelectedCategory('portfolio')}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'portfolio'
                ? 'bg-[#00668a] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#5f5a7c] hover:bg-[#eaedff]'
            }`}
          >
            <span>🎨 พอร์ตโฟลิโอ</span>
          </button>
          <button
            onClick={() => setSelectedCategory('vocab')}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'vocab'
                ? 'bg-[#00668a] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#5f5a7c] hover:bg-[#eaedff]'
            }`}
          >
            <span>📖 คำศัพท์ & อังกฤษ</span>
          </button>
          <button
            onClick={() => setSelectedCategory('interview')}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'interview'
                ? 'bg-[#00668a] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#5f5a7c] hover:bg-[#eaedff]'
            }`}
          >
            <span>🎙️ สัมภาษณ์</span>
          </button>
          <button
            onClick={() => setSelectedCategory('study')}
            className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
              selectedCategory === 'study'
                ? 'bg-[#00668a] text-white shadow-xs'
                : 'bg-[#f2f3ff] text-[#5f5a7c] hover:bg-[#eaedff]'
            }`}
          >
            <span>⚡ สมาธิ & ภารกิจ</span>
          </button>
        </div>

        {/* Status Toggle (All / Unlocked / Locked) */}
        <div className="flex items-center gap-1 bg-[#f2f3ff] p-1 rounded-full border border-[#bdc8d1]/30 text-[11px] font-bold">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
              filterStatus === 'all' ? 'bg-white text-[#00668a] shadow-xs' : 'text-[#5f5a7c]'
            }`}
          >
            ทุกสถานะ
          </button>
          <button
            onClick={() => setFilterStatus('unlocked')}
            className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer flex items-center gap-1 ${
              filterStatus === 'unlocked' ? 'bg-white text-emerald-700 shadow-xs' : 'text-[#5f5a7c]'
            }`}
          >
            <span>ปลดล็อกแล้ว ({unlockedCount})</span>
          </button>
          <button
            onClick={() => setFilterStatus('locked')}
            className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
              filterStatus === 'locked' ? 'bg-white text-[#5f5a7c] shadow-xs' : 'text-[#5f5a7c]'
            }`}
          >
            ยังไม่ปลด ({totalBadges - unlockedCount})
          </button>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {displayBadges.map((badge) => {
          const isDone = badge.isUnlocked;
          const isClaimable = isDone && !badge.claimed;
          const isJustClaimed = justClaimedId === badge.id;
          const pct = Math.min(100, Math.round((badge.progress / badge.maxProgress) * 100));

          return (
            <div
              key={badge.id}
              onClick={() => setSelectedBadge(badge)}
              className={`group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden ${
                isDone
                  ? 'bg-white hover:border-[#38bdf8] shadow-xs hover:shadow-md'
                  : 'bg-[#f8f9ff]/70 border-[#bdc8d1]/30 opacity-85 hover:opacity-100 hover:border-[#bdc8d1]'
              } ${isClaimable ? 'ring-2 ring-amber-400 shadow-amber-200/50 shadow-md' : 'border-[#bdc8d1]/30'}`}
            >
              {/* Unclaimed Glowing Banner */}
              {isClaimable && (
                <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-amber-400 to-rose-400 text-white text-[10px] font-extrabold text-center py-0.5 shadow-xs">
                  ✨ รอเคลมรางวัล +{badge.rewardExp} EXP
                </div>
              )}

              <div>
                {/* Badge Top Header: Icon + Rarity */}
                <div className={`flex items-start justify-between gap-2 ${isClaimable ? 'mt-3' : ''}`}>
                  {/* Badge Icon Orb */}
                  <div
                    className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm ${
                      isDone
                        ? `bg-gradient-to-tr ${badge.gradient} text-white ring-4 ${badge.ringColor}`
                        : 'bg-[#dae2fd] text-[#5f5a7c] ring-2 ring-[#bdc8d1]/30'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[26px]"
                      style={{ fontVariationSettings: isDone ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      {badge.icon}
                    </span>

                    {/* Lock Icon Overlay if not unlocked */}
                    {!isDone && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#131b2e] text-white flex items-center justify-center text-[10px] shadow-xs">
                        <span className="material-symbols-outlined text-[12px]">lock</span>
                      </span>
                    )}
                  </div>

                  {/* Rarity Tag */}
                  <div className="shrink-0">{getRarityBadge(badge.rarity)}</div>
                </div>

                {/* Badge Titles */}
                <div className="mt-3">
                  <h3 className="text-[14px] sm:text-[15px] font-extrabold text-[#131b2e] group-hover:text-[#00668a] transition-colors leading-tight">
                    {badge.titleTh}
                  </h3>
                  <div className="text-[10px] font-semibold text-[#5f5a7c] uppercase tracking-wider mt-0.5">
                    {badge.titleEn}
                  </div>
                  <p className="text-[11px] text-[#5f5a7c] mt-1.5 leading-snug line-clamp-2">
                    {badge.descriptionTh}
                  </p>
                </div>
              </div>

              {/* Bottom Progress & Action Section */}
              <div className="mt-3 pt-3 border-t border-[#bdc8d1]/20">
                {/* Progress bar */}
                <div className="mb-2">
                  <div className="flex justify-between items-center text-[11px] font-bold mb-1">
                    <span className={isDone ? 'text-emerald-700' : 'text-[#5f5a7c]'}>
                      {isDone ? 'สำเร็จครบถ้วน' : 'ความคืบหน้า'}
                    </span>
                    <span className="text-[#131b2e]">
                      {badge.progress} / {badge.maxProgress} {badge.unit}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#f2f3ff] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isDone ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#38bdf8] to-[#00668a]'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Actions / Status footer */}
                <div className="flex items-center justify-between gap-1 pt-1">
                  <div className="text-[11px] font-extrabold text-amber-700 flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[13px] text-amber-500">bolt</span>
                    <span>+{badge.rewardExp} EXP</span>
                  </div>

                  {isClaimable ? (
                    <button
                      onClick={(e) => handleClaim(badge, e)}
                      className={`px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-[11px] font-extrabold shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1 ${
                        isJustClaimed ? 'scale-110 ring-4 ring-amber-300' : 'animate-bounce'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[13px]">redeem</span>
                      <span>เคลมรางวัล</span>
                    </button>
                  ) : badge.claimed ? (
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                      <span className="material-symbols-outlined text-[12px]">check_circle</span>
                      เคลมแล้ว
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#5f5a7c] font-bold bg-[#f2f3ff] px-2 py-0.5 rounded-full">
                      เหลืออีก {badge.maxProgress - badge.progress} {badge.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBadges.length === 0 && (
        <div className="relative z-10 py-10 text-center text-[#5f5a7c]">
          <span className="material-symbols-outlined text-[40px] text-[#bdc8d1] mb-2">
            search_off
          </span>
          <p className="text-[14px] font-bold">ไม่พบเหรียญรางวัลในหมวดหมู่นี้</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setFilterStatus('all');
            }}
            className="mt-2 text-[#00668a] text-[12px] font-bold hover:underline cursor-pointer"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      )}

      {/* Footer Encouragement & View All Toggle */}
      <div className="relative z-10 mt-4 pt-3 border-t border-[#bdc8d1]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px]">
        <div className="text-[#5f5a7c] flex items-center gap-1.5 text-center sm:text-left">
          <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
            workspace_premium
          </span>
          <span>สะสมเหรียญให้ครบเพื่อสร้างความมั่นใจก่อนยื่นพอร์ต มข. รอบที่ 1!</span>
        </div>

        <div className="flex items-center gap-2">
          {variant === 'dashboard' && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-[#00668a] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>ดูเหรียญตราทั้งหมด {totalBadges} เหรียญ</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          )}

          <button
            onClick={() => navigate('plan')}
            className="px-3.5 py-1.5 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#00668a] text-[11px] font-bold border border-[#c4e7ff] transition-all cursor-pointer"
          >
            ดูแผนการเตรียมตัว 11 เฟส
          </button>
        </div>
      </div>

      {/* Detailed Badge Modal Sheet */}
      {selectedBadge && (
        <div
          className="fixed inset-0 z-50 bg-[#131b2e]/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setSelectedBadge(null)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#c4e7ff] relative overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#5f5a7c] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* Modal Header with Glow */}
            <div className="text-center pt-2 pb-4">
              <div
                className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center shadow-lg transition-transform ${
                  selectedBadge.isUnlocked
                    ? `bg-gradient-to-tr ${selectedBadge.gradient} text-white ring-4 ${selectedBadge.ringColor}`
                    : 'bg-[#dae2fd] text-[#5f5a7c] ring-2 ring-[#bdc8d1]/30'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[44px]"
                  style={{ fontVariationSettings: selectedBadge.isUnlocked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {selectedBadge.icon}
                </span>
              </div>

              <div className="mt-3 flex justify-center">{getRarityBadge(selectedBadge.rarity)}</div>

              <h3 className="text-[20px] font-extrabold text-[#131b2e] mt-2">
                {selectedBadge.titleTh}
              </h3>
              <p className="text-[12px] font-bold text-[#5f5a7c] uppercase tracking-wider">
                {selectedBadge.titleEn}
              </p>
            </div>

            {/* Description Card */}
            <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#bdc8d1]/30 space-y-2 mb-4 text-[13px]">
              <div className="text-[#131b2e] font-semibold leading-relaxed">
                {selectedBadge.descriptionTh}
              </div>

              <div className="pt-2 border-t border-[#bdc8d1]/20 flex items-center justify-between text-[12px]">
                <span className="text-[#5f5a7c]">ความคืบหน้าปัจจุบัน:</span>
                <span className="font-extrabold text-[#00668a]">
                  {selectedBadge.progress} / {selectedBadge.maxProgress} {selectedBadge.unit} (
                  {Math.round((selectedBadge.progress / selectedBadge.maxProgress) * 100)}%)
                </span>
              </div>

              {selectedBadge.unlockedDate && (
                <div className="flex items-center justify-between text-[11px] text-emerald-700 font-medium">
                  <span>วันที่ปลดล็อก:</span>
                  <span>{selectedBadge.unlockedDate}</span>
                </div>
              )}
            </div>

            {/* Companion Motivational Tip */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 mb-5 text-[12px]">
              <span className="material-symbols-outlined text-[18px] text-amber-600 shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                tips_and_updates
              </span>
              <div>
                <span className="font-bold text-amber-900 block mb-0.5">เคล็ดลับจากน้องสกายบลู:</span>
                <span className="text-amber-800 leading-snug">{selectedBadge.motivationalTip}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-2">
              {selectedBadge.isUnlocked && !selectedBadge.claimed ? (
                <button
                  onClick={(e) => {
                    handleClaim(selectedBadge, e);
                    setSelectedBadge({ ...selectedBadge, claimed: true });
                  }}
                  className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white font-extrabold text-[13px] shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">redeem</span>
                  <span>กดเคลม +{selectedBadge.rewardExp} EXP เดี๋ยวนี้!</span>
                </button>
              ) : selectedBadge.isUnlocked ? (
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="w-full py-2.5 rounded-full bg-emerald-600 text-white font-bold text-[13px] hover:bg-emerald-700 transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>ปลดล็อกเรียบร้อยแล้ว</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    // Navigate according to badge category
                    if (selectedBadge.category === 'vocab') navigate('english');
                    else if (selectedBadge.category === 'portfolio') navigate('portfolio');
                    else if (selectedBadge.category === 'interview') navigate('interview');
                    else navigate('today');
                    setSelectedBadge(null);
                  }}
                  className="w-full py-2.5 rounded-full bg-[#00668a] text-white font-bold text-[13px] hover:bg-[#004965] shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                  <span>ไปทำภารกิจเพื่อปลดล็อกเหรียญนี้</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
