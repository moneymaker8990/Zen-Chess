/**
 * Analyze Pattern Validation Errors
 * Categorizes broken patterns by error type to determine fix strategy
 */

import { enhancedPatterns } from '../src/data/positional/enhancedPatterns';
import { validatePattern, type PatternValidationResult } from './validatePatterns';

interface ErrorAnalysis {
  patternId: string;
  title: string;
  category: string;
  errorType: 'invalid_fen' | 'first_move_fail' | 'early_fail' | 'late_fail';
  movesPlayed: number;
  totalMoves: number;
  successRate: number;
  firstError: {
    moveIndex: number;
    move: string;
    error: string;
  };
}

function categorizeError(result: PatternValidationResult): ErrorAnalysis {
  const firstError = result.errors[0];
  const successRate = result.movesPlayed / result.totalMoves;
  
  let errorType: ErrorAnalysis['errorType'];
  
  if (firstError.type === 'INVALID_FEN') {
    errorType = 'invalid_fen';
  } else if (firstError.moveIndex === 0) {
    errorType = 'first_move_fail';
  } else if (firstError.moveIndex <= 3) {
    errorType = 'early_fail';
  } else {
    errorType = 'late_fail';
  }
  
  return {
    patternId: result.patternId,
    title: result.patternTitle,
    category: result.category,
    errorType,
    movesPlayed: result.movesPlayed,
    totalMoves: result.totalMoves,
    successRate,
    firstError: {
      moveIndex: firstError.moveIndex,
      move: firstError.move || 'N/A',
      error: firstError.error || 'Unknown error',
    },
  };
}

function analyzeAllErrors() {
  console.log('Analyzing pattern validation errors...\n');
  
  const validPatterns: PatternValidationResult[] = [];
  const invalidPatterns: PatternValidationResult[] = [];
  
  // Validate all patterns
  for (const pattern of enhancedPatterns) {
    const result = validatePattern(pattern);
    if (result.valid) {
      validPatterns.push(result);
    } else {
      invalidPatterns.push(result);
    }
  }
  
  // Categorize errors
  const analyses = invalidPatterns.map(categorizeError);
  
  // Group by error type
  const byErrorType: Record<string, ErrorAnalysis[]> = {
    invalid_fen: [],
    first_move_fail: [],
    early_fail: [],
    late_fail: [],
  };
  
  analyses.forEach(analysis => {
    byErrorType[analysis.errorType].push(analysis);
  });
  
  // Group by category
  const byCategory: Record<string, ErrorAnalysis[]> = {};
  analyses.forEach(analysis => {
    if (!byCategory[analysis.category]) {
      byCategory[analysis.category] = [];
    }
    byCategory[analysis.category].push(analysis);
  });
  
  // Print summary
  console.log('='.repeat(70));
  console.log('ERROR ANALYSIS SUMMARY');
  console.log('='.repeat(70));
  console.log(`Total patterns: ${enhancedPatterns.length}`);
  console.log(`Valid patterns: ${validPatterns.length} (${((validPatterns.length / enhancedPatterns.length) * 100).toFixed(1)}%)`);
  console.log(`Invalid patterns: ${invalidPatterns.length} (${((invalidPatterns.length / enhancedPatterns.length) * 100).toFixed(1)}%)`);
  console.log();
  
  console.log('Error Type Breakdown:');
  console.log('-'.repeat(70));
  Object.entries(byErrorType).forEach(([type, items]) => {
    console.log(`${type.padEnd(20)} ${items.length.toString().padStart(4)} patterns`);
  });
  console.log();
  
  console.log('Category Breakdown:');
  console.log('-'.repeat(70));
  Object.entries(byCategory)
    .sort((a, b) => b[1].length - a[1].length)
    .forEach(([category, items]) => {
      const validCount = validPatterns.filter(p => p.category === category).length;
      const totalCount = validCount + items.length;
      console.log(`${category.padEnd(25)} ${validCount}/${totalCount} valid (${items.length} broken)`);
    });
  console.log();
  
  // Fix recommendations
  console.log('='.repeat(70));
  console.log('FIX RECOMMENDATIONS');
  console.log('='.repeat(70));
  
  const fixable = analyses.filter(a => a.successRate >= 0.8 || a.errorType === 'late_fail');
  const maybeFixable = analyses.filter(a => a.successRate >= 0.5 && a.successRate < 0.8);
  const unfixable = analyses.filter(a => a.successRate < 0.5 && a.errorType !== 'late_fail');
  
  console.log(`\nLikely Fixable (>80% moves work OR late fail): ${fixable.length}`);
  console.log(`  Strategy: Adjust problematic moves or fix move notation`);
  console.log();
  
  console.log(`Maybe Fixable (50-80% moves work): ${maybeFixable.length}`);
  console.log(`  Strategy: Review and attempt fixes, delete if too complex`);
  console.log();
  
  console.log(`Unfixable (<50% moves work): ${unfixable.length}`);
  console.log(`  Strategy: Delete and regenerate`);
  console.log();
  
  // Save detailed analysis to JSON
  const detailedAnalysis = {
    summary: {
      total: enhancedPatterns.length,
      valid: validPatterns.length,
      invalid: invalidPatterns.length,
      fixable: fixable.length,
      maybeFixable: maybeFixable.length,
      unfixable: unfixable.length,
    },
    byErrorType,
    byCategory,
    recommendations: {
      fixable: fixable.map(a => a.patternId),
      maybeFixable: maybeFixable.map(a => a.patternId),
      unfixable: unfixable.map(a => a.patternId),
    },
    allAnalyses: analyses,
  };
  
  console.log('Detailed analysis saved to: scripts/patternErrorAnalysis.json');
  
  return detailedAnalysis;
}

// Run analysis
const analysis = analyzeAllErrors();

// Export for use in other scripts
export { analyzeAllErrors, type ErrorAnalysis };
