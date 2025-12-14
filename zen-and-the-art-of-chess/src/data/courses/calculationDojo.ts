// ============================================
// THE CALCULATION DOJO
// Pure calculation training for chess mastery
// Deep multi-move sequences with visualization exercises
// ============================================

import type { Course, CourseVariation } from './courseTypes';

// ============================================
// CHAPTER 1: CALCULATION FUNDAMENTALS
// ============================================

const calculationFundamentals: CourseVariation[] = [];

// ============================================
// CHAPTER 2: VISUALIZATION TRAINING
// ============================================

const visualizationTraining: CourseVariation[] = [{
    id: 'vis-5-moves',
    title: '5-Move Visualization',
    fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQ - 0 5',
    toMove: 'white',
    concept: 'Visualize 5 moves ahead for deeper calculation',
    keyTakeaway: 'Hold 10 half-moves in your mind',
    difficulty: 3,
    introduction: 'Now let\'s go deeper: 5 moves ahead. This requires holding more pieces in your mental image. Practice!',
    moves: [
      {
        move: 'c3',
        explanation: 'Move 1: c3, preparing d4.',
      },
      {
        move: 'a6',
        explanation: 'Move 2: Black plays a6.',
      },
      {
        move: 'd4',
        explanation: 'Move 3: d4, striking the center.',
        arrows: [{ from: 'd3', to: 'd4', color: 'green' }],
      },
      {
        move: 'exd4',
        explanation: 'Move 4: Black takes.',
      },
      {
        move: 'cxd4',
        explanation: 'Move 5: We recapture.',
      },
      {
        move: 'Ba7',
        explanation: 'Move 6: Bishop retreats.',
      },
      {
        move: 'O-O',
        annotation: '!',
        explanation: 'Move 7: Castle! Can you see this position from move 1?',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
      },
      {
        move: 'd6',
        explanation: 'Move 8: Black plays d6.',
      },
      {
        move: 'Nc3',
        annotation: '!',
        explanation: 'Move 9: Develop the knight.',
      },
      {
        move: 'Bg4',
        explanation: 'Move 10: Black pins the knight. Did you visualize this far?',
      }
    ],
    commonMistakes: ['Losing track of piece positions', 'Not rebuilding the mental image regularly'],
    deeperPrinciple: 'Practice makes perfect. Start with 3 moves, work up to 5, then 7.',
  }
];

// ============================================
// CHAPTER 3: DEEP CALCULATION
// ============================================

const deepCalculation: CourseVariation[] = [
  {
    id: 'deep-6-move-combo',
    title: '6-Move Combination',
    fen: 'r2q1rk1/ppp1bppp/2n1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    concept: 'Calculate a 6-move tactical sequence',
    keyTakeaway: 'Deep calculation requires systematic approach',
    difficulty: 4,
    introduction: 'Let\'s calculate a 6-move combination. Take your time, visualize each position, and find the win.',
    moves: [
      {
        move: 'cxd5',
        explanation: 'Step 1: Open the position.',
      },
      {
        move: 'exd5',
        explanation: 'Black recaptures.',
      },
      {
        move: 'Nxd5',
        annotation: '!',
        explanation: 'Step 2: Sacrifice! Calculate if Black takes...',
        arrows: [{ from: 'c3', to: 'd5', color: 'red' }],
      },
      {
        move: 'Nxd5',
        explanation: 'Black takes the knight.',
      },
      {
        move: 'Bxh7+',
        annotation: '!!',
        explanation: 'Step 3: Greek Gift! Now calculate Kg8, Kxh7, Kf8...',
        arrows: [{ from: 'd3', to: 'h7', color: 'red' }],
      },
      {
        move: 'Kxh7',
        explanation: 'King takes.',
      },
      {
        move: 'Ng5+',
        annotation: '!',
        explanation: 'Step 4: Knight joins. King positions?',
        arrows: [{ from: 'f3', to: 'g5', color: 'red' }],
      },
      {
        move: 'Kg8',
        explanation: 'Only safe square.',
      },
      {
        move: 'Qh5',
        annotation: '!',
        explanation: 'Step 5: Queen attacks. Calculate defenses...',
        arrows: [{ from: 'd1', to: 'h5', color: 'red' }],
      },
      {
        move: 'Nf6',
        explanation: 'Blocking.',
      },
      {
        move: 'Qxf7+',
        annotation: '!',
        explanation: 'Step 6: Winning material with check!',
        arrows: [{ from: 'h5', to: 'f7', color: 'red' }],
      },
      {
        move: 'Kh8',
        explanation: 'King retreats.',
      },
      {
        move: 'Qxe7',
        annotation: '!',
        explanation: 'We calculated 6 moves deep and won a piece plus pawns!',
      }
    ],
    commonMistakes: ['Stopping calculation too early', 'Missing defensive resources'],
    deeperPrinciple: 'Calculate until the position is quiet or you see a clear result.',
  }
];

// ============================================
// CHAPTER 4: PRACTICAL CALCULATION
// ============================================

