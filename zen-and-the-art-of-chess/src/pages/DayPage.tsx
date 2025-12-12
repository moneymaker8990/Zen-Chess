import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/state/useStore';
import { getDayByNumber, allDays, phaseInfo } from '@/data/days';
import { ChessBoardPanel } from '@/components/ChessBoardPanel';
import { MeditationPanel } from '@/components/MeditationPanel';
import { logger } from '@/lib/logger';
import type { ZenChessDay, SacredText, Tradition, BreathingPattern } from '@/lib/types';

// ============================================
// UNIFIED DAILY PRACTICE PAGE
// Combines spiritual wisdom, chess training, and meditation
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

const BREATHING_PATTERNS: Array<{ name: string; pattern: BreathingPattern; purpose: string }> = [
  { 
    name: 'Box Breathing', 
    pattern: { inhale: 4, hold: 4, exhale: 4, holdEmpty: 4 }, 
    purpose: 'Calm before critical moves'
  },
  { 
    name: '4-7-8 Relaxation', 
    pattern: { inhale: 4, hold: 7, exhale: 8 }, 
    purpose: 'Release tilt and frustration'
  },
  { 
    name: 'Coherent Breathing', 
    pattern: { inhale: 5, exhale: 5 }, 
    purpose: 'Sustained focus'
  },
];

function SacredTextCard({ text }: { text: SacredText }) {
  return (
    <div className="card p-6 mb-4 animate-fade-in">
      <h4 
        className="text-sm uppercase tracking-wider mb-3"
        style={{ color: traditionColors[text.tradition] }}
      >
        {traditionNames[text.tradition]}
      </h4>
      
      <blockquote className="text-xl font-serif italic leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
        "{text.quote}"
      </blockquote>
      
      <p className="leading-relaxed mb-4" style={{ color: 'var(--text-tertiary)' }}>
        {text.commentary}
      </p>

      {text.context && (
        <p className="text-sm italic pl-4" style={{ color: 'var(--text-muted)', borderLeft: '2px solid var(--border-subtle)' }}>
          {text.context}
        </p>
      )}

      {text.whyThisMatters && (
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>Chess Application: </span>
            {text.whyThisMatters}
          </p>
        </div>
      )}
    </div>
  );
}

function BreathingTimer({ pattern, name }: { pattern: BreathingPattern; name: string }) {
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
      case 'holdEmpty': return 'Rest Empty';
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'rgba(6, 182, 212, 0.3)';
      case 'exhale': return 'rgba(168, 85, 247, 0.3)';
      default: return 'rgba(251, 191, 36, 0.3)';
    }
  };

  return (
    <div className="card p-6 text-center">
      <h4 className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{name}</h4>
      <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
        In: {pattern.inhale}s {pattern.hold ? `• Hold: ${pattern.hold}s ` : ''}• Out: {pattern.exhale}s
      </p>

      {!isActive ? (
        <button onClick={() => setIsActive(true)} className="btn-primary">
          Start Breathing
        </button>
      ) : (
        <div className="space-y-4">
          <div 
            className="w-32 h-32 mx-auto rounded-full flex flex-col items-center justify-center transition-all duration-1000"
            style={{ 
              background: `radial-gradient(circle, ${getPhaseColor()} 0%, transparent 70%)`,
              transform: phase === 'inhale' ? 'scale(1.1)' : phase === 'exhale' ? 'scale(0.9)' : 'scale(1)'
            }}
          >
            <div className="text-3xl font-display" style={{ color: 'var(--text-primary)' }}>{timer}</div>
            <div className="text-sm font-serif" style={{ color: 'var(--text-secondary)' }}>{getPhaseText()}</div>
          </div>
          <button onClick={() => setIsActive(false)} className="btn-secondary">
            Stop
          </button>
        </div>
      )}
    </div>
  );
}

