// ============================================
// ACHIEVEMENT SYSTEM
// Badges, milestones, and rewards
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UISounds } from './soundSystem';

// ============================================
// ACHIEVEMENT DEFINITIONS
// ============================================

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'progress' | 'performance' | 'streak' | 'mastery' | 'mindfulness' | 'social';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  xp: number;
  condition: (stats: UserStats) => boolean;
  progress?: (stats: UserStats) => { current: number; target: number };
  secret?: boolean; // Hidden until unlocked
}

export interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  puzzlesSolved: number;
  puzzleStreak: number;
  bestPuzzleStreak: number;
  dayStreak: number;
  bestDayStreak: number;
  totalPracticeMinutes: number;
  coursesCompleted: number;
  lessonsCompleted: number;
  meditationMinutes: number;
  openingsStudied: number;
  legendGamesStudied: number;
  accuracyAbove80Count: number;
  accuracyAbove90Count: number;
  calmPlayGames: number;
  missedBreathing: number;
  tookBreaks: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  // PROGRESS ACHIEVEMENTS
  {
    id: 'first_game',
    name: 'First Steps',
    description: 'Play your first game',
    icon: '👶',
    category: 'progress',
    rarity: 'common',
    xp: 10,
    condition: (s) => s.gamesPlayed >= 1,
  },
  {
    id: 'ten_games',
    name: 'Getting Started',
    description: 'Play 10 games',
    icon: '🎮',
    category: 'progress',
    rarity: 'common',
    xp: 25,
    condition: (s) => s.gamesPlayed >= 10,
    progress: (s) => ({ current: s.gamesPlayed, target: 10 }),
  },
  {
    id: 'hundred_games',
    name: 'Centurion',
    description: 'Play 100 games',
    icon: '⚔️',
    category: 'progress',
    rarity: 'uncommon',
    xp: 100,
    condition: (s) => s.gamesPlayed >= 100,
    progress: (s) => ({ current: s.gamesPlayed, target: 100 }),
  },
  {
    id: 'thousand_puzzles',
    name: 'Puzzle Master',
    description: 'Solve 1000 puzzles',
    icon: '🧩',
    category: 'progress',
    rarity: 'rare',
    xp: 250,
    condition: (s) => s.puzzlesSolved >= 1000,
    progress: (s) => ({ current: s.puzzlesSolved, target: 1000 }),
  },
  
  // PERFORMANCE ACHIEVEMENTS
  {
    id: 'first_win',
    name: 'Victory!',
    description: 'Win your first game',
    icon: '🏆',
    category: 'performance',
    rarity: 'common',
    xp: 15,
    condition: (s) => s.gamesWon >= 1,
  },
  {
    id: 'ten_wins',
    name: 'Winner',
    description: 'Win 10 games',
    icon: '🥇',
    category: 'performance',
    rarity: 'common',
    xp: 50,
    condition: (s) => s.gamesWon >= 10,
    progress: (s) => ({ current: s.gamesWon, target: 10 }),
  },
  {
    id: 'accuracy_master',
    name: 'Precision',
    description: 'Achieve 80%+ accuracy in 10 games',
    icon: '🎯',
    category: 'performance',
    rarity: 'uncommon',
    xp: 75,
    condition: (s) => s.accuracyAbove80Count >= 10,
    progress: (s) => ({ current: s.accuracyAbove80Count, target: 10 }),
  },
  {
    id: 'perfect_accuracy',
    name: 'Flawless',
    description: 'Achieve 90%+ accuracy in a game',
    icon: '💎',
    category: 'performance',
    rarity: 'rare',
    xp: 150,
    condition: (s) => s.accuracyAbove90Count >= 1,
  },
  
  // STREAK ACHIEVEMENTS
  {
    id: 'week_streak',
    name: 'Weekly Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    category: 'streak',
    rarity: 'uncommon',
    xp: 50,
    condition: (s) => s.bestDayStreak >= 7,
    progress: (s) => ({ current: s.dayStreak, target: 7 }),
  },
  {
    id: 'month_streak',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '🌟',
    category: 'streak',
    rarity: 'rare',
    xp: 200,
    condition: (s) => s.bestDayStreak >= 30,
    progress: (s) => ({ current: s.dayStreak, target: 30 }),
  },
  {
    id: 'puzzle_streak_10',
    name: 'Streak Star',
    description: 'Solve 10 puzzles in a row',
    icon: '⚡',
    category: 'streak',
    rarity: 'uncommon',
    xp: 40,
    condition: (s) => s.bestPuzzleStreak >= 10,
    progress: (s) => ({ current: s.puzzleStreak, target: 10 }),
  },
  {
    id: 'puzzle_streak_25',
    name: 'Unstoppable',
    description: 'Solve 25 puzzles in a row',
    icon: '💪',
    category: 'streak',
    rarity: 'rare',
    xp: 100,
    condition: (s) => s.bestPuzzleStreak >= 25,
    progress: (s) => ({ current: s.puzzleStreak, target: 25 }),
  },
  
  // MASTERY ACHIEVEMENTS
  {
    id: 'first_course',
    name: 'Scholar',
    description: 'Complete your first course',
    icon: '📚',
    category: 'mastery',
    rarity: 'uncommon',
    xp: 75,
    condition: (s) => s.coursesCompleted >= 1,
  },
  {
    id: 'opening_student',
    name: 'Opening Explorer',
    description: 'Study 10 different openings',
    icon: '📖',
    category: 'mastery',
    rarity: 'uncommon',
    xp: 60,
    condition: (s) => s.openingsStudied >= 10,
    progress: (s) => ({ current: s.openingsStudied, target: 10 }),
  },
  {
    id: 'legend_student',
    name: 'History Buff',
    description: 'Study 20 games from chess legends',
    icon: '👑',
    category: 'mastery',
    rarity: 'uncommon',
    xp: 80,
    condition: (s) => s.legendGamesStudied >= 20,
    progress: (s) => ({ current: s.legendGamesStudied, target: 20 }),
  },
  
  // MINDFULNESS ACHIEVEMENTS
  {
    id: 'first_meditation',
    name: 'Inner Peace',
    description: 'Complete your first meditation session',
    icon: '🧘',
    category: 'mindfulness',
    rarity: 'common',
    xp: 20,
    condition: (s) => s.meditationMinutes >= 1,
  },
  {
    id: 'meditation_hour',
    name: 'Mindful Master',
    description: 'Accumulate 60 minutes of meditation',
    icon: '☯️',
    category: 'mindfulness',
    rarity: 'uncommon',
    xp: 100,
    condition: (s) => s.meditationMinutes >= 60,
    progress: (s) => ({ current: s.meditationMinutes, target: 60 }),
  },
  {
    id: 'calm_player',
    name: 'Calm Warrior',
    description: 'Play 10 games in Calm Play mode',
    icon: '🌊',
    category: 'mindfulness',
    rarity: 'uncommon',
    xp: 50,
    condition: (s) => s.calmPlayGames >= 10,
    progress: (s) => ({ current: s.calmPlayGames, target: 10 }),
  },
  {
    id: 'break_taker',
    name: 'Self-Aware',
    description: 'Take a break when suggested 5 times',
    icon: '🛡️',
    category: 'mindfulness',
    rarity: 'rare',
    xp: 75,
    condition: (s) => s.tookBreaks >= 5,
    progress: (s) => ({ current: s.tookBreaks, target: 5 }),
  },
  
  // SECRET ACHIEVEMENTS
  {
    id: 'midnight_warrior',
    name: 'Night Owl',
    description: 'Play a game after midnight',
    icon: '🦉',
    category: 'progress',
    rarity: 'uncommon',
    xp: 30,
    condition: () => false, // Checked manually
    secret: true,
  },
  {
    id: 'comeback_king',
    name: 'Never Give Up',
    description: 'Win a game after being down significant material',
    icon: '👊',
    category: 'performance',
    rarity: 'rare',
    xp: 100,
    condition: () => false, // Checked manually
    secret: true,
  },
];

