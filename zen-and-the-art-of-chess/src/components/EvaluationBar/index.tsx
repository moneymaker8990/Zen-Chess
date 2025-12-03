import { useMemo } from 'react';
import type { EngineEvaluation } from '@/lib/types';

interface EvaluationBarProps {
  evaluation: EngineEvaluation | null;
  orientation?: 'white' | 'black';
  showNumbers?: boolean;
  horizontal?: boolean; // For mobile horizontal bar
}

export function EvaluationBar({ 
  evaluation, 
  orientation = 'white',
  showNumbers = true,
  horizontal = false,
}: EvaluationBarProps) {
  // Convert centipawns to percentage (0-100)
  const percentage = useMemo(() => {
    if (!evaluation) return 50;
    
    if (evaluation.mate !== undefined) {
      // Mate found
      return evaluation.mate > 0 ? 100 : 0;
    }
    
    // Convert centipawns to percentage using sigmoid-like function
    // This makes the bar more sensitive near equality
    const cp = evaluation.score;
    const normalized = 50 + 50 * (2 / (1 + Math.exp(-cp / 200)) - 1);
    return Math.min(100, Math.max(0, normalized));
  }, [evaluation]);

  // Display text
  const displayText = useMemo(() => {
    if (!evaluation) return '0.0';
    
    if (evaluation.mate !== undefined) {
      const prefix = evaluation.mate > 0 ? '+' : '-';
      return `${prefix}M${Math.abs(evaluation.mate)}`;
    }
    
    const score = evaluation.score / 100;
    const prefix = score > 0 ? '+' : '';
    return `${prefix}${score.toFixed(1)}`;
  }, [evaluation]);

  // Adjust for board orientation
  const whitePercentage = orientation === 'white' ? percentage : 100 - percentage;

  // Horizontal layout for mobile
  if (horizontal) {
    return (
      <div className="flex items-center gap-3 w-full">
        {/* Evaluation number */}
        {showNumbers && (
          <div className={`text-sm font-mono min-w-[48px] ${
            !evaluation ? 'text-zen-500' :
            evaluation.score > 50 ? 'text-zen-100' :
            evaluation.score < -50 ? 'text-zen-700' :
            'text-zen-400'
          }`}>
            {displayText}
          </div>
        )}

        {/* Horizontal bar container */}
        <div className="flex-1 h-4 rounded-full overflow-hidden flex" style={{ background: '#2a2825' }}>
          {/* Black's portion (left) */}
          <div 
            className="h-full bg-zen-700 transition-all duration-500"
            style={{ width: `${100 - whitePercentage}%` }}
          />
          {/* White's portion (right) */}
          <div 
            className="h-full bg-zen-100 transition-all duration-500"
            style={{ width: `${whitePercentage}%` }}
          />
        </div>

        {/* Depth indicator */}
        {evaluation && (
          <div className="text-xs text-zen-600 min-w-[24px]">
            d{evaluation.depth}
          </div>
        )}
      </div>
    );
  }

  // Vertical layout (default)
  return (
    <div className="flex flex-col items-center gap-2 h-full">
      {/* Evaluation number */}
      {showNumbers && (
        <div className={`text-sm font-mono ${
          !evaluation ? 'text-zen-500' :
          evaluation.score > 50 ? 'text-zen-100' :
          evaluation.score < -50 ? 'text-zen-700' :
          'text-zen-400'
        }`}>
          {displayText}
        </div>
      )}

      {/* Bar container */}
      <div className="eval-bar flex-1 w-6 min-h-[200px]">
        {/* White's portion (bottom when white orientation) */}
        <div 
          className="eval-bar-fill bg-zen-100"
          style={{ height: `${whitePercentage}%` }}
        />
      </div>

      {/* Depth indicator */}
      {evaluation && (
        <div className="text-xs text-zen-600">
          d{evaluation.depth}
        </div>
      )}
    </div>
  );
}

export default EvaluationBar;






