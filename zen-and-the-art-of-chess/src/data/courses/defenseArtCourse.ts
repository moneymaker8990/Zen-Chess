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
  },
  {
    id: 'mindset-objective-assessment',
    title: 'Objective Position Assessment',
    fen: 'r1bqk2r/ppp2ppp/2n2n2/3pp3/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Assess the position objectively before defending',
    keyTakeaway: 'Before defending, ask: Is my position actually that bad?',
    difficulty: 2,
    introduction: 'Many players overreact to threats. Sometimes the threat isn\'t as dangerous as it looks. Assess objectively!',
    moves: [
      {
        move: 'Bd2',
        annotation: '?!',
        explanation: 'This is a common "scared" move. White breaks the pin but is too passive.',
        arrows: [{ from: 'c1', to: 'd2', color: 'yellow' }],
        alternatives: [
          { move: 'a3', evaluation: 'best', explanation: 'The brave move! If Bxc3+ bxc3, White has doubled pawns but excellent piece play.' },
          { move: 'cxd5', evaluation: 'good', explanation: 'Taking space in the center.' }
        ]
      },
      {
        move: 'exd4',
        explanation: 'Black takes.',
      },
      {
        move: 'exd4',
        explanation: 'White recaptures.',
      },
      {
        move: 'O-O',
        explanation: 'Black castles safely.',
      },
      {
        move: 'Be2',
        explanation: 'Notice how White\'s pieces are passive. The "safe" Bd2 led to a cramped position.',
      }
    ],
    commonMistakes: ['Overreacting to every threat', 'Making too many pawn moves in defense'],
    deeperPrinciple: 'Sometimes the best defense is to ignore the "threat" and play your own plan.',
  },
  {
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
  },
];

// ============================================
// CHAPTER 2: PROPHYLAXIS
// ============================================

const prophylaxis: CourseVariation[] = [
  {
    id: 'prophy-prevent-break',
    title: 'Preventing Pawn Breaks',
    fen: 'r1bq1rk1/ppp1bppp/2n1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Stop opponent\'s pawn breaks before they happen',
    keyTakeaway: 'Ask: What does my opponent want to play?',
    difficulty: 3,
    introduction: 'Prophylaxis means prevention. Before making your move, ask what your opponent wants to do - then stop it!',
    moves: [
      {
        move: 'cxd5',
        annotation: '!',
        explanation: 'Trading to prevent Black\'s planned ...c5 break.',
        arrows: [{ from: 'c4', to: 'd5', color: 'green' }],
        alternatives: [
          { move: 'b3', evaluation: 'good', explanation: 'Solid, preparing Ba3.' },
          { move: 'a3', evaluation: 'dubious', explanation: 'Does nothing to prevent ...c5.' }
        ]
      },
      {
        move: 'exd5',
        explanation: 'Black recaptures, now has an IQP.',
      },
      {
        move: 'b3',
        annotation: '!',
        explanation: 'Preparing Ba3 to trade Black\'s good bishop.',
        arrows: [{ from: 'b2', to: 'b3', color: 'green' }],
      },
      {
        move: 'Bf5',
        explanation: 'Black develops the bishop actively.',
      },
      {
        move: 'Ba3',
        annotation: '!',
        explanation: 'Trading off Black\'s defender of d6.',
        arrows: [{ from: 'c1', to: 'a3', color: 'green' }],
        highlights: ['e7'],
      },
      {
        move: 'Bxa3',
        explanation: 'Trading.',
      },
      {
        move: 'Qxa3',
        explanation: 'Now White can target d5 and d6 long-term.',
      }
    ],
    commonMistakes: ['Playing your own plan without considering opponent\'s ideas', 'Allowing strong pawn breaks'],
    deeperPrinciple: 'Karpov\'s secret: prevent your opponent\'s ideas, then execute your own.',
  },
  {
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
  },
  {
    id: 'prophy-control-key-square',
    title: 'Controlling Key Squares',
    fen: 'r2q1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Occupy or control squares before opponent uses them',
    keyTakeaway: 'Don\'t let opponent get their knight to e4/d4',
    difficulty: 3,
    introduction: 'Key squares in the center are worth fighting for. Control them prophylactically!',
    moves: [
      {
        move: 'cxd5',
        explanation: 'Trading to clarify the structure.',
      },
      {
        move: 'exd5',
        explanation: 'Black recaptures.',
      },
      {
        move: 'b3',
        annotation: '!',
        explanation: 'Preparing Ba3 to trade the defender of the dark squares.',
        arrows: [{ from: 'b2', to: 'b3', color: 'green' }],
      },
      {
        move: 'Re8',
        explanation: 'Black activates the rook.',
      },
      {
        move: 'Ba3',
        annotation: '!',
        explanation: 'Trading! Now d6 is weak.',
        arrows: [{ from: 'c1', to: 'a3', color: 'green' }],
      },
      {
        move: 'Bxa3',
        explanation: 'Trading.',
      },
      {
        move: 'Qxa3',
        explanation: 'Eyeing d6 and preparing Nb5.',
      },
      {
        move: 'Ne4',
        explanation: 'Black centralizes.',
      },
      {
        move: 'Nd2',
        annotation: '!',
        explanation: 'Challenging the centralized knight! Trading it off.',
        arrows: [{ from: 'f3', to: 'd2', color: 'green' }],
      },
      {
        move: 'Nxd2',
        explanation: 'Forced trade.',
      },
      {
        move: 'Qxd2',
        explanation: 'White has a great position - no good knight outposts for Black.',
      }
    ],
    commonMistakes: ['Allowing a permanent knight outpost', 'Not trading off strong enemy pieces'],
    deeperPrinciple: 'Trade off your opponent\'s best pieces. Keep your own.',
  },
];

