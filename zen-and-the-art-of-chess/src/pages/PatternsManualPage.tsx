import { useState, useCallback, useEffect, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { 
  positionalPatterns, 
  categoryInfo, 
  type PositionalCategory,
  type PositionalPattern 
} from '@/data/positional/positionalPatterns';

// ============================================
// TYPES & CONSTANTS
// ============================================

type ViewMode = 'categories' | 'patterns' | 'practice';

const SRS_INTERVALS = [1, 2, 4, 8, 16, 32];

interface PatternProgress {
  patternId: string;
  correctCount: number;
  incorrectCount: number;
  lastReview: number;
  nextReview: number;
  srsLevel: number;
  mastered: boolean;
}

// Category metadata with rich visuals
const CATEGORY_DISPLAY: Record<PositionalCategory, { 
  tagline: string;
  color: string;
  bgColor: string;
  legends?: string[];
}> = {
  OUTPOSTS: {
    tagline: 'Unassailable squares for your knights',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    legends: ['Petrosian', 'Karpov'],
  },
  WEAK_PAWNS: {
    tagline: 'Target and destroy structural weaknesses',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    legends: ['Capablanca', 'Fischer'],
  },
  PAWN_STRUCTURE: {
    tagline: 'The skeleton of your position',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    legends: ['Philidor', 'Nimzowitsch'],
  },
  OPEN_FILES: {
    tagline: 'Highways for your heavy pieces',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    legends: ['Tarrasch', 'Rubinstein'],
  },
  BISHOP_PAIR: {
    tagline: 'Two bishops, double the danger',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.1)',
    legends: ['Fischer', 'Spassky'],
  },
  GOOD_BAD_BISHOP: {
    tagline: 'Know your bishops true value',
    color: '#6b7280',
    bgColor: 'rgba(107, 114, 128, 0.1)',
    legends: ['Capablanca', 'Fine'],
  },
  KNIGHT_PLACEMENT: {
    tagline: 'Knights thrive on outposts',
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.1)',
    legends: ['Petrosian', 'Kramnik'],
  },
  SPACE_ADVANTAGE: {
    tagline: 'Restrict and suffocate',
    color: '#14b8a6',
    bgColor: 'rgba(20, 184, 166, 0.1)',
    legends: ['Botvinnik', 'Karpov'],
  },
  PIECE_COORDINATION: {
    tagline: 'Harmony breeds power',
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.1)',
    legends: ['Alekhine', 'Tal'],
  },
  PROPHYLAXIS: {
    tagline: 'Stop them before they start',
    color: '#6366f1',
    bgColor: 'rgba(99, 102, 241, 0.1)',
    legends: ['Petrosian', 'Karpov'],
  },
  MINORITY_ATTACK: {
    tagline: 'Less is more on the queenside',
    color: '#84cc16',
    bgColor: 'rgba(132, 204, 22, 0.1)',
    legends: ['Capablanca', 'Carlsen'],
  },
  PAWN_BREAKS: {
    tagline: 'The moment of truth',
    color: '#d946ef',
    bgColor: 'rgba(217, 70, 239, 0.1)',
    legends: ['Kasparov', 'Tal'],
  },
  KING_ACTIVITY: {
    tagline: 'In the endgame, the king fights',
    color: '#eab308',
    bgColor: 'rgba(234, 179, 8, 0.1)',
    legends: ['Capablanca', 'Carlsen'],
  },
  EXCHANGE_STRATEGY: {
    tagline: 'Trade wisely, win surely',
    color: '#06b6d4',
    bgColor: 'rgba(6, 182, 212, 0.1)',
    legends: ['Petrosian', 'Kramnik'],
  },
  BLOCKADE: {
    tagline: 'Stop the pawn, win the game',
    color: '#78716c',
    bgColor: 'rgba(120, 113, 108, 0.1)',
    legends: ['Nimzowitsch', 'Karpov'],
  },
  CENTRALIZATION: {
    tagline: 'Control the center, control the game',
    color: '#2563eb',
    bgColor: 'rgba(37, 99, 235, 0.1)',
    legends: ['Steinitz', 'Kasparov'],
  },
};

// ============================================
// MAIN COMPONENT
// ============================================

