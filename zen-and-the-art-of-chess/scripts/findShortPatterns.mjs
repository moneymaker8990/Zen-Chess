import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '../src/data/positional/enhancedPatterns.ts');
const content = readFileSync(filePath, 'utf8');

// Parse patterns and find those with < 10 moves
const patterns = [];
let currentPattern = null;
let inMainLine = false;
let mainLineMoves = 0;
let moveBraceDepth = 0;
let inMoveObject = false;

const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Detect pattern start - look for opening brace followed by id:
  if (line.trim() === '{' && i + 1 < lines.length && lines[i + 1].includes('id:')) {
    if (currentPattern && mainLineMoves < 10) {
      patterns.push({
        id: currentPattern.id,
        startLine: currentPattern.startLine,
        endLine: i - 1,
        moveCount: mainLineMoves
      });
    }
    currentPattern = { startLine: i };
    mainLineMoves = 0;
    inMainLine = false;
  }
  
  // Extract pattern ID
  if (currentPattern && line.includes('id:') && !currentPattern.id) {
    const match = line.match(/id:\s*['"]([^'"]+)['"]/);
    if (match) {
      currentPattern.id = match[1];
    }
  }
  
  // Detect mainLine start
  if (line.includes('mainLine: [')) {
    inMainLine = true;
    mainLineMoves = 0;
    moveBraceDepth = 0;
    inMoveObject = false;
  }
  
  // Count moves in mainLine
  if (inMainLine) {
    // Detect start of a move object
    if (line.includes('move:') && line.match(/move:\s*['"]/)) {
      if (!inMoveObject) {
        inMoveObject = true;
      }
    }
    
    // Track brace depth
    const openBraces = (line.match(/\{/g) || []).length;
    const closeBraces = (line.match(/\}/g) || []).length;
    moveBraceDepth += openBraces - closeBraces;
    
    // When we close a move object (brace depth returns to 0 after being > 0)
    if (inMoveObject && moveBraceDepth === 0 && closeBraces > 0) {
      mainLineMoves++;
      inMoveObject = false;
    }
    
    // Detect mainLine end
    if (line.includes('],')) {
      inMainLine = false;
    }
  }
  
  // Detect pattern end - closing brace that's not part of mainLine
  if (currentPattern && line.trim() === '}' && !inMainLine) {
    if (mainLineMoves < 10) {
      patterns.push({
        id: currentPattern.id,
        startLine: currentPattern.startLine,
        endLine: i,
        moveCount: mainLineMoves
      });
    }
    currentPattern = null;
  }
}

console.log(`Found ${patterns.length} patterns with less than 10 moves:\n`);
patterns.forEach(p => {
  console.log(`- ${p.id}: ${p.moveCount} moves (lines ${p.startLine + 1}-${p.endLine + 1})`);
});

// Write results to file
writeFileSync(
  join(__dirname, 'shortPatterns.json'),
  JSON.stringify(patterns, null, 2)
);

console.log(`\nResults saved to scripts/shortPatterns.json`);
