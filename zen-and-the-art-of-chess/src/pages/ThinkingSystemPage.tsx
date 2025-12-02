// ============================================
// THINKING SYSTEM FRAMEWORK
// A universal decision-making algorithm for chess
// Inspired by Remote Chess Academy's systematic approach
// ============================================

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Square } from 'chess.js';
import { useNavigate } from 'react-router-dom';

// ============================================
// TYPES & INTERFACES
// ============================================

type ThinkingStep = 
  | 'threats' 
  | 'tactics' 
  | 'improve-piece' 
  | 'control-squares' 
  | 'execute-plan';

interface ThinkingQuestion {
  step: ThinkingStep;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  fen: string;
  highlightSquares?: string[];
}

interface TrainingPosition {
  fen: string;
  title: string;
  scenario: string;
  questions: ThinkingQuestion[];
  tags: string[];
  difficulty: 1 | 2 | 3;
}

interface ThinkingProgress {
  lessonsCompleted: number;
  practicePositions: number;
  stepMastery: Record<ThinkingStep, { correct: number; total: number }>;
  lastSession: string | null;
  currentLesson: number;
  streak: number;
}

// ============================================
// THE 5-STEP THINKING SYSTEM
// ============================================

const THINKING_STEPS: Record<ThinkingStep, {
  number: number;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  keyQuestions: string[];
}> = {
  threats: {
    number: 1,
    name: 'Check for Threats',
    shortName: 'Threats',
    description: 'Before anything else, ask: "What is my opponent threatening?" Never move without scanning for danger.',
    icon: '⚠️',
    color: '#ef4444',
    keyQuestions: [
      'Are any of my pieces hanging?',
      'Is my king in danger?',
      'Does my opponent have a tactic?',
      'What was the idea behind their last move?'
    ]
  },
  tactics: {
    number: 2,
    name: 'Scan for Tactics',
    shortName: 'Tactics',
    description: 'Look for forcing moves: checks, captures, and threats. Can you win material or deliver checkmate?',
    icon: '⚡',
    color: '#f59e0b',
    keyQuestions: [
      'Do I have any checks?',
      'Can I win material with a capture?',
      'Are there any forks, pins, or skewers available?',
      'Can I create a decisive threat?'
    ]
  },
  'improve-piece': {
    number: 3,
    name: 'Improve Your Worst Piece',
    shortName: 'Improve',
    description: 'If no tactics exist, find your least active piece and improve its position.',
    icon: '📈',
    color: '#4ade80',
    keyQuestions: [
      'Which of my pieces is doing the least?',
      'Can I move it to a better square?',
      'Are my rooks connected and on open files?',
      'Are my knights on good outposts?'
    ]
  },
  'control-squares': {
    number: 4,
    name: 'Control Key Squares',
    shortName: 'Control',
    description: 'Focus on controlling important squares: the center, outposts, and weak squares in enemy territory.',
    icon: '🎯',
    color: '#8b5cf6',
    keyQuestions: [
      'Do I control the center (d4, d5, e4, e5)?',
      'Are there outposts my pieces can occupy?',
      'What squares are weak in my opponent\'s position?',
      'Can I restrict my opponent\'s pieces?'
    ]
  },
  'execute-plan': {
    number: 5,
    name: 'Execute Your Plan',
    shortName: 'Plan',
    description: 'With position assessed, execute the appropriate strategic plan based on the position type.',
    icon: '🗺️',
    color: '#06b6d4',
    keyQuestions: [
      'What is the nature of this position?',
      'What plan fits this pawn structure?',
      'Where should I attack: kingside, queenside, or center?',
      'Should I play for a break or improve further?'
    ]
  }
};

// ============================================
// LESSON CONTENT
// ============================================

interface Lesson {
  id: number;
  title: string;
  step: ThinkingStep;
  content: string[];
  examples: {
    fen: string;
    explanation: string;
    highlightSquares?: string[];
  }[];
  practice: TrainingPosition[];
}

