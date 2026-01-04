/**
 * Analyze broken patterns and find correct moves
 */

import { Chess } from 'chess.js';
import { enhancedPatterns, type EnhancedPattern } from '../src/data/positional/enhancedPatterns';

function normalizeMove(move: string): string {
  return move
    .replace(/0-0-0/g, 'O-O-O')
    .replace(/0-0/g, 'O-O')
    .replace(/[!?+#]+/g, '')
    .trim();
}

function findCorrectMove(game: Chess, expectedMove: string): { move: string; reason: string } | null {
  const legalMoves = game.moves({ verbose: true });
  const normalizedExpected = normalizeMove(expectedMove);
  
  // Extract destination square
  const destMatch = normalizedExpected.match(/([a-h][1-8])/);
  if (!destMatch) return null;
  const destSquare = destMatch[1];
  
  // Try matching by destination for piece moves
  if (/^[NBRQK]/.test(normalizedExpected)) {
    const pieceExpected = normalizedExpected[0];
    const pieceMoves = legalMoves.filter(m => 
      m.san[0] === pieceExpected && m.to === destSquare
    );
    
    if (pieceMoves.length === 1) {
      return { move: pieceMoves[0].san, reason: `Single ${pieceExpected} move to ${destSquare}` };
    }
    
    if (pieceMoves.length > 1) {
      // Try disambiguation
      const disambigMatch = normalizedExpected.match(/^([NBRQK])([a-h1-8]?)[x]?([a-h][1-8])/);
      if (disambigMatch) {
        const [, , sourceHint] = disambigMatch;
        if (sourceHint) {
          if (/[a-h]/.test(sourceHint)) {
            const fileMatch = pieceMoves.find(m => m.from[0] === sourceHint);
            if (fileMatch) return { move: fileMatch.san, reason: `File disambiguation: ${sourceHint}` };
          }
          if (/[1-8]/.test(sourceHint)) {
            const rankMatch = pieceMoves.find(m => m.from[1] === sourceHint);
            if (rankMatch) return { move: rankMatch.san, reason: `Rank disambiguation: ${sourceHint}` };
          }
        }
      }
      
      // If capture, prefer capture moves
      if (normalizedExpected.includes('x')) {
        const captureMove = pieceMoves.find(m => m.san.includes('x'));
        if (captureMove) return { move: captureMove.san, reason: `Capture move to ${destSquare}` };
      }
      
      return { move: pieceMoves[0].san, reason: `Multiple ${pieceExpected} moves, using first` };
    }
  }
  
  // Try matching by destination for pawn moves
  if (/^[a-h]/.test(normalizedExpected)) {
    const sourceFile = normalizedExpected[0];
    const pawnMoves = legalMoves.filter(m => 
      /^[a-h]/.test(m.san) && m.to === destSquare && m.from[0] === sourceFile
    );
    if (pawnMoves.length > 0) {
      return { move: pawnMoves[0].san, reason: `Pawn move from ${sourceFile} to ${destSquare}` };
    }
  }
  
  return null;
}

// Broken patterns from validation
const brokenPatterns = [
  { id: 'weak-iqp-blockade', moveIndex: 6, move: 'Nd4' },
  { id: 'structure-minority-attack', moveIndex: 5, move: 'Bd2' },
  { id: 'prophylaxis-prevent-break', moveIndex: 5, move: 'Bb7' },
  { id: 'bishop-pair-open-position', moveIndex: 0, move: 'd5' },
  { id: 'blockade-nimzo-knight', moveIndex: 2, move: 'Nf1' },
  { id: 'pawn-break-f5-kings-indian', moveIndex: 0, move: 'f5' },
  { id: 'coordination-rook-lift', moveIndex: 7, move: 'Nf6' },
  { id: 'structure-iqp-attack', moveIndex: 4, move: 'Qxh6' },
  { id: 'open-file-seventh-rank', moveIndex: 1, move: 'Rf7' },
  { id: 'open-file-control', moveIndex: 2, move: 'Rxd8' },
  { id: 'bishop-pair-open-position', moveIndex: 1, move: 'Nh5' },
  { id: 'space-advantage-restrict', moveIndex: 3, move: 'Bxe5' },
  { id: 'minority-attack-classic', moveIndex: 2, move: 'axb4' },
  { id: 'centralization-pieces', moveIndex: 3, move: 'dxe5' },
  { id: 'centralization-queen', moveIndex: 4, move: 'Qd4' },
  { id: 'pawn-structure-carlsbad', moveIndex: 0, move: 'O-O' },
  { id: 'bishop-pair-endgame', moveIndex: 0, move: 'Bd5+' },
  { id: 'pawn-break-c5', moveIndex: 0, move: 'c5' },
  { id: 'exchange-simplify', moveIndex: 0, move: 'Nxf6+' },
  { id: 'blockade-passed-pawn', moveIndex: 0, move: 'Kd3' },
  { id: 'minority-attack-execution', moveIndex: 1, move: 'cxb5' },
];

console.log('Analyzing broken patterns...\n');

for (const broken of brokenPatterns) {
  const pattern = enhancedPatterns.find(p => p.id === broken.id);
  if (!pattern) {
    console.log(`❌ Pattern not found: ${broken.id}`);
    continue;
  }
  
  const game = new Chess(pattern.fen);
  
  // Replay moves up to the error
  for (let i = 0; i < broken.moveIndex; i++) {
    const move = pattern.mainLine[i];
    if (!move) break;
    const normalized = normalizeMove(move.move);
    const result = game.move(normalized);
    if (!result) {
      console.log(`⚠️  ${broken.id}: Move ${i} failed before error move`);
      break;
    }
  }
  
  // Now try to find the correct move
  const correctMove = findCorrectMove(game, broken.move);
  
  if (correctMove) {
    console.log(`✅ ${broken.id}:`);
    console.log(`   Move ${broken.moveIndex + 1}: "${broken.move}" → "${correctMove.move}"`);
    console.log(`   Reason: ${correctMove.reason}`);
    console.log(`   Position: ${game.fen()}`);
    console.log('');
  } else {
    console.log(`❌ ${broken.id}: Could not find correct move for "${broken.move}"`);
    console.log(`   Position: ${game.fen()}`);
    console.log(`   Legal moves: ${game.moves().slice(0, 10).join(', ')}`);
    console.log('');
  }
}

