import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgressStore } from '@/state/useStore';
import { getDayByNumber, phaseInfo } from '@/data/days';
import type { Tradition, BreathingPattern } from '@/lib/types';

// ============================================
// MIND TRAINING PAGE
// The spiritual heart of Zen Chess
// Meditation, Breathing, Tilt Prevention, Daily Wisdom
// ============================================

type Tab = 'overview' | 'meditation' | 'breathing' | 'wisdom' | 'tilt-journal';

const TRADITIONS: Record<Tradition, { name: string; color: string; description: string }> = {
  VIJNANA: { name: 'Vijnana Bhairava', color: 'text-violet-400', description: 'Tantric meditation techniques' },
  TAO: { name: 'Tao Te Ching', color: 'text-emerald-400', description: 'The way of effortless action' },
  UPANISHADS: { name: 'Upanishads', color: 'text-amber-400', description: 'Ancient wisdom of the Self' },
  GITA: { name: 'Bhagavad Gita', color: 'text-orange-400', description: 'Action without attachment' },
  ASHTAVAKRA: { name: 'Ashtavakra Gita', color: 'text-cyan-400', description: 'Pure non-dual awareness' },
  YOGA_SUTRAS: { name: 'Yoga Sutras', color: 'text-blue-400', description: 'Stilling the mind' },
  SHIVA_SUTRAS: { name: 'Shiva Sutras', color: 'text-rose-400', description: 'Consciousness as playground' },
  ZEN: { name: 'Zen Buddhism', color: 'text-lime-400', description: 'Direct pointing to mind' },
  STOIC: { name: 'Stoic Philosophy', color: 'text-slate-300', description: 'What you can control' },
  ART_OF_WAR: { name: 'Art of War', color: 'text-red-400', description: 'Strategic wisdom' },
};

const BREATHING_PATTERNS: Array<{ name: string; pattern: BreathingPattern; purpose: string; tradition: Tradition }> = [
  { 
    name: 'Box Breathing', 
    pattern: { inhale: 4, hold: 4, exhale: 4, holdEmpty: 4 }, 
    purpose: 'Calm before critical moves',
    tradition: 'STOIC'
  },
  { 
    name: '4-7-8 Relaxation', 
    pattern: { inhale: 4, hold: 7, exhale: 8 }, 
    purpose: 'Release tilt and frustration',
    tradition: 'YOGA_SUTRAS'
  },
  { 
    name: 'Coherent Breathing', 
    pattern: { inhale: 5, exhale: 5 }, 
    purpose: 'Sustained focus',
    tradition: 'TAO'
  },
  { 
    name: 'Energizing Breath', 
    pattern: { inhale: 6, hold: 2, exhale: 4 }, 
    purpose: 'Wake up sluggish thinking',
    tradition: 'VIJNANA'
  },
  { 
    name: 'Calming Exhale', 
    pattern: { inhale: 3, exhale: 6 }, 
    purpose: 'Quick reset after blunder',
    tradition: 'ZEN'
  },
];

const TILT_WISDOM: Record<string, { quote: string; tradition: Tradition }[]> = {
  'after_blunder': [
    { quote: "The awareness that sees the mistake is itself untouched by the mistake.", tradition: 'ASHTAVAKRA' },
    { quote: "Fall down seven times, stand up eight.", tradition: 'ZEN' },
    { quote: "Waste no more time arguing about what a good man should be. Be one.", tradition: 'STOIC' },
  ],
  'rushing': [
    { quote: "Nature does not hurry, yet everything is accomplished.", tradition: 'TAO' },
    { quote: "One move at a time. Just this.", tradition: 'ZEN' },
    { quote: "The mind is its own place, and in itself can make a heaven of hell.", tradition: 'STOIC' },
  ],
  'frustration': [
    { quote: "You are not your thoughts. You are the space in which they arise.", tradition: 'VIJNANA' },
    { quote: "The Self remains untouched by the world's apparent chaos.", tradition: 'UPANISHADS' },
    { quote: "What upsets people is not things themselves but their judgments about them.", tradition: 'STOIC' },
  ],
  'fear': [
    { quote: "Action is your right, never the fruits.", tradition: 'GITA' },
    { quote: "The chess master does not grasp; he allows the position to reveal itself.", tradition: 'TAO' },
    { quote: "We suffer more often in imagination than in reality.", tradition: 'STOIC' },
  ],
};

