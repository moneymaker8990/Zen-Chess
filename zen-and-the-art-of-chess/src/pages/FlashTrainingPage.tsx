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
import { useBoardSize } from '@/hooks/useBoardSize';
import { useBoardStyles } from '@/state/boardSettingsStore';

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Fisher-Yates shuffle for proper randomization
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

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

// localStorage persistence for last shown position
const LAST_POSITION_STORAGE_KEY = 'zenChessFlashLastPosition';

const getLastShownPosition = (): string | null => {
  try {
    return localStorage.getItem(LAST_POSITION_STORAGE_KEY);
  } catch {
    return null;
  }
};

const saveLastShownPosition = (fen: string) => {
  try {
    localStorage.setItem(LAST_POSITION_STORAGE_KEY, fen);
  } catch {
    // Ignore storage errors
  }
};

// Use the expanded positions database
const FLASH_POSITIONS = ALL_FLASH_POSITIONS;

// ============================================
// OBSERVATION GUIDES BY QUESTION TYPE
// ============================================

const OBSERVATION_GUIDES: Record<FlashQuestion['type'], string[]> = {
  'piece-count': [
    'Scan systematically: knights, bishops, rooks, queens, kings',
    'Count each piece type separately',
    'Check both colors - White and Black'
  ],
  'material': [
    'Compare total material value',
    'Count pawns, minor pieces, major pieces',
    'Look for material imbalances'
  ],
  'best-piece': [
    'Look for pieces on active squares',
    'Check pieces controlling center',
    'Identify pieces with high mobility',
    'Find pieces with attacking potential'
  ],
  'worst-piece': [
    'Find pieces on passive squares',
    'Look for blocked or trapped pieces',
    'Identify pieces with limited mobility',
    'Check for pieces doing nothing'
  ],
  'threats': [
    'Check for checks',
    'Look for captures (especially undefended pieces)',
    'Scan for forks, pins, skewers',
    'Watch for discovered attacks',
    'Identify mate threats'
  ],
  'weakness': [
    'Find weak squares (holes)',
    'Look for weak pawns (isolated, doubled, backward)',
    'Check for exposed kings',
    'Identify pieces that are hard to defend'
  ],
  'plan': [
    'Assess pawn structure',
    'Check piece placement and activity',
    'Evaluate king safety',
    'Identify weaknesses to target',
    'Consider typical plans for the position type'
  ],
  'evaluation': [
    'Compare material balance',
    'Assess piece activity',
    'Check king safety',
    'Evaluate pawn structure',
    'Consider space and control'
  ],
  'king-safety': [
    'Check if kings are castled',
    'Look at pawn shields',
    'Identify attacking pieces nearby',
    'Check for open files/ranks',
    'Assess king mobility'
  ],
  'pawn-structure': [
    'Count pawn islands',
    'Look for weak pawns (isolated, doubled, backward)',
    'Check for passed pawns',
    'Identify pawn majorities',
    'Evaluate pawn breaks'
  ],
  'square-control': [
    'Check which squares are controlled',
    'Look for weak squares (holes)',
    'Identify outpost squares',
    'Evaluate central control'
  ]
};

// Get observation hints for a question type
const getObservationHints = (questionType: FlashQuestion['type'], difficulty: Difficulty): string[] => {
  const baseHints = OBSERVATION_GUIDES[questionType] || [];
  if (difficulty === 'beginner') {
    return baseHints;
  } else if (difficulty === 'intermediate') {
    return baseHints.slice(0, Math.ceil(baseHints.length * 0.7));
  } else {
    return baseHints.slice(0, Math.ceil(baseHints.length * 0.5));
  }
};

// ============================================
// MAIN COMPONENT
// ============================================

