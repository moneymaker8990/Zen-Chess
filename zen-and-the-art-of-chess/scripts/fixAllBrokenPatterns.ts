/**
 * Fix all broken patterns systematically
 * For each broken pattern, analyze the position and find the correct move
 */

import { Chess } from 'chess.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the pattern files
const enhancedPatternsPath = path.join(__dirname, '../src/data/positional/enhancedPatterns.ts');
const morePatternsPath = path.join(__dirname, '../src/data/positional/morePatterns.ts');

interface PatternFix {
  patternId: string;
  file: 'enhancedPatterns' | 'morePatterns';
  moveIndex: number;
  originalMove: string;
  fixedMove: string;
  reason: string;
}

function normalizeMove(move: string): string {
  return move
    .replace(/0-0-0/g, 'O-O-O')
    .replace(/0-0/g, 'O-O')
    .replace(/[!?+#]+/g, '')
    .trim();
}

function findCorrectMove(game: Chess, expectedMove: string, legalMoves: string[]): string | null {
  const normalizedExpected = normalizeMove(expectedMove);
  const destMatch = normalizedExpected.match(/([a-h][1-8])/);
  if (!destMatch) return null;
  const destSquare = destMatch[1];
  
  // Try exact match first
  if (legalMoves.includes(expectedMove)) return expectedMove;
  if (legalMoves.includes(normalizedExpected)) return normalizedExpected;
  
  // Try piece moves
  if (/^[NBRQK]/.test(normalizedExpected)) {
    const pieceExpected = normalizedExpected[0];
    const pieceMoves = legalMoves.filter(m => m[0] === pieceExpected && m.includes(destSquare));
    if (pieceMoves.length === 1) return pieceMoves[0];
    if (pieceMoves.length > 1) {
      // Try disambiguation
      const disambigMatch = normalizedExpected.match(/^([NBRQK])([a-h1-8]?)[x]?([a-h][1-8])/);
      if (disambigMatch) {
        const [, , sourceHint] = disambigMatch;
        if (sourceHint && /[a-h]/.test(sourceHint)) {
          const fileMatch = pieceMoves.find(m => {
            const verbose = game.moves({ verbose: true }).find(v => v.san === m);
            return verbose && verbose.from[0] === sourceHint;
          });
          if (fileMatch) return fileMatch;
        }
      }
      // Return first match
      return pieceMoves[0];
    }
  }
  
  // Try pawn moves
  if (/^[a-h]/.test(normalizedExpected)) {
    const sourceFile = normalizedExpected[0];
    const pawnMoves = legalMoves.filter(m => 
      /^[a-h]/.test(m) && m.includes(destSquare) && m[0] === sourceFile
    );
    if (pawnMoves.length > 0) return pawnMoves[0];
  }
  
  return null;
}

// Known fixes based on analysis
const fixes: PatternFix[] = [
  // weak-iqp-blockade: Nd4 is invalid - knight on c3 can't reach d4 (blocked by pawn on d4)
  // This pattern needs a different approach - maybe the FEN is wrong or we need Nxd5 first
  // For now, let's skip this and come back
  
  // Already fixed:
  { patternId: 'open-files-seventh-rank', file: 'enhancedPatterns', moveIndex: 1, originalMove: 'Rd8', fixedMove: 'Rad8', reason: 'Rook disambiguation needed' },
  { patternId: 'exchange-good-for-bad', file: 'morePatterns', moveIndex: 0, originalMove: 'Nxe6', fixedMove: 'Ne6', reason: 'No capture available' },
  { patternId: 'pawn-break-d5', file: 'morePatterns', moveIndex: 0, originalMove: 'd5', fixedMove: 'cxd5', reason: 'Must capture first' },
];

console.log('Pattern fixes to apply:', fixes.length);
console.log('Note: Some patterns may need FEN corrections or sequence adjustments\n');

// Export fixes for manual application
const fixesPath = path.join(__dirname, 'pattern-fixes-to-apply.json');
fs.writeFileSync(fixesPath, JSON.stringify(fixes, null, 2));
console.log(`Fixes written to: ${fixesPath}`);
console.log('\nApply these fixes manually to the pattern files.');

