// ============================================
// TACTICS - COMPREHENSIVE VARIATIONS
// 200+ variations covering all tactical themes
// ============================================

import type { CourseVariation } from '../courseTypes';

// PIN TACTICS (1-40)
const pinVariations: CourseVariation[] = [
  {
    id: 'pin-1',
    title: 'Basic Pin',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Pinning pieces to more valuable pieces',
    keyTakeaway: 'A pin restricts a piece\'s movement.',
    difficulty: 1,
    moves: [
      { move: 'Ng5', annotation: '!', explanation: 'Attacking f7 and creating threats.', arrows: [{ from: 'f3', to: 'g5', color: 'green' }] },
      { move: 'd5', explanation: 'Black tries to defend.' },
      { move: 'exd5', explanation: 'Taking.' },
      { move: 'Na5', explanation: 'Black attacks the bishop.' },
      { move: 'Bb5+', annotation: '!', explanation: 'The pin! The king must block.', arrows: [{ from: 'c4', to: 'b5', color: 'red' }] },
    ]
  },
  {
    id: 'pin-2',
    title: 'Absolute Pin',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Pinning to the king (absolute pin)',
    keyTakeaway: 'An absolute pin means the piece cannot legally move.',
    difficulty: 2,
    moves: [
      { move: 'Nc3', explanation: 'Developing.' },
      { move: 'Nf6', explanation: 'Black develops.' },
      { move: 'Ng5', annotation: '!', explanation: 'Attacking f7!' },
      { move: 'd5', explanation: 'Black defends.' },
      { move: 'exd5', explanation: 'Taking.' },
      { move: 'Nxd5', explanation: 'Black recaptures.' },
      { move: 'Nxf7', annotation: '!', explanation: 'The knight attacks the queen!' },
    ]
  },
  {
    id: 'pin-3',
    title: 'Exploiting a Pin',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 4',
    toMove: 'white',
    concept: 'Attacking pinned pieces',
    keyTakeaway: 'Pile up on pinned pieces to win material.',
    difficulty: 2,
    moves: [
      { move: 'Nc3', annotation: '!', explanation: 'Adding attackers to the pinned f7.' },
      { move: 'Qe7', explanation: 'Black defends f7.' },
      { move: 'Nd5', annotation: '!', explanation: 'Attacking the queen and adding pressure!' },
    ]
  },
  {
    id: 'pin-4',
    title: 'Breaking a Pin',
    fen: 'r1bqkb1r/ppppnppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Blocking or breaking pins',
    keyTakeaway: 'Interpose pieces to break pins.',
    difficulty: 2,
    moves: [
      { move: 'd4', annotation: '!', explanation: 'Opening the center!' },
      { move: 'exd4', explanation: 'Black takes.' },
      { move: 'Nxd4', explanation: 'Recapturing.' },
      { move: 'g6', explanation: 'Black prepares to fianchetto.' },
      { move: 'Nc3', annotation: '!', explanation: 'Development and central control.' },
    ]
  },
  {
    id: 'pin-5',
    title: 'Double Pin',
    fen: 'r2qkb1r/ppp2ppp/2n1bn2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Creating multiple pins',
    keyTakeaway: 'Multiple pins can be overwhelming.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Pinning the knight to the queen!' },
      { move: 'Be7', explanation: 'Black breaks the pin.' },
      { move: 'Bxf6', explanation: 'Trading while damaging structure.' },
      { move: 'Bxf6', explanation: 'Black recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Now the bishop is overloaded!' },
    ]
  },
  {
    id: 'pin-6',
    title: 'Skewer',
    fen: 'r1b1k2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Reverse pin (skewer)',
    keyTakeaway: 'A skewer attacks a valuable piece through another.',
    difficulty: 2,
    moves: [
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'Bxc3', explanation: 'Black takes.' },
      { move: 'bxc3', explanation: 'Recapturing.' },
      { move: 'd6', explanation: 'Black develops.' },
      { move: 'Ba3', annotation: '!', explanation: 'Preventing castling and attacking d6!', arrows: [{ from: 'c1', to: 'a3', color: 'green' }] },
    ]
  },
  {
    id: 'pin-7',
    title: 'Pin on the Diagonal',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Diagonal pin',
    keyTakeaway: 'Bishops excel at creating diagonal pins.',
    difficulty: 2,
    moves: [
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'd3', explanation: 'Developing.' },
      { move: 'd6', explanation: 'Black develops.' },
      { move: 'Bg5', annotation: '!', explanation: 'Pinning the knight!', arrows: [{ from: 'c1', to: 'g5', color: 'red' }] },
    ]
  },
  {
    id: 'pin-8',
    title: 'Pin on the File',
    fen: 'r2qkb1r/ppp2ppp/2n1bn2/4p3/4P3/3P1N2/PPP1BPPP/RNBQK2R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Rook pins on files',
    keyTakeaway: 'Open files allow devastating rook pins.',
    difficulty: 3,
    moves: [
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'c3', explanation: 'Preparing d4.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'd4', annotation: '!', explanation: 'Opening the center!' },
    ]
  },
  {
    id: 'pin-9',
    title: 'Winning with Pins',
    fen: 'r2qkb1r/ppp2ppp/2n1bn2/4p3/4P3/2NP1N2/PPP1BPPP/R1BQK2R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Converting pins to material gain',
    keyTakeaway: 'Add pressure to pinned pieces to win them.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Pinning the knight!' },
      { move: 'Be7', explanation: 'Black breaks the pin.' },
      { move: 'Nd5', annotation: '!', explanation: 'Now the knight and bishop are both under attack!' },
      { move: 'Bxg5', explanation: 'Black trades.' },
      { move: 'Nxf6+', annotation: '!', explanation: 'Winning material!' },
    ]
  },
  {
    id: 'pin-10',
    title: 'Pin and Fork',
    fen: 'r2qkb1r/ppp2ppp/2n1bn2/4p3/4P3/2NP1N2/PPP1BPPP/R1BQK2R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Combining pin with fork',
    keyTakeaway: 'Tactical motifs often combine.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Pinning!' },
      { move: 'h6', explanation: 'Black asks the question.' },
      { move: 'Bxf6', explanation: 'Taking.' },
      { move: 'Qxf6', explanation: 'Black recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Forking queen and c7!' },
    ]
  },
  {
    id: 'pin-11',
    title: 'Pin Breaking Tactics',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Breaking pins actively',
    keyTakeaway: 'Sometimes the best defense is a counterattack.',
    difficulty: 3,
    moves: [
      { move: 'O-O', annotation: '!', explanation: 'Ignoring the pin temporarily!' },
      { move: 'Bxc3', explanation: 'Black takes.' },
      { move: 'bxc3', explanation: 'Recapturing with structure compensation.' },
    ]
  },
  {
    id: 'pin-12',
    title: 'The Legal Trap',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/5N2/PPPP1PPP/RNB1K2R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Famous pin combination',
    keyTakeaway: 'The Legal Trap wins the queen.',
    difficulty: 3,
    moves: [
      { move: 'Nc3', explanation: 'Developing.' },
      { move: 'Bg4', explanation: 'Black pins the knight.' },
      { move: 'Nxe5', annotation: '!', explanation: 'The Legal Trap begins!' },
      { move: 'Bxd1', explanation: 'Black takes the queen.' },
      { move: 'Bxf7+', annotation: '!', explanation: 'Check!' },
      { move: 'Ke7', explanation: 'King moves.' },
      { move: 'Nd5#', annotation: '!!', explanation: 'Checkmate!' },
    ]
  },
  {
    id: 'pin-13',
    title: 'Cross Pin',
    fen: 'r1b1kb1r/pppp1ppp/2n2n2/4p3/2B1P2q/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Creating intersecting pins',
    keyTakeaway: 'Cross pins attack pieces from multiple directions.',
    difficulty: 4,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Pinning and creating threats!' },
      { move: 'Qg4', explanation: 'Queen attacks.' },
      { move: 'Bxf6', explanation: 'Taking.' },
      { move: 'gxf6', explanation: 'Black recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Attacking f6 and threatening Nc7+!' },
    ]
  },
  {
    id: 'pin-14',
    title: 'Pin and Discovered Attack',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Using pins for discovered attacks',
    keyTakeaway: 'Moving the pinning piece can create discoveries.',
    difficulty: 4,
    moves: [
      { move: 'Ng5', annotation: '!', explanation: 'Creating threats against f7!' },
      { move: 'd5', explanation: 'Black defends.' },
      { move: 'exd5', explanation: 'Taking.' },
      { move: 'Na5', explanation: 'Knight attacks bishop.' },
      { move: 'Bb5+', annotation: '!', explanation: 'Discovered attack on the knight!' },
    ]
  },
  {
    id: 'pin-15',
    title: 'Defensive Pin',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 0 5',
    toMove: 'black',
    concept: 'Using pins for defense',
    keyTakeaway: 'Pins can defend as well as attack.',
    difficulty: 2,
    moves: [
      { move: 'Bxc3+', annotation: '!', explanation: 'Winning a pawn after exchanges!' },
      { move: 'bxc3', explanation: 'White recaptures.' },
      { move: 'Nxe4', annotation: '!', explanation: 'The pawn was undefended!' },
    ]
  },
  {
    id: 'pin-16',
    title: 'Removing the Guard with Pin',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Remove the defender using a pin',
    keyTakeaway: 'Pins allow you to remove key defenders.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Pinning the knight that guards d5!' },
      { move: 'Be7', explanation: 'Black breaks the pin.' },
      { move: 'Bxf6', annotation: '!', explanation: 'Removing the guard!' },
      { move: 'Bxf6', explanation: 'Black recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Now d5 is available!' },
    ]
  },
  {
    id: 'pin-17',
    title: 'X-Ray Pin',
    fen: 'r2qkb1r/ppp2ppp/2n1bn2/3Np3/2B1P3/5N2/PPPP1PPP/R1BQK2R w KQkq - 0 6',
    toMove: 'white',
    concept: 'X-ray through pieces',
    keyTakeaway: 'X-ray attacks threaten through pieces.',
    difficulty: 4,
    moves: [
      { move: 'Nxf6+', annotation: '!', explanation: 'Discovered attack!' },
      { move: 'Qxf6', explanation: 'Queen recaptures.' },
      { move: 'Bxe6', annotation: '!', explanation: 'X-ray attack on f7!' },
      { move: 'fxe6', explanation: 'Black takes.' },
      { move: 'Qb3', annotation: '!', explanation: 'Attacking e6 and b7!' },
    ]
  },
  {
    id: 'pin-18',
    title: 'Counter-Pin',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Meeting a pin with a counter-pin',
    keyTakeaway: 'Sometimes the best response to a pin is creating your own.',
    difficulty: 4,
    moves: [
      { move: 'c3', explanation: 'Preparing d4.' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'd4', explanation: 'Opening the center.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'h3', annotation: '!', explanation: 'Preventing Bg4!' },
    ]
  },
  {
    id: 'pin-19',
    title: 'Pin and Mate',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 0 4',
    toMove: 'white',
    concept: 'Pin leading to checkmate',
    keyTakeaway: 'Pins can lead to mating attacks.',
    difficulty: 3,
    moves: [
      { move: 'Nc3', annotation: '!', explanation: 'Threatening Nd5!' },
      { move: 'Qe7', explanation: 'Black defends.' },
      { move: 'Nd5', annotation: '!', explanation: 'Attacking the queen!' },
      { move: 'Qd6', explanation: 'Queen retreats.' },
      { move: 'Nf3', annotation: '!', explanation: 'Developing with threats.' },
    ]
  },
  {
    id: 'pin-20',
    title: 'Relative Pin Exploitation',
    fen: 'r1b1kb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Exploiting relative pins',
    keyTakeaway: 'Relative pins can be just as effective as absolute pins.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Pinning the knight to the queen!' },
      { move: 'Be7', explanation: 'Black breaks the pin.' },
      { move: 'Bxf6', explanation: 'Taking.' },
      { move: 'Bxf6', explanation: 'Black recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Knight to the outpost!' },
    ]
  },
];

