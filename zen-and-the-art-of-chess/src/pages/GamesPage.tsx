import { useState, useMemo } from 'react';
import { allInstructiveGames, type InstructiveGame, type Era, type Category } from '@/data/instructiveGames';
import { GameViewer } from '@/components/GameViewer';
import { PageHeader } from '@/components/Tutorial';

type FilterEra = Era | 'all';
type FilterCategory = Category | 'all';

export function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<InstructiveGame | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEra, setFilterEra] = useState<FilterEra>('all');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<'day' | 'year' | 'name'>('day');

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let result = allInstructiveGames.filter(game => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          game.title.toLowerCase().includes(query) ||
          game.white.toLowerCase().includes(query) ||
          game.black.toLowerCase().includes(query) ||
          game.themes.some(t => t.toLowerCase().includes(query)) ||
          game.opening.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Era filter
      if (filterEra !== 'all' && game.era !== filterEra) return false;

      // Category filter
      if (filterCategory !== 'all' && game.category !== filterCategory) return false;

      return true;
    });

    // Sort
    switch (sortBy) {
      case 'day':
        result.sort((a, b) => a.dayNumber - b.dayNumber);
        break;
      case 'year':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [searchQuery, filterEra, filterCategory, sortBy]);

  // Stats
  const gamesWithAnnotations = allInstructiveGames.filter(g => g.moves.length > 0).length;

  if (selectedGame) {
    return <GameViewer game={selectedGame} onBack={() => setSelectedGame(null)} />;
  }

  const eras: { id: FilterEra; label: string }[] = [
    { id: 'all', label: 'All Eras' },
    { id: 'romantic', label: 'Romantic (1850s)' },
    { id: 'classical', label: 'Classical (1880-1920)' },
    { id: 'hypermodern', label: 'Hypermodern (1920s)' },
    { id: 'soviet', label: 'Soviet (1940-1970)' },
    { id: 'modern', label: 'Modern (1970-2000)' },
    { id: 'contemporary', label: 'Contemporary (2000+)' },
  ];

  const categories: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All Types' },
    { id: 'tactical', label: 'Tactical' },
    { id: 'positional', label: 'Positional' },
    { id: 'attack', label: 'Attack' },
    { id: 'defense', label: 'Defense' },
    { id: 'endgame', label: 'Endgame' },
    { id: 'strategy', label: 'Strategy' },
  ];

  const getEraColor = (era: Era) => {
    switch (era) {
      case 'romantic': return 'text-rose-400';
      case 'classical': return 'text-amber-400';
      case 'hypermodern': return 'text-violet-400';
      case 'soviet': return 'text-red-400';
      case 'modern': return 'text-blue-400';
      case 'contemporary': return 'text-emerald-400';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PageHeader
        tutorialId="games"
        title="365 Instructive Games"
        subtitle={`One masterpiece for each day • ${gamesWithAnnotations} fully annotated • ${allInstructiveGames.length - gamesWithAnnotations} from legend databases`}
      />

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by player, title, opening, or theme..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-200 placeholder-zen-600 focus:outline-none focus:border-gold-500/50"
        />

        {/* Filter row */}
        <div className="flex flex-wrap gap-4">
          {/* Era filter */}
          <select
            value={filterEra}
            onChange={(e) => setFilterEra(e.target.value as FilterEra)}
            className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300 focus:outline-none focus:border-gold-500/50"
          >
            {eras.map(era => (
              <option key={era.id} value={era.id}>{era.label}</option>
            ))}
          </select>

          {/* Category filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as FilterCategory)}
            className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300 focus:outline-none focus:border-gold-500/50"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'day' | 'year' | 'name')}
            className="px-3 py-2 rounded-lg bg-zen-900/50 border border-zen-700/30 text-zen-300 focus:outline-none focus:border-gold-500/50"
          >
            <option value="day">Sort by Day</option>
            <option value="year">Sort by Year</option>
            <option value="name">Sort by Name</option>
          </select>

          {/* Results count */}
          <span className="text-zen-500 text-sm py-2">
            {filteredGames.length} games
          </span>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGames.map((game, index) => (
          <div
            key={`${game.id}-${game.dayNumber}-${index}`}
            onClick={() => setSelectedGame(game)}
            className="glass-card p-4 cursor-pointer hover:border-zen-600/50 transition-all group"
          >
            {/* Day badge */}
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs px-2 py-0.5 rounded bg-zen-800/60 text-zen-500">
                Day {game.dayNumber}
              </span>
              <span className={`text-xs ${getEraColor(game.era)}`}>
                {game.year}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-zen-200 font-medium group-hover:text-gold-400 transition-colors">
              {game.title}
            </h3>

            {/* Players */}
            <p className="text-zen-500 text-sm mt-1">
              {game.white} vs {game.black}
            </p>

            {/* Result and opening */}
            <div className="flex items-center gap-2 mt-2 text-xs text-zen-600">
              <span className="text-gold-400">{game.result}</span>
              <span>•</span>
              <span>{game.opening}</span>
            </div>

            {/* Themes */}
            <div className="flex flex-wrap gap-1 mt-3">
              {game.themes.slice(0, 3).map((theme, i) => (
                <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-zen-800/40 text-zen-500">
                  {theme}
                </span>
              ))}
            </div>

            {/* Has annotations indicator */}
            <div className="mt-3 pt-2 border-t border-zen-700/20 flex items-center gap-2">
              {game.moves.length > 0 ? (
                <>
                  <span className="text-emerald-400 text-xs">✓ Fully annotated</span>
                  <span className="text-zen-600 text-xs">{game.moves.length} moves</span>
                </>
              ) : (
                <span className="text-cyan-400 text-xs">📚 View from legend database</span>
              )}
            </div>

            {/* Difficulty */}
            <div className="mt-2 text-gold-400/50 text-xs">
              {'★'.repeat(game.difficulty)}{'☆'.repeat(5 - game.difficulty)}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zen-500">No games match your filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilterEra('all');
              setFilterCategory('all');
            }}
            className="zen-button mt-4"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="glass-card-subtle p-5 mt-8">
        <h3 className="text-sm text-zen-500 uppercase tracking-wider mb-3">Chess Eras</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
          <div>
            <span className="text-rose-400">●</span>
            <span className="text-zen-400 ml-2">Romantic Era (1850s)</span>
            <p className="text-zen-600 text-xs ml-4">Bold sacrifices, king hunts, beauty over material</p>
          </div>
          <div>
            <span className="text-amber-400">●</span>
            <span className="text-zen-400 ml-2">Classical Era (1880-1920)</span>
            <p className="text-zen-600 text-xs ml-4">Systematic principles, center control, development</p>
          </div>
          <div>
            <span className="text-violet-400">●</span>
            <span className="text-zen-400 ml-2">Hypermodern (1920s)</span>
            <p className="text-zen-600 text-xs ml-4">Control center from afar, fianchetto bishops</p>
          </div>
          <div>
            <span className="text-red-400">●</span>
            <span className="text-zen-400 ml-2">Soviet Era (1940-1970)</span>
            <p className="text-zen-600 text-xs ml-4">Deep preparation, prophylaxis, scientific approach</p>
          </div>
          <div>
            <span className="text-blue-400">●</span>
            <span className="text-zen-400 ml-2">Modern Era (1970-2000)</span>
            <p className="text-zen-600 text-xs ml-4">Computer influence begins, dynamic balance</p>
          </div>
          <div>
            <span className="text-emerald-400">●</span>
            <span className="text-zen-400 ml-2">Contemporary (2000+)</span>
            <p className="text-zen-600 text-xs ml-4">Engine preparation, universal players, no weaknesses</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamesPage;