export function PatternsManualPage() {
  // Navigation State
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [selectedCategory, setSelectedCategory] = useState<PositionalCategory | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<PositionalPattern | null>(null);
  
  // Practice State
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | 'complete' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [practiceMode, setPracticeMode] = useState<'learn' | 'test'>('learn');
  const [streak, setStreak] = useState(0);
  
  // Progress State (persisted)
  const [progress, setProgress] = useState<Record<string, PatternProgress>>(() => {
    const saved = localStorage.getItem('positionalPatternsProgress');
    return saved ? JSON.parse(saved) : {};
  });

  // Save progress
  useEffect(() => {
    localStorage.setItem('positionalPatternsProgress', JSON.stringify(progress));
  }, [progress]);

  // Get patterns for selected category
  const categoryPatterns = useMemo(() => {
    if (!selectedCategory) return [];
    return positionalPatterns.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  // Get stats for a category
  const getCategoryStats = useCallback((category: PositionalCategory) => {
    const patterns = positionalPatterns.filter(p => p.category === category);
    const total = patterns.length;
    let mastered = 0;
    let inProgress = 0;

    patterns.forEach(p => {
      const prog = progress[p.id];
      if (prog?.mastered) mastered++;
      else if (prog && (prog.correctCount > 0 || prog.incorrectCount > 0)) inProgress++;
    });

    return { total, mastered, inProgress };
  }, [progress]);

  // Get patterns due for review
  const dueCount = useMemo(() => {
    const now = Date.now();
    return positionalPatterns.filter(p => {
      const prog = progress[p.id];
      if (!prog) return true;
      return !prog.mastered && prog.nextReview <= now;
    }).length;
  }, [progress]);

  // Overall stats
  const overallStats = useMemo(() => {
    let mastered = 0;
    Object.values(progress).forEach(p => {
      if (p.mastered) mastered++;
    });
    return { mastered, total: positionalPatterns.length };
  }, [progress]);

  // Start practicing a pattern
  const startPattern = useCallback((pattern: PositionalPattern) => {
    setSelectedPattern(pattern);
    const newGame = new Chess(pattern.fen);
    setGame(newGame);
    setMoveFrom(null);
    setOptionSquares({});
    setLastMove(null);
    setFeedback(null);
    setShowHint(false);
    setViewMode('practice');
  }, []);

  // Get move options for a square
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
          : 'rgba(168, 85, 247, 0.3)',
      };
    });
    newSquares[square] = { backgroundColor: 'rgba(168, 85, 247, 0.4)' };
    setOptionSquares(newSquares);
    return true;
  }, [game]);

  // Handle user move
  const handleMove = useCallback((from: Square, to: Square) => {
    if (!selectedPattern || feedback === 'complete' || feedback === 'correct') return false;

    const gameCopy = new Chess(game.fen());
    try {
      const result = gameCopy.move({ from, to, promotion: 'q' });
      if (!result) return false;

      const expectedMoves = selectedPattern.solution;
      const isCorrect = expectedMoves.some(exp => 
        exp === result.san || 
        exp === `${from}${to}` ||
        exp.toLowerCase() === result.san.toLowerCase() ||
        exp.replace(/[+#]/g, '') === result.san.replace(/[+#]/g, '')
      );

      if (isCorrect) {
        setGame(gameCopy);
        setLastMove({ from, to });
        setFeedback('correct');
        setShowHint(false);
        setStreak(prev => prev + 1);
        
        // Update SRS
        setProgress(prev => {
          const existing = prev[selectedPattern.id] || {
            patternId: selectedPattern.id,
            correctCount: 0,
            incorrectCount: 0,
            lastReview: 0,
            nextReview: 0,
            srsLevel: 0,
            mastered: false
          };
          
          const newLevel = Math.min(existing.srsLevel + 1, SRS_INTERVALS.length - 1);
          const nextReview = Date.now() + (SRS_INTERVALS[newLevel] * 24 * 60 * 60 * 1000);
          
          return {
            ...prev,
            [selectedPattern.id]: {
              ...existing,
              correctCount: existing.correctCount + 1,
              lastReview: Date.now(),
              nextReview,
              srsLevel: newLevel,
              mastered: newLevel >= 4
            }
          };
        });
        
        return true;
      } else {
        setFeedback('incorrect');
        setStreak(0);
        
        // Penalize in SRS
        setProgress(prev => {
          const existing = prev[selectedPattern.id] || {
            patternId: selectedPattern.id,
            correctCount: 0,
            incorrectCount: 0,
            lastReview: 0,
            nextReview: 0,
            srsLevel: 0,
            mastered: false
          };
          
          return {
            ...prev,
            [selectedPattern.id]: {
              ...existing,
              incorrectCount: existing.incorrectCount + 1,
              srsLevel: Math.max(0, existing.srsLevel - 1),
              mastered: false
            }
          };
        });
        
        setTimeout(() => setFeedback(null), 600);
        return false;
      }
    } catch {
      return false;
    }
  }, [selectedPattern, feedback, game]);

  // Square click handler
  const onSquareClick = useCallback((square: Square) => {
    if (feedback === 'correct' || feedback === 'complete') return;

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
    if (feedback === 'correct' || feedback === 'complete') return false;
    return handleMove(sourceSquare, targetSquare);
  }, [feedback, handleMove]);

  // Reset current pattern
  const resetPattern = useCallback(() => {
    if (selectedPattern) {
      setGame(new Chess(selectedPattern.fen));
      setMoveFrom(null);
      setOptionSquares({});
      setLastMove(null);
      setFeedback(null);
      setShowHint(false);
    }
  }, [selectedPattern]);

  // Next pattern in category
  const nextPatternInCategory = useCallback(() => {
    if (!selectedPattern || !selectedCategory) return;
    const patterns = positionalPatterns.filter(p => p.category === selectedCategory);
    const currentIndex = patterns.findIndex(p => p.id === selectedPattern.id);
    const nextIndex = (currentIndex + 1) % patterns.length;
    startPattern(patterns[nextIndex]);
  }, [selectedPattern, selectedCategory, startPattern]);

  // Custom square styles
  const customSquareStyles = useMemo(() => ({
    ...optionSquares,
    ...(lastMove && {
      [lastMove.from]: { backgroundColor: 'rgba(168, 85, 247, 0.25)' },
      [lastMove.to]: { backgroundColor: 'rgba(168, 85, 247, 0.4)' },
    }),
    ...(feedback === 'correct' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(34, 197, 94, 0.5)' },
    }),
    ...(feedback === 'incorrect' && lastMove && {
      [lastMove.to]: { backgroundColor: 'rgba(239, 68, 68, 0.5)' },
    }),
  }), [optionSquares, lastMove, feedback]);

  // Custom arrows for learn mode - show the expected move
  const customArrows: [Square, Square, string][] = useMemo(() => {
    if (!selectedPattern || feedback === 'correct') return [];
    
    // Show arrow in learn mode or when hint is requested
    if (practiceMode === 'learn' || showHint) {
      const solution = selectedPattern.solution[0]; // First move
      if (solution) {
        try {
          const tempGame = new Chess(selectedPattern.fen);
          const moveResult = tempGame.move(solution);
          if (moveResult) {
            return [[moveResult.from as Square, moveResult.to as Square, 'rgba(74, 222, 128, 0.8)']];
          }
        } catch {
          // Invalid move notation, skip arrow
        }
      }
    }
    return [];
  }, [selectedPattern, practiceMode, showHint, feedback]);

  // Board orientation based on whose turn
  const boardOrientation = selectedPattern 
    ? (selectedPattern.fen.includes(' w ') ? 'white' : 'black')
    : 'white';

  // ============================================
  // RENDER: CATEGORY SELECTION VIEW
  // ============================================
  if (viewMode === 'categories') {
    const categories = Object.keys(categoryInfo) as PositionalCategory[];
    
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Hero Header */}
        <section className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Positional Patterns
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Master {positionalPatterns.length} essential patterns across {categories.length} strategic concepts
          </p>
        </section>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card">
            <div className="stat-value text-gradient">{positionalPatterns.length}</div>
            <div className="stat-label">Total Patterns</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#4ade80' }}>{overallStats.mastered}</div>
            <div className="stat-label">Mastered</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#f59e0b' }}>{dueCount}</div>
            <div className="stat-label">Due for Review</div>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {categories.map(category => {
            const info = categoryInfo[category];
            const display = CATEGORY_DISPLAY[category];
            const stats = getCategoryStats(category);
            
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setViewMode('patterns');
                }}
                className="card-interactive p-6 text-left group"
                style={{ borderColor: 'transparent' }}
              >
                {/* Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: display.bgColor }}
                  >
                    {info.icon}
                  </div>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    style={{ color: display.color }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium group-hover:text-white transition-colors" style={{ color: 'var(--text-primary)' }}>
                    {info.name}
                  </h3>
                  
                  <p className="text-sm font-display italic" style={{ color: display.color }}>
                    {display.tagline}
                  </p>
                  
                  <p className="text-sm line-clamp-2" style={{ color: 'var(--text-tertiary)' }}>
                    {info.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {stats.total} patterns
                    </span>
                    {stats.mastered > 0 && (
                      <span className="badge badge-green text-xs">
                        {stats.mastered} mastered
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ============================================
  // RENDER: PATTERN LIST VIEW
  // ============================================
  if (viewMode === 'patterns' && selectedCategory) {
    const info = categoryInfo[selectedCategory];
    const display = CATEGORY_DISPLAY[selectedCategory];
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setViewMode('categories')}
            className="hover:text-white transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            Patterns
          </button>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ color: 'var(--text-secondary)' }}>{info.name}</span>
        </div>

        {/* Category Header */}
        <div className="card p-8" style={{ background: display.bgColor, borderColor: `${display.color}33` }}>
          <div className="flex items-start gap-6">
            <div 
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: 'var(--bg-secondary)' }}
            >
              {info.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                {info.name}
              </h1>
              <p className="font-display italic mb-3" style={{ color: display.color }}>
                {display.tagline}
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>{info.description}</p>
              
              {display.legends && display.legends.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Masters:</span>
                  {display.legends.map((legend, i) => (
                    <span key={i} className="badge">{legend}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Patterns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryPatterns.map((pattern, index) => {
            const prog = progress[pattern.id];
            
            return (
              <div key={pattern.id} className="card p-5 hover:border-[var(--border-strong)] transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono"
                      style={{ background: 'var(--bg-elevated)', color: display.color }}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>{pattern.title}</h3>
                      {prog?.mastered && (
                        <span className="text-xs" style={{ color: '#4ade80' }}>✓ Mastered</span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--accent-gold)' }}>
                    {'★'.repeat(pattern.difficulty)}{'☆'.repeat(5 - pattern.difficulty)}
                  </span>
                </div>
                
                <p className="text-xs mb-4 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                  {pattern.concept}
                </p>

                <button
                  onClick={() => startPattern(pattern)}
                  className="btn-secondary w-full text-sm"
                  style={{ borderColor: `${display.color}44`, color: display.color }}
                >
                  Practice →
                </button>
              </div>
            );
          })}
        </div>

        {/* Back button */}
        <button
          onClick={() => setViewMode('categories')}
          className="btn-ghost"
        >
          ← Back to Categories
        </button>
      </div>
    );
  }

  // ============================================
  // RENDER: PRACTICE VIEW
  // ============================================
  if (viewMode === 'practice' && selectedPattern) {
    const info = selectedCategory ? categoryInfo[selectedCategory] : null;
    const display = selectedCategory ? CATEGORY_DISPLAY[selectedCategory] : null;
    const patternProgress = progress[selectedPattern.id];
    const patterns = selectedCategory 
      ? positionalPatterns.filter(p => p.category === selectedCategory)
      : positionalPatterns;
    const currentIndex = patterns.findIndex(p => p.id === selectedPattern.id);
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setViewMode('categories')}
            className="hover:text-white transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            Patterns
          </button>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          {selectedCategory && info && (
            <>
              <button
                onClick={() => setViewMode('patterns')}
                className="hover:text-white transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {info.name}
              </button>
              <span style={{ color: 'var(--text-muted)' }}>/</span>
            </>
          )}
          <span style={{ color: 'var(--text-secondary)' }}>{selectedPattern.title}</span>
        </div>

        <div className="grid lg:grid-cols-[minmax(400px,520px)_380px] gap-8 items-start">
          {/* Board Section */}
          <div className="space-y-4">
            {/* Mode Toggle */}
            <div className="flex items-center gap-4 mb-2">
              <div className="flex rounded-lg p-1" style={{ background: 'var(--bg-elevated)' }}>
                <button
                  onClick={() => setPracticeMode('learn')}
                  className={`px-4 py-2 rounded-md text-sm transition-all ${
                    practiceMode === 'learn'
                      ? 'text-white'
                      : ''
                  }`}
                  style={{ 
                    background: practiceMode === 'learn' ? 'var(--accent-primary)' : 'transparent',
                    color: practiceMode === 'learn' ? 'white' : 'var(--text-tertiary)'
                  }}
                >
                  📖 Learn
                </button>
                <button
                  onClick={() => setPracticeMode('test')}
                  className={`px-4 py-2 rounded-md text-sm transition-all`}
                  style={{ 
                    background: practiceMode === 'test' ? 'var(--accent-primary)' : 'transparent',
                    color: practiceMode === 'test' ? 'white' : 'var(--text-tertiary)'
                  }}
                >
                  🎯 Test
                </button>
              </div>
              
              {streak > 2 && (
                <div className="flex items-center gap-2 text-sm" style={{ color: '#f59e0b' }}>
                  <span>🔥</span>
                  <span>{streak} streak</span>
                </div>
              )}
            </div>

            {/* Chessboard */}
            <div className="relative max-w-[520px]">
              <div className="chessboard-container">
                <Chessboard
                  position={game.fen()}
                  onSquareClick={onSquareClick}
                  onPieceDrop={onDrop}
                  boardOrientation={boardOrientation}
                  customSquareStyles={customSquareStyles}
                  customArrows={customArrows}
                  customDarkSquareStyle={{ backgroundColor: '#7c6b9e' }}
                  customLightSquareStyle={{ backgroundColor: '#e8e4f0' }}
                  animationDuration={150}
                  arePiecesDraggable={feedback !== 'correct'}
                  boardWidth={480}
                />
              </div>
              
              {/* Feedback Overlay */}
              {feedback === 'correct' && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ background: 'rgba(0,0,0,0.75)' }}>
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-display mb-2" style={{ color: '#4ade80' }}>Excellent!</h3>
                    <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>You found the correct move.</p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={resetPattern} className="btn-secondary">
                        Practice Again
                      </button>
                      <button
                        onClick={nextPatternInCategory}
                        className="btn-primary"
                      >
                        Next Pattern →
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
                disabled={showHint || feedback === 'correct'}
                className="btn-secondary flex-1"
              >
                💡 Hint
              </button>
              <button onClick={resetPattern} className="btn-ghost flex-1">
                🔄 Reset
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            {/* Pattern Info */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-display" style={{ color: 'var(--text-primary)' }}>{selectedPattern.title}</h2>
                  {info && display && (
                    <p className="text-sm" style={{ color: display.color }}>{info.icon} {info.name}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs" style={{ color: 'var(--accent-gold)' }}>
                    {'★'.repeat(selectedPattern.difficulty)}{'☆'.repeat(5 - selectedPattern.difficulty)}
                  </span>
                  {patternProgress?.mastered && (
                    <span className="text-xs" style={{ color: '#4ade80' }}>✓ Mastered</span>
                  )}
                </div>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedPattern.concept}</p>
            </div>

            {/* Progress */}
            <div className="card p-6">
              <h4 className="text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Progress</h4>
              
              {/* Progress Bar */}
              <div className="progress-bar mb-3">
                <div 
                  className="progress-bar-fill green"
                  style={{ width: `${((currentIndex + 1) / patterns.length) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between text-sm mb-4">
                <span style={{ color: 'var(--text-tertiary)' }}>Pattern {currentIndex + 1} of {patterns.length}</span>
                <span className="font-mono" style={{ color: 'var(--accent-primary)' }}>
                  {game.turn() === 'w' ? '⬜ White' : '⬛ Black'} to move
                </span>
              </div>

              {/* Hint / Solution */}
              <div className="p-4 rounded-lg" style={{ background: 'var(--bg-elevated)' }}>
                {feedback === 'correct' ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium" style={{ color: '#4ade80' }}>✓ Correct!</p>
                    <p className="font-mono" style={{ color: 'var(--accent-gold)' }}>{selectedPattern.solution[0]}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{selectedPattern.postMoveExplanation || selectedPattern.explanation}</p>
                  </div>
                ) : showHint ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium" style={{ color: '#f59e0b' }}>💡 Hint</p>
                    <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                      {selectedPattern.preMoveHint || `Look for: ${selectedPattern.solution[0]}`}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm italic text-center" style={{ color: 'var(--text-muted)' }}>
                    Find the best move...
                  </p>
                )}
              </div>
            </div>

            {/* SRS Level */}
            {patternProgress && (
              <div className="card p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>SRS Level</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4, 5].map(level => (
                      <div
                        key={level}
                        className="w-3 h-3 rounded-full"
                        style={{ 
                          background: level <= patternProgress.srsLevel 
                            ? '#4ade80' 
                            : 'var(--bg-hover)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Key Concept */}
            <div className="card p-6">
              <h4 className="text-xs uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>Why This Matters</h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {selectedPattern.explanation}
              </p>
              {selectedPattern.source && (
                <p className="text-xs mt-3 italic" style={{ color: 'var(--text-muted)' }}>
                  Source: {selectedPattern.source}
                </p>
              )}
            </div>

            {/* Navigation */}
            <button
              onClick={() => {
                setSelectedPattern(null);
                setViewMode('patterns');
              }}
              className="w-full btn-ghost"
            >
              ← Back to Patterns
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default PatternsManualPage;
