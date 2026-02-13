import { useState, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { useMistakeLibraryStore } from '@/state/trainingStore';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { PageHeader } from '@/components/Tutorial';
import type { MistakeEntry, MistakeType, RootCause } from '@/lib/trainingTypes';

const mistakeTypeLabels: Record<MistakeType, { label: string; color: string }> = {
  BLUNDER: { label: '❌ Blunder', color: 'bg-red-500/20 text-red-400' },
  MISTAKE: { label: '⚠️ Mistake', color: 'bg-orange-500/20 text-orange-400' },
  INACCURACY: { label: '📉 Inaccuracy', color: 'bg-yellow-500/20 text-yellow-400' },
  MISSED_WIN: { label: '🎯 Missed Win', color: 'bg-blue-500/20 text-blue-400' },
  MISSED_TACTIC: { label: '⚡ Missed Tactic', color: 'bg-purple-500/20 text-purple-400' },
  POSITIONAL: { label: '🧭 Positional', color: 'bg-cyan-500/20 text-cyan-400' },
  TIME_TROUBLE: { label: '⏱️ Time Trouble', color: 'bg-pink-500/20 text-pink-400' },
  MOUSE_SLIP: { label: '🖱️ Mouse Slip', color: 'bg-gray-500/20 text-gray-400' },
};

const rootCauseLabels: Record<RootCause, string> = {
  CALCULATION: '🧮 Calculation Error',
  PATTERN_BLIND: '👁️ Pattern Blindness',
  TUNNEL_VISION: '🔦 Tunnel Vision',
  TIME_PRESSURE: '⏰ Time Pressure',
  IMPATIENCE: '💨 Impatience',
  FATIGUE: '😴 Fatigue',
  TILT: '😤 Tilt',
  KNOWLEDGE_GAP: '📚 Knowledge Gap',
  OVERCONFIDENCE: '😎 Overconfidence',
  FEAR: '😨 Fear/Passivity',
  COMPLEXITY: '🌀 Complexity',
  OPPONENT_PRESSURE: '💪 Opponent Pressure',
};

export function MistakeLibrary() {
  const { mistakes, getMistakeStats, markReviewed, deleteMistake } = useMistakeLibraryStore();
  const boardStyles = useBoardStyles();
  
  const [filterType, setFilterType] = useState<MistakeType | 'ALL'>('ALL');
  const [filterCause, setFilterCause] = useState<RootCause | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'recent' | 'evalDrop' | 'unreviewed'>('recent');
  const [selectedMistake, setSelectedMistake] = useState<MistakeEntry | null>(null);
  
  const stats = getMistakeStats();
  
  // Filter and sort
  const filteredMistakes = useMemo(() => {
    let result = [...mistakes];
    
    if (filterType !== 'ALL') {
      result = result.filter((m) => m.mistakeType === filterType);
    }
    if (filterCause !== 'ALL') {
      result = result.filter((m) => m.rootCause === filterCause);
    }
    
    switch (sortBy) {
      case 'recent':
        result.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case 'evalDrop':
        result.sort((a, b) => b.evalDrop - a.evalDrop);
        break;
      case 'unreviewed':
        result.sort((a, b) => a.timesReviewed - b.timesReviewed);
        break;
    }
    
    return result;
  }, [mistakes, filterType, filterCause, sortBy]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatEval = (ev: number) => {
    if (ev > 0) return `+${(ev / 100).toFixed(1)}`;
    return (ev / 100).toFixed(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        tutorialId="mistakes"
        title="Mistake Library"
        subtitle={`Your personal collection of learning opportunities • ${stats.total} mistakes tracked`}
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-mono text-red-400">{stats.total}</div>
          <p className="text-zen-500 text-sm">Total Mistakes</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-mono text-orange-400">
            {stats.avgEvalDrop > 0 ? `-${(stats.avgEvalDrop / 100).toFixed(1)}` : '0.0'}
          </div>
          <p className="text-zen-500 text-sm">Avg Eval Drop</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-mono text-zen-200">
            {stats.mostCommonPattern?.replace('_', ' ') || '-'}
          </div>
          <p className="text-zen-500 text-sm">Common Pattern</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-mono text-zen-200">
            {stats.mostCommonCause?.replace('_', ' ') || '-'}
          </div>
          <p className="text-zen-500 text-sm">Common Cause</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as MistakeType | 'ALL')}
          className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
        >
          <option value="ALL">All Types</option>
          {Object.entries(mistakeTypeLabels).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        <select
          value={filterCause}
          onChange={(e) => setFilterCause(e.target.value as RootCause | 'ALL')}
          className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
        >
          <option value="ALL">All Causes</option>
          {Object.entries(rootCauseLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'recent' | 'evalDrop' | 'unreviewed')}
          className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300"
        >
          <option value="recent">Most Recent</option>
          <option value="evalDrop">Worst Blunders</option>
          <option value="unreviewed">Needs Review</option>
        </select>
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Mistake list */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {filteredMistakes.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                {mistakes.length === 0 ? 'Your Library is Empty' : 'No Matching Mistakes'}
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
                {mistakes.length === 0 
                  ? 'Every mistake is a learning opportunity. Start building your personal study deck!'
                  : 'Try adjusting your filters to find more mistakes.'
                }
              </p>
              
              {mistakes.length === 0 && (
                <div className="space-y-4">
                  {/* How to add mistakes */}
                  <div 
                    className="p-4 rounded-lg text-left"
                    style={{ background: 'var(--bg-tertiary)' }}
                  >
                    <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                      How to add mistakes:
                    </h4>
                    <ol className="text-sm space-y-2" style={{ color: 'var(--text-muted)' }}>
                      <li className="flex items-start gap-2">
                        <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--accent-primary)' }}>1.</span>
                        <span>Play a game or import a PGN in the <strong>Game Review</strong> section</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--accent-primary)' }}>2.</span>
                        <span>Let the engine analyze your moves</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-mono text-xs mt-0.5" style={{ color: 'var(--accent-primary)' }}>3.</span>
                        <span>Click "Add to Library" on any mistake you want to study</span>
                      </li>
                    </ol>
                  </div>
                  
                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    <a 
                      href="/games"
                      className="btn-primary px-4 py-2 inline-flex items-center gap-2"
                    >
                      📊 Review a Game
                    </a>
                    <a 
                      href="/train"
                      className="btn-secondary px-4 py-2 inline-flex items-center gap-2"
                    >
                      ♟️ Practice Puzzles
                    </a>
                  </div>
                </div>
              )}
              
              {mistakes.length > 0 && (
                <button
                  onClick={() => {
                    setFilterType('ALL');
                    setFilterCause('ALL');
                  }}
                  className="btn-secondary px-4 py-2"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            filteredMistakes.map((mistake) => (
              <div
                key={mistake.id}
                onClick={() => setSelectedMistake(mistake)}
                className={`glass-card p-4 cursor-pointer hover:border-zen-600/50 transition-all ${
                  selectedMistake?.id === mistake.id ? 'border-gold-500/50' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${mistakeTypeLabels[mistake.mistakeType].color}`}>
                      {mistakeTypeLabels[mistake.mistakeType].label}
                    </span>
                    {mistake.timesReviewed === 0 && (
                      <span className="text-xs text-gold-400">📌 New</span>
                    )}
                  </div>
                  <span className="text-zen-600 text-xs">{formatDate(mistake.timestamp)}</span>
                </div>
                
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-sm">
                    <span className="text-zen-500">Played:</span>
                    <span className="text-red-400 ml-1 font-mono">{mistake.playedMove}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-zen-500">Best:</span>
                    <span className="text-emerald-400 ml-1 font-mono">{mistake.bestMove}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-zen-500">Drop:</span>
                    <span className="text-orange-400 ml-1 font-mono">{formatEval(-mistake.evalDrop)}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-zen-800/50 text-zen-500">
                    {rootCauseLabels[mistake.rootCause]}
                  </span>
                  {mistake.tacticalTheme && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400">
                      {mistake.tacticalTheme.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail panel */}
        {selectedMistake ? (
          <MistakeDetail
            mistake={selectedMistake}
            onReview={() => {
              markReviewed(selectedMistake.id);
              setSelectedMistake({ ...selectedMistake, timesReviewed: selectedMistake.timesReviewed + 1 });
            }}
            onDelete={() => {
              deleteMistake(selectedMistake.id);
              setSelectedMistake(null);
            }}
          />
        ) : (
          <div className="glass-card p-8 text-center hidden lg:block">
            <div className="text-4xl mb-3">👆</div>
            <p className="text-zen-400">Select a mistake to view details</p>
            <p className="text-zen-600 text-xs mt-2">
              You can review the position, mark it studied, or create a drill from it
            </p>
          </div>
        )}
      </div>

      {/* Pattern breakdown */}
      {stats.total > 0 && (
        <div className="glass-card p-5">
          <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-4">Root Cause Analysis</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(stats.byCause)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 8)
              .map(([cause, count]) => (
                <div key={cause} className="bg-zen-900/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-zen-400 text-xs">{cause.replace('_', ' ')}</span>
                    <span className="text-zen-200 font-mono text-sm">{count}</span>
                  </div>
                  <div className="h-1 bg-zen-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold-500/60"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MistakeDetail({
  mistake,
  onReview,
  onDelete,
}: {
  mistake: MistakeEntry;
  onReview: () => void;
  onDelete: () => void;
}) {
  const boardStyles = useBoardStyles();
  const formatEval = (ev: number) => {
    if (ev > 0) return `+${(ev / 100).toFixed(1)}`;
    return (ev / 100).toFixed(1);
  };

  return (
    <div className="glass-card p-5 space-y-4">
      {/* Type and cause */}
      <div className="flex items-center justify-between">
        <span className={`text-sm px-2 py-1 rounded ${mistakeTypeLabels[mistake.mistakeType].color}`}>
          {mistakeTypeLabels[mistake.mistakeType].label}
        </span>
        <button onClick={onDelete} className="text-red-500 hover:text-red-400 text-xs">
          Delete
        </button>
      </div>

      {/* Position */}
      <div className="bg-zen-900/50 p-3">
        <div style={{ width: 280, maxWidth: '100%' }}>
          <Chessboard
            position={mistake.fen}
            boardOrientation={mistake.playerColor}
            arePiecesDraggable={false}
            boardWidth={280}
            customDarkSquareStyle={boardStyles.customDarkSquareStyle}
            customLightSquareStyle={boardStyles.customLightSquareStyle}
          />
        </div>
        <p className="text-zen-600 text-xs text-center mt-2">
          Move {mistake.moveNumber} • Playing as {mistake.playerColor}
        </p>
      </div>

      {/* Moves comparison */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-red-500/10 p-3 rounded-lg text-center">
          <p className="text-red-400 text-xs uppercase mb-1">Played</p>
          <p className="text-red-400 font-mono text-lg">{mistake.playedMove}</p>
        </div>
        <div className="bg-emerald-500/10 p-3 rounded-lg text-center">
          <p className="text-emerald-400 text-xs uppercase mb-1">Best</p>
          <p className="text-emerald-400 font-mono text-lg">{mistake.bestMove}</p>
        </div>
      </div>

      {/* Evaluation */}
      <div className="flex justify-between items-center py-2 border-y border-zen-700/30">
        <span className="text-zen-500 text-sm">Evaluation swing:</span>
        <span className="text-orange-400 font-mono">
          {formatEval(mistake.evaluation)} → {formatEval(mistake.evalAfter)}
        </span>
      </div>

      {/* Root cause */}
      <div>
        <p className="text-zen-500 text-xs uppercase mb-2">Root Cause</p>
        <span className="text-sm px-3 py-1 rounded-full bg-zen-800/50 text-zen-300">
          {rootCauseLabels[mistake.rootCause]}
        </span>
      </div>

      {/* Pattern */}
      {mistake.tacticalTheme && (
        <div>
          <p className="text-zen-500 text-xs uppercase mb-2">Pattern Missed</p>
          <span className="text-sm px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
            {mistake.tacticalTheme.replace('_', ' ')}
          </span>
        </div>
      )}

      {/* Time info */}
      {mistake.timeSpentSeconds !== undefined && (
        <div className="flex justify-between text-sm">
          <span className="text-zen-500">Time spent:</span>
          <span className="text-zen-300">{mistake.timeSpentSeconds}s</span>
        </div>
      )}

      {/* Lesson */}
      {mistake.lesson && (
        <div className="bg-gold-500/10 p-3 rounded-lg">
          <p className="text-gold-400 text-xs uppercase mb-1">Lesson</p>
          <p className="text-zen-300 text-sm">{mistake.lesson}</p>
        </div>
      )}

      {/* Review status */}
      <div className="flex justify-between text-sm text-zen-600">
        <span>Reviewed {mistake.timesReviewed} times</span>
        {mistake.retested && (
          <span className={mistake.retestedCorrect ? 'text-emerald-400' : 'text-red-400'}>
            {mistake.retestedCorrect ? '✓ Retested correct' : '✗ Retested wrong'}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button onClick={onReview} className="zen-button flex-1">
          ✓ Mark Reviewed
        </button>
        <button className="zen-button-primary flex-1">
          🎯 Create Drill
        </button>
      </div>
    </div>
  );
}

export default MistakeLibrary;

