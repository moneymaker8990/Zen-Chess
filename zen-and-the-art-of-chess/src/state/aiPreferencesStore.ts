// ============================================
// AI PREFERENCES STORE
// User preferences for AI coaching behavior
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================
// TYPES
// ============================================

export type AIIntrusiveness = 'minimal' | 'balanced' | 'proactive';
export type InsightDetail = 'brief' | 'standard' | 'comprehensive';
export type WhisperFrequency = 'off' | 'rare' | 'occasional' | 'frequent';

interface AIPreferences {
  // === GENERAL ===
  
  /** How proactive should the AI be? */
  intrusiveness: AIIntrusiveness;
  
  /** How detailed should explanations be? */
  insightDetail: InsightDetail;
  
  /** How often should whispers appear? */
  whisperFrequency: WhisperFrequency;
  
  // === FEATURE TOGGLES ===
  
  /** Show the floating Ask Anything button */
  showAskAnything: boolean;
  
  /** Show contextual whispers */
  showWhispers: boolean;
  
  /** Show genius insights on puzzles */
  showPuzzleInsights: boolean;
  
  /** Auto-analyze completed puzzles */
  autoPuzzleAnalysis: boolean;
  
  /** Show move explanations in games */
  showMoveExplanations: boolean;
  
  /** Show opening insights */
  showOpeningInsights: boolean;
  
  /** Enable position analysis */
  enablePositionAnalysis: boolean;
  
  /** Show agent presence indicators */
  showAgentPresence: boolean;
  
  // === TIMING ===
  
  /** Minimum seconds between whispers */
  whisperCooldownSeconds: number;
  
  /** Delay before showing puzzle insight (seconds) */
  puzzleInsightDelay: number;
  
  // === PERSONALIZATION ===
  
  /** Preferred teaching style */
  teachingStyle: 'encouraging' | 'direct' | 'socratic';
  
  /** Focus areas the user wants more help with */
  focusAreas: string[];
  
  /** Topics the user wants to avoid */
  avoidTopics: string[];
}

interface AIPreferencesStore extends AIPreferences {
  // === ACTIONS ===
  
  /** Update a single preference */
  setPreference: <K extends keyof AIPreferences>(key: K, value: AIPreferences[K]) => void;
  
  /** Update multiple preferences */
  updatePreferences: (updates: Partial<AIPreferences>) => void;
  
  /** Reset to defaults */
  resetToDefaults: () => void;
  
  /** Set a quick profile */
  setQuickProfile: (profile: 'minimal' | 'balanced' | 'immersive') => void;
  
  /** Toggle a feature */
  toggleFeature: (feature: keyof Pick<AIPreferences, 
    'showAskAnything' | 'showWhispers' | 'showPuzzleInsights' | 
    'autoPuzzleAnalysis' | 'showMoveExplanations' | 'showOpeningInsights' |
    'enablePositionAnalysis' | 'showAgentPresence'
  >) => void;
  
  /** Add a focus area */
  addFocusArea: (area: string) => void;
  
  /** Remove a focus area */
  removeFocusArea: (area: string) => void;
}

// ============================================
// DEFAULT PREFERENCES
// ============================================

const DEFAULT_PREFERENCES: AIPreferences = {
  // General
  intrusiveness: 'balanced',
  insightDetail: 'standard',
  whisperFrequency: 'occasional',
  
  // Feature toggles
  showAskAnything: true,
  showWhispers: true,
  showPuzzleInsights: true,
  autoPuzzleAnalysis: false, // Off by default, respects user control
  showMoveExplanations: true,
  showOpeningInsights: true,
  enablePositionAnalysis: true,
  showAgentPresence: true,
  
  // Timing
  whisperCooldownSeconds: 60,
  puzzleInsightDelay: 1,
  
  // Personalization
  teachingStyle: 'encouraging',
  focusAreas: [],
  avoidTopics: [],
};

// ============================================
// QUICK PROFILES
// ============================================

const QUICK_PROFILES: Record<'minimal' | 'balanced' | 'immersive', Partial<AIPreferences>> = {
  minimal: {
    intrusiveness: 'minimal',
    whisperFrequency: 'off',
    showWhispers: false,
    autoPuzzleAnalysis: false,
    showAgentPresence: false,
  },
  balanced: {
    intrusiveness: 'balanced',
    whisperFrequency: 'occasional',
    showWhispers: true,
    autoPuzzleAnalysis: false,
    showAgentPresence: true,
  },
  immersive: {
    intrusiveness: 'proactive',
    whisperFrequency: 'frequent',
    showWhispers: true,
    autoPuzzleAnalysis: true,
    showAgentPresence: true,
    insightDetail: 'comprehensive',
  },
};

// ============================================
// STORE
// ============================================

export const useAIPreferencesStore = create<AIPreferencesStore>()(
  persist(
    (set) => ({
      ...DEFAULT_PREFERENCES,
      
      setPreference: (key, value) => {
        set({ [key]: value });
      },
      
      updatePreferences: (updates) => {
        set(updates);
      },
      
      resetToDefaults: () => {
        set(DEFAULT_PREFERENCES);
      },
      
      setQuickProfile: (profile) => {
        set(QUICK_PROFILES[profile]);
      },
      
      toggleFeature: (feature) => {
        set((state) => ({ [feature]: !state[feature] }));
      },
      
      addFocusArea: (area) => {
        set((state) => ({
          focusAreas: [...state.focusAreas.filter(a => a !== area), area],
        }));
      },
      
      removeFocusArea: (area) => {
        set((state) => ({
          focusAreas: state.focusAreas.filter(a => a !== area),
        }));
      },
    }),
    {
      name: 'zen-chess-ai-preferences',
      version: 1,
    }
  )
);

// ============================================
// CONVENIENCE HOOKS
// ============================================

/** Check if AI features are enabled */
export function useAIEnabled() {
  return useAIPreferencesStore((s) => s.intrusiveness !== 'minimal' || s.showAskAnything);
}

/** Get whisper settings */
export function useWhisperSettings() {
  return useAIPreferencesStore((s) => ({
    enabled: s.showWhispers && s.whisperFrequency !== 'off',
    frequency: s.whisperFrequency,
    cooldownMs: s.whisperCooldownSeconds * 1000,
  }));
}

/** Get puzzle insight settings */
export function usePuzzleInsightSettings() {
  return useAIPreferencesStore((s) => ({
    enabled: s.showPuzzleInsights,
    autoLoad: s.autoPuzzleAnalysis,
    delaySeconds: s.puzzleInsightDelay,
    detail: s.insightDetail,
  }));
}

/** Check if a specific feature is enabled */
export function useAIFeature(feature: keyof Pick<AIPreferences,
  'showAskAnything' | 'showWhispers' | 'showPuzzleInsights' |
  'showMoveExplanations' | 'showOpeningInsights' | 'enablePositionAnalysis'
>) {
  return useAIPreferencesStore((s) => s[feature]);
}