// ============================================
// CHAPTER 3: DEFENSIVE RESOURCES
// ============================================

const defensiveResources: CourseVariation[] = [
  {
    id: 'resource-perpetual',
    title: 'The Perpetual Check Escape',
    fen: '3r2k1/5ppp/8/8/8/8/5PPP/3q2K1 w - - 0 1',
    toMove: 'white',
    concept: 'Drawing a lost game with perpetual check',
    keyTakeaway: 'When losing, look for perpetual check opportunities',
    difficulty: 2,
    introduction: 'When you\'re losing, perpetual check can save the day. The ability to find draws in lost positions is a crucial skill.',
    moves: [
      {
        move: 'Qc2',
        explanation: 'White is down a full rook. Let\'s see the defensive resource.',
      },
      {
        move: 'Qxc2',
        explanation: 'Black takes, but watch...',
      },
      {
        move: 'Rd1+',
        annotation: '!',
        explanation: 'Check! If Black had a queen still, this would be nothing.',
        arrows: [{ from: 'd8', to: 'd1', color: 'red' }],
      },
      {
        move: 'Kf8',
        explanation: 'King moves.',
      },
      {
        move: 'Rd8+',
        annotation: '!',
        explanation: 'Another check! The rook keeps giving check.',
        arrows: [{ from: 'd1', to: 'd8', color: 'red' }],
      },
      {
        move: 'Ke7',
        explanation: 'Running.',
      },
      {
        move: 'Rd7+',
        annotation: '!',
        explanation: 'Perpetual check! Black cannot escape.',
        arrows: [{ from: 'd8', to: 'd7', color: 'red' }],
      }
    ],
    commonMistakes: ['Resigning too early', 'Not looking for perpetual check resources'],
    deeperPrinciple: 'Never resign until you\'ve checked for perpetual possibilities.',
  },
  {
    id: 'resource-fortress',
    title: 'Building a Fortress',
    fen: '8/8/4k3/8/2K5/8/1r6/2B5 w - - 0 1',
    toMove: 'white',
    concept: 'Creating an impenetrable defensive structure',
    keyTakeaway: 'Some positions are drawn despite material deficit',
    difficulty: 3,
    introduction: 'A fortress is a setup where the opponent cannot make progress despite having extra material. Recognize these patterns!',
    moves: [
      {
        move: 'Bd2',
        annotation: '!',
        explanation: 'The bishop covers the dark squares. The rook cannot penetrate!',
        arrows: [{ from: 'c1', to: 'd2', color: 'green' }],
      },
      {
        move: 'Kd5',
        explanation: 'Black\'s king advances.',
      },
      {
        move: 'Kc3',
        annotation: '!',
        explanation: 'White keeps the king close. This is a fortress draw!',
        arrows: [{ from: 'c4', to: 'c3', color: 'green' }],
      },
      {
        move: 'Rc2',
        explanation: 'Black tries to make progress.',
      },
      {
        move: 'Be3',
        annotation: '!',
        explanation: 'The bishop guards everything. Black cannot break through.',
        arrows: [{ from: 'd2', to: 'e3', color: 'green' }],
      }
    ],
    commonMistakes: ['Not recognizing fortress patterns', 'Giving up when a fortress exists'],
    deeperPrinciple: 'Material isn\'t everything. Position and coordination matter more.',
  },
  {
    id: 'resource-only-move',
    title: 'Finding the Only Move',
    fen: 'r1bq1rk1/pppp1ppp/2n2n2/2b1p2Q/2B1P3/3P1N2/PPP2PPP/RNB1K2R b KQ - 0 5',
    toMove: 'black',
    concept: 'In critical positions, there\'s often only one defense',
    keyTakeaway: 'Under attack, don\'t give up - look for the saving move',
    difficulty: 3,
    introduction: 'Sometimes there\'s only ONE move that saves the game. Finding it requires calm calculation.',
    moves: [
      {
        move: 'g6',
        annotation: '!!',
        explanation: 'The only move! Blocking the queen\'s attack on h7 while opening a escape for the king.',
        arrows: [{ from: 'g7', to: 'g6', color: 'green' }],
        highlights: ['g6'],
        alternatives: [
          { move: 'Qe7', evaluation: 'bad', explanation: 'Qxf7+ Rxf7 Bxf7+ and White wins material' },
          { move: 'Rf8', evaluation: 'bad', explanation: 'Qxh7+ Kf8 Qh8#' },
          { move: 'd6', evaluation: 'bad', explanation: 'Ng5 and the attack continues' }
        ]
      },
      {
        move: 'Qh6',
        explanation: 'White tries to maintain pressure.',
      },
      {
        move: 'd6',
        annotation: '!',
        explanation: 'Now this is safe! Black has defended and will develop.',
        arrows: [{ from: 'd7', to: 'd6', color: 'green' }],
      },
      {
        move: 'Ng5',
        explanation: 'White continues the attack.',
      },
      {
        move: 'Nd4',
        annotation: '!',
        explanation: 'Counterattack! Threatening Nxc2+ and the attack on f7 is neutralized.',
        arrows: [{ from: 'c6', to: 'd4', color: 'green' }],
        highlights: ['c2', 'f7'],
      }
    ],
    commonMistakes: ['Panicking and making a worse move', 'Not calculating all options'],
    deeperPrinciple: 'When attacked, there\'s usually one best defense. Find it!',
  },
  {
    id: 'resource-exchange-down',
    title: 'Defending Down Material',
    fen: '4r1k1/pp3ppp/8/8/8/2B5/PP3PPP/4R1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Defensive technique when down material',
    keyTakeaway: 'Activity and coordination can compensate for material',
    difficulty: 3,
    introduction: 'Being down material doesn\'t mean you\'re lost. Active pieces and good coordination can hold the position.',
    moves: [
      {
        move: 'Re7',
        annotation: '!',
        explanation: 'Active rook! Attacking the 7th rank pawns.',
        arrows: [{ from: 'e1', to: 'e7', color: 'green' }],
      },
      {
        move: 'Rc8',
        explanation: 'Black protects.',
      },
      {
        move: 'Bd4',
        annotation: '!',
        explanation: 'Centralized bishop controlling key squares.',
        arrows: [{ from: 'c3', to: 'd4', color: 'green' }],
      },
      {
        move: 'b6',
        explanation: 'Black advances.',
      },
      {
        move: 'Rxa7',
        annotation: '!',
        explanation: 'Collecting a pawn! Now it\'s nearly equal.',
        arrows: [{ from: 'e7', to: 'a7', color: 'green' }],
      },
      {
        move: 'Rc1+',
        explanation: 'Black gives check.',
      },
      {
        move: 'Kf2',
        explanation: 'King escapes.',
      },
      {
        move: 'Rc2',
        explanation: 'Attacking the second rank.',
      },
      {
        move: 'Ra8+',
        annotation: '!',
        explanation: 'Counter-check! Now the rook gets active.',
        arrows: [{ from: 'a7', to: 'a8', color: 'red' }],
      }
    ],
    commonMistakes: ['Playing passively when down material', 'Not creating counterplay'],
    deeperPrinciple: 'When down material, maximize piece activity. Passive defense loses.',
  },
];

