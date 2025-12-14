/**
 * ALL COURSES - REBUILT WITH LICHESS PUZZLES
 * 10 comprehensive courses with verified puzzles
 */

import type { Course } from './courseTypes';

// Import all courses
import { tacticalPatternTraining } from './tacticalPatternsCourse';
import { artOfAttack } from './artOfAttackCourse';
import { positionalMasterclass } from './positionalMasterclassCourse';
import { strategicMastery } from './strategicMasteryCourse';
import { endgameMastery } from './endgameMasteryCourse';
import { attackMasterclass } from './attackMasterclassCourse';
import { artOfDefense } from './artOfDefenseCourse';
import { calculationDojo } from './calculationDojoCourse';
import { positionalPatterns } from './positionalPatternsCourse';
import { strategicMind } from './strategicMindCourse';

// ============================================
// ALL COURSES ARRAY
// ============================================

export const allCourses: Course[] = [
  tacticalPatternTraining,
  artOfAttack,
  positionalMasterclass,
  strategicMastery,
  endgameMastery,
  attackMasterclass,
  artOfDefense,
  calculationDojo,
  positionalPatterns,
  strategicMind,
];

// ============================================
// INDIVIDUAL COURSE EXPORTS
// ============================================

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

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get a course by its ID
 */
export function getCourseById(id: string): Course | undefined {
  return allCourses.find(c => c.id === id);
}

/**
 * Get total number of variations across all courses
 */
export function getTotalVariations(): number {
  return allCourses.reduce((total, course) => {
    return total + course.chapters.reduce((chTotal, ch) => chTotal + ch.variations.length, 0);
  }, 0);
}

/**
 * Get total estimated time for all courses
 */
export function getTotalMinutes(): number {
  return allCourses.reduce((total, course) => total + course.totalMinutes, 0);
}

/**
 * Get course statistics
 */
export function getCourseStats() {
  const stats = allCourses.map(course => {
    const variationCount = course.chapters.reduce(
      (sum, ch) => sum + ch.variations.length,
      0
    );
    return {
      id: course.id,
      title: course.title,
      chapters: course.chapters.length,
      variations: variationCount,
      minutes: course.totalMinutes,
    };
  });

  return {
    courses: stats,
    total: {
      courses: allCourses.length,
      chapters: stats.reduce((sum, s) => sum + s.chapters, 0),
      variations: stats.reduce((sum, s) => sum + s.variations, 0),
      minutes: stats.reduce((sum, s) => sum + s.minutes, 0),
    },
  };
}

export default allCourses;
