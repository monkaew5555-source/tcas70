import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANION_AVATAR } from '../data/initialData';

export const EnglishView: React.FC = () => {
  const { filteredVocab, updateVocabReview, setQuizOpen, setAuthToast } = useApp();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const activeCard = filteredVocab[currentCardIndex] || filteredVocab[0];

  const handleReviewAction = (result: 'easy' | 'review' | 'hard') => {
    if (!activeCard) return;
    updateVocabReview(activeCard.id, result);
    setAuthToast(`บันทึกสถานะคำว่า "${activeCard.word}" เรียบร้อยแล้ว ✨`);
    if (currentCardIndex < filteredVocab.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const playPronunciation = (word: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      setAuthToast(`กำลังจำลองเสียงอ่าน: /${word}/`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <section className="bg-white border border-[#c4e7ff] rounded-2xl p-4 card-sky-shadow flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c4e7ff] flex items-center justify-center text-[#00668a] shrink-0">
            <span className="material-symbols-outlined text-[22px]">verified</span>
          </div>
          <div className="text-[13px] text-[#131b2e]">
            <span className="font-bold text-[#00668a]">💡 ข้อสอบจำลองและคลังคำศัพท์อ้างอิงตาม Blueprint TGAT 1</span>{' '}
            (การสื่อสารภาษาอังกฤษ) ของ ทปอ. — รวมทั้งศัพท์เชิงวิชาการและศัพท์สายมีเดียสำหรับหลักสูตรนานาชาติ KKUIC
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] bg-[#68fcbf]/40 text-[#006c4b] font-bold shrink-0">
          อัปเดตตรง Blueprint ล่าสุด ✓
        </span>
      </section>

      {/* Title & Actions */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#c4e7ff] text-[#001e2c]">
              TGAT 1 MASTERY & INTL PREP
            </span>
            <span className="text-[11px] text-[#5f5a7c]">✦ TCAS70 เป้าหมาย KKUIC</span>
          </div>
          <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#131b2e] tracking-tight">
            ภาษาอังกฤษ (English Skill Hub & TGAT 1 Practice)
          </h1>
          <p className="text-[13px] text-[#5f5a7c] mt-0.5">
            ยกระดับทักษะภาษาอังกฤษเพื่อพิชิตคะแนน TGAT 1 75+ และเตรียมความพร้อมสู่หลักสูตรนานาชาติ KKUIC
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setQuizOpen(true)}
            className="px-5 py-2.5 rounded-full bg-[#38bdf8] text-[#001e2c] hover:bg-[#0284c7] hover:text-white font-bold text-[12px] flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">psychology</span>
            <span>+ เริ่มควิซสปีดเทสท์ (Speed Quiz)</span>
          </button>
          <button
            onClick={() => setAuthToast('ส่งออกสมุดคำศัพท์ฉบับพกพาเป็น PDF เรียบร้อย')}
            className="px-3.5 py-2 rounded-full bg-white border border-[#bdc8d1]/60 text-[#5f5a7c] hover:bg-[#f2f3ff] text-[12px] font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            <span>ส่งออกสมุดศัพท์ PDF</span>
          </button>
        </div>
      </section>

      {/* 4 Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 card-sky-shadow border border-[#bdc8d1]/30">
          <div className="flex justify-between text-[12px] text-[#5f5a7c] mb-1">
            <span>คะแนนประเมิน TGAT 1 ล่าสุด</span>
            <span className="material-symbols-outlined text-[#006c4b] text-[18px]">military_tech</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-extrabold text-[#00668a]">78</span>
            <span className="text-[12px] text-[#6e7980]">/ 100</span>
          </div>
          <div className="text-[11px] text-[#006c4b] font-bold mt-1">ผ่านเกณฑ์เป้าหมาย (75/100) 🎉</div>
        </div>

        <div className="bg-white rounded-2xl p-4 card-sky-shadow border border-[#bdc8d1]/30">
          <div className="flex justify-between text-[12px] text-[#5f5a7c] mb-1">
            <span>คลังคำศัพท์สะสม</span>
            <span className="material-symbols-outlined text-[#00668a] text-[18px]">collections_bookmark</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-extrabold text-[#131b2e]">840</span>
            <span className="text-[12px] text-[#6e7980]">/ 1,200 คำ</span>
          </div>
          <div className="text-[11px] text-[#5f5a7c] mt-1">Mastered: 520 • Reviewing: 320</div>
        </div>

        <div className="bg-white rounded-2xl p-4 card-sky-shadow border border-[#bdc8d1]/30">
          <div className="flex justify-between text-[12px] text-[#5f5a7c] mb-1">
            <span>สถิติท่องศัพท์ต่อเนื่อง</span>
            <span className="material-symbols-outlined text-amber-500 text-[18px]">local_fire_department</span>
          </div>
          <div className="text-[28px] font-extrabold text-[#131b2e]">12 วัน 🔥</div>
          <div className="text-[11px] text-[#5f5a7c] mt-1">อัตราความจำแม่นยำ 86%</div>
        </div>

        <div className="bg-white rounded-2xl p-4 card-sky-shadow border border-[#bdc8d1]/30">
          <div className="flex justify-between text-[12px] text-[#5f5a7c] mb-1">
            <span>เวลาฝึกสะสมสัปดาห์นี้</span>
            <span className="material-symbols-outlined text-[#5f5a7c] text-[18px]">timelapse</span>
          </div>
          <div className="text-[28px] font-extrabold text-[#131b2e]">6.5 ชม.</div>
          <div className="text-[11px] text-[#006c4b] font-bold mt-1">+1.2 ชม. จากสัปดาห์ก่อน</div>
        </div>
      </section>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 Cols): Flashcards & Drills */}
        <div className="lg:col-span-8 space-y-6">
          {/* Daily Interactive Flashcard */}
          {activeCard && (
            <div className="bg-white rounded-3xl p-6 card-sky-shadow border border-[#bdc8d1]/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#c4e7ff] flex items-center justify-center text-[#00668a]">
                    <span className="material-symbols-outlined text-[18px]">style</span>
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-[#131b2e]">บัตรคำศัพท์อัจฉริยะประจำวันนี้ (Daily Flashcard)</h3>
                    <p className="text-[11px] text-[#5f5a7c]">ระบบ Spaced Repetition จัดตารางทบทวนคำที่กำลังจะลืม</p>
                  </div>
                </div>
                <span className="text-[11px] px-3 py-1 rounded-full bg-[#f2f3ff] text-[#5f5a7c] font-bold">
                  การ์ดที่ {currentCardIndex + 1} / {filteredVocab.length} วันนี้
                </span>
              </div>

              {/* Flashcard Box */}
              <div className="bg-gradient-to-b from-[#c4e7ff]/20 to-[#f2f3ff]/60 rounded-2xl p-5 border border-[#c4e7ff]">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-[26px] font-extrabold text-[#131b2e] tracking-tight">{activeCard.word}</h4>
                      <button
                        onClick={() => playPronunciation(activeCard.word)}
                        className="w-7 h-7 rounded-full bg-white text-[#00668a] shadow-xs hover:bg-[#38bdf8] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                        title="ฟังเสียงอ่าน"
                      >
                        <span className="material-symbols-outlined text-[16px]">volume_up</span>
                      </button>
                      <span className="text-[12px] font-mono text-[#5f5a7c] bg-white px-2 py-0.5 rounded-full border border-[#bdc8d1]/30">
                        {activeCard.phonetic}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#38bdf8]/20 text-[#00668a] font-bold">
                        {activeCard.partOfSpeech}
                      </span>
                      <span className="text-[11px] text-[#5f5a7c]">ระดับ: {activeCard.difficulty}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-white text-[11px] text-[#00668a] font-bold border border-[#c4e7ff] shadow-xs">
                    หมวด: {activeCard.category}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#bdc8d1]/20">
                  <div className="text-[15px] font-bold text-[#00668a] mb-1">{activeCard.meaningTh}</div>
                  <p className="text-[12px] text-[#5f5a7c]">(คำพ้อง: {activeCard.synonyms.join(', ')})</p>
                </div>

                <div className="mt-4 bg-white/90 rounded-xl p-3 border border-[#bdc8d1]/30">
                  <div className="text-[11px] font-bold text-[#5f5a7c] mb-1">
                    📖 ตัวอย่างประโยคบริบท ({activeCard.contextTag}):
                  </div>
                  <p className="text-[13px] text-[#131b2e] italic">"{activeCard.exampleEn}"</p>
                  <p className="text-[11px] text-[#5f5a7c] mt-0.5">({activeCard.exampleTh})</p>
                </div>

                {/* Rating Buttons */}
                <div className="mt-5 pt-3 border-t border-[#bdc8d1]/20 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-[11px] text-[#5f5a7c]">ประเมินระดับความจำ:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReviewAction('hard')}
                      className="px-3 py-1.5 rounded-full bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-[11px] font-bold transition-all cursor-pointer"
                    >
                      ยังจำไม่ได้ (ทวนซ้ำ)
                    </button>
                    <button
                      onClick={() => handleReviewAction('review')}
                      className="px-3 py-1.5 rounded-full bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 text-[11px] font-bold transition-all cursor-pointer"
                    >
                      จำได้เลือนราง (ทวนพรุ่งนี้)
                    </button>
                    <button
                      onClick={() => handleReviewAction('easy')}
                      className="px-3.5 py-1.5 rounded-full bg-[#22c990] text-white hover:bg-[#006c4b] text-[11px] font-bold transition-all cursor-pointer shadow-xs"
                    >
                      จำได้แม่นยำแล้ว! (Easy ✓)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section Drills Blueprint TGAT 1 */}
          <div className="bg-white rounded-3xl p-6 card-sky-shadow border border-[#bdc8d1]/30 space-y-4">
            <h3 className="text-[15px] font-bold text-[#131b2e]">แบบฝึกหัดแยกพาร์ต Blueprint TGAT 1</h3>
            <div className="space-y-3 text-[12px]">
              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-[13px] text-[#131b2e]">พาร์ต 1: Speaking Skill & Conversation</strong>
                    <span className="px-2 py-0.2 rounded-full bg-[#22c990]/20 text-[#006c4b] font-bold text-[10px]">แม่นยำ 88%</span>
                  </div>
                  <p className="text-[11px] text-[#5f5a7c] mt-0.5">บทสนทนาในชีวิตประจำวันและมหาวิทยาลัย (20 ข้อ)</p>
                </div>
                <button
                  onClick={() => setQuizOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-white border border-[#00668a] text-[#00668a] font-bold hover:bg-[#c4e7ff] transition-colors cursor-pointer"
                >
                  ทำแบบฝึกหัด
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#f2f3ff] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-[13px] text-[#131b2e]">พาร์ต 2: Reading Comprehension</strong>
                    <span className="px-2 py-0.2 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">แม่นยำ 65% (เร่งเสริม)</span>
                  </div>
                  <p className="text-[11px] text-[#5f5a7c] mt-0.5">บทความข่าวสั้น และบทความสื่อดิจิทัล (20 ข้อ)</p>
                </div>
                <button
                  onClick={() => setQuizOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-[#00668a] text-white font-bold hover:bg-[#004965] transition-colors cursor-pointer"
                >
                  ฝึกอ่านจับใจความ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): AI Coach & Power Phrases & Mistakes */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Coach */}
          <div className="bg-white rounded-3xl p-5 border border-[#c4e7ff] card-sky-shadow space-y-3">
            <div className="flex items-center gap-2.5">
              <img src={COMPANION_AVATAR} alt="" className="w-11 h-11 rounded-full object-cover shrink-0 ring-2 ring-[#38bdf8]" />
              <div>
                <span className="px-2 py-0.5 rounded-full bg-[#00668a] text-white text-[10px] font-bold">น้องสกายบลู</span>
                <p className="text-[11px] text-[#5f5a7c]">ผู้ช่วยส่วนตัววิชาภาษาอังกฤษ TCAS70</p>
              </div>
            </div>

            <div className="p-3.5 bg-[#f2f3ff] rounded-2xl text-[12px] text-[#131b2e] leading-relaxed">
              “เก่งมากเลยมิว! สัปดาห์นี้พาร์ต Conversation ทำได้ดีมากๆ แต่น้องสกายบลูแนะนำให้อ่านบทความสายสื่อเพิ่มวันละ 1 ข่าว เพื่อดันคะแนนพาร์ต Reading ให้ทะลุ 80% นะคะ 🩵✨”
            </div>
          </div>

          {/* Power Phrases */}
          <div className="bg-white rounded-3xl p-5 border border-[#bdc8d1]/30 card-sky-shadow space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-bold text-[#131b2e] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00668a] text-[18px]">star</span>
                <span>คลังประโยคทองคำ (KKUIC Power Phrases)</span>
              </h3>
            </div>
            <p className="text-[11px] text-[#5f5a7c]">ประโยคระดับวิชาการสำหรับใส่ใน Statement of Purpose (SOP)</p>

            <div className="p-3 rounded-2xl bg-[#f2f3ff] space-y-1.5 text-[12px]">
              <p className="font-bold text-[#00668a] italic">
                “My passion lies at the intersection of visual storytelling and digital technology.”
              </p>
              <p className="text-[11px] text-[#5f5a7c]">(ความหลงใหลของฉันอยู่ ณ จุดบรรจบระหว่างการเล่าเรื่องผ่านภาพและเทคโนโลยี)</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] bg-white px-2 py-0.5 rounded">ใช้ใน: SOP / Intro</span>
                <button
                  onClick={() => setAuthToast('คัดลอกประโยคแล้ว ✓')}
                  className="text-[#00668a] hover:underline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">content_copy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
