// ============================================
// INTUITION TRAINER
// Rapid-fire "Who stands better?" exercises
// Build GM-level position assessment at a glance
// ============================================

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useNavigate } from 'react-router-dom';

// ============================================
// TYPES
// ============================================

type Evaluation = 'white-winning' | 'white-better' | 'equal' | 'black-better' | 'black-winning';
type GamePhase = 'opening' | 'middlegame' | 'endgame' | 'all';

interface EvaluatedPosition {
  fen: string;
  evaluation: Evaluation;
  evalScore: number; // centipawns
  mainReason: string;
  factors: string[];
  source?: string;
}

interface IntuitionStats {
  totalSessions: number;
  totalCorrect: number;
  totalAttempts: number;
  bestStreak: number;
  averageTime: number;
  evalAccuracy: Record<Evaluation, { correct: number; total: number }>;
  lastSession: string | null;
}

// ============================================
// CONFIGURATION
// ============================================

const DEFAULT_STATS: IntuitionStats = {
  totalSessions: 0,
  totalCorrect: 0,
  totalAttempts: 0,
  bestStreak: 0,
  averageTime: 0,
  evalAccuracy: {
    'white-winning': { correct: 0, total: 0 },
    'white-better': { correct: 0, total: 0 },
    equal: { correct: 0, total: 0 },
    'black-better': { correct: 0, total: 0 },
    'black-winning': { correct: 0, total: 0 },
  },
  lastSession: null,
};

const EVAL_OPTIONS: { value: Evaluation; label: string; icon: string; color: string }[] = [
  { value: 'white-winning', label: 'White Winning', icon: '⬜++', color: '#4ade80' },
  { value: 'white-better', label: 'White Better', icon: '⬜+', color: '#86efac' },
  { value: 'equal', label: 'Equal', icon: '=', color: '#fbbf24' },
  { value: 'black-better', label: 'Black Better', icon: '⬛+', color: '#a78bfa' },
  { value: 'black-winning', label: 'Black Winning', icon: '⬛++', color: '#8b5cf6' },
];

