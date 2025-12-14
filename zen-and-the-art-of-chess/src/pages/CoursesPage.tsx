// ============================================
// COURSES PAGE
// Main courses listing with progress tracking
// ============================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { allCourses, calculateCourseStats, type Course, type CourseProgress } from '../data/courses';

// ============================================
// STORAGE HELPERS
// ============================================

function getAllProgress(): Record<string, CourseProgress> {
  try {
    const stored = localStorage.getItem('courseProgress');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function getCourseProgress(courseId: string): CourseProgress | undefined {
  const all = getAllProgress();
  return all[courseId];
}

function getDueForReview(): number {
  const all = getAllProgress();
  let due = 0;
  const now = Date.now();
  
  Object.values(all).forEach(progress => {
    if (progress.variationScores) {
      Object.values(progress.variationScores).forEach(score => {
        if (score.nextReview && score.nextReview <= now) {
          due++;
        }
      });
    }
  });
  
  return due;
}

// ============================================
// COURSE CARD
// ============================================

interface CourseCardProps {
  course: Course;
  progress: CourseProgress | undefined;
  onNavigate: (id: string) => void;
}

function CourseCard({ course, progress, onNavigate }: CourseCardProps) {
  const stats = calculateCourseStats(course);
  const completedCount = progress?.completedVariations?.length || 0;
  const percentComplete = stats.totalVariations > 0 
    ? Math.round((completedCount / stats.totalVariations) * 100)
    : 0;
  
  // Calculate due for review
  let dueForReview = 0;
  if (progress?.variationScores) {
    const now = Date.now();
    Object.values(progress.variationScores).forEach(score => {
      if (score.nextReview && score.nextReview <= now) {
        dueForReview++;
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-xl bg-gradient-to-br ${course.coverColor} shadow-lg cursor-pointer`}
      onClick={() => onNavigate(course.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{course.coverImage}</div>
        {dueForReview > 0 && (
          <span className="px-2 py-1 text-xs font-bold bg-yellow-500 text-black rounded-full">
            {dueForReview} due
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
      <p className="text-white/80 text-sm mb-4 line-clamp-2">{course.description}</p>
      
      <div className="flex items-center gap-4 text-white/70 text-sm mb-4">
        <span>{stats.totalChapters} chapters</span>
        <span>•</span>
        <span>{stats.totalVariations} puzzles</span>
        <span>•</span>
        <span>{stats.totalMinutes} min</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-black/20 rounded-full h-2 mb-2">
        <div 
          className="bg-white rounded-full h-2 transition-all"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
      <div className="text-white/80 text-xs">
        {completedCount} / {stats.totalVariations} completed ({percentComplete}%)
      </div>
      
      <div className="mt-4 flex gap-2">
        {completedCount > 0 ? (
          <button className="flex-1 py-2 px-4 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition">
            Continue
          </button>
        ) : (
          <button className="flex-1 py-2 px-4 bg-white text-gray-900 rounded-lg font-medium hover:bg-white/90 transition">
            Start Learning
          </button>
        )}
        {dueForReview > 0 && (
          <button className="py-2 px-4 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition">
            Review
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function CoursesPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<Record<string, CourseProgress>>({});
  const [totalDue, setTotalDue] = useState(0);

  useEffect(() => {
    setProgress(getAllProgress());
    setTotalDue(getDueForReview());
  }, []);

  const handleNavigate = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold">Courses</h1>
              <p className="text-gray-400">Master chess through structured learning</p>
            </div>
          </div>
          
          {totalDue > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-xl shadow-lg"
            >
              Review All ({totalDue} due)
            </motion.button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{allCourses.length}</div>
            <div className="text-gray-400 text-sm">Courses</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">
              {allCourses.reduce((sum, c) => sum + calculateCourseStats(c).totalVariations, 0)}
            </div>
            <div className="text-gray-400 text-sm">Puzzles</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">
              {allCourses.reduce((sum, c) => sum + calculateCourseStats(c).totalMinutes, 0)}
            </div>
            <div className="text-gray-400 text-sm">Minutes</div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CourseCard
                course={course}
                progress={progress[course.id]}
                onNavigate={handleNavigate}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty state if no courses */}
        {allCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-2">No Courses Yet</h2>
            <p className="text-gray-400">Check back soon for new courses!</p>
          </div>
        )}
      </div>
    </div>
  );
}
