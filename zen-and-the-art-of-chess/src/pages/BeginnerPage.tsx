import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Chess, Square } from 'chess.js';
import { ZenChessboard } from '@/components/ZenChessboard';
import { BackButton } from '@/components/BackButton';

// ============================================
// BEGINNER PAGE - STATE OF THE ART LEARNING
// Interactive tutorials, challenges, and guided learning
// ============================================

// ============================================
// TYPES
// ============================================

type LearningSection = 'welcome' | 'pieces' | 'practice' | 'checkmate' | 'next';

interface PieceLesson {
  id: string;
  name: string;
  symbol: string;
  whiteSymbol: string;
  blackSymbol: string;
  value: string;
  description: string;
  howItMoves: string;
  tips: string[];
  // Board setup for demonstrating movement
  demoFen: string;
  // Square to highlight as the piece location
  pieceSquare: Square;
  // Squares the piece can move to (for highlighting)
  validMoves: Square[];
  // Optional: squares the piece can capture
  captureSquares?: Square[];
  // Mini-challenge
  challenge: {
    instruction: string;
    startFen: string;
    targetSquare: Square;
    pieceSquare: Square;
  };
}

interface CheckmateExample {
  id: string;
  name: string;
  description: string;
  fen: string;
  solution: string;
  explanation: string;
}

// ============================================
// PIECE LESSONS DATA
// ============================================

