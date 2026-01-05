/**
 * Pattern Completeness Audit Script (By Category)
 * 
 * Analyzes all patterns grouped by category and generates a completeness report.
 * 
 * Usage:
 *   npx tsx scripts/auditPatternsByCategory.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { Chess } from 'chess.js';
import { enhancedPatterns, getAllCategories, getPatternsByCategory, type PositionalCategory, type EnhancedPattern } from '../src/data/positional/enhancedPatterns';

interface PatternAuditResult {
  id: string;
  title: string;
  category: PositionalCategory;
  completenessScore: number;
  hasIntroduction: boolean;
  introductionLength: number;
  keyIdeasCount: number;
  hasSummary: boolean;
  summaryLength: number;
  keyTakeawaysCount: number;
  hasMemoryTip: boolean;
  mainLineMovesCount: number;
  movesWithShortExplanations: number;
  hasValidFEN: boolean;
  hasValidMoves: boolean;
  moveErrors: string[];
  gaps: string[];
}

interface CategoryAuditResult {
  category: PositionalCategory;
  totalPatterns: number;
  averageScore: number;
  patternsAbove90: number;
  patternsBelow70: number;
  patterns: PatternAuditResult[];
}

interface AuditReport {
  totalPatterns: number;
  averageScore: number;
  patternsAbove90: number;
  patternsBelow70: number;
  categories: CategoryAuditResult[];
  recommendations: string[];
}

/**
 * Validate FEN string
 */
function validateFEN(fen: string): { valid: boolean; error?: string } {
  try {
    const game = new Chess(fen);
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Validate moves in mainLine
 */
function validateMoves(fen: string, mainLine: EnhancedPattern['mainLine']): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  try {
    const game = new Chess(fen);
    for (let i = 0; i < mainLine.length; i++) {
      const move = mainLine[i];
      try {
        const result = game.move(move.move);
        if (!result) {
          errors.push(`Move ${i + 1} "${move.move}" is illegal`);
        }
      } catch (err) {
        errors.push(`Move ${i + 1} "${move.move}": ${err instanceof Error ? err.message : 'Invalid move'}`);
      }
    }
  } catch (err) {
    errors.push(`Starting FEN invalid: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Calculate completeness score for a pattern
 */
function calculateCompleteness(pattern: EnhancedPattern): PatternAuditResult {
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
  
  // MainLine quality
  const mainLineMovesCount = pattern.mainLine?.length || 0;
  let movesWithShortExplanations = 0;
  if (pattern.mainLine) {
    for (const move of pattern.mainLine) {
      if (!move.explanation || move.explanation.trim().length < 10) {
        movesWithShortExplanations++;
      }
    }
    if (movesWithShortExplanations > 0) {
      gaps.push(`${movesWithShortExplanations} moves have short explanations (< 10 chars)`);
    }
  }
  
  // FEN validation
  const fenValidation = validateFEN(pattern.fen);
  const hasValidFEN = fenValidation.valid;
  if (!hasValidFEN) {
    gaps.push(`Invalid FEN: ${fenValidation.error}`);
  }
  
  // Move validation
  const moveValidation = validateMoves(pattern.fen, pattern.mainLine);
  const hasValidMoves = moveValidation.valid;
  if (!hasValidMoves) {
    gaps.push(...moveValidation.errors);
  }
  
  return {
    id: pattern.id,
    title: pattern.title,
    category: pattern.category,
    completenessScore: Math.round(score),
    hasIntroduction: hasIntro,
    introductionLength: introLength,
    keyIdeasCount,
    hasSummary,
    summaryLength,
    keyTakeawaysCount: takeawaysCount,
    hasMemoryTip,
    mainLineMovesCount,
    movesWithShortExplanations,
    hasValidFEN,
    hasValidMoves,
    moveErrors: moveValidation.errors,
    gaps,
  };
}

/**
 * Main audit function
 */
async function auditPatternsByCategory() {
  console.log('🔍 Auditing pattern completeness by category...\n');
  
  const categories = getAllCategories();
  const categoryResults: CategoryAuditResult[] = [];
  let totalScore = 0;
  let totalPatterns = 0;
  let patternsAbove90 = 0;
  let patternsBelow70 = 0;
  
  for (const category of categories) {
    const patterns = getPatternsByCategory(category);
    if (patterns.length === 0) continue;
    
    const results: PatternAuditResult[] = patterns.map(calculateCompleteness);
    const categoryScore = results.reduce((sum, r) => sum + r.completenessScore, 0);
    const avgScore = categoryScore / results.length;
    const above90 = results.filter(r => r.completenessScore >= 90).length;
    const below70 = results.filter(r => r.completenessScore < 70).length;
    
    categoryResults.push({
      category,
      totalPatterns: results.length,
      averageScore: Math.round(avgScore),
      patternsAbove90: above90,
      patternsBelow70: below70,
      patterns: results.sort((a, b) => a.completenessScore - b.completenessScore),
    });
    
    totalScore += categoryScore;
    totalPatterns += results.length;
    patternsAbove90 += above90;
    patternsBelow70 += below70;
  }
  
  const avgScore = totalScore / totalPatterns;
  
  const report: AuditReport = {
    totalPatterns,
    averageScore: Math.round(avgScore),
    patternsAbove90,
    patternsBelow70,
    categories: categoryResults.sort((a, b) => b.averageScore - a.averageScore),
    recommendations: [
      below70 > 0 ? `🔴 ${below70} patterns need significant work (< 70% complete)` : '✅ No critically incomplete patterns',
      patternsAbove90 < totalPatterns ? `🟡 ${totalPatterns - patternsAbove90} patterns could use polish` : '✅ All patterns are 90%+ complete!',
      'Use patternTemplate.md as a guide for filling gaps',
    ],
  };
  
  // Write report
  const reportPath = path.join(__dirname, '../pattern-audit-by-category.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`📊 Overall Audit Report:`);
  console.log(`   Total Patterns: ${report.totalPatterns}`);
  console.log(`   Average Score: ${report.averageScore}%`);
  console.log(`   90%+ Complete: ${report.patternsAbove90}`);
  console.log(`   < 70% Complete: ${report.patternsBelow70}\n`);
  
  console.log(`📋 By Category:\n`);
  for (const catResult of categoryResults) {
    console.log(`   ${catResult.category}:`);
    console.log(`      Patterns: ${catResult.totalPatterns}`);
    console.log(`      Avg Score: ${catResult.averageScore}%`);
    console.log(`      90%+: ${catResult.patternsAbove90}, <70%: ${catResult.patternsBelow70}`);
    if (catResult.patternsBelow70 > 0) {
      const worst = catResult.patterns[0];
      console.log(`      Worst: ${worst.title} (${worst.completenessScore}%)`);
    }
    console.log('');
  }
  
  console.log(`📄 Full report written to: ${reportPath}`);
  return report;
}

// Run if executed directly
if (require.main === module) {
  auditPatternsByCategory().catch(console.error);
}

export { calculateCompleteness, auditPatternsByCategory, type PatternAuditResult, type CategoryAuditResult, type AuditReport };

