// ============================================
// THEME UTILITIES
// Centralized theme helpers and contrast utilities
// ============================================

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.0 formula
 */
function getLuminance(hex: string): number {
  // Remove # if present
  const color = hex.replace('#', '');
  
  // Parse RGB values
  const r = parseInt(color.substr(0, 2), 16) / 255;
  const g = parseInt(color.substr(2, 2), 16) / 255;
  const b = parseInt(color.substr(4, 2), 16) / 255;
  
  // Apply gamma correction
  const gammaCorrect = (c: number) => 
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  
  return 0.2126 * gammaCorrect(r) + 0.7152 * gammaCorrect(g) + 0.0722 * gammaCorrect(b);
}

/**
 * Get contrast text color (white or dark) for a given background
 * Returns 'white' for dark backgrounds, '#1a1a1a' for light backgrounds
 */
export function getContrastTextColor(backgroundColor: string): string {
  try {
    const luminance = getLuminance(backgroundColor);
    // Use white text on dark backgrounds (luminance < 0.5)
    return luminance < 0.5 ? '#ffffff' : '#1a1a1a';
  } catch {
    // Default to white if parsing fails
    return '#ffffff';
  }
}

/**
 * Check if a color is considered "dark"
 */
export function isDarkColor(color: string): boolean {
  try {
    return getLuminance(color) < 0.5;
  } catch {
    return true;
  }
}

/**
 * Parse CSS rgba color to get opacity
 */
export function getRgbaOpacity(rgba: string): number {
  const match = rgba.match(/rgba?\([\d\s,]+,?\s*([\d.]+)\)/);
  return match ? parseFloat(match[1]) : 1;
}

/**
 * Darken a hex color by a percentage
 */
export function darkenColor(hex: string, percent: number): string {
  const color = hex.replace('#', '');
  const r = Math.max(0, parseInt(color.substr(0, 2), 16) - (255 * percent / 100));
  const g = Math.max(0, parseInt(color.substr(2, 2), 16) - (255 * percent / 100));
  const b = Math.max(0, parseInt(color.substr(4, 2), 16) - (255 * percent / 100));
  
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

/**
 * Lighten a hex color by a percentage
 */
export function lightenColor(hex: string, percent: number): string {
  const color = hex.replace('#', '');
  const r = Math.min(255, parseInt(color.substr(0, 2), 16) + (255 * percent / 100));
  const g = Math.min(255, parseInt(color.substr(2, 2), 16) + (255 * percent / 100));
  const b = Math.min(255, parseInt(color.substr(4, 2), 16) + (255 * percent / 100));
  
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

/**
 * Convert hex to rgba
 */
export function hexToRgba(hex: string, alpha: number): string {
  const color = hex.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ============================================
// CSS VARIABLE HELPERS
// ============================================

/**
 * Get a CSS variable value at runtime
 */
export function getCssVariable(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Set a CSS variable at runtime
 */
export function setCssVariable(name: string, value: string): void {
  if (typeof window === 'undefined') return;
  document.documentElement.style.setProperty(name, value);
}

// ============================================
// BOARD THEME HELPERS
// ============================================

export const BOARD_THEME_TOKENS = {
  light: '--board-light',
  dark: '--board-dark',
  coords: '--board-coords',
  lastMove: '--board-last-move',
  legalMove: '--board-legal-move',
  selected: '--board-selected',
  check: '--board-check',
  correct: '--board-correct',
  incorrect: '--board-incorrect',
} as const;

/**
 * Apply a board theme by setting CSS variables
 */
export function applyBoardTheme(theme: {
  light: string;
  dark: string;
}): void {
  setCssVariable(BOARD_THEME_TOKENS.light, theme.light);
  setCssVariable(BOARD_THEME_TOKENS.dark, theme.dark);
}

export default {
  getContrastTextColor,
  isDarkColor,
  darkenColor,
  lightenColor,
  hexToRgba,
  getCssVariable,
  setCssVariable,
  applyBoardTheme,
};



