import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COMPANION_AVATAR } from '../data/initialData';

export const FinanceView: React.FC = () => {
  const {
    currentPrimaryTarget,
    financialPlan,
    updateFinancialPlan,
    financialCalculations,
    setAuthToast,
    setAiChatOpen,
  } = useApp();

  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRequestAiAdvice = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai/financial-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          financialData: {
            ...financialPlan,
            total4YearCost: financialCalculations.total4YearCost,
            balance: financialCalculations.netBalance,
          },
          university: currentPrimaryTarget.name,
          faculty: `${currentPrimaryTarget.faculty} ${currentPrimaryTarget.program}`,
        }),
      });

      const data = await response.json();
      setAiAdvice(data.advice);
      setAuthToast('น้องสกายบลูวิเคราะห์แผนการเงินให้เรียบร้อยแล้วค่ะ ✨');
    } catch {
      setAiAdvice(
        `💡 **คำแนะนำการวางแผนการเงินจากน้องสกายบลู**:\n\n` +
        `• **ค่าใช้จ่าย 4 ปี**: ประมาณ ${financialCalculations.total4YearCost.toLocaleString()} บาท (เฉลี่ยเดือนละ ${financialCalculations.monthlyAverageCost.toLocaleString()} บาท)\n` +
        `• **สถานะงบประมาณ**: ${financialCalculations.netBalance >= 0 ? `มีเงินสำรองเพียงพอ (+${financialCalculations.netBalance.toLocaleString()} บาท)` : `ยังขาดอีกประมาณ ${Math.abs(financialCalculations.netBalance).toLocaleString()} บาท`}\n` +
        `• **ข้อแนะนำงานเสริม**: หากต้องการหารายได้เสริม แนะนำงานพาร์ตไทม์ไม่เกิน 12 ชม./สัปดาห์ เช่น งานผู้ช่วยในคณะ หรือรับงานฟรีแลนซ์ เพื่อไม่ให้กระทบต่อผลการเรียนและการทำกิจกรรมในมหาวิทยาลัยค่ะ 🩵`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <section className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-emerald-50/80 via-white to-sky-50/80 border border-[#c4e7ff] card-sky-shadow">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#006c4b] text-white">
                ระบบคำนวณงบประมาณการศึกษารายบุคคล
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-[#00668a] border border-[#c4e7ff]">
                {currentPrimaryTarget.name}
              </span>
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#131b2e] tracking-tight">
              แผนการบริหารการเงินและทุนการศึกษา
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#5f5a7c] mt-0.5">
              กรอกค่าใช้จ่ายจริงและทุนสนับสนุนของคุณ ระบบจะบวกลบคูณหารให้เสร็จสรรพ พร้อมให้น้องสกายบลูช่วยวิเคราะห์แผนการเงิน
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRequestAiAdvice}
              disabled={isAnalyzing}
              className="px-4 py-2.5 rounded-full bg-[#00668a] hover:bg-[#004965] text-white text-[12px] font-bold shadow-md flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <span>{isAnalyzing ? 'กำลังวิเคราะห์...' : 'ให้น้องสกายบลูช่วยวิเคราะห์การเงิน'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Top Summary KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: รวมค่าใช้จ่าย 4 ปี */}
        <div className="bg-white rounded-3xl p-5 border border-[#bdc8d1]/30 card-sky-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-[#5f5a7c] uppercase">รวมค่าใช้จ่าย 4 ปี</span>
            <span className="material-symbols-outlined text-rose-500 text-[20px]">payments</span>
          </div>
          <div className="my-2">
            <div className="text-[26px] font-extrabold text-[#131b2e] leading-none">
              {financialCalculations.total4YearCost.toLocaleString()} <span className="text-[14px] font-normal text-[#6e7980]">฿</span>
            </div>
            <div className="text-[11px] text-[#5f5a7c] mt-1">
              ตลอดหลักสูตร 8 ภาคการศึกษา
            </div>
          </div>
          <div className="pt-2 border-t border-[#bdc8d1]/20 text-[11px] text-[#00668a] font-medium">
            เฉลี่ยเดือนละ {financialCalculations.monthlyAverageCost.toLocaleString()} ฿
          </div>
        </div>

        {/* Card 2: ค่าเทอมเฉลี่ยต่อเทอม */}
        <div className="bg-white rounded-3xl p-5 border border-[#bdc8d1]/30 card-sky-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-[#5f5a7c] uppercase">ค่าเทอมต่อเทอม</span>
            <span className="material-symbols-outlined text-[#00668a] text-[20px]">school</span>
          </div>
          <div className="my-2">
            <div className="text-[26px] font-extrabold text-[#00668a] leading-none">
              {financialPlan.tuitionFeePerTerm.toLocaleString()} <span className="text-[14px] font-normal text-[#6e7980]">฿</span>
            </div>
            <div className="text-[11px] text-[#5f5a7c] mt-1">
              ปีละ {(financialPlan.tuitionFeePerTerm * 2).toLocaleString()} ฿
            </div>
          </div>
          <div className="pt-2 border-t border-[#bdc8d1]/20 text-[11px] text-[#5f5a7c]">
            {currentPrimaryTarget.name}
          </div>
        </div>

        {/* Card 3: รวมแหล่งเงินสนับสนุน 4 ปี */}
        <div className="bg-white rounded-3xl p-5 border border-[#bdc8d1]/30 card-sky-shadow flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold text-[#5f5a7c] uppercase">แหล่งเงินทุน & ครอบครัว</span>
            <span className="material-symbols-outlined text-[#006c4b] text-[20px]">savings</span>
          </div>
          <div className="my-2">
            <div className="text-[26px] font-extrabold text-[#006c4b] leading-none">
              {financialCalculations.total4YearSupport.toLocaleString()} <span className="text-[14px] font-normal text-[#6e7980]">฿</span>
            </div>
            <div className="text-[11px] text-[#5f5a7c] mt-1">
              ครอบครัว + ทุน + กยศ. + รายได้เสริม
            </div>
          </div>
          <div className="pt-2 border-t border-[#bdc8d1]/20 text-[11px] text-[#006c4b] font-medium">
            มีรายรับเฉลี่ย {financialCalculations.monthlyAverageIncome.toLocaleString()} ฿/เดือน
          </div>
        </div>

        {/* Card 4: สถานะส่วนต่างยอดเงิน (Net Balance) */}
        <div
          className={`rounded-3xl p-5 border card-sky-shadow flex flex-col justify-between ${
            financialCalculations.netBalance >= 0
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] font-bold uppercase">
              {financialCalculations.netBalance >= 0 ? 'งบประมาณคงเหลือ' : 'งบประมาณที่ยังขาด'}
            </span>
            <span className="material-symbols-outlined text-[20px]">
              {financialCalculations.netBalance >= 0 ? 'check_circle' : 'warning'}
            </span>
          </div>
          <div className="my-2">
            <div className="text-[26px] font-extrabold leading-none">
              {financialCalculations.netBalance >= 0 ? '+' : ''}
              {financialCalculations.netBalance.toLocaleString()} <span className="text-[14px] font-normal">฿</span>
            </div>
            <div className="text-[11px] mt-1 font-semibold">
              {financialCalculations.netBalance >= 0
                ? 'ยอดเงินครอบคลุมค่าใช้จ่าย 4 ปี ✓'
                : 'แนะนำขอทุน กยศ. หรือทำงานเสริม'}
            </div>
          </div>
          <div className="pt-2 border-t border-black/10 text-[11px] font-bold">
            {financialCalculations.netBalance >= 0 ? 'สถานะ: ปลอดภัยดีเยี่ยม ✨' : 'สถานะ: ควรวางแผนเสริม ⚠️'}
          </div>
        </div>
      </section>

      {/* 3. AI Analysis Report Panel (if requested) */}
      {aiAdvice && (
        <section className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#38bdf8] card-sky-shadow relative overflow-hidden animate-in fade-in">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <img
                src={COMPANION_AVATAR}
                alt="น้องสกายบลู"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#38bdf8]"
              />
              <div>
                <h3 className="text-[16px] font-extrabold text-[#131b2e]">
                  รายงานวิเคราะห์การเงินและการทำงานเสริมจากน้องสกายบลู
                </h3>
                <p className="text-[11px] text-[#5f5a7c]">
                  ประเมินตามค่าเทอม {currentPrimaryTarget.name} และข้อมูลส่วนตัวของคุณ
                </p>
              </div>
            </div>
            <button
              onClick={() => setAiAdvice(null)}
              className="p-1 hover:bg-[#f2f3ff] rounded-full text-[#6e7980] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#f0f9ff] text-[13px] leading-relaxed text-[#131b2e] whitespace-pre-wrap font-normal border border-[#c4e7ff]">
            {aiAdvice}
          </div>

          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              onClick={() => setAiChatOpen(true)}
              className="px-4 py-1.5 rounded-full bg-[#00668a] text-white text-[12px] font-bold hover:bg-[#004965] cursor-pointer"
            >
              คุยต่อกับน้องสกายบลูในแชท 🩵
            </button>
          </div>
        </section>
      )}

      {/* 4. Two-Column Interactive Financial Input Form */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: รายจ่ายทั้งหมด */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#bdc8d1]/30 card-sky-shadow space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#bdc8d1]/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[18px]">trending_down</span>
              </div>
              <h2 className="text-[16px] font-extrabold text-[#131b2e]">รายจ่ายในการเรียน (Expenses)</h2>
            </div>
            <span className="text-[11px] font-bold text-rose-600">
              รวม 4 ปี: {financialCalculations.total4YearCost.toLocaleString()} ฿
            </span>
          </div>

          <div className="space-y-3.5 text-[13px]">
            {/* ค่าเทอม */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-[#131b2e]">ค่าเทอมต่อภาคการศึกษา (บาท/เทอม)</label>
                {currentPrimaryTarget.tuitionEstimate && (
                  <button
                    type="button"
                    onClick={() => updateFinancialPlan({ tuitionFeePerTerm: currentPrimaryTarget.tuitionEstimate })}
                    className="text-[11px] text-[#00668a] font-bold hover:underline cursor-pointer"
                  >
                    ใช้ค่าเทอม ม.{currentPrimaryTarget.name.slice(0, 8)} ({currentPrimaryTarget.tuitionEstimate.toLocaleString()} ฿)
                  </button>
                )}
              </div>
              <input
                type="number"
                step="500"
                value={financialPlan.tuitionFeePerTerm}
                onChange={e => updateFinancialPlan({ tuitionFeePerTerm: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
              <span className="text-[11px] text-[#6e7980] block mt-0.5">
                (ปีละ {(financialPlan.tuitionFeePerTerm * 2).toLocaleString()} ฿ • 4 ปี = {(financialPlan.tuitionFeePerTerm * 8).toLocaleString()} ฿)
              </span>
            </div>

            {/* ค่าหอพัก */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">ค่าหอพักและค่าน้ำ-ไฟต่อเดือน (บาท/เดือน)</label>
              <input
                type="number"
                step="100"
                value={financialPlan.dormFeePerMonth}
                onChange={e => updateFinancialPlan({ dormFeePerMonth: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
              <span className="text-[11px] text-[#6e7980] block mt-0.5">
                (4 ปี = {(financialPlan.dormFeePerMonth * 48).toLocaleString()} ฿)
              </span>
            </div>

            {/* ค่าอาหารและใช้จ่ายส่วนตัว */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">ค่าอาหารและใช้จ่ายส่วนตัวต่อเดือน (บาท/เดือน)</label>
              <input
                type="number"
                step="200"
                value={financialPlan.livingCostPerMonth}
                onChange={e => updateFinancialPlan({ livingCostPerMonth: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
              <span className="text-[11px] text-[#6e7980] block mt-0.5">
                (วันละประมาณ {Math.round(financialPlan.livingCostPerMonth / 30)} ฿ • 4 ปี = {(financialPlan.livingCostPerMonth * 48).toLocaleString()} ฿)
              </span>
            </div>

            {/* ค่าเดินทาง */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">ค่าเดินทางกลับบ้าน / เดินทางในเมืองต่อเดือน (บาท/เดือน)</label>
              <input
                type="number"
                step="100"
                value={financialPlan.travelCostPerMonth}
                onChange={e => updateFinancialPlan({ travelCostPerMonth: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
            </div>

            {/* อุปกรณ์การเรียนและโน้ตบุ๊ก */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">ค่าอุปกรณ์ หนังสือ หรือโน้ตบุ๊กต่อปี (บาท/ปี)</label>
              <input
                type="number"
                step="500"
                value={financialPlan.deviceAndBooksPerYear}
                onChange={e => updateFinancialPlan({ deviceAndBooksPerYear: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
            </div>

            {/* ค่าเตรียมสอบ TCAS */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">ค่าสมัครสอบ TCAS / ค่าคอร์สและหนังสือ (ครั้งเดียว)</label>
              <input
                type="number"
                step="200"
                value={financialPlan.tcasPrepCost}
                onChange={e => updateFinancialPlan({ tcasPrepCost: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Right Column: รายรับและแหล่งเงินทุน */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#bdc8d1]/30 card-sky-shadow space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#bdc8d1]/20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
              </div>
              <h2 className="text-[16px] font-extrabold text-[#131b2e]">รายรับ & แหล่งเงินทุน (Income & Support)</h2>
            </div>
            <span className="text-[11px] font-bold text-[#006c4b]">
              รวม 4 ปี: {financialCalculations.total4YearSupport.toLocaleString()} ฿
            </span>
          </div>

          <div className="space-y-3.5 text-[13px]">
            {/* ครอบครัวสนับสนุน */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">เงินสนับสนุนจากครอบครัวต่อเดือน (บาท/เดือน)</label>
              <input
                type="number"
                step="200"
                value={financialPlan.familySupportPerMonth}
                onChange={e => updateFinancialPlan({ familySupportPerMonth: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
              <span className="text-[11px] text-[#6e7980] block mt-0.5">
                (4 ปี = {(financialPlan.familySupportPerMonth * 48).toLocaleString()} ฿)
              </span>
            </div>

            {/* เงินกู้ กยศ. / กรอ. */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-[#131b2e]">กู้ยืมเงิน กยศ. / กรอ. (บาท/เทอม)</label>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  ดอกเบี้ย 1% ผ่อนหลังจบ
                </span>
              </div>
              <input
                type="number"
                step="1000"
                placeholder="เช่น 25,000 หรือเต็มจำนวนค่าเทอม"
                value={financialPlan.studentLoanPerTerm}
                onChange={e => updateFinancialPlan({ studentLoanPerTerm: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
              <span className="text-[11px] text-[#6e7980] block mt-0.5">
                (4 ปี รวม 8 เทอม = {(financialPlan.studentLoanPerTerm * 8).toLocaleString()} ฿)
              </span>
            </div>

            {/* ทุนการศึกษา */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">ทุนการศึกษาที่ได้รับ / แผนยื่นขอ (บาท/ปี)</label>
              <input
                type="number"
                step="1000"
                placeholder="เช่น 30,000"
                value={financialPlan.scholarshipPerYear}
                onChange={e => updateFinancialPlan({ scholarshipPerYear: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
            </div>

            {/* เงินเก็บสะสมส่วนตัว */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">เงินเก็บสะสมส่วนตัวปัจจุบัน (บาท)</label>
              <input
                type="number"
                step="500"
                value={financialPlan.personalSavings}
                onChange={e => updateFinancialPlan({ personalSavings: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
            </div>

            {/* รายได้งานพิเศษ */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">รายได้งานพิเศษ / ฟรีแลนซ์ต่อเดือน (บาท/เดือน)</label>
              <input
                type="number"
                step="500"
                placeholder="เช่น 3,500 (สอนพิเศษ, ออกแบบ, ร้านกาแฟ)"
                value={financialPlan.partTimeIncomePerMonth}
                onChange={e => updateFinancialPlan({ partTimeIncomePerMonth: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[14px] font-bold focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
              <span className="text-[11px] text-[#6e7980] block mt-0.5">
                (4 ปี = {(financialPlan.partTimeIncomePerMonth * 48).toLocaleString()} ฿)
              </span>
            </div>

            {/* บันทึกช่วยจำ */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">บันทึกแผนและข้อตกลงกับที่บ้าน</label>
              <textarea
                rows={2}
                value={financialPlan.notes || ''}
                onChange={e => updateFinancialPlan({ notes: e.target.value })}
                placeholder="เช่น วางแผนกู้ กยศ. ส่วนค่าเทอม และทำงานเสริมสัปดาห์ละ 1 วัน..."
                className="w-full px-3.5 py-2 rounded-xl bg-[#f2f3ff] border border-[#c4e7ff] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:bg-white"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
