import { ColorTheme } from '@/types';

// Predefined clothing-inspired color themes for M Muzamil
// New default: Regal Imperial Maroon & Champagne Gold
export const THEME_PRESETS: ColorTheme[] = [
  {
    id: 'maroon',
    name: 'Imperial Maroon & Gold',
    garmentName: 'Imperial Velvet Kurta',
    primary: '#701a31',
    primaryHover: '#581224',
    primaryLight: '#fff1f2',
    primaryDark: '#3f0714',
    accent: '#d97706',
    bgMain: '#faf9f6',
    bgSurface: '#ffffff',
    bgCard: '#ffffff',
    borderColor: '#fecdd3',
    textMain: '#1c1917',
    textMuted: '#78716c',
    textContrast: '#ffffff',
    isDark: false,
  },
  {
    id: 'obsidian',
    name: 'Obsidian Noir & Gold',
    garmentName: 'Obsidian Bespoke Tuxedo',
    primary: '#18181b',
    primaryHover: '#27272a',
    primaryLight: '#f4f4f5',
    primaryDark: '#09090b',
    accent: '#eab308',
    bgMain: '#fafafa',
    bgSurface: '#ffffff',
    bgCard: '#ffffff',
    borderColor: '#e4e4e7',
    textMain: '#09090b',
    textMuted: '#71717a',
    textContrast: '#ffffff',
    isDark: false,
  },
  {
    id: 'sapphire',
    name: 'Midnight Sapphire',
    garmentName: 'Sapphire Oxford Shirt',
    primary: '#1e3a8a',
    primaryHover: '#172554',
    primaryLight: '#eff6ff',
    primaryDark: '#0f172a',
    accent: '#f59e0b',
    bgMain: '#f8fafc',
    bgSurface: '#ffffff',
    bgCard: '#ffffff',
    borderColor: '#bfdbfe',
    textMain: '#0f172a',
    textMuted: '#64748b',
    textContrast: '#ffffff',
    isDark: false,
  },
  {
    id: 'emerald',
    name: 'Royal Emerald',
    garmentName: 'Emerald Silk Kurta',
    primary: '#047857',
    primaryHover: '#065f46',
    primaryLight: '#ecfdf5',
    primaryDark: '#022c22',
    accent: '#d97706',
    bgMain: '#fbfcfb',
    bgSurface: '#ffffff',
    bgCard: '#ffffff',
    borderColor: '#a7f3d0',
    textMain: '#0f172a',
    textMuted: '#64748b',
    textContrast: '#ffffff',
    isDark: false,
  },
  {
    id: 'terracotta',
    name: 'Sunset Terracotta',
    garmentName: 'Terracotta Linen Tee',
    primary: '#c2410c',
    primaryHover: '#9a3412',
    primaryLight: '#fff7ed',
    primaryDark: '#431407',
    accent: '#d97706',
    bgMain: '#fefcfb',
    bgSurface: '#ffffff',
    bgCard: '#ffffff',
    borderColor: '#fed7aa',
    textMain: '#1c1917',
    textMuted: '#78716c',
    textContrast: '#ffffff',
    isDark: false,
  },
  {
    id: 'amethyst',
    name: 'Royal Amethyst',
    garmentName: 'Amethyst Velvet Kurti',
    primary: '#7e22ce',
    primaryHover: '#6b21a8',
    primaryLight: '#faf5ff',
    primaryDark: '#3b0764',
    accent: '#ec4899',
    bgMain: '#fdfbfd',
    bgSurface: '#ffffff',
    bgCard: '#ffffff',
    borderColor: '#e9d5ff',
    textMain: '#1e1b4b',
    textMuted: '#6b7280',
    textContrast: '#ffffff',
    isDark: false,
  },
  {
    id: 'gold',
    name: 'Desert Ochre',
    garmentName: 'Ochre Sand Hoodie',
    primary: '#b45309',
    primaryHover: '#92400e',
    primaryLight: '#fffbeb',
    primaryDark: '#451a03',
    accent: '#0d9488',
    bgMain: '#fffdf7',
    bgSurface: '#ffffff',
    bgCard: '#ffffff',
    borderColor: '#fde68a',
    textMain: '#1c1917',
    textMuted: '#78716c',
    textContrast: '#ffffff',
    isDark: false,
  },
  {
    id: 'olive',
    name: 'Forest Olive',
    garmentName: 'Olive Utility Shirt',
    primary: '#3f6212',
    primaryHover: '#365314',
    primaryLight: '#f7fee7',
    primaryDark: '#1a2e05',
    accent: '#d97706',
    bgMain: '#fcfdfa',
    bgSurface: '#ffffff',
    bgCard: '#ffffff',
    borderColor: '#d9f99d',
    textMain: '#141e07',
    textMuted: '#657850',
    textContrast: '#ffffff',
    isDark: false,
  },
];

export const DEFAULT_THEME = THEME_PRESETS[0];

// Calculate contrast color (white or black) based on hex
export function getContrastTextColor(hex: string): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  
  // Calculate relative luminance (sRGB / WCAG)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#0f172a' : '#ffffff';
}

// Convert Hex to RGB tuple string for tailwind opacity utility
export function hexToRgb(hex: string): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  return `${r}, ${g}, ${b}`;
}

// Lighten/Darken Hex color by percent
export function adjustColorBrightness(hex: string, percent: number): string {
  const cleanHex = hex.replace('#', '');
  let r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  let g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  let b = parseInt(cleanHex.substring(4, 6), 16) || 0;

  r = Math.min(255, Math.max(0, Math.round(r + (r * percent) / 100)));
  g = Math.min(255, Math.max(0, Math.round(g + (g * percent) / 100)));
  b = Math.min(255, Math.max(0, Math.round(b + (b * percent) / 100)));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Generate harmonious theme from any user-selected hex
export function generateThemeFromHex(hex: string): ColorTheme {
  const primary = hex;
  const primaryHover = adjustColorBrightness(hex, -15);
  const primaryLight = adjustColorBrightness(hex, 80);
  const primaryDark = adjustColorBrightness(hex, -40);
  const textContrast = getContrastTextColor(hex);
  const accent = adjustColorBrightness(primary, 25);

  return {
    id: `custom-${hex.replace('#', '')}`,
    name: 'Custom Palette',
    garmentName: 'Bespoke M Muzamil Wear',
    primary,
    primaryHover,
    primaryLight,
    primaryDark,
    accent,
    bgMain: '#faf9f6',
    bgSurface: '#ffffff',
    bgCard: '#ffffff',
    borderColor: '#e2e8f0',
    textMain: '#0f172a',
    textMuted: '#64748b',
    textContrast,
    isDark: false,
  };
}

// Apply theme to DOM document root
export function applyThemeToDOM(theme: ColorTheme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--primary-hover', theme.primaryHover);
  root.style.setProperty('--primary-light', theme.primaryLight);
  root.style.setProperty('--primary-dark', theme.primaryDark);
  root.style.setProperty('--primary-rgb', hexToRgb(theme.primary));
  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--accent-rgb', hexToRgb(theme.accent));
  root.style.setProperty('--bg-main', theme.bgMain);
  root.style.setProperty('--bg-surface', theme.bgSurface);
  root.style.setProperty('--bg-card', theme.bgCard);
  root.style.setProperty('--border-color', theme.borderColor);
  root.style.setProperty('--text-main', theme.textMain);
  root.style.setProperty('--text-muted', theme.textMuted);
  root.style.setProperty('--text-contrast', theme.textContrast);

  if (theme.isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}
