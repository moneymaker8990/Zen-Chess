// ============================================
// THE ATTACK MASTERCLASS
// Learn to crush your opponents like Tal & Alekhine
// Deep attacking variations with sacrifices and combinations
// ============================================

import type { Course, CourseVariation } from './courseTypes';

// ============================================
// CHAPTER 1: ATTACKING PREREQUISITES
// ============================================

const attackPrerequisites: CourseVariation[] = [];

// ============================================
// CHAPTER 2: CLASSIC SACRIFICES
// ============================================

const classicSacrifices: CourseVariation[] = [{
    id: 'knight-sac-f7',
    title: 'The Fried Liver Attack',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Sacrificing a knight on f7 for a devastating attack',
    keyTakeaway: 'Nxf7 works when you can follow up with a king hunt',
    difficulty: 3,
    introduction: 'The Fried Liver is one of the oldest and most brutal attacks in chess. White sacrifices a knight to drag the king out.',
    moves: [
      {
        move: 'Ng5',
        explanation: 'Eyeing f7, the weakest square in Black\'s position.',
        arrows: [{ from: 'f3', to: 'g5', color: 'green' }, { from: 'g5', to: 'f7', color: 'yellow' }],
        highlights: ['f7'],
      },
      {
        move: 'd5',
        explanation: 'Black counterattacks in the center.',
      },
      {
        move: 'exd5',
        explanation: 'Accepting the challenge.',
      },
      {
        move: 'Nxd5',
        explanation: 'Black takes back, but now...',
      },
      {
        move: 'Nxf7',
        annotation: '!!',
        explanation: 'The Fried Liver! Knight sacrifice to expose the king.',
        arrows: [{ from: 'g5', to: 'f7', color: 'red' }],
        highlights: ['f7'],
      },
      {
        move: 'Kxf7',
        explanation: 'The king must take.',
      },
      {
        move: 'Qf3+',
        annotation: '!',
        explanation: 'Attacking the knight and forcing the king further out.',
        arrows: [{ from: 'd1', to: 'f3', color: 'red' }, { from: 'f3', to: 'd5', color: 'yellow' }],
      },
      {
        move: 'Ke6',
        explanation: 'The king advances to defend the knight. Ke8 loses to Bxd5.',
      },
      {
        move: 'Nc3',
        annotation: '!',
        explanation: 'Developing with tempo, attacking the exposed knight.',
        arrows: [{ from: 'b1', to: 'c3', color: 'green' }],
      },
      {
        move: 'Nb4',
        explanation: 'The knight escapes.',
      },
      {
        move: 'Qe4',
        explanation: 'Threatening Qc4+ and keeping the pressure.',
      }
    ],
    commonMistakes: ['Playing Nxf7 when Black can defend', 'Forgetting to develop pieces quickly after'],
    deeperPrinciple: 'When the king is exposed, every tempo counts. Develop with threats!',
  }
];

// ============================================
// CHAPTER 3: ATTACKING PATTERNS
// ============================================

const attackingPatterns: CourseVariation[] = [{
    id: 'pattern-piece-storm',
    title: 'Attacking with All Pieces',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Coordinating all pieces in the attack',
    keyTakeaway: 'The more pieces attacking, the harder to defend',
    difficulty: 3,
    introduction: 'Great attacks use every piece. Count your attackers vs their defenders - you need at least equal numbers to succeed.',
    moves: [
      {
        move: 'O-O-O',
        annotation: '!',
        explanation: 'Opposite-side castling! The h-rook will join the kingside attack.',
        arrows: [{ from: 'e1', to: 'c1', color: 'green' }],
      },
      {
        move: 'a6',
        explanation: 'Black prepares counterplay.',
      },
      {
        move: 'h4',
        annotation: '!',
        explanation: 'Pawn storm begins! The h-file will open.',
        arrows: [{ from: 'h2', to: 'h4', color: 'red' }],
      },
      {
        move: 'b5',
        explanation: 'Black starts their counterattack.',
      },
      {
        move: 'Bh6',
        annotation: '!',
        explanation: 'Trading the fianchetto defender - critical!',
        arrows: [{ from: 'e3', to: 'h6', color: 'red' }],
        highlights: ['g7'],
      },
      {
        move: 'Bxh6',
        explanation: 'Forced trade.',
      },
      {
        move: 'Qxh6',
        explanation: 'Queen takes, eyeing the king.',
        arrows: [{ from: 'd2', to: 'h6', color: 'red' }],
      },
      {
        move: 'Qa5',
        explanation: 'Black counterattacks.',
      },
      {
        move: 'h5',
        annotation: '!',
        explanation: 'Continuing the storm. The h-file will open.',
        arrows: [{ from: 'h4', to: 'h5', color: 'red' }],
      },
      {
        move: 'Nxh5',
        explanation: 'Black takes.',
      },
      {
        move: 'g4',
        annotation: '!',
        explanation: 'Kicking the knight, opening the g-file too!',
        arrows: [{ from: 'g2', to: 'g4', color: 'red' }],
      },
      {
        move: 'Nf6',
        explanation: 'Knight retreats.',
      },
      {
        move: 'Rdg1',
        annotation: '!',
        explanation: 'Both rooks now aim at the king. The attack is overwhelming.',
        arrows: [{ from: 'd1', to: 'g1', color: 'green' }],
      }
    ],
    commonMistakes: ['Attacking with just one or two pieces', 'Leaving pieces uninvolved'],
    deeperPrinciple: 'Every piece should participate. Even the "bad" bishop has a role in the attack.',
  }
];

// ============================================
// CHAPTER 4: THE KING HUNT
// ============================================

