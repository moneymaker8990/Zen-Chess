// ============================================
// ENDGAMES - COMPREHENSIVE VARIATIONS
// 150+ variations covering all endgame types
// ============================================

import type { CourseVariation } from '../courseTypes';

// KING AND PAWN ENDGAMES (1-40)
const kingPawnVariations: CourseVariation[] = [{
    id: 'kp-4',
    title: 'Distant Opposition',
    fen: '8/8/8/8/8/k7/8/K7 w - - 0 1',
    toMove: 'white',
    concept: 'Opposition over multiple squares',
    keyTakeaway: 'Maintain an odd number of squares between kings.',
    difficulty: 3,
    moves: [
      { move: 'Kb1', annotation: '!', explanation: 'Taking distant opposition!' },
      { move: 'Kb4', explanation: 'Black approaches.' },
      { move: 'Kb2', annotation: '!', explanation: 'Maintaining opposition!' },
      { move: 'Kc4', explanation: 'Black tries to outflank.' },
      { move: 'Kc2', annotation: '!', explanation: 'Still holding!' }
]
  },
  {
    id: 'kp-5',
    title: 'The Key Squares',
    fen: '8/8/8/8/4P3/8/4K3/4k3 w - - 0 1',
    toMove: 'white',
    concept: 'Key squares determine who wins',
    keyTakeaway: 'If your king reaches key squares, you win.',
    difficulty: 3,
    moves: [
      { move: 'Kd3', annotation: '!', explanation: 'Heading for the key squares!' },
      { move: 'Kd1', explanation: 'Black opposes.' },
      { move: 'e5', annotation: '!', explanation: 'Gaining space!' },
      { move: 'Ke1', explanation: 'Black approaches.' },
      { move: 'Ke4', annotation: '!', explanation: 'King to the key square!' }
]
  },
  {
    id: 'kp-6',
    title: 'Trebuchet',
    fen: '8/8/2k5/3p4/3K4/8/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'Mutual zugzwang',
    keyTakeaway: 'Whoever moves loses the pawn.',
    difficulty: 4,
    moves: [
      { move: 'Ke3', annotation: '?', explanation: 'Losing! White must give way.' },
      { move: 'Kc5', annotation: '!', explanation: 'Black wins the pawn!' }
]
  },
  {
    id: 'kp-7',
    title: 'Triangulation',
    fen: '8/8/4k3/8/3KP3/8/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'Losing a tempo to gain opposition',
    keyTakeaway: 'Triangulate to transfer the move to your opponent.',
    difficulty: 4,
    moves: [
      { move: 'Ke3', annotation: '!', explanation: 'Starting the triangle!' },
      { move: 'Kd6', explanation: 'Black follows.' },
      { move: 'Kd3', annotation: '!', explanation: 'Second point of the triangle!' },
      { move: 'Ke6', explanation: 'Black returns.' },
      { move: 'Kd4', annotation: '!', explanation: 'Triangle complete! Now Black must give way.' }
]
  },
  {
    id: 'kp-8',
    title: 'Passed Pawn Creation',
    fen: '8/5k2/8/5p2/4pP2/4P3/5K2/8 w - - 0 1',
    toMove: 'white',
    concept: 'Creating a passed pawn',
    keyTakeaway: 'Exchange to create a passed pawn.',
    difficulty: 3,
    moves: [
      { move: 'Ke2', annotation: '!', explanation: 'Approaching the pawns!' },
      { move: 'Ke6', explanation: 'Black centralizes.' },
      { move: 'Kd2', annotation: '!', explanation: 'Preparing to attack e4!' },
      { move: 'Kd5', explanation: 'Black defends.' },
      { move: 'Kc3', annotation: '!', explanation: 'Attacking the pawn!' }
]
  },
  {
    id: 'kp-9',
    title: 'Outside Passed Pawn',
    fen: '8/8/4k3/P4p2/5P2/4K3/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'Using an outside passed pawn',
    keyTakeaway: 'The outside passed pawn decoys the enemy king.',
    difficulty: 3,
    moves: [
      { move: 'a6', annotation: '!', explanation: 'Advancing the outside passer!' },
      { move: 'Kd5', explanation: 'Black has to choose.' },
      { move: 'a7', annotation: '!', explanation: 'The pawn runs!' },
      { move: 'Kc6', explanation: 'Black chases.' },
      { move: 'a8=Q', annotation: '!', explanation: 'Promotion!' }
]
  },{
    id: 'kp-11',
    title: 'Rook Pawn Draw',
    fen: '8/8/8/8/8/k7/7P/7K w - - 0 1',
    toMove: 'white',
    concept: 'Rook pawns often draw',
    keyTakeaway: 'Rook pawns can only promote to one color square.',
    difficulty: 2,
    moves: [
      { move: 'h4', explanation: 'Pushing the pawn.' },
      { move: 'Kb4', explanation: 'King approaches.' },
      { move: 'h5', explanation: 'Continuing.' },
      { move: 'Kc5', explanation: 'King approaches.' },
      { move: 'h6', explanation: 'Pushing.' },
      { move: 'Kd6', explanation: 'King approaches.' },
      { move: 'h7', explanation: 'Almost there!' },
      { move: 'Ke7', annotation: '!', explanation: 'Black reaches the corner!' }
]
  },{
    id: 'kp-14',
    title: 'Pawn Majority',
    fen: '8/8/4k3/8/2pp4/2PP4/4K3/8 w - - 0 1',
    toMove: 'white',
    concept: 'Using a pawn majority',
    keyTakeaway: 'Advance the majority to create a passed pawn.',
    difficulty: 3,
    moves: [
      { move: 'Kd2', annotation: '!', explanation: 'Approaching!' },
      { move: 'Kd6', explanation: 'Black centralizes.' },
      { move: 'Kc2', annotation: '!', explanation: 'Preparing to support the pawns!' }
]
  },{
    id: 'kp-16',
    title: 'King Activity',
    fen: '8/4k3/8/4p3/4P3/8/8/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Active king decides the game',
    keyTakeaway: 'An active king is worth almost a piece in the endgame.',
    difficulty: 2,
    moves: [
      { move: 'Ke2', annotation: '!', explanation: 'Activating the king!' },
      { move: 'Ke6', explanation: 'Black does the same.' },
      { move: 'Ke3', annotation: '!', explanation: 'Continuing to centralize!' }
]
  },
  {
    id: 'kp-17',
    title: 'Reserve Tempo',
    fen: '8/8/4k3/4p3/4P3/4K3/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'Keeping pawn moves in reserve',
    keyTakeaway: 'Save pawn moves for when you need them.',
    difficulty: 4,
    moves: [
      { move: 'Kd3', annotation: '!', explanation: 'Maneuvering!' },
      { move: 'Kd6', explanation: 'Black mirrors.' },
      { move: 'Ke3', annotation: '!', explanation: 'Returning!' }
]
  },
  {
    id: 'kp-18',
    title: 'Outflanking',
    fen: '8/8/3k4/8/3KP3/8/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'Going around the opponent\'s king',
    keyTakeaway: 'Outflank to reach key squares.',
    difficulty: 3,
    moves: [
      { move: 'Kc4', annotation: '!', explanation: 'Starting to outflank!' },
      { move: 'Kc6', explanation: 'Black opposes.' },
      { move: 'e5', annotation: '!', explanation: 'Gaining space!' },
      { move: 'Kd7', explanation: 'Black retreats.' },
      { move: 'Kd5', annotation: '!', explanation: 'King advances!' }
]
  }
];

