// ============================================
// PUZZLE GENIUS PANEL
// AI-powered deep insights after solving puzzles
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPuzzleGeniusInsight, getQuickInsight, type PuzzleGeniusInsight } from '@/lib/chessGenius';

interface PuzzleGeniusPanelProps {
  fen: string;
  solution: string[];
  themes: string[];
  userSolved: boolean;
  timeTaken: number;
  puzzleDifficulty: number;
  onClose: () => void;
  onNextPuzzle: () => void;
}

export function PuzzleGeniusPanel({
  fen,
  solution,
  themes,
  userSolved,
  timeTaken,
  puzzleDifficulty,
  onClose,
  onNextPuzzle,
}: PuzzleGeniusPanelProps) {
  const [insight, setInsight] = useState<PuzzleGeniusInsight | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [question, setQuestion] = useState('');
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [askingQuestion, setAskingQuestion] = useState(false);

  // Fetch genius insight on mount
  useEffect(() => {
    async function fetchInsight() {
      setLoading(true);
      setError(null);
      try {
        const result = await getPuzzleGeniusInsight(
          fen,
          solution,
          themes,
          userSolved,
          timeTaken
        );
        setInsight(result);
      } catch (err) {
        console.error('Genius insight error:', err);
        setError('Could not load AI analysis');
      } finally {
        setLoading(false);
      }
    }
    fetchInsight();
  }, [fen, solution, themes, userSolved, timeTaken]);

  // Ask a custom question
  const askQuestion = useCallback(async () => {
    if (!question.trim()) return;
    setAskingQuestion(true);
    setCustomAnswer(null);
    try {
      const answer = await getQuickInsight(fen, question);
      setCustomAnswer(answer);
    } catch (err) {
      setCustomAnswer('Sorry, I couldn\'t process that question.');
    } finally {
      setAskingQuestion(false);
    }
  }, [fen, question]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-lg max-h-[85vh] overflow-hidden rounded-2xl bg-slate-800 border border-purple-500/30 shadow-2xl"
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-purple-600/20 to-emerald-600/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center">
                <span className="text-2xl">{userSolved ? '🧠' : '📚'}</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  {userSolved ? 'Brilliant!' : 'Learning Moment'}
                </h3>
                <p className="text-sm text-purple-300">
                  {userSolved 
                    ? `Solved in ${timeTaken}s` 
                    : 'Let\'s understand this pattern'
                  }
                </p>
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
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 180px)' }}>
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4" />
              <p className="text-slate-400">Analyzing with AI...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-400 mb-4">{error}</p>
              <button onClick={onNextPuzzle} className="btn-primary">
                Next Puzzle →
              </button>
            </div>
          )}

          {insight && !loading && (
            <div className="space-y-4">
              {/* Theme */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium">
                  {insight.theme}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-400 text-sm">
                  Difficulty {puzzleDifficulty}/5
                </span>
              </div>

              {/* Why This Works - Always visible */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <span>💡</span> Why This Works
                </div>
                <p className="text-slate-200">{insight.whyThisWorks}</p>
              </div>

              {/* Pattern to Remember */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 font-semibold mb-2">
                  <span>🎯</span> Pattern to Remember
                </div>
                <p className="text-slate-200">{insight.patternToRemember}</p>
              </div>

              {/* Expandable Details */}
              <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
              >
                <span className="text-slate-300 font-medium">
                  {expanded ? 'Show Less' : 'Show More Insights'}
                </span>
                <svg 
                  className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    {/* How to Spot This */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                        <span>👁️</span> How to Spot This
                      </div>
                      <p className="text-slate-200">{insight.howToSpotThis}</p>
                    </div>

                    {/* Related Patterns */}
                    {insight.relatedPatterns && insight.relatedPatterns.length > 0 && (
                      <div className="bg-slate-700/50 rounded-xl p-4">
                        <div className="text-sm text-slate-400 font-semibold mb-2">Related Patterns</div>
                        <div className="flex flex-wrap gap-2">
                          {insight.relatedPatterns.map((pattern, i) => (
                            <span 
                              key={i} 
                              className="px-2 py-1 rounded bg-slate-600 text-slate-300 text-sm"
                            >
                              {pattern}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Master Game Example */}
                    {insight.masterGameExample && (
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2">
                          <span>♔</span> Master Game Example
                        </div>
                        <p className="text-slate-200">{insight.masterGameExample}</p>
                      </div>
                    )}

                    {/* Practice Advice */}
                    <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-pink-400 font-semibold mb-2">
                        <span>📝</span> Personalized Advice
                      </div>
                      <p className="text-slate-200">{insight.practiceAdvice}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Ask Question */}
              <div className="border-t border-slate-700 pt-4">
                <div className="text-sm text-slate-400 mb-2">Have a question about this puzzle?</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && askQuestion()}
                    placeholder="Why is ... ?"
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={askQuestion}
                    disabled={askingQuestion || !question.trim()}
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium disabled:opacity-50 hover:bg-purple-500 transition-colors"
                  >
                    {askingQuestion ? '...' : 'Ask'}
                  </button>
                </div>

                {customAnswer && (
                  <div className="mt-3 p-3 rounded-lg bg-slate-700/50 text-sm text-slate-200">
                    {customAnswer}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700/50 bg-slate-800/50">
          <button
            onClick={onNextPuzzle}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-semibold hover:from-purple-500 hover:to-emerald-500 transition-all"
          >
            Next Puzzle →
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PuzzleGeniusPanel;




