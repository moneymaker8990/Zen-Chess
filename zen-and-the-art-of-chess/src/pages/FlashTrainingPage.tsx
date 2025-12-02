// ============================================
// POSITION FLASH TRAINING
// Rapid pattern recognition - see position for 3 seconds, answer questions
// Builds "at a glance" intuition that separates masters from amateurs
// ============================================

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useNavigate } from 'react-router-dom';
import { 
  ALL_FLASH_POSITIONS, 
  type FlashPosition,
  type FlashQuestion 
} from '@/data/flashPositions';

// ============================================
// TYPES
// ============================================

type FlashMode = 'menu' | 'piece-count' | 'best-piece' | 'threats' | 'weaknesses' | 'plans' | 'evaluation' | 'king-safety' | 'pawn-structure' | 'mixed' | 'blitz-challenge';
type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'master';

interface FlashStats {
  totalSessions: number;
  totalCorrect: number;
  totalQuestions: number;
  bestStreak: number;
  averageTime: number;
  modeStats: Record<FlashMode, { correct: number; total: number }>;
  lastSession: string | null;
}

// ============================================
// CONFIGURATION
// ============================================

// Timing based on chess visualization training research:
// Beginners need 8-10s to build proper pattern recognition habits
// Time pressure should increase gradually as skills develop
const DIFFICULTY_SETTINGS: Record<Difficulty, { flashTime: number; questionTime: number; pointsMultiplier: number; countdownWarning: number }> = {
  beginner: { flashTime: 8000, questionTime: 45000, pointsMultiplier: 1, countdownWarning: 3000 },
  intermediate: { flashTime: 5000, questionTime: 30000, pointsMultiplier: 1.5, countdownWarning: 2000 },
  advanced: { flashTime: 3000, questionTime: 20000, pointsMultiplier: 2, countdownWarning: 1000 },
  master: { flashTime: 2000, questionTime: 15000, pointsMultiplier: 3, countdownWarning: 500 }
};

const MODE_INFO: Record<FlashMode, { name: string; description: string; icon: string; color: string }> = {
  menu: { name: 'Menu', description: '', icon: '', color: '' },
  'piece-count': { name: 'Piece Counting', description: 'Count pieces and material accurately', icon: '♟️', color: '#4ade80' },
  'best-piece': { name: 'Best & Worst Pieces', description: 'Identify active and passive pieces', icon: '👑', color: '#f59e0b' },
  threats: { name: 'Threat Detection', description: 'Spot immediate tactical threats', icon: '⚡', color: '#ef4444' },
  weaknesses: { name: 'Weakness Spotting', description: 'Find structural and tactical weaknesses', icon: '🎯', color: '#ec4899' },
  plans: { name: 'Strategic Planning', description: 'Identify correct plans for each side', icon: '🗺️', color: '#8b5cf6' },
  evaluation: { name: 'Position Evaluation', description: 'Assess who stands better and why', icon: '⚖️', color: '#06b6d4' },
  'king-safety': { name: 'King Safety', description: 'Assess castling and king protection', icon: '🏰', color: '#14b8a6' },
  'pawn-structure': { name: 'Pawn Structure', description: 'Identify pawn weaknesses and strengths', icon: '♙', color: '#eab308' },
  mixed: { name: 'Mixed Training', description: 'Random questions from all categories', icon: '🎲', color: '#a855f7' },
  'blitz-challenge': { name: 'Blitz Challenge', description: '60-second speed recognition challenge', icon: '🔥', color: '#f97316' }
};

const DEFAULT_STATS: FlashStats = {
  totalSessions: 0,
  totalCorrect: 0,
  totalQuestions: 0,
  bestStreak: 0,
  averageTime: 0,
  modeStats: {
    menu: { correct: 0, total: 0 },
    'piece-count': { correct: 0, total: 0 },
    'best-piece': { correct: 0, total: 0 },
    threats: { correct: 0, total: 0 },
    weaknesses: { correct: 0, total: 0 },
    plans: { correct: 0, total: 0 },
    evaluation: { correct: 0, total: 0 },
    'king-safety': { correct: 0, total: 0 },
    'pawn-structure': { correct: 0, total: 0 },
    mixed: { correct: 0, total: 0 },
    'blitz-challenge': { correct: 0, total: 0 }
  },
  lastSession: null
};