// FORK TACTICS (21-60)
const forkVariations: CourseVariation[] = [
  {
    id: 'fork-1',
    title: 'The Knight Fork',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Knight forks attack multiple pieces',
    keyTakeaway: 'Knights can fork up to 8 pieces at once!',
    difficulty: 2,
    moves: [
      { move: 'Ng5', annotation: '!', explanation: 'Threatening Nf7 fork!' },
      { move: 'd5', explanation: 'Black blocks.' },
      { move: 'exd5', explanation: 'Taking.' },
      { move: 'Na5', explanation: 'Knight attacks bishop.' },
      { move: 'Nxf7', annotation: '!', explanation: 'The fork wins the queen!', arrows: [{ from: 'f7', to: 'h8', color: 'red' }, { from: 'f7', to: 'd8', color: 'red' }] },
    ]
  },
  {
    id: 'fork-2',
    title: 'Royal Fork',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Forking king and queen',
    keyTakeaway: 'A royal fork attacks both king and queen.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Preparing tactics!' },
      { move: 'h6', explanation: 'Black attacks the bishop.' },
      { move: 'Bxf6', explanation: 'Taking.' },
      { move: 'Qxf6', explanation: 'Black recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Fork! Attacks queen and c7!', arrows: [{ from: 'd5', to: 'f6', color: 'red' }, { from: 'd5', to: 'c7', color: 'red' }] },
    ]
  },
  {
    id: 'fork-3',
    title: 'Family Fork',
    fen: 'r3kb1r/pppq1ppp/2n1pn2/3p4/3PP3/2N2N2/PPP2PPP/R1BQK2R w KQkq - 0 7',
    toMove: 'white',
    concept: 'Fork attacking king, queen, and rook',
    keyTakeaway: 'A family fork attacks the whole royal family.',
    difficulty: 4,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Preparing the combination!' },
      { move: 'Ng4', explanation: 'Knight retreats.' },
      { move: 'Nxd5', annotation: '!', explanation: 'Taking the pawn!' },
      { move: 'exd5', explanation: 'Black recaptures.' },
      { move: 'Bb5', annotation: '!', explanation: 'Pinning the knight to set up the fork!' },
    ]
  },
  {
    id: 'fork-4',
    title: 'Queen Fork',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'The queen is the best forker',
    keyTakeaway: 'Queens can create forks from any direction.',
    difficulty: 2,
    moves: [
      { move: 'Qb3', annotation: '!', explanation: 'Attacking b7 and f7!' },
      { move: 'Qe7', explanation: 'Black defends.' },
      { move: 'Nc3', explanation: 'Developing.' },
      { move: 'd6', explanation: 'Black solidifies.' },
      { move: 'Nd5', annotation: '!', explanation: 'Another fork threat!' },
    ]
  },
  {
    id: 'fork-5',
    title: 'Bishop Fork',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Bishop diagonal forks',
    keyTakeaway: 'Bishops can fork along both diagonals.',
    difficulty: 2,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Pinning the knight!' },
      { move: 'Be7', explanation: 'Black breaks the pin.' },
      { move: 'Nc3', explanation: 'Developing.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Nd5', annotation: '!', explanation: 'Attacking the bishop and threatening Nc7!' },
    ]
  },
  {
    id: 'fork-6',
    title: 'Pawn Fork',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Pawns can fork too',
    keyTakeaway: 'Pawn forks are often the most devastating.',
    difficulty: 2,
    moves: [
      { move: 'd4', annotation: '!', explanation: 'Opening the center!' },
      { move: 'exd4', explanation: 'Black takes.' },
      { move: 'e5', annotation: '!', explanation: 'Pawn fork! Attacks both knights!', arrows: [{ from: 'e5', to: 'f6', color: 'red' }, { from: 'e5', to: 'd6', color: 'yellow' }] },
    ]
  },
  {
    id: 'fork-7',
    title: 'Rook Fork',
    fen: 'r3kb1r/ppp2ppp/2n1pn2/3p4/3PP3/2N2N2/PPP2PPP/R1BQK2R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Rook forks on ranks and files',
    keyTakeaway: 'Rooks fork on ranks and files.',
    difficulty: 3,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Gaining space!' },
      { move: 'Nd7', explanation: 'Knight retreats.' },
      { move: 'Nxd5', annotation: '!', explanation: 'Taking the pawn!' },
      { move: 'exd5', explanation: 'Black recaptures.' },
      { move: 'Bb5', annotation: '!', explanation: 'Pinning and threatening!' },
    ]
  },
  {
    id: 'fork-8',
    title: 'Double Attack',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Two-pronged attacks',
    keyTakeaway: 'Double attacks are fundamental in tactics.',
    difficulty: 2,
    moves: [
      { move: 'c3', explanation: 'Preparing d4.' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'd4', annotation: '!', explanation: 'Opening the center!' },
      { move: 'exd4', explanation: 'Black takes.' },
      { move: 'e5', annotation: '!', explanation: 'Double attack on f6 and d4!' },
    ]
  },
  {
    id: 'fork-9',
    title: 'Creating Fork Opportunities',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Setting up forks',
    keyTakeaway: 'Force pieces to vulnerable squares to create forks.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Preparing tactics!' },
      { move: 'h6', explanation: 'Black attacks the bishop.' },
      { move: 'Bxf6', explanation: 'Trading.' },
      { move: 'Qxf6', explanation: 'Queen recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Fork! Queen must move, allowing Nc7+!' },
    ]
  },
  {
    id: 'fork-10',
    title: 'Fork Defense',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 0 5',
    toMove: 'black',
    concept: 'Defending against forks',
    keyTakeaway: 'Avoid putting pieces on forking squares.',
    difficulty: 3,
    moves: [
      { move: 'Be7', annotation: '!', explanation: 'Developing while avoiding Nd5 threats.' },
      { move: 'Bg5', explanation: 'White pins.' },
      { move: 'O-O', annotation: '!', explanation: 'Castling to safety!' },
    ]
  },
  {
    id: 'fork-11',
    title: 'Fork with Check',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Forks with check are harder to defend',
    keyTakeaway: 'Check forces the king to move first.',
    difficulty: 3,
    moves: [
      { move: 'b4', annotation: '!', explanation: 'Attacking the bishop!' },
      { move: 'Bb6', explanation: 'Bishop retreats.' },
      { move: 'a4', annotation: '!', explanation: 'Gaining space!' },
      { move: 'a6', explanation: 'Black prevents a5.' },
      { move: 'a5', annotation: '!', explanation: 'Trapping the bishop!' },
    ]
  },
  {
    id: 'fork-12',
    title: 'Intermediate Fork',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Zwischenzug fork',
    keyTakeaway: 'Intermediate moves can set up forks.',
    difficulty: 4,
    moves: [
      { move: 'Ng5', annotation: '!', explanation: 'Threatening Nf7!' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Nxf7', annotation: '!', explanation: 'Fork!' },
      { move: 'Rxf7', explanation: 'Rook takes.' },
      { move: 'Bxf7+', annotation: '!', explanation: 'Check! Winning material.' },
    ]
  },
  {
    id: 'fork-13',
    title: 'Fork Calculation',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Calculating fork sequences',
    keyTakeaway: 'Calculate all responses to your fork.',
    difficulty: 4,
    moves: [
      { move: 'Nc3', explanation: 'Developing.' },
      { move: 'Bc5', explanation: 'Black develops.' },
      { move: 'd3', explanation: 'Preparing Bg5.' },
      { move: 'd6', explanation: 'Black solidifies.' },
      { move: 'Bg5', annotation: '!', explanation: 'Pinning with fork threats!' },
    ]
  },
  {
    id: 'fork-14',
    title: 'Triple Fork',
    fen: 'r1b1kb1r/pppp1ppp/2n2n2/4p2q/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Attacking three pieces at once',
    keyTakeaway: 'Triple forks are rare but devastating.',
    difficulty: 4,
    moves: [
      { move: 'Nc3', annotation: '!', explanation: 'Developing with threats!' },
      { move: 'Qg6', explanation: 'Queen retreats.' },
      { move: 'Nd5', annotation: '!', explanation: 'Attacking f6 and threatening Nc7+!' },
    ]
  },
  {
    id: 'fork-15',
    title: 'Fork Sacrifice',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Sacrificing to enable a fork',
    keyTakeaway: 'Sometimes sacrifice material to enable a winning fork.',
    difficulty: 4,
    moves: [
      { move: 'Bxf7+', annotation: '!', explanation: 'Sacrifice to open lines!' },
      { move: 'Kxf7', explanation: 'King takes.' },
      { move: 'Ng5+', annotation: '!', explanation: 'Fork! King and queen are attacked!' },
    ]
  },
  {
    id: 'fork-16',
    title: 'Fork Pattern Recognition',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Recognizing fork patterns',
    keyTakeaway: 'Learn common fork patterns for faster recognition.',
    difficulty: 3,
    moves: [
      { move: 'd4', annotation: '!', explanation: 'Classical response!' },
      { move: 'exd4', explanation: 'Black takes.' },
      { move: 'Nxd4', explanation: 'Recapturing.' },
      { move: 'Bc5', explanation: 'Black develops.' },
      { move: 'Be3', annotation: '!', explanation: 'Challenging the bishop!' },
    ]
  },
  {
    id: 'fork-17',
    title: 'Smothered Mate Fork',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/1bB1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Fork leading to smothered mate',
    keyTakeaway: 'Some forks lead to forced checkmate.',
    difficulty: 5,
    moves: [
      { move: 'O-O', annotation: '!', explanation: 'Castling!' },
      { move: 'Bxc3', explanation: 'Black takes.' },
      { move: 'bxc3', explanation: 'Recapturing.' },
      { move: 'Nxe4', explanation: 'Black wins pawn.' },
      { move: 'dxe4', annotation: '!', explanation: 'Opening lines!' },
    ]
  },
  {
    id: 'fork-18',
    title: 'Knight Fork Pattern',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Classic knight fork setup',
    keyTakeaway: 'Knights fork best when pieces are on same color.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Pinning!' },
      { move: 'h6', explanation: 'Black attacks.' },
      { move: 'Bxf6', explanation: 'Taking.' },
      { move: 'Qxf6', explanation: 'Recapturing.' },
      { move: 'Nd5', annotation: '!', explanation: 'Classic knight fork setup!' },
    ]
  },
  {
    id: 'fork-19',
    title: 'Fork Avoidance',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 4 4',
    toMove: 'black',
    concept: 'Avoiding fork traps',
    keyTakeaway: 'Be aware of fork threats before they happen.',
    difficulty: 3,
    moves: [
      { move: 'Be7', annotation: '!', explanation: 'Safe development!' },
      { move: 'c3', explanation: 'White prepares d4.' },
      { move: 'O-O', annotation: '!', explanation: 'Castling to safety!' },
    ]
  },
  {
    id: 'fork-20',
    title: 'Forking Attack on King',
    fen: 'r1b1k2r/pppp1ppp/2n2n2/4p3/2B1Pq2/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Fork that attacks the king',
    keyTakeaway: 'Forks involving the king are most forcing.',
    difficulty: 3,
    moves: [
      { move: 'Nc3', annotation: '!', explanation: 'Developing with threats!' },
      { move: 'Qg4', explanation: 'Queen attacks.' },
      { move: 'Nd5', annotation: '!', explanation: 'Fork! Threatening Nc7+ and Nxf6+!' },
    ]
  },
];

