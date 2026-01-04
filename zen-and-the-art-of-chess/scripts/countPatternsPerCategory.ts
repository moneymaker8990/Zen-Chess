import { enhancedPatterns, getAllCategories, type PositionalCategory } from '../src/data/positional/enhancedPatterns';

const categories = getAllCategories();
const counts: Record<PositionalCategory, number> = {} as any;

categories.forEach(cat => {
  counts[cat] = enhancedPatterns.filter(p => p.category === cat).length;
});

console.log('\nPattern Count Per Category:\n');
console.log('='.repeat(60));
categories.forEach(cat => {
  const count = counts[cat];
  const status = count >= 10 ? '✓' : '✗';
  console.log(`${status} ${cat.padEnd(25)} ${count}/10 patterns`);
});
console.log('='.repeat(60));
console.log(`\nTotal: ${enhancedPatterns.length} patterns`);
console.log(`Target: ${categories.length * 10} patterns (${categories.length} categories × 10)`);
console.log(`Needed: ${categories.length * 10 - enhancedPatterns.length} more patterns\n`);

