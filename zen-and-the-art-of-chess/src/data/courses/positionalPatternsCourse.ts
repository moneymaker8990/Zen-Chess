// ============================================
// THE POSITIONAL CHESS PATTERNS MANUAL
// Comprehensive strategic pattern training
// 400+ variations across 16 chapters
// ============================================

import type { Course, CourseChapter } from './courseTypes';
import { outpostsVariations } from './variations/outpostsVariations';
import { weakPawnsVariations } from './variations/weakPawnsVariations';
import { pawnStructureVariations } from './variations/pawnStructureVariations';

// ============================================
// CHAPTER DEFINITIONS WITH IMPORTED VARIATIONS
// ============================================

const outpostsChapter: CourseChapter = {
  id: 'ch1-outposts',
  title: 'Outposts',
  subtitle: 'Establishing Dominant Squares',
  description: 'An outpost is a square that cannot be attacked by enemy pawns—a permanent fortress for your pieces. The knight on d5 is the iconic example: radiating influence across the board while completely safe from pawn attacks. In this chapter, you\'ll learn not just to RECOGNIZE outposts, but to CREATE them through pawn exchanges and to OCCUPY them at the right moment. Mastering outposts transforms your strategic play.',
  estimatedMinutes: 45,
  keyLessons: [
    'Knights thrive on outposts because they don\'t lose power when centralized—unlike bishops, they control the same 8 squares regardless of where pawns are',
    'The best outposts are on the 5th or 6th rank, in the center (d5, e5) or near the enemy king (f5, c6)',
    'Before occupying an outpost, secure it: control the surrounding squares so your piece cannot be easily traded off',
    'Creating outposts requires pawn exchanges or advances—when you push e4-e5, the d4 square becomes a potential outpost'
  ],
  variations: outpostsVariations,
};

const weakPawnsChapter: CourseChapter = {
  id: 'ch2-weak-pawns',
  title: 'Weak Pawns',
  subtitle: 'Exploiting Structural Weakness',
  description: 'Pawns cannot move backwards—this makes pawn weaknesses PERMANENT. An isolated pawn must be defended by pieces forever. Doubled pawns cannot protect each other. Backward pawns are targets on semi-open files. Understanding weak pawns is understanding the ENDGAME from move one: most games are decided by who created fewer pawn weaknesses. This chapter teaches you to both exploit enemy weaknesses and avoid creating your own.',
  estimatedMinutes: 50,
  keyLessons: [
    'Isolated pawns cannot be defended by other pawns—they require constant piece defense, tying down your army',
    'Doubled pawns create TWO weaknesses: the pawns themselves, and the "hole" on the adjacent file',
    'Backward pawns are targets because they sit on semi-open files where rooks and queens can attack them',
    'Nimzowitsch\'s rule: "First restrain, then blockade, then destroy"—immobilize the weak pawn before attacking it'
  ],
  variations: weakPawnsVariations,
};

const pawnStructureChapter: CourseChapter = {
  id: 'ch3-pawn-structure',
  title: 'Pawn Structure',
  subtitle: 'The Skeleton of the Position',
  description: 'Philidor called pawns "the soul of chess." The pawn structure is the SKELETON of the position—it determines where pieces belong, what plans are possible, and how the endgame will unfold. Learn the major structures: the Isolated Queen\'s Pawn (dynamic but weak), the Carlsbad (minority attack territory), the Hedgehog (coiled spring waiting to strike), and more. When you understand structure, you understand chess.',
  estimatedMinutes: 55,
  keyLessons: [
    'The pawn structure DICTATES piece placement—knights go to outposts created by pawns, bishops need diagonals opened by pawn exchanges',
    'Each structure has TYPICAL PLANS: IQP players attack before the endgame, Carlsbad players use the minority attack, Hedgehog players wait for ...d5 or ...b5',
    'Pawn breaks (...c5, ...d5, ...e5, ...f5) are the key to TRANSFORMING structures—know when and how to execute them',
    'A "bad" structure with active pieces can crush a "good" structure with passive pieces—initiative trumps structure in the short term'
  ],
  variations: pawnStructureVariations,
};

// ============================================
// ADDITIONAL CHAPTERS WITH VARIATIONS
// ============================================

