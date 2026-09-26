export interface UserProfile {
  id: string;
  name: string;
  email: string;
  school: string;
  educationPlan: string;
  gpax: number;
  targetUniversity: string;
  targetFaculty: string;
  targetProgram: string;
  targetRound: string;
  avatarUrl: string;
  energyMode: 'normal' | 'low' | 'catchup';
  streakDays: number;
  exp: number;
  level: number;
  theme: 'sweet-sky' | 'night-study' | 'mint-focus' | 'sunset' | 'minimal';
  focusDuration: number; // in minutes
  dndNight: boolean;
  googleSynced: boolean;
  registeredAt: string;
  dreamCareer?: string;
  studyStyle?: string;
}

export interface ExamScoreRecord {
  id: string;
  subjectCode: string;
  subjectName: string;
  score: number;
  maxScore: number;
  targetScore: number;
  examDate: string;
  notes?: string;
}

export interface FinancialPlan {
  tuitionFeePerTerm: number;
  termsPerYear: number;
  yearsOfStudy: number;
  dormFeePerMonth: number;
  livingCostPerMonth: number;
  travelCostPerMonth: number;
  deviceAndBooksPerYear: number;
  tcasPrepCost: number;
  familySupportPerMonth: number;
  scholarshipPerYear: number;
  studentLoanPerTerm: number;
  personalSavings: number;
  partTimeIncomePerMonth: number;
  notes?: string;
}

export type QuestDifficulty = 'easy' | 'normal' | 'hard';

export interface QuestItem {
  id: string;
  title: string;
  description: string;
  category: 'university' | 'score' | 'portfolio' | 'finance' | 'ai' | 'streak';
  icon: string;
  expReward: number;
  isCompleted: boolean;
  completedAt?: string;
  actionTab?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  category: 'เรียน' | 'พอร์ตโฟลิโอ' | 'ภาษาอังกฤษ' | 'ข้อสอบ TGAT' | 'มหาวิทยาลัย' | 'สัมภาษณ์' | 'การเงิน';
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'postponed';
  estimatedMinutes: number;
  deadline?: string;
  timeSpentMinutes?: number;
  notes?: string;
}

export interface VocabCard {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  difficulty: string;
  category: string;
  meaningTh: string;
  synonyms: string[];
  exampleEn: string;
  exampleTh: string;
  contextTag: string;
  reviewBox: 1 | 2 | 3 | 4;
  lastReviewed?: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  difficulty: 'ง่าย (Easy)' | 'ปานกลาง (Medium)' | 'ยาก (Hard)';
  questionText: string;
  thaiTranslation: string;
  options: {
    key: string;
    text: string;
    subText: string;
  }[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export interface PortfolioProject {
  id: string;
  pageSlots: string;
  title: string;
  category: string;
  badge?: string;
  role: string;
  tools: string[];
  description: string;
  status: 'พร้อมใส่ Portfolio' | 'กำลังตัดต่อ / ผลิต' | 'ไอเดีย / วางแผน';
  statusDetail?: string;
  link?: string;
}

export interface InterviewQuestion {
  id: string;
  number: string;
  questionEn: string;
  contextTh: string;
  category: string;
  timeLimit: string;
  status: 'ซ้อมคล่องแล้ว' | 'กำลังฝึกตอบ' | 'ร่างสคริปต์แล้ว';
  scriptHook: string;
  scriptBody: string;
  keywords: string[];
  practiceCount: number;
  lastScore?: number;
}

export interface UniversityTarget {
  id: string;
  rank: number;
  name: string;
  faculty: string;
  program: string;
  code: string;
  round: string;
  seats: number;
  applicantRatio: string;
  gpaxRequired: number;
  readinessPercentage: number;
  chance: 'สูงมาก' | 'ปานกลาง' | 'ท้าทาย';
  highlights: string[];
  criteria: {
    name: string;
    weight: string;
    currentScore: string;
    status: 'ผ่านเกณฑ์ปลอดภัย' | 'พร้อมยื่น' | 'ผ่านเกินเกณฑ์' | 'พร้อมในเกณฑ์ดี';
  }[];
  requiredExams?: string[];
  portfolioTips?: string[];
  officialUrl?: string;
  officialSearchQuery?: string;
  tuitionEstimate?: number;
  priorityOrderAdvice?: string[];
}

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type BadgeCategory = 'all' | 'streak' | 'study' | 'vocab' | 'portfolio' | 'interview';

export interface AchievementBadge {
  id: string;
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  category: 'streak' | 'study' | 'vocab' | 'portfolio' | 'interview';
  icon: string;
  gradient: string;
  ringColor: string;
  textColor: string;
  bgGlow: string;
  rarity: BadgeRarity;
  rewardExp: number;
  progress: number;
  maxProgress: number;
  unit: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  motivationalTip: string;
  claimed?: boolean;
}