// ROOK ENDGAMES (21-60)
const rookEndgameVariations: CourseVariation[] = [{
    id: 'rook-3',
    title: 'Rook Behind Passed Pawn',
    fen: '8/8/4k3/4p3/8/4K3/R7/3r4 w - - 0 1',
    toMove: 'white',
    concept: 'Rook belongs behind passed pawns',
    keyTakeaway: 'The rook is most active behind a passed pawn.',
    difficulty: 2,
    moves: [
      { move: 'Ra5', annotation: '?', explanation: 'Wrong! The rook should stay behind.' }
]
  },
  {
    id: 'rook-4',
    title: 'Active Rook',
    fen: '8/R7/4k3/4p3/8/4K3/8/3r4 w - - 0 1',
    toMove: 'white',
    concept: 'Rook activity is paramount',
    keyTakeaway: 'An active rook compensates for material.',
    difficulty: 2,
    moves: [
      { move: 'Ra6+', annotation: '!', explanation: 'Checking and activating!' },
      { move: 'Kf5', explanation: 'King moves.' },
      { move: 'Ra5', annotation: '!', explanation: 'Attacking the pawn!' }
]
  },
  {
    id: 'rook-5',
    title: 'Cut Off the King',
    fen: '8/8/4k3/8/3R4/8/4K3/8 w - - 0 1',
    toMove: 'white',
    concept: 'Use rook to cut off enemy king',
    keyTakeaway: 'Cutting off the king is a winning technique.',
    difficulty: 2,
    moves: [
      { move: 'Rd5', annotation: '!', explanation: 'Cutting off the king from the queenside!' },
      { move: 'Kf6', explanation: 'King retreats.' },
      { move: 'Ke3', annotation: '!', explanation: 'King advances!' }
]
  },
  {
    id: 'rook-6',
    title: 'Rook + Pawn vs Rook',
    fen: '8/8/4k3/4P3/R7/8/4K3/3r4 w - - 0 1',
    toMove: 'white',
    concept: 'Basic R+P vs R',
    keyTakeaway: 'Usually a win if the pawn is far advanced.',
    difficulty: 3,
    moves: [
      { move: 'Ke3', annotation: '!', explanation: 'King supports the pawn!' },
      { move: 'Re1+', explanation: 'Black checks.' },
      { move: 'Kd4', annotation: '!', explanation: 'King approaches!' }
]
  },
  {
    id: 'rook-7',
    title: 'Back Rank Defense',
    fen: '6k1/8/8/8/4P3/8/R7/6K1 w - - 0 1',
    toMove: 'white',
    concept: 'Defending from the back rank',
    keyTakeaway: 'Rooks on the back rank can give perpetual check.',
    difficulty: 2,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Pushing the pawn!' },
      { move: 'Kf7', explanation: 'King approaches.' },
      { move: 'Kf2', annotation: '!', explanation: 'King advances!' }
]
  },{
    id: 'rook-9',
    title: 'Rook + 2 Pawns vs Rook',
    fen: '8/8/4k3/4PP2/R7/8/4K3/3r4 w - - 0 1',
    toMove: 'white',
    concept: 'Two connected passers usually win',
    keyTakeaway: 'Connected passed pawns are very strong.',
    difficulty: 3,
    moves: [
      { move: 'f6', annotation: '!', explanation: 'Advancing!' },
      { move: 'Kd7', explanation: 'King retreats.' },
      { move: 'Ke3', annotation: '!', explanation: 'King supports!' }
]
  },
  {
    id: 'rook-10',
    title: 'Rook Activity vs Material',
    fen: '8/8/4k3/4p3/3R4/8/4K3/3r4 w - - 0 1',
    toMove: 'white',
    concept: 'Activity trumps material in rook endings',
    keyTakeaway: 'An active rook is worth more than extra pawns.',
    difficulty: 3,
    moves: [
      { move: 'Rd5', annotation: '!', explanation: 'Attacking the pawn!' },
      { move: 'Ke7', explanation: 'King defends.' },
      { move: 'Ke3', annotation: '!', explanation: 'Centralizing!' }
]
  },
  {
    id: 'rook-11',
    title: 'Seventh Rank Rook',
    fen: '8/R4pk1/8/8/8/8/5K2/3r4 w - - 0 1',
    toMove: 'white',
    concept: 'The power of the 7th rank',
    keyTakeaway: 'A rook on the 7th rank is very powerful.',
    difficulty: 2,
    moves: [
      { move: 'Rxf7+', annotation: '!', explanation: 'Winning the pawn!' },
      { move: 'Kg6', explanation: 'King moves.' },
      { move: 'Rf4', annotation: '!', explanation: 'Active rook!' }
]
  },{
    id: 'rook-13',
    title: 'Rook Lift',
    fen: '8/8/4k3/8/8/4R3/4K3/8 w - - 0 1',
    toMove: 'white',
    concept: 'Activating rook with a lift',
    keyTakeaway: 'Rooks can become more active with lifts.',
    difficulty: 2,
    moves: [
      { move: 'Ra3', annotation: '!', explanation: 'Preparing to attack!' },
      { move: 'Kd5', explanation: 'King centralizes.' },
      { move: 'Ra7', annotation: '!', explanation: 'Rook reaches the 7th!' }
]
  },{
    id: 'rook-15',
    title: 'Vancura Position',
    fen: '8/8/8/R4k2/5p2/8/8/5K2 w - - 0 1',
    toMove: 'white',
    concept: 'Drawing with rook on a-file',
    keyTakeaway: 'The Vancura position holds with the rook on the a-file.',
    difficulty: 4,
    moves: [
      { move: 'Ra1', annotation: '!', explanation: 'The drawing setup!' },
      { move: 'Ke4', explanation: 'King approaches.' },
      { move: 'Re1+', annotation: '!', explanation: 'Checking!' }
]
  },{
    id: 'rook-18',
    title: 'King Cut Off by Ranks',
    fen: '8/8/4R3/4k3/8/8/8/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Cutting off by ranks',
    keyTakeaway: 'Cutting off by ranks prevents the king from advancing.',
    difficulty: 2,
    moves: [
      { move: 'Ke2', annotation: '!', explanation: 'Approaching!' },
      { move: 'Kd4', explanation: 'King tries to escape.' },
      { move: 'Rd6', annotation: '!', explanation: 'Keeping the cut-off!' }
]
  },
  {
    id: 'rook-19',
    title: 'Rook Ending Zugzwang',
    fen: '8/8/4k3/R7/8/4K3/4p3/4r3 w - - 0 1',
    toMove: 'white',
    concept: 'Zugzwang in rook endings',
    keyTakeaway: 'Zugzwang is rare in rook endings due to rook mobility.',
    difficulty: 4,
    moves: [
      { move: 'Ra6+', annotation: '!', explanation: 'Checking!' },
      { move: 'Kf5', explanation: 'King moves.' },
      { move: 'Ra1', annotation: '!', explanation: 'Pinning the pawn!' }
]
  },
  {
    id: 'rook-20',
    title: 'Rook Ending Simplification',
    fen: '8/4k3/R7/4p3/4P3/8/8/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'When to simplify in rook endings',
    keyTakeaway: 'Simplify when it leads to a winning position.',
    difficulty: 3,
    moves: [
      { move: 'Ra7+', annotation: '!', explanation: 'Driving the king back!' },
      { move: 'Ke6', explanation: 'King moves.' },
      { move: 'Ra5', annotation: '!', explanation: 'Attacking the pawn!' }
]
  }
];