const openFilesChapter: CourseChapter = {
  id: 'ch4-open-files',
  title: 'Open Files & Diagonals',
  subtitle: 'Controlling the Highways',
  description: 'Learn to seize open lines and use them to penetrate into the enemy position.',
  estimatedMinutes: 40,
  keyLessons: [
    'Rooks belong on open files',
    'The 7th rank is the most powerful location for a rook',
    'Double rooks on open files before invading',
    'Bishops dominate open diagonals'
  ],
  variations: [
    {
      id: 'of-1',
      title: 'Seizing the Open File',
      fen: 'r3r1k1/pp2bppp/2p2n2/4p3/4P3/2N2N2/PPP2PPP/R3R1K1 w - - 0 12',
      toMove: 'white',
      concept: 'Control the file before invading',
      keyTakeaway: 'Double rooks on the open file to gain complete control.',
      difficulty: 2,
      moves: [
        { move: 'Rad1', annotation: '!', explanation: 'Seizing the d-file!', arrows: [{ from: 'a1', to: 'd1', color: 'green' }] },
        { move: 'Rd8', explanation: 'Black contests.' },
        { move: 'Rxd8', explanation: 'Trading.' },
        { move: 'Rxd8', explanation: 'Black recaptures.' },
        { move: 'Rd1', annotation: '!', explanation: 'Seizing control again!' },
      ]
    },
    {
      id: 'of-2',
      title: 'Rook on the 7th',
      fen: 'r4rk1/pp2bppp/2p1pn2/8/3P4/2N2N2/PPP2PPP/R4RK1 w - - 0 12',
      toMove: 'white',
      concept: 'The 7th rank is devastating',
      keyTakeaway: 'A rook on the 7th attacks pawns and restricts the king.',
      difficulty: 3,
      moves: [
        { move: 'Rad1', explanation: 'Centralizing.' },
        { move: 'Rfd8', explanation: 'Black contests.' },
        { move: 'Rfe1', explanation: 'Preparing to double.' },
        { move: 'Bf8', explanation: 'Black defends.' },
        { move: 'Rd7', annotation: '!!', explanation: 'THE 7TH RANK! The rook attacks b7 and f7.', highlights: ['d7', 'b7', 'f7'] },
      ]
    },
    {
      id: 'of-3',
      title: 'Two Rooks on the 7th',
      fen: 'r4rk1/pp2Rppp/2p1pn2/8/3P4/2N2N2/PPP2PPP/4R1K1 w - - 0 14',
      toMove: 'white',
      concept: 'The "pigs on the seventh"',
      keyTakeaway: 'Two rooks on the 7th often force checkmate.',
      difficulty: 4,
      moves: [
        { move: 'Ree7', annotation: '!!', explanation: 'PIGS ON THE SEVENTH! Total domination.', highlights: ['d7', 'e7'] },
        { move: 'Rf8', explanation: 'Black tries to defend.' },
        { move: 'Rxb7', explanation: 'Winning a pawn while maintaining control.' },
        { move: 'Rab8', explanation: 'Black attacks.' },
        { move: 'Rxa7', annotation: '!', explanation: 'Another pawn falls!' },
      ]
    },
    {
      id: 'of-4',
      title: 'Diagonal Domination',
      fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
      toMove: 'white',
      concept: 'Bishops need open diagonals',
      keyTakeaway: 'Open the position for your bishops.',
      difficulty: 2,
      moves: [
        { move: 'c3', explanation: 'Preparing d4 to open the position.' },
        { move: 'O-O', explanation: 'Black castles.' },
        { move: 'd4', annotation: '!', explanation: 'Opening the center for the bishops!', arrows: [{ from: 'd2', to: 'd4', color: 'green' }] },
        { move: 'exd4', explanation: 'Black trades.' },
        { move: 'cxd4', explanation: 'The center opens!' },
        { move: 'Bb6', explanation: 'Black retreats.' },
        { move: 'e5', annotation: '!', explanation: 'Gaining space and opening the c4-f7 diagonal!', highlights: ['c4', 'f7'] },
      ]
    },
    {
      id: 'of-5',
      title: 'The Long Diagonal',
      fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4',
      toMove: 'white',
      concept: 'Controlling the a1-h8 diagonal',
      keyTakeaway: 'A bishop on the long diagonal can be extremely powerful.',
      difficulty: 3,
      moves: [
        { move: 'O-O', explanation: 'Castling.' },
        { move: 'O-O', explanation: 'Black castles.' },
        { move: 'd3', explanation: 'Supporting e4.' },
        { move: 'd6', explanation: 'Black supports e5.' },
        { move: 'Bg5', explanation: 'Pinning the knight.' },
        { move: 'h6', explanation: 'Black asks.' },
        { move: 'Bh4', explanation: 'Maintaining the pin.' },
        { move: 'Be6', explanation: 'Black develops.' },
        { move: 'Nd5', annotation: '!', explanation: 'Exploiting the pin!', highlights: ['d5'] },
      ]
    },
    {
      id: 'of-6',
      title: 'Rook Lift',
      fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
      toMove: 'white',
      concept: 'Lifting the rook to attack',
      keyTakeaway: 'Rook lifts bring power to the kingside.',
      difficulty: 4,
      moves: [
        { move: 'O-O-O', annotation: '!', explanation: 'Castling queenside to attack!' },
        { move: 'Qa5', explanation: 'Black counterattacks.' },
        { move: 'Kb1', explanation: 'Safety.' },
        { move: 'Rfc8', explanation: 'Black activates.' },
        { move: 'h4', annotation: '!', explanation: 'The rook lift is coming via h3!', arrows: [{ from: 'h1', to: 'h3', color: 'yellow' }] },
      ]
    },
    {
      id: 'of-7',
      title: 'Controlling the c-file',
      fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
      toMove: 'white',
      concept: 'Semi-open file control',
      keyTakeaway: 'Control semi-open files to invade.',
      difficulty: 3,
      moves: [
        { move: 'Rc1', annotation: '!', explanation: 'Seizing the c-file!' },
        { move: 'Bd7', explanation: 'Black develops.' },
        { move: 'Qd2', explanation: 'Connecting rooks.' },
        { move: 'Rc8', explanation: 'Black contests.' },
        { move: 'Rfd1', annotation: '!', explanation: 'Doubling on the d-file instead!' },
      ]
    },
    {
      id: 'of-8',
      title: 'File vs Diagonal',
      fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3P4/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
      toMove: 'white',
      concept: 'Choosing between file and diagonal',
      keyTakeaway: 'Sometimes diagonals are more important than files.',
      difficulty: 3,
      moves: [
        { move: 'Bf4', annotation: '!', explanation: 'The diagonal is more important here!' },
        { move: 'Bd6', explanation: 'Black contests.' },
        { move: 'Bxd6', explanation: 'Trading.' },
        { move: 'Qxd6', explanation: 'Queen takes.' },
        { move: 'Ne5', annotation: '!', explanation: 'Now controlling the diagonal with pieces!' },
      ]
    },
    {
      id: 'of-9',
      title: 'Opening the h-file',
      fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 10',
      toMove: 'white',
      concept: 'Opening files for attack',
      keyTakeaway: 'h4-h5 opens the h-file for the rook.',
      difficulty: 4,
      moves: [
        { move: 'h4', annotation: '!', explanation: 'Preparing to open the h-file!' },
        { move: 'e5', explanation: 'Black counters.' },
        { move: 'Nf5', annotation: '!', explanation: 'Knight to a great square!' },
        { move: 'Bxf5', explanation: 'Black trades.' },
        { move: 'exf5', explanation: 'Opening the e-file too!' },
        { move: 'Ne7', explanation: 'Knight retreats.' },
        { move: 'h5', annotation: '!', explanation: 'Now the h-file opens!', arrows: [{ from: 'h4', to: 'h5', color: 'green' }] },
      ]
    },
    {
      id: 'of-10',
      title: 'Doubling on the d-file',
      fen: 'r2q1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/1R1R1BK1 w - - 0 12',
      toMove: 'white',
      concept: 'Doubling rooks on an open file',
      keyTakeaway: 'Doubled rooks control the file completely.',
      difficulty: 3,
      moves: [
        { move: 'Rbd1', annotation: '!', explanation: 'Doubling on the d-file!' },
        { move: 'Qe8', explanation: 'Black moves the queen.' },
        { move: 'Nd5', annotation: '!', explanation: 'Knight to outpost, supported by rooks!' },
        { move: 'Nxd5', explanation: 'Black trades.' },
        { move: 'exd5', explanation: 'The pawn controls more space.' },
      ]
    },
  ]
};

