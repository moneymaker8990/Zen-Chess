import { enhancedPatterns } from '../src/data/positional/enhancedPatterns';
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

// Create a set of IDs to delete
const shortPatternIds = new Set(shortPatterns.map(p => p.id));

// Find pattern boundaries more accurately
// We'll search for each pattern ID and find its complete block
const patternsToDelete: Array<{ start: number; end: number; id: string }> = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this line contains an ID we want to delete
  for (const patternId of shortPatternIds) {
    const idRegex = new RegExp(`id:\\s*['"]${patternId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`);
    if (idRegex.test(line)) {
      // Found the pattern - find its boundaries
      let start = i;
      let end = i;
      let braceDepth = 0;
      let foundStart = false;
      
      // Go backwards to find the opening brace
      for (let j = i - 1; j >= 0; j--) {
        if (lines[j].trim() === '{') {
          start = j;
          foundStart = true;
          braceDepth = 1;
          break;
        }
        if (lines[j].includes('{')) {
          const openBraces = (lines[j].match(/\{/g) || []).length;
          const closeBraces = (lines[j].match(/\}/g) || []).length;
          if (openBraces > closeBraces) {
            start = j;
            foundStart = true;
            braceDepth = openBraces - closeBraces;
            break;
          }
        }
      }
      
      if (!foundStart) {
        // Pattern might start on the same line
        if (line.includes('{')) {
          start = i;
          braceDepth = (line.match(/\{/g) || []).length;
        }
      }
      
      // Now find the closing brace
      for (let j = start; j < lines.length; j++) {
        const openBraces = (lines[j].match(/\{/g) || []).length;
        const closeBraces = (lines[j].match(/\}/g) || []).length;
        braceDepth += openBraces - closeBraces;
        
        if (braceDepth === 0 && closeBraces > 0) {
          end = j;
          break;
        }
      }
      
      if (end > start) {
        patternsToDelete.push({ start, end, id: patternId });
      }
      break; // Found this pattern, move to next
    }
  }
}

// Sort by start line (descending) so we delete from end to start
patternsToDelete.sort((a, b) => b.start - a.start);

console.log(`\nDeleting ${patternsToDelete.length} patterns...\n`);

// Delete patterns (from end to start to preserve line numbers)
for (const pattern of patternsToDelete) {
  const before = lines.slice(0, pattern.start);
  const after = lines.slice(pattern.end + 1);
  lines.splice(0, lines.length, ...before, ...after);
  console.log(`Deleted ${pattern.id} (lines ${pattern.start + 1}-${pattern.end + 1})`);
}

// Also check morePatterns.ts
const morePatternsPath = join(__dirname, '../src/data/positional/morePatterns.ts');
let morePatternsContent = readFileSync(morePatternsPath, 'utf8');
const morePatternsLines = morePatternsContent.split('\n');

const morePatternsToDelete: Array<{ start: number; end: number; id: string }> = [];

for (let i = 0; i < morePatternsLines.length; i++) {
  const line = morePatternsLines[i];
  
  for (const patternId of shortPatternIds) {
    const idRegex = new RegExp(`id:\\s*['"]${patternId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`);
    if (idRegex.test(line)) {
      let start = i;
      let end = i;
      let braceDepth = 0;
      let foundStart = false;
      
      for (let j = i - 1; j >= 0; j--) {
        if (morePatternsLines[j].trim() === '{') {
          start = j;
          foundStart = true;
          braceDepth = 1;
          break;
        }
      }
      
      if (!foundStart && line.includes('{')) {
        start = i;
        braceDepth = (line.match(/\{/g) || []).length;
      }
      
      for (let j = start; j < morePatternsLines.length; j++) {
        const openBraces = (morePatternsLines[j].match(/\{/g) || []).length;
        const closeBraces = (morePatternsLines[j].match(/\}/g) || []).length;
        braceDepth += openBraces - closeBraces;
        
        if (braceDepth === 0 && closeBraces > 0) {
          end = j;
          break;
        }
      }
      
      if (end > start) {
        morePatternsToDelete.push({ start, end, id: patternId });
      }
      break;
    }
  }
}

morePatternsToDelete.sort((a, b) => b.start - a.start);

for (const pattern of morePatternsToDelete) {
  const before = morePatternsLines.slice(0, pattern.start);
  const after = morePatternsLines.slice(pattern.end + 1);
  morePatternsLines.splice(0, morePatternsLines.length, ...before, ...after);
  console.log(`Deleted ${pattern.id} from morePatterns.ts (lines ${pattern.start + 1}-${pattern.end + 1})`);
}

// Write back both files
writeFileSync(filePath, lines.join('\n'), 'utf8');
if (morePatternsToDelete.length > 0) {
  writeFileSync(morePatternsPath, morePatternsLines.join('\n'), 'utf8');
}

console.log(`\nTotal deleted: ${patternsToDelete.length + morePatternsToDelete.length} patterns`);
