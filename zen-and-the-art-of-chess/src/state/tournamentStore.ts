// ============================================
// TOURNAMENT PREPARATION STORE
// State management for tournament prep mode
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Tournament,
  TournamentFormat,
  PrepPhase,
  WarmupStep,
  DailyPrepPlan,
  PrepActivity,
  DailyPrepLog,
} from '@/lib/tournamentTypes';
import {
  getPhaseFromDays,
  getDaysUntil,
  PHASE_CONFIGS,
  DEFAULT_WARMUP_ROUTINES,
  DEFAULT_AFFIRMATIONS,
} from '@/lib/tournamentTypes';

// ============================================
// STORE INTERFACE
// ============================================

interface TournamentState {
  // Current tournament
  activeTournament: Tournament | null;
  pastTournaments: Tournament[];
  
  // Today's plan (computed)
  todaysPlan: DailyPrepPlan | null;
  
  // Warmup state
  warmupInProgress: boolean;
  currentWarmupStep: number;
  
  // Actions - Tournament CRUD
  createTournament: (data: {
    name: string;
    startDate: number;
    format: TournamentFormat;
    timeControl?: string;
    rounds?: number;
    location?: string;
  }) => string;
  
  updateTournament: (id: string, updates: Partial<Tournament>) => void;
  deleteTournament: (id: string) => void;
  completeTournament: (id: string, notes?: string) => void;
  
  // Actions - Preparation
  addPriorityOpening: (opening: Tournament['priorityOpenings'][0]) => void;
  removePriorityOpening: (openingId: string) => void;
  addFocusWeakness: (weakness: string) => void;
  removeFocusWeakness: (weakness: string) => void;
  
  // Actions - Warmup
  updateWarmupRoutine: (steps: WarmupStep[]) => void;
  updateAffirmation: (affirmation: string) => void;
  startWarmup: () => void;
  completeWarmupStep: (stepId: string) => void;
  resetWarmup: () => void;
  
  // Actions - Daily Progress
  completeActivity: (activityId: string) => void;
  logDailyProgress: (log: Omit<DailyPrepLog, 'date'>) => void;
  
  // Computed getters
  getPhase: () => PrepPhase;
  getDaysRemaining: () => number;
  getTodaysPlan: () => DailyPrepPlan | null;
  getOverallProgress: () => number;
  getPhaseConfig: () => typeof PHASE_CONFIGS[PrepPhase];
}

// ============================================
// PLAN GENERATION
// ============================================

