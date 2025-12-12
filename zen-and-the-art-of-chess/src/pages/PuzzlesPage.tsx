import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { AnimatePresence } from 'framer-motion';
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
  getNextPuzzleAnonymous,
  getDailyPuzzle,
  getPuzzlesByTheme,
  type PuzzleWithMeta,
} from '@/lib/puzzleService';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { MoveHintStyle } from '@/lib/constants';
import type { PatternType } from '@/lib/types';

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
// LEVEL SYSTEM - Chess.com style progress
// ============================================

// XP needed per level (increases each level)
const getXpForLevel = (level: number): number => {
  // Level 1-5: 50 XP each, Level 6-10: 75 XP each, etc.
  if (level <= 5) return 50;
  if (level <= 10) return 75;
  if (level <= 20) return 100;
  if (level <= 30) return 150;
  return 200;
};

// Calculate total XP needed to reach a level
const getTotalXpForLevel = (level: number): number => {
  let total = 0;
  for (let i = 1; i < level; i++) {
    total += getXpForLevel(i);
  }
  return total;
};

// Calculate level from total XP
const getLevelFromXp = (totalXp: number): { level: number; currentXp: number; xpForNextLevel: number } => {
  let level = 1;
  let remainingXp = totalXp;
  
  while (remainingXp >= getXpForLevel(level)) {
    remainingXp -= getXpForLevel(level);
    level++;
  }
  
  return {
    level,
    currentXp: remainingXp,
    xpForNextLevel: getXpForLevel(level),
  };
};

