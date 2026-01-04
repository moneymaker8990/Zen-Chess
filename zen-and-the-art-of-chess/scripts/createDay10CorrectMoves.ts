/**
 * Create the complete correct move sequence for Day 10 from PGN
 */

import { Chess } from 'chess.js';

const pgnMoves = `d4 e6 Nf3 f5 c4 Nf6 Bg5 Be7 Nc3 O-O e3 b6 Bd3 Bb7 O-O Qe8 Qe2 Ne4 Bxe7 Nxc3 bxc3 Qxe7 a4 Bxf3 Qxf3 Nc6 Rfb1 Rae8 Qh3 Rf6 f4 Na5 Qf3 d6 Re1 Qd7 e4 fxe4 Qxe4 g6 g3 Kf8 Kg2 Rf7 h4 d5 cxd5 exd5 Qxe8+ Qxe8 Rxe8+ Kxe8 h5 Rf6 hxg6 hxg6 Rh1 Kf8 Rh7 Rc6 g4 Nc4 g5 Ne3+ Kf3 Nf5 Bxf5 gxf5 Kg3 Rxc3+ Kh4 Rf3 g6 Rxf4+ Kg5 Re4 Kf6 Kg8 Rg7+ Kh8 Rxc7 Re8 Kxf5 Re4 Kf6 Rf4+ Ke5 Rg4 g7+ Kg8 Rxa7 Rg1 Kxd5 Rc1 Kd6 Rc2 d5 Rc1 Rc7 Ra1 Kc6 Rxa4 d6`.split(' ');

const chess = new Chess();
const moves: Array<{ move: string; fen: string; comment: string; isKeyMove?: boolean; evaluation?: string }> = [];

// Key comments for important moves
const moveComments: Record<number, string> = {
  26: 'The rook invades the hostile camp! This is the calamity - the Rook now enters the hostile camp.',
  30: 'The rook reaches the 7th rank - a classic endgame theme. White plays logically to utilize his advantage on the K-side.',
  31: 'Anxious nature might have moved the King towards the queenside, but Capablanca adheres to the principle of aggression that governs rook endings.',
  32: 'He gives his opponent the opportunity of winning a pawn. But Capablanca has confidence in the passed pawn which he obtains.',
  33: 'Simple and compelling.',
  34: 'Decisive! White sacrifices material in order to obtain the classical position with King on f6, pawn on g6, and Rook on h7, whereupon the black pawns tumble like ripe apples.',
  35: 'It is extremely instructive to see how Capablanca is no longer in the least concerned about material equality, but thinks only of supporting his passed pawn.',
  38: 'It is a frequently available finesse in such positions not to capture hostile pawns, but to pass them by in order to be protected in the rear against checks by the rook.',
  42: 'Again the simplest. Kf7 would not yet have been disastrous because of Rd8, etc.',
  45: 'After exchanging rooks, White would win still more easily.',
  51: 'The king reaches c6, supporting the passed pawn.',
  52: 'Capablanca\'s management of the endgame gives the impression of being so natural that one easily forgets the difficulty of such precise play. The difficulty is chiefly psychological. In chess, as in life, one is so accustomed to place value on the material factors that it is not easy to conceive the idea of indulging in pawn sacrifices when there is so little available material.',
};

const keyMoveNumbers = new Set([26, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 45, 46, 47, 48, 49, 50, 51, 52]);

for (let i = 0; i < pgnMoves.length; i++) {
  const result = chess.move(pgnMoves[i]);
  if (result) {
    const moveNum = Math.floor(i / 2) + 1;
    const comment = moveComments[moveNum] || '';
    moves.push({
      move: result.san,
      fen: chess.fen(),
      comment,
      isKeyMove: keyMoveNumbers.has(moveNum),
      evaluation: i === pgnMoves.length - 1 ? '1-0' : undefined,
    });
  }
}

// Output formatted for games.ts
let output = '      [\n';
moves.forEach((m, i) => {
  const parts: string[] = [];
  parts.push(`move: '${m.move}'`);
  parts.push(`fen: '${m.fen}'`);
  if (m.comment) parts.push(`comment: '${m.comment.replace(/'/g, "\\'")}'`);
  if (m.isKeyMove) parts.push(`isKeyMove: true`);
  if (m.evaluation) parts.push(`evaluation: '${m.evaluation}'`);
  output += `      { ${parts.join(', ')}},\n`;
});
output += '      ],\n';

console.log(output);
console.log(`\nTotal moves: ${moves.length}`);


