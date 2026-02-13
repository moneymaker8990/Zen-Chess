import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { AnimatePresence } from 'framer-motion';
import { useCoachStore } from '@/state/coachStore';
import { useBoardSettingsStore, useBoardStyles, useMoveOptions } from '@/state/boardSettingsStore';
import { useAgentTrigger } from '@/lib/agents/agentOrchestrator';
import { PuzzleGeniusPanel } from '@/components/PuzzleGeniusPanel';
import { UISounds, playSmartMoveSound } from '@/lib/soundSystem';
import {
  getPuzzleStats,
  submitPuzzleResult,
  getLocalPuzzleData,
  saveLocalPuzzleData,
  calculateEloChange,
  getNextPuzzleAnonymous,
  getDailyPuzzle,
  getPuzzlesByTheme,
  type PuzzleWithMeta,
} from '@/lib/puzzleService';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { PatternType } from '@/lib/types';
import { logger } from '@/lib/logger';
import { useLiveRegion } from '@/components/LiveRegion';

import type { PuzzleMode, PuzzleStats, FeedbackType, HintLevel } from './types';
import { TIER_CONFIG, DEFAULT_STATS } from './constants';
import {
  getXpForLevel,
  getLevelFromXp,
  getXpReward,
  getTierFromRating,
  getNextTier,
  getPuzzleRating,
  getSolutionMoves,
  getThemes,
  getPuzzleDifficulty,
  parseUciMove,
  moveMatchesUci,
} from './utils';
import { PuzzleMenu } from './PuzzleMenu';
import { PuzzleCustomMode } from './PuzzleCustomMode';
import { PuzzleGameOver } from './PuzzleGameOver';
import { PuzzleStatsBar } from './PuzzleStatsBar';
import { PuzzleControls } from './PuzzleControls';

// ============================================
// MAIN COMPONENT
// ============================================

