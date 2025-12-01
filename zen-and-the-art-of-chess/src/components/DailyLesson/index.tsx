import { useState } from 'react';
import { ChessBoardPanel } from '@/components/ChessBoardPanel';
import { MeditationPanel } from '@/components/MeditationPanel';
import { useProgressStore } from '@/state/useStore';
import type { ZenChessDay, SacredText, Tradition } from '@/lib/types';

interface DailyLessonProps {
  day: ZenChessDay;
  onComplete?: () => void;
}

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
  VIJNANA: 'text-violet-400',
  TAO: 'text-emerald-400',
  UPANISHADS: 'text-amber-400',
  GITA: 'text-orange-400',
  ASHTAVAKRA: 'text-cyan-400',
  YOGA_SUTRAS: 'text-blue-400',
  SHIVA_SUTRAS: 'text-rose-400',
  ZEN: 'text-lime-400',
  STOIC: 'text-slate-300',
  ART_OF_WAR: 'text-red-400',
};

function SacredTextCard({ text }: { text: SacredText }) {
  return (
    <div className="glass-card p-6 mb-4 animate-fade-in">
      <h4 className={`text-sm uppercase tracking-wider mb-3 ${traditionColors[text.tradition]}`}>
        {traditionNames[text.tradition]}
      </h4>
      
      {/* Quote */}
      <blockquote className="text-xl font-serif italic text-zen-200 leading-relaxed mb-4">
        {text.quote}
      </blockquote>
      
      {/* Commentary */}
      <p className="text-zen-400 leading-relaxed mb-4">
        {text.commentary}
      </p>

      {/* Context if available */}
      {text.context && (
        <p className="text-zen-500 text-sm italic border-l-2 border-zen-700 pl-4">
          {text.context}
        </p>
      )}

      {/* Why This Matters */}
      {text.whyThisMatters && (
        <div className="mt-4 pt-4 border-t border-zen-700/30">
          <p className="text-zen-300 text-sm">
            <span className="text-gold-500/70 font-medium">Why this matters: </span>
            {text.whyThisMatters}
          </p>
        </div>
      )}
    </div>
  );
}