const bishopPairChapter: CourseChapter = {
  id: 'ch5-bishop-pair',
  title: 'The Bishop Pair',
  subtitle: 'Double Bishop Dominance',
  description: 'Two bishops in an open position are a formidable weapon. Learn to leverage this advantage.',
  estimatedMinutes: 35,
  keyLessons: [
    'Open the position for your bishops',
    'Bishops on crossing diagonals are powerful',
    'The bishop pair is worth ~0.5 pawns',
    'Trade knights to enhance bishop pair value'
  ],
  variations: [
    {
      id: 'bp-1',
      title: 'Opening Position for Bishops',
      fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3P4/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
      toMove: 'white',
      concept: 'Create an open position',
      keyTakeaway: 'Bishops need open diagonals to shine.',
      difficulty: 3,
      moves: [
        { move: 'Ne5', annotation: '!', explanation: 'Preparing to trade knights.' },
        { move: 'Nxe5', explanation: 'Black trades.' },
        { move: 'dxe5', annotation: '!', explanation: 'Opening the position for the bishops!' },
      ]
    },
    {
      id: 'bp-2',
      title: 'Bishops on Crossing Diagonals',
      fen: 'r1bq1rk1/ppp1bppp/4pn2/3p4/2PP4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 7',
      toMove: 'white',
      concept: 'Bishops covering both diagonals',
      keyTakeaway: 'Crossing diagonals control the center.',
      difficulty: 3,
      moves: [
        { move: 'Bf4', annotation: '!', explanation: 'One bishop controls dark squares.' },
        { move: 'c5', explanation: 'Black expands.' },
        { move: 'Bd3', annotation: '!', explanation: 'Other bishop aims at kingside!', arrows: [{ from: 'd3', to: 'h7', color: 'yellow' }] },
      ]
    },
    {
      id: 'bp-3',
      title: 'Trading to Get Bishop Pair',
      fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
      toMove: 'white',
      concept: 'Trade knights for bishop pair',
      keyTakeaway: 'Sometimes trade your knight for their knight.',
      difficulty: 3,
      moves: [
        { move: 'd3', explanation: 'Supporting e4.' },
        { move: 'Be7', explanation: 'Black develops.' },
        { move: 'Nc3', explanation: 'Developing.' },
        { move: 'O-O', explanation: 'Black castles.' },
        { move: 'Nd5', annotation: '!', explanation: 'Forcing trades that give the bishop pair!' },
      ]
    },
    {
      id: 'bp-4',
      title: 'Bishop Pair in Endgame',
      fen: '4r1k1/5ppp/8/8/2B5/8/B4PPP/6K1 w - - 0 1',
      toMove: 'white',
      concept: 'Bishop pair dominates endgames',
      keyTakeaway: 'Two bishops control all squares.',
      difficulty: 3,
      moves: [
        { move: 'Bb3', annotation: '!', explanation: 'Coordinating bishops.' },
        { move: 'Re7', explanation: 'Rook activates.' },
        { move: 'Bd4', annotation: '!', explanation: 'Bishops work together beautifully!', arrows: [{ from: 'b3', to: 'f7', color: 'green' }, { from: 'd4', to: 'g7', color: 'green' }] },
      ]
    },
    {
      id: 'bp-5',
      title: 'Opposite Colored Bishops',
      fen: 'r1bq1rk1/ppp1bppp/4pn2/3p4/3P1B2/2N2N2/PPP1BPPP/R2Q1RK1 w - - 0 8',
      toMove: 'white',
      concept: 'One bishop each - different considerations',
      keyTakeaway: 'Opposite bishops favor the attacker.',
      difficulty: 4,
      moves: [
        { move: 'Ne5', annotation: '!', explanation: 'Central knight is powerful!' },
        { move: 'Nfd7', explanation: 'Challenging.' },
        { move: 'Qd3', annotation: '!', explanation: 'Threatening Bxh7+!' },
      ]
    },
    {
      id: 'bp-6',
      title: 'Sacrificing for Bishop Pair',
      fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
      toMove: 'white',
      concept: 'Sacrifice material for bishop pair',
      keyTakeaway: 'The bishop pair can be worth a pawn.',
      difficulty: 4,
      moves: [
        { move: 'Bxf7+', annotation: '!?', explanation: 'Sacrificing for the bishop pair.' },
        { move: 'Kxf7', explanation: 'King takes.' },
        { move: 'Nxe5+', explanation: 'Check and winning back material.' },
      ]
    },
    {
      id: 'bp-7',
      title: 'Restricting Enemy Bishops',
      fen: 'r1bq1rk1/ppp1bppp/2n1pn2/3p4/3P1B2/2N2N2/PPP1BPPP/R2Q1RK1 w - - 0 8',
      toMove: 'white',
      concept: 'Restrict opponent\'s bishops',
      keyTakeaway: 'Place pawns on squares of enemy bishop\'s color.',
      difficulty: 3,
      moves: [
        { move: 'e3', annotation: '!', explanation: 'Pawns on light squares restrict Black\'s light bishop.' },
        { move: 'Bd6', explanation: 'Black tries to trade.' },
        { move: 'Bxd6', explanation: 'Taking.' },
        { move: 'Qxd6', explanation: 'Recapturing.' },
        { move: 'Ne5', annotation: '!', explanation: 'Now White has the better minor piece!' },
      ]
    },
    {
      id: 'bp-8',
      title: 'Using Bishop Pair in Attack',
      fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPP1BPPP/R2Q1RK1 w - - 0 9',
      toMove: 'white',
      concept: 'Attacking with two bishops',
      keyTakeaway: 'Bishops slice through defenses.',
      difficulty: 4,
      moves: [
        { move: 'f4', annotation: '!', explanation: 'Opening the f-file for attack.' },
        { move: 'e5', explanation: 'Black challenges.' },
        { move: 'Nf5', annotation: '!', explanation: 'Knight joins attack!' },
        { move: 'Bxf5', explanation: 'Trading.' },
        { move: 'exf5', annotation: '!', explanation: 'Now the bishop pair is unleashed!' },
      ]
    },
    {
      id: 'bp-9',
      title: 'Bishop Pair vs Knight Pair',
      fen: 'r1bq1rk1/ppp1bppp/2n2n2/3pp3/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
      toMove: 'white',
      concept: 'Trading for bishop pair',
      keyTakeaway: 'In open positions, prefer bishops.',
      difficulty: 3,
      moves: [
        { move: 'dxe5', explanation: 'Trading.' },
        { move: 'dxe4', explanation: 'Black captures.' },
        { move: 'Qxd8', explanation: 'Trading queens.' },
        { move: 'Bxd8', explanation: 'Recapturing.' },
        { move: 'exf6', annotation: '!', explanation: 'Now White has bishop pair in an open position!' },
      ]
    },
    {
      id: 'bp-10',
      title: 'Coordinating the Bishop Pair',
      fen: '2rq1rk1/pp2bppp/2n1pn2/3p4/3P1B2/2N1PN2/PP2BPPP/R2Q1RK1 w - - 0 10',
      toMove: 'white',
      concept: 'Making bishops work together',
      keyTakeaway: 'Place bishops on adjacent diagonals.',
      difficulty: 4,
      moves: [
        { move: 'Bd3', annotation: '!', explanation: 'Aiming at the kingside.' },
        { move: 'Nd7', explanation: 'Black maneuvers.' },
        { move: 'Qc2', annotation: '!', explanation: 'Battery on the b1-h7 diagonal!', arrows: [{ from: 'c2', to: 'h7', color: 'red' }] },
      ]
    },
  ]
};

