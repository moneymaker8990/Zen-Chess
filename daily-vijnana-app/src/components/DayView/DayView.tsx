import type { DailyEntry } from '../../lib/types';
import { NavigationButtons } from '../Navigation/NavigationButtons';
import { getPhaseForDay } from '../../data/phases';

type DayViewProps = {
  entry: DailyEntry;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
};

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-medium text-white/50 uppercase tracking-[0.2em] mb-2">
      {children}
    </h3>
  );
}

function TraditionCard({ 
  title, 
  text, 
  commentary,
  context,
  whyThisMatters
}: { 
  title: string; 
  text: string; 
  commentary?: string;
  context?: string;
  whyThisMatters?: string;
}) {
  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
      <h4 className="text-xs font-medium text-violet-300/80 uppercase tracking-wider mb-2">
        {title}
      </h4>
      {context && (
        <p className="text-[11px] text-slate-300/70 italic leading-relaxed mb-2">
          {context}
        </p>
      )}
      <p className="text-sm md:text-base text-white/90 leading-relaxed italic">
        "{text}"
      </p>
      {commentary && (
        <p className="mt-3 text-xs md:text-sm text-white/60 leading-relaxed">
          {commentary}
        </p>
      )}
      {whyThisMatters && (
        <p className="mt-2 text-[11px] text-slate-200/70 leading-relaxed">
          {whyThisMatters}
        </p>
      )}
    </div>
  );
}

export function DayView({ entry, onPrev, onNext, onToday }: DayViewProps) {
  const { dayNumber, theme } = entry;
  const phase = getPhaseForDay(dayNumber);

  return (
    <div className="space-y-8">
      {/* Day Header */}
      <section className="text-center pb-6 border-b border-white/10">
        <p className="text-xs uppercase tracking-[0.25em] text-violet-300/70 mb-1">
          Day {dayNumber} of 365
        </p>
        {phase && (
          <p className="text-xs text-white/40 mb-3">
            {phase.name}
          </p>
        )}
        <h2 className="text-2xl md:text-3xl font-serif text-white font-medium">
          {theme}
        </h2>
      </section>

      {/* Tradition Passages */}
      <section>
        <SectionHeader>Sacred Texts</SectionHeader>
        <div className="grid gap-4">
          {entry.vijnanaText && (
            <TraditionCard 
              title="Vijnana Bhairava Tantra" 
              text={entry.vijnanaText} 
              commentary={entry.vijnanaCommentary}
              context={entry.traditionContext?.vijnana}
              whyThisMatters={entry.whyThisMatters?.vijnana}
            />
          )}
          {entry.taoText && (
            <TraditionCard 
              title="Tao Te Ching" 
              text={entry.taoText} 
              commentary={entry.taoCommentary}
              context={entry.traditionContext?.tao}
              whyThisMatters={entry.whyThisMatters?.tao}
            />
          )}
          {entry.artOfWarText && (
            <TraditionCard 
              title="The Art of War" 
              text={entry.artOfWarText} 
              commentary={entry.artOfWarCommentary}
              context={entry.traditionContext?.artOfWar}
              whyThisMatters={entry.whyThisMatters?.artOfWar}
            />
          )}
          {entry.upanishadText && (
            <TraditionCard 
              title="Upanishads" 
              text={entry.upanishadText} 
              commentary={entry.upanishadCommentary}
              context={entry.traditionContext?.upanishads}
              whyThisMatters={entry.whyThisMatters?.upanishads}
            />
          )}
          {entry.gitaText && (
            <TraditionCard 
              title="Bhagavad Gita" 
              text={entry.gitaText} 
              commentary={entry.gitaCommentary}
              context={entry.traditionContext?.gita}
              whyThisMatters={entry.whyThisMatters?.gita}
            />
          )}
          {entry.ashtavakraText && (
            <TraditionCard 
              title="Ashtavakra Gita" 
              text={entry.ashtavakraText} 
              commentary={entry.ashtavakraCommentary}
              context={entry.traditionContext?.ashtavakra}
              whyThisMatters={entry.whyThisMatters?.ashtavakra}
            />
          )}
          {entry.yogaSutraText && (
            <TraditionCard 
              title="Yoga Sutras" 
              text={entry.yogaSutraText} 
              commentary={entry.yogaSutraCommentary}
              context={entry.traditionContext?.yogaSutras}
              whyThisMatters={entry.whyThisMatters?.yogaSutras}
            />
          )}
          {entry.shivaSutraText && (
            <TraditionCard 
              title="Shiva Sutras" 
              text={entry.shivaSutraText} 
              commentary={entry.shivaSutraCommentary}
              context={entry.traditionContext?.shivaSutras}
              whyThisMatters={entry.whyThisMatters?.shivaSutras}
            />
          )}
        </div>
      </section>

      {/* Integrated Reflection */}
      <section className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-5 md:p-6 border border-white/15">
        <SectionHeader>Integrated Reflection</SectionHeader>
        <h4 className="text-lg md:text-xl font-serif text-white mb-3">
          {entry.integratedReflectionTitle}
        </h4>
        <p className="text-sm md:text-base text-white/75 leading-relaxed">
          {entry.integratedReflectionBody}
        </p>
      </section>

      {/* Meditation */}
      <section className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-5 md:p-6 border border-white/10">
        <SectionHeader>Meditation</SectionHeader>
        <div className="flex items-baseline justify-between mb-3">
          <h4 className="text-lg md:text-xl font-serif text-white">
            {entry.meditation.title}
          </h4>
          <span className="text-xs text-white/50 bg-white/10 px-3 py-1 rounded-full">
            {entry.meditation.suggestedMinutes} min
          </span>
        </div>
        
        {entry.meditationContext && (
          <p className="mb-4 text-xs md:text-sm text-white/60 leading-relaxed">
            {entry.meditationContext}
          </p>
        )}
        
        <ol className="space-y-2">
          {entry.meditation.steps.map((step, idx) => (
            <li key={idx} className="flex gap-3 text-sm md:text-base text-white/75">
              <span className="text-violet-300/70 font-medium">{idx + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Prayer */}
      <section className="text-center py-6 border-y border-white/10">
        <SectionHeader>Prayer</SectionHeader>
        <p className="text-base md:text-lg text-white/80 italic font-serif leading-relaxed max-w-xl mx-auto">
          {entry.prayer}
        </p>
      </section>

      {/* Daily Action */}
      <section className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-5 md:p-6 border border-white/10">
        <SectionHeader>Daily Action</SectionHeader>
        <p className="text-sm md:text-base text-white/80 leading-relaxed">
          {entry.dailyAction}
        </p>
        {entry.dailyActionContext && (
          <p className="mt-3 text-xs md:text-sm text-white/60 leading-relaxed">
            {entry.dailyActionContext}
          </p>
        )}
      </section>

      {/* Navigation */}
      <NavigationButtons
        onPrev={onPrev}
        onNext={onNext}
        onToday={onToday}
        disablePrev={dayNumber <= 1}
      />
    </div>
  );
}
