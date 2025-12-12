// ============================================
// GENIUS INSIGHT PANEL
// Deep AI explanations for puzzles and moves
// ============================================

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePuzzleGenius, useMoveGenius, usePositionGenius } from '@/hooks/useChessGenius';
import type { PuzzleGeniusInsight, MoveExplanation, PositionInsight } from '@/lib/chessGenius';

// ============================================
// PUZZLE INSIGHT PANEL
// ============================================

interface PuzzleInsightPanelProps {
  fen: string;
  solution: string[];
  themes: string[];
  solved: boolean;
  timeTaken: number;
  onClose?: () => void;
  autoLoad?: boolean;
}

export function PuzzleInsightPanel({
  fen,
  solution,
  themes,
  solved,
  timeTaken,
  onClose,
  autoLoad = false,
}: PuzzleInsightPanelProps) {
  const { getPuzzleInsight, insight, isLoading, error } = usePuzzleGenius();
  const [hasLoaded, setHasLoaded] = useState(false);
  
  useEffect(() => {
    if (autoLoad && !hasLoaded) {
      getPuzzleInsight(fen, solution, themes, solved, timeTaken);
      setHasLoaded(true);
    }
  }, [autoLoad, hasLoaded, fen, solution, themes, solved, timeTaken, getPuzzleInsight]);
  
  const handleLoad = () => {
    if (!hasLoaded) {
      getPuzzleInsight(fen, solution, themes, solved, timeTaken);
      setHasLoaded(true);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
        border: '1px solid rgba(139, 92, 246, 0.2)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(139, 92, 246, 0.2)' }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔮</span>
          <div>
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Genius Insight
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Deep pattern analysis
            </p>
          </div>
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-4">
        {!hasLoaded && !isLoading && (
          <button
            onClick={handleLoad}
            className="w-full py-3 rounded-xl font-medium transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              color: 'white',
            }}
          >
            🧠 Unlock Deep Insight
          </button>
        )}
        
        {isLoading && (
          <div className="flex flex-col items-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 rounded-full border-2 border-t-transparent"
              style={{ borderColor: 'var(--accent-primary)' }}
            />
            <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>
              Analyzing pattern deeply...
            </p>
          </div>
        )}
        
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}
        
        {insight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Theme */}
            <div className="p-3 rounded-xl" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                Pattern
              </p>
              <p className="font-medium" style={{ color: '#8b5cf6' }}>
                {insight.theme}
              </p>
            </div>
            
            {/* Why This Works */}
            <div>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                💡 Why This Works
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {insight.whyThisWorks}
              </p>
            </div>
            
            {/* Pattern to Remember */}
            <div className="p-4 rounded-xl" style={{ background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#4ade80' }}>
                🧠 Pattern to Remember
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {insight.patternToRemember}
              </p>
            </div>
            
            {/* How to Spot This */}
            <div>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                👁️ How to Spot This
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {insight.howToSpotThis}
              </p>
            </div>
            
            {/* Related Patterns */}
            {insight.relatedPatterns && insight.relatedPatterns.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                  🔗 Related Patterns
                </p>
                <div className="flex flex-wrap gap-2">
                  {insight.relatedPatterns.map((pattern, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{ background: 'var(--bg-hover)', color: 'var(--text-secondary)' }}
                    >
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Master Game Example */}
            {insight.masterGameExample && (
              <div className="p-3 rounded-xl" style={{ background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#fbbf24' }}>
                  👑 Master Game
                </p>
                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {insight.masterGameExample}
                </p>
              </div>
            )}
            
            {/* Practice Advice */}
            <div className="p-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))' }}>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                📚 Your Practice Advice
              </p>
              <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                {insight.practiceAdvice}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// MOVE EXPLANATION PANEL
// ============================================

interface MoveInsightPanelProps {
  fen: string;
  move: string;
  userMove?: string;
  puzzleTheme?: string;
  onClose?: () => void;
  compact?: boolean;
}

export function MoveInsightPanel({
  fen,
  move,
  userMove,
  puzzleTheme,
  onClose,
  compact = false,
}: MoveInsightPanelProps) {
  const { explainMove, explanation, isLoading, error } = useMoveGenius();
  
  useEffect(() => {
    explainMove(fen, move, {
      isPuzzle: !!puzzleTheme,
      puzzleTheme,
      userMove: userMove !== move ? userMove : undefined,
    });
  }, [fen, move, userMove, puzzleTheme, explainMove]);
  
  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--bg-hover)' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-5 h-5 rounded-full border-2 border-t-transparent"
          style={{ borderColor: 'var(--accent-primary)' }}
        />
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Analyzing move...
        </span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-3 rounded-xl bg-red-500/10">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }
  
  if (!explanation) return null;
  
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        className="p-3 rounded-xl"
        style={{ background: 'var(--bg-hover)' }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
          {explanation.geniusInsight}
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {explanation.whyGood}
        </p>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">💡</span>
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
            {explanation.move}
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 opacity-50 hover:opacity-100">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        {/* Genius Insight - The "aha!" */}
        <div className="p-3 rounded-xl" style={{ background: 'rgba(139, 92, 246, 0.1)' }}>
          <p className="text-sm font-medium" style={{ color: '#8b5cf6' }}>
            ✨ {explanation.geniusInsight}
          </p>
        </div>
        
        {/* Why Good */}
        <div>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
            Why it works
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {explanation.whyGood}
          </p>
        </div>
        
        {/* What it does */}
        <div>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
            Effects
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {explanation.whatItDoes}
          </p>
        </div>
        
        {/* Alternatives */}
        {explanation.alternatives && explanation.alternatives.length > 0 && (
          <div>
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
              Alternatives considered
            </p>
            <div className="space-y-2">
              {explanation.alternatives.map((alt, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="font-mono" style={{ color: 'var(--text-muted)' }}>{alt.move}</span>
                  <span style={{ color: 'var(--text-tertiary)' }}>— {alt.tradeoff}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Concept Connection */}
        <div className="p-3 rounded-xl" style={{ background: 'var(--bg-hover)' }}>
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
            🎓 Bigger Picture
          </p>
          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
            {explanation.conceptConnection}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// POSITION INSIGHT PANEL
// ============================================

interface PositionInsightPanelProps {
  fen: string;
  playerColor?: 'white' | 'black';
  onClose?: () => void;
}

export function PositionInsightPanel({
  fen,
  playerColor,
  onClose,
}: PositionInsightPanelProps) {
  const { analyze, insight, isLoading, error } = usePositionGenius();
  const [hasLoaded, setHasLoaded] = useState(false);
  
  const handleLoad = () => {
    analyze(fen, { playerColor, depth: 'standard', focus: 'both' });
    setHasLoaded(true);
  };
  
  const evalColors = {
    winning: '#4ade80',
    better: '#86efac',
    equal: '#fbbf24',
    worse: '#fb923c',
    losing: '#ef4444',
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl"
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-2">
          <span>📊</span>
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
            Position Analysis
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 opacity-50 hover:opacity-100">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="p-4">
        {!hasLoaded && !isLoading && (
          <button
            onClick={handleLoad}
            className="w-full py-3 rounded-xl transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              color: 'white',
            }}
          >
            🧠 Analyze Position
          </button>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 rounded-full border-2 border-t-transparent"
              style={{ borderColor: 'var(--accent-primary)' }}
            />
          </div>
        )}
        
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
        
        {insight && (
          <div className="space-y-4">
            {/* Evaluation */}
            <div className="flex items-center gap-3">
              <div
                className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                style={{
                  background: `${evalColors[insight.evaluation]}20`,
                  color: evalColors[insight.evaluation],
                }}
              >
                {insight.evaluation}
              </div>
            </div>
            
            {/* Key Ideas */}
            <div>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                Key Ideas
              </p>
              <ul className="space-y-1">
                {insight.keyIdeas.map((idea, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent-primary)' }}>•</span>
                    {idea}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Candidate Moves */}
            {insight.candidateMoves && insight.candidateMoves.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                  Best Moves
                </p>
                <div className="space-y-2">
                  {insight.candidateMoves.slice(0, 3).map((m, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>
                        {m.move}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {m.reason}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Plans */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>⬜ White's Plan</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {insight.planForBoth.white}
                </p>
              </div>
              <div className="p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>⬛ Black's Plan</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {insight.planForBoth.black}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default PuzzleInsightPanel;









