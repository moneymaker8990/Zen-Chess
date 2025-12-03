// ============================================
// SPACED REPETITION PUZZLE TRAINER
// Smart review scheduling for long-term retention
// ============================================

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { useNavigate } from 'react-router-dom';
import { puzzles } from '@/data/puzzles';
import { useBoardSize } from '@/hooks/useBoardSize';
import type { ChessPuzzle } from '@/lib/types';
import { playSmartMoveSound } from '@/lib/soundSystem';
import {
  SRSCard,
  SRSStats,
  SRSDailySettings,
  DEFAULT_SETTINGS,
  createSRSCard,
  calculateNextReview,
  getCardsForToday,
  getNextCardToReview,
  calculateSRSStats,
  getRetentionRate,
  getWeakThemes,
  getForecast,
  assessQuality,
  isDueToday
} from '@/lib/spacedRepetitionSystem';

// ============================================
// TYPES
// ============================================

interface SRSState {
  cards: SRSCard[];
  reviewedToday: string[];
  todayDate: string;
  settings: SRSDailySettings;
  studyStreak: number;
  lastStudyDate: string | null;
}

type ViewMode = 'overview' | 'study' | 'add-cards' | 'settings' | 'stats';

const THEME_LABELS: Record<string, string> = {
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

// ============================================
// MAIN COMPONENT
// ============================================

export function SpacedRepetitionPage() {
  const navigate = useNavigate();
  const boardSize = useBoardSize(480, 32);
  
  // Load state from localStorage
  const [srsState, setSrsState] = useState<SRSState>(() => {
    const saved = localStorage.getItem('zenChessSRSState');
    const today = new Date().toISOString().split('T')[0];
    
    if (saved) {
      const parsed = JSON.parse(saved);
      // Reset daily counts if it's a new day
      if (parsed.todayDate !== today) {
        return {
          ...parsed,
          reviewedToday: [],
          todayDate: today
        };
      }
      return parsed;
    }
    
    return {
      cards: [],
      reviewedToday: [],
      todayDate: today,
      settings: DEFAULT_SETTINGS,
      studyStreak: 0,
      lastStudyDate: null
    };
  });
  
  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  
  // Study session state
  const [currentCard, setCurrentCard] = useState<SRSCard | null>(null);
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [optionSquares, setOptionSquares] = useState<Record<string, { backgroundColor: string }>>({});
  const [moveIndex, setMoveIndex] = useState(0);
  const [solved, setSolved] = useState(false);
  const [failed, setFailed] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [showCorrectFeedback, setShowCorrectFeedback] = useState(false);
  const [isAnimatingSetup, setIsAnimatingSetup] = useState(false);
  
  // Add cards state
  const [selectedPuzzles, setSelectedPuzzles] = useState<Set<string>>(new Set());
  const [filterTheme, setFilterTheme] = useState<string | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<number | null>(null);
  
  // Save state
  useEffect(() => {
    localStorage.setItem('zenChessSRSState', JSON.stringify(srsState));
  }, [srsState]);
  
  // Calculate stats
  const stats = useMemo(() => 
    calculateSRSStats(srsState.cards, srsState.reviewedToday),
    [srsState.cards, srsState.reviewedToday]
  );
  
  const retentionRate = useMemo(() => 
    getRetentionRate(srsState.cards),
    [srsState.cards]
  );
  
  const weakThemes = useMemo(() => 
    getWeakThemes(srsState.cards),
    [srsState.cards]
  );
  
  const forecast = useMemo(() => 
    getForecast(srsState.cards, 7),
    [srsState.cards]
  );
  
  const todayCards = useMemo(() => 
    getCardsForToday(srsState.cards, srsState.settings, srsState.reviewedToday.length),
    [srsState.cards, srsState.settings, srsState.reviewedToday.length]
  );
  
  // Get available puzzles (not already in deck)
  const availablePuzzles = useMemo(() => {
    const cardIds = new Set(srsState.cards.map(c => c.id));
    let available = puzzles.filter(p => !cardIds.has(p.id));
    
    if (filterTheme) {
      available = available.filter(p => p.themes.includes(filterTheme as any));
    }
    if (filterDifficulty) {
      available = available.filter(p => p.difficulty === filterDifficulty);
    }
    
    return available;
  }, [srsState.cards, filterTheme, filterDifficulty]);
  
  // Load a card with setup animation (shows opponent's last move)
  const loadCardWithSetup = useCallback((card: SRSCard) => {
    setCurrentCard(card);
    setMoveIndex(0);
    setSolved(false);
    setFailed(false);
    setShowAnswer(false);
    setHintsUsed(0);
    setMoveFrom(null);
    setOptionSquares({});
    setShowCorrectFeedback(false);
    
    // If the card has setup move data, animate the opponent's last move
    if (card.beforeFen && card.setupMove) {
      setIsAnimatingSetup(true);
      // Start with position before opponent's move
      setGame(new Chess(card.beforeFen));
      setLastMove(null);
      
      // After a brief moment, show the opponent making their move
      setTimeout(() => {
        setGame(new Chess(card.fen));
        // Highlight the opponent's last move
        setLastMove({
          from: card.setupMove!.from as Square,
          to: card.setupMove!.to as Square
        });
        setIsAnimatingSetup(false);
        setStartTime(Date.now());
      }, 600);
    } else {
      // No setup move - just show the puzzle position
      setGame(new Chess(card.fen));
      setLastMove(null);
      setIsAnimatingSetup(false);
      setStartTime(Date.now());
    }
  }, []);

  // Start study session
  const startStudy = useCallback(() => {
    const nextCard = getNextCardToReview(srsState.cards, srsState.settings);
    if (nextCard) {
      loadCardWithSetup(nextCard);
      setViewMode('study');
    }
  }, [srsState.cards, srsState.settings, loadCardWithSetup]);
  
  // Handle move
  const handleMove = useCallback((from: Square, to: Square): boolean => {
    if (!currentCard || solved || failed) return false;
    
    const gameCopy = new Chess(game.fen());
    try {
      const isCapture = !!gameCopy.get(to);
      const result = gameCopy.move({ from, to, promotion: 'q' });
      if (!result) return false;
      
      const expectedMove = currentCard.solution[moveIndex];
      const isCorrect = result.san === expectedMove || 
        `${from}${to}` === expectedMove ||
        result.san.replace(/[+#]/g, '') === expectedMove?.replace(/[+#]/g, '');
      
      if (isCorrect) {
        // Preserve scroll position
        const scrollY = window.scrollY;
        
        playSmartMoveSound(gameCopy, result, { isCapture });
        setGame(gameCopy);
        setLastMove({ from, to });
        setShowCorrectFeedback(true);
        setTimeout(() => setShowCorrectFeedback(false), 800);
        
        // Restore scroll position
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
        
        if (moveIndex + 1 >= currentCard.solution.length) {
          // Puzzle complete!
          setSolved(true);
          setSessionStats(prev => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
        } else {
          // Next move
          setMoveIndex(prev => prev + 1);
          
          // Play opponent's response if exists
          if (moveIndex + 1 < currentCard.solution.length) {
            setTimeout(() => {
              const opponentMove = currentCard.solution[moveIndex + 1];
              if (opponentMove) {
                const responseGame = new Chess(gameCopy.fen());
                const opponentCapture = !!responseGame.get(opponentMove.slice(2, 4) as Square);
                const response = responseGame.move(opponentMove);
                if (response) {
                  // Preserve scroll position
                  const scrollY = window.scrollY;
                  
                  playSmartMoveSound(responseGame, response, { isCapture: opponentCapture });
                  setGame(responseGame);
                  setLastMove({ from: response.from as Square, to: response.to as Square });
                  
                  // Restore scroll position
                  requestAnimationFrame(() => window.scrollTo(0, scrollY));
                }
                setMoveIndex(prev => prev + 1);
              }
            }, 300);
          }
        }
        return true;
      } else {
        // Wrong move - gentle feedback, no shake
        setFailed(true);
        setSessionStats(prev => ({ ...prev, incorrect: prev.incorrect + 1, total: prev.total + 1 }));
        return false;
      }
    } catch {
      return false;
    }
  }, [currentCard, game, moveIndex, solved, failed]);
  
  // Handle review result
  const handleReviewResult = useCallback((quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    if (!currentCard) return;
    
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const result = { quality, timeSpent, hintsUsed };
    const updates = calculateNextReview(currentCard, result, srsState.settings);
    
    setSrsState(prev => ({
      ...prev,
      cards: prev.cards.map(c => 
        c.id === currentCard.id ? { ...c, ...updates } : c
      ),
      reviewedToday: [...prev.reviewedToday, currentCard.id]
    }));
    
    // Load next card
    setTimeout(() => {
      const nextCard = getNextCardToReview(
        srsState.cards.map(c => c.id === currentCard.id ? { ...c, ...updates } : c),
        srsState.settings
      );
      
      if (nextCard && nextCard.id !== currentCard.id) {
        loadCardWithSetup(nextCard);
      } else {
        // No more cards
        setViewMode('overview');
      }
    }, 500);
  }, [currentCard, startTime, hintsUsed, srsState.settings, srsState.cards, loadCardWithSetup]);
  
  // Square click handler
  const onSquareClick = useCallback((square: Square) => {
    if (isAnimatingSetup || solved || failed) return;
    
    if (!moveFrom) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setMoveFrom(square);
        const moves = game.moves({ square, verbose: true });
        const newSquares: Record<string, { backgroundColor: string }> = {};
        moves.forEach(move => {
          newSquares[move.to] = { backgroundColor: 'rgba(129, 182, 76, 0.4)' };
        });
        newSquares[square] = { backgroundColor: 'rgba(129, 182, 76, 0.5)' };
        setOptionSquares(newSquares);
      }
      return;
    }
    
    handleMove(moveFrom, square);
    setMoveFrom(null);
    setOptionSquares({});
  }, [game, moveFrom, isAnimatingSetup, solved, failed, handleMove]);
  
  // Add puzzles to deck
  const addPuzzlesToDeck = useCallback(() => {
    const newCards: SRSCard[] = [];
    
    selectedPuzzles.forEach(puzzleId => {
      const puzzle = puzzles.find(p => p.id === puzzleId);
      if (puzzle) {
        newCards.push(createSRSCard(
          puzzle.id,
          puzzle.fen,
          puzzle.solution,
          puzzle.themes,
          puzzle.difficulty,
          puzzle.beforeFen,
          puzzle.setupMove
        ));
      }
    });
    
    setSrsState(prev => ({
      ...prev,
      cards: [...prev.cards, ...newCards]
    }));
    
    setSelectedPuzzles(new Set());
    setViewMode('overview');
  }, [selectedPuzzles]);
  
  // ============================================
  // RENDER: OVERVIEW
  // ============================================
  if (viewMode === 'overview') {
    const totalDue = todayCards.newCards.length + todayCards.reviewCards.length + todayCards.learningCards.length;
    
    return (
      <div className="space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
        {/* Header */}
        <header>
          <div className="flex items-center gap-2 text-sm mb-4">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
              Home
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>Spaced Repetition</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            🧠 Spaced Repetition
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Smart scheduling for long-term pattern retention
          </p>
        </header>
        
        {/* Today's Summary */}
        <div className="card p-6" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.05))' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-display mb-1" style={{ color: 'var(--text-primary)' }}>
                Today's Review
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {srsState.reviewedToday.length} completed • {totalDue} remaining
              </p>
            </div>
            {totalDue > 0 ? (
              <button onClick={startStudy} className="btn-primary text-lg px-6">
                Start Review ({totalDue})
              </button>
            ) : (
              <div className="text-center">
                <span className="text-2xl">✅</span>
                <p className="text-sm" style={{ color: '#4ade80' }}>All done for today!</p>
              </div>
            )}
          </div>
          
          {/* Due breakdown */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="text-2xl font-bold" style={{ color: '#4ade80' }}>
                {todayCards.newCards.length}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>New</div>
            </div>
            <div className="text-center p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="text-2xl font-bold" style={{ color: '#f59e0b' }}>
                {todayCards.learningCards.length}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Learning</div>
            </div>
            <div className="text-center p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
              <div className="text-2xl font-bold" style={{ color: '#a855f7' }}>
                {todayCards.reviewCards.length}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Review</div>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="stat-value text-gradient">{stats.totalCards}</div>
            <div className="stat-label">Total Cards</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#4ade80' }}>{retentionRate}%</div>
            <div className="stat-label">Retention Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#f59e0b' }}>{stats.masteredCards}</div>
            <div className="stat-label">Mastered</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#ec4899' }}>🔥 {srsState.studyStreak}</div>
            <div className="stat-label">Streak Days</div>
          </div>
        </div>
        
        {/* 7-Day Forecast */}
        <div className="card p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
            7-Day Forecast
          </h3>
          <div className="flex items-end gap-2 h-32">
            {forecast.map((count, i) => {
              const maxCount = Math.max(...forecast, 1);
              const height = (count / maxCount) * 100;
              const days = ['Today', 'Tom', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full rounded-t transition-all"
                    style={{ 
                      height: `${height}%`,
                      minHeight: count > 0 ? '8px' : '2px',
                      background: i === 0 ? '#a855f7' : 'var(--bg-hover)'
                    }}
                  />
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {count}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {days[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Weak Themes */}
        {weakThemes.length > 0 && (
          <div className="card p-6" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
            <h3 className="text-sm uppercase tracking-wider mb-3" style={{ color: '#ef4444' }}>
              ⚠️ Themes Needing Work
            </h3>
            <div className="flex flex-wrap gap-2">
              {weakThemes.map(theme => (
                <span key={theme} className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
                  {THEME_LABELS[theme] || theme}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Deck Status */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Deck Status
            </h3>
            <button 
              onClick={() => setViewMode('add-cards')}
              className="btn-secondary text-sm"
            >
              + Add Puzzles
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold" style={{ color: '#4ade80' }}>{stats.newCards}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>New</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold" style={{ color: '#f59e0b' }}>{stats.learningCards}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Learning</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold" style={{ color: '#a855f7' }}>{stats.reviewCards}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Review</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold" style={{ color: '#06b6d4' }}>{stats.masteredCards}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Mastered</div>
            </div>
          </div>
        </div>
        
        {/* How It Works */}
        {srsState.cards.length === 0 && (
          <div className="card p-6">
            <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
              How Spaced Repetition Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                  1
                </div>
                <div>
                  <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Add Puzzles</div>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    Build your deck with puzzles you want to master
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                  2
                </div>
                <div>
                  <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Review Daily</div>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    Puzzles appear right when you're about to forget them
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                  3
                </div>
                <div>
                  <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Master Patterns</div>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                    Build permanent tactical pattern recognition
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setViewMode('add-cards')}
              className="btn-primary w-full mt-6"
            >
              Get Started - Add Your First Puzzles
            </button>
          </div>
        )}
      </div>
    );
  }
  
  // ============================================
  // RENDER: STUDY SESSION
  // ============================================
  if (viewMode === 'study' && currentCard) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧠</span>
            <div>
              <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>Spaced Review</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {sessionStats.correct}/{sessionStats.total} correct
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="badge" style={{ 
              background: currentCard.status === 'new' ? '#4ade8030' : 
                         currentCard.status === 'learning' ? '#f59e0b30' : '#a855f730',
              color: currentCard.status === 'new' ? '#4ade80' : 
                     currentCard.status === 'learning' ? '#f59e0b' : '#a855f7'
            }}>
              {currentCard.status}
            </span>
            <button onClick={() => setViewMode('overview')} className="btn-ghost">
              End Session
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 px-2 sm:px-0">
          {/* Board */}
          <div className="relative flex justify-center">
            <Chessboard
              position={game.fen()}
              onSquareClick={onSquareClick}
              boardOrientation={game.turn() === 'w' ? 'white' : 'black'}
              customDarkSquareStyle={{ backgroundColor: '#779556' }}
              customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
              customSquareStyles={{
                ...optionSquares,
                ...(lastMove && {
                  [lastMove.from]: { backgroundColor: 'rgba(147, 112, 219, 0.25)' },
                  [lastMove.to]: { backgroundColor: showCorrectFeedback ? 'rgba(34, 197, 94, 0.6)' : 'rgba(147, 112, 219, 0.4)' },
                }),
                ...(solved && lastMove && {
                  [lastMove.to]: { backgroundColor: 'rgba(34, 197, 94, 0.5)' },
                })
              }}
              arePiecesDraggable={!isAnimatingSetup && !solved && !failed}
              onPieceDrop={(from, to) => handleMove(from as Square, to as Square)}
              boardWidth={boardSize}
            />
            
            {/* Correct Move Feedback */}
            {showCorrectFeedback && !solved && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full animate-bounce-in" 
                   style={{ background: 'rgba(34, 197, 94, 0.9)', boxShadow: '0 4px 20px rgba(34, 197, 94, 0.5)' }}>
                <span className="text-white font-bold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  Correct!
                </span>
              </div>
            )}
            
            {/* Puzzle Solved Overlay */}
            {solved && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ background: 'rgba(0,0,0,0.7)' }}>
                <div className="text-center p-6 animate-scale-in">
                  <div className="text-5xl mb-3">✨</div>
                  <h3 className="text-xl font-display font-bold mb-1" style={{ color: '#4ade80' }}>Excellent!</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Rate your confidence below</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Info Panel */}
          <div className="space-y-4">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {game.turn() === 'w' ? '⬜ White' : '⬛ Black'} to move
                </h3>
                <span style={{ color: '#f59e0b' }}>
                  {'★'.repeat(currentCard.difficulty)}{'☆'.repeat(5 - currentCard.difficulty)}
                </span>
              </div>
              
              {/* Themes */}
              <div className="flex flex-wrap gap-2 mb-4">
                {currentCard.themes.map(theme => (
                  <span key={theme} className="badge">
                    {THEME_LABELS[theme] || theme}
                  </span>
                ))}
              </div>
              
              {/* Card stats */}
              <div className="flex gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                <span>Reviews: {currentCard.totalReviews}</span>
                <span>Streak: {currentCard.streak}</span>
                {currentCard.fastestTime !== Infinity && (
                  <span>Best: {currentCard.fastestTime}s</span>
                )}
              </div>
            </div>
            
            {/* Controls */}
            {!solved && !failed && (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setHintsUsed(prev => prev + 1);
                    // Show first move of solution as hint
                    alert(`Hint: Consider ${currentCard.solution[moveIndex]}`);
                  }}
                  className="btn-secondary flex-1"
                >
                  💡 Hint ({hintsUsed})
                </button>
                <button
                  onClick={() => {
                    setShowAnswer(true);
                    setFailed(true);
                  }}
                  className="btn-ghost flex-1"
                >
                  Show Answer
                </button>
              </div>
            )}
            
            {/* Result */}
            {(solved || failed) && (
              <div className="card p-6" style={{ background: solved ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}>
                <div className="flex items-center gap-2 mb-4">
                  {solved ? (
                    <>
                      <span className="text-2xl">✅</span>
                      <span className="font-medium" style={{ color: '#4ade80' }}>Correct!</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">❌</span>
                      <span className="font-medium" style={{ color: '#ef4444' }}>Incorrect</span>
                    </>
                  )}
                </div>
                
                {showAnswer && (
                  <div className="mb-4 p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Solution: {currentCard.solution.join(' → ')}
                    </p>
                  </div>
                )}
                
                <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
                  How did that feel?
                </p>
                
                {solved ? (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleReviewResult(3)}
                      className="p-3 rounded-lg text-sm transition-all hover:scale-105"
                      style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                    >
                      Hard
                    </button>
                    <button
                      onClick={() => handleReviewResult(4)}
                      className="p-3 rounded-lg text-sm transition-all hover:scale-105"
                      style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80' }}
                    >
                      Good
                    </button>
                    <button
                      onClick={() => handleReviewResult(5)}
                      className="p-3 rounded-lg text-sm transition-all hover:scale-105"
                      style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4' }}
                    >
                      Easy
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleReviewResult(1)}
                      className="p-3 rounded-lg text-sm transition-all hover:scale-105"
                      style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
                    >
                      Again
                    </button>
                    <button
                      onClick={() => handleReviewResult(2)}
                      className="p-3 rounded-lg text-sm transition-all hover:scale-105"
                      style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}
                    >
                      Hard
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: ADD CARDS
  // ============================================
  if (viewMode === 'add-cards') {
    const themes = Object.keys(THEME_LABELS);
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display" style={{ color: 'var(--text-primary)' }}>
              Add Puzzles to Deck
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {selectedPuzzles.size} selected • {availablePuzzles.length} available
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setViewMode('overview')} className="btn-ghost">
              Cancel
            </button>
            <button 
              onClick={addPuzzlesToDeck}
              disabled={selectedPuzzles.size === 0}
              className="btn-primary"
            >
              Add {selectedPuzzles.size} Puzzles
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="card p-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-xs mb-1 block" style={{ color: 'var(--text-muted)' }}>Theme</label>
              <select
                value={filterTheme || ''}
                onChange={(e) => setFilterTheme(e.target.value || null)}
                className="px-3 py-2 rounded-lg text-sm"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option value="">All Themes</option>
                {themes.map(theme => (
                  <option key={theme} value={theme}>{THEME_LABELS[theme]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: 'var(--text-muted)' }}>Difficulty</label>
              <select
                value={filterDifficulty || ''}
                onChange={(e) => setFilterDifficulty(e.target.value ? parseInt(e.target.value) : null)}
                className="px-3 py-2 rounded-lg text-sm"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option value="">All Difficulties</option>
                {[1, 2, 3, 4, 5].map(d => (
                  <option key={d} value={d}>{'★'.repeat(d)}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  const newSelected = new Set(selectedPuzzles);
                  availablePuzzles.slice(0, 10).forEach(p => newSelected.add(p.id));
                  setSelectedPuzzles(newSelected);
                }}
                className="btn-secondary text-sm"
              >
                Select First 10
              </button>
            </div>
          </div>
        </div>
        
        {/* Puzzle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto">
          {availablePuzzles.slice(0, 50).map(puzzle => {
            const isSelected = selectedPuzzles.has(puzzle.id);
            
            return (
              <button
                key={puzzle.id}
                onClick={() => {
                  const newSelected = new Set(selectedPuzzles);
                  if (isSelected) {
                    newSelected.delete(puzzle.id);
                  } else {
                    newSelected.add(puzzle.id);
                  }
                  setSelectedPuzzles(newSelected);
                }}
                className={`card p-4 text-left transition-all ${isSelected ? 'ring-2' : ''}`}
                style={{ borderColor: isSelected ? 'var(--accent-primary)' : 'transparent' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex flex-wrap gap-1">
                    {puzzle.themes.slice(0, 2).map(theme => (
                      <span key={theme} className="badge text-xs">
                        {THEME_LABELS[theme] || theme}
                      </span>
                    ))}
                  </div>
                  <span style={{ color: '#f59e0b' }}>
                    {'★'.repeat(puzzle.difficulty)}
                  </span>
                </div>
                <div className="text-sm font-mono truncate" style={{ color: 'var(--text-muted)' }}>
                  {puzzle.id}
                </div>
                {isSelected && (
                  <div className="mt-2 text-sm" style={{ color: '#4ade80' }}>
                    ✓ Selected
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {availablePuzzles.length > 50 && (
          <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
            Showing 50 of {availablePuzzles.length} puzzles. Use filters to narrow down.
          </p>
        )}
      </div>
    );
  }
  
  return null;
}

export default SpacedRepetitionPage;

