import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { AnimatePresence } from 'framer-motion';
import { allPuzzles } from '@/data/puzzles';
import { useCoachStore } from '@/state/coachStore';
import { useBoardSettingsStore, useBoardStyles, useMoveOptions } from '@/state/boardSettingsStore';
import { useAgentTrigger } from '@/lib/agents/agentOrchestrator';
import { AgentWatching, ContextualAgentTip } from '@/components/AgentPresence';
import { PuzzleGeniusPanel } from '@/components/PuzzleGeniusPanel';
import { UISounds, playSmartMoveSound } from '@/lib/soundSystem';
import { MOVE_HINT_STYLES } from '@/lib/constants';
import { useBoardSize } from '@/hooks/useBoardSize';
import {
  getPuzzleStats,
  submitPuzzleResult,
  getLocalPuzzleData,
  saveLocalPuzzleData,
  calculateEloChange,
  getThemeLabel,
} from '@/lib/puzzleService';
import {
  selectLocalPuzzle,
  getDailyPuzzle as getLocalDailyPuzzle,
  getStreakPuzzle,
  getRushPuzzle,
  getOriginalPuzzle,
  getPuzzlePoolStats,
} from '@/lib/puzzlePool';
import type { PuzzleWithMeta } from '@/lib/puzzleService';
import type { MoveHintStyle } from '@/lib/constants';
import type { ChessPuzzle, PatternType } from '@/lib/types';

// ============================================
// TYPES & CONSTANTS
// ============================================

type PuzzleMode = 'menu' | 'rated' | 'rush' | 'streak' | 'daily' | 'custom';

interface PuzzleStats {
  rating: number;
  puzzlesSolved: number;
  puzzlesFailed: number;
  currentStreak: number;
  bestStreak: number;
  totalPoints: number;
  tier: TierLevel;
  dailyPuzzleDate: string | null;
  dailyPuzzleSolved: boolean;
  rushHighScore: number;
  themeStats: Record<PatternType, { solved: number; failed: number }>;
}

type TierLevel = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND' | 'MASTER';

const TIER_CONFIG: Record<TierLevel, { name: string; minRating: number; color: string; icon: string }> = {
  BRONZE: { name: 'Bronze', minRating: 0, color: '#cd7f32', icon: '🥉' },
  SILVER: { name: 'Silver', minRating: 800, color: '#c0c0c0', icon: '🥈' },
  GOLD: { name: 'Gold', minRating: 1200, color: '#ffd700', icon: '🥇' },
  PLATINUM: { name: 'Platinum', minRating: 1600, color: '#e5e4e2', icon: '💎' },
  DIAMOND: { name: 'Diamond', minRating: 2000, color: '#b9f2ff', icon: '💠' },
  MASTER: { name: 'Master', minRating: 2400, color: '#ff6b6b', icon: '👑' },
};

const THEME_LABELS: Record<PatternType, string> = {
  FORK: 'Fork',
  PIN: 'Pin',
  SKEWER: 'Skewer',
  DISCOVERY: 'Discovery',
  DEFLECTION: 'Deflection',
  DECOY: 'Decoy',
  QUIET_MOVE: 'Quiet Move',
  ZWISCHENZUG: 'Zwischenzug',
  BACK_RANK: 'Back Rank',
  MATE_PATTERN: 'Checkmate',
  SACRIFICE: 'Sacrifice',
  CHECK: 'Check',
  CAPTURE: 'Capture',
  TACTICAL: 'Tactical',
};

