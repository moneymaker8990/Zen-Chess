import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = join(__dirname, '../src/data/positional/morePatterns.ts');
let content = readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find lines that start with just "category:" - these are missing the opening brace and id
let fixed = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this line starts with just category: (missing opening brace and id)
  if (line.match(/^\s+category:\s*['"]/)) {
    // Look backwards to see if there's an opening brace
    let foundBrace = false;
    for (let j = i - 1; j >= Math.max(0, i - 5); j--) {
      if (lines[j].trim() === '{') {
        foundBrace = true;
        break;
      }
    }
    
    if (!foundBrace) {
      // This pattern is missing the opening brace and id
      // We need to add: { id: 'pattern-id', before the category line
      // But we need to figure out what the id should be based on the title or category
      
      // Look ahead to find the title
      let title = '';
      let category = '';
      for (let j = i; j < Math.min(lines.length, i + 10); j++) {
        const titleMatch = lines[j].match(/title:\s*['"]([^'"]+)['"]/);
        if (titleMatch) {
          title = titleMatch[1];
        }
        const catMatch = lines[j].match(/category:\s*['"]([^'"]+)['"]/);
        if (catMatch) {
          category = catMatch[1];
        }
      }
      
      // Generate an ID from the title
      const id = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      // Insert the opening brace and id before the category line
      lines.splice(i, 0, '  {', `    id: '${id}',`);
      fixed++;
      i += 2; // Skip the lines we just added
    }
  }
}

if (fixed > 0) {
  writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`Fixed ${fixed} broken patterns`);
} else {
  console.log('No broken patterns found');
}
