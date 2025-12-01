import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { puzzles } from '@/data/puzzles';
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

function calculateRatingChange(userRating: number, puzzleRating: number, solved: boolean): number {
  const expected = 1 / (1 + Math.pow(10, (puzzleRating - userRating) / 400));
  const k = 32; // K-factor
  const actual = solved ? 1 : 0;
  return Math.round(k * (actual - expected));
}

function getPuzzleRating(puzzle: ChessPuzzle): number {
  // Estimate puzzle rating based on difficulty
  return 600 + (puzzle.difficulty - 1) * 350;
}

function getDailyPuzzle(): ChessPuzzle {
  const today = new Date().toISOString().split('T')[0];
  const seed = today.split('-').reduce((acc, n) => acc + parseInt(n), 0);
  const index = seed % puzzles.length;
  return puzzles[index];
}

// ============================================
// MAIN COMPONENT
// ============================================

export function PuzzlesPage() {
  // Navigation State
  const [mode, setMode] = useState<PuzzleMode>('menu');
  
  // Puzzle State
  const [currentPuzzle, setCurrentPuzzle] = useState<ChessPuzzle | null>(null);
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [moveIndex, setMoveIndex] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'complete' | null>(null);
  const [showHint, setShowHint] = useState(false);
  
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
  
  // Stats State (persisted)
  const [stats, setStats] = useState<PuzzleStats>(() => {
    const saved = localStorage.getItem('zenChessPuzzleStats');
    return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
  });

  // Save stats
  useEffect(() => {
    localStorage.setItem('zenChessPuzzleStats', JSON.stringify(stats));
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
    return puzzles.filter(p => {
      if (selectedTheme && !p.themes.includes(selectedTheme)) return false;
      if (selectedDifficulty && p.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedTheme, selectedDifficulty]);

  // Select puzzle based on rating (for rated mode)
  const selectRatedPuzzle = useCallback(() => {
    const targetRating = stats.rating;
    const range = 200;
    const eligible = puzzles.filter(p => {
      const pr = getPuzzleRating(p);
      return pr >= targetRating - range && pr <= targetRating + range;
    });
    const puzzle = eligible.length > 0 
      ? eligible[Math.floor(Math.random() * eligible.length)]
      : puzzles[Math.floor(Math.random() * puzzles.length)];
    return puzzle;
  }, [stats.rating]);

  // Start a puzzle
  const startPuzzle = useCallback((puzzle: ChessPuzzle) => {
    setCurrentPuzzle(puzzle);
    const newGame = new Chess(puzzle.fen);
    setGame(newGame);
    setMoveIndex(0);
    setMoveFrom(null);
    setOptionSquares({});
    setLastMove(null);
    setFeedback(null);
    setShowHint(false);
  }, []);

  // Start a mode
  const startMode = useCallback((newMode: PuzzleMode) => {
    setMode(newMode);
    
    if (newMode === 'rated') {
      startPuzzle(selectRatedPuzzle());
    } else if (newMode === 'rush') {
      setRushTimer(180);
      setRushStrikes(0);
      setRushScore(0);
      setRushActive(true);
      startPuzzle(puzzles[Math.floor(Math.random() * puzzles.length)]);
    } else if (newMode === 'streak') {
      setStreakCount(0);
      setStreakDifficulty(1);
      setStreakActive(true);
      // Start with easy puzzles
      const easyPuzzles = puzzles.filter(p => p.difficulty === 1);
      startPuzzle(easyPuzzles[Math.floor(Math.random() * easyPuzzles.length)] || puzzles[0]);
    } else if (newMode === 'daily') {
      startPuzzle(getDailyPuzzle());
    } else if (newMode === 'custom') {
      if (filteredPuzzles.length > 0) {
        startPuzzle(filteredPuzzles[Math.floor(Math.random() * filteredPuzzles.length)]);
      }
    }
  }, [selectRatedPuzzle, startPuzzle, filteredPuzzles]);

  // Handle puzzle completion
  const handlePuzzleSolved = useCallback(() => {
    if (!currentPuzzle) return;
    
    const puzzleRating = getPuzzleRating(currentPuzzle);
    const ratingChange = calculateRatingChange(stats.rating, puzzleRating, true);
    const points = 10 + currentPuzzle.difficulty * 5 + (mode === 'rush' ? 5 : 0);
    
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
          ...currentPuzzle.themes.reduce((acc, theme) => ({
            ...acc,
            [theme]: {
              solved: (prev.themeStats[theme]?.solved || 0) + 1,
              failed: prev.themeStats[theme]?.failed || 0,
            }
          }), {}),
        },
        ...(mode === 'daily' ? { dailyPuzzleDate: new Date().toISOString().split('T')[0], dailyPuzzleSolved: true } : {}),
      };
    });

    if (mode === 'rush') {
      setRushScore(prev => prev + 1);
      setTimeout(() => {
        startPuzzle(puzzles[Math.floor(Math.random() * puzzles.length)]);
      }, 500);
    } else if (mode === 'streak') {
      setStreakCount(prev => prev + 1);
      // Increase difficulty every 3 puzzles
      const newDifficulty = Math.min(5, Math.floor((streakCount + 1) / 3) + 1);
      setStreakDifficulty(newDifficulty);
      setTimeout(() => {
        const difficultyPuzzles = puzzles.filter(p => p.difficulty === newDifficulty);
        const nextPuzzle = difficultyPuzzles.length > 0 
          ? difficultyPuzzles[Math.floor(Math.random() * difficultyPuzzles.length)]
          : puzzles[Math.floor(Math.random() * puzzles.length)];
        startPuzzle(nextPuzzle);
        setFeedback(null);
      }, 800);
    } else {
      setFeedback('complete');
    }
  }, [currentPuzzle, stats.rating, mode, startPuzzle]);

  // Handle puzzle failure
  const handlePuzzleFailed = useCallback(() => {
    if (!currentPuzzle) return;
    
    const puzzleRating = getPuzzleRating(currentPuzzle);
    const ratingChange = calculateRatingChange(stats.rating, puzzleRating, false);
    
    setStats(prev => ({
      ...prev,
      rating: Math.max(100, prev.rating + ratingChange),
      puzzlesFailed: prev.puzzlesFailed + 1,
      currentStreak: 0,
      tier: getTierFromRating(Math.max(100, prev.rating + ratingChange)),
      themeStats: {
        ...prev.themeStats,
        ...currentPuzzle.themes.reduce((acc, theme) => ({
          ...acc,
          [theme]: {
            solved: prev.themeStats[theme]?.solved || 0,
            failed: (prev.themeStats[theme]?.failed || 0) + 1,
          }
        }), {}),
      },
    }));

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
          startPuzzle(puzzles[Math.floor(Math.random() * puzzles.length)]);
        }, 1000);
      }
    } else if (mode === 'streak') {
      // Streak ends on first mistake
      setStreakActive(false);
      setStats(s => ({
        ...s,
        bestStreak: Math.max(s.bestStreak, streakCount),
      }));
      setFeedback('incorrect');
    } else {
      setFeedback('incorrect');
    }
  }, [currentPuzzle, stats.rating, mode, rushScore, rushStrikes, startPuzzle]);

  // Get move options
  const getMoveOptions = useCallback((square: Square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: Record<string, { backgroundColor: string }> = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        backgroundColor: game.get(move.to as Square) 
          ? 'rgba(239, 68, 68, 0.4)' 
          : 'rgba(129, 182, 76, 0.3)',
      };
    });
    newSquares[square] = { backgroundColor: 'rgba(129, 182, 76, 0.4)' };
    setOptionSquares(newSquares);
    return true;
  }, [game]);

  // Handle move
  const handleMove = useCallback((from: Square, to: Square) => {
    if (!currentPuzzle || feedback === 'complete') return false;

    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move({ from, to, promotion: 'q' });
      if (!result) return false;

      const expectedMove = currentPuzzle.solution[moveIndex];
      const isCorrect = result.san === expectedMove || 
        `${from}${to}` === expectedMove ||
        result.san.replace(/[+#]/g, '') === expectedMove?.replace(/[+#]/g, '');

      if (isCorrect) {
        setGame(gameCopy);
        setLastMove({ from, to });
        setFeedback('correct');
        
        // Check if puzzle complete
        if (moveIndex + 1 >= currentPuzzle.solution.length) {
          handlePuzzleSolved();
        } else {
          // Play opponent's response
          setTimeout(() => {
            const opponentMove = currentPuzzle.solution[moveIndex + 1];
            if (opponentMove) {
              const responseGame = new Chess(gameCopy.fen());
              const response = responseGame.move(opponentMove);
              if (response) {
                setGame(responseGame);
                setLastMove({ from: response.from as Square, to: response.to as Square });
                setMoveIndex(moveIndex + 2);
                setFeedback(null);
              }
            }
          }, 500);
        }
        return true;
      } else {
        setFeedback('incorrect');
        handlePuzzleFailed();
        return false;
      }
    } catch {
      return false;
    }
  }, [currentPuzzle, game, moveIndex, feedback, handlePuzzleSolved, handlePuzzleFailed]);

  // Square click handler
  const onSquareClick = useCallback((square: Square) => {
    if (feedback === 'complete' || feedback === 'incorrect') return;

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
  }, [game, moveFrom, feedback, getMoveOptions, handleMove]);

  // Drag and drop
  const onDrop = useCallback((sourceSquare: Square, targetSquare: Square) => {
    if (feedback === 'complete' || feedback === 'incorrect') return false;
    return handleMove(sourceSquare, targetSquare);
  }, [feedback, handleMove]);

  // Next puzzle
  const nextPuzzle = useCallback(() => {
    if (mode === 'rated') {
      startPuzzle(selectRatedPuzzle());
    } else if (mode === 'custom' && filteredPuzzles.length > 0) {
      startPuzzle(filteredPuzzles[Math.floor(Math.random() * filteredPuzzles.length)]);
    }
  }, [mode, selectRatedPuzzle, filteredPuzzles, startPuzzle]);

  // Custom square styles
  const customSquareStyles = useMemo(() => ({
    ...optionSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(155, 199, 0, 0.25)' },
      [lastMove.to]: { backgroundColor: 'rgba(155, 199, 0, 0.4)' },
    }),
    ...(feedback === 'correct' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(34, 197, 94, 0.5)' },
    }),
    ...(feedback === 'incorrect' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(239, 68, 68, 0.5)' },
    }),
  }), [optionSquares, lastMove, feedback]);

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
      <div className="space-y-8 animate-fade-in">
        {/* Hero Header */}
        <section className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Puzzle Training
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Sharpen your tactical vision with {puzzles.length}+ puzzles
          </p>
        </section>

        {/* Rating & Tier Card */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                style={{ background: `${tierConfig.color}22` }}
              >
                {tierConfig.icon}
              </div>
              <div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Current Rating</div>
                <div className="text-3xl font-display font-bold" style={{ color: tierConfig.color }}>
                  {stats.rating}
                </div>
                <div className="text-sm" style={{ color: tierConfig.color }}>
                  {tierConfig.name} Tier
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="stat-value text-gradient">{stats.puzzlesSolved}</div>
              <div className="stat-label">Puzzles Solved</div>
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
        <div className="grid grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#4ade80' }}>{accuracy}%</div>
            <div className="stat-label">Accuracy</div>
          </div>
          <div className="stat-card">
            <div className="stat-value text-gradient">{stats.currentStreak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#f59e0b' }}>{stats.bestStreak}</div>
            <div className="stat-label">Best Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#ec4899' }}>{stats.rushHighScore}</div>
            <div className="stat-label">Rush High Score</div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Rated Puzzles */}
          <button
            onClick={() => startMode('rated')}
            className="card-interactive p-6 text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(74, 222, 128, 0.1)' }}
              >
                ♟️
              </div>
              <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#4ade80' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
              Rated Puzzles
            </h3>
            <p className="text-sm font-display italic mb-2" style={{ color: '#4ade80' }}>
              Unlimited adaptive training
            </p>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Puzzles adapt to your skill level. Improve your rating and climb tiers!
            </p>
          </button>

          {/* Puzzle Rush */}
          <button
            onClick={() => startMode('rush')}
            className="card-interactive p-6 text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(249, 115, 22, 0.1)' }}
              >
                🔥
              </div>
              <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#f97316' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
              Puzzle Rush
            </h3>
            <p className="text-sm font-display italic mb-2" style={{ color: '#f97316' }}>
              3 minutes, 3 strikes
            </p>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Solve as many puzzles as you can before time runs out or you make 3 mistakes!
            </p>
          </button>

          {/* Puzzle Streak */}
          <button
            onClick={() => startMode('streak')}
            className="card-interactive p-6 text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(236, 72, 153, 0.1)' }}
              >
                ⚡
              </div>
              <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#ec4899' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
              Puzzle Streak
            </h3>
            <p className="text-sm font-display italic mb-2" style={{ color: '#ec4899' }}>
              Progressive difficulty
            </p>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Puzzles get harder as you solve them. One mistake ends the streak!
            </p>
          </button>

          {/* Daily Puzzle */}
          <button
            onClick={() => startMode('daily')}
            className="card-interactive p-6 text-left group"
            disabled={stats.dailyPuzzleSolved && stats.dailyPuzzleDate === new Date().toISOString().split('T')[0]}
          >
            <div className="flex items-start justify-between mb-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(99, 102, 241, 0.1)' }}
              >
                📅
              </div>
              {stats.dailyPuzzleSolved && stats.dailyPuzzleDate === new Date().toISOString().split('T')[0] ? (
                <span className="badge badge-green">✓ Completed</span>
              ) : (
                <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#6366f1' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
            <h3 className="text-xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
              Daily Puzzle
            </h3>
            <p className="text-sm font-display italic mb-2" style={{ color: '#6366f1' }}>
              One new puzzle each day
            </p>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              A fresh challenge every day. Keep your streak alive!
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
          <div className="grid lg:grid-cols-[minmax(400px,520px)_380px] gap-8 items-start">
            {/* Board */}
            <div className="space-y-4">
              <div className="chessboard-container relative max-w-[520px]">
                <Chessboard
                  position={game.fen()}
                  onSquareClick={onSquareClick}
                  onPieceDrop={onDrop}
                  boardOrientation={boardOrientation}
                  customSquareStyles={customSquareStyles}
                  customDarkSquareStyle={{ backgroundColor: '#779556' }}
                  customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
                  animationDuration={150}
                  arePiecesDraggable={feedback !== 'complete' && feedback !== 'incorrect'}
                  boardWidth={480}
                />

                {/* Feedback Overlay */}
                {feedback === 'complete' && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ background: 'rgba(0,0,0,0.75)' }}>
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🎉</div>
                      <h3 className="text-2xl font-display mb-2" style={{ color: '#4ade80' }}>Excellent!</h3>
                      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                        +{10 + currentPuzzle.difficulty * 5} points
                      </p>
                      <button onClick={nextPuzzle} className="btn-primary">
                        Next Puzzle →
                      </button>
                    </div>
                  </div>
                )}

                {feedback === 'incorrect' && mode !== 'rush' && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ background: 'rgba(0,0,0,0.75)' }}>
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">❌</div>
                      <h3 className="text-2xl font-display mb-2" style={{ color: '#ef4444' }}>Incorrect</h3>
                      <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                        The correct move was: <span className="font-mono" style={{ color: 'var(--accent-gold)' }}>{currentPuzzle.solution[moveIndex]}</span>
                      </p>
                      <div className="flex gap-3 justify-center">
                        <button onClick={() => startPuzzle(currentPuzzle)} className="btn-secondary">
                          Try Again
                        </button>
                        <button onClick={nextPuzzle} className="btn-primary">
                          Next Puzzle →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowHint(true)}
                  disabled={showHint || feedback === 'complete'}
                  className="btn-secondary flex-1"
                >
                  💡 Hint
                </button>
                <button 
                  onClick={() => startPuzzle(currentPuzzle)} 
                  className="btn-ghost flex-1"
                >
                  🔄 Reset
                </button>
              </div>
            </div>

            {/* Info Panel */}
            <div className="space-y-4">
              {/* Puzzle Info */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-display" style={{ color: 'var(--text-primary)' }}>
                      {currentPuzzle.title || 'Find the Best Move'}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {game.turn() === 'w' ? '⬜ White' : '⬛ Black'} to move
                    </p>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--accent-gold)' }}>
                    {'★'.repeat(currentPuzzle.difficulty)}{'☆'.repeat(5 - currentPuzzle.difficulty)}
                  </span>
                </div>

                {/* Themes */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentPuzzle.themes.map(theme => (
                    <span 
                      key={theme}
                      className="badge"
                    >
                      {THEME_LABELS[theme]}
                    </span>
                  ))}
                </div>

                {/* Hint */}
                {showHint && (
                  <div className="p-3 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
                    <p className="text-sm" style={{ color: '#f59e0b' }}>
                      💡 {currentPuzzle.explanation?.split('.')[0] || 'Look for tactical opportunities!'}
                    </p>
                  </div>
                )}
              </div>

              {/* Rating Info (Rated Mode) */}
              {mode === 'rated' && (
                <div className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Your Rating</div>
                      <div className="text-2xl font-display font-bold" style={{ color: tierConfig.color }}>
                        {stats.rating}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Puzzle Rating</div>
                      <div className="text-2xl font-display font-bold" style={{ color: 'var(--text-secondary)' }}>
                        ~{getPuzzleRating(currentPuzzle)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Streak */}
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Current Streak</span>
                  <span className="text-lg font-mono font-bold" style={{ color: stats.currentStreak > 0 ? '#f59e0b' : 'var(--text-tertiary)' }}>
                    🔥 {stats.currentStreak}
                  </span>
                </div>
              </div>

              {/* Back Button */}
              <button
                onClick={() => { setMode('menu'); setCurrentPuzzle(null); setRushActive(false); }}
                className="w-full btn-ghost"
              >
                ← Back to Menu
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default PuzzlesPage;

