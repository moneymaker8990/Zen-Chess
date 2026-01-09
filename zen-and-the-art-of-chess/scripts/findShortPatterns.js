const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/positional/enhancedPatterns.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Find all patterns and count their mainLine moves
const patterns = [];
let currentPattern = null;
let inMainLine = false;
let mainLineMoves = 0;
let braceDepth = 0;
let inMoveObject = false;
let moveBraceDepth = 0;

const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Detect pattern start
  if (line.match(/^\s*\{\s*$/) && lines[i + 1] && lines[i + 1].includes('id:')) {
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
  
  // Detect mainLine start
  if (line.includes('mainLine: [')) {
    inMainLine = true;
    mainLineMoves = 0;
    moveBraceDepth = 0;
    inMoveObject = false;
  }
  
  // Count moves in mainLine
  if (inMainLine) {
    if (line.includes('move:') && line.includes("'") && !inMoveObject) {
      // This is likely a move object start
      inMoveObject = true;
    }
    if (line.includes('{')) {
      moveBraceDepth++;
    }
    if (line.includes('}')) {
      moveBraceDepth--;
      if (moveBraceDepth === 0 && inMoveObject) {
        mainLineMoves++;
        inMoveObject = false;
      }
    }
    if (line.includes('],')) {
      inMainLine = false;
    }
  }
  
  // Extract pattern ID
  if (currentPattern && line.includes('id:') && !currentPattern.id) {
    const match = line.match(/id:\s*['"]([^'"]+)['"]/);
    if (match) {
      currentPattern.id = match[1];
    }
  }
  
  // Detect pattern end
  if (currentPattern && line.match(/^\s*\}\s*$/) && !inMainLine) {
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

console.log(`Found ${patterns.length} patterns with less than 10 moves:`);
patterns.forEach(p => {
  console.log(`- ${p.id}: ${p.moveCount} moves (lines ${p.startLine + 1}-${p.endLine + 1})`);
});

// Write results to file
fs.writeFileSync(
  path.join(__dirname, 'shortPatterns.json'),
  JSON.stringify(patterns, null, 2)
);
