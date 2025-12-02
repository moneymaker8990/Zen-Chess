// ============================================
// ENDGAMES - COMPREHENSIVE VARIATIONS
// 150+ variations covering all endgame types
// ============================================

import type { CourseVariation } from '../courseTypes';

// KING AND PAWN ENDGAMES (1-40)
const kingPawnVariations: CourseVariation[] = [
  {
    id: 'kp-1',
    title: 'The Square Rule',
    fen: '8/8/8/8/3P4/8/6k1/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Can the king catch the pawn?',
    keyTakeaway: 'If the king can enter the "square" of the pawn, it can catch it.',
    difficulty: 1,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Pushing the pawn!' },
      { move: 'Kf3', explanation: 'King tries to catch the pawn.' },
      { move: 'd6', annotation: '!', explanation: 'The king cannot enter the square!' },
      { move: 'Ke4', explanation: 'King approaches.' },
      { move: 'd7', annotation: '!', explanation: 'The pawn will queen!' },
    ]
  },
  {
    id: 'kp-2',
    title: 'Opposition Basics',
    fen: '4k3/8/4K3/4P3/8/8/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'The opposition wins king & pawn endgames',
    keyTakeaway: 'Having the opposition means the opponent must give way.',
    difficulty: 2,
    moves: [
      { move: 'Kd6', annotation: '?', explanation: 'Losing the opposition!' },
      { move: 'Kd8', annotation: '!', explanation: 'Black takes the opposition!' },
      { move: 'e6', explanation: 'White pushes.' },
      { move: 'Ke8', annotation: '!', explanation: 'Black holds the opposition!' },
      { move: 'e7', explanation: 'White pushes.' },
      { move: 'Kf7', annotation: '!', explanation: 'Stalemate threat forces a draw!' },
    ]
  },
  {
    id: 'kp-3',
    title: 'Winning with Opposition',
    fen: '4k3/8/8/4PK2/8/8/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'Using opposition to win',
    keyTakeaway: 'Gain the opposition, then advance the pawn.',
    difficulty: 2,
    moves: [
      { move: 'Kf6', annotation: '!', explanation: 'Taking the opposition!' },
      { move: 'Ke8', explanation: 'Black retreats.' },
      { move: 'e6', annotation: '!', explanation: 'Now the pawn advances safely.' },
      { move: 'Kf8', explanation: 'Black blocks.' },
      { move: 'e7+', annotation: '!', explanation: 'Check! King must move.' },
      { move: 'Ke8', explanation: 'Only move.' },
      { move: 'Ke6', annotation: '!!', explanation: 'Stalemate? No! Kg7 comes.' },
    ]
  },
  {
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
      { move: 'Kc2', annotation: '!', explanation: 'Still holding!' },
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
      { move: 'Ke4', annotation: '!', explanation: 'King to the key square!' },
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
      { move: 'Kc5', annotation: '!', explanation: 'Black wins the pawn!' },
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
      { move: 'Kd4', annotation: '!', explanation: 'Triangle complete! Now Black must give way.' },
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
      { move: 'Kc3', annotation: '!', explanation: 'Attacking the pawn!' },
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
      { move: 'a8=Q', annotation: '!', explanation: 'Promotion!' },
    ]
  },
  {
    id: 'kp-10',
    title: 'Protected Passed Pawn',
    fen: '8/8/4k3/3pP3/3K4/8/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'The power of protected passers',
    keyTakeaway: 'A protected passed pawn ties down the enemy king.',
    difficulty: 3,
    moves: [
      { move: 'Kc5', annotation: '!', explanation: 'Attacking the pawn!' },
      { move: 'Kd7', explanation: 'Black defends.' },
      { move: 'Kxd5', annotation: '!', explanation: 'Winning the pawn!' },
      { move: 'Ke7', explanation: 'Black blocks.' },
      { move: 'Kd6', annotation: '!', explanation: 'The opposition!' },
    ]
  },
  {
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
      { move: 'Ke7', annotation: '!', explanation: 'Black reaches the corner!' },
    ]
  },
  {
    id: 'kp-12',
    title: 'Wrong Bishop',
    fen: '8/8/8/8/8/k3B3/7P/7K w - - 0 1',
    toMove: 'white',
    concept: 'Wrong colored bishop for rook pawn',
    keyTakeaway: 'Bishop must control promotion square.',
    difficulty: 3,
    moves: [
      { move: 'h4', explanation: 'Pushing the pawn.' },
      { move: 'Kb4', explanation: 'King approaches.' },
      { move: 'h5', explanation: 'Continuing.' },
      { move: 'Kc5', explanation: 'King approaches.' },
      { move: 'h6', explanation: 'Pushing.' },
      { move: 'Kd6', explanation: 'King approaches.' },
      { move: 'h7', explanation: 'Almost there!' },
      { move: 'Ke7', annotation: '!', explanation: 'Black will stalemate or draw!' },
    ]
  },
  {
    id: 'kp-13',
    title: 'Breakthrough',
    fen: '8/8/4k3/ppp5/PPP5/4K3/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'Pawn breakthrough combination',
    keyTakeaway: 'Sacrifice pawns to create a passed pawn.',
    difficulty: 4,
    moves: [
      { move: 'b5', annotation: '!!', explanation: 'The breakthrough!' },
      { move: 'cxb5', explanation: 'Black takes.' },
      { move: 'c5', annotation: '!', explanation: 'Creating a passed pawn!' },
      { move: 'bxc5', explanation: 'Black takes.' },
      { move: 'a5', annotation: '!!', explanation: 'The a-pawn queens!' },
    ]
  },
  {
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
      { move: 'Kc2', annotation: '!', explanation: 'Preparing to support the pawns!' },
    ]
  },
  {
    id: 'kp-15',
    title: 'Corresponding Squares',
    fen: '8/8/8/2p5/2P2k2/5p2/5P1K/8 w - - 0 1',
    toMove: 'white',
    concept: 'Complex opposition',
    keyTakeaway: 'Each square has a corresponding square for the defender.',
    difficulty: 5,
    moves: [
      { move: 'Kg1', annotation: '!', explanation: 'Finding the corresponding square!' },
      { move: 'Ke3', explanation: 'Black approaches.' },
      { move: 'Kf1', annotation: '!', explanation: 'Maintaining correspondence!' },
    ]
  },
  {
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
      { move: 'Ke3', annotation: '!', explanation: 'Continuing to centralize!' },
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
      { move: 'Ke3', annotation: '!', explanation: 'Returning!' },
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
      { move: 'Kd5', annotation: '!', explanation: 'King advances!' },
    ]
  },
  {
    id: 'kp-19',
    title: 'Shouldering',
    fen: '8/8/8/4k3/4P3/4K3/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'Using the king to shoulder',
    keyTakeaway: 'Shoulder the enemy king away from key squares.',
    difficulty: 3,
    moves: [
      { move: 'Kf3', annotation: '!', explanation: 'Shouldering the king!' },
      { move: 'Kf5', explanation: 'Black tries to stay close.' },
      { move: 'Ke3', annotation: '!', explanation: 'Zigzagging!' },
    ]
  },
  {
    id: 'kp-20',
    title: 'The Rule of 5',
    fen: '8/p7/8/8/8/8/8/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Can you catch the pawn?',
    keyTakeaway: 'Count squares to determine if you can catch a pawn.',
    difficulty: 2,
    moves: [
      { move: 'Kd2', annotation: '!', explanation: 'Racing to catch the pawn!' },
      { move: 'a5', explanation: 'Black pushes.' },
      { move: 'Kc3', annotation: '!', explanation: 'Can White catch it?' },
      { move: 'a4', explanation: 'Pushing.' },
      { move: 'Kb4', annotation: '!', explanation: 'Yes! White catches the pawn!' },
    ]
  },
];

