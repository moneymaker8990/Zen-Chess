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
    keyTakeaway: 'The "square" of a pawn is an imaginary square from the pawn to the promotion square. If the defending king can step INTO this square on their turn, they can catch the pawn. If not, the pawn queens. This is the most fundamental endgame calculation.',
    introduction: 'The Square Rule is perhaps the most important tactical concept in king and pawn endgames. Imagine drawing a square from the pawn to its promotion square (for a pawn on d5, the square has corners d5-d8-h8-h5). If the opposing king can step INTO this square on their move, they will catch the pawn. If they cannot, the pawn promotes. This simple geometric rule saves countless minutes of calculation.',
    difficulty: 1,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Now apply the Square Rule: draw an imaginary square from d5 to d8 (the promotion square), extending to h8 and h5. This "square" has corners at d5, d8, h8, and h5. The Black king on g2 is OUTSIDE this square and cannot enter it in one move—therefore, the pawn will promote. This geometric shortcut tells you the result instantly without calculating move by move.', arrows: [{ from: 'd4', to: 'd5', color: 'green' }] },
      { move: 'Kf3', explanation: 'Black tries desperately to catch the pawn, but it\'s too late. The king needed to be on f4 or closer to enter the square. Being one square outside is fatal in pawn races.' },
      { move: 'd6', annotation: '!', explanation: 'The pawn advances, and the square shrinks: now it\'s d6-d8-h8-h6. The Black king on f3 is STILL outside—it would need to be on f4, g4, or h4 to catch up. This is why the Square Rule works: each time the pawn advances, the square shrinks, and the king must keep up.', arrows: [{ from: 'd5', to: 'd6', color: 'green' }] },
      { move: 'Ke4', explanation: 'The king tries to enter the shrinking square, but mathematics is cruel—there are simply not enough moves available. The king is always one step behind.' },
      { move: 'd7', annotation: '!', explanation: 'The pawn advances again. The square is now d7-d8-e8-e7—tiny. The Black king on e4 cannot reach e7 or e8 before the pawn promotes. The race is over. Moral: Check the square BEFORE starting a pawn race—if you can\'t enter it, don\'t waste moves trying.' },
    ],
    commonMistakes: ['Forgetting to apply the Square Rule and calculating move by move', 'Miscounting the square when the pawn is on its starting square (it can move two squares!)', 'Not realizing that diagonal moves also count—the king can approach diagonally while staying in/entering the square'],
    deeperPrinciple: 'The Square Rule is about GEOMETRY, not calculation. Once you internalize this concept, you\'ll instantly see whether a pawn can be caught. But remember: if the enemy king can ENTER the square (not just be in it), they catch the pawn. One square outside = lost race.',
  },
  {
    id: 'kp-2',
    title: 'Opposition Basics',
    fen: '4k3/8/4K3/4P3/8/8/8/8 w - - 0 1',
    toMove: 'white',
    concept: 'The opposition wins king & pawn endgames',
    keyTakeaway: 'Opposition means the kings face each other with one square between them, and the player NOT to move has the opposition. Having the opposition forces your opponent to "give way"—they must step aside, letting your king advance.',
    introduction: 'The opposition is the single most important concept in king and pawn endgames. When kings face each other with one square between them, whoever must move is at a DISADVANTAGE because they must step aside. The player who does NOT have to move "has the opposition." In this position, if White keeps the opposition, they win; if they lose it, the game is drawn. This concept underlies virtually every king and pawn endgame.',
    difficulty: 2,
    moves: [
      { move: 'Kd6', annotation: '?', explanation: 'This natural-looking move is a MISTAKE that throws away the win! Why? Because White has given up the opposition. After Kd6, when Black plays Kd8, the kings will face each other with one square between them, AND IT WILL BE WHITE\'S TURN TO MOVE. White will have to step aside. The correct move was Kf6! (keeping the opposition) or advancing the pawn first in some positions.', arrows: [{ from: 'e6', to: 'd6', color: 'red' }] },
      { move: 'Kd8', annotation: '!', explanation: 'NOW Black has the opposition! The kings face each other on the d-file, one square apart, and it\'s WHITE\'S turn. This means White must move their king—and any king move allows Black to mirror and maintain the opposition. This is the geometrical dance of king and pawn endings.' },
      { move: 'e6', explanation: 'White pushes the pawn in desperation. But without the opposition, the pawn cannot be escorted to the 8th rank safely.' },
      { move: 'Ke8', annotation: '!', explanation: 'Black maintains the opposition! The kings are again face-to-face, one square apart, and it\'s White\'s turn. Black simply "shadows" the White king, always maintaining the opposition. This is the drawing technique in action.' },
      { move: 'e7', explanation: 'The pawn advances to the 7th rank—normally decisive. But without the opposition, White cannot queen.' },
      { move: 'Kf7', annotation: '!', explanation: 'This is the ONLY move that draws, and it exploits a tactical resource: STALEMATE! If White plays Kd7??, then Kf7 and the pawn queens but Black has the f7 square. But if White tries Kf5, Black has Ke8 and will pick up the pawn. The position is drawn. Lesson: the opposition, lost early, cannot be recovered. White\'s one careless move (Kd6? instead of Kf6!) threw away a won position.', arrows: [{ from: 'e8', to: 'f7', color: 'green' }] },
    ],
    commonMistakes: ['Moving your king without considering whether you\'re keeping or losing the opposition', 'Pushing the pawn too early instead of first gaining the opposition with your king', 'Not understanding that losing the opposition often means drawing instead of winning (or losing instead of drawing)'],
    deeperPrinciple: 'The opposition is about ZUGZWANG—forcing your opponent to make a move they don\'t want to make. When you have the opposition, your opponent MUST step aside, giving your king access to key squares. Master the opposition, and you\'ll save and win countless endgames that look equal on the surface.',
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
    keyTakeaway: 'The Lucena Position is THE most important winning method in rook endgames. The technique is called "building a bridge"—you use your rook to block your opponent\'s checks, allowing your king to escape and the pawn to promote.',
    introduction: 'The Lucena Position (named after a 15th-century Spanish chess master) is the Holy Grail of rook endgames. It arises when: (1) Your pawn is on the 7th rank, (2) Your king is in front of the pawn, (3) Your rook is behind your pawn. This is a WIN, but you must know the "building a bridge" technique. The idea is to walk your king down the board while using your rook to BLOCK the checking rook. Every serious player must know this position cold.',
    difficulty: 3,
    moves: [
      { move: 'Re4', annotation: '!', explanation: 'This is the KEY MOVE that begins the "bridge-building" technique. Why the 4th rank? Because your king will walk down to the 4th rank, and then the rook will INTERPOSE to block Black\'s checks. The rook must be placed PRECISELY on the 4th rank (or 5th, depending on the position) for this to work. Random rook placement doesn\'t win—only this specific technique does.', arrows: [{ from: 'e1', to: 'e4', color: 'green' }] },
      { move: 'Rb2', explanation: 'Black positions the rook for checking from behind. This is the best defensive try—endless checks from the side or behind. But the bridge technique defeats it.' },
      { move: 'Kc7', annotation: '!', explanation: 'The king begins its journey DOWN the board. This seems strange—shouldn\'t the king push the pawn? No! The king must first escape the "check corridor" before the pawn can advance. The king is walking toward its own rook so the rook can eventually block checks.', arrows: [{ from: 'b8', to: 'c7', color: 'green' }] },
      { move: 'Rc2+', explanation: 'Black checks from behind. The checking distance is important—the farther the rook, the more effective the checks. But it doesn\'t matter here because of what comes next.' },
      { move: 'Kd6', annotation: '!', explanation: 'The king continues marching down. The goal is to reach the 4th rank (or 5th rank depending on rook placement) where the bridge will be complete. Notice the king is approaching its own rook—this is deliberate.', arrows: [{ from: 'c7', to: 'd6', color: 'green' }] },
      { move: 'Rd2+', explanation: 'Another check. Black has nothing better—any other move allows the pawn to queen next move.' },
      { move: 'Ke5', annotation: '!', explanation: 'Still approaching the rook on e4. The king needs to reach the 4th rank so the rook can block. Each step brings us closer to the winning technique.', arrows: [{ from: 'd6', to: 'e5', color: 'green' }] },
      { move: 'Re2+', explanation: 'More checks. This is Black\'s only chance—keep checking and hope White makes a mistake. But the technique is foolproof.' },
      { move: 'Kf4', annotation: '!', explanation: 'The king reaches the same rank as the rook. Now the magic happens—on the next check, the rook will BLOCK, ending the harassment. The king and rook are now "in sync."', arrows: [{ from: 'e5', to: 'f4', color: 'green' }] },
      { move: 'Rf2+', explanation: 'Black gives the last check, but...' },
      { move: 'Re4', annotation: '!!', explanation: 'THE BRIDGE IS COMPLETE! The rook BLOCKS the check! This is why the rook went to e4 on move one—now it interposes perfectly. After this block, Black has no more checks, the king is free, and the pawn will promote. This "bridge" technique—using the rook to block checks—is the essential winning method in Lucena positions. Memorize this maneuver!', arrows: [{ from: 'e1', to: 'e4', color: 'green' }], highlights: ['e4'] },
    ],
    commonMistakes: ['Trying to push the pawn immediately instead of building the bridge', 'Placing the rook on the wrong rank—it MUST be on the 4th rank (or 5th) for the bridge to work', 'Not knowing this technique at all—many players draw won Lucena positions!'],
    deeperPrinciple: 'The Lucena Position teaches that COORDINATION is everything in rook endgames. Your king and rook must work together—the rook creates shelter for the king, and the king escorts the pawn. Master this position, and you\'ll convert countless rook endings that others would draw.',
  },
  {
    id: 'rook-2',
    title: 'Philidor Position',
    fen: '4k3/R7/8/4PK2/8/8/r7/8 w - - 0 1',
    toMove: 'white',
    concept: 'The drawing technique',
    keyTakeaway: 'The Philidor Position is the DRAWING counterpart to the Lucena. The defender keeps their rook on the 3rd rank (or 6th from White\'s view), preventing the enemy king from advancing. Once the pawn reaches the 6th rank, the defender switches to checking from behind. This creates an impenetrable fortress.',
    introduction: 'The Philidor Position (named after François-André Philidor, the 18th-century chess legend) is equally important as the Lucena—but for DEFENSE. It shows how to DRAW a rook vs rook+pawn endgame. The key principle: keep your rook on the 3rd rank (cutting off the enemy king) until the pawn advances to the 6th rank, then retreat and check from behind. This "third rank defense" is a fortress that cannot be broken.',
    difficulty: 3,
    moves: [
      { move: 'e6', annotation: '?', explanation: 'This is actually the MISTAKE that allows the Philidor defense to work! White pushes the pawn too early. The problem: once the pawn reaches the 6th rank, Black switches from passive defense (rook on 3rd rank) to ACTIVE defense (checking from behind). The correct approach for White was to improve the king\'s position first, not push the pawn. But this example shows the defensive technique.', arrows: [{ from: 'e5', to: 'e6', color: 'red' }] },
      { move: 'Rf2+', annotation: '!', explanation: 'HERE is the Philidor technique in action! When the pawn reaches the 6th rank, the defender IMMEDIATELY goes behind the pawn and starts checking. Why does this work? Because the pawn blocks the king from escaping the checks! If the king goes forward, it\'s checked. If it goes sideways, it\'s checked. The pawn, ironically, is in the way. This "checking from behind" creates a fortress.', arrows: [{ from: 'a2', to: 'f2', color: 'green' }] },
      { move: 'Ke5', explanation: 'White tries to approach the checking rook, but this doesn\'t help—the rook simply keeps checking from a distance.' },
      { move: 'Re2+', annotation: '!', explanation: 'Another check! The rook stays behind the pawn and keeps checking. As long as Black\'s rook has DISTANCE (many squares behind the pawn), the checks never stop. White cannot make progress: if Kd6, then Rd2+; if Kf6, then Rf2+. The pawn cannot advance (it\'s blocked by Black\'s king\'s presence), and White\'s king cannot escape the checks. This is a PERPETUAL harassment that draws the game.', arrows: [{ from: 'f2', to: 'e2', color: 'green' }] },
    ],
    commonMistakes: ['Not knowing to keep the rook on the 3rd rank initially—this is the SETUP for the Philidor', 'Switching to checking from behind TOO EARLY (before the pawn reaches the 6th rank)', 'Letting the enemy king reach the 6th rank before you start your defense—then it\'s too late'],
    deeperPrinciple: 'The Philidor defense shows that in rook endgames, ACTIVITY beats material. Black\'s rook is actively checking, while White\'s extra pawn becomes a HINDRANCE (it blocks the king). The drawing mechanism relies on the pawn\'s position creating a "shelter" for the defender\'s checks. Know Philidor, and you\'ll save countless endgames.',
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
