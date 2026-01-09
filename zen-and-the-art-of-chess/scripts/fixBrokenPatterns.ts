/**
 * Automated Pattern Repair Script
 * Attempts to fix broken patterns by adjusting FENs or finding legal move alternatives
 */

import { Chess } from 'chess.js';
import * as fs from 'fs';
import * as path from 'path';

interface PatternFix {
  patternId: string;
  fixType: 'notation_fix' | 'move_replacement' | 'fen_adjustment' | 'unfixable';
  success: boolean;
  movesFixed: number;
  details: string;
}

// Try various move notation variations to find a legal move
function tryMoveVariations(game: Chess, move: string): string | null {
  const variations = [
    move,
    move.replace(/[!?+#]+/g, ''), // Remove annotations
    move.replace(/0-0-0/g, 'O-O-O'), // Fix castling notation
    move.replace(/0-0/g, 'O-O'),
  ];
  
  // Try with and without check/checkmate symbols
  const moveWithoutCheck = move.replace(/[+#]/g, '');
  if (!variations.includes(moveWithoutCheck)) {
    variations.push(moveWithoutCheck);
  }
  
  for (const variation of variations) {
    try {
      const result = game.move(variation);
      if (result) {
        game.undo(); // Undo for testing
        return variation;
      }
    } catch (e) {
      // Continue trying
    }
  }
  
  // Try to find a move with similar characteristics
  const legalMoves = game.moves({ verbose: true });
  
  // Extract move components
  const pieceMatch = move.match(/^([NBRQK]?)/);
  const toSquareMatch = move.match(/([a-h][1-8])/);
  const captureMatch = move.includes('x');
  
  if (toSquareMatch) {
    const toSquare = toSquareMatch[1];
    const piece = pieceMatch ? pieceMatch[1] : '';
    
    // Find legal move to same square with same piece
    for (const legalMove of legalMoves) {
      if (legalMove.to === toSquare) {
        const legalPiece = legalMove.piece === 'p' ? '' : legalMove.piece.toUpperCase();
        if (!piece || legalPiece === piece) {
          if (!captureMatch || legalMove.captured) {
            return legalMove.san;
          }
        }
      }
    }
  }
  
  return null;
}

// Attempt to fix a single pattern's move sequence
function attemptPatternFix(pattern: any): PatternFix {
  const fix: PatternFix = {
    patternId: pattern.id,
    fixType: 'unfixable',
    success: false,
    movesFixed: 0,
    details: '',
  };
  
  try {
    const game = new Chess(pattern.fen);
    const fixedMoves: any[] = [];
    let allMovesFixed = true;
    
    for (let i = 0; i < pattern.mainLine.length; i++) {
      const moveData = pattern.mainLine[i];
      const move = moveData.move;
      
      // Try the original move first
      let legalMove: string | null = null;
      try {
        const result = game.move(move);
        if (result) {
          legalMove = move;
          fix.movesFixed++;
        }
      } catch (e) {
        // Try variations
        legalMove = tryMoveVariations(game, move);
        
        if (legalMove) {
          fix.movesFixed++;
          if (legalMove !== move) {
            fix.fixType = 'notation_fix';
          }
        } else {
          // Can't fix this move
          allMovesFixed = false;
          fix.details = `Failed at move ${i + 1}: ${move}`;
          break;
        }
      }
      
      if (legalMove) {
        fixedMoves.push({
          ...moveData,
          move: legalMove,
        });
      }
    }
    
    fix.success = allMovesFixed && fix.movesFixed === pattern.mainLine.length;
    
    if (fix.success) {
      if (fix.fixType === 'unfixable') {
        fix.fixType = 'notation_fix'; // All moves worked, might be minor notation issues
      }
      fix.details = `Successfully fixed ${fix.movesFixed}/${pattern.mainLine.length} moves`;
    }
    
  } catch (error) {
    fix.details = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
  
  return fix;
}

// Main function to fix all broken patterns
async function fixAllBrokenPatterns() {
  console.log('Loading patterns...\n');
  
  // Dynamically import patterns
  const { enhancedPatterns } = await import('../src/data/positional/enhancedPatterns');
  const { validatePattern } = await import('./validatePatterns');
  
  console.log(`Total patterns to check: ${enhancedPatterns.length}\n`);
  
  const fixes: PatternFix[] = [];
  const validPatterns: any[] = [];
  const brokenPatterns: any[] = [];
  
  // Validate and categorize
  for (const pattern of enhancedPatterns) {
    const result = validatePattern(pattern);
    if (result.valid) {
      validPatterns.push(pattern);
    } else {
      brokenPatterns.push(pattern);
    }
  }
  
  console.log(`Valid patterns: ${validPatterns.length}`);
  console.log(`Broken patterns: ${brokenPatterns.length}\n`);
  console.log('Attempting to fix broken patterns...\n');
  
  let fixed = 0;
  let unfixable = 0;
  
  for (let i = 0; i < brokenPatterns.length; i++) {
    const pattern = brokenPatterns[i];
    const fix = attemptPatternFix(pattern);
    fixes.push(fix);
    
    if (fix.success) {
      fixed++;
      console.log(`✓ Fixed: ${pattern.id} (${fix.fixType})`);
    } else {
      unfixable++;
    }
    
    if ((i + 1) % 50 === 0) {
      console.log(`Progress: ${i + 1}/${brokenPatterns.length} patterns processed`);
    }
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('FIX RESULTS');
  console.log('='.repeat(70));
  console.log(`Total broken patterns: ${brokenPatterns.length}`);
  console.log(`Successfully fixed: ${fixed}`);
  console.log(`Unfixable: ${unfixable}`);
  console.log();
  
  // Categorize unfixable by category for regeneration planning
  const unfixableByCategory: Record<string, string[]> = {};
  fixes.filter(f => !f.success).forEach(fix => {
    const pattern = brokenPatterns.find(p => p.id === fix.patternId);
    if (pattern) {
      if (!unfixableByCategory[pattern.category]) {
        unfixableByCategory[pattern.category] = [];
      }
      unfixableByCategory[pattern.category].push(fix.patternId);
    }
  });
  
  console.log('Unfixable patterns by category:');
  Object.entries(unfixableByCategory)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([category, ids]) => {
      console.log(`  ${category.padEnd(25)} ${ids.length} patterns`);
    });
  
  // Save results
  const results = {
    summary: {
      total: brokenPatterns.length,
      fixed,
      unfixable,
    },
    fixes,
    unfixableByCategory,
    unfixableIds: fixes.filter(f => !f.success).map(f => f.patternId),
  };
  
  const outputPath = path.join(__dirname, 'patternFixResults.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\nDetailed results saved to: ${outputPath}`);
  
  return results;
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('fixBrokenPatterns')) {
  fixAllBrokenPatterns().catch(console.error);
}

export { fixAllBrokenPatterns, attemptPatternFix, type PatternFix };
