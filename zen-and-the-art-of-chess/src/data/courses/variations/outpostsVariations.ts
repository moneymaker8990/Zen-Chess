// ============================================
// OUTPOSTS - COMPREHENSIVE VARIATIONS
// 60 variations covering all outpost concepts
// ============================================

import type { CourseVariation } from '../courseTypes';

export const outpostsVariations: CourseVariation[] = [
  // BASIC OUTPOST CONCEPTS (1-15)// INTERMEDIATE OUTPOST CONCEPTS (16-35){
    id: 'out-21',
    title: 'Kasparov\'s Outpost Mastery',
    fen: 'r1b2rk1/pp1nqppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 9',
    toMove: 'white',
    concept: 'Strategic outpost preparation',
    keyTakeaway: 'Prepare outposts by controlling the surrounding squares first.',
    difficulty: 5,
    moves: [
      { move: 'e4', annotation: '!', explanation: 'Opening the position to activate pieces.' },
      { move: 'dxe4', explanation: 'Black captures.' },
      { move: 'Nxe4', annotation: '!', explanation: 'Knight centralizes with power.' },
      { move: 'Nxe4', explanation: 'Black trades.' },
      { move: 'Bxe4', explanation: 'Bishop takes over the diagonal.' }
]
  },
  {
    id: 'out-22',
    title: 'Outpost Exchange Sacrifice',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 11',
    toMove: 'white',
    concept: 'Sacrifice the exchange to maintain outpost',
    keyTakeaway: 'Sometimes the exchange is worth keeping a dominant knight.',
    difficulty: 5,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'Knight to the outpost!' },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', explanation: 'Pawn recaptures.' },
      { move: 'Bxd4', explanation: 'Black wins the knight!' },
      { move: 'Bxd4', annotation: '!', explanation: 'But White has the bishop pair and the passed d-pawn!' }
]
  }{
    id: 'out-25',
    title: 'Outpost in the King\'s Indian',
    fen: 'r1bq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Classical d5 outpost against KID',
    keyTakeaway: 'In the King\'s Indian, d5 is White\'s key outpost.',
    difficulty: 3,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Closing the center and seizing space.' },
      { move: 'Ne5', explanation: 'Black seeks counterplay.' },
      { move: 'Nxe5', explanation: 'Trading.' },
      { move: 'dxe5', explanation: 'Black recaptures.' },
      { move: 'c5', annotation: '!', explanation: 'Fixing the structure. White has a permanent space advantage.', highlights: ['c5', 'd5'] }
]
  }// ADVANCED & MASTER-LEVEL OUTPOST CONCEPTS (31-60){
    id: 'out-33',
    title: 'Outpost with Bishop Pair',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQBPPP/R3K2R w KQ - 0 9',
    toMove: 'white',
    concept: 'Bishops support knight outpost',
    keyTakeaway: 'The bishop pair can support and enhance outpost knights.',
    difficulty: 4,
    moves: [
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'e5', explanation: 'Black challenges.' },
      { move: 'Nf5', annotation: '!', explanation: 'Knight to outpost!' },
      { move: 'Bxf5', explanation: 'Black trades.' },
      { move: 'exf5', annotation: '!', explanation: 'The bishops dominate the open position!' }
]
  }{
    id: 'out-42',
    title: 'Outpost as Pivot Point',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Use outpost to coordinate pieces',
    keyTakeaway: 'Outpost pieces act as central coordinators.',
    difficulty: 4,
    moves: [
      { move: 'O-O-O', explanation: 'Castling queenside.' },
      { move: 'a6', explanation: 'Black plays.' },
      { move: 'Nd5', annotation: '!', explanation: 'Central coordination point.' },
      { move: 'e6', explanation: 'Black challenges.' },
      { move: 'Nxf6+', annotation: '!', explanation: 'The outpost has done its job!' }
]
  }{
    id: 'out-50',
    title: 'Outpost in Opposite Castling',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 11',
    toMove: 'white',
    concept: 'Outpost for opposite-side attack',
    keyTakeaway: 'Outposts anchor kingside attacks.',
    difficulty: 4,
    moves: [
      { move: 'Nf5', annotation: '!', explanation: 'The knight joins the attack!' },
      { move: 'Bxf5', explanation: 'Black trades.' },
      { move: 'exf5', explanation: 'Opening lines toward the king.' },
      { move: 'Kh8', explanation: 'Black hides.' },
      { move: 'g4', annotation: '!', explanation: 'Storm continues!' }
]
  }{
    id: 'out-54',
    title: 'Outpost vs Activity',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Balance outpost vs piece activity',
    keyTakeaway: 'Sometimes activity trumps outposts.',
    difficulty: 5,
    moves: [
      { move: 'O-O-O', annotation: '!', explanation: 'Activity over outpost!' },
      { move: 'e5', explanation: 'Black challenges.' },
      { move: 'Nf5', annotation: '!', explanation: 'Now the outpost AND activity!' }
]
  }{
    id: 'out-57',
    title: 'Outpost Calculation',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Calculate outpost consequences',
    keyTakeaway: 'Calculate the full impact of an outpost.',
    difficulty: 5,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'Calculating: if Nxd5 exd5, then Nb4...' },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', explanation: 'Pawn advances.' },
      { move: 'Nb4', explanation: 'Black attacks c2.' },
      { move: 'Nc6', annotation: '!!', explanation: 'But this is even stronger!' }
]
  }];

export default outpostsVariations;
