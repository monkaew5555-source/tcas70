import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SideNavBar } from './components/SideNavBar';
import { TopNavBar } from './components/TopNavBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AuthModal } from './components/AuthModal';
import { SpeedQuizModal } from './components/SpeedQuizModal';
import { SkyBlueAiCompanion } from './components/SkyBlueAiCompanion';

// Views
import { DashboardView } from './views/DashboardView';
import { TodayView } from './views/TodayView';
import { PlanView } from './views/PlanView';
import { UniversityView } from './views/UniversityView';
import { PortfolioView } from './views/PortfolioView';
import { MockExamView } from './views/MockExamView';
import { EnglishView } from './views/EnglishView';
import { InterviewView } from './views/InterviewView';
import { FinanceView } from './views/FinanceView';
import { SettingsView } from './views/SettingsView';

const MainLayout: React.FC = () => {
  const { activeTab, authToast, setAuthToast } = useApp();

  return (
    <div className="flex min-h-screen bg-[#faf8ff] text-[#131b2e] selection:bg-[#c4e7ff] selection:text-[#001e2c]">
      {/* Desktop Persistent Left Navigation */}
      <SideNavBar />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen min-w-0 pb-16 lg:pb-6">
        {/* Sticky Top Navigation Bar with Search and Profile */}
        <TopNavBar />

        {/* Dynamic Main View */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-5 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'today' && <TodayView />}
          {activeTab === 'plan' && <PlanView />}
          {activeTab === 'university' && <UniversityView />}
          {activeTab === 'portfolio' && <PortfolioView />}
          {activeTab === 'exams' && <MockExamView />}
          {activeTab === 'english' && <EnglishView />}
          {activeTab === 'interview' && <InterviewView />}
          {activeTab === 'finance' && <FinanceView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Speed Quiz Modal */}
      <SpeedQuizModal />

      {/* Auth & Registration Modal */}
      <AuthModal />

      {/* Nong SkyBlue AI Companion Floating Widget & Drawer */}
      <SkyBlueAiCompanion />

      {/* Toast Notification */}
      {authToast && (
        <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="px-4 py-2.5 rounded-2xl bg-[#00668a] text-white text-[13px] font-bold shadow-xl flex items-center gap-2 border border-[#38bdf8]/40">
            <span className="material-symbols-outlined text-[18px]">info</span>
            <span>{authToast}</span>
            <button
              onClick={() => setAuthToast(null)}
              className="ml-2 hover:opacity-75 cursor-pointer text-white"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
