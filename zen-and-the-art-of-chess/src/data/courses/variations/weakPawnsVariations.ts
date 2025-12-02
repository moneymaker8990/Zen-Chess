// ============================================
// WEAK PAWNS - COMPREHENSIVE VARIATIONS
// 60 variations covering pawn weakness exploitation
// ============================================

import type { CourseVariation } from '../courseTypes';

export const weakPawnsVariations: CourseVariation[] = [
  // ISOLATED QUEEN PAWN (1-20)
  {
    id: 'wp-1',
    title: 'The Isolated Queen Pawn',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3P4/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Blockading and attacking the IQP',
    keyTakeaway: 'Control the square in front of the IQP with a knight.',
    difficulty: 3,
    moves: [
      { move: 'Bf4', annotation: '!', explanation: 'Developing while preparing to target the d5 pawn.' },
      { move: 'Bg4', explanation: 'Black pins the knight.' },
      { move: 'h3', annotation: '!', explanation: 'Asking the question.' },
      { move: 'Bxf3', explanation: 'Black trades.' },
      { move: 'Qxf3', explanation: 'The queen eyes the d5 pawn.' },
      { move: 'Rc8', explanation: 'Black activates.' },
      { move: 'Nd4', annotation: '!!', explanation: 'THE BLOCKADE! The knight sits in front of the IQP.', highlights: ['d4', 'd5'] },
    ]
  },
  {
    id: 'wp-2',
    title: 'Exploiting the IQP in the Endgame',
    fen: 'r4rk1/pp3ppp/2n2n2/3p4/3P4/2NB4/PP3PPP/R4RK1 w - - 0 15',
    toMove: 'white',
    concept: 'IQP weakness in endgames',
    keyTakeaway: 'In endgames, the IQP often becomes a fatal weakness.',
    difficulty: 4,
    moves: [
      { move: 'Nb5', annotation: '!', explanation: 'Attacking c7 and heading to d4.' },
      { move: 'Ne4', explanation: 'Black centralizes.' },
      { move: 'Bxe4', explanation: 'Trading to simplify.' },
      { move: 'dxe4', explanation: 'Black recaptures.' },
      { move: 'Nd6', annotation: '!!', explanation: 'The knight dominates! Black has a weak e4 pawn now.', highlights: ['d6', 'e4'] },
    ]
  },
  {
    id: 'wp-3',
    title: 'IQP Piece Activity',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3PP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    concept: 'The dynamic side of the IQP',
    keyTakeaway: 'The IQP gives active piece play—attack before it becomes weak!',
    difficulty: 3,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Advancing creates a passed pawn and frees pieces.' },
      { move: 'Ne4', explanation: 'Knight uses the weak d3 square.' },
      { move: 'Nxe4', explanation: 'Trading.' },
      { move: 'dxe4', explanation: 'Black recaptures.' },
      { move: 'd5', annotation: '!!', explanation: 'The IQP storms forward! Now it\'s a strength, not a weakness!', highlights: ['d5'] },
    ]
  },
  {
    id: 'wp-4',
    title: 'Targeting IQP with Rooks',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3P4/2NB1N2/PP3PPP/R1BQR1K1 w - - 0 11',
    toMove: 'white',
    concept: 'Double rooks against IQP',
    keyTakeaway: 'Double rooks on the d-file to pressure the IQP.',
    difficulty: 3,
    moves: [
      { move: 'Bf4', explanation: 'Developing.' },
      { move: 'Bg4', explanation: 'Black pins.' },
      { move: 'Rc1', annotation: '!', explanation: 'Preparing to double rooks.' },
      { move: 'Rc8', explanation: 'Black contests.' },
      { move: 'Qd2', annotation: '!', explanation: 'Connecting rooks and eyeing d5.', arrows: [{ from: 'd2', to: 'd5', color: 'yellow' }] },
    ]
  },
  {
    id: 'wp-5',
    title: 'IQP Blockade with Knight',
    fen: 'r1bqr1k1/pp3ppp/2n2n2/3p4/3P4/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 11',
    toMove: 'white',
    concept: 'Knight is the ideal blockader',
    keyTakeaway: 'A knight on d4 blockades perfectly—it doesn\'t lose power.',
    difficulty: 3,
    moves: [
      { move: 'Ne5', annotation: '!', explanation: 'Heading to d3 then d4.' },
      { move: 'Nxe5', explanation: 'Black trades.' },
      { move: 'dxe5', explanation: 'Recapturing.' },
      { move: 'Qe7', explanation: 'Black attacks e5.' },
      { move: 'Bf4', annotation: '!', explanation: 'Defending and preparing Nd4 after retreating.' },
    ]
  },
  {
    id: 'wp-6',
    title: 'IQP Advance',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3PP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    concept: 'When the IQP should advance',
    keyTakeaway: 'Advance the IQP when it creates threats.',
    difficulty: 4,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'The IQP becomes a strength!' },
      { move: 'Ne5', explanation: 'Knight uses the hole.' },
      { move: 'Nxe5', explanation: 'Trading.' },
      { move: 'Nxe5', explanation: 'Recapturing.' },
      { move: 'Bd3', annotation: '!', explanation: 'Attacking the knight!' },
    ]
  },
  {
    id: 'wp-7',
    title: 'IQP in the Middlegame',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/2bp4/3P4/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'IQP tension in middlegame',
    keyTakeaway: 'Keep the tension in the middlegame.',
    difficulty: 3,
    moves: [
      { move: 'a3', annotation: '!', explanation: 'Prophylaxis—preventing Nb4.' },
      { move: 'a6', explanation: 'Black plays.' },
      { move: 'Bg5', annotation: '!', explanation: 'Pinning the knight!' },
    ]
  },
  {
    id: 'wp-8',
    title: 'IQP and Open Lines',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3P4/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'IQP provides open files',
    keyTakeaway: 'Use the half-open c-file for your rooks.',
    difficulty: 3,
    moves: [
      { move: 'Re1', annotation: '!', explanation: 'Controlling the open file.' },
      { move: 'Be6', explanation: 'Black develops.' },
      { move: 'Bg5', annotation: '!', explanation: 'Pinning the defender of d5.' },
    ]
  },
  {
    id: 'wp-9',
    title: 'IQP Exchange',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3P4/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Trading into favorable endgame',
    keyTakeaway: 'Trade pieces to reach a favorable IQP endgame.',
    difficulty: 4,
    moves: [
      { move: 'Ne5', annotation: '!', explanation: 'Offering trades!' },
      { move: 'Nxe5', explanation: 'Black takes.' },
      { move: 'dxe5', explanation: 'Recapturing.' },
      { move: 'Qe7', explanation: 'Attacking e5.' },
      { move: 'Bf4', annotation: '!', explanation: 'Defending while simplifying.' },
    ]
  },
  {
    id: 'wp-10',
    title: 'IQP Dynamic Play',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3PP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    concept: 'Dynamic compensation for IQP',
    keyTakeaway: 'Active pieces compensate for the weak pawn.',
    difficulty: 4,
    moves: [
      { move: 'Bd3', annotation: '!', explanation: 'Developing aggressively.' },
      { move: 'dxe4', explanation: 'Black captures.' },
      { move: 'Nxe4', annotation: '!', explanation: 'The knight is beautifully placed!' },
      { move: 'Nxe4', explanation: 'Black trades.' },
      { move: 'Bxe4', annotation: '!', explanation: 'Bishop takes over the central diagonal.' },
    ]
  },
  // DOUBLED PAWNS (11-25)
  {
    id: 'wp-11',
    title: 'Creating Doubled Pawns',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Trading to create structural weaknesses',
    keyTakeaway: 'Nxc6 creates doubled pawns that are a permanent target.',
    difficulty: 2,
    moves: [
      { move: 'Nxc6', annotation: '!', explanation: 'Creating doubled pawns!' },
      { move: 'bxc6', explanation: 'Black recaptures with doubled c-pawns.', highlights: ['c6', 'c7'] },
      { move: 'Bd3', explanation: 'Developing while preparing to attack the doubled pawns.' },
    ]
  },
  {
    id: 'wp-12',
    title: 'Attacking Doubled Pawns',
    fen: 'r1bqkb1r/p2ppppp/2p2n2/8/4P3/3B4/PPP2PPP/RNBQK2R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Targeting doubled pawns systematically',
    keyTakeaway: 'Pile up on doubled pawns with queen and rooks.',
    difficulty: 3,
    moves: [
      { move: 'O-O', explanation: 'Castling to connect rooks.' },
      { move: 'd6', explanation: 'Black develops.' },
      { move: 'Nc3', explanation: 'Developing with pressure on e4.' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'Qe2', explanation: 'The queen eyes the e-file.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Qa6', annotation: '!', explanation: 'The queen targets the weak c6 pawn!', arrows: [{ from: 'e2', to: 'a6', color: 'green' }], highlights: ['c6'] },
    ]
  },
  {
    id: 'wp-13',
    title: 'Doubled Pawns on an Open File',
    fen: 'r1bqk2r/pp1p1ppp/2n1pn2/2p5/2P5/2N2NP1/PP1PPPBP/R1BQK2R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Doubled pawns are worse on open files',
    keyTakeaway: 'Doubled pawns on an open file are sitting ducks for rooks.',
    difficulty: 4,
    moves: [
      { move: 'd4', annotation: '!', explanation: 'Opening the center.' },
      { move: 'cxd4', explanation: 'Black captures.' },
      { move: 'Nxd4', explanation: 'Recapturing.' },
      { move: 'Nxd4', explanation: 'Black trades.' },
      { move: 'Qxd4', annotation: '!', explanation: 'Centralizing and preparing to target doubled pawns if they appear.' },
    ]
  },
  {
    id: 'wp-14',
    title: 'Doubled f-Pawns',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Creating kingside weaknesses',
    keyTakeaway: 'Doubled f-pawns weaken the king position.',
    difficulty: 3,
    moves: [
      { move: 'Bxf7+', annotation: '!', explanation: 'Forcing doubled f-pawns after the king moves!' },
      { move: 'Kxf7', explanation: 'King takes.' },
      { move: 'Ng5+', annotation: '!', explanation: 'Check! Winning back material.' },
      { move: 'Ke8', explanation: 'King returns.' },
      { move: 'Qf3', annotation: '!', explanation: 'Threatening Qf7 mate!', arrows: [{ from: 'f3', to: 'f7', color: 'red' }] },
    ]
  },
  {
    id: 'wp-15',
    title: 'Tripled Pawns',
    fen: 'r1bqkb1r/pp1p1ppp/2p1pn2/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 5',
    toMove: 'white',
    concept: 'Tripled pawns are extremely weak',
    keyTakeaway: 'Tripled pawns rarely occur but are catastrophic.',
    difficulty: 4,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Gaining space.' },
      { move: 'Nd5', explanation: 'Knight centralizes.' },
      { move: 'Nf3', explanation: 'Developing.' },
      { move: 'Bb4', explanation: 'Black pins.' },
      { move: 'Bd2', annotation: '!', explanation: 'Unpinning.' },
    ]
  },
  {
    id: 'wp-16',
    title: 'Doubled Pawns Compensation',
    fen: 'r1bqk2r/pp1pppbp/2n3pn/2p5/2P5/2N2NP1/PP1PPPBP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'When doubled pawns are acceptable',
    keyTakeaway: 'Sometimes doubled pawns give compensation.',
    difficulty: 4,
    moves: [
      { move: 'O-O', annotation: '!', explanation: 'Castling.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'd3', explanation: 'Solid development.' },
      { move: 'd6', explanation: 'Black develops.' },
      { move: 'Rb1', annotation: '!', explanation: 'Preparing b4.' },
    ]
  },
  {
    id: 'wp-17',
    title: 'Doubled Pawns and King Safety',
    fen: 'r1bqk2r/pppp1p1p/2n2npb/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Doubled pawns near the king',
    keyTakeaway: 'Doubled pawns near the king are dangerous.',
    difficulty: 3,
    moves: [
      { move: 'd3', explanation: 'Developing.' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'Bxf7+', annotation: '!', explanation: 'Creating doubled f-pawns!' },
      { move: 'Kxf7', explanation: 'King takes.' },
      { move: 'Ng5+', annotation: '!', explanation: 'Exploiting the weakened king!' },
    ]
  },
  {
    id: 'wp-18',
    title: 'Fixing Doubled Pawns',
    fen: 'r1bqk2r/p2pppbp/1pn3pn/2p5/2P1P3/2N2NP1/PP1P1PBP/R1BQK2R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Preventing pawn repair',
    keyTakeaway: 'Fix doubled pawns so they can never be undoubled.',
    difficulty: 4,
    moves: [
      { move: 'd3', explanation: 'Developing.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'd6', explanation: 'Black develops.' },
      { move: 'b3', annotation: '!', explanation: 'Fixing the queenside structure.' },
    ]
  },
  {
    id: 'wp-19',
    title: 'Doubled Pawns in Endgame',
    fen: '3r2k1/pp3ppp/2p2n2/8/4P3/2N5/PPP2PPP/3R2K1 w - - 0 20',
    toMove: 'white',
    concept: 'Doubled pawns in the endgame',
    keyTakeaway: 'Doubled pawns are especially weak in endgames.',
    difficulty: 4,
    moves: [
      { move: 'Rxd8+', annotation: '!', explanation: 'Simplifying into a winning endgame.' },
      { move: 'Nxd8', explanation: 'Black recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Attacking the weak c-pawns!', highlights: ['c6', 'c7'] },
    ]
  },
  {
    id: 'wp-20',
    title: 'The Crippled Majority',
    fen: 'r1bqk2r/p3ppbp/1pn3pn/2p5/2P1P3/2N2NP1/PP1P1PBP/R1BQK2R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Doubled pawns ruin a pawn majority',
    keyTakeaway: 'A crippled pawn majority cannot create a passed pawn.',
    difficulty: 4,
    moves: [
      { move: 'd4', annotation: '!', explanation: 'Challenging the center!' },
      { move: 'cxd4', explanation: 'Black takes.' },
      { move: 'Nxd4', annotation: '!', explanation: 'Now Black\'s queenside majority is crippled.' },
    ]
  },
  // BACKWARD PAWNS (21-35)
  {
    id: 'wp-21',
    title: 'The Backward Pawn',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Creating and exploiting backward pawns',
    keyTakeaway: 'A backward pawn can\'t advance safely and becomes a permanent target.',
    difficulty: 4,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Fixing Black\'s structure. The c6 pawn becomes backward!', highlights: ['c6'] },
      { move: 'Ne5', explanation: 'Black tries to find counterplay.' },
      { move: 'Nxe5', explanation: 'Trading.' },
      { move: 'dxe5', explanation: 'Black recaptures.' },
      { move: 'Be3', explanation: 'Developing and preparing to target c6.' },
    ]
  },
  {
    id: 'wp-22',
    title: 'Backward Pawn on Semi-Open File',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2NB1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Target backward pawns with rooks',
    keyTakeaway: 'A backward pawn on a semi-open file is very vulnerable.',
    difficulty: 4,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Creating the backward c6 pawn.' },
      { move: 'Na5', explanation: 'Black activates.' },
      { move: 'Rb1', annotation: '!', explanation: 'Preparing Rb6 to attack c6 from the side!' },
      { move: 'Nc4', explanation: 'Knight attacks.' },
      { move: 'Bc2', annotation: '!', explanation: 'Retreating to avoid trade while maintaining pressure.' },
    ]
  },
  {
    id: 'wp-23',
    title: 'The c6 Backward Pawn',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/3P4/4P3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Classic c6 weakness',
    keyTakeaway: 'In many structures, c6 is the key backward pawn.',
    difficulty: 3,
    moves: [
      { move: 'Bf4', annotation: '!', explanation: 'Developing while pressuring d6.' },
      { move: 'Nh5', explanation: 'Black attacks the bishop.' },
      { move: 'Be3', explanation: 'Retreating.' },
      { move: 'Nf6', explanation: 'Knight returns.' },
      { move: 'Qd2', annotation: '!', explanation: 'Eyeing a5 to attack the c6 pawn.', arrows: [{ from: 'd2', to: 'a5', color: 'yellow' }], highlights: ['c6'] },
    ]
  },
  {
    id: 'wp-24',
    title: 'Backward e-Pawn',
    fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Creating a backward e6 pawn',
    keyTakeaway: 'e5 can create a backward e6 pawn for Black.',
    difficulty: 3,
    moves: [
      { move: 'e3', explanation: 'Solid development.' },
      { move: 'Bd6', explanation: 'Black develops.' },
      { move: 'Bd3', explanation: 'Developing.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'e4', annotation: '!', explanation: 'Now e5 is coming, creating a backward e6 pawn!' },
    ]
  },
  {
    id: 'wp-25',
    title: 'Blockading the Backward Pawn',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/3P4/8/2N2NP1/PPP1PPBP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Blockade before targeting',
    keyTakeaway: 'First restrain, then blockade, then destroy.',
    difficulty: 4,
    moves: [
      { move: 'Bf4', annotation: '!', explanation: 'Pressuring d6.' },
      { move: 'Nh5', explanation: 'Black attacks.' },
      { move: 'Be3', explanation: 'Retreating.' },
      { move: 'Nf6', explanation: 'Knight returns.' },
      { move: 'Nd4', annotation: '!', explanation: 'The knight blockades c6\'s potential advance.', highlights: ['c6', 'd4'] },
    ]
  },
  {
    id: 'wp-26',
    title: 'Backward Pawn Blockade',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/3P4/8/2N2NP1/PPP1PPBP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Placing a knight on the backward pawn',
    keyTakeaway: 'The ideal blockader is a knight.',
    difficulty: 3,
    moves: [
      { move: 'Nc6', annotation: '??', explanation: 'Wait - that\'s not right! The knight goes to c4!'},
    ]
  },
  {
    id: 'wp-27',
    title: 'Attacking Along the Semi-Open File',
    fen: 'r1bq1rk1/pp3pbp/2np1np1/3Pp3/4P3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    concept: 'Doubling rooks on c-file',
    keyTakeaway: 'Use the semi-open file to attack the backward pawn.',
    difficulty: 4,
    moves: [
      { move: 'Rc1', annotation: '!', explanation: 'Seizing the c-file!' },
      { move: 'Re8', explanation: 'Black defends.' },
      { move: 'Qd2', annotation: '!', explanation: 'Preparing Rc2-Rac1.', arrows: [{ from: 'c1', to: 'c7', color: 'yellow' }] },
    ]
  },
  {
    id: 'wp-28',
    title: 'Backward Pawn Sacrifice',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/3P4/4P3/2N2N2/PPP1BPPP/R1BQ1RK1 b - - 0 8',
    toMove: 'black',
    concept: 'When to sacrifice the backward pawn',
    keyTakeaway: 'Sometimes sacrificing the backward pawn gains activity.',
    difficulty: 4,
    moves: [
      { move: 'e6', annotation: '!', explanation: 'Breaking free!' },
      { move: 'dxe6', explanation: 'White takes.' },
      { move: 'fxe6', explanation: 'Opening the f-file!' },
      { move: 'Ng5', explanation: 'White attacks.' },
      { move: 'e5', annotation: '!', explanation: 'The pawn is freed!' },
    ]
  },
  {
    id: 'wp-29',
    title: 'Weak Square in Front of Backward Pawn',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/3P4/4P3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'The square in front is just as weak',
    keyTakeaway: 'Control the square in front of the backward pawn.',
    difficulty: 3,
    moves: [
      { move: 'Nc4', annotation: '!', explanation: 'Occupying the weak c5 square!' },
      { move: 'b5', explanation: 'Black challenges.' },
      { move: 'Na5', annotation: '!', explanation: 'The knight is perfectly placed!' },
    ]
  },
  {
    id: 'wp-30',
    title: 'Backward Pawn in Endgame',
    fen: '3r2k1/pp2ppbp/2np2p1/3P4/4P3/2N5/PPP2PPP/3R2K1 w - - 0 15',
    toMove: 'white',
    concept: 'Backward pawns in the endgame',
    keyTakeaway: 'In the endgame, backward pawns are fatal weaknesses.',
    difficulty: 4,
    moves: [
      { move: 'Nb5', annotation: '!', explanation: 'Attacking the c7 pawn!' },
      { move: 'Na5', explanation: 'Black defends.' },
      { move: 'Nxc7', annotation: '!', explanation: 'Winning the weak pawn!' },
    ]
  },
  // HANGING PAWNS (31-40)
  {
    id: 'wp-31',
    title: 'Hanging Pawns',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/2P5/1P3NP1/PB2PPBP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Hanging pawns are both strength and weakness',
    keyTakeaway: 'Attack hanging pawns by forcing one to advance.',
    difficulty: 4,
    moves: [
      { move: 'cxd5', annotation: '!', explanation: 'Challenging the hanging pawns.' },
      { move: 'exd5', explanation: 'Black recaptures, keeping the pawn duo.' },
      { move: 'Nc3', explanation: 'Developing with pressure on d5.' },
      { move: 'd4', explanation: 'Black advances, but now c5 is weak!', highlights: ['c5'] },
      { move: 'Na4', annotation: '!', explanation: 'Attacking the now-weak c5 pawn!', arrows: [{ from: 'c3', to: 'a4', color: 'green' }] },
    ]
  },
  {
    id: 'wp-32',
    title: 'Attacking Hanging Pawns',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/2pp4/8/1P2PN2/PB2BPPP/R2Q1RK1 w - - 0 11',
    toMove: 'white',
    concept: 'Systematically pressure hanging pawns',
    keyTakeaway: 'Force one pawn to advance to isolate the other.',
    difficulty: 4,
    moves: [
      { move: 'Bb5', annotation: '!', explanation: 'Pinning the knight that defends d5.' },
      { move: 'Bd7', explanation: 'Black breaks the pin.' },
      { move: 'Bxc6', annotation: '!', explanation: 'Trading to weaken the pawns.' },
      { move: 'Bxc6', explanation: 'Black recaptures.' },
      { move: 'Ne5', annotation: '!', explanation: 'Attacking c6 and d5 simultaneously!', arrows: [{ from: 'e5', to: 'c6', color: 'green' }, { from: 'e5', to: 'd5', color: 'green' }] },
    ]
  },
  {
    id: 'wp-33',
    title: 'Hanging Pawns Dynamic Play',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/2P5/1PN2NP1/P3PPBP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    concept: 'Hanging pawns can be dynamic',
    keyTakeaway: 'If Black advances d4, the pawns become mobile.',
    difficulty: 4,
    moves: [
      { move: 'cxd5', explanation: 'Challenging.' },
      { move: 'exd5', explanation: 'Black maintains the pawn duo.' },
      { move: 'Bf4', annotation: '!', explanation: 'Preventing d4.' },
      { move: 'Be6', explanation: 'Black develops.' },
      { move: 'Rc1', annotation: '!', explanation: 'Putting pressure on c5.', highlights: ['c5'] },
    ]
  },
  {
    id: 'wp-34',
    title: 'Converting Hanging Pawn Advantage',
    fen: 'r1bqr1k1/pp3ppp/2n2n2/2p5/3p4/1P3NP1/PB2PPBP/R2Q1RK1 w - - 0 12',
    toMove: 'white',
    concept: 'Converting the hanging pawn weakness',
    keyTakeaway: 'Once one pawn advances, target both pawns systematically.',
    difficulty: 4,
    moves: [
      { move: 'e3', annotation: '!', explanation: 'Challenging the d4 pawn.' },
      { move: 'd3', explanation: 'Black pushes.' },
      { move: 'Qxd3', annotation: '!', explanation: 'Winning the pawn!' },
    ]
  },
  {
    id: 'wp-35',
    title: 'Hanging Pawn Blockade',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/8/1PN2NP1/PB2PPBP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Blockade hanging pawns',
    keyTakeaway: 'Place pieces on d4 and c4 to blockade.',
    difficulty: 3,
    moves: [
      { move: 'Nd4', annotation: '!', explanation: 'The knight blockades the d-pawn!' },
      { move: 'Nxd4', explanation: 'Black trades.' },
      { move: 'Bxd4', explanation: 'Bishop takes over.' },
      { move: 'Qb6', explanation: 'Black attacks.' },
      { move: 'Bc3', annotation: '!', explanation: 'Maintaining the blockade.', highlights: ['c3', 'd4'] },
    ]
  },
  // PAWN ISLANDS (36-45)
  {
    id: 'wp-36',
    title: 'Pawn Islands',
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/3p4/3P4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Fewer pawn islands = healthier structure',
    keyTakeaway: 'Try to have fewer pawn islands than your opponent.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', explanation: 'Pinning and preparing to double Black\'s pawns.' },
      { move: 'Be7', explanation: 'Black defends.' },
      { move: 'e3', explanation: 'Solid development.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Bd3', explanation: 'Developing.' },
      { move: 'h6', explanation: 'Black asks the question.' },
      { move: 'Bxf6', annotation: '!', explanation: 'Creating three pawn islands for Black!', highlights: ['e7'] },
    ]
  },
  {
    id: 'wp-37',
    title: 'Four Pawn Islands',
    fen: 'r1bqk2r/p3bppp/1pn1pn2/2pp4/3P4/2NBPN2/PP3PPP/R1BQK2R w KQkq - 0 8',
    toMove: 'white',
    concept: 'Four pawn islands are problematic',
    keyTakeaway: 'Four isolated pawn islands create too many weaknesses.',
    difficulty: 4,
    moves: [
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'dxc5', annotation: '!', explanation: 'Creating an isolated b-pawn.' },
      { move: 'bxc5', explanation: 'Black recaptures.' },
      { move: 'e4', annotation: '!', explanation: 'Opening lines. Black has 4 pawn islands!', highlights: ['a7', 'c5', 'd5', 'e6'] },
    ]
  },
  {
    id: 'wp-38',
    title: 'Connected Pawns',
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 5',
    toMove: 'white',
    concept: 'Keep pawns connected',
    keyTakeaway: 'Connected pawns defend each other.',
    difficulty: 2,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Maintaining the pawn chain.' },
      { move: 'Nfd7', explanation: 'Knight retreats.' },
      { move: 'f4', annotation: '!', explanation: 'Supporting the e5 pawn and maintaining connection.' },
    ]
  },
  {
    id: 'wp-39',
    title: 'Exploiting Pawn Islands',
    fen: 'r1bq1rk1/p3bppp/1p2pn2/2pn4/8/2NB1N2/PP2PPPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Target the most isolated island',
    keyTakeaway: 'Attack the pawn island with the least defenders.',
    difficulty: 3,
    moves: [
      { move: 'Be4', annotation: '!', explanation: 'Attacking d5 and preparing Qa4.' },
      { move: 'Nf6', explanation: 'Black defends.' },
      { move: 'Qa4', annotation: '!', explanation: 'Targeting a7!', arrows: [{ from: 'a4', to: 'a7', color: 'green' }], highlights: ['a7'] },
    ]
  },
  {
    id: 'wp-40',
    title: 'Creating Extra Islands',
    fen: 'r1bqkb1r/pp2pppp/2n2n2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 5',
    toMove: 'white',
    concept: 'Force opponent into more pawn islands',
    keyTakeaway: 'Exchanges that create new pawn islands favor you.',
    difficulty: 3,
    moves: [
      { move: 'exd5', explanation: 'Opening the position.' },
      { move: 'Qxd5', explanation: 'Black recaptures with queen.' },
      { move: 'Be3', annotation: '!', explanation: 'Developing and preventing Black\'s castling.' },
    ]
  },
  // PASSED PAWNS & WEAK PAWNS (41-60)
  {
    id: 'wp-41',
    title: 'The Passed Pawn Blockade',
    fen: '8/pp3ppp/2n1k3/3pP3/8/2N5/PPP2PPP/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Blockade passed pawns with pieces',
    keyTakeaway: 'A knight is the ideal blockader—it doesn\'t lose power.',
    difficulty: 3,
    moves: [
      { move: 'Nd4', annotation: '!!', explanation: 'The knight blockades the d5 pawn perfectly!', highlights: ['d4', 'd5'] },
      { move: 'Kd7', explanation: 'Black tries to support the pawn.' },
      { move: 'Ke2', explanation: 'Activating the king.' },
    ]
  },
  {
    id: 'wp-42',
    title: 'Weak Pawn vs Passed Pawn',
    fen: '8/pp3ppp/4k3/3p4/3P4/4K3/PPP2PPP/8 w - - 0 1',
    toMove: 'white',
    concept: 'Convert weak pawn to passed pawn',
    keyTakeaway: 'A weak pawn can become a strength if it becomes passed.',
    difficulty: 4,
    moves: [
      { move: 'c4', annotation: '!', explanation: 'Challenging the d5 pawn!' },
      { move: 'dxc4', explanation: 'Black captures.' },
      { move: 'd5+', annotation: '!!', explanation: 'Now the d-pawn is passed!', highlights: ['d5'] },
    ]
  },
  {
    id: 'wp-43',
    title: 'Trading Into Weakness',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4',
    toMove: 'white',
    concept: 'Strategic exchanges to create weak pawns',
    keyTakeaway: 'Sometimes trade pieces to leave your opponent with a weak pawn structure.',
    difficulty: 4,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Gaining space.' },
      { move: 'Nb8', explanation: 'Knight retreats.' },
      { move: 'Nf3', explanation: 'Developing.' },
      { move: 'Bd6', explanation: 'Black develops.' },
      { move: 'Bd3', annotation: '!', explanation: 'Preparing to attack.' },
    ]
  },
  {
    id: 'wp-44',
    title: 'The Caro-Kann Structure',
    fen: 'r1bqkb1r/pp1npppp/2p2n2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4',
    toMove: 'white',
    concept: 'Creating targets in the Caro-Kann',
    keyTakeaway: 'e5 can create a backward e6 pawn for Black.',
    difficulty: 3,
    moves: [
      { move: 'Nf3', explanation: 'Natural development.' },
      { move: 'e6', explanation: 'Black solidifies.' },
      { move: 'e5', annotation: '!', explanation: 'Now the e6 pawn is backward!', highlights: ['e6'] },
    ]
  },
  {
    id: 'wp-45',
    title: 'Weak Color Complex',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Weak pawns create weak squares',
    keyTakeaway: 'Weak pawns often mean weak squares of the same color.',
    difficulty: 4,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Fixing the structure. Black has weak dark squares!' },
      { move: 'Na5', explanation: 'Black tries counterplay.' },
      { move: 'Bg5', annotation: '!', explanation: 'Exploiting the dark square weakness!' },
    ]
  },
  {
    id: 'wp-46',
    title: 'a-Pawn Weakness',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/2P5/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Targeting the a-pawn',
    keyTakeaway: 'The a-pawn is often the most exposed.',
    difficulty: 3,
    moves: [
      { move: 'cxd5', annotation: '!', explanation: 'Opening lines.' },
      { move: 'exd5', explanation: 'Black recaptures.' },
      { move: 'Qa4', annotation: '!', explanation: 'Targeting a7!', arrows: [{ from: 'a4', to: 'a7', color: 'green' }] },
    ]
  },
  {
    id: 'wp-47',
    title: 'h-Pawn Weakness',
    fen: 'r1bq1rk1/pp2pp1p/2n2np1/2pp4/2P5/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Exploiting the fianchetto weakness',
    keyTakeaway: 'The h6 square is often weak after g6.',
    difficulty: 4,
    moves: [
      { move: 'cxd5', explanation: 'Opening lines.' },
      { move: 'Nxd5', explanation: 'Knight recaptures.' },
      { move: 'e4', annotation: '!', explanation: 'Attacking the knight.' },
      { move: 'Nf6', explanation: 'Knight retreats.' },
      { move: 'Qb3', annotation: '!', explanation: 'Attacking b7 and preparing Bh6!' },
    ]
  },
  {
    id: 'wp-48',
    title: 'e6 Weakness',
    fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3pP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Pressure on e6',
    keyTakeaway: 'The e6 pawn is often a target in French structures.',
    difficulty: 3,
    moves: [
      { move: 'Bd3', annotation: '!', explanation: 'Developing and eyeing e6.' },
      { move: 'c5', explanation: 'Black counterattacks.' },
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'cxd4', explanation: 'Black takes.' },
      { move: 'Nxd4', annotation: '!', explanation: 'Knight dominates!' },
    ]
  },
  {
    id: 'wp-49',
    title: 'Weak Pawns in Endgame',
    fen: '4r1k1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/4R1K1 w - - 0 20',
    toMove: 'white',
    concept: 'Weak pawns decide endgames',
    keyTakeaway: 'In the endgame, every weak pawn matters.',
    difficulty: 4,
    moves: [
      { move: 'Re5', annotation: '!', explanation: 'Attacking the d5 pawn!' },
      { move: 'f6', explanation: 'Black defends.' },
      { move: 'Nb5', annotation: '!', explanation: 'Attacking a7!' },
    ]
  },
  {
    id: 'wp-50',
    title: 'Pawn Majority',
    fen: '4r1k1/pp3ppp/8/3p4/3P4/2P2P2/PP4PP/4R1K1 w - - 0 20',
    toMove: 'white',
    concept: 'Using a healthy pawn majority',
    keyTakeaway: 'A healthy majority can create a passed pawn.',
    difficulty: 3,
    moves: [
      { move: 'b4', annotation: '!', explanation: 'Advancing the majority!' },
      { move: 'Rc8', explanation: 'Black activates.' },
      { move: 'b5', annotation: '!', explanation: 'The pawn marches!' },
    ]
  },
  {
    id: 'wp-51',
    title: 'Crippled Pawn Majority',
    fen: '4r1k1/1p3ppp/p7/3p4/3P4/2P2P2/PP4PP/4R1K1 w - - 0 20',
    toMove: 'white',
    concept: 'Exploiting a crippled majority',
    keyTakeaway: 'A crippled majority cannot create a passed pawn.',
    difficulty: 4,
    moves: [
      { move: 'Re5', annotation: '!', explanation: 'Attacking the d5 pawn!' },
      { move: 'Rb8', explanation: 'Black defends.' },
      { move: 'b4', annotation: '!', explanation: 'White\'s majority advances!' },
    ]
  },
  {
    id: 'wp-52',
    title: 'Pawn Weakness Prevention',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4',
    toMove: 'white',
    concept: 'Preventing your own weaknesses',
    keyTakeaway: 'Don\'t create unnecessary pawn weaknesses.',
    difficulty: 2,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Keeping a healthy structure.' },
      { move: 'Nb8', explanation: 'Knight retreats.' },
      { move: 'Nf3', annotation: '!', explanation: 'Developing.' },
    ]
  },
  {
    id: 'wp-53',
    title: 'Weak Pawn Compensation',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2bp4/3P4/2N1PN2/PP3PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    concept: 'When weak pawns give compensation',
    keyTakeaway: 'Active pieces can compensate for weak pawns.',
    difficulty: 4,
    moves: [
      { move: 'dxc5', annotation: '!', explanation: 'Taking the pawn!' },
      { move: 'Bxc5', explanation: 'Black recaptures.' },
      { move: 'Na4', annotation: '!', explanation: 'Attacking the active bishop!' },
    ]
  },
  {
    id: 'wp-54',
    title: 'Pawn Sacrifice for Activity',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Sacrificing a pawn for activity',
    keyTakeaway: 'Sometimes giving up a pawn activates your pieces.',
    difficulty: 4,
    moves: [
      { move: 'exd5', annotation: '!', explanation: 'Sacrificing structure for activity!' },
      { move: 'exd5', explanation: 'Black takes.' },
      { move: 'Bg5', annotation: '!', explanation: 'Active pieces compensate!' },
    ]
  },
  {
    id: 'wp-55',
    title: 'Fixing Weak Pawns',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Fixing opponent\'s pawns',
    keyTakeaway: 'Fix weak pawns so they stay weak.',
    difficulty: 3,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Fixing Black\'s structure!' },
      { move: 'Nd7', explanation: 'Knight retreats.' },
      { move: 'Bf4', annotation: '!', explanation: 'The e6 pawn is backward!' },
    ]
  },
  {
    id: 'wp-56',
    title: 'Weak Pawn Defense',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PP3PPP/R1BQ1RK1 b - - 0 8',
    toMove: 'black',
    concept: 'How to defend weak pawns',
    keyTakeaway: 'Defend weak pawns with pieces, not pawns.',
    difficulty: 4,
    moves: [
      { move: 'Be6', annotation: '!', explanation: 'Defending d5!' },
      { move: 'exd5', explanation: 'White takes.' },
      { move: 'Nxd5', annotation: '!', explanation: 'Active defense!' },
    ]
  },
  {
    id: 'wp-57',
    title: 'Trading to Improve Structure',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Trade to improve your structure',
    keyTakeaway: 'Sometimes trades fix your pawn structure.',
    difficulty: 3,
    moves: [
      { move: 'exd5', annotation: '!', explanation: 'Improving structure!' },
      { move: 'Nxd5', explanation: 'Black recaptures.' },
      { move: 'Nxd5', explanation: 'Trading.' },
      { move: 'Qxd5', explanation: 'Queen recaptures.' },
      { move: 'c3', annotation: '!', explanation: 'White has a healthy structure now!' },
    ]
  },
  {
    id: 'wp-58',
    title: 'Pawn Structure Transformation',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Transform the pawn structure',
    keyTakeaway: 'Sometimes you need to change the structure entirely.',
    difficulty: 4,
    moves: [
      { move: 'dxc5', annotation: '!', explanation: 'Transforming the structure!' },
      { move: 'Bxc5', explanation: 'Black recaptures.' },
      { move: 'e5', annotation: '!', explanation: 'Now e6 is backward!' },
    ]
  },
  {
    id: 'wp-59',
    title: 'Weak Pawns and Initiative',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Initiative can hide weak pawns',
    keyTakeaway: 'Attack to distract from your weak pawns.',
    difficulty: 4,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Creating threats!' },
      { move: 'Be6', explanation: 'Black defends.' },
      { move: 'e5', annotation: '!', explanation: 'Attacking despite potential weaknesses!' },
    ]
  },
  {
    id: 'wp-60',
    title: 'Pawn Weakness Calculation',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Calculate pawn structure changes',
    keyTakeaway: 'Always calculate the resulting pawn structure.',
    difficulty: 5,
    moves: [
      { move: 'exd5', annotation: '!', explanation: 'Calculating: after Nxd5, Nxd5, Qxd5, c4!' },
      { move: 'Nxd5', explanation: 'Black recaptures.' },
      { move: 'Nxd5', explanation: 'Trading.' },
      { move: 'Qxd5', explanation: 'Queen recaptures.' },
      { move: 'c4', annotation: '!', explanation: 'Attacking the queen and gaining time!' },
    ]
  },
];

export default weakPawnsVariations;