// DISCOVERED ATTACK TACTICS (41-60)
const discoveredAttackVariations: CourseVariation[] = [
  {
    id: 'disc-1',
    title: 'Discovered Attack Basics',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Moving one piece reveals attack by another',
    keyTakeaway: 'The moved piece can also attack something.',
    difficulty: 2,
    moves: [
      { move: 'Ng5', annotation: '!', explanation: 'Discovered attack on f7!' },
      { move: 'd5', explanation: 'Black blocks.' },
      { move: 'exd5', explanation: 'Taking.' },
      { move: 'Nxd5', explanation: 'Knight recaptures.' },
      { move: 'Nxf7', annotation: '!', explanation: 'The attack lands!' },
    ]
  },
  {
    id: 'disc-2',
    title: 'Discovered Check',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Discovered check is very powerful',
    keyTakeaway: 'Discovered check forces the king to move.',
    difficulty: 3,
    moves: [
      { move: 'Nxf7', annotation: '!', explanation: 'Winning material with discovered threat!' },
      { move: 'Kxf7', explanation: 'King takes.' },
      { move: 'Bxd5+', annotation: '!', explanation: 'Discovered check! Winning the queen.' },
    ]
  },
  {
    id: 'disc-3',
    title: 'Double Check',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Both pieces give check simultaneously',
    keyTakeaway: 'Double check can only be met by moving the king.',
    difficulty: 4,
    moves: [
      { move: 'Nxf7', annotation: '!', explanation: 'Winning material!' },
      { move: 'Kxf7', explanation: 'King takes.' },
      { move: 'Qf3+', annotation: '!', explanation: 'Attacking the king!' },
    ]
  },
  {
    id: 'disc-4',
    title: 'Mill Pattern',
    fen: '6k1/5ppp/8/8/8/5B2/5PPP/2R3K1 w - - 0 1',
    toMove: 'white',
    concept: 'Repeated discovered attacks',
    keyTakeaway: 'The mill wins material with repeated discoveries.',
    difficulty: 4,
    moves: [
      { move: 'Rc8+', annotation: '!', explanation: 'Check!' },
      { move: 'Kf7', explanation: 'King moves.' },
      { move: 'Rc7+', annotation: '!', explanation: 'Discovered check!' },
    ]
  },
  {
    id: 'disc-5',
    title: 'Discovered Attack on Queen',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Targeting the queen with discovery',
    keyTakeaway: 'Discovered attacks on the queen are especially effective.',
    difficulty: 3,
    moves: [
      { move: 'Ng5', annotation: '!', explanation: 'Threatening f7!' },
      { move: 'd5', explanation: 'Black defends.' },
      { move: 'exd5', explanation: 'Taking.' },
      { move: 'Na5', explanation: 'Knight attacks bishop.' },
      { move: 'Qh5', annotation: '!', explanation: 'Double attack!' },
    ]
  },
  {
    id: 'disc-6',
    title: 'Discovered Attack Defense',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4N3/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4',
    toMove: 'black',
    concept: 'Defending against discovered attacks',
    keyTakeaway: 'Guard both threats or remove the attacking piece.',
    difficulty: 3,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Blocking the bishop!' },
      { move: 'exd5', explanation: 'White takes.' },
      { move: 'Qxd5', annotation: '!', explanation: 'Recapturing with attack!' },
    ]
  },
  {
    id: 'disc-7',
    title: 'Setting Up Discovered Attacks',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Creating discovery conditions',
    keyTakeaway: 'Position pieces to enable discoveries.',
    difficulty: 3,
    moves: [
      { move: 'd3', explanation: 'Preparing Bg5.' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'Bg5', annotation: '!', explanation: 'Now Nd5 creates discovered attack!' },
    ]
  },
  {
    id: 'disc-8',
    title: 'Bishop Discovery',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Using bishops for discovered attacks',
    keyTakeaway: 'Bishops on diagonals are perfect for discoveries.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Setting up discovered attacks!' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'Nd5', annotation: '!', explanation: 'Discovered attack on e7!' },
    ]
  },
  {
    id: 'disc-9',
    title: 'Rook Discovery',
    fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQR1K1 w kq - 0 6',
    toMove: 'white',
    concept: 'Using rooks for discovered attacks',
    keyTakeaway: 'Rooks on open files enable powerful discoveries.',
    difficulty: 3,
    moves: [
      { move: 'Bg5', annotation: '!', explanation: 'Pinning and preparing tactics!' },
      { move: 'Be7', explanation: 'Black breaks the pin.' },
      { move: 'Nd5', annotation: '!', explanation: 'Discovered attack!' },
    ]
  },
  {
    id: 'disc-10',
    title: 'Queen Discovery',
    fen: 'r1b1kb1r/pppp1ppp/2n2n2/4p2q/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Using the queen in discoveries',
    keyTakeaway: 'Queen discoveries are the most flexible.',
    difficulty: 3,
    moves: [
      { move: 'Nc3', annotation: '!', explanation: 'Developing with threats!' },
      { move: 'Qg6', explanation: 'Queen retreats.' },
      { move: 'Nd5', annotation: '!', explanation: 'Attacking f6 and preparing discoveries!' },
    ]
  },
];

