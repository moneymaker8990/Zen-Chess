import { Chess } from 'chess.js';

// Correct PGN from web search - Fischer vs Spassky 1972 Game 6
const pgnMoves = `c4 e6 Nf3 d5 d4 Nf6 Nc3 Be7 Bg5 O-O e3 h6 Bh4 b6 cxd5 Nxd5 Bxe7 Qxe7 Nxd5 exd5 Rc1 Be6 Qa4 c5 Qa3 Rc8 Bb5 a6 dxc5 bxc5 O-O Ra7 Be2 Nd7 Nd4 Qf8 Nxe6 fxe6 e4 d4 f4 Qe7 e5 Rb8 Bc4 Kh8 Qh3 Nf8 b3 a5 f5 exf5 Rxf5 Nh7 Rcf1 Qd8 Qg3 Re7 h4 Rbb7 e6 Rbc7 Qe5 Qe8 a4 Qd8 R1f2 Qe8 R2f3 Qd8 Bd3 Qe8 Qe4 Nf6 Rxf6 gxf6 Rxf6 Kg8 Bc4 Kh8 Qf4`.split(' ');

const chess = new Chess();
const moves: Array<{ move: string; fen: string; comment?: string; isKeyMove?: boolean; evaluation?: string }> = [];

// Key move indices (move numbers in chess notation, 1-indexed)
const keyMoves = new Set([8, 12, 15, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]);

const comments: Record<number, string> = {
  0: 'Fischer opens with the English Opening, a flexible choice.',
  1: 'Spassky responds with a solid setup.',
  2: 'Developing the knight.',
  3: 'Striking at the center.',
  4: 'Claiming the center.',
  5: 'Developing the knight.',
  6: 'Developing the bishop.',
  7: 'Pinning the knight.',
  8: 'Castling.',
  9: 'Supporting the center.',
  10: 'Trying to drive away the bishop.',
  11: 'Retreating.',
  12: 'Preparing the bishop fianchetto.',
  13: 'Exchanging.',
  14: 'Recapturing.',
  15: 'Exchanging.',
  16: 'Recapturing.',
  17: 'Activating the rook.',
  18: 'The bishop develops.',
  19: 'Attacking c5.',
  20: 'The queen takes an active post.',
  21: 'Seizing the c-file.',
  22: 'Attacking the bishop.',
  23: 'Forced exchange.',
  24: 'Recapturing.',
  25: 'Castling.',
  26: 'The rook activates.',
  27: 'The queen repositions.',
  28: 'The rook activates.',
  29: 'The knight retreats.',
  30: 'The knight repositions.',
  31: 'The knight takes a powerful central square!',
  32: 'Exchanging.',
  33: 'Recapturing.',
  34: 'Opening lines!',
  35: 'The pawn advances.',
  36: 'Breaking through!',
  37: 'The rook invades!',
  38: 'The rook takes an active post.',
  39: 'The rook activates.',
  40: 'The queen takes an active post.',
  41: 'The pawn advances.',
  42: 'The rook invades!',
  43: 'The rook activates.',
  44: 'The queen takes an active post.',
  45: 'The pawn advances.',
  46: 'The rook invades!',
  47: 'The rook activates.',
  48: 'The queen takes an active post.',
  49: 'The pawn advances.',
  50: 'The rook invades!',
  51: 'The rook activates.',
  52: 'The queen takes an active post.',
  53: 'The pawn advances.',
  54: 'The rook invades!',
  55: 'The rook activates.',
  56: 'The queen takes an active post.',
  57: 'The pawn advances.',
  58: 'The rook invades!',
  59: 'The rook activates.',
  60: 'The queen takes an active post.',
  61: 'The pawn advances.',
  62: 'The rook invades!',
  63: 'The rook activates.',
  64: 'The queen takes an active post.',
  65: 'The pawn advances.',
  66: 'The rook invades!',
  67: 'The rook activates.',
  68: 'The queen takes an active post.',
  69: 'The pawn advances.',
  70: 'The rook invades!',
  71: 'The rook activates.',
  72: 'The queen takes an active post.',
  73: 'The pawn advances.',
  74: 'The rook invades!',
  75: 'The rook activates.',
  76: 'The queen takes an active post.',
  77: 'The pawn advances.',
  78: 'The rook invades!',
  79: 'The rook activates.',
  80: 'The queen takes an active post.',
};

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
  } else {
    console.error(`Invalid move at index ${i}: ${pgnMoves[i]}`);
    break;
  }
}

// Output formatted for games.ts
console.log('Corrected moves array:\n');
moves.forEach((m, i) => {
  const parts = [`{ move: '${m.move}'`, `fen: '${m.fen}'`];
  if (m.comment) parts.push(`comment: '${m.comment.replace(/'/g, "\\'")}'`);
  if (m.isKeyMove) parts.push(`isKeyMove: true`);
  if (m.evaluation) parts.push(`evaluation: '${m.evaluation}'`);
  console.log(`      ${parts.join(', ')},`);
});

console.log(`\nTotal moves: ${moves.length}`);


