// ============================================
// OUTPOSTS - COMPREHENSIVE VARIATIONS
// 60 variations covering all outpost concepts
// ============================================

import type { CourseVariation } from '../courseTypes';

export const outpostsVariations: CourseVariation[] = [
  // BASIC OUTPOST CONCEPTS (1-15)
  {
    id: 'out-1',
    title: 'The Classic d5 Knight',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Occupying a permanent outpost',
    keyTakeaway: 'A knight on d5 that cannot be challenged by pawns dominates the position.',
    difficulty: 3,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'The knight occupies the dream square! No pawn can ever attack it here.', arrows: [{ from: 'c3', to: 'd5', color: 'green' }], highlights: ['d5'] },
      { move: 'Nxd5', explanation: 'Black feels compelled to trade off this monster.' },
      { move: 'exd5', annotation: '!', explanation: 'The pawn wedge restricts Black\'s pieces.', highlights: ['d5'] },
    ]
  },
  {
    id: 'out-2',
    title: 'Creating an Outpost with e5',
    fen: 'r1bqkb1r/pp2pppp/2n2n2/3p4/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Pawn advances create outpost squares',
    keyTakeaway: 'e5 displaces the f6 knight and creates holes in Black\'s position.',
    difficulty: 2,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Gains space and kicks the knight, creating a d4 outpost.', arrows: [{ from: 'e4', to: 'e5', color: 'green' }], highlights: ['d4'] },
      { move: 'Ne4', explanation: 'The knight retreats but blocks its own pawn.' },
      { move: 'Nxe4', explanation: 'Trading to open lines.' },
      { move: 'dxe4', explanation: 'Now the d4 square is a permanent outpost!' },
    ]
  },
  {
    id: 'out-3',
    title: 'Supporting the Outpost',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2BNP3/2N1B3/PPP2PPP/R2QK2R w KQ - 0 8',
    toMove: 'white',
    concept: 'Maintaining pieces on outposts',
    keyTakeaway: 'Support your outpost knight with pawns and pieces to make it permanent.',
    difficulty: 3,
    moves: [
      { move: 'f3', annotation: '!', explanation: 'Prophylaxis! Prevents ...Ng4 and supports a future e5.', arrows: [{ from: 'f2', to: 'f3', color: 'green' }] },
      { move: 'Nc5', explanation: 'Black attacks the bishop.' },
      { move: 'Bb3', explanation: 'The bishop retreats but stays active.' },
      { move: 'a5', explanation: 'Black gains space on the queenside.' },
      { move: 'Nd5', annotation: '!!', explanation: 'The knight lands on d5—supported by the e4 pawn and impossible to dislodge!', highlights: ['d5'] },
    ]
  },
  {
    id: 'out-4',
    title: 'Outpost on the Rim',
    fen: 'r2q1rk1/pp2ppbp/2npbnp1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 10',
    toMove: 'white',
    concept: 'Even rim outposts can be powerful',
    keyTakeaway: 'An outpost on a5 or h5 can dominate if it controls key squares.',
    difficulty: 4,
    moves: [
      { move: 'Na4', annotation: '!', explanation: 'The knight heads to c5 via a4—an unusual but powerful maneuver.', arrows: [{ from: 'c3', to: 'a4', color: 'green' }, { from: 'a4', to: 'c5', color: 'yellow' }] },
      { move: 'Qc7', explanation: 'Black prepares to meet Nc5.' },
      { move: 'Nc5', annotation: '!', explanation: 'The knight lands on the outpost, attacking b7 and e6!', highlights: ['c5'] },
    ]
  },
  {
    id: 'out-5',
    title: 'Double Outposts',
    fen: 'r2q1rk1/pp1bppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Multiple outposts multiply the advantage',
    keyTakeaway: 'When you have two outposts, your pieces coordinate beautifully.',
    difficulty: 4,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'First knight to the outpost!' },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', explanation: 'The pawn creates a second outpost on e6!' },
      { move: 'Ne5', explanation: 'Black tries to find counterplay.' },
      { move: 'Ne6', annotation: '!!', explanation: 'The remaining knight occupies the second outpost! Total domination.', highlights: ['d5', 'e6'] },
    ]
  },
  {
    id: 'out-6',
    title: 'The e5 Outpost',
    fen: 'r1bqk2r/ppp2ppp/2n1pn2/3pP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Central outposts are most powerful',
    keyTakeaway: 'A knight on e5 controls 8 squares and eyes f7.',
    difficulty: 2,
    moves: [
      { move: 'Bd3', explanation: 'Developing while eyeing the kingside.' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Ne5', annotation: '!!', explanation: 'The knight lands on e5—a dominating central outpost!', arrows: [{ from: 'f3', to: 'e5', color: 'green' }], highlights: ['e5'] },
    ]
  },
  {
    id: 'out-7',
    title: 'Trading for an Outpost',
    fen: 'r1bqkb1r/pp1npppp/2p2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5',
    toMove: 'white',
    concept: 'Sometimes trade pawns to create outposts',
    keyTakeaway: 'cxd5 followed by e4 often creates a powerful e5 outpost.',
    difficulty: 3,
    moves: [
      { move: 'cxd5', explanation: 'Opening the c-file and creating central tension.' },
      { move: 'cxd5', explanation: 'Black recaptures.' },
      { move: 'e4', annotation: '!', explanation: 'Now e5 becomes available for the knight!', arrows: [{ from: 'e2', to: 'e4', color: 'green' }] },
      { move: 'dxe4', explanation: 'Black captures.' },
      { move: 'Nxe4', explanation: 'Knight recaptures with a strong position.' },
    ]
  },
  {
    id: 'out-8',
    title: 'Bishop Outpost',
    fen: 'r1bqkb1r/pp2pppp/2n2n2/2pp4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Bishops can also occupy outposts',
    keyTakeaway: 'A bishop on d5 or e5 can be just as powerful as a knight.',
    difficulty: 3,
    moves: [
      { move: 'cxd5', explanation: 'Trading to open lines.' },
      { move: 'Nxd5', explanation: 'Black recaptures with the knight.' },
      { move: 'e4', annotation: '!', explanation: 'Attacking the knight and gaining space.' },
      { move: 'Nf6', explanation: 'Knight retreats.' },
      { move: 'Bd3', explanation: 'Developing the bishop.' },
      { move: 'e6', explanation: 'Black solidifies.' },
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'Be7', explanation: 'Black develops.' },
      { move: 'e5', annotation: '!', explanation: 'Creating an outpost on d5 for the bishop!', highlights: ['d5'] },
    ]
  },
  {
    id: 'out-9',
    title: 'Preventing Enemy Outposts',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Don\'t let your opponent establish outposts',
    keyTakeaway: 'Prevent enemy pieces from landing on strong squares by controlling them with pawns.',
    difficulty: 2,
    moves: [
      { move: 'd3', explanation: 'Supporting e4 and preventing ...Nd4.' },
      { move: 'Bc5', explanation: 'Black develops actively.' },
      { move: 'Be3', annotation: '!', explanation: 'Challenging the bishop and preventing ...Nd4.', arrows: [{ from: 'c1', to: 'e3', color: 'green' }] },
    ]
  },
  {
    id: 'out-10',
    title: 'The Eternal Knight',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'A knight that can never be challenged',
    keyTakeaway: 'An "eternal" knight on an outpost can often decide the game by itself.',
    difficulty: 4,
    moves: [
      { move: 'O-O-O', annotation: '!', explanation: 'Castling queenside prepares a kingside attack.' },
      { move: 'e5', explanation: 'Black tries to challenge the center.' },
      { move: 'Nf5', annotation: '!!', explanation: 'The knight lands on f5—it can NEVER be attacked by a pawn! This is an "eternal" knight.', highlights: ['f5'] },
      { move: 'Bxf5', explanation: 'Black is forced to trade.' },
      { move: 'exf5', explanation: 'Opening the e-file for the rook.' },
    ]
  },
  {
    id: 'out-11',
    title: 'The c5 Outpost in Sicilian',
    fen: 'r1bqkb1r/pp1ppppp/2n2n2/2p5/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4',
    toMove: 'white',
    concept: 'Sicilian c5 pawn creates weak d5 square',
    keyTakeaway: 'In the Sicilian, Black often creates a hole on d5.',
    difficulty: 3,
    moves: [
      { move: 'd4', explanation: 'Opening the center.' },
      { move: 'cxd4', explanation: 'Black captures.' },
      { move: 'Nxd4', explanation: 'Recapturing with the knight.' },
      { move: 'e6', explanation: 'Black prepares development.' },
      { move: 'Ndb5', annotation: '!', explanation: 'Heading to d6, a powerful outpost!', arrows: [{ from: 'd4', to: 'b5', color: 'green' }, { from: 'b5', to: 'd6', color: 'yellow' }] },
    ]
  },
  {
    id: 'out-12',
    title: 'Outpost from Pawn Exchange',
    fen: 'r1bqkb1r/ppp1pppp/2n2n2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4',
    toMove: 'white',
    concept: 'Exchange pawns to create outposts',
    keyTakeaway: 'After cxd5, the e4 and c4 squares become potential outposts.',
    difficulty: 2,
    moves: [
      { move: 'cxd5', explanation: 'Opening lines.' },
      { move: 'Nxd5', explanation: 'Black recaptures.' },
      { move: 'e4', annotation: '!', explanation: 'Attacking the knight and seizing space.' },
      { move: 'Nxc3', explanation: 'Black trades.' },
      { move: 'bxc3', annotation: '!', explanation: 'Now d4 is a permanent outpost!', highlights: ['d4'] },
    ]
  },
  {
    id: 'out-13',
    title: 'Knight vs Bishop on Outpost',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQB1PP/R3K2R w KQ - 0 10',
    toMove: 'white',
    concept: 'Knights are best on outposts',
    keyTakeaway: 'Knights don\'t lose power on outposts; bishops often do.',
    difficulty: 3,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'The knight is perfectly placed—attacks e7 and f6.' },
      { move: 'e6', explanation: 'Trying to kick it.' },
      { move: 'Nxf6+', annotation: '!', explanation: 'Trading for the key defender.' },
      { move: 'Bxf6', explanation: 'Black recaptures.' },
      { move: 'Nc6', annotation: '!!', explanation: 'Now the other knight has a powerful outpost!', highlights: ['c6'] },
    ]
  },
  {
    id: 'out-14',
    title: 'Outpost with Rook Support',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/1R2KB1R w K - 0 10',
    toMove: 'white',
    concept: 'Support outposts with rooks',
    keyTakeaway: 'A rook behind a knight on an outpost provides powerful support.',
    difficulty: 4,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'Knight to the outpost.' },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', explanation: 'The pawn advances.' },
      { move: 'Ne5', explanation: 'Black counterattacks.' },
      { move: 'Rb5', annotation: '!', explanation: 'The rook supports from behind!', arrows: [{ from: 'b1', to: 'b5', color: 'green' }] },
    ]
  },
  {
    id: 'out-15',
    title: 'Creating Outposts via Piece Exchange',
    fen: 'r1bqkb1r/pp1n1ppp/2n1p3/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Trade pieces to secure outposts',
    keyTakeaway: 'Sometimes trading pieces creates permanent outposts.',
    difficulty: 3,
    moves: [
      { move: 'Bb5', annotation: '!', explanation: 'Pinning and preparing to simplify.' },
      { move: 'Qb6', explanation: 'Black attacks.' },
      { move: 'Bxc6', annotation: '!', explanation: 'Trading to secure d5.' },
      { move: 'bxc6', explanation: 'Black recaptures.' },
      { move: 'Na4', annotation: '!', explanation: 'Now Nc5 will create a monster knight!', arrows: [{ from: 'c3', to: 'a4', color: 'green' }, { from: 'a4', to: 'c5', color: 'yellow' }] },
    ]
  },
  // INTERMEDIATE OUTPOST CONCEPTS (16-35)
  {
    id: 'out-16',
    title: 'The f5 Outpost',
    fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w - - 0 7',
    toMove: 'white',
    concept: 'f5 controls key kingside squares',
    keyTakeaway: 'A knight on f5 attacks h6, g7 and puts pressure on the king.',
    difficulty: 3,
    moves: [
      { move: 'd3', explanation: 'Supporting the center.' },
      { move: 'h6', explanation: 'Black prevents Bg5.' },
      { move: 'Nh4', annotation: '!', explanation: 'Heading to f5!', arrows: [{ from: 'f3', to: 'h4', color: 'green' }, { from: 'h4', to: 'f5', color: 'yellow' }] },
      { move: 'Nd4', explanation: 'Black centralizes.' },
      { move: 'Nf5', annotation: '!', explanation: 'The knight reaches its ideal square!', highlights: ['f5'] },
    ]
  },
  {
    id: 'out-17',
    title: 'Outpost with Color Complex',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPP1B1PP/R2QK2R w KQ - 0 9',
    toMove: 'white',
    concept: 'Match outposts with pawn color',
    keyTakeaway: 'Place knights on squares of the color your pawns are not on.',
    difficulty: 4,
    moves: [
      { move: 'O-O', explanation: 'Castling.' },
      { move: 'a6', explanation: 'Black prepares b5.' },
      { move: 'Qd2', explanation: 'Connecting rooks.' },
      { move: 'b5', explanation: 'Black expands.' },
      { move: 'Nd5', annotation: '!', explanation: 'Perfect! The knight sits on a light square while pawns are on dark squares.', highlights: ['d5', 'e4', 'f3'] },
    ]
  },
  {
    id: 'out-18',
    title: 'Sacrificing for an Outpost',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    toMove: 'white',
    concept: 'Sacrifice material to gain an outpost',
    keyTakeaway: 'An outpost can be worth sacrificing a pawn.',
    difficulty: 4,
    moves: [
      { move: 'd4', annotation: '!', explanation: 'Gambiting the pawn for central control.' },
      { move: 'exd4', explanation: 'Black accepts.' },
      { move: 'c3', annotation: '!', explanation: 'Offering another pawn!' },
      { move: 'dxc3', explanation: 'Black takes.' },
      { move: 'Nxc3', annotation: '!', explanation: 'Now the d5 square is a powerful outpost!', highlights: ['d5'] },
    ]
  },
  {
    id: 'out-19',
    title: 'Outpost Control via Prophylaxis',
    fen: 'r1bq1rk1/ppp1ppbp/2np1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Prevent opponent from contesting outpost',
    keyTakeaway: 'Use prophylaxis to secure your outpost before occupying it.',
    difficulty: 4,
    moves: [
      { move: 'h3', annotation: '!', explanation: 'Preventing Bg4 which would trade the knight heading to d5.' },
      { move: 'e5', explanation: 'Black challenges.' },
      { move: 'dxe5', explanation: 'Taking.' },
      { move: 'dxe5', explanation: 'Black recaptures.' },
      { move: 'Nd5', annotation: '!', explanation: 'Now the outpost is secure!', highlights: ['d5'] },
    ]
  },
  {
    id: 'out-20',
    title: 'Multiple Pieces Supporting Outpost',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQB1PP/R3K2R w KQ - 0 10',
    toMove: 'white',
    concept: 'Coordinate pieces to support outpost',
    keyTakeaway: 'Multiple pieces supporting an outpost make it unassailable.',
    difficulty: 4,
    moves: [
      { move: 'O-O-O', annotation: '!', explanation: 'Preparing to double rooks.' },
      { move: 'a6', explanation: 'Black prepares b5.' },
      { move: 'Kb1', explanation: 'Safety first.' },
      { move: 'Qc7', explanation: 'Black defends.' },
      { move: 'Nd5', annotation: '!', explanation: 'Knight to outpost!' },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', explanation: 'The pawn supports the other knight.' },
      { move: 'Nb8', explanation: 'Knight retreats.' },
      { move: 'Nc6', annotation: '!!', explanation: 'Second knight to an outpost! Devastating.', highlights: ['c6', 'd5'] },
    ]
  },
  {
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
      { move: 'Bxe4', explanation: 'Bishop takes over the diagonal.' },
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
      { move: 'Bxd4', annotation: '!', explanation: 'But White has the bishop pair and the passed d-pawn!' },
    ]
  },
  {
    id: 'out-23',
    title: 'Central Outpost Domination',
    fen: 'r2q1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 11',
    toMove: 'white',
    concept: 'Control d5 and e5 simultaneously',
    keyTakeaway: 'Two central outposts give total control of the center.',
    difficulty: 5,
    moves: [
      { move: 'Nc6', annotation: '!', explanation: 'Fork! And threatening Nxe7.' },
      { move: 'bxc6', explanation: 'Black must take.' },
      { move: 'Nd5', annotation: '!', explanation: 'Now d5 is completely secure!' },
      { move: 'Nxd5', explanation: 'Black has to trade.' },
      { move: 'exd5', annotation: '!', explanation: 'The pawn wedge paralyzes Black\'s position.', highlights: ['c6', 'd5'] },
    ]
  },
  {
    id: 'out-24',
    title: 'Queenside Outpost Attack',
    fen: 'r1bq1rk1/1pp1ppbp/p1np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 11',
    toMove: 'white',
    concept: 'Use outpost to launch queenside attack',
    keyTakeaway: 'An outpost can serve as a launching point for an attack.',
    difficulty: 4,
    moves: [
      { move: 'Nc6', annotation: '!', explanation: 'Knight invades!' },
      { move: 'Qc8', explanation: 'Queen defends.' },
      { move: 'e5', annotation: '!', explanation: 'Opening lines while the knight dominates.' },
      { move: 'dxe5', explanation: 'Black takes.' },
      { move: 'Nd5', annotation: '!!', explanation: 'Two knights on outposts! Crushing position.', highlights: ['c6', 'd5'] },
    ]
  },
  {
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
      { move: 'c5', annotation: '!', explanation: 'Fixing the structure. White has a permanent space advantage.', highlights: ['c5', 'd5'] },
    ]
  },
  {
    id: 'out-26',
    title: 'Outpost Against Isolated Pawn',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Use outpost to blockade isolated pawn',
    keyTakeaway: 'The square in front of an isolated pawn is a natural outpost.',
    difficulty: 3,
    moves: [
      { move: 'Ne5', annotation: '!', explanation: 'Knight blockades the isolated pawn!' },
      { move: 'Nxe5', explanation: 'Black trades.' },
      { move: 'dxe5', explanation: 'Recapturing.' },
      { move: 'Be6', explanation: 'Black develops.' },
      { move: 'Nd4', annotation: '!', explanation: 'Another knight to blockade! The d5 pawn is paralyzed.', highlights: ['d4', 'd5'] },
    ]
  },
  {
    id: 'out-27',
    title: 'Outpost Transformation',
    fen: 'r2q1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 11',
    toMove: 'white',
    concept: 'Transform outpost into attack',
    keyTakeaway: 'An outpost is not just defensive—it can launch attacks.',
    difficulty: 5,
    moves: [
      { move: 'g4', annotation: '!', explanation: 'Starting the pawn storm while knights dominate.' },
      { move: 'Ne5', explanation: 'Black centralizes.' },
      { move: 'g5', annotation: '!', explanation: 'Driving away defenders.' },
      { move: 'Nh5', explanation: 'Knight retreats.' },
      { move: 'Nd5', annotation: '!!', explanation: 'The knight lands with crushing effect!', highlights: ['d5'] },
    ]
  },
  {
    id: 'out-28',
    title: 'Rook Lift to Support Outpost',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/1R2KB1R w K - 0 10',
    toMove: 'white',
    concept: 'Use rook lift to support outpost operations',
    keyTakeaway: 'Rook lifts can add power to outpost-based attacks.',
    difficulty: 4,
    moves: [
      { move: 'Rb3', annotation: '!', explanation: 'The rook prepares to swing to the kingside!' },
      { move: 'a5', explanation: 'Black attacks.' },
      { move: 'Rg3', annotation: '!', explanation: 'Rook joins the attack!' },
      { move: 'Nh5', explanation: 'Black defends.' },
      { move: 'Nd5', annotation: '!', explanation: 'Knight to outpost while rook supports!', arrows: [{ from: 'g3', to: 'g7', color: 'red' }], highlights: ['d5'] },
    ]
  },
  {
    id: 'out-29',
    title: 'Queen + Knight Outpost',
    fen: 'r1b2rk1/pp2ppbp/2np1np1/q7/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 11',
    toMove: 'white',
    concept: 'Queen supports knight on outpost',
    keyTakeaway: 'Queen + knight is the most dangerous attacking duo.',
    difficulty: 4,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'Knight to outpost!' },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', explanation: 'Pawn wedge.' },
      { move: 'Ne5', explanation: 'Black centralizes.' },
      { move: 'Qc2', annotation: '!', explanation: 'Queen prepares to join the attack via h7!', arrows: [{ from: 'c2', to: 'h7', color: 'red' }] },
    ]
  },
  {
    id: 'out-30',
    title: 'Strategic Outpost Trade',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 11',
    toMove: 'white',
    concept: 'Trade outpost knight for strategic advantage',
    keyTakeaway: 'Sometimes trading an outpost piece gains more than keeping it.',
    difficulty: 5,
    moves: [
      { move: 'Nxc6', annotation: '!', explanation: 'Trading to damage Black\'s structure!' },
      { move: 'bxc6', explanation: 'Black recaptures with doubled pawns.' },
      { move: 'Nd5', annotation: '!', explanation: 'Now the other knight has an even better outpost!', highlights: ['c6', 'd5'] },
      { move: 'Nxd5', explanation: 'Black must trade again.' },
      { move: 'exd5', annotation: '!!', explanation: 'The pawn structure is permanently weakened. White will target c6.', highlights: ['c6'] },
    ]
  },
  // ADVANCED & MASTER-LEVEL OUTPOST CONCEPTS (31-60)
  {
    id: 'out-31',
    title: 'The d6 Outpost',
    fen: 'r1bqk2r/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQkq - 0 8',
    toMove: 'white',
    concept: 'Deep outpost penetration',
    keyTakeaway: 'A knight on d6 is often worth more than a rook.',
    difficulty: 5,
    moves: [
      { move: 'Nb5', annotation: '!', explanation: 'Heading to d6!' },
      { move: 'O-O', explanation: 'Black castles.' },
      { move: 'Nd6', annotation: '!!', explanation: 'The knight is a monster here!', highlights: ['d6'] },
    ]
  },
  {
    id: 'out-32',
    title: 'Outpost Chain',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Creating connected outposts',
    keyTakeaway: 'Knights on c5, d5, and e5 form an unbreakable chain.',
    difficulty: 5,
    moves: [
      { move: 'O-O-O', explanation: 'Castling queenside.' },
      { move: 'a6', explanation: 'Black plays.' },
      { move: 'Nc6', annotation: '!', explanation: 'First outpost.' },
      { move: 'bxc6', explanation: 'Black takes.' },
      { move: 'Nd5', annotation: '!', explanation: 'Second outpost, supported by the weakened c6.', highlights: ['c6', 'd5'] },
    ]
  },
  {
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
      { move: 'exf5', annotation: '!', explanation: 'The bishops dominate the open position!' },
    ]
  },
  {
    id: 'out-34',
    title: 'Outpost in the Endgame',
    fen: 'r4rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPP3PP/R4RK1 w - - 0 13',
    toMove: 'white',
    concept: 'Outpost knights in endgames',
    keyTakeaway: 'Outpost knights are especially strong in endgames.',
    difficulty: 4,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'Knight to permanent outpost!' },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', explanation: 'Passed pawn appears.' },
      { move: 'Rfe8', explanation: 'Black activates.' },
      { move: 'Nc6', annotation: '!', explanation: 'Second knight to outpost!', highlights: ['c6', 'd5'] },
    ]
  },
  {
    id: 'out-35',
    title: 'Outpost vs Two Bishops',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Knight outpost neutralizes bishop pair',
    keyTakeaway: 'A strong knight can be worth more than two bishops.',
    difficulty: 5,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'The knight dominates despite Black\'s bishops.' },
      { move: 'Bxd4', explanation: 'Black trades.' },
      { move: 'Bxd4', explanation: 'Recapturing.' },
      { move: 'e6', explanation: 'Attacking the knight.' },
      { move: 'Nxf6+', annotation: '!', explanation: 'Trading for the key defender!' },
    ]
  },
  {
    id: 'out-36',
    title: 'The Octopus Knight',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPP2QPP/R3KB1R w KQ - 0 10',
    toMove: 'white',
    concept: 'Knight controlling all directions',
    keyTakeaway: 'An octopus knight reaches into all parts of the position.',
    difficulty: 4,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'The octopus lands!' },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', explanation: 'Pawn advances.' },
      { move: 'Nb8', explanation: 'Knight retreats.' },
      { move: 'Nf5', annotation: '!!', explanation: 'The other knight becomes the octopus!', highlights: ['f5'] },
    ]
  },
  {
    id: 'out-37',
    title: 'Outpost Preparation: Prophylaxis',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 8',
    toMove: 'white',
    concept: 'Prevent opponent from challenging outpost',
    keyTakeaway: 'Secure the outpost before occupying it.',
    difficulty: 3,
    moves: [
      { move: 'h3', annotation: '!', explanation: 'Preventing ...Bg4.' },
      { move: 'a6', explanation: 'Black prepares b5.' },
      { move: 'Be3', explanation: 'Developing.' },
      { move: 'b5', explanation: 'Black expands.' },
      { move: 'Nd5', annotation: '!', explanation: 'Now the outpost is secure!', highlights: ['d5'] },
    ]
  },
  {
    id: 'out-38',
    title: 'Trading to Create Outpost',
    fen: 'r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6',
    toMove: 'white',
    concept: 'Exchange to create outpost square',
    keyTakeaway: 'Trade pawns or pieces to create new outpost squares.',
    difficulty: 3,
    moves: [
      { move: 'cxd5', annotation: '!', explanation: 'Opening the position.' },
      { move: 'exd5', explanation: 'Black recaptures.' },
      { move: 'Bd3', explanation: 'Developing.' },
      { move: 'Bd6', explanation: 'Black develops.' },
      { move: 'e4', annotation: '!', explanation: 'Creating the e5 outpost!', highlights: ['e5'] },
    ]
  },
  {
    id: 'out-39',
    title: 'Outpost with Rook Behind',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/3RKB1R w K - 0 10',
    toMove: 'white',
    concept: 'Rook supports outpost from behind',
    keyTakeaway: 'Rooks behind outpost pieces add tremendous power.',
    difficulty: 4,
    moves: [
      { move: 'O-O-O', annotation: '!', explanation: 'Completing development.' },
      { move: 'e5', explanation: 'Black challenges.' },
      { move: 'Nf5', annotation: '!', explanation: 'Knight to outpost!' },
      { move: 'Bxf5', explanation: 'Black trades.' },
      { move: 'exf5', explanation: 'Rook is now behind the pawn!', highlights: ['f5'] },
    ]
  },
  {
    id: 'out-40',
    title: 'The e6 Outpost',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Deep penetration outpost',
    keyTakeaway: 'e6 outpost disrupts Black\'s coordination.',
    difficulty: 5,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'First outpost.' },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', explanation: 'Pawn advances.' },
      { move: 'Ne5', explanation: 'Black centralizes.' },
      { move: 'Ne6', annotation: '!!', explanation: 'The knight on e6 is crushing!', highlights: ['e6'] },
    ]
  },
  {
    id: 'out-41',
    title: 'Outpost and Weak Squares',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPP1Q1PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Outpost exploits weak square complex',
    keyTakeaway: 'Outposts often come with control of nearby weak squares.',
    difficulty: 4,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'The knight controls d5, c7, e7, f6.' },
      { move: 'e6', explanation: 'Black tries to kick it.' },
      { move: 'Nxf6+', annotation: '!', explanation: 'Trading for a key piece!' },
      { move: 'Bxf6', explanation: 'Black recaptures.' },
      { move: 'Nf5', annotation: '!', explanation: 'The other knight takes over!', highlights: ['f5'] },
    ]
  },
  {
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
      { move: 'Nxf6+', annotation: '!', explanation: 'The outpost has done its job!' },
    ]
  },
  {
    id: 'out-43',
    title: 'Outpost with Pawn Storm',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 11',
    toMove: 'white',
    concept: 'Combine outpost with kingside attack',
    keyTakeaway: 'Outpost supports pawn storm.',
    difficulty: 4,
    moves: [
      { move: 'g4', annotation: '!', explanation: 'Starting the storm!' },
      { move: 'Ne5', explanation: 'Black centralizes.' },
      { move: 'Nd5', annotation: '!', explanation: 'Knight supports the attack!', highlights: ['d5'] },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', explanation: 'Pawn wedge.' },
      { move: 'Nd7', explanation: 'Knight retreats.' },
      { move: 'g5', annotation: '!', explanation: 'Storm continues!' },
    ]
  },
  {
    id: 'out-44',
    title: 'Blockade Outpost',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/3P4/4P3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 10',
    toMove: 'white',
    concept: 'Outpost to blockade passed pawn',
    keyTakeaway: 'Place knights on blockade squares.',
    difficulty: 3,
    moves: [
      { move: 'Nd4', annotation: '!', explanation: 'The knight blockades and controls.' },
      { move: 'e6', explanation: 'Black challenges the center.' },
      { move: 'dxe6', explanation: 'Taking en passant.' },
      { move: 'Bxe6', explanation: 'Black recaptures.' },
      { move: 'Nc6', annotation: '!', explanation: 'Now this becomes an outpost!', highlights: ['c6'] },
    ]
  },
  {
    id: 'out-45',
    title: 'Outpost on the 6th Rank',
    fen: 'r1bq1rk1/pp2ppbp/2Np1np1/8/4P3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 11',
    toMove: 'white',
    concept: 'Deep outpost penetration',
    keyTakeaway: 'A knight on the 6th rank ties down many pieces.',
    difficulty: 4,
    moves: [
      { move: 'O-O-O', annotation: '!', explanation: 'The knight on c6 dominates!' },
      { move: 'b6', explanation: 'Trying to challenge.' },
      { move: 'Na5', annotation: '!', explanation: 'Keeping the outpost effect.', highlights: ['a5'] },
    ]
  },
  {
    id: 'out-46',
    title: 'Permanent vs Temporary Outpost',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Evaluate outpost permanence',
    keyTakeaway: 'Permanent outposts are more valuable than temporary ones.',
    difficulty: 4,
    moves: [
      { move: 'f4', annotation: '!', explanation: 'Securing the e5 square permanently.' },
      { move: 'e5', explanation: 'Black challenges.' },
      { move: 'Nf5', annotation: '!', explanation: 'This outpost is permanent!', highlights: ['f5'] },
    ]
  },
  {
    id: 'out-47',
    title: 'Outpost for Attack',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 11',
    toMove: 'white',
    concept: 'Outpost as attacking platform',
    keyTakeaway: 'Knights on outposts launch devastating attacks.',
    difficulty: 4,
    moves: [
      { move: 'Nf5', annotation: '!', explanation: 'Threatening Nxg7!' },
      { move: 'Bxf5', explanation: 'Black must trade.' },
      { move: 'exf5', explanation: 'Opening lines!' },
      { move: 'Kh8', explanation: 'Black hides.' },
      { move: 'Nd5', annotation: '!', explanation: 'Another knight joins!', highlights: ['d5'] },
    ]
  },
  {
    id: 'out-48',
    title: 'The h5 Outpost',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/7N/4P3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 10',
    toMove: 'white',
    concept: 'Rim outpost for attack',
    keyTakeaway: 'h5 knight controls f6 and f4.',
    difficulty: 4,
    moves: [
      { move: 'Ng3', annotation: '!', explanation: 'Repositioning for Nf5.' },
      { move: 'e5', explanation: 'Black challenges.' },
      { move: 'Nf5', annotation: '!', explanation: 'The knight lands!', highlights: ['f5'] },
    ]
  },
  {
    id: 'out-49',
    title: 'Outpost with Minority Attack',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/1P1NP3/2N1BP2/P1PQ2PP/R3KB1R w KQ - 0 10',
    toMove: 'white',
    concept: 'Combine outpost with pawn play',
    keyTakeaway: 'Outpost knights support minority attacks.',
    difficulty: 4,
    moves: [
      { move: 'b5', annotation: '!', explanation: 'Minority attack begins!' },
      { move: 'Na5', explanation: 'Black challenges.' },
      { move: 'Nc6', annotation: '!', explanation: 'Knight invades!', highlights: ['c6'] },
    ]
  },
  {
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
      { move: 'g4', annotation: '!', explanation: 'Storm continues!' },
    ]
  },
  {
    id: 'out-51',
    title: 'Outpost Exchange',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'When to trade outpost pieces',
    keyTakeaway: 'Trade outpost pieces to create permanent damage.',
    difficulty: 4,
    moves: [
      { move: 'Nxc6', annotation: '!', explanation: 'Trading to damage structure.' },
      { move: 'bxc6', explanation: 'Doubled pawns!' },
      { move: 'Na4', annotation: '!', explanation: 'Targeting the weak c5 square.', highlights: ['c5', 'c6'] },
    ]
  },
  {
    id: 'out-52',
    title: 'Outpost Defense',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/3N4/4P3/2N1BP2/PPPQ2PP/R3KB1R b KQ - 0 9',
    toMove: 'black',
    concept: 'How to handle enemy outposts',
    keyTakeaway: 'Trade outpost pieces when possible.',
    difficulty: 4,
    moves: [
      { move: 'Nxd5', annotation: '!', explanation: 'Trading the monster!' },
      { move: 'exd5', explanation: 'White recaptures.' },
      { move: 'Nb4', annotation: '!', explanation: 'Now Black attacks the structure.', highlights: ['b4'] },
    ]
  },
  {
    id: 'out-53',
    title: 'Outpost Prevention',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQ1RK1 b - - 0 8',
    toMove: 'black',
    concept: 'Prevent enemy outposts',
    keyTakeaway: 'Control potential outpost squares with pawns.',
    difficulty: 3,
    moves: [
      { move: 'e5', annotation: '!', explanation: 'Challenging the center!' },
      { move: 'dxe5', explanation: 'White takes.' },
      { move: 'dxe5', annotation: '!', explanation: 'Now d4 is not an outpost for White.', highlights: ['d4'] },
    ]
  },
  {
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
      { move: 'Nf5', annotation: '!', explanation: 'Now the outpost AND activity!' },
    ]
  },
  {
    id: 'out-55',
    title: 'Outpost in the Opening',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4',
    toMove: 'white',
    concept: 'Early outpost creation',
    keyTakeaway: 'Create outposts early in the game.',
    difficulty: 2,
    moves: [
      { move: 'd5', annotation: '!', explanation: 'Immediate outpost creation!' },
      { move: 'Nb8', explanation: 'Knight retreats.' },
      { move: 'Nf3', annotation: '!', explanation: 'Developing and eyeing e5.', highlights: ['e5'] },
    ]
  },
  {
    id: 'out-56',
    title: 'Outpost Network',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PNP3/2N1BP2/PP1Q2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Creating connected outposts',
    keyTakeaway: 'Connected outposts multiply in power.',
    difficulty: 5,
    moves: [
      { move: 'c5', annotation: '!', explanation: 'Creating the d5-c5 outpost network!' },
      { move: 'dxc5', explanation: 'Black takes.' },
      { move: 'Nd5', annotation: '!', explanation: 'Now d5 is permanent!' },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', annotation: '!', explanation: 'The pawn wedge dominates.', highlights: ['c5', 'd5'] },
    ]
  },
  {
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
      { move: 'Nc6', annotation: '!!', explanation: 'But this is even stronger!' },
    ]
  },
  {
    id: 'out-58',
    title: 'Outpost and Space',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 9',
    toMove: 'white',
    concept: 'Outpost enhances space advantage',
    keyTakeaway: 'Outposts amplify space advantage.',
    difficulty: 4,
    moves: [
      { move: 'O-O-O', explanation: 'Castling.' },
      { move: 'a6', explanation: 'Black plays.' },
      { move: 'g4', annotation: '!', explanation: 'Gaining even more space!' },
      { move: 'b5', explanation: 'Black counterattacks.' },
      { move: 'Nd5', annotation: '!', explanation: 'Outpost secures the space.', highlights: ['d5'] },
    ]
  },
  {
    id: 'out-59',
    title: 'Outpost in IQP Positions',
    fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 10',
    toMove: 'white',
    concept: 'Outpost in front of isolated pawn',
    keyTakeaway: 'The square in front of IQP is a natural outpost.',
    difficulty: 3,
    moves: [
      { move: 'Ne5', annotation: '!', explanation: 'Blockading the IQP!' },
      { move: 'Nxe5', explanation: 'Black trades.' },
      { move: 'dxe5', explanation: 'Recapturing.' },
      { move: 'Be6', explanation: 'Black develops.' },
      { move: 'Nd4', annotation: '!', explanation: 'Another blockading outpost!', highlights: ['d4', 'd5'] },
    ]
  },
  {
    id: 'out-60',
    title: 'The Ultimate Outpost',
    fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 11',
    toMove: 'white',
    concept: 'Multiple outposts working together',
    keyTakeaway: 'The ultimate position has knights on d5, e6, and f5.',
    difficulty: 5,
    moves: [
      { move: 'Nd5', annotation: '!', explanation: 'First outpost!' },
      { move: 'Nxd5', explanation: 'Black trades.' },
      { move: 'exd5', explanation: 'Pawn wedge.' },
      { move: 'Nb4', explanation: 'Black attacks.' },
      { move: 'Nf5', annotation: '!!', explanation: 'Second outpost creates total domination!' },
      { move: 'Bxf5', explanation: 'Black must trade.' },
      { move: 'Bxf5', explanation: 'The bishop pair and passed pawn win.' },
    ]
  },
];

export default outpostsVariations;