// Position database with evaluations
const POSITIONS: EvaluatedPosition[] = [
  // EQUAL POSITIONS
  {
    fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',
    evaluation: 'equal',
    evalScore: 30,
    mainReason: 'Starting position after 1.e4 - slightly better for White but essentially equal',
    factors: ['Full development potential', 'Equal material', 'Slight initiative for White'],
  },
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4',
    evaluation: 'equal',
    evalScore: 20,
    mainReason: 'Four Knights - equal development, symmetric pawn structure',
    factors: ['Equal development', 'Symmetric pawns', 'Both sides castling soon'],
  },
  {
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 6',
    evaluation: 'equal',
    evalScore: 15,
    mainReason: 'Nimzo-Indian - Black has the bishop pair, White has the center',
    factors: ['White has center control', 'Black has bishop pair', 'Balanced chances'],
  },
  
  // WHITE BETTER
  {
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    evaluation: 'white-better',
    evalScore: 50,
    mainReason: 'Italian Game - White has more active piece placement',
    factors: ['Bishop on active diagonal', 'Better development', 'f7 under pressure'],
  },
  {
    fen: 'r1bqkb1r/ppp2ppp/2np1n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    evaluation: 'white-better',
    evalScore: 40,
    mainReason: 'White has a slight space advantage and better piece coordination',
    factors: ['Space advantage', 'Better piece placement', 'Black\'s d6 is passive'],
  },
  {
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3p4/1bPP4/2N2NP1/PP2PP1P/R1BQKB1R w KQ - 0 6',
    evaluation: 'white-better',
    evalScore: 35,
    mainReason: 'White will gain the bishop pair after a3',
    factors: ['Bishop pair coming', 'Central control', 'Harmonious development'],
  },
  {
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3P4/2PBPN2/PP3PPP/R1BQ1RK1 w - - 0 9',
    evaluation: 'white-better',
    evalScore: 45,
    mainReason: 'White has the IQP but excellent piece activity',
    factors: ['Active pieces', 'Central outpost on e5', 'Attacking chances'],
  },
  
  // WHITE WINNING
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1N3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4',
    evaluation: 'white-winning',
    evalScore: 200,
    mainReason: 'White threatens Nxf7! forking queen and rook',
    factors: ['Tactical threat on f7', 'Knight dominates', 'Black underdeveloped'],
  },
  {
    fen: 'r1bqkb1r/pppp1Npp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4',
    evaluation: 'white-winning',
    evalScore: 350,
    mainReason: 'Knight on f7 forks queen and rook!',
    factors: ['Won the exchange', 'Devastating fork', 'Black position crumbles'],
  },
  {
    fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    evaluation: 'white-winning',
    evalScore: 500,
    mainReason: 'White is up a full rook',
    factors: ['Material advantage', 'Active rook', 'Easy technique'],
  },
  
  // BLACK BETTER
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq - 0 4',
    evaluation: 'black-better',
    evalScore: -40,
    mainReason: 'Black has good development and pressure on d4',
    factors: ['Active pieces', 'Pressure on d4 pawn', 'Will castle soon'],
  },
  {
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2PP4/2N1PN2/PP3PPP/R1BQKB1R b - - 0 6',
    evaluation: 'black-better',
    evalScore: -35,
    mainReason: 'Black has harmonious development, White\'s center is under pressure',
    factors: ['Better piece coordination', 'Central pressure', 'Safe king'],
  },
  {
    fen: 'rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
    evaluation: 'black-better',
    evalScore: -30,
    mainReason: 'Caro-Kann - Black has solid position and will develop bishop actively',
    factors: ['Solid structure', 'Bishop coming to f5', 'Equal chances minimum'],
  },
  
  // BLACK WINNING
  {
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/6P1/5P2/PPPPP2P/RNBQKBNR b KQkq - 0 2',
    evaluation: 'black-winning',
    evalScore: -200,
    mainReason: 'White played two terrible pawn moves, Qh4# is threatened!',
    factors: ['Scholar\'s mate threat', 'Horrible pawn structure', 'No development'],
  },
  {
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4N3/1bB1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4',
    evaluation: 'black-winning',
    evalScore: -180,
    mainReason: 'Black can win the knight with Qe7! (or play Bxd2+ first)',
    factors: ['Wins knight', 'Better development', 'King safety advantage'],
  },
  {
    fen: '6k1/5ppp/8/8/8/8/r4PPP/6K1 w - - 0 1',
    evaluation: 'black-winning',
    evalScore: -500,
    mainReason: 'Black is up a full rook',
    factors: ['Material advantage', 'Rook on 7th rank', 'Easy win'],
  },
  
  // More complex positions
  {
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    evaluation: 'equal',
    evalScore: 10,
    mainReason: 'Classical QGD position - rich strategic possibilities for both sides',
    factors: ['Typical IQP vs solid structure', 'Good pieces for both', 'Long game ahead'],
  },
  {
    fen: 'r2q1rk1/ppp1bppp/2n1bn2/3p4/2PP4/1PN1PN2/PB2BPPP/R2Q1RK1 w - - 0 9',
    evaluation: 'white-better',
    evalScore: 45,
    mainReason: 'White has the bishop pair and more space',
    factors: ['Bishop pair advantage', 'Space advantage', 'Better pawn structure'],
  },
  {
    fen: 'r1bq1rk1/1pp2ppp/p1np1n2/4p3/1bP1P3/1BN2N2/PP1P1PPP/R1BQ1RK1 w - - 0 8',
    evaluation: 'white-better',
    evalScore: 35,
    mainReason: 'White has better development and central control',
    factors: ['More active pieces', 'Better pawn structure', 'Control of d5'],
  },
  
  // Endgame positions
  {
    fen: '8/8/4k3/8/4K3/8/4P3/8 w - - 0 1',
    evaluation: 'white-winning',
    evalScore: 600,
    mainReason: 'King and pawn vs king - White wins with correct technique',
    factors: ['Extra pawn', 'King supports pawn', 'Opposition concepts'],
  },
  {
    fen: '8/5pk1/8/8/8/8/5PP1/6K1 w - - 0 1',
    evaluation: 'equal',
    evalScore: 5,
    mainReason: 'Equal pawn endgame - neither side can make progress',
    factors: ['Equal material', 'Drawn structure', 'No breakthrough'],
  },
  {
    fen: '4r1k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    evaluation: 'equal',
    evalScore: 0,
    mainReason: 'Equal rook endgame - likely drawn',
    factors: ['Equal material', 'Active rooks', 'Standard draw'],
  },
];

// ============================================
// MAIN COMPONENT
// ============================================