// ============================================
// CHAPTER 4: HANDLING ATTACKS
// ============================================

const handlingAttacks: CourseVariation[] = [
  {
    id: 'handle-pawn-storm',
    title: 'Defending Against Pawn Storms',
    fen: 'r2q1rk1/pp2bppp/2n1pn2/3p4/3PP3/2N2N2/PP2BPPP/R1BQ1R1K b - - 0 10',
    toMove: 'black',
    concept: 'Counter-attacking the center when flanks are attacked',
    keyTakeaway: 'A flank attack is best met by action in the center',
    difficulty: 3,
    introduction: 'When your opponent storms the kingside with pawns, the classic response is to counter in the center.',
    moves: [
      {
        move: 'dxe4',
        annotation: '!',
        explanation: 'Opening the center! This is the antidote to a flank attack.',
        arrows: [{ from: 'd5', to: 'e4', color: 'green' }],
      },
      {
        move: 'Nxe4',
        explanation: 'White recaptures.',
      },
      {
        move: 'Nxe4',
        explanation: 'Black takes back.',
      },
      {
        move: 'Bxe4',
        explanation: 'White recaptures.',
      },
      {
        move: 'Nf6',
        annotation: '!',
        explanation: 'Attacking the bishop and gaining time.',
        arrows: [{ from: 'e4', to: 'f6', color: 'green' }],
      },
      {
        move: 'Bd3',
        explanation: 'Bishop retreats.',
      },
      {
        move: 'Nd5',
        annotation: '!',
        explanation: 'Centralized knight! Black has excellent counterplay.',
        arrows: [{ from: 'f6', to: 'd5', color: 'green' }],
        highlights: ['d5'],
      }
    ],
    commonMistakes: ['Defending passively against pawn storms', 'Not opening the center'],
    deeperPrinciple: 'A flank attack without central control often backfires.',
  },
  {
    id: 'handle-piece-attack',
    title: 'Defending Piece Attacks',
    fen: 'r1bq1rk1/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R w KQ - 0 5',
    toMove: 'white',
    concept: 'Dealing with aggressive piece placement',
    keyTakeaway: 'Challenge aggressive pieces - don\'t let them dominate',
    difficulty: 2,
    introduction: 'When opponent places pieces aggressively, challenge them! Don\'t let them sit comfortably.',
    moves: [
      {
        move: 'O-O',
        annotation: '!',
        explanation: 'Getting the king to safety first.',
        arrows: [{ from: 'e1', to: 'g1', color: 'green' }],
      },
      {
        move: 'Bxc3',
        explanation: 'Black takes, hoping for doubled pawns.',
      },
      {
        move: 'bxc3',
        annotation: '!',
        explanation: 'Taking toward the center! The open b-file is useful.',
        arrows: [{ from: 'b2', to: 'c3', color: 'green' }],
      },
      {
        move: 'd6',
        explanation: 'Black develops.',
      },
      {
        move: 'Bg5',
        annotation: '!',
        explanation: 'Pinning the knight! Now White has the initiative.',
        arrows: [{ from: 'c1', to: 'g5', color: 'green' }],
        highlights: ['f6'],
      },
      {
        move: 'Be6',
        explanation: 'Trying to trade.',
      },
      {
        move: 'Bxe6',
        explanation: 'Trading.',
      },
      {
        move: 'fxe6',
        explanation: 'Black\'s structure is now weak.',
      },
      {
        move: 'Qb3',
        annotation: '!',
        explanation: 'Hitting b7 and e6! White has seized the initiative.',
        arrows: [{ from: 'd1', to: 'b3', color: 'red' }],
        highlights: ['b7', 'e6'],
      }
    ],
    commonMistakes: ['Being too passive against aggressive play', 'Not challenging enemy pieces'],
    deeperPrinciple: 'Don\'t let your opponent dictate the game. Challenge their ideas!',
  },
  {
    id: 'handle-sac-attack',
    title: 'Defending Against Sacrifices',
    fen: 'r1bq1rk1/ppp2ppp/2n2n2/3pp3/1bPPP3/2NB1N2/PP3PPP/R1BQK2R b KQ - 0 6',
    toMove: 'black',
    concept: 'Whether to accept or decline sacrifices',
    keyTakeaway: 'Calculate if accepting is safe - if unsure, decline',
    difficulty: 4,
    introduction: 'When offered a sacrifice, you must decide: accept and face the attack, or decline and let them recapture.',
    moves: [
      {
        move: 'dxc4',
        annotation: '?!',
        explanation: 'Taking the pawn. Is this wise? Let\'s see...',
        arrows: [{ from: 'd5', to: 'c4', color: 'yellow' }],
        alternatives: [
          { move: 'exd4', evaluation: 'best', explanation: 'Taking in the center is safer.' },
          { move: 'dxe4', evaluation: 'good', explanation: 'Also playable.' }
        ]
      },
      {
        move: 'Bxc4',
        explanation: 'White recaptures with the bishop aiming at f7.',
        arrows: [{ from: 'd3', to: 'c4', color: 'green' }],
      },
      {
        move: 'exd4',
        explanation: 'Black takes the center pawn.',
      },
      {
        move: 'e5',
        annotation: '!',
        explanation: 'Attacking the knight and opening lines!',
        arrows: [{ from: 'e4', to: 'e5', color: 'red' }],
      },
      {
        move: 'Nd5',
        explanation: 'Knight moves.',
      },
      {
        move: 'Qb3',
        annotation: '!',
        explanation: 'Threatening Bxd5 and Bxf7+. Black is under pressure.',
        arrows: [{ from: 'd1', to: 'b3', color: 'red' }],
      },
      {
        move: 'Be6',
        explanation: 'Blocking.',
      },
      {
        move: 'Bxd5',
        explanation: 'White trades.',
      },
      {
        move: 'Bxd5',
        explanation: 'Black recaptures.',
      },
      {
        move: 'Qxd5',
        annotation: '!',
        explanation: 'White has excellent compensation - Black\'s king is exposed.',
      }
    ],
    commonMistakes: ['Always accepting sacrifices without calculation', 'Always declining sacrifices out of fear'],
    deeperPrinciple: 'Calculate sacrifices. Accept if you can defend; decline if unsure.',
  },
];