// ============================================
// ACHIEVEMENT STORE
// ============================================

interface AchievementState {
  unlockedAchievements: string[];
  newlyUnlocked: string[]; // For showing notifications
  totalXP: number;
  stats: UserStats;
  
  checkAchievements: () => void;
  updateStats: (stats: Partial<UserStats>) => void;
  clearNewlyUnlocked: () => void;
  unlockAchievement: (id: string) => void;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlockedAchievements: [],
      newlyUnlocked: [],
      totalXP: 0,
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        puzzlesSolved: 0,
        puzzleStreak: 0,
        bestPuzzleStreak: 0,
        dayStreak: 0,
        bestDayStreak: 0,
        totalPracticeMinutes: 0,
        coursesCompleted: 0,
        lessonsCompleted: 0,
        meditationMinutes: 0,
        openingsStudied: 0,
        legendGamesStudied: 0,
        accuracyAbove80Count: 0,
        accuracyAbove90Count: 0,
        calmPlayGames: 0,
        missedBreathing: 0,
        tookBreaks: 0,
      },
      
      checkAchievements: () => {
        const state = get();
        const newlyUnlocked: string[] = [];
        let xpGained = 0;
        
        ACHIEVEMENTS.forEach(achievement => {
          if (
            !state.unlockedAchievements.includes(achievement.id) &&
            achievement.condition(state.stats)
          ) {
            newlyUnlocked.push(achievement.id);
            xpGained += achievement.xp;
            
            // Play achievement sound
            try {
              UISounds.achievement();
            } catch {
              // Sound system may not be initialized
            }
          }
        });
        
        if (newlyUnlocked.length > 0) {
          set(s => ({
            unlockedAchievements: [...s.unlockedAchievements, ...newlyUnlocked],
            newlyUnlocked: [...s.newlyUnlocked, ...newlyUnlocked],
            totalXP: s.totalXP + xpGained,
          }));
        }
      },
      
      updateStats: (newStats) => {
        set(s => ({
          stats: { ...s.stats, ...newStats }
        }));
        get().checkAchievements();
      },
      
      clearNewlyUnlocked: () => {
        set({ newlyUnlocked: [] });
      },
      
      unlockAchievement: (id) => {
        const state = get();
        if (state.unlockedAchievements.includes(id)) return;
        
        const achievement = ACHIEVEMENTS.find(a => a.id === id);
        if (!achievement) return;
        
        set(s => ({
          unlockedAchievements: [...s.unlockedAchievements, id],
          newlyUnlocked: [...s.newlyUnlocked, id],
          totalXP: s.totalXP + achievement.xp,
        }));
        
        try {
          UISounds.achievement();
        } catch {
          // Sound system may not be initialized
        }
      },
    }),
    { name: 'zen-chess-achievements' }
  )
);

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id);
}

export function getAchievementsByCategory(category: Achievement['category']): Achievement[] {
  return ACHIEVEMENTS.filter(a => a.category === category);
}

export function getRarityColor(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common': return '#9ca3af';
    case 'uncommon': return '#22c55e';
    case 'rare': return '#3b82f6';
    case 'epic': return '#a855f7';
    case 'legendary': return '#f59e0b';
  }
}

export function getRarityLabel(rarity: Achievement['rarity']): string {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}

// ============================================
// HOOKS
// ============================================

export function useAchievements() {
  const store = useAchievementStore();
  
  const unlockedCount = store.unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.filter(a => !a.secret).length;
  const progress = Math.round((unlockedCount / totalCount) * 100);
  
  return {
    ...store,
    unlockedCount,
    totalCount,
    progress,
    getAchievement: getAchievementById,
    isUnlocked: (id: string) => store.unlockedAchievements.includes(id),
  };
}








