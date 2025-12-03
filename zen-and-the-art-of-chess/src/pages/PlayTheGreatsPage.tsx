import { useNavigate } from 'react-router-dom';
import { LEGEND_STYLES, type LegendId } from '@/lib/legendTypes';

export function PlayTheGreatsPage() {
  const navigate = useNavigate();

  const legends: LegendId[] = [
    'fischer', 'capablanca', 'kasparov', 'carlsen',
    'tal', 'karpov', 'alekhine', 'botvinnik',
    'lasker', 'morphy', 'steinitz', 'spassky'
  ];

  return (
    <div className="space-y-4 sm:space-y-8 animate-fade-in px-2 sm:px-0">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-serif text-zen-100 mb-4">
          Play the Greats
        </h1>
        <p className="text-xl text-zen-400 font-serif italic max-w-2xl mx-auto">
          Face the legends of chess. Study their games. Learn their secrets.
        </p>
      </section>

      {/* Legend Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {legends.map((legendId) => {
          const legend = LEGEND_STYLES[legendId];
          return (
            <button
              key={legendId}
              onClick={() => navigate(`/greats/${legendId}`)}
              className="glass-card p-8 text-left hover:border-gold-500/30 transition-all group hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-serif text-zen-100 group-hover:text-gold-400 transition-colors">
                  {legend.name}
                </h2>
                <span className="text-4xl opacity-60 group-hover:opacity-100 transition-opacity">
                  {legendId === 'fischer' ? '👑' : 
                   legendId === 'capablanca' ? '🎩' : 
                   legendId === 'steinitz' ? '📜' :
                   legendId === 'alekhine' ? '⚔️' :
                   legendId === 'kasparov' ? '🔥' :
                   legendId === 'karpov' ? '🐍' :
                   legendId === 'tal' ? '🎭' :
                   legendId === 'botvinnik' ? '🔬' :
                   legendId === 'morphy' ? '🌟' :
                   legendId === 'carlsen' ? '🌍' :
                   legendId === 'lasker' ? '🧠' : '🏆'}
                </span>
              </div>

              <p className="text-gold-400 font-serif italic mb-4">
                {legend.tagline}
              </p>

              <p className="text-zen-400 text-sm mb-4">
                {legend.description}
              </p>

              {/* Style Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {legend.styleTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-zen-800/60 text-zen-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-zen-800/50 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-zen-500 text-xs uppercase tracking-wider mb-1">
                    Aggressiveness
                  </div>
                  <div className="h-2 bg-zen-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${legend.aggressiveness * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-zen-500 text-xs uppercase tracking-wider mb-1">
                    Simplification
                  </div>
                  <div className="h-2 bg-zen-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${legend.simplifyBias * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </section>

      {/* Info Section */}
      <section className="glass-card p-8">
        <h2 className="text-xl font-serif text-zen-100 mb-4">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gold-400 mb-2">Play vs Legend</h3>
            <p className="text-zen-400 text-sm">
              Challenge a legend bot that plays with their authentic style. Uses real opening
              repertoire and known positions from their games. When out of book, the engine
              is biased toward their characteristic moves.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gold-400 mb-2">Guess the Move</h3>
            <p className="text-zen-400 text-sm">
              Step through their actual games and try to guess their moves. Get instant feedback
              and scores. Your performance is tracked and weaknesses are automatically detected,
              feeding into your study notes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlayTheGreatsPage;

