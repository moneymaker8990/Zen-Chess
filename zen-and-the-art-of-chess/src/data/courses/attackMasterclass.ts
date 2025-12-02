// ============================================
// THE ATTACK MASTERCLASS
// Learn to crush your opponents like Tal & Alekhine
// Deep attacking variations with sacrifices and combinations
// ============================================

import type { Course, CourseVariation } from './courseTypes';

// ============================================
// CHAPTER 1: ATTACKING PREREQUISITES
// ============================================

const attackPrerequisites: CourseVariation[] = [
  {
    id: 'prereq-development-lead',
    title: 'Development Lead Attack',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Attack when you have more pieces developed',
    keyTakeaway: 'A development advantage of 2+ pieces justifies aggressive action',
    difficulty: 2,
    introduction: 'Before attacking, you need a reason. The most common justification is superior development - you have more pieces ready for battle.',
    moves: [
      {
        move: 'Ng5',
        annotation: '!',
        explanation: 'Targeting the weak f7 square. White has 4 pieces developed vs Black\'s 2.',
        arrows: [{ from: 'f3', to: 'g5', color: 'red' }, { from: 'g5', to: 'f7', color: 'yellow' }],
        highlights: ['f7'],
        alternatives: [
          { move: 'O-O', evaluation: 'good', explanation: 'Safe but doesn\'t exploit the development lead.' },
          { move: 'd3', evaluation: 'equal', explanation: 'Solid but passive.' }
        ]
      },
      {
        move: 'd5',
        explanation: 'Black tries to block the diagonal, but it\'s too late.',
      },
      {
        move: 'exd5',
        explanation: 'Opening lines while maintaining the attack.',
      },
      {
        move: 'Na5',
        explanation: 'Black tries to eliminate the dangerous bishop.',
      },
      {
        move: 'Bb5+',
        annotation: '!',
        explanation: 'Intermediate check! White keeps the initiative.',
        arrows: [{ from: 'c4', to: 'b5', color: 'green' }],
      },
      {
        move: 'c6',
        explanation: 'Forced block.',
      },
      {
        move: 'dxc6',
        explanation: 'Destroying the pawn shield.',
      },
      {
        move: 'bxc6',
        explanation: 'The only recapture.',
      },
      {
        move: 'Qf3',
        annotation: '!',
        explanation: 'Triple attack on f7! The development lead converts to a crushing attack.',
        arrows: [{ from: 'd1', to: 'f3', color: 'red' }, { from: 'f3', to: 'f7', color: 'yellow' }],
        highlights: ['f7'],
      }
    ],
    commonMistakes: ['Attacking without sufficient development', 'Trading pieces when ahead in development'],
    deeperPrinciple: 'Development is temporary. If you don\'t use it, you lose it.',
  },
  {
    id: 'prereq-weak-king',
    title: 'Attacking the Uncastled King',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'The uncastled king is a target',
    keyTakeaway: 'Open the center when your opponent hasn\'t castled',
    difficulty: 2,
    introduction: 'A king stuck in the center is vulnerable. Your job is to open lines before they can escape.',
    moves: [
      {
        move: 'd4',
        annotation: '!',
        explanation: 'Opening the center immediately! Black\'s king is stuck.',
        arrows: [{ from: 'd2', to: 'd4', color: 'green' }],
      },
      {
        move: 'exd4',
        explanation: 'Black must accept or fall behind.',
      },
      {
        move: 'Nxd4',
        explanation: 'Centralized knight, open d-file pointing at the king.',
        arrows: [{ from: 'c3', to: 'd4', color: 'green' }],
      },
      {
        move: 'Nxd4',
        explanation: 'Black exchanges to reduce tension.',
      },
      {
        move: 'Qxd4',
        explanation: 'Queen in the center, eyeing both g7 and the d-file.',
        arrows: [{ from: 'd1', to: 'd4', color: 'red' }, { from: 'd4', to: 'd8', color: 'yellow' }],
      },
      {
        move: 'Qf6',
        explanation: 'Trying to trade queens and survive.',
      },
      {
        move: 'Bg5',
        annotation: '!',
        explanation: 'Pinning and preventing the queen trade! The attack intensifies.',
        arrows: [{ from: 'c1', to: 'g5', color: 'red' }],
        highlights: ['f6', 'g5'],
      }
    ],
    commonMistakes: ['Allowing the opponent to castle', 'Closing the center when their king is stuck'],
    deeperPrinciple: 'An uncastled king is worth a pawn sacrifice to keep in the center.',
  },
  {
    id: 'prereq-pawn-shield-damage',
    title: 'Exploiting Damaged Pawn Shield',
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3p4/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQ - 0 6',
    toMove: 'white',
    concept: 'Weakened pawns around the king invite attack',
    keyTakeaway: 'h6/g6 weaknesses and missing pawns create attack targets',
    difficulty: 3,
    introduction: 'When pawns move in front of the castled king, they create weaknesses. Learn to exploit h6, g6, f6 hooks.',
    moves: [
      {
        move: 'cxd5',
        explanation: 'First, gain space and prepare to develop with tempo.',
      },
      {
        move: 'Nxd5',
        explanation: 'Natural recapture.',
      },
      {
        move: 'Bd3',
        explanation: 'Aiming at h7, preparing the classic Greek Gift sacrifice.',
        arrows: [{ from: 'f1', to: 'd3', color: 'green' }, { from: 'd3', to: 'h7', color: 'yellow' }],
        highlights: ['h7'],
      },
      {
        move: 'Be7',
        explanation: 'Black retreats the bishop.',
      },
      {
        move: 'O-O',
        explanation: 'Safety first, then attack.',
      },
      {
        move: 'O-O',
        explanation: 'Black castles into the danger zone.',
      },
      {
        move: 'e4',
        annotation: '!',
        explanation: 'Kicking the knight and preparing the attack.',
      },
      {
        move: 'Nf6',
        explanation: 'The knight retreats.',
      },
      {
        move: 'e5',
        annotation: '!',
        explanation: 'Removing the key defender of h7!',
        arrows: [{ from: 'e4', to: 'e5', color: 'red' }],
        highlights: ['f6'],
      },
      {
        move: 'Nd5',
        explanation: 'The only square.',
      },
      {
        move: 'Bxh7+',
        annotation: '!!',
        explanation: 'The Greek Gift! Classic sacrifice to expose the king.',
        arrows: [{ from: 'd3', to: 'h7', color: 'red' }],
        highlights: ['h7'],
      }
    ],
    commonMistakes: ['Sacrificing before removing key defenders', 'Attacking when your own king is unsafe'],
    deeperPrinciple: 'Pawn moves in front of a castled king can never be taken back.',
  },
];

