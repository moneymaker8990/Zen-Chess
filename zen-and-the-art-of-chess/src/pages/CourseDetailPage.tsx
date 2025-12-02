// ============================================
// COURSE DETAIL PAGE
// Shows chapters and variations for a course
// ============================================

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { getCourseById, calculateCourseStats, type Course, type CourseChapter, type CourseProgress } from '../data/courses';

// ============================================
// STORAGE HELPERS
// ============================================

function loadCourseProgress(courseId: string): CourseProgress | undefined {
  try {
    const stored = localStorage.getItem('courseProgress');
    const allProgress = stored ? JSON.parse(stored) : {};
    return allProgress[courseId];
  } catch {
    return undefined;
  }
}

function saveCourseProgress(courseId: string, progress: CourseProgress) {
  try {
    const stored = localStorage.getItem('courseProgress');
    const allProgress = stored ? JSON.parse(stored) : {};
    allProgress[courseId] = progress;
    localStorage.setItem('courseProgress', JSON.stringify(allProgress));
  } catch {
    console.error('Failed to save progress');
  }
}

// ============================================
// CHAPTER CARD
// ============================================

interface ChapterCardProps {
  chapter: CourseChapter;
  index: number;
  progress: CourseProgress | undefined;
  onStart: () => void;
  expanded: boolean;
  onToggle: () => void;
}

function ChapterCard({ chapter, index, progress, onStart, expanded, onToggle }: ChapterCardProps) {
  const completedInChapter = chapter.variations.filter(
    v => progress?.completedVariations.includes(v.id)
  ).length;
  const progressPercent = chapter.variations.length > 0 
    ? (completedInChapter / chapter.variations.length) * 100 
    : 0;
  const isComplete = completedInChapter === chapter.variations.length && chapter.variations.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-slate-800/60 rounded-xl border border-slate-700/50 overflow-hidden"
    >
      {/* Chapter Header */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center gap-4 hover:bg-slate-700/30 transition-colors"
      >
        {/* Chapter Number */}
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shrink-0 ${
          isComplete 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-slate-700 text-slate-300'
        }`}>
          {isComplete ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            index + 1
          )}
        </div>

        {/* Chapter Info */}
        <div className="flex-1 text-left">
          <h3 className="font-semibold text-white">{chapter.title}</h3>
          {chapter.subtitle && (
            <p className="text-sm text-slate-400">{chapter.subtitle}</p>
          )}
        </div>

        {/* Progress */}
        <div className="text-right pr-2">
          <div className="text-sm font-medium text-slate-300">
            {completedInChapter}/{chapter.variations.length}
          </div>
          <div className="w-16 h-1 bg-slate-700 rounded-full mt-1">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Expand Arrow */}
        <svg 
          className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {/* Description */}
              <p className="text-sm text-slate-400 pl-14">
                {chapter.description}
              </p>

              {/* Key Lessons */}
              {chapter.keyLessons && chapter.keyLessons.length > 0 && (
                <div className="pl-14 space-y-1">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Key Lessons</h4>
                  <ul className="space-y-1">
                    {chapter.keyLessons.map((lesson, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-emerald-400 mt-1">•</span>
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Start Button */}
              <div className="pl-14 pt-2">
                <button
                  onClick={onStart}
                  className="px-6 py-2.5 rounded-lg font-semibold text-sm bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
                >
                  {completedInChapter === 0 ? 'Start Chapter' : 
                   completedInChapter < chapter.variations.length ? 'Continue' : 'Practice Again'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ============================================
// MAIN COURSE DETAIL PAGE
// ============================================

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [progress, setProgress] = useState<CourseProgress | undefined>();
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  useEffect(() => {
    if (courseId) {
      const foundCourse = getCourseById(courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        setProgress(loadCourseProgress(courseId));
        // Auto-expand first incomplete chapter
        if (foundCourse.chapters.length > 0) {
          setExpandedChapter(foundCourse.chapters[0].id);
        }
      }
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  const stats = calculateCourseStats(course);
  const totalCompleted = progress?.completedVariations.length || 0;
  const overallProgress = stats.totalVariations > 0 
    ? (totalCompleted / stats.totalVariations) * 100 
    : 0;

  const handleStartChapter = (chapterId: string) => {
    navigate(`/courses/${courseId}/chapter/${chapterId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${course.coverColor}22, transparent)` 
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Back Button */}
          <div className="mb-6">
            <BackButton fallback="/courses" label="Back to Courses" className="text-slate-400 hover:text-white" />
          </div>

          {/* Course Header */}
          <div className="flex gap-6">
            {/* Cover */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-32 h-40 rounded-xl flex items-center justify-center text-6xl shrink-0 shadow-2xl"
              style={{ backgroundColor: course.coverColor }}
            >
              {course.coverImage}
            </motion.div>

            {/* Info */}
            <div className="flex-1">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white mb-2"
              >
                {course.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 text-sm mb-4 line-clamp-2"
              >
                {course.description}
              </motion.p>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-6 text-sm"
              >
                <div>
                  <span className="text-slate-400">Chapters:</span>
                  <span className="text-white font-semibold ml-2">{stats.totalChapters}</span>
                </div>
                <div>
                  <span className="text-slate-400">Variations:</span>
                  <span className="text-white font-semibold ml-2">{stats.totalVariations}</span>
                </div>
                <div>
                  <span className="text-slate-400">Time:</span>
                  <span className="text-white font-semibold ml-2">{stats.totalMinutes} min</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Overall Progress</span>
              <span>{totalCompleted}/{stats.totalVariations} ({Math.round(overallProgress)}%)</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full"
                style={{ backgroundColor: course.coverColor }}
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ delay: 0.4 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/courses/${courseId}/learn`)}
            className="flex-1 py-3 px-6 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
          >
            Start Learning
          </button>
          <button
            onClick={() => navigate(`/courses/${courseId}/review`)}
            className="flex-1 py-3 px-6 rounded-xl font-semibold bg-slate-700 text-blue-400 border border-slate-600 hover:bg-slate-600 transition-colors"
          >
            Review
          </button>
        </div>
      </div>

      {/* Chapters */}
      <div className="max-w-4xl mx-auto px-4 py-4 space-y-3">
        <h2 className="text-lg font-semibold text-white mb-4">Chapters</h2>
        {course.chapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            index={index}
            progress={progress}
            onStart={() => handleStartChapter(chapter.id)}
            expanded={expandedChapter === chapter.id}
            onToggle={() => setExpandedChapter(
              expandedChapter === chapter.id ? null : chapter.id
            )}
          />
        ))}
      </div>

      {/* Tags */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2">
          {course.tags.map(tag => (
            <span 
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