const LESSONS: Lesson[] = [
  // LESSON 1: Threats
  {
    id: 1,
    title: 'Step 1: Always Check for Threats First',
    step: 'threats',
    content: [
      'The most common cause of blunders is failing to see what your opponent is threatening.',
      'Before considering your own plans, ALWAYS ask: "What does my opponent want to do?"',
      'This takes 10-15 seconds but prevents 90% of beginner blunders.',
      'Check for: hanging pieces, checkmate threats, forks, pins, skewers, and discovered attacks.',
      'Ask yourself: "If I do nothing, what happens?"'
    ],
    examples: [
      {
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3',
        explanation: 'White threatens Qxf7# (Scholar\'s Mate). Black MUST see this threat before making any move!',
        highlightSquares: ['h5', 'f7']
      },
      {
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR b KQkq - 3 3',
        explanation: 'White threatens Qxf7#. The queen and bishop are both aiming at f7.',
        highlightSquares: ['f3', 'c4', 'f7']
      }
    ],
    practice: [
      {
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3',
        title: 'Spot the Threat',
        scenario: 'It\'s Black\'s turn. Before moving, identify the threat.',
        questions: [
          {
            step: 'threats',
            question: 'What is White threatening?',
            options: ['Nothing serious', 'Qxf7 checkmate', 'Taking the knight', 'Pushing e5'],
            correctIndex: 1,
            explanation: 'White threatens Qxf7#! The queen and bishop combine to attack f7, which is only defended by the king.',
            fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3'
          }
        ],
        tags: ['threats', 'checkmate'],
        difficulty: 1
      }
    ]
  },
  // LESSON 2: Tactics
  {
    id: 2,
    title: 'Step 2: Scan for Tactical Opportunities',
    step: 'tactics',
    content: [
      'After confirming you\'re safe, look for YOUR tactical chances.',
      'Check, capture, threat (CCT) - always consider forcing moves first.',
      'Checks are the most forcing moves because the opponent MUST respond.',
      'Look for tactical patterns: forks, pins, skewers, discovered attacks, deflections.',
      'Even if you don\'t find a winning tactic, you might find a way to improve your position with a threat.'
    ],
    examples: [
      {
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
        explanation: 'After 0-0, White will threaten Ng5 attacking f7. No immediate tactics, but setting up threats.',
        highlightSquares: ['f3', 'g5', 'f7']
      },
      {
        fen: 'r1bqkb1r/pppp1Npp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4',
        explanation: 'White\'s knight on f7 is attacking the queen and rook! This is a fork - a powerful tactic.',
        highlightSquares: ['f7', 'd8', 'h8']
      }
    ],
    practice: [
      {
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        title: 'Find the Tactic',
        scenario: 'White has developed pieces. Look for tactical opportunities.',
        questions: [
          {
            step: 'tactics',
            question: 'What tactical idea should White consider?',
            options: ['Castle immediately', 'Ng5 threatening f7', 'd3 to solidify', 'Trade knights'],
            correctIndex: 1,
            explanation: 'Ng5! threatens Nxf7 forking the queen and rook, or Bxf7+ winning a pawn. The f7 square is weak!',
            fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4'
          }
        ],
        tags: ['tactics', 'attack'],
        difficulty: 2
      }
    ]
  },
  // LESSON 3: Improve Pieces
  {
    id: 3,
    title: 'Step 3: Improve Your Worst Piece',
    step: 'improve-piece',
    content: [
      'If there are no threats to address and no tactics available, improve your position.',
      'The key principle: find your WORST piece and make it better.',
      'A "bad" piece is one that is passive, blocked by its own pawns, or not participating.',
      'Good piece placement: knights on outposts, bishops on long diagonals, rooks on open files.',
      'Grandmasters constantly ask: "Which of my pieces could be better placed?"'
    ],
    examples: [
      {
        fen: 'r2qkb1r/ppp2ppp/2n1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
        explanation: 'White\'s bishop on c1 is the worst piece - blocked by its own pawns. Bd3 or Bb5 improves it.',
        highlightSquares: ['c1']
      },
      {
        fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/1bPP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
        explanation: 'White\'s rook on a1 is passive. It should find an open file - perhaps Ra1-c1 or Ra1-d1.',
        highlightSquares: ['a1']
      }
    ],
    practice: [
      {
        fen: 'r1bqk2r/ppp2ppp/2n1pn2/3p4/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
        title: 'Find the Worst Piece',
        scenario: 'White has a solid position. Identify which piece needs improvement.',
        questions: [
          {
            step: 'improve-piece',
            question: 'Which of White\'s pieces is least active?',
            options: ['Knight on c3', 'Bishop on f1', 'Knight on f3', 'Queen on d1'],
            correctIndex: 1,
            explanation: 'The bishop on f1 hasn\'t moved yet! It should develop to e2, d3, or b5.',
            fen: 'r1bqk2r/ppp2ppp/2n1pn2/3p4/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6'
          }
        ],
        tags: ['development', 'piece-activity'],
        difficulty: 1
      }
    ]
  },
  // LESSON 4: Control Squares
  {
    id: 4,
    title: 'Step 4: Control Key Squares',
    step: 'control-squares',
    content: [
      'Chess is a battle for squares, not just pieces.',
      'The center (d4, d5, e4, e5) is the most important area - pieces there control the board.',
      'Outposts are squares that cannot be attacked by enemy pawns - knights love these!',
      'Look for weak squares in your opponent\'s position - holes they cannot defend with pawns.',
      'Controlling key squares restricts your opponent\'s pieces and creates long-term advantages.'
    ],
    examples: [
      {
        fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
        explanation: 'The d5 and e4 squares are key battlegrounds. White wants to control e4, Black wants d5.',
        highlightSquares: ['d4', 'd5', 'e4', 'e5']
      },
      {
        fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
        explanation: 'The e5 square is a potential outpost for White\'s knight - no black pawn can attack it.',
        highlightSquares: ['e5']
      }
    ],
    practice: [
      {
        fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
        title: 'Identify the Key Square',
        scenario: 'Both sides are fighting for central control.',
        questions: [
          {
            step: 'control-squares',
            question: 'What is the most important square to fight for?',
            options: ['The h4 square', 'The d5 square', 'The a3 square', 'The g6 square'],
            correctIndex: 1,
            explanation: 'd5 is the key central square! White should play cxd5 or prevent Black from solidifying there.',
            fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6'
          }
        ],
        tags: ['center', 'control'],
        difficulty: 2
      }
    ]
  },
  // LESSON 5: Execute Plan
  {
    id: 5,
    title: 'Step 5: Execute Your Strategic Plan',
    step: 'execute-plan',
    content: [
      'Once immediate concerns are handled, execute a long-term plan.',
      'Plans depend on the position type: open, closed, or semi-open.',
      'Common plans: kingside attack, queenside expansion, central pawn break.',
      'Match your plan to the pawn structure - pawns dictate where to play.',
      'A bad plan is better than no plan! Having a direction focuses your moves.'
    ],
    examples: [
      {
        fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/1bPP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
        explanation: 'In this IQP position, White should attack on the kingside using the open e-file and active pieces.',
        highlightSquares: ['d4']
      },
      {
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
        explanation: 'In the Dragon Sicilian, White typically plays queenside castling and launches a kingside attack with g4-g5.',
        highlightSquares: ['g4', 'h4']
      }
    ],
    practice: [
      {
        fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/1bPP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
        title: 'Choose the Right Plan',
        scenario: 'White has an isolated queen pawn (IQP). What plan makes sense?',
        questions: [
          {
            step: 'execute-plan',
            question: 'What is the best strategic approach for White?',
            options: ['Trade all pieces into an endgame', 'Attack on the kingside using piece activity', 'Push the d-pawn immediately', 'Play passively and wait'],
            correctIndex: 1,
            explanation: 'With an IQP, White should use active pieces to attack! The isolated pawn is weak in endgames but provides activity in the middlegame.',
            fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/1bPP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8'
          }
        ],
        tags: ['strategy', 'iqp'],
        difficulty: 3
      }
    ]
  }
];

