// ============================================
// KEYBOARD SHORTCUTS SYSTEM
// Power user features
// ============================================

import { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================
// SHORTCUTS STORE
// ============================================

interface ShortcutsState {
  enabled: boolean;
  showHelp: boolean;
  setShowHelp: (show: boolean) => void;
  toggleShortcuts: () => void;
}

export const useShortcutsStore = create<ShortcutsState>()(
  persist(
    (set) => ({
      enabled: true,
      showHelp: false,
      setShowHelp: (show) => set({ showHelp: show }),
      toggleShortcuts: () => set((s) => ({ enabled: !s.enabled })),
    }),
    { name: 'zen-chess-shortcuts' }
  )
);

// ============================================
// SHORTCUT DEFINITIONS
// ============================================

export interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  category: 'navigation' | 'game' | 'training' | 'misc';
  action: () => void;
}

export const SHORTCUT_CATEGORIES = {
  navigation: 'Navigation',
  game: 'Game Controls',
  training: 'Training',
  misc: 'Miscellaneous',
};

// ============================================
// GLOBAL SHORTCUTS HOOK
// ============================================

export function useGlobalShortcuts() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enabled, showHelp, setShowHelp } = useShortcutsStore();

  const shortcuts: Shortcut[] = [
    // Navigation
    { 
      key: 'h', 
      description: 'Go to Home', 
      category: 'navigation',
      action: () => navigate('/'),
    },
    { 
      key: 'p', 
      description: 'Go to Play', 
      category: 'navigation',
      action: () => navigate('/play'),
    },
    { 
      key: 't', 
      description: 'Go to Training/Puzzles', 
      category: 'navigation',
      action: () => navigate('/train'),
    },
    { 
      key: 'c', 
      description: 'Go to Coach', 
      category: 'navigation',
      action: () => navigate('/coach'),
    },
    { 
      key: 'o', 
      description: 'Go to Openings', 
      category: 'navigation',
      action: () => navigate('/openings'),
    },
    { 
      key: 'm', 
      description: 'Go to Mind Training', 
      category: 'navigation',
      action: () => navigate('/mind'),
    },
    { 
      key: 'j', 
      description: 'Go to Journey', 
      category: 'navigation',
      action: () => navigate('/journey'),
    },
    { 
      key: 's', 
      description: 'Go to Settings', 
      category: 'navigation',
      action: () => navigate('/settings'),
    },
    
    // Misc
    { 
      key: '?', 
      shift: true,
      description: 'Show keyboard shortcuts', 
      category: 'misc',
      action: () => setShowHelp(!showHelp),
    },
    { 
      key: 'Escape', 
      description: 'Close dialogs / Cancel', 
      category: 'misc',
      action: () => setShowHelp(false),
    },
  ];

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    // Don't trigger when typing in inputs
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return;
    }
    
    for (const shortcut of shortcuts) {
      const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
      const altMatch = shortcut.alt ? event.altKey : !event.altKey;
      
      if (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        ctrlMatch &&
        shiftMatch &&
        altMatch
      ) {
        event.preventDefault();
        shortcut.action();
        return;
      }
    }
  }, [enabled, shortcuts, showHelp]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { shortcuts, showHelp, setShowHelp };
}

// ============================================
// GAME-SPECIFIC SHORTCUTS HOOK
// ============================================

interface GameShortcutActions {
  onNewGame?: () => void;
  onFlipBoard?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onHint?: () => void;
  onAnalyze?: () => void;
  onResign?: () => void;
}

export function useGameShortcuts(actions: GameShortcutActions) {
  const { enabled } = useShortcutsStore();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

    switch (event.key.toLowerCase()) {
      case 'n':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          actions.onNewGame?.();
        }
        break;
      case 'f':
        event.preventDefault();
        actions.onFlipBoard?.();
        break;
      case 'z':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          if (event.shiftKey) {
            actions.onRedo?.();
          } else {
            actions.onUndo?.();
          }
        }
        break;
      case 'arrowleft':
        event.preventDefault();
        actions.onUndo?.();
        break;
      case 'arrowright':
        event.preventDefault();
        actions.onRedo?.();
        break;
      case 'i':
        event.preventDefault();
        actions.onHint?.();
        break;
      case 'a':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          actions.onAnalyze?.();
        }
        break;
    }
  }, [enabled, actions]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

// ============================================
// PUZZLE-SPECIFIC SHORTCUTS HOOK
// ============================================

interface PuzzleShortcutActions {
  onNextPuzzle?: () => void;
  onHint?: () => void;
  onRetry?: () => void;
  onSkip?: () => void;
}

export function usePuzzleShortcuts(actions: PuzzleShortcutActions) {
  const { enabled } = useShortcutsStore();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;
    
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

    switch (event.key.toLowerCase()) {
      case 'n':
      case ' ':
        event.preventDefault();
        actions.onNextPuzzle?.();
        break;
      case 'i':
        event.preventDefault();
        actions.onHint?.();
        break;
      case 'r':
        event.preventDefault();
        actions.onRetry?.();
        break;
      case 's':
        if (event.shiftKey) {
          event.preventDefault();
          actions.onSkip?.();
        }
        break;
    }
  }, [enabled, actions]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}








