import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Chess } from 'chess.js';
import { ZenChessboard } from '@/components/ZenChessboard';
import { useProgressStore } from '@/state/useStore';
import { useAutoTutorial, TutorialModal } from '@/components/Tutorial';

// ============================================
// BEGINNER LANDING PAGE
// A warm, non-overwhelming intro for absolute beginners
// ============================================

interface BeginnerStep {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  tip: string;
}

const BEGINNER_STEPS: BeginnerStep[] = [
  {
    id: 'board',
    title: 'The Chessboard',
    subtitle: 'Your battlefield',
    icon: '♜',
    description: 'The chess board is an 8×8 grid with 64 squares. Light squares and dark squares alternate, creating the classic checkered pattern.',
    tip: 'The board has "files" (columns a-h) and "ranks" (rows 1-8). Each square has a unique name like "e4".',
  },
  {
    id: 'pieces',
    title: 'The Pieces',
    subtitle: '6 unique warriors',
    icon: '♚',
    description: 'Each player starts with 16 pieces: 1 King, 1 Queen, 2 Rooks, 2 Bishops, 2 Knights, and 8 Pawns. Each piece moves differently!',
    tip: 'The King is the most important piece. If your King is trapped (checkmate), you lose the game!',
  },
  {
    id: 'goal',
    title: 'The Goal',
    subtitle: 'Checkmate!',
    icon: '👑',
    description: 'The goal of chess is to checkmate your opponent\'s King. This means trapping the King so it cannot escape capture.',
    tip: 'You don\'t actually capture the King—the game ends when escape is impossible.',
  },
  {
    id: 'notation',
    title: 'Chess Notation',
    subtitle: 'The language of chess',
    icon: '📝',
    description: 'Chess uses "algebraic notation" to record moves. Each square has a name (like e4), and pieces are abbreviated (K=King, Q=Queen, etc.).',
    tip: 'Don\'t worry about memorizing this now—it becomes natural as you play and learn!',
  },
];

const PIECE_INFO = [
  { name: 'King', symbol: '♔', moves: 'One square in any direction', value: '∞' },
  { name: 'Queen', symbol: '♕', moves: 'Any direction, any distance', value: '9' },
  { name: 'Rook', symbol: '♖', moves: 'Horizontal or vertical lines', value: '5' },
  { name: 'Bishop', symbol: '♗', moves: 'Diagonal lines only', value: '3' },
  { name: 'Knight', symbol: '♘', moves: 'L-shape (2+1), can jump!', value: '3' },
  { name: 'Pawn', symbol: '♙', moves: 'Forward only, captures diagonally', value: '1' },
];

