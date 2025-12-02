// ============================================
// COURSES INDEX
// All courses in one place - using bulk variations
// ============================================

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

// Import the bulk-generated courses with 2000+ variations
export { 
  allCourses,
  positionalMasterclass,
  amateursMind,
  endgameEssentials,
  woodpeckerTactics,
  // NEW COURSES
  attackMasterclass,
  defenseArtCourse,
  calculationDojo,
  getCourseById,
  getTotalVariations,
} from './allCourses';

// Aliases for backwards compatibility
export { positionalMasterclass as positionalPatternsCourse } from './allCourses';
export { amateursMind as amateurMindCourse } from './allCourses';
export { endgameEssentials as endgameCourse } from './allCourses';
export { woodpeckerTactics as woodpeckerCourse } from './allCourses';

// Helper to count all variations in a course
export function countCourseVariations(course: { chapters: { variations: unknown[] }[] }) {
  return course.chapters.reduce((sum, ch) => sum + ch.variations.length, 0);
}
