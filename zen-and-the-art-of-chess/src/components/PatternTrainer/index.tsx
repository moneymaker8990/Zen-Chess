import { useState, useCallback, useEffect, useRef } from 'react';
import { ChessBoardPanel } from '@/components/ChessBoardPanel';
import { useProgressStore } from '@/state/useStore';
import { useCoachStore } from '@/state/coachStore';
import type { PatternType } from '@/lib/types';
import { getPuzzlesByTheme, getNextPuzzleAnonymous, type PuzzleWithMeta } from '@/lib/puzzleService';

interface PatternTrainerProps {
  patternType?: PatternType;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  onComplete?: (solved: boolean) => void;
}

const patternLabels: Record<PatternType, string> = {
  FORK: 'Fork',
  PIN: 'Pin',
  SKEWER: 'Skewer',
  DISCOVERY: 'Discovered Attack',
  DEFLECTION: 'Deflection',
  DECOY: 'Decoy',
  QUIET_MOVE: 'Quiet Move',
  ZWISCHENZUG: 'Zwischenzug',
  BACK_RANK: 'Back Rank',
  MATE_PATTERN: 'Checkmate Pattern',
  SACRIFICE: 'Sacrifice',
  CHECK: 'Forcing Check',
  CAPTURE: 'Winning Capture',
  TACTICAL: 'Tactical Combination',
};

const patternDescriptions: Record<PatternType, string> = {
  FORK: 'Attack two or more pieces simultaneously',
  PIN: 'Pin a piece to a more valuable piece behind it',
  SKEWER: 'Attack a valuable piece, forcing it to move and expose another',
  DISCOVERY: 'Move one piece to reveal an attack from another',
  DEFLECTION: 'Force a piece away from its defensive duty',
  DECOY: 'Lure a piece to a vulnerable square',
  QUIET_MOVE: 'A subtle non-capturing move that creates unstoppable threats',
  ZWISCHENZUG: 'An unexpected "in-between" move that changes the situation',
  BACK_RANK: 'Exploit the opponent\'s weak back rank',
  MATE_PATTERN: 'Recognize and execute a checkmate pattern',
  SACRIFICE: 'Give up material for a greater advantage',
  CHECK: 'Use check to gain tempo or create threats',
  CAPTURE: 'Win material with a precise capture',
  TACTICAL: 'Find the winning tactical sequence',
};