function generateDailyPlan(tournament: Tournament, daysUntil: number): DailyPrepPlan {
  const phase = getPhaseFromDays(daysUntil);
  const config = PHASE_CONFIGS[phase];
  const today = new Date().toISOString().split('T')[0];
  
  const activities: PrepActivity[] = [];
  
  // Generate activities based on phase
  if (phase === 'deep') {
    // Deep preparation - heavy training
    activities.push({
      id: 'opening-study',
      type: 'opening',
      title: 'Opening Preparation',
      description: 'Study and drill your tournament repertoire',
      duration: 30,
      priority: 'required',
      completed: false,
      route: '/openings',
    });
    
    activities.push({
      id: 'tactical-training',
      type: 'tactics',
      title: 'Tactical Training',
      description: 'Solve challenging puzzles to sharpen calculation',
      duration: 25,
      priority: 'required',
      completed: false,
      route: '/train',
    });
    
    activities.push({
      id: 'pattern-work',
      type: 'patterns',
      title: 'Pattern Recognition',
      description: 'Review and learn critical patterns',
      duration: 20,
      priority: 'recommended',
      completed: false,
      route: '/patterns',
    });
    
    activities.push({
      id: 'endgame-study',
      type: 'endgame',
      title: 'Endgame Study',
      description: 'Practice essential endgame techniques',
      duration: 15,
      priority: 'recommended',
      completed: false,
      route: '/courses',
    });
  } else if (phase === 'sharpen') {
    // Sharpening - speed and pattern drilling
    activities.push({
      id: 'opening-drill',
      type: 'opening',
      title: 'Opening Speed Drill',
      description: 'Quick repertoire review - no new lines',
      duration: 15,
      priority: 'required',
      completed: false,
      route: '/openings',
    });
    
    activities.push({
      id: 'tactical-speed',
      type: 'tactics',
      title: 'Speed Tactics',
      description: 'Fast puzzle solving to sharpen instincts',
      duration: 20,
      priority: 'required',
      completed: false,
      route: '/train',
    });
    
    activities.push({
      id: 'pattern-review',
      type: 'patterns',
      title: 'Pattern Speed Review',
      description: 'Quick pattern recognition practice',
      duration: 15,
      priority: 'required',
      completed: false,
      route: '/patterns',
    });
    
    activities.push({
      id: 'mental-prep',
      type: 'mental',
      title: 'Mental Preparation',
      description: 'Breathing exercises and visualization',
      duration: 10,
      priority: 'recommended',
      completed: false,
      route: '/calm',
    });
  } else if (phase === 'taper') {
    // Taper - light and mental focus
    activities.push({
      id: 'light-tactics',
      type: 'tactics',
      title: 'Light Puzzle Session',
      description: 'Easy puzzles to stay sharp without fatigue',
      duration: 10,
      priority: 'recommended',
      completed: false,
      route: '/train',
    });
    
    activities.push({
      id: 'opening-refresh',
      type: 'opening',
      title: 'Opening Confidence Check',
      description: 'Quick run-through of main lines',
      duration: 10,
      priority: 'recommended',
      completed: false,
      route: '/openings',
    });
    
    activities.push({
      id: 'meditation',
      type: 'mental',
      title: 'Meditation & Visualization',
      description: 'Calm the mind, visualize success',
      duration: 10,
      priority: 'required',
      completed: false,
      route: '/calm',
    });
    
    activities.push({
      id: 'rest',
      type: 'rest',
      title: 'Rest & Recovery',
      description: 'Trust your preparation. Get good sleep.',
      duration: 0,
      priority: 'required',
      completed: false,
    });
  } else if (phase === 'gameday') {
    // Game day - warmup routine only
    activities.push({
      id: 'pregame-warmup',
      type: 'mental',
      title: 'Pre-Game Warmup Routine',
      description: 'Follow your personalized warmup sequence',
      duration: 15,
      priority: 'required',
      completed: false,
    });
  }
  
  // Get mental focus for the day
  const mentalThemes = config.mentalThemes;
  const mentalFocus = mentalThemes[Math.floor(Math.random() * mentalThemes.length)] || 'Stay focused and present.';
  
  return {
    date: today,
    phase,
    daysUntilTournament: daysUntil,
    activities,
    totalMinutes: activities.reduce((sum, a) => sum + a.duration, 0),
    intensity: config.intensity,
    mentalFocus,
    completed: activities.every(a => a.completed),
  };
}

// ============================================
// STORE IMPLEMENTATION
// ============================================

