// ============================================
// PAWN STRUCTURE - COMPREHENSIVE VARIATIONS
// 60 variations covering major pawn structures
// ============================================

import type { CourseVariation } from '../courseTypes';

export const pawnStructureVariations: CourseVariation[] = [
  // CARLSBAD STRUCTURE (1-10)
  {
    id: 'ps-1',
    title: 'The Carlsbad Structure',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PPQ2PPP/R1B1KB1R w KQ - 0 8',
    toMove: 'white',
    concept: 'The classic minority attack structure',
    keyTakeaway: 'The Carlsbad structure arises from the Queen\'s Gambit Declined. White\'s plan is the MINORITY ATTACK: using fewer queenside pawns (2) to attack more (3), creating permanent weaknesses. This is one of chess\'s most important strategic concepts.',
    introduction: 'The Carlsbad structure (named after a famous 1929 tournament) is one of the most instructive pawn structures in chess. It teaches a profound lesson: you can use FEWER pawns to attack MORE pawns and create weaknesses. White\'s plan is b4-b5, attacking the c6 pawn with 2 pawns against 3. If Black takes, they get an isolated c-pawn; if they don\'t take, they get a backward c-pawn on an open file. Either way, White creates a target.',
    difficulty: 4,
    moves: [
      { move: 'a3', annotation: '!', explanation: 'This modest pawn move is the START of the minority attack. Why a3 first? (1) It prepares b4 without allowing ...Nb4 to harass the queen, (2) It creates a potential escape square for the bishop on a2 after Bd3, (3) It ensures that after b4-b5, if Black plays ...cxb5, White can recapture with axb5, opening the a-file for the rook. Every move in the minority attack has a purpose.', arrows: [{ from: 'b2', to: 'b4', color: 'yellow' }] },
      { move: 'O-O', explanation: 'Black castles, completing development. Black\'s counter-plan is typically kingside play with ...Ne4, ...f5, or transferring pieces to attack White\'s king. The Carlsbad is a RACE: White attacks the queenside, Black attacks the kingside.' },
      { move: 'b4', annotation: '!', explanation: 'The minority attack is LAUNCHED! This pawn will advance to b5, attacking the c6 pawn. The genius of the minority attack: White uses 2 pawns (a and b) to attack 3 pawns (a, b, c). This seems counterintuitive—shouldn\'t more pawns win? But the STRUCTURE matters: b5 attacks c6, and Black cannot defend with pawns alone.', arrows: [{ from: 'b4', to: 'b5', color: 'yellow' }] },
      { move: 'cxb4', explanation: 'Black captures. But this has given White exactly what they wanted: an open a-file for the rook and a clear path to attack c6.' },
      { move: 'axb4', explanation: 'Recapturing toward the center (and opening the a-file). The rook on a1 will become a powerful attacker. Notice how White\'s "minority" of 2 pawns has already created an open file—this is the paradox of the minority attack.' },
      { move: 'Bd7', explanation: 'Black develops the last minor piece, preparing to defend c6 if necessary. But piece defense of pawns is always temporary.' },
      { move: 'b5', annotation: '!', explanation: 'THE BREAKTHROUGH! Now Black faces a critical choice: (1) If ...axb5, then cxb5 and the c6 pawn is BACKWARD on an open file—a permanent target for White\'s rooks and queen. (2) If ...cxb5, then cxb5 and Black has an ISOLATED a-pawn on a semi-open file. Either way, White has achieved the minority attack\'s goal: creating permanent structural weaknesses. This technique is essential for every serious player to master.', highlights: ['c6'] },
    ],
    commonMistakes: ['Starting b4 before a3—this allows ...Nb4 to harass the queen', 'Rushing the minority attack without completing development', 'Not following up b5 with piece pressure on the resulting weak pawns'],
    deeperPrinciple: 'The minority attack teaches that PAWN STRUCTURE trumps pawn count. Two pawns attacking three can create weaknesses that last the entire game. The resulting weak c-pawn (backward or isolated) becomes a target that ties down Black\'s pieces. This is why the Queen\'s Gambit Declined leads to strategic battles—both sides have clear but opposing plans.',
  },
  {
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
      { move: 'Na4', annotation: '!', explanation: 'Heading to c5!', arrows: [{ from: 'a4', to: 'c5', color: 'yellow' }] },
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
      { move: 'f5', annotation: '!', explanation: 'Black starts the kingside attack!', arrows: [{ from: 'f7', to: 'f5', color: 'green' }] },
    ]
  },
  {
    id: 'ps-4',
    title: 'Carlsbad Piece Play',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PPQ2PPP/R1B1KB1R w KQ - 0 8',
    toMove: 'white',
    concept: 'Active piece play in Carlsbad',
    keyTakeaway: 'Develop pieces actively before starting the minority attack.',
    difficulty: 3,
    moves: [
      { move: 'Bd3', annotation: '!', explanation: 'Active development!' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'O-O', explanation: 'White castles.' },
      { move: 'cxd4', explanation: 'Black releases tension.' },
      { move: 'exd4', annotation: '!', explanation: 'Maintaining the center.' },
    ]
  },
  {
    id: 'ps-5',
    title: 'Carlsbad Rook Play',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/3p4/1PPP4/2NBPN2/P1Q2PPP/R1B2RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Using rooks in the Carlsbad',
    keyTakeaway: 'Double rooks on the c-file to target weaknesses.',
    difficulty: 4,
    moves: [
      { move: 'Rac1', annotation: '!', explanation: 'Seizing the c-file!' },
      { move: 'Bd7', explanation: 'Black develops.' },
      { move: 'b5', annotation: '!', explanation: 'Breaking through!' },
      { move: 'Na5', explanation: 'Black blockades.' },
      { move: 'Rfc1', annotation: '!', explanation: 'Doubling on the c-file!' },
    ]
  },
  // FRENCH STRUCTURE (6-15)
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
      { move: 'Be3', explanation: 'Challenging the bishop.' },
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
      { move: 'Be3', explanation: 'Defending.' },
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
      { move: 'Bxc6', annotation: '!', explanation: 'Doubling pawns and maintaining e5.', highlights: ['c6', 'e5'] },
    ]
  },
  {
    id: 'ps-9',
    title: 'French f6 Break',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2ppP3/3P4/2N2N2/PPP1BPPP/R1BQ1RK1 b - - 0 7',
    toMove: 'black',
    concept: 'Black\'s f6 break',
    keyTakeaway: 'f6 challenges White\'s center.',
    difficulty: 4,
    moves: [
      { move: 'f6', annotation: '!', explanation: 'Challenging the e5 pawn!' },
      { move: 'exf6', explanation: 'White takes.' },
      { move: 'Bxf6', explanation: 'Opening the position.' },
      { move: 'dxc5', explanation: 'White takes.' },
      { move: 'Bxc5', annotation: '!', explanation: 'Black has active pieces!' },
    ]
  },
  {
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
      { move: 'h5', annotation: '!', explanation: 'The attack continues!' },
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
      { move: 'f3', annotation: '!', explanation: 'Preparing the Yugoslav Attack!', arrows: [{ from: 'f2', to: 'f3', color: 'green' }] },
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
      { move: 'Nd5', annotation: '!', explanation: 'Occupying the hole!', highlights: ['d5'] },
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
      { move: 'f4', annotation: '!', explanation: 'English Attack! Preparing kingside expansion.', arrows: [{ from: 'f4', to: 'f5', color: 'yellow' }] },
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
      { move: 'O-O', annotation: '!', explanation: 'Castling, preparing f4.' },
    ]
  },
  {
    id: 'ps-15',
    title: 'Sicilian Dragon Structure',
    fen: 'r1bqk2r/pp1pppbp/2n2np1/8/3NP3/2N1B3/PPP2PPP/R2QKB1R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Yugoslav Attack setup',
    keyTakeaway: 'White castles queenside and storms the kingside.',
    difficulty: 4,
    moves: [
      { move: 'f3', annotation: '!', explanation: 'Preparing Qd2 and O-O-O.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Qd2', explanation: 'Connecting and preparing Bh6.' },
      { move: 'Nc6', explanation: 'Black develops.' },
      { move: 'O-O-O', annotation: '!', explanation: 'Opposite side castling! The race begins.', arrows: [{ from: 'g2', to: 'g4', color: 'yellow' }] },
    ]
  },
  // KING'S INDIAN STRUCTURES (16-25)
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
      { move: 'c5', annotation: '!', explanation: 'Fixing the structure. White has a permanent space advantage.', highlights: ['c5', 'd5'] },
    ]
  },
  {
    id: 'ps-17',
    title: 'King\'s Indian f5 Break',
    fen: 'r1bq1rk1/ppp2pbp/2np1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Black\'s f5 pawn break',
    keyTakeaway: 'f5 is Black\'s key break to create kingside play.',
    difficulty: 4,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Closing the center.' },
      { move: 'Ne7', explanation: 'Knight repositions for f5.' },
      { move: 'c5', explanation: 'White expands.' },
      { move: 'f5', annotation: '!', explanation: 'The classic break!' },
      { move: 'exf5', explanation: 'Taking.' },
      { move: 'gxf5', annotation: '!', explanation: 'Black opens the g-file for attack!', arrows: [{ from: 'g8', to: 'g2', color: 'red' }] },
    ]
  },
  {
    id: 'ps-18',
    title: 'King\'s Indian c5 Break',
    fen: 'r1bq1rk1/ppp2pbp/2np1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 7',
    toMove: 'black',
    concept: 'Black\'s c5 break',
    keyTakeaway: 'c5 challenges White\'s center and creates counterplay.',
    difficulty: 4,
    moves: [
      { move: 'c5', annotation: '!', explanation: 'Challenging the center!' },
      { move: 'd5', explanation: 'White advances.' },
      { move: 'Ne7', explanation: 'Knight repositions.' },
      { move: 'c4', explanation: 'White solidifies.' },
      { move: 'f5', annotation: '!', explanation: 'Black gets both breaks!' },
    ]
  },
  {
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
      { move: 'Be2', annotation: '!', explanation: 'Solid development, preparing O-O.' },
    ]
  },
  {
    id: 'ps-20',
    title: 'Closed King\'s Indian',
    fen: 'r1bq1rk1/ppp2pbp/2np1np1/4p3/2PPP3/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Closed center structures',
    keyTakeaway: 'When the center is closed, play on the wings.',
    difficulty: 3,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Closing the center.' },
      { move: 'Ne7', explanation: 'Black repositions.' },
      { move: 'c5', explanation: 'White expands on the queenside.' },
      { move: 'f5', explanation: 'Black expands on the kingside.' },
      { move: 'Nd2', annotation: '!', explanation: 'Preparing Nc4 to attack d6.', arrows: [{ from: 'd2', to: 'c4', color: 'yellow' }] },
    ]
  },
  // OTHER MAJOR STRUCTURES (21-40)
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
      { move: 'Bd3', annotation: '!', explanation: 'Offering the trade to gain the bishop pair!' },
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
      { move: 'Bd3', explanation: 'Developing with an eye on h7.' },
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
      { move: 'Ne5', annotation: '!', explanation: 'The knight lands on the Stonewall outpost!', highlights: ['e5'] },
    ]
  },
  {
    id: 'ps-24',
    title: 'Pawn Breaks: d4-d5',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Central pawn breaks change the position',
    keyTakeaway: 'd5 often opens lines and creates weaknesses.',
    difficulty: 3,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'The central break opens the position!' },
      { move: 'exd5', explanation: 'Black captures.' },
      { move: 'cxd5', explanation: 'Recapturing toward the center.', highlights: ['d5'] },
      { move: 'Nb4', explanation: 'Black tries to blockade.' },
      { move: 'Bc4', annotation: '!', explanation: 'Developing with tempo!' },
    ]
  },
  {
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
      { move: 'Nd2', annotation: '!', explanation: 'Attacking the weak e4 pawn.' },
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
      { move: 'Nb6', annotation: '!', explanation: 'Dominating position!', highlights: ['b6'] },
    ]
  },
  {
    id: 'ps-27',
    title: 'Pawn Breaks: f2-f4',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'The f4 break',
    keyTakeaway: 'f4 prepares kingside expansion.',
    difficulty: 3,
    moves: [
      { move: 'f4', annotation: '!', explanation: 'Preparing e5 or f5!' },
      { move: 'cxd4', explanation: 'Black trades.' },
      { move: 'exd4', explanation: 'Recapturing.' },
      { move: 'Nb4', explanation: 'Black attacks c2.' },
      { move: 'Bb1', annotation: '!', explanation: 'The bishop is well placed!' },
    ]
  },
  {
    id: 'ps-28',
    title: 'Hedgehog Structure',
    fen: 'r1bqk2r/1p2bppp/p1nppn2/8/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 w kq - 0 8',
    toMove: 'white',
    concept: 'Playing against the Hedgehog',
    keyTakeaway: 'White has space but must be careful of ...b5 and ...d5 breaks.',
    difficulty: 4,
    moves: [
      { move: 'd4', annotation: '!', explanation: 'Gaining more space in the center.', highlights: ['d4'] },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Be3', explanation: 'Developing and supporting d4.' },
      { move: 'Qc7', explanation: 'Black prepares ...b5.' },
      { move: 'f4', annotation: '!', explanation: 'Gaining even more space!', arrows: [{ from: 'f2', to: 'f4', color: 'green' }] },
    ]
  },
  {
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
      { move: 'Nxd5', annotation: '!', explanation: 'Black has freed the position!' },
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
      { move: 'e4', annotation: '!', explanation: 'Breaking in the center!' },
    ]
  },
  {
    id: 'ps-31',
    title: 'Queen\'s Gambit Accepted',
    fen: 'rnbqkb1r/ppp1pppp/5n2/8/2pP4/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4',
    toMove: 'white',
    concept: 'QGA pawn structure',
    keyTakeaway: 'White has a central majority; Black must be active.',
    difficulty: 3,
    moves: [
      { move: 'e3', explanation: 'Preparing to win back the pawn.' },
      { move: 'e6', explanation: 'Black supports the pawn.' },
      { move: 'Bxc4', annotation: '!', explanation: 'Winning back the pawn with development.' },
      { move: 'c5', explanation: 'Black counterattacks.' },
      { move: 'O-O', annotation: '!', explanation: 'Completing development.' },
    ]
  },
  {
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
      { move: 'Nbd2', annotation: '!', explanation: 'Heading to e5 via f3.', arrows: [{ from: 'd2', to: 'f3', color: 'yellow' }, { from: 'f3', to: 'e5', color: 'yellow' }] },
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
      { move: 'O-O', annotation: '!', explanation: 'Completing development.' },
    ]
  },
  {
    id: 'ps-34',
    title: 'Caro-Kann Structure',
    fen: 'r1bqkb1r/pp1npppp/2p2n2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4',
    toMove: 'white',
    concept: 'Caro-Kann pawn structure',
    keyTakeaway: 'Black\'s light-squared bishop can be developed outside the pawn chain.',
    difficulty: 3,
    moves: [
      { move: 'Nf3', explanation: 'Developing.' },
      { move: 'Bf5', annotation: '!', explanation: 'The bishop develops before e6.' },
      { move: 'Ng5', explanation: 'Attacking the bishop.' },
      { move: 'Bg6', explanation: 'Retreating.' },
      { move: 'h4', annotation: '!', explanation: 'Attacking the bishop!' },
    ]
  },
  {
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
      { move: 'Nf3', explanation: 'Developing.' },
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
      { move: 'c4', annotation: '!', explanation: 'Attacking the queen and gaining space!' },
    ]
  },
  {
    id: 'ps-37',
    title: 'IQP Transformation',
    fen: 'r1bq1rk1/ppp1bppp/2n2n2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Creating an IQP',
    keyTakeaway: 'Sometimes creating an IQP gives piece activity.',
    difficulty: 3,
    moves: [
      { move: 'exd5', annotation: '!', explanation: 'Creating an IQP!' },
      { move: 'Nxd5', explanation: 'Black recaptures.' },
      { move: 'Nxd5', explanation: 'Trading.' },
      { move: 'Qxd5', explanation: 'Queen recaptures.' },
      { move: 'Nb5', annotation: '!', explanation: 'Active play with the IQP!' },
    ]
  },
  {
    id: 'ps-38',
    title: 'Hanging Pawns Transformation',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/2P5/1P2PN2/PB2BPPP/R2Q1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Transforming hanging pawns',
    keyTakeaway: 'Hanging pawns can transform into IQP or passed pawn.',
    difficulty: 4,
    moves: [
      { move: 'cxd5', annotation: '!', explanation: 'Transforming the structure!' },
      { move: 'exd5', explanation: 'Black recaptures.' },
      { move: 'Na3', annotation: '!', explanation: 'Now Black has an IQP!', highlights: ['d5'] },
    ]
  },
  {
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
      { move: 'Bxf6', annotation: '!', explanation: 'Creating doubled pawns!' },
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
      { move: 'Bd2', annotation: '!', explanation: 'Preparing to attack the knight.' },
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
      { move: 'd5', annotation: '!!', explanation: 'Now the d-pawn is passed!', highlights: ['d5'] },
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
      { move: 'dxc5', annotation: '!', explanation: 'Now Black has an IQP!' },
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
      { move: 'Bf4', annotation: '!', explanation: 'Active pieces compensate!' },
    ]
  },
  {
    id: 'ps-44',
    title: 'Minority Attack in Action',
    fen: 'r1bq1rk1/pp2bppp/2n1pn2/2pp4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Starting the minority attack',
    keyTakeaway: 'b4-b5 creates weak pawns on the queenside.',
    difficulty: 3,
    moves: [
      { move: 'b4', annotation: '!', explanation: 'Starting the minority attack!' },
      { move: 'cxb4', explanation: 'Black takes.' },
      { move: 'axb4', explanation: 'Recapturing.' },
      { move: 'Bd7', explanation: 'Black develops.' },
      { move: 'b5', annotation: '!', explanation: 'Breaking through!' },
    ]
  },
  {
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
      { move: 'b5', annotation: '!', explanation: 'Counter-minority attack!' },
    ]
  },
  // ADVANCED STRUCTURE CONCEPTS (46-60)
  {
    id: 'ps-46',
    title: 'Good Knight vs Bad Bishop',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Structure determines piece quality',
    keyTakeaway: 'Closed structures favor knights over bishops.',
    difficulty: 4,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Closing the position—good for knights!' },
      { move: 'Ne5', explanation: 'Knight centralizes.' },
      { move: 'Nxe5', explanation: 'Trading.' },
      { move: 'dxe5', explanation: 'Black recaptures.' },
      { move: 'Nd2', annotation: '!', explanation: 'Knight heads to c4!' },
    ]
  },
  {
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
      { move: 'b5', annotation: '!', explanation: 'The majority marches!' },
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
      { move: 'b5', annotation: '!', explanation: 'Breaking through!' },
    ]
  },
  {
    id: 'ps-49',
    title: 'Connected Passed Pawns',
    fen: '8/8/8/2PP4/8/6k1/6p1/6K1 w - - 0 1',
    toMove: 'white',
    concept: 'Connected passers are powerful',
    keyTakeaway: 'Connected passed pawns support each other.',
    difficulty: 3,
    moves: [
      { move: 'd6', annotation: '!', explanation: 'Advancing the pawns!' },
      { move: 'Kf2', explanation: 'Black tries to stop.' },
      { move: 'c6', annotation: '!', explanation: 'Both pawns march!' },
    ]
  },
  {
    id: 'ps-50',
    title: 'Split Pawns',
    fen: '8/8/2P2P2/8/8/6k1/6p1/6K1 w - - 0 1',
    toMove: 'white',
    concept: 'Split pawns are weaker',
    keyTakeaway: 'Split pawns cannot support each other.',
    difficulty: 3,
    moves: [
      { move: 'c7', annotation: '!', explanation: 'Advancing one pawn!' },
      { move: 'Kf2', explanation: 'Black approaches.' },
      { move: 'f7', annotation: '!', explanation: 'One will queen!' },
    ]
  },
  {
    id: 'ps-51',
    title: 'Central Pawn Duo',
    fen: 'r1bq1rk1/ppp2ppp/2n1pn2/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'Maintaining the central duo',
    keyTakeaway: 'd4+e4 control the center powerfully.',
    difficulty: 3,
    moves: [
      { move: 'Qd3', annotation: '!', explanation: 'Supporting the center!' },
      { move: 'd5', explanation: 'Black challenges.' },
      { move: 'e5', annotation: '!', explanation: 'Advancing with tempo!' },
    ]
  },
  {
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
      { move: 'Bd2', annotation: '!', explanation: 'Preparing to attack the knight.' },
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
      { move: 'Nd5', annotation: '!', explanation: 'Knight to the outpost!' },
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
      { move: 'g4', annotation: '!', explanation: 'The storm begins!' },
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
      { move: 'a5', annotation: '!', explanation: 'Continuing the expansion!' },
    ]
  },
  {
    id: 'ps-56',
    title: 'Open Center',
    fen: 'r1bq1rk1/pp3pbp/2np1np1/4p3/4P3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Playing with an open center',
    keyTakeaway: 'Develop quickly in open positions.',
    difficulty: 3,
    moves: [
      { move: 'd4', annotation: '!', explanation: 'Opening the center!' },
      { move: 'exd4', explanation: 'Black takes.' },
      { move: 'Nxd4', annotation: '!', explanation: 'Active piece play!' },
    ]
  },
  {
    id: 'ps-57',
    title: 'Pawn Chain Attack',
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Attacking the pawn chain base',
    keyTakeaway: 'Attack the base of the pawn chain.',
    difficulty: 4,
    moves: [
      { move: 'c3', annotation: '!', explanation: 'Supporting d4.' },
      { move: 'cxd4', explanation: 'Black attacks the base.' },
      { move: 'cxd4', explanation: 'Recapturing.' },
      { move: 'Qb6', explanation: 'Black attacks.' },
      { move: 'Be3', annotation: '!', explanation: 'Defending the chain!' },
    ]
  },
  {
    id: 'ps-58',
    title: 'Pawn Tension',
    fen: 'r1bqkb1r/pp3ppp/2n1pn2/2pp4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Maintaining pawn tension',
    keyTakeaway: 'Keep tension when it benefits you.',
    difficulty: 3,
    moves: [
      { move: 'Bf4', annotation: '!', explanation: 'Developing without releasing tension.' },
      { move: 'Nh5', explanation: 'Black attacks.' },
      { move: 'Be3', explanation: 'Retreating.' },
      { move: 'Nf6', explanation: 'Knight returns.' },
      { move: 'e3', annotation: '!', explanation: 'Maintaining the tension!' },
    ]
  },
  {
    id: 'ps-59',
    title: 'Pawn Structure and Piece Activity',
    fen: 'r1bq1rk1/pp3ppp/2n1pn2/2pp4/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Structure supports piece activity',
    keyTakeaway: 'Good structure enables active pieces.',
    difficulty: 4,
    moves: [
      { move: 'exd5', annotation: '!', explanation: 'Opening lines!' },
      { move: 'Nxd5', explanation: 'Black recaptures.' },
      { move: 'Nxd5', explanation: 'Trading.' },
      { move: 'Qxd5', explanation: 'Queen recaptures.' },
      { move: 'Nb5', annotation: '!', explanation: 'Active piece!' },
    ]
  },
  {
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
      { move: 'Nd2', annotation: '!', explanation: 'Attacking the weak pawn!' },
    ]
  },
]; 