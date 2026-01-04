import { Chess } from 'chess.js';

// Correct PGN from web search - Steinitz vs Bardeleben 1895
const pgnMoves = `e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d4 exd4 cxd4 Bb4+ Nc3 d5 exd5 Nxd5 O-O Be6 Bg5 Be7 Bxd5 Bxd5 Nxd5 Qxd5 Bxe7 Nxe7 Re1 f6 Qe2 Qd7 Rac1 c6 d5 cxd5 Nd4 Kf7 Ne6 Rhc8 Qg4 g6 Ng5+ Ke8 Rxe7+ Kf8 Rf7+ Kg8 Rg7+ Kh8 Rxh7+ Kg8 Rg7+ Kh8 Qh4+ Kxg7 Qh7+ Kf8 Qh8+ Ke7 Qg7+ Ke8 Qg8+ Ke7 Qf7+ Kd8 Qf8+ Qe8 Nf7+ Kd7 Qd6#`.split(' ');

const chess = new Chess();
const moves: Array<{ move: string; fen: string; comment?: string; isKeyMove?: boolean; evaluation?: string }> = [];

// Key move indices (move numbers in chess notation, 1-indexed)
const keyMoves = new Set([8, 9, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]);

const comments: Record<number, string> = {
  0: 'The King\'s Pawn opening.',
  1: 'Classical response.',
  2: 'Developing and attacking.',
  3: 'Defending.',
  4: 'The Italian Game.',
  5: 'Symmetrical development.',
  6: 'Preparing d4.',
  7: 'Development.',
  8: 'Striking at the center!',
  9: 'Taking.',
  10: 'Recapturing with an ideal pawn center.',
  11: 'Check, gaining time.',
  12: 'Blocking with development.',
  13: 'Striking back at the center.',
  14: 'Taking.',
  15: 'Recapturing.',
  16: 'Castling and bringing the rook to the center.',
  17: 'Blocking.',
  18: 'Pinning the knight!',
  19: 'Developing and preparing to castle.',
  20: 'Exchanging.',
  21: 'Recapturing.',
  22: 'Recapturing.',
  23: 'Recapturing.',
  24: 'Exchanging.',
  25: 'Recapturing.',
  26: 'Activating the rook.',
  27: 'Trying to block.',
  28: 'The queen prepares to join the attack.',
  29: 'The queen retreats.',
  30: 'Activating the other rook.',
  31: 'Solidifying the center.',
  32: 'Opening the position!',
  33: 'Recapturing.',
  34: 'The knight jumps to a powerful square.',
  35: 'The king moves forward, but this is dangerous.',
  36: 'The knight invades!',
  37: 'Activating the rook.',
  38: 'The queen joins the attack!',
  39: 'Trying to block, but...',
  40: 'Check! The knight attacks!',
  41: 'The king retreats.',
  42: 'SACRIFICE! The rook takes!',
  43: 'The king runs.',
  44: 'Check! The rook pursues!',
  45: 'The king continues running.',
  46: 'Check! The rook continues the chase!',
  47: 'The king is forced to the corner.',
  48: 'Check! Taking the pawn!',
  49: 'The king must return.',
  50: 'Check! The rook returns!',
  51: 'The king is trapped in the corner.',
  52: 'Check! The queen joins!',
  53: 'The king takes the rook, but the attack continues.',
  54: 'Check!',
  55: 'Running.',
  56: 'Check!',
  57: 'The king runs to the center.',
  58: 'Check!',
  59: 'The king retreats.',
  60: 'Check!',
  61: 'The king must return.',
  62: 'Check!',
  63: 'The king runs to the queenside.',
  64: 'Check!',
  65: 'The queen blocks, but...',
  66: 'Check! The knight delivers the final blow!',
  67: 'The king has nowhere to go.',
  68: 'CHECKMATE! The king walk ends in mate! This is where Bardeleben left the hall rather than face the humiliation. One of the most beautiful king hunts in chess history.',
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
moves.forEach((m, i) => {
  const parts = [`{ move: '${m.move}'`, `fen: '${m.fen}'`];
  if (m.comment) parts.push(`comment: '${m.comment.replace(/'/g, "\\'")}'`);
  if (m.isKeyMove) parts.push(`isKeyMove: true`);
  if (m.evaluation) parts.push(`evaluation: '${m.evaluation}'`);
  console.log(`      ${parts.join(', ')},`);
});


