/**
 * COURSES INDEX
 * Rebuilt with verified Lichess puzzles
 */

// Types
export type { 
  Course, 
  CourseChapter, 
  CourseVariation,
  AnnotatedCourseMove,
  CourseProgress 
} from './courseTypes';

export { 
  calculateCourseStats, 
  calculateProgress 
} from './courseTypes';

// All Courses
export { 
  allCourses,
  getCourseById,
  getTotalVariations,
  getTotalMinutes,
  getCourseStats,
} from './allCourses';

// Individual Courses
export { tacticalPatternTraining } from './tacticalPatternsCourse';
export { artOfAttack } from './artOfAttackCourse';
export { positionalMasterclass } from './positionalMasterclassCourse';
export { strategicMastery } from './strategicMasteryCourse';
export { endgameMastery } from './endgameMasteryCourse';
export { attackMasterclass } from './attackMasterclassCourse';
export { artOfDefense } from './artOfDefenseCourse';
export { calculationDojo } from './calculationDojoCourse';
export { positionalPatterns } from './positionalPatternsCourse';
export { strategicMind } from './strategicMindCourse';

// Converter utilities (for extending courses)
export {
  puzzleToCourseVariation,
  puzzlesToVariations,
  puzzlesByThemeToVariations,
  validatePuzzle,
  getThemeDescription,
} from './courseConverter';

// Helper to count all variations in a course
export function countCourseVariations(course: { chapters: { variations: unknown[] }[] }) {
  return course.chapters.reduce((sum, ch) => sum + ch.variations.length, 0);
}