// ============================================
// CHAPTER 2: CLASSIC SACRIFICES
// ============================================

const classicSacrifices: CourseVariation[] = [
  {
    id: 'greek-gift-complete',
    title: 'The Greek Gift Sacrifice (Bxh7+)',
    fen: 'r1bq1rk1/pppn1ppp/4pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 7',
    toMove: 'white',
    concept: 'The most famous attacking sacrifice in chess',
    keyTakeaway: 'Bxh7+ works when Ng5+ and Qh5 follow with devastating effect',
    difficulty: 3,
    introduction: 'The Greek Gift is a bishop sacrifice on h7 (or h2 for Black). It requires specific follow-up: Ng5+ and Qh5, creating unstoppable threats.',
    moves: [
      {
        move: 'Bxh7+',
        annotation: '!!',
        explanation: 'The Greek Gift! White sacrifices a bishop to expose the black king.',
        arrows: [{ from: 'd3', to: 'h7', color: 'red' }],
        highlights: ['h7'],
      },
      {
        move: 'Kxh7',
        explanation: 'Declining loses the pawn for nothing.',
      },
      {
        move: 'Ng5+',
        annotation: '!',
        explanation: 'The essential follow-up! The knight joins with check.',
        arrows: [{ from: 'f3', to: 'g5', color: 'red' }],
      },
      {
        move: 'Kg8',
        explanation: 'Kg6 loses to Qd3+ and Qh7#. Kh6 loses to Nxf7+.',
        alternatives: [
          { move: 'Kg6', evaluation: 'bad', explanation: 'Qd3+ Kh5 Qh7+ Kg4 Qh3#' },
          { move: 'Kh6', evaluation: 'bad', explanation: 'Nxf7+ winning the queen' }
        ]
      },
      {
        move: 'Qh5',
        annotation: '!',
        explanation: 'Threatening Qh7# and Qxf7#. Black is defenseless.',
        arrows: [{ from: 'd1', to: 'h5', color: 'red' }, { from: 'h5', to: 'h7', color: 'yellow' }],
        highlights: ['h7', 'f7'],
      },
      {
        move: 'Re8',
        explanation: 'Trying to create an escape square.',
      },
      {
        move: 'Qxf7+',
        annotation: '!',
        explanation: 'Collecting a second pawn with ongoing attack.',
        arrows: [{ from: 'h5', to: 'f7', color: 'red' }],
      },
      {
        move: 'Kh8',
        explanation: 'The only move.',
      },
      {
        move: 'Qh5+',
        explanation: 'Continuing the assault.',
      },
      {
        move: 'Kg8',
        explanation: 'Back and forth.',
      },
      {
        move: 'Qh7+',
        explanation: 'Forcing the king out.',
      },
      {
        move: 'Kf8',
        explanation: 'The king flees.',
      },
      {
        move: 'Qh8+',
        explanation: 'Picking up the rook and winning.',
      }
    ],
    commonMistakes: ['Sacrificing when Ng5 can be blocked', 'Forgetting to check if Kg6 is playable for opponent'],
    deeperPrinciple: 'The Greek Gift requires all three moves: Bxh7+, Ng5+, Qh5. Missing any piece makes it unsound.',
  },
  {
    id: 'double-bishop-sacrifice',
    title: 'Lasker\'s Double Bishop Sacrifice',
    fen: 'r1b2rk1/pp1nqppp/2pbpn2/8/2BP4/2N1PN2/PPQ2PPP/R1B2RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Sacrificing BOTH bishops to destroy the king position',
    keyTakeaway: 'When one sacrifice works, sometimes two is even better',
    difficulty: 4,
    introduction: 'Emanuel Lasker showed that sometimes one bishop sacrifice isn\'t enough - you need both! This creates an unstoppable attack.',
    moves: [
      {
        move: 'Bxh7+',
        annotation: '!',
        explanation: 'First sacrifice - the Greek Gift.',
        arrows: [{ from: 'c4', to: 'h7', color: 'red' }],
      },
      {
        move: 'Kxh7',
        explanation: 'Accepting. Declining allows White to keep the pawn with a strong attack.',
      },
      {
        move: 'Qc2+',
        explanation: 'Lining up on the h7 diagonal.',
        arrows: [{ from: 'c2', to: 'h7', color: 'yellow' }],
      },
      {
        move: 'Kg8',
        explanation: 'The king retreats.',
      },
      {
        move: 'Bxg7',
        annotation: '!!',
        explanation: 'The second bishop sacrifice! Destroying the entire pawn shield.',
        arrows: [{ from: 'c1', to: 'g7', color: 'red' }],
        highlights: ['g7'],
      },
      {
        move: 'Kxg7',
        explanation: 'Forced - otherwise White is just up a pawn with attack.',
      },
      {
        move: 'Qg6+',
        explanation: 'The queen invades with check.',
        arrows: [{ from: 'c2', to: 'g6', color: 'red' }],
      },
      {
        move: 'Kh8',
        explanation: 'The only square.',
      },
      {
        move: 'Ng5',
        annotation: '!',
        explanation: 'Threatening Qh7# and Nf7+. Black is lost.',
        arrows: [{ from: 'f3', to: 'g5', color: 'green' }, { from: 'g6', to: 'h7', color: 'yellow' }],
        highlights: ['h7', 'f7'],
      }
    ],
    commonMistakes: ['Sacrificing without calculating the second sacrifice', 'Stopping after one sacrifice when two wins'],
    deeperPrinciple: 'Double sacrifices work when the combined effect is greater than the sum of parts.',
  },
  {
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
  },
];

