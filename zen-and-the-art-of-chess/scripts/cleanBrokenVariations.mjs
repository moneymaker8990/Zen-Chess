/**
 * Clean Broken Variations Script
 * Uses proper AST-like parsing to safely remove broken variations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Chess } from 'chess.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Normalize move for chess.js
function normalizeMove(move) {
  return move
    .replace(/0-0-0/g, 'O-O-O')
    .replace(/0-0/g, 'O-O')
    .replace(/[!?]+/g, '')
    .replace(/\s+/g, '')
    .trim();
}

// Try to make a move
function tryMove(game, moveStr) {
  const normalized = normalizeMove(moveStr);
  try {
    const result = game.move(normalized);
    if (result) return true;
  } catch {}
  
  // Fallback: try to match by destination
  const legalMoves = game.moves({ verbose: true });
  for (const legal of legalMoves) {
    if (legal.san === normalized) return !!game.move(legal.san);
    // Strip check/capture symbols for comparison
    const stripped = normalized.replace(/[+#x]/g, '');
    const legalStripped = legal.san.replace(/[+#x]/g, '');
    if (stripped === legalStripped) return !!game.move(legal.san);
  }
  return false;
}

// Test if a variation is valid
function testVariation(variation) {
  let game;
  try {
    game = new Chess(variation.fen);
  } catch {
    return { valid: false, error: 'Invalid FEN' };
  }
  
  const moves = variation.moves || [];
  for (let i = 0; i < moves.length; i++) {
    const moveData = moves[i];
    const moveStr = typeof moveData === 'string' ? moveData : moveData.move;
    if (!tryMove(game, moveStr)) {
      return { valid: false, error: `Invalid move at ${i+1}: ${moveStr}` };
    }
  }
  return { valid: true };
}

// Process a TypeScript file and extract/filter variations
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  
  // Find all variation objects using a state machine approach
  const variations = [];
  let braceCount = 0;
  let inVariation = false;
  let currentVariation = '';
  let startIndex = -1;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    if (char === '{') {
      if (braceCount === 0) {
        // Check if this looks like a variation start
        const lookAhead = content.slice(i, Math.min(i + 50, content.length));
        if (lookAhead.match(/\{\s*(id|title|fen):/)) {
          inVariation = true;
          startIndex = i;
          currentVariation = '';
        }
      }
      if (inVariation) {
        braceCount++;
        currentVariation += char;
      }
    } else if (char === '}') {
      if (inVariation) {
        braceCount--;
        currentVariation += char;
        if (braceCount === 0) {
          variations.push({
            text: currentVariation,
            start: startIndex,
            end: i + 1
          });
          inVariation = false;
          currentVariation = '';
        }
      }
    } else if (inVariation) {
      currentVariation += char;
    }
  }
  
  // Parse and test each variation
  const results = { valid: [], invalid: [] };
  
  for (const v of variations) {
    try {
      // Try to extract id, fen, and moves
      const idMatch = v.text.match(/id:\s*['"]([^'"]+)['"]/);
      const fenMatch = v.text.match(/fen:\s*['"]([^'"]+)['"]/);
      
      if (!idMatch || !fenMatch) continue;
      
      const id = idMatch[1];
      const fen = fenMatch[1];
      
      // Extract moves array - this is tricky
      const movesMatch = v.text.match(/moves:\s*\[([\s\S]*)\]/);
      if (!movesMatch) continue;
      
      const movesStr = movesMatch[1];
      const moves = [];
      
      // Extract move strings from the moves array
      const movePatterns = movesStr.matchAll(/move:\s*['"]([^'"]+)['"]/g);
      for (const match of movePatterns) {
        moves.push({ move: match[1] });
      }
      
      // Also check for simple string moves
      const simplePatterns = movesStr.matchAll(/['"]([A-Za-z0-9-]+)['"]\s*[,\]]/g);
      for (const match of simplePatterns) {
        if (!moves.find(m => m.move === match[1])) {
          moves.push({ move: match[1] });
        }
      }
      
      const variation = { id, fen, moves };
      const testResult = testVariation(variation);
      
      if (testResult.valid) {
        results.valid.push({ ...v, id });
      } else {
        results.invalid.push({ ...v, id, error: testResult.error });
      }
    } catch (e) {
      console.log(`Error parsing variation: ${e.message}`);
    }
  }
  
  return results;
}

// Main execution
const coursesDir = path.join(__dirname, '../src/data/courses');
const variationsDir = path.join(coursesDir, 'variations');

const filesToProcess = [
  ...fs.readdirSync(coursesDir)
    .filter(f => f.endsWith('.ts') && !f.includes('Types'))
    .map(f => path.join(coursesDir, f)),
  ...fs.readdirSync(variationsDir)
    .filter(f => f.endsWith('.ts'))
    .map(f => path.join(variationsDir, f))
];

console.log('\n🔍 Scanning course files for broken variations...\n');

let totalValid = 0;
let totalInvalid = 0;
const allInvalid = [];

for (const file of filesToProcess) {
  const results = processFile(file);
  const filename = path.basename(file);
  
  if (results.valid.length + results.invalid.length > 0) {
    console.log(`${filename}: ${results.valid.length} valid, ${results.invalid.length} broken`);
    totalValid += results.valid.length;
    totalInvalid += results.invalid.length;
    
    for (const inv of results.invalid) {
      allInvalid.push({ file: filename, id: inv.id, error: inv.error });
    }
  }
}

console.log(`\n📊 Total: ${totalValid} valid, ${totalInvalid} broken`);
console.log(`\n📝 Writing detailed report...`);

fs.writeFileSync(
  path.join(__dirname, 'broken-variations-report.json'),
  JSON.stringify(allInvalid, null, 2)
);

console.log(`\n✅ Report saved to scripts/broken-variations-report.json`);
console.log(`\nTo fix: Either remove these ${totalInvalid} broken variations or fix their FEN/moves.\n`);


