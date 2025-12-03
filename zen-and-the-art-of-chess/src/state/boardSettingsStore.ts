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

// ============================================
// AI-INTELLIGENT BOARD SETTINGS
// Adapts board experience based on user patterns
// ============================================

import { useAIIntelligence } from '@/lib/aiIntelligence';
import { useMemo } from 'react';

/** 
 * Hook that provides AI-adapted board settings
 * Silently adjusts hints, highlights, and assistance based on skill level
 */
export function useSmartBoardSettings() {
  const { settings, getMoveHintStyle } = useBoardSettingsStore();
  const { defaults, patterns, session, confidenceLevel } = useAIIntelligence();
  
  return useMemo(() => {
    // Determine if we should show extra assistance
    const isStruggling = session.accuracyTrend === 'declining';
    const isNewUser = confidenceLevel === 'learning';
    const needsHelp = isStruggling || isNewUser;
    
    // Smart hint style - more helpful when struggling
    let effectiveMoveHintStyle = settings.moveHintStyle;
    if (needsHelp && effectiveMoveHintStyle === 'none') {
      effectiveMoveHintStyle = 'dots'; // Enable hints if user is struggling
    }
    
    // Smart animation - slower when learning, faster when confident
    let effectiveAnimationDuration = settings.animationDuration;
    if (isNewUser) {
      effectiveAnimationDuration = Math.max(300, settings.animationDuration);
    } else if (confidenceLevel === 'confident' && session.flowState) {
      effectiveAnimationDuration = Math.min(150, settings.animationDuration);
    }
    
    // Whether to show last move highlight more prominently
    const emphasizeLastMove = needsHelp || patterns.hintUsageRate > 0.5;
    
    // Whether to show check indicators more prominently
    const emphasizeChecks = needsHelp || patterns.puzzleWeaknesses.includes('CHECK');
    
    return {
      // Base settings
      ...settings,
      
      // AI-adapted settings
      effectiveMoveHintStyle,
      effectiveAnimationDuration,
      emphasizeLastMove,
      emphasizeChecks,
      
      // Computed helpers
      getMoveHintStyle: (isCapture: boolean) => {
        if (effectiveMoveHintStyle === 'none') return {};
        return MOVE_HINT_STYLES[effectiveMoveHintStyle]?.getStyle(isCapture) || {};
      },
      
      // Context flags
      aiAdaptedHints: effectiveMoveHintStyle !== settings.moveHintStyle,
      isAssistanceMode: needsHelp,
    };
  }, [settings, defaults, patterns, session, confidenceLevel, getMoveHintStyle]);
}

/**
 * Hook that provides smart square highlighting based on context
 * Can highlight pieces that should be considered, danger squares, etc.
 */
export function useSmartHighlighting() {
  const { patterns, session } = useAIIntelligence();
  
  return useMemo(() => {
    // Determine highlighting strategy based on user's patterns
    const highlightDangerSquares = patterns.puzzleWeaknesses.some(
      w => ['PIN', 'FORK', 'SKEWER'].includes(w)
    );
    
    const highlightHangingPieces = session.accuracyTrend === 'declining';
    
    const highlightChecks = patterns.puzzleWeaknesses.includes('CHECK') || 
                           patterns.puzzleWeaknesses.includes('BACK_RANK');
    
    return {
      highlightDangerSquares,
      highlightHangingPieces,
      highlightChecks,
      
      // Get danger highlight style
      getDangerStyle: () => ({
        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
      }),
      
      // Get attention highlight style
      getAttentionStyle: () => ({
        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, transparent 70%)',
      }),
    };
  }, [patterns, session]);
}

export default useBoardSettingsStore;