export function PatternTrainer({ 
  patternType, 
  difficulty,
  onComplete 
}: PatternTrainerProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState<PuzzleWithMeta | null>(null);
  const [solved, setSolved] = useState(0);
  const [failed, setFailed] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const seenPuzzleIds = useRef<Set<string>>(new Set());
  
  // Track timing for coach
  const puzzleStartTime = useRef<number>(Date.now());

  const { recordPuzzle } = useProgressStore();
  const { recordEvent, recordPuzzle: recordCoachPuzzle } = useCoachStore();

  // Fetch next puzzle from Supabase
  const fetchNextPuzzle = useCallback(async () => {
    setIsLoading(true);
    try {
      // Convert difficulty to rating
      const targetRating = difficulty 
        ? 600 + (difficulty * 300) // difficulty 1-5 -> 900-2100
        : 1200;
      
      // Map PatternType to Lichess theme format
      const lichessTheme = patternType?.toLowerCase();
      
      let puzzle: PuzzleWithMeta | null = null;
      
      if (lichessTheme) {
        // Try to get puzzles by theme
        const themePuzzles = await getPuzzlesByTheme(lichessTheme, 20, targetRating);
        const unseen = themePuzzles.filter(p => !seenPuzzleIds.current.has(p.id));
        if (unseen.length > 0) {
          puzzle = unseen[Math.floor(Math.random() * unseen.length)];
        } else if (themePuzzles.length > 0) {
          puzzle = themePuzzles[Math.floor(Math.random() * themePuzzles.length)];
        }
      }
      
      // Fallback to any puzzle matching rating
      if (!puzzle) {
        puzzle = await getNextPuzzleAnonymous(targetRating, Array.from(seenPuzzleIds.current), {
          ratingRange: 300,
        });
      }
      
      if (puzzle) {
        seenPuzzleIds.current.add(puzzle.id);
        // Reset seen if too many
        if (seenPuzzleIds.current.size > 100) {
          seenPuzzleIds.current.clear();
          seenPuzzleIds.current.add(puzzle.id);
        }
        setCurrentPuzzle(puzzle);
        puzzleStartTime.current = Date.now();
      }
    } catch (err) {
      console.error('Failed to fetch puzzle:', err);
    } finally {
      setIsLoading(false);
    }
  }, [patternType, difficulty]);

  // Reset and fetch puzzle when filters change
  useEffect(() => {
    setShowSolution(false);
    seenPuzzleIds.current.clear();
    fetchNextPuzzle();
    
    // Track pattern training start
    if (patternType) {
      recordEvent('PATTERN_PRACTICE_START', { patternType, difficulty });
    }
  }, [patternType, difficulty, recordEvent, fetchNextPuzzle]);

  const handlePuzzleSolved = useCallback(() => {
    const timeToSolve = Date.now() - puzzleStartTime.current;
    const timeSeconds = Math.round(timeToSolve / 1000);
    setSolved((prev) => prev + 1);
    recordPuzzle(true);
    onComplete?.(true);
    
    // Record to coach (solved, timeSeconds, hintsUsed)
    recordCoachPuzzle(true, timeSeconds, showSolution ? 1 : 0);
    
    if (currentPuzzle) {
      recordEvent('PATTERN_COMPLETE', { 
        solved: true, 
        timeSeconds,
        themes: currentPuzzle.themes,
        isPatternTraining: true,
      });
    }
    
    // Move to next puzzle after delay
    setTimeout(() => {
      setShowSolution(false);
      fetchNextPuzzle();
    }, 1500);
  }, [recordPuzzle, onComplete, currentPuzzle, showSolution, recordCoachPuzzle, recordEvent, fetchNextPuzzle]);

  const handlePuzzleFailed = useCallback(() => {
    const timeToFail = Date.now() - puzzleStartTime.current;
    const timeSeconds = Math.round(timeToFail / 1000);
    setFailed((prev) => prev + 1);
    recordPuzzle(false);
    onComplete?.(false);
    setShowSolution(true);
    
    // Record to coach (solved, timeSeconds, hintsUsed)
    recordCoachPuzzle(false, timeSeconds, 0);
    
    if (currentPuzzle) {
      recordEvent('PATTERN_COMPLETE', { 
        solved: false, 
        timeSeconds,
        themes: currentPuzzle.themes,
        isPatternTraining: true,
      });
    }
  }, [recordPuzzle, onComplete, currentPuzzle, recordCoachPuzzle, recordEvent]);

  const skipPuzzle = useCallback(() => {
    setShowSolution(false);
    fetchNextPuzzle();
  }, [fetchNextPuzzle]);

  // Convert rating to difficulty stars
  const getDifficultyFromRating = (rating: number) => {
    if (rating < 1000) return 1;
    if (rating < 1300) return 2;
    if (rating < 1600) return 3;
    if (rating < 1900) return 4;
    return 5;
  };

  const getDifficultyStars = (rating: number) => {
    const diff = getDifficultyFromRating(rating);
    return '★'.repeat(diff) + '☆'.repeat(5 - diff);
  };

  // Get title from themes
  const getPuzzleTitle = (themes: string[]) => {
    if (themes.length > 0) {
      const theme = themes[0];
      return patternLabels[theme as PatternType] || theme.replace(/_/g, ' ');
    }
    return 'Find the Best Move';
  };

  if (isLoading) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-zen-400 mb-2">Loading puzzle...</p>
        <p className="text-zen-500 text-sm">Fetching from Lichess database</p>
      </div>
    );
  }

  if (!currentPuzzle) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-zen-400 mb-2">No puzzles match your criteria.</p>
        <p className="text-zen-500 text-sm">Try selecting a different pattern or difficulty above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="text-zen-400 text-sm">
            Rating: <span className="text-zen-200 font-mono">{currentPuzzle.rating}</span>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-emerald-400">✓ Solved: {solved}</span>
            <span className="text-red-400">✗ Failed: {failed}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid md:grid-cols-[1fr_320px] gap-6">
        {/* Chessboard */}
        <div>
          <ChessBoardPanel
            initialFen={currentPuzzle.fen}
            puzzleMode={true}
            puzzleSolution={currentPuzzle.solutionMoves}
            onPuzzleSolved={handlePuzzleSolved}
            onPuzzleFailed={handlePuzzleFailed}
          />
        </div>

        {/* Puzzle info panel */}
        <div className="space-y-4">
          {/* Puzzle details */}
          <div className="glass-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-serif text-zen-200">
                {getPuzzleTitle(currentPuzzle.themes)}
              </h3>
              <span className="text-gold-400 text-sm">
                {getDifficultyStars(currentPuzzle.rating)}
              </span>
            </div>

            {/* Themes */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentPuzzle.themes.map((theme) => (
                <span 
                  key={theme}
                  className="text-xs px-2 py-1 rounded-full bg-zen-800/60 text-zen-400"
                >
                  {patternLabels[theme as PatternType] || theme}
                </span>
              ))}
            </div>

            {/* Pattern description */}
            {currentPuzzle.themes[0] && patternDescriptions[currentPuzzle.themes[0] as PatternType] && (
              <p className="text-sm text-zen-500 italic">
                {patternDescriptions[currentPuzzle.themes[0] as PatternType]}
              </p>
            )}
          </div>

          {/* Solution section */}
          {showSolution && (
            <div className="glass-card p-5">
              <h4 className="text-sm text-zen-400 mb-2 uppercase tracking-wider">
                Solution
              </h4>
              <div className="font-mono text-sm text-gold-400 bg-zen-800/40 px-3 py-2 rounded">
                {currentPuzzle.solutionMoves.join(' ')}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="zen-button flex-1"
            >
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
            <button
              onClick={skipPuzzle}
              className="zen-button-ghost"
            >
              Skip →
            </button>
          </div>

          {/* Mindful note */}
          <div className="glass-card-subtle p-4">
            <p className="text-zen-500 text-xs italic">
              Take your time. The goal is not speed, but clarity of vision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatternTrainer;