const PIECE_LESSONS: PieceLesson[] = [
  {
    id: 'king',
    name: 'King',
    symbol: '♔',
    whiteSymbol: '♔',
    blackSymbol: '♚',
    value: '∞',
    description: 'The King is the most important piece—if it\'s checkmated, you lose! Protect it at all costs.',
    howItMoves: 'The King moves one square in any direction: horizontally, vertically, or diagonally.',
    tips: [
      'Keep your King safe behind pawns in the early game',
      'Castle early to protect your King',
      'In the endgame, the King becomes a fighting piece!'
    ],
    demoFen: '8/8/8/8/3K4/8/8/8 w - - 0 1',
    pieceSquare: 'd4',
    validMoves: ['c3', 'c4', 'c5', 'd3', 'd5', 'e3', 'e4', 'e5'],
    challenge: {
      instruction: 'Move the King to the green square!',
      startFen: '8/8/8/8/8/8/8/K7 w - - 0 1',
      targetSquare: 'b2',
      pieceSquare: 'a1'
    }
  },
  {
    id: 'queen',
    name: 'Queen',
    symbol: '♕',
    whiteSymbol: '♕',
    blackSymbol: '♛',
    value: '9',
    description: 'The Queen is the most powerful piece! She combines the powers of the Rook and Bishop.',
    howItMoves: 'The Queen moves any number of squares horizontally, vertically, or diagonally.',
    tips: [
      'Don\'t bring your Queen out too early—she can be chased by smaller pieces',
      'The Queen is worth about 9 pawns',
      'Use her power in the middlegame and endgame'
    ],
    demoFen: '8/8/8/8/3Q4/8/8/8 w - - 0 1',
    pieceSquare: 'd4',
    validMoves: ['a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8', 'a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4', 'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8', 'a7', 'b6', 'c5', 'e3', 'f2', 'g1'],
    challenge: {
      instruction: 'Capture the black pawn with your Queen!',
      startFen: '8/8/8/3p4/8/8/8/Q7 w - - 0 1',
      targetSquare: 'd5',
      pieceSquare: 'a1'
    }
  },
  {
    id: 'rook',
    name: 'Rook',
    symbol: '♖',
    whiteSymbol: '♖',
    blackSymbol: '♜',
    value: '5',
    description: 'The Rook is a powerful piece that dominates open files and ranks.',
    howItMoves: 'The Rook moves any number of squares horizontally or vertically (not diagonally).',
    tips: [
      'Rooks love open files (columns with no pawns)',
      'Connect your Rooks by castling and clearing pieces between them',
      'Rooks are very powerful in the endgame'
    ],
    demoFen: '8/8/8/8/3R4/8/8/8 w - - 0 1',
    pieceSquare: 'd4',
    validMoves: ['a4', 'b4', 'c4', 'e4', 'f4', 'g4', 'h4', 'd1', 'd2', 'd3', 'd5', 'd6', 'd7', 'd8'],
    challenge: {
      instruction: 'Move the Rook to attack the black King!',
      startFen: '4k3/8/8/8/8/8/8/R7 w - - 0 1',
      targetSquare: 'e1',
      pieceSquare: 'a1'
    }
  },
  {
    id: 'bishop',
    name: 'Bishop',
    symbol: '♗',
    whiteSymbol: '♗',
    blackSymbol: '♝',
    value: '3',
    description: 'Bishops are long-range pieces that control diagonals. Each Bishop stays on one color forever!',
    howItMoves: 'The Bishop moves any number of squares diagonally only.',
    tips: [
      'You have one light-squared and one dark-squared Bishop',
      'Bishops are strongest on open diagonals',
      'A "Bishop pair" (both Bishops) is very powerful'
    ],
    demoFen: '8/8/8/8/3B4/8/8/8 w - - 0 1',
    pieceSquare: 'd4',
    validMoves: ['a1', 'b2', 'c3', 'e5', 'f6', 'g7', 'h8', 'a7', 'b6', 'c5', 'e3', 'f2', 'g1'],
    challenge: {
      instruction: 'Capture the black Knight with your Bishop!',
      startFen: '8/8/5n2/8/8/8/8/B7 w - - 0 1',
      targetSquare: 'f6',
      pieceSquare: 'a1'
    }
  },
  {
    id: 'knight',
    name: 'Knight',
    symbol: '♘',
    whiteSymbol: '♘',
    blackSymbol: '♞',
    value: '3',
    description: 'The Knight is unique—it\'s the only piece that can jump over others!',
    howItMoves: 'The Knight moves in an "L" shape: 2 squares in one direction, then 1 square perpendicular.',
    tips: [
      'Knights can jump over pieces—use this to your advantage!',
      'Knights are strongest in the center of the board',
      '"A Knight on the rim is dim"—keep them off the edge'
    ],
    demoFen: '8/8/8/8/3N4/8/8/8 w - - 0 1',
    pieceSquare: 'd4',
    validMoves: ['b3', 'b5', 'c2', 'c6', 'e2', 'e6', 'f3', 'f5'],
    challenge: {
      instruction: 'Jump the Knight to the green square!',
      startFen: '8/8/8/8/8/8/8/N7 w - - 0 1',
      targetSquare: 'c2',
      pieceSquare: 'a1'
    }
  },
  {
    id: 'pawn',
    name: 'Pawn',
    symbol: '♙',
    whiteSymbol: '♙',
    blackSymbol: '♟',
    value: '1',
    description: 'Pawns are the soul of chess! They\'re humble but can become Queens through promotion.',
    howItMoves: 'Pawns move forward one square (or two from their starting position). They capture diagonally.',
    tips: [
      'Pawns can move 2 squares on their first move',
      'When a pawn reaches the other side, it promotes to any piece (usually Queen)!',
      'Pawns capture diagonally, not straight ahead'
    ],
    demoFen: '8/8/8/8/8/8/3P4/8 w - - 0 1',
    pieceSquare: 'd2',
    validMoves: ['d3', 'd4'],
    challenge: {
      instruction: 'Advance the pawn two squares!',
      startFen: '8/8/8/8/8/8/4P3/8 w - - 0 1',
      targetSquare: 'e4',
      pieceSquare: 'e2'
    }
  }
];

// ============================================
// CHECKMATE EXAMPLES
// ============================================