// ============================================
// CHAPTER 3: ATTACKING PATTERNS
// ============================================

const attackingPatterns: CourseVariation[] = [
  {
    id: 'pattern-battery-attack',
    title: 'The Queen-Bishop Battery',
    fen: 'r2q1rk1/pp2bppp/2n1pn2/3p4/3P1B2/2PBPN2/PP3PPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Lining up queen and bishop on the same diagonal',
    keyTakeaway: 'Batteries multiply attacking power on key diagonals',
    difficulty: 2,
    introduction: 'A battery is when two pieces line up on the same file, rank, or diagonal. The queen-bishop battery on b1-h7 is deadly.',
    moves: [
      {
        move: 'Qc2',
        annotation: '!',
        explanation: 'Creating the deadly battery on b1-h7 diagonal!',
        arrows: [{ from: 'd1', to: 'c2', color: 'green' }, { from: 'c2', to: 'h7', color: 'yellow' }],
        highlights: ['h7'],
      },
      {
        move: 'Re8',
        explanation: 'Black makes a useful move.',
      },
      {
        move: 'Bxh7+',
        annotation: '!',
        explanation: 'Now the sacrifice works! The battery gives us Qh7 after.',
        arrows: [{ from: 'd3', to: 'h7', color: 'red' }],
      },
      {
        move: 'Nxh7',
        explanation: 'Knight takes to avoid immediate mate.',
      },
      {
        move: 'Qxh7+',
        annotation: '!',
        explanation: 'This is why the battery matters - we recapture with check!',
        arrows: [{ from: 'c2', to: 'h7', color: 'red' }],
      },
      {
        move: 'Kf8',
        explanation: 'The king flees.',
      },
      {
        move: 'Qh8+',
        explanation: 'Continuing the attack.',
      },
      {
        move: 'Ke7',
        explanation: 'Running to the queenside.',
      },
      {
        move: 'Qxg7',
        explanation: 'Collecting pawns with continuing threats.',
      }
    ],
    commonMistakes: ['Sacrificing before the battery is set up', 'Blocking your own battery'],
    deeperPrinciple: 'Set up your heavy pieces before launching the final assault.',
  },
  {
    id: 'pattern-rook-lift',
    title: 'The Rook Lift',
    fen: 'r1bqr1k1/ppp2ppp/2n2n2/3p4/3P1B2/2PBPN2/PP3PPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Bringing a rook to the 3rd rank to swing to the kingside',
    keyTakeaway: 'Rooks don\'t need open files - they can lift to open ranks',
    difficulty: 3,
    introduction: 'A rook lift brings the rook to the 3rd (or 6th) rank, where it can swing to attack the king. This is a key attacking technique.',
    moves: [
      {
        move: 'Qe2',
        explanation: 'Clearing d1 for the rook.',
        arrows: [{ from: 'd1', to: 'e2', color: 'green' }],
      },
      {
        move: 'Bd7',
        explanation: 'Black develops.',
      },
      {
        move: 'Rad1',
        explanation: 'Rook comes to d1, preparing the lift.',
        arrows: [{ from: 'a1', to: 'd1', color: 'green' }],
      },
      {
        move: 'Rc8',
        explanation: 'Black contests the c-file.',
      },
      {
        move: 'Rd3',
        annotation: '!',
        explanation: 'The rook lift! Now Rh3 is threatened.',
        arrows: [{ from: 'd1', to: 'd3', color: 'green' }, { from: 'd3', to: 'h3', color: 'yellow' }],
      },
      {
        move: 'Ne7',
        explanation: 'Black tries to defend h7.',
      },
      {
        move: 'Rh3',
        annotation: '!',
        explanation: 'The rook swings over! Massive pressure on h7.',
        arrows: [{ from: 'd3', to: 'h3', color: 'red' }],
        highlights: ['h7'],
      },
      {
        move: 'Ng6',
        explanation: 'Desperately trying to defend.',
      },
      {
        move: 'Bxh7+',
        annotation: '!',
        explanation: 'The sacrifice is now devastating with the rook on h3!',
        arrows: [{ from: 'd3', to: 'h7', color: 'red' }],
      }
    ],
    commonMistakes: ['Leaving rooks on their starting squares', 'Attacking before the rook is in position'],
    deeperPrinciple: 'The rook lift transforms your sleepy a1/h1 rook into a kingside attacker.',
  },
  {
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
  },
];

