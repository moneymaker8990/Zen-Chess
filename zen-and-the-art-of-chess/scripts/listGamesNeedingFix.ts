import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const report = JSON.parse(readFileSync(path.join(__dirname, 'systematic-fix-report.json'), 'utf-8'));

const needsFix = report.filter((r: any) => r.invalidMoves.length > 0);

console.log('\n📋 Games with Invalid Moves (Need Manual Fixes):\n');
console.log('='.repeat(70));

needsFix.sort((a: any, b: any) => a.dayNumber - b.dayNumber);

needsFix.forEach((r: any) => {
  console.log(`\nDay ${r.dayNumber}: ${r.title}`);
  r.invalidMoves.forEach((m: any) => {
    console.log(`  ❌ Move ${m.index + 1}: ${m.originalMove}`);
    console.log(`     Reason: ${m.reason}`);
    if (m.suggestedFix) {
      console.log(`     💡 Suggested fix: ${m.suggestedFix}`);
    }
  });
});

console.log('\n' + '='.repeat(70));
console.log(`\n📊 Summary:`);
console.log(`   Total games needing fixes: ${needsFix.length}`);
console.log(`   Games with only FEN mismatches: ${report.filter((r: any) => r.invalidMoves.length === 0 && r.correctedFENs > 0).length}`);
console.log(`   Games fully valid: ${report.filter((r: any) => r.invalidMoves.length === 0 && r.correctedFENs === 0).length}`);
console.log('');


