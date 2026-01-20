// ============================================
// COURSE LEARNING PAGE
// Enhanced with Claude AI coaching
// ============================================

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Chessboard } from 'react-chessboard';
import type { Square } from 'chess.js';
import { Chess } from 'chess.js';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { useBoardSize } from '@/hooks/useBoardSize';
import { useBackNavigation } from '@/components/BackButton';
import { playSmartMoveSound } from '@/lib/soundSystem';
import { logger } from '@/lib/logger';
import { 
  getCourseById, 
  type Course, 
  type CourseVariation,
  type CourseProgress,
  type AnnotatedCourseMove
} from '../data/courses';
import { explainMove, getQuickInsight, type MoveExplanation } from '@/lib/chessGenius';

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
    logger.error('Failed to save progress');
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
// AI COACH PANEL COMPONENT
// ============================================

interface AICoachPanelProps {
  fen: string;
  currentMove: AnnotatedCourseMove | undefined;
  variationTitle: string;
  onClose: () => void;
}

function AICoachPanel({ fen, currentMove, variationTitle, onClose }: AICoachPanelProps) {
  const [aiInsight, setAiInsight] = useState<MoveExplanation | null>(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);

  // Get AI insight for the current move
  const fetchAIInsight = useCallback(async () => {
    if (!currentMove) return;
    setLoading(true);
    try {
      const insight = await explainMove(fen, currentMove.move, {
        isCorrect: true,
        isPuzzle: false,
      });
      setAiInsight(insight);
    } catch (error) {
      logger.error('AI insight error:', error);
    } finally {
      setLoading(false);
    }
  }, [fen, currentMove]);

  // Ask a custom question
  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    try {
      const response = await getQuickInsight(fen, question);
      setAnswer(response);
    } catch (error) {
      setAnswer('Sorry, I couldn\'t process that question. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-x-4 bottom-4 max-w-lg mx-auto bg-slate-800 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 overflow-hidden z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <span className="text-xl">🧠</span>
          </div>
          <div>
            <div className="font-semibold text-white">AI Chess Coach</div>
            <div className="text-xs text-purple-300">Powered by Claude</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-80 overflow-y-auto">
        {/* Get Deep Analysis Button */}
        {!aiInsight && !loading && (
          <button
            onClick={fetchAIInsight}
            className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all"
          >
            ✨ Get Deep Analysis of {currentMove?.move || 'this position'}
          </button>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center p-8">
            <div className="flex items-center gap-3 text-purple-300">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Analyzing with AI...</span>
            </div>
          </div>
        )}

        {/* AI Insight Display */}
        {aiInsight && !loading && (
          <div className="space-y-4">
            {/* Why Good */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                <span>💡</span> Why This Works
              </div>
              <p className="text-slate-200">{aiInsight.whyGood}</p>
            </div>

            {/* Genius Insight - The "Aha" moment */}
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                <span>🎯</span> The Key Insight
              </div>
              <p className="text-slate-200">{aiInsight.geniusInsight}</p>
            </div>

            {/* What It Does */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                <span>⚡</span> Concrete Effects
              </div>
              <p className="text-slate-200">{aiInsight.whatItDoes}</p>
            </div>

            {/* Concept Connection */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                <span>🔗</span> Broader Principle
              </div>
              <p className="text-slate-200">{aiInsight.conceptConnection}</p>
            </div>

            {/* Alternatives */}
            {aiInsight.alternatives && aiInsight.alternatives.length > 0 && (
              <div className="bg-slate-700/50 rounded-xl p-4">
                <div className="text-sm text-slate-400 font-semibold mb-3">Why Not Other Moves?</div>
                <div className="space-y-2">
                  {aiInsight.alternatives.map((alt, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="font-mono text-slate-300 shrink-0">{alt.move}</span>
                      <span className="text-slate-400">— {alt.tradeoff}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Question Answer */}
        {answer && (
          <div className="mt-4 bg-slate-700/50 rounded-xl p-4">
            <div className="text-sm text-slate-400 mb-2">Answer:</div>
            <p className="text-slate-200">{answer}</p>
          </div>
        )}

        {/* Ask Question */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
            placeholder="Ask anything about this position..."
            className="flex-1 px-4 py-2 rounded-xl bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={askQuestion}
            disabled={loading || !question.trim()}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold disabled:opacity-50 hover:bg-purple-500 transition-colors"
          >
            Ask
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export default function CourseLearningPage() {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId?: string }>();
  const navigate = useNavigate();
  const goBack = useBackNavigation(`/courses/${courseId}`);
  const boardStyles = useBoardStyles();
  const boardContainerRef = useRef<HTMLDivElement>(null);
  const boardSize = useBoardSize(boardContainerRef, 480);

  // Course data
  const [course, setCourse] = useState<Course | null>(null);
  const [currentVariationIndex, setCurrentVariationIndex] = useState(0);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  
  // Game state
  const [game, setGame] = useState(new Chess());
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'info'; message: string } | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  
  // Progress
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [variationsCompleted, setVariationsCompleted] = useState(0);

  // AI Coach
  const [showAICoach, setShowAICoach] = useState(false);

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
        const isCapture = move.move.includes('x');
        const result = newGame.move(move.move);
        if (result) {
          // Preserve scroll position
          const scrollY = window.scrollY;
          
          playSmartMoveSound(newGame, result, { isCapture });
          setGame(newGame);
          setCurrentMoveIndex(prev => prev + 1);
          setShowHint(false);
          setFeedback(null);
          
          // Restore scroll position
          requestAnimationFrame(() => window.scrollTo(0, scrollY));
        }
      } catch {
        logger.error('Invalid move:', move.move);
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
      const isCapture = !!newGame.get(targetSquare as Square);
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
        // Preserve scroll position
        const scrollY = window.scrollY;
        
        playSmartMoveSound(newGame, move, { isCapture });
        setGame(newGame);
        setFeedback({ type: 'correct', message: currentMove.explanation });
        setSelectedSquare(null);
        
        // Restore scroll position
        requestAnimationFrame(() => window.scrollTo(0, scrollY));
        
        // Move to next move index
        const nextMoveIndex = currentMoveIndex + 1;
        
        if (nextMoveIndex < (currentVariation?.moves.length || 0)) {
          setCurrentMoveIndex(nextMoveIndex);
          setShowHint(false);
          
          // Check if next move is computer's turn (opponent response)
          // User plays even moves (0, 2, 4...), computer plays odd moves (1, 3, 5...)
          const isComputerNext = nextMoveIndex % 2 === 1;
          
          if (isComputerNext) {
            // Auto-play computer's response after a short delay
            setTimeout(() => {
              const computerMove = currentVariation?.moves[nextMoveIndex];
              if (computerMove) {
                const gameAfterUser = new Chess(newGame.fen());
                try {
                  const compResult = gameAfterUser.move(computerMove.move);
                  if (compResult) {
                    const compIsCapture = computerMove.move.includes('x');
                    playSmartMoveSound(gameAfterUser, compResult, { isCapture: compIsCapture });
                    setGame(gameAfterUser);
                    setFeedback({ type: 'info', message: computerMove.explanation || 'Your turn...' });
                    setCurrentMoveIndex(nextMoveIndex + 1);
                    
                    // Check if puzzle is complete
                    if (nextMoveIndex + 1 >= (currentVariation?.moves.length || 0)) {
                      setTimeout(() => {
                        markVariationComplete();
                        setFeedback({ type: 'correct', message: '✓ Puzzle Complete!' });
                      }, 500);
                    } else {
                      setTimeout(() => setFeedback(null), 1500);
                    }
                  }
                } catch {
                  logger.error('Computer move failed');
                }
              }
            }, 600);
          }
        } else {
          // This was the last move
          markVariationComplete();
          setFeedback({ type: 'correct', message: '✓ Puzzle Complete!' });
        }

        return true;
      } else {
        setFeedback({ type: 'incorrect', message: 'Try again! Hint: ' + currentMove.annotation });
        return false;
      }
    } catch {
      return false;
    }
  }, [currentMove, game, currentMoveIndex, currentVariation, markVariationComplete]);

  // Handle square click for click-to-move
  const handleSquareClick = useCallback((square: Square) => {
    if (!currentMove) return;
    
    const piece = game.get(square);
    const playerColor = currentVariation?.toMove === 'white' ? 'w' : 'b';
    
    // If no square is selected, select this one if it has our piece
    if (!selectedSquare) {
      if (piece && piece.color === playerColor) {
        setSelectedSquare(square);
      }
      return;
    }
    
    // If clicking the same square, deselect
    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }
    
    // If clicking another of our pieces, select that instead
    if (piece && piece.color === playerColor) {
      setSelectedSquare(square);
      return;
    }
    
    // Try to make the move
    const success = handleMove(selectedSquare, square);
    setSelectedSquare(null);
    
    // If move failed and it's a valid square with an opponent piece or empty, keep selected
    if (!success && piece && piece.color !== playerColor) {
      // Invalid move to opponent piece - could show feedback
    }
  }, [currentMove, game, selectedSquare, handleMove, currentVariation?.toMove]);

  // Clear selection when variation changes
  useEffect(() => {
    setSelectedSquare(null);
  }, [currentVariationIndex, currentMoveIndex]);

  // Next variation
  const nextVariation = useCallback(() => {
    if (currentVariationIndex < variations.length - 1) {
      setCurrentVariationIndex(prev => prev + 1);
    } else {
      // Course/chapter complete!
      setFeedback({ type: 'info', message: '🎉 All variations complete!' });
    }
  }, [currentVariationIndex, variations.length]);

  // Previous variation
  const prevVariation = useCallback(() => {
    if (currentVariationIndex > 0) {
      setCurrentVariationIndex(prev => prev - 1);
    }
  }, [currentVariationIndex]);

  // Go back one move
  const goBackMove = useCallback(() => {
    if (!currentVariation) return;
    
    if (currentMoveIndex > 0) {
      // Rebuild the position up to the previous move
      const newGame = new Chess(currentVariation.fen);
      for (let i = 0; i < currentMoveIndex - 1; i++) {
        try {
          newGame.move(currentVariation.moves[i].move);
        } catch {
          // Skip invalid moves
        }
      }
      setGame(newGame);
      setCurrentMoveIndex(prev => prev - 1);
      setFeedback(null);
      setShowHint(false);
    } else {
      // At the start of this variation, go to previous variation
      if (currentVariationIndex > 0) {
        prevVariation();
      }
    }
  }, [currentVariation, currentMoveIndex, currentVariationIndex, prevVariation]);


  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        advanceMove();
      } else if (e.key === 'ArrowLeft') {
        goBackMove();
      } else if (e.key === 'h') {
        setShowHint(true);
      } else if (e.key === 'n') {
        nextVariation();
      } else if (e.key === 'p' || e.key === 'b') {
        prevVariation();
      } else if (e.key === 'a') {
        setShowAICoach(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [advanceMove, goBackMove, nextVariation, prevVariation]);

  // Build arrows from current move (and hint if showing)
  const customArrows = useMemo((): [Square, Square, string][] => {
    const arrows: [Square, Square, string][] = [];
    
    // Add arrows from move annotations
    if (currentMove?.arrows) {
      currentMove.arrows.forEach(arrow => {
        arrows.push([
          arrow.from as Square,
          arrow.to as Square,
          getArrowColor(arrow.color)
        ]);
      });
    }
    
    // Add hint arrow if showing
    if (showHint && currentMove) {
      // Parse the move to get from/to squares
      const tempGame = new Chess(game.fen());
      try {
        const move = tempGame.move(currentMove.move);
        if (move) {
          arrows.push([
            move.from as Square,
            move.to as Square,
            'rgba(255, 200, 0, 0.8)' // Yellow/gold hint arrow
          ]);
        }
      } catch {
        // Move parsing failed, skip hint arrow
      }
    }
    
    return arrows;
  }, [currentMove, showHint, game]);

  // Build highlights including selected square and hint
  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    
    // Highlight from current move annotations
    if (currentMove?.highlights) {
      currentMove.highlights.forEach(sq => {
        styles[sq] = { backgroundColor: 'rgba(255, 200, 0, 0.4)' };
      });
    }
    
    // Highlight hint squares when showing
    if (showHint && currentMove) {
      const tempGame = new Chess(game.fen());
      try {
        const move = tempGame.move(currentMove.move);
        if (move) {
          // Highlight source square
          styles[move.from] = { 
            backgroundColor: 'rgba(255, 200, 0, 0.5)',
            boxShadow: 'inset 0 0 0 3px rgba(255, 200, 0, 0.8)'
          };
          // Highlight target square
          styles[move.to] = { 
            backgroundColor: 'rgba(255, 200, 0, 0.5)',
            boxShadow: 'inset 0 0 0 3px rgba(255, 200, 0, 0.8)'
          };
        }
      } catch {
        // Move parsing failed
      }
    }
    
    // Highlight selected square for click-to-move
    if (selectedSquare) {
      styles[selectedSquare] = { 
        backgroundColor: 'rgba(100, 200, 100, 0.6)',
        boxShadow: 'inset 0 0 0 3px rgba(100, 200, 100, 0.8)'
      };
      
      // Also highlight legal moves from selected square
      const moves = game.moves({ square: selectedSquare, verbose: true });
      moves.forEach(move => {
        if (!styles[move.to]) {
          styles[move.to] = {
            backgroundColor: 'rgba(100, 200, 100, 0.3)',
            borderRadius: '50%'
          };
        }
      });
    }
    
    return styles;
  }, [currentMove, selectedSquare, game, showHint]);

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
      <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={goBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Exit</span>
          </button>

          {/* Progress indicator */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-400">
              <span className="text-white font-semibold">{currentVariationIndex + 1}</span>
              <span> / {variations.length}</span>
            </div>
            <div className="w-16 sm:w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${((currentVariationIndex + 1) / variations.length) * 100}%` }}
              />
            </div>
          </div>

          {/* AI Coach Toggle */}
          <button 
            onClick={() => setShowAICoach(prev => !prev)}
            className={`p-2 rounded-lg transition-colors ${
              showAICoach 
                ? 'bg-purple-600 text-white' 
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
            title="Toggle AI Coach (A)"
          >
            <span className="text-xl">🧠</span>
          </button>
        </div>
      </div>

      {/* COACHING INFO - NOW AT TOP */}
      <div className="bg-slate-800/90 border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Variation Title & Concept */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
            {currentChapter && (
              <span className="text-xs text-purple-400 uppercase tracking-wider">
                Ch. {course.chapters.indexOf(currentChapter) + 1}
              </span>
            )}
            <h2 className="text-lg font-bold text-white">{currentVariation.title}</h2>
          </div>

          {/* Move Display - PROMINENT */}
          <AnimatePresence mode="wait">
            {currentMove && (
              <motion.div
                key={currentMoveIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                {/* Move Badge */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
                  <span className="text-2xl font-bold text-white font-mono">{currentMove.move}</span>
                  {currentMove.annotation && (
                    <span className={`text-xl font-bold ${
                      currentMove.annotation === '!' || currentMove.annotation === '!!' ? 'text-emerald-300' :
                      currentMove.annotation === '?' ? 'text-red-300' :
                      'text-amber-300'
                    }`}>
                      {currentMove.annotation}
                    </span>
                  )}
                </div>

                {/* Explanation */}
                <p className="text-slate-200 flex-1">{currentMove.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Key Takeaway - Compact */}
          <div className="mt-3 flex items-start gap-2 text-sm">
            <span className="text-emerald-400 shrink-0">💎</span>
            <span className="text-slate-300">{currentVariation.keyTakeaway}</span>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-3 px-4 py-2 rounded-lg ${
                  feedback.type === 'correct' ? 'bg-emerald-500/20 text-emerald-400' :
                  feedback.type === 'incorrect' ? 'bg-red-500/20 text-red-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}
              >
                {feedback.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-2 sm:px-4 py-3 sm:py-6 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(280px,480px)_320px] gap-4 lg:gap-6 w-full max-w-full overflow-hidden">
          {/* Board + Controls */}
          <div className="w-full max-w-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="board-container"
              ref={boardContainerRef}
            >
              <div className="board-wrapper">
                <Chessboard
                  position={game.fen()}
                  onPieceDrop={handleMove}
                  onSquareClick={handleSquareClick}
                  boardOrientation={currentVariation.toMove === 'white' ? 'white' : 'black'}
                customArrows={customArrows}
                customSquareStyles={customSquareStyles}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
              />
              </div>
            </motion.div>

            {/* Move Controls */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              {/* Previous Puzzle */}
              <button
                onClick={prevVariation}
                disabled={currentVariationIndex === 0}
                className={`p-2 sm:p-3 rounded-lg transition-colors ${
                  currentVariationIndex === 0
                    ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
                title="Previous Puzzle (P)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
                </svg>
              </button>
              {/* Back One Move */}
              <button
                onClick={goBackMove}
                disabled={currentMoveIndex === 0 && currentVariationIndex === 0}
                className={`p-2 sm:p-3 rounded-lg transition-colors ${
                  currentMoveIndex === 0 && currentVariationIndex === 0
                    ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
                title="Back One Move (←)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {/* Reset */}
              <button
                onClick={() => {
                  setGame(new Chess(currentVariation.fen));
                  setCurrentMoveIndex(0);
                  setFeedback(null);
                }}
                className="p-2 sm:p-3 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Reset Puzzle"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              {/* Hint */}
              <button
                onClick={() => setShowHint(!showHint)}
                className={`p-2 sm:p-3 rounded-lg transition-colors ${
                  showHint 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
                title="Show Hint (H)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </button>
              {/* Forward One Move */}
              <button
                onClick={advanceMove}
                className="p-2 sm:p-3 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                title="Next Move (→)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {/* Next Puzzle */}
              <button
                onClick={nextVariation}
                className="p-2 sm:p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                title="Next Puzzle (N)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Hint Display (if shown) */}
            <AnimatePresence>
              {showHint && currentMove && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-4 bg-amber-500/20 border border-amber-500/50 rounded-xl p-4 text-center"
                >
                  <span className="text-amber-200">The best move is <strong className="font-mono text-lg">{currentMove.move}</strong></span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Side Panel - Move List & Details (Desktop) */}
          <div className="hidden lg:block space-y-4">
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

            {/* Alternatives (if any) */}
            {currentMove?.alternatives && currentMove.alternatives.length > 0 && (
              <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50">
                <div className="text-xs text-slate-500 uppercase font-semibold mb-3">Alternatives</div>
                <div className="space-y-2">
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
              </div>
            )}

            {/* Variation Details */}
            <div className="bg-slate-800/70 rounded-xl p-4 border border-slate-700/50">
              <div className="text-xs text-slate-500 uppercase font-semibold mb-2">About This Line</div>
              <p className="text-sm text-slate-300">{currentVariation.concept}</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Coach Panel (Floating) */}
      <AnimatePresence>
        {showAICoach && (
          <AICoachPanel
            fen={game.fen()}
            currentMove={currentMove}
            variationTitle={currentVariation.title}
            onClose={() => setShowAICoach(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