const practicalCalculation: CourseVariation[] = [
  {
    id: 'prac-time-pressure',
    title: 'Calculating Under Time Pressure',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'When time is short, calculate forcing moves only',
    keyTakeaway: 'In time trouble, focus on CCT - checks, captures, threats',
    difficulty: 3,
    introduction: 'When you\'re low on time, you can\'t calculate everything. Focus on forcing moves and simple plans.',
    moves: [
      {
        move: 'O-O-O',
        annotation: '!',
        explanation: 'Simple developing move. In time trouble, don\'t overthink.',
        arrows: [{ from: 'e1', to: 'c1', color: 'green' }],
      },
      {
        move: 'a6',
        explanation: 'Black prepares queenside expansion.',
      },
      {
        move: 'h4',
        annotation: '!',
        explanation: 'Direct attack! One idea, easy to calculate: push h5, attack.',
        arrows: [{ from: 'h2', to: 'h4', color: 'red' }],
      },
      {
        move: 'b5',
        explanation: 'Black counter-attacks.',
      },
      {
        move: 'h5',
        annotation: '!',
        explanation: 'Continue the plan. Don\'t change direction!',
        arrows: [{ from: 'h4', to: 'h5', color: 'red' }],
      },
      {
        move: 'b4',
        explanation: 'Black attacks your knight.',
      },
      {
        move: 'hxg6',
        annotation: '!',
        explanation: 'Open the h-file! Simple, forcing chess.',
        arrows: [{ from: 'h5', to: 'g6', color: 'red' }],
      },
      {
        move: 'hxg6',
        explanation: 'Black takes.',
      },
      {
        move: 'Nd5',
        annotation: '!',
        explanation: 'Centralize with tempo! The knight is immune.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
        highlights: ['d5'],
      }
    ],
    commonMistakes: ['Calculating too deeply in time trouble', 'Changing plans mid-game'],
    deeperPrinciple: 'In time trouble: one plan, forcing moves, no second-guessing.',
  }
];

// ============================================
// CHAPTER 5: CALCULATION EXERCISES
// ============================================

const calculationExercises: CourseVariation[] = [];

// ============================================
// EXPORT THE COURSE
// ============================================

export const calculationDojo: Course = {
  id: 'calculation-dojo',
  title: 'The Calculation Dojo',
  author: 'Zen Chess Academy',
  description: 'Transform your calculation ability! Master deep multi-move sequences through systematic training. Visualization exercises, forcing move calculation, and complex combinations.',
  coverImage: '🧮',
  coverColor: 'from-violet-600 to-purple-500',
  totalMinutes: 220,
  difficulty: 'intermediate',
  tags: ['calculation', 'visualization', 'tactics', 'combinations', 'deep analysis'],
  chapters: [
    {
      id: 'ch-calc-fundamentals',
      title: 'Calculation Fundamentals',
      subtitle: 'Candidate Moves, Forcing Moves, Trees',
      description: 'Learn the systematic approach to calculation: find candidates, calculate forcing moves first, build variation trees.',
      estimatedMinutes: 40,
      variations: calculationFundamentals,
      keyLessons: [
        'List all candidate moves before calculating',
        'CCT: Checks, Captures, Threats - in that order',
        'Build a tree: main line plus alternatives'
      ],
    },
    {
      id: 'ch-visualization',
      title: 'Visualization Training',
      subtitle: 'See the Board in Your Mind',
      description: 'Develop the ability to visualize positions 3, 5, and more moves ahead without moving pieces.',
      estimatedMinutes: 40,
      variations: visualizationTraining,
      keyLessons: [
        'Start with 3-move visualization',
        'Work up to 5+ moves',
        'Forcing sequences are easier to visualize'
      ],
    },
    {
      id: 'ch-deep-calc',
      title: 'Deep Calculation',
      subtitle: 'Multi-Move Combinations',
      description: 'Calculate 6+ move sequences, including defensive resources and quiet killer moves.',
      estimatedMinutes: 50,
      variations: deepCalculation,
      keyLessons: [
        'Calculate until the position is quiet',
        'Include opponent\'s best defenses',
        'Don\'t miss quiet improvements'
      ],
    },
    {
      id: 'ch-practical-calc',
      title: 'Practical Calculation',
      subtitle: 'Time Pressure, Complex Positions, Critical Moments',
      description: 'Apply calculation skills to real-game situations: time trouble, complex positions, and critical moments.',
      estimatedMinutes: 45,
      variations: practicalCalculation,
      keyLessons: [
        'In time trouble: one plan, forcing moves only',
        'Use elimination to simplify complex positions',
        'Invest time in critical moments'
      ],
    },
    {
      id: 'ch-calc-exercises',
      title: 'Calculation Exercises',
      subtitle: 'Test Your Skills',
      description: 'Practice what you\'ve learned with challenging exercises: checkmates, material wins, complex combinations.',
      estimatedMinutes: 45,
      variations: calculationExercises,
      keyLessons: [
        'Apply systematic calculation',
        'Don\'t stop until you find the win',
        'Complex combinations often need quiet moves'
      ],
    }
],
};

export default calculationDojo;












