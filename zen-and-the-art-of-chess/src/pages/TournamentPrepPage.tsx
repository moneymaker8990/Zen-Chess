// ============================================
// TOURNAMENT PREPARATION PAGE
// Structured countdown and preparation for tournaments
// ============================================

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useTournamentStore, 
  useActiveTournament, 
  useTodaysPlan,
  useDaysRemaining,
} from '@/state/tournamentStore';
import type { 
  TournamentFormat, 
  PrepPhase,
  PrepActivity,
  WarmupStep,
} from '@/lib/tournamentTypes';
import { PHASE_CONFIGS, DEFAULT_AFFIRMATIONS } from '@/lib/tournamentTypes';

// ============================================
// CREATE TOURNAMENT FORM
// ============================================

function CreateTournamentForm({ onClose }: { onClose?: () => void }) {
  const { createTournament } = useTournamentStore();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [format, setFormat] = useState<TournamentFormat>('classical');
  const [timeControl, setTimeControl] = useState('');
  const [rounds, setRounds] = useState<number | ''>('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) return;
    
    createTournament({
      name,
      startDate: new Date(date).getTime(),
      format,
      timeControl: timeControl || undefined,
      rounds: rounds ? Number(rounds) : undefined,
      location: location || undefined,
    });
    
    onClose?.();
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tournament Name */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          Tournament Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., City Chess Championship 2025"
          className="zen-input"
          required
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          Tournament Date *
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={minDate}
          className="zen-input"
          required
        />
      </div>

      {/* Format */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          Format
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(['classical', 'rapid', 'blitz'] as TournamentFormat[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFormat(f)}
              className={`p-3 rounded-xl text-center transition-all ${
                format === f
                  ? 'ring-2 ring-[var(--accent-primary)]'
                  : 'hover:bg-[var(--bg-tertiary)]'
              }`}
              style={{ 
                background: format === f ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-secondary)',
              }}
            >
              <div className="text-2xl mb-1">
                {f === 'classical' ? '♔' : f === 'rapid' ? '⚡' : '🔥'}
              </div>
              <div className="text-sm capitalize" style={{ color: 'var(--text-primary)' }}>
                {f}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {f === 'classical' ? '90+30' : f === 'rapid' ? '15+10' : '3+2'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Optional fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Time Control (optional)
          </label>
          <input
            type="text"
            value={timeControl}
            onChange={(e) => setTimeControl(e.target.value)}
            placeholder="e.g., 90+30"
            className="zen-input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Rounds (optional)
          </label>
          <input
            type="number"
            value={rounds}
            onChange={(e) => setRounds(e.target.value ? Number(e.target.value) : '')}
            placeholder="e.g., 9"
            min={1}
            className="zen-input"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          Location (optional)
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., City Convention Center"
          className="zen-input"
        />
      </div>

      <button
        type="submit"
        disabled={!name || !date}
        className="zen-button w-full"
      >
        🏆 Create Tournament Prep
      </button>
    </form>
  );
}

// ============================================
// PHASE INDICATOR
// ============================================

function PhaseIndicator({ currentPhase }: { currentPhase: PrepPhase }) {
  const phases: PrepPhase[] = ['deep', 'sharpen', 'taper', 'gameday'];
  
  return (
    <div className="flex items-center gap-2">
      {phases.map((phase, index) => {
        const config = PHASE_CONFIGS[phase];
        const isCurrent = phase === currentPhase;
        const isPast = phases.indexOf(currentPhase) > index;
        
        return (
          <div key={phase} className="flex items-center">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                isCurrent ? 'ring-2 ring-white/20' : ''
              }`}
              style={{
                background: isCurrent 
                  ? config.color 
                  : isPast 
                    ? 'rgba(74, 222, 128, 0.2)' 
                    : 'var(--bg-tertiary)',
                color: isCurrent ? 'white' : isPast ? '#4ade80' : 'var(--text-muted)',
              }}
            >
              <span>{config.icon}</span>
              <span className="hidden sm:inline capitalize">{phase}</span>
            </div>
            {index < phases.length - 1 && (
              <div 
                className="w-4 h-0.5 mx-1"
                style={{ 
                  background: isPast ? '#4ade80' : 'var(--border-default)',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================
// COUNTDOWN DISPLAY
// ============================================

function CountdownDisplay({ days, phase }: { days: number; phase: PrepPhase }) {
  const config = PHASE_CONFIGS[phase];
  
  return (
    <div className="text-center py-8">
      <div 
        className="inline-flex items-center justify-center w-32 h-32 rounded-full mb-4"
        style={{ 
          background: `linear-gradient(135deg, ${config.color}20, ${config.color}40)`,
          boxShadow: `0 0 60px ${config.color}30`,
        }}
      >
        <div>
          <div 
            className="text-5xl font-bold"
            style={{ color: config.color }}
          >
            {days}
          </div>
          <div className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            {days === 1 ? 'day' : 'days'}
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
        {phase === 'gameday' ? "It's Game Day!" : `${days} Days Until Tournament`}
      </h2>
      <p className="text-sm max-w-md mx-auto" style={{ color: 'var(--text-tertiary)' }}>
        {config.description}
      </p>
    </div>
  );
}

// ============================================
// ACTIVITY CARD
// ============================================

function ActivityCard({ 
  activity, 
  onComplete, 
  onStart 
}: { 
  activity: PrepActivity; 
  onComplete: () => void;
  onStart: () => void;
}) {
  const iconMap: Record<string, string> = {
    opening: '♟️',
    tactics: '⚔️',
    patterns: '🎯',
    endgame: '👑',
    analysis: '🔬',
    mental: '🧘',
    rest: '😴',
  };

  const priorityColors = {
    required: 'var(--accent-primary)',
    recommended: 'var(--accent-gold)',
    optional: 'var(--text-muted)',
  };

  return (
    <div 
      className={`p-4 rounded-xl transition-all ${
        activity.completed ? 'opacity-60' : ''
      }`}
      style={{ background: 'var(--bg-tertiary)' }}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <button
          onClick={onComplete}
          disabled={activity.completed}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
            activity.completed
              ? 'bg-[#4ade80]/20 text-[#4ade80]'
              : 'border-2 border-[var(--border-default)] hover:border-[var(--accent-primary)]'
          }`}
        >
          {activity.completed && '✓'}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{iconMap[activity.type] || '📋'}</span>
            <h4 
              className={`font-medium ${activity.completed ? 'line-through' : ''}`}
              style={{ color: 'var(--text-primary)' }}
            >
              {activity.title}
            </h4>
            {activity.priority === 'required' && (
              <span 
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ 
                  background: 'rgba(168, 85, 247, 0.15)',
                  color: priorityColors[activity.priority],
                }}
              >
                Required
              </span>
            )}
          </div>
          <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
            {activity.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {activity.duration > 0 ? `${activity.duration} min` : ''}
            </span>
            {!activity.completed && activity.route && (
              <button
                onClick={onStart}
                className="text-sm px-3 py-1 rounded-lg transition-all"
                style={{ 
                  background: 'var(--accent-primary)',
                  color: 'white',
                }}
              >
                Start →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// WARMUP ROUTINE VIEW
// ============================================

function WarmupRoutineView() {
  const tournament = useActiveTournament();
  const { 
    startWarmup, 
    completeWarmupStep, 
    resetWarmup,
    warmupInProgress,
    currentWarmupStep,
  } = useTournamentStore();
  
  if (!tournament) return null;

  const routine = tournament.warmupRoutine;
  const allComplete = routine.every(s => s.completed);
  const totalDuration = routine.reduce((sum, s) => sum + s.duration, 0);

  const stepIcons: Record<string, string> = {
    breathing: '🫁',
    meditation: '🧘',
    visualization: '👁️',
    puzzles: '🧩',
    openingReview: '♟️',
    affirmation: '💭',
    stretch: '🤸',
    custom: '✨',
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
            Pre-Game Warmup
          </h3>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {Math.ceil(totalDuration / 60)} minutes total
          </p>
        </div>
        {warmupInProgress ? (
          <button onClick={resetWarmup} className="btn-ghost text-sm">
            Reset
          </button>
        ) : (
          <button onClick={startWarmup} className="zen-button">
            {allComplete ? 'Restart' : 'Begin Warmup'}
          </button>
        )}
      </div>

      <div className="space-y-3">
        {routine.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
              warmupInProgress && index === currentWarmupStep
                ? 'ring-2 ring-[var(--accent-primary)]'
                : ''
            }`}
            style={{ 
              background: step.completed 
                ? 'rgba(74, 222, 128, 0.1)' 
                : 'var(--bg-tertiary)',
            }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ 
                background: step.completed 
                  ? 'rgba(74, 222, 128, 0.2)' 
                  : 'var(--bg-secondary)',
              }}
            >
              {step.completed ? '✓' : stepIcons[step.type] || '📋'}
            </div>
            
            <div className="flex-1">
              <h4 
                className={`font-medium ${step.completed ? 'line-through opacity-60' : ''}`}
                style={{ color: 'var(--text-primary)' }}
              >
                {step.label}
              </h4>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {Math.ceil(step.duration / 60)} min
              </p>
            </div>

            {warmupInProgress && index === currentWarmupStep && !step.completed && (
              <button
                onClick={() => completeWarmupStep(step.id)}
                className="zen-button text-sm"
              >
                Complete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Affirmation */}
      <div 
        className="mt-6 p-4 rounded-xl text-center"
        style={{ background: 'rgba(168, 85, 247, 0.1)' }}
      >
        <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
          "{tournament.affirmation}"
        </p>
      </div>
    </div>
  );
}

// ============================================
// SETTINGS PANEL
// ============================================

function SettingsPanel({ onClose }: { onClose: () => void }) {
  const tournament = useActiveTournament();
  const { updateAffirmation, completeTournament, deleteTournament } = useTournamentStore();
  const [affirmation, setAffirmation] = useState(tournament?.affirmation || '');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!tournament) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)' }}>
      <div 
        className="w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium" style={{ color: 'var(--text-primary)' }}>
            Tournament Settings
          </h2>
          <button onClick={onClose} className="text-2xl" style={{ color: 'var(--text-muted)' }}>
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Affirmation */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              Personal Affirmation
            </label>
            <textarea
              value={affirmation}
              onChange={(e) => setAffirmation(e.target.value)}
              className="zen-input min-h-[80px]"
              placeholder="Your pre-game affirmation..."
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateAffirmation(affirmation)}
                className="zen-button text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  const random = DEFAULT_AFFIRMATIONS[Math.floor(Math.random() * DEFAULT_AFFIRMATIONS.length)];
                  setAffirmation(random);
                }}
                className="btn-ghost text-sm"
              >
                Random
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t" style={{ borderColor: 'var(--border-default)' }}>
            <button
              onClick={() => {
                completeTournament(tournament.id);
                onClose();
              }}
              className="w-full mb-3 p-3 rounded-xl text-left transition-all hover:bg-[var(--bg-tertiary)]"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">✅</span>
                <div>
                  <div style={{ color: 'var(--text-primary)' }}>Complete Tournament</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Mark as finished and archive</div>
                </div>
              </div>
            </button>

            {!showConfirmDelete ? (
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="w-full p-3 rounded-xl text-left transition-all hover:bg-red-500/10"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🗑️</span>
                  <div>
                    <div style={{ color: '#ef4444' }}>Delete Tournament</div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Remove permanently</div>
                  </div>
                </div>
              </button>
            ) : (
              <div className="p-4 rounded-xl" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                <p className="text-sm mb-3" style={{ color: '#ef4444' }}>
                  Are you sure? This cannot be undone.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      deleteTournament(tournament.id);
                      onClose();
                    }}
                    className="px-4 py-2 rounded-lg text-sm"
                    style={{ background: '#ef4444', color: 'white' }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowConfirmDelete(false)}
                    className="btn-ghost text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export function TournamentPrepPage() {
  const navigate = useNavigate();
  const tournament = useActiveTournament();
  const todaysPlan = useTodaysPlan();
  const daysRemaining = useDaysRemaining();
  const { getPhase, completeActivity, getOverallProgress } = useTournamentStore();
  
  const [showSettings, setShowSettings] = useState(false);

  const phase = getPhase();
  const phaseConfig = PHASE_CONFIGS[phase];
  const progress = getOverallProgress();

  // Calculate today's completion
  const todayCompletion = useMemo(() => {
    if (!todaysPlan) return 0;
    const completed = todaysPlan.activities.filter(a => a.completed).length;
    return Math.round((completed / todaysPlan.activities.length) * 100);
  }, [todaysPlan]);

  // No active tournament - show create form
  if (!tournament) {
    return (
      <div className="space-y-8 animate-fade-in">
        <section className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
            Tournament Preparation
          </h1>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'var(--text-tertiary)' }}>
            Create a structured countdown to your next tournament. 
            We'll guide you through phased preparation with daily focus areas.
          </p>
        </section>

        <div className="max-w-lg mx-auto">
          <div className="card p-6">
            <h2 className="text-xl font-medium mb-6" style={{ color: 'var(--text-primary)' }}>
              Create Tournament
            </h2>
            <CreateTournamentForm />
          </div>
        </div>
      </div>
    );
  }

  // Active tournament view
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <section className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🏆</span>
            <h1 className="text-2xl lg:text-3xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
              {tournament.name}
            </h1>
          </div>
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span className="capitalize">{tournament.format}</span>
            {tournament.timeControl && <span>• {tournament.timeControl}</span>}
            {tournament.rounds && <span>• {tournament.rounds} rounds</span>}
            {tournament.location && <span>• {tournament.location}</span>}
          </div>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="btn-ghost"
        >
          ⚙️ Settings
        </button>
      </section>

      {/* Phase indicator */}
      <section className="flex justify-center">
        <PhaseIndicator currentPhase={phase} />
      </section>

      {/* Countdown */}
      <section>
        <CountdownDisplay days={daysRemaining} phase={phase} />
      </section>

      {/* Progress bar */}
      <section className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Overall Preparation Progress
          </span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            {progress}%
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-tertiary)' }}>
          <div 
            className="h-full rounded-full transition-all duration-500"
            style={{ 
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${phaseConfig.color}, ${phaseConfig.color}cc)`,
            }}
          />
        </div>
      </section>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Plan */}
        <section className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                Today's Focus
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {todaysPlan?.totalMinutes || 0} minutes • {phaseConfig.intensity} intensity
              </p>
            </div>
            <div 
              className="text-2xl font-bold"
              style={{ color: todayCompletion === 100 ? '#4ade80' : 'var(--text-primary)' }}
            >
              {todayCompletion}%
            </div>
          </div>

          {/* Mental focus */}
          {todaysPlan?.mentalFocus && (
            <div 
              className="p-3 rounded-lg mb-4 text-center"
              style={{ background: 'rgba(168, 85, 247, 0.1)' }}
            >
              <p className="text-sm italic" style={{ color: 'var(--text-secondary)' }}>
                💭 {todaysPlan.mentalFocus}
              </p>
            </div>
          )}

          {/* Activities */}
          <div className="space-y-3">
            {todaysPlan?.activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onComplete={() => completeActivity(activity.id)}
                onStart={() => activity.route && navigate(activity.route)}
              />
            ))}
          </div>
        </section>

        {/* Right column */}
        <div className="space-y-6">
          {/* Warmup routine (show prominently on game day) */}
          {phase === 'gameday' || phase === 'taper' ? (
            <WarmupRoutineView />
          ) : null}

          {/* Priority openings */}
          <section className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                Priority Openings
              </h3>
              <button 
                onClick={() => navigate('/openings')}
                className="text-sm"
                style={{ color: 'var(--accent-primary)' }}
              >
                + Add
              </button>
            </div>
            
            {tournament.priorityOpenings.length > 0 ? (
              <div className="space-y-2">
                {tournament.priorityOpenings.map((opening) => (
                  <div 
                    key={opening.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: 'var(--bg-tertiary)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className={opening.color === 'white' ? '♔' : '♚'}></span>
                      <span style={{ color: 'var(--text-primary)' }}>{opening.name}</span>
                    </div>
                    <span 
                      className="text-xs px-2 py-0.5 rounded-full capitalize"
                      style={{ 
                        background: opening.priority === 'critical' 
                          ? 'rgba(239, 68, 68, 0.15)' 
                          : 'var(--bg-secondary)',
                        color: opening.priority === 'critical' 
                          ? '#ef4444' 
                          : 'var(--text-muted)',
                      }}
                    >
                      {opening.priority}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-center py-4" style={{ color: 'var(--text-muted)' }}>
                No openings added yet. Add the lines you want to focus on.
              </p>
            )}
          </section>

          {/* Quick actions */}
          <section className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/train')}
              className="card p-4 text-left hover:scale-[1.02] transition-all"
            >
              <div className="text-2xl mb-2">⚔️</div>
              <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Puzzles</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Sharpen tactics</div>
            </button>
            
            <button
              onClick={() => navigate('/patterns')}
              className="card p-4 text-left hover:scale-[1.02] transition-all"
            >
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Patterns</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Pattern training</div>
            </button>
            
            <button
              onClick={() => navigate('/openings')}
              className="card p-4 text-left hover:scale-[1.02] transition-all"
            >
              <div className="text-2xl mb-2">♟️</div>
              <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Openings</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Drill repertoire</div>
            </button>
            
            <button
              onClick={() => navigate('/calm')}
              className="card p-4 text-left hover:scale-[1.02] transition-all"
            >
              <div className="text-2xl mb-2">🧘</div>
              <div className="font-medium" style={{ color: 'var(--text-primary)' }}>Mental</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Calm & focus</div>
            </button>
          </section>

          {/* Warmup routine (collapsed on non-gameday) */}
          {phase !== 'gameday' && phase !== 'taper' && (
            <WarmupRoutineView />
          )}
        </div>
      </div>

      {/* Settings modal */}
      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}

export default TournamentPrepPage;