export function FlashTrainingPage() {
  const navigate = useNavigate();
  const boardSize = useBoardSize(480, 32);
  const boardStyles = useBoardStyles();
  
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
  const [showPrePositionGuide, setShowPrePositionGuide] = useState(false);
  
  // Session tracking - avoid showing same position twice in a session
  const [seenPositions, setSeenPositions] = useState<Set<string>>(new Set());
  // Track weak categories for session summary
  const [sessionMistakes, setSessionMistakes] = useState<Array<{ category: string; question: string; position: FlashPosition; questionIndex: number }>>([]);
  
  // Educational features state
  const [studyMode, setStudyMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('zenChessFlashStudyMode');
    return saved === 'true';
  });
  const [showHints, setShowHints] = useState<boolean>(() => {
    const saved = localStorage.getItem('zenChessFlashShowHints');
    return saved !== 'false'; // Default to true
  });
  const [reviewMode, setReviewMode] = useState(false);
  const [mistakesToReview, setMistakesToReview] = useState<Array<{ position: FlashPosition; questionIndex: number; selectedAnswer: number }>>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [learningPathMode, setLearningPathMode] = useState(false);
  const [learningPathProgress, setLearningPathProgress] = useState<Record<string, boolean>>({});
  const [showLearningPathTutorial, setShowLearningPathTutorial] = useState(false);
  const [learningPathTutorialMode, setLearningPathTutorialMode] = useState<FlashMode | null>(null);
  
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const questionTimerRef = useRef<ReturnType<typeof setInterval>>();
  
  // Save stats and preferences
  useEffect(() => {
    localStorage.setItem('zenChessFlashStats', JSON.stringify(stats));
  }, [stats]);
  
  useEffect(() => {
    localStorage.setItem('zenChessFlashStudyMode', studyMode.toString());
  }, [studyMode]);
  
  useEffect(() => {
    localStorage.setItem('zenChessFlashShowHints', showHints.toString());
  }, [showHints]);
  
  // Reset seen positions when mode changes
  useEffect(() => {
    setSeenPositions(new Set());
  }, [mode]);
  
  // Show learning path tutorial when starting a new concept (initial start)
  useEffect(() => {
    if (learningPathMode && sessionActive && mode === 'piece-count' && positionsCompleted === 0 && !showingPosition && !showingQuestion && !showLearningPathTutorial) {
      const isNewConcept = !learningPathProgress[mode];
      if (isNewConcept) {
        setShowLearningPathTutorial(true);
        setLearningPathTutorialMode(mode);
        // Pause timers
        clearInterval(timerRef.current);
        clearInterval(questionTimerRef.current);
      }
    }
  }, [learningPathMode, sessionActive, mode, learningPathProgress, positionsCompleted, showingPosition, showingQuestion, showLearningPathTutorial]);
  
  // Temporary debug: clear localStorage position on mount to test randomization
  useEffect(() => {
    console.log('[Flash Training] Clearing localStorage position for debug');
    localStorage.removeItem(LAST_POSITION_STORAGE_KEY);
  }, []);
  
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
  
  // Start position viewing (called after pre-position guide or immediately)
  const startPositionViewing = useCallback((position: FlashPosition) => {
    setShowPrePositionGuide(false);
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
        
        if (prev <= 800 && prev > 100) {
          // Start fade-out transition
          setTransitionPhase('fading-out');
        }
        
        if (prev <= 100) {
          clearInterval(timerRef.current);
          console.log('[Timer] Position viewing complete, transitioning to question...');
          console.log('[Timer] studyMode:', studyMode);
          setTransitionPhase('transitioning');
          
          // Smooth transition pause before showing question
          setTimeout(() => {
            console.log('[Timer] Setting states: showingPosition=', !studyMode, ', showingQuestion=true');
            // In study mode, keep position visible
            if (!studyMode) {
              setShowingPosition(false);
            }
            setCountdownWarning(false);
            setTransitionPhase('fading-in');
            setShowingQuestion(true);
            setTimeRemaining(settings.questionTime);
            
            setTimeout(() => {
              setTransitionPhase('none');
              console.log('[Timer] Transition complete');
            }, 300);
          }, 400);
          
          return 0; // Return 0 instead of questionTime to avoid premature update
        }
        return prev - 100;
      });
    }, 100);
  }, [difficulty, studyMode]);
  
  // Load next position - accepts optional mode override to avoid stale closure issues
  // Now with de-duplication to avoid showing the same position twice in a session
  // AND persists last-shown position across sessions to avoid immediate repeats
  const loadNextPosition = useCallback((modeOverride?: FlashMode) => {
    const activeMode = modeOverride || mode;
    const positions = getPositionsForMode(activeMode);
    if (positions.length === 0) {
      console.warn(`No positions found for mode: ${activeMode}`);
      return;
    }
    
    // Get last position shown (from previous session or current session)
    const lastShownFen = getLastShownPosition();
    
    // Filter out already-seen positions in this session AND last session's position
    const unseenPositions = positions.filter(p => 
      !seenPositions.has(p.fen) && p.fen !== lastShownFen
    );
    
    // Don't reset until 80% of positions seen (better variation)
    const minUnseenBeforeReset = Math.floor(positions.length * 0.2);
    const availablePositions = unseenPositions.length >= minUnseenBeforeReset
      ? unseenPositions 
      : positions.filter(p => p.fen !== lastShownFen); // Only exclude last position on reset
    
    // Shuffle for better randomization
    const shuffledPositions = shuffleArray(availablePositions);
    
    // Pick the first position from shuffled array (or fallback to any position)
    const randomPos = shuffledPositions[0] || positions[0];
    
    // Mark this position as seen and save to localStorage
    setSeenPositions(prev => new Set([...prev, randomPos.fen]));
    saveLastShownPosition(randomPos.fen);
    
    // Debug logging - expanded for visibility
    console.log('[Position Selection]', {
      mode: activeMode,
      totalInDatabase: positions.length,
      seenThisSession: seenPositions.size,
      unseenPositions: unseenPositions.length,
      availableAfterFilter: availablePositions.length,
      selectedTitle: randomPos.title || 'Untitled',
      questionType: randomPos.questions[0]?.type
    });
    
    setCurrentPosition(randomPos);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setShowingPosition(false);
    setShowingQuestion(false);
    
    // Show pre-position guide with observation tips
    if (showHints) {
      setShowPrePositionGuide(true);
      setTransitionPhase('none');
      // Don't start timer yet - wait for user to click "Ready"
    } else {
      // Skip guide and show position immediately
      startPositionViewing(randomPos);
    }
  }, [mode, difficulty, getPositionsForMode, seenPositions, showHints, startPositionViewing]);

  // Learning path progression order
  const LEARNING_PATH_ORDER: FlashMode[] = [
    'piece-count',
    'best-piece',
    'threats',
    'weaknesses',
    'plans',
    'evaluation'
  ];
  
  // Start a session - accepts mode to avoid stale state
  const startSession = useCallback((startMode: FlashMode) => {
    setSessionActive(true);
    setSessionScore(0);
    setSessionStreak(0);
    setQuestionsAnswered(0);
    setPositionsCompleted(0);
    setSeenPositions(new Set()); // Clear seen positions for fresh start
    setSessionMistakes([]); // Reset mistake tracking
    setMistakesToReview([]); // Clear review list
    
    console.log('[Session Start] Mode:', startMode, 'Learning Path:', learningPathMode);
    console.log('[Session Start] Cleared seen positions for better variety');
    
    if (learningPathMode) {
      setMode('piece-count');
      loadNextPosition('piece-count');
    } else {
      loadNextPosition(startMode);
    }
  }, [loadNextPosition, learningPathMode]);
  
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
      
      // Track mistake for session summary and review
      if (currentPosition) {
        setSessionMistakes(prev => [...prev, {
          category: question.type,
          question: question.question.slice(0, 50),
          position: currentPosition,
          questionIndex: currentQuestionIndex
        }]);
        
        // Add to review list
        setMistakesToReview(prev => [...prev, {
          position: currentPosition,
          questionIndex: currentQuestionIndex,
          selectedAnswer: index
        }]);
      }
    }
  }, [selectedAnswer, currentPosition, currentQuestionIndex, difficulty, mode, sessionStreak]);

  // End session - must be defined before handleContinue since it depends on it
  const endSession = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(questionTimerRef.current);
    setSessionActive(false);
    setShowingPosition(false);
    setShowingQuestion(false);
    setShowPrePositionGuide(false);
    setShowLearningPathTutorial(false);
    
    // If no positions completed, return to menu
    if (positionsCompleted === 0) {
      setMode('menu');
      setPositionsCompleted(0);
      return;
    }
    
    setStats(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      lastSession: new Date().toISOString()
    }));
  }, [positionsCompleted]);
  
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
          
          // Learning path progression: advance after 3 positions of current concept
          if (learningPathMode && positionsCompleted > 0 && positionsCompleted % 3 === 0) {
            const currentIndex = LEARNING_PATH_ORDER.indexOf(mode);
            if (currentIndex < LEARNING_PATH_ORDER.length - 1) {
              const nextMode = LEARNING_PATH_ORDER[currentIndex + 1];
              setMode(nextMode);
              setLearningPathProgress(prev => ({ ...prev, [mode]: true }));
              // Show tutorial for new concept
              setShowLearningPathTutorial(true);
              setLearningPathTutorialMode(nextMode);
            } else {
              // Learning path complete
              loadNextPosition(mode);
            }
          } else {
            loadNextPosition(mode);
          }
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
  
  // Start question timer when showing question (not in study mode)
  useEffect(() => {
    if (showingQuestion && !showResult && !studyMode) {
      const settings = DIFFICULTY_SETTINGS[difficulty];
      
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
    } else if (studyMode && showingQuestion && !showResult) {
      // In study mode, set a very long time (effectively unlimited)
      setTimeRemaining(999999);
    }
    
    return () => clearInterval(questionTimerRef.current);
  }, [showingQuestion, showResult, difficulty, studyMode, handleAnswer]);
  
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
      <div className="space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
        {/* Header */}
        <header>
          <div className="flex items-center gap-2 text-xs sm:text-sm mb-2 sm:mb-4">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
              Home
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>Flash</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium mb-1 sm:mb-2" style={{ color: 'var(--text-primary)' }}>
            ⚡ Flash Training
          </h1>
          <p className="text-sm sm:text-lg" style={{ color: 'var(--text-tertiary)' }}>
            Study a position, answer from memory
          </p>
        </header>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
          <div className="stat-card p-2 sm:p-4">
            <div className="stat-value text-gradient text-sm sm:text-xl">{stats.totalSessions}</div>
            <div className="stat-label text-[9px] sm:text-xs">Sessions</div>
          </div>
          <div className="stat-card p-2 sm:p-4">
            <div className="stat-value text-sm sm:text-xl" style={{ color: '#4ade80' }}>{accuracy}%</div>
            <div className="stat-label text-[9px] sm:text-xs">Accuracy</div>
          </div>
          <div className="stat-card p-2 sm:p-4">
            <div className="stat-value" style={{ color: '#f59e0b' }}>{stats.bestStreak}</div>
            <div className="stat-label">Best Streak</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#a855f7' }}>{stats.totalQuestions}</div>
            <div className="stat-label">Questions</div>
          </div>
        </div>
        
        {/* Difficulty Selection */}
        <div className="card p-3 sm:p-6">
          <h3 className="text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4" style={{ color: 'var(--text-muted)' }}>
            Difficulty
          </h3>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
            {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`p-2 sm:p-4 rounded-lg sm:rounded-xl text-left transition-all ${
                  difficulty === d ? 'ring-2 ring-[var(--accent-primary)]' : ''
                }`}
                style={{ background: difficulty === d ? 'var(--accent-primary)' + '20' : 'var(--bg-tertiary)' }}
              >
                <div className="font-medium capitalize text-xs sm:text-base mb-0.5 sm:mb-1" style={{ color: 'var(--text-primary)' }}>
                  {d.slice(0, 3)}
                </div>
                <div className="text-[9px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
                  {DIFFICULTY_SETTINGS[d].flashTime / 1000}s
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Study Options */}
        <div className="card p-3 sm:p-6">
          <h3 className="text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4" style={{ color: 'var(--text-muted)' }}>
            Learning Options
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-[var(--bg-tertiary)] transition-colors" style={{ background: studyMode ? 'var(--accent-primary)' + '20' : 'var(--bg-tertiary)' }}>
              <div>
                <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>📚 Study Mode</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Keep board visible while answering</div>
              </div>
              <input
                type="checkbox"
                checked={studyMode}
                onChange={(e) => setStudyMode(e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-[var(--bg-tertiary)] transition-colors" style={{ background: showHints ? 'var(--accent-primary)' + '20' : 'var(--bg-tertiary)' }}>
              <div>
                <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>💡 Observation Hints</div>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Show what to look for during viewing</div>
              </div>
              <input
                type="checkbox"
                checked={showHints}
                onChange={(e) => setShowHints(e.target.checked)}
                className="w-5 h-5 rounded"
              />
            </label>
          </div>
        </div>
        
        {/* Training Modes */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Training Modes
            </h3>
            <button
              onClick={() => {
                setLearningPathMode(true);
                setMode('piece-count');
                startSession('piece-count');
              }}
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: 'var(--accent-primary)', color: 'white' }}
            >
              🎓 Learning Path
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
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
      <div className="space-y-6 animate-fade-in max-w-full">
        {/* Header */}
        <div className="card p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: modeInfo.color + '20' }}>
              {modeInfo.icon}
            </div>
            <div>
              <h2 className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>{modeInfo.name}</h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Position {positionsCompleted + 1}/10</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center px-3">
              <div className="text-2xl font-mono font-bold" style={{ color: '#4ade80' }}>{sessionScore}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Score</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-mono font-bold flex items-center gap-1" style={{ color: '#f59e0b' }}>
                <span>🔥</span>
                <span>{sessionStreak}</span>
              </div>
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
        
        {/* Session Controls Toolbar */}
        <div className="card p-2 sm:p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setStudyMode(prev => !prev)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 sm:gap-2 ${
                studyMode ? 'ring-2 ring-purple-500' : ''
              }`}
              style={{ background: studyMode ? '#8b5cf6' : 'var(--bg-tertiary)', color: studyMode ? 'white' : 'var(--text-secondary)' }}
            >
              <span className="text-sm sm:text-base">{studyMode ? '📚' : '📖'}</span>
              <span className="hidden sm:inline">Study Mode</span>
              <span className="sm:hidden">Study</span>
            </button>
            <button
              onClick={() => setShowHints(prev => !prev)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 sm:gap-2 ${
                showHints ? 'ring-2 ring-green-500' : ''
              }`}
              style={{ background: showHints ? '#4ade80' : 'var(--bg-tertiary)', color: showHints ? 'white' : 'var(--text-secondary)' }}
            >
              <span className="text-sm sm:text-base">{showHints ? '💡' : '🔦'}</span>
              <span className="hidden sm:inline">Hints</span>
              <span className="sm:hidden">Hints</span>
            </button>
            <button
              onClick={() => {
                if (currentPosition) {
                  // Skip current position
                  setSeenPositions(prev => new Set([...prev, currentPosition.fen]));
                  loadNextPosition(mode);
                }
              }}
              className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 sm:gap-2"
              style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
            >
              <span className="text-sm sm:text-base">⏭️</span>
              <span>Skip</span>
            </button>
          </div>
          <div className="text-xs text-center sm:text-left" style={{ color: 'var(--text-muted)' }}>
            {seenPositions.size} seen
          </div>
        </div>
        
        {/* Timer Bar */}
        <div className="relative h-3 rounded-full overflow-hidden shadow-inner" style={{ background: 'var(--bg-tertiary)' }}>
          <div 
            className="absolute inset-y-0 left-0 transition-all duration-100 rounded-full"
            style={{ 
              width: `${timePercent}%`,
              background: timePercent > 30 ? 'linear-gradient(90deg, var(--accent-primary), #4ade80)' : 'linear-gradient(90deg, #ef4444, #f97316)'
            }}
          />
        </div>
        
        {/* Learning Path Tutorial Overlay */}
        {showLearningPathTutorial && learningPathTutorialMode && (
          <div className="fixed inset-0 lg:inset-y-0 lg:left-64 lg:right-0 z-50 flex items-center justify-center animate-fade-in" style={{ background: 'rgba(0,0,0,0.8)' }}>
            <div className="max-w-2xl mx-4 card p-8 text-center">
              <div className="text-6xl mb-4">{MODE_INFO[learningPathTutorialMode].icon}</div>
              <h3 className="text-3xl font-display mb-4" style={{ color: 'var(--text-primary)' }}>
                {MODE_INFO[learningPathTutorialMode].name}
              </h3>
              <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
                {MODE_INFO[learningPathTutorialMode].description}
              </p>
              
              <div className="text-left mb-6 p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                  What to focus on:
                </div>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {getObservationHints(
                    learningPathTutorialMode === 'piece-count' ? 'piece-count' :
                    learningPathTutorialMode === 'best-piece' ? 'best-piece' :
                    learningPathTutorialMode === 'threats' ? 'threats' :
                    learningPathTutorialMode === 'weaknesses' ? 'weakness' :
                    learningPathTutorialMode === 'plans' ? 'plan' : 'evaluation',
                    'beginner'
                  ).map((hint, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span style={{ color: 'var(--accent-primary)' }}>•</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={() => {
                  setShowLearningPathTutorial(false);
                  setLearningPathProgress(prev => ({ ...prev, [learningPathTutorialMode]: true }));
                  // Resume session by loading position
                  if (learningPathTutorialMode) {
                    loadNextPosition(learningPathTutorialMode);
                  }
                }}
                className="btn-primary"
              >
                Start Training →
              </button>
            </div>
          </div>
        )}
        
        {/* Breathing pause overlay - positioned to respect sidebar on desktop */}
        {breathingPause && (
          <div className="fixed inset-0 lg:inset-y-0 lg:left-64 lg:right-0 z-50 flex items-center justify-center animate-fade-in" style={{ background: 'rgba(0,0,0,0.7)' }}>
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

        {/* Pre-Position Guide - Show Before Board */}
        {showPrePositionGuide && currentPosition && currentPosition.questions[currentQuestionIndex] && (
          <div className="fixed inset-0 lg:inset-y-0 lg:left-64 lg:right-0 z-50 flex items-center justify-center animate-fade-in" style={{ background: 'rgba(0,0,0,0.85)' }}>
            <div className="max-w-2xl mx-4 card p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">👀</div>
                <h3 className="text-3xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
                  Get Ready!
                </h3>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  In a moment, you'll see a position for {(DIFFICULTY_SETTINGS[difficulty].flashTime / 1000).toFixed(0)} seconds
                </p>
              </div>
              
              <div className="text-left mb-8 p-6 rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(74, 222, 128, 0.1))', border: '2px solid var(--accent-primary)' + '40' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-primary)' }}>
                    <span className="text-2xl">💡</span>
                  </div>
                  <span className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    What to Look For:
                  </span>
                </div>
                <ul className="space-y-3 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {getObservationHints(currentPosition.questions[currentQuestionIndex].type, difficulty).map((hint, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors">
                      <span className="text-xl mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-primary)' }}>✓</span>
                      <span className="flex-1">{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={() => {
                  if (currentPosition) {
                    startPositionViewing(currentPosition);
                  }
                }}
                className="btn-primary w-full text-lg py-4"
              >
                I'm Ready - Show Position →
              </button>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 px-2 sm:px-0 max-w-full">
          {/* Board */}
          <div className="flex justify-center items-start">
            <div 
              className="relative"
              style={{ width: boardSize, maxWidth: '100%', height: boardSize }}
            >
              {/* Show board during position flash, result, or study mode during questions */}
              {(showingPosition || showResult || (studyMode && showingQuestion)) && (
                <div 
                  className={`transition-all duration-500 ease-out ${
                    transitionPhase === 'fading-out' ? 'opacity-50 scale-[0.98]' : 
                    transitionPhase === 'fading-in' ? 'opacity-100 scale-100' :
                    'opacity-100'
                  } ${countdownWarning ? 'ring-4 ring-amber-400/50 animate-pulse' : ''}`}
                >
                  <Chessboard
                    position={currentPosition.fen}
                    boardOrientation={new Chess(currentPosition.fen).turn() === 'w' ? 'white' : 'black'}
                    customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                    customLightSquareStyle={boardStyles.customLightSquareStyle}
                    arePiecesDraggable={false}
                    boardWidth={boardSize}
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
              )}

              {/* Flash overlay - position hidden (when study mode is off during questions) */}
              {showingQuestion && !showResult && !studyMode && transitionPhase !== 'fading-out' && (
                <div
                  className="absolute inset-0 flex items-center justify-center animate-fade-in rounded-xl shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, var(--bg-primary), var(--bg-secondary))', border: '3px solid var(--accent-primary)' + '40' }}
                >
                  <div className="text-center p-8">
                    <div className="text-7xl mb-4 animate-pulse">🧠</div>
                    <h3 className="text-2xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
                      Position Hidden
                    </h3>
                    <p className="text-base" style={{ color: 'var(--text-muted)' }}>
                      Answer from memory!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Question Panel */}
          <div className={`space-y-6 transition-all duration-300 ${
            transitionPhase === 'fading-out' ? 'opacity-70 translate-y-1' : 
            transitionPhase === 'fading-in' ? 'opacity-100 translate-y-0' : ''
          }`}>
            {showingPosition && !showingQuestion ? (
              <div className={`card p-8 text-center transition-all duration-500 shadow-lg ${
                countdownWarning ? 'ring-4 ring-amber-400/50' : ''
              }`} style={{ background: countdownWarning ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(239, 68, 68, 0.1))' : undefined }}>
                <div className="text-7xl mb-4 animate-bounce" style={{ animationDuration: countdownWarning ? '0.5s' : '2s' }}>👀</div>
                <h3 className="text-3xl font-display mb-3" style={{ color: 'var(--text-primary)' }}>
                  {countdownWarning ? '⚠️ Position Fading Soon!' : 'Study the Position'}
                </h3>
                <p className="text-lg mb-4" style={{ color: countdownWarning ? '#fbbf24' : 'var(--text-tertiary)' }}>
                  {countdownWarning 
                    ? `Only ${Math.ceil(timeRemaining / 1000)} seconds left - focus!`
                    : `Focus on what you were told to look for`
                  }
                </p>
                <div className={`mt-6 mb-4 text-6xl font-mono font-bold transition-all duration-300 ${
                  countdownWarning ? 'text-amber-400 scale-125 animate-pulse' : ''
                }`} style={{ color: countdownWarning ? '#fbbf24' : 'var(--accent-primary)' }}>
                  {(timeRemaining / 1000).toFixed(1)}s
                </div>
                
                {/* Simple reminder (not full hints - those were shown before) */}
                {!countdownWarning && (
                  <div className="mt-6 px-4 py-2 rounded-lg inline-block" style={{ background: 'var(--bg-tertiary)' }}>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                      Focus: <span style={{ color: 'var(--accent-primary)' }}>{currentPosition?.questions[currentQuestionIndex]?.type.replace(/-/g, ' ')}</span>
                    </span>
                  </div>
                )}
              </div>
            ) : showingQuestion && currentQuestion && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge">Question {currentQuestionIndex + 1}/{currentPosition.questions.length}</span>
                  {!studyMode && (
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {(timeRemaining / 1000).toFixed(0)}s
                    </span>
                  )}
                </div>
                
                {/* Study Mode Checklist */}
                {studyMode && showHints && (
                  <div className="mb-6 p-4 rounded-xl shadow-md" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(74, 222, 128, 0.15))', border: '1px solid var(--accent-primary)' + '40' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-primary)' }}>
                        <span className="text-lg">✓</span>
                      </div>
                      <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Observation Checklist:
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {getObservationHints(currentQuestion.type, difficulty).map((hint, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-2 rounded hover:bg-[var(--bg-tertiary)] transition-colors">
                          <span className="mt-0.5" style={{ color: 'var(--accent-primary)' }}>✓</span>
                          <span>{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <h3 className="text-xl font-medium mb-6 break-words" style={{ color: 'var(--text-primary)' }}>
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
                    <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
                      {currentQuestion.explanation}
                    </p>
                    
                    {/* Enhanced Feedback for Wrong Answers */}
                    {selectedAnswer !== currentQuestion.correctIndex && (
                      <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                        <div className="text-xs font-medium mb-1" style={{ color: '#ef4444' }}>
                          💭 Why this matters:
                        </div>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                          {currentQuestion.type === 'piece-count' && 'Accurate piece counting is fundamental to chess - try scanning the board systematically by piece type.'}
                          {currentQuestion.type === 'threats' && 'Missing threats can lose games instantly. Always check for checks, captures, and attacks.'}
                          {currentQuestion.type === 'best-piece' && 'Identifying your best pieces helps you know where your strength lies in a position.'}
                          {currentQuestion.type === 'plan' && 'Good plans are based on the position\'s characteristics. Look for weaknesses and strengths.'}
                          {currentQuestion.type === 'evaluation' && 'Position evaluation combines multiple factors: material, activity, king safety, and structure.'}
                          {!['piece-count', 'threats', 'best-piece', 'plan', 'evaluation'].includes(currentQuestion.type) && 'Understanding this concept will help you make better decisions in your games.'}
                        </p>
                      </div>
                    )}
                    
                    {/* Pattern Recognition Tip */}
                    <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                        🎯 Pattern Recognition Tip:
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {getObservationHints(currentQuestion.type, difficulty)[0] || 
                         'Look for similar patterns in future positions. The more you practice, the faster you\'ll recognize these patterns.'}
                      </p>
                    </div>
                    
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
  // RENDER: REVIEW MODE
  // ============================================
  if (reviewMode && mistakesToReview.length > 0) {
    const currentReview = mistakesToReview[currentReviewIndex];
    const reviewQuestion = currentReview.position.questions[currentReview.questionIndex];
    
    return (
      <div className="space-y-6 animate-fade-in max-w-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium text-xl" style={{ color: 'var(--text-primary)' }}>
              📖 Review Mistakes
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Position {currentReviewIndex + 1} of {mistakesToReview.length}
            </p>
          </div>
          <button
            onClick={() => {
              setReviewMode(false);
              setMistakesToReview([]);
              setCurrentReviewIndex(0);
            }}
            className="btn-ghost text-sm"
          >
            Close Review
          </button>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 px-2 sm:px-0 max-w-full">
          {/* Board - Always Visible in Review */}
          <div className="flex justify-center items-start">
            <div 
              className="relative"
              style={{ width: boardSize, maxWidth: '100%', height: boardSize }}
            >
              <Chessboard
                position={currentReview.position.fen}
                boardOrientation={new Chess(currentReview.position.fen).turn() === 'w' ? 'white' : 'black'}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
                arePiecesDraggable={false}
                boardWidth={boardSize}
              />
            </div>
          </div>
          
          {/* Question Panel */}
          <div className="card p-6">
            <h3 className="text-xl font-medium mb-6 break-words" style={{ color: 'var(--text-primary)' }}>
              {reviewQuestion.question}
            </h3>
            
            <div className="space-y-3 mb-6">
              {reviewQuestion.options.map((option, index) => {
                let buttonStyle = 'var(--bg-tertiary)';
                let textColor = 'var(--text-secondary)';
                let borderStyle = '2px solid transparent';
                
                if (index === reviewQuestion.correctIndex) {
                  buttonStyle = 'rgba(74, 222, 128, 0.2)';
                  textColor = '#4ade80';
                  borderStyle = '2px solid #4ade80';
                } else if (index === currentReview.selectedAnswer) {
                  buttonStyle = 'rgba(239, 68, 68, 0.2)';
                  textColor = '#ef4444';
                  borderStyle = '2px solid #ef4444';
                }
                
                return (
                  <div
                    key={index}
                    className="w-full p-4 rounded-xl text-left"
                    style={{ background: buttonStyle, color: textColor, border: borderStyle }}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                    {index === reviewQuestion.correctIndex && (
                      <span className="ml-2 text-sm">✓ Correct</span>
                    )}
                    {index === currentReview.selectedAnswer && index !== reviewQuestion.correctIndex && (
                      <span className="ml-2 text-sm">✗ Your Answer</span>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Enhanced Explanation */}
            <div className="p-4 rounded-xl mb-6" style={{ background: 'var(--bg-elevated)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💡</span>
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Explanation</span>
              </div>
              <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
                {reviewQuestion.explanation}
              </p>
              
              {/* Pattern Recognition Tip */}
              <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
                  🎯 Pattern Recognition Tip:
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {getObservationHints(reviewQuestion.type, difficulty)[0] || 'Look for similar patterns in future positions.'}
                </p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentReviewIndex(prev => Math.max(0, prev - 1))}
                disabled={currentReviewIndex === 0}
                className="btn-secondary flex-1"
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  if (currentReviewIndex < mistakesToReview.length - 1) {
                    setCurrentReviewIndex(prev => prev + 1);
                  } else {
                    setReviewMode(false);
                    setMistakesToReview([]);
                    setCurrentReviewIndex(0);
                  }
                }}
                className="btn-primary flex-1"
              >
                {currentReviewIndex < mistakesToReview.length - 1 ? 'Next →' : 'Finish Review'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: SESSION COMPLETE
  // ============================================
  if (!sessionActive && !reviewMode && positionsCompleted > 0) {
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
    
    // Calculate weakest categories from session mistakes
    const categoryMistakeCounts = sessionMistakes.reduce((acc, m) => {
      acc[m.category] = (acc[m.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const weakCategories = Object.entries(categoryMistakeCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2)
      .map(([cat]) => cat.replace(/-/g, ' '));

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

          {/* Weak Areas (if any mistakes) */}
          {weakCategories.length > 0 && (
            <div className="mb-6 p-4 rounded-xl animate-fade-in text-left" style={{ 
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              animationDelay: '0.75s'
            }}>
              <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                📊 Areas to Practice
              </h4>
              <div className="flex flex-wrap gap-2">
                {weakCategories.map((cat, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 rounded-full text-xs capitalize"
                    style={{ 
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#f87171'
                    }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                These patterns tripped you up. Focus on them next session!
              </p>
            </div>
          )}

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
            {mistakesToReview.length > 0 && (
              <button 
                onClick={() => { 
                  setReviewMode(true); 
                  setCurrentReviewIndex(0);
                  setShowSessionComplete(false);
                }} 
                className="btn-primary"
              >
                📖 Review Mistakes ({mistakesToReview.length})
              </button>
            )}
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
  
  // If no render condition matches, show menu (fallback)
  if (!sessionActive && !reviewMode && positionsCompleted === 0) {
    return (
      <div className="space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
        {/* Redirect to menu */}
        {mode !== 'menu' && setMode('menu')}
        <div className="text-center" style={{ color: 'var(--text-muted)' }}>
          Loading...
        </div>
      </div>
    );
  }
  
  return null;
}

export default FlashTrainingPage;
