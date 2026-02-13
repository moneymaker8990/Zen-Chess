// ============================================
// PATTERN VALIDATOR
// Runtime validation for pattern data integrity
// Runs on app startup in dev mode
// ============================================

import { enhancedPatterns } from '@/data/positional/enhancedPatterns';
import type { Square } from 'chess.js';
import { 
  validateAllPatterns, 
  formatValidationReport,
  type PatternSchema,
  type ValidationReport,
  type PatternValidationResult,
} from './patternSchema';
import { logger } from './logger';

// ============================================
// ADAPTER: Convert EnhancedPattern to PatternSchema
// ============================================

function adaptEnhancedPattern(pattern: typeof enhancedPatterns[0]): PatternSchema {
  return {
    id: pattern.id,
    title: pattern.title,
    subtitle: pattern.subtitle,
    category: pattern.category,
    fen: pattern.fen,
    toMove: pattern.toMove,
    introduction: pattern.introduction,
    keyIdeas: pattern.keyIdeas,
    mainLine: pattern.mainLine.map(move => ({
      move: move.move,
      isMainLine: move.isMainLine,
      annotation: move.annotation,
      explanation: move.explanation,
      arrows: move.arrows?.map(a => ({
        from: a.from as Square,
        to: a.to as Square,
        color: a.color,
      })),
      highlights: move.highlights as Square[] | undefined,
      alternativeMoves: move.alternativeMoves,
      conceptTag: move.conceptTag,
    })),
    summary: pattern.summary,
    keyTakeaways: pattern.keyTakeaways,
    difficulty: pattern.difficulty,
    estimatedMinutes: pattern.estimatedMinutes,
    source: pattern.source,
    memoryTip: pattern.memoryTip,
    practicePositions: pattern.practicePositions,
    playerExample: pattern.playerExample,
    themes: pattern.themes,
  };
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validates all enhanced patterns and returns results
 */
export function validateEnhancedPatterns(): ValidationReport {
  const adaptedPatterns = enhancedPatterns.map(adaptEnhancedPattern);
  return validateAllPatterns(adaptedPatterns);
}

/**
 * Validates a single pattern by ID
 */
export function validatePatternById(patternId: string): PatternValidationResult | null {
  const pattern = enhancedPatterns.find(p => p.id === patternId);
  if (!pattern) return null;
  
  const adapted = adaptEnhancedPattern(pattern);
  const report = validateAllPatterns([adapted]);
  return report.results[0] || null;
}

/**
 * Get a list of invalid pattern IDs
 */
export function getInvalidPatternIds(): string[] {
  const report = validateEnhancedPatterns();
  return report.results
    .filter(r => !r.valid)
    .map(r => r.patternId);
}

/**
 * Get a list of patterns with warnings
 */
export function getPatternsWithWarnings(): string[] {
  const report = validateEnhancedPatterns();
  return report.results
    .filter(r => r.warnings.length > 0)
    .map(r => r.patternId);
}

// ============================================
// DEV MODE INTEGRATION
// ============================================

let hasRunValidation = false;

/**
 * Runs pattern validation on app startup (dev mode only)
 * Logs results to console with formatted output
 */
export function runDevValidation(): void {
  if (hasRunValidation) return;
  hasRunValidation = true;
  
  if (!import.meta.env.DEV) {
    return;
  }
  
  const startTime = performance.now();
  const report = validateEnhancedPatterns();
  const duration = performance.now() - startTime;
  
  if (report.invalidPatterns > 0) {
    logger.error(formatValidationReport(report));
    logger.error(`Pattern Validation: ${report.invalidPatterns} invalid pattern(s) found`);
  } else if (report.totalWarnings > 0) {
    logger.warn(formatValidationReport(report));
    logger.warn(`Pattern Validation: ${report.totalWarnings} warning(s) in patterns`);
  } else {
    logger.info(`Pattern Validation: All ${report.totalPatterns} patterns validated successfully`);
  }
  
  logger.debug(`Pattern validation completed in ${duration.toFixed(2)}ms`);
}

/**
 * Throws an error if any patterns are invalid (for CI/tests)
 */
export function assertAllPatternsValid(): void {
  const report = validateEnhancedPatterns();
  
  if (report.invalidPatterns > 0) {
    const errorDetails = report.results
      .filter(r => !r.valid)
      .map(r => `${r.patternId}: ${r.errors.map(e => e.message).join(', ')}`)
      .join('\n');
    
    throw new Error(
      `Pattern validation failed:\n` +
      `${report.invalidPatterns} invalid pattern(s) found:\n` +
      errorDetails
    );
  }
}

// ============================================
// EXPORT UTILITIES
// ============================================

export {
  validateAllPatterns,
  formatValidationReport,
  type ValidationReport,
  type PatternValidationResult,
  type PatternSchema,
};

export default {
  validateEnhancedPatterns,
  validatePatternById,
  getInvalidPatternIds,
  getPatternsWithWarnings,
  runDevValidation,
  assertAllPatternsValid,
};



