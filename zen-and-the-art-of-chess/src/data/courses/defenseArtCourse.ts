// ============================================
// THE ART OF DEFENSE
// Learn to defend like Petrosian & Carlsen
// The neglected skill that separates masters from amateurs
// ============================================

import type { Course, CourseVariation } from './courseTypes';

// ============================================
// CHAPTER 1: DEFENSIVE MINDSET
// ============================================

const defensiveMindset: CourseVariation[] = [
  {
    id: 'mindset-stay-calm',
    title: 'Staying Calm Under Pressure',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp2B1/3P4/2PBPN2/PP3PPP/R2QK2R b KQ - 0 8',
    toMove: 'black',
    concept: 'When attacked, stay calm and find defensive resources',
    keyTakeaway: 'Don\'t panic - look for the defensive move that also improves your position',
    difficulty: 2,
    introduction: 'When you see an attack coming, your first instinct might be to panic. Instead, take a breath and look for moves that defend AND improve.',
    moves: [
      {
        move: 'h6',
        annotation: '!',
        explanation: 'Challenging the bishop immediately. Black asks: what are you going to do?',
        arrows: [{ from: 'h7', to: 'h6', color: 'green' }],
        highlights: ['g5'],
      },
      {
        move: 'Bh4',
        explanation: 'White retreats to maintain the pin.',
      },
      {
        move: 'g5',
        annotation: '!',
        explanation: 'Continuing to push back! Black takes space on the kingside.',
        arrows: [{ from: 'g7', to: 'g5', color: 'green' }],
      },
      {
        move: 'Bg3',
        explanation: 'The bishop retreats again.',
      },
      {
        move: 'Ne4',
        annotation: '!',
        explanation: 'Now Black has counterplay! The knight is powerful on e4.',
        arrows: [{ from: 'f6', to: 'e4', color: 'green' }],
        highlights: ['e4'],
      },
      {
        move: 'Bxe4',
        explanation: 'White trades to avoid the strong knight.',
      },
      {
        move: 'dxe4',
        explanation: 'Black has a strong pawn on e4 and active pieces.',
      }
    ],
    commonMistakes: ['Panicking and making a purely defensive move', 'Accepting a bad position without fighting back'],
    deeperPrinciple: 'The best defense often includes counterattacking elements.',
  },{
    id: 'mindset-counterattack',
    title: 'Defense Through Counterattack',
    fen: 'r1b1k2r/ppppqppp/2n2n2/4p3/2B1P1Q1/2N2N2/PPPP1PPP/R1B1K2R b KQkq - 5 5',
    toMove: 'black',
    concept: 'The best defense is often a counterattack',
    keyTakeaway: 'Create your own threats instead of just reacting',
    difficulty: 3,
    introduction: 'When under attack, look for counter-threats. A threat to their pieces might be a better defense than moving your own.',
    moves: [
      {
        move: 'Nxe4',
        annotation: '!',
        explanation: 'Counterattack! Black takes the e4 pawn with tempo.',
        arrows: [{ from: 'f6', to: 'e4', color: 'green' }],
        highlights: ['e4'],
      },
      {
        move: 'Nxe4',
        explanation: 'White recaptures.',
      },
      {
        move: 'd5',
        annotation: '!',
        explanation: 'Continuing the counterattack! Attacking both bishop and knight.',
        arrows: [{ from: 'd7', to: 'd5', color: 'green' }],
        highlights: ['c4', 'e4'],
      },
      {
        move: 'Bxd5',
        explanation: 'White takes a pawn.',
      },
      {
        move: 'Qb4+',
        annotation: '!',
        explanation: 'Check! Black gains time to develop.',
        arrows: [{ from: 'e7', to: 'b4', color: 'red' }],
      },
      {
        move: 'Nc3',
        explanation: 'Blocking.',
      },
      {
        move: 'Bg4',
        annotation: '!',
        explanation: 'Now Black has active pieces and the initiative! White\'s attack has fizzled.',
        arrows: [{ from: 'c8', to: 'g4', color: 'green' }],
      }
    ],
    commonMistakes: ['Only thinking about defense', 'Missing counterattacking opportunities'],
    deeperPrinciple: 'In chess, attack and defense are two sides of the same coin.',
  }
];