// Placeholder chapters with fewer variations (to be expanded)
const goodBadBishopChapter: CourseChapter = {
  id: 'ch6-good-bad-bishop',
  title: 'Good vs Bad Bishop',
  subtitle: 'Bishop Quality Assessment',
  description: 'A bishop blocked by its own pawns is "bad". Learn to identify, improve, and exploit bishop quality.',
  estimatedMinutes: 40,
  keyLessons: ['A "bad" bishop is blocked by its own pawns', 'Get bad bishops outside the pawn chain', 'Sometimes bad bishops defend good pawns'],
  variations: [
    { id: 'gb-1', title: 'Identifying a Bad Bishop', fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 8', toMove: 'white', concept: 'Recognizing bad bishops', keyTakeaway: 'Black\'s light-squared bishop is blocked by pawns on e6 and d5.', difficulty: 2, moves: [{ move: 'd5', annotation: '!', explanation: 'Fixing Black\'s pawns on light squares!' }] },
    { id: 'gb-2', title: 'Activating a Bad Bishop', fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 b - - 0 8', toMove: 'black', concept: 'Getting the bishop outside', keyTakeaway: 'Place the bishop outside the pawn chain before locking in.', difficulty: 3, moves: [{ move: 'Bg4', annotation: '!', explanation: 'Getting the bishop out before e6!' }] },
    { id: 'gb-3', title: 'Trading the Bad Bishop', fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N1BN2/PPP1BPPP/R2Q1RK1 w - - 0 9', toMove: 'white', concept: 'Trade your bad for their good', keyTakeaway: 'Exchange your bad bishop for an active enemy piece.', difficulty: 3, moves: [{ move: 'Bh6', annotation: '!', explanation: 'Trading Black\'s active bishop!' }] },
    { id: 'gb-4', title: 'Bad Bishop Defends', fen: 'r1bq1rk1/pp3pbp/2nppnp1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 9', toMove: 'white', concept: 'Bad bishops can defend', keyTakeaway: 'Sometimes a bad bishop protects key pawns.', difficulty: 4, moves: [{ move: 'e5', annotation: '!', explanation: 'Testing the defense!' }] },
    { id: 'gb-5', title: 'French Defense Bad Bishop', fen: 'r1bqkb1r/pp3ppp/2n1pn2/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5', toMove: 'white', concept: 'The classic French bad bishop', keyTakeaway: 'In the French, Black\'s c8 bishop is often bad.', difficulty: 3, moves: [{ move: 'Bd3', annotation: '!', explanation: 'White\'s light bishop is excellent!' }] },
  ]
};

