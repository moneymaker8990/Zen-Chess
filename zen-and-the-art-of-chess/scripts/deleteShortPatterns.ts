import { enhancedPatterns, baseEnhancedPatterns } from '../src/data/positional/enhancedPatterns';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Find patterns with < 10 moves
const shortPatterns = enhancedPatterns.filter(p => p.mainLine.length < 10);

console.log(`Found ${shortPatterns.length} patterns with less than 10 moves:\n`);
shortPatterns.forEach(p => {
  console.log(`- ${p.id}: ${p.mainLine.length} moves`);
});

// Read the file
const filePath = join(__dirname, '../src/data/positional/enhancedPatterns.ts');
let content = readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find and delete each short pattern
const shortPatternIds = new Set(shortPatterns.map(p => p.id));
let deletedCount = 0;

// We need to find the pattern blocks in the file and delete them
// This is complex because we need to find the exact boundaries
// Let's use a regex-based approach to find pattern blocks

// For each short pattern, find its block and delete it
for (const patternId of shortPatternIds) {
  // Find the pattern block - look for the pattern with this ID
  const patternStartRegex = new RegExp(`id:\\s*['"]${patternId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`);
  let patternStartLine = -1;
  let patternEndLine = -1;
  let braceDepth = 0;
  let inPattern = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (patternStartRegex.test(lines[i])) {
      // Found the pattern - now find its start (the opening brace before id:)
      for (let j = i - 1; j >= 0; j--) {
        if (lines[j].trim() === '{') {
          patternStartLine = j;
          inPattern = true;
          braceDepth = 1;
          break;
        }
      }
      if (patternStartLine === -1) {
        // Pattern starts on same line or different format
        patternStartLine = i;
        inPattern = true;
        braceDepth = 0;
        // Count opening braces on this line
        braceDepth += (lines[i].match(/\{/g) || []).length;
      }
    }
    
    if (inPattern) {
      const openBraces = (lines[i].match(/\{/g) || []).length;
      const closeBraces = (lines[i].match(/\}/g) || []).length;
      braceDepth += openBraces - closeBraces;
      
      if (braceDepth === 0 && closeBraces > 0) {
        patternEndLine = i;
        break;
      }
    }
  }
  
  if (patternStartLine >= 0 && patternEndLine >= 0) {
    // Delete the pattern
    const before = lines.slice(0, patternStartLine);
    const after = lines.slice(patternEndLine + 1);
    lines.splice(0, lines.length, ...before, ...after);
    deletedCount++;
    console.log(`Deleted ${patternId} (lines ${patternStartLine + 1}-${patternEndLine + 1})`);
  }
}

// Write back
writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log(`\nDeleted ${deletedCount} patterns with < 10 moves`);