export function BeginnerPage() {
  const navigate = useNavigate();
  const { progress } = useProgressStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPieces, setShowPieces] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [game, setGame] = useState(() => new Chess());

  // Auto-show tutorial for first-time visitors
  const { showTutorial, closeTutorial } = useAutoTutorial('beginner');

  // Handle piece moves on the interactive board
  const handleMove = (from: string, to: string) => {
    try {
      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({ from, to, promotion: 'q' });
      if (move) {
        setGame(gameCopy);
        return true;
      }
    } catch {
      // Invalid move
    }
    return false;
  };

  const resetBoard = () => {
    setGame(new Chess());
  };
  
  const step = BEGINNER_STEPS[currentStep];
  const isLastStep = currentStep === BEGINNER_STEPS.length - 1;

  return (
    <>
      {/* First-time tutorial */}
      <TutorialModal
        tutorialId="beginner"
        isOpen={showTutorial}
        onClose={closeTutorial}
      />
      
      <div className="min-h-screen pb-24">
      {/* Welcoming Hero */}
      <div 
        className="relative py-8 sm:py-12 mb-6 overflow-hidden"
        style={{ 
          background: 'linear-gradient(180deg, rgba(74, 222, 128, 0.15) 0%, transparent 100%)' 
        }}
      >
        {/* Decorative chess pieces */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-4 left-8 text-6xl sm:text-8xl transform -rotate-12">♔</div>
          <div className="absolute top-12 right-12 text-5xl sm:text-7xl transform rotate-6">♘</div>
          <div className="absolute bottom-4 left-1/4 text-4xl sm:text-6xl">♙</div>
          <div className="absolute bottom-8 right-1/3 text-5xl sm:text-7xl transform -rotate-6">♗</div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
              style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80' }}>
              <span>🌱</span>
              <span>Perfect for beginners</span>
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Welcome to Chess! ♔
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Chess is a beautiful game of strategy and creativity. 
            Let's start with the absolute basics—no pressure, no rush.
          </motion.p>
        </div>
      </div>

      {/* Quick Intro Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Step Navigation */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {BEGINNER_STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentStep ? 'w-8 bg-green-500' : 'bg-[var(--bg-tertiary)]'
              }`}
            />
          ))}
        </div>

        {/* Current Step Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="rounded-2xl p-6 sm:p-8"
            style={{ 
              background: 'linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-secondary) 100%)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0"
                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
              >
                {step.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider font-medium" style={{ color: '#4ade80' }}>
                    {currentStep + 1} of {BEGINNER_STEPS.length}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {step.title}
                </h2>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                  {step.subtitle}
                </p>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {step.description}
                </p>
                
                {/* Tip Box */}
                <div 
                  className="rounded-xl p-4"
                  style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)' }}
                >
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium" style={{ color: '#4ade80' }}>💡 Tip: </span>
                    {step.tip}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 rounded-lg text-sm transition-all disabled:opacity-30"
                style={{ color: 'var(--text-secondary)' }}
              >
                ← Previous
              </button>
              
              {!isLastStep ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={() => { setShowPieces(true); setShowBoard(true); }}
                  className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
                >
                  See the Board & Pieces →
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interactive Board (Expandable) */}
        <AnimatePresence>
          {showBoard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className="rounded-2xl p-6"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                    Try Moving the Pieces!
                  </h3>
                  <button
                    onClick={resetBoard}
                    className="px-3 py-1.5 rounded-lg text-sm transition-all"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                  >
                    Reset Board
                  </button>
                </div>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                  Drag any piece to see how it moves. Don't worry about rules yet—just explore!
                </p>
                <div className="flex justify-center">
                  <div className="board-container max-w-[400px]">
                    <div className="board-wrapper">
                      <ZenChessboard
                        position={game.fen()}
                        onMove={handleMove}
                        orientation="white"
                        mode="learning"
                        ariaLabel="Interactive chess board for beginners"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center mt-4" style={{ color: 'var(--text-tertiary)' }}>
                  White pieces start at the bottom, black at the top. White always moves first!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pieces Overview (Expandable) */}
        <AnimatePresence>
          {showPieces && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className="rounded-2xl p-6"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}
              >
                <h3 className="text-xl font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Meet the Pieces
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {PIECE_INFO.map((piece) => (
                    <div
                      key={piece.name}
                      className="rounded-xl p-4 text-center"
                      style={{ background: 'var(--bg-tertiary)' }}
                    >
                      <div className="text-4xl sm:text-5xl mb-2">{piece.symbol}</div>
                      <h4 className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                        {piece.name}
                      </h4>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {piece.moves}
                      </p>
                      <span
                        className="inline-block mt-2 px-2 py-0.5 rounded text-xs"
                        style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80' }}
                      >
                        Value: {piece.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* What's Next */}
        <div 
          className="rounded-2xl p-6 sm:p-8"
          style={{ 
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎯</span>
            <h3 className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
              Ready to Learn?
            </h3>
          </div>
          <p className="text-base mb-6" style={{ color: 'var(--text-secondary)' }}>
            Our structured learning journey will take you from complete beginner to confident player. 
            Each lesson builds on the last, with interactive examples and positions to study.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/journey')}
              className="flex items-center gap-4 p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
              style={{ 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/20">
                📚
              </div>
              <div>
                <h4 className="font-medium text-white">Start the Journey</h4>
                <p className="text-sm text-white/70">Interactive lessons from basics</p>
              </div>
            </button>
            
            <button
              onClick={() => navigate('/play')}
              className="flex items-center gap-4 p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
              style={{ 
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'rgba(129, 182, 76, 0.2)' }}
              >
                ♟️
              </div>
              <div>
                <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>Just Play</h4>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Try a game vs easy AI</p>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/journey')}
            className="p-4 rounded-xl text-center transition-all hover:scale-105"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <span className="text-2xl block mb-1">📖</span>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Lessons
            </span>
          </button>
          <button
            onClick={() => navigate('/train')}
            className="p-4 rounded-xl text-center transition-all hover:scale-105"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <span className="text-2xl block mb-1">🧩</span>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Puzzles
            </span>
          </button>
          <button
            onClick={() => navigate('/openings')}
            className="p-4 rounded-xl text-center transition-all hover:scale-105"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <span className="text-2xl block mb-1">📚</span>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Openings
            </span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="p-4 rounded-xl text-center transition-all hover:scale-105"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <span className="text-2xl block mb-1">🏠</span>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Home
            </span>
          </button>
        </div>

        {/* Encouragement */}
        <div className="text-center py-6">
          <p className="text-sm italic" style={{ color: 'var(--text-muted)' }}>
            "Every master was once a beginner. Every expert was once an amateur."
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
            — Robin Sharma
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default BeginnerPage;