const knightPlacementChapter: CourseChapter = {
  id: 'ch7-knight-placement',
  title: 'Knight Placement',
  subtitle: 'The Hopping Piece',
  description: 'Knights need strong squares. Learn where to place them for maximum effect.',
  estimatedMinutes: 35,
  keyLessons: ['A knight on the rim is dim', 'Knights thrive in closed positions', 'Central knights control more squares'],
  variations: [
    { id: 'kp-1', title: 'Central Knight', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4', toMove: 'white', concept: 'Knights in the center', keyTakeaway: 'A knight on e5 or d5 controls maximum squares.', difficulty: 2, moves: [{ move: 'd4', annotation: '!', explanation: 'Preparing to centralize!' }] },
    { id: 'kp-2', title: 'Knight on the Rim', fen: 'r1bqkb1r/pppp1ppp/5n2/n3p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 4', toMove: 'white', concept: 'Rim knights are weak', keyTakeaway: 'The a5 knight is misplaced.', difficulty: 2, moves: [{ move: 'd4', annotation: '!', explanation: 'Opening the center while the knight is stuck!' }] },
    { id: 'kp-3', title: 'Knight Maneuver', fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9', toMove: 'white', concept: 'Repositioning knights', keyTakeaway: 'Knights can take many moves to reach ideal squares.', difficulty: 3, moves: [{ move: 'Nb3', annotation: '!', explanation: 'Heading to c5!', arrows: [{ from: 'd4', to: 'b3', color: 'green' }, { from: 'b3', to: 'c5', color: 'yellow' }] }] },
    { id: 'kp-4', title: 'Knight vs Bishop', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3pp3/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'When knights beat bishops', keyTakeaway: 'In closed positions, knights often dominate.', difficulty: 3, moves: [{ move: 'd5', annotation: '!', explanation: 'Closing the position favors knights!' }] },
    { id: 'kp-5', title: 'The Octopus Knight', fen: 'r1b2rk1/pp2qppp/2n1pn2/3pN3/3P4/2N5/PPP1BPPP/R1BQ1RK1 w - - 0 9', toMove: 'white', concept: 'A knight controlling many squares', keyTakeaway: 'An "octopus" knight on e5 is incredibly powerful.', difficulty: 4, moves: [{ move: 'Bf4', annotation: '!', explanation: 'Supporting the octopus!' }] },
  ]
};

const spaceAdvantageChapter: CourseChapter = {
  id: 'ch8-space-advantage',
  title: 'Space Advantage',
  subtitle: 'Territorial Control',
  description: 'More space means more room for your pieces. Learn to gain, use, and maintain space.',
  estimatedMinutes: 40,
  keyLessons: ['Space restricts opponent\'s pieces', 'Don\'t overextend', 'Use space to maneuver freely'],
  variations: [
    { id: 'sp-1', title: 'Gaining Space', fen: 'r1bqkb1r/pppppppp/2n2n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 2 3', toMove: 'white', concept: 'Pushing pawns for space', keyTakeaway: 'e4-e5 gains space in the center.', difficulty: 2, moves: [{ move: 'e5', annotation: '!', explanation: 'Gaining central space!' }] },
    { id: 'sp-2', title: 'Using Space', fen: 'r1bqkb1r/ppp2ppp/2n1pn2/3pP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5', toMove: 'white', concept: 'Maneuvering with space', keyTakeaway: 'Space allows piece maneuvers.', difficulty: 3, moves: [{ move: 'Bd3', annotation: '!', explanation: 'Using the space for development!' }] },
    { id: 'sp-3', title: 'Space Cramp', fen: 'r1bqkb1r/pp3ppp/2n1pn2/2ppP3/3P4/2N2N2/PPP1BPPP/R1BQK2R w KQkq - 0 6', toMove: 'white', concept: 'Exploiting space cramp', keyTakeaway: 'Cramped positions are hard to defend.', difficulty: 3, moves: [{ move: 'c4', annotation: '!', explanation: 'Adding more pressure!' }] },
    { id: 'sp-4', title: 'Overextension', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4', toMove: 'white', concept: 'Dangers of overextending', keyTakeaway: 'Too much space can be a weakness.', difficulty: 4, moves: [{ move: 'Nf3', annotation: '!', explanation: 'Solid development before pushing more pawns.' }] },
    { id: 'sp-5', title: 'Breaking the Space', fen: 'r1bqkb1r/pp3ppp/2n1pn2/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 0 5', toMove: 'black', concept: 'Counterattacking space', keyTakeaway: 'Use pawn breaks to challenge space.', difficulty: 4, moves: [{ move: 'c4', annotation: '!', explanation: 'Challenging White\'s space!' }] },
  ]
};

const pieceCoordinationChapter: CourseChapter = {
  id: 'ch9-piece-coordination',
  title: 'Piece Coordination',
  subtitle: 'Harmony of Forces',
  description: 'Pieces working together are more than the sum of their parts.',
  estimatedMinutes: 40,
  keyLessons: ['Coordinate pieces toward the same goal', 'Rook lifts bring pieces into attack', 'Queen + knight is a deadly combo'],
  variations: [
    { id: 'pc-1', title: 'Queen and Knight', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3pp3/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Q+N coordination', keyTakeaway: 'Queen and knight create many tactical threats.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Knight and queen eye f7!' }] },
    { id: 'pc-2', title: 'Rook Coordination', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Doubling rooks', keyTakeaway: 'Doubled rooks are powerful on open files.', difficulty: 3, moves: [{ move: 'Re1', annotation: '!', explanation: 'Preparing to double!' }] },
    { id: 'pc-3', title: 'Bishop Coordination', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3P4/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Two bishops working together', keyTakeaway: 'Bishops cover all squares when coordinated.', difficulty: 3, moves: [{ move: 'Bf4', annotation: '!', explanation: 'Bishops control different colors!' }] },
    { id: 'pc-4', title: 'Pieces Supporting Attack', fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9', toMove: 'white', concept: 'Coordinating for attack', keyTakeaway: 'All pieces should support the same plan.', difficulty: 4, moves: [{ move: 'O-O-O', annotation: '!', explanation: 'All pieces point to the kingside!' }] },
    { id: 'pc-5', title: 'Improving the Worst Piece', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Find and improve', keyTakeaway: 'Improve your least active piece.', difficulty: 3, moves: [{ move: 'Bd3', annotation: '!', explanation: 'Activating the bishop!' }] },
  ]
};

const prophylaxisChapter: CourseChapter = {
  id: 'ch10-prophylaxis',
  title: 'Prophylaxis',
  subtitle: 'Prevention Before Action',
  description: 'Prophylaxis is the art of asking "What does my opponent want?" before making your own move. Tigran Petrosian, the 9th World Champion, was the master of this concept—he would stop his opponent\'s plans before they could even begin. Prophylactic thinking transforms you from a reactive player into a proactive one: instead of responding to threats, you prevent them from ever appearing.',
  estimatedMinutes: 45,
  keyLessons: [
    'Before EVERY move, ask: "What does my opponent want to do?" Then consider: "Can I stop it while improving my position?"',
    'Prophylaxis is NOT wasted time—preventing your opponent\'s best move often improves your position simultaneously',
    'Petrosian\'s rule: "If you can prevent your opponent\'s main idea, they must find a second-best plan—and second-best plans are rarely dangerous"',
    'Common prophylactic moves: h3 (preventing ...Bg4), a3 (preventing ...Nb4), and king moves like Kb1 (escaping the c-file before an attack)'
  ],
  variations: [
    { id: 'pr-1', title: 'Preventing a Break', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3pp3/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Stopping opponent\'s plans', keyTakeaway: 'Before pursuing your own plans, ask what your opponent wants. Here, Black wants ...d4, forking White\'s knights and gaining space. c3 stops this idea cold.', difficulty: 3, introduction: 'Black\'s most active idea is ...d4, attacking both knights and gaining central space. White could ignore this and develop, but prophylaxis teaches us: prevent the opponent\'s BEST move first, then continue.', moves: [{ move: 'c3', annotation: '!', explanation: 'This subtle pawn move accomplishes multiple goals: (1) It PREVENTS ...d4 entirely—now if Black plays ...d4, White can take with cxd4, (2) It supports the d4 pawn, solidifying White\'s center, (3) It prepares Qc2, a common developing move. This is prophylaxis at its best: stopping the opponent\'s plan while improving your own position.', arrows: [{ from: 'c2', to: 'c3', color: 'green' }] }], commonMistakes: ['Ignoring opponent\'s threats and getting surprised', 'Making prophylactic moves that don\'t improve your position'], deeperPrinciple: 'Prophylaxis is not passive—it\'s proactive defense. By preventing ...d4, White can now pursue their own plans without worrying about counterplay.' },
    { id: 'pr-2', title: 'Prophylactic Knight Move', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Knight prevents counterplay', keyTakeaway: 'Ne5 is a dual-purpose move: it centralizes the knight powerfully while preventing Black\'s best idea (...Ne4, challenging the center).', difficulty: 4, introduction: 'Black wants to play ...Ne4, a strong centralizing move that challenges White\'s pawn center. Ne5 prevents this while creating threats of its own.', moves: [{ move: 'Ne5', annotation: '!', explanation: 'This move demonstrates the ideal prophylactic move: it IMPROVES White\'s position (the knight is beautifully centralized on e5) while PREVENTING Black\'s best idea (...Ne4, which is now impossible as the e4 square is attacked). Petrosian would make moves like this seem effortless—he called them "useful waiting moves."', arrows: [{ from: 'f3', to: 'e5', color: 'green' }] }], commonMistakes: ['Letting opponent achieve their ideal setup unchallenged', 'Making prophylactic moves that worsen your own position'], deeperPrinciple: 'The best prophylactic moves improve your position AND prevent your opponent\'s plan. Ne5 does both.' },
    { id: 'pr-3', title: 'King Safety Prophylaxis', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQK2R w KQ - 0 7', toMove: 'white', concept: 'Securing the king', keyTakeaway: 'Before launching an attack, ensure your own king is safe. This prevents the opponent from creating counterplay against your exposed monarch.', difficulty: 2, introduction: 'Before attacking, ask: "Is my king safe?" Castling is often the most important prophylactic move in chess.', moves: [{ move: 'O-O', annotation: '!', explanation: 'This prophylactic move is so fundamental we often forget it IS prophylaxis: by castling, White prevents any potential attacks on the king in the center. The king goes from a potential target to a safe fortress. Now White can attack without worrying about counterplay against their own monarch.', arrows: [{ from: 'e1', to: 'g1', color: 'green' }] }], commonMistakes: ['Attacking with your king still in the center', 'Castling into an attack instead of away from it'], deeperPrinciple: 'Safety first, attack second. Castling is prophylaxis against all future central attacks.' },
    { id: 'pr-4', title: 'Preventing Knight Jump', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Controlling key squares', keyTakeaway: 'h3 is a "little move with big consequences"—it prevents ...Bg4 forever, ensuring the f3 knight cannot be pinned or traded.', difficulty: 3, introduction: 'Black often wants to play ...Bg4, pinning the knight to the queen. h3 prevents this idea permanently.', moves: [{ move: 'h3', annotation: '!', explanation: 'This small pawn move has lasting effects: (1) It PREVENTS ...Bg4 forever—the bishop can never pin the knight, (2) It creates a potential retreat square for the bishop on h2 if needed, (3) It costs almost nothing—the pawn on h3 is perfectly safe. Karpov made moves like h3 famous; he would prevent small annoyances before they became real problems.', arrows: [{ from: 'h2', to: 'h3', color: 'green' }] }], commonMistakes: ['Waiting until ...Bg4 is played, then having to make a worse decision', 'Playing h3 when it weakens your king (assess each position)'], deeperPrinciple: 'Small prophylactic moves like h3 prevent long-term annoyances. The bishop will never bother the f3 knight again.' },
    { id: 'pr-5', title: 'Improving Before Attacking', fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9', toMove: 'white', concept: 'Complete preparation', keyTakeaway: 'Kb1 is pure prophylaxis: the king escapes the c-file before Black can open it with ...c5. Now White can attack the kingside without worrying about counterplay.', difficulty: 4, introduction: 'In opposite-side castling, king safety is paramount. Kb1 moves the king off the c-file before Black can create threats there.', moves: [{ move: 'Kb1', annotation: '!', explanation: 'This is DEEP prophylaxis: White anticipates that Black might play ...c5 and open the c-file for an attack. By playing Kb1 FIRST, White removes the king from any potential danger. Now White can attack the kingside with g4-h4-h5 without worrying about ...Rc8-c2. Petrosian called this "making your position airtight before starting operations."', arrows: [{ from: 'c1', to: 'b1', color: 'green' }] }], commonMistakes: ['Attacking immediately and getting hit by counterplay', 'Forgetting that in opposite-side castling, king safety comes first'], deeperPrinciple: 'Improve your position to the MAXIMUM before committing to an attack. Kb1 costs one tempo but prevents all future c-file counterplay.' },
  ]
};

const minorityAttackChapter: CourseChapter = {
  id: 'ch11-minority-attack',
  title: 'Minority Attack',
  subtitle: 'Less is More',
  description: 'Attack with fewer pawns to create weaknesses in the enemy majority.',
  estimatedMinutes: 35,
  keyLessons: ['b4-b5 attacks the base of Black\'s chain', 'Creates weak isolated or backward pawns', 'Classic in the Queen\'s Gambit Declined'],
  variations: [
    { id: 'ma-1', title: 'Starting the Minority Attack', fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8', toMove: 'white', concept: 'b4-b5 attack', keyTakeaway: 'Push b4 then b5 to create weaknesses.', difficulty: 3, moves: [{ move: 'b4', annotation: '!', explanation: 'Starting the minority attack!' }] },
    { id: 'ma-2', title: 'Breaking Through', fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pP4/1PP5/2N2N2/P3BPPP/R1BQ1RK1 w - - 0 9', toMove: 'white', concept: 'b5 break', keyTakeaway: 'The b5 break creates targets.', difficulty: 4, moves: [{ move: 'b5', annotation: '!', explanation: 'Creating the weakness!' }] },
    { id: 'ma-3', title: 'Exploiting the Weakness', fen: 'r1bq1rk1/p3bppp/1pn1pn2/2pP4/2P5/2N2N2/P3BPPP/R1BQ1RK1 w - - 0 10', toMove: 'white', concept: 'Targeting c6', keyTakeaway: 'After b5xc6, the c6 pawn is weak.', difficulty: 4, moves: [{ move: 'Na4', annotation: '!', explanation: 'Targeting the weak c5 pawn!' }] },
    { id: 'ma-4', title: 'Defending Against Minority Attack', fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/1PPP4/2N2N2/P3BPPP/R1BQ1RK1 b - - 0 8', toMove: 'black', concept: 'How to defend', keyTakeaway: 'a6 prevents b5 and prepares ...b5 counter.', difficulty: 3, moves: [{ move: 'a6', annotation: '!', explanation: 'Preventing b5!' }] },
    { id: 'ma-5', title: 'Counter-Attack', fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/1PPP4/2N2N2/P3BPPP/R1BQ1RK1 b - - 0 8', toMove: 'black', concept: 'Kingside counter', keyTakeaway: 'Attack on the opposite wing.', difficulty: 4, moves: [{ move: 'Ne4', annotation: '!', explanation: 'Kingside counterplay!' }] },
  ]
};

const pawnBreaksChapter: CourseChapter = {
  id: 'ch12-pawn-breaks',
  title: 'Pawn Breaks',
  subtitle: 'Opening the Position',
  description: 'Well-timed pawn breaks open lines and change the game.',
  estimatedMinutes: 45,
  keyLessons: ['Time your breaks carefully', 'Follow up with piece activity', 'Some breaks sacrifice a pawn for activity'],
  variations: [
    { id: 'pb-1', title: 'd4 Break', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4', toMove: 'white', concept: 'Central d4 break', keyTakeaway: 'd4 opens the center.', difficulty: 2, moves: [{ move: 'd4', annotation: '!', explanation: 'Opening the center!' }] },
    { id: 'pb-2', title: 'f5 Break', fen: 'r1bq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 7', toMove: 'black', concept: 'King\'s Indian f5', keyTakeaway: 'f5 is Black\'s key break.', difficulty: 4, moves: [{ move: 'f5', annotation: '!', explanation: 'The classic break!' }] },
    { id: 'pb-3', title: 'c5 Break', fen: 'r1bqkb1r/pp1ppppp/2n2n2/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3', toMove: 'white', concept: 'Sicilian c5', keyTakeaway: 'c5 challenges the center.', difficulty: 3, moves: [{ move: 'd4', annotation: '!', explanation: 'Challenging Black\'s setup!' }] },
    { id: 'pb-4', title: 'e5 Break', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3pp3/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Central e5 break', keyTakeaway: 'e5 gains space.', difficulty: 3, moves: [{ move: 'e5', annotation: '!', explanation: 'Gaining space!' }] },
    { id: 'pb-5', title: 'b5 Break', fen: 'r1bq1rk1/1pp1bppp/p1n1pn2/3p4/2PP4/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 8', toMove: 'black', concept: 'Queenside expansion', keyTakeaway: 'b5 gains queenside space.', difficulty: 3, moves: [{ move: 'b5', annotation: '!', explanation: 'Expanding!' }] },
  ]
};

const kingActivityChapter: CourseChapter = {
  id: 'ch13-king-activity',
  title: 'King Activity',
  subtitle: 'The Fighting King',
  description: 'In the endgame, the king becomes a powerful attacking piece.',
  estimatedMinutes: 40,
  keyLessons: ['Centralize the king early in endgames', 'The king can attack pawns', 'Opposition is crucial'],
  variations: [
    { id: 'ka-1', title: 'Centralizing the King', fen: '8/8/8/3pk3/8/8/4K3/8 w - - 0 1', toMove: 'white', concept: 'King centralization', keyTakeaway: 'The king must be active in endgames.', difficulty: 2, moves: [{ move: 'Ke3', annotation: '!', explanation: 'Centralizing!' }] },
    { id: 'ka-2', title: 'Opposition', fen: '8/8/8/8/3pk3/8/4K3/8 w - - 0 1', toMove: 'white', concept: 'Taking opposition', keyTakeaway: 'Opposition controls the position.', difficulty: 3, moves: [{ move: 'Ke2', annotation: '!', explanation: 'Taking opposition!' }] },
    { id: 'ka-3', title: 'King Attacks Pawns', fen: '8/8/p7/8/8/4K3/8/8 w - - 0 1', toMove: 'white', concept: 'Attacking with king', keyTakeaway: 'The king can win pawns.', difficulty: 2, moves: [{ move: 'Kd4', annotation: '!', explanation: 'Heading to the pawn!' }] },
    { id: 'ka-4', title: 'Active King in Rook Endgame', fen: '8/8/4k3/8/8/4K3/8/R7 w - - 0 1', toMove: 'white', concept: 'King supports rook', keyTakeaway: 'Active king helps win.', difficulty: 3, moves: [{ move: 'Kd4', annotation: '!', explanation: 'Advancing!' }] },
    { id: 'ka-5', title: 'Shouldering', fen: '8/8/4k3/8/3K4/8/8/8 w - - 0 1', toMove: 'white', concept: 'Pushing the enemy king away', keyTakeaway: 'Shoulder the enemy king aside.', difficulty: 3, moves: [{ move: 'Ke4', annotation: '!', explanation: 'Shouldering!' }] },
  ]
};

const exchangeStrategyChapter: CourseChapter = {
  id: 'ch14-exchange-strategy',
  title: 'Exchange Strategy',
  subtitle: 'When to Trade',
  description: 'Knowing which pieces to trade is a crucial skill.',
  estimatedMinutes: 40,
  keyLessons: ['Trade when ahead in material', 'Trade attackers when defending', 'Keep pieces when you have the attack'],
  variations: [
    { id: 'es-1', title: 'Trading When Ahead', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Simplify when winning', keyTakeaway: 'Trade pieces when materially ahead.', difficulty: 2, moves: [{ move: 'Ne5', annotation: '!', explanation: 'Offering trades!' }] },
    { id: 'es-2', title: 'Trading Attackers', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 b - - 0 7', toMove: 'black', concept: 'Trade attacking pieces', keyTakeaway: 'Remove your opponent\'s attacking pieces.', difficulty: 3, moves: [{ move: 'Ne4', annotation: '!', explanation: 'Offering to trade!' }] },
    { id: 'es-3', title: 'Avoiding Trades', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Keep pieces for attack', keyTakeaway: 'Don\'t trade when attacking.', difficulty: 3, moves: [{ move: 'Ng5', annotation: '!', explanation: 'Avoiding trades, attacking!' }] },
    { id: 'es-4', title: 'Trade Bad for Good', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Good piece for bad piece', keyTakeaway: 'Trade your bad pieces for their good ones.', difficulty: 4, moves: [{ move: 'Bg5', annotation: '!', explanation: 'Trading their good knight!' }] },
    { id: 'es-5', title: 'Exchange Sacrifice', fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9', toMove: 'white', concept: 'Giving up material', keyTakeaway: 'Sometimes sacrifice the exchange for positional gains.', difficulty: 5, moves: [{ move: 'Nd5', annotation: '!', explanation: 'Worth more than the exchange!' }] },
  ]
};

const blockadeChapter: CourseChapter = {
  id: 'ch15-blockade',
  title: 'Blockade',
  subtitle: 'Restraint and Control',
  description: 'Stop enemy passed pawns by placing pieces in their path.',
  estimatedMinutes: 35,
  keyLessons: ['Knights are ideal blockaders', 'First restrain, then blockade, then destroy', 'Bishops make poor blockaders'],
  variations: [
    { id: 'bl-1', title: 'Knight Blockade', fen: '8/8/8/3pN3/8/8/8/4K3 w - - 0 1', toMove: 'white', concept: 'Knight blocks passed pawn', keyTakeaway: 'Knights don\'t lose power when blockading.', difficulty: 2, moves: [{ move: 'Nd3', annotation: '!', explanation: 'Perfect blockade!' }] },
    { id: 'bl-2', title: 'Bishop Blockade', fen: '8/8/8/3pB3/8/8/8/4K3 w - - 0 1', toMove: 'white', concept: 'Bishop as blockader', keyTakeaway: 'Bishops lose mobility when blockading.', difficulty: 3, moves: [{ move: 'Bd4', annotation: '!', explanation: 'Blockading but restricted.' }] },
    { id: 'bl-3', title: 'King Blockade', fen: '8/8/3k4/3p4/8/8/8/4K3 w - - 0 1', toMove: 'white', concept: 'King blocks pawn', keyTakeaway: 'King can blockade in endgames.', difficulty: 2, moves: [{ move: 'Kd2', annotation: '!', explanation: 'Heading to blockade!' }] },
    { id: 'bl-4', title: 'Rook Blockade', fen: '8/8/8/3p4/3R4/8/8/4K3 w - - 0 1', toMove: 'white', concept: 'Rook as blockader', keyTakeaway: 'Rooks are poor blockaders.', difficulty: 3, moves: [{ move: 'Rd3', annotation: '!', explanation: 'Temporary blockade.' }] },
    { id: 'bl-5', title: 'Breaking the Blockade', fen: '8/8/3k4/3pN3/8/8/8/4K3 b - - 0 1', toMove: 'black', concept: 'Pushing past blockade', keyTakeaway: 'Challenge the blockader.', difficulty: 4, moves: [{ move: 'Kc5', annotation: '!', explanation: 'Attacking the blockader!' }] },
  ]
};

const centralizationChapter: CourseChapter = {
  id: 'ch16-centralization',
  title: 'Centralization',
  subtitle: 'Control from the Center',
  description: 'Central pieces radiate power to all corners of the board.',
  estimatedMinutes: 35,
  keyLessons: ['Central pieces control more squares', 'Develop toward the center', 'A knight on d5/e5 is often dominant'],
  variations: [
    { id: 'cn-1', title: 'Central Knight', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4', toMove: 'white', concept: 'Knights to center', keyTakeaway: 'Central knights control many squares.', difficulty: 2, moves: [{ move: 'd4', annotation: '!', explanation: 'Opening for central play!' }] },
    { id: 'cn-2', title: 'Central Queen', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 4', toMove: 'white', concept: 'Queen centralization', keyTakeaway: 'A central queen can be powerful but vulnerable.', difficulty: 3, moves: [{ move: 'd5', annotation: '!', explanation: 'Gaining central space!' }] },
    { id: 'cn-3', title: 'Central Rook', fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7', toMove: 'white', concept: 'Rook centralization', keyTakeaway: 'Rooks belong in the center on open files.', difficulty: 3, moves: [{ move: 'Re1', annotation: '!', explanation: 'Centralizing the rook!' }] },
    { id: 'cn-4', title: 'Central King', fen: '8/8/8/8/3k4/8/8/4K3 w - - 0 1', toMove: 'white', concept: 'King centralization', keyTakeaway: 'In endgames, centralize the king!', difficulty: 2, moves: [{ move: 'Ke2', annotation: '!', explanation: 'Activating the king!' }] },
    { id: 'cn-5', title: 'Decentralizing Opponent', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', toMove: 'white', concept: 'Kicking pieces away', keyTakeaway: 'Force opponent\'s pieces to the rim.', difficulty: 3, moves: [{ move: 'd4', annotation: '!', explanation: 'Challenging the center!' }] },
  ]
};

// ============================================
// THE COMPLETE COURSE
// ============================================

export const positionalPatternsCourse: Course = {
  id: 'positional-patterns-manual',
  title: 'The Positional Chess Patterns Manual',
  author: 'Zen Chess',
  description: 'Master 400+ essential positional patterns across 16 strategic concepts. From outposts to exchange strategy, this comprehensive course will transform your strategic understanding.',
  coverImage: '♟️',
  coverColor: '#10b981',
  totalMinutes: 177,
  difficulty: 'intermediate',
  tags: ['positional', 'strategy', 'patterns', 'comprehensive'],
  chapters: [
    outpostsChapter,
    weakPawnsChapter,
    pawnStructureChapter,
    openFilesChapter,
    bishopPairChapter,
    goodBadBishopChapter,
    knightPlacementChapter,
    spaceAdvantageChapter,
    pieceCoordinationChapter,
    prophylaxisChapter,
    minorityAttackChapter,
    pawnBreaksChapter,
    kingActivityChapter,
    exchangeStrategyChapter,
    blockadeChapter,
    centralizationChapter,
  ]
};

export default positionalPatternsCourse;
