import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { 
  UserProfile, 
  TaskItem, 
  VocabCard, 
  PortfolioProject, 
  InterviewQuestion, 
  UniversityTarget, 
  AchievementBadge,
  ExamScoreRecord,
  FinancialPlan,
  QuestItem,
  QuestDifficulty
} from '../types';
import { initialUser, initialTasks, initialVocabCards, initialProjects, samplePortfolioTemplates, initialInterviewQuestions, initialUniversities, STUDENT_AVATAR } from '../data/initialData';
import { initialAchievements } from '../data/achievementsData';
import { defaultFinancialPlan, initialQuests, initialCleanExamScores } from '../data/tcasExtensions';
import { triggerConfetti } from '../utils/particleEffect';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  fbSignOut, 
  onAuthStateChanged, 
  doc, 
  setDoc, 
  getDoc, 
  handleFirestoreError, 
  OperationType,
  FirebaseUser 
} from '../firebase';

interface SearchResultItem {
  id: string;
  title: string;
  category: string;
  tab: string;
  icon: string;
  snippet: string;
}

interface AppContextType {
  // User Management
  currentUser: UserProfile;
  allUsers: UserProfile[];
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  register: (name: string, email: string, password: string, school?: string, targetUniversity?: string, targetProgram?: string) => boolean;
  login: (email: string, password: string) => boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  switchUser: (userId: string) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  authToast: string | null;
  setAuthToast: (msg: string | null) => void;
  isLoggingInWithGoogle: boolean;
  firebaseAuthUser: FirebaseUser | null;
  isFirebaseConnected: boolean;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Search Engine
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchResults: SearchResultItem[];
  filteredTasks: TaskItem[];
  filteredProjects: PortfolioProject[];
  filteredVocab: VocabCard[];
  filteredInterviewQuestions: InterviewQuestion[];
  filteredUniversities: UniversityTarget[];

  // Exam Scores
  examScores: ExamScoreRecord[];
  addOrUpdateExamScore: (score: ExamScoreRecord) => void;
  deleteExamScore: (id: string) => void;

  // Financial Planner
  financialPlan: FinancialPlan;
  updateFinancialPlan: (updates: Partial<FinancialPlan>) => void;
  financialCalculations: {
    totalTuition4Years: number;
    totalDorm4Years: number;
    totalLiving4Years: number;
    totalTravel4Years: number;
    totalDevice4Years: number;
    total4YearCost: number;
    totalAnnualCost: number;
    totalMonthlyCost: number;
    total4YearSupport: number;
    netBalance: number;
    monthlyAverageCost: number;
    monthlyAverageIncome: number;
  };

  // Quests & Gamification
  quests: QuestItem[];
  questDifficulty: QuestDifficulty;
  setQuestDifficulty: (diff: QuestDifficulty) => void;
  completeQuest: (questId: string) => void;

  // AI Nong SkyBlue Companion
  isAiChatOpen: boolean;
  setAiChatOpen: (open: boolean) => void;
  openAiChatWithPrompt: (prompt?: string) => void;

  // Tasks & Energy Mode
  tasks: TaskItem[];
  toggleTaskStatus: (id: string) => void;
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  deleteTask: (id: string) => void;
  energyMode: 'normal' | 'low' | 'catchup';
  setEnergyMode: (mode: 'normal' | 'low' | 'catchup') => void;

  // Achievements & Milestones
  achievements: AchievementBadge[];
  claimBadgeReward: (badgeId: string) => void;
  unlockBadge: (badgeId: string) => void;

  // Flashcards
  vocabCards: VocabCard[];
  updateVocabReview: (id: string, result: 'easy' | 'review' | 'hard') => void;

  // Portfolio
  projects: PortfolioProject[];
  addProject: (project: Omit<PortfolioProject, 'id'>) => void;
  deleteProject: (id: string) => void;
  updateProject: (id: string, updates: Partial<PortfolioProject>) => void;
  loadPortfolioTemplate: () => void;

  // Interview
  interviewQuestions: InterviewQuestion[];
  updateInterviewQuestion: (id: string, updates: Partial<InterviewQuestion>) => void;

  // Universities
  universities: UniversityTarget[];
  currentPrimaryTarget: UniversityTarget;
  setPrimaryTarget: (uniId: string) => void;
  setCustomPrimaryTarget: (target: UniversityTarget) => void;

  // Pomodoro Focus Timer
  pomodoro: {
    isRunning: boolean;
    timeLeft: number;
    initialDuration: number;
    mode: 'work' | 'shortBreak' | 'longBreak';
    activeTaskTitle: string;
    toggleTimer: () => void;
    resetTimer: () => void;
    setDuration: (minutes: number) => void;
    setTaskTitle: (title: string) => void;
  };

  // Speed Quiz Modal
  isQuizOpen: boolean;
  setQuizOpen: (open: boolean) => void;

