// ============================================
// MORE POSITIONAL CONCEPTS - COMPREHENSIVE VARIATIONS
// Covering remaining positional themes
// ============================================

import type { CourseVariation } from '../courseTypes';

// OPEN FILES (1-30)
export const openFileVariations: CourseVariation[] = [{
    id: 'open-6',
    title: 'Absolute 7th Rank',
    fen: '3r2k1/1R3ppp/8/8/8/8/5PPP/6K1 w - - 0 1',
    toMove: 'white',
    concept: 'Dominating from the 7th',
    keyTakeaway: 'A rook on the 7th ties down the enemy.',
    difficulty: 2,
    moves: [
      { move: 'Rb8', annotation: '!', explanation: 'Attacking the rook!' },
      { move: 'Rxb8', explanation: 'Black must trade.' }
]
  },
  {
    id: 'open-7',
    title: 'Contesting an Open File',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/4P3/2N2N2/PPP1BPPP/R1BQR1K1 b - - 0 7',
    toMove: 'black',
    concept: 'Fighting for file control',
    keyTakeaway: 'Don\'t let your opponent control open files.',
    difficulty: 2,
    moves: [
      { move: 'Re8', annotation: '!', explanation: 'Contesting the e-file!' },
      { move: 'Bf1', explanation: 'White defends.' },
      { move: 'd5', annotation: '!', explanation: 'Opening the center!' }
]
  }
];

// BISHOP PAIR (31-50)
export const bishopPairVariations: CourseVariation[] = [{
    id: 'bp-4',
    title: 'Sacrificing for Bishop Pair',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Trading knight for bishop pair',
    keyTakeaway: 'Sometimes trade a knight to get the bishop pair.',
    difficulty: 3,
    moves: [
      { move: 'Nc3', explanation: 'Developing.' },
      { move: 'Bc5', explanation: 'Black develops.' },
      { move: 'd3', explanation: 'Preparing.' },
      { move: 'd6', explanation: 'Black solidifies.' },
      { move: 'Be3', annotation: '!', explanation: 'Offering to trade!' }
]
  },
  {
    id: 'bp-5',
    title: 'Bishop Pair Endgame',
    fen: '4r1k1/ppp2ppp/8/8/2B5/2B5/PPP2PPP/4R1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Bishop pair in endgames',
    keyTakeaway: 'The bishop pair is even stronger in endgames.',
    difficulty: 3,
    moves: [
      { move: 'Be6', annotation: '!', explanation: 'Targeting f7!' },
      { move: 'Re7', explanation: 'Black defends.' },
      { move: 'Bd4', annotation: '!', explanation: 'Both bishops are active!' }
]
  },
  {
    id: 'bp-6',
    title: 'Trading the Right Bishop',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Keep the more valuable bishop',
    keyTakeaway: 'Trade the bishop that is less effective.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Pinning and preparing to trade!' },
      { move: 'h6', explanation: 'Black asks.' },
      { move: 'Bxf6', annotation: '!', explanation: 'Trading the less active bishop for a defender!' }
]
  },
  {
    id: 'bp-7',
    title: 'Bishop Pair Attack',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Using bishop pair for attack',
    keyTakeaway: 'Bishop pairs can create powerful kingside attacks.',
    difficulty: 4,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Pinning and creating threats!' },
      { move: 'h6', explanation: 'Black attacks.' },
      { move: 'Bxf6', explanation: 'Trading.' },
      { move: 'Qxf6', explanation: 'Queen recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Fork!' }
]
  },
  {
    id: 'bp-8',
    title: 'Bishop Pair Defense',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/4P3/2NP1N2/PPP1BPPP/R1BQ1RK1 b - - 0 7',
    toMove: 'black',
    concept: 'Playing against bishop pair',
    keyTakeaway: 'Keep the position closed against the bishop pair.',
    difficulty: 3,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Closing the position!' },
      { move: 'exd5', explanation: 'White takes.' },
      { move: 'Nxd5', annotation: '!', explanation: 'Blockading with the knight!' }
]
  },
  {
    id: 'bp-9',
    title: 'Two Bishops Checkmate',
    fen: '8/8/8/4k3/8/8/2BB4/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Mating with two bishops',
    keyTakeaway: 'Two bishops can force checkmate in the corner.',
    difficulty: 3,
    moves: [
      { move: 'Bc3', annotation: '!', explanation: 'Cutting off the king!' },
      { move: 'Kd5', explanation: 'King moves.' },
      { move: 'Kd2', annotation: '!', explanation: 'Approaching!' }
]
  },
  {
    id: 'bp-10',
    title: 'Bishop Pair Squeeze',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P1b1/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Restricting enemy pieces with bishops',
    keyTakeaway: 'Bishops can squeeze opponents with long-range control.',
    difficulty: 4,
    moves: [
      { move: 'h3', annotation: '!', explanation: 'Asking the bishop!' },
      { move: 'Bh5', explanation: 'Bishop retreats.' },
      { move: 'g4', annotation: '!', explanation: 'Gaining space and trapping!' }
]
  }
];