// XP reward for solving a puzzle
const getXpReward = (puzzleRating: number, userRating: number, solved: boolean): number => {
  if (!solved) return 0;
  const ratingDiff = puzzleRating - userRating;
  // Base 10 XP, bonus for harder puzzles
  if (ratingDiff > 200) return 20;
  if (ratingDiff > 100) return 15;
  if (ratingDiff > 0) return 12;
  return 10;
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

// Get puzzle rating (Lichess puzzles always have rating)
function getPuzzleRating(puzzle: PuzzleWithMeta): number {
  return puzzle.rating;
}

// Get solution moves as array (Lichess puzzles use UCI format)
function getSolutionMoves(puzzle: PuzzleWithMeta): string[] {
  return puzzle.solutionMoves;
}

// Get themes
function getThemes(puzzle: PuzzleWithMeta): string[] {
  return puzzle.themes || [];
}

// Get puzzle title from themes
function getPuzzleTitle(puzzle: PuzzleWithMeta): string {
  const themes = getThemes(puzzle);
  if (themes.length > 0) {
    return getThemeLabel(themes[0]);
  }
  return 'Find the Best Move';
}

// Get difficulty (1-5 scale) from rating
function getPuzzleDifficulty(puzzle: PuzzleWithMeta): number {
  const rating = puzzle.rating;
  if (rating < 1000) return 1;
  if (rating < 1300) return 2;
  if (rating < 1600) return 3;
  if (rating < 1900) return 4;
  return 5;
}

// Get puzzle explanation from themes (Lichess puzzles don't have built-in explanations)
function getPuzzleExplanation(puzzle: PuzzleWithMeta): string | null {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/36a72d14-14e6-4dc3-8f08-e0b574ec4f5a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'PuzzlesPage.tsx:getPuzzleExplanation',message:'getPuzzleExplanation called',data:{puzzleId:puzzle?.id,themes:puzzle?.themes},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  const themes = puzzle.themes || [];
  if (themes.length === 0) return null;
  
  // Generate a helpful explanation based on themes
  const themeExplanations: Record<string, string> = {
    'fork': 'Look for a piece that can attack two enemy pieces simultaneously.',
    'pin': 'Find a way to pin an enemy piece to a more valuable piece behind it.',
    'skewer': 'Attack a valuable piece that must move, exposing a piece behind it.',
    'discovery': 'Move a piece to reveal an attack from another piece behind it.',
    'deflection': 'Force an enemy piece away from a key defensive square.',
    'decoy': 'Lure an enemy piece to a vulnerable square.',
    'sacrifice': 'Give up material to gain a decisive advantage.',
    'back_rank': 'Exploit the weakness of the back rank.',
    'mate_in_1': 'Deliver checkmate in one move.',
    'mate_in_2': 'Find the forcing sequence to checkmate in two moves.',
    'mate_in_3': 'Calculate the three-move checkmate.',
    'quiet_move': 'Sometimes the best move is a subtle one that improves your position.',
    'zwischenzug': 'Insert an intermediate move before the expected continuation.',
    'promotion': 'Push your pawn to promotion.',
    'exposed_king': 'Take advantage of the poorly protected enemy king.',
    'double_check': 'Deliver check with two pieces simultaneously.',
  };
  
  for (const theme of themes) {
    const lowerTheme = theme.toLowerCase().replace(/-/g, '_');
    if (themeExplanations[lowerTheme]) {
      return themeExplanations[lowerTheme];
    }
  }
  
  return null;
}

// Convert UCI move (e.g., "e2e4") to from/to squares
function parseUciMove(uci: string): { from: string; to: string; promotion?: string } | null {
  if (uci.length < 4) return null;
  return {
    from: uci.slice(0, 2),
    to: uci.slice(2, 4),
    promotion: uci.length > 4 ? uci[4] : undefined,
  };
}

// Check if a move matches the expected UCI move
function moveMatchesUci(move: { from: string; to: string; promotion?: string }, uci: string): boolean {
  const expected = parseUciMove(uci);
  if (!expected) return false;
  if (move.from !== expected.from || move.to !== expected.to) return false;
  // Check promotion if present
  if (expected.promotion && move.promotion !== expected.promotion) return false;
  return true;
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
  
  // Puzzle State - uses Lichess puzzles only
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleWithMeta | null>(null);
  
  // Loading state for async puzzle fetching
  const [isLoadingPuzzle, setIsLoadingPuzzle] = useState(false);
  const [puzzleError, setPuzzleError] = useState<string | null>(null);
  
  // Puzzle count from Supabase
  const [puzzleCount, setPuzzleCount] = useState<number>(50000);
  
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
  
  // AI Analysis toggle - stored in localStorage for persistence
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(() => {
    const stored = localStorage.getItem('puzzle_ai_analysis_enabled');
    return stored !== 'false'; // Default to true
  });
  
  // Save AI analysis preference when it changes
  useEffect(() => {
    localStorage.setItem('puzzle_ai_analysis_enabled', String(aiAnalysisEnabled));
  }, [aiAnalysisEnabled]);
  
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

  // Level/XP System
  const [totalXp, setTotalXp] = useState<number>(() => {
    const saved = localStorage.getItem('zenChessPuzzleXp');
    return saved ? parseInt(saved, 10) : 0;
  });
  
  // Save XP when it changes
  useEffect(() => {
    localStorage.setItem('zenChessPuzzleXp', String(totalXp));
  }, [totalXp]);
  
  // Calculate current level info
  const levelInfo = getLevelFromXp(totalXp);
  const progressPercent = (levelInfo.currentXp / levelInfo.xpForNextLevel) * 100;
  
  // Track if we just leveled up for animation
  const [justLeveledUp, setJustLeveledUp] = useState(false);
  const [xpGained, setXpGained] = useState<number | null>(null);
  
  // Puzzle solve timer for display
  const [solveTimer, setSolveTimer] = useState(0);
  const solveTimerInterval = useRef<ReturnType<typeof setInterval>>();
  
  // Start/stop timer based on puzzle state
  useEffect(() => {
    if (currentPuzzle && !feedback && !isAnimatingSetup) {
      setSolveTimer(0);
      solveTimerInterval.current = setInterval(() => {
        setSolveTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (solveTimerInterval.current) {
        clearInterval(solveTimerInterval.current);
      }
    }
    return () => {
      if (solveTimerInterval.current) {
        clearInterval(solveTimerInterval.current);
      }
    };
  }, [currentPuzzle, feedback, isAnimatingSetup]);

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

  // Fetch puzzle count on mount
  useEffect(() => {
    const fetchPuzzleCount = async () => {
      if (isSupabaseConfigured) {
        try {
          const { count } = await supabase
            .from('puzzles')
            .select('*', { count: 'exact', head: true });
          if (count) setPuzzleCount(count);
        } catch (e) {
          // Keep default count
        }
      }
    };
    fetchPuzzleCount();
  }, []);

  // Async puzzle fetching function - replaces old synchronous selection
  const fetchNextPuzzle = useCallback(async (
    targetRating: number = stats.rating,
    options: { theme?: string; ratingRange?: number } = {}
  ): Promise<PuzzleWithMeta | null> => {
    const excludeIds = Array.from(seenPuzzleIds.current);
    return getNextPuzzleAnonymous(targetRating, excludeIds, {
      theme: options.theme,
      ratingRange: options.ratingRange || 200,
    });
  }, [stats.rating]);

  // Track if we've already recorded a failure for this puzzle attempt
  const hasRecordedFailure = useRef(false);
  
  // Start a puzzle - with setup move animation
  // Lichess puzzles: FEN is BEFORE opponent's move, first solution move is opponent's setup
  const startPuzzle = useCallback((puzzle: PuzzleWithMeta) => {
    // Mark puzzle as seen to avoid repetition
    seenPuzzleIds.current.add(puzzle.id);
    
    // Clear last rating change for new puzzle
    setLastRatingChange(null);
    
    // Reset failure tracking for new puzzle
    hasRecordedFailure.current = false;
    
    setCurrentPuzzle(puzzle);
    setMoveFrom(null);
    setOptionSquares({});
    setFeedback(null);
    setShowHint(false);
    setHintLevel(0);
    setHintSquares({});
    
    // For Lichess puzzles:
    // - FEN is position BEFORE opponent's last move
    // - solutionMoves[0] is opponent's setup move
    // - Player solves starting from move 1
    const solutionMoves = puzzle.solutionMoves;
    
    if (solutionMoves.length > 0) {
      // Start from the FEN position
      const startGame = new Chess(puzzle.fen);
      setGame(startGame);
      setLastMove(null);
      setIsAnimatingSetup(true);
      
      // Play the opponent's setup move after a brief delay
      setTimeout(() => {
        const setupMove = solutionMoves[0];
        const parsed = parseUciMove(setupMove);
        
        if (parsed) {
          const afterSetupGame = new Chess(puzzle.fen);
          try {
            afterSetupGame.move({ 
              from: parsed.from, 
              to: parsed.to, 
              promotion: parsed.promotion as any 
            });
            setGame(afterSetupGame);
            // Highlight opponent's last move
            setLastMove({ 
              from: parsed.from as Square, 
              to: parsed.to as Square 
            });
          } catch (e) {
            // If move fails, just use FEN directly
            console.error('Setup move failed:', setupMove, e);
          }
        }
        
        // Player solves from move index 1 (after opponent's setup)
        setMoveIndex(1);
        setIsAnimatingSetup(false);
        
        // Track puzzle start for coach
        puzzleStartTime.current = Date.now();
        recordEvent('PUZZLE_START', { 
          themes: puzzle.themes, 
          difficulty: getPuzzleDifficulty(puzzle) 
        });
      }, 500);
    } else {
      // No solution moves - just show the FEN
      const newGame = new Chess(puzzle.fen);
      setGame(newGame);
      setLastMove(null);
      setMoveIndex(0);
      setIsAnimatingSetup(false);
      puzzleStartTime.current = Date.now();
    }
  }, [recordEvent]);

  // Start a mode - now async, fetches from Supabase
  const startMode = useCallback(async (newMode: PuzzleMode) => {
    setMode(newMode);
    setIsLoadingPuzzle(true);
    setPuzzleError(null);
    
    // Clear seen puzzles when starting a new mode (except for rush/streak continuation)
    if (newMode !== 'rush' && newMode !== 'streak') {
      seenPuzzleIds.current.clear();
    }
    
    try {
      let puzzle: PuzzleWithMeta | null = null;
      
      if (newMode === 'rated') {
        puzzle = await fetchNextPuzzle(stats.rating, { ratingRange: 200 });
      } else if (newMode === 'rush') {
        setRushTimer(180);
        setRushStrikes(0);
        setRushScore(0);
        setRushActive(true);
        seenPuzzleIds.current.clear();
        puzzle = await fetchNextPuzzle(stats.rating, { ratingRange: 200 });
      } else if (newMode === 'streak') {
        setStreakCount(0);
        setStreakDifficulty(1);
        setStreakActive(true);
        seenPuzzleIds.current.clear();
        // Start easy for streak mode
        puzzle = await fetchNextPuzzle(800, { ratingRange: 200 });
      } else if (newMode === 'daily') {
        puzzle = await getDailyPuzzle();
      } else if (newMode === 'custom') {
        if (selectedTheme) {
          const themePuzzles = await getPuzzlesByTheme(selectedTheme, 20, stats.rating);
          if (themePuzzles.length > 0) {
            const unseen = themePuzzles.filter(p => !seenPuzzleIds.current.has(p.id));
            puzzle = unseen.length > 0 
              ? unseen[Math.floor(Math.random() * unseen.length)]
              : themePuzzles[Math.floor(Math.random() * themePuzzles.length)];
          }
        }
        if (!puzzle) {
          const targetRating = selectedDifficulty 
            ? 600 + (selectedDifficulty * 300)
            : stats.rating;
          puzzle = await fetchNextPuzzle(targetRating, { 
            theme: selectedTheme || undefined,
            ratingRange: 250 
          });
        }
      }
      
      if (puzzle) {
        startPuzzle(puzzle);
      } else {
        setPuzzleError('Unable to load puzzle. Please check your connection.');
      }
    } catch (err) {
      console.error('Failed to start puzzle mode:', err);
      setPuzzleError('Failed to load puzzle. Please try again.');
    } finally {
      setIsLoadingPuzzle(false);
    }
  }, [fetchNextPuzzle, startPuzzle, stats.rating, selectedTheme, selectedDifficulty]);

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
    
    // Award XP
    const xpEarned = getXpReward(puzzleRating, stats.rating, true);
    const prevLevel = getLevelFromXp(totalXp).level;
    setTotalXp(prev => prev + xpEarned);
    setXpGained(xpEarned);
    
    // Check for level up
    const newLevel = getLevelFromXp(totalXp + xpEarned).level;
    if (newLevel > prevLevel) {
      setJustLeveledUp(true);
      setTimeout(() => setJustLeveledUp(false), 3000);
    }
    
    // Clear XP animation after delay
    setTimeout(() => setXpGained(null), 1500);
    
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
      setTimeout(async () => {
        const puzzle = await fetchNextPuzzle(stats.rating, { ratingRange: 200 });
        if (puzzle) startPuzzle(puzzle);
      }, 500);
    } else if (mode === 'streak') {
      const newStreakCount = streakCount + 1;
      setStreakCount(newStreakCount);
      // Increase difficulty every 3 puzzles - rating goes up by 100 each tier
      const streakRating = Math.min(800 + (newStreakCount * 50), 2500);
      setTimeout(async () => {
        const puzzle = await fetchNextPuzzle(streakRating, { ratingRange: 150 });
        if (puzzle) {
          startPuzzle(puzzle);
        }
        setFeedback(null);
      }, 800);
    } else {
      // Calculate solve time - show simple success overlay, user can optionally open AI analysis
      const solveTime = Math.round((Date.now() - puzzleStartTime.current) / 1000);
      setPuzzleSolveTime(solveTime);
      setFeedback('complete');
      // Don't auto-open Genius Panel - let user maintain flow
      // User can click "See AI Analysis" if they want deeper analysis
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
        setTimeout(async () => {
          const puzzle = await fetchNextPuzzle(stats.rating, { ratingRange: 200 });
          if (puzzle) startPuzzle(puzzle);
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
      
      // Check if move matches - Lichess uses UCI format (e2e4), also support SAN for legacy
      const playerMove = `${from}${to}${result.promotion || ''}`;
      const isCorrect = moveMatchesUci({ from, to, promotion: result.promotion }, expectedMove) ||
        result.san === expectedMove ||
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

  // Next puzzle - async, fetches from Supabase
  const nextPuzzle = useCallback(async () => {
    setIsLoadingPuzzle(true);
    try {
      let puzzle: PuzzleWithMeta | null = null;
      
      if (mode === 'rated') {
        puzzle = await fetchNextPuzzle(stats.rating, { ratingRange: 200 });
      } else if (mode === 'custom') {
        if (selectedTheme) {
          const themePuzzles = await getPuzzlesByTheme(selectedTheme, 20, stats.rating);
          if (themePuzzles.length > 0) {
            const unseen = themePuzzles.filter(p => !seenPuzzleIds.current.has(p.id));
            puzzle = unseen.length > 0 
              ? unseen[Math.floor(Math.random() * unseen.length)]
              : themePuzzles[Math.floor(Math.random() * themePuzzles.length)];
          }
        }
        if (!puzzle) {
          const targetRating = selectedDifficulty 
            ? 600 + (selectedDifficulty * 300)
            : stats.rating;
          puzzle = await fetchNextPuzzle(targetRating, { ratingRange: 250 });
        }
      }
      
      if (puzzle) {
        startPuzzle(puzzle);
      }
    } catch (err) {
      console.error('Failed to get next puzzle:', err);
    } finally {
      setIsLoadingPuzzle(false);
    }
  }, [mode, stats.rating, selectedTheme, selectedDifficulty, fetchNextPuzzle, startPuzzle]);

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

  // Board orientation based on player's color (opposite of whose turn in FEN)
  // Lichess FEN shows position BEFORE opponent's setup move
  // So if FEN has 'w', white moves first (opponent), then black solves (player)
  const boardOrientation = currentPuzzle 
    ? (currentPuzzle.fen.includes(' w ') ? 'black' : 'white')
    : 'white';
  
  // Player's color (who solves the puzzle)
  const playerColor = boardOrientation;

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
            {puzzleCount.toLocaleString()}+ puzzles to master
          </p>
        </section>

        {/* Agent Tip - hidden on mobile */}
        <div className="hidden sm:block">
          <ContextualAgentTip currentPage="/train" />
        </div>

        {/* Rating & Level Card */}
        <div className="card p-3 sm:p-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Level Badge - Chess.com style */}
              <div 
                className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold text-xl sm:text-2xl shrink-0"
                style={{ 
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                }}
              >
                <span className="text-white">{levelInfo.level}</span>
              </div>
              <div>
                <div className="text-[10px] sm:text-sm" style={{ color: 'var(--text-muted)' }}>Rating</div>
                <div className="text-xl sm:text-3xl font-display font-bold" style={{ color: tierConfig.color }}>
                  {stats.rating.toLocaleString()}
                </div>
                <div className="text-[10px] sm:text-sm" style={{ color: tierConfig.color }}>
                  {tierConfig.name} • Level {levelInfo.level}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="stat-value text-gradient text-lg sm:text-2xl">{stats.puzzlesSolved}</div>
              <div className="stat-label text-[10px] sm:text-xs">Solved</div>
            </div>
          </div>

          {/* XP Progress to next level - Chess.com style */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
              <span>Level {levelInfo.level}</span>
              <span>{levelInfo.currentXp}/{levelInfo.xpForNextLevel} XP</span>
            </div>
            <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(to right, #4ade80, #22c55e)'
                }}
              />
            </div>
            <div className="text-right text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {levelInfo.xpForNextLevel - levelInfo.currentXp} XP to Level {levelInfo.level + 1}
            </div>
          </div>

          {/* Progress to next tier */}
          {nextTierConfig && (
            <div className="pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>
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
            disabled={isLoadingPuzzle}
            className="btn-primary flex-1"
          >
            {isLoadingPuzzle ? 'Loading...' : 'Start Training'}
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: PUZZLE SOLVING VIEW - Chess.com Style Compact Layout
  // ============================================
  if (currentPuzzle) {
    const isRushOver = mode === 'rush' && (!rushActive || rushStrikes >= 3);
    const isStreakOver = mode === 'streak' && !streakActive && streakCount > 0;
    
    // Game over screens for Rush/Streak
    if (isRushOver || isStreakOver) {
      return (
        <div className="h-[calc(100vh-120px)] flex items-center justify-center animate-fade-in">
          <div className="card p-8 text-center max-w-md">
            <div className="text-5xl mb-4">{isRushOver ? '🏆' : '⚡'}</div>
            <h2 className="text-2xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
              {isRushOver ? (rushStrikes >= 3 ? 'Game Over!' : "Time's Up!") : 'Streak Ended!'}
            </h2>
            <div className="text-4xl font-display font-bold mb-4" style={{ color: isRushOver ? '#4ade80' : '#ec4899' }}>
              {isRushOver ? `${rushScore} Puzzles` : `${streakCount} in a row`}
            </div>
            {isRushOver && rushScore === stats.rushHighScore && rushScore > 0 && (
              <p className="text-lg mb-4" style={{ color: '#f59e0b' }}>🎉 New High Score!</p>
            )}
            {isStreakOver && streakCount >= stats.bestStreak && (
              <p className="text-lg mb-4" style={{ color: '#f59e0b' }}>🎉 New Best Streak!</p>
            )}
            <div className="flex gap-4 justify-center">
              <button onClick={() => isRushOver ? startMode('rush') : startMode('streak')} className="btn-primary">
                Play Again
              </button>
              <button onClick={() => { setMode('menu'); setCurrentPuzzle(null); setRushActive(false); setStreakCount(0); }} className="btn-ghost">
                Back
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="h-[calc(100dvh-80px)] sm:h-[calc(100vh-100px)] flex flex-col animate-fade-in overflow-hidden">
        {/* Compact Header - Chess.com style */}
        <div className="flex items-center justify-between px-2 py-2 shrink-0" style={{ background: 'var(--bg-card)' }}>
          <button
            onClick={() => { setMode('menu'); setCurrentPuzzle(null); setRushActive(false); }}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-lg">🧩</span>
            <span className="font-display font-medium" style={{ color: 'var(--text-primary)' }}>Puzzles</span>
          </div>
          
          <button
            onClick={() => setShowGeniusPanel(true)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        
        {/* Turn Indicator - Chess.com style banner */}
        <div 
          className="px-4 py-2 text-center shrink-0"
          style={{ 
            background: playerColor === 'white' 
              ? 'linear-gradient(to right, #f0f0f0, #e0e0e0)' 
              : 'linear-gradient(to right, #2d2d2d, #1a1a1a)',
            color: playerColor === 'white' ? '#1a1a1a' : '#f0f0f0'
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <div 
              className="w-4 h-4 rounded-sm border"
              style={{ 
                background: game.turn() === 'w' ? '#fff' : '#000',
                borderColor: game.turn() === 'w' ? '#ccc' : '#444'
              }}
            />
            <span className="font-medium text-sm">
              {game.turn() === 'w' ? 'White' : 'Black'} to Move
            </span>
          </div>
        </div>
        
        {/* Board Area - takes remaining space */}
        <div className="flex-1 flex items-center justify-center px-2 py-2 overflow-hidden min-h-0">
          <div className="relative w-full h-full flex items-center justify-center">
            <div 
              className="relative"
              style={{ 
                width: `min(100%, ${Math.min(boardSize, 500)}px)`,
                maxHeight: '100%',
                aspectRatio: '1'
              }}
            >
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
              />

              {/* Feedback Overlay - simplified */}
              {feedback === 'complete' && !showGeniusPanel && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ background: 'rgba(0,0,0,0.8)' }}>
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2">✓</div>
                    <h3 className="text-xl font-display mb-1" style={{ color: '#4ade80' }}>Correct!</h3>
                    {xpGained && (
                      <p className="text-sm mb-3 animate-fade-in" style={{ color: '#fbbf24' }}>+{xpGained} XP</p>
                    )}
                    <button onClick={nextPuzzle} className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold">
                      Next →
                    </button>
                  </div>
                </div>
              )}
              
              {/* Setup animation indicator */}
              {isAnimatingSetup && (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
                  <div className="px-4 py-2 rounded-lg" style={{ background: 'var(--bg-card)' }}>
                    <span className="text-sm animate-pulse" style={{ color: 'var(--text-secondary)' }}>Opponent plays...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom Stats Bar - Mode-specific */}
        <div className="px-4 py-3 shrink-0" style={{ background: 'var(--bg-card)' }}>
          {/* Rush Mode Stats */}
          {mode === 'rush' && rushActive && (
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold" style={{ color: rushTimer < 30 ? '#ef4444' : 'var(--text-primary)' }}>
                    {Math.floor(rushTimer / 60)}:{(rushTimer % 60).toString().padStart(2, '0')}
                  </div>
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
              <div className="text-center">
                <div className="text-3xl font-mono font-bold" style={{ color: '#4ade80' }}>
                  {rushScore}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Score</div>
              </div>
            </div>
          )}
          
          {/* Streak Mode Stats */}
          {mode === 'streak' && streakActive && (
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-mono font-bold" style={{ color: '#ec4899' }}>
                  ⚡ {streakCount}
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(d => (
                    <div
                      key={d}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: d <= streakDifficulty ? '#ec4899' : 'var(--bg-hover)' }}
                    />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm" style={{ color: '#f59e0b' }}>Best: {stats.bestStreak}</span>
              </div>
            </div>
          )}
          
          {/* Standard Mode Stats (Rated/Daily/Custom) */}
          {mode !== 'rush' && mode !== 'streak' && (
            <>
              <div className="flex items-center justify-between mb-2">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                    {stats.rating.toLocaleString()}
                  </span>
                  {lastRatingChange !== null && lastRatingChange !== 0 && (
                    <span 
                      className="text-sm font-bold animate-fade-in"
                      style={{ color: lastRatingChange > 0 ? '#4ade80' : '#ef4444' }}
                    >
                      {lastRatingChange > 0 ? '+' : ''}{lastRatingChange}
                    </span>
                  )}
                </div>
                
                {/* Timer */}
                <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-mono text-sm">
                    {Math.floor(solveTimer / 60)}:{(solveTimer % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                
                {/* Level Badge */}
                <div className="flex items-center gap-2">
                  <div 
                    className="relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
                    style={{ 
                      background: justLeveledUp 
                        ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' 
                        : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      boxShadow: justLeveledUp ? '0 0 20px rgba(251, 191, 36, 0.5)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span className="text-white">{levelInfo.level}</span>
                    {justLeveledUp && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-xs animate-bounce">
                        ↑
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* XP Progress Bar - Chess.com style */}
              <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                <div 
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${progressPercent}%`,
                    background: 'linear-gradient(to right, #4ade80, #22c55e)'
                  }}
                />
                {xpGained && (
                  <div 
                    className="absolute top-0 h-full rounded-full animate-pulse"
                    style={{ 
                      width: `${(xpGained / levelInfo.xpForNextLevel) * 100}%`,
                      left: `${Math.max(0, progressPercent - (xpGained / levelInfo.xpForNextLevel) * 100)}%`,
                      background: 'rgba(251, 191, 36, 0.5)'
                    }}
                  />
                )}
              </div>
              
              {/* XP Text */}
              <div className="flex justify-between mt-1">
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {levelInfo.currentXp}/{levelInfo.xpForNextLevel} XP
                </span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Level {levelInfo.level + 1}
                </span>
              </div>
            </>
          )}
        </div>
        
        {/* Control Buttons - Compact row at bottom */}
        <div className="flex items-center justify-around py-3 border-t shrink-0" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-primary)' }}>
          {/* Hint Button */}
          <button
            onClick={handleHint}
            disabled={feedback === 'complete'}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
            style={{ color: hintLevel > 0 ? '#fbbf24' : 'var(--text-secondary)' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="text-xs">Hint</span>
          </button>
          
          {/* Back/Reset Button */}
          <button
            onClick={() => startPuzzle(currentPuzzle)}
            disabled={feedback === 'complete'}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors disabled:opacity-50"
            style={{ color: 'var(--text-secondary)' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs">Back</span>
          </button>
          
          {/* Forward/Next Button */}
          <button
            onClick={feedback === 'complete' ? nextPuzzle : showCorrectMove}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: feedback === 'complete' ? '#4ade80' : 'var(--text-secondary)' }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-xs">{feedback === 'complete' ? 'Next' : 'Forward'}</span>
          </button>
        </div>
        
        {/* Subtle incorrect feedback toast */}
        {showIncorrectFeedback && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg animate-fade-in" style={{ background: 'rgba(239, 68, 68, 0.9)' }}>
            <span className="text-sm text-white">Not quite — try again</span>
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
        
        {/* Level Up Celebration */}
        {justLeveledUp && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="text-center animate-bounce">
              <div className="text-6xl mb-2">🎉</div>
              <div className="text-2xl font-display font-bold" style={{ color: '#fbbf24' }}>
                Level {levelInfo.level}!
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default PuzzlesPage;