const CHECKMATE_EXAMPLES: CheckmateExample[] = [
  {
    id: 'back-rank',
    name: 'Back Rank Mate',
    description: 'When the King is trapped on the back rank by its own pawns!',
    fen: '6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1',
    solution: 'Ra8#',
    explanation: 'The Rook delivers checkmate because the King cannot escape—its own pawns block it!'
  },
  {
    id: 'queen-ladder',
    name: 'Queen & King Checkmate',
    description: 'The basic checkmate pattern with King and Queen vs lone King.',
    fen: '8/8/8/8/8/1k6/8/KQ6 w - - 0 1',
    solution: 'Qb2#',
    explanation: 'The Queen controls the escape squares while the white King supports her.'
  },
  {
    id: 'two-rooks',
    name: 'Ladder Mate',
    description: 'Two Rooks working together to push the King to the edge.',
    fen: '8/8/8/8/8/k7/8/KRR5 w - - 0 1',
    solution: 'Ra3#',
    explanation: 'The Rooks take turns controlling ranks, pushing the King to the edge.'
  }
];

// ============================================
// BEGINNER PROGRESS STORAGE
// ============================================

const STORAGE_KEY = 'zen-chess-beginner-progress';

interface BeginnerProgress {
  completedLessons: string[];
  completedChallenges: string[];
  viewedCheckmates: string[];
  lastSection: LearningSection;
}

function loadProgress(): BeginnerProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return {
    completedLessons: [],
    completedChallenges: [],
    viewedCheckmates: [],
    lastSection: 'welcome'
  };
}

function saveProgress(progress: BeginnerProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch { /* ignore */ }
}

// ============================================
// MAIN COMPONENT
// ============================================