function MeditationTimer({ initialMinutes = 5, onComplete }: { initialMinutes?: number; onComplete?: () => void }) {
  const [selectedDuration, setSelectedDuration] = useState(initialMinutes);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(initialMinutes * 60);
  const { addMeditationMinutes } = useProgressStore();

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsActive(false);
          addMeditationMinutes(selectedDuration);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, selectedDuration, addMeditationMinutes, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setTimeRemaining(selectedDuration * 60);
    setIsActive(true);
  };

  return (
    <div className="card p-8 text-center">
      {!isActive ? (
        <>
          <div 
            className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
            style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
          >
            🧘
          </div>
          <h3 className="text-xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
            Meditation Timer
          </h3>
          <p className="mb-6" style={{ color: 'var(--text-tertiary)' }}>
            Sit comfortably. Close your eyes. Let thoughts pass like clouds.
          </p>
          
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {[3, 5, 10, 15, 20].map(mins => (
              <button
                key={mins}
                onClick={() => setSelectedDuration(mins)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: selectedDuration === mins ? 'rgba(168, 85, 247, 0.2)' : 'var(--bg-tertiary)',
                  color: selectedDuration === mins ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  border: selectedDuration === mins ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid transparent'
                }}
              >
                {mins} min
              </button>
            ))}
          </div>
          
          <button onClick={handleStart} className="btn-primary text-lg px-8 py-3">
            Begin Meditation
          </button>
        </>
      ) : (
        <>
          <div 
            className="w-48 h-48 mx-auto mb-8 rounded-full flex items-center justify-center"
            style={{ 
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
              animation: 'pulse 4s ease-in-out infinite'
            }}
          >
            <div className="text-5xl font-display" style={{ color: 'var(--accent-primary)' }}>
              {formatTime(timeRemaining)}
            </div>
          </div>
          
          <p className="text-lg font-serif italic mb-8" style={{ color: 'var(--text-secondary)' }}>
            Just breathe. Just be.
          </p>
          
          <div className="flex justify-center gap-4">
            <button onClick={() => setIsActive(false)} className="btn-secondary">
              Pause
            </button>
            <button 
              onClick={() => {
                setIsActive(false);
                addMeditationMinutes(Math.ceil((selectedDuration * 60 - timeRemaining) / 60));
              }}
              className="btn-primary"
            >
              Complete
            </button>
          </div>
          
          <div className="mt-8">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${((selectedDuration * 60 - timeRemaining) / (selectedDuration * 60)) * 100}%`,
                  background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))'
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function DayPage() {
  const navigate = useNavigate();
  const { progress, setCurrentDay, completeDay, addMeditationMinutes } = useProgressStore();
  
  const [activeTab, setActiveTab] = useState<Tab>('wisdom');
  const [exerciseStarted, setExerciseStarted] = useState(false);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [meditationComplete, setMeditationComplete] = useState(false);

  const currentDayData = getDayByNumber(progress.currentDay);
  const currentPhase = currentDayData?.phase || 'CALM_MIND';
  const phaseData = phaseInfo[currentPhase];

  const handlePreviousDay = () => {
    if (progress.currentDay > 1) {
      setCurrentDay(progress.currentDay - 1);
      setExerciseStarted(false);
      setExerciseComplete(false);
      setMeditationComplete(false);
    }
  };

  const handleNextDay = () => {
    if (progress.currentDay < 365) {
      setCurrentDay(progress.currentDay + 1);
      setExerciseStarted(false);
      setExerciseComplete(false);
      setMeditationComplete(false);
    }
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
        setCurrentDay(progress.currentDay + 1);
        setExerciseStarted(false);
        setExerciseComplete(false);
        setMeditationComplete(false);
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
    <div className="space-y-6 animate-fade-in px-2 sm:px-0">
      {/* Header */}
      <header className="text-center py-6 card">
        <p className="text-sm uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
          Day {progress.currentDay} of 365
        </p>
        <p className="text-sm mb-3" style={{ color: traditionColors[currentDayData.sacredTexts[0]?.tradition] || 'var(--text-tertiary)' }}>
          {currentDayData.sacredTexts[0]?.tradition && traditionNames[currentDayData.sacredTexts[0].tradition]}
          {phaseData && ` • ${phaseData.name}`}
        </p>
        <h1 className="text-2xl sm:text-3xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
          {currentDayData.title}
        </h1>
        <p className="text-lg font-serif italic" style={{ color: 'var(--text-tertiary)' }}>
          "{currentDayData.theme}"
        </p>
      </header>

      {/* Day navigation */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={handlePreviousDay}
          disabled={progress.currentDay <= 1}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed text-sm"
        >
          ← Previous
        </button>

        <select
          value={progress.currentDay}
          onChange={(e) => {
            setCurrentDay(parseInt(e.target.value));
            setExerciseStarted(false);
            setExerciseComplete(false);
            setMeditationComplete(false);
          }}
          className="px-3 py-2 rounded-lg text-sm"
          style={{ 
            backgroundColor: 'var(--bg-tertiary)', 
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          {allDays.map((day) => (
            <option key={day.dayNumber} value={day.dayNumber}>
              Day {day.dayNumber}: {day.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleNextDay}
          disabled={progress.currentDay >= 365}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed text-sm"
        >
          Next →
        </button>
      </div>

      {/* Tab Navigation */}
      <nav className="flex gap-2 justify-center flex-wrap">
        {(['wisdom', 'chess', 'meditation'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 sm:px-6 py-3 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: activeTab === tab ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
              color: activeTab === tab ? 'var(--accent-gold)' : 'var(--text-tertiary)',
              border: activeTab === tab ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid transparent'
            }}
          >
            {tab === 'wisdom' && '📖 Sacred Wisdom'}
            {tab === 'chess' && '♟️ Chess Practice'}
            {tab === 'meditation' && '🧘 Meditation'}
          </button>
        ))}
      </nav>

      {/* ==================== WISDOM TAB ==================== */}
      {activeTab === 'wisdom' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {currentDayData.sacredTexts.map((text, i) => (
            <SacredTextCard key={i} text={text} />
          ))}

          {/* Integrated Reflection */}
          <div className="card p-6 sm:p-8">
            <h2 className="text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              Integrated Reflection
            </h2>
            <h3 className="text-xl sm:text-2xl font-serif mb-4" style={{ color: 'var(--text-primary)' }}>
              {currentDayData.integratedReflection.title}
            </h3>
            <div className="leading-relaxed whitespace-pre-line font-serif" style={{ color: 'var(--text-secondary)' }}>
              {currentDayData.integratedReflection.body}
            </div>
          </div>

          {/* Prayer */}
          <div className="card p-6 text-center" style={{ borderLeft: '2px solid var(--accent-gold)' }}>
            <h2 className="text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              Prayer
            </h2>
            <p className="text-lg sm:text-xl font-serif italic leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {currentDayData.prayer}
            </p>
          </div>

          {/* Daily Action */}
          <div className="card p-6">
            <h2 className="text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
              Daily Action
            </h2>
            <p className="font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              {currentDayData.dailyAction.instruction}
            </p>
            {currentDayData.dailyAction.context && (
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {currentDayData.dailyAction.context}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ==================== CHESS TAB ==================== */}
      {activeTab === 'chess' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Chess Concept */}
          <div className="card p-6">
            <h2 className="text-sm uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
              Chess Concept
            </h2>
            <h3 className="text-xl font-serif mb-3" style={{ color: 'var(--accent-gold)' }}>
              {currentDayData.chessConcept}
            </h3>
            <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              {currentDayData.chessApplication}
            </p>
            {currentDayData.chessWisdom && (
              <blockquote className="italic pl-4" style={{ color: 'var(--text-tertiary)', borderLeft: '2px solid rgba(251, 191, 36, 0.3)' }}>
                {currentDayData.chessWisdom}
              </blockquote>
            )}
          </div>

          {/* Exercise */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-sm uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                  Today's Exercise
                </h2>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {currentDayData.exerciseType.replace('_', ' ')} 
                  {currentDayData.difficulty && ` • ${'★'.repeat(currentDayData.difficulty)}${'☆'.repeat(5 - currentDayData.difficulty)}`}
                </span>
              </div>
              {!exerciseStarted && (
                <button onClick={() => setExerciseStarted(true)} className="btn-primary">
                  Begin Exercise
                </button>
              )}
            </div>

            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
              {currentDayData.exerciseInstructions}
            </p>

            {currentDayData.exerciseContext && (
              <p className="text-sm italic mb-4" style={{ color: 'var(--text-muted)' }}>
                {currentDayData.exerciseContext}
              </p>
            )}

            {exerciseStarted && (
              <div className="mt-6">
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
                  <div className="mt-4 p-4 rounded-lg text-center" style={{ backgroundColor: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
                    <p className="font-serif" style={{ color: 'var(--success)' }}>
                      ✓ Exercise complete
                    </p>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                      Remember: the outcome matters less than the awareness you brought.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tilt Signal */}
          {currentDayData.tiltSignal && (
            <div className="card p-5" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <h3 className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                Watch For
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
                {currentDayData.tiltSignal}
              </p>
              {currentDayData.tiltReframe && (
                <>
                  <h3 className="text-xs uppercase tracking-wider mb-2 mt-4" style={{ color: 'var(--text-muted)' }}>
                    Reframe
                  </h3>
                  <p className="text-sm font-serif italic" style={{ color: 'var(--text-secondary)' }}>
                    {currentDayData.tiltReframe}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* ==================== MEDITATION TAB ==================== */}
      {activeTab === 'meditation' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Today's Meditation */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-sm uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                  Today's Meditation
                </h2>
                <h3 className="text-xl font-serif" style={{ color: 'var(--text-primary)' }}>
                  {currentDayData.meditation.title}
                </h3>
              </div>
              <span className="text-sm" style={{ color: 'var(--accent-gold)' }}>
                {currentDayData.meditation.suggestedMinutes} min
              </span>
            </div>

            {currentDayData.meditation.context && (
              <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                {currentDayData.meditation.context}
              </p>
            )}

            <ol className="space-y-4 mb-6">
              {currentDayData.meditation.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                    style={{ 
                      backgroundColor: 'var(--bg-tertiary)', 
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{step}</span>
                </li>
              ))}
            </ol>

            <MeditationPanel
              title={currentDayData.meditation.title}
              steps={currentDayData.meditation.steps}
              purpose={currentDayData.meditation.context || ''}
              duration={currentDayData.meditation.suggestedMinutes}
              breathingPattern={currentDayData.breathingExercise?.pattern}
              onComplete={handleMeditationComplete}
            />
          </div>

          {/* Quick Meditation Timer */}
          <MeditationTimer 
            initialMinutes={currentDayData.meditation.suggestedMinutes}
            onComplete={handleMeditationComplete}
          />

          {/* Breathing Exercises */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-4 px-2" style={{ color: 'var(--text-muted)' }}>
              Breathing Exercises
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BREATHING_PATTERNS.map((bp, index) => (
                <BreathingTimer key={index} pattern={bp.pattern} name={bp.name} />
              ))}
            </div>
          </div>

          {/* Day's Breathing Pattern */}
          {currentDayData.breathingExercise && (
            <div className="card p-5">
              <h3 className="text-sm uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                Today's Breathing Pattern: {currentDayData.breathingExercise.name}
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center mb-4">
                <div>
                  <div className="text-2xl font-mono" style={{ color: 'var(--accent-gold)' }}>
                    {currentDayData.breathingExercise.pattern.inhale}s
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Inhale</div>
                </div>
                {currentDayData.breathingExercise.pattern.hold && (
                  <div>
                    <div className="text-2xl font-mono" style={{ color: 'var(--accent-gold)' }}>
                      {currentDayData.breathingExercise.pattern.hold}s
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Hold</div>
                  </div>
                )}
                <div>
                  <div className="text-2xl font-mono" style={{ color: 'var(--accent-gold)' }}>
                    {currentDayData.breathingExercise.pattern.exhale}s
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Exhale</div>
                </div>
                {currentDayData.breathingExercise.pattern.holdEmpty && (
                  <div>
                    <div className="text-2xl font-mono" style={{ color: 'var(--accent-gold)' }}>
                      {currentDayData.breathingExercise.pattern.holdEmpty}s
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Rest</div>
                  </div>
                )}
              </div>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {currentDayData.breathingExercise.cycles} cycles • {currentDayData.breathingExercise.purpose}
              </p>
            </div>
          )}

          {/* Completion */}
          {meditationComplete && (
            <div className="card p-6 text-center" style={{ border: '1px solid rgba(74, 222, 128, 0.3)' }}>
              <div className="text-2xl mb-2" style={{ color: 'var(--success)' }}>✓</div>
              <p className="font-medium mb-4" style={{ color: 'var(--success)' }}>Meditation Complete</p>
              <button onClick={handleDayComplete} className="btn-primary">
                Complete Day {currentDayData.dayNumber}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bottom navigation */}
      <div className="flex justify-center gap-4 pt-8 pb-4">
        <button onClick={() => navigate('/play')} className="btn-secondary">
          Practice Play
        </button>
        <button onClick={() => navigate('/train')} className="btn-secondary">
          Pattern Training
        </button>
      </div>
    </div>
  );
}

export default DayPage;