export function DailyLesson({ day, onComplete }: DailyLessonProps) {
  const [activeTab, setActiveTab] = useState<'wisdom' | 'chess' | 'practice'>('wisdom');
  const [exerciseStarted, setExerciseStarted] = useState(false);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  const [meditationComplete, setMeditationComplete] = useState(false);
  
  const { completeDay, addMeditationMinutes } = useProgressStore();

  const handleMeditationComplete = () => {
    setMeditationComplete(true);
    addMeditationMinutes(day.meditation.suggestedMinutes);
  };

  const handleDayComplete = () => {
    completeDay(day.dayNumber);
    onComplete?.();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Day Header */}
      <header className="text-center py-8 glass-card">
        <p className="text-zen-500 text-sm uppercase tracking-widest mb-2">
          Day {day.dayNumber} of 365
        </p>
        <p className="text-zen-400 text-sm mb-4">
          {day.sacredTexts[0]?.tradition && traditionNames[day.sacredTexts[0].tradition]}
        </p>
        <h1 className="text-3xl md:text-4xl font-serif text-zen-100 mb-2">
          {day.title}
        </h1>
        <p className="text-lg text-zen-400 font-serif italic">
          {day.theme}
        </p>
      </header>

      {/* Tab navigation */}
      <nav className="flex gap-2 justify-center">
        {(['wisdom', 'chess', 'practice'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                : 'text-zen-400 hover:bg-zen-800/40 border border-transparent'
            }`}
          >
            {tab === 'wisdom' && '📖 Sacred Wisdom'}
            {tab === 'chess' && '♟️ Chess Practice'}
            {tab === 'practice' && '🧘 Meditation'}
          </button>
        ))}
      </nav>

      {/* ==================== WISDOM TAB ==================== */}
      {activeTab === 'wisdom' && (
        <div className="space-y-6">
          {/* Sacred Texts Section */}
          <section>
            <h2 className="text-sm text-zen-500 uppercase tracking-widest mb-4 px-2">
              Sacred Texts
            </h2>
            {day.sacredTexts.map((text, i) => (
              <SacredTextCard key={i} text={text} />
            ))}
          </section>

          {/* Integrated Reflection */}
          <section className="glass-card p-8">
            <h2 className="text-sm text-zen-500 uppercase tracking-widest mb-3">
              Integrated Reflection
            </h2>
            <h3 className="text-2xl font-serif text-zen-100 mb-4">
              {day.integratedReflection.title}
            </h3>
            <div className="text-zen-300 leading-relaxed whitespace-pre-line font-serif">
              {day.integratedReflection.body}
            </div>
          </section>

          {/* Prayer */}
          <section className="glass-card p-6 text-center border-l-2 border-gold-500/30">
            <h2 className="text-sm text-zen-500 uppercase tracking-widest mb-3">
              Prayer
            </h2>
            <p className="text-xl font-serif italic text-zen-200 leading-relaxed">
              {day.prayer}
            </p>
          </section>

          {/* Daily Action */}
          <section className="glass-card p-6">
            <h2 className="text-sm text-zen-500 uppercase tracking-widest mb-3">
              Daily Action
            </h2>
            <p className="text-zen-200 font-medium mb-2">
              {day.dailyAction.instruction}
            </p>
            {day.dailyAction.context && (
              <p className="text-zen-400 text-sm">
                {day.dailyAction.context}
              </p>
            )}
          </section>
        </div>
      )}

      {/* ==================== CHESS TAB ==================== */}
      {activeTab === 'chess' && (
        <div className="space-y-6">
          {/* Chess Wisdom */}
          <section className="glass-card p-6">
            <h2 className="text-sm text-zen-500 uppercase tracking-widest mb-2">
              Chess Concept
            </h2>
            <h3 className="text-xl font-serif text-gold-400 mb-3">
              {day.chessConcept}
            </h3>
            <p className="text-zen-300 leading-relaxed mb-4">
              {day.chessApplication}
            </p>
            {day.chessWisdom && (
              <blockquote className="text-zen-400 italic border-l-2 border-gold-500/30 pl-4">
                {day.chessWisdom}
              </blockquote>
            )}
          </section>

          {/* Exercise */}
          <section className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-zen-500 uppercase tracking-widest mb-1">
                  Today's Exercise
                </h2>
                <span className="text-xs text-zen-600">
                  {day.exerciseType.replace('_', ' ')} • 
                  {day.difficulty && ` ${'★'.repeat(day.difficulty)}${'☆'.repeat(5 - day.difficulty)}`}
                </span>
              </div>
              {!exerciseStarted && (
                <button
                  onClick={() => setExerciseStarted(true)}
                  className="zen-button-primary"
                >
                  Begin Exercise
                </button>
              )}
            </div>

            <p className="text-zen-300 mb-4">
              {day.exerciseInstructions}
            </p>

            {day.exerciseContext && (
              <p className="text-zen-500 text-sm italic mb-4">
                {day.exerciseContext}
              </p>
            )}

            {exerciseStarted && (
              <div className="mt-6">
                <ChessBoardPanel
                  initialFen={day.fen}
                  puzzleMode={day.exerciseType === 'PUZZLE'}
                  puzzleSolution={day.solution}
                  vsEngine={day.exerciseType === 'CALM_PLAY' || day.exerciseType === 'MINDFUL_GAME'}
                  engineStrength={day.exerciseType === 'CALM_PLAY' ? 1 : 5}
                  playerColor="white"
                  onGameOver={(result) => {
                    console.log('Game completed:', result);
                    setExerciseComplete(true);
                  }}
                />
                
                {exerciseComplete && (
                  <div className="mt-4 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <p className="text-emerald-400 font-serif">
                      ✓ Exercise complete
                    </p>
                    <p className="text-zen-500 text-sm mt-1">
                      Remember: the outcome matters less than the awareness you brought.
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Mindfulness reminder */}
          <div className="glass-card-subtle p-4">
            <p className="text-zen-500 text-xs italic text-center">
              "The awareness that notices all experience is itself completely still."
            </p>
          </div>

          {/* Tilt Signal */}
          {day.tiltSignal && (
            <section className="glass-card-subtle p-5">
              <h3 className="text-xs text-zen-500 uppercase tracking-wider mb-2">
                Watch For
              </h3>
              <p className="text-zen-400 text-sm mb-3">
                {day.tiltSignal}
              </p>
              {day.tiltReframe && (
                <>
                  <h3 className="text-xs text-zen-500 uppercase tracking-wider mb-2 mt-4">
                    Reframe
                  </h3>
                  <p className="text-zen-200 text-sm font-serif italic">
                    {day.tiltReframe}
                  </p>
                </>
              )}
            </section>
          )}
        </div>
      )}

      {/* ==================== PRACTICE TAB ==================== */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          {/* Meditation */}
          <section className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-zen-500 uppercase tracking-widest mb-1">
                  Meditation
                </h2>
                <h3 className="text-xl font-serif text-zen-100">
                  {day.meditation.title}
                </h3>
              </div>
              <span className="text-gold-400 text-sm">
                {day.meditation.suggestedMinutes} min
              </span>
            </div>

            {day.meditation.context && (
              <p className="text-zen-400 mb-6 leading-relaxed">
                {day.meditation.context}
              </p>
            )}

            <ol className="space-y-4 mb-6">
              {day.meditation.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full bg-zen-800 border border-zen-700 flex items-center justify-center text-xs text-zen-400 flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-zen-300">{step}</span>
                </li>
              ))}
            </ol>

            <MeditationPanel
              title={day.meditation.title}
              steps={day.meditation.steps}
              purpose={day.meditation.context || ''}
              duration={day.meditation.suggestedMinutes}
              breathingPattern={day.breathingExercise?.pattern}
              onComplete={handleMeditationComplete}
            />
          </section>

          {/* Breathing Exercise if available */}
          {day.breathingExercise && (
            <section className="glass-card p-5">
              <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-3">
                Breathing Pattern: {day.breathingExercise.name}
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center mb-4">
                <div>
                  <div className="text-2xl font-mono text-gold-400">
                    {day.breathingExercise.pattern.inhale}s
                  </div>
                  <div className="text-xs text-zen-500">Inhale</div>
                </div>
                {day.breathingExercise.pattern.hold && (
                  <div>
                    <div className="text-2xl font-mono text-gold-400">
                      {day.breathingExercise.pattern.hold}s
                    </div>
                    <div className="text-xs text-zen-500">Hold</div>
                  </div>
                )}
                <div>
                  <div className="text-2xl font-mono text-gold-400">
                    {day.breathingExercise.pattern.exhale}s
                  </div>
                  <div className="text-xs text-zen-500">Exhale</div>
                </div>
                {day.breathingExercise.pattern.holdEmpty && (
                  <div>
                    <div className="text-2xl font-mono text-gold-400">
                      {day.breathingExercise.pattern.holdEmpty}s
                    </div>
                    <div className="text-xs text-zen-500">Rest</div>
                  </div>
                )}
              </div>
              <p className="text-zen-400 text-sm">
                {day.breathingExercise.cycles} cycles • {day.breathingExercise.purpose}
              </p>
            </section>
          )}

          {/* Completion */}
          {meditationComplete && (
            <section className="glass-card p-6 border border-emerald-500/30 text-center">
              <div className="text-emerald-400 text-2xl mb-2">✓</div>
              <p className="text-emerald-400 font-medium mb-4">Meditation Complete</p>
              <button
                onClick={handleDayComplete}
                className="zen-button-primary"
              >
                Complete Day {day.dayNumber}
              </button>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default DailyLesson;
