// ============================================
// COURSE SYSTEM TYPES
// Chessable-style course structure
// ============================================

export interface CourseVariation {
  id: string;
  title: string;
  fen: string;
  toMove: 'white' | 'black';
  moves: AnnotatedCourseMove[];
  concept: string;
  keyTakeaway: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  /** Deep introduction explaining the position and what we're learning */
  introduction?: string;
  /** What common mistakes beginners make here */
  commonMistakes?: string[];
  /** The deeper principle this teaches */
  deeperPrinciple?: string;
}

export interface AnnotatedCourseMove {
  move: string;
  annotation?: string;
  explanation: string;
  arrows?: Array<{ from: string; to: string; color?: string }>;
  highlights?: string[];
  alternatives?: Array<{
    move: string;
    evaluation: 'best' | 'good' | 'equal' | 'dubious' | 'bad';
    explanation: string;
  }>;
}

export interface CourseChapter {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  estimatedMinutes: number;
  variations: CourseVariation[];
  keyLessons: string[];
}

export interface Course {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string; // emoji or image path
  coverColor: string;
  totalMinutes: number;
  chapters: CourseChapter[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
  tags: string[];
  prerequisites?: string[];
}

export interface CourseProgress {
  courseId: string;
  completedVariations: string[];
  variationScores: Record<string, {
    lastScore: number;
    attempts: number;
    nextReview: number;
    srsLevel: number;
  }>;
  lastAccessed: number;
  totalTimeSpent: number; // minutes
  currentChapter: string;
  currentVariation: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function calculateCourseStats(course: Course) {
  let totalVariations = 0;
  course.chapters.forEach(ch => {
    totalVariations += ch.variations.length;
  });
  return {
    totalChapters: course.chapters.length,
    totalVariations,
    totalMinutes: course.totalMinutes,
  };
}

export function calculateProgress(course: Course, progress: CourseProgress | undefined) {
  const stats = calculateCourseStats(course);
  if (!progress) {
    return {
      completedVariations: 0,
      totalVariations: stats.totalVariations,
      percentComplete: 0,
      minutesSpent: 0,
      totalMinutes: stats.totalMinutes,
      dueForReview: 0,
    };
  }

  const now = Date.now();
  let dueForReview = 0;
  Object.values(progress.variationScores).forEach(score => {
    if (score.nextReview <= now) dueForReview++;
  });

  return {
    completedVariations: progress.completedVariations.length,
    totalVariations: stats.totalVariations,
    percentComplete: Math.round((progress.completedVariations.length / stats.totalVariations) * 100),
    minutesSpent: progress.totalTimeSpent,
    totalMinutes: stats.totalMinutes,
    dueForReview,
  };
}

