import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudyStore, useNotesStore, useWeaknessStore, useMentalGameStore } from '@/state/notesStore';
import { useProgressStore } from '@/state/useStore';
import { PageHeader } from '@/components/Tutorial';

export function StudyDashboard() {
  const navigate = useNavigate();
  const { sessions, currentSession, startSession, endSession, getStreak, getTotalStudyTime } = useStudyStore();
  const { notes } = useNotesStore();
  const { weaknesses, getMostCritical } = useWeaknessStore();
  const { gameLogs, getAverageMood, getTiltFrequency } = useMentalGameStore();
  const { progress } = useProgressStore();
  
  const [sessionNotes, setSessionNotes] = useState('');
  const [showMoodLog, setShowMoodLog] = useState(false);

  // Timer for current session
  const [sessionTime, setSessionTime] = useState(0);
  
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

  // Calculate stats
  const stats = useMemo(() => ({
    streak: getStreak(),
    weeklyTime: Math.round(getTotalStudyTime(7)),
    totalNotes: notes.length,
    avgMood: getAverageMood(7),
    tiltRate: getTiltFrequency(7),
    activeWeaknesses: weaknesses.filter((w) => w.status === 'ACTIVE').length,
    totalGamesLogged: gameLogs.length,
  }), [getStreak, getTotalStudyTime, notes, getAverageMood, getTiltFrequency, weaknesses, gameLogs]);

  const criticalWeaknesses = getMostCritical();
  const recentSessions = sessions.slice(0, 5);
  const isFirstTime = sessions.length === 0 && notes.length === 0;

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (dateStr === today.toISOString().split('T')[0]) return 'Today';
    if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yesterday';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        tutorialId="study"
        title="Study Dashboard"
        subtitle="Your training log & performance tracker"
      >
        {!currentSession ? (
          <button onClick={() => startSession()} className="zen-button-primary">
            ▶ Start Study Session
          </button>
        ) : (
          <div className="text-right">
            <div className="text-emerald-400 text-sm mb-2 animate-pulse">
              ● Recording: {formatDuration(sessionTime)}
            </div>
            <button
              onClick={() => {
                endSession(sessionNotes);
                setSessionNotes('');
              }}
              className="zen-button"
            >
              End Session
            </button>
          </div>
        )}
      </PageHeader>

      {/* First Time User Guide */}
      {isFirstTime && !currentSession && (
        <div className="glass-card p-6 border-gold-500/30">
          <h2 className="text-xl font-serif text-zen-100 mb-4">👋 Welcome! Here's How This Works</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-zen-300 font-medium">Automatic Tracking:</h3>
              <p className="text-zen-400 text-sm">
                Everything you do is tracked automatically when a session is active:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-3 text-zen-400">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">♟</span>
                  Games played auto-recorded when they end
                </li>
                <li className="flex items-center gap-3 text-zen-400">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">🎯</span>
                  Puzzles solved/failed auto-counted
                </li>
                <li className="flex items-center gap-3 text-zen-400">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">📝</span>
                  Notes created auto-tracked
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-zen-300 font-medium">Getting Started:</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold">1</span>
                  <span className="text-zen-400">Click "Start Study Session"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold">2</span>
                  <span className="text-zen-400">Train: Play games, solve puzzles, take notes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold">3</span>
                  <span className="text-zen-400">When done, write what you learned & end session</span>
                </li>
              </ol>
              
              <button
                onClick={() => startSession()}
                className="zen-button-primary w-full mt-4"
              >
                Start Your First Session →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Session Panel */}
      {currentSession && (
        <div className="glass-card p-5 border-emerald-500/30">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-serif text-zen-200">Session Active</h3>
              <p className="text-zen-500 text-xs">Your activities are being tracked automatically</p>
            </div>
            <div className="text-3xl font-mono text-emerald-400">{formatDuration(sessionTime)}</div>
          </div>
          
          {/* Live Session Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center p-3 bg-zen-900/50 rounded-lg">
              <p className="text-2xl font-mono text-zen-200">{currentSession.gamesPlayed}</p>
              <p className="text-zen-500 text-xs">Games</p>
            </div>
            <div className="text-center p-3 bg-zen-900/50 rounded-lg">
              <p className="text-2xl font-mono text-emerald-400">{currentSession.puzzlesSolved}</p>
              <p className="text-zen-500 text-xs">Puzzles ✓</p>
            </div>
            <div className="text-center p-3 bg-zen-900/50 rounded-lg">
              <p className="text-2xl font-mono text-red-400">{currentSession.puzzlesFailed}</p>
              <p className="text-zen-500 text-xs">Puzzles ✗</p>
            </div>
            <div className="text-center p-3 bg-zen-900/50 rounded-lg">
              <p className="text-2xl font-mono text-gold-400">{currentSession.notesCreated}</p>
              <p className="text-zen-500 text-xs">Notes</p>
            </div>
          </div>

          {/* Quick Actions during session */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button 
              onClick={() => navigate('/play')}
              className="p-2 text-center bg-zen-800/50 rounded-lg hover:bg-zen-700/50 transition-all text-sm text-zen-400"
            >
              ♟ Play Game
            </button>
            <button 
              onClick={() => navigate('/train')}
              className="p-2 text-center bg-zen-800/50 rounded-lg hover:bg-zen-700/50 transition-all text-sm text-zen-400"
            >
              🎯 Puzzles
            </button>
            <button 
              onClick={() => navigate('/notes')}
              className="p-2 text-center bg-zen-800/50 rounded-lg hover:bg-zen-700/50 transition-all text-sm text-zen-400"
            >
              📝 Notes
            </button>
          </div>

          {/* Session Notes */}
          <textarea
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            placeholder="What did you learn today? Write your insights before ending..."
            className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200 resize-none"
            rows={2}
          />
        </div>
      )}

      {/* Stats Overview - Only show if there's data */}
      {!isFirstTime && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-mono text-gold-400">{stats.streak}</div>
            <p className="text-zen-500 text-sm">Day Streak 🔥</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-mono text-zen-200">{stats.weeklyTime}m</div>
            <p className="text-zen-500 text-sm">This Week</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-mono text-zen-200">{stats.totalNotes}</div>
            <p className="text-zen-500 text-sm">Notes</p>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-mono text-zen-200">{progress.puzzlesSolved}</div>
            <p className="text-zen-500 text-sm">Puzzles Solved</p>
          </div>
        </div>
      )}

      {/* Quick Actions - when no session active */}
      {!currentSession && (
        <div className="glass-card p-5">
          <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button 
              onClick={() => navigate('/play')}
              className="p-4 text-center bg-zen-900/50 rounded-lg hover:bg-zen-800/50 transition-all"
            >
              <span className="text-2xl block mb-2">♟</span>
              <span className="text-zen-300 text-sm">Play Game</span>
            </button>
            <button 
              onClick={() => navigate('/train')}
              className="p-4 text-center bg-zen-900/50 rounded-lg hover:bg-zen-800/50 transition-all"
            >
              <span className="text-2xl block mb-2">🎯</span>
              <span className="text-zen-300 text-sm">Solve Puzzles</span>
            </button>
            <button 
              onClick={() => navigate('/notes')}
              className="p-4 text-center bg-zen-900/50 rounded-lg hover:bg-zen-800/50 transition-all"
            >
              <span className="text-2xl block mb-2">📝</span>
              <span className="text-zen-300 text-sm">Add Note</span>
            </button>
            <button 
              onClick={() => setShowMoodLog(true)}
              className="p-4 text-center bg-zen-900/50 rounded-lg hover:bg-zen-800/50 transition-all"
            >
              <span className="text-2xl block mb-2">🧘</span>
              <span className="text-zen-300 text-sm">Log Mood</span>
            </button>
          </div>
        </div>
      )}

      {/* Mood Log Modal */}
      {showMoodLog && (
        <MoodLogModal onClose={() => setShowMoodLog(false)} />
      )}

      {/* Main content grid - Only show if there's data */}
      {!isFirstTime && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Mental Performance */}
          <div className="glass-card p-5">
            <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-4">Mental Performance (7 days)</h3>
            
            {stats.totalGamesLogged === 0 ? (
              <div className="text-center py-6">
                <p className="text-zen-500 text-sm mb-3">No mood data yet</p>
                <button 
                  onClick={() => setShowMoodLog(true)}
                  className="zen-button text-sm"
                >
                  Log Your First Mood
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zen-400">Average Mood</span>
                    <span className="text-zen-200">{stats.avgMood}/5</span>
                  </div>
                  <div className="h-2 bg-zen-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 transition-all"
                      style={{ width: `${(stats.avgMood / 5) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-zen-400">Tilt Rate</span>
                    <span className={stats.tiltRate > 30 ? 'text-red-400' : 'text-emerald-400'}>
                      {stats.tiltRate}%
                    </span>
                  </div>
                  <div className="h-2 bg-zen-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${stats.tiltRate > 30 ? 'bg-red-500' : 'bg-emerald-500'}`}
                      style={{ width: `${stats.tiltRate}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Focus Areas */}
          <div className="glass-card p-5">
            <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-4">
              Focus Areas
            </h3>
            
            {criticalWeaknesses.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-zen-500 text-sm mb-3">No weaknesses detected yet</p>
                <p className="text-zen-600 text-xs">Add mistakes from your games to identify patterns</p>
                <button 
                  onClick={() => navigate('/mistakes')}
                  className="zen-button text-sm mt-3"
                >
                  Go to Mistake Library
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {criticalWeaknesses.slice(0, 4).map((weakness) => (
                  <div key={weakness.id} className="flex items-center justify-between p-3 bg-zen-900/50 rounded-lg">
                    <div>
                      <p className="text-zen-200 text-sm">{weakness.description}</p>
                      <p className="text-zen-600 text-xs">
                        {weakness.occurrences} occurrences
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      weakness.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                      weakness.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {weakness.severity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Sessions Timeline */}
      {recentSessions.length > 0 && (
        <div className="glass-card p-5">
          <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-4">Recent Sessions</h3>
          <div className="space-y-3">
            {recentSessions.map((session) => (
              <div key={session.id} className="flex items-start gap-4 p-3 bg-zen-900/30 rounded-lg">
                <div className="w-20 flex-shrink-0">
                  <p className="text-zen-300 text-sm font-medium">{formatDate(session.date)}</p>
                  {session.endTime && (
                    <p className="text-zen-600 text-xs">
                      {formatDuration(session.endTime - session.startTime)}
                    </p>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap gap-3 text-sm">
                    {session.gamesPlayed > 0 && (
                      <span className="text-zen-400">♟ {session.gamesPlayed} games</span>
                    )}
                    {session.puzzlesSolved > 0 && (
                      <span className="text-emerald-400">✓ {session.puzzlesSolved} puzzles</span>
                    )}
                    {session.puzzlesFailed > 0 && (
                      <span className="text-red-400/70">✗ {session.puzzlesFailed}</span>
                    )}
                    {session.notesCreated > 0 && (
                      <span className="text-gold-400">📝 {session.notesCreated} notes</span>
                    )}
                    {session.gamesPlayed === 0 && session.puzzlesSolved === 0 && session.notesCreated === 0 && (
                      <span className="text-zen-600 italic">No activity</span>
                    )}
                  </div>
                  
                  {session.sessionNotes && (
                    <p className="text-zen-500 text-xs mt-2 italic">"{session.sessionNotes}"</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Mood Log Modal
function MoodLogModal({ onClose }: { onClose: () => void }) {
  const { logGame } = useMentalGameStore();
  const [mood, setMood] = useState(3);
  const [focus, setFocus] = useState(3);
  const [notes, setNotes] = useState('');

  const handleLog = () => {
    logGame({
      gameId: `mood_${Date.now()}`,
      preGameMood: mood as 1 | 2 | 3 | 4 | 5,
      preGameFocus: focus as 1 | 2 | 3 | 4 | 5,
      preGameNotes: notes,
      peakTilt: 0,
      postGameMood: mood as 1 | 2 | 3 | 4 | 5,
    });
    onClose();
  };

  const moodEmojis = ['😞', '😕', '😐', '🙂', '😊'];
  const focusLabels = ['Scattered', 'Distracted', 'Okay', 'Focused', 'Locked In'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zen-950/90 backdrop-blur-sm">
      <div className="glass-card p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-serif text-zen-200 mb-4">How Are You Feeling?</h3>
        <p className="text-zen-500 text-sm mb-6">
          Tracking your mental state helps identify patterns in your performance.
        </p>
        
        <div className="space-y-6 mb-6">
          {/* Mood */}
          <div>
            <label className="text-zen-400 text-sm block mb-3">Mood</label>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setMood(level)}
                  className={`flex-1 py-3 rounded-lg text-2xl transition-all ${
                    mood === level
                      ? 'bg-gold-500/20 border border-gold-500/50'
                      : 'bg-zen-800/50 hover:bg-zen-700/50'
                  }`}
                >
                  {moodEmojis[level - 1]}
                </button>
              ))}
            </div>
          </div>

          {/* Focus */}
          <div>
            <label className="text-zen-400 text-sm block mb-3">Focus Level</label>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setFocus(level)}
                  className={`flex-1 py-2 rounded-lg text-xs transition-all ${
                    focus === level
                      ? 'bg-gold-500/20 border border-gold-500/50 text-gold-400'
                      : 'bg-zen-800/50 hover:bg-zen-700/50 text-zen-400'
                  }`}
                >
                  {focusLabels[level - 1]}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-zen-400 text-sm block mb-2">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything affecting your state today?"
              className="w-full px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200 resize-none"
              rows={2}
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <button onClick={handleLog} className="zen-button-primary flex-1">
            Log Mood
          </button>
          <button onClick={onClose} className="zen-button-ghost flex-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyDashboard;
