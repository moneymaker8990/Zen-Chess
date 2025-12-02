// ============================================
// BLINDFOLD TRAINER
// Progressive visualization exercises to build mental imagery
// The skill that separates masters from amateurs
// ============================================

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { useNavigate } from 'react-router-dom';

// ============================================
// TYPES
// ============================================

type TrainingMode = 'menu' | 'piece-finder' | 'move-sequence' | 'puzzle-blind' | 'full-blind';
type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'master';

interface BlindfoldStats {
  totalSessions: number;
  totalCorrect: number;
  totalAttempts: number;
  bestStreak: number;
  modeStats: Record<TrainingMode, { correct: number; total: number }>;
  currentLevel: number;
  lastSession: string | null;
}

interface PiecePosition {
  square: Square;
  piece: string;
  color: 'w' | 'b';
}

// ============================================
// CONFIGURATION
// ============================================

const DEFAULT_STATS: BlindfoldStats = {
  totalSessions: 0,
  totalCorrect: 0,
  totalAttempts: 0,
  bestStreak: 0,
  modeStats: {
    menu: { correct: 0, total: 0 },
    'piece-finder': { correct: 0, total: 0 },
    'move-sequence': { correct: 0, total: 0 },
    'puzzle-blind': { correct: 0, total: 0 },
    'full-blind': { correct: 0, total: 0 },
  },
  currentLevel: 1,
  lastSession: null,
};

const MODE_INFO: Record<TrainingMode, { name: string; description: string; icon: string; color: string; unlockLevel: number }> = {
  menu: { name: 'Menu', description: '', icon: '', color: '', unlockLevel: 0 },
  'piece-finder': { 
    name: 'Piece Finder', 
    description: 'See a position, then find pieces from memory', 
    icon: '🔍', 
    color: '#4ade80',
    unlockLevel: 1
  },
  'move-sequence': { 
    name: 'Move Sequence', 
    description: 'Track pieces through a sequence of moves', 
    icon: '📝', 
    color: '#f59e0b',
    unlockLevel: 2
  },
  'puzzle-blind': { 
    name: 'Blind Puzzles', 
    description: 'Solve tactics without seeing the board', 
    icon: '🧩', 
    color: '#8b5cf6',
    unlockLevel: 3
  },
  'full-blind': { 
    name: 'Full Blindfold', 
    description: 'Play entire games without seeing the board', 
    icon: '👁️', 
    color: '#ef4444',
    unlockLevel: 5
  },
};

const DIFFICULTY_SETTINGS: Record<Difficulty, { 
  viewTime: number; 
  questionCount: number;
  piecesToFind: number;
  movesToTrack: number;
}> = {
  beginner: { viewTime: 10000, questionCount: 3, piecesToFind: 1, movesToTrack: 2 },
  intermediate: { viewTime: 7000, questionCount: 4, piecesToFind: 2, movesToTrack: 3 },
  advanced: { viewTime: 5000, questionCount: 5, piecesToFind: 3, movesToTrack: 4 },
  master: { viewTime: 3000, questionCount: 6, piecesToFind: 4, movesToTrack: 5 },
};