// ============================================
// CHAPTER 2: PROPHYLAXIS
// ============================================

const prophylaxis: CourseVariation[] = [{
    id: 'prophy-restrict-pieces',
    title: 'Restricting Enemy Pieces',
    fen: 'r2q1rk1/ppp1bppp/2n1bn2/3p4/3P1B2/2NBPN2/PP3PPP/R2Q1RK1 w - - 0 9',
    toMove: 'white',
    concept: 'Keep opponent\'s pieces passive',
    keyTakeaway: 'A restricted piece is a bad piece',
    difficulty: 3,
    introduction: 'Instead of attacking directly, you can win by restricting your opponent\'s pieces. Bad pieces lose games.',
    moves: [
      {
        move: 'h3',
        annotation: '!',
        explanation: 'Prophylactic! Preventing ...Bg4 and ...Nh5.',
        arrows: [{ from: 'h2', to: 'h3', color: 'green' }],
      },
      {
        move: 'Bd7',
        explanation: 'The bishop has no good squares now.',
      },
      {
        move: 'Ne5',
        annotation: '!',
        explanation: 'Centralized knight, attacking c6 and restricting Black\'s pieces.',
        arrows: [{ from: 'f3', to: 'e5', color: 'green' }],
        highlights: ['e5'],
      },
      {
        move: 'Ne8',
        explanation: 'Knight retreats to a passive square.',
      },
      {
        move: 'Qf3',
        annotation: '!',
        explanation: 'Putting pressure on d5 and preparing a potential kingside attack.',
        arrows: [{ from: 'd1', to: 'f3', color: 'green' }],
      },
      {
        move: 'Nd6',
        explanation: 'Trying to unravel.',
      },
      {
        move: 'Nxd7',
        explanation: 'Trading off the defender.',
      },
      {
        move: 'Qxd7',
        explanation: 'Queen recaptures.',
      },
      {
        move: 'Bg5',
        annotation: '!',
        explanation: 'Trading the other defender! Black\'s position collapses.',
        arrows: [{ from: 'f4', to: 'g5', color: 'green' }],
      }
    ],
    commonMistakes: ['Rushing to attack without restricting pieces first', 'Allowing opponent to activate pieces'],
    deeperPrinciple: 'Piece activity is everything. Restrict theirs, maximize yours.',
  }
];

// ============================================
// CHAPTER 3: DEFENSIVE RESOURCES
// ============================================

const defensiveResources: CourseVariation[] = [];

// ============================================
// CHAPTER 4: HANDLING ATTACKS
// ============================================

const handlingAttacks: CourseVariation[] = [];

// ============================================
// CHAPTER 5: PETROSIAN'S DEFENSIVE GENIUS
// ============================================

const petrosianDefense: CourseVariation[] = [{
    id: 'petro-restriction',
    title: 'Complete Restriction',
    fen: 'r2q1rk1/1pp1bppp/p1n1bn2/4p3/4P3/1NN1BP2/PPPQ2PP/2KR1B1R w - - 0 11',
    toMove: 'white',
    concept: 'Restricting all opponent\'s pieces',
    keyTakeaway: 'A completely restricted position collapses',
    difficulty: 4,
    introduction: 'Petrosian\'s style was to restrict opponent\'s pieces until they couldn\'t breathe. Let\'s see this technique.',
    moves: [
      {
        move: 'Kb1',
        annotation: '!',
        explanation: 'Prophylaxis! Getting the king safe before starting the restriction.',
        arrows: [{ from: 'c1', to: 'b1', color: 'green' }],
      },
      {
        move: 'Rc8',
        explanation: 'Black activates.',
      },
      {
        move: 'g4',
        annotation: '!',
        explanation: 'Gaining space on the kingside and restricting ...Nh5.',
        arrows: [{ from: 'g2', to: 'g4', color: 'green' }],
      },
      {
        move: 'Nd7',
        explanation: 'Knight maneuvers.',
      },
      {
        move: 'Nd5',
        annotation: '!',
        explanation: 'The knight dominates! Attacking e7 and controlling key squares.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
        highlights: ['d5'],
      },
      {
        move: 'Bxd5',
        explanation: 'Black trades.',
      },
      {
        move: 'exd5',
        explanation: 'White recaptures.',
      },
      {
        move: 'Na5',
        explanation: 'Knight tries to find activity.',
      },
      {
        move: 'c3',
        annotation: '!',
        explanation: 'Restricting the knight further! It has no good squares.',
        arrows: [{ from: 'c2', to: 'c3', color: 'green' }],
      },
      {
        move: 'Nb3',
        explanation: 'Knight comes to b3.',
      },
      {
        move: 'Qc2',
        annotation: '!',
        explanation: 'Attacking the knight and preparing Bd3. Black is paralyzed.',
        arrows: [{ from: 'd2', to: 'c2', color: 'green' }],
      }
    ],
    commonMistakes: ['Rushing to attack instead of restricting', 'Allowing counterplay'],
    deeperPrinciple: 'Restrict first, then attack a helpless opponent.',
  }
];