// MINOR PIECE ENDGAMES (41-70)
const minorPieceVariations: CourseVariation[] = [
  {
    id: 'minor-1',
    title: 'Bishop vs Knight: Open Position',
    fen: '8/8/4k3/8/3B4/4K3/8/4n3 w - - 0 1',
    toMove: 'white',
    concept: 'Bishop advantage in open positions',
    keyTakeaway: 'Bishops are better than knights in open positions.',
    difficulty: 3,
    moves: [
      { move: 'Bf6', annotation: '!', explanation: 'Controlling key squares!' },
      { move: 'Nc2', explanation: 'Knight tries to be active.' },
      { move: 'Kd3', annotation: '!', explanation: 'Attacking the knight!' }
]
  },{
    id: 'minor-5',
    title: 'Knight Outpost',
    fen: '8/p7/1p2k3/4N3/8/4K3/PP6/8 w - - 0 1',
    toMove: 'white',
    concept: 'Central knight outpost',
    keyTakeaway: 'A knight on an outpost dominates in the endgame.',
    difficulty: 2,
    moves: [
      { move: 'Kd4', annotation: '!', explanation: 'Supporting the knight!' },
      { move: 'Kd6', explanation: 'Black approaches.' },
      { move: 'Nf7+', annotation: '!', explanation: 'Fork!' }
]
  },{
    id: 'minor-7',
    title: 'Knight vs Pawns',
    fen: '8/8/4k3/8/8/2N5/PP6/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Knight supporting passed pawns',
    keyTakeaway: 'A knight supports pawns well from behind.',
    difficulty: 3,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'Centralizing!' },
      { move: 'Kd6', explanation: 'King approaches.' },
      { move: 'b4', annotation: '!', explanation: 'Advancing the pawns!' }
]
  },{
    id: 'minor-12',
    title: 'Knight Maneuvering',
    fen: '8/8/4k3/p7/P7/8/4N3/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Knight needs time to reach squares',
    keyTakeaway: 'Knights need multiple moves to reach destination squares.',
    difficulty: 2,
    moves: [
      { move: 'Nc3', annotation: '!', explanation: 'Repositioning!' },
      { move: 'Kd6', explanation: 'King approaches.' },
      { move: 'Nb5+', annotation: '!', explanation: 'Attacking the king!' }
]
  },
  {
    id: 'minor-13',
    title: 'Bishop Long Range',
    fen: '8/8/4k3/8/B7/8/8/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Bishop controls long diagonals',
    keyTakeaway: 'Bishops are strongest on long diagonals.',
    difficulty: 2,
    moves: [
      { move: 'Kd2', annotation: '!', explanation: 'Approaching!' },
      { move: 'Kd5', explanation: 'King centralizes.' },
      { move: 'Bb3+', annotation: '!', explanation: 'Check on the long diagonal!' }
]
  },
  {
    id: 'minor-14',
    title: 'Knight Domination',
    fen: '8/8/4k3/4N3/8/8/8/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Knight controls squares around king',
    keyTakeaway: 'A centralized knight controls many key squares.',
    difficulty: 2,
    moves: [
      { move: 'Kd2', annotation: '!', explanation: 'King approaches!' },
      { move: 'Kd5', explanation: 'King centralizes.' },
      { move: 'Nc6', annotation: '!', explanation: 'Forcing the king back!' }
]
  }
];

