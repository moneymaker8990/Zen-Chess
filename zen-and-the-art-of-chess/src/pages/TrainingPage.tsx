import { useState } from 'react';
import { PatternTrainer } from '@/components/PatternTrainer';
import { useProgressStore } from '@/state/useStore';
import type { PatternType } from '@/lib/types';

export function TrainingPage() {
  const [selectedPattern, setSelectedPattern] = useState<PatternType | 'ALL'>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<1 | 2 | 3 | 4 | 5 | 'ALL'>('ALL');
  const { progress } = useProgressStore();

  const patterns: { type: PatternType | 'ALL'; label: string; description: string }[] = [
    { type: 'ALL', label: 'All Patterns', description: 'Practice all tactical themes' },
    { type: 'FORK', label: 'Forks', description: 'Double attacks' },
    { type: 'PIN', label: 'Pins', description: 'Restricting piece movement' },
    { type: 'SKEWER', label: 'Skewers', description: 'Reverse pins' },
    { type: 'BACK_RANK', label: 'Back Rank', description: 'Exploiting weak back rank' },
    { type: 'DISCOVERY', label: 'Discoveries', description: 'Revealed attacks' },
    { type: 'MATE_PATTERN', label: 'Checkmates', description: 'Mating patterns' },
    { type: 'QUIET_MOVE', label: 'Quiet Moves', description: 'Subtle winning moves' },
    { type: 'SACRIFICE', label: 'Sacrifices', description: 'Material for advantage' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif text-zen-100">Pattern Training</h1>
          <p className="text-zen-500 text-xs sm:text-sm">
            Sharpen your tactical vision
          </p>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="text-zen-500">
            Solved: <span className="text-emerald-400 font-mono">{progress.puzzlesSolved}</span>
          </div>
          <div className="text-zen-500">
            Success: <span className="text-gold-400 font-mono">
              {progress.puzzlesSolved + progress.puzzlesFailed > 0
                ? Math.round((progress.puzzlesSolved / (progress.puzzlesSolved + progress.puzzlesFailed)) * 100)
                : 0}%
            </span>
          </div>
        </div>
      </div>

      {/* Pattern selector */}
      <div className="glass-card p-3 sm:p-6">
        <h3 className="text-xs sm:text-sm text-zen-500 uppercase tracking-wider mb-3 sm:mb-4">
          Select Pattern
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
          {patterns.map(({ type, label, description }) => (
            <button
              key={type}
              onClick={() => setSelectedPattern(type)}
              className={`p-2 sm:p-3 rounded-lg text-left transition-all ${
                selectedPattern === type
                  ? 'bg-gold-500/20 border border-gold-500/50'
                  : 'bg-zen-800/40 border border-zen-700/30 hover:border-zen-600/50'
              }`}
            >
              <div className={`font-medium text-xs sm:text-sm ${
                selectedPattern === type ? 'text-gold-400' : 'text-zen-200'
              }`}>
                {label}
              </div>
              <div className="text-zen-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1 hidden sm:block">{description}</div>
            </button>
          ))}
        </div>

        {/* Difficulty selector */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-zen-700/30">
          <h3 className="text-xs sm:text-sm text-zen-500 uppercase tracking-wider mb-3 sm:mb-4">
            Difficulty
          </h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <button
              onClick={() => setSelectedDifficulty('ALL')}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
                selectedDifficulty === 'ALL'
                  ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                  : 'bg-zen-800/40 text-zen-400 border border-zen-700/30 hover:border-zen-600/50'
              }`}
            >
              All
            </button>
            {([1, 2, 3, 4, 5] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
                  selectedDifficulty === level
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                    : 'bg-zen-800/40 text-zen-400 border border-zen-700/30 hover:border-zen-600/50'
                }`}
              >
                {'★'.repeat(level)}<span className="hidden sm:inline">{'☆'.repeat(5 - level)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern trainer */}
      <PatternTrainer
        patternType={selectedPattern === 'ALL' ? undefined : selectedPattern}
        difficulty={selectedDifficulty === 'ALL' ? undefined : selectedDifficulty}
      />

      {/* Training tips - hidden on mobile to save space */}
      <div className="glass-card-subtle p-4 sm:p-6 hidden sm:block">
        <h3 className="text-xs sm:text-sm text-zen-500 uppercase tracking-wider mb-3 sm:mb-4">
          Training Tips
        </h3>
        <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-zen-400">
          <li className="flex items-start gap-2">
            <span className="text-gold-500/60">•</span>
            <span>Don't rush. Take time to see the full pattern before moving.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold-500/60">•</span>
            <span>When you fail, study the solution. Understanding is more valuable than speed.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold-500/60">•</span>
            <span>Focus on one pattern type until it becomes automatic.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-gold-500/60">•</span>
            <span>Quality over quantity. 10 puzzles with full attention beats 50 rushed.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TrainingPage;






