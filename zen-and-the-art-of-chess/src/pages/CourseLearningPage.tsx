// ============================================
// COURSE LEARNING PAGE
// Enhanced with Claude AI coaching
// ============================================

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Chessboard } from 'react-chessboard';
import type { Square } from 'chess.js';
import { Chess } from 'chess.js';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { useBoardSize } from '@/hooks/useBoardSize';
import { useBackNavigation } from '@/components/BackButton';
import { playSmartMoveSound } from '@/lib/soundSystem';
import { 
  getCourseById, 
  type Course, 
  type CourseVariation,
  type CourseProgress,
  type AnnotatedCourseMove
} from '../data/courses';
import { explainMove, getQuickInsight, type MoveExplanation } from '@/lib/chessGenius';

// ============================================
// MOVE NORMALIZATION
// ============================================

// Normalize castling notation: 0-0 -> O-O, 0-0-0 -> O-O-O
// Also handles other common notation variations
function normalizeMove(move: string): string {
  return move
    .replace(/0-0-0/g, 'O-O-O')  // Queenside castling with zeros
    .replace(/0-0/g, 'O-O')      // Kingside castling with zeros
    .trim();
}

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
      console.error('AI insight error:', error);
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
  const boardSize = useBoardSize(480, 32);

  // Course data
  const [course, setCourse] = useState<Course | null>(null);
  const [currentVariationIndex, setCurrentVariationIndex] = useState(0);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  
  // Game state
  const [game, setGame] = useState(new Chess());
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'info'; message: string } | null>(null);
  
  // Click-to-move state
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [moveOptions, setMoveOptions] = useState<Record<string, React.CSSProperties>>({});
  
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
  
  // Determine which color the user is playing (based on first move's turn)
  const userColor = currentVariation?.toMove || 'white';

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

  // Check if it's the opponent's turn to move
  const isOpponentTurn = useCallback((gameState: Chess): boolean => {
    const turn = gameState.turn(); // 'w' or 'b'
    const isUserWhite = userColor === 'white';
    return (turn === 'w' && !isUserWhite) || (turn === 'b' && isUserWhite);
  }, [userColor]);

  // Auto-play opponent moves (with chaining for multiple opponent moves in a row)
  const playOpponentMove = useCallback((gameState: Chess, moveIndex: number) => {
    if (!currentVariation || moveIndex >= currentVariation.moves.length) {
      // Variation complete or no more moves
      return;
    }
    
    const move = currentVariation.moves[moveIndex];
    const newGame = new Chess(gameState.fen());
    const normalizedMove = normalizeMove(move.move);
    
    try {
      const isCapture = normalizedMove.includes('x');
      const result = newGame.move(normalizedMove);
      
      if (result) {
        setTimeout(() => {
          playSmartMoveSound(newGame, result, { isCapture });
          setGame(newGame);
          
          const nextIndex = moveIndex + 1;
          setCurrentMoveIndex(nextIndex);
          setFeedback({ type: 'info', message: `Opponent plays ${normalizedMove}` });
          
          // Check if variation is complete
          if (nextIndex >= currentVariation.moves.length) {
            markVariationComplete();
            setTimeout(() => {
              setFeedback({ type: 'correct', message: '🎉 Variation Complete!' });
            }, 500);
            return;
          }
          
          // Check if the NEXT move is also an opponent's move (check whose turn it is now)
          const isNextMoveOpponent = isOpponentTurn(newGame);
          
          if (isNextMoveOpponent) {
            // Chain to the next opponent move after a brief delay
            setTimeout(() => {
              playOpponentMove(newGame, nextIndex);
            }, 600);
          } else {
            // It's now the user's turn - clear feedback and let them play
            setTimeout(() => {
              setFeedback(null);
              setShowHint(false);
            }, 1000);
          }
        }, 500);
      } else {
        // Move parsing returned null - try to recover by advancing
        console.error('Opponent move returned null:', move.move);
        setCurrentMoveIndex(moveIndex + 1);
        setFeedback({ type: 'info', message: 'Advancing to next move...' });
      }
    } catch (e) {
      // Move failed - advance anyway to prevent getting stuck
      console.error('Invalid opponent move:', move.move, e);
      setCurrentMoveIndex(moveIndex + 1);
      setFeedback({ type: 'info', message: 'Skipped invalid move, continuing...' });
    }
  }, [currentVariation, isOpponentTurn, markVariationComplete]);

  // Setup position when variation changes
  useEffect(() => {
    if (currentVariation) {
      const newGame = new Chess(currentVariation.fen);
      setGame(newGame);
      setCurrentMoveIndex(0);
      setShowHint(false);
      setFeedback(null);
      
      // Check if first move is opponent's turn - auto-play it (and chain if needed)
      const turn = newGame.turn();
      const isUserWhite = currentVariation.toMove === 'white';
      const isFirstMoveOpponents = (turn === 'w' && !isUserWhite) || (turn === 'b' && isUserWhite);
      
      if (isFirstMoveOpponents && currentVariation.moves.length > 0) {
        // Auto-play opponent moves starting from index 0 (will chain if multiple)
        setTimeout(() => {
          playOpponentMove(newGame, 0);
        }, 600);
      }
    }
  }, [currentVariation, playOpponentMove]);

  // Handle advancing to next move - plays through ALL moves including opponent's
  const advanceMove = useCallback(() => {
    if (!currentVariation) return;

    if (currentMoveIndex < currentVariation.moves.length) {
      // Make the current move on the board
      const move = currentVariation.moves[currentMoveIndex];
      const normalizedMove = normalizeMove(move.move);
      const newGame = new Chess(game.fen());
      try {
        const isCapture = normalizedMove.includes('x');
        const result = newGame.move(normalizedMove);
        if (result) {
          // Preserve scroll position
          const scrollY = window.scrollY;
          
          playSmartMoveSound(newGame, result, { isCapture });
          setGame(newGame);
          const nextIndex = currentMoveIndex + 1;
          setCurrentMoveIndex(nextIndex);
          setShowHint(false);
          setSelectedSquare(null);
          setMoveOptions({});
          
          // Check if variation is complete
          if (nextIndex >= currentVariation.moves.length) {
            markVariationComplete();
            setFeedback({ type: 'correct', message: '✓ Variation Complete!' });
          } else {
            setFeedback(null);
          }
          
          // Restore scroll position
          requestAnimationFrame(() => window.scrollTo(0, scrollY));
        }
      } catch (e) {
        console.error('Invalid move:', move.move, e);
      }
    } else {
      // Already at the end - variation complete!
      markVariationComplete();
      setFeedback({ type: 'correct', message: '✓ Variation Complete!' });
    }
  }, [currentVariation, currentMoveIndex, game, markVariationComplete]);

  // Go back to previous move
  const goToPreviousMove = useCallback(() => {
    if (!currentVariation || currentMoveIndex <= 0) return;
    
    // Rebuild the position up to the previous move
    const targetIndex = currentMoveIndex - 1;
    const newGame = new Chess(currentVariation.fen);
    
    for (let i = 0; i < targetIndex; i++) {
      try {
        newGame.move(normalizeMove(currentVariation.moves[i].move));
      } catch {
        console.error('Failed to replay move:', currentVariation.moves[i].move);
        break;
      }
    }
    
    setGame(newGame);
    setCurrentMoveIndex(targetIndex);
    setShowHint(false);
    setFeedback(null);
    setSelectedSquare(null);
    setMoveOptions({});
  }, [currentVariation, currentMoveIndex]);

  // Go to first move (reset to starting position)
  const goToFirstMove = useCallback(() => {
    if (!currentVariation) return;
    setGame(new Chess(currentVariation.fen));
    setCurrentMoveIndex(0);
    setShowHint(false);
    setFeedback(null);
    setSelectedSquare(null);
    setMoveOptions({});
  }, [currentVariation]);

  // Go to last move
  const goToLastMove = useCallback(() => {
    if (!currentVariation) return;
    
    const newGame = new Chess(currentVariation.fen);
    for (const move of currentVariation.moves) {
      try {
        newGame.move(normalizeMove(move.move));
      } catch {
        break;
      }
    }
    
    setGame(newGame);
    setCurrentMoveIndex(currentVariation.moves.length);
    markVariationComplete();
    setFeedback({ type: 'correct', message: '✓ Variation Complete!' });
    setSelectedSquare(null);
    setMoveOptions({});
  }, [currentVariation, markVariationComplete]);

  // Get legal moves for a square (for click-to-move highlighting)
  const getMoveOptions = useCallback((square: Square) => {
    const moves = game.moves({ square, verbose: true });
    if (moves.length === 0) {
      setMoveOptions({});
      return false;
    }
    
    const newSquares: Record<string, React.CSSProperties> = {};
    moves.forEach((move) => {
      const isCapture = move.captured;
      newSquares[move.to] = {
        background: isCapture
          ? 'radial-gradient(circle, rgba(255,0,0,0.4) 85%, transparent 85%)'
          : 'radial-gradient(circle, rgba(0,0,0,0.2) 25%, transparent 25%)',
        borderRadius: '50%',
      };
    });
    newSquares[square] = { backgroundColor: 'rgba(129, 182, 76, 0.4)' };
    setMoveOptions(newSquares);
    return true;
  }, [game]);

  // Handle user move attempt (drag-drop or click-to-move)
  const handleMove = useCallback((sourceSquare: string, targetSquare: string): boolean => {
    if (!currentVariation) return false;
    
    // Allow moves even if we're past the expected move index (exploration mode)
    const newGame = new Chess(game.fen());
    try {
      const isCapture = !!newGame.get(targetSquare as Square);
      const move = newGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (!move) return false;
      
      // Clear selection
      setSelectedSquare(null);
      setMoveOptions({});

      // Check if we're in learning mode (have an expected move)
      if (currentMove && currentMoveIndex < currentVariation.moves.length) {
        // Check if it matches the expected move (normalize notation for comparison)
        const expectedMove = normalizeMove(currentMove.move); // Normalize castling first
        const normalizeSan = (m: string) => m.replace(/[+#x]/g, '').replace(/=.*$/, '');
        const moveMatches = move.san === expectedMove || 
                            normalizeSan(move.san) === normalizeSan(expectedMove);

        if (moveMatches) {
          // Preserve scroll position
          const scrollY = window.scrollY;
          
          playSmartMoveSound(newGame, move, { isCapture });
          setGame(newGame);
          setFeedback({ type: 'correct', message: '✓ Correct!' });
          
          // Restore scroll position
          requestAnimationFrame(() => window.scrollTo(0, scrollY));
          
          const nextMoveIndex = currentMoveIndex + 1;
          
          // Check if variation is complete
          if (nextMoveIndex >= currentVariation.moves.length) {
            setTimeout(() => {
              markVariationComplete();
              setCurrentMoveIndex(nextMoveIndex);
              setFeedback({ type: 'correct', message: '🎉 Variation Complete!' });
            }, 800);
            return true;
          }
          
          // Check if next move is opponent's turn - if so, auto-play it
          setTimeout(() => {
            if (isOpponentTurn(newGame)) {
              // Auto-play opponent's move
              playOpponentMove(newGame, nextMoveIndex);
            } else {
              // It's still user's turn, just advance the index
              setCurrentMoveIndex(nextMoveIndex);
              setFeedback(null);
              setShowHint(false);
            }
          }, 800);

          return true;
        } else {
          // Wrong move - show clear feedback with the expected move
          const hint = currentMove.explanation || currentMove.annotation || '';
          setFeedback({ 
            type: 'incorrect', 
            message: `Not quite! The expected move is ${expectedMove}. ${hint ? '(' + hint + ')' : ''}`
          });
          return false;
        }
      } else {
        // No expected move - just allow the move (exploration mode)
        playSmartMoveSound(newGame, move, { isCapture });
        setGame(newGame);
        return true;
      }
    } catch {
      return false;
    }
  }, [currentMove, currentVariation, game, currentMoveIndex, markVariationComplete, isOpponentTurn, playOpponentMove]);

  // Handle square click (for click-to-move)
  const onSquareClick = useCallback((square: Square) => {
    // If no square selected, try to select this one
    if (!selectedSquare) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        getMoveOptions(square);
      }
      return;
    }
    
    // If clicking the same square, deselect
    if (selectedSquare === square) {
      setSelectedSquare(null);
      setMoveOptions({});
      return;
    }
    
    // Try to make the move
    const moveResult = handleMove(selectedSquare, square);
    
    // If move failed, try selecting the new square instead
    if (!moveResult) {
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
        getMoveOptions(square);
      } else {
        setSelectedSquare(null);
        setMoveOptions({});
      }
    } else {
      setSelectedSquare(null);
      setMoveOptions({});
    }
  }, [selectedSquare, game, getMoveOptions, handleMove]);

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
      } else if (e.key === 'ArrowLeft') {
        goToPreviousMove();
      } else if (e.key === 'ArrowUp' || e.key === 'Home') {
        goToFirstMove();
      } else if (e.key === 'ArrowDown' || e.key === 'End') {
        goToLastMove();
      } else if (e.key === 'h') {
        setShowHint(true);
      } else if (e.key === 'n') {
        nextVariation();
      } else if (e.key === 'a') {
        setShowAICoach(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [advanceMove, goToPreviousMove, goToFirstMove, goToLastMove, nextVariation]);

  // Build arrows from current move
  const customArrows = useMemo((): [Square, Square, string][] => {
    if (!currentMove?.arrows) return [];
    return currentMove.arrows.map(arrow => [
      arrow.from as Square,
      arrow.to as Square,
      getArrowColor(arrow.color)
    ]);
  }, [currentMove]);

  // Build highlights - merge move highlights with click-to-move options
  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    
    // Add move hints/highlights from course data
    if (currentMove?.highlights) {
      currentMove.highlights.forEach(sq => {
        styles[sq] = { backgroundColor: 'rgba(255, 200, 0, 0.4)' };
      });
    }
    
    // Merge with click-to-move options
    Object.entries(moveOptions).forEach(([sq, style]) => {
      styles[sq] = { ...styles[sq], ...style };
    });
    
    // Highlight selected square
    if (selectedSquare) {
      styles[selectedSquare] = { 
        ...styles[selectedSquare], 
        backgroundColor: 'rgba(129, 182, 76, 0.6)' 
      };
    }
    
    return styles;
  }, [currentMove, moveOptions, selectedSquare]);

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
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
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
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(280px,480px)_320px] gap-4 lg:gap-6 w-full max-w-full">
          {/* Board + Controls */}
          <div className="w-full max-w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center shadow-2xl"
            >
              <div style={{ width: boardSize, maxWidth: '100%' }}>
              <Chessboard
                position={game.fen()}
                onPieceDrop={handleMove}
                onSquareClick={onSquareClick}
                boardOrientation={currentVariation.toMove === 'white' ? 'white' : 'black'}
                boardWidth={boardSize}
                customArrows={customArrows}
                customSquareStyles={customSquareStyles}
                customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                customLightSquareStyle={boardStyles.customLightSquareStyle}
                arePiecesDraggable={true}
              />
              </div>
            </motion.div>

            {/* Move Controls - Full navigation */}
            <div className="flex justify-center gap-1 sm:gap-1.5 mt-3 sm:mt-4">
              {/* First Move */}
              <button
                onClick={goToFirstMove}
                disabled={currentMoveIndex === 0}
                className="p-2 sm:p-3 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="First Move (Home)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Previous Move */}
              <button
                onClick={goToPreviousMove}
                disabled={currentMoveIndex === 0}
                className="p-2 sm:p-3 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Previous Move (←)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Next Move */}
              <button
                onClick={advanceMove}
                disabled={currentMoveIndex >= (currentVariation?.moves.length || 0)}
                className="p-2 sm:p-3 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Next Move (→)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Last Move */}
              <button
                onClick={goToLastMove}
                disabled={currentMoveIndex >= (currentVariation?.moves.length || 0)}
                className="p-2 sm:p-3 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title="Last Move (End)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Separator */}
              <div className="w-px bg-slate-600 mx-1 sm:mx-2" />
              
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
              
              {/* Next Variation */}
              <button
                onClick={nextVariation}
                className="p-2 sm:p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                title="Next Variation (N)"
              >
                <span className="text-xs sm:text-sm font-semibold">Next</span>
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
                        try {
                          newGame.move(normalizeMove(currentVariation.moves[j].move));
                        } catch { break; }
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

      {/* Mobile: Floating AI Coach Button */}
      {!showAICoach && (
        <button
          onClick={() => setShowAICoach(true)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-500/30 flex items-center justify-center z-40"
          title="AI Coach"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </button>
      )}
    </div>
  );
}