const DEFAULT_STATS: PuzzleStats = {
  rating: 1000,
  puzzlesSolved: 0,
  puzzlesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalPoints: 0,
  tier: 'BRONZE',
  dailyPuzzleDate: null,
  dailyPuzzleSolved: false,
  rushHighScore: 0,
  themeStats: {} as Record<PatternType, { solved: number; failed: number }>,
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getTierFromRating(rating: number): TierLevel {
  if (rating >= 2400) return 'MASTER';
  if (rating >= 2000) return 'DIAMOND';
  if (rating >= 1600) return 'PLATINUM';
  if (rating >= 1200) return 'GOLD';
  if (rating >= 800) return 'SILVER';
  return 'BRONZE';
}

function getNextTier(tier: TierLevel): TierLevel | null {
  const tiers: TierLevel[] = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER'];
  const idx = tiers.indexOf(tier);
  return idx < tiers.length - 1 ? tiers[idx + 1] : null;
}

// Get puzzle rating - supports both old ChessPuzzle and new PuzzleWithMeta formats
function getPuzzleRating(puzzle: ChessPuzzle | PuzzleWithMeta): number {
  // New format has rating directly
  if ('rating' in puzzle && typeof puzzle.rating === 'number') {
    return puzzle.rating;
  }
  // Old format - estimate from difficulty
  if ('difficulty' in puzzle) {
    const ratings: Record<number, number> = {
      1: 800,   // Beginner
      2: 1100,  // Easy
      3: 1400,  // Intermediate
      4: 1700,  // Advanced
      5: 2000,  // Master
    };
    return ratings[(puzzle as ChessPuzzle).difficulty] || 1000;
  }
  return 1000;
}

// Get solution moves as array - supports both formats
function getSolutionMoves(puzzle: ChessPuzzle | PuzzleWithMeta): string[] {
  if ('solutionMoves' in puzzle) {
    return puzzle.solutionMoves;
  }
  return (puzzle as ChessPuzzle).solution;
}

// Get themes - supports both formats
function getThemes(puzzle: ChessPuzzle | PuzzleWithMeta): string[] {
  return puzzle.themes || [];
}

// Get puzzle title
function getPuzzleTitle(puzzle: ChessPuzzle | PuzzleWithMeta): string {
  if ('title' in puzzle && puzzle.title) {
    return puzzle.title;
  }
  // Generate title from themes
  const themes = getThemes(puzzle);
  if (themes.length > 0) {
    return getThemeLabel(themes[0]);
  }
  return 'Find the Best Move';
}

// Get puzzle explanation
function getPuzzleExplanation(puzzle: ChessPuzzle | PuzzleWithMeta): string | undefined {
  if ('explanation' in puzzle) {
    return (puzzle as ChessPuzzle).explanation;
  }
  return undefined;
}

// Get difficulty (1-5 scale)
function getPuzzleDifficulty(puzzle: ChessPuzzle | PuzzleWithMeta): number {
  if ('difficulty' in puzzle) {
    return (puzzle as ChessPuzzle).difficulty;
  }
  // Estimate from rating
  const rating = getPuzzleRating(puzzle);
  if (rating < 1000) return 1;
  if (rating < 1300) return 2;
  if (rating < 1600) return 3;
  if (rating < 1900) return 4;
  return 5;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function PuzzlesPage() {
  // Coach integration
  const { recordEvent, recordPuzzle } = useCoachStore();
  const triggerAgent = useAgentTrigger();
  const puzzleStartTime = useRef<number>(Date.now());
  const puzzleStreakRef = useRef<number>(0);
  const boardSize = useBoardSize(480, 32);
  
  // Navigation State
  const [mode, setMode] = useState<PuzzleMode>('menu');
  
  // Puzzle State - supports both old ChessPuzzle and new PuzzleWithMeta formats
  const [currentPuzzle, setCurrentPuzzle] = useState<ChessPuzzle | PuzzleWithMeta | null>(null);
  
  // Last rating change (for chess.com style display)
  const [lastRatingChange, setLastRatingChange] = useState<number | null>(null);
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, React.CSSProperties>>({});
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [moveIndex, setMoveIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'complete' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState<0 | 1 | 2>(0); // 0=none, 1=highlight piece, 2=show full move
  const [hintSquares, setHintSquares] = useState<{ from?: Square; to?: Square }>({});
  
  // Rush Mode State
  const [rushTimer, setRushTimer] = useState(180); // 3 minutes
  const [rushStrikes, setRushStrikes] = useState(0);
  const [rushScore, setRushScore] = useState(0);
  const [rushActive, setRushActive] = useState(false);
  const rushInterval = useRef<ReturnType<typeof setInterval>>();
  
  // Streak Mode State
  const [streakCount, setStreakCount] = useState(0);
  const [streakDifficulty, setStreakDifficulty] = useState(1);
  const [streakActive, setStreakActive] = useState(false);
  
  // Custom Mode State
  const [selectedTheme, setSelectedTheme] = useState<PatternType | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  
  // Centralized board settings
  const boardStyles = useBoardStyles();
  const { settings: boardSettings, setMoveHintStyle } = useBoardSettingsStore();
  const { getMoveOptionsStyle, showMoveHints } = useMoveOptions();
  
  // Gentle error feedback state - show text message only, no shake
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);
  
  // AI Genius Panel state
  const [showGeniusPanel, setShowGeniusPanel] = useState(false);
  const [puzzleSolveTime, setPuzzleSolveTime] = useState(0);
  
  // Setup move animation state - shows opponent's last move when puzzle loads
  const [isAnimatingSetup, setIsAnimatingSetup] = useState(false);
  
  // Track seen puzzles in this session to avoid repetition
  const seenPuzzleIds = useRef<Set<string>>(new Set());
  
  // Stats State (persisted via new puzzle service)
  const [stats, setStats] = useState<PuzzleStats>(() => {
    // Load from new puzzle service storage
    const newData = getLocalPuzzleData();
    // Also check legacy storage for backwards compatibility
    const legacySaved = localStorage.getItem('zenChessPuzzleStats');
    const legacy = legacySaved ? JSON.parse(legacySaved) : {};
    
    return {
      ...DEFAULT_STATS,
      ...legacy,
      rating: newData.rating || legacy.rating || DEFAULT_STATS.rating,
      puzzlesSolved: newData.wins || legacy.puzzlesSolved || 0,
      puzzlesFailed: newData.losses || legacy.puzzlesFailed || 0,
      currentStreak: newData.currentStreak || legacy.currentStreak || 0,
      bestStreak: newData.bestStreak || legacy.bestStreak || 0,
      tier: getTierFromRating(newData.rating || legacy.rating || DEFAULT_STATS.rating),
    };
  });

  // Save stats to both legacy and new storage
  useEffect(() => {
    localStorage.setItem('zenChessPuzzleStats', JSON.stringify(stats));
    // Also save to new format for the puzzle service
    saveLocalPuzzleData({
      rating: stats.rating,
      highestRating: Math.max(stats.rating, getLocalPuzzleData().highestRating || stats.rating),
      gamesPlayed: stats.puzzlesSolved + stats.puzzlesFailed,
      wins: stats.puzzlesSolved,
      losses: stats.puzzlesFailed,
      currentStreak: stats.currentStreak,
      bestStreak: stats.bestStreak,
    });
  }, [stats]);

  // Rush timer
  useEffect(() => {
    if (rushActive && rushTimer > 0) {
      rushInterval.current = setInterval(() => {
        setRushTimer(prev => {
          if (prev <= 1) {
            setRushActive(false);
            clearInterval(rushInterval.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(rushInterval.current);
  }, [rushActive]);

  // Get filtered puzzles for custom mode
  const filteredPuzzles = useMemo(() => {
    return allPuzzles.filter(p => {
      if (selectedTheme && !p.themes.includes(selectedTheme)) return false;
      if (selectedDifficulty && p.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedTheme, selectedDifficulty]);

  // Select puzzle based on rating (for rated mode) - uses new adaptive puzzle pool
  const selectRatedPuzzle = useCallback((): ChessPuzzle | PuzzleWithMeta | null => {
    // Use new puzzle pool with proper selection algorithm
    const puzzle = selectLocalPuzzle({
      userRating: stats.rating,
      ratingRange: 200,
      excludeIds: Array.from(seenPuzzleIds.current),
      mode: 'rated',
    });
    
    if (puzzle) {
      // Try to get the original ChessPuzzle for richer data (title, explanation, etc.)
      const original = getOriginalPuzzle(puzzle.id);
      if (original) {
        return original;
      }
      return puzzle;
    }
    
    // Fallback to old method if new pool fails
    const targetRating = stats.rating;
    const range = 200;
    const eligible = allPuzzles.filter(p => {
      const pr = getPuzzleRating(p);
      return pr >= targetRating - range && pr <= targetRating + range;
    });
    
    const unseenEligible = eligible.filter(p => !seenPuzzleIds.current.has(p.id));
    const pool = unseenEligible.length > 0 ? unseenEligible : allPuzzles;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [stats.rating]);

  // Track if we've already recorded a failure for this puzzle attempt
  const hasRecordedFailure = useRef(false);
  
  // Start a puzzle - with setup move animation if available
  // Supports both old ChessPuzzle and new PuzzleWithMeta formats
  const startPuzzle = useCallback((puzzle: ChessPuzzle | PuzzleWithMeta) => {
    // Mark puzzle as seen to avoid repetition
    seenPuzzleIds.current.add(puzzle.id);
    
    // Clear last rating change for new puzzle
    setLastRatingChange(null);
    
    // Reset failure tracking for new puzzle
    hasRecordedFailure.current = false;
    
    setCurrentPuzzle(puzzle);
    setMoveIndex(0);
    setMoveFrom(null);
    setOptionSquares({});
    setFeedback(null);
    setShowHint(false);
    setHintLevel(0);
    setHintSquares({});
    
    // If puzzle has setup move data, animate the opponent's last move
    if (puzzle.beforeFen && puzzle.setupMove) {
      setIsAnimatingSetup(true);
      // Start with the position BEFORE opponent's move
      const beforeGame = new Chess(puzzle.beforeFen);
      setGame(beforeGame);
      setLastMove(null);
      
      // After a brief moment, show the opponent making their move
      setTimeout(() => {
        const newGame = new Chess(puzzle.fen);
        setGame(newGame);
        // Highlight the opponent's last move so user sees what just happened
        setLastMove({ 
          from: puzzle.setupMove!.from as Square, 
          to: puzzle.setupMove!.to as Square 
        });
        setIsAnimatingSetup(false);
        
        // Track puzzle start for coach
        puzzleStartTime.current = Date.now();
        recordEvent('PUZZLE_START', { 
          themes: puzzle.themes, 
          difficulty: puzzle.difficulty 
        });
      }, 600); // Give time for the animation
    } else {
      // No setup move - just show the puzzle position directly
      const newGame = new Chess(puzzle.fen);
      setGame(newGame);
      setLastMove(null);
      setIsAnimatingSetup(false);
      
      // Track puzzle start for coach
      puzzleStartTime.current = Date.now();
      recordEvent('PUZZLE_START', { 
        themes: puzzle.themes, 
        difficulty: puzzle.difficulty 
      });
    }
  }, [recordEvent]);

  // Helper to get random unseen puzzle from a pool
  const getRandomUnseenPuzzle = useCallback((pool: ChessPuzzle[]): ChessPuzzle => {
    const unseen = pool.filter(p => !seenPuzzleIds.current.has(p.id));
    const finalPool = unseen.length > 0 ? unseen : pool;
    return finalPool[Math.floor(Math.random() * finalPool.length)];
  }, []);

  // Start a mode
  const startMode = useCallback((newMode: PuzzleMode) => {
    setMode(newMode);
    
    // Clear seen puzzles when starting a new mode (except for rush/streak continuation)
    if (newMode !== 'rush' && newMode !== 'streak') {
      seenPuzzleIds.current.clear();
    }
    
    if (newMode === 'rated') {
      startPuzzle(selectRatedPuzzle());
    } else if (newMode === 'rush') {
      setRushTimer(180);
      setRushStrikes(0);
      setRushScore(0);
      setRushActive(true);
      seenPuzzleIds.current.clear(); // Fresh start for rush
      startPuzzle(getRandomUnseenPuzzle(allPuzzles));
    } else if (newMode === 'streak') {
      setStreakCount(0);
      setStreakDifficulty(1);
      setStreakActive(true);
      seenPuzzleIds.current.clear(); // Fresh start for streak
      // Use new streak puzzle system - starts easy, gets harder
      const streakPuzzle = getStreakPuzzle(0);
      if (streakPuzzle) {
        const original = getOriginalPuzzle(streakPuzzle.id);
        startPuzzle(original || streakPuzzle);
      } else {
        // Fallback to old method
        const easyPuzzles = allPuzzles.filter(p => p.difficulty === 1);
        startPuzzle(getRandomUnseenPuzzle(easyPuzzles.length > 0 ? easyPuzzles : allPuzzles));
      }
    } else if (newMode === 'daily') {
      const dailyPuzzle = getLocalDailyPuzzle();
      // Try to get original puzzle for richer data
      const original = getOriginalPuzzle(dailyPuzzle.id);
      startPuzzle(original || dailyPuzzle);
    } else if (newMode === 'custom') {
      if (filteredPuzzles.length > 0) {
        startPuzzle(getRandomUnseenPuzzle(filteredPuzzles));
      }
    }
  }, [selectRatedPuzzle, startPuzzle, filteredPuzzles, getRandomUnseenPuzzle]);

  // Handle puzzle completion
  const handlePuzzleSolved = useCallback(() => {
    if (!currentPuzzle) return;
    
    const puzzleRating = getPuzzleRating(currentPuzzle);
    const puzzleDifficulty = getPuzzleDifficulty(currentPuzzle);
    const themes = getThemes(currentPuzzle);
    
    // Calculate rating change (only for rated mode, not streak/rush)
    const ratingChange = (mode === 'streak' || mode === 'rush') 
      ? 0 
      : calculateEloChange(stats.rating, puzzleRating, true);
    const points = 10 + puzzleDifficulty * 5 + (mode === 'rush' ? 5 : 0);
    const timeToSolve = Date.now() - puzzleStartTime.current;
    
    // Store rating change for chess.com style display
    setLastRatingChange(ratingChange);
    
    // Record puzzle success to coach (solved, timeSeconds, hintsUsed)
    const timeSeconds = Math.round(timeToSolve / 1000);
    recordPuzzle(true, timeSeconds, showHint ? 1 : 0);
    recordEvent('PUZZLE_COMPLETE', { 
      solved: true, 
      timeSeconds, 
      themes,
    });
    
    // Track puzzle streak for agents
    puzzleStreakRef.current += 1;
    triggerAgent({ type: 'PUZZLE_COMPLETE', solved: true, time: timeSeconds });
    
    // Notify agents of puzzle streaks
    if (puzzleStreakRef.current === 5 || puzzleStreakRef.current === 10) {
      triggerAgent({ type: 'PUZZLE_STREAK', count: puzzleStreakRef.current });
    }
    
    setStats(prev => {
      const newStreak = prev.currentStreak + 1;
      const newRating = Math.max(100, prev.rating + ratingChange);
      return {
        ...prev,
        rating: newRating,
        puzzlesSolved: prev.puzzlesSolved + 1,
        currentStreak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak),
        totalPoints: prev.totalPoints + points,
        tier: getTierFromRating(newRating),
        themeStats: {
          ...prev.themeStats,
          ...themes.reduce((acc, theme) => ({
            ...acc,
            [theme as PatternType]: {
              solved: (prev.themeStats[theme as PatternType]?.solved || 0) + 1,
              failed: prev.themeStats[theme as PatternType]?.failed || 0,
            }
          }), {}),
        },
        ...(mode === 'daily' ? { dailyPuzzleDate: new Date().toISOString().split('T')[0], dailyPuzzleSolved: true } : {}),
      };
    });

    if (mode === 'rush') {
      setRushScore(prev => prev + 1);
      setTimeout(() => {
        const unseen = allPuzzles.filter(p => !seenPuzzleIds.current.has(p.id));
        const pool = unseen.length > 0 ? unseen : allPuzzles;
        startPuzzle(pool[Math.floor(Math.random() * pool.length)]);
      }, 500);
    } else if (mode === 'streak') {
      const newStreakCount = streakCount + 1;
      setStreakCount(newStreakCount);
      // Increase difficulty every 3 puzzles (same as before)
      const newDifficulty = Math.min(5, Math.floor(newStreakCount / 3) + 1);
      setStreakDifficulty(newDifficulty);
      setTimeout(() => {
        // Use new streak puzzle system for progressive difficulty
        const streakPuzzle = getStreakPuzzle(newStreakCount);
        if (streakPuzzle) {
          const original = getOriginalPuzzle(streakPuzzle.id);
          startPuzzle(original || streakPuzzle);
        } else {
          // Fallback to old method
          const difficultyPuzzles = allPuzzles.filter(p => p.difficulty === newDifficulty);
          const unseenDifficulty = difficultyPuzzles.filter(p => !seenPuzzleIds.current.has(p.id));
          const pool = unseenDifficulty.length > 0 
            ? unseenDifficulty 
            : difficultyPuzzles.length > 0 
              ? difficultyPuzzles 
              : allPuzzles;
          startPuzzle(pool[Math.floor(Math.random() * pool.length)]);
        }
        setFeedback(null);
      }, 800);
    } else {
      // Calculate solve time and show genius panel
      const solveTime = Math.round((Date.now() - puzzleStartTime.current) / 1000);
      setPuzzleSolveTime(solveTime);
      setFeedback('complete');
      setShowGeniusPanel(true);
    }
  }, [currentPuzzle, stats.rating, mode, startPuzzle, showHint, recordPuzzle, recordEvent, streakCount]);

  // Handle puzzle failure - gentle feedback, allow retry without repeated penalties
  const handlePuzzleFailed = useCallback((allowRetry: boolean = true) => {
    if (!currentPuzzle) return;
    
    // Show gentle text feedback - no shake
    setShowIncorrectFeedback(true);
    setTimeout(() => setShowIncorrectFeedback(false), 2000);
    
    // Only record failure and update stats ONCE per puzzle attempt
    // This allows retries without repeated penalties
    const shouldRecordFailure = !hasRecordedFailure.current;
    
    const puzzleRating = getPuzzleRating(currentPuzzle);
    const themes = getThemes(currentPuzzle);
    
    if (shouldRecordFailure) {
      hasRecordedFailure.current = true;
      
      // Calculate rating change - only apply in rated mode, not streak/rush
      const ratingChange = (mode === 'streak' || mode === 'rush') 
        ? 0 
        : calculateEloChange(stats.rating, puzzleRating, false);
      const timeToFail = Date.now() - puzzleStartTime.current;
      
      // Store rating change for chess.com style display
      if (mode === 'rated') {
        setLastRatingChange(ratingChange);
      }
      
      // Record puzzle failure to coach (solved, timeSeconds, hintsUsed)
      const timeSeconds = Math.round(timeToFail / 1000);
      recordPuzzle(false, timeSeconds, showHint ? 1 : 0);
      recordEvent('PUZZLE_COMPLETE', { 
        solved: false, 
        timeSeconds, 
        themes,
      });
      
      // Reset puzzle streak and notify agents
      puzzleStreakRef.current = 0;
      triggerAgent({ type: 'PUZZLE_COMPLETE', solved: false, time: timeSeconds });
      
      // Update stats - rating only changes in rated mode, not streak/rush
      if (mode === 'rated') {
        setStats(prev => ({
          ...prev,
          rating: Math.max(100, prev.rating + ratingChange),
          puzzlesFailed: prev.puzzlesFailed + 1,
          currentStreak: 0,
          tier: getTierFromRating(Math.max(100, prev.rating + ratingChange)),
          themeStats: {
            ...prev.themeStats,
            ...themes.reduce((acc, theme) => ({
              ...acc,
              [theme as PatternType]: {
                solved: prev.themeStats[theme as PatternType]?.solved || 0,
                failed: (prev.themeStats[theme as PatternType]?.failed || 0) + 1,
              }
            }), {}),
          },
        }));
      } else if (mode === 'rush' || mode === 'streak') {
        // In rush/streak, just update failure count without rating change
        setStats(prev => ({
          ...prev,
          puzzlesFailed: prev.puzzlesFailed + 1,
          currentStreak: 0,
        }));
      }
    }

    if (mode === 'rush') {
      setRushStrikes(prev => {
        const newStrikes = prev + 1;
        if (newStrikes >= 3) {
          setRushActive(false);
          setStats(s => ({
            ...s,
            rushHighScore: Math.max(s.rushHighScore, rushScore),
          }));
        }
        return newStrikes;
      });
      if (rushStrikes < 2) {
        setTimeout(() => {
          const unseen = allPuzzles.filter(p => !seenPuzzleIds.current.has(p.id));
          const pool = unseen.length > 0 ? unseen : allPuzzles;
          startPuzzle(pool[Math.floor(Math.random() * pool.length)]);
        }, 800);
      }
    } else if (mode === 'streak') {
      // Streak ends on first mistake
      setStreakActive(false);
      setStats(s => ({
        ...s,
        bestStreak: Math.max(s.bestStreak, streakCount),
      }));
      setFeedback('incorrect');
    } else if (allowRetry) {
      // For rated/daily/custom modes - allow retry without auto-resetting
      // Just show feedback, let user click Reset if they want
      setFeedback('incorrect');
    }
  }, [currentPuzzle, stats.rating, mode, rushScore, rushStrikes, startPuzzle, showHint, recordPuzzle, recordEvent, streakCount]);

  // Get move options - uses centralized board settings
  const getMoveOptions = useCallback((square: Square) => {
    if (!showMoveHints) {
      setOptionSquares({});
      return game.moves({ square, verbose: true }).length > 0;
    }
    
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, React.CSSProperties> = {};
    moves.forEach((move) => {
      const isCapture = !!game.get(move.to as Square);
      newSquares[move.to] = getMoveOptionsStyle(isCapture);
    });
    newSquares[square] = { backgroundColor: 'rgba(129, 182, 76, 0.4)' };
    setOptionSquares(newSquares);
    return true;
  }, [game, showMoveHints, getMoveOptionsStyle]);

  // Handle move
  const handleMove = useCallback((from: Square, to: Square) => {
    if (!currentPuzzle || feedback === 'complete') return false;

    const gameCopy = new Chess(game.fen());
    try {
      const isCapture = !!gameCopy.get(to);
      const result = gameCopy.move({ from, to, promotion: 'q' });
      if (!result) return false;

      const solutionMoves = getSolutionMoves(currentPuzzle);
      const expectedMove = solutionMoves[moveIndex];
      const isCorrect = result.san === expectedMove || 
        `${from}${to}` === expectedMove ||
        result.san.replace(/[+#]/g, '') === expectedMove?.replace(/[+#]/g, '');

      if (isCorrect) {
        // Preserve scroll position to prevent jump after state updates
        const scrollY = window.scrollY;
        
        // Play move sound
        playSmartMoveSound(gameCopy, result, { isCapture });
        
        setGame(gameCopy);
        setLastMove({ from, to });
        setFeedback('correct');
        
        // Restore scroll position after React re-renders
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
        
        // Check if puzzle complete
        if (moveIndex + 1 >= solutionMoves.length) {
          // Play success sound after a brief delay
          setTimeout(() => UISounds.puzzleCorrect(), 200);
          handlePuzzleSolved();
        } else {
          // Play opponent's response
          setTimeout(() => {
            const opponentMove = solutionMoves[moveIndex + 1];
            if (opponentMove) {
              const responseGame = new Chess(gameCopy.fen());
              const opponentCapture = responseGame.get(opponentMove.slice(2, 4) as Square);
              const response = responseGame.move(opponentMove);
              if (response) {
                // Preserve scroll position to prevent jump after state updates
                const scrollY = window.scrollY;
                
                // Play opponent's move sound
                playSmartMoveSound(responseGame, response, { isCapture: !!opponentCapture });
                
                setGame(responseGame);
                setLastMove({ from: response.from as Square, to: response.to as Square });
                setMoveIndex(moveIndex + 2);
                setFeedback(null);
                // Reset hint level so user can request hints for next move
                // But keep hint squares cleared so they don't see stale hints
                setHintLevel(0);
                setHintSquares({});
                
                // Restore scroll position after React re-renders
                requestAnimationFrame(() => {
                  window.scrollTo(0, scrollY);
                });
              }
            }
          }, 500);
        }
        return true;
      } else {
        // Play error sound
        UISounds.puzzleWrong();
        
        // Gentle feedback - show the wrong move briefly, then reset
        setLastMove({ from, to });
        handlePuzzleFailed(true);
        return false;
      }
    } catch {
      return false;
    }
  }, [currentPuzzle, game, moveIndex, feedback, handlePuzzleSolved, handlePuzzleFailed]);

  // Square click handler - allows interaction even after errors (for retry)
  const onSquareClick = useCallback((square: Square) => {
    if (feedback === 'complete') return;
    // Clear incorrect feedback when user starts new interaction
    if (feedback === 'incorrect' && mode !== 'streak') {
      setFeedback(null);
    }

    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        getMoveOptions(square);
      }
      return;
    }

    if (moveFrom === square) {
      setMoveFrom(null);
      setOptionSquares({});
      return;
    }

    handleMove(moveFrom, square);
    setMoveFrom(null);
    setOptionSquares({});
  }, [game, moveFrom, feedback, mode, getMoveOptions, handleMove]);

  // Drag and drop - allows interaction even after errors (for retry)
  const onDrop = useCallback((sourceSquare: Square, targetSquare: Square) => {
    if (feedback === 'complete') return false;
    if (feedback === 'incorrect' && mode === 'streak') return false;
    // Clear feedback and allow retry
    if (feedback === 'incorrect') setFeedback(null);
    return handleMove(sourceSquare, targetSquare);
  }, [feedback, mode, handleMove]);

  // Next puzzle
  const nextPuzzle = useCallback(() => {
    if (mode === 'rated') {
      startPuzzle(selectRatedPuzzle());
    } else if (mode === 'custom' && filteredPuzzles.length > 0) {
      startPuzzle(filteredPuzzles[Math.floor(Math.random() * filteredPuzzles.length)]);
    }
  }, [mode, selectRatedPuzzle, filteredPuzzles, startPuzzle]);

  // Get hint squares from the expected move
  const getHintFromMove = useCallback((moveNotation: string): { from?: Square; to?: Square } => {
    if (!currentPuzzle) return {};
    
    // Try to parse the move using chess.js
    const tempGame = new Chess(game.fen());
    try {
      const move = tempGame.move(moveNotation);
      if (move) {
        return { from: move.from as Square, to: move.to as Square };
      }
    } catch {
      // If notation parsing fails, try if it's already in "e2e4" format
      if (moveNotation.length >= 4) {
        const from = moveNotation.slice(0, 2) as Square;
        const to = moveNotation.slice(2, 4) as Square;
        return { from, to };
      }
    }
    return {};
  }, [game, currentPuzzle]);

  // Handle hint button - progressive hints
  const handleHint = useCallback(() => {
    if (!currentPuzzle || feedback === 'complete') return;
    
    const solutionMoves = getSolutionMoves(currentPuzzle);
    const expectedMove = solutionMoves[moveIndex];
    if (!expectedMove) return;
    
    const squares = getHintFromMove(expectedMove);
    
    if (hintLevel === 0) {
      // Level 1: Highlight the piece that should move
      setHintLevel(1);
      setShowHint(true);
      setHintSquares({ from: squares.from });
    } else if (hintLevel === 1) {
      // Level 2: Show the full move (from and to squares)
      setHintLevel(2);
      setHintSquares(squares);
    }
  }, [currentPuzzle, moveIndex, feedback, hintLevel, getHintFromMove]);

  // Auto-play the correct move (for "Show Move" button)
  const showCorrectMove = useCallback(() => {
    if (!currentPuzzle || feedback === 'complete') return;
    
    const solutionMoves = getSolutionMoves(currentPuzzle);
    const expectedMove = solutionMoves[moveIndex];
    if (!expectedMove) return;
    
    const squares = getHintFromMove(expectedMove);
    if (squares.from && squares.to) {
      // Make the move automatically
      handleMove(squares.from, squares.to);
    }
  }, [currentPuzzle, moveIndex, feedback, getHintFromMove, handleMove]);

  // Custom square styles - purple theme
  const customSquareStyles = useMemo(() => ({
    ...optionSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(147, 112, 219, 0.25)' },
      [lastMove.to]: { backgroundColor: 'rgba(147, 112, 219, 0.4)' },
    }),
    ...(feedback === 'correct' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(34, 197, 94, 0.5)' },
    }),
    // Gentle red indicator for incorrect - not blocking
    ...(feedback === 'incorrect' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(239, 68, 68, 0.35)' },
    }),
    // Hint highlights - purple for the piece to move
    ...(hintSquares.from && {
      [hintSquares.from]: { 
        backgroundColor: 'rgba(147, 112, 219, 0.5)',
        boxShadow: 'inset 0 0 0 3px rgba(147, 112, 219, 0.8)',
      },
    }),
    // Hint for destination square (level 2) - lighter purple
    ...(hintSquares.to && hintLevel >= 2 && {
      [hintSquares.to]: { 
        backgroundColor: 'rgba(147, 112, 219, 0.35)',
        boxShadow: 'inset 0 0 0 3px rgba(147, 112, 219, 0.6)',
      },
    }),
  }), [optionSquares, lastMove, feedback, hintSquares, hintLevel]);

  const boardOrientation = currentPuzzle 
    ? (currentPuzzle.fen.includes(' w ') ? 'white' : 'black')
    : 'white';

  const tierConfig = TIER_CONFIG[stats.tier];
  const nextTier = getNextTier(stats.tier);
  const nextTierConfig = nextTier ? TIER_CONFIG[nextTier] : null;
  const progressToNextTier = nextTierConfig 
    ? ((stats.rating - tierConfig.minRating) / (nextTierConfig.minRating - tierConfig.minRating)) * 100
    : 100;

  // ============================================
  // RENDER: MODE SELECTION MENU
  // ============================================
  if (mode === 'menu') {
    const accuracy = stats.puzzlesSolved + stats.puzzlesFailed > 0
      ? Math.round((stats.puzzlesSolved / (stats.puzzlesSolved + stats.puzzlesFailed)) * 100)
      : 0;

    return (
      <div className="space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
        {/* Hero Header */}
        <section className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-1 sm:mb-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
              Puzzle Training
            </h1>
            <span className="hidden sm:inline"><AgentWatching agents={['training', 'pattern']} /></span>
          </div>
          <p className="text-sm sm:text-lg" style={{ color: 'var(--text-tertiary)' }}>
            {allPuzzles.length}+ puzzles to master
          </p>
        </section>

        {/* Agent Tip - hidden on mobile */}
        <div className="hidden sm:block">
          <ContextualAgentTip currentPage="/train" />
        </div>

        {/* Rating & Tier Card */}
        <div className="card p-3 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <div 
                className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-2xl sm:text-3xl shrink-0"
                style={{ background: `${tierConfig.color}22` }}
              >
                {tierConfig.icon}
              </div>
              <div>
                <div className="text-[10px] sm:text-sm" style={{ color: 'var(--text-muted)' }}>Rating</div>
                <div className="text-xl sm:text-3xl font-display font-bold" style={{ color: tierConfig.color }}>
                  {stats.rating}
                </div>
                <div className="text-[10px] sm:text-sm" style={{ color: tierConfig.color }}>
                  {tierConfig.name}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="stat-value text-gradient text-lg sm:text-2xl">{stats.puzzlesSolved}</div>
              <div className="stat-label text-[10px] sm:text-xs">Solved</div>
            </div>
          </div>

          {/* Progress to next tier */}
          {nextTierConfig && (
            <div>
              <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                <span>{tierConfig.name}</span>
                <span>{nextTierConfig.name} ({nextTierConfig.minRating})</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${Math.min(100, progressToNextTier)}%`, background: tierConfig.color }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
          <div className="stat-card p-2 sm:p-4">
            <div className="stat-value text-sm sm:text-xl" style={{ color: '#4ade80' }}>{accuracy}%</div>
            <div className="stat-label text-[9px] sm:text-xs">Accuracy</div>
          </div>
          <div className="stat-card p-2 sm:p-4">
            <div className="stat-value text-sm sm:text-xl text-gradient">{stats.currentStreak}</div>
            <div className="stat-label text-[9px] sm:text-xs">Streak</div>
          </div>
          <div className="stat-card p-2 sm:p-4">
            <div className="stat-value text-sm sm:text-xl" style={{ color: '#f59e0b' }}>{stats.bestStreak}</div>
            <div className="stat-label text-[9px] sm:text-xs">Best</div>
          </div>
          <div className="stat-card p-2 sm:p-4">
            <div className="stat-value text-sm sm:text-xl" style={{ color: '#ec4899' }}>{stats.rushHighScore}</div>
            <div className="stat-label text-[9px] sm:text-xs">Rush</div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          {/* Rated Puzzles */}
          <button
            onClick={() => startMode('rated')}
            className="card-interactive p-3 sm:p-6 text-left group"
          >
            <div className="flex items-start justify-between mb-2 sm:mb-4">
              <div 
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl"
                style={{ background: 'rgba(74, 222, 128, 0.1)' }}
              >
                ♟️
              </div>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#4ade80' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-xl font-display mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
              Rated
            </h3>
            <p className="text-[10px] sm:text-sm font-display italic mb-1 sm:mb-2" style={{ color: '#4ade80' }}>
              Adaptive
            </p>
            <p className="text-[10px] sm:text-sm hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>
              Puzzles adapt to your skill level
            </p>
          </button>

          {/* Puzzle Rush */}
          <button
            onClick={() => startMode('rush')}
            className="card-interactive p-3 sm:p-6 text-left group"
          >
            <div className="flex items-start justify-between mb-2 sm:mb-4">
              <div 
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl"
                style={{ background: 'rgba(249, 115, 22, 0.1)' }}
              >
                🔥
              </div>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#f97316' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-xl font-display mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
              Rush
            </h3>
            <p className="text-[10px] sm:text-sm font-display italic mb-1 sm:mb-2" style={{ color: '#f97316' }}>
              3 min, 3 strikes
            </p>
            <p className="text-[10px] sm:text-sm hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>
              Race against time!
            </p>
          </button>

          {/* Puzzle Streak */}
          <button
            onClick={() => startMode('streak')}
            className="card-interactive p-3 sm:p-6 text-left group"
          >
            <div className="flex items-start justify-between mb-2 sm:mb-4">
              <div 
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl"
                style={{ background: 'rgba(236, 72, 153, 0.1)' }}
              >
                ⚡
              </div>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ec4899' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-sm sm:text-xl font-display mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
              Streak
            </h3>
            <p className="text-[10px] sm:text-sm font-display italic mb-1 sm:mb-2" style={{ color: '#ec4899' }}>
              Don't fail!
            </p>
            <p className="text-[10px] sm:text-sm hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>
              One mistake ends it
            </p>
          </button>

          {/* Daily Puzzle */}
          <button
            onClick={() => startMode('daily')}
            className="card-interactive p-3 sm:p-6 text-left group"
            disabled={stats.dailyPuzzleSolved && stats.dailyPuzzleDate === new Date().toISOString().split('T')[0]}
          >
            <div className="flex items-start justify-between mb-2 sm:mb-4">
              <div 
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl"
                style={{ background: 'rgba(99, 102, 241, 0.1)' }}
              >
                📅
              </div>
              {stats.dailyPuzzleSolved && stats.dailyPuzzleDate === new Date().toISOString().split('T')[0] ? (
                <span className="badge badge-green text-[10px] sm:text-xs">✓</span>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5 opacity-50 sm:opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6366f1' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
            <h3 className="text-sm sm:text-xl font-display mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
              Daily
            </h3>
            <p className="text-[10px] sm:text-sm font-display italic mb-1 sm:mb-2" style={{ color: '#6366f1' }}>
              New daily
            </p>
            <p className="text-[10px] sm:text-sm hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>
              Fresh challenge every day
            </p>
          </button>

          {/* Custom Puzzles */}
          <button
            onClick={() => setMode('custom')}
            className="card-interactive p-6 text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(139, 92, 246, 0.1)' }}
              >
                🎯
              </div>
              <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#8b5cf6' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
              Custom Puzzles
            </h3>
            <p className="text-sm font-display italic mb-2" style={{ color: '#8b5cf6' }}>
              Practice specific themes
            </p>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Filter by tactical theme or difficulty to focus your training.
            </p>
          </button>
        </div>

        {/* Theme Performance */}
        <div className="card p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
            Theme Performance
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.keys(THEME_LABELS) as PatternType[]).slice(0, 8).map(theme => {
              const themeStats = stats.themeStats[theme] || { solved: 0, failed: 0 };
              const total = themeStats.solved + themeStats.failed;
              const acc = total > 0 ? Math.round((themeStats.solved / total) * 100) : 0;
              
              return (
                <div key={theme} className="p-3 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
                  <div className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                    {THEME_LABELS[theme]}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {themeStats.solved}/{total}
                    </span>
                    <span className="text-xs font-mono" style={{ color: acc >= 70 ? '#4ade80' : acc >= 50 ? '#f59e0b' : '#ef4444' }}>
                      {acc}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: CUSTOM MODE SELECTION
  // ============================================
  if (mode === 'custom' && !currentPuzzle) {
    const themes = Object.keys(THEME_LABELS) as PatternType[];
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setMode('menu')}
            className="hover:text-white transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            Puzzles
          </button>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>Custom Puzzles</span>
        </div>

        <h1 className="text-2xl font-display" style={{ color: 'var(--text-primary)' }}>
          Select Theme & Difficulty
        </h1>

        {/* Theme Selection */}
        <div className="card p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
            Tactical Theme
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={() => setSelectedTheme(null)}
              className={`p-3 rounded-lg text-sm transition-all ${!selectedTheme ? 'ring-2' : ''}`}
              style={{ 
                background: !selectedTheme ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                color: !selectedTheme ? 'white' : 'var(--text-secondary)'
              }}
            >
              All Themes
            </button>
            {themes.map(theme => (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`p-3 rounded-lg text-sm transition-all ${selectedTheme === theme ? 'ring-2' : ''}`}
                style={{ 
                  background: selectedTheme === theme ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                  color: selectedTheme === theme ? 'white' : 'var(--text-secondary)'
                }}
              >
                {THEME_LABELS[theme]}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="card p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
            Difficulty
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDifficulty(null)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${!selectedDifficulty ? 'ring-2' : ''}`}
              style={{ 
                background: !selectedDifficulty ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                color: !selectedDifficulty ? 'white' : 'var(--text-secondary)'
              }}
            >
              All Levels
            </button>
            {[1, 2, 3, 4, 5].map(d => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${selectedDifficulty === d ? 'ring-2' : ''}`}
                style={{ 
                  background: selectedDifficulty === d ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                  color: selectedDifficulty === d ? 'white' : 'var(--text-secondary)'
                }}
              >
                {'★'.repeat(d)}{'☆'.repeat(5-d)}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="flex gap-4">
          <button
            onClick={() => setMode('menu')}
            className="btn-ghost"
          >
            ← Back
          </button>
          <button
            onClick={() => startMode('custom')}
            disabled={filteredPuzzles.length === 0}
            className="btn-primary flex-1"
          >
            Start Training ({filteredPuzzles.length} puzzles)
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: PUZZLE SOLVING VIEW
  // ============================================
  if (currentPuzzle) {
    const isRushOver = mode === 'rush' && (!rushActive || rushStrikes >= 3);
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => { setMode('menu'); setCurrentPuzzle(null); setRushActive(false); }}
              className="hover:text-white transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              Puzzles
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {mode === 'rated' && 'Rated Puzzles'}
              {mode === 'rush' && 'Puzzle Rush'}
              {mode === 'streak' && 'Puzzle Streak'}
              {mode === 'daily' && 'Daily Puzzle'}
              {mode === 'custom' && 'Custom Puzzles'}
            </span>
          </div>

          {/* Rush Timer/Score */}
          {mode === 'rush' && rushActive && (
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold" style={{ color: rushTimer < 30 ? '#ef4444' : 'var(--text-primary)' }}>
                  {Math.floor(rushTimer / 60)}:{(rushTimer % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono font-bold" style={{ color: '#4ade80' }}>
                  {rushScore}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Score</div>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full"
                    style={{ background: i < rushStrikes ? '#ef4444' : 'var(--bg-hover)' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Streak Counter */}
          {mode === 'streak' && streakActive && (
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-mono font-bold" style={{ color: '#ec4899' }}>
                  {streakCount}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Streak</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(d => (
                    <div
                      key={d}
                      className="w-3 h-3 rounded-full"
                      style={{ background: d <= streakDifficulty ? '#ec4899' : 'var(--bg-hover)' }}
                    />
                  ))}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Difficulty</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: '#f59e0b' }}>
                  🏆 {stats.bestStreak}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Best</div>
              </div>
            </div>
          )}
        </div>

        {/* Rush Over Screen */}
        {isRushOver && mode === 'rush' && (
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
              {rushStrikes >= 3 ? 'Game Over!' : "Time's Up!"}
            </h2>
            <div className="text-4xl font-display font-bold mb-4" style={{ color: '#4ade80' }}>
              {rushScore} Puzzles
            </div>
            {rushScore > stats.rushHighScore - rushScore && rushScore === stats.rushHighScore && (
              <p className="text-lg mb-4" style={{ color: '#f59e0b' }}>🎉 New High Score!</p>
            )}
            <div className="flex gap-4 justify-center">
              <button onClick={() => startMode('rush')} className="btn-primary">
                Play Again
              </button>
              <button onClick={() => { setMode('menu'); setCurrentPuzzle(null); }} className="btn-ghost">
                Back to Menu
              </button>
            </div>
          </div>
        )}

        {/* Streak Over Screen */}
        {mode === 'streak' && !streakActive && streakCount > 0 && (
          <div className="card p-8 text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h2 className="text-2xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
              Streak Ended!
            </h2>
            <div className="text-4xl font-display font-bold mb-4" style={{ color: '#ec4899' }}>
              {streakCount} in a row
            </div>
            <p className="mb-2" style={{ color: 'var(--text-tertiary)' }}>
              Reached difficulty level {streakDifficulty}
            </p>
            {streakCount >= stats.bestStreak && (
              <p className="text-lg mb-4" style={{ color: '#f59e0b' }}>🎉 New Best Streak!</p>
            )}
            <div className="flex gap-4 justify-center mt-6">
              <button onClick={() => startMode('streak')} className="btn-primary">
                Try Again
              </button>
              <button onClick={() => { setMode('menu'); setCurrentPuzzle(null); setStreakCount(0); }} className="btn-ghost">
                Back to Menu
              </button>
            </div>
          </div>
        )}

        {/* Main Puzzle Area */}
        {!isRushOver && (
          <div className="flex flex-col lg:grid lg:grid-cols-[minmax(280px,520px)_1fr] gap-4 lg:gap-8 items-start">
            {/* Board */}
            <div className="space-y-4 w-full flex flex-col items-center lg:items-start overflow-hidden px-2 sm:px-0">
              <div className="relative w-full max-w-full" style={{ maxWidth: `min(${boardSize}px, calc(100vw - 2rem))` }}>
                <Chessboard
                  position={game.fen()}
                  onSquareClick={isAnimatingSetup ? undefined : onSquareClick}
                  onPieceDrop={isAnimatingSetup ? () => false : onDrop}
                  boardOrientation={boardOrientation}
                  customSquareStyles={customSquareStyles}
                  customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                  customLightSquareStyle={boardStyles.customLightSquareStyle}
                  animationDuration={boardStyles.animationDuration}
                  arePiecesDraggable={!isAnimatingSetup && feedback !== 'complete' && !(feedback === 'incorrect' && mode === 'streak')}
                  boardWidth={boardSize}
                />

                {/* Feedback Overlay - simplified since we have the Genius Panel */}
                {feedback === 'complete' && !showGeniusPanel && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ background: 'rgba(0,0,0,0.75)' }}>
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🎉</div>
                      <h3 className="text-2xl font-display mb-2" style={{ color: '#4ade80' }}>Excellent!</h3>
                      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                        +{10 + getPuzzleDifficulty(currentPuzzle) * 5} points
                      </p>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => setShowGeniusPanel(true)} 
                          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold"
                        >
                          🧠 See AI Analysis
                        </button>
                        <button onClick={nextPuzzle} className="btn-ghost text-sm">
                          Skip to Next →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Only show blocking overlay for streak mode where game ends */}
                {feedback === 'incorrect' && mode === 'streak' && !streakActive && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ background: 'rgba(0,0,0,0.75)' }}>
                    <div className="text-center p-8">
                      <div className="text-5xl mb-4">⚡</div>
                      <h3 className="text-xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>Streak Ended</h3>
                      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                        You reached <span className="font-bold" style={{ color: '#ec4899' }}>{streakCount}</span> in a row!
                      </p>
                      <div className="flex gap-3 justify-center">
                        <button onClick={() => startMode('streak')} className="btn-primary">
                          Try Again
                        </button>
                        <button onClick={() => { setMode('menu'); setCurrentPuzzle(null); setStreakCount(0); }} className="btn-ghost">
                          Back to Menu
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Subtle feedback message - gentle and encouraging */}
              {showIncorrectFeedback && (
                <div className="text-center py-2 text-sm animate-fade-in" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ opacity: 0.8 }}>Not quite — have another go</span>
                </div>
              )}
              
              {/* Setup animation indicator */}
              {isAnimatingSetup && (
                <div className="text-center py-2 text-sm animate-pulse" style={{ color: 'var(--text-muted)' }}>
                  Opponent plays...
                </div>
              )}
              
              {/* Controls */}
              <div className="flex gap-3">
                {hintLevel < 2 ? (
                  <button
                    onClick={handleHint}
                    disabled={feedback === 'complete'}
                    className="btn-secondary flex-1"
                  >
                    💡 {hintLevel === 0 ? 'Hint' : 'More Hint'}
                  </button>
                ) : (
                  <button
                    onClick={showCorrectMove}
                    disabled={feedback === 'complete'}
                    className="flex-1 py-2 px-4 rounded-lg font-medium transition-all hover:scale-[1.02]"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.3), rgba(34, 197, 94, 0.2))',
                      border: '1px solid rgba(74, 222, 128, 0.5)',
                      color: '#4ade80',
                    }}
                  >
                    ▶️ Show Move
                  </button>
                )}
                <button 
                  onClick={() => startPuzzle(currentPuzzle)} 
                  className="btn-ghost flex-1"
                >
                  🔄 Reset
                </button>
              </div>
              
              {/* Move Hint Style Selector */}
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Move hints</span>
                <div className="flex gap-1">
                  {(Object.entries(MOVE_HINT_STYLES) as [MoveHintStyle, typeof MOVE_HINT_STYLES[MoveHintStyle]][]).map(([key, style]) => (
                    <button
                      key={key}
                      onClick={() => setMoveHintStyle(key)}
                      className={`px-3 py-1 text-xs rounded transition-all ${boardSettings.moveHintStyle === key ? 'bg-white/20' : 'hover:bg-white/10'}`}
                      style={{ color: boardSettings.moveHintStyle === key ? 'var(--text-primary)' : 'var(--text-muted)' }}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Panel - Condensed on mobile */}
            <div className="space-y-3 lg:space-y-4">
              {/* Puzzle Info - Compact on mobile */}
              <div className="card p-4 lg:p-6">
                <div className="flex items-center justify-between mb-2 lg:mb-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base lg:text-xl font-display truncate" style={{ color: 'var(--text-primary)' }}>
                      {getPuzzleTitle(currentPuzzle)}
                    </h2>
                    <p className="text-xs lg:text-sm" style={{ color: 'var(--text-muted)' }}>
                      {game.turn() === 'w' ? '⬜ White' : '⬛ Black'} to move
                    </p>
                  </div>
                  <span className="text-xs ml-2 shrink-0" style={{ color: 'var(--accent-gold)' }}>
                    {'★'.repeat(getPuzzleDifficulty(currentPuzzle))}{'☆'.repeat(5 - getPuzzleDifficulty(currentPuzzle))}
                  </span>
                </div>

                {/* Themes - horizontal scroll on mobile */}
                <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-3 lg:mb-4">
                  {getThemes(currentPuzzle).map(theme => (
                    <span 
                      key={theme}
                      className="badge text-xs"
                    >
                      {getThemeLabel(theme)}
                    </span>
                  ))}
                </div>

                {/* Hint - Progressive hints */}
                {hintLevel >= 1 && (
                  <div className="p-2 lg:p-3 rounded-lg space-y-2" style={{ background: 'var(--bg-elevated)' }}>
                    {hintLevel === 1 && (
                      <p className="text-xs lg:text-sm" style={{ color: '#fbbf24' }}>
                        💡 <span className="font-medium">The highlighted piece should move.</span>
                        {getPuzzleExplanation(currentPuzzle) && (
                          <span className="block mt-1 opacity-80 line-clamp-2">
                            {getPuzzleExplanation(currentPuzzle)!.split('.')[0]}
                          </span>
                        )}
                      </p>
                    )}
                    {hintLevel >= 2 && (
                      <p className="text-xs lg:text-sm" style={{ color: '#4ade80' }}>
                        ✨ <span className="font-medium">Move to the highlighted square.</span>
                        {getPuzzleExplanation(currentPuzzle) && (
                          <span className="block mt-1 opacity-80 line-clamp-3">
                            {getPuzzleExplanation(currentPuzzle)}
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Rating & Streak - Combined row on mobile */}
              <div className="flex gap-3 lg:flex-col">
                {/* Rating Info (Rated Mode) - Chess.com style */}
                {mode === 'rated' && (
                  <div className="card p-3 lg:p-6 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs lg:text-sm" style={{ color: 'var(--text-muted)' }}>Rating</div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg lg:text-2xl font-display font-bold" style={{ color: tierConfig.color }}>
                            {stats.rating}
                          </span>
                          {/* Chess.com style rating change display */}
                          {lastRatingChange !== null && lastRatingChange !== 0 && (
                            <span 
                              className="text-sm lg:text-base font-bold animate-fade-in"
                              style={{ 
                                color: lastRatingChange > 0 ? '#4ade80' : '#ef4444',
                              }}
                            >
                              ({lastRatingChange > 0 ? '+' : ''}{lastRatingChange})
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right hidden lg:block">
                        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Puzzle</div>
                        <div className="text-2xl font-display font-bold" style={{ color: 'var(--text-secondary)' }}>
                          {getPuzzleRating(currentPuzzle)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Streak */}
                <div className="card p-3 lg:p-4 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs lg:text-sm" style={{ color: 'var(--text-muted)' }}>Streak</span>
                    <span className="text-base lg:text-lg font-mono font-bold" style={{ color: stats.currentStreak > 0 ? '#f59e0b' : 'var(--text-tertiary)' }}>
                      🔥 {stats.currentStreak}
                    </span>
                  </div>
                </div>
              </div>

              {/* Back Button - Hidden on mobile (use breadcrumb instead) */}
              <button
                onClick={() => { setMode('menu'); setCurrentPuzzle(null); setRushActive(false); }}
                className="w-full btn-ghost hidden lg:block"
              >
                ← Back to Menu
              </button>
            </div>
          </div>
        )}

        {/* AI Genius Panel */}
        <AnimatePresence>
          {showGeniusPanel && currentPuzzle && (
            <PuzzleGeniusPanel
              fen={currentPuzzle.fen}
              solution={getSolutionMoves(currentPuzzle)}
              themes={getThemes(currentPuzzle)}
              userSolved={feedback === 'complete'}
              timeTaken={puzzleSolveTime}
              puzzleDifficulty={getPuzzleDifficulty(currentPuzzle)}
              onClose={() => setShowGeniusPanel(false)}
              onNextPuzzle={() => {
                setShowGeniusPanel(false);
                nextPuzzle();
              }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
}

export default PuzzlesPage;

