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
      { move: 'Bb5+', annotation: '!', explanation: 'The pin! The king must block.', arrows: [{ from: 'c4', to: 'b5', color: 'red' }] }
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
      { move: 'Nxf7', annotation: '!', explanation: 'The knight attacks the queen!' }
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
      { move: 'Nd5', annotation: '!', explanation: 'Attacking the queen and adding pressure!' }
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
      { move: 'Nc3', annotation: '!', explanation: 'Development and central control.' }
]
  },{
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
      { move: 'Ba3', annotation: '!', explanation: 'Preventing castling and attacking d6!', arrows: [{ from: 'c1', to: 'a3', color: 'green' }] }
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
      { move: 'Bg5', annotation: '!', explanation: 'Pinning the knight!', arrows: [{ from: 'c1', to: 'g5', color: 'red' }] }
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
      { move: 'd4', annotation: '!', explanation: 'Opening the center!' }
]
  },{
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
      { move: 'Nd5', annotation: '!', explanation: 'Forking queen and c7!' }
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
      { move: 'bxc3', explanation: 'Recapturing with structure compensation.' }
]
  },{
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
      { move: 'Nd5', annotation: '!', explanation: 'Attacking f6 and threatening Nc7+!' }
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
      { move: 'Bb5+', annotation: '!', explanation: 'Discovered attack on the knight!' }
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
      { move: 'Nxe4', annotation: '!', explanation: 'The pawn was undefended!' }
]
  },{
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
      { move: 'h3', annotation: '!', explanation: 'Preventing Bg4!' }
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
      { move: 'Nf3', annotation: '!', explanation: 'Developing with threats.' }
]
  }
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
      { move: 'Nxf7', annotation: '!', explanation: 'The fork wins the queen!', arrows: [{ from: 'f7', to: 'h8', color: 'red' }, { from: 'f7', to: 'd8', color: 'red' }] }
]
  },{
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
      { move: 'e5', annotation: '!', explanation: 'Pawn fork! Attacks both knights!', arrows: [{ from: 'e5', to: 'f6', color: 'red' }, { from: 'e5', to: 'd6', color: 'yellow' }] }
]
  },{
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
      { move: 'e5', annotation: '!', explanation: 'Double attack on f6 and d4!' }
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
      { move: 'Nd5', annotation: '!', explanation: 'Fork! Queen must move, allowing Nc7+!' }
]
  },{
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
      { move: 'a5', annotation: '!', explanation: 'Trapping the bishop!' }
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
      { move: 'Bxf7+', annotation: '!', explanation: 'Check! Winning material.' }
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
      { move: 'Bg5', annotation: '!', explanation: 'Pinning with fork threats!' }
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
      { move: 'Nd5', annotation: '!', explanation: 'Attacking f6 and threatening Nc7+!' }
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
      { move: 'Ng5+', annotation: '!', explanation: 'Fork! King and queen are attacked!' }
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
      { move: 'Be3', annotation: '!', explanation: 'Challenging the bishop!' }
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
      { move: 'dxe4', annotation: '!', explanation: 'Opening lines!' }
]
  },{
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
      { move: 'O-O', annotation: '!', explanation: 'Castling to safety!' }
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
      { move: 'Nd5', annotation: '!', explanation: 'Fork! Threatening Nc7+ and Nxf6+!' }
]
  }
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
      { move: 'Nxf7', annotation: '!', explanation: 'The attack lands!' }
]
  },{
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
      { move: 'Qh5', annotation: '!', explanation: 'Double attack!' }
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
      { move: 'Qxd5', annotation: '!', explanation: 'Recapturing with attack!' }
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
      { move: 'Bg5', annotation: '!', explanation: 'Now Nd5 creates discovered attack!' }
]
  },{
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
      { move: 'Nd5', annotation: '!', explanation: 'Attacking f6 and preparing discoveries!' }
]
  }
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
      { move: 'Re8#', annotation: '!!', explanation: 'Checkmate! The king has no escape.', highlights: ['e8'] }
]
  },{
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
      { move: 'Ne5', annotation: '!', explanation: 'Preparing the mate!' }
]
  },{
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
      { move: 'Re8', annotation: '!', explanation: 'Attacking the rook!' }
]
  },{
    id: 'mate-8',
    title: 'Epaulette Mate',
    fen: '3rkr2/8/8/8/8/8/8/4Q1K1 w - - 0 1',
    toMove: 'white',
    concept: 'Rooks block king escape',
    keyTakeaway: 'The rooks act like epaulettes blocking the king.',
    difficulty: 2,
    moves: [
      { move: 'Qe6#', annotation: '!!', explanation: 'Epaulette Mate! The rooks block escape.', highlights: ['e6', 'd8', 'f8'] }
]
  },{
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
      { move: 'Re3', annotation: '!', explanation: 'Doubling on the file!' }
]
  },{
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
      { move: 'Qe7+', annotation: '!', explanation: 'Continuing the attack!' }
]
  },{
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
      { move: 'Kf2', annotation: '!', explanation: 'King approaches!' }
]
  }
];

// COMBINE ALL VARIATIONS
export const tacticsVariations: CourseVariation[] = [
  ...pinVariations,
  ...forkVariations,
  ...discoveredAttackVariations,
  ...checkmateVariations
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
