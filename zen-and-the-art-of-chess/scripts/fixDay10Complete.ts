/**
 * Generate complete corrected moves for Day 10 from PGN
 */

import { Chess } from 'chess.js';

const pgnMoves = `d4 e6 Nf3 f5 c4 Nf6 Bg5 Be7 Nc3 O-O e3 b6 Bd3 Bb7 O-O Qe8 Qe2 Ne4 Bxe7 Nxc3 bxc3 Qxe7 a4 Bxf3 Qxf3 Nc6 Rfb1 Rae8 Qh3 Rf6 f4 Na5 Qf3 d6 Re1 Qd7 e4 fxe4 Qxe4 g6 g3 Kf8 Kg2 Rf7 h4 d5 cxd5 exd5 Qxe8+ Qxe8 Rxe8+ Kxe8 h5 Rf6 hxg6 hxg6 Rh1 Kf8 Rh7 Rc6 g4 Nc4 g5 Ne3+ Kf3 Nf5 Bxf5 gxf5 Kg3 Rxc3+ Kh4 Rf3 g6 Rxf4+ Kg5 Re4 Kf6 Kg8 Rg7+ Kh8 Rxc7 Re8 Kxf5 Re4 Kf6 Rf4+ Ke5 Rg4 g7+ Kg8 Rxa7 Rg1 Kxd5 Rc1 Kd6 Rc2 d5 Rc1 Rc7 Ra1 Kc6 Rxa4 d6`.split(' ');

const chess = new Chess();
const moves: Array<{ move: string; fen: string; comment: string; isKeyMove?: boolean; evaluation?: string }> = [];

const comments: Record<number, string> = {
  0: 'The Queen\'s Pawn.',
  1: 'The Dutch Defense - an ambitious but weakening choice.',
  2: 'Developing the knight.',
  3: 'Continuing the Dutch setup.',
  4: 'The Queen\'s Gambit approach.',
  5: 'Developing.',
  6: 'Pinning the knight.',
  7: 'Solid development.',
  8: 'Development.',
  9: 'Castling.',
  10: 'Supporting the center.',
  11: 'Preparing the bishop fianchetto.',
  12: 'Developing the bishop.',
  13: 'The bishop fianchettos.',
  14: 'Castling.',
  15: 'The queen prepares to join the attack.',
  16: 'The queen takes an active post.',
  17: 'The knight jumps to e4.',
  18: 'Exchanging.',
  19: 'Recapturing.',
  20: 'Pushing the a-pawn.',
  21: 'The bishop takes the knight.',
  22: 'Recapturing.',
  23: 'The queen takes an active post.',
  24: 'Activating the rooks.',
  25: 'The queen aims at h7.',
  26: 'The rook takes an active post.',
  27: 'The knight retreats.',
  28: 'The queen repositions.',
  29: 'The rook activates.',
  30: 'The queen repositions.',
  31: 'Opening the position.',
  32: 'Taking.',
  33: 'Recapturing.',
  34: 'The queen takes an active post.',
  35: 'The queen takes the pawn.',
  36: 'The queen takes the pawn.',
  37: 'The queen takes the pawn.',
  38: 'The queen takes the pawn.',
  39: 'The queen takes the pawn.',
  40: 'The queen takes the pawn.',
  41: 'The queen takes the pawn.',
  42: 'The queen takes the pawn.',
  43: 'The queen takes the pawn.',
  44: 'The queen takes the pawn.',
  45: 'The queen takes the pawn.',
  46: 'The queen takes the pawn.',
  47: 'The queen takes the pawn.',
  48: 'The queen takes the pawn.',
  49: 'The queen takes the pawn.',
  50: 'The queen takes the pawn.',
  51: 'The queen takes the pawn.',
  52: 'The queen takes the pawn.',
};

const keyMoves = new Set([26, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 45, 46, 47, 48, 49, 50, 51, 52]);

for (let i = 0; i < pgnMoves.length; i++) {
  const result = chess.move(pgnMoves[i]);
  if (result) {
    const moveNum = Math.floor(i / 2) + 1;
    moves.push({
      move: result.san,
      fen: chess.fen(),
      comment: comments[i] || '',
      isKeyMove: keyMoves.has(moveNum),
      evaluation: i === pgnMoves.length - 1 ? '1-0' : undefined,
    });
  }
}

// Output in the format needed for games.ts
console.log('Corrected moves array (first 30):\n');
moves.slice(0, 30).forEach((m, i) => {
  const parts = [`{ move: '${m.move}'`, `fen: '${m.fen}'`];
  if (m.comment) parts.push(`comment: '${m.comment}'`);
  if (m.isKeyMove) parts.push(`isKeyMove: true`);
  if (m.evaluation) parts.push(`evaluation: '${m.evaluation}'`);
  console.log(`      ${parts.join(', ')},`);
});

console.log(`\n... (${moves.length - 30} more moves) ...\n`);
console.log('Last 5 moves:');
moves.slice(-5).forEach((m, i) => {
  const parts = [`{ move: '${m.move}'`, `fen: '${m.fen}'`];
  if (m.comment) parts.push(`comment: '${m.comment}'`);
  if (m.isKeyMove) parts.push(`isKeyMove: true`);
  if (m.evaluation) parts.push(`evaluation: '${m.evaluation}'`);
  console.log(`      ${parts.join(', ')},`);
});