const kingHunt: CourseVariation[] = [];

// ============================================
// CHAPTER 5: PRACTICAL ATTACKS
// ============================================

const practicalAttacks: CourseVariation[] = [{
    id: 'practical-h-file-attack',
    title: 'Opening the h-File',
    fen: 'r1bq1rk1/ppp1bppp/2np1n2/4p3/2B1PP2/2N2N2/PPPP2PP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Using pawns to open files against the castled king',
    keyTakeaway: 'h4-h5-h6 or hxg6 opens lines of attack',
    difficulty: 3,
    introduction: 'When attacking the king, pawns are battering rams. The h-pawn march is a classic technique.',
    moves: [
      {
        move: 'h4',
        annotation: '!',
        explanation: 'Starting the pawn storm!',
        arrows: [{ from: 'h2', to: 'h4', color: 'red' }],
      },
      {
        move: 'h6',
        explanation: 'Black tries to stop h5.',
      },
      {
        move: 'h5',
        annotation: '!',
        explanation: 'Continuing! Now g6 is targeted.',
        arrows: [{ from: 'h4', to: 'h5', color: 'red' }],
      },
      {
        move: 'Kh7',
        explanation: 'Black\'s king moves out of potential danger.',
      },
      {
        move: 'f5',
        annotation: '!',
        explanation: 'Locking the kingside and preparing g4-g5.',
        arrows: [{ from: 'f4', to: 'f5', color: 'green' }],
      },
      {
        move: 'Ng8',
        explanation: 'Knight retreats defensively.',
      },
      {
        move: 'g4',
        annotation: '!',
        explanation: 'The pawn roller continues!',
        arrows: [{ from: 'g2', to: 'g4', color: 'red' }],
      },
      {
        move: 'Bf6',
        explanation: 'Trying to hold g5.',
      },
      {
        move: 'g5',
        annotation: '!',
        explanation: 'Breaking through! The bishop must move.',
        arrows: [{ from: 'g4', to: 'g5', color: 'red' }],
      },
      {
        move: 'hxg5',
        explanation: 'Taking the pawn.',
      },
      {
        move: 'h6',
        annotation: '!!',
        explanation: 'The pawn breaks through to h6! Devastating.',
        arrows: [{ from: 'h5', to: 'h6', color: 'red' }],
        highlights: ['h6'],
      }
    ],
    commonMistakes: ['Pushing pawns without piece support behind them', 'Weakening your own king while attacking'],
    deeperPrinciple: 'Pawn storms work best when your pieces are ready to exploit the opened lines.',
  }
];

// ============================================
// EXPORT THE COURSE
// ============================================

export const attackMasterclass: Course = {
  id: 'attack-masterclass',
  title: 'The Attack Masterclass',
  author: 'Zen Chess Academy',
  description: 'Learn to attack like Tal and Alekhine! Master sacrifices, king hunts, and crushing attacks through deep multi-move variations. Every great player must know how to attack.',
  coverImage: '⚔️',
  coverColor: 'from-red-600 to-orange-500',
  totalMinutes: 240,
  difficulty: 'intermediate',
  tags: ['attack', 'tactics', 'sacrifices', 'king hunt', 'combinations'],
  chapters: [
    {
      id: 'ch-attack-prereq',
      title: 'When to Attack',
      subtitle: 'Prerequisites for a Successful Attack',
      description: 'Learn the conditions that justify an attack: development lead, unsafe king, and damaged pawn shields.',
      estimatedMinutes: 35,
      variations: attackPrerequisites,
      keyLessons: [
        'Attack when you have 2+ more pieces developed',
        'Open the center against an uncastled king',
        'Exploit weakened pawn shields (h6, g6 moves)'
      ],
    },
    {
      id: 'ch-classic-sacs',
      title: 'Classic Sacrifices',
      subtitle: 'Greek Gift, Double Bishop, Fried Liver',
      description: 'Master the immortal sacrificial patterns that have won millions of games.',
      estimatedMinutes: 45,
      variations: classicSacrifices,
      keyLessons: [
        'Greek Gift: Bxh7+ requires Ng5+ and Qh5 follow-up',
        'Double Bishop Sac destroys the entire pawn shield',
        'Knight sacrifices on f7 drag the king out'
      ],
    },
    {
      id: 'ch-attack-patterns',
      title: 'Attacking Patterns',
      subtitle: 'Batteries, Rook Lifts, Piece Coordination',
      description: 'Learn the building blocks of every successful attack.',
      estimatedMinutes: 40,
      variations: attackingPatterns,
      keyLessons: [
        'Queen-Bishop battery on b1-h7 diagonal',
        'Rook lifts bring h1 rook to the attack',
        'All pieces must participate in the attack'
      ],
    },
    {
      id: 'ch-king-hunt',
      title: 'The King Hunt',
      subtitle: 'Chasing the King Across the Board',
      description: 'Study the most spectacular king hunts in chess history.',
      estimatedMinutes: 50,
      variations: kingHunt,
      keyLessons: [
        'Once the king leaves safety, keep checking',
        'Every check must lead somewhere',
        'Material doesn\'t matter in a successful hunt'
      ],
    },
    {
      id: 'ch-practical-attacks',
      title: 'Practical Attacking',
      subtitle: 'Real-Game Attack Techniques',
      description: 'Attacks you can use in your own games: minority attacks, pawn storms, exchange sacrifices.',
      estimatedMinutes: 50,
      variations: practicalAttacks,
      keyLessons: [
        'Minority attacks create permanent weaknesses',
        'h-file pawn storms open lines to the king',
        'Exchange sacrifices can fuel devastating attacks'
      ],
    }
],
};

export default attackMasterclass;