// Starting positions for training
const TRAINING_POSITIONS = [
  { fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', name: 'Italian Game' },
  { fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3', name: 'Open Game' },
  { fen: 'rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4', name: 'Slav Defense' },
  { fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3', name: "King's Indian" },
  { fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5', name: 'Giuoco Piano' },
  { fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3', name: 'Ruy Lopez' },
  { fen: 'rnbqkb1r/pp2pppp/2p2n2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4', name: 'Caro-Kann' },
  { fen: 'r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3', name: 'Sicilian Defense' },
];

// Puzzles for blind solving
const BLIND_PUZZLES = [
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',
    solution: ['Qxf7'],
    description: 'White to play and win material. The queen and bishop attack f7.',
    hint: 'A royal fork is possible...',
  },
  {
    fen: 'r1b1k2r/ppppqppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6',
    solution: ['Bxf7+', 'Kf8', 'Bb3'],
    description: 'White can win a pawn and disrupt Black\'s castling.',
    hint: 'The f7 pawn is only defended by the king...',
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1N3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 5',
    solution: ['Bxf2+', 'Kxf2', 'Nxe4+'],
    description: 'Black can win material with a forcing sequence.',
    hint: 'A sacrifice on f2 opens up a fork...',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

function getPieceSymbol(piece: string, color: 'w' | 'b'): string {
  const symbols: Record<string, string> = {
    'wp': '♙', 'wn': '♘', 'wb': '♗', 'wr': '♖', 'wq': '♕', 'wk': '♔',
    'bp': '♟', 'bn': '♞', 'bb': '♝', 'br': '♜', 'bq': '♛', 'bk': '♚',
  };
  return symbols[color + piece] || '?';
}

function getPieceName(piece: string): string {
  const names: Record<string, string> = {
    p: 'Pawn', n: 'Knight', b: 'Bishop', r: 'Rook', q: 'Queen', k: 'King',
  };
  return names[piece] || 'Unknown';
}

function getRandomSquare(): Square {
  const files = 'abcdefgh';
  const ranks = '12345678';
  return (files[Math.floor(Math.random() * 8)] + ranks[Math.floor(Math.random() * 8)]) as Square;
}

function getRandomPieceFromPosition(chess: Chess): PiecePosition | null {
  const board = chess.board();
  const pieces: PiecePosition[] = [];
  
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = board[rank][file];
      if (piece) {
        const files = 'abcdefgh';
        const ranks = '87654321';
        pieces.push({
          square: (files[file] + ranks[rank]) as Square,
          piece: piece.type,
          color: piece.color,
        });
      }
    }
  }
  
  return pieces.length > 0 ? pieces[Math.floor(Math.random() * pieces.length)] : null;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function BlindfoldTrainerPage() {
  const navigate = useNavigate();
  
  // State
  const [mode, setMode] = useState<TrainingMode>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [stats, setStats] = useState<BlindfoldStats>(() => {
    const saved = localStorage.getItem('zenChessBlindfoldStats');
    return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
  });
  
  // Session state
  const [sessionActive, setSessionActive] = useState(false);
  const [currentFen, setCurrentFen] = useState('');
  const [showBoard, setShowBoard] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<{
    type: 'square' | 'piece' | 'move';
    question: string;
    answer: string;
    options?: string[];
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [moveSequence, setMoveSequence] = useState<string[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  
  // Save stats
  useEffect(() => {
    localStorage.setItem('zenChessBlindfoldStats', JSON.stringify(stats));
  }, [stats]);
  
  // Calculate accuracy
  const accuracy = useMemo(() => {
    if (stats.totalAttempts === 0) return 0;
    return Math.round((stats.totalCorrect / stats.totalAttempts) * 100);
  }, [stats]);
  
  // Start piece finder session
  const startPieceFinder = useCallback(() => {
    const pos = TRAINING_POSITIONS[Math.floor(Math.random() * TRAINING_POSITIONS.length)];
    setCurrentFen(pos.fen);
    setShowBoard(true);
    setSessionActive(true);
    setSessionScore(0);
    setSessionStreak(0);
    setQuestionsAnswered(0);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
    
    const settings = DIFFICULTY_SETTINGS[difficulty];
    setTimeRemaining(settings.viewTime);
    
    // Timer to hide board
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 100) {
          clearInterval(timer);
          setShowBoard(false);
          generatePieceQuestion(pos.fen);
          return 0;
        }
        return prev - 100;
      });
    }, 100);
  }, [difficulty]);
  
  // Generate piece finder question
  const generatePieceQuestion = useCallback((fen: string) => {
    const chess = new Chess(fen);
    const piece = getRandomPieceFromPosition(chess);
    
    if (!piece) return;
    
    // Random question type
    const questionTypes = ['square', 'piece'] as const;
    const qType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    if (qType === 'square') {
      // Ask what piece is on a specific square
      const colorName = piece.color === 'w' ? 'White' : 'Black';
      const pieceName = getPieceName(piece.piece);
      
      // Generate wrong options
      const options = [piece.square];
      const files = 'abcdefgh';
      const ranks = '12345678';
      while (options.length < 4) {
        const randomSquare = (files[Math.floor(Math.random() * 8)] + ranks[Math.floor(Math.random() * 8)]) as Square;
        if (!options.includes(randomSquare)) {
          options.push(randomSquare);
        }
      }
      
      setCurrentQuestion({
        type: 'square',
        question: `Where is the ${colorName} ${pieceName}?`,
        answer: piece.square,
        options: options.sort(() => Math.random() - 0.5),
      });
    } else {
      // Ask what piece is on a specific square
      const actualPiece = chess.get(piece.square);
      if (!actualPiece) return;
      
      const colorName = actualPiece.color === 'w' ? 'White' : 'Black';
      const pieceName = getPieceName(actualPiece.type);
      const symbol = getPieceSymbol(actualPiece.type, actualPiece.color);
      
      const allPieces = ['Pawn', 'Knight', 'Bishop', 'Rook', 'Queen', 'King'];
      const wrongPieces = allPieces.filter(p => p !== pieceName);
      const options = [pieceName, ...wrongPieces.slice(0, 3)];
      
      setCurrentQuestion({
        type: 'piece',
        question: `What ${colorName} piece is on ${piece.square}?`,
        answer: pieceName,
        options: options.sort(() => Math.random() - 0.5),
      });
    }
  }, []);
  
  // Handle answer
  const handleAnswer = useCallback((answer: string) => {
    if (selectedAnswer !== null || !currentQuestion) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === currentQuestion.answer;
    setQuestionsAnswered(prev => prev + 1);
    
    if (isCorrect) {
      setSessionScore(prev => prev + 10);
      setSessionStreak(prev => prev + 1);
      setStats(prev => ({
        ...prev,
        totalCorrect: prev.totalCorrect + 1,
        totalAttempts: prev.totalAttempts + 1,
        bestStreak: Math.max(prev.bestStreak, sessionStreak + 1),
        modeStats: {
          ...prev.modeStats,
          [mode]: {
            correct: (prev.modeStats[mode]?.correct || 0) + 1,
            total: (prev.modeStats[mode]?.total || 0) + 1,
          },
        },
      }));
    } else {
      setSessionStreak(0);
      setStats(prev => ({
        ...prev,
        totalAttempts: prev.totalAttempts + 1,
        modeStats: {
          ...prev.modeStats,
          [mode]: {
            correct: prev.modeStats[mode]?.correct || 0,
            total: (prev.modeStats[mode]?.total || 0) + 1,
          },
        },
      }));
    }
  }, [selectedAnswer, currentQuestion, mode, sessionStreak]);
  
  // Next question
  const nextQuestion = useCallback(() => {
    const settings = DIFFICULTY_SETTINGS[difficulty];
    
    if (questionsAnswered >= settings.questionCount) {
      // Session complete
      setStats(prev => ({
        ...prev,
        totalSessions: prev.totalSessions + 1,
        lastSession: new Date().toISOString(),
        currentLevel: Math.min(10, prev.currentLevel + (sessionScore >= settings.questionCount * 7 ? 1 : 0)),
      }));
      setSessionActive(false);
      return;
    }
    
    // Show board briefly, then hide and ask new question
    setShowBoard(true);
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(null);
    setTimeRemaining(settings.viewTime);
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 100) {
          clearInterval(timer);
          setShowBoard(false);
          generatePieceQuestion(currentFen);
          return 0;
        }
        return prev - 100;
      });
    }, 100);
  }, [difficulty, questionsAnswered, currentFen, generatePieceQuestion, sessionScore]);
  
  // Start move sequence training
  const startMoveSequence = useCallback(() => {
    const pos = TRAINING_POSITIONS[Math.floor(Math.random() * TRAINING_POSITIONS.length)];
    const chess = new Chess(pos.fen);
    
    // Generate a sequence of legal moves
    const settings = DIFFICULTY_SETTINGS[difficulty];
    const moves: string[] = [];
    
    for (let i = 0; i < settings.movesToTrack; i++) {
      const legalMoves = chess.moves();
      if (legalMoves.length === 0) break;
      const move = legalMoves[Math.floor(Math.random() * legalMoves.length)];
      chess.move(move);
      moves.push(move);
    }
    
    setCurrentFen(pos.fen);
    setMoveSequence(moves);
    setCurrentMoveIndex(0);
    setShowBoard(true);
    setSessionActive(true);
    setSessionScore(0);
    setSessionStreak(0);
    setQuestionsAnswered(0);
    
    // Show each move with timing
    let idx = 0;
    const displayMoves = () => {
      if (idx < moves.length) {
        const chess2 = new Chess(pos.fen);
        for (let j = 0; j <= idx; j++) {
          chess2.move(moves[j]);
        }
        setCurrentFen(chess2.fen());
        setCurrentMoveIndex(idx);
        idx++;
        setTimeout(displayMoves, 2000);
      } else {
        // Hide board and ask questions
        setShowBoard(false);
        askMoveQuestion(pos.fen, moves);
      }
    };
    
    setTimeout(displayMoves, 2000);
  }, [difficulty]);
  
  // Ask move sequence question
  const askMoveQuestion = useCallback((startFen: string, moves: string[]) => {
    const chess = new Chess(startFen);
    for (const move of moves) {
      chess.move(move);
    }
    
    const piece = getRandomPieceFromPosition(chess);
    if (!piece) return;
    
    const colorName = piece.color === 'w' ? 'White' : 'Black';
    const pieceName = getPieceName(piece.piece);
    
    const options = [piece.square];
    const files = 'abcdefgh';
    const ranks = '12345678';
    while (options.length < 4) {
      const randomSquare = (files[Math.floor(Math.random() * 8)] + ranks[Math.floor(Math.random() * 8)]) as Square;
      if (!options.includes(randomSquare)) {
        options.push(randomSquare);
      }
    }
    
    setCurrentQuestion({
      type: 'move',
      question: `After the move sequence, where is the ${colorName} ${pieceName}?`,
      answer: piece.square,
      options: options.sort(() => Math.random() - 0.5),
    });
    
    // Store final FEN for showing result
    setCurrentFen(chess.fen());
  }, []);
  
  // End session
  const endSession = useCallback(() => {
    setSessionActive(false);
    setShowBoard(true);
    setStats(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      lastSession: new Date().toISOString(),
    }));
  }, []);
  
  // ============================================
  // RENDER: MENU
  // ============================================
  if (mode === 'menu') {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <header>
          <div className="flex items-center gap-2 text-sm mb-4">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
              Home
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>Blindfold Trainer</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            👁️ Blindfold Trainer
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Build master-level visualization. Train your inner chessboard.
          </p>
        </header>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="stat-value text-gradient">{stats.totalSessions}</div>
            <div className="stat-label">Sessions</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#4ade80' }}>{accuracy}%</div>
            <div className="stat-label">Accuracy</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#f59e0b' }}>{stats.bestStreak}</div>
            <div className="stat-label">Best Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#a855f7' }}>Lvl {stats.currentLevel}</div>
            <div className="stat-label">Level</div>
          </div>
        </div>
        
        {/* Difficulty Selection */}
        <div className="card p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
            Difficulty Level
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`p-4 rounded-xl text-left transition-all ${
                  difficulty === d ? 'ring-2 ring-[var(--accent-primary)]' : ''
                }`}
                style={{ background: difficulty === d ? 'var(--accent-primary)' + '20' : 'var(--bg-tertiary)' }}
              >
                <div className="font-medium capitalize mb-1" style={{ color: 'var(--text-primary)' }}>
                  {d}
                </div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {DIFFICULTY_SETTINGS[d].viewTime / 1000}s view time
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Training Modes */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Training Modes
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {(Object.entries(MODE_INFO) as [TrainingMode, typeof MODE_INFO[TrainingMode]][])
              .filter(([key]) => key !== 'menu')
              .map(([key, info]) => {
                const isLocked = stats.currentLevel < info.unlockLevel;
                const modeStats = stats.modeStats[key];
                const modeAccuracy = modeStats?.total > 0 
                  ? Math.round((modeStats.correct / modeStats.total) * 100) 
                  : 0;
                
                return (
                  <button
                    key={key}
                    onClick={() => {
                      if (!isLocked) {
                        setMode(key);
                        if (key === 'piece-finder') startPieceFinder();
                        if (key === 'move-sequence') startMoveSequence();
                      }
                    }}
                    disabled={isLocked}
                    className={`card-interactive p-5 text-left group ${isLocked ? 'opacity-50' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: info.color + '20' }}
                      >
                        {isLocked ? '🔒' : info.icon}
                      </div>
                      {modeStats?.total > 0 && !isLocked && (
                        <span className="text-xs font-mono" style={{ color: modeAccuracy >= 70 ? '#4ade80' : '#f59e0b' }}>
                          {modeAccuracy}%
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                      {info.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      {isLocked ? `Unlocks at Level ${info.unlockLevel}` : info.description}
                    </p>
                  </button>
                );
              })}
          </div>
        </div>
        
        {/* How It Works */}
        <div className="card p-6">
          <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
            Why Blindfold Training?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                1
              </div>
              <div>
                <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Calculate Deeper</div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Masters visualize 5-10 moves ahead. This trains that skill.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                2
              </div>
              <div>
                <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Fewer Blunders</div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Strong visualization means you see consequences before moving.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                3
              </div>
              <div>
                <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>GM-Level Skill</div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Most titled players can play blindfolded. You can too!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Level Progress */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
              Your Progress
            </h3>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Level {stats.currentLevel} / 10
            </span>
          </div>
          <div className="relative h-4 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
            <div 
              className="absolute inset-y-0 left-0 rounded-full transition-all"
              style={{ 
                width: `${(stats.currentLevel / 10) * 100}%`,
                background: 'linear-gradient(90deg, #4ade80, #a855f7)'
              }}
            />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map(level => (
              <div 
                key={level}
                className="text-center p-2 rounded-lg"
                style={{ 
                  background: stats.currentLevel >= level ? 'var(--accent-primary)' + '20' : 'var(--bg-tertiary)',
                  color: stats.currentLevel >= level ? 'var(--accent-primary)' : 'var(--text-muted)'
                }}
              >
                <div className="text-lg">{stats.currentLevel >= level ? '✓' : level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: ACTIVE SESSION
  // ============================================
  if (sessionActive) {
    const modeInfo = MODE_INFO[mode];
    const settings = DIFFICULTY_SETTINGS[difficulty];
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{modeInfo.icon}</span>
            <div>
              <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>{modeInfo.name}</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Question {questionsAnswered + 1}/{settings.questionCount}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-mono font-bold" style={{ color: '#4ade80' }}>{sessionScore}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-mono font-bold" style={{ color: '#f59e0b' }}>🔥 {sessionStreak}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Streak</div>
            </div>
            <button onClick={endSession} className="btn-ghost text-sm">
              End Session
            </button>
          </div>
        </div>
        
        {/* Timer Bar */}
        {showBoard && timeRemaining > 0 && (
          <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
            <div 
              className="absolute inset-y-0 left-0 transition-all duration-100 rounded-full"
              style={{ 
                width: `${(timeRemaining / settings.viewTime) * 100}%`,
                background: timeRemaining > 3000 ? 'var(--accent-primary)' : '#ef4444'
              }}
            />
          </div>
        )}
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Board Area */}
          <div className="relative">
            {showBoard ? (
              <div className="chessboard-container">
                <Chessboard
                  position={currentFen}
                  boardOrientation="white"
                  customDarkSquareStyle={{ backgroundColor: '#779556' }}
                  customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
                  arePiecesDraggable={false}
                  boardWidth={480}
                />
                {mode === 'move-sequence' && moveSequence.length > 0 && (
                  <div className="mt-4 p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                    <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                      Move Sequence:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {moveSequence.map((move, idx) => (
                        <span 
                          key={idx}
                          className={`px-3 py-1 rounded-lg font-mono ${idx <= currentMoveIndex ? 'font-bold' : 'opacity-50'}`}
                          style={{ 
                            background: idx <= currentMoveIndex ? 'var(--accent-primary)' + '30' : 'var(--bg-secondary)',
                            color: idx <= currentMoveIndex ? 'var(--accent-primary)' : 'var(--text-muted)'
                          }}
                        >
                          {idx + 1}. {move}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div 
                className="aspect-square flex items-center justify-center rounded-xl"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <div className="text-center p-8">
                  <div className="text-8xl mb-6">🧠</div>
                  <h3 className="text-2xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
                    Board Hidden
                  </h3>
                  <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
                    Visualize in your mind...
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Question Area */}
          <div className="space-y-6">
            {showBoard && !currentQuestion ? (
              <div className="card p-8 text-center">
                <div className="text-6xl mb-4">👀</div>
                <h3 className="text-2xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
                  Memorize the Position!
                </h3>
                <p style={{ color: 'var(--text-tertiary)' }}>
                  {(timeRemaining / 1000).toFixed(1)} seconds remaining
                </p>
                <div className="mt-6 text-5xl font-mono font-bold" style={{ color: 'var(--accent-primary)' }}>
                  {(timeRemaining / 1000).toFixed(1)}s
                </div>
              </div>
            ) : currentQuestion && (
              <div className="card p-6">
                <h3 className="text-xl font-medium mb-6" style={{ color: 'var(--text-primary)' }}>
                  {currentQuestion.question}
                </h3>
                
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => {
                    let buttonStyle = 'var(--bg-tertiary)';
                    let textColor = 'var(--text-secondary)';
                    
                    if (showResult) {
                      if (option === currentQuestion.answer) {
                        buttonStyle = 'rgba(74, 222, 128, 0.2)';
                        textColor = '#4ade80';
                      } else if (option === selectedAnswer) {
                        buttonStyle = 'rgba(239, 68, 68, 0.2)';
                        textColor = '#ef4444';
                      }
                    }
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        disabled={showResult}
                        className="w-full p-4 rounded-xl text-left transition-all hover:scale-[1.02] font-mono text-lg"
                        style={{ background: buttonStyle, color: textColor }}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                
                {/* Result */}
                {showResult && (
                  <div className="mt-6 p-4 rounded-xl" style={{ 
                    background: selectedAnswer === currentQuestion.answer 
                      ? 'rgba(74, 222, 128, 0.1)' 
                      : 'rgba(239, 68, 68, 0.1)' 
                  }}>
                    <div className="flex items-center gap-2 mb-2">
                      {selectedAnswer === currentQuestion.answer ? (
                        <>
                          <span className="text-2xl">✅</span>
                          <span className="font-medium" style={{ color: '#4ade80' }}>Correct!</span>
                        </>
                      ) : (
                        <>
                          <span className="text-2xl">❌</span>
                          <span className="font-medium" style={{ color: '#ef4444' }}>
                            Incorrect - it was {currentQuestion.answer}
                          </span>
                        </>
                      )}
                    </div>
                    
                    <button onClick={nextQuestion} className="btn-primary w-full mt-4">
                      {questionsAnswered >= settings.questionCount - 1 ? 'Finish Session' : 'Next Question →'}
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
  // RENDER: SESSION COMPLETE
  // ============================================
  if (!sessionActive && questionsAnswered > 0) {
    const settings = DIFFICULTY_SETTINGS[difficulty];
    const sessionAccuracy = settings.questionCount > 0
      ? Math.round((sessionScore / (settings.questionCount * 10)) * 100)
      : 0;
    
    return (
      <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
        <div className="card p-8 text-center">
          <div className="text-6xl mb-4">
            {sessionAccuracy >= 80 ? '🏆' : sessionAccuracy >= 60 ? '👏' : '💪'}
          </div>
          <h2 className="text-3xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
            Session Complete!
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-tertiary)' }}>
            {sessionAccuracy >= 80 
              ? 'Excellent visualization skills!' 
              : sessionAccuracy >= 60 
              ? 'Good work! Keep practicing!' 
              : 'Keep training - visualization improves with practice!'}
          </p>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-mono font-bold" style={{ color: '#4ade80' }}>
                {sessionScore}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Points</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-mono font-bold" style={{ color: '#f59e0b' }}>
                {sessionStreak}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Best Streak</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-mono font-bold" style={{ color: '#a855f7' }}>
                {sessionAccuracy}%
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Accuracy</div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => {
                setQuestionsAnswered(0);
                if (mode === 'piece-finder') startPieceFinder();
                if (mode === 'move-sequence') startMoveSequence();
              }} 
              className="btn-primary"
            >
              Train Again
            </button>
            <button onClick={() => { setMode('menu'); setQuestionsAnswered(0); }} className="btn-secondary">
              Change Mode
            </button>
            <button onClick={() => navigate('/')} className="btn-ghost">
              Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
}

export default BlindfoldTrainerPage;

