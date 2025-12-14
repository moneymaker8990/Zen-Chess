// ============================================
// DEEP TACTICAL VARIATIONS
// Professional-grade multi-move tactical sequences
// Each variation has 5-12 annotated moves
// ============================================

import type { CourseVariation, AnnotatedCourseMove } from '../courseTypes';

// ============================================
// CLASSICAL SACRIFICES
// ============================================

export const classicalSacrifices: CourseVariation[] = [];

// ============================================
// PIN COMBINATIONS - DEEP SEQUENCES
// ============================================

export const deepPinVariations: CourseVariation[] = [];

// ============================================
// FORK COMBINATIONS - DEEP SEQUENCES
// ============================================

export const deepForkVariations: CourseVariation[] = [];

// ============================================
// DISCOVERED ATTACK SEQUENCES
// ============================================

export const deepDiscoveredVariations: CourseVariation[] = [];

// ============================================
// CHECKMATE PATTERNS - DEEP ANALYSIS
// ============================================

export const deepCheckmateVariations: CourseVariation[] = [];

// ============================================
// ZWISCHENZUG SEQUENCES
// ============================================

export const deepZwischenzugVariations: CourseVariation[] = [];

// ============================================
// COMBINATION INDEX
// ============================================

export const allDeepTacticalVariations: CourseVariation[] = [
  ...classicalSacrifices,
  ...deepPinVariations,
  ...deepForkVariations,
  ...deepDiscoveredVariations,
  ...deepCheckmateVariations,
  ...deepZwischenzugVariations
];

export default allDeepTacticalVariations;












