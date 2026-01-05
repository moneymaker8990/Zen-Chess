/**
 * Pattern Completeness Audit Script
 * 
 * Analyzes all patterns in enhancedPatterns.ts and generates a completeness report.
 * 
 * Usage:
 *   npx ts-node scripts/auditPatterns.ts
 * 
 * Output:
 *   Writes pattern-completeness-report.json with scores and gaps
 */

import * as fs from 'fs';
import * as path from 'path';

// Import patterns data
// Note: Adjust path if needed based on your project structure
const patternsPath = path.join(__dirname, '../src/data/positional/enhancedPatterns.ts');

interface PatternAuditResult {
  id: string;
  name: string;
  completenessScore: number;
  hasIntroduction: boolean;
  introductionLength: number;
  keyIdeasCount: number;
  hasSummary: boolean;
  summaryLength: number;
  keyTakeawaysCount: number;
  hasMemoryTip: boolean;
  gaps: string[];
}

interface AuditReport {
  totalPatterns: number;
  averageScore: number;
  patternsAbove90: number;
  patternsBelow70: number;
  patterns: PatternAuditResult[];
  recommendations: string[];
}

/**
 * Calculate completeness score for a pattern
 */
function calculateCompleteness(pattern: any): PatternAuditResult {
  const gaps: string[] = [];
  let score = 0;
  
  // Introduction (20 points)
  const hasIntro = pattern.introduction && pattern.introduction.length >= 50;
  const introLength = pattern.introduction?.length || 0;
  if (hasIntro) {
    score += 20;
  } else if (introLength > 0) {
    score += Math.min(20, (introLength / 50) * 20);
    gaps.push(`Introduction too short (${introLength} chars, need 50+)`);
  } else {
    gaps.push('Missing introduction');
  }
  
  // Key Ideas (25 points)
  const keyIdeasCount = pattern.keyIdeas?.length || 0;
  if (keyIdeasCount >= 2) {
    score += 25;
  } else if (keyIdeasCount === 1) {
    score += 12.5;
    gaps.push('Only 1 key idea (need at least 2)');
  } else {
    gaps.push('Missing key ideas');
  }
  
  // Summary (20 points)
  const hasSummary = pattern.summary && pattern.summary.length >= 30;
  const summaryLength = pattern.summary?.length || 0;
  if (hasSummary) {
    score += 20;
  } else if (summaryLength > 0) {
    score += Math.min(20, (summaryLength / 30) * 20);
    gaps.push(`Summary too short (${summaryLength} chars, need 30+)`);
  } else {
    gaps.push('Missing summary');
  }
  
  // Key Takeaways (25 points)
  const takeawaysCount = pattern.keyTakeaways?.length || 0;
  if (takeawaysCount >= 2) {
    score += 25;
  } else if (takeawaysCount === 1) {
    score += 12.5;
    gaps.push('Only 1 key takeaway (need at least 2)');
  } else {
    gaps.push('Missing key takeaways');
  }
  
  // Memory Tip (10 points - bonus)
  const hasMemoryTip = !!pattern.memoryTip;
  if (hasMemoryTip) {
    score += 10;
  } else {
    gaps.push('Missing memory tip (recommended)');
  }
  
  return {
    id: pattern.id,
    name: pattern.name,
    completenessScore: Math.round(score),
    hasIntroduction: hasIntro,
    introductionLength: introLength,
    keyIdeasCount,
    hasSummary,
    summaryLength,
    keyTakeawaysCount: takeawaysCount,
    hasMemoryTip,
    gaps,
  };
}

/**
 * Main audit function
 */
async function auditPatterns() {
  console.log('🔍 Auditing pattern completeness...\n');
  
  // This is a placeholder - in a real scenario, you'd dynamically import the patterns
  // For now, provide instructions for manual use
  console.log('📋 To use this script:');
  console.log('1. Import your patterns array from enhancedPatterns.ts');
  console.log('2. Pass each pattern through calculateCompleteness()');
  console.log('3. Generate the report\n');
  
  // Example of how to use (developer would uncomment and adjust):
  /*
  import { patterns } from '../src/data/positional/enhancedPatterns';
  
  const results: PatternAuditResult[] = patterns.map(calculateCompleteness);
  const totalScore = results.reduce((sum, r) => sum + r.completenessScore, 0);
  const avgScore = totalScore / results.length;
  const above90 = results.filter(r => r.completenessScore >= 90).length;
  const below70 = results.filter(r => r.completenessScore < 70).length;
  
  const report: AuditReport = {
    totalPatterns: results.length,
    averageScore: Math.round(avgScore),
    patternsAbove90: above90,
    patternsBelow70: below70,
    patterns: results.sort((a, b) => a.completenessScore - b.completenessScore),
    recommendations: [
      below70 > 0 ? `🔴 ${below70} patterns need significant work (< 70% complete)` : '✅ No critically incomplete patterns',
      above90 < results.length ? `🟡 ${results.length - above90} patterns could use polish` : '✅ All patterns are 90%+ complete!',
      'Use patternTemplate.md as a guide for filling gaps',
    ],
  };
  
  // Write report
  const reportPath = path.join(__dirname, '../pattern-completeness-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`📊 Audit Report:`);
  console.log(`   Total Patterns: ${report.totalPatterns}`);
  console.log(`   Average Score: ${report.averageScore}%`);
  console.log(`   90%+ Complete: ${report.patternsAbove90}`);
  console.log(`   < 70% Complete: ${report.patternsBelow70}\n`);
  console.log(`📄 Full report written to: ${reportPath}`);
  */
  
  console.log('✨ Script template ready. Customize as needed for your patterns data structure.');
}

// Run if executed directly
if (require.main === module) {
  auditPatterns().catch(console.error);
}

export { calculateCompleteness, type PatternAuditResult, type AuditReport };

