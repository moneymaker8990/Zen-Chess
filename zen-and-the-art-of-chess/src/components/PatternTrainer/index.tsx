import { useState, useCallback, useMemo, useEffect } from 'react';
import { ChessBoardPanel } from '@/components/ChessBoardPanel';
import { useProgressStore } from '@/state/useStore';
import type { ChessPuzzle, PatternType } from '@/lib/types';

// Import puzzles
import { puzzles } from '@/data/puzzles';

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
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [solved, setSolved] = useState(0);
  const [failed, setFailed] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const { recordPuzzle } = useProgressStore();

  // Reset puzzle index when filters change from parent
  useEffect(() => {
    setCurrentPuzzleIndex(0);
    setShowSolution(false);
  }, [patternType, difficulty]);

  // Filter puzzles based on props from parent
  const filteredPuzzles = useMemo(() => {
    return puzzles.filter((p) => {
      const matchesPattern = !patternType || p.themes.includes(patternType);
      const matchesDifficulty = !difficulty || p.difficulty === difficulty;
      return matchesPattern && matchesDifficulty;
    });
  }, [patternType, difficulty]);

  const currentPuzzle: ChessPuzzle | undefined = filteredPuzzles[currentPuzzleIndex];

  const handlePuzzleSolved = useCallback(() => {
    setSolved((prev) => prev + 1);
    recordPuzzle(true);
    onComplete?.(true);
    
    // Move to next puzzle after delay
    setTimeout(() => {
      setCurrentPuzzleIndex((prev) => (prev + 1) % filteredPuzzles.length);
      setShowSolution(false);
    }, 1500);
  }, [filteredPuzzles.length, recordPuzzle, onComplete]);

  const handlePuzzleFailed = useCallback(() => {
    setFailed((prev) => prev + 1);
    recordPuzzle(false);
    onComplete?.(false);
    setShowSolution(true);
  }, [recordPuzzle, onComplete]);

  const skipPuzzle = useCallback(() => {
    setCurrentPuzzleIndex((prev) => (prev + 1) % filteredPuzzles.length);
    setShowSolution(false);
  }, [filteredPuzzles.length]);

  const getDifficultyStars = (diff: number) => {
    return '★'.repeat(diff) + '☆'.repeat(5 - diff);
  };

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
            Puzzle <span className="text-zen-200 font-mono">{currentPuzzleIndex + 1}</span> of{' '}
            <span className="text-zen-200 font-mono">{filteredPuzzles.length}</span>
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
            puzzleSolution={currentPuzzle.solution}
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
                {currentPuzzle.title || 'Find the Best Move'}
              </h3>
              <span className="text-gold-400 text-sm">
                {getDifficultyStars(currentPuzzle.difficulty)}
              </span>
            </div>

            {/* Themes */}
            <div className="flex flex-wrap gap-2 mb-4">
              {currentPuzzle.themes.map((theme) => (
                <span 
                  key={theme}
                  className="text-xs px-2 py-1 rounded-full bg-zen-800/60 text-zen-400"
                >
                  {patternLabels[theme]}
                </span>
              ))}
            </div>

            {/* Pattern description */}
            {currentPuzzle.themes[0] && (
              <p className="text-sm text-zen-500 italic">
                {patternDescriptions[currentPuzzle.themes[0]]}
              </p>
            )}
          </div>

          {/* Solution section */}
          {showSolution && currentPuzzle.explanation && (
            <div className="glass-card p-5">
              <h4 className="text-sm text-zen-400 mb-2 uppercase tracking-wider">
                Solution
              </h4>
              <p className="text-zen-300 text-sm mb-3">
                {currentPuzzle.explanation}
              </p>
              <div className="font-mono text-sm text-gold-400 bg-zen-800/40 px-3 py-2 rounded">
                {currentPuzzle.solution.join(' ')}
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