export function IntuitionTrainerPage() {
  const navigate = useNavigate();
  
  // State
  const [stats, setStats] = useState<IntuitionStats>(() => {
    const saved = localStorage.getItem('zenChessIntuitionStats');
    return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
  });
  const [gamePhase, setGamePhase] = useState<GamePhase>('all');
  const [timedMode, setTimedMode] = useState(true);
  const [timeLimit, setTimeLimit] = useState(5); // seconds
  
  // Session state
  const [sessionActive, setSessionActive] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<EvaluatedPosition | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Evaluation | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [answerTimes, setAnswerTimes] = useState<number[]>([]);
  
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const startTimeRef = useRef<number>(0);
  
  // Save stats
  useEffect(() => {
    localStorage.setItem('zenChessIntuitionStats', JSON.stringify(stats));
  }, [stats]);
  
  // Calculate accuracy
  const accuracy = useMemo(() => {
    if (stats.totalAttempts === 0) return 0;
    return Math.round((stats.totalCorrect / stats.totalAttempts) * 100);
  }, [stats]);
  
  // Start session
  const startSession = useCallback(() => {
    setSessionActive(true);
    setSessionScore(0);
    setSessionStreak(0);
    setQuestionsAnswered(0);
    setAnswerTimes([]);
    loadNextPosition();
  }, []);
  
  // Load next position
  const loadNextPosition = useCallback(() => {
    const filteredPositions = POSITIONS; // Could filter by gamePhase in future
    const randomPos = filteredPositions[Math.floor(Math.random() * filteredPositions.length)];
    
    setCurrentPosition(randomPos);
    setSelectedAnswer(null);
    setShowResult(false);
    
    if (timedMode) {
      setTimeRemaining(timeLimit * 1000);
      startTimeRef.current = Date.now();
      
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 100) {
            clearInterval(timerRef.current);
            // Auto-submit as wrong if time runs out
            handleTimeout();
            return 0;
          }
          return prev - 100;
        });
      }, 100);
    } else {
      startTimeRef.current = Date.now();
    }
  }, [timedMode, timeLimit]);
  
  // Handle timeout
  const handleTimeout = useCallback(() => {
    if (!currentPosition || selectedAnswer !== null) return;
    
    setSelectedAnswer('equal'); // Default wrong answer
    setShowResult(true);
    setQuestionsAnswered(prev => prev + 1);
    setSessionStreak(0);
    
    setStats(prev => ({
      ...prev,
      totalAttempts: prev.totalAttempts + 1,
      evalAccuracy: {
        ...prev.evalAccuracy,
        [currentPosition.evaluation]: {
          correct: prev.evalAccuracy[currentPosition.evaluation]?.correct || 0,
          total: (prev.evalAccuracy[currentPosition.evaluation]?.total || 0) + 1,
        },
      },
    }));
  }, [currentPosition, selectedAnswer]);
  
  // Handle answer
  const handleAnswer = useCallback((answer: Evaluation) => {
    if (selectedAnswer !== null || !currentPosition) return;
    
    clearInterval(timerRef.current);
    const answerTime = Date.now() - startTimeRef.current;
    setAnswerTimes(prev => [...prev, answerTime]);
    
    setSelectedAnswer(answer);
    setShowResult(true);
    setQuestionsAnswered(prev => prev + 1);
    
    // Check if correct (allow adjacent evaluations for partial credit)
    const evalOrder: Evaluation[] = ['white-winning', 'white-better', 'equal', 'black-better', 'black-winning'];
    const correctIdx = evalOrder.indexOf(currentPosition.evaluation);
    const answerIdx = evalOrder.indexOf(answer);
    const isExact = answer === currentPosition.evaluation;
    const isClose = Math.abs(correctIdx - answerIdx) === 1;
    
    if (isExact) {
      setSessionScore(prev => prev + (timedMode ? Math.max(1, Math.floor((timeLimit * 1000 - answerTime) / 500)) : 1) * 10);
      setSessionStreak(prev => prev + 1);
      
      setStats(prev => ({
        ...prev,
        totalCorrect: prev.totalCorrect + 1,
        totalAttempts: prev.totalAttempts + 1,
        bestStreak: Math.max(prev.bestStreak, sessionStreak + 1),
        evalAccuracy: {
          ...prev.evalAccuracy,
          [currentPosition.evaluation]: {
            correct: (prev.evalAccuracy[currentPosition.evaluation]?.correct || 0) + 1,
            total: (prev.evalAccuracy[currentPosition.evaluation]?.total || 0) + 1,
          },
        },
      }));
    } else if (isClose) {
      // Partial credit for close answer
      setSessionScore(prev => prev + 5);
      setSessionStreak(0);
      
      setStats(prev => ({
        ...prev,
        totalAttempts: prev.totalAttempts + 1,
        evalAccuracy: {
          ...prev.evalAccuracy,
          [currentPosition.evaluation]: {
            correct: prev.evalAccuracy[currentPosition.evaluation]?.correct || 0,
            total: (prev.evalAccuracy[currentPosition.evaluation]?.total || 0) + 1,
          },
        },
      }));
    } else {
      setSessionStreak(0);
      
      setStats(prev => ({
        ...prev,
        totalAttempts: prev.totalAttempts + 1,
        evalAccuracy: {
          ...prev.evalAccuracy,
          [currentPosition.evaluation]: {
            correct: prev.evalAccuracy[currentPosition.evaluation]?.correct || 0,
            total: (prev.evalAccuracy[currentPosition.evaluation]?.total || 0) + 1,
          },
        },
      }));
    }
  }, [selectedAnswer, currentPosition, timedMode, timeLimit, sessionStreak]);
  
  // Next position
  const nextPosition = useCallback(() => {
    if (questionsAnswered >= 10) {
      // Session complete
      setStats(prev => ({
        ...prev,
        totalSessions: prev.totalSessions + 1,
        averageTime: answerTimes.length > 0 
          ? Math.round(answerTimes.reduce((a, b) => a + b, 0) / answerTimes.length)
          : prev.averageTime,
        lastSession: new Date().toISOString(),
      }));
      setSessionActive(false);
    } else {
      loadNextPosition();
    }
  }, [questionsAnswered, answerTimes, loadNextPosition]);
  
  // End session
  const endSession = useCallback(() => {
    clearInterval(timerRef.current);
    setSessionActive(false);
    setStats(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      lastSession: new Date().toISOString(),
    }));
  }, []);
  
  // Cleanup
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);
  
  // ============================================
  // RENDER: MENU
  // ============================================
  if (!sessionActive) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <header>
          <div className="flex items-center gap-2 text-sm mb-4">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
              Home
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>Intuition Trainer</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            ⚖️ Intuition Trainer
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Build GM-level position assessment. Who stands better at a glance?
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
            <div className="stat-value" style={{ color: '#a855f7' }}>
              {stats.averageTime > 0 ? `${(stats.averageTime / 1000).toFixed(1)}s` : '--'}
            </div>
            <div className="stat-label">Avg Time</div>
          </div>
        </div>
        
        {/* Settings */}
        <div className="card p-6 space-y-6">
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
              Training Settings
            </h3>
            
            {/* Timed Mode Toggle */}
            <div className="flex items-center justify-between mb-4 p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
              <div>
                <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Timed Mode</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  Force quick decisions like in real games
                </div>
              </div>
              <button
                onClick={() => setTimedMode(!timedMode)}
                className={`w-14 h-8 rounded-full transition-all ${timedMode ? 'bg-[var(--accent-primary)]' : 'bg-gray-600'}`}
              >
                <div 
                  className={`w-6 h-6 rounded-full bg-white transition-all ${timedMode ? 'translate-x-7' : 'translate-x-1'}`}
                />
              </button>
            </div>
            
            {/* Time Limit Selection */}
            {timedMode && (
              <div className="grid grid-cols-4 gap-3">
                {[3, 5, 7, 10].map(t => (
                  <button
                    key={t}
                    onClick={() => setTimeLimit(t)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      timeLimit === t ? 'ring-2 ring-[var(--accent-primary)]' : ''
                    }`}
                    style={{ background: timeLimit === t ? 'var(--accent-primary)' + '20' : 'var(--bg-tertiary)' }}
                  >
                    <div className="text-2xl font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
                      {t}s
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {t <= 3 ? 'Speed' : t <= 5 ? 'Normal' : t <= 7 ? 'Relaxed' : 'Easy'}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Evaluation Accuracy Breakdown */}
        <div className="card p-6">
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
            Accuracy by Evaluation Type
          </h3>
          <div className="space-y-3">
            {EVAL_OPTIONS.map(opt => {
              const evalStat = stats.evalAccuracy[opt.value];
              const evalAcc = evalStat?.total > 0 
                ? Math.round((evalStat.correct / evalStat.total) * 100) 
                : 0;
              
              return (
                <div key={opt.value} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium" style={{ color: opt.color }}>
                    {opt.label}
                  </div>
                  <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ width: `${evalAcc}%`, background: opt.color }}
                    />
                  </div>
                  <div className="w-16 text-right text-sm font-mono" style={{ color: 'var(--text-muted)' }}>
                    {evalStat?.total > 0 ? `${evalAcc}%` : '--'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Start Button */}
        <button onClick={startSession} className="btn-primary w-full py-4 text-lg">
          Start Training →
        </button>
        
        {/* How It Works */}
        <div className="card p-6">
          <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                1
              </div>
              <div>
                <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Assess Quickly</div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Look at the position and evaluate who stands better
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                2
              </div>
              <div>
                <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Choose Evaluation</div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Select from White winning to Black winning
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                3
              </div>
              <div>
                <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Learn Why</div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  See the key factors that determine the evaluation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: ACTIVE SESSION
  // ============================================
  if (sessionActive && currentPosition) {
    const timePercent = timedMode ? (timeRemaining / (timeLimit * 1000)) * 100 : 100;
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚖️</span>
            <div>
              <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>Position Evaluation</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Question {questionsAnswered + 1}/10
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
        {timedMode && !showResult && (
          <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
            <div 
              className="absolute inset-y-0 left-0 transition-all duration-100 rounded-full"
              style={{ 
                width: `${timePercent}%`,
                background: timePercent > 30 ? 'var(--accent-primary)' : '#ef4444'
              }}
            />
          </div>
        )}
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Board */}
          <div className="chessboard-container">
            <Chessboard
              position={currentPosition.fen}
              boardOrientation="white"
              customDarkSquareStyle={{ backgroundColor: '#779556' }}
              customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
              arePiecesDraggable={false}
              boardWidth={480}
            />
          </div>
          
          {/* Evaluation Options */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
              Who stands better?
            </h3>
            
            <div className="space-y-2">
              {EVAL_OPTIONS.map(opt => {
                let buttonStyle = 'var(--bg-tertiary)';
                let borderStyle = 'transparent';
                
                if (showResult) {
                  if (opt.value === currentPosition.evaluation) {
                    buttonStyle = 'rgba(74, 222, 128, 0.2)';
                    borderStyle = '#4ade80';
                  } else if (opt.value === selectedAnswer) {
                    buttonStyle = 'rgba(239, 68, 68, 0.2)';
                    borderStyle = '#ef4444';
                  }
                }
                
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    disabled={showResult}
                    className="w-full p-4 rounded-xl text-left transition-all hover:scale-[1.02] flex items-center gap-4"
                    style={{ 
                      background: buttonStyle, 
                      border: `2px solid ${borderStyle}`,
                    }}
                  >
                    <span className="text-2xl font-mono" style={{ color: opt.color }}>{opt.icon}</span>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{opt.label}</span>
                  </button>
                );
              })}
            </div>
            
            {/* Result Explanation */}
            {showResult && (
              <div 
                className="mt-6 p-5 rounded-xl"
                style={{ 
                  background: selectedAnswer === currentPosition.evaluation 
                    ? 'rgba(74, 222, 128, 0.1)' 
                    : 'rgba(239, 68, 68, 0.1)' 
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  {selectedAnswer === currentPosition.evaluation ? (
                    <>
                      <span className="text-2xl">✅</span>
                      <span className="font-medium" style={{ color: '#4ade80' }}>Correct!</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">❌</span>
                      <span className="font-medium" style={{ color: '#ef4444' }}>
                        Not quite - {EVAL_OPTIONS.find(o => o.value === currentPosition.evaluation)?.label}
                      </span>
                    </>
                  )}
                </div>
                
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {currentPosition.mainReason}
                </p>
                
                <div className="space-y-1">
                  <div className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                    Key Factors:
                  </div>
                  {currentPosition.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      <span>•</span>
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
                
                <button onClick={nextPosition} className="btn-primary w-full mt-6">
                  {questionsAnswered >= 10 ? 'Finish Session' : 'Next Position →'}
                </button>
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
  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <div className="card p-8 text-center">
        <div className="text-6xl mb-4">
          {sessionScore >= 80 ? '🏆' : sessionScore >= 50 ? '👏' : '💪'}
        </div>
        <h2 className="text-3xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
          Session Complete!
        </h2>
        <p className="text-lg mb-8" style={{ color: 'var(--text-tertiary)' }}>
          {sessionScore >= 80 
            ? 'Excellent intuition!' 
            : sessionScore >= 50 
            ? 'Good work! Your intuition is improving!' 
            : 'Keep training - intuition builds with practice!'}
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
              {answerTimes.length > 0 
                ? `${(answerTimes.reduce((a, b) => a + b, 0) / answerTimes.length / 1000).toFixed(1)}s`
                : '--'}
            </div>
            <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Avg Time</div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button onClick={startSession} className="btn-primary">
            Train Again
          </button>
          <button onClick={() => navigate('/')} className="btn-ghost">
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default IntuitionTrainerPage;