// Additional practice positions for each step
const PRACTICE_POSITIONS: TrainingPosition[] = [
  // More threat detection
  {
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',
    title: 'Defend Correctly',
    scenario: 'Black needs to be aware of potential threats.',
    questions: [
      {
        step: 'threats',
        question: 'What potential threat should Black be aware of?',
        options: ['White threatens Bxf7+', 'White threatens Ng5', 'Both Bxf7+ and Ng5', 'No immediate threats'],
        correctIndex: 2,
        explanation: 'White can play Ng5 threatening Nxf7 and Bxf7+. The f7 pawn is a common target!',
        fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3'
      }
    ],
    tags: ['threats', 'defense'],
    difficulty: 2
  },
  // Tactical opportunities
  {
    fen: 'r1bqk2r/ppp2ppp/2n2n2/2bNp3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 6',
    title: 'Knight Fork Setup',
    scenario: 'White has a knight on d5. Find the tactical idea.',
    questions: [
      {
        step: 'tactics',
        question: 'What is the strongest continuation?',
        options: ['Castle kingside', 'Nxc7+ forking king and rook', 'Trade knights', 'Push d3'],
        correctIndex: 1,
        explanation: 'Nxc7+! forks the black king and rook on a8. White wins the exchange!',
        fen: 'r1bqk2r/ppp2ppp/2n2n2/2bNp3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 6'
      }
    ],
    tags: ['tactics', 'fork'],
    difficulty: 2
  },
  // Piece improvement
  {
    fen: 'r2q1rk1/ppp1bppp/2n1bn2/3pp3/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 9',
    title: 'Activate the Bishop',
    scenario: 'White\'s position is solid. Find the least active piece.',
    questions: [
      {
        step: 'improve-piece',
        question: 'Which move best improves White\'s worst piece?',
        options: ['Qc2', 'b3 followed by Bb2', 'h3', 'Re1'],
        correctIndex: 1,
        explanation: 'The bishop on c1 is the worst piece! b3 followed by Bb2 activates it on the long diagonal.',
        fen: 'r2q1rk1/ppp1bppp/2n1bn2/3pp3/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 9'
      }
    ],
    tags: ['piece-activity', 'fianchetto'],
    difficulty: 2
  },
  // Square control
  {
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQBPPP/R3K2R w KQ - 0 9',
    title: 'Outpost Occupation',
    scenario: 'White has a strong center. Find the key outpost.',
    questions: [
      {
        step: 'control-squares',
        question: 'What is the ideal square for White\'s knight?',
        options: ['The c4 square', 'The d5 square', 'The f5 square', 'The h5 square'],
        correctIndex: 1,
        explanation: 'Nd5! is a powerful outpost. The knight cannot be attacked by pawns and dominates the board.',
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQBPPP/R3K2R w KQ - 0 9'
      }
    ],
    tags: ['outpost', 'knight'],
    difficulty: 2
  },
  // Strategic planning
  {
    fen: 'r2q1rk1/1b2bppp/p1n1pn2/1p6/3P4/1BN1PN2/PP2QPPP/R1B2RK1 w - - 0 12',
    title: 'Choose Your Attack',
    scenario: 'Both sides are developed. White needs a plan.',
    questions: [
      {
        step: 'execute-plan',
        question: 'What is the best plan for White?',
        options: ['Attack on kingside with e4-e5', 'Play a4 to attack queenside pawns', 'Trade pieces and simplify', 'Wait for Black to commit'],
        correctIndex: 1,
        explanation: 'a4! attacks Black\'s queenside pawn chain. After axb5, White opens the a-file for the rook.',
        fen: 'r2q1rk1/1b2bppp/p1n1pn2/1p6/3P4/1BN1PN2/PP2QPPP/R1B2RK1 w - - 0 12'
      }
    ],
    tags: ['strategy', 'queenside-attack'],
    difficulty: 3
  }
];