export function BeginnerPage() {
  const navigate = useNavigate();

  // Progress tracking
  const [progress, setProgress] = useState<BeginnerProgress>(() => loadProgress());

  // Navigation state
  const [activeSection, setActiveSection] = useState<LearningSection>('welcome');
  const [selectedPiece, setSelectedPiece] = useState<PieceLesson | null>(null);
  const [selectedCheckmate, setSelectedCheckmate] = useState<CheckmateExample | null>(null);

  // Interactive board state
  const [practiceGame, setPracticeGame] = useState(() => new Chess());
  const [challengeGame, setChallengeGame] = useState<Chess | null>(null);
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Save progress when it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Mark lesson as completed
  const completeLesson = useCallback((lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId]
    }));
  }, []);

  // Mark challenge as completed
  const completeChallenge = useCallback((challengeId: string) => {
    setProgress(prev => ({
      ...prev,
      completedChallenges: prev.completedChallenges.includes(challengeId)
        ? prev.completedChallenges
        : [...prev.completedChallenges, challengeId]
    }));
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  }, []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const totalItems = PIECE_LESSONS.length * 2 + CHECKMATE_EXAMPLES.length; // lessons + challenges + checkmates
    const completed = progress.completedLessons.length + progress.completedChallenges.length + progress.viewedCheckmates.length;
    return Math.round((completed / totalItems) * 100);
  }, [progress]);

  // Handle practice board moves
  const handlePracticeMove = useCallback((from: string, to: string) => {
    try {
      const gameCopy = new Chess(practiceGame.fen());
      const move = gameCopy.move({ from, to, promotion: 'q' });
      if (move) {
        setPracticeGame(gameCopy);
        return true;
      }
    } catch { /* invalid move */ }
    return false;
  }, [practiceGame]);

  // Handle challenge moves
  const handleChallengeMove = useCallback((from: string, to: string) => {
    if (!challengeGame || !selectedPiece || challengeComplete) return false;

    try {
      const gameCopy = new Chess(challengeGame.fen());
      const move = gameCopy.move({ from, to, promotion: 'q' });
      if (move) {
        setChallengeGame(gameCopy);
        // Check if the piece reached the target
        if (to === selectedPiece.challenge.targetSquare) {
          setChallengeComplete(true);
          completeChallenge(selectedPiece.id);
        }
        return true;
      }
    } catch { /* invalid move */ }
    return false;
  }, [challengeGame, selectedPiece, challengeComplete, completeChallenge]);

  // Start a challenge
  const startChallenge = useCallback((piece: PieceLesson) => {
    setChallengeGame(new Chess(piece.challenge.startFen));
    setChallengeComplete(false);
  }, []);

  // Reset practice board
  const resetPractice = useCallback(() => {
    setPracticeGame(new Chess());
  }, []);

  // Select a piece to learn about
  const selectPiece = useCallback((piece: PieceLesson) => {
    setSelectedPiece(piece);
    completeLesson(piece.id);
    startChallenge(piece);
  }, [completeLesson, startChallenge]);

  // Build highlight squares for piece movement demo
  const getDemoHighlights = useCallback((piece: PieceLesson): Record<string, React.CSSProperties> => {
    const highlights: Record<string, React.CSSProperties> = {};
    // Highlight the piece's square
    highlights[piece.pieceSquare] = { backgroundColor: 'rgba(168, 85, 247, 0.5)' };
    // Highlight valid move squares
    piece.validMoves.forEach(sq => {
      highlights[sq] = { backgroundColor: 'rgba(74, 222, 128, 0.4)' };
    });
    // Highlight capture squares differently
    piece.captureSquares?.forEach(sq => {
      highlights[sq] = { backgroundColor: 'rgba(239, 68, 68, 0.4)' };
    });
    return highlights;
  }, []);

  // Build highlight squares for challenge
  const getChallengeHighlights = useCallback((): Record<string, React.CSSProperties> => {
    if (!selectedPiece || challengeComplete) return {};
    return {
      [selectedPiece.challenge.targetSquare]: { backgroundColor: 'rgba(74, 222, 128, 0.5)' }
    };
  }, [selectedPiece, challengeComplete]);

  // ============================================
  // RENDER SECTIONS
  // ============================================

  // Welcome Section
  const renderWelcome = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Hero */}
      <div
        className="relative py-10 sm:py-16 rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)',
          border: '1px solid rgba(74, 222, 128, 0.2)'
        }}
      >
        {/* Decorative pieces */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-4 left-8 text-6xl sm:text-8xl transform -rotate-12">♔</div>
          <div className="absolute top-12 right-12 text-5xl sm:text-7xl transform rotate-6">♘</div>
          <div className="absolute bottom-4 left-1/4 text-4xl sm:text-6xl">♙</div>
          <div className="absolute bottom-8 right-1/3 text-5xl sm:text-7xl transform -rotate-6">♗</div>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80' }}
          >
            <span className="text-lg">🌱</span>
            <span>Perfect for absolute beginners</span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Welcome to Chess!
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
            Chess is a beautiful game of strategy and creativity that has fascinated minds for over 1,500 years.
            Let's start your journey together—no pressure, no rush.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveSection('pieces')}
              className="px-8 py-4 rounded-2xl text-lg font-semibold text-white transition-all hover:scale-105 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
            >
              Start Learning →
            </button>
            <button
              onClick={() => setActiveSection('practice')}
              className="px-8 py-4 rounded-2xl text-lg font-medium transition-all hover:scale-105"
              style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}
            >
              Try the Board First
            </button>
          </div>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: '♟️', title: 'The Pieces', desc: 'Learn how each of the 6 unique pieces moves' },
          { icon: '🎯', title: 'The Goal', desc: 'Understand checkmate and how to win' },
          { icon: '🧠', title: 'Basic Strategy', desc: 'Simple tips to improve your game' }
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="p-6 rounded-2xl text-center"
            style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Facts */}
      <div
        className="p-6 rounded-2xl"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Quick Facts About Chess
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { fact: '8×8 = 64 squares', detail: 'The board has 64 squares (32 light, 32 dark)' },
            { fact: '16 pieces each', detail: 'Each player starts with 16 pieces' },
            { fact: 'White moves first', detail: 'White always makes the first move' },
            { fact: 'Goal: Checkmate', detail: 'Trap the enemy King to win!' }
          ].map(item => (
            <div key={item.fact} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-2" style={{ background: '#4ade80' }} />
              <div>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.fact}</span>
                <span className="text-sm ml-2" style={{ color: 'var(--text-muted)' }}>— {item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // Pieces Section
  const renderPieces = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
            Learn the Pieces
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Click on any piece to learn how it moves and try a mini-challenge!
          </p>
        </div>
        <div className="text-sm" style={{ color: '#4ade80' }}>
          {progress.completedLessons.length}/{PIECE_LESSONS.length} completed
        </div>
      </div>

      {/* Piece Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {PIECE_LESSONS.map((piece) => {
          const isCompleted = progress.completedLessons.includes(piece.id);
          const isSelected = selectedPiece?.id === piece.id;

          return (
            <motion.button
              key={piece.id}
              onClick={() => selectPiece(piece)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl text-center transition-all ${
                isSelected ? 'ring-2 ring-green-500' : ''
              }`}
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)'
                  : 'var(--bg-elevated)',
                border: `1px solid ${isSelected ? 'rgba(74, 222, 128, 0.3)' : 'var(--border-subtle)'}`
              }}
            >
              {isCompleted && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80' }}>
                  ✓
                </div>
              )}
              <div className="text-5xl mb-3">{piece.symbol}</div>
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>{piece.name}</h3>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                Value: {piece.value} {piece.value !== '∞' && 'points'}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Piece Detail */}
      <AnimatePresence mode="wait">
        {selectedPiece && (
          <motion.div
            key={selectedPiece.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="p-6 rounded-2xl space-y-6"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
            >
              {/* Piece Info */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Movement Demo Board */}
                <div className="lg:w-1/2">
                  <h4 className="text-sm font-medium uppercase tracking-wider mb-3" style={{ color: '#4ade80' }}>
                    How the {selectedPiece.name} Moves
                  </h4>
                  <div className="board-container max-w-[300px] mx-auto lg:mx-0">
                    <div className="board-wrapper">
                      <ZenChessboard
                        position={selectedPiece.demoFen}
                        orientation="white"
                        arePiecesDraggable={false}
                        highlightSquares={getDemoHighlights(selectedPiece)}
                        mode="learning"
                        ariaLabel={`${selectedPiece.name} movement demonstration`}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-center mt-2" style={{ color: 'var(--text-tertiary)' }}>
                    <span style={{ color: 'rgba(168, 85, 247, 0.8)' }}>■</span> Piece location
                    <span className="mx-2">•</span>
                    <span style={{ color: 'rgba(74, 222, 128, 0.8)' }}>■</span> Valid moves
                  </p>
                </div>

                {/* Piece Description */}
                <div className="lg:w-1/2 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedPiece.symbol}</span>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                        The {selectedPiece.name}
                      </h3>
                      <p className="text-sm" style={{ color: '#4ade80' }}>
                        Value: {selectedPiece.value} {selectedPiece.value !== '∞' && 'points'}
                      </p>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-secondary)' }}>{selectedPiece.description}</p>

                  <div className="p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                    <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Movement:</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{selectedPiece.howItMoves}</p>
                  </div>

                  <div>
                    <p className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Tips:</p>
                    <ul className="space-y-1">
                      {selectedPiece.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                          <span style={{ color: '#4ade80' }}>•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mini-Challenge */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: challengeComplete
                    ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
                  border: `1px solid ${challengeComplete ? 'rgba(74, 222, 128, 0.3)' : 'rgba(168, 85, 247, 0.2)'}`
                }}
              >
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="sm:w-1/2">
                    <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {challengeComplete ? '🎉 Challenge Complete!' : '🎯 Mini-Challenge'}
                    </h4>
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {challengeComplete
                        ? `Great job! You've mastered moving the ${selectedPiece.name}!`
                        : selectedPiece.challenge.instruction
                      }
                    </p>
                    {!challengeComplete && (
                      <button
                        onClick={() => startChallenge(selectedPiece)}
                        className="px-4 py-2 rounded-lg text-sm"
                        style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                      >
                        Reset Challenge
                      </button>
                    )}
                  </div>
                  <div className="sm:w-1/2">
                    <div className="board-container max-w-[250px] mx-auto">
                      <div className="board-wrapper">
                        <ZenChessboard
                          position={challengeGame?.fen() || selectedPiece.challenge.startFen}
                          onMove={handleChallengeMove}
                          orientation="white"
                          highlightSquares={getChallengeHighlights()}
                          mode="learning"
                          ariaLabel={`${selectedPiece.name} challenge`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Section Button */}
      {progress.completedLessons.length >= 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center pt-4"
        >
          <button
            onClick={() => setActiveSection('checkmate')}
            className="px-6 py-3 rounded-xl font-medium text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}
          >
            Learn About Checkmate →
          </button>
        </motion.div>
      )}
    </motion.div>
  );

  // Practice Section
  const renderPractice = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
          Free Play Practice
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          Experiment freely! Move any piece and see how the game works.
        </p>
      </div>

      <div
        className="p-6 rounded-2xl"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Board */}
          <div className="lg:w-1/2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Interactive Board
              </h3>
              <button
                onClick={resetPractice}
                className="px-3 py-1.5 rounded-lg text-sm"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                Reset Board
              </button>
            </div>
            <div className="board-container max-w-[400px] mx-auto">
              <div className="board-wrapper">
                <ZenChessboard
                  position={practiceGame.fen()}
                  onMove={handlePracticeMove}
                  orientation="white"
                  mode="learning"
                  ariaLabel="Free play practice board"
                />
              </div>
            </div>
          </div>

          {/* Tips Panel */}
          <div className="lg:w-1/2 space-y-4">
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Things to Try:
            </h3>
            <div className="space-y-3">
              {[
                { icon: '♘', text: 'Move a Knight in an L-shape' },
                { icon: '♗', text: 'Move a Bishop diagonally across the board' },
                { icon: '♖', text: 'Move a Rook in a straight line' },
                { icon: '♙', text: 'Move a pawn two squares on its first move' },
                { icon: '👑', text: 'Try to capture an opponent\'s piece' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)' }}
            >
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-medium" style={{ color: '#4ade80' }}>💡 Remember: </span>
                It's okay to make mistakes! That's how we learn. The board will only allow legal moves.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Checkmate Section
  const renderCheckmate = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
          Understanding Checkmate
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
          The goal of chess is to checkmate your opponent's King. Let's see some examples!
        </p>
      </div>

      {/* What is Checkmate */}
      <div
        className="p-6 rounded-2xl"
        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          What is Checkmate?
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
            <div className="text-2xl mb-2">⚔️</div>
            <h4 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Check</h4>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              When a King is under attack. The King MUST escape check on the next move.
            </p>
          </div>
          <div className="p-4 rounded-xl" style={{ background: 'rgba(74, 222, 128, 0.1)' }}>
            <div className="text-2xl mb-2">👑</div>
            <h4 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Checkmate</h4>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              When the King is in check AND cannot escape. Game over!
            </p>
          </div>
        </div>
      </div>

      {/* Checkmate Examples */}
      <div className="grid gap-4">
        {CHECKMATE_EXAMPLES.map((example) => {
          const isSelected = selectedCheckmate?.id === example.id;

          return (
            <motion.div
              key={example.id}
              layout
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
            >
              <button
                onClick={() => {
                  setSelectedCheckmate(isSelected ? null : example);
                  if (!progress.viewedCheckmates.includes(example.id)) {
                    setProgress(prev => ({
                      ...prev,
                      viewedCheckmates: [...prev.viewedCheckmates, example.id]
                    }));
                  }
                }}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: 'rgba(168, 85, 247, 0.2)' }}
                  >
                    ♚
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {example.name}
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {example.description}
                    </p>
                  </div>
                </div>
                <span className="text-xl" style={{ color: 'var(--text-tertiary)' }}>
                  {isSelected ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-2 flex flex-col sm:flex-row gap-6">
                      <div className="sm:w-1/2">
                        <div className="board-container max-w-[280px] mx-auto">
                          <div className="board-wrapper">
                            <ZenChessboard
                              position={example.fen}
                              orientation="white"
                              arePiecesDraggable={false}
                              mode="learning"
                              ariaLabel={`${example.name} position`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sm:w-1/2 space-y-3">
                        <div>
                          <span className="text-xs uppercase tracking-wider" style={{ color: '#4ade80' }}>
                            Solution:
                          </span>
                          <p className="text-xl font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
                            {example.solution}
                          </p>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {example.explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  // Next Steps Section
  const renderNext = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          You're Ready! 🎉
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          You've learned the basics. Here's what to do next:
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/journey')}
          className="p-6 rounded-2xl text-left transition-all hover:scale-[1.02]"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          }}
        >
          <div className="text-3xl mb-3">📚</div>
          <h3 className="text-lg font-semibold text-white mb-2">Continue Learning</h3>
          <p className="text-sm text-white/70">
            Follow our structured journey with interactive lessons on strategy, tactics, and more.
          </p>
        </button>

        <button
          onClick={() => navigate('/play')}
          className="p-6 rounded-2xl text-left transition-all hover:scale-[1.02]"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
        >
          <div className="text-3xl mb-3">♟️</div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Play a Game</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Try playing against our friendly AI at beginner difficulty.
          </p>
        </button>

        <button
          onClick={() => navigate('/train')}
          className="p-6 rounded-2xl text-left transition-all hover:scale-[1.02]"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
        >
          <div className="text-3xl mb-3">🧩</div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Solve Puzzles</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Practice tactics with puzzles matched to your skill level.
          </p>
        </button>

        <button
          onClick={() => navigate('/patterns')}
          className="p-6 rounded-2xl text-left transition-all hover:scale-[1.02]"
          style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
        >
          <div className="text-3xl mb-3">👁️</div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Learn Patterns</h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Recognize common tactical patterns that win games.
          </p>
        </button>
      </div>
    </motion.div>
  );

  // ============================================
  // MAIN RENDER
  // ============================================

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <BackButton fallback="/" className="mb-2" />

      {/* Progress Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #22c55e, #4ade80)' }}
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span className="text-sm font-medium" style={{ color: '#4ade80' }}>
          {overallProgress}%
        </span>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'welcome' as const, label: 'Welcome', icon: '🏠' },
          { id: 'pieces' as const, label: 'Pieces', icon: '♟️' },
          { id: 'practice' as const, label: 'Practice', icon: '🎯' },
          { id: 'checkmate' as const, label: 'Checkmate', icon: '👑' },
          { id: 'next' as const, label: 'Next Steps', icon: '🚀' }
        ].map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeSection === section.id ? 'scale-105' : ''
            }`}
            style={{
              background: activeSection === section.id
                ? 'linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)'
                : 'var(--bg-tertiary)',
              color: activeSection === section.id ? '#4ade80' : 'var(--text-secondary)',
              border: activeSection === section.id ? '1px solid rgba(74, 222, 128, 0.3)' : '1px solid transparent'
            }}
          >
            <span>{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Section Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeSection === 'welcome' && renderWelcome()}
          {activeSection === 'pieces' && renderPieces()}
          {activeSection === 'practice' && renderPractice()}
          {activeSection === 'checkmate' && renderCheckmate()}
          {activeSection === 'next' && renderNext()}
        </motion.div>
      </AnimatePresence>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="text-8xl">🎉</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Encouraging Quote */}
      <div className="text-center py-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <p className="text-sm italic" style={{ color: 'var(--text-muted)' }}>
          "Every master was once a beginner. Every expert was once an amateur."
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
          — Robin Sharma
        </p>
      </div>
    </div>
  );
}

export default BeginnerPage;
