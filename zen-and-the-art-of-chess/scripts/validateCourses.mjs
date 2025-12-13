/**
 * Course Validation Script
 * Validates all course variations by playing through each move sequence
 * Reports any failures with specific error details
 */

import { Chess } from 'chess.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Normalize move notation for chess.js
function normalizeMove(move) {
  return move
    .replace(/0-0-0/g, 'O-O-O')  // Queenside castling
    .replace(/0-0/g, 'O-O')      // Kingside castling
    .replace(/[!?]+/g, '')       // Strip annotations
    .trim();
}

// Extract variations from TypeScript source files
function extractVariationsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const variations = [];
  
  // Match variation objects with id, fen, and moves
  const variationRegex = /\{\s*id:\s*['"]([^'"]+)['"][\s\S]*?fen:\s*['"]([^'"]+)['"][\s\S]*?moves:\s*\[([\s\S]*?)\]\s*(?:,\s*(?:commonMistakes|introduction|deeperPrinciple)|\})/g;
  
  let match;
  while ((match = variationRegex.exec(content)) !== null) {
    const id = match[1];
    const fen = match[2];
    const movesBlock = match[3];
    
    // Extract individual moves
    const moveRegex = /move:\s*['"]([^'"]+)['"]/g;
    const moves = [];
    let moveMatch;
    while ((moveMatch = moveRegex.exec(movesBlock)) !== null) {
      moves.push(moveMatch[1]);
    }
    
    if (moves.length > 0) {
      variations.push({ id, fen, moves, file: path.basename(filePath) });
    }
  }
  
  return variations;
}

// Validate a single variation
function validateVariation(variation) {
  const errors = [];
  
  // Check FEN validity
  let game;
  try {
    game = new Chess(variation.fen);
  } catch (e) {
    return { 
      valid: false, 
      errors: [{ type: 'INVALID_FEN', message: `Invalid FEN: ${e.message}` }],
      failedAt: 0
    };
  }
  
  // Play through each move
  for (let i = 0; i < variation.moves.length; i++) {
    const rawMove = variation.moves[i];
    const move = normalizeMove(rawMove);
    
    try {
      const result = game.move(move);
      if (!result) {
        // Try with less strict matching
        const legalMoves = game.moves();
        const matchingMove = legalMoves.find(lm => {
          const normalizedLegal = lm.replace(/[+#]/g, '');
          const normalizedExpected = move.replace(/[+#x]/g, '');
          // Check if destination squares match for piece moves
          if (/^[NBRQK]/.test(normalizedExpected)) {
            const destExpected = normalizedExpected.slice(-2);
            const destLegal = normalizedLegal.slice(-2);
            const pieceExpected = normalizedExpected[0];
            const pieceLegal = normalizedLegal[0];
            return pieceExpected === pieceLegal && destExpected === destLegal;
          }
          return normalizedLegal === normalizedExpected;
        });
        
        if (matchingMove) {
          game.move(matchingMove);
        } else {
          errors.push({
            type: 'INVALID_MOVE',
            moveIndex: i,
            move: rawMove,
            normalizedMove: move,
            fen: game.fen(),
            legalMoves: legalMoves.slice(0, 10).join(', ') + (legalMoves.length > 10 ? '...' : '')
          });
          return { valid: false, errors, failedAt: i };
        }
      }
    } catch (e) {
      errors.push({
        type: 'MOVE_ERROR',
        moveIndex: i,
        move: rawMove,
        error: e.message,
        fen: game.fen()
      });
      return { valid: false, errors, failedAt: i };
    }
  }
  
  return { valid: true, errors: [], movesPlayed: variation.moves.length };
}

// Main validation
async function main() {
  const coursesDir = path.join(__dirname, '../src/data/courses');
  const variationsDir = path.join(coursesDir, 'variations');
  
  const allVariations = [];
  
  // Collect all TypeScript files
  const files = [];
  
  // Main course files
  const mainFiles = fs.readdirSync(coursesDir).filter(f => f.endsWith('.ts') && !f.includes('index') && !f.includes('Types'));
  mainFiles.forEach(f => files.push(path.join(coursesDir, f)));
  
  // Variation files
  if (fs.existsSync(variationsDir)) {
    const varFiles = fs.readdirSync(variationsDir).filter(f => f.endsWith('.ts') && !f.includes('index'));
    varFiles.forEach(f => files.push(path.join(variationsDir, f)));
  }
  
  console.log(`\n📚 Scanning ${files.length} course files...\n`);
  
  // Extract variations from each file
  for (const file of files) {
    const variations = extractVariationsFromFile(file);
    allVariations.push(...variations);
  }
  
  console.log(`Found ${allVariations.length} variations to validate\n`);
  console.log('='.repeat(60));
  
  // Validate each variation
  let passed = 0;
  let failed = 0;
  const failures = [];
  
  for (const variation of allVariations) {
    const result = validateVariation(variation);
    
    if (result.valid) {
      passed++;
    } else {
      failed++;
      failures.push({ variation, result });
    }
  }
  
  // Report results
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 VALIDATION RESULTS\n`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / allVariations.length) * 100).toFixed(1)}%\n`);
  
  if (failures.length > 0) {
    console.log('='.repeat(60));
    console.log('\n❌ FAILED VARIATIONS:\n');
    
    for (const { variation, result } of failures) {
      console.log(`\n📁 File: ${variation.file}`);
      console.log(`🆔 ID: ${variation.id}`);
      console.log(`📍 Failed at move ${result.failedAt + 1} of ${variation.moves.length}`);
      
      for (const error of result.errors) {
        if (error.type === 'INVALID_FEN') {
          console.log(`   ⚠️  ${error.message}`);
        } else if (error.type === 'INVALID_MOVE') {
          console.log(`   ⚠️  Move "${error.move}" (normalized: "${error.normalizedMove}") is invalid`);
          console.log(`   📋 Legal moves: ${error.legalMoves}`);
          console.log(`   📍 Position: ${error.fen}`);
        } else {
          console.log(`   ⚠️  Error: ${error.error}`);
        }
      }
    }
    
    // Output JSON for programmatic fixing
    const failuresJson = failures.map(f => ({
      file: f.variation.file,
      id: f.variation.id,
      fen: f.variation.fen,
      moves: f.variation.moves,
      failedAt: f.result.failedAt,
      failedMove: f.variation.moves[f.result.failedAt],
      errors: f.result.errors
    }));
    
    fs.writeFileSync(
      path.join(__dirname, 'course-failures.json'),
      JSON.stringify(failuresJson, null, 2)
    );
    console.log(`\n📄 Detailed failures saved to scripts/course-failures.json`);
  }
  
  console.log('\n');
}

main().catch(console.error);