export function PuzzlesPage() {
  // Coach integration
  const { recordEvent, recordPuzzle } = useCoachStore();
  const triggerAgent = useAgentTrigger();
  const { announce, LiveRegion } = useLiveRegion();
  const puzzleStartTime = useRef<number>(Date.now());
  const puzzleStreakRef = useRef<number>(0);
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
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintLevel, setHintLevel] = useState<HintLevel>(0);
  const [hintSquares, setHintSquares] = useState<{ from?: Square; to?: Square }>({});

  // Rush Mode State
  const [rushTimer, setRushTimer] = useState(180);
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

  // Gentle error feedback state
  const [showIncorrectFeedback, setShowIncorrectFeedback] = useState(false);

  // AI Genius Panel state
  const [showGeniusPanel, setShowGeniusPanel] = useState(false);
  const [puzzleSolveTime, setPuzzleSolveTime] = useState(0);

  // AI Analysis toggle
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(() => {
    const stored = localStorage.getItem('puzzle_ai_analysis_enabled');
    return stored !== 'false';
  });

  useEffect(() => {
    localStorage.setItem('puzzle_ai_analysis_enabled', String(aiAnalysisEnabled));
  }, [aiAnalysisEnabled]);

  // Setup move animation state
  const [isAnimatingSetup, setIsAnimatingSetup] = useState(false);

  // Track seen puzzles
  const seenPuzzleIds = useRef<Set<string>>(new Set());

  // Stats State
  const [stats, setStats] = useState<PuzzleStats>(() => {
    const newData = getLocalPuzzleData();
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

  useEffect(() => {
    localStorage.setItem('zenChessPuzzleXp', String(totalXp));
  }, [totalXp]);

  const levelInfo = getLevelFromXp(totalXp);
  const progressPercent = (levelInfo.currentXp / levelInfo.xpForNextLevel) * 100;

  const [justLeveledUp, setJustLeveledUp] = useState(false);
  const [xpGained, setXpGained] = useState<number | null>(null);

  // Puzzle solve timer
  const [solveTimer, setSolveTimer] = useState(0);
  const solveTimerInterval = useRef<ReturnType<typeof setInterval>>();

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
          logger.debug('Failed to fetch puzzle count from Supabase:', e);
        }
      }
    };
    fetchPuzzleCount();
  }, []);

  // Async puzzle fetching
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
  const startPuzzle = useCallback((puzzle: PuzzleWithMeta) => {
    seenPuzzleIds.current.add(puzzle.id);
    setLastRatingChange(null);
    hasRecordedFailure.current = false;

    setCurrentPuzzle(puzzle);
    setMoveFrom(null);
    setOptionSquares({});
    setFeedback(null);
    setShowHint(false);
    setHintLevel(0);
    setHintSquares({});

    const solutionMoves = puzzle.solutionMoves;

    if (solutionMoves.length > 0) {
      const startGame = new Chess(puzzle.fen);
      setGame(startGame);
      setLastMove(null);
      setIsAnimatingSetup(true);

      setTimeout(() => {
        const setupMove = solutionMoves[0];
        const parsed = parseUciMove(setupMove);

        if (parsed) {
          const afterSetupGame = new Chess(puzzle.fen);
          try {
            afterSetupGame.move({
              from: parsed.from,
              to: parsed.to,
              promotion: parsed.promotion as 'q' | 'r' | 'b' | 'n' | undefined
            });
            setGame(afterSetupGame);
            setLastMove({
              from: parsed.from as Square,
              to: parsed.to as Square
            });
          } catch (e) {
            logger.error('Setup move failed:', setupMove, e);
          }
        }

        setMoveIndex(1);
        setIsAnimatingSetup(false);

        puzzleStartTime.current = Date.now();
        recordEvent('PUZZLE_START', {
          themes: puzzle.themes,
          difficulty: getPuzzleDifficulty(puzzle)
        });
      }, 500);
    } else {
      const newGame = new Chess(puzzle.fen);
      setGame(newGame);
      setLastMove(null);
      setMoveIndex(0);
      setIsAnimatingSetup(false);
      puzzleStartTime.current = Date.now();
    }
  }, [recordEvent]);

  // Start a mode
  const startMode = useCallback(async (newMode: PuzzleMode) => {
    setMode(newMode);
    setIsLoadingPuzzle(true);
    setPuzzleError(null);

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
      logger.error('Failed to start puzzle mode:', err);
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

    const ratingChange = (mode === 'streak' || mode === 'rush')
      ? 0
      : calculateEloChange(stats.rating, puzzleRating, true);
    const points = 10 + puzzleDifficulty * 5 + (mode === 'rush' ? 5 : 0);
    const timeToSolve = Date.now() - puzzleStartTime.current;

    const xpEarned = getXpReward(puzzleRating, stats.rating, true);
    const prevLevel = getLevelFromXp(totalXp).level;
    setTotalXp(prev => prev + xpEarned);
    setXpGained(xpEarned);

    const newLevel = getLevelFromXp(totalXp + xpEarned).level;
    if (newLevel > prevLevel) {
      setJustLeveledUp(true);
      setTimeout(() => setJustLeveledUp(false), 3000);
    }

    setTimeout(() => setXpGained(null), 1500);
    setLastRatingChange(ratingChange);

    const timeSeconds = Math.round(timeToSolve / 1000);
    recordPuzzle(true, timeSeconds, showHint ? 1 : 0);
    recordEvent('PUZZLE_COMPLETE', {
      solved: true,
      timeSeconds,
      themes,
    });

    puzzleStreakRef.current += 1;
    triggerAgent({ type: 'PUZZLE_COMPLETE', solved: true, time: timeSeconds });

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
      const streakRating = Math.min(800 + (newStreakCount * 50), 2500);
      setTimeout(async () => {
        const puzzle = await fetchNextPuzzle(streakRating, { ratingRange: 150 });
        if (puzzle) {
          startPuzzle(puzzle);
        }
        setFeedback(null);
      }, 800);
    } else {
      const solveTime = Math.round((Date.now() - puzzleStartTime.current) / 1000);
      setPuzzleSolveTime(solveTime);
      setFeedback('complete');
    }
  }, [currentPuzzle, stats.rating, mode, startPuzzle, showHint, recordPuzzle, recordEvent, streakCount, announce]);

  // Handle puzzle failure
  const handlePuzzleFailed = useCallback((allowRetry: boolean = true) => {
    if (!currentPuzzle) return;

    setShowIncorrectFeedback(true);
    setTimeout(() => setShowIncorrectFeedback(false), 2000);

    const shouldRecordFailure = !hasRecordedFailure.current;

    const puzzleRating = getPuzzleRating(currentPuzzle);
    const themes = getThemes(currentPuzzle);

    if (shouldRecordFailure) {
      hasRecordedFailure.current = true;

      const ratingChange = (mode === 'streak' || mode === 'rush')
        ? 0
        : calculateEloChange(stats.rating, puzzleRating, false);
      const timeToFail = Date.now() - puzzleStartTime.current;

      if (mode === 'rated') {
        setLastRatingChange(ratingChange);
      }

      const timeSeconds = Math.round(timeToFail / 1000);
      recordPuzzle(false, timeSeconds, showHint ? 1 : 0);
      recordEvent('PUZZLE_COMPLETE', {
        solved: false,
        timeSeconds,
        themes,
      });

      puzzleStreakRef.current = 0;
      triggerAgent({ type: 'PUZZLE_COMPLETE', solved: false, time: timeSeconds });

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
      setStreakActive(false);
      setStats(s => ({
        ...s,
        bestStreak: Math.max(s.bestStreak, streakCount),
      }));
      setFeedback('incorrect');
    } else if (allowRetry) {
      setFeedback('incorrect');
    }
  }, [currentPuzzle, stats.rating, mode, rushScore, rushStrikes, startPuzzle, showHint, recordPuzzle, recordEvent, streakCount, announce]);

  // Get move options
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

      const playerMove = `${from}${to}${result.promotion || ''}`;
      const uciMatch = moveMatchesUci({ from, to, promotion: result.promotion }, expectedMove);
      const sanMatch = result.san === expectedMove;
      const sanNormalizedMatch = result.san.replace(/[+#]/g, '') === expectedMove?.replace(/[+#]/g, '');
      const isCorrect = uciMatch || sanMatch || sanNormalizedMatch;

      if (!isCorrect) {
        logger.debug('[Puzzle Debug]', {
          playerMove,
          playerUCI: `${from}${to}`,
          playerSAN: result.san,
          expectedMove,
          moveIndex,
          uciMatch,
          sanMatch,
          sanNormalizedMatch,
          solutionMoves
        });
      }

      if (isCorrect) {
        const scrollY = window.scrollY;
        playSmartMoveSound(gameCopy, result, { isCapture });

        setGame(gameCopy);
        setLastMove({ from, to });
        setFeedback('correct');

        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });

        if (moveIndex + 1 >= solutionMoves.length) {
          setTimeout(() => UISounds.puzzleCorrect(), 200);
          handlePuzzleSolved();
        } else {
          setTimeout(() => {
            const opponentMove = solutionMoves[moveIndex + 1];
            if (opponentMove) {
              const responseGame = new Chess(gameCopy.fen());
              const opponentCapture = responseGame.get(opponentMove.slice(2, 4) as Square);
              const response = responseGame.move(opponentMove);
              if (response) {
                const scrollY = window.scrollY;
                playSmartMoveSound(responseGame, response, { isCapture: !!opponentCapture });

                setGame(responseGame);
                setLastMove({ from: response.from as Square, to: response.to as Square });
                setMoveIndex(moveIndex + 2);
                setFeedback(null);
                setHintLevel(0);
                setHintSquares({});

                if (responseGame.isCheckmate()) {
                  announce('Checkmate.');
                } else if (responseGame.isCheck()) {
                  announce('Check.');
                }

                requestAnimationFrame(() => {
                  window.scrollTo(0, scrollY);
                });
              }
            }
          }, 500);
        }
        return true;
      } else {
        UISounds.puzzleWrong();
        setLastMove({ from, to });
        handlePuzzleFailed(true);
        return false;
      }
    } catch {
      return false;
    }
  }, [currentPuzzle, game, moveIndex, feedback, handlePuzzleSolved, handlePuzzleFailed]);

  // Square click handler
  const onSquareClick = useCallback((square: Square) => {
    if (feedback === 'complete') return;
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

  // Drag and drop
  const onDrop = useCallback((sourceSquare: Square, targetSquare: Square) => {
    if (feedback === 'complete') return false;
    if (feedback === 'incorrect' && mode === 'streak') return false;
    if (feedback === 'incorrect') setFeedback(null);
    return handleMove(sourceSquare, targetSquare);
  }, [feedback, mode, handleMove]);

  // Next puzzle
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
      logger.error('Failed to get next puzzle:', err);
    } finally {
      setIsLoadingPuzzle(false);
    }
  }, [mode, stats.rating, selectedTheme, selectedDifficulty, fetchNextPuzzle, startPuzzle]);

  // Get hint squares from the expected move
  const getHintFromMove = useCallback((moveNotation: string): { from?: Square; to?: Square } => {
    if (!currentPuzzle) return {};

    const tempGame = new Chess(game.fen());
    try {
      const move = tempGame.move(moveNotation);
      if (move) {
        return { from: move.from as Square, to: move.to as Square };
      }
    } catch {
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
      setHintLevel(1);
      setShowHint(true);
      setHintSquares({ from: squares.from });
    } else if (hintLevel === 1) {
      setHintLevel(2);
      setHintSquares(squares);
    }
  }, [currentPuzzle, moveIndex, feedback, hintLevel, getHintFromMove]);

  // Auto-play the correct move
  const showCorrectMove = useCallback(() => {
    if (!currentPuzzle || feedback === 'complete') return;

    const solutionMoves = getSolutionMoves(currentPuzzle);
    const expectedMove = solutionMoves[moveIndex];
    if (!expectedMove) return;

    const squares = getHintFromMove(expectedMove);
    if (squares.from && squares.to) {
      handleMove(squares.from, squares.to);
    }
  }, [currentPuzzle, moveIndex, feedback, getHintFromMove, handleMove]);

  // Custom square styles
  const customSquareStyles = useMemo(() => ({
    ...optionSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(147, 112, 219, 0.25)' },
      [lastMove.to]: { backgroundColor: 'rgba(147, 112, 219, 0.4)' },
    }),
    ...(feedback === 'correct' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(34, 197, 94, 0.5)' },
    }),
    ...(feedback === 'incorrect' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(239, 68, 68, 0.35)' },
    }),
    ...(hintSquares.from && {
      [hintSquares.from]: {
        backgroundColor: 'rgba(147, 112, 219, 0.5)',
        boxShadow: 'inset 0 0 0 3px rgba(147, 112, 219, 0.8)',
      },
    }),
    ...(hintSquares.to && hintLevel >= 2 && {
      [hintSquares.to]: {
        backgroundColor: 'rgba(147, 112, 219, 0.35)',
        boxShadow: 'inset 0 0 0 3px rgba(147, 112, 219, 0.6)',
      },
    }),
  }), [optionSquares, lastMove, feedback, hintSquares, hintLevel]);

  // Board orientation
  const boardOrientation = currentPuzzle
    ? (currentPuzzle.fen.includes(' w ') ? 'black' : 'white')
    : 'white';

  const playerColor = boardOrientation;

  // ============================================
  // RENDER: LOADING / ERROR STATES
  // ============================================
  if (isLoadingPuzzle && mode !== 'menu') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-zen-800 border-t-purple-500 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-2xl">
            ♟️
          </div>
        </div>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>Loading puzzle...</p>
      </div>
    );
  }

  if (puzzleError && mode !== 'menu') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-4 px-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
          style={{ background: 'rgba(239, 68, 68, 0.1)' }}
        >
          ⚠️
        </div>
        <h2 className="text-xl font-display" style={{ color: 'var(--text-primary)' }}>
          Failed to Load Puzzle
        </h2>
        <p className="text-center max-w-md" style={{ color: 'var(--text-secondary)' }}>
          {puzzleError}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setPuzzleError(null);
              startMode('menu');
            }}
            className="btn-secondary"
          >
            Back to Menu
          </button>
          <button
            onClick={() => {
              setPuzzleError(null);
              setIsLoadingPuzzle(true);
              startMode(mode);
            }}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: MODE SELECTION MENU
  // ============================================
  if (mode === 'menu') {
    return (
      <PuzzleMenu
        stats={stats}
        puzzleCount={puzzleCount}
        levelInfo={levelInfo}
        progressPercent={progressPercent}
        startMode={startMode}
        setMode={setMode}
      />
    );
  }

  // ============================================
  // RENDER: CUSTOM MODE SELECTION
  // ============================================
  if (mode === 'custom' && !currentPuzzle) {
    return (
      <PuzzleCustomMode
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        setMode={setMode}
        startMode={startMode}
        isLoadingPuzzle={isLoadingPuzzle}
      />
    );
  }

  // ============================================
  // RENDER: PUZZLE SOLVING VIEW
  // ============================================
  if (currentPuzzle) {
    const isRushOver = mode === 'rush' && (!rushActive || rushStrikes >= 3);
    const isStreakOver = mode === 'streak' && !streakActive && streakCount > 0;

    // Game over screens for Rush/Streak
    if (isRushOver || isStreakOver) {
      return (
        <PuzzleGameOver
          isRushOver={isRushOver}
          rushStrikes={rushStrikes}
          rushScore={rushScore}
          streakCount={streakCount}
          stats={stats}
          startMode={startMode}
          onBackToMenu={() => {
            setMode('menu');
            setCurrentPuzzle(null);
            setRushActive(false);
            setStreakCount(0);
          }}
        />
      );
    }

    return (
      <div className="h-[calc(100dvh-80px)] sm:h-[calc(100vh-100px)] flex flex-col animate-fade-in overflow-hidden relative">
        <LiveRegion aria-live="polite" />
        {/* Compact Header */}
        <div className="flex items-center justify-between px-2 py-2 shrink-0" style={{ background: 'var(--bg-card)' }}>
          <button
            onClick={() => { setMode('menu'); setCurrentPuzzle(null); setRushActive(false); }}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Back to puzzles menu"
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
            aria-label="Open AI analysis"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Turn Indicator */}
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

        {/* Board Area */}
        <div className="flex-1 flex items-center justify-center px-2 py-2 overflow-hidden min-h-0">
          <div className="board-container">
            <div className="board-wrapper">
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

              {/* Feedback Overlay */}
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

        {/* Bottom Stats Bar */}
        <PuzzleStatsBar
          mode={mode}
          rushActive={rushActive}
          rushTimer={rushTimer}
          rushStrikes={rushStrikes}
          rushScore={rushScore}
          streakActive={streakActive}
          streakCount={streakCount}
          streakDifficulty={streakDifficulty}
          stats={stats}
          lastRatingChange={lastRatingChange}
          solveTimer={solveTimer}
          levelInfo={levelInfo}
          progressPercent={progressPercent}
          justLeveledUp={justLeveledUp}
          xpGained={xpGained}
        />

        {/* Control Buttons */}
        <PuzzleControls
          feedback={feedback}
          hintLevel={hintLevel}
          onHint={handleHint}
          onReset={() => startPuzzle(currentPuzzle)}
          onForwardOrNext={feedback === 'complete' ? nextPuzzle : showCorrectMove}
        />

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