// ============================================
// CHAPTER 4: THE KING HUNT
// ============================================

const kingHunt: CourseVariation[] = [
  {
    id: 'hunt-edward-lasker',
    title: 'Edward Lasker\'s King Hunt',
    fen: 'r1bqr1k1/pppp1p1p/2n3p1/8/2B2B2/3Q1N2/PPP2PPP/R4RK1 w - - 0 12',
    toMove: 'white',
    concept: 'Driving the king across the entire board',
    keyTakeaway: 'Once the king leaves safety, keep checking until mate',
    difficulty: 4,
    introduction: 'This is one of the most famous king hunts in history. Edward Lasker chases Black\'s king from g8 to b2!',
    moves: [
      {
        move: 'Qxg6+',
        annotation: '!!',
        explanation: 'Queen sacrifice to start the hunt!',
        arrows: [{ from: 'd3', to: 'g6', color: 'red' }],
      },
      {
        move: 'hxg6',
        explanation: 'Forced.',
      },
      {
        move: 'Bxf7+',
        annotation: '!',
        explanation: 'Check! The king must move.',
        arrows: [{ from: 'c4', to: 'f7', color: 'red' }],
      },
      {
        move: 'Kf8',
        explanation: 'Only move.',
        alternatives: [
          { move: 'Kh7', evaluation: 'bad', explanation: 'Ng5+ Kh6 Ne6+ wins' }
        ]
      },
      {
        move: 'Bg5',
        annotation: '!',
        explanation: 'Threatening Bh6+ and creating a mating net.',
        arrows: [{ from: 'f4', to: 'g5', color: 'red' }],
      },
      {
        move: 'Ke7',
        explanation: 'Running away.',
      },
      {
        move: 'Be6+',
        annotation: '!',
        explanation: 'Cutting off the king!',
        arrows: [{ from: 'f7', to: 'e6', color: 'red' }],
      },
      {
        move: 'Kd6',
        explanation: 'The king flees to the center.',
      },
      {
        move: 'Bf4+',
        annotation: '!',
        explanation: 'Continuing the pursuit with check.',
        arrows: [{ from: 'g5', to: 'f4', color: 'red' }],
      },
      {
        move: 'Kc5',
        explanation: 'To the queenside now.',
      },
      {
        move: 'Bd7+',
        annotation: '!',
        explanation: 'Check again! The hunt continues.',
        arrows: [{ from: 'e6', to: 'd7', color: 'red' }],
      },
      {
        move: 'Kb4',
        explanation: 'Still running.',
      },
      {
        move: 'Be3+',
        annotation: '!',
        explanation: 'Another check! The king goes deeper.',
      },
      {
        move: 'Ka3',
        explanation: 'To the a-file.',
      },
      {
        move: 'Bc1+',
        annotation: '!',
        explanation: 'Forcing the king to b2.',
      },
      {
        move: 'Kb2',
        explanation: 'The king has traveled from g8 to b2!',
      },
      {
        move: 'Ra2#',
        annotation: '!!',
        explanation: 'Checkmate! The rook delivers the final blow.',
        arrows: [{ from: 'a1', to: 'a2', color: 'red' }],
        highlights: ['b2'],
      }
    ],
    commonMistakes: ['Letting the king escape to safety', 'Running out of checking moves'],
    deeperPrinciple: 'In a king hunt, calculate far ahead. Every check must lead somewhere!',
  },
  {
    id: 'hunt-immortal-game',
    title: 'The Immortal Game King Hunt',
    fen: 'r1b1k2r/pppp1ppp/2n2q2/4P3/1bB5/2N2Q2/PPP1N1PP/R1B1K2R w KQkq - 0 9',
    toMove: 'white',
    concept: 'Anderssen\'s brilliant sacrifice spree',
    keyTakeaway: 'Material doesn\'t matter when the king is exposed',
    difficulty: 5,
    introduction: 'Adolf Anderssen\'s 1851 Immortal Game sacrificed a bishop, both rooks, and the queen to deliver checkmate.',
    moves: [
      {
        move: 'O-O',
        explanation: 'Calmly castling, offering the rook.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
      },
      {
        move: 'Qxf1+',
        explanation: 'Black takes the bait!',
      },
      {
        move: 'Kxf1',
        explanation: 'Forced recapture.',
      },
      {
        move: 'Bc5+',
        explanation: 'Black checks.',
      },
      {
        move: 'Ke1',
        explanation: 'King retreats.',
      },
      {
        move: 'Bxg1',
        explanation: 'Black takes the other rook!',
      },
      {
        move: 'e6',
        annotation: '!!',
        explanation: 'Ignoring the rook! Opening lines for the attack.',
        arrows: [{ from: 'e5', to: 'e6', color: 'red' }],
      },
      {
        move: 'Bxe6',
        explanation: 'Taking with the bishop.',
      },
      {
        move: 'Nd5',
        annotation: '!',
        explanation: 'Threatening Nc7# and Nf6+.',
        arrows: [{ from: 'c3', to: 'd5', color: 'green' }],
      },
      {
        move: 'Bxf2+',
        explanation: 'Black desperately checks.',
      },
      {
        move: 'Kd2',
        explanation: 'The king walks up.',
      },
      {
        move: 'Bxg1',
        explanation: 'Black is up massive material.',
      },
      {
        move: 'Nc7+',
        annotation: '!',
        explanation: 'Fork! But Black\'s king is the real target.',
        arrows: [{ from: 'd5', to: 'c7', color: 'red' }],
      },
      {
        move: 'Kd8',
        explanation: 'Running away.',
      },
      {
        move: 'Qxf7',
        annotation: '!!',
        explanation: 'Queen sacrifice to set up the finale!',
        arrows: [{ from: 'f3', to: 'f7', color: 'red' }],
      },
      {
        move: 'Nxf7',
        explanation: 'Forced.',
      },
      {
        move: 'Bf5+',
        annotation: '!',
        explanation: 'Check from the bishop.',
      },
      {
        move: 'Ne5',
        explanation: 'Blocking.',
      },
      {
        move: 'Bxe5#',
        annotation: '!!',
        explanation: 'CHECKMATE! The bishop delivers the final blow.',
        arrows: [{ from: 'c1', to: 'e5', color: 'red' }],
        highlights: ['d8'],
      }
    ],
    commonMistakes: ['Worrying about material when attack is winning', 'Not calculating the full sequence'],
    deeperPrinciple: 'When your attack is strong enough, throw everything at the king.',
  },
];

