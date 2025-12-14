// ============================================
// DEEP ENDGAME VARIATIONS
// Professional-grade endgame technique
// Each variation shows precise calculation
// ============================================

import type { CourseVariation, AnnotatedCourseMove } from '../courseTypes';

// ============================================
// KING AND PAWN ENDGAMES - COMPLETE TECHNIQUE
// ============================================

export const deepKingPawnVariations: CourseVariation[] = [];

// ============================================
// ROOK ENDGAMES - DEEP TECHNIQUE
// ============================================

export const deepRookEndgameVariations: CourseVariation[] = [];

// ============================================
// MINOR PIECE ENDGAMES
// ============================================

export const deepMinorPieceVariations: CourseVariation[] = [];

// ============================================
// QUEEN ENDGAMES
// ============================================

export const deepQueenEndgameVariations: CourseVariation[] = [];

// ============================================
// PRACTICAL ENDGAMES
// ============================================

export const deepPracticalEndgameVariations: CourseVariation[] = [];

// ============================================
// COMBINATION INDEX
// ============================================

export const allDeepEndgameVariations: CourseVariation[] = [
  ...deepKingPawnVariations,
  ...deepRookEndgameVariations,
  ...deepMinorPieceVariations,
  ...deepQueenEndgameVariations,
  ...deepPracticalEndgameVariations
];

export default allDeepEndgameVariations;