interface TiltEntry {
  id: string;
  date: number;
  trigger: string;
  response: string;
  wisdom: string;
  tradition: Tradition;
}

export function MindTrainingPage() {
  const navigate = useNavigate();
  const { progress, addMeditationMinutes } = useProgressStore();
  
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [selectedTradition, setSelectedTradition] = useState<Tradition | 'all'>('all');
  
  // Breathing state
  const [activeBreathing, setActiveBreathing] = useState<number | null>(null);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdEmpty'>('inhale');
  const [breathTimer, setBreathTimer] = useState(0);
  
  // Meditation state
  const [meditating, setMeditating] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(5);
  
  // Tilt journal state
  const [tiltEntries, setTiltEntries] = useState<TiltEntry[]>(() => {
    const saved = localStorage.getItem('zen-chess-tilt-journal');
    return saved ? JSON.parse(saved) : [];
  });
  const [showJournalForm, setShowJournalForm] = useState(false);
  const [journalTrigger, setJournalTrigger] = useState('');
  const [journalResponse, setJournalResponse] = useState('');

  // Get today's daily lesson for wisdom
  const todayLesson = getDayByNumber(progress.currentDay);
  const currentPhase = todayLesson?.phase || 'CALM_MIND';
  const phaseData = phaseInfo[currentPhase];

  // Save tilt entries
  useEffect(() => {
    localStorage.setItem('zen-chess-tilt-journal', JSON.stringify(tiltEntries));
  }, [tiltEntries]);

  // Meditation timer
  useEffect(() => {
    if (!meditating) return;
    
    const timer = setInterval(() => {
      setMeditationTime(prev => {
        if (prev >= selectedDuration * 60) {
          setMeditating(false);
          addMeditationMinutes(selectedDuration);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [meditating, selectedDuration, addMeditationMinutes]);

  // Breathing cycle
  useEffect(() => {
    if (activeBreathing === null) return;
    
    const pattern = BREATHING_PATTERNS[activeBreathing].pattern;
    const phases = [
      { phase: 'inhale' as const, duration: pattern.inhale },
      { phase: 'hold' as const, duration: pattern.hold || 0 },
      { phase: 'exhale' as const, duration: pattern.exhale },
      { phase: 'holdEmpty' as const, duration: pattern.holdEmpty || 0 },
    ].filter(p => p.duration > 0);

    let currentPhaseIndex = 0;
    let timeInPhase = 0;
    
    const timer = setInterval(() => {
      timeInPhase++;
      setBreathTimer(phases[currentPhaseIndex].duration - timeInPhase);
      
      if (timeInPhase >= phases[currentPhaseIndex].duration) {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
        timeInPhase = 0;
        setBreathPhase(phases[currentPhaseIndex].phase);
        setBreathTimer(phases[currentPhaseIndex].duration);
      }
    }, 1000);
    
    // Initialize
    setBreathPhase(phases[0].phase);
    setBreathTimer(phases[0].duration);
    
    return () => clearInterval(timer);
  }, [activeBreathing]);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const addTiltEntry = useCallback(() => {
    const triggers = Object.keys(TILT_WISDOM);
    const trigger = triggers[Math.floor(Math.random() * triggers.length)];
    const wisdomOptions = TILT_WISDOM[trigger];
    const wisdom = wisdomOptions[Math.floor(Math.random() * wisdomOptions.length)];
    
    const entry: TiltEntry = {
      id: Date.now().toString(),
      date: Date.now(),
      trigger: journalTrigger || trigger,
      response: journalResponse,
      wisdom: wisdom.quote,
      tradition: wisdom.tradition,
    };
    
    setTiltEntries(prev => [entry, ...prev]);
    setShowJournalForm(false);
    setJournalTrigger('');
    setJournalResponse('');
  }, [journalTrigger, journalResponse]);

  // Filtered wisdom based on selected tradition
  const filteredWisdom = useMemo(() => {
    if (!todayLesson?.sacredTexts) return [];
    return selectedTradition === 'all' 
      ? todayLesson.sacredTexts 
      : todayLesson.sacredTexts.filter(t => t.tradition === selectedTradition);
  }, [todayLesson, selectedTradition]);

  const getBreathPhaseText = () => {
    switch (breathPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'holdEmpty': return 'Rest Empty';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <header className="text-center lg:text-left">
        <h1 className="text-3xl lg:text-4xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Mind Training
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>
          Cultivate presence, calm, and clarity • {progress.meditationMinutes} minutes meditated
        </p>
      </header>

      {/* Stats Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#a855f7' }}>{progress.meditationMinutes}</div>
          <div className="stat-label">Minutes Meditated</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#4ade80' }}>{progress.currentDay}</div>
          <div className="stat-label">Day of Journey</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: '#f59e0b' }}>{tiltEntries.length}</div>
          <div className="stat-label">Tilt Reflections</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-gradient">{progress.streakDays}</div>
          <div className="stat-label">Day Streak</div>
        </div>
      </section>

      {/* Tab Navigation */}
      <nav className="flex flex-wrap gap-2">
        {(['overview', 'meditation', 'breathing', 'wisdom', 'tilt-journal'] as Tab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] border border-transparent'
            }`}
          >
            {tab === 'overview' && '☯️ Overview'}
            {tab === 'meditation' && '🧘 Meditation'}
            {tab === 'breathing' && '🌬️ Breathing'}
            {tab === 'wisdom' && '📖 Wisdom'}
            {tab === 'tilt-journal' && '📓 Tilt Journal'}
          </button>
        ))}
      </nav>

      {/* ==================== OVERVIEW TAB ==================== */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's Practice Card */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' }}>
                🪷
              </div>
              <div>
                <h3 className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>
                  Today's Practice
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Day {progress.currentDay} • {phaseData?.name || 'Calm Mind'}
                </p>
              </div>
            </div>
            
            {todayLesson && (
              <div className="space-y-3">
                <h4 className="font-serif text-xl" style={{ color: 'var(--text-secondary)' }}>
                  {todayLesson.title}
                </h4>
                <p className="italic" style={{ color: 'var(--text-muted)' }}>
                  "{todayLesson.theme}"
                </p>
                <button
                  onClick={() => navigate('/day')}
                  className="btn-primary w-full mt-4"
                >
                  Begin Daily Lesson →
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <button
              onClick={() => setActiveTab('meditation')}
              className="action-card w-full text-left"
            >
              <div className="action-card-icon" style={{ background: 'rgba(168, 85, 247, 0.12)' }}>
                🧘
              </div>
              <div className="action-card-content">
                <h3>Quick Meditation</h3>
                <p>5-minute guided stillness practice</p>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('breathing')}
              className="action-card w-full text-left"
            >
              <div className="action-card-icon" style={{ background: 'rgba(6, 182, 212, 0.12)' }}>
                🌬️
              </div>
              <div className="action-card-content">
                <h3>Breathing Exercise</h3>
                <p>Reset your nervous system</p>
              </div>
            </button>

            <button
              onClick={() => navigate('/calm-play')}
              className="action-card w-full text-left"
            >
              <div className="action-card-icon" style={{ background: 'rgba(236, 72, 153, 0.12)' }}>
                ❤️
              </div>
              <div className="action-card-content">
                <h3>Calm Play Mode</h3>
                <p>Chess with tilt prevention & breathing prompts</p>
              </div>
            </button>
          </div>

          {/* Traditions Overview */}
          <div className="card p-6 lg:col-span-2">
            <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
              Wisdom Traditions
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-tertiary)' }}>
              Your journey draws from 10 spiritual traditions, each offering unique insights for chess mastery.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {Object.entries(TRADITIONS).map(([key, { name, color }]) => (
                <div
                  key={key}
                  className="p-3 rounded-lg text-center cursor-pointer transition-all hover:scale-105"
                  style={{ background: 'var(--bg-tertiary)' }}
                  onClick={() => {
                    setSelectedTradition(key as Tradition);
                    setActiveTab('wisdom');
                  }}
                >
                  <span className={`text-sm font-medium ${color}`}>{name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== MEDITATION TAB ==================== */}
      {activeTab === 'meditation' && (
        <div className="max-w-2xl mx-auto">
          <div className="card p-8 text-center">
            {!meditating ? (
              <>
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' }}>
                  🧘
                </div>
                <h2 className="text-2xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
                  Meditation Timer
                </h2>
                <p className="mb-6" style={{ color: 'var(--text-tertiary)' }}>
                  Sit comfortably. Close your eyes. Let thoughts pass like clouds.
                </p>
                
                <div className="flex justify-center gap-3 mb-6">
                  {[3, 5, 10, 15, 20].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setSelectedDuration(mins)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedDuration === mins
                          ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30'
                          : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {mins} min
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setMeditating(true)}
                  className="btn-primary text-lg px-8 py-3"
                >
                  Begin Meditation
                </button>
              </>
            ) : (
              <>
                <div className="w-48 h-48 mx-auto mb-8 rounded-full flex items-center justify-center relative"
                  style={{ 
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)',
                    animation: 'pulse 4s ease-in-out infinite'
                  }}>
                  <div className="text-5xl font-display" style={{ color: 'var(--accent-primary)' }}>
                    {formatTime(meditationTime)}
                  </div>
                </div>
                
                <p className="text-lg font-serif italic mb-8" style={{ color: 'var(--text-secondary)' }}>
                  Just breathe. Just be.
                </p>
                
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setMeditating(false)}
                    className="btn-secondary"
                  >
                    Pause
                  </button>
                  <button
                    onClick={() => {
                      setMeditating(false);
                      addMeditationMinutes(Math.ceil(meditationTime / 60));
                      setMeditationTime(0);
                    }}
                    className="btn-primary"
                  >
                    Complete
                  </button>
                </div>
                
                <div className="mt-8">
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill purple"
                      style={{ width: `${(meditationTime / (selectedDuration * 60)) * 100}%` }}
                    />
                  </div>
                  <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                    {formatTime(selectedDuration * 60 - meditationTime)} remaining
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==================== BREATHING TAB ==================== */}
      {activeTab === 'breathing' && (
        <div className="space-y-6">
          {activeBreathing === null ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BREATHING_PATTERNS.map((bp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveBreathing(index)}
                  className="card p-6 text-left hover:border-[var(--accent-primary)]/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                      style={{ background: 'rgba(6, 182, 212, 0.12)' }}>
                      🌬️
                    </div>
                    <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {bp.name}
                    </h3>
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
                    {bp.purpose}
                  </p>
                  <div className="flex gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span>In: {bp.pattern.inhale}s</span>
                    {bp.pattern.hold && <span>Hold: {bp.pattern.hold}s</span>}
                    <span>Out: {bp.pattern.exhale}s</span>
                  </div>
                  <div className={`mt-3 text-xs ${TRADITIONS[bp.tradition].color}`}>
                    {TRADITIONS[bp.tradition].name}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto">
              <div className="card p-8 text-center">
                <h2 className="text-2xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
                  {BREATHING_PATTERNS[activeBreathing].name}
                </h2>
                <p className="mb-8" style={{ color: 'var(--text-tertiary)' }}>
                  {BREATHING_PATTERNS[activeBreathing].purpose}
                </p>
                
                <div 
                  className={`w-64 h-64 mx-auto rounded-full flex flex-col items-center justify-center transition-all duration-1000 ${
                    breathPhase === 'inhale' ? 'scale-110' : 
                    breathPhase === 'exhale' ? 'scale-90' : 'scale-100'
                  }`}
                  style={{ 
                    background: breathPhase === 'inhale' 
                      ? 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0.1) 70%)'
                      : breathPhase === 'exhale'
                      ? 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.1) 70%)'
                      : 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(251, 191, 36, 0.1) 70%)'
                  }}
                >
                  <div className="text-4xl font-display mb-2" style={{ color: 'var(--text-primary)' }}>
                    {breathTimer}
                  </div>
                  <div className="text-xl font-serif" style={{ color: 'var(--text-secondary)' }}>
                    {getBreathPhaseText()}
                  </div>
                </div>
                
                <button
                  onClick={() => setActiveBreathing(null)}
                  className="btn-secondary mt-8"
                >
                  ← Back to Patterns
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================== WISDOM TAB ==================== */}
      {activeTab === 'wisdom' && (
        <div className="space-y-6">
          {/* Tradition Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTradition('all')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                selectedTradition === 'all'
                  ? 'bg-[var(--accent-primary)]/20 text-[var(--accent-primary)]'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
              }`}
            >
              All Traditions
            </button>
            {Object.entries(TRADITIONS).map(([key, { name, color }]) => (
              <button
                key={key}
                onClick={() => setSelectedTradition(key as Tradition)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  selectedTradition === key
                    ? 'bg-[var(--accent-primary)]/20'
                    : 'bg-[var(--bg-tertiary)]'
                } ${color}`}
              >
                {name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Today's Wisdom */}
          {todayLesson && filteredWisdom.length > 0 ? (
            <div className="space-y-4">
              {filteredWisdom.map((text, i) => (
                <div key={i} className="card p-6">
                  <div className={`text-sm uppercase tracking-wider mb-3 ${TRADITIONS[text.tradition].color}`}>
                    {TRADITIONS[text.tradition].name}
                  </div>
                  <blockquote className="text-xl font-serif italic leading-relaxed mb-4" 
                    style={{ color: 'var(--text-secondary)' }}>
                    "{text.quote}"
                  </blockquote>
                  <p style={{ color: 'var(--text-tertiary)' }}>
                    {text.commentary}
                  </p>
                  {text.whyThisMatters && (
                    <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span className="text-[var(--accent-gold)] font-medium">Chess Application: </span>
                        {text.whyThisMatters}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <p style={{ color: 'var(--text-tertiary)' }}>
                No wisdom available for this tradition today. Try exploring another!
              </p>
            </div>
          )}

          <button
            onClick={() => navigate('/day')}
            className="btn-secondary"
          >
            View Full Daily Lesson →
          </button>
        </div>
      )}

      {/* ==================== TILT JOURNAL TAB ==================== */}
      {activeTab === 'tilt-journal' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-display" style={{ color: 'var(--text-primary)' }}>
                Tilt Journal
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                Track triggers, reflect, and grow
              </p>
            </div>
            <button
              onClick={() => setShowJournalForm(!showJournalForm)}
              className="btn-primary"
            >
              + New Entry
            </button>
          </div>

          {/* New Entry Form */}
          {showJournalForm && (
            <div className="card p-6">
              <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
                Reflect on a difficult moment
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    What triggered you?
                  </label>
                  <select
                    value={journalTrigger}
                    onChange={(e) => setJournalTrigger(e.target.value)}
                    className="w-full p-3 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-primary)]"
                  >
                    <option value="">Select a trigger...</option>
                    <option value="after_blunder">Blunder / Mistake</option>
                    <option value="rushing">Rushing / Time pressure</option>
                    <option value="frustration">Frustration with opponent</option>
                    <option value="fear">Fear of losing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                    What did you notice in your body/mind?
                  </label>
                  <textarea
                    value={journalResponse}
                    onChange={(e) => setJournalResponse(e.target.value)}
                    placeholder="Racing thoughts, tight shoulders, wanting to quit..."
                    rows={3}
                    className="w-full p-3 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={addTiltEntry} className="btn-primary">
                    Save & Get Wisdom
                  </button>
                  <button onClick={() => setShowJournalForm(false)} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Journal Entries */}
          <div className="space-y-4">
            {tiltEntries.length === 0 ? (
              <div className="card p-8 text-center">
                <p style={{ color: 'var(--text-tertiary)' }}>
                  No journal entries yet. Start tracking your tilt patterns to grow!
                </p>
              </div>
            ) : (
              tiltEntries.slice(0, 10).map(entry => (
                <div key={entry.id} className="card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge">{entry.trigger.replace('_', ' ')}</span>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  {entry.response && (
                    <p className="text-sm mb-3" style={{ color: 'var(--text-tertiary)' }}>
                      "{entry.response}"
                    </p>
                  )}
                  <blockquote className={`font-serif italic text-sm ${TRADITIONS[entry.tradition].color}`}>
                    "{entry.wisdom}"
                  </blockquote>
                  <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    — {TRADITIONS[entry.tradition].name}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MindTrainingPage;



