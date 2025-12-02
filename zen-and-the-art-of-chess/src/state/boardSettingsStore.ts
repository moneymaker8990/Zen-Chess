import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BoardTheme, PieceStyle, MoveHintStyle } from '@/lib/constants';
import { BOARD_THEMES, MOVE_HINT_STYLES } from '@/lib/constants';

// ============================================
// BOARD SETTINGS STORE
// Centralized board appearance settings
// ============================================

export interface BoardSettings {
  theme: BoardTheme;
  pieceStyle: PieceStyle;
  moveHintStyle: MoveHintStyle;
  animationDuration: number;
  showCoordinates: boolean;
}

interface BoardSettingsStore {
  settings: BoardSettings;
  
  // Actions
  setTheme: (theme: BoardTheme) => void;
  setPieceStyle: (style: PieceStyle) => void;
  setMoveHintStyle: (style: MoveHintStyle) => void;
  setAnimationDuration: (duration: number) => void;
  setShowCoordinates: (show: boolean) => void;
  
  // Computed helpers
  getBoardColors: () => { light: string; dark: string };
  getMoveHintStyle: (isCapture: boolean) => React.CSSProperties;
}

const DEFAULT_SETTINGS: BoardSettings = {
  theme: 'classic',
  pieceStyle: 'cburnett',
  moveHintStyle: 'dots',
  animationDuration: 200,
  showCoordinates: true,
};

export const useBoardSettingsStore = create<BoardSettingsStore>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_SETTINGS,

      setTheme: (theme) => set((state) => ({
        settings: { ...state.settings, theme }
      })),

      setPieceStyle: (pieceStyle) => set((state) => ({
        settings: { ...state.settings, pieceStyle }
      })),

      setMoveHintStyle: (moveHintStyle) => set((state) => ({
        settings: { ...state.settings, moveHintStyle }
      })),

      setAnimationDuration: (animationDuration) => set((state) => ({
        settings: { ...state.settings, animationDuration }
      })),

      setShowCoordinates: (showCoordinates) => set((state) => ({
        settings: { ...state.settings, showCoordinates }
      })),

      getBoardColors: () => {
        const { theme } = get().settings;
        return {
          light: BOARD_THEMES[theme].light,
          dark: BOARD_THEMES[theme].dark,
        };
      },

      getMoveHintStyle: (isCapture: boolean) => {
        const { moveHintStyle } = get().settings;
        return MOVE_HINT_STYLES[moveHintStyle].getStyle(isCapture);
      },
    }),
    {
      name: 'zen-chess-board-settings',
    }
  )
);

// ============================================
// CUSTOM HOOKS FOR CONVENIENCE
// ============================================

// Hook to get current board styles for Chessboard component
export function useBoardStyles() {
  const { settings, getBoardColors, getMoveHintStyle } = useBoardSettingsStore();
  const colors = getBoardColors();
  
  return {
    customDarkSquareStyle: { backgroundColor: colors.dark },
    customLightSquareStyle: { backgroundColor: colors.light },
    animationDuration: settings.animationDuration,
    pieceStyle: settings.pieceStyle,
    showCoordinates: settings.showCoordinates,
    moveHintStyle: settings.moveHintStyle,
    getMoveHintStyle,
  };
}

// Hook for getting move options with proper styling
export function useMoveOptions() {
  const { settings } = useBoardSettingsStore();
  
  const getMoveOptionsStyle = (isCapture: boolean): React.CSSProperties => {
    if (settings.moveHintStyle === 'none') {
      return {};
    }
    return MOVE_HINT_STYLES[settings.moveHintStyle].getStyle(isCapture);
  };
  
  return {
    moveHintStyle: settings.moveHintStyle,
    getMoveOptionsStyle,
    showMoveHints: settings.moveHintStyle !== 'none',
  };
}

export default useBoardSettingsStore;




