import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const TodayView: React.FC = () => {
  const {
    filteredTasks,
    toggleTaskStatus,
    deleteTask,
    addTask,
    energyMode,
    setEnergyMode,
    pomodoro,
    setAuthToast
  } = useApp();

  const [reflectionMood, setReflectionMood] = useState<'sunny' | 'calm' | 'tired'>('sunny');
  const [reflectionNote, setReflectionNote] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'เรียน' | 'พอร์ตโฟลิโอ' | 'ภาษาอังกฤษ' | 'ข้อสอบ TGAT' | 'มหาวิทยาลัย' | 'สัมภาษณ์' | 'การเงิน'>('พอร์ตโฟลิโอ');
  const [newMinutes, setNewMinutes] = useState(25);

  const completedCount = filteredTasks.filter(t => t.status === 'completed').length;
  const progressPercent = filteredTasks.length > 0 ? Math.round((completedCount / filteredTasks.length) * 100) : 0;

  // Format pomodoro time mm:ss
  const minutes = Math.floor(pomodoro.timeLeft / 60);
  const seconds = pomodoro.timeLeft % 60;
  const timerDisplay = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

  const handleSaveReflection = () => {
    if (!reflectionNote.trim()) {
      setAuthToast('กรุณาเขียนบันทึกความรู้สึกสักนิดนะ 🩵');
      return;
    }
    setAuthToast('บันทึกความรู้สึกลงสมุดไดอารี่เรียบร้อยแล้ว ✨');
    setReflectionNote('');
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask({
      title: newTitle.trim(),
      description: 'ภารกิจที่เพิ่มใหม่สำหรับวันนี้',
      category: newCategory,
      priority: 'medium',
      status: 'pending',
      estimatedMinutes: Number(newMinutes) || 20
    });
    setNewTitle('');
    setIsAddingTask(false);
    setAuthToast('เพิ่มภารกิจใหม่เรียบร้อยแล้ว ✓');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header: Mission Today Greeting & Energy Level Switcher */}
      <section className="bg-white soft-cloud-card rounded-3xl p-5 sm:p-6 border border-[#bdc8d1]/30 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#c4e7ff]/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#e5deff]/40 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col gap-2 z-10">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-[#c4e7ff] text-[#001e2c] text-[12px] font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[15px]">calendar_month</span>
              <span>วันเสาร์ที่ 26 กันยายน 2569</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#e5deff] text-[#1b1735] text-[12px] font-bold flex items-center gap-1">
              <span>ทำต่อเนื่อง 7 วัน</span>
              <span className="text-[14px]">🔥</span>
            </span>
          </div>

          <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#131b2e] tracking-tight flex items-center gap-2">
            <span>วันนี้ — ภารกิจพิชิตเป้าหมาย</span>
            <span className="text-[#38bdf8] text-[24px]">☁️</span>
          </h1>

          <p className="text-[13px] sm:text-[14px] text-[#5f5a7c] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#38bdf8] text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              favorite
            </span>
            <span>ค่อยๆ ทำไปทีละสเต็ป ทำเสร็จแล้วพักผ่อนได้อย่างสบายใจนะ</span>
          </p>
        </div>

        {/* Energy Mode Switcher & Progress Summary */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 z-10">
          <div className="bg-[#f2f3ff] p-1.5 rounded-full border border-[#bdc8d1]/30 flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setEnergyMode('normal')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                energyMode === 'normal' ? 'bg-white text-[#00668a] shadow-xs' : 'text-[#5f5a7c] hover:text-[#131b2e]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#22c990]" />
              <span>วันปกติ</span>
              <span className="ml-1 px-1.5 py-0.2 bg-[#c4e7ff] text-[#001e2c] rounded-full text-[10px]">
                {filteredTasks.length} งาน
              </span>
            </button>

            <button
              onClick={() => setEnergyMode('low')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                energyMode === 'low' ? 'bg-white text-amber-700 shadow-xs' : 'text-[#5f5a7c] hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">energy_savings_leaf</span>
              <span>วันที่พลังน้อย</span>
            </button>

            <button
              onClick={() => setEnergyMode('catchup')}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                energyMode === 'catchup' ? 'bg-white text-purple-700 shadow-xs' : 'text-[#5f5a7c] hover:text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">restart_alt</span>
              <span>วันตามงานค้าง</span>
            </button>
          </div>

          {/* Progress Mini Widget */}
          <div className="bg-[#f2f3ff]/80 border border-[#bdc8d1]/40 rounded-2xl px-4 py-2 flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#dae2fd" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="88"
                  strokeDashoffset={88 - (88 * (progressPercent / 100))}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[11px] font-extrabold text-[#00668a]">{progressPercent}%</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-[#5f5a7c] font-medium">ความคืบหน้าวันนี้</span>
              <span className="text-[13px] font-bold text-[#131b2e]">
                {completedCount} จาก {filteredTasks.length} งาน
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: 8 Cols Tasks Stream + 4 Cols Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 Cols): Prioritized Daily Tasks */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-bold text-[#131b2e]">ภารกิจหลักวันนี้</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#3e484f] text-[11px] font-bold">
                {completedCount} เสร็จสิ้น • {filteredTasks.length - completedCount} รอทำ
              </span>
            </div>
            <button
              onClick={() => setIsAddingTask(!isAddingTask)}
              className="px-4 py-2 rounded-full bg-[#c4e7ff] text-[#001e2c] hover:bg-[#38bdf8] hover:text-white font-bold text-[12px] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>{isAddingTask ? 'ยกเลิก' : 'เพิ่มภารกิจวันนี้'}</span>
            </button>
          </div>

          {/* Quick Add Form */}
          {isAddingTask && (
            <form onSubmit={handleCreateTask} className="p-4 bg-white rounded-2xl border-2 border-[#38bdf8] space-y-3">
              <h4 className="text-[13px] font-bold text-[#00668a]">+ เพิ่มภารกิจด่วนสำหรับวันนี้</h4>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="ระบุสิ่งที่ต้องทำ เช่น อ่านศัพท์ TGAT 20 คำ, ร่างหน้าพอร์ต..."
                className="w-full px-3.5 py-2 text-[13px] bg-[#f2f3ff] border border-[#bdc8d1]/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38bdf8]"
                required
              />
              <div className="flex items-center gap-3 flex-wrap">
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="px-3 py-1.5 text-[12px] bg-[#f2f3ff] border border-[#bdc8d1]/60 rounded-xl"
                >
                  <option value="พอร์ตโฟลิโอ">พอร์ตโฟลิโอ</option>
                  <option value="ภาษาอังกฤษ">ภาษาอังกฤษ</option>
                  <option value="ข้อสอบ TGAT">ข้อสอบ TGAT</option>
                  <option value="มหาวิทยาลัย">มหาวิทยาลัย</option>
                  <option value="สัมภาษณ์">สัมภาษณ์</option>
                  <option value="การเงิน">การเงิน</option>
                </select>
                <div className="flex items-center gap-1 text-[12px] text-[#5f5a7c]">
                  <span>ประเมินเวลา:</span>
                  <input
                    type="number"
                    min="5"
                    max="180"
                    value={newMinutes}
                    onChange={e => setNewMinutes(Number(e.target.value))}
                    className="w-16 px-2 py-1 bg-[#f2f3ff] border border-[#bdc8d1]/60 rounded-lg text-center font-bold"
                  />
                  <span>นาที</span>
                </div>
                <button
                  type="submit"
                  className="ml-auto px-4 py-1.5 bg-[#00668a] text-white text-[12px] font-bold rounded-full hover:bg-[#004965] cursor-pointer"
                >
                  บันทึกภารกิจ
                </button>
              </div>
            </form>
          )}

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.map((task) => {
              const isCompleted = task.status === 'completed';
              return (
                <div
                  key={task.id}
                  className={`rounded-2xl p-4 sm:p-5 border transition-all flex items-start gap-3.5 relative overflow-hidden ${
                    isCompleted
                      ? 'bg-white/80 soft-cloud-card border-[#bdc8d1]/30 opacity-80'
                      : 'bg-white soft-floating-card border-2 border-[#38bdf8]/60 hover:border-[#00668a]'
                  }`}
                >
                  {!isCompleted && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#38bdf8]" />}

                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isCompleted
                        ? 'bg-[#22c990] text-white shadow-xs'
                        : 'border-2 border-[#38bdf8] hover:bg-[#c4e7ff]/30'
                    }`}
                  >
                    {isCompleted && <span className="material-symbols-outlined text-[16px]">check</span>}
                  </button>

                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#e5deff] text-[#1b1735] text-[11px] font-bold">
                          {task.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#ffdad6]/60 text-[#93000a] text-[11px] font-bold">
                          {task.priority === 'high' ? 'Priority 1 (สูงมาก)' : 'Priority 2'}
                        </span>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                          isCompleted
                            ? 'bg-[#68fcbf]/40 text-[#006c4b]'
                            : 'bg-[#c4e7ff]/50 text-[#004c69] animate-pulse'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-[#006c4b]' : 'bg-[#00668a]'}`}
                        />
                        <span>{isCompleted ? 'เสร็จสิ้นแล้ว' : 'กำลังทำอยู่'}</span>
                      </span>
                    </div>

                    <div>
                      <h3
                        className={`text-[14px] sm:text-[15px] font-bold leading-snug ${
                          isCompleted ? 'line-through text-[#6e7980]' : 'text-[#131b2e]'
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-[12px] text-[#5f5a7c] mt-0.5 leading-relaxed">{task.description}</p>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#bdc8d1]/30">
                      <div className="flex items-center gap-4 text-[11px] text-[#5f5a7c]">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-[#00668a]">timer</span>
                          <span>ประเมินเวลา: {task.estimatedMinutes} นาที</span>
                        </span>
                        {task.deadline && (
                          <span className="flex items-center gap-1 text-rose-600 font-bold">
                            <span className="material-symbols-outlined text-[13px]">alarm</span>
                            <span>กำหนดส่ง: {task.deadline}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {!isCompleted && (
                          <button
                            onClick={() => {
                              pomodoro.setTaskTitle(task.title);
                              pomodoro.setDuration(task.estimatedMinutes);
                              if (!pomodoro.isRunning) pomodoro.toggleTimer();
                            }}
                            className="px-3 py-1 rounded-full bg-[#00668a] text-white hover:bg-[#004965] text-[11px] font-bold flex items-center gap-1 shadow-xs cursor-pointer active:scale-[0.98]"
                          >
                            <span className="material-symbols-outlined text-[13px]">play_arrow</span>
                            <span>จับเวลาอ่านหนังสือ</span>
                          </button>
                        )}
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-rose-50 text-[#6e7980] hover:text-rose-600 transition-colors cursor-pointer"
                          title="ลบภารกิจ"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Special Quick Win Card */}
          <div className="bg-gradient-to-r from-[#c4e7ff]/40 via-[#f2f3ff] to-[#e5deff]/40 rounded-2xl p-5 border border-[#c4e7ff] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#00668a] shadow-xs shrink-0">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  spa
                </span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#00668a] block">ภารกิจฉบับวันพลังน้อย (Quick Win) ✦</span>
                <span className="text-[13px] font-bold text-[#131b2e] block">อ่านสรุปคำศัพท์ 5 คำก่อนนอน (5 นาที)</span>
                <span className="text-[11px] text-[#5f5a7c]">ถ้าวันนี้รู้สึกเหนื่อย ทำแค่อันนี้แล้วเข้านอนได้เลยนะ!</span>
              </div>
            </div>
            <button
              onClick={() => {
                addTask({
                  title: 'อ่านสรุปคำศัพท์ 5 คำก่อนนอน (5 นาที)',
                  description: 'ทบทวนสั้นๆ ไม่กดดันตัวเอง',
                  category: 'ภาษาอังกฤษ',
                  priority: 'low',
                  status: 'pending',
                  estimatedMinutes: 5
                });
                setAuthToast('เพิ่มภารกิจจิ๋วลงตารางแล้ว 🩵');
              }}
              className="px-4 py-2 rounded-full bg-white text-[#00668a] hover:bg-[#00668a] hover:text-white text-[12px] font-bold shadow-xs transition-all shrink-0 cursor-pointer"
            >
              ทำภารกิจจิ๋วนี้
            </button>
          </div>
        </div>

        {/* Right Column (4 Cols): Focus Timer, Reflection, Context Links */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Focus & Study Timer */}
          <div className="bg-white soft-floating-card rounded-2xl p-5 border border-[#bdc8d1]/30 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#38bdf8]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  alarm
                </span>
                <h3 className="text-[16px] font-bold text-[#131b2e]">ตัวช่วยโฟกัสและจับเวลา</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#c4e7ff] text-[#001e2c] text-[11px] font-bold">
                {minutes} นาที
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#f2f3ff]/70 border border-[#bdc8d1]/30 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${pomodoro.isRunning ? 'bg-[#38bdf8] animate-ping' : 'bg-[#6e7980]'}`} />
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] text-[#5f5a7c]">กำลังจับเวลาภารกิจ:</span>
                <span className="text-[12px] font-bold text-[#00668a] truncate">{pomodoro.activeTaskTitle}</span>
              </div>
            </div>

            {/* Pomodoro Dial */}
            <div className="flex flex-col items-center justify-center py-4 bg-white rounded-2xl border border-[#c4e7ff]/40 shadow-inner">
              <div className="relative w-40 h-40 flex flex-col items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e7ff" strokeWidth="6" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="6"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * (pomodoro.timeLeft / pomodoro.initialDuration))}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-[34px] font-extrabold text-[#131b2e] tracking-tight">{timerDisplay}</span>
                  <span className="text-[10px] text-[#5f5a7c] font-bold">
                    {pomodoro.isRunning ? 'โหมดโฟกัสเข้มข้น ✦' : 'หยุดชั่วคราว'}
                  </span>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={pomodoro.resetTimer}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[#eaedff] hover:bg-[#dae2fd] text-[#3e484f] transition-colors cursor-pointer"
                  title="รีเซ็ต"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                </button>
                <button
                  onClick={pomodoro.toggleTimer}
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-[#00668a] text-white shadow-md hover:bg-[#004965] active:scale-95 transition-all cursor-pointer"
                  title={pomodoro.isRunning ? 'หยุดชั่วคราว' : 'เริ่มจับเวลา'}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {pomodoro.isRunning ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <button
                  onClick={() => pomodoro.setDuration(pomodoro.initialDuration === 25 * 60 ? 45 : 25)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[#eaedff] hover:bg-[#dae2fd] text-[#3e484f] transition-colors cursor-pointer"
                  title="เปลี่ยนเวลา"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setAuthToast('บันทึกเวลาเรียน 25 นาที ลงสมุดสถิติสำเร็จ! 🎉')}
              className="w-full py-2 rounded-full bg-[#e5deff] text-[#1b1735] hover:bg-[#dcd5fd] text-[12px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">history_edu</span>
              <span>บันทึกเวลาลงสมุดสถิติการอ่าน</span>
            </button>
          </div>

          {/* Card 2: Daily Reflection / Mood Notes */}
          <div className="bg-white soft-cloud-card rounded-2xl p-5 border border-[#bdc8d1]/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#5f5a7c]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  mood
                </span>
                <h3 className="text-[15px] font-bold text-[#131b2e]">บันทึกสะท้อนความคิด</h3>
              </div>
              <span className="text-[10px] text-[#6e7980]">ส่วนตัว</span>
            </div>
            <p className="text-[12px] text-[#5f5a7c]">วันนี้รู้สึกอย่างไรบ้าง หรือมีอะไรที่ทำได้ดีขึ้น?</p>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setReflectionMood('sunny')}
                className={`p-2 rounded-xl flex flex-col items-center gap-1 text-[11px] font-bold transition-all cursor-pointer ${
                  reflectionMood === 'sunny'
                    ? 'bg-[#68fcbf]/30 border-2 border-[#22c990] text-[#006c4b] shadow-xs'
                    : 'bg-[#f2f3ff] border border-[#bdc8d1]/30 text-[#5f5a7c]'
                }`}
              >
                <span className="text-[20px]">☀️</span>
                <span>สดชื่น พร้อมลุย</span>
              </button>
              <button
                type="button"
                onClick={() => setReflectionMood('calm')}
                className={`p-2 rounded-xl flex flex-col items-center gap-1 text-[11px] font-bold transition-all cursor-pointer ${
                  reflectionMood === 'calm'
                    ? 'bg-[#c4e7ff]/40 border-2 border-[#00668a] text-[#00668a] shadow-xs'
                    : 'bg-[#f2f3ff] border border-[#bdc8d1]/30 text-[#5f5a7c]'
                }`}
              >
                <span className="text-[20px]">🍵</span>
                <span>เรื่อยๆ กำลังดี</span>
              </button>
              <button
                type="button"
                onClick={() => setReflectionMood('tired')}
                className={`p-2 rounded-xl flex flex-col items-center gap-1 text-[11px] font-bold transition-all cursor-pointer ${
                  reflectionMood === 'tired'
                    ? 'bg-amber-100 border-2 border-amber-400 text-amber-800 shadow-xs'
                    : 'bg-[#f2f3ff] border border-[#bdc8d1]/30 text-[#5f5a7c]'
                }`}
              >
                <span className="text-[20px]">☁️</span>
                <span>เหนื่อยนิดหน่อย</span>
              </button>
            </div>

            <textarea
              value={reflectionNote}
              onChange={e => setReflectionNote(e.target.value)}
              placeholder="เขียนบันทึกความรู้สึกสั้นๆ เช่น วันนี้ทำ TGAT ได้คล่องขึ้น..."
              rows={3}
              className="w-full p-3 text-[12px] bg-[#f2f3ff]/60 rounded-xl border border-[#bdc8d1]/40 focus:border-[#38bdf8] focus:bg-white focus:outline-none transition-all placeholder:text-[#6e7980] resize-none"
            />
            <button
              onClick={handleSaveReflection}
              className="self-end px-4 py-1.5 rounded-full bg-[#00668a] text-white hover:bg-[#004965] text-[11px] font-bold transition-all cursor-pointer"
            >
              บันทึกโน้ต
            </button>
          </div>

          {/* Card 3: Quick Reference / Deadlines */}
          <div className="bg-white soft-cloud-card rounded-2xl p-5 border border-[#bdc8d1]/30 space-y-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00668a]">quick_reference_all</span>
              <h3 className="text-[15px] font-bold text-[#131b2e]">ทางลัดและเดดไลน์ด่วน</h3>
            </div>

            <div className="p-3 rounded-xl bg-[#c4e7ff]/30 border border-[#c4e7ff] flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-[#00668a] font-bold">กำหนดการถัดไป</span>
                <span className="text-[12px] font-bold text-[#131b2e]">ยื่นตรวจร่าง Portfolio KKUIC</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-[#00668a] text-white font-bold text-[11px] shrink-0 shadow-xs">
                เหลือ 14 วัน
              </div>
            </div>

            <div className="space-y-2 text-[12px]">
              <a
                href="#"
                onClick={e => { e.preventDefault(); setAuthToast('เปิดเทมเพลตเรซูเม่ 10 หน้าเรียบร้อย'); }}
                className="p-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors flex items-center justify-between text-[#131b2e]"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#5f5a7c]">description</span>
                  <span>เทมเพลตเรซูเม่ 10 หน้า (Canva)</span>
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#6e7980]">open_in_new</span>
              </a>
              <a
                href="#"
                onClick={e => { e.preventDefault(); setAuthToast('เปิดคลังศัพท์ออกบ่อย 100 คำ'); }}
                className="p-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors flex items-center justify-between text-[#131b2e]"
              >
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#5f5a7c]">quiz</span>
                  <span>คลังศัพท์ออกบ่อย TGAT 1 100 คำ</span>
                </span>
                <span className="material-symbols-outlined text-[14px] text-[#6e7980]">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
