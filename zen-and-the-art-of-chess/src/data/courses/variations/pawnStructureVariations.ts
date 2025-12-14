// ============================================
// PAWN STRUCTURE - COMPREHENSIVE VARIATIONS
// 60 variations covering major pawn structures
// ============================================

import type { CourseVariation } from '../courseTypes';

export const pawnStructureVariations: CourseVariation[] = [
  // CARLSBAD STRUCTURE (1-10){
    id: 'ps-2',
    title: 'Minority Attack Execution',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/1PPP4/2N1PN2/P1Q2PPP/R1B1KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Completing the minority attack',
    keyTakeaway: 'After b5, target the resulting weak c-pawn.',
    difficulty: 4,
    moves: [
      { move: 'b5', annotation: '!', explanation: 'Breaking through!' },
      { move: 'Na5', explanation: 'Black tries to blockade.' },
      { move: 'Bd2', annotation: '!', explanation: 'Preparing to trade the knight.' },
      { move: 'Bd7', explanation: 'Black develops.' },
      { move: 'Na4', annotation: '!', explanation: 'Heading to c5!', arrows: [{ from: 'a4', to: 'c5', color: 'yellow' }] }
]
  },
  {
    id: 'ps-3',
    title: 'Black\'s Carlsbad Counter',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PPQ2PPP/R1B1KB1R b KQ - 0 8',
    toMove: 'black',
    concept: 'Black\'s kingside attack',
    keyTakeaway: 'Black counters the minority attack with kingside play.',
    difficulty: 4,
    moves: [
      { move: 'Ne4', annotation: '!', explanation: 'Centralizing and preparing f5.' },
      { move: 'Nxe4', explanation: 'White trades.' },
      { move: 'dxe4', explanation: 'Opening the d-file.' },
      { move: 'Nd2', explanation: 'Attacking e4.' },
      { move: 'f5', annotation: '!', explanation: 'Black starts the kingside attack!', arrows: [{ from: 'f7', to: 'f5', color: 'green' }] }
]
  },// FRENCH STRUCTURE (6-15)
  {
    id: 'ps-6',
    title: 'The French Structure',
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'White\'s space vs Black\'s counterplay',
    keyTakeaway: 'White should attack on the kingside; Black on the queenside.',
    difficulty: 3,
    moves: [
      { move: 'Be2', explanation: 'Developing solidly.' },
      { move: 'cxd4', explanation: 'Black trades.' },
      { move: 'Nxd4', explanation: 'Recapturing.' },
      { move: 'Bc5', explanation: 'Black develops actively.' },
      { move: 'Be3', explanation: 'Challenging the bishop.' }
]
  },
  {
    id: 'ps-7',
    title: 'French Pawn Chain',
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/2ppP3/3P4/2PB1N2/PP3PPP/R1BQK2R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Attack the base of the pawn chain',
    keyTakeaway: 'The base pawn (d4) is the weakest link in a chain.',
    difficulty: 4,
    moves: [
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'cxd4', explanation: 'Black attacks the chain\'s base!' },
      { move: 'cxd4', explanation: 'Recapturing.' },
      { move: 'Qb6', annotation: '!', explanation: 'Black attacks d4 and b2!', arrows: [{ from: 'b6', to: 'd4', color: 'red' }, { from: 'b6', to: 'b2', color: 'red' }] },
      { move: 'Be3', explanation: 'Defending.' }
]
  },
  {
    id: 'ps-8',
    title: 'French Advance Variation',
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Maintaining the e5 pawn',
    keyTakeaway: 'The e5 pawn restricts Black\'s kingside.',
    difficulty: 3,
    moves: [
      { move: 'Bb5', annotation: '!', explanation: 'Pinning and pressuring.' },
      { move: 'Bd7', explanation: 'Black breaks the pin.' },
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'Bxc6', annotation: '!', explanation: 'Doubling pawns and maintaining e5.', highlights: ['c6', 'e5'] }
]
  },{
    id: 'ps-10',
    title: 'French Wing Attack',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2ppP3/3P4/2N2N2/PPPBBPPP/R2Q1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Kingside attack in the French',
    keyTakeaway: 'Attack where you have more space.',
    difficulty: 4,
    moves: [
      { move: 'h4', annotation: '!', explanation: 'Starting the kingside attack!' },
      { move: 'cxd4', explanation: 'Black counterattacks.' },
      { move: 'Nxd4', explanation: 'Recapturing.' },
      { move: 'Qb6', explanation: 'Black attacks.' },
      { move: 'h5', annotation: '!', explanation: 'The attack continues!' }
]
  },
  // SICILIAN STRUCTURES (11-20)
  {
    id: 'ps-11',
    title: 'The Sicilian Structure',
    fen: 'r1bqkb1r/pp1ppppp/2n2n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Open Sicilian pawn structures',
    keyTakeaway: 'White has a central majority; Black has a queenside majority.',
    difficulty: 3,
    moves: [
      { move: 'Nc3', explanation: 'Developing and supporting e4.' },
      { move: 'g6', explanation: 'Black prepares the Dragon setup.' },
      { move: 'Be3', explanation: 'Developing.' },
      { move: 'Bg7', explanation: 'The Dragon bishop.' },
      { move: 'f3', annotation: '!', explanation: 'Preparing the Yugoslav Attack!', arrows: [{ from: 'f2', to: 'f3', color: 'green' }] }
]
  },
  {
    id: 'ps-12',
    title: 'Maroczy Bind',
    fen: 'r1bqkb1r/pp1ppp1p/2n3pn/8/2P1P3/2N5/PP2BPPP/R1BQK1NR w KQkq - 0 6',
    toMove: 'white',
    concept: 'Controlling d5 with pawns',
    keyTakeaway: 'The Maroczy Bind (c4+e4) controls d5 but gives Black chances for ...d5.',
    difficulty: 4,
    moves: [
      { move: 'Nf3', explanation: 'Developing.' },
      { move: 'Bg7', explanation: 'Black fianchettoes.' },
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Be3', explanation: 'Developing.' },
      { move: 'd6', explanation: 'Black prepares ...Nd7-c5.' },
      { move: 'Nd5', annotation: '!', explanation: 'Occupying the hole!', highlights: ['d5'] }
]
  },
  {
    id: 'ps-13',
    title: 'Sicilian Scheveningen',
    fen: 'r1bqkb1r/pp3ppp/2nppn2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    concept: 'The small center',
    keyTakeaway: 'Black\'s e6+d6 creates a solid but passive setup.',
    difficulty: 3,
    moves: [
      { move: 'Be2', explanation: 'Solid development.' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'f4', annotation: '!', explanation: 'English Attack! Preparing kingside expansion.', arrows: [{ from: 'f4', to: 'f5', color: 'yellow' }] }
]
  },
  {
    id: 'ps-14',
    title: 'Sicilian Najdorf Structure',
    fen: 'r1bqkb1r/1p1npppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    concept: 'The Najdorf setup',
    keyTakeaway: 'a6 prepares ...b5 and prevents Nb5.',
    difficulty: 4,
    moves: [
      { move: 'Be2', explanation: 'Classical approach.' },
      { move: 'e5', explanation: 'Black strikes in the center!' },
      { move: 'Nb3', annotation: '!', explanation: 'Retreating to maintain stability.' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'O-O', annotation: '!', explanation: 'Castling, preparing f4.' }
]
  },// KING'S INDIAN STRUCTURES (16-25)
  {
    id: 'ps-16',
    title: 'King\'s Indian Classical',
    fen: 'r1bq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Classical d5 structure',
    keyTakeaway: 'In the King\'s Indian, d5 is White\'s key move.',
    difficulty: 3,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Closing the center and seizing space.' },
      { move: 'Ne5', explanation: 'Black seeks counterplay.' },
      { move: 'Nxe5', explanation: 'Trading.' },
      { move: 'dxe5', explanation: 'Black recaptures.' },
      { move: 'c5', annotation: '!', explanation: 'Fixing the structure. White has a permanent space advantage.', highlights: ['c5', 'd5'] }
]
  },{
    id: 'ps-19',
    title: 'Benoni Structure',
    fen: 'r1bqkb1r/pp1p1ppp/2n1pn2/2pP4/4P3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 5',
    toMove: 'white',
    concept: 'Modern Benoni pawn structure',
    keyTakeaway: 'White has space; Black has the c-file and e5 square.',
    difficulty: 4,
    moves: [
      { move: 'Nf3', explanation: 'Developing.' },
      { move: 'exd5', explanation: 'Black captures.' },
      { move: 'exd5', explanation: 'Recapturing.' },
      { move: 'd6', explanation: 'Black\'s Benoni setup.' },
      { move: 'Be2', annotation: '!', explanation: 'Solid development, preparing O-O.' }
]
  },// OTHER MAJOR STRUCTURES (21-40)
  {
    id: 'ps-21',
    title: 'Symmetrical Structure',
    fen: 'r1bqkb1r/pp2pppp/2n2n2/3p4/3P4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Breaking symmetry to create imbalances',
    keyTakeaway: 'In symmetrical positions, look for ways to create imbalances.',
    difficulty: 3,
    moves: [
      { move: 'Bf4', annotation: '!', explanation: 'Breaking symmetry with piece activity.' },
      { move: 'Bf5', explanation: 'Black mirrors.' },
      { move: 'e3', explanation: 'Solid.' },
      { move: 'e6', explanation: 'Black solidifies.' },
      { move: 'Bd3', annotation: '!', explanation: 'Offering the trade to gain the bishop pair!' }
]
  },
  {
    id: 'ps-22',
    title: 'Central Tension',
    fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',
    toMove: 'white',
    concept: 'Maintaining vs releasing tension',
    keyTakeaway: 'Keep tension when it favors you; release it to clarify the position.',
    difficulty: 2,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Gaining space and restricting Black.', arrows: [{ from: 'e4', to: 'e5', color: 'green' }] },
      { move: 'Nfd7', explanation: 'The knight retreats.' },
      { move: 'Nf3', explanation: 'Developing.' },
      { move: 'e6', explanation: 'Black supports d5.' },
      { move: 'Bd3', explanation: 'Developing with an eye on h7.' }
]
  },
  {
    id: 'ps-23',
    title: 'The Stonewall',
    fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/3P1P2/2N2N2/PPP1P1PP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'White Stonewall setup',
    keyTakeaway: 'The Stonewall gives a strong e5 square but weakens e4.',
    difficulty: 4,
    moves: [
      { move: 'e3', explanation: 'Building the Stonewall.' },
      { move: 'c5', explanation: 'Black challenges.' },
      { move: 'Bd3', explanation: 'Developing.' },
      { move: 'Nc6', explanation: 'Black develops.' },
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'Bd6', explanation: 'Black develops.' },
      { move: 'Ne5', annotation: '!', explanation: 'The knight lands on the Stonewall outpost!', highlights: ['e5'] }
]
  },{
    id: 'ps-25',
    title: 'Pawn Breaks: e4-e5',
    fen: 'r1bq1rk1/ppp1bppp/2n1pn2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'The e5 break',
    keyTakeaway: 'e5 gains space and can cramp Black\'s position.',
    difficulty: 3,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Gaining space!' },
      { move: 'Ne4', explanation: 'Knight uses the hole.' },
      { move: 'Nxe4', explanation: 'Trading.' },
      { move: 'dxe4', explanation: 'Black recaptures.' },
      { move: 'Nd2', annotation: '!', explanation: 'Attacking the weak e4 pawn.' }
]
  },
  {
    id: 'ps-26',
    title: 'Pawn Breaks: c4-c5',
    fen: 'r1bq1rk1/pp2bppp/2nppn2/8/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'The c5 break',
    keyTakeaway: 'c5 undermines Black\'s center and opens lines.',
    difficulty: 3,
    moves: [
      { move: 'c5', annotation: '!', explanation: 'Undermining d6!' },
      { move: 'd5', explanation: 'Black advances.' },
      { move: 'Na4', annotation: '!', explanation: 'Knight heads to b6!' },
      { move: 'Ne8', explanation: 'Defending.' },
      { move: 'Nb6', annotation: '!', explanation: 'Dominating position!', highlights: ['b6'] }
]
  },{
    id: 'ps-29',
    title: 'Hedgehog d5 Break',
    fen: 'r1bq1rk1/1p2bppp/p1nppn2/8/2PPP3/2N1BN2/PP2BPPP/R2Q1RK1 b - - 0 9',
    toMove: 'black',
    concept: 'Black\'s d5 break in the Hedgehog',
    keyTakeaway: 'd5 releases the tension and frees Black\'s pieces.',
    difficulty: 4,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'The liberating break!' },
      { move: 'cxd5', explanation: 'White captures.' },
      { move: 'exd5', explanation: 'Opening lines.' },
      { move: 'exd5', explanation: 'White takes.' },
      { move: 'Nxd5', annotation: '!', explanation: 'Black has freed the position!' }
]
  },
  {
    id: 'ps-30',
    title: 'Slav Structure',
    fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Slav pawn structure',
    keyTakeaway: 'Black\'s c6 pawn supports d5 but limits the b8-knight.',
    difficulty: 3,
    moves: [
      { move: 'e3', explanation: 'Solid development.' },
      { move: 'Bd6', explanation: 'Black develops.' },
      { move: 'Bd3', explanation: 'Developing.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'e4', annotation: '!', explanation: 'Breaking in the center!' }
]
  },{
    id: 'ps-32',
    title: 'Catalan Structure',
    fen: 'rnbqk2r/ppp1bppp/4pn2/3p4/2PP4/5NP1/PP2PPBP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Catalan bishop',
    keyTakeaway: 'The fianchettoed bishop dominates the long diagonal.',
    difficulty: 4,
    moves: [
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Qc2', annotation: '!', explanation: 'Preparing e4!' },
      { move: 'c6', explanation: 'Black supports d5.' },
      { move: 'Nbd2', annotation: '!', explanation: 'Heading to e5 via f3.', arrows: [{ from: 'd2', to: 'f3', color: 'yellow' }, { from: 'f3', to: 'e5', color: 'yellow' }] }
]
  },
  {
    id: 'ps-33',
    title: 'English Opening Structure',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2N2N2/PP1PPPPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    concept: 'English vs e5 structure',
    keyTakeaway: 'The reversed Sicilian gives Black a tempo.',
    difficulty: 3,
    moves: [
      { move: 'g3', annotation: '!', explanation: 'Fianchettoing the bishop.' },
      { move: 'Bb4', explanation: 'Black pins.' },
      { move: 'Bg2', explanation: 'Developing.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'O-O', annotation: '!', explanation: 'Completing development.' }
]
  },{
    id: 'ps-35',
    title: 'Scandinavian Structure',
    fen: 'rnbqkb1r/ppp1pppp/5n2/3P4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3',
    toMove: 'white',
    concept: 'Scandinavian pawn structure',
    keyTakeaway: 'White has a central pawn majority after d5.',
    difficulty: 2,
    moves: [
      { move: 'd4', annotation: '!', explanation: 'Establishing a strong center.' },
      { move: 'Nxd5', explanation: 'Black recaptures.' },
      { move: 'c4', annotation: '!', explanation: 'Attacking the knight!' },
      { move: 'Nb6', explanation: 'Knight retreats.' },
      { move: 'Nf3', explanation: 'Developing.' }
]
  },
  // PAWN STRUCTURE TRANSFORMATIONS (36-50)
  {
    id: 'ps-36',
    title: 'Structure Transformation',
    fen: 'r1bq1rk1/ppp1bppp/2n2n2/3pp3/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Transforming the pawn structure',
    keyTakeaway: 'Exchanges can completely change the pawn structure.',
    difficulty: 4,
    moves: [
      { move: 'exd5', annotation: '!', explanation: 'Transforming the structure!' },
      { move: 'Nxd5', explanation: 'Black recaptures.' },
      { move: 'Nxd5', explanation: 'Trading.' },
      { move: 'Qxd5', explanation: 'Queen recaptures.' },
      { move: 'c4', annotation: '!', explanation: 'Attacking the queen and gaining space!' }
]
  },{
    id: 'ps-39',
    title: 'Doubled Pawns Transformation',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4',
    toMove: 'white',
    concept: 'Creating doubled pawns',
    keyTakeaway: 'Trade to create doubled pawns when beneficial.',
    difficulty: 3,
    moves: [
      { move: 'd5', explanation: 'Gaining space.' },
      { move: 'Nb8', explanation: 'Knight retreats.' },
      { move: 'Bg5', annotation: '!', explanation: 'Preparing to double Black\'s pawns!' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'Bxf6', annotation: '!', explanation: 'Creating doubled pawns!' }
]
  },
  {
    id: 'ps-40',
    title: 'Backward Pawn Transformation',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Creating a backward pawn',
    keyTakeaway: 'Advance to create a backward pawn for your opponent.',
    difficulty: 3,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Creating a backward c-pawn!' },
      { move: 'Na5', explanation: 'Black seeks counterplay.' },
      { move: 'Bd2', annotation: '!', explanation: 'Preparing to attack the knight.' }
]
  },
  {
    id: 'ps-41',
    title: 'Passed Pawn Creation',
    fen: '8/pp3ppp/2p2k2/3p4/3P4/4K3/PPP2PPP/8 w - - 0 1',
    toMove: 'white',
    concept: 'Creating a passed pawn',
    keyTakeaway: 'Transform pawn weaknesses into passed pawns.',
    difficulty: 3,
    moves: [
      { move: 'c4', annotation: '!', explanation: 'Creating a passed pawn!' },
      { move: 'dxc4', explanation: 'Black takes.' },
      { move: 'd5', annotation: '!!', explanation: 'Now the d-pawn is passed!', highlights: ['d5'] }
]
  },
  {
    id: 'ps-42',
    title: 'Liquidation into Winning Endgame',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Trade into winning pawn structure',
    keyTakeaway: 'Trade when it leads to a favorable pawn structure.',
    difficulty: 4,
    moves: [
      { move: 'exd5', annotation: '!', explanation: 'Trading to simplify!' },
      { move: 'Nxd5', explanation: 'Black recaptures.' },
      { move: 'Nxd5', explanation: 'Trading.' },
      { move: 'exd5', explanation: 'Black recaptures.' },
      { move: 'dxc5', annotation: '!', explanation: 'Now Black has an IQP!' }
]
  },
  {
    id: 'ps-43',
    title: 'Structure for Activity',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Sacrificing structure for activity',
    keyTakeaway: 'Sometimes piece activity is worth a weakened structure.',
    difficulty: 4,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Gaining activity!' },
      { move: 'Nd7', explanation: 'Knight retreats.' },
      { move: 'Bf4', annotation: '!', explanation: 'Active pieces compensate!' }
]
  },{
    id: 'ps-45',
    title: 'Blocking the Minority Attack',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/1PPP4/2N1PN2/P3BPPP/R1BQ1RK1 b - - 0 8',
    toMove: 'black',
    concept: 'Defending against the minority attack',
    keyTakeaway: 'a6 prevents b5 and prepares ...b5 yourself.',
    difficulty: 3,
    moves: [
      { move: 'a6', annotation: '!', explanation: 'Preventing b5!' },
      { move: 'Bd2', explanation: 'White develops.' },
      { move: 'b5', annotation: '!', explanation: 'Counter-minority attack!' }
]
  },
  // ADVANCED STRUCTURE CONCEPTS (46-60){
    id: 'ps-47',
    title: 'Pawn Majority Utilization',
    fen: '4r1k1/pp3ppp/8/3p4/3P4/2P5/PP4PP/4R1K1 w - - 0 20',
    toMove: 'white',
    concept: 'Using a pawn majority',
    keyTakeaway: 'A healthy majority can create a passed pawn.',
    difficulty: 3,
    moves: [
      { move: 'b4', annotation: '!', explanation: 'Advancing the majority!' },
      { move: 'Rc8', explanation: 'Black activates.' },
      { move: 'b5', annotation: '!', explanation: 'The majority marches!' }
]
  },
  {
    id: 'ps-48',
    title: 'Crippled Majority',
    fen: '4r1k1/p4ppp/1p6/3p4/3P4/2P5/PP4PP/4R1K1 w - - 0 20',
    toMove: 'white',
    concept: 'Exploiting a crippled majority',
    keyTakeaway: 'A crippled majority cannot create a passed pawn easily.',
    difficulty: 4,
    moves: [
      { move: 'b4', annotation: '!', explanation: 'White\'s majority is healthy!' },
      { move: 'Rc8', explanation: 'Black defends.' },
      { move: 'b5', annotation: '!', explanation: 'Breaking through!' }
]
  },{
    id: 'ps-52',
    title: 'Pawn Lever',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/2p5/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Using pawn levers',
    keyTakeaway: 'Pawn levers open the position.',
    difficulty: 3,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'The lever opens lines!' },
      { move: 'Na5', explanation: 'Black seeks counterplay.' },
      { move: 'Bd2', annotation: '!', explanation: 'Preparing to attack the knight.' }
]
  },
  {
    id: 'ps-53',
    title: 'Space Advantage',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Maintaining space advantage',
    keyTakeaway: 'Space gives maneuvering room.',
    difficulty: 3,
    moves: [
      { move: 'h3', annotation: '!', explanation: 'Preventing ...Bg4.' },
      { move: 'e5', explanation: 'Black challenges.' },
      { move: 'dxe5', explanation: 'Taking.' },
      { move: 'dxe5', explanation: 'Black recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Knight to the outpost!' }
]
  },
  {
    id: 'ps-54',
    title: 'Pawn Storm',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PPP3/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Kingside pawn storm',
    keyTakeaway: 'Storm where you have more pawns.',
    difficulty: 4,
    moves: [
      { move: 'h3', annotation: '!', explanation: 'Preparing g4!' },
      { move: 'e5', explanation: 'Black counterattacks.' },
      { move: 'dxe5', explanation: 'Taking.' },
      { move: 'dxe5', explanation: 'Black recaptures.' },
      { move: 'g4', annotation: '!', explanation: 'The storm begins!' }
]
  },
  {
    id: 'ps-55',
    title: 'Closed Center',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/2pP4/4P3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Playing with a closed center',
    keyTakeaway: 'Play on the wings when the center is closed.',
    difficulty: 4,
    moves: [
      { move: 'a4', annotation: '!', explanation: 'Queenside expansion!' },
      { move: 'Bd7', explanation: 'Black develops.' },
      { move: 'a5', annotation: '!', explanation: 'Continuing the expansion!' }
]
  },{
    id: 'ps-60',
    title: 'Ultimate Structure Decision',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Choosing the right pawn structure',
    keyTakeaway: 'The best structure depends on the position.',
    difficulty: 5,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Space advantage structure!' },
      { move: 'Ne4', explanation: 'Knight uses the hole.' },
      { move: 'Nxe4', explanation: 'Trading.' },
      { move: 'dxe4', explanation: 'Black recaptures.' },
      { move: 'Nd2', annotation: '!', explanation: 'Attacking the weak pawn!' }
]
  }
]; 