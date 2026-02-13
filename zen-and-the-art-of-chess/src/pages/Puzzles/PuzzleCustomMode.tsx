import type { PatternType } from '@/lib/types';
import type { PuzzleMode } from './types';
import { THEME_LABELS } from './constants';

interface PuzzleCustomModeProps {
  selectedTheme: PatternType | null;
  setSelectedTheme: (theme: PatternType | null) => void;
  selectedDifficulty: number | null;
  setSelectedDifficulty: (d: number | null) => void;
  setMode: (mode: PuzzleMode) => void;
  startMode: (mode: PuzzleMode) => void;
  isLoadingPuzzle: boolean;
}

export function PuzzleCustomMode({
  selectedTheme,
  setSelectedTheme,
  selectedDifficulty,
  setSelectedDifficulty,
  setMode,
  startMode,
  isLoadingPuzzle,
}: PuzzleCustomModeProps) {
  const themes = Object.keys(THEME_LABELS) as PatternType[];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => setMode('menu')}
          className="hover:text-white transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          Puzzles
        </button>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ color: 'var(--text-secondary)' }}>Custom Puzzles</span>
      </div>

      <h1 className="text-2xl font-display" style={{ color: 'var(--text-primary)' }}>
        Select Theme & Difficulty
      </h1>

      {/* Theme Selection */}
      <div className="card p-6">
        <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
          Tactical Theme
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => setSelectedTheme(null)}
            className={`p-3 rounded-lg text-sm transition-all ${!selectedTheme ? 'ring-2' : ''}`}
            style={{
              background: !selectedTheme ? 'var(--accent-primary)' : 'var(--bg-elevated)',
              color: !selectedTheme ? 'white' : 'var(--text-secondary)'
            }}
          >
            All Themes
          </button>
          {themes.map(theme => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`p-3 rounded-lg text-sm transition-all ${selectedTheme === theme ? 'ring-2' : ''}`}
              style={{
                background: selectedTheme === theme ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                color: selectedTheme === theme ? 'white' : 'var(--text-secondary)'
              }}
            >
              {THEME_LABELS[theme]}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="card p-6">
        <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
          Difficulty
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedDifficulty(null)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${!selectedDifficulty ? 'ring-2' : ''}`}
            style={{
              background: !selectedDifficulty ? 'var(--accent-primary)' : 'var(--bg-elevated)',
              color: !selectedDifficulty ? 'white' : 'var(--text-secondary)'
            }}
          >
            All Levels
          </button>
          {[1, 2, 3, 4, 5].map(d => (
            <button
              key={d}
              onClick={() => setSelectedDifficulty(d)}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${selectedDifficulty === d ? 'ring-2' : ''}`}
              style={{
                background: selectedDifficulty === d ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                color: selectedDifficulty === d ? 'white' : 'var(--text-secondary)'
              }}
            >
              {'★'.repeat(d)}{'☆'.repeat(5 - d)}
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="flex gap-4">
        <button
          onClick={() => setMode('menu')}
          className="btn-ghost"
        >
          ← Back
        </button>
        <button
          onClick={() => startMode('custom')}
          disabled={isLoadingPuzzle}
          className="btn-primary flex-1"
        >
          {isLoadingPuzzle ? 'Loading...' : 'Start Training'}
        </button>
      </div>
    </div>
  );
}
