// ============================================
// COURSES PAGE
// Chessable-style course list with progress
// Integrated with app layout and styling
// ============================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@/components/BackButton';
import { 
  allCourses, 
  calculateCourseStats, 
  calculateProgress,
  type Course,
  type CourseProgress 
} from '../data/courses';

// ============================================
// STORAGE HELPERS
// ============================================

function loadAllProgress(): Record<string, CourseProgress> {
  try {
    const stored = localStorage.getItem('courseProgress');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function getTotalDueForReview(allProgress: Record<string, CourseProgress>): number {
  const now = Date.now();
  let total = 0;
  
  Object.values(allProgress).forEach(progress => {
    Object.values(progress.variationScores).forEach(score => {
      if (score.nextReview <= now) total++;
    });
  });
  
  return total;
}

// ============================================
// COURSE CARD COMPONENT
// ============================================

interface CourseCardProps {
  course: Course;
  progress: CourseProgress | undefined;
  onLearn: () => void;
  onReview: () => void;
}

function CourseCard({ course, progress, onLearn, onReview }: CourseCardProps) {
  const stats = calculateCourseStats(course);
  const progressData = calculateProgress(course, progress);
  const progressPercent = progressData.totalVariations > 0 
    ? (progressData.completedVariations / progressData.totalVariations) * 100 
    : 0;

  return (
    <div className="card p-3 sm:p-5 hover:border-[var(--accent-primary)]/30 transition-all overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-display font-medium leading-tight pr-2 flex-1 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
          {course.title}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <button className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors" style={{ color: 'var(--text-muted)' }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Course Content - Stack on mobile, flex on larger screens */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Cover Image - Smaller on mobile */}
        <div 
          className="w-full sm:w-28 h-24 sm:h-36 rounded-lg flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-lg"
          style={{ backgroundColor: course.coverColor }}
        >
          {course.coverImage}
        </div>

        {/* Stats */}
        <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
          {/* Time & Variations - Wrap on mobile */}
          <div className="flex flex-wrap items-center text-xs sm:text-sm gap-2 sm:gap-3" style={{ color: 'var(--text-muted)' }}>
            <span className="whitespace-nowrap">{progressData.minutesSpent}/{stats.totalMinutes} mins</span>
            <span className="hidden sm:block w-px h-4" style={{ background: 'var(--border-default)' }}></span>
            <span className="whitespace-nowrap">{progressData.completedVariations}/{stats.totalVariations} vars</span>
          </div>

          {/* Progress Bar */}
          <div className="my-2 sm:my-3">
            <div className="progress-bar">
              <div 
                className="progress-bar-fill purple"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onReview}
              className="relative flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all btn-secondary"
            >
              Review
              {progressData.dueForReview > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full min-w-[20px] sm:min-w-[24px]">
                  {progressData.dueForReview}
                </span>
              )}
            </button>
            <button
              onClick={onLearn}
              className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-all btn-primary"
            >
              Learn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COURSES PAGE
// ============================================

export default function CoursesPage() {
  const navigate = useNavigate();
  const [allProgress, setAllProgress] = useState<Record<string, CourseProgress>>({});
  const totalDue = getTotalDueForReview(allProgress);

  useEffect(() => {
    setAllProgress(loadAllProgress());
  }, []);

  const handleLearn = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  const handleReview = (courseId: string) => {
    navigate(`/courses/${courseId}/review`);
  };

  const handleReviewAll = () => {
    // Navigate to a global review page
    navigate('/courses/review-all');
  };

  // Calculate total stats
  const totalVariations = allCourses.reduce((sum, c) => sum + calculateCourseStats(c).totalVariations, 0);
  const completedVariations = Object.values(allProgress).reduce((sum, p) => sum + p.completedVariations.length, 0);
  const totalMinutes = allCourses.reduce((sum, c) => sum + calculateCourseStats(c).totalMinutes, 0);

  return (
    <div className="space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
      {/* Back Button */}
      <BackButton fallback="/" />

      {/* Header */}
      <section className="text-center lg:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Courses
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
          Master chess through structured learning with spaced repetition
        </p>
      </section>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <div className="card p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>{allCourses.length}</div>
          <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>Courses</div>
        </div>
        <div className="card p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>{totalVariations}</div>
          <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>Variations</div>
        </div>
        <div className="card p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold" style={{ color: '#4ade80' }}>{completedVariations}</div>
          <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>Learned</div>
        </div>
        <div className="card p-3 sm:p-4 text-center">
          <div className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--accent-gold)' }}>{totalMinutes}</div>
          <div className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>Minutes</div>
        </div>
      </div>

      {/* Review All Button */}
      {totalDue > 0 && (
        <button
          onClick={handleReviewAll}
          className="w-full relative py-4 px-6 rounded-xl font-bold text-lg transition-all text-white"
          style={{ 
            background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
            boxShadow: '0 4px 16px rgba(5, 150, 105, 0.25)'
          }}
        >
          <span className="flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Review All Courses
          </span>
          <span 
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-3 py-1 rounded-full"
          >
            {totalDue} due
          </span>
        </button>
      )}

      {/* Course Cards */}
      <div className="space-y-4">
        {allCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            progress={allProgress[course.id]}
            onLearn={() => handleLearn(course.id)}
            onReview={() => handleReview(course.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {allCourses.length === 0 && (
        <div className="empty-state card p-12">
          <div className="empty-state-icon">📚</div>
          <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            No courses available yet
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Check back soon for new learning content!
          </p>
        </div>
      )}

      {/* Tips Section */}
      <div className="card p-4 sm:p-6">
        <h3 className="text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4" style={{ color: 'var(--text-muted)' }}>
          How It Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl shrink-0" style={{ background: 'rgba(168, 85, 247, 0.12)' }}>
              📖
            </div>
            <div className="min-w-0">
              <h4 className="font-medium mb-0.5 sm:mb-1 text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Learn</h4>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Study new variations with interactive boards
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl shrink-0" style={{ background: 'rgba(5, 150, 105, 0.12)' }}>
              🔄
            </div>
            <div className="min-w-0">
              <h4 className="font-medium mb-0.5 sm:mb-1 text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Review</h4>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Spaced repetition reinforces your memory
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-lg sm:text-xl shrink-0" style={{ background: 'rgba(212, 161, 59, 0.12)' }}>
              🏆
            </div>
            <div className="min-w-0">
              <h4 className="font-medium mb-0.5 sm:mb-1 text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>Master</h4>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Achieve mastery with consistent practice
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