// ============================================
// CHAPTER 5: PETROSIAN'S DEFENSIVE GENIUS
// ============================================

const petrosianDefense: CourseVariation[] = [
  {
    id: 'petro-exchange-sac',
    title: 'The Defensive Exchange Sacrifice',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/2PP4/2N1PN2/PPQ1BPPP/R1B2RK1 w - - 0 9',
    toMove: 'white',
    concept: 'Sacrificing the exchange to neutralize threats',
    keyTakeaway: 'Sometimes rook for knight simplifies to a safe position',
    difficulty: 4,
    introduction: 'Petrosian famously used exchange sacrifices NOT for attack, but for defense. Giving up the exchange can neutralize an entire attack.',
    moves: [
      {
        move: 'cxd5',
        explanation: 'White takes.',
      },
      {
        move: 'exd5',
        explanation: 'Black recaptures.',
      },
      {
        move: 'b3',
        explanation: 'Preparing Ba3.',
        arrows: [{ from: 'b2', to: 'b3', color: 'green' }],
      },
      {
        move: 'Re8',
        explanation: 'Black activates.',
      },
      {
        move: 'Ba3',
        annotation: '!',
        explanation: 'Trading the bishops.',
        arrows: [{ from: 'c1', to: 'a3', color: 'green' }],
      },
      {
        move: 'Bxa3',
        explanation: 'Trading.',
      },
      {
        move: 'Qxa3',
        explanation: 'Queen takes.',
      },
      {
        move: 'Bg4',
        explanation: 'Black pins the knight.',
        arrows: [{ from: 'c8', to: 'g4', color: 'red' }],
      },
      {
        move: 'Rfc1',
        annotation: '!',
        explanation: 'Preparing the defensive exchange sacrifice.',
        arrows: [{ from: 'f1', to: 'c1', color: 'green' }],
      },
      {
        move: 'Ne4',
        explanation: 'Black centralizes powerfully.',
      },
      {
        move: 'Rxc6',
        annotation: '!!',
        explanation: 'Exchange sacrifice! Eliminating the dangerous knight pair.',
        arrows: [{ from: 'c1', to: 'c6', color: 'red' }],
      },
      {
        move: 'bxc6',
        explanation: 'Forced.',
      },
      {
        move: 'Nd4',
        annotation: '!',
        explanation: 'Now White\'s knight is better than Black\'s rooks! Safe position.',
        arrows: [{ from: 'f3', to: 'd4', color: 'green' }],
      }
    ],
    commonMistakes: ['Only thinking of exchange sacs for attack', 'Overvaluing material'],
    deeperPrinciple: 'Petrosian: Exchange sacrifices simplify and reduce opponent\'s attacking chances.',
  },
  {
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
  },
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
    },
  ],
};

export default defenseArtCourse;