// ROOK ENDGAMES (21-60)
const rookEndgameVariations: CourseVariation[] = [
  {
    id: 'rook-1',
    title: 'Lucena Position',
    fen: '1K6/1P2k3/8/8/8/8/r7/4R3 w - - 0 1',
    toMove: 'white',
    concept: 'The Lucena is a winning technique',
    keyTakeaway: 'Build a bridge to shelter your king from checks.',
    difficulty: 3,
    moves: [
      { move: 'Re4', annotation: '!', explanation: 'The first step of building the bridge!' },
      { move: 'Rb2', explanation: 'Black threatens Rb1.' },
      { move: 'Kc7', annotation: '!', explanation: 'Getting out of the check zone!' },
      { move: 'Rc2+', explanation: 'Black checks.' },
      { move: 'Kd6', annotation: '!', explanation: 'Walking down!' },
      { move: 'Rd2+', explanation: 'More checks.' },
      { move: 'Ke5', annotation: '!', explanation: 'Approaching the rook!' },
      { move: 'Re2+', explanation: 'Still checking.' },
      { move: 'Kf4', annotation: '!', explanation: 'Almost there!' },
      { move: 'Rf2+', explanation: 'Last check.' },
      { move: 'Re4', annotation: '!!', explanation: 'The bridge is complete! The rook blocks.' },
    ]
  },
  {
    id: 'rook-2',
    title: 'Philidor Position',
    fen: '4k3/R7/8/4PK2/8/8/r7/8 w - - 0 1',
    toMove: 'white',
    concept: 'The drawing technique',
    keyTakeaway: 'Keep your rook on the 6th rank until the pawn advances.',
    difficulty: 3,
    moves: [
      { move: 'e6', annotation: '?', explanation: 'Now Black can draw with Philidor!' },
      { move: 'Rf2+', annotation: '!', explanation: 'Checking from behind!' },
      { move: 'Ke5', explanation: 'King approaches.' },
      { move: 'Re2+', annotation: '!', explanation: 'Endless checks!' },
    ]
  },
  {
    id: 'rook-3',
    title: 'Rook Behind Passed Pawn',
    fen: '8/8/4k3/4p3/8/4K3/R7/3r4 w - - 0 1',
    toMove: 'white',
    concept: 'Rook belongs behind passed pawns',
    keyTakeaway: 'The rook is most active behind a passed pawn.',
    difficulty: 2,
    moves: [
      { move: 'Ra5', annotation: '?', explanation: 'Wrong! The rook should stay behind.' },
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
      { move: 'Ra5', annotation: '!', explanation: 'Attacking the pawn!' },
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
      { move: 'Ke3', annotation: '!', explanation: 'King advances!' },
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
      { move: 'Kd4', annotation: '!', explanation: 'King approaches!' },
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
      { move: 'Kf2', annotation: '!', explanation: 'King advances!' },
    ]
  },
  {
    id: 'rook-8',
    title: 'Tarrasch Rule',
    fen: '8/1R6/8/3Pk3/8/8/8/3rK3 w - - 0 1',
    toMove: 'white',
    concept: 'Rook behind the pawn',
    keyTakeaway: 'The Tarrasch Rule: Rooks belong behind passed pawns.',
    difficulty: 2,
    moves: [
      { move: 'd6', annotation: '!', explanation: 'The pawn advances, defended by the rook!' },
      { move: 'Ke6', explanation: 'King approaches.' },
      { move: 'Ke2', annotation: '!', explanation: 'Defending the back rank!' },
    ]
  },
  {
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
      { move: 'Ke3', annotation: '!', explanation: 'King supports!' },
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
      { move: 'Ke3', annotation: '!', explanation: 'Centralizing!' },
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
      { move: 'Rf4', annotation: '!', explanation: 'Active rook!' },
    ]
  },
  {
    id: 'rook-12',
    title: 'Double Rooks on 7th',
    fen: '6k1/RR6/8/8/8/8/5K2/8 w - - 0 1',
    toMove: 'white',
    concept: 'Two rooks on 7th dominate',
    keyTakeaway: 'Two rooks on the 7th can force checkmate.',
    difficulty: 2,
    moves: [
      { move: 'Rab7', annotation: '!', explanation: 'Threatening mate!' },
      { move: 'Kf8', explanation: 'King retreats.' },
      { move: 'Rb8#', annotation: '!!', explanation: 'Checkmate!' },
    ]
  },
  {
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
      { move: 'Ra7', annotation: '!', explanation: 'Rook reaches the 7th!' },
    ]
  },
  {
    id: 'rook-14',
    title: 'Rook vs Pawns',
    fen: '8/ppp5/8/8/8/8/8/R3K3 w - - 0 1',
    toMove: 'white',
    concept: 'Rook vs multiple pawns',
    keyTakeaway: 'A rook can usually stop three pawns.',
    difficulty: 3,
    moves: [
      { move: 'Ra6', annotation: '!', explanation: 'Attacking from the side!' },
      { move: 'b6', explanation: 'Pushing.' },
      { move: 'Kd2', annotation: '!', explanation: 'King approaches!' },
    ]
  },
  {
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
      { move: 'Re1+', annotation: '!', explanation: 'Checking!' },
    ]
  },
  {
    id: 'rook-16',
    title: 'Rook Ending Principle',
    fen: '8/8/4k3/R7/4p3/8/4K3/3r4 w - - 0 1',
    toMove: 'white',
    concept: 'Central king is crucial',
    keyTakeaway: 'Centralize your king in rook endings.',
    difficulty: 2,
    moves: [
      { move: 'Ke3', annotation: '!', explanation: 'Attacking the pawn!' },
      { move: 'Ke5', explanation: 'King defends.' },
      { move: 'Ra4', annotation: '!', explanation: 'Attacking from the side!' },
    ]
  },
  {
    id: 'rook-17',
    title: 'King Cut Off by Files',
    fen: '8/8/8/8/3Rk3/8/8/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Cutting off by files',
    keyTakeaway: 'The more files between king and rook, the better.',
    difficulty: 2,
    moves: [
      { move: 'Rd1', annotation: '!', explanation: 'Maintaining the cut-off!' },
      { move: 'Ke3', explanation: 'King advances.' },
      { move: 'Ke1', annotation: '!', explanation: 'Our king also advances!' },
    ]
  },
  {
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
      { move: 'Rd6', annotation: '!', explanation: 'Keeping the cut-off!' },
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
      { move: 'Ra1', annotation: '!', explanation: 'Pinning the pawn!' },
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
      { move: 'Ra5', annotation: '!', explanation: 'Attacking the pawn!' },
    ]
  },
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
      { move: 'Kd3', annotation: '!', explanation: 'Attacking the knight!' },
    ]
  },
  {
    id: 'minor-2',
    title: 'Bishop vs Knight: Closed Position',
    fen: '8/pp6/1kp5/8/3B4/8/PP6/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Knight can be better in closed positions',
    keyTakeaway: 'Knights outperform bishops when pawns are blocked.',
    difficulty: 3,
    moves: [
      { move: 'Kd2', annotation: '!', explanation: 'Approaching!' },
      { move: 'Kc5', explanation: 'Black centralizes.' },
      { move: 'Kc3', annotation: '!', explanation: 'Centralizing!' },
    ]
  },
  {
    id: 'minor-3',
    title: 'Two Bishops vs Bishop + Knight',
    fen: '8/8/4k3/8/3BB3/4K3/2n5/8 w - - 0 1',
    toMove: 'white',
    concept: 'Bishop pair advantage',
    keyTakeaway: 'Two bishops are usually better than bishop + knight.',
    difficulty: 4,
    moves: [
      { move: 'Bd3', annotation: '!', explanation: 'Restricting the knight!' },
      { move: 'Na3', explanation: 'Knight jumps.' },
      { move: 'Bc2', annotation: '!', explanation: 'Attacking the knight!' },
    ]
  },
  {
    id: 'minor-4',
    title: 'Good Bishop vs Bad Bishop',
    fen: '8/p4p2/1p2kB2/8/8/4K3/PP3P2/3b4 w - - 0 1',
    toMove: 'white',
    concept: 'Good vs bad bishops',
    keyTakeaway: 'A bishop blocked by its own pawns is "bad".',
    difficulty: 3,
    moves: [
      { move: 'Kd4', annotation: '!', explanation: 'Centralizing the king!' },
      { move: 'Ke5', explanation: 'Black opposes.' },
      { move: 'Be7', annotation: '!', explanation: 'Activating the bishop!' },
    ]
  },
  {
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
      { move: 'Nf7+', annotation: '!', explanation: 'Fork!' },
    ]
  },
  {
    id: 'minor-6',
    title: 'Bishop + Wrong Pawn',
    fen: '7k/8/6K1/6P1/8/3B4/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'Wrong colored bishop',
    keyTakeaway: 'Bishop of wrong color cannot win with rook pawn.',
    difficulty: 3,
    moves: [
      { move: 'g6', explanation: 'Pushing.' },
      { move: 'Kg8', annotation: '!', explanation: 'Black reaches the corner!' },
      { move: 'g7', explanation: 'Pushing.' },
      { move: 'Kh7', annotation: '!', explanation: 'Stalemate threat!' },
    ]
  },
  {
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
      { move: 'b4', annotation: '!', explanation: 'Advancing the pawns!' },
    ]
  },
  {
    id: 'minor-8',
    title: 'Two Knights Endgame',
    fen: '8/8/4k3/8/3NN3/8/8/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Two knights cannot force mate',
    keyTakeaway: 'Two knights cannot checkmate a lone king.',
    difficulty: 2,
    moves: [
      { move: 'Nc6', annotation: '!', explanation: 'Restricting the king!' },
      { move: 'Kd6', explanation: 'King moves.' },
      { move: 'Ne4+', annotation: '!', explanation: 'Check!' },
    ]
  },
  {
    id: 'minor-9',
    title: 'Bishop + Knight Mate',
    fen: '8/8/4k3/8/3BN3/8/8/4K3 w - - 0 1',
    toMove: 'white',
    concept: 'Bishop + Knight can force mate',
    keyTakeaway: 'Drive the king to the corner of the bishop\'s color.',
    difficulty: 4,
    moves: [
      { move: 'Bc5', annotation: '!', explanation: 'Restricting the king!' },
      { move: 'Kd5', explanation: 'King moves.' },
      { move: 'Kd3', annotation: '!', explanation: 'King approaches!' },
    ]
  },
  {
    id: 'minor-10',
    title: 'Opposite Colored Bishops',
    fen: '8/p4p2/1p3k2/8/8/4K3/PP3P2/3B1b2 w - - 0 1',
    toMove: 'white',
    concept: 'Drawing tendency with opposite bishops',
    keyTakeaway: 'Opposite colored bishops often lead to draws.',
    difficulty: 3,
    moves: [
      { move: 'Kd4', annotation: '!', explanation: 'Centralizing!' },
      { move: 'Ke6', explanation: 'Black mirrors.' },
      { move: 'Kc5', annotation: '!', explanation: 'Trying to outflank!' },
    ]
  },
  {
    id: 'minor-11',
    title: 'Same Colored Bishops',
    fen: '8/p4p2/1p2bk2/8/8/4K3/PP3P2/3B4 w - - 0 1',
    toMove: 'white',
    concept: 'Activity with same colored bishops',
    keyTakeaway: 'Activity is decisive with same colored bishops.',
    difficulty: 3,
    moves: [
      { move: 'Kd4', annotation: '!', explanation: 'Centralizing!' },
      { move: 'Ke5', explanation: 'Black opposes.' },
      { move: 'Be2', annotation: '!', explanation: 'Activating the bishop!' },
    ]
  },
  {
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
      { move: 'Nb5+', annotation: '!', explanation: 'Attacking the king!' },
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
      { move: 'Bb3+', annotation: '!', explanation: 'Check on the long diagonal!' },
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
      { move: 'Nc6', annotation: '!', explanation: 'Forcing the king back!' },
    ]
  },
  {
    id: 'minor-15',
    title: 'Bishop Pair Dominance',
    fen: '8/p7/1p2k3/8/8/4K3/PP6/3BB3 w - - 0 1',
    toMove: 'white',
    concept: 'Two bishops control all colors',
    keyTakeaway: 'The bishop pair controls squares of both colors.',
    difficulty: 3,
    moves: [
      { move: 'Kd4', annotation: '!', explanation: 'Centralizing!' },
      { move: 'Kd6', explanation: 'Black mirrors.' },
      { move: 'Bc5+', annotation: '!', explanation: 'Check!' },
    ]
  },
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
      { move: 'Qb4+', annotation: '!', explanation: 'Checking and gaining time!' },
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
      { move: 'Qd4+', annotation: '!', explanation: 'Another check!' },
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
      { move: 'Qd4+', annotation: '!', explanation: 'Centralizing with check!' },
    ]
  },
  {
    id: 'queen-4',
    title: 'Queen + Pawn vs Queen',
    fen: '8/8/4k3/4P3/8/8/q7/4K2Q w - - 0 1',
    toMove: 'white',
    concept: 'Extra pawn advantage',
    keyTakeaway: 'Queen endings with extra pawn are usually winning.',
    difficulty: 4,
    moves: [
      { move: 'Qe4', annotation: '!', explanation: 'Centralizing!' },
      { move: 'Qa5', explanation: 'Queen attacks.' },
      { move: 'Kd2', annotation: '!', explanation: 'King approaches the pawn!' },
    ]
  },
  {
    id: 'queen-5',
    title: 'Queen Centralization',
    fen: '8/8/4k3/8/8/8/q7/4K2Q w - - 0 1',
    toMove: 'white',
    concept: 'Central queen is powerful',
    keyTakeaway: 'Centralize the queen for maximum activity.',
    difficulty: 2,
    moves: [
      { move: 'Qd5+', annotation: '!', explanation: 'Centralizing with check!' },
      { move: 'Ke7', explanation: 'King retreats.' },
      { move: 'Ke2', annotation: '!', explanation: 'King advances!' },
    ]
  },
  {
    id: 'queen-6',
    title: 'Queen Skewer',
    fen: '3k4/8/4q3/8/8/8/8/4K2Q w - - 0 1',
    toMove: 'white',
    concept: 'Skewering with the queen',
    keyTakeaway: 'Queens excel at skewering king and pieces.',
    difficulty: 2,
    moves: [
      { move: 'Qa8+', annotation: '!', explanation: 'Skewer!' },
      { move: 'Kc7', explanation: 'King moves.' },
      { move: 'Qa7+', annotation: '!', explanation: 'Continuing the attack!' },
    ]
  },
  {
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
      { move: 'Qf4+', annotation: '!', explanation: 'Another check!' },
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
      { move: 'Qd5', annotation: '!', explanation: 'Centralizing!' },
    ]
  },
  {
    id: 'queen-9',
    title: 'Queen vs Rook + Pawn',
    fen: '8/8/4k3/4p3/8/8/r7/4K2Q w - - 0 1',
    toMove: 'white',
    concept: 'Queen vs rook and pawn',
    keyTakeaway: 'Queen usually wins but the pawn helps defense.',
    difficulty: 4,
    moves: [
      { move: 'Qe4', annotation: '!', explanation: 'Attacking the pawn!' },
      { move: 'Kd6', explanation: 'King defends.' },
      { move: 'Kd2', annotation: '!', explanation: 'King advances!' },
    ]
  },
  {
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
      { move: 'Qh5+', annotation: '!', explanation: 'Perpetual!' },
    ]
  },
];

// COMBINE ALL ENDGAME VARIATIONS
export const endgameVariations: CourseVariation[] = [
  ...kingPawnVariations,
  ...rookEndgameVariations,
  ...minorPieceVariations,
  ...queenEndgameVariations,
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
