import { AppTheme } from '../types';

export interface ThemeOption {
  id: AppTheme;
  name: string;
  category: 'light' | 'dark';
  description: string;
  primaryColor: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  neutralColor?: string;
  accentColor: string;
  bgColor: string;
  cardColor: string;
  textColor: string;
  badge: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  // 1. สีตามรูป (Sky Optimism Light Theme)
  {
    id: 'sky',
    name: 'สีตามรูป (Sky Optimism)',
    category: 'light',
    description: 'ธีมสว่างตามรูปต้นแบบ: พื้นหลังฟ้าอ่อนนุ่มตา #E9F2FA, Primary #38BDF8, Secondary #DDD6FE, Tertiary #34D399',
    primaryColor: '#38bdf8',
    secondaryColor: '#ddd6fe',
    tertiaryColor: '#34d399',
    neutralColor: '#0f172a',
    accentColor: '#00668a',
    bgColor: '#e9f2fa',
    cardColor: '#ffffff',
    textColor: '#0f172a',
    badge: '✨ สีตามรูป (สว่าง)',
  },
  // 2. สีมืด (Dark Theme)
  {
    id: 'sky-dark',
    name: 'สีมืด (Dark Theme)',
    category: 'dark',
    description: 'ธีมโหมดมืด มิดไนท์บลู คอนทราสต์สูง ไม่ล้าสายตาตอนอ่านหนังสือดึก',
    primaryColor: '#38bdf8',
    secondaryColor: '#c4b5fd',
    tertiaryColor: '#34d399',
    neutralColor: '#0f172a',
    accentColor: '#7dd3fc',
    bgColor: '#07101e',
    cardColor: '#0f1c32',
    textColor: '#f1f5f9',
    badge: '🌙 สีมืด (Dark)',
  },
];

export function applyAppTheme(themeId: AppTheme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const theme = THEME_OPTIONS.find(t => t.id === themeId) || THEME_OPTIONS[0];

  // Set data-theme attribute
  root.setAttribute('data-theme', theme.id);

  // Toggle dark class
  if (theme.category === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Set CSS custom properties
  root.style.setProperty('--theme-primary', theme.primaryColor);
  root.style.setProperty('--theme-secondary', theme.secondaryColor || '#ddd6fe');
  root.style.setProperty('--theme-tertiary', theme.tertiaryColor || '#34d399');
  root.style.setProperty('--theme-neutral', theme.neutralColor || '#0f172a');
  root.style.setProperty('--theme-accent', theme.accentColor);
  root.style.setProperty('--theme-bg', theme.bgColor);
  root.style.setProperty('--theme-card', theme.cardColor);
  root.style.setProperty('--theme-text', theme.textColor);
}
