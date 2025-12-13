import fs from 'fs';

// Handle expanded-systems.ts - inline format with side at the end
let content = fs.readFileSync('src/data/openings/expanded-systems.ts', 'utf8');

const totalOpenings = (content.match(/id:\s*'/g) || []).length;
const withPriority = (content.match(/priority:\s*'/g) || []).length;

console.log(`expanded-systems.ts: ${totalOpenings} openings, ${withPriority} have priority`);

// For inline format: side: 'black' } or side: 'white' }
// Add priority: 'recommended' before the closing brace
let modified = content.replace(
  /side:\s*'(white|black)'\s*\}/g,
  "side: '$1', priority: 'recommended' }"
);

const afterPriority = (modified.match(/priority:\s*'/g) || []).length;

if (afterPriority > withPriority) {
  fs.writeFileSync('src/data/openings/expanded-systems.ts', modified);
  console.log(`  -> Added ${afterPriority - withPriority} priority fields`);
}

console.log('\nDone!');