// ============================================
// EXPORT THE COURSE
// ============================================

export const defenseArtCourse: Course = {
  id: 'defense-art',
  title: 'The Art of Defense',
  author: 'Zen Chess Academy',
  description: 'Master the neglected art of defense! Learn to defend like Petrosian and Carlsen. Understand prophylaxis, find defensive resources, and turn lost positions into draws or even wins.',
  coverImage: '🛡️',
  coverColor: 'from-blue-600 to-indigo-500',
  totalMinutes: 200,
  difficulty: 'intermediate',
  tags: ['defense', 'prophylaxis', 'fortress', 'counterattack', 'Petrosian'],
  chapters: [
    {
      id: 'ch-defense-mindset',
      title: 'The Defensive Mindset',
      subtitle: 'Staying Calm and Finding Resources',
      description: 'Learn the psychology of defense: staying calm, assessing objectively, and finding counterattacking opportunities.',
      estimatedMinutes: 35,
      variations: defensiveMindset,
      keyLessons: [
        'Don\'t panic - the best defense includes counterattack',
        'Assess objectively before defending',
        'Create your own threats while defending'
      ],
    },
    {
      id: 'ch-prophylaxis',
      title: 'Prophylaxis',
      subtitle: 'The Karpov Method',
      description: 'Learn to prevent opponent\'s ideas before they happen. Prophylactic thinking separates masters from amateurs.',
      estimatedMinutes: 40,
      variations: prophylaxis,
      keyLessons: [
        'Ask: What does my opponent want to do?',
        'Restrict opponent\'s pieces',
        'Control key squares prophylactically'
      ],
    },
    {
      id: 'ch-defensive-resources',
      title: 'Defensive Resources',
      subtitle: 'Perpetual, Fortress, Only Moves',
      description: 'Master the defensive toolkit: perpetual check, fortresses, finding the only saving move.',
      estimatedMinutes: 40,
      variations: defensiveResources,
      keyLessons: [
        'Always check for perpetual before resigning',
        'Learn fortress patterns to draw lost positions',
        'In critical positions, one move often saves'
      ],
    },
    {
      id: 'ch-handling-attacks',
      title: 'Handling Attacks',
      subtitle: 'Pawn Storms, Piece Attacks, Sacrifices',
      description: 'Learn to handle all types of attacks: pawn storms, piece pressure, and sacrificial assaults.',
      estimatedMinutes: 40,
      variations: handlingAttacks,
      keyLessons: [
        'Counter flank attacks with central play',
        'Challenge aggressive pieces',
        'Calculate whether to accept sacrifices'
      ],
    },
    {
      id: 'ch-petrosian',
      title: 'Petrosian\'s Defensive Genius',
      subtitle: 'Exchange Sacrifices and Restriction',
      description: 'Study the defensive techniques of Tigran Petrosian, the greatest defensive player in history.',
      estimatedMinutes: 45,
      variations: petrosianDefense,
      keyLessons: [
        'Exchange sacrifices can be defensive',
        'Restriction makes opponent helpless',
        'Prophylaxis + restriction = victory'
      ],
    }
],
};

export default defenseArtCourse;












