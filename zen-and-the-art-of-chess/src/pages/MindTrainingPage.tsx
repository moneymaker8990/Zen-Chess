import { useState, useEffect, useCallback } from 'react';
import { useProgressStore } from '@/state/useStore';
import { getDayByNumber, allDays, phaseInfo } from '@/data/days';
import { ChessBoardPanel } from '@/components/ChessBoardPanel';
import { logger } from '@/lib/logger';
import type { SacredText, Tradition, BreathingPattern } from '@/lib/types';

// ============================================
// MIND TRAINING PAGE - Simplified
// Daily spiritual wisdom, chess training, and meditation
// ============================================

type Tab = 'wisdom' | 'chess' | 'meditation';

const traditionNames: Record<Tradition, string> = {
  VIJNANA: 'Vijnana Bhairava Tantra',
  TAO: 'Tao Te Ching',
  UPANISHADS: 'Upanishads',
  GITA: 'Bhagavad Gita',
  ASHTAVAKRA: 'Ashtavakra Gita',
  YOGA_SUTRAS: 'Yoga Sutras',
  SHIVA_SUTRAS: 'Shiva Sutras',
  ZEN: 'Zen Buddhism',
  STOIC: 'Stoic Philosophy',
  ART_OF_WAR: 'The Art of War',
};

const traditionColors: Record<Tradition, string> = {
  VIJNANA: '#a78bfa',
  TAO: '#34d399',
  UPANISHADS: '#fbbf24',
  GITA: '#fb923c',
  ASHTAVAKRA: '#22d3d3',
  YOGA_SUTRAS: '#60a5fa',
  SHIVA_SUTRAS: '#fb7185',
  ZEN: '#a3e635',
  STOIC: '#cbd5e1',
  ART_OF_WAR: '#f87171',
};

// ============================================
// COMPONENTS
// ============================================

function SacredTextCard({ text }: { text: SacredText }) {
  return (
    <div className="card p-5">
      <h4
        className="text-xs uppercase tracking-wider mb-2"
        style={{ color: traditionColors[text.tradition] }}
      >
        {traditionNames[text.tradition]}
      </h4>

      <blockquote className="text-lg font-serif italic leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
        "{text.quote}"
      </blockquote>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
        {text.commentary}
      </p>

      {text.whyThisMatters && (
        <p className="text-sm mt-3 pt-3" style={{ color: 'var(--accent-gold)', borderTop: '1px solid var(--border-subtle)' }}>
          {text.whyThisMatters}
        </p>
      )}
    </div>
  );
}