  // Sync & Export/Import
  lastSyncedText: string;
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => boolean;
  resetAllData: () => void;
  clearToCleanState: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load users from LocalStorage
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('tcas70_users');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [initialUser];
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem('tcas70_active_user_id');
      if (savedId) return savedId;
    } catch {
      // ignore
    }
    return initialUser.id;
  });

  const currentUser = useMemo(() => {
    const found = allUsers.find(u => u.id === currentUserId);
    return found || allUsers[0] || initialUser;
  }, [allUsers, currentUserId]);

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authToast, setAuthToast] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Search Query
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Energy Mode
  const [energyMode, setEnergyModeState] = useState<'normal' | 'low' | 'catchup'>(() => currentUser.energyMode || 'normal');

  // Tasks
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const saved = localStorage.getItem(`tcas70_tasks_${currentUser.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialTasks;
  });

  // Vocab
  const [vocabCards, setVocabCards] = useState<VocabCard[]>(() => {
    try {
      const saved = localStorage.getItem(`tcas70_vocab_${currentUser.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialVocabCards;
  });

  // Projects
  const [projects, setProjects] = useState<PortfolioProject[]>(() => {
    try {
      const saved = localStorage.getItem(`tcas70_projects_${currentUser.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialProjects;
  });

  // Interview Questions
  const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>(() => {
    try {
      const saved = localStorage.getItem(`tcas70_interview_${currentUser.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialInterviewQuestions;
  });

  // Achievements
  const [achievements, setAchievements] = useState<AchievementBadge[]>(() => {
    try {
      const saved = localStorage.getItem(`tcas70_achievements_${currentUser.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialAchievements;
  });

  // Universities
  const [universities, setUniversities] = useState<UniversityTarget[]>(() => {
    try {
      const saved = localStorage.getItem(`tcas70_universities_${currentUser.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialUniversities;
  });

  // Exam Scores (starts clean or from saved)
  const [examScores, setExamScores] = useState<ExamScoreRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`tcas70_exam_scores_${currentUser.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialCleanExamScores;
  });

  // Financial Plan
  const [financialPlan, setFinancialPlan] = useState<FinancialPlan>(() => {
    try {
      const saved = localStorage.getItem(`tcas70_finance_${currentUser.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultFinancialPlan;
  });

  // Quests
  const [quests, setQuests] = useState<QuestItem[]>(() => {
    try {
      const saved = localStorage.getItem(`tcas70_quests_${currentUser.id}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialQuests;
  });

  const [questDifficulty, setQuestDifficultyState] = useState<QuestDifficulty>(() => {
    try {
      const saved = localStorage.getItem(`tcas70_quest_difficulty_${currentUser.id}`);
      if (saved && (saved === 'easy' || saved === 'normal' || saved === 'hard')) return saved as QuestDifficulty;
    } catch {
      // ignore
    }
    return 'normal';
  });

  // AI Chat Companion State
  const [isAiChatOpen, setAiChatOpen] = useState(false);

  // Quiz Modal State
  const [isQuizOpen, setQuizOpen] = useState(false);

  // Pomodoro
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pomodoroDuration, setPomodoroDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [activeTaskTitle, setActiveTaskTitle] = useState('ร่างบทแนะนำตัวภาษาอังกฤษ 2 นาที');

  // Sync Status
  const [lastSyncedText, setLastSyncedText] = useState('ซิงก์แล้ว ✓');

  // Firebase Auth & Cloud States
  const [isLoggingInWithGoogle, setIsLoggingInWithGoogle] = useState(false);
  const [firebaseAuthUser, setFirebaseAuthUser] = useState<FirebaseUser | null>(null);
  const [isFirebaseConnected] = useState(true);

  // Timer Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  // Save Users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tcas70_users', JSON.stringify(allUsers));
      localStorage.setItem('tcas70_active_user_id', currentUserId);
    } catch {
      // ignore
    }
  }, [allUsers, currentUserId]);

  // Save user-specific items whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(`tcas70_tasks_${currentUser.id}`, JSON.stringify(tasks));
      localStorage.setItem(`tcas70_vocab_${currentUser.id}`, JSON.stringify(vocabCards));
      localStorage.setItem(`tcas70_projects_${currentUser.id}`, JSON.stringify(projects));
      localStorage.setItem(`tcas70_interview_${currentUser.id}`, JSON.stringify(interviewQuestions));
      localStorage.setItem(`tcas70_universities_${currentUser.id}`, JSON.stringify(universities));
      localStorage.setItem(`tcas70_achievements_${currentUser.id}`, JSON.stringify(achievements));
      localStorage.setItem(`tcas70_exam_scores_${currentUser.id}`, JSON.stringify(examScores));
      localStorage.setItem(`tcas70_finance_${currentUser.id}`, JSON.stringify(financialPlan));
      localStorage.setItem(`tcas70_quests_${currentUser.id}`, JSON.stringify(quests));
      setLastSyncedText('ซิงก์แล้ว ✓');
    } catch {
      // ignore
    }
  }, [tasks, vocabCards, projects, interviewQuestions, universities, achievements, examScores, financialPlan, quests, currentUser.id]);

  // Auth Functions
  const register = (name: string, email: string, password: string, school = '', targetUniversity = 'มหาวิทยาลัยขอนแก่น (KKUIC)', targetProgram = 'เทคโนโลยีสื่อสร้างสรรค์ (Creative Media Technology)') => {
    if (!name || !email || !password) return false;
    const existing = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setAuthToast('อีเมลนี้ถูกใช้งานแล้ว กรุณาเข้าสู่ระบบ');
      return false;
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name,
      email,
      school: school || 'โรงเรียนมัธยมศึกษา',
      educationPlan: 'สายศิลป์-ภาษา / วิทย์-คอมฯ',
      gpax: 3.50,
      targetUniversity,
      targetFaculty: 'วิทยาลัยนานาชาติ',
      targetProgram,
      targetRound: 'รอบ 1 Portfolio',
      avatarUrl: STUDENT_AVATAR,
      energyMode: 'normal',
      streakDays: 1,
      exp: 100,
      level: 1,
      theme: 'sweet-sky',
      focusDuration: 45,
      dndNight: true,
      googleSynced: false,
      registeredAt: new Date().toISOString().split('T')[0]
    };

    setAllUsers(prev => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    setTasks(initialTasks);
    setVocabCards(initialVocabCards);
    setProjects(initialProjects);
    setInterviewQuestions(initialInterviewQuestions);
    setUniversities(initialUniversities);
    setAuthToast(`ยินดีต้อนรับคุณ ${name}! สมัครสมาชิกสำเร็จ ✨`);
    setAuthModalOpen(false);
    return true;
  };

  const login = (email: string, _password: string) => {
    const found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUserId(found.id);
      setEnergyModeState(found.energyMode || 'normal');
      setAuthToast(`ยินดีต้อนรับกลับ คุณ ${found.name} 🩵`);
      setAuthModalOpen(false);
      return true;
    }
    // If not found in demo, register on-the-fly with friendly name
    const username = email.split('@')[0];
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: username.charAt(0).toUpperCase() + username.slice(1),
      email,
      school: 'โรงเรียนขอนแก่นวิทยายน',
      educationPlan: 'สายศิลป์-ภาษา',
      gpax: 3.45,
      targetUniversity: 'มหาวิทยาลัยขอนแก่น (KKUIC)',
      targetFaculty: 'วิทยาลัยนานาชาติ',
      targetProgram: 'สาขาวิชาเทคโนโลยีสื่อสร้างสรรค์',
      targetRound: 'รอบ 1 Portfolio',
      avatarUrl: STUDENT_AVATAR,
      energyMode: 'normal',
      streakDays: 3,
      exp: 450,
      level: 3,
      theme: 'sweet-sky',
      focusDuration: 45,
      dndNight: true,
      googleSynced: false,
      registeredAt: new Date().toISOString().split('T')[0]
    };
    setAllUsers(prev => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    setAuthToast(`เข้าสู่ระบบและสร้างบัญชีใหม่เรียบร้อย ✓`);
    setAuthModalOpen(false);
    return true;
  };

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setFirebaseAuthUser(fbUser);
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const profile = userSnap.data() as UserProfile;
            setAllUsers(prev => [profile, ...prev.filter(u => u.id !== profile.id)]);
            setCurrentUserId(profile.id);

            // Fetch user's studyData
            const studyDocRef = doc(db, 'users', fbUser.uid, 'studyData', 'main');
            const studySnap = await getDoc(studyDocRef);
            if (studySnap.exists()) {
              const sData = studySnap.data();
              if (Array.isArray(sData.tasks)) setTasks(sData.tasks);
              if (Array.isArray(sData.vocabCards)) setVocabCards(sData.vocabCards);
              if (Array.isArray(sData.projects)) setProjects(sData.projects);
              if (Array.isArray(sData.interviewQuestions)) setInterviewQuestions(sData.interviewQuestions);
              if (Array.isArray(sData.universities)) setUniversities(sData.universities);
              if (Array.isArray(sData.achievements)) setAchievements(sData.achievements);
            }
          }
        } catch (e) {
          console.warn('Firebase session restore note:', e);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync to Firestore when logged in via Firebase
  useEffect(() => {
    if (!firebaseAuthUser) return;
    const saveToFirestore = async () => {
      try {
        const studyDocRef = doc(db, 'users', firebaseAuthUser.uid, 'studyData', 'main');
        await setDoc(studyDocRef, {
          userId: firebaseAuthUser.uid,
          tasks,
          vocabCards,
          projects,
          interviewQuestions,
          universities,
          achievements,
          updatedAt: new Date().toISOString()
        }, { merge: true });
        setLastSyncedText('ซิงก์คลาวด์ Firebase แล้ว ✓');
      } catch (err) {
        console.warn('Firestore cloud sync note:', err);
      }
    };

    const timer = setTimeout(saveToFirestore, 1200);
    return () => clearTimeout(timer);
  }, [firebaseAuthUser, tasks, vocabCards, projects, interviewQuestions, universities, achievements]);

  const loginWithGoogle = async () => {
    setIsLoggingInWithGoogle(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      setFirebaseAuthUser(fbUser);

      // Check or create user profile in Firestore
      const userDocRef = doc(db, 'users', fbUser.uid);
      const userSnap = await getDoc(userDocRef);

      let profile: UserProfile;
      if (userSnap.exists()) {
        const data = userSnap.data() as UserProfile;
        profile = {
          ...data,
          avatarUrl: fbUser.photoURL || data.avatarUrl || STUDENT_AVATAR,
          googleSynced: true
        };
      } else {
        profile = {
          id: fbUser.uid,
          name: fbUser.displayName || 'มิว (TCAS70 Student)',
          email: fbUser.email || 'student@tcas70.ac.th',
          school: 'โรงเรียนขอนแก่นวิทยายน',
          educationPlan: 'สายศิลป์-ภาษา (เทคโนโลยีสื่อสร้างสรรค์)',
          gpax: 3.50,
          targetUniversity: 'มหาวิทยาลัยขอนแก่น (KKUIC)',
          targetFaculty: 'วิทยาลัยนานาชาติ',
          targetProgram: 'สาขาวิชาเทคโนโลยีสื่อสร้างสรรค์ (Creative Media Technology)',
          targetRound: 'รอบ 1 Portfolio',
          avatarUrl: fbUser.photoURL || STUDENT_AVATAR,
          energyMode: 'normal',
          streakDays: 7,
          exp: 3450,
          level: 14,
          theme: 'sweet-sky',
          focusDuration: 45,
          dndNight: true,
          googleSynced: true,
          registeredAt: new Date().toISOString().split('T')[0]
        };
        try {
          await setDoc(userDocRef, {
            ...profile,
            updatedAt: new Date().toISOString()
          });
        } catch (e) {
          handleFirestoreError(e, OperationType.CREATE, `users/${fbUser.uid}`);
        }
      }

      // Check or create studyData
      const studyDocRef = doc(db, 'users', fbUser.uid, 'studyData', 'main');
      const studySnap = await getDoc(studyDocRef);
      if (studySnap.exists()) {
        const sData = studySnap.data();
        if (Array.isArray(sData.tasks)) setTasks(sData.tasks);
        if (Array.isArray(sData.vocabCards)) setVocabCards(sData.vocabCards);
        if (Array.isArray(sData.projects)) setProjects(sData.projects);
        else setProjects([]);
        if (Array.isArray(sData.interviewQuestions)) setInterviewQuestions(sData.interviewQuestions);
        if (Array.isArray(sData.universities)) setUniversities(sData.universities);
        if (Array.isArray(sData.achievements)) setAchievements(sData.achievements);
        if (Array.isArray(sData.examScores)) setExamScores(sData.examScores);
        else setExamScores([]);
        if (sData.financialPlan) setFinancialPlan(sData.financialPlan);
        if (Array.isArray(sData.quests)) setQuests(sData.quests);
      } else {
        // Brand new account: start clean and isolated (do NOT inherit in-memory state of previous user)
        const freshTasks = initialTasks.map(t => ({ ...t, status: 'pending' as const }));
        const freshProjects: PortfolioProject[] = [];
        const freshExamScores: ExamScoreRecord[] = [];
        const freshFinance = defaultFinancialPlan;
        const freshQuests = initialQuests;

        setTasks(freshTasks);
        setProjects(freshProjects);
        setExamScores(freshExamScores);
        setFinancialPlan(freshFinance);
        setQuests(freshQuests);

        try {
          await setDoc(studyDocRef, {
            userId: fbUser.uid,
            tasks: freshTasks,
            vocabCards: initialVocabCards,
            projects: freshProjects,
            interviewQuestions: initialInterviewQuestions,
            universities: initialUniversities,
            achievements: initialAchievements,
            examScores: freshExamScores,
            financialPlan: freshFinance,
            quests: freshQuests,
            updatedAt: new Date().toISOString()
          });
        } catch (e) {
          handleFirestoreError(e, OperationType.CREATE, `users/${fbUser.uid}/studyData/main`);
        }
      }

      setAllUsers(prev => [profile, ...prev.filter(u => u.id !== profile.id)]);
      setCurrentUserId(profile.id);
      setAuthToast(`เข้าสู่ระบบด้วย Google สำเร็จ: ${profile.name} ✨ (แยกข้อมูลบัญชีเรียบร้อย)`);
      setAuthModalOpen(false);
    } catch (err: any) {
      console.error('Google Sign-in error:', err);
      if (err?.code === 'auth/popup-closed-by-user') {
        setAuthToast('การเข้าสู่ระบบถูกยกเลิก (หน้าต่าง Popup ถูกปิดก่อนเสร็จสิ้น)');
      } else if (err?.code === 'auth/cancelled-popup-request') {
        // user clicked again or cancelled
      } else {
        setAuthToast(`เข้าสู่ระบบ Google ไม่สำเร็จ: ${err?.message || 'โปรดลองใหม่อีกครั้ง'}`);
      }
    } finally {
      setIsLoggingInWithGoogle(false);
    }
  };

  const logout = async () => {
    try {
      if (auth.currentUser) {
        await fbSignOut(auth);
      }
    } catch (e) {
      console.warn('Sign out warning:', e);
    }
    setFirebaseAuthUser(null);
    const offlineUser = allUsers.find(u => !u.googleSynced) || allUsers[0];
    if (offlineUser) {
      setCurrentUserId(offlineUser.id);
      // Reload offline user's isolated data
      try {
        const savedProjects = localStorage.getItem(`tcas70_projects_${offlineUser.id}`);
        setProjects(savedProjects ? JSON.parse(savedProjects) : []);
        const savedScores = localStorage.getItem(`tcas70_exam_scores_${offlineUser.id}`);
        setExamScores(savedScores ? JSON.parse(savedScores) : []);
      } catch (err) {
        console.warn('Error reloading offline user data:', err);
      }
    }
    setAuthToast('ออกจากระบบเรียบร้อยแล้ว ข้อมูลแยกตามบัญชีอย่างปลอดภัย');
  };

  const switchUser = (userId: string) => {
    const target = allUsers.find(u => u.id === userId);
    if (target) {
      setCurrentUserId(target.id);
      setEnergyModeState(target.energyMode);
      setAuthToast(`สลับบัญชีเป็น: ${target.name}`);
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return { ...u, ...updates };
      }
      return u;
    }));
    setLastSyncedText('ซิงก์แล้ว ✓');
  };

  const setEnergyMode = (mode: 'normal' | 'low' | 'catchup') => {
    setEnergyModeState(mode);
    updateUserProfile({ energyMode: mode });
  };

  // Task Actions
  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'completed' ? 'pending' : 'completed';
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const addTask = (newTask: Omit<TaskItem, 'id'>) => {
    const item: TaskItem = {
      ...newTask,
      id: `task-${Date.now()}`
    };
    setTasks(prev => [item, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Vocab Action
  const updateVocabReview = (id: string, result: 'easy' | 'review' | 'hard') => {
    setVocabCards(prev => prev.map(c => {
      if (c.id === id) {
        let box = c.reviewBox;
        if (result === 'easy') box = Math.min(4, box + 1) as 1 | 2 | 3 | 4;
        if (result === 'hard') box = 1;
        return { ...c, reviewBox: box, lastReviewed: new Date().toISOString() };
      }
      return c;
    }));
  };

  // Portfolio
  const addProject = (p: Omit<PortfolioProject, 'id'>) => {
    const item: PortfolioProject = {
      ...p,
      id: `p-${Date.now()}`
    };
    setProjects(prev => [...prev, item]);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setAuthToast('ลบผลงานออกจากแฟ้มสะสมแล้ว');
  };

  const updateProject = (id: string, updates: Partial<PortfolioProject>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    setAuthToast('อัปเดตข้อมูลผลงานเรียบร้อยแล้ว');
  };

  const loadPortfolioTemplate = () => {
    setProjects(samplePortfolioTemplates);
    setAuthToast('โหลดโครงสร้างผลงานตัวอย่าง 6 รายการเรียบร้อย ✨');
  };

  // Interview Question
  const updateInterviewQuestion = (id: string, updates: Partial<InterviewQuestion>) => {
    setInterviewQuestions(prev => prev.map(q => {
      if (q.id === id) {
        return { ...q, ...updates };
      }
      return q;
    }));
  };

  // Achievements Actions
  const claimBadgeReward = (badgeId: string) => {
    const badge = achievements.find(b => b.id === badgeId);
    if (!badge || badge.claimed || !badge.isUnlocked) return;

    setAchievements(prev => prev.map(b => {
      if (b.id === badgeId) {
        return { ...b, claimed: true };
      }
      return b;
    }));

    // Grant EXP and check for Level Up
    const newExp = currentUser.exp + badge.rewardExp;
    const newLevel = Math.max(currentUser.level, Math.floor(newExp / 250) + 1);
    const leveledUp = newLevel > currentUser.level;

    updateUserProfile({
      exp: newExp,
      level: newLevel
    });

    if (leveledUp) {
      setAuthToast(`🎉 เลเวลอัปเป็น Lv.${newLevel}! ปลดล็อกโบนัสและเหรียญตรา: ${badge.titleTh} (+${badge.rewardExp} EXP) ✨`);
    } else {
      setAuthToast(`🏆 เคลมรางวัลเหรียญตรา: ${badge.titleTh} (+${badge.rewardExp} EXP) สำเร็จ!`);
    }
  };

  const unlockBadge = (badgeId: string) => {
    setAchievements(prev => prev.map(b => {
      if (b.id === badgeId && !b.isUnlocked) {
        return {
          ...b,
          isUnlocked: true,
          progress: b.maxProgress,
          unlockedDate: 'วันนี้',
          claimed: false
        };
      }
      return b;
    }));
  };

  // Primary Target
  const currentPrimaryTarget = useMemo(() => {
    return universities.find(u => u.rank === 1) || universities[0] || initialUniversities[0];
  }, [universities]);

  const setPrimaryTarget = (uniId: string) => {
    setUniversities(prev => prev.map(u => {
      if (u.id === uniId) {
        return { ...u, rank: 1 };
      }
      return { ...u, rank: u.rank === 1 ? 2 : u.rank };
    }));
    const targetUni = universities.find(u => u.id === uniId);
    if (targetUni) {
      updateUserProfile({
        targetUniversity: targetUni.name,
        targetFaculty: targetUni.faculty,
        targetProgram: targetUni.program
      });
      setAuthToast(`เปลี่ยนเป้าหมายหลักเป็น: ${targetUni.name} เรียบร้อย ✦`);
    }
  };

  // Custom Primary Target Setter
  const setCustomPrimaryTarget = (target: UniversityTarget) => {
    setUniversities(prev => {
      const existing = prev.findIndex(u => u.name === target.name && u.faculty === target.faculty);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = { ...target, rank: 1 };
        return updated.map((u, i) => i === existing ? u : { ...u, rank: u.rank === 1 ? 2 : u.rank });
      }
      return [{ ...target, rank: 1 }, ...prev.map(u => ({ ...u, rank: u.rank === 1 ? 2 : u.rank }))];
    });

    updateUserProfile({
      targetUniversity: target.name,
      targetFaculty: target.faculty,
      targetProgram: target.program,
    });

    if (target.tuitionEstimate) {
      setFinancialPlan(prev => ({ ...prev, tuitionFeePerTerm: target.tuitionEstimate || prev.tuitionFeePerTerm }));
    }

    completeQuest('q-1');
    setAuthToast(`บันทึกเป้าหมายมหาวิทยาลัย: ${target.name} (${target.faculty}) สำเร็จ ✦`);
  };

  // Exam Scores Handlers
  const addOrUpdateExamScore = (score: ExamScoreRecord) => {
    setExamScores(prev => {
      const existing = prev.findIndex(s => s.id === score.id || (s.subjectCode === score.subjectCode && s.subjectName === score.subjectName));
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = score;
        return updated;
      }
      return [score, ...prev];
    });
    setAuthToast(`บันทึกคะแนน ${score.subjectName}: ${score.score}/${score.maxScore} สำเร็จ ✦`);
    completeQuest('q-2');
  };

  const deleteExamScore = (id: string) => {
    setExamScores(prev => prev.filter(s => s.id !== id));
    setAuthToast('ลบรายการคะแนนสอบแล้ว');
  };

  // Financial Planner Handlers & Calculations
  const updateFinancialPlan = (updates: Partial<FinancialPlan>) => {
    setFinancialPlan(prev => ({ ...prev, ...updates }));
    completeQuest('q-4');
  };

  const financialCalculations = useMemo(() => {
    const years = financialPlan.yearsOfStudy || 4;
    const terms = financialPlan.termsPerYear || 2;
    const months = years * 12;

    const totalTuition4Years = (financialPlan.tuitionFeePerTerm || 0) * terms * years;
    const totalDorm4Years = (financialPlan.dormFeePerMonth || 0) * months;
    const totalLiving4Years = (financialPlan.livingCostPerMonth || 0) * months;
    const totalTravel4Years = (financialPlan.travelCostPerMonth || 0) * months;
    const totalDevice4Years = (financialPlan.deviceAndBooksPerYear || 0) * years;
    const total4YearCost = totalTuition4Years + totalDorm4Years + totalLiving4Years + totalTravel4Years + totalDevice4Years + (financialPlan.tcasPrepCost || 0);

    const totalAnnualCost = Math.round(total4YearCost / years);
    const totalMonthlyCost = Math.round(total4YearCost / months);

    const totalFamilySupport = (financialPlan.familySupportPerMonth || 0) * months;
    const totalScholarship = (financialPlan.scholarshipPerYear || 0) * years;
    const totalLoan = (financialPlan.studentLoanPerTerm || 0) * terms * years;
    const totalPartTime = (financialPlan.partTimeIncomePerMonth || 0) * months;
    const total4YearSupport = totalFamilySupport + totalScholarship + totalLoan + totalPartTime + (financialPlan.personalSavings || 0);

    const netBalance = total4YearSupport - total4YearCost;
    const monthlyAverageCost = totalMonthlyCost;
    const monthlyAverageIncome = (financialPlan.familySupportPerMonth || 0) + (financialPlan.partTimeIncomePerMonth || 0) + Math.round((totalScholarship + totalLoan) / months);

    return {
      totalTuition4Years,
      totalDorm4Years,
      totalLiving4Years,
      totalTravel4Years,
      totalDevice4Years,
      total4YearCost,
      totalAnnualCost,
      totalMonthlyCost,
      total4YearSupport,
      netBalance,
      monthlyAverageCost,
      monthlyAverageIncome,
    };
  }, [financialPlan]);

  // Quests & Gamification
  const setQuestDifficulty = (diff: QuestDifficulty) => {
    setQuestDifficultyState(diff);
    try {
      localStorage.setItem(`tcas70_quest_difficulty_${currentUser.id}`, diff);
    } catch {
      // ignore
    }
    const diffNames = { easy: 'ระดับง่าย (Easy)', normal: 'ระดับปกติ (TCAS Standard)', hard: 'ระดับท้าทาย (Hardcore)' };
    setAuthToast(`ปรับระดับความยากเควสเป็น: ${diffNames[diff]} เรียบร้อย!`);
  };

  const completeQuest = (questId: string) => {
    const targetQuest = quests.find(q => q.id === questId);
    if (!targetQuest || targetQuest.isCompleted) return;

    const multiplier = questDifficulty === 'hard' ? 1.5 : questDifficulty === 'easy' ? 0.9 : 1.2;
    const rewardedExp = Math.round(targetQuest.expReward * multiplier);

    setQuests(prev => prev.map(q => q.id === questId ? { ...q, isCompleted: true, completedAt: 'วันนี้' } : q));

    // Particle celebration
    triggerConfetti();

    // Reward exp
    const newExp = currentUser.exp + rewardedExp;
    const newLevel = Math.max(currentUser.level, Math.floor(newExp / 250) + 1);
    const leveledUp = newLevel > currentUser.level;

    updateUserProfile({
      exp: newExp,
      level: newLevel,
    });

    if (leveledUp) {
      setAuthToast(`🎉 เลเวลอัปเป็น Lv.${newLevel}! เควสสำเร็จ: ${targetQuest.title} (+${rewardedExp} EXP) ✨`);
    } else {
      setAuthToast(`🎯 เควสสำเร็จ: ${targetQuest.title} (+${rewardedExp} EXP) ✨`);
    }
  };

  const openAiChatWithPrompt = (_prompt?: string) => {
    setAiChatOpen(true);
  };

  const clearToCleanState = () => {
    setExamScores([]);
    setProjects([]);
    setFinancialPlan({
      ...defaultFinancialPlan,
      tuitionFeePerTerm: currentPrimaryTarget.tuitionEstimate || 48000,
      personalSavings: 0,
    });
    setTasks(initialTasks.map(t => ({ ...t, status: 'pending' as const })));
    setAuthToast('เคลียร์ข้อมูลตัวอย่างสำเร็จ เริ่มต้นบันทึกข้อมูลจริงของคุณได้เลย ✦');
  };

  // Filtered Items based on Search Query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const results: SearchResultItem[] = [];

    // Search tasks
    tasks.forEach(t => {
      if (t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)) {
        results.push({
          id: `task-${t.id}`,
          title: t.title,
          category: `ภารกิจ • ${t.category}`,
          tab: 'today',
          icon: 'task_alt',
          snippet: t.description
        });
      }
    });

    // Search universities
    universities.forEach(u => {
      if (u.name.toLowerCase().includes(q) || u.program.toLowerCase().includes(q) || u.faculty.toLowerCase().includes(q)) {
        results.push({
          id: `uni-${u.id}`,
          title: u.name,
          category: `มหาวิทยาลัย • ${u.round}`,
          tab: 'university',
          icon: 'school',
          snippet: `${u.faculty} - ${u.program}`
        });
      }
    });

    // Search portfolio
    projects.forEach(p => {
      if (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tools.some(tool => tool.toLowerCase().includes(q))) {
        results.push({
          id: `proj-${p.id}`,
          title: p.title,
          category: `พอร์ตโฟลิโอ • ${p.category}`,
          tab: 'portfolio',
          icon: 'folder_special',
          snippet: p.description
        });
      }
    });

    // Search vocab
    vocabCards.forEach(v => {
      if (v.word.toLowerCase().includes(q) || v.meaningTh.toLowerCase().includes(q) || v.exampleEn.toLowerCase().includes(q)) {
        results.push({
          id: `vocab-${v.id}`,
          title: `${v.word} (${v.phonetic})`,
          category: `คำศัพท์ • ${v.category}`,
          tab: 'english',
          icon: 'translate',
          snippet: v.meaningTh
        });
      }
    });

    // Search interview
    interviewQuestions.forEach(iq => {
      if (iq.questionEn.toLowerCase().includes(q) || iq.contextTh.toLowerCase().includes(q)) {
        results.push({
          id: `iq-${iq.id}`,
          title: iq.questionEn,
          category: `สัมภาษณ์ • ${iq.category}`,
          tab: 'interview',
          icon: 'record_voice_over',
          snippet: iq.contextTh
        });
      }
    });

    // Search achievements & badges
    achievements.forEach(ach => {
      if (
        ach.titleTh.toLowerCase().includes(q) ||
        ach.titleEn.toLowerCase().includes(q) ||
        ach.descriptionTh.toLowerCase().includes(q) ||
        'เหรียญตรา'.includes(q) ||
        'achievement'.includes(q) ||
        'milestone'.includes(q)
      ) {
        results.push({
          id: `ach-${ach.id}`,
          title: `${ach.titleTh} (${ach.titleEn})`,
          category: `เหรียญตรา • ${ach.isUnlocked ? 'ปลดล็อกแล้ว ✦' : 'กำลังสะสม'}`,
          tab: 'dashboard',
          icon: 'military_tech',
          snippet: `${ach.descriptionTh} (+${ach.rewardExp} EXP)`
        });
      }
    });

    return results;
  }, [searchQuery, tasks, universities, projects, vocabCards, interviewQuestions, achievements]);

  const filteredTasks = useMemo(() => {
    let list = tasks;
    if (energyMode === 'low') {
      list = list.filter(t => t.priority === 'high' || t.estimatedMinutes <= 20);
    } else if (energyMode === 'catchup') {
      list = list.filter(t => t.status !== 'completed');
    }
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase().trim();
    return list.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  }, [tasks, energyMode, searchQuery]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;
    const q = searchQuery.toLowerCase().trim();
    return projects.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tools.some(t => t.toLowerCase().includes(q)));
  }, [projects, searchQuery]);

  const filteredVocab = useMemo(() => {
    if (!searchQuery.trim()) return vocabCards;
    const q = searchQuery.toLowerCase().trim();
    return vocabCards.filter(v => v.word.toLowerCase().includes(q) || v.meaningTh.toLowerCase().includes(q) || v.category.toLowerCase().includes(q));
  }, [vocabCards, searchQuery]);

  const filteredInterviewQuestions = useMemo(() => {
    if (!searchQuery.trim()) return interviewQuestions;
    const q = searchQuery.toLowerCase().trim();
    return interviewQuestions.filter(iq => iq.questionEn.toLowerCase().includes(q) || iq.contextTh.toLowerCase().includes(q) || iq.category.toLowerCase().includes(q));
  }, [interviewQuestions, searchQuery]);

  const filteredUniversities = useMemo(() => {
    if (!searchQuery.trim()) return universities;
    const q = searchQuery.toLowerCase().trim();
    return universities.filter(u => u.name.toLowerCase().includes(q) || u.program.toLowerCase().includes(q) || u.faculty.toLowerCase().includes(q));
  }, [universities, searchQuery]);

  // Pomodoro Controls
  const toggleTimer = () => setIsTimerRunning(prev => !prev);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(pomodoroDuration);
  };
  const setDuration = (minutes: number) => {
    setIsTimerRunning(false);
    setPomodoroDuration(minutes * 60);
    setTimeLeft(minutes * 60);
  };

  // Data Export & Import
  const exportDataJSON = () => {
    const dataToExport = {
      user: currentUser,
      tasks,
      vocabCards,
      projects,
      interviewQuestions,
      universities,
      achievements,
      examScores,
      financialPlan,
      quests,
      questDifficulty,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TCAS70_Backup_${currentUser.name}_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setAuthToast('ส่งออกข้อมูล JSON เรียบร้อยแล้ว ✓');
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.user) updateUserProfile(data.user);
      if (Array.isArray(data.tasks)) setTasks(data.tasks);
      if (Array.isArray(data.vocabCards)) setVocabCards(data.vocabCards);
      if (Array.isArray(data.projects)) setProjects(data.projects);
      if (Array.isArray(data.interviewQuestions)) setInterviewQuestions(data.interviewQuestions);
      if (Array.isArray(data.universities)) setUniversities(data.universities);
      if (Array.isArray(data.achievements)) setAchievements(data.achievements);
      if (Array.isArray(data.examScores)) setExamScores(data.examScores);
      if (data.financialPlan) setFinancialPlan(data.financialPlan);
      if (Array.isArray(data.quests)) setQuests(data.quests);
      if (data.questDifficulty) setQuestDifficultyState(data.questDifficulty);
      setAuthToast('นำเข้าข้อมูลสำเร็จเรียบร้อย ✓');
      return true;
    } catch {
      setAuthToast('ไฟล์ข้อมูล JSON ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง');
      return false;
    }
  };

  const resetAllData = () => {
    setTasks(initialTasks);
    setVocabCards(initialVocabCards);
    setProjects(initialProjects);
    setInterviewQuestions(initialInterviewQuestions);
    setUniversities(initialUniversities);
    setAchievements(initialAchievements);
    setExamScores(initialCleanExamScores);
    setFinancialPlan(defaultFinancialPlan);
    setQuests(initialQuests);
    setAuthToast('รีเซ็ตข้อมูลเป็นค่าเริ่มต้นเรียบร้อยแล้ว');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        isAuthModalOpen,
        setAuthModalOpen,
        register,
        login,
        loginWithGoogle,
        logout,
        switchUser,
        updateUserProfile,
        authToast,
        setAuthToast,
        isLoggingInWithGoogle,
        firebaseAuthUser,
        isFirebaseConnected,

        activeTab,
        setActiveTab,

        searchQuery,
        setSearchQuery,
        searchResults,
        filteredTasks,
        filteredProjects,
        filteredVocab,
        filteredInterviewQuestions,
        filteredUniversities,

        examScores,
        addOrUpdateExamScore,
        deleteExamScore,

        financialPlan,
        updateFinancialPlan,
        financialCalculations,

        quests,
        questDifficulty,
        setQuestDifficulty,
        completeQuest,

        isAiChatOpen,
        setAiChatOpen,
        openAiChatWithPrompt,

        tasks,
        toggleTaskStatus,
        addTask,
        deleteTask,
        energyMode,
        setEnergyMode,

        achievements,
        claimBadgeReward,
        unlockBadge,

        vocabCards,
        updateVocabReview,

        projects,
        addProject,
        deleteProject,
        updateProject,
        loadPortfolioTemplate,

        interviewQuestions,
        updateInterviewQuestion,

        universities,
        currentPrimaryTarget,
        setPrimaryTarget,
        setCustomPrimaryTarget,

        pomodoro: {
          isRunning: isTimerRunning,
          timeLeft,
          initialDuration: pomodoroDuration,
          mode: pomodoroMode,
          activeTaskTitle,
          toggleTimer,
          resetTimer,
          setDuration,
          setTaskTitle: setActiveTaskTitle
        },

        isQuizOpen,
        setQuizOpen,

        lastSyncedText,
        exportDataJSON,
        importDataJSON,
        resetAllData,
        clearToCleanState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