// QUEEN ENDGAMES (71-90)
const queenEndgameVariations: CourseVariation[] = [
  {
    id: 'queen-1',
    title: 'Queen vs Pawn',
    fen: '8/8/8/4k3/8/8/1p6/4K2Q w - - 0 1',
    toMove: 'white',
    concept: 'Queen vs pawn on 7th',
    keyTakeaway: 'Queen wins against most pawns on 7th rank.',
    difficulty: 3,
    moves: [
      { move: 'Qb7', annotation: '!', explanation: 'Preventing promotion!' },
      { move: 'Kd4', explanation: 'King approaches.' },
      { move: 'Qb4+', annotation: '!', explanation: 'Checking and gaining time!' }
]
  },
  {
    id: 'queen-2',
    title: 'Queen Checks',
    fen: '8/8/4k3/8/8/8/8/4K2Q w - - 0 1',
    toMove: 'white',
    concept: 'Using queen for perpetual',
    keyTakeaway: 'The queen can give perpetual check easily.',
    difficulty: 2,
    moves: [
      { move: 'Qe4+', annotation: '!', explanation: 'Check!' },
      { move: 'Kd6', explanation: 'King moves.' },
      { move: 'Qd4+', annotation: '!', explanation: 'Another check!' }
]
  },
  {
    id: 'queen-3',
    title: 'Queen vs Rook',
    fen: '8/8/4k3/8/8/8/r7/4K2Q w - - 0 1',
    toMove: 'white',
    concept: 'Queen usually beats rook',
    keyTakeaway: 'Queen wins against rook with proper technique.',
    difficulty: 3,
    moves: [
      { move: 'Qe4+', annotation: '!', explanation: 'Check!' },
      { move: 'Kd6', explanation: 'King moves.' },
      { move: 'Qd4+', annotation: '!', explanation: 'Centralizing with check!' }
]
  },{
    id: 'queen-7',
    title: 'Queen vs Two Pieces',
    fen: '8/8/4k3/8/3n4/8/b7/4K2Q w - - 0 1',
    toMove: 'white',
    concept: 'Queen vs minor pieces',
    keyTakeaway: 'Queen is usually stronger than two minor pieces.',
    difficulty: 3,
    moves: [
      { move: 'Qe4+', annotation: '!', explanation: 'Centralizing with check!' },
      { move: 'Kd6', explanation: 'King moves.' },
      { move: 'Qf4+', annotation: '!', explanation: 'Another check!' }
]
  },
  {
    id: 'queen-8',
    title: 'Queen Fortress',
    fen: '8/8/4k3/8/8/8/q7/4K2Q w - - 0 1',
    toMove: 'white',
    concept: 'Building a fortress with queen',
    keyTakeaway: 'Some queen endings can be held with a fortress.',
    difficulty: 4,
    moves: [
      { move: 'Qe4+', annotation: '!', explanation: 'Check!' },
      { move: 'Kf6', explanation: 'King moves.' },
      { move: 'Qd5', annotation: '!', explanation: 'Centralizing!' }
]
  },{
    id: 'queen-10',
    title: 'Perpetual Check',
    fen: '6k1/8/8/8/8/8/q7/4K2Q w - - 0 1',
    toMove: 'white',
    concept: 'Saving the game with perpetual',
    keyTakeaway: 'The queen can always give perpetual check.',
    difficulty: 2,
    moves: [
      { move: 'Qd5+', annotation: '!', explanation: 'Check!' },
      { move: 'Kh8', explanation: 'King retreats.' },
      { move: 'Qh5+', annotation: '!', explanation: 'Perpetual!' }
]
  }
];

// COMBINE ALL ENDGAME VARIATIONS
export const endgameVariations: CourseVariation[] = [
  ...kingPawnVariations,
  ...rookEndgameVariations,
  ...minorPieceVariations,
  ...queenEndgameVariations
];

// Export individual variation sets for course chapters
export const kingPawnEndgameVariations = kingPawnVariations;
export { rookEndgameVariations };
export const bishopEndgameVariations = minorPieceVariations.filter(v => 
  v.concept?.toLowerCase().includes('bishop') || 
  v.keyTakeaway?.toLowerCase().includes('bishop')
);
export const knightEndgameVariations = minorPieceVariations.filter(v => 
  v.concept?.toLowerCase().includes('knight') || 
  v.keyTakeaway?.toLowerCase().includes('knight')
);
export { queenEndgameVariations };
export const fundamentalMatesVariations: CourseVariation[] = kingPawnVariations.filter(v => 
  v.concept?.toLowerCase().includes('mate') || 
  v.keyTakeaway?.toLowerCase().includes('checkmate')
);

export default endgameVariations;