// ============================================
// CHAPTER 5: PRACTICAL ATTACKS
// ============================================

const practicalAttacks: CourseVariation[] = [
  {
    id: 'practical-minority-attack',
    title: 'The Minority Attack',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Using fewer pawns to attack more pawns',
    keyTakeaway: 'b4-b5 creates weaknesses on c6 and a6',
    difficulty: 3,
    introduction: 'The minority attack uses 2 pawns (a and b) to attack 3 pawns (a, b, c). This creates lasting weaknesses.',
    moves: [
      {
        move: 'b4',
        annotation: '!',
        explanation: 'Starting the minority attack!',
        arrows: [{ from: 'b2', to: 'b4', color: 'green' }],
      },
      {
        move: 'Bd7',
        explanation: 'Natural development.',
      },
      {
        move: 'Rb1',
        explanation: 'Preparing b5.',
        arrows: [{ from: 'a1', to: 'b1', color: 'green' }],
      },
      {
        move: 'Rc8',
        explanation: 'Black defends.',
      },
      {
        move: 'b5',
        annotation: '!',
        explanation: 'Pushing forward! Attacking c6.',
        arrows: [{ from: 'b4', to: 'b5', color: 'green' }, { from: 'b5', to: 'c6', color: 'yellow' }],
        highlights: ['c6'],
      },
      {
        move: 'Na5',
        explanation: 'Knight comes out.',
      },
      {
        move: 'bxc6',
        explanation: 'Creating the weakness.',
      },
      {
        move: 'bxc6',
        explanation: 'Black recaptures, but now c6 is isolated and weak.',
      },
      {
        move: 'Qa4',
        annotation: '!',
        explanation: 'Attacking the weak c6 pawn!',
        arrows: [{ from: 'd1', to: 'a4', color: 'red' }],
        highlights: ['c6'],
      },
      {
        move: 'Qb6',
        explanation: 'Defending.',
      },
      {
        move: 'Ba3',
        annotation: '!',
        explanation: 'Trading Black\'s best defender!',
        arrows: [{ from: 'c1', to: 'a3', color: 'green' }],
      }
    ],
    commonMistakes: ['Pushing too fast without piece support', 'Allowing counterplay in the center'],
    deeperPrinciple: 'Minority attacks create permanent weaknesses that can be exploited in the endgame.',
  },
  {
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
  },
  {
    id: 'practical-exchange-sac-attack',
    title: 'Exchange Sacrifice for Attack',
    fen: 'r4rk1/pp2bppp/2n1pn2/q1ppP3/3P1P2/2PB1N2/PP2Q1PP/R1B2RK1 w - - 0 12',
    toMove: 'white',
    concept: 'Giving up the exchange for a powerful attack',
    keyTakeaway: 'Rook for knight/bishop can be worth it for attack',
    difficulty: 4,
    introduction: 'Sometimes the best attacking move is a positional exchange sacrifice. You get activity and dark square control.',
    moves: [
      {
        move: 'Rxf6',
        annotation: '!!',
        explanation: 'Exchange sacrifice! Destroying the key defender.',
        arrows: [{ from: 'f1', to: 'f6', color: 'red' }],
      },
      {
        move: 'Bxf6',
        explanation: 'Forced recapture.',
      },
      {
        move: 'exf6',
        explanation: 'Opening the e-file and creating a pawn on f6.',
        arrows: [{ from: 'e5', to: 'f6', color: 'green' }],
      },
      {
        move: 'Qd8',
        explanation: 'Trying to defend.',
      },
      {
        move: 'Bg5',
        annotation: '!',
        explanation: 'Pinning the queen to the king!',
        arrows: [{ from: 'c1', to: 'g5', color: 'red' }],
        highlights: ['d8', 'g5'],
      },
      {
        move: 'Qd6',
        explanation: 'Queen escapes.',
      },
      {
        move: 'Qh5',
        annotation: '!',
        explanation: 'Threatening Qh6 and Qg6 with f7 coming.',
        arrows: [{ from: 'e2', to: 'h5', color: 'red' }],
      },
      {
        move: 'h6',
        explanation: 'Trying to hold.',
      },
      {
        move: 'Bf4',
        annotation: '!',
        explanation: 'Attacking the queen while maintaining threats.',
      },
      {
        move: 'Qd8',
        explanation: 'Queen retreats.',
      },
      {
        move: 'Qg6',
        annotation: '!',
        explanation: 'Threatening Qxg7# and Bxh6.',
        arrows: [{ from: 'h5', to: 'g6', color: 'red' }],
        highlights: ['g7'],
      }
    ],
    commonMistakes: ['Sacrificing without a concrete follow-up', 'Overestimating compensation'],
    deeperPrinciple: 'Exchange sacrifices work when you get permanent advantages: passed pawns, weak squares, or mating attacks.',
  },
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
    },
  ],
};

export default attackMasterclass;