const DEFAULT_PROGRESS: ThinkingProgress = {
  lessonsCompleted: 0,
  practicePositions: 0,
  stepMastery: {
    threats: { correct: 0, total: 0 },
    tactics: { correct: 0, total: 0 },
    'improve-piece': { correct: 0, total: 0 },
    'control-squares': { correct: 0, total: 0 },
    'execute-plan': { correct: 0, total: 0 }
  },
  lastSession: null,
  currentLesson: 1,
  streak: 0
};

// ============================================
// MAIN COMPONENT
// ============================================

type ViewMode = 'overview' | 'lesson' | 'practice' | 'reference';

export function ThinkingSystemPage() {
  const navigate = useNavigate();
  
  // State
  const [viewMode, setViewMode] = useState<ViewMode>('overview');
  const [progress, setProgress] = useState<ThinkingProgress>(() => {
    const saved = localStorage.getItem('zenChessThinkingProgress');
    return saved ? { ...DEFAULT_PROGRESS, ...JSON.parse(saved) } : DEFAULT_PROGRESS;
  });
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [lessonSlide, setLessonSlide] = useState(0);
  const [practicePosition, setPracticePosition] = useState<TrainingPosition | null>(null);
  const [practiceQuestionIndex, setPracticeQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Save progress
  useEffect(() => {
    localStorage.setItem('zenChessThinkingProgress', JSON.stringify(progress));
  }, [progress]);
  
  // Calculate mastery percentages
  const overallMastery = useMemo(() => {
    const steps = Object.values(progress.stepMastery);
    const totalCorrect = steps.reduce((sum, s) => sum + s.correct, 0);
    const totalQuestions = steps.reduce((sum, s) => sum + s.total, 0);
    return totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  }, [progress.stepMastery]);
  
  // Start a lesson
  const startLesson = useCallback((lessonId: number) => {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (lesson) {
      setCurrentLesson(lesson);
      setLessonSlide(0);
      setViewMode('lesson');
    }
  }, []);
  
  // Complete lesson
  const completeLesson = useCallback(() => {
    if (currentLesson) {
      setProgress(prev => ({
        ...prev,
        lessonsCompleted: Math.max(prev.lessonsCompleted, currentLesson.id),
        currentLesson: Math.min(currentLesson.id + 1, LESSONS.length),
        lastSession: new Date().toISOString()
      }));
      setViewMode('overview');
      setCurrentLesson(null);
    }
  }, [currentLesson]);
  
  // Start practice
  const startPractice = useCallback((step?: ThinkingStep) => {
    let positions = [...PRACTICE_POSITIONS];
    LESSONS.forEach(lesson => {
      positions = [...positions, ...lesson.practice];
    });
    
    if (step) {
      positions = positions.filter(p => p.questions.some(q => q.step === step));
    }
    
    if (positions.length > 0) {
      const randomPos = positions[Math.floor(Math.random() * positions.length)];
      setPracticePosition(randomPos);
      setPracticeQuestionIndex(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setViewMode('practice');
    }
  }, []);
  
  // Handle practice answer
  const handlePracticeAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null || !practicePosition) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const question = practicePosition.questions[practiceQuestionIndex];
    const isCorrect = index === question.correctIndex;
    
    setProgress(prev => ({
      ...prev,
      practicePositions: prev.practicePositions + 1,
      streak: isCorrect ? prev.streak + 1 : 0,
      stepMastery: {
        ...prev.stepMastery,
        [question.step]: {
          correct: (prev.stepMastery[question.step]?.correct || 0) + (isCorrect ? 1 : 0),
          total: (prev.stepMastery[question.step]?.total || 0) + 1
        }
      },
      lastSession: new Date().toISOString()
    }));
  }, [selectedAnswer, practicePosition, practiceQuestionIndex]);
  
  // Next practice question
  const nextPractice = useCallback(() => {
    startPractice();
  }, [startPractice]);
  
  // ============================================
  // RENDER: OVERVIEW
  // ============================================
  if (viewMode === 'overview') {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <header>
          <div className="flex items-center gap-2 text-sm mb-4">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors" style={{ color: 'var(--text-muted)' }}>
              Home
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>Thinking System</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            🧠 The 5-Step Thinking System
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
            A universal framework for making decisions in any chess position
          </p>
        </header>
        
        {/* Progress Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="stat-value text-gradient">{progress.lessonsCompleted}/5</div>
            <div className="stat-label">Lessons Done</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#4ade80' }}>{overallMastery}%</div>
            <div className="stat-label">Mastery</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#f59e0b' }}>{progress.practicePositions}</div>
            <div className="stat-label">Positions Practiced</div>
          </div>
          <div className="stat-card">
            <div className="stat-value" style={{ color: '#ec4899' }}>🔥 {progress.streak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
        </div>
        
        {/* The 5 Steps Visual */}
        <div className="card p-6">
          <h3 className="font-medium mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
            The 5-Step Process
          </h3>
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
            {(Object.entries(THINKING_STEPS) as [ThinkingStep, typeof THINKING_STEPS[ThinkingStep]][]).map(([key, step], index) => {
              const mastery = progress.stepMastery[key];
              const masteryPercent = mastery?.total > 0 ? Math.round((mastery.correct / mastery.total) * 100) : 0;
              
              return (
                <div key={key} className="flex items-center gap-2">
                  <button
                    onClick={() => startPractice(key)}
                    className="relative flex flex-col items-center p-4 rounded-xl transition-all hover:scale-105"
                    style={{ background: step.color + '20', minWidth: '100px' }}
                  >
                    <span className="text-3xl mb-2">{step.icon}</span>
                    <span className="text-xs font-medium text-center" style={{ color: step.color }}>
                      {step.shortName}
                    </span>
                    {mastery?.total > 0 && (
                      <span className="absolute -top-2 -right-2 text-xs px-2 py-0.5 rounded-full" 
                        style={{ background: masteryPercent >= 70 ? '#4ade80' : '#f59e0b', color: 'black' }}>
                        {masteryPercent}%
                      </span>
                    )}
                  </button>
                  {index < 4 && (
                    <span className="text-2xl" style={{ color: 'var(--text-muted)' }}>→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Lessons */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Lessons
            </h3>
            <button 
              onClick={() => setViewMode('reference')}
              className="text-sm hover:underline"
              style={{ color: 'var(--accent-primary)' }}
            >
              View Quick Reference →
            </button>
          </div>
          
          <div className="space-y-3">
            {LESSONS.map((lesson, index) => {
              const isCompleted = progress.lessonsCompleted >= lesson.id;
              const isUnlocked = index === 0 || progress.lessonsCompleted >= index;
              const stepInfo = THINKING_STEPS[lesson.step];
              
              return (
                <button
                  key={lesson.id}
                  onClick={() => isUnlocked && startLesson(lesson.id)}
                  disabled={!isUnlocked}
                  className={`w-full card p-5 text-left transition-all ${
                    isUnlocked ? 'hover:border-[var(--accent-primary)]/30' : 'opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: stepInfo.color + '20' }}
                    >
                      {isCompleted ? '✅' : stepInfo.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="badge" style={{ background: stepInfo.color + '30', color: stepInfo.color }}>
                          Step {lesson.id}
                        </span>
                        {isCompleted && (
                          <span className="text-xs" style={{ color: '#4ade80' }}>Completed</span>
                        )}
                      </div>
                      <h4 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {lesson.title}
                      </h4>
                    </div>
                    {!isUnlocked && (
                      <span className="text-xl">🔒</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => startPractice()}
            className="card-interactive p-6 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(168, 85, 247, 0.15)' }}>
                🎯
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Random Practice</h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Test your thinking system on random positions
                </p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setViewMode('reference')}
            className="card-interactive p-6 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
                📋
              </div>
              <div>
                <h3 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Quick Reference</h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Review all 5 steps at a glance
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: LESSON
  // ============================================
  if (viewMode === 'lesson' && currentLesson) {
    const stepInfo = THINKING_STEPS[currentLesson.step];
    const totalSlides = currentLesson.content.length + currentLesson.examples.length + 1; // +1 for intro
    const isOnContent = lessonSlide > 0 && lessonSlide <= currentLesson.content.length;
    const isOnExample = lessonSlide > currentLesson.content.length && lessonSlide <= currentLesson.content.length + currentLesson.examples.length;
    const exampleIndex = lessonSlide - currentLesson.content.length - 1;
    
    return (
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        {/* Progress bar */}
        <div className="flex items-center gap-4">
          <button onClick={() => setViewMode('overview')} className="btn-ghost text-sm">
            ← Exit
          </button>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
            <div 
              className="h-full rounded-full transition-all"
              style={{ width: `${((lessonSlide + 1) / totalSlides) * 100}%`, background: stepInfo.color }}
            />
          </div>
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {lessonSlide + 1}/{totalSlides}
          </span>
        </div>
        
        {/* Lesson Content */}
        <div className="card p-8">
          {/* Intro slide */}
          {lessonSlide === 0 && (
            <div className="text-center">
              <div 
                className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center text-5xl"
                style={{ background: stepInfo.color + '20' }}
              >
                {stepInfo.icon}
              </div>
              <h2 className="text-3xl font-display mb-4" style={{ color: 'var(--text-primary)' }}>
                {currentLesson.title}
              </h2>
              <p className="text-lg mb-8" style={{ color: 'var(--text-tertiary)' }}>
                {stepInfo.description}
              </p>
              
              <div className="text-left p-6 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                <h4 className="font-medium mb-3" style={{ color: stepInfo.color }}>
                  Key Questions to Ask:
                </h4>
                <ul className="space-y-2">
                  {stepInfo.keyQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: stepInfo.color }}>•</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Content slides */}
          {isOnContent && (
            <div className="text-center">
              <div className="text-6xl mb-6">{stepInfo.icon}</div>
              <p className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {currentLesson.content[lessonSlide - 1]}
              </p>
            </div>
          )}
          
          {/* Example slides */}
          {isOnExample && currentLesson.examples[exampleIndex] && (
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="chessboard-container">
                <Chessboard
                  position={currentLesson.examples[exampleIndex].fen}
                  boardOrientation="white"
                  customDarkSquareStyle={{ backgroundColor: '#779556' }}
                  customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
                  arePiecesDraggable={false}
                  boardWidth={400}
                  customSquareStyles={
                    currentLesson.examples[exampleIndex].highlightSquares?.reduce((acc, sq) => ({
                      ...acc,
                      [sq]: { backgroundColor: stepInfo.color + '60' }
                    }), {})
                  }
                />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
                  Example {exampleIndex + 1}
                </h3>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {currentLesson.examples[exampleIndex].explanation}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setLessonSlide(prev => prev - 1)}
            disabled={lessonSlide === 0}
            className="btn-secondary"
          >
            ← Previous
          </button>
          
          {lessonSlide < totalSlides - 1 ? (
            <button
              onClick={() => setLessonSlide(prev => prev + 1)}
              className="btn-primary"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={completeLesson}
              className="btn-primary"
            >
              Complete Lesson ✓
            </button>
          )}
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: PRACTICE
  // ============================================
  if (viewMode === 'practice' && practicePosition) {
    const question = practicePosition.questions[practiceQuestionIndex];
    const stepInfo = THINKING_STEPS[question.step];
    
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{stepInfo.icon}</span>
            <div>
              <h2 className="font-medium" style={{ color: 'var(--text-primary)' }}>{practicePosition.title}</h2>
              <p className="text-sm" style={{ color: stepInfo.color }}>Testing: {stepInfo.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-mono" style={{ color: '#f59e0b' }}>🔥 {progress.streak}</span>
            <button onClick={() => setViewMode('overview')} className="btn-ghost text-sm">
              Exit Practice
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Board */}
          <div className="chessboard-container">
            <Chessboard
              position={question.fen}
              boardOrientation={new Chess(question.fen).turn() === 'w' ? 'white' : 'black'}
              customDarkSquareStyle={{ backgroundColor: '#779556' }}
              customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
              arePiecesDraggable={false}
              boardWidth={480}
              customSquareStyles={
                question.highlightSquares?.reduce((acc, sq) => ({
                  ...acc,
                  [sq]: { backgroundColor: stepInfo.color + '50' }
                }), {})
              }
            />
          </div>
          
          {/* Question */}
          <div className="space-y-6">
            <div className="card p-6">
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                {practicePosition.scenario}
              </p>
              <h3 className="text-xl font-medium mb-6" style={{ color: 'var(--text-primary)' }}>
                {question.question}
              </h3>
              
              <div className="space-y-3">
                {question.options.map((option, index) => {
                  let buttonStyle = 'var(--bg-tertiary)';
                  let textColor = 'var(--text-secondary)';
                  
                  if (showExplanation) {
                    if (index === question.correctIndex) {
                      buttonStyle = 'rgba(74, 222, 128, 0.2)';
                      textColor = '#4ade80';
                    } else if (index === selectedAnswer) {
                      buttonStyle = 'rgba(239, 68, 68, 0.2)';
                      textColor = '#ef4444';
                    }
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handlePracticeAnswer(index)}
                      disabled={showExplanation}
                      className="w-full p-4 rounded-xl text-left transition-all hover:scale-[1.01]"
                      style={{ background: buttonStyle, color: textColor }}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Explanation */}
            {showExplanation && (
              <div className="card p-6" style={{ background: selectedAnswer === question.correctIndex ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)' }}>
                <div className="flex items-center gap-2 mb-3">
                  {selectedAnswer === question.correctIndex ? (
                    <>
                      <span className="text-2xl">✅</span>
                      <span className="font-medium" style={{ color: '#4ade80' }}>Correct!</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">❌</span>
                      <span className="font-medium" style={{ color: '#ef4444' }}>Not quite</span>
                    </>
                  )}
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {question.explanation}
                </p>
                
                <button onClick={nextPractice} className="btn-primary w-full mt-6">
                  Next Position →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // ============================================
  // RENDER: REFERENCE CARD
  // ============================================
  if (viewMode === 'reference') {
    return (
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-display" style={{ color: 'var(--text-primary)' }}>
            🧠 Quick Reference
          </h1>
          <button onClick={() => setViewMode('overview')} className="btn-ghost">
            ← Back
          </button>
        </div>
        
        {/* Steps Reference */}
        <div className="space-y-4">
          {(Object.entries(THINKING_STEPS) as [ThinkingStep, typeof THINKING_STEPS[ThinkingStep]][]).map(([key, step]) => (
            <div key={key} className="card p-6">
              <div className="flex items-start gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: step.color + '20' }}
                >
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold" style={{ color: step.color }}>
                      STEP {step.number}
                    </span>
                    <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {step.name}
                    </h3>
                  </div>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
                    {step.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {step.keyQuestions.map((q, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span style={{ color: step.color }}>•</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Summary Card */}
        <div className="card p-6" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(6, 182, 212, 0.1))' }}>
          <h3 className="font-medium mb-4 text-center" style={{ color: 'var(--text-primary)' }}>
            Remember: Before Every Move...
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <span>⚠️ Threats</span>
            <span>→</span>
            <span>⚡ Tactics</span>
            <span>→</span>
            <span>📈 Improve</span>
            <span>→</span>
            <span>🎯 Control</span>
            <span>→</span>
            <span>🗺️ Plan</span>
          </div>
        </div>
        
        <button onClick={() => startPractice()} className="btn-primary w-full">
          Practice the System →
        </button>
      </div>
    );
  }
  
  return null;
}

export default ThinkingSystemPage;




