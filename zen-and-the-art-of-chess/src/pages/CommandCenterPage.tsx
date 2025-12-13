import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chessboard } from 'react-chessboard';
import { useBoardStyles } from '@/state/boardSettingsStore';
import { 
  useStudyStore, 
  useNotesStore, 
  useWeaknessStore, 
  useMentalGameStore 
} from '@/state/notesStore';
import { 
  useMistakeLibraryStore, 
  usePositionSparringStore,
  usePatternRecognitionStore 
} from '@/state/trainingStore';
import { useProgressStore } from '@/state/useStore';

// ============================================
// COMMAND CENTER - Unified Study Hub
// Everything automatic, everything connected
// ============================================

export function CommandCenterPage() {
  const navigate = useNavigate();
  const boardStyles = useBoardStyles();
  
  // All stores
  const { currentSession, startSession, endSession, sessions } = useStudyStore();
  const { notes, addNote } = useNotesStore();
  const { weaknesses, getMostCritical } = useWeaknessStore();
  const { gameLogs: _gameLogs } = useMentalGameStore();
  const { mistakes } = useMistakeLibraryStore();
  const { positions: sparringPositions } = usePositionSparringStore();
  const { profiles: patternProfiles } = usePatternRecognitionStore();
  const { progress } = useProgressStore();
  
  // Local state
  const [_activeTab, _setActiveTab] = useState<'overview' | 'activity' | 'insights' | 'quick-note'>('overview');
  const [sessionTime, setSessionTime] = useState(0);
  const [quickNote, setQuickNote] = useState('');
  const [showQuickCapture, setShowQuickCapture] = useState(false);

  // Session timer
  useEffect(() => {
    if (currentSession) {
      const timer = setInterval(() => {
        setSessionTime(Date.now() - currentSession.startTime);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setSessionTime(0);
    }
  }, [currentSession]);

  // Auto-generated insights
  const insights = useMemo(() => {
    const result: Array<{ type: 'warning' | 'tip' | 'achievement'; message: string; action?: () => void }> = [];
    
    // Weakness-based insights
    const criticalWeaknesses = getMostCritical();
    if (criticalWeaknesses.length > 0) {
      const top = criticalWeaknesses[0];
      result.push({
        type: 'warning',
        message: `Your most common issue: ${top.description}. Practice this pattern!`,
        action: () => navigate('/spar'),
      });
    }
    
    // Pattern insights
    const weakPatterns = patternProfiles.filter(p => p.successRate < 0.5);
    if (weakPatterns.length > 0) {
      result.push({
        type: 'tip',
        message: `You struggle with ${weakPatterns[0].patternType.replace('_', ' ')} patterns. Focus on these in puzzles.`,
        action: () => navigate('/train'),
      });
    }
    
    // Streak achievements
    const streak = sessions.filter((s, i) => {
      if (i === 0) return true;
      const prevDate = new Date(sessions[i-1].date);
      const thisDate = new Date(s.date);
      const diff = (prevDate.getTime() - thisDate.getTime()) / (1000 * 60 * 60 * 24);
      return diff <= 1;
    }).length;
    
    if (streak >= 7) {
      result.push({
        type: 'achievement',
        message: `🔥 ${streak} day streak! Keep the momentum going!`,
      });
    }
    
    // Recent mistake patterns
    const recentMistakes = mistakes.slice(0, 10);
    const causeCounts: Record<string, number> = {};
    recentMistakes.forEach(m => {
      causeCounts[m.rootCause] = (causeCounts[m.rootCause] || 0) + 1;
    });
    const topCause = Object.entries(causeCounts).sort(([,a], [,b]) => b - a)[0];
    if (topCause && topCause[1] >= 3) {
      result.push({
        type: 'warning',
        message: `${topCause[1]} recent mistakes from ${topCause[0].replace('_', ' ')}. Take a breath before moves!`,
      });
    }
    
    return result;
  }, [getMostCritical, patternProfiles, sessions, mistakes, navigate]);

  // Activity feed - combines all recent activity
  const activityFeed = useMemo(() => {
    const activities: Array<{
      id: string;
      type: 'game' | 'puzzle' | 'note' | 'mistake' | 'session';
      title: string;
      subtitle: string;
      timestamp: number;
      icon: string;
      color: string;
    }> = [];
    
    // Recent notes
    notes.slice(0, 5).forEach(note => {
      activities.push({
        id: note.id,
        type: 'note',
        title: note.title,
        subtitle: note.category.replace('_', ' '),
        timestamp: note.createdAt,
        icon: '📝',
        color: 'text-gold-400',
      });
    });
    
    // Recent mistakes
    mistakes.slice(0, 5).forEach(mistake => {
      activities.push({
        id: mistake.id,
        type: 'mistake',
        title: `${mistake.mistakeType}: ${mistake.playedMove} → ${mistake.bestMove}`,
        subtitle: mistake.rootCause.replace('_', ' '),
        timestamp: mistake.timestamp,
        icon: '❌',
        color: 'text-red-400',
      });
    });
    
    // Recent sessions
    sessions.slice(0, 3).forEach(session => {
      activities.push({
        id: session.id,
        type: 'session',
        title: `Study session: ${session.gamesPlayed} games, ${session.puzzlesSolved} puzzles`,
        subtitle: session.sessionNotes || 'No notes',
        timestamp: session.startTime,
        icon: '📚',
        color: 'text-emerald-400',
      });
    });
    
    // Sort by timestamp
    return activities.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
  }, [notes, mistakes, sessions]);

  // Quick stats
  const stats = useMemo(() => ({
    todayTime: currentSession ? Math.floor(sessionTime / 60000) : 0,
    weeklyTime: sessions
      .filter(s => {
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        return s.startTime > weekAgo;
      })
      .reduce((sum, s) => sum + (s.endTime ? (s.endTime - s.startTime) / 60000 : 0), 0),
    totalNotes: notes.length,
    totalMistakes: mistakes.length,
    puzzlesSolved: progress.puzzlesSolved,
    gamesPlayed: currentSession?.gamesPlayed || 0,
    sessionPuzzles: currentSession?.puzzlesSolved || 0,
    weaknessCount: weaknesses.filter(w => w.status === 'ACTIVE').length,
  }), [currentSession, sessionTime, sessions, notes, mistakes, progress, weaknesses]);

  const formatDuration = (ms: number) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  // Quick note save
  const handleQuickNote = () => {
    if (!quickNote.trim()) return;
    
    addNote({
      title: quickNote.slice(0, 50) + (quickNote.length > 50 ? '...' : ''),
      content: quickNote,
      category: 'INSIGHT',
      importance: 3,
      tags: ['quick-capture'],
      needsReview: false,
    });
    
    setQuickNote('');
    setShowQuickCapture(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with session control */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-zen-100">Command Center</h1>
          <p className="text-zen-500 text-sm">Your chess training hub • Everything in one place</p>
        </div>
        
        {!currentSession ? (
          <button 
            onClick={() => startSession()}
            className="zen-button-primary flex items-center gap-2"
          >
            <span className="text-lg">▶</span>
            Start Training
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-mono text-emerald-400 animate-pulse">
                {formatDuration(sessionTime)}
              </div>
              <div className="text-zen-500 text-xs">Session active</div>
            </div>
            <button 
              onClick={() => endSession()}
              className="zen-button"
            >
              End Session
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions Bar */}
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={() => navigate('/play')}
          className="flex items-center gap-2 px-4 py-2 bg-zen-800/50 rounded-lg hover:bg-zen-700/50 transition-all"
        >
          <span>♟</span>
          <span className="text-zen-300 text-sm">Play</span>
        </button>
        <button 
          onClick={() => navigate('/train')}
          className="flex items-center gap-2 px-4 py-2 bg-zen-800/50 rounded-lg hover:bg-zen-700/50 transition-all"
        >
          <span>🎯</span>
          <span className="text-zen-300 text-sm">Puzzles</span>
        </button>
        <button 
          onClick={() => navigate('/greats')}
          className="flex items-center gap-2 px-4 py-2 bg-zen-800/50 rounded-lg hover:bg-zen-700/50 transition-all"
        >
          <span>👑</span>
          <span className="text-zen-300 text-sm">Legends</span>
        </button>
        <button 
          onClick={() => navigate('/spar')}
          className="flex items-center gap-2 px-4 py-2 bg-zen-800/50 rounded-lg hover:bg-zen-700/50 transition-all"
        >
          <span>⚔️</span>
          <span className="text-zen-300 text-sm">Spar</span>
        </button>
        <button 
          onClick={() => setShowQuickCapture(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gold-500/20 rounded-lg hover:bg-gold-500/30 transition-all border border-gold-500/30"
        >
          <span>💡</span>
          <span className="text-gold-400 text-sm">Quick Note</span>
        </button>
      </div>

      {/* Quick Capture Modal */}
      {showQuickCapture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zen-950/90 backdrop-blur-sm">
          <div className="glass-card p-6 max-w-lg w-full mx-4">
            <h3 className="text-lg font-serif text-zen-200 mb-4">💡 Quick Capture</h3>
            <p className="text-zen-500 text-sm mb-4">
              Jot down any insight, idea, or lesson. It'll be saved and tagged automatically.
            </p>
            <textarea
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              placeholder="What did you just learn? What pattern did you notice?"
              className="w-full px-4 py-3 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200 resize-none focus:outline-none focus:border-gold-500/50"
              rows={4}
              autoFocus
            />
            <div className="flex gap-3 mt-4">
              <button onClick={handleQuickNote} className="zen-button-primary flex-1">
                Save Note
              </button>
              <button onClick={() => setShowQuickCapture(false)} className="zen-button-ghost flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard label="Today" value={`${stats.todayTime}m`} icon="⏱️" />
        <StatCard label="This Week" value={`${Math.round(stats.weeklyTime)}m`} icon="📅" />
        <StatCard label="Notes" value={stats.totalNotes} icon="📝" />
        <StatCard label="Mistakes" value={stats.totalMistakes} icon="❌" />
        <StatCard label="Puzzles" value={stats.puzzlesSolved} icon="🎯" />
        <StatCard label="Focus Areas" value={stats.weaknessCount} icon="🎯" highlight={stats.weaknessCount > 0} />
      </div>
      
      {/* Session Stats (when active) */}
      {currentSession && (
        <div className="glass-card p-4 bg-emerald-500/5 border-emerald-500/20">
          <h3 className="text-sm text-emerald-400 mb-3">📊 This Session</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-mono text-zen-200">{stats.gamesPlayed}</div>
              <div className="text-xs text-zen-500">Games Played</div>
            </div>
            <div>
              <div className="text-2xl font-mono text-zen-200">{stats.sessionPuzzles}</div>
              <div className="text-xs text-zen-500">Puzzles Solved</div>
            </div>
            <div>
              <div className="text-2xl font-mono text-zen-200">{formatDuration(sessionTime)}</div>
              <div className="text-xs text-zen-500">Time</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Insights & Recommendations */}
        <div className="space-y-4">
          <h2 className="text-sm text-zen-500 uppercase tracking-wider flex items-center gap-2">
            <span>🧠</span> AI Insights
          </h2>
          
          {insights.length === 0 ? (
            <div className="glass-card p-6 text-center">
              <p className="text-zen-500 text-sm">
                Play some games and solve puzzles to get personalized insights!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div 
                  key={i}
                  className={`glass-card p-4 cursor-pointer hover:border-zen-600/50 transition-all ${
                    insight.type === 'warning' ? 'border-l-4 border-l-orange-500' :
                    insight.type === 'achievement' ? 'border-l-4 border-l-emerald-500' :
                    'border-l-4 border-l-blue-500'
                  }`}
                  onClick={insight.action}
                >
                  <p className="text-zen-300 text-sm">{insight.message}</p>
                  {insight.action && (
                    <p className="text-zen-600 text-xs mt-2">Click to take action →</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Top Weakness to Practice */}
          {getMostCritical().length > 0 && (
            <div className="glass-card p-4">
              <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-3">
                🎯 Practice This
              </h3>
              <div className="space-y-2">
                {getMostCritical().slice(0, 3).map(weakness => (
                  <div 
                    key={weakness.id}
                    className="flex items-center justify-between p-2 bg-zen-900/50 rounded-lg"
                  >
                    <span className="text-zen-300 text-sm">{weakness.description}</span>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      weakness.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                      weakness.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {weakness.occurrences}x
                    </span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigate('/spar')}
                className="zen-button w-full mt-3 text-sm"
              >
                Start Targeted Practice
              </button>
            </div>
          )}
        </div>

        {/* Middle: Activity Feed */}
        <div className="space-y-4">
          <h2 className="text-sm text-zen-500 uppercase tracking-wider flex items-center gap-2">
            <span>📊</span> Recent Activity
          </h2>
          
          {activityFeed.length === 0 ? (
            <div className="glass-card p-6 text-center">
              <p className="text-zen-500 text-sm">
                Your activity will appear here as you train.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {activityFeed.map(activity => (
                <div 
                  key={activity.id}
                  className="glass-card p-3 flex items-start gap-3 hover:border-zen-600/50 transition-all cursor-pointer"
                  onClick={() => {
                    if (activity.type === 'note') navigate('/notes');
                    if (activity.type === 'mistake') navigate('/mistakes');
                  }}
                >
                  <span className={`text-lg ${activity.color}`}>{activity.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-zen-200 text-sm truncate">{activity.title}</p>
                    <p className="text-zen-600 text-xs">{activity.subtitle}</p>
                  </div>
                  <span className="text-zen-600 text-xs whitespace-nowrap">
                    {formatTimeAgo(activity.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          <button 
            onClick={() => navigate('/notes')}
            className="text-zen-500 text-sm hover:text-zen-300 transition-colors w-full text-center py-2"
          >
            View all notes →
          </button>
        </div>

        {/* Right: Quick Actions & Sparring */}
        <div className="space-y-4">
          <h2 className="text-sm text-zen-500 uppercase tracking-wider flex items-center gap-2">
            <span>⚡</span> Quick Start
          </h2>
          
          {/* Recommended Sparring Position */}
          {sparringPositions.length > 0 && (
            <div className="glass-card p-4">
              <h3 className="text-sm text-zen-400 mb-3">Recommended Position</h3>
              <div className="flex justify-center mb-3">
                <Chessboard
                  position={sparringPositions[0].fen}
                  boardOrientation={sparringPositions[0].playerColor}
                  arePiecesDraggable={false}
                  boardWidth={180}
                  customDarkSquareStyle={boardStyles.customDarkSquareStyle}
                  customLightSquareStyle={boardStyles.customLightSquareStyle}
                />
              </div>
              <p className="text-zen-300 text-sm text-center mb-2">
                {sparringPositions[0].name}
              </p>
              <button 
                onClick={() => navigate('/spar')}
                className="zen-button-primary w-full text-sm"
              >
                Practice Now
              </button>
            </div>
          )}

          {/* Quick Links */}
          <div className="glass-card p-4 space-y-2">
            <h3 className="text-sm text-zen-400 mb-3">Jump To</h3>
            <QuickLink icon="📝" label="All Notes" count={notes.length} onClick={() => navigate('/notes')} />
            <QuickLink icon="❌" label="Mistake Library" count={mistakes.length} onClick={() => navigate('/mistakes')} />
            <QuickLink icon="⚔️" label="Sparring Positions" count={sparringPositions.length} onClick={() => navigate('/spar')} />
            <QuickLink icon="📖" label="Openings" onClick={() => navigate('/openings')} />
            <QuickLink icon="🎮" label="Daily Lesson" onClick={() => navigate('/mind')} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ 
  label, 
  value, 
  icon, 
  highlight = false 
}: { 
  label: string; 
  value: string | number; 
  icon: string;
  highlight?: boolean;
}) {
  return (
    <div className={`glass-card p-3 text-center ${highlight ? 'border-gold-500/30' : ''}`}>
      <div className="text-lg mb-1">{icon}</div>
      <div className={`text-xl font-mono ${highlight ? 'text-gold-400' : 'text-zen-200'}`}>
        {value}
      </div>
      <div className="text-zen-600 text-xs">{label}</div>
    </div>
  );
}

// Quick Link Component
function QuickLink({ 
  icon, 
  label, 
  count, 
  onClick 
}: { 
  icon: string; 
  label: string; 
  count?: number;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-2 bg-zen-900/50 rounded-lg hover:bg-zen-800/50 transition-all"
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="text-zen-300 text-sm">{label}</span>
      </div>
      {count !== undefined && (
        <span className="text-zen-600 text-xs">{count}</span>
      )}
    </button>
  );
}

export default CommandCenterPage;