export const useTournamentStore = create<TournamentState>()(
  persist(
    (set, get) => ({
      activeTournament: null,
      pastTournaments: [],
      todaysPlan: null,
      warmupInProgress: false,
      currentWarmupStep: 0,
      
      // ==================== TOURNAMENT CRUD ====================
      
      createTournament: (data) => {
        const id = `tournament_${Date.now()}`;
        const format = data.format;
        
        const tournament: Tournament = {
          id,
          name: data.name,
          startDate: data.startDate,
          format,
          timeControl: data.timeControl,
          rounds: data.rounds,
          location: data.location,
          priorityOpenings: [],
          focusWeaknesses: [],
          warmupRoutine: DEFAULT_WARMUP_ROUTINES[format],
          affirmation: DEFAULT_AFFIRMATIONS[Math.floor(Math.random() * DEFAULT_AFFIRMATIONS.length)],
          prepDaysCompleted: 0,
          dailyLogs: [],
          status: 'preparing',
          createdAt: Date.now(),
        };
        
        set({ 
          activeTournament: tournament,
          todaysPlan: generateDailyPlan(tournament, getDaysUntil(tournament.startDate)),
        });
        
        return id;
      },
      
      updateTournament: (id, updates) => {
        set((state) => {
          if (state.activeTournament?.id === id) {
            const updated = { ...state.activeTournament, ...updates };
            return {
              activeTournament: updated,
              todaysPlan: generateDailyPlan(updated, getDaysUntil(updated.startDate)),
            };
          }
          return {
            pastTournaments: state.pastTournaments.map((t) =>
              t.id === id ? { ...t, ...updates } : t
            ),
          };
        });
      },
      
      deleteTournament: (id) => {
        set((state) => ({
          activeTournament: state.activeTournament?.id === id ? null : state.activeTournament,
          pastTournaments: state.pastTournaments.filter((t) => t.id !== id),
          todaysPlan: state.activeTournament?.id === id ? null : state.todaysPlan,
        }));
      },
      
      completeTournament: (id, notes) => {
        set((state) => {
          if (state.activeTournament?.id === id) {
            const completed = {
              ...state.activeTournament,
              status: 'complete' as const,
              notes: notes || state.activeTournament.notes,
            };
            return {
              activeTournament: null,
              pastTournaments: [completed, ...state.pastTournaments],
              todaysPlan: null,
            };
          }
          return state;
        });
      },
      
      // ==================== PREPARATION ====================
      
      addPriorityOpening: (opening) => {
        set((state) => {
          if (!state.activeTournament) return state;
          
          // Don't add duplicates
          if (state.activeTournament.priorityOpenings.some(o => o.id === opening.id)) {
            return state;
          }
          
          return {
            activeTournament: {
              ...state.activeTournament,
              priorityOpenings: [...state.activeTournament.priorityOpenings, opening],
            },
          };
        });
      },
      
      removePriorityOpening: (openingId) => {
        set((state) => {
          if (!state.activeTournament) return state;
          return {
            activeTournament: {
              ...state.activeTournament,
              priorityOpenings: state.activeTournament.priorityOpenings.filter(
                (o) => o.id !== openingId
              ),
            },
          };
        });
      },
      
      addFocusWeakness: (weakness) => {
        set((state) => {
          if (!state.activeTournament) return state;
          if (state.activeTournament.focusWeaknesses.includes(weakness)) return state;
          
          return {
            activeTournament: {
              ...state.activeTournament,
              focusWeaknesses: [...state.activeTournament.focusWeaknesses, weakness],
            },
          };
        });
      },
      
      removeFocusWeakness: (weakness) => {
        set((state) => {
          if (!state.activeTournament) return state;
          return {
            activeTournament: {
              ...state.activeTournament,
              focusWeaknesses: state.activeTournament.focusWeaknesses.filter(
                (w) => w !== weakness
              ),
            },
          };
        });
      },
      
      // ==================== WARMUP ====================
      
      updateWarmupRoutine: (steps) => {
        set((state) => {
          if (!state.activeTournament) return state;
          return {
            activeTournament: {
              ...state.activeTournament,
              warmupRoutine: steps,
            },
          };
        });
      },
      
      updateAffirmation: (affirmation) => {
        set((state) => {
          if (!state.activeTournament) return state;
          return {
            activeTournament: {
              ...state.activeTournament,
              affirmation,
            },
          };
        });
      },
      
      startWarmup: () => {
        set((state) => {
          if (!state.activeTournament) return state;
          
          // Reset all warmup steps
          const resetSteps = state.activeTournament.warmupRoutine.map(s => ({
            ...s,
            completed: false,
          }));
          
          return {
            warmupInProgress: true,
            currentWarmupStep: 0,
            activeTournament: {
              ...state.activeTournament,
              warmupRoutine: resetSteps,
            },
          };
        });
      },
      
      completeWarmupStep: (stepId) => {
        set((state) => {
          if (!state.activeTournament) return state;
          
          const updatedSteps = state.activeTournament.warmupRoutine.map((s) =>
            s.id === stepId ? { ...s, completed: true } : s
          );
          
          const currentIndex = updatedSteps.findIndex(s => s.id === stepId);
          const nextIncomplete = updatedSteps.findIndex((s, i) => i > currentIndex && !s.completed);
          const allComplete = updatedSteps.every(s => s.completed);
          
          return {
            activeTournament: {
              ...state.activeTournament,
              warmupRoutine: updatedSteps,
            },
            currentWarmupStep: nextIncomplete >= 0 ? nextIncomplete : state.currentWarmupStep,
            warmupInProgress: !allComplete,
          };
        });
      },
      
      resetWarmup: () => {
        set((state) => {
          if (!state.activeTournament) return state;
          
          const resetSteps = state.activeTournament.warmupRoutine.map(s => ({
            ...s,
            completed: false,
          }));
          
          return {
            warmupInProgress: false,
            currentWarmupStep: 0,
            activeTournament: {
              ...state.activeTournament,
              warmupRoutine: resetSteps,
            },
          };
        });
      },
      
      // ==================== DAILY PROGRESS ====================
      
      completeActivity: (activityId) => {
        set((state) => {
          if (!state.todaysPlan) return state;
          
          const updatedActivities = state.todaysPlan.activities.map((a) =>
            a.id === activityId ? { ...a, completed: true } : a
          );
          
          return {
            todaysPlan: {
              ...state.todaysPlan,
              activities: updatedActivities,
              completed: updatedActivities.every(a => a.completed),
            },
          };
        });
      },
      
      logDailyProgress: (log) => {
        const today = new Date().toISOString().split('T')[0];
        
        set((state) => {
          if (!state.activeTournament) return state;
          
          const existingLogIndex = state.activeTournament.dailyLogs.findIndex(
            l => l.date === today
          );
          
          const dailyLog: DailyPrepLog = { ...log, date: today };
          
          let updatedLogs: DailyPrepLog[];
          if (existingLogIndex >= 0) {
            updatedLogs = state.activeTournament.dailyLogs.map((l, i) =>
              i === existingLogIndex ? dailyLog : l
            );
          } else {
            updatedLogs = [...state.activeTournament.dailyLogs, dailyLog];
          }
          
          return {
            activeTournament: {
              ...state.activeTournament,
              dailyLogs: updatedLogs,
              prepDaysCompleted: new Set(updatedLogs.map(l => l.date)).size,
            },
          };
        });
      },
      
      // ==================== COMPUTED GETTERS ====================
      
      getPhase: () => {
        const tournament = get().activeTournament;
        if (!tournament) return 'complete';
        return getPhaseFromDays(getDaysUntil(tournament.startDate));
      },
      
      getDaysRemaining: () => {
        const tournament = get().activeTournament;
        if (!tournament) return 0;
        return getDaysUntil(tournament.startDate);
      },
      
      getTodaysPlan: () => {
        const tournament = get().activeTournament;
        if (!tournament) return null;
        
        const currentPlan = get().todaysPlan;
        const today = new Date().toISOString().split('T')[0];
        
        // Regenerate if it's a new day
        if (!currentPlan || currentPlan.date !== today) {
          const newPlan = generateDailyPlan(tournament, getDaysUntil(tournament.startDate));
          set({ todaysPlan: newPlan });
          return newPlan;
        }
        
        return currentPlan;
      },
      
      getOverallProgress: () => {
        const tournament = get().activeTournament;
        if (!tournament) return 0;
        
        const daysUntil = getDaysUntil(tournament.startDate);
        const phase = getPhaseFromDays(daysUntil);
        
        if (phase === 'complete') return 100;
        if (phase === 'gameday') return 95;
        
        // Calculate based on prep days completed
        const totalPrepDays = Math.max(1, Math.ceil((tournament.startDate - tournament.createdAt) / (1000 * 60 * 60 * 24)));
        const daysCompleted = tournament.prepDaysCompleted;
        
        return Math.min(90, Math.round((daysCompleted / totalPrepDays) * 90));
      },
      
      getPhaseConfig: () => {
        const phase = get().getPhase();
        return PHASE_CONFIGS[phase];
      },
    }),
    { name: 'zen-chess-tournament' }
  )
);

// ============================================
// SELECTOR HOOKS
// ============================================

export const useActiveTournament = () => useTournamentStore((s) => s.activeTournament);
export const useTodaysPlan = () => useTournamentStore((s) => s.getTodaysPlan());
export const useTournamentPhase = () => useTournamentStore((s) => s.getPhase());
export const useDaysRemaining = () => useTournamentStore((s) => s.getDaysRemaining());









