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
    keyTakeaway: 'The isolated queen\'s pawn (IQP) is a fundamental weakness because it cannot be defended by other pawns. The key strategy is: FIRST blockade (place a knight on d4), THEN attack the pawn from multiple directions.',
    introduction: 'The Isolated Queen\'s Pawn (IQP) is one of the most important structural features in chess. An IQP cannot be defended by other pawns—it must be defended by pieces, which ties them down. Nimzowitsch\'s timeless principle applies: "First restrain, then blockade, then destroy." By placing a knight on d4 (the blockade square), you prevent the pawn from advancing and prepare to attack it with your remaining pieces.',
    difficulty: 3,
    moves: [
      { move: 'Bf4', annotation: '!', explanation: 'This developing move serves multiple purposes: (1) It develops a piece to an active square, (2) It controls e5, preventing Black from challenging the center, (3) It prepares to double on the d-file later. The bishop on f4 also eyes the d6 square, which will become important if Black ever plays ...d4. Strategic chess is about multi-purpose moves.' },
      { move: 'Bg4', explanation: 'Black pins the knight to the queen. This is an active move, but it actually helps White\'s plan—trading the bishop eliminates a potential defender of d5.' },
      { move: 'h3', annotation: '!', explanation: '"Asking the question" is a classic technique. Black must now decide: keep the pin (and risk h4-h5 later) or trade. Trading is usually forced, but it removes a piece that could defend d5. This small pawn move has strategic significance—it forces your opponent to make a decision.' },
      { move: 'Bxf3', explanation: 'Black trades. The bishop was a good piece, but the pin wasn\'t sustainable. Notice how White\'s simple h3 forced Black to give up the bishop pair—small moves can have big consequences.' },
      { move: 'Qxf3', explanation: 'The queen recaptures and now DIRECTLY targets d5. The queen on f3 is perfectly placed: it attacks d5, controls the long diagonal, and supports potential kingside play. Every piece should have a purpose; here, the queen\'s purpose is pressuring the IQP.' },
      { move: 'Rc8', explanation: 'Black activates the rook, preparing to contest the c-file. This is sound defensive technique—when your opponent controls the center, seek counterplay on the flanks.' },
      { move: 'Nd4', annotation: '!!', explanation: 'THE BLOCKADE! This is the culmination of White\'s strategy. Why is the knight on d4 so powerful? (1) It BLOCKADES the d5 pawn—preventing it from ever advancing, (2) It cannot be attacked by pawns—there\'s no e-pawn or c-pawn that can challenge it, (3) It radiates influence: controlling c6, e6, c2, e2, b5, f5, (4) Black\'s pieces become passive because they must defend the IQP. Nimzowitsch called the blockade "the soul of positional play."', highlights: ['d4', 'd5'] },
    ],
    commonMistakes: ['Attacking the IQP before blockading it—let the pawn advance and you lose your advantage', 'Blocking with the wrong piece—bishops make poor blockaders because they lose mobility', 'Forgetting that the IQP also gives Black active pieces—don\'t be passive while blockading'],
    deeperPrinciple: 'The IQP creates an imbalance: it\'s both a weakness AND a source of activity for the opponent. Your job is to neutralize the activity (through exchanges and piece placement) and then exploit the weakness. The blockade is central to this—once the pawn cannot advance, it becomes a permanent target.',
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
    keyTakeaway: 'Nxc6 creates doubled pawns that are a permanent target. Doubled pawns cannot defend each other and often become long-term liabilities, especially in endgames.',
    introduction: 'Doubled pawns are pawns of the same color stacked on the same file. They are weak because: (1) They cannot defend each other—unlike healthy pawns, (2) They create "holes" in the pawn structure—squares that can never be controlled by pawns, (3) They are targets on a semi-open file. Creating doubled pawns in your opponent\'s camp is a fundamental strategic technique.',
    difficulty: 2,
    moves: [
      { move: 'Nxc6', annotation: '!', explanation: 'This exchange is not about winning material—it\'s about DAMAGING BLACK\'S STRUCTURE permanently. After bxc6, Black will have doubled c-pawns for the rest of the game. This decision should always be weighed carefully: you\'re giving up your developed knight, but in return you get a permanent structural advantage. The question is: "Is the structural damage worth the piece trade?"', arrows: [{ from: 'd4', to: 'c6', color: 'green' }] },
      { move: 'bxc6', explanation: 'Black recaptures toward the center (usually correct). But now observe the damage: (1) The c6 and c7 pawns cannot defend each other, (2) The c-file is half-open—White\'s rooks will target c6, (3) Black\'s queenside pawn majority is "crippled"—it cannot create a passed pawn easily. These problems are PERMANENT—they cannot be fixed by any move.', highlights: ['c6', 'c7'] },
      { move: 'Bd3', explanation: 'Development continues with a purpose. The bishop eyes the kingside (the h7 square specifically), but White\'s long-term plan is clear: use the semi-open c-file to attack the doubled pawns. In the coming moves, White will play Qc2, Rc1, and pile up on c6. The strategic plan writes itself when you\'ve created a clear weakness.' },
    ],
    commonMistakes: ['Creating doubled pawns when your opponent gets compensation (like the bishop pair or active pieces)', 'Doubling pawns and then forgetting to exploit them—you must follow up with pressure', 'Not considering that doubled pawns can sometimes be useful (controlling key squares)'],
    deeperPrinciple: 'Doubled pawns are a "permanent" weakness because pawns cannot move backwards. Once created, they\'ll exist until traded or won. However, there\'s a trade-off: creating doubled pawns often means giving your opponent the bishop pair or active pieces. The question is whether the structural advantage outweighs the activity. In endgames, structure usually wins; in sharp middlegames, activity might compensate.',
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
    keyTakeaway: 'A backward pawn cannot advance safely because the square in front of it is controlled by enemy pawns. It becomes a permanent weakness on a semi-open file—a target for rooks and queens.',
    introduction: 'A backward pawn is one that cannot advance because the square in front of it is controlled by enemy pawns, and it has no neighboring pawns to protect it. The backward pawn is weak for two reasons: (1) It\'s stuck on an open or semi-open file where it can be attacked by major pieces, (2) The square in front of it becomes an outpost for enemy pieces. Creating and exploiting backward pawns is a core positional skill.',
    difficulty: 4,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'This pawn advance "FIXES" Black\'s structure permanently. Why is d5 so strong? (1) It closes the center, giving White more time to attack on the wings, (2) It creates a backward pawn on c6—this pawn cannot advance because the d5 pawn controls c6, and there\'s no b-pawn to support it, (3) It creates an outpost on c6 for White\'s pieces. The principle: fixing your opponent\'s pawns is often stronger than trading them.', highlights: ['c6'] },
      { move: 'Ne5', explanation: 'Black tries to find counterplay through piece activity. This is the correct defensive idea—when your structure is compromised, seek activity. But White can simply trade, keeping the structural advantage.' },
      { move: 'Nxe5', explanation: 'Trading is correct. White\'s structural advantage (the weak c6 pawn) is permanent, while Black\'s piece activity was temporary. In positions with clear structural advantages, simplification often favors the side with the better structure.' },
      { move: 'dxe5', explanation: 'Black recaptures. Now the structure is clear: White will target c6 with all their heavy pieces. The e5 pawn is advanced but creates no particular weakness for White to exploit. The asymmetry favors White.' },
      { move: 'Be3', explanation: 'Development with a plan. The bishop prepares to go to d4 or c5, attacking Black\'s structure. White\'s plan: (1) Play Qd2 connecting rooks, (2) Play Rfc1 to pressure c6, (3) Play Qa5 or Rc1-c2 to double on the c-file, (4) Eventually win the c6 pawn or force Black into a passive position defending it. When you create a backward pawn, the plan writes itself.', arrows: [{ from: 'c1', to: 'c6', color: 'yellow' }] },
    ],
    commonMistakes: ['Creating a backward pawn but not following up with pressure on it', 'Letting your opponent repair their structure with ...c5 or ...c6-c5', 'Focusing so much on the backward pawn that you ignore counterplay elsewhere'],
    deeperPrinciple: 'The backward pawn is weak for TWO reasons: the pawn itself is a target, AND the square in front of it is an outpost. When you create a backward pawn, you get both advantages. Nimzowitsch called this a "duo of weaknesses"—the opponent must defend both the pawn AND prevent you from using the outpost.',
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
    keyTakeaway: 'Hanging pawns (c5+d5 or c4+d4) are dynamically balanced—they control central squares but can become weak if forced to advance. The key strategy is to make ONE of them advance, leaving the other isolated and vulnerable.',
    introduction: 'Hanging pawns are a unique structure: two adjacent pawns on the same rank (typically c5+d5 or c4+d4) with no supporting pawns beside them. They "hang" in the center, neither protected by other pawns nor clearly weak. They have DUAL nature: (1) STRENGTH: They control key central squares and support piece activity, (2) WEAKNESS: If one advances, the other becomes isolated and attackable. Your strategy is to force one to advance, breaking the duo and creating a target.',
    difficulty: 4,
    moves: [
      { move: 'cxd5', annotation: '!', explanation: 'White challenges the hanging pawns directly. This is the most principled approach: force Black to make a decision about the recapture. After exd5, Black keeps the "duo" but on slightly different squares. The tension has been resolved in a way that gives White clear targets. The principle: when facing hanging pawns, don\'t let them sit peacefully—force the issue.' },
      { move: 'exd5', explanation: 'Black recaptures toward the center, maintaining the connected pawns. This is the most natural recapture, keeping the c5-d5 duo. However, the pawn structure has subtly shifted—now the d5 pawn is more advanced and harder to defend, while c5 is slightly isolated.' },
      { move: 'Nc3', explanation: 'Developing with pressure. The knight eyes the d5 pawn and prepares to jump to a4 or e4. Notice how White is targeting the SPECIFIC SQUARES that the hanging pawns create as weaknesses. Piece placement against hanging pawns follows a clear pattern.' },
      { move: 'd4', explanation: 'This is the CRITICAL MOMENT in hanging pawn positions. Black advances one pawn, breaking the duo. Why? Because the pressure on d5 was unbearable. But now look at the cost: c5 is completely ISOLATED and cannot be defended by other pawns. The hanging pawn strength has been converted into a permanent weakness.', highlights: ['c5'] },
      { move: 'Na4', annotation: '!', explanation: 'Now White exploits the consequences of the advance. The knight targets c5 directly—a pawn that has no pawn defenders. Black must use PIECES to defend c5, which ties down their army. The strategic transformation is complete: Black\'s hanging pawns, which once controlled the center, have become a liability. This is the ideal outcome when playing against hanging pawns.', arrows: [{ from: 'c3', to: 'a4', color: 'green' }] },
    ],
    commonMistakes: ['Letting hanging pawns sit peacefully without challenging them', 'Trading both pawns instead of forcing one to advance', 'Underestimating the DYNAMIC potential of hanging pawns—they can advance with tempo if you\'re passive'],
    deeperPrinciple: 'Hanging pawns are a double-edged sword. If the side with hanging pawns can advance them (d4-d5 or c4-c5) with a tempo, they often gain a strong passed pawn. If the opponent forces them to advance defensively, the resulting isolated pawn is usually weak. The battle is about WHO controls the timing of the advance.',
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
