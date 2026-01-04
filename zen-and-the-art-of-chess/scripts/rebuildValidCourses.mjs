/**
 * Rebuild Valid Courses Script
 * Rebuilds course files keeping only valid variations
 * Uses proper parsing to avoid file corruption
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
  
  // Fallback: try legal moves with stripped notation
  const legalMoves = game.moves({ verbose: true });
  const stripped = normalized.replace(/[+#x=]/g, '').replace(/[QRBN]$/, '');
  
  for (const legal of legalMoves) {
    const legalStripped = legal.san.replace(/[+#x=]/g, '').replace(/[QRBN]$/, '');
    if (stripped === legalStripped) {
      return !!game.move(legal.san);
    }
    // Handle disambiguation
    if (/^[NBRQK]/.test(stripped) && /^[NBRQK]/.test(legalStripped)) {
      const destA = stripped.slice(-2);
      const destB = legalStripped.slice(-2);
      if (destA === destB && stripped[0] === legalStripped[0]) {
        return !!game.move(legal.san);
      }
    }
  }
  return false;
}

// Test if a variation is valid
function testVariation(fen, moves) {
  let game;
  try {
    game = new Chess(fen);
  } catch {
    return false;
  }
  
  for (const moveData of moves) {
    const moveStr = typeof moveData === 'string' ? moveData : moveData.move;
    if (!moveStr) continue;
    if (!tryMove(game, moveStr)) {
      return false;
    }
  }
  return true;
}

// Extract variation blocks from file content
function extractVariationBlocks(content) {
  const blocks = [];
  let i = 0;
  
  while (i < content.length) {
    // Look for start of a variation object with 'id:' key
    const searchFrom = content.slice(i);
    const idPattern = /\{\s*\n?\s*id:\s*['"]/;
    const match = searchFrom.match(idPattern);
    
    if (!match) break;
    
    const startOffset = i + match.index;
    let braceCount = 0;
    let endOffset = startOffset;
    
    // Find matching closing brace
    for (let j = startOffset; j < content.length; j++) {
      if (content[j] === '{') braceCount++;
      else if (content[j] === '}') {
        braceCount--;
        if (braceCount === 0) {
          endOffset = j + 1;
          break;
        }
      }
    }
    
    if (endOffset > startOffset) {
      const blockText = content.slice(startOffset, endOffset);
      
      // Extract id
      const idMatch = blockText.match(/id:\s*['"]([^'"]+)['"]/);
      // Extract fen
      const fenMatch = blockText.match(/fen:\s*['"]([^'"]+)['"]/);
      // Extract moves
      const moves = [];
      const moveMatches = blockText.matchAll(/move:\s*['"]([^'"]+)['"]/g);
      for (const m of moveMatches) {
        moves.push({ move: m[1] });
      }
      
      if (idMatch && fenMatch) {
        blocks.push({
          id: idMatch[1],
          fen: fenMatch[1],
          moves,
          text: blockText,
          start: startOffset,
          end: endOffset
        });
      }
      
      i = endOffset;
    } else {
      i++;
    }
  }
  
  return blocks;
}

// Process a file and rebuild with only valid variations
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  
  const blocks = extractVariationBlocks(content);
  if (blocks.length === 0) return { removed: 0, kept: 0 };
  
  const toRemove = [];
  let kept = 0;
  
  for (const block of blocks) {
    const isValid = testVariation(block.fen, block.moves);
    if (!isValid) {
      toRemove.push(block);
    } else {
      kept++;
    }
  }
  
  if (toRemove.length === 0) {
    return { removed: 0, kept };
  }
  
  // Remove blocks in reverse order to maintain indices
  toRemove.sort((a, b) => b.start - a.start);
  
  for (const block of toRemove) {
    // Find the extent including trailing comma and whitespace
    let removeEnd = block.end;
    
    // Skip trailing comma and whitespace
    while (removeEnd < content.length && /[\s,]/.test(content[removeEnd])) {
      removeEnd++;
    }
    
    // Find where the block actually starts (skip leading whitespace/newline)
    let removeStart = block.start;
    while (removeStart > 0 && /[\s]/.test(content[removeStart - 1]) && content[removeStart - 1] !== ']') {
      removeStart--;
    }
    
    content = content.slice(0, removeStart) + content.slice(removeEnd);
  }
  
  // Clean up any resulting issues
  content = content
    .replace(/,\s*,/g, ',')
    .replace(/\[\s*,/g, '[')
    .replace(/,\s*\]/g, '\n]')
    .replace(/\n{3,}/g, '\n\n');
  
  fs.writeFileSync(filePath, content);
  
  return { removed: toRemove.length, kept };
}

// Main execution
const coursesDir = path.join(__dirname, '../src/data/courses');
const variationsDir = path.join(coursesDir, 'variations');

const filesToProcess = [
  ...fs.readdirSync(coursesDir)
    .filter(f => f.endsWith('.ts') && !f.includes('Types') && !f.includes('index'))
    .map(f => path.join(coursesDir, f)),
  ...fs.readdirSync(variationsDir)
    .filter(f => f.endsWith('.ts'))
    .map(f => path.join(variationsDir, f))
];

console.log('\n🔧 Rebuilding course files with only valid variations...\n');

let totalRemoved = 0;
let totalKept = 0;

for (const file of filesToProcess) {
  const { removed, kept } = processFile(file);
  const filename = path.basename(file);
  
  if (removed > 0 || kept > 0) {
    console.log(`${filename}: kept ${kept}, removed ${removed}`);
    totalRemoved += removed;
    totalKept += kept;
  }
}

console.log(`\n📊 Total: kept ${totalKept} valid variations, removed ${totalRemoved} broken`);
console.log('\n✅ Done! Now run: npm run build\n');