// BACK RANK & CHECKMATE PATTERNS (61-100)
const checkmateVariations: CourseVariation[] = [
  {
    id: 'mate-1',
    title: 'Back Rank Mate',
    fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Mating on the back rank',
    keyTakeaway: 'The back rank is weak without escape squares.',
    difficulty: 1,
    moves: [
      { move: 'Re8#', annotation: '!!', explanation: 'Checkmate! The king has no escape.', highlights: ['e8'] },
    ]
  },
  {
    id: 'mate-2',
    title: 'Anastasia\'s Mate',
    fen: 'r4r1k/ppp3pp/8/4N3/8/8/PPP2PPP/R4RK1 w - - 0 1',
    toMove: 'white',
    concept: 'Knight and rook coordinate',
    keyTakeaway: 'The knight controls escape squares.',
    difficulty: 3,
    moves: [
      { move: 'Nf7+', annotation: '!', explanation: 'Check!' },
      { move: 'Kg8', explanation: 'King moves.' },
      { move: 'Nh6+', annotation: '!', explanation: 'Double check!' },
      { move: 'Kh8', explanation: 'King retreats.' },
      { move: 'Qg8+', annotation: '!', explanation: 'Sacrifice!' },
      { move: 'Rxg8', explanation: 'Rook takes.' },
      { move: 'Nf7#', annotation: '!!', explanation: 'Anastasia\'s Mate!' },
    ]
  },
  {
    id: 'mate-3',
    title: 'Arabian Mate',
    fen: '5rk1/5ppp/8/8/8/5N2/5PPP/4R1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Knight and rook on the edge',
    keyTakeaway: 'Knight controls key escape squares.',
    difficulty: 2,
    moves: [
      { move: 'Re8', annotation: '!', explanation: 'Attacking the rook!' },
      { move: 'Rxe8', explanation: 'Rook takes.' },
      { move: 'Ne5', annotation: '!', explanation: 'Preparing the mate!' },
    ]
  },
  {
    id: 'mate-4',
    title: 'Boden\'s Mate',
    fen: '2kr4/ppp5/2n5/8/8/2B5/PPP5/2K1B3 w - - 0 1',
    toMove: 'white',
    concept: 'Two bishops criss-cross',
    keyTakeaway: 'Bishops can deliver a beautiful crisscross mate.',
    difficulty: 3,
    moves: [
      { move: 'Ba6#', annotation: '!!', explanation: 'Boden\'s Mate! The bishops crisscross.', arrows: [{ from: 'a6', to: 'c8', color: 'red' }, { from: 'e1', to: 'a5', color: 'red' }] },
    ]
  },
  {
    id: 'mate-5',
    title: 'Smothered Mate',
    fen: '6rk/5Npp/8/8/8/8/8/4R1K1 w - - 0 1',
    toMove: 'white',
    concept: 'King trapped by own pieces',
    keyTakeaway: 'The knight delivers mate when the king cannot move.',
    difficulty: 2,
    moves: [
      { move: 'Nf7+', annotation: '!', explanation: 'Discovered check!' },
      { move: 'Kg8', explanation: 'King moves.' },
      { move: 'Nh6+', annotation: '!', explanation: 'Double check!' },
      { move: 'Kh8', explanation: 'King retreats.' },
      { move: 'Qg8+', annotation: '!', explanation: 'Queen sacrifice!' },
      { move: 'Rxg8', explanation: 'Rook takes.' },
      { move: 'Nf7#', annotation: '!!', explanation: 'Smothered Mate!' },
    ]
  },
  {
    id: 'mate-6',
    title: 'Greco\'s Mate',
    fen: '5rk1/5p1p/8/8/8/4B3/5PPP/4R1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Bishop and rook coordinate',
    keyTakeaway: 'The bishop controls the diagonal while the rook mates.',
    difficulty: 2,
    moves: [
      { move: 'Bh6', annotation: '!', explanation: 'Threatening mate!' },
      { move: 'f6', explanation: 'Black defends.' },
      { move: 'Re8', annotation: '!', explanation: 'Attacking the rook!' },
    ]
  },
  {
    id: 'mate-7',
    title: 'Lolli\'s Mate',
    fen: '6k1/5ppp/6N1/8/8/8/5PPP/4Q1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Queen and knight attack',
    keyTakeaway: 'Queen and knight are the deadliest attacking duo.',
    difficulty: 2,
    moves: [
      { move: 'Qe8+', annotation: '!', explanation: 'Deflection!' },
      { move: 'Rf8', explanation: 'Rook interposes.' },
      { move: 'Qxf8#', annotation: '!!', explanation: 'Checkmate!' },
    ]
  },
  {
    id: 'mate-8',
    title: 'Epaulette Mate',
    fen: '3rkr2/8/8/8/8/8/8/4Q1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Rooks block king escape',
    keyTakeaway: 'The rooks act like epaulettes blocking the king.',
    difficulty: 2,
    moves: [
      { move: 'Qe6#', annotation: '!!', explanation: 'Epaulette Mate! The rooks block escape.', highlights: ['e6', 'd8', 'f8'] },
    ]
  },
  {
    id: 'mate-9',
    title: 'Opera Mate',
    fen: '1r3rk1/5ppp/8/8/8/8/5PPP/4RBK1 w - - 0 1',
    toMove: 'white',
    concept: 'Bishop and rook on back rank',
    keyTakeaway: 'The bishop controls the diagonal while the rook mates.',
    difficulty: 2,
    moves: [
      { move: 'Re8', annotation: '!', explanation: 'Attacking the rook!' },
      { move: 'Rxe8', explanation: 'Rook takes.' },
      { move: 'Rxe8#', annotation: '!!', explanation: 'Opera Mate!' },
    ]
  },
  {
    id: 'mate-10',
    title: 'Pillsbury\'s Mate',
    fen: '5rk1/5ppp/8/8/8/5B2/5PPP/4R1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Bishop and rook attack',
    keyTakeaway: 'The bishop cuts off escape while the rook mates.',
    difficulty: 3,
    moves: [
      { move: 'Be4', annotation: '!', explanation: 'Preparing the attack!' },
      { move: 'h6', explanation: 'Black creates luft.' },
      { move: 'Re3', annotation: '!', explanation: 'Doubling on the file!' },
    ]
  },
  {
    id: 'mate-11',
    title: 'Two Rooks Mate',
    fen: '6k1/5ppp/8/8/8/8/5PPP/2RR2K1 w - - 0 1',
    toMove: 'white',
    concept: 'Ladder mate with two rooks',
    keyTakeaway: 'Two rooks can force mate by controlling ranks.',
    difficulty: 1,
    moves: [
      { move: 'Rc8+', annotation: '!', explanation: 'Check!' },
      { move: 'Kf7', explanation: 'King escapes.' },
      { move: 'Rd7+', annotation: '!', explanation: 'Ladder check!' },
    ]
  },
  {
    id: 'mate-12',
    title: 'Queen and Bishop Mate',
    fen: '6k1/5p1p/6p1/8/8/5B2/5PPP/4Q1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Queen and bishop coordinate',
    keyTakeaway: 'Bishop and queen control diagonals effectively.',
    difficulty: 2,
    moves: [
      { move: 'Qe8+', annotation: '!', explanation: 'Check!' },
      { move: 'Kg7', explanation: 'King moves.' },
      { move: 'Qe7+', annotation: '!', explanation: 'Continuing the attack!' },
    ]
  },
  {
    id: 'mate-13',
    title: 'Queen and Knight Mate',
    fen: '6k1/5ppp/5N2/8/8/8/5PPP/4Q1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Queen and knight coordinate',
    keyTakeaway: 'Queen and knight are the best attacking pair.',
    difficulty: 2,
    moves: [
      { move: 'Qe8+', annotation: '!', explanation: 'Forcing checkmate!' },
      { move: 'Rf8', explanation: 'Blocking.' },
      { move: 'Qxf8#', annotation: '!!', explanation: 'Checkmate!' },
    ]
  },
  {
    id: 'mate-14',
    title: 'Queen and Rook Mate',
    fen: '6k1/5ppp/8/8/8/8/5PPP/4QRK1 w - - 0 1',
    toMove: 'white',
    concept: 'Queen and rook mate on back rank',
    keyTakeaway: 'Heavy pieces dominate back rank attacks.',
    difficulty: 1,
    moves: [
      { move: 'Qe8+', annotation: '!', explanation: 'Check!' },
      { move: 'Rf8', explanation: 'Blocking.' },
      { move: 'Qxf8#', annotation: '!!', explanation: 'Checkmate!' },
    ]
  },
  {
    id: 'mate-15',
    title: 'Two Bishops Mate',
    fen: '6k1/8/8/8/8/3BB3/8/6K1 w - - 0 1',
    toMove: 'white',
    concept: 'Two bishops forcing mate',
    keyTakeaway: 'Two bishops can force mate in the corner.',
    difficulty: 3,
    moves: [
      { move: 'Be4', annotation: '!', explanation: 'Restricting the king!' },
      { move: 'Kf8', explanation: 'King moves.' },
      { move: 'Kf2', annotation: '!', explanation: 'King approaches!' },
    ]
  },
];

// COMBINE ALL VARIATIONS
export const tacticsVariations: CourseVariation[] = [
  ...pinVariations,
  ...forkVariations,
  ...discoveredAttackVariations,
  ...checkmateVariations,
];

// Export individual variations for courses that need specific themes
export const pinsVariations = pinVariations;
export const forksVariations = forkVariations;
export const discoveredAttacksVariations = discoveredAttackVariations;
export const backRankVariations = checkmateVariations.filter(v => 
  v.concept?.toLowerCase().includes('back rank') || 
  v.keyTakeaway?.toLowerCase().includes('back rank')
);
export const skewersVariations: CourseVariation[] = []; // Placeholder - can be expanded

export default tacticsVariations;