// PIECE COORDINATION (51-70)
export const coordinationVariations: CourseVariation[] = [{
    id: 'coord-6',
    title: 'Attacking with Coordination',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/4P3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Coordinated attack',
    keyTakeaway: 'Coordinate pieces before attacking.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Developing with threats!' },
      { move: 'h6', explanation: 'Black asks.' },
      { move: 'Bxf6', explanation: 'Trading.' },
      { move: 'Qxf6', explanation: 'Queen recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Knight joins!' }
]
  },{
    id: 'coord-8',
    title: 'Piece Repositioning',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/4P3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Moving pieces to better squares',
    keyTakeaway: 'Reposition poorly placed pieces to improve coordination.',
    difficulty: 2,
    moves: [
      { move: 'Nd2', annotation: '!', explanation: 'Repositioning for c4!' },
      { move: 'Be6', explanation: 'Black develops.' },
      { move: 'Nc4', annotation: '!', explanation: 'Knight reaches an excellent square!', arrows: [{ from: 'd2', to: 'c4', color: 'green' }] }
]
  }
];

// SPACE ADVANTAGE (71-90)
export const spaceVariations: CourseVariation[] = [
  {
    id: 'space-1',
    title: 'Gaining Space',
    fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1',
    toMove: 'white',
    concept: 'Central space advantage',
    keyTakeaway: 'Control the center to restrict the opponent.',
    difficulty: 1,
    moves: [
      { move: 'd4', annotation: '!', explanation: 'Claiming central space!', highlights: ['d4', 'e4'] }
]
  },{
    id: 'space-5',
    title: 'Cramped Position',
    fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3pP3/3P4/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 0 6',
    toMove: 'black',
    concept: 'Playing from a cramped position',
    keyTakeaway: 'Seek exchanges when cramped.',
    difficulty: 3,
    moves: [
      { move: 'c5', annotation: '!', explanation: 'Breaking to gain space!' },
      { move: 'dxc5', explanation: 'White takes.' },
      { move: 'Nxc5', annotation: '!', explanation: 'Active piece!' }
]
  },
  {
    id: 'space-6',
    title: 'Space and Piece Placement',
    fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3pP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Using space for piece maneuvers',
    keyTakeaway: 'More space allows better piece placement.',
    difficulty: 3,
    moves: [
      { move: 'Bd3', annotation: '!', explanation: 'The bishop aims at h7!' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Re1', annotation: '!', explanation: 'Connecting rooks!' }
]
  },
  {
    id: 'space-7',
    title: 'Space and Attack',
    fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3pP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Using space to attack',
    keyTakeaway: 'Space advantage enables kingside attacks.',
    difficulty: 4,
    moves: [
      { move: 'Ng5', annotation: '!', explanation: 'Starting the attack!' },
      { move: 'h6', explanation: 'Black kicks.' },
      { move: 'Qh5', annotation: '!', explanation: 'Queen joins!', arrows: [{ from: 'd1', to: 'h5', color: 'green' }] }
]
  },
  {
    id: 'space-8',
    title: 'Space Advantage in Endgame',
    fen: '4r1k1/pp3ppp/2p1pn2/3pP3/3P4/2N5/PPP2PPP/4R1K1 w - - 0 15',
    toMove: 'white',
    concept: 'Space advantage in the endgame',
    keyTakeaway: 'Space advantage persists into endgames.',
    difficulty: 3,
    moves: [
      { move: 'f4', annotation: '!', explanation: 'Expanding!' },
      { move: 'Nd7', explanation: 'Knight repositions.' },
      { move: 'f5', annotation: '!', explanation: 'Breaking through!' }
]
  },{
    id: 'space-10',
    title: 'Maroczy Bind',
    fen: 'rnbqkb1r/pp1ppp1p/5np1/8/2P1P3/2N5/PP2BPPP/R1BQK1NR w KQkq - 0 5',
    toMove: 'white',
    concept: 'The Maroczy Bind structure',
    keyTakeaway: 'c4 + e4 creates lasting space advantage.',
    difficulty: 4,
    moves: [
      { move: 'Nf3', annotation: '!', explanation: 'Developing!' },
      { move: 'Bg7', explanation: 'Black fianchettoes.' },
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Be3', annotation: '!', explanation: 'Solid development controlling d4!' }
]
  }
];

// PROPHYLAXIS (91-110)
export const prophylaxisVariations: CourseVariation[] = [
  {
    id: 'pro-1',
    title: 'Basic Prophylaxis',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Preventing opponent\'s plans',
    keyTakeaway: 'Think about what your opponent wants to do.',
    difficulty: 2,
    moves: [
      { move: 'd3', annotation: '!', explanation: 'Preventing ...Nd4 and supporting the center!' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'O-O', explanation: 'Castling.' }
]
  },
  {
    id: 'pro-2',
    title: 'h3 Prophylaxis',
    fen: 'r1bqkb1r/ppp2ppp/2n2n2/3pp3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Preventing ...Bg4',
    keyTakeaway: 'h3 prevents pins on the knight.',
    difficulty: 2,
    moves: [
      { move: 'h3', annotation: '!', explanation: 'Preventing ...Bg4!' },
      { move: 'Be7', explanation: 'Black develops differently.' },
      { move: 'd4', annotation: '!', explanation: 'Now this is safe!' }
]
  },
  {
    id: 'pro-3',
    title: 'a3 Prophylaxis',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Preventing ...Bb4',
    keyTakeaway: 'a3 prevents the pin on the knight.',
    difficulty: 2,
    moves: [
      { move: 'a3', annotation: '!', explanation: 'Preventing ...Bb4!' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'd3', annotation: '!', explanation: 'Solid development!' }
]
  },
  {
    id: 'pro-4',
    title: 'Restricting Counterplay',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Limiting opponent\'s options',
    keyTakeaway: 'Restrict counterplay before attacking.',
    difficulty: 3,
    moves: [
      { move: 'h3', annotation: '!', explanation: 'Preventing ...Bg4!' },
      { move: 'Na5', explanation: 'Black seeks counterplay.' },
      { move: 'Bb3', annotation: '!', explanation: 'Retreating to a safe square!' }
]
  },{
    id: 'pro-6',
    title: 'Positional Prophylaxis',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2N2N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Long-term preventive play',
    keyTakeaway: 'Think two moves ahead to prevent plans.',
    difficulty: 4,
    moves: [
      { move: 'a4', annotation: '!', explanation: 'Preventing ...b5!' },
      { move: 'Bd7', explanation: 'Black develops.' },
      { move: 'Re1', annotation: '!', explanation: 'Connecting rooks!' }
]
  },
  {
    id: 'pro-7',
    title: 'Preventing Piece Activity',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Restricting opponent\'s pieces',
    keyTakeaway: 'Keep enemy pieces passive.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Restricting the knight!' },
      { move: 'h6', explanation: 'Black asks.' },
      { move: 'Bh4', annotation: '!', explanation: 'Maintaining the pin!' }
]
  }
];

export default {
  openFileVariations,
  bishopPairVariations,
  coordinationVariations,
  spaceVariations,
  prophylaxisVariations,
};












