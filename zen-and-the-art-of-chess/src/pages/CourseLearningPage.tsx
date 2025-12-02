// ============================================
// COURSE LEARNING PAGE
// MoveTrainer for learning course variations
// ============================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { useBackNavigation } from '@/components/BackButton';
import { 
  getCourseById, 
  type Course, 
  type CourseVariation,
  type CourseProgress,
  type AnnotatedCourseMove
} from '../data/courses';

// ============================================
// STORAGE
// ============================================

function loadCourseProgress(courseId: string): CourseProgress {
  try {
    const stored = localStorage.getItem('courseProgress');
    const allProgress = stored ? JSON.parse(stored) : {};
    return allProgress[courseId] || {
      courseId,
      completedVariations: [],
      variationScores: {},
      lastAccessed: Date.now(),
      totalTimeSpent: 0,
      currentChapter: '',
      currentVariation: '',
    };
  } catch {
    return {
      courseId,
      completedVariations: [],
      variationScores: {},
      lastAccessed: Date.now(),
      totalTimeSpent: 0,
      currentChapter: '',
      currentVariation: '',
    };
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
// ARROW/HIGHLIGHT CONVERSION
// ============================================

function getArrowColor(color?: string) {
  const colors: Record<string, string> = {
    green: 'rgba(0, 200, 100, 0.7)',
    red: 'rgba(255, 50, 50, 0.7)',
    yellow: 'rgba(255, 200, 0, 0.7)',
    blue: 'rgba(50, 150, 255, 0.7)',
  };
  return colors[color || 'green'] || colors.green;
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function CourseLearningPage() {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId?: string }>();
  const navigate = useNavigate();
  const goBack = useBackNavigation(`/courses/${courseId}`);
  const boardStyles = useBoardStyles();

  // Course data
  const [course, setCourse] = useState<Course | null>(null);
  const [currentVariationIndex, setCurrentVariationIndex] = useState(0);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  
  // Game state
  const [game, setGame] = useState(new Chess());
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'info'; message: string } | null>(null);
  
  // Progress
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [variationsCompleted, setVariationsCompleted] = useState(0);

  // Get all variations (optionally filtered by chapter)
  const variations = useMemo(() => {
    if (!course) return [];
    if (chapterId) {
      const chapter = course.chapters.find(c => c.id === chapterId);
      return chapter?.variations || [];
    }
    // Return all variations from all chapters
    return course.chapters.flatMap(c => c.variations);
  }, [course, chapterId]);

  const currentVariation = variations[currentVariationIndex];
  const currentMove = currentVariation?.moves[currentMoveIndex];
  const isLastMove = currentMoveIndex >= (currentVariation?.moves.length || 0) - 1;

  // Initialize
  useEffect(() => {
    if (courseId) {
      const foundCourse = getCourseById(courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        setProgress(loadCourseProgress(courseId));
      }
    }
  }, [courseId]);

  // Setup position when variation changes
  useEffect(() => {
    if (currentVariation) {
      const newGame = new Chess(currentVariation.fen);
      setGame(newGame);
      setCurrentMoveIndex(0);
      setShowHint(false);
      setFeedback(null);
    }
  }, [currentVariation]);

  // Mark variation as complete
  const markVariationComplete = useCallback(() => {
    if (!progress || !currentVariation || !courseId) return;

    const newProgress = { ...progress };
    if (!newProgress.completedVariations.includes(currentVariation.id)) {
      newProgress.completedVariations = [...newProgress.completedVariations, currentVariation.id];
    }
    newProgress.variationScores[currentVariation.id] = {
      lastScore: 1,
      attempts: (newProgress.variationScores[currentVariation.id]?.attempts || 0) + 1,
      nextReview: Date.now() + 24 * 60 * 60 * 1000, // 1 day
      srsLevel: 1,
    };
    newProgress.lastAccessed = Date.now();

    setProgress(newProgress);
    saveCourseProgress(courseId, newProgress);
    setVariationsCompleted(prev => prev + 1);
  }, [progress, currentVariation, courseId]);

  // Handle advancing to next move
  const advanceMove = useCallback(() => {
    if (!currentVariation) return;

    if (currentMoveIndex < currentVariation.moves.length - 1) {
      // Make the move on the board
      const move = currentVariation.moves[currentMoveIndex];
      const newGame = new Chess(game.fen());
      try {
        newGame.move(move.move);
        setGame(newGame);
        setCurrentMoveIndex(prev => prev + 1);
        setShowHint(false);
        setFeedback(null);
      } catch {
        console.error('Invalid move:', move.move);
      }
    } else {
      // Variation complete!
      markVariationComplete();
      setFeedback({ type: 'correct', message: '✓ Variation Complete!' });
    }
  }, [currentVariation, currentMoveIndex, game, markVariationComplete]);

  // Handle user move attempt
  const handleMove = useCallback((sourceSquare: string, targetSquare: string) => {
    if (!currentMove) return false;

    const newGame = new Chess(game.fen());
    try {
      const move = newGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (!move) return false;

      // Check if it matches the expected move
      const expectedMove = currentMove.move;
      const moveMatches = move.san === expectedMove || 
                          move.san.replace(/[+#]/, '') === expectedMove.replace(/[+#]/, '');

      if (moveMatches) {
        setGame(newGame);
        setFeedback({ type: 'correct', message: currentMove.explanation });
        
        // Auto-advance after delay
        setTimeout(() => {
          if (currentMoveIndex < (currentVariation?.moves.length || 0) - 1) {
            setCurrentMoveIndex(prev => prev + 1);
            setFeedback(null);
            setShowHint(false);
          } else {
            markVariationComplete();
          }
        }, 1500);

        return true;
      } else {
        setFeedback({ type: 'incorrect', message: 'Try again! Hint: ' + currentMove.annotation });
        return false;
      }
    } catch {
      return false;
    }
  }, [currentMove, game, currentMoveIndex, currentVariation, markVariationComplete]);

  // Next variation
  const nextVariation = useCallback(() => {
    if (currentVariationIndex < variations.length - 1) {
      setCurrentVariationIndex(prev => prev + 1);
    } else {
      // Course/chapter complete!
      setFeedback({ type: 'info', message: '🎉 All variations complete!' });
    }
  }, [currentVariationIndex, variations.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        advanceMove();
      } else if (e.key === 'h') {
        setShowHint(true);
      } else if (e.key === 'n') {
        nextVariation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [advanceMove, nextVariation]);

  // Build arrows from current move
  const customArrows = useMemo(() => {
    if (!currentMove?.arrows) return [];
    return currentMove.arrows.map(arrow => [
      arrow.from,
      arrow.to,
      getArrowColor(arrow.color)
    ] as [string, string, string]);
  }, [currentMove]);

  // Build highlights
  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    if (currentMove?.highlights) {
      currentMove.highlights.forEach(sq => {
        styles[sq] = { backgroundColor: 'rgba(255, 200, 0, 0.4)' };
      });
    }
    return styles;
  }, [currentMove]);

  if (!course || !currentVariation) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  const currentChapter = course.chapters.find(c => 
    c.variations.some(v => v.id === currentVariation.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={goBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Exit</span>
          </button>

          {/* Progress indicator */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400">
              <span className="text-white font-semibold">{currentVariationIndex + 1}</span>
              <span> / {variations.length}</span>
            </div>
            <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${((currentVariationIndex + 1) / variations.length) * 100}%` }}
              />
            </div>
          </div>

          <button className="p-2 text-slate-400 hover:text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Board */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-xl overflow-hidden shadow-2xl"
            >
              <Chessboard
                position={game.fen()}
                onPieceDrop={handleMove}
                boardOrientation={currentVariation.toMove === 'white' ? 'white' : 'black'}
                customArrows={customArrows}
                customSquareStyles={customSquareStyles}
                customBoardStyle={{
                  borderRadius: '12px',
                }}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
              />
            </motion.div>

            {/* Move Controls */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => {
                  setGame(new Chess(currentVariation.fen));
                  setCurrentMoveIndex(0);
                  setFeedback(null);
                }}
                className="p-3 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Reset"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={() => setShowHint(!showHint)}
                className={`p-3 rounded-lg transition-colors ${
                  showHint 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
                title="Show Hint (H)"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </button>
              <button
                onClick={advanceMove}
                className="p-3 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Next Move (→)"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={nextVariation}
                className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                title="Next Variation (N)"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-4">
            {/* Chapter/Variation Info */}
            <div className="bg-slate-800/70 rounded-xl p-5 border border-slate-700/50">
              {currentChapter && (
                <div className="text-sm text-slate-400 mb-2">
                  Chapter {course.chapters.indexOf(currentChapter) + 1}: {currentChapter.title}
                </div>
              )}
              <h2 className="text-xl font-bold text-white mb-2">{currentVariation.title}</h2>
              <p className="text-slate-300 text-sm mb-4">{currentVariation.concept}</p>
              
              {/* Key Takeaway */}
              <div className="bg-slate-700/50 rounded-lg p-3 border-l-4 border-emerald-500">
                <div className="text-xs text-emerald-400 font-semibold uppercase mb-1">Key Takeaway</div>
                <p className="text-sm text-slate-200">{currentVariation.keyTakeaway}</p>
              </div>
            </div>

            {/* Current Move Info */}
            <AnimatePresence mode="wait">
              {currentMove && (
                <motion.div
                  key={currentMoveIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-slate-800/70 rounded-xl p-5 border border-slate-700/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-white font-mono">{currentMove.move}</span>
                    {currentMove.annotation && (
                      <span className={`text-lg font-bold ${
                        currentMove.annotation === '!' ? 'text-emerald-400' :
                        currentMove.annotation === '!!' ? 'text-emerald-300' :
                        currentMove.annotation === '?' ? 'text-red-400' :
                        currentMove.annotation === '?!' ? 'text-amber-400' :
                        'text-slate-400'
                      }`}>
                        {currentMove.annotation}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300">{currentMove.explanation}</p>

                  {/* Alternatives */}
                  {currentMove.alternatives && currentMove.alternatives.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="text-xs text-slate-500 uppercase font-semibold">Alternatives</div>
                      {currentMove.alternatives.map((alt, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="font-mono text-slate-400">{alt.move}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            alt.evaluation === 'best' ? 'bg-emerald-500/20 text-emerald-400' :
                            alt.evaluation === 'good' ? 'bg-blue-500/20 text-blue-400' :
                            alt.evaluation === 'equal' ? 'bg-slate-500/20 text-slate-400' :
                            alt.evaluation === 'dubious' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {alt.evaluation}
                          </span>
                          <span className="text-slate-500">{alt.explanation}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hint */}
            <AnimatePresence>
              {showHint && currentMove && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-amber-500/20 border border-amber-500/50 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Hint
                  </div>
                  <p className="text-amber-200">The best move is <strong className="font-mono">{currentMove.move}</strong></p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`rounded-xl p-4 ${
                    feedback.type === 'correct' ? 'bg-emerald-500/20 border border-emerald-500/50' :
                    feedback.type === 'incorrect' ? 'bg-red-500/20 border border-red-500/50' :
                    'bg-blue-500/20 border border-blue-500/50'
                  }`}
                >
                  <p className={`font-medium ${
                    feedback.type === 'correct' ? 'text-emerald-400' :
                    feedback.type === 'incorrect' ? 'text-red-400' :
                    'text-blue-400'
                  }`}>
                    {feedback.message}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Move List */}
            <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50">
              <div className="text-xs text-slate-500 uppercase font-semibold mb-3">Move Sequence</div>
              <div className="flex flex-wrap gap-2">
                {currentVariation.moves.map((move, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      // Navigate to that move
                      const newGame = new Chess(currentVariation.fen);
                      for (let j = 0; j < i; j++) {
                        newGame.move(currentVariation.moves[j].move);
                      }
                      setGame(newGame);
                      setCurrentMoveIndex(i);
                    }}
                    className={`px-2 py-1 rounded text-sm font-mono transition-colors ${
                      i === currentMoveIndex
                        ? 'bg-blue-600 text-white'
                        : i < currentMoveIndex
                        ? 'bg-emerald-600/30 text-emerald-400'
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {move.move}
                    {move.annotation && <span className="ml-0.5 text-xs">{move.annotation}</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