// Use the expanded positions database
const FLASH_POSITIONS = ALL_FLASH_POSITIONS;

// ============================================
// MAIN COMPONENT
// ============================================

export function FlashTrainingPage() {
  const navigate = useNavigate();
  
  // State
  const [mode, setMode] = useState<FlashMode>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('intermediate');
  const [stats, setStats] = useState<FlashStats>(() => {
    const saved = localStorage.getItem('zenChessFlashStats');
    return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
  });
  
  // Session state
  const [sessionActive, setSessionActive] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<FlashPosition | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showingPosition, setShowingPosition] = useState(false);
  const [showingQuestion, setShowingQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [positionsCompleted, setPositionsCompleted] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  // Smooth transition states
  const [countdownWarning, setCountdownWarning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<'none' | 'fading-out' | 'transitioning' | 'fading-in'>('none');
  const [showSessionComplete, setShowSessionComplete] = useState(false);
  const [breathingPause, setBreathingPause] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const questionTimerRef = useRef<ReturnType<typeof setInterval>>();
  
  // Save stats
  useEffect(() => {
    localStorage.setItem('zenChessFlashStats', JSON.stringify(stats));
  }, [stats]);
  
  // Get filtered positions based on mode
  const getPositionsForMode = useCallback((selectedMode: FlashMode): FlashPosition[] => {
    if (selectedMode === 'mixed' || selectedMode === 'blitz-challenge') return FLASH_POSITIONS;
    
    const typeMap: Record<FlashMode, FlashQuestion['type'][]> = {
      'piece-count': ['piece-count', 'material'],
      'best-piece': ['best-piece', 'worst-piece'],
      threats: ['threats'],
      weaknesses: ['weakness'],
      plans: ['plan'],
      evaluation: ['evaluation'],
      'king-safety': ['king-safety'],
      'pawn-structure': ['pawn-structure'],
      mixed: [],
      'blitz-challenge': [],
      menu: []
    };
    
    const relevantTypes = typeMap[selectedMode] || [];
    return FLASH_POSITIONS.filter(pos => 
      pos.questions.some(q => relevantTypes.includes(q.type))
    );
  }, []);
  
  // Load next position - accepts optional mode override to avoid stale closure issues
  const loadNextPosition = useCallback((modeOverride?: FlashMode) => {
    const activeMode = modeOverride || mode;
    const positions = getPositionsForMode(activeMode);
    if (positions.length === 0) {
      console.warn(`No positions found for mode: ${activeMode}`);
      return;
    }
    
    const randomPos = positions[Math.floor(Math.random() * positions.length)];
    setCurrentPosition(randomPos);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowingPosition(true);
    setShowingQuestion(false);
    
    // Start flash timer with countdown warning
    const settings = DIFFICULTY_SETTINGS[difficulty];
    setTimeRemaining(settings.flashTime);
    setCountdownWarning(false);
    setTransitionPhase('none');

    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        // Trigger countdown warning
        if (prev <= settings.countdownWarning && prev > settings.countdownWarning - 100) {
          setCountdownWarning(true);
        }
        
        if (prev <= 800) {
          // Start fade-out transition
          setTransitionPhase('fading-out');
        }
        
        if (prev <= 100) {
          clearInterval(timerRef.current);
          setTransitionPhase('transitioning');
          
          // Smooth transition pause before showing question
          setTimeout(() => {
            setShowingPosition(false);
            setCountdownWarning(false);
            setTransitionPhase('fading-in');
            setShowingQuestion(true);
            
            setTimeout(() => setTransitionPhase('none'), 300);
          }, 400);
          
          return settings.questionTime;
        }
        return prev - 100;
      });
    }, 100);
  }, [mode, difficulty, getPositionsForMode]);

  // Start a session - accepts mode to avoid stale state
  const startSession = useCallback((startMode: FlashMode) => {
    setSessionActive(true);
    setSessionScore(0);
    setSessionStreak(0);
    setQuestionsAnswered(0);
    setPositionsCompleted(0);
    loadNextPosition(startMode);
  }, [loadNextPosition]);
  
  // Handle answer selection
  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null || !currentPosition) return;
    
    clearInterval(questionTimerRef.current);
    setSelectedAnswer(index);
    setShowResult(true);
    
    const question = currentPosition.questions[currentQuestionIndex];
    const isCorrect = index === question.correctIndex;
    const settings = DIFFICULTY_SETTINGS[difficulty];
    
    setQuestionsAnswered(prev => prev + 1);
    
    if (isCorrect) {
      const points = Math.round(10 * settings.pointsMultiplier);
      setSessionScore(prev => prev + points);
      setSessionStreak(prev => prev + 1);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalCorrect: prev.totalCorrect + 1,
        totalQuestions: prev.totalQuestions + 1,
        bestStreak: Math.max(prev.bestStreak, sessionStreak + 1),
        modeStats: {
          ...prev.modeStats,
          [mode]: {
            correct: (prev.modeStats[mode]?.correct || 0) + 1,
            total: (prev.modeStats[mode]?.total || 0) + 1
          }
        }
      }));
    } else {
      setSessionStreak(0);
      setStats(prev => ({
        ...prev,
        totalQuestions: prev.totalQuestions + 1,
        modeStats: {
          ...prev.modeStats,
          [mode]: {
            correct: prev.modeStats[mode]?.correct || 0,
            total: (prev.modeStats[mode]?.total || 0) + 1
          }
        }
      }));
    }
  }, [selectedAnswer, currentPosition, currentQuestionIndex, difficulty, mode, sessionStreak]);

  // End session - must be defined before handleContinue since it depends on it
  const endSession = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(questionTimerRef.current);
    setSessionActive(false);
    setShowingPosition(false);
    setShowingQuestion(false);
    
    setStats(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      lastSession: new Date().toISOString()
    }));
  }, []);
  
  // Continue to next question or position with smooth transitions
  const handleContinue = useCallback(() => {
    if (!currentPosition) return;

    if (currentQuestionIndex < currentPosition.questions.length - 1) {
      // Next question for same position - smooth fade
      setTransitionPhase('fading-out');
      
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTransitionPhase('fading-in');

        const settings = DIFFICULTY_SETTINGS[difficulty];
        setTimeRemaining(settings.questionTime);
        
        setTimeout(() => setTransitionPhase('none'), 300);
      }, 200);
    } else {
      // Position complete - add breathing pause
      setPositionsCompleted(prev => prev + 1);

      if (positionsCompleted + 1 >= 10) {
        // Session complete - gentle ending
        setTransitionPhase('fading-out');
        setBreathingPause(true);
        
        setTimeout(() => {
          setShowSessionComplete(true);
          setBreathingPause(false);
          endSession();
        }, 1200);
      } else {
        // Breathing pause between positions
        setBreathingPause(true);
        setTransitionPhase('fading-out');
        
        setTimeout(() => {
          setBreathingPause(false);
          loadNextPosition(mode);
        }, 800);
      }
    }
  }, [currentPosition, currentQuestionIndex, difficulty, positionsCompleted, loadNextPosition, mode, endSession]);
  
  // Clean up timers
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(questionTimerRef.current);
    };
  }, []);
  
  // Start question timer when showing question
  useEffect(() => {
    if (showingQuestion && !showResult) {
      const settings = DIFFICULTY_SETTINGS[difficulty];
      setTimeRemaining(settings.questionTime);
      
      questionTimerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 100) {
            clearInterval(questionTimerRef.current);
            // Auto-fail if time runs out
            handleAnswer(-1);
            return 0;
          }
          return prev - 100;
        });
      }, 100);
    }
    
    return () => clearInterval(questionTimerRef.current);
  }, [showingQuestion, showResult, difficulty]);
  
  // Accuracy calculation
  const accuracy = useMemo(() => {
    if (stats.totalQuestions === 0) return 0;
    return Math.round((stats.totalCorrect / stats.totalQuestions) * 100);
  }, [stats]);
  
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
            <span style={{ color: 'var(--text-secondary)' }}>Flash Training</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            ⚡ Position Flash Training
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Study a position, then answer questions from memory. Build master-level pattern recognition at your own pace.
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
            <div className="stat-value" style={{ color: '#a855f7' }}>{stats.totalQuestions}</div>
            <div className="stat-label">Questions</div>
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
                  {DIFFICULTY_SETTINGS[d].flashTime / 1000}s flash time
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.entries(MODE_INFO) as [FlashMode, typeof MODE_INFO[FlashMode]][])
              .filter(([key]) => key !== 'menu')
              .map(([key, info]) => {
                const modeStats = stats.modeStats[key];
                const modeAccuracy = modeStats?.total > 0 
                  ? Math.round((modeStats.correct / modeStats.total) * 100) 
                  : 0;
                
                return (
                  <button
                    key={key}
                    onClick={() => { setMode(key); startSession(key); }}
                    className="card-interactive p-5 text-left group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: info.color + '20' }}
                      >
                        {info.icon}
                      </div>
                      {modeStats?.total > 0 && (
                        <span className="text-xs font-mono" style={{ color: modeAccuracy >= 70 ? '#4ade80' : '#f59e0b' }}>
                          {modeAccuracy}%
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                      {info.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      {info.description}
                    </p>
                  </button>
                );
              })}
          </div>
        </div>
        
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
                <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Study Position</div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  A position appears for 2-8 seconds. A countdown warns you before it hides.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                2
              </div>
              <div>
                <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Answer from Memory</div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Answer questions about what you observed. Take your time—beginners get 45 seconds.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent-primary)', color: 'white' }}>
                3
              </div>
              <div>
                <div className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Build Intuition</div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Regular practice develops the "at a glance" pattern recognition that masters have.
                </p>
              </div>
            </div>
          </div>
          
          {/* Additional guidance */}
          <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              💡 <strong>Start with Beginner</strong> — Research shows pattern recognition develops best 
              when you have enough time to truly absorb the position. Speed comes naturally with practice.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: ACTIVE SESSION
  // ============================================
  if (sessionActive && currentPosition) {
    const currentQuestion = currentPosition.questions[currentQuestionIndex];
    const settings = DIFFICULTY_SETTINGS[difficulty];
    const maxTime = showingPosition ? settings.flashTime : settings.questionTime;
    const timePercent = (timeRemaining / maxTime) * 100;
    const modeInfo = MODE_INFO[mode];
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{modeInfo.icon}</span>
            <div>
              <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>{modeInfo.name}</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Position {positionsCompleted + 1}/10</p>
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
            <button
              onClick={endSession}
              className="btn-ghost text-sm"
            >
              End Session
            </button>
          </div>
        </div>
        
        {/* Timer Bar */}
        <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
          <div 
            className="absolute inset-y-0 left-0 transition-all duration-100 rounded-full"
            style={{ 
              width: `${timePercent}%`,
              background: timePercent > 30 ? 'var(--accent-primary)' : '#ef4444'
            }}
          />
        </div>
        
        {/* Breathing pause overlay */}
        {breathingPause && (
          <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <div className="text-center animate-pulse">
              <div className="text-6xl mb-4">🧘</div>
              <h3 className="text-2xl font-display" style={{ color: 'white' }}>
                {positionsCompleted >= 9 ? 'Session complete...' : 'Take a breath...'}
              </h3>
              <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {positionsCompleted >= 9 ? 'Great work today!' : 'Next position loading...'}
              </p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Board */}
          <div className="relative">
            <div 
              className={`chessboard-container transition-all duration-500 ease-out ${
                transitionPhase === 'fading-out' ? 'opacity-50 scale-[0.98]' : 
                transitionPhase === 'fading-in' ? 'opacity-100 scale-100' :
                showingPosition ? 'opacity-100' : 'opacity-0'
              } ${countdownWarning ? 'ring-4 ring-amber-400/50 animate-pulse' : ''}`}
            >
              <Chessboard
                position={currentPosition.fen}
                boardOrientation={new Chess(currentPosition.fen).turn() === 'w' ? 'white' : 'black'}
                customDarkSquareStyle={{ backgroundColor: '#779556' }}
                customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
                arePiecesDraggable={false}
                boardWidth={480}
              />
              
              {/* Countdown warning overlay */}
              {countdownWarning && showingPosition && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-8xl font-bold animate-pulse" style={{ 
                    color: 'rgba(251, 191, 36, 0.9)',
                    textShadow: '0 0 40px rgba(251, 191, 36, 0.5)'
                  }}>
                    {Math.ceil(timeRemaining / 1000)}
                  </div>
                </div>
              )}
            </div>

            {/* Flash overlay - smoother transition */}
            {!showingPosition && !showResult && transitionPhase !== 'fading-out' && (
              <div
                className="absolute inset-0 flex items-center justify-center rounded-xl animate-fade-in"
                style={{ background: 'var(--bg-primary)' }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 animate-bounce">🧠</div>
                  <h3 className="text-xl font-display" style={{ color: 'var(--text-primary)' }}>
                    Position Hidden
                  </h3>
                  <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                    Answer from memory!
                  </p>
                </div>
              </div>
            )}

            {/* Show position again in result - with smooth fade */}
            {showResult && (
              <div className={`chessboard-container transition-opacity duration-300 ${
                transitionPhase === 'fading-out' ? 'opacity-50' : 'opacity-100'
              }`}>
                <Chessboard
                  position={currentPosition.fen}
                  boardOrientation={new Chess(currentPosition.fen).turn() === 'w' ? 'white' : 'black'}
                  customDarkSquareStyle={{ backgroundColor: '#779556' }}
                  customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
                  arePiecesDraggable={false}
                  boardWidth={480}
                />
              </div>
            )}
          </div>
          
          {/* Question Panel */}
          <div className={`space-y-6 transition-all duration-300 ${
            transitionPhase === 'fading-out' ? 'opacity-70 translate-y-1' : 
            transitionPhase === 'fading-in' ? 'opacity-100 translate-y-0' : ''
          }`}>
            {showingPosition ? (
              <div className={`card p-8 text-center transition-all duration-500 ${
                countdownWarning ? 'ring-2 ring-amber-400/30' : ''
              }`}>
                <div className="text-6xl mb-4">👀</div>
                <h3 className="text-2xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
                  {countdownWarning ? 'Position fading soon...' : 'Memorize the Position!'}
                </h3>
                <p style={{ color: countdownWarning ? '#fbbf24' : 'var(--text-tertiary)' }}>
                  {countdownWarning 
                    ? `${Math.ceil(timeRemaining / 1000)} seconds left - focus!`
                    : `Take your time to observe (${(timeRemaining / 1000).toFixed(1)}s)`
                  }
                </p>
                <div className={`mt-6 text-4xl font-mono font-bold transition-all duration-300 ${
                  countdownWarning ? 'text-amber-400 scale-110' : ''
                }`} style={{ color: countdownWarning ? '#fbbf24' : 'var(--accent-primary)' }}>
                  {(timeRemaining / 1000).toFixed(1)}s
                </div>
                
                {/* Progress hints for beginners */}
                {difficulty === 'beginner' && !countdownWarning && (
                  <div className="mt-4 text-xs space-y-1" style={{ color: 'var(--text-muted)' }}>
                    <p>💡 Look at: piece placement, king safety, pawn structure</p>
                  </div>
                )}
              </div>
            ) : showingQuestion && currentQuestion && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge">Question {currentQuestionIndex + 1}/{currentPosition.questions.length}</span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {(timeRemaining / 1000).toFixed(0)}s
                  </span>
                </div>
                
                <h3 className="text-xl font-medium mb-6" style={{ color: 'var(--text-primary)' }}>
                  {currentQuestion.question}
                </h3>
                
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    let buttonStyle = 'var(--bg-tertiary)';
                    let textColor = 'var(--text-secondary)';
                    
                    if (showResult) {
                      if (index === currentQuestion.correctIndex) {
                        buttonStyle = 'rgba(74, 222, 128, 0.2)';
                        textColor = '#4ade80';
                      } else if (index === selectedAnswer) {
                        buttonStyle = 'rgba(239, 68, 68, 0.2)';
                        textColor = '#ef4444';
                      }
                    } else if (selectedAnswer === index) {
                      buttonStyle = 'var(--accent-primary)';
                      textColor = 'white';
                    }
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showResult}
                        className="w-full p-4 rounded-xl text-left transition-all hover:scale-[1.02]"
                        style={{ background: buttonStyle, color: textColor }}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                      </button>
                    );
                  })}
                </div>
                
                {/* Result explanation */}
                {showResult && (
                  <div className="mt-6 p-4 rounded-xl" style={{ background: 'var(--bg-elevated)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      {selectedAnswer === currentQuestion.correctIndex ? (
                        <>
                          <span className="text-xl">✅</span>
                          <span className="font-medium" style={{ color: '#4ade80' }}>Correct!</span>
                        </>
                      ) : (
                        <>
                          <span className="text-xl">❌</span>
                          <span className="font-medium" style={{ color: '#ef4444' }}>Incorrect</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      {currentQuestion.explanation}
                    </p>
                    <button
                      onClick={handleContinue}
                      className="btn-primary w-full mt-4"
                    >
                      Continue →
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
  if (!sessionActive && positionsCompleted > 0) {
    const sessionAccuracy = questionsAnswered > 0
      ? Math.round((sessionScore / (questionsAnswered * 10 * DIFFICULTY_SETTINGS[difficulty].pointsMultiplier)) * 100)
      : 0;
    
    // Encouraging message based on performance
    const getMessage = () => {
      if (sessionAccuracy >= 90) return { emoji: '🌟', title: 'Outstanding!', subtitle: 'Master-level pattern recognition!' };
      if (sessionAccuracy >= 70) return { emoji: '🎯', title: 'Great Work!', subtitle: 'Your visualization is improving' };
      if (sessionAccuracy >= 50) return { emoji: '📈', title: 'Good Progress!', subtitle: 'Keep practicing to build intuition' };
      return { emoji: '🌱', title: 'Keep Growing!', subtitle: 'Every session strengthens your chess vision' };
    };
    const message = getMessage();

    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        {/* Gentle fade-in card */}
        <div className="card p-8 text-center animate-fade-in" style={{ animationDuration: '0.6s' }}>
          {/* Celebration icon with delayed animation */}
          <div className="text-7xl mb-4 animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1s' }}>
            {message.emoji}
          </div>
          
          <h2 className="text-3xl font-display mb-2 animate-fade-in" style={{ 
            color: 'var(--text-primary)',
            animationDelay: '0.3s'
          }}>
            {message.title}
          </h2>
          <p className="text-lg mb-8 animate-fade-in" style={{ 
            color: 'var(--text-tertiary)',
            animationDelay: '0.4s'
          }}>
            {message.subtitle}
          </p>

          {/* Stats with staggered reveal */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="text-4xl font-mono font-bold transition-all duration-500" style={{ color: '#4ade80' }}>
                {sessionScore}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Points</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl font-mono font-bold" style={{ color: '#f59e0b' }}>
                {sessionStreak}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Best Streak</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="text-4xl font-mono font-bold" style={{ color: '#a855f7' }}>
                {sessionAccuracy}%
              </div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Accuracy</div>
            </div>
          </div>

          {/* Mindful message */}
          <div className="mb-8 p-4 rounded-xl animate-fade-in" style={{ 
            background: 'var(--bg-tertiary)',
            animationDelay: '0.8s'
          }}>
            <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
              "Pattern recognition is built one position at a time. 
              {sessionAccuracy >= 70 
                ? " Your chess intuition is growing stronger."
                : " Trust the process—your brain is learning even from mistakes."}
              "
            </p>
          </div>

          {/* Action buttons with smooth fade-in */}
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <button 
              onClick={() => { setShowSessionComplete(false); startSession(mode); }} 
              className="btn-primary"
            >
              🔄 Train Again
            </button>
            <button 
              onClick={() => { setMode('menu'); setPositionsCompleted(0); setShowSessionComplete(false); }} 
              className="btn-secondary"
            >
              📋 Change Mode
            </button>
            <button onClick={() => navigate('/')} className="btn-ghost">
              🏠 Back Home
            </button>
          </div>
        </div>
        
        {/* Tip for next session */}
        <div className="card p-4 text-center animate-fade-in" style={{ animationDelay: '1.1s' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            💡 <strong>Tip:</strong> {
              difficulty === 'beginner' 
                ? "Once you hit 80%+ accuracy consistently, try Intermediate difficulty"
                : difficulty === 'intermediate'
                ? "Focus on the key pieces first, then scan the whole board"
                : "Challenge yourself with different training modes to build well-rounded vision"
            }
          </p>
        </div>
      </div>
    );
  }
  
  return null;
}

export default FlashTrainingPage;
