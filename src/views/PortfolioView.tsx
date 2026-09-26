import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PortfolioProject } from '../types';

export const PortfolioView: React.FC = () => {
  const {
    currentPrimaryTarget,
    projects,
    addProject,
    deleteProject,
    updateProject,
    loadPortfolioTemplate,
    setAuthToast,
    setAiChatOpen,
    completeQuest,
  } = useApp();

  const [filterTab, setFilterTab] = useState<'all' | 'ready' | 'editing' | 'planned'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Form States
  const [newTitle, setNewTitle] = useState('');
  const [newPageSlot, setNewPageSlot] = useState('หน้าที่ 3 - 4');
  const [newCategory, setNewCategory] = useState('ผลงานหลัก');
  const [newRole, setNewRole] = useState('ผู้จัดทำ');
  const [newTools, setNewTools] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStatus, setNewStatus] = useState<'พร้อมใส่ Portfolio' | 'กำลังตัดต่อ / ผลิต' | 'ไอเดีย / วางแผน'>('พร้อมใส่ Portfolio');

  // File Upload & Gemini Analysis States
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate actual pages done from user's real projects
  const readyProjects = projects.filter(p => p.status === 'พร้อมใส่ Portfolio');
  const editingProjects = projects.filter(p => p.status === 'กำลังตัดต่อ / ผลิต');
  const plannedProjects = projects.filter(p => p.status === 'ไอเดีย / วางแผน');

  // Calculate actual completed pages (Cover P1-2 counts as 2 if at least 1 project is ready)
  const estimatedPagesDone = projects.length === 0 ? 0 : Math.min(10, (readyProjects.length > 0 ? 2 : 0) + readyProjects.length * 2);
  const percentDone = Math.min(100, Math.round((estimatedPagesDone / 10) * 100));

  const displayedProjects = projects.filter(p => {
    if (filterTab === 'ready') return p.status === 'พร้อมใส่ Portfolio';
    if (filterTab === 'editing') return p.status === 'กำลังตัดต่อ / ผลิต';
    if (filterTab === 'planned') return p.status === 'ไอเดีย / วางแผน';
    return true;
  });

  const handleCreateOrUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (editingProjectId) {
      updateProject(editingProjectId, {
        title: newTitle.trim(),
        pageSlots: newPageSlot,
        category: newCategory,
        role: newRole,
        tools: newTools.split(',').map(s => s.trim()).filter(Boolean),
        description: newDescription.trim(),
        status: newStatus,
      });
      setAuthToast(`อัปเดตผลงาน "${newTitle}" เรียบร้อยแล้ว ✓`);
    } else {
      addProject({
        title: newTitle.trim(),
        pageSlots: newPageSlot,
        category: newCategory,
        role: newRole,
        tools: newTools.split(',').map(s => s.trim()).filter(Boolean),
        description: newDescription.trim(),
        status: newStatus,
      });
      completeQuest('q-3');
      setAuthToast(`เพิ่มผลงาน "${newTitle}" ลงในพอร์ตโฟลิโอของคุณแล้ว ✨`);
    }

    setIsAddModalOpen(false);
    setEditingProjectId(null);
    setNewTitle('');
    setNewDescription('');
    setNewTools('');
  };

  const handleStartEdit = (proj: PortfolioProject) => {
    setEditingProjectId(proj.id);
    setNewTitle(proj.title);
    setNewPageSlot(proj.pageSlots);
    setNewCategory(proj.category);
    setNewRole(proj.role);
    setNewTools(proj.tools ? proj.tools.join(', ') : '');
    setNewDescription(proj.description);
    setNewStatus(proj.status);
    setIsAddModalOpen(true);
  };

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      setAuthToast('ขนาดไฟล์ใหญ่เกินไป (จำกัดไม่เกิน 25 MB)');
      return;
    }

    setUploadFile(file);
    setAnalysisError(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onload = () => {
      setFileBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Upload to Gemini Analysis API
  const handleUploadAndAnalyze = async () => {
    if (!fileBase64 || !uploadFile) {
      setAuthToast('กรุณาเลือกไฟล์พอร์ตโฟลิโอก่อนนะคะ 🩵');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/ai/analyze-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileData: fileBase64,
          mimeType: uploadFile.type,
          fileName: uploadFile.name,
          targetUniversity: currentPrimaryTarget.name,
          targetFaculty: currentPrimaryTarget.faculty,
          targetProgram: currentPrimaryTarget.program,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || data.error || 'การวิเคราะห์ไม่สำเร็จ');
      }

      setAnalysisResult(data.analysis);
      setAuthToast('อาจารย์ผู้เชี่ยวชาญ AI ตรวจวิเคราะห์พอร์ตเสร็จสิ้นแล้ว ✨');
    } catch (err: any) {
      console.error('Portfolio AI analysis error:', err);
      setAnalysisError(err?.message || 'ระบบตรวจไฟล์ขัดข้องชั่วคราว ลองอัปโหลดไฟล์รูปภาพหรือ PDF อีกครั้ง');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Header Banner */}
      <section className="rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-sky-50 via-white to-emerald-50/50 border border-[#c4e7ff] card-sky-shadow">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-[#00668a] text-white">
                Portfolio Builder 10 หน้า
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-[#5f5a7c] border border-[#c4e7ff]">
                เป้าหมาย: {currentPrimaryTarget.name}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                {currentPrimaryTarget.faculty} ({currentPrimaryTarget.program})
              </span>
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#131b2e] tracking-tight">
              แฟ้มสะสมผลงาน (Portfolio 10 หน้า)
            </h1>
            <p className="text-[13px] sm:text-[14px] text-[#5f5a7c] mt-0.5">
              จัดสรรหน้าผลงานตามเกณฑ์จริงของคณะ {currentPrimaryTarget.faculty} ({currentPrimaryTarget.name})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setEditingProjectId(null);
                setNewTitle('');
                setNewDescription('');
                setNewTools('');
                setIsAddModalOpen(true);
              }}
              className="px-4 py-2 rounded-full bg-[#00668a] hover:bg-[#004965] text-white text-[12px] font-bold shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ เพิ่มผลงานของคุณ</span>
            </button>

            {projects.length === 0 && (
              <button
                onClick={loadPortfolioTemplate}
                className="px-3.5 py-2 rounded-full bg-white hover:bg-sky-50 text-[#00668a] border border-[#38bdf8] text-[12px] font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="โหลดแนวทางโครงสร้างพอร์ตตัวอย่างเพื่อเป็นไอเดีย"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>โหลดตัวอย่างโครงสร้าง</span>
              </button>
            )}

            <button
              onClick={() => setAiChatOpen(true)}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#f2f3ff] text-[#00668a] border border-[#c4e7ff] text-[12px] font-bold shadow-xs cursor-pointer transition-all"
            >
              ปรึกษาพี่สกายบลู
            </button>
          </div>
        </div>

        {/* Essential Quick Links to Canva & PortfolioTCAS */}
        <div className="mt-4 pt-4 border-t border-[#c4e7ff]/60 flex flex-wrap items-center gap-3">
          <span className="text-[12px] font-bold text-[#131b2e] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#00668a]">link</span>
            <span>เครื่องมือช่วยทำพอร์ตแนะนำ:</span>
          </span>
          <a
            href="https://portfoliotcas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-xl bg-sky-100 hover:bg-sky-200 text-[#004965] text-[11px] font-bold border border-sky-300 flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span>📘 portfoliotcas.com (แนวทางจัดพอร์ต TCAS)</span>
            <span className="material-symbols-outlined text-[13px]">open_in_new</span>
          </a>
          <a
            href="https://www.canva.com/th_th/create/portfolios/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-[11px] font-bold border border-purple-300 flex items-center gap-1.5 transition-all shadow-xs"
          >
            <span>🎨 canva.com (เทมเพลตออกแบบพอร์ตฟรี)</span>
            <span className="material-symbols-outlined text-[13px]">open_in_new</span>
          </a>
        </div>
      </section>

      {/* 2. File Upload & Gemini AI Evaluation Section */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#c4e7ff] card-sky-shadow space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#00668a]/10 text-[#00668a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <h2 className="text-[16px] font-extrabold text-[#131b2e] flex items-center gap-2">
                <span>อัปโหลดตรวจพอร์ตด้วยอาจารย์ AI (Gemini Expert Review)</span>
                <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  PDF & รูปภาพ
                </span>
              </h2>
              <p className="text-[12px] text-[#5f5a7c]">
                อัปโหลดไฟล์ฉบับร่างของคุณ เพื่อให้อาจารย์ผู้เชี่ยวชาญ AI วิเคราะห์จุดเด่น จุดที่ขาด และคะแนนภาพรวมเต็ม 10 ตามเกณฑ์ของ {currentPrimaryTarget.faculty} ({currentPrimaryTarget.name})
              </p>
            </div>
          </div>
        </div>

        {/* Upload Drop Zone / Input */}
        <div className="p-4 sm:p-5 rounded-2xl border-2 border-dashed border-[#c4e7ff] bg-[#f9fcff] flex flex-col items-center justify-center text-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
            className="hidden"
            id="portfolio-file-upload"
          />

          <span className="material-symbols-outlined text-[36px] text-[#00668a]">
            cloud_upload
          </span>

          <div>
            <label
              htmlFor="portfolio-file-upload"
              className="px-4 py-2 rounded-full bg-[#00668a] hover:bg-[#004965] text-white text-[12px] font-bold cursor-pointer inline-flex items-center gap-1.5 shadow-xs transition-all"
            >
              <span>{uploadFile ? 'เปลี่ยนไฟล์ที่เลือก' : 'เลือกไฟล์พอร์ต (PDF หรือ PNG/JPG)'}</span>
            </label>
            <p className="text-[11px] text-[#6e7980] mt-1.5">
              รองรับไฟล์เอกสาร PDF หรือภาพผลงาน PNG, JPG ขนาดไม่เกิน 25 MB
            </p>
          </div>

          {uploadFile && (
            <div className="p-2.5 rounded-xl bg-white border border-[#c4e7ff] flex items-center gap-2 text-[12px] font-bold text-[#00668a]">
              <span className="material-symbols-outlined text-[18px]">description</span>
              <span>{uploadFile.name} ({(uploadFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
              <button
                onClick={handleUploadAndAnalyze}
                disabled={isAnalyzing}
                className="ml-3 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-[11px] font-bold cursor-pointer flex items-center gap-1 transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>อาจารย์กำลังตรวจ...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    <span>ส่งให้ AI วิเคราะห์ทันที</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* AI Analysis Result Display Card */}
        {analysisResult && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-white via-sky-50/40 to-emerald-50/30 border border-emerald-300 shadow-md space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-700 text-[20px]">fact_check</span>
                <span className="font-extrabold text-[#131b2e] text-[14px]">
                  ผลการประเมินจากอาจารย์ผู้เชี่ยวชาญ AI
                </span>
              </div>
              <span className="text-[11px] font-bold bg-white text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                เกณฑ์: {currentPrimaryTarget.faculty}
              </span>
            </div>

            <div className="text-[13px] leading-relaxed text-[#131b2e] whitespace-pre-wrap font-normal">
              {analysisResult}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setAiChatOpen(true)}
                className="text-[12px] font-bold text-[#00668a] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>ถามเจาะลึกเพิ่มเติมกับพี่สกายบลู</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {analysisError && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[12px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{analysisError}</span>
          </div>
        )}
      </section>

      {/* 3. Faculty-Specific Portfolio Guidance Card */}
      <section className="bg-white rounded-3xl p-5 border border-[#c4e7ff] card-sky-shadow relative overflow-hidden">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#38bdf8]/20 text-[#00668a] flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[22px]">lightbulb</span>
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-[15px] font-bold text-[#131b2e]">
                คำแนะนำและเกณฑ์เฉพาะสำหรับ: {currentPrimaryTarget.faculty} ({currentPrimaryTarget.name})
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
                เกรดเฉลี่ย (GPAX) ที่ควรมี: {currentPrimaryTarget.gpaxRequired}+
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f0f9ff] border border-[#c4e7ff]/70 text-[12px] leading-relaxed text-[#131b2e]">
              <div className="font-bold text-[#00668a] mb-1">
                📌 สิ่งที่ควรมีในแฟ้มผลงาน 10 หน้าสำหรับคณะนี้:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5">
                {currentPrimaryTarget.portfolioTips && currentPrimaryTarget.portfolioTips.length > 0 ? (
                  currentPrimaryTarget.portfolioTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#00668a] font-bold shrink-0">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-1">
                      <span className="text-[#00668a] font-bold">✓</span>
                      <span>ผลงานชิ้นเอกที่ตรงกับทักษะหลักสูตร 3-5 ชิ้น</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#00668a] font-bold">✓</span>
                      <span>การเขียนอธิบายแนวคิดและการเรียนรู้ (Reflection)</span>
                    </li>
                    <li className="flex items-start gap-1">
                      <span className="text-[#00668a] font-bold">✓</span>
                      <span>กิจกรรมเสริมและเกียรติบัตรระดับโรงเรียนขึ้นไป</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 10-Page Interactive Slot Progress */}
      <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#bdc8d1]/30 card-sky-shadow space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00668a] text-[20px]">auto_stories</span>
              <h2 className="text-[16px] font-bold text-[#131b2e]">การจัดสรร 10 หน้า Portfolio ของคุณ</h2>
            </div>
            <p className="text-[12px] text-[#5f5a7c]">
              คำนวณจากชิ้นงานที่คุณบันทึกจริง ({readyProjects.length} ผลงานที่พร้อมใส่)
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#c4e7ff] text-[#001e2c] text-[12px] font-bold">
            พร้อมแล้ว {estimatedPagesDone} / 10 หน้า ({percentDone}%)
          </span>
        </div>

        {/* Fluid wave progress bar */}
        <div className="w-full bg-[#f2f3ff] rounded-full h-3.5 p-0.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#38bdf8] via-[#00668a] to-[#22c990] wave-progress transition-all duration-500"
            style={{ width: `${percentDone}%` }}
          />
        </div>

        {/* 10 Page Visual Slots Strip */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 text-center text-[10px] font-bold">
          {[
            { page: 'P.1-2', label: 'ปก/ประวัติ' },
            { page: 'P.3', label: 'ผลงาน 1' },
            { page: 'P.4', label: 'ผลงาน 1' },
            { page: 'P.5', label: 'ผลงาน 2' },
            { page: 'P.6', label: 'ผลงาน 3' },
            { page: 'P.7', label: 'ผลงาน 4' },
            { page: 'P.8', label: 'ผลงาน 5' },
            { page: 'P.9', label: 'กิจกรรม' },
            { page: 'P.10', label: 'เกียรติบัตร' },
            { page: 'สำรอง', label: 'แถม' },
          ].map((slot, idx) => {
            const isFilled = idx < readyProjects.length * 2;
            return (
              <div
                key={idx}
                className={`p-2 rounded-xl border transition-all ${
                  isFilled
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                    : 'bg-[#faf8ff] text-[#6e7980] border-dashed border-[#bdc8d1]'
                }`}
              >
                <div>{slot.page}</div>
                <div className="text-[9px] font-normal truncate mt-0.5">{slot.label}</div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-[11px] text-[#5f5a7c]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            พร้อมใส่แล้ว: <strong>{readyProjects.length} ชิ้น</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            กำลังผลิต: <strong>{editingProjects.length} ชิ้น</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-300" />
            ไอเดีย/วางแผน: <strong>{plannedProjects.length} ชิ้น</strong>
          </span>
        </div>
      </section>

      {/* 5. Projects Showcase & Management */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {(['all', 'ready', 'editing', 'planned'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold transition-all cursor-pointer ${
                  filterTab === tab
                    ? 'bg-[#00668a] text-white shadow-xs'
                    : 'bg-white text-[#5f5a7c] border border-[#bdc8d1]/40 hover:bg-[#f2f3ff]'
                }`}
              >
                {tab === 'all' && `ทั้งหมด (${projects.length})`}
                {tab === 'ready' && `พร้อมใส่ (${readyProjects.length})`}
                {tab === 'editing' && `กำลังผลิต (${editingProjects.length})`}
                {tab === 'planned' && `วางแผน (${plannedProjects.length})`}
              </button>
            ))}
          </div>
        </div>

        {displayedProjects.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-white border border-dashed border-[#c4e7ff] space-y-3">
            <span className="material-symbols-outlined text-[40px] text-[#00668a]">folder_open</span>
            <div className="text-[16px] font-bold text-[#131b2e]">ยังไม่มีผลงานในพอร์ตของคุณ</div>
            <p className="text-[12px] text-[#5f5a7c] max-w-sm mx-auto">
              เริ่มต้นสร้างแฟ้มผลงาน 10 หน้าของคุณเองได้เลย หรือกดโหลดโครงสร้างตัวอย่างเพื่อเป็นแนวทาง
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setEditingProjectId(null);
                  setNewTitle('');
                  setIsAddModalOpen(true);
                }}
                className="px-4 py-2 rounded-full bg-[#00668a] text-white text-[12px] font-bold hover:bg-[#004965] cursor-pointer shadow-sm"
              >
                + เพิ่มผลงานใหม่
              </button>
              <button
                onClick={loadPortfolioTemplate}
                className="px-4 py-2 rounded-full bg-white text-[#00668a] border border-[#c4e7ff] text-[12px] font-bold hover:bg-[#f2f3ff] cursor-pointer"
              >
                โหลดตัวอย่างโครงสร้าง
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedProjects.map(proj => (
              <div
                key={proj.id}
                className="bg-white rounded-3xl p-5 border border-[#bdc8d1]/30 card-sky-shadow flex flex-col justify-between gap-3 group hover:border-[#00668a] transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f2f3ff] text-[#00668a] border border-[#c4e7ff]">
                      {proj.pageSlots}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        proj.status === 'พร้อมใส่ Portfolio'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : proj.status === 'กำลังตัดต่อ / ผลิต'
                          ? 'bg-sky-50 text-sky-700 border border-sky-200'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}
                    >
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="text-[15px] font-extrabold text-[#131b2e] leading-snug group-hover:text-[#00668a] transition-colors">
                    {proj.title}
                  </h3>

                  <div className="text-[11px] text-[#5f5a7c] font-medium mt-1">
                    บทบาท: {proj.role}
                  </div>

                  <p className="text-[12px] text-[#3e484f] mt-2 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>

                  {proj.tools && proj.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {proj.tools.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] bg-[#f2f3ff] text-[#5f5a7c]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#bdc8d1]/20 flex items-center justify-between text-[11px]">
                  <span className="text-[#6e7980]">{proj.category}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleStartEdit(proj)}
                      className="text-[#00668a] hover:underline font-bold cursor-pointer"
                    >
                      แก้ไข
                    </button>
                    <span className="text-[#bdc8d1]">•</span>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="text-rose-600 hover:underline cursor-pointer"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add / Edit Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#c4e7ff] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#bdc8d1]/30 pb-3">
              <h3 className="text-[18px] font-bold text-[#131b2e]">
                {editingProjectId ? 'แก้ไขผลงาน' : 'เพิ่มผลงานใหม่ลงใน Portfolio 10 หน้า'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#6e7980] hover:text-[#131b2e] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdateProject} className="space-y-3.5 text-[13px]">
              <div>
                <label className="block font-bold text-[#131b2e] mb-1">ชื่อผลงาน / ชื่องาน *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น Short Film: The Silent Echo หรือ ภาพถ่ายสารคดี..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] focus:border-[#00668a] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">หมวดหมู่ผลงาน</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    placeholder="เช่น ออกแบบกราฟิก, แอนิเมชัน, วิจัย"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">หน้าในพอร์ต 10 หน้า</label>
                  <select
                    value={newPageSlot}
                    onChange={e => setNewPageSlot(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] outline-none"
                  >
                    <option value="หน้าที่ 3 - 4">หน้าที่ 3 - 4 (ผลงานหลัก ชิ้นที่ 1)</option>
                    <option value="หน้าที่ 5">หน้าที่ 5 (ผลงานชิ้นที่ 2)</option>
                    <option value="หน้าที่ 6">หน้าที่ 6 (ผลงานชิ้นที่ 3)</option>
                    <option value="หน้าที่ 7">หน้าที่ 7 (ผลงานชิ้นที่ 4)</option>
                    <option value="หน้าที่ 8">หน้าที่ 8 (ผลงานชิ้นที่ 5)</option>
                    <option value="หน้าที่ 9">หน้าที่ 9 (กิจกรรม & ค่ายวิชาการ)</option>
                    <option value="หน้าที่ 10">หน้าที่ 10 (เกียรติบัตร / รางวัล)</option>
                    <option value="สำรอง (แถม)">สำรอง (แถม / ลิงก์ออนไลน์)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">บทบาทของคุณ</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={e => setNewRole(e.target.value)}
                    placeholder="เช่น ผู้กำกับ, นักออกแบบ, หัวหน้าทีม"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">สถานะชิ้นงาน</label>
                  <select
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] outline-none"
                  >
                    <option value="พร้อมใส่ Portfolio">พร้อมใส่ Portfolio</option>
                    <option value="กำลังตัดต่อ / ผลิต">กำลังตัดต่อ / ผลิต</option>
                    <option value="ไอเดีย / วางแผน">ไอเดีย / วางแผน</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#131b2e] mb-1">เครื่องมือหรือโปรแกรมที่ใช้ (คั่นด้วยจุลภาค)</label>
                <input
                  type="text"
                  value={newTools}
                  onChange={e => setNewTools(e.target.value)}
                  placeholder="เช่น Canva, Photoshop, Premiere Pro, Figma"
                  className="w-full px-3.5 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#131b2e] mb-1">คำอธิบายแนวคิดและผลงาน (Concept & Reflection)</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="อธิบายว่าผลงานนี้คืออะไร ได้เรียนรู้อะไร หรือสะท้อนความสามารถในคณะนี้อย่างไร..."
                  className="w-full px-3.5 py-2 rounded-xl border border-[#bdc8d1]/60 focus:ring-2 focus:ring-[#38bdf8] outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#bdc8d1]/20">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#bdc8d1]/50 text-[#5f5a7c] font-bold hover:bg-[#f2f3ff] cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#00668a] hover:bg-[#004965] text-white font-bold cursor-pointer shadow-md"
                >
                  {editingProjectId ? 'บันทึกการแก้ไข' : 'บันทึกผลงาน'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