function BreathingExercise({ pattern, name }: { pattern: BreathingPattern; name: string }) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdEmpty'>('inhale');
  const [timer, setTimer] = useState(pattern.inhale);

  useEffect(() => {
    if (!isActive) return;

    const phases = [
      { phase: 'inhale' as const, duration: pattern.inhale },
      { phase: 'hold' as const, duration: pattern.hold || 0 },
      { phase: 'exhale' as const, duration: pattern.exhale },
      { phase: 'holdEmpty' as const, duration: pattern.holdEmpty || 0 },
    ].filter(p => p.duration > 0);

    let currentPhaseIndex = 0;
    let timeInPhase = 0;

    setPhase(phases[0].phase);
    setTimer(phases[0].duration);

    const interval = setInterval(() => {
      timeInPhase++;
      setTimer(phases[currentPhaseIndex].duration - timeInPhase);

      if (timeInPhase >= phases[currentPhaseIndex].duration) {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        timeInPhase = 0;
        setPhase(phases[currentPhaseIndex].phase);
        setTimer(phases[currentPhaseIndex].duration);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, pattern]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'holdEmpty': return 'Rest';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'rgba(6, 182, 212, 0.4)';
      case 'exhale': return 'rgba(168, 85, 247, 0.4)';
      default: return 'rgba(251, 191, 36, 0.4)';
    }
  };

  if (!isActive) {
    return (
      <button
        onClick={() => setIsActive(true)}
        className="w-full card p-4 text-center hover:border-[var(--accent-primary)]/30 transition-colors"
      >
        <div className="text-2xl mb-2">🌬️</div>
        <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{name}</div>
        <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
          {pattern.inhale}s in • {pattern.hold ? `${pattern.hold}s hold • ` : ''}{pattern.exhale}s out
        </div>
      </button>
    );
  }

  return (
    <div className="card p-6 text-center">
      <div
        className="w-28 h-28 mx-auto rounded-full flex flex-col items-center justify-center transition-all duration-1000 mb-4"
        style={{
          background: `radial-gradient(circle, ${getPhaseColor()} 0%, transparent 70%)`,
          transform: phase === 'inhale' ? 'scale(1.15)' : phase === 'exhale' ? 'scale(0.85)' : 'scale(1)'
        }}
      >
        <div className="text-3xl font-display" style={{ color: 'var(--text-primary)' }}>{timer}</div>
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{getPhaseText()}</div>
      </div>
      <button onClick={() => setIsActive(false)} className="btn-ghost text-sm">
        Stop
      </button>
    </div>
  );
}

function MeditationTimer({ minutes, onComplete }: { minutes: number; onComplete?: () => void }) {
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(minutes * 60);
  const { addMeditationMinutes } = useProgressStore();

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsActive(false);
          addMeditationMinutes(minutes);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, minutes, addMeditationMinutes, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isActive) {
    return (
      <button
        onClick={() => { setTimeRemaining(minutes * 60); setIsActive(true); }}
        className="btn-primary w-full"
      >
        Start {minutes} min Meditation
      </button>
    );
  }

  return (
    <div className="text-center py-6">
      <div
        className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center"
        style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)' }}
      >
        <div className="text-4xl font-display" style={{ color: 'var(--accent-primary)' }}>
          {formatTime(timeRemaining)}
        </div>
      </div>
      <p className="text-sm font-serif italic mb-4" style={{ color: 'var(--text-secondary)' }}>
        Just breathe. Just be.
      </p>
      <div className="flex justify-center gap-3">
        <button onClick={() => setIsActive(false)} className="btn-ghost text-sm">Pause</button>
        <button
          onClick={() => {
            setIsActive(false);
            addMeditationMinutes(Math.ceil((minutes * 60 - timeRemaining) / 60));
            onComplete?.();
          }}
          className="btn-primary text-sm"
        >
          Complete
        </button>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function MindTrainingPage() {
  const { progress, setCurrentDay, completeDay, addMeditationMinutes } = useProgressStore();

  const [activeTab, setActiveTab] = useState<Tab>('wisdom');
  const [exerciseStarted, setExerciseStarted] = useState(false);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [meditationComplete, setMeditationComplete] = useState(false);

  const currentDayData = getDayByNumber(progress.currentDay);
  const currentPhase = currentDayData?.phase || 'CALM_MIND';
  const phaseData = phaseInfo[currentPhase];

  const handleDayChange = (dayNum: number) => {
    setCurrentDay(dayNum);
    setExerciseStarted(false);
    setExerciseComplete(false);
    setMeditationComplete(false);
  };

  const handleMeditationComplete = useCallback(() => {
    setMeditationComplete(true);
    if (currentDayData) {
      addMeditationMinutes(currentDayData.meditation.suggestedMinutes);
    }
  }, [currentDayData, addMeditationMinutes]);

  const handleDayComplete = () => {
    if (currentDayData) {
      completeDay(currentDayData.dayNumber);
      if (progress.currentDay < 365) {
        handleDayChange(progress.currentDay + 1);
      }
    }
  };

  if (!currentDayData) {
    return (
      <div className="card p-8 text-center">
        <p style={{ color: 'var(--text-tertiary)' }}>Day not found</p>
        <button onClick={() => setCurrentDay(1)} className="btn-primary mt-4">
          Start from Day 1
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in max-w-2xl mx-auto">
      {/* Compact Header */}
      <header className="text-center py-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <button
            onClick={() => handleDayChange(Math.max(1, progress.currentDay - 1))}
            disabled={progress.currentDay <= 1}
            className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] disabled:opacity-30 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            ←
          </button>
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Day {progress.currentDay}
            </p>
            <h1 className="text-xl font-display" style={{ color: 'var(--text-primary)' }}>
              {currentDayData.title}
            </h1>
          </div>
          <button
            onClick={() => handleDayChange(Math.min(365, progress.currentDay + 1))}
            disabled={progress.currentDay >= 365}
            className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] disabled:opacity-30 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            →
          </button>
        </div>
        <p className="text-sm font-serif italic" style={{ color: 'var(--text-tertiary)' }}>
          "{currentDayData.theme}"
        </p>
      </header>

      {/* Tab Navigation */}
      <nav className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
        {(['wisdom', 'chess', 'meditation'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all"
            style={{
              backgroundColor: activeTab === tab ? 'var(--bg-primary)' : 'transparent',
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
              boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.2)' : 'none'
            }}
          >
            {tab === 'wisdom' && '📖 Wisdom'}
            {tab === 'chess' && '♟️ Chess'}
            {tab === 'meditation' && '🧘 Meditate'}
          </button>
        ))}
      </nav>

      {/* WISDOM TAB */}
      {activeTab === 'wisdom' && (
        <div className="space-y-4">
          {currentDayData.sacredTexts.map((text, i) => (
            <SacredTextCard key={i} text={text} />
          ))}

          <div className="card p-5">
            <h3 className="font-serif text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
              {currentDayData.integratedReflection.title}
            </h3>
            <p className="text-sm leading-relaxed font-serif" style={{ color: 'var(--text-secondary)' }}>
              {currentDayData.integratedReflection.body}
            </p>
          </div>

          <div className="card p-4 text-center" style={{ borderLeft: '3px solid var(--accent-gold)' }}>
            <p className="text-sm font-serif italic" style={{ color: 'var(--text-secondary)' }}>
              {currentDayData.prayer}
            </p>
          </div>

          <div className="card p-4">
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
              Today's Action
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {currentDayData.dailyAction.instruction}
            </p>
          </div>
        </div>
      )}

      {/* CHESS TAB */}
      {activeTab === 'chess' && (
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-medium mb-2" style={{ color: 'var(--accent-gold)' }}>
              {currentDayData.chessConcept}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {currentDayData.chessApplication}
            </p>
            {currentDayData.chessWisdom && (
              <p className="text-sm italic mt-3 pt-3" style={{ color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-subtle)' }}>
                {currentDayData.chessWisdom}
              </p>
            )}
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Exercise
                </p>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {currentDayData.exerciseType.replace('_', ' ')}
                  {currentDayData.difficulty && ` • ${'★'.repeat(currentDayData.difficulty)}${'☆'.repeat(5 - currentDayData.difficulty)}`}
                </span>
              </div>
              {!exerciseStarted && (
                <button onClick={() => setExerciseStarted(true)} className="btn-primary text-sm">
                  Start
                </button>
              )}
            </div>

            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              {currentDayData.exerciseInstructions}
            </p>

            {exerciseStarted && (
              <div className="mt-4">
                <ChessBoardPanel
                  initialFen={currentDayData.fen}
                  puzzleMode={currentDayData.exerciseType === 'PUZZLE'}
                  puzzleSolution={currentDayData.solution}
                  vsEngine={currentDayData.exerciseType === 'CALM_PLAY' || currentDayData.exerciseType === 'MINDFUL_GAME'}
                  engineStrength={currentDayData.exerciseType === 'CALM_PLAY' ? 1 : 5}
                  playerColor="white"
                  onGameOver={(result) => {
                    logger.debug('Game completed:', result);
                    setExerciseComplete(true);
                  }}
                />

                {exerciseComplete && (
                  <div className="mt-3 p-3 rounded-lg text-center text-sm" style={{ background: 'rgba(74, 222, 128, 0.1)' }}>
                    <span style={{ color: 'var(--success)' }}>✓ Complete</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {currentDayData.tiltSignal && (
            <div className="card p-4" style={{ background: 'var(--bg-tertiary)' }}>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                Watch For
              </p>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {currentDayData.tiltSignal}
              </p>
              {currentDayData.tiltReframe && (
                <p className="text-sm font-serif italic mt-2" style={{ color: 'var(--text-secondary)' }}>
                  → {currentDayData.tiltReframe}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* MEDITATION TAB */}
      {activeTab === 'meditation' && (
        <div className="space-y-4">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                {currentDayData.meditation.title}
              </h3>
              <span className="text-xs px-2 py-1 rounded" style={{ background: 'var(--bg-tertiary)', color: 'var(--accent-gold)' }}>
                {currentDayData.meditation.suggestedMinutes} min
              </span>
            </div>

            {currentDayData.meditation.context && (
              <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
                {currentDayData.meditation.context}
              </p>
            )}

            <ol className="space-y-2 mb-4">
              {currentDayData.meditation.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-xs w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                    {i + 1}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{step}</span>
                </li>
              ))}
            </ol>

            <MeditationTimer
              minutes={currentDayData.meditation.suggestedMinutes}
              onComplete={handleMeditationComplete}
            />
          </div>

          {currentDayData.breathingExercise && (
            <BreathingExercise
              pattern={currentDayData.breathingExercise.pattern}
              name={currentDayData.breathingExercise.name}
            />
          )}

          {meditationComplete && (
            <div className="card p-5 text-center" style={{ border: '1px solid rgba(74, 222, 128, 0.3)' }}>
              <div className="text-xl mb-2" style={{ color: 'var(--success)' }}>✓</div>
              <p className="text-sm mb-3" style={{ color: 'var(--success)' }}>Meditation Complete</p>
              <button onClick={handleDayComplete} className="btn-primary">
                Complete Day {currentDayData.dayNumber}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MindTrainingPage;
