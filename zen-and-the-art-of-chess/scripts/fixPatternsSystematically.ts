/**
 * Systematically fix all invalid patterns
 * 1. Validate all patterns to find errors
 * 2. For each invalid move, try to find the correct move
 * 3. Update the pattern data with corrected moves
 */

import { Chess } from 'chess.js';
import { enhancedPatterns, type EnhancedPattern, type AnnotatedMove } from '../src/data/positional/enhancedPatterns';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PatternFix {
  patternId: string;
  patternTitle: string;
  category: string;
  fixedMoves: Array<{
    moveIndex: number;
    originalMove: string;
    fixedMove: string;
    reason: string;
  }>;
  needsManualFix: boolean;
}

// Enhanced move normalization
function normalizeMove(move: string): string {
  return move
    .replace(/0-0-0/g, 'O-O-O')
    .replace(/0-0/g, 'O-O')
    .replace(/[!?+#]+/g, '')
    .trim();
}

// Enhanced move matching with better disambiguation handling
function findMatchingMove(game: Chess, expectedMove: string): { move: string; reason: string } | null {
  const legalMoves = game.moves({ verbose: false });
  const legalMovesVerbose = game.moves({ verbose: true });
  const normalizedExpected = normalizeMove(expectedMove);
  
  // Exact match
  if (legalMoves.includes(expectedMove)) {
    return { move: expectedMove, reason: 'Exact match' };
  }
  
  // Normalized match
  if (legalMoves.includes(normalizedExpected)) {
    return { move: normalizedExpected, reason: 'Normalized match' };
  }
  
  // Extract destination square
  const destMatch = normalizedExpected.match(/([a-h][1-8])/);
  if (!destMatch) return null;
  const destSquare = destMatch[1];
  
  // Try matching by destination for piece moves
  if (/^[NBRQK]/.test(normalizedExpected)) {
    const pieceExpected = normalizedExpected[0];
    
    // Get all moves of this piece type to destination
    const pieceMoves = legalMovesVerbose.filter(m => 
      m.san[0] === pieceExpected && m.to === destSquare
    );
    
    if (pieceMoves.length === 1) {
      return { move: pieceMoves[0].san, reason: `Single ${pieceExpected} move to ${destSquare}` };
    }
    
    // Multiple pieces - try disambiguation
    if (pieceMoves.length > 1) {
      // Check for file/rank disambiguation
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
      
      // Return first match (best guess)
      return { move: pieceMoves[0].san, reason: `Multiple ${pieceExpected} moves, using first match` };
    }
  }
  
  // Try matching by destination for pawn moves
  if (/^[a-h]/.test(normalizedExpected)) {
    const sourceFile = normalizedExpected[0];
    const pawnMoves = legalMovesVerbose.filter(m => 
      /^[a-h]/.test(m.san) && m.to === destSquare && m.from[0] === sourceFile
    );
    if (pawnMoves.length > 0) {
      return { move: pawnMoves[0].san, reason: `Pawn move from ${sourceFile} to ${destSquare}` };
    }
    
    // Fallback: any pawn move to destination
    const anyPawnMove = legalMovesVerbose.find(m => 
      /^[a-h]/.test(m.san) && m.to === destSquare
    );
    if (anyPawnMove) return { move: anyPawnMove.san, reason: `Pawn move to ${destSquare}` };
  }
  
  // Try castling
  if (normalizedExpected === 'O-O' || normalizedExpected === 'O-O-O') {
    const castlingMove = legalMoves.find(m => m === normalizedExpected || m === expectedMove);
    if (castlingMove) return { move: castlingMove, reason: 'Castling move' };
  }
  
  return null;
}

// Fix a single pattern
function fixPattern(pattern: EnhancedPattern): PatternFix {
  const fix: PatternFix = {
    patternId: pattern.id,
    patternTitle: pattern.title,
    category: pattern.category,
    fixedMoves: [],
    needsManualFix: false,
  };

  // Validate starting FEN
  let game: Chess;
  try {
    game = new Chess(pattern.fen);
  } catch (error) {
    fix.needsManualFix = true;
    return fix;
  }

  // Fix each move in sequence
  for (let i = 0; i < pattern.mainLine.length; i++) {
    const annotatedMove = pattern.mainLine[i];
    const rawMove = annotatedMove.move;
    
    if (!rawMove || rawMove.trim() === '') {
      fix.needsManualFix = true;
      break;
    }

    const normalizedMove = normalizeMove(rawMove);
    
    try {
      // Try to make the move
      let moveResult = game.move(normalizedMove);
      
      // If that failed, try to find a matching legal move
      if (!moveResult) {
        const matchingMove = findMatchingMove(game, rawMove);
        if (matchingMove) {
          moveResult = game.move(matchingMove.move);
          if (moveResult) {
            fix.fixedMoves.push({
              moveIndex: i,
              originalMove: rawMove,
              fixedMove: matchingMove.move,
              reason: matchingMove.reason,
            });
          } else {
            fix.needsManualFix = true;
            break;
          }
        } else {
          fix.needsManualFix = true;
          break;
        }
      }
      
      // Move succeeded - continue
      
    } catch (err) {
      // Try to find a matching move even on error
      const matchingMove = findMatchingMove(game, rawMove);
      if (matchingMove) {
        try {
          const moveResult = game.move(matchingMove.move);
          if (moveResult) {
            fix.fixedMoves.push({
              moveIndex: i,
              originalMove: rawMove,
              fixedMove: matchingMove.move,
              reason: `${matchingMove.reason} (after error: ${err instanceof Error ? err.message : 'Unknown'})`,
            });
            continue;
          }
        } catch (e2) {
          // Still failed
        }
      }
      fix.needsManualFix = true;
      break;
    }
  }

  return fix;
}

// Apply fixes to pattern data
function applyFixesToPatterns(fixes: PatternFix[]): void {
  const patternsPath = path.join(__dirname, '../src/data/positional/enhancedPatterns.ts');
  let patternsContent = fs.readFileSync(patternsPath, 'utf-8');
  
  let fixesApplied = 0;
  
  for (const fix of fixes) {
    if (fix.fixedMoves.length === 0) continue;
    
    const pattern = enhancedPatterns.find(p => p.id === fix.patternId);
    if (!pattern) continue;
    
    // Apply each fix
    for (const moveFix of fix.fixedMoves) {
      // Find the move in the pattern data
      // We need to find the exact line in the file
      const moveIndex = moveFix.moveIndex;
      const originalMove = moveFix.originalMove;
      const fixedMove = moveFix.fixedMove;
      
      // Create a regex to find the move
      // Look for the move in the context of the pattern
      const patternStart = new RegExp(`id:\\s*['"]${fix.patternId}['"]`, 's');
      const patternMatch = patternsContent.match(patternStart);
      
      if (patternMatch) {
        // Find the move line - look for the move property
        const moveRegex = new RegExp(
          `(move:\\s*['"]${originalMove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"])`,
          'g'
        );
        
        // Try to replace just this specific move
        const lines = patternsContent.split('\n');
        let inPattern = false;
        let moveCount = 0;
        let patternStartLine = -1;
        
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes(`id: '${fix.patternId}'`) || lines[i].includes(`id: "${fix.patternId}"`)) {
            inPattern = true;
            patternStartLine = i;
          }
          
          if (inPattern) {
            // Check if we're still in this pattern
            if (i > patternStartLine && lines[i].match(/^\s*\{/)) {
              // Check if this is a new pattern
              if (lines[i].includes('id:') && !lines[i].includes(fix.patternId)) {
                break;
              }
            }
            
            // Count moves in mainLine
            if (lines[i].includes('mainLine:') || lines[i].includes('mainLine:')) {
              moveCount = -1; // Reset, we're starting the mainLine
            }
            
            if (lines[i].includes('move:') && moveCount >= -1) {
              moveCount++;
              if (moveCount === moveIndex && lines[i].includes(originalMove)) {
                // Found the move to fix
                lines[i] = lines[i].replace(
                  new RegExp(`move:\\s*['"]${originalMove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`),
                  `move: '${fixedMove}'`
                );
                fixesApplied++;
                break;
              }
            }
          }
        }
        
        patternsContent = lines.join('\n');
      }
    }
  }
  
  // Write the fixed content
  if (fixesApplied > 0) {
    fs.writeFileSync(patternsPath, patternsContent, 'utf-8');
    console.log(`\n✅ Applied ${fixesApplied} fixes to pattern data file`);
  } else {
    console.log('\n⚠️  No fixes could be automatically applied to the file');
    console.log('   Please apply fixes manually based on the report');
  }
}

async function main() {
  console.log('\n🔧 Systematically Fixing All Invalid Patterns...\n');
  
  const fixes: PatternFix[] = [];
  
  for (const pattern of enhancedPatterns) {
    const fix = fixPattern(pattern);
    if (fix.fixedMoves.length > 0 || fix.needsManualFix) {
      fixes.push(fix);
    }
  }
  
  const autoFixable = fixes.filter(f => f.fixedMoves.length > 0 && !f.needsManualFix);
  const partiallyFixable = fixes.filter(f => f.fixedMoves.length > 0 && f.needsManualFix);
  const needsManual = fixes.filter(f => f.fixedMoves.length === 0 && f.needsManualFix);
  
  console.log('='.repeat(60));
  console.log('FIX SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total patterns with issues: ${fixes.length}`);
  console.log(`Fully auto-fixable: ${autoFixable.length}`);
  console.log(`Partially fixable: ${partiallyFixable.length}`);
  console.log(`Needs manual fix: ${needsManual.length}`);
  console.log(`Total moves fixed: ${fixes.reduce((sum, f) => sum + f.fixedMoves.length, 0)}`);
  console.log('='.repeat(60) + '\n');
  
  // Show fixes
  if (autoFixable.length > 0) {
    console.log('✅ Fully Auto-Fixable Patterns:');
    autoFixable.forEach(fix => {
      console.log(`\n  ${fix.patternTitle} (${fix.patternId})`);
      fix.fixedMoves.forEach(m => {
        console.log(`    Move ${m.moveIndex + 1}: "${m.originalMove}" → "${m.fixedMove}" (${m.reason})`);
      });
    });
  }
  
  if (partiallyFixable.length > 0) {
    console.log('\n⚠️  Partially Fixable Patterns:');
    partiallyFixable.forEach(fix => {
      console.log(`\n  ${fix.patternTitle} (${fix.patternId})`);
      fix.fixedMoves.forEach(m => {
        console.log(`    Move ${m.moveIndex + 1}: "${m.originalMove}" → "${m.fixedMove}" (${m.reason})`);
      });
      console.log(`    ⚠️  Still needs manual fix after move ${fix.fixedMoves[fix.fixedMoves.length - 1].moveIndex + 1}`);
    });
  }
  
  if (needsManual.length > 0) {
    console.log('\n❌ Patterns Needing Manual Fix:');
    needsManual.forEach(fix => {
      console.log(`  ${fix.patternTitle} (${fix.patternId})`);
    });
  }
  
  // Write report
  const reportPath = path.join(__dirname, 'pattern-fix-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(fixes, null, 2));
  console.log(`\n📄 Detailed report written to: ${reportPath}`);
  
  // Apply fixes
  console.log('\n🔧 Applying fixes to pattern data...');
  applyFixesToPatterns(fixes);
  
  console.log('\n✅ Done! Run validation again to verify fixes.\n');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

