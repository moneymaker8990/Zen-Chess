// ============================================
// UNIFIED PERFORMANCE DASHBOARD
// Aggregates metrics from all training stores
// ============================================

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/BackButton';
import { useProgressStore } from '@/state/useStore';
import {
  useMistakeLibraryStore,
  usePatternRecognitionStore,
  useCognitiveMetricsStore,
  useOpeningRepertoireStore,
} from '@/state/trainingStore';
import { loadPatternProgress } from '@/lib/spacedRepetition';

// ============================================
// TYPES
// ============================================

type TimeRange = '7d' | '30d' | 'all';

interface SkillData {
  name: string;
  value: number;
  max: number;
  color: string;
}

interface GameHistoryEntry {
  id: string;
  date: number;
  result: 'win' | 'loss' | 'draw';
  accuracy?: number;
}

interface SRSCardWithStatus {
  status: string;
}

// ============================================
// MAIN COMPONENT
// ============================================

export function PerformanceDashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  // Get data from stores
  const progressStore = useProgressStore();
  const mistakeStore = useMistakeLibraryStore();
  const patternStore = usePatternRecognitionStore();
  const cognitiveStore = useCognitiveMetricsStore();
  const openingStore = useOpeningRepertoireStore();

  // Load SRS progress data
  const patternProgress = useMemo(() => loadPatternProgress(), []);
  const endgameProgress = useMemo(() => {
    try {
      const data = localStorage.getItem('zen-chess-srs-endgames');
      return data ? JSON.parse(data) : { cards: {}, totalXP: 0, streakDays: 0 };
    } catch {
      return { cards: {}, totalXP: 0, streakDays: 0 };
    }
  }, []);

  // Load game history from localStorage
  const gameHistory = useMemo((): GameHistoryEntry[] => {
    try {
      const data = localStorage.getItem('zenChessGameHistory');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }, []);

  // Filter by time range
  const filteredGames = useMemo(() => {
    if (timeRange === 'all') return gameHistory;
    const now = Date.now();
    const cutoff = timeRange === '7d'
      ? now - 7 * 24 * 60 * 60 * 1000
      : now - 30 * 24 * 60 * 60 * 1000;
    return gameHistory.filter((g: GameHistoryEntry) => g.date > cutoff);
  }, [gameHistory, timeRange]);

  // Calculate overview stats
  const overviewStats = useMemo(() => {
    const wins = filteredGames.filter((g: GameHistoryEntry) => g.result === 'win').length;
    const losses = filteredGames.filter((g: GameHistoryEntry) => g.result === 'loss').length;
    const draws = filteredGames.filter((g: GameHistoryEntry) => g.result === 'draw').length;
    const total = filteredGames.length;
    const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

    const withAccuracy = filteredGames.filter((g: GameHistoryEntry) => g.accuracy !== undefined);
    const avgAccuracy = withAccuracy.length > 0
      ? Math.round(withAccuracy.reduce((s: number, g: GameHistoryEntry) => s + (g.accuracy || 0), 0) / withAccuracy.length)
      : 0;

    return { wins, losses, draws, total, winRate, avgAccuracy };
  }, [filteredGames]);

  // Calculate skill radar data
  const skillRadar = useMemo((): SkillData[] => {
    const mistakeStats = mistakeStore.getMistakeStats();
    const patternProfilesValues = patternStore.profiles;

    // Calculate pattern success rate
    const patternSuccessRate = patternProfilesValues.length > 0
      ? patternProfilesValues.reduce((sum, p) => sum + p.successRate, 0) / patternProfilesValues.length * 100
      : 50;

    // Calculate opening mastery from repertoires
    const whiteRep = openingStore.repertoires.find((r) => r.color === 'white');
    const openingMastery = whiteRep && whiteRep.totalPositions > 0
      ? Math.round((whiteRep.masteredPositions / whiteRep.totalPositions) * 100)
      : 50;

    // Calculate SRS mastery for patterns
    const patternCards = Object.values(patternProgress.cards) as SRSCardWithStatus[];
    const masteredPatterns = patternCards.filter((c) => c.status === 'mastered').length;
    const totalPatternCards = patternCards.length || 1;
    const patternMastery = Math.round((masteredPatterns / totalPatternCards) * 100) || 0;

    // Calculate endgame mastery
    const endgameCards = Object.values(endgameProgress.cards || {}) as SRSCardWithStatus[];
    const masteredEndgames = endgameCards.filter((c) => c.status === 'mastered').length;
    const totalEndgameCards = endgameCards.length || 1;
    const endgameMastery = Math.round((masteredEndgames / Math.max(totalEndgameCards, 1)) * 100) || 0;

    // Phase accuracies from cognitive metrics
    const metrics = cognitiveStore.gameMetrics;
    const openingPhase = metrics.length > 0 ? Math.round(metrics.reduce((s, m) => s + m.openingAccuracy, 0) / metrics.length) : 50;
    const middlegamePhase = metrics.length > 0 ? Math.round(metrics.reduce((s, m) => s + m.middlegameAccuracy, 0) / metrics.length) : 50;

    return [
      { name: 'Tactics', value: patternSuccessRate, max: 100, color: '#f43f5e' },
      { name: 'Openings', value: openingMastery, max: 100, color: '#3b82f6' },
      { name: 'Patterns', value: patternMastery, max: 100, color: '#8b5cf6' },
      { name: 'Endgames', value: endgameMastery, max: 100, color: '#f59e0b' },
      { name: 'Opening Phase', value: openingPhase, max: 100, color: '#22c55e' },
      { name: 'Middlegame', value: middlegamePhase, max: 100, color: '#06b6d4' },
    ];
  }, [cognitiveStore, mistakeStore, patternStore, openingStore, patternProgress, endgameProgress]);

  // Get cognitive profile
  // Dashboard expects extended profile; compute from cognitive store
  const cogProfile = useMemo(() => {
    const p = cognitiveStore.profile;
    const trends = cognitiveStore.getRecentTrends();
    const metrics = cognitiveStore.gameMetrics;
    const avgOpening = metrics.length > 0 ? Math.round(metrics.reduce((s, m) => s + m.openingAccuracy, 0) / metrics.length) : 50;
    const avgMiddle = metrics.length > 0 ? Math.round(metrics.reduce((s, m) => s + m.middlegameAccuracy, 0) / metrics.length) : 50;
    const avgEnd = metrics.length > 0 ? Math.round(metrics.reduce((s, m) => s + m.endgameAccuracy, 0) / metrics.length) : 50;
    const performanceTrend = trends.accuracyTrend === 'UP' ? 'IMPROVING' : trends.accuracyTrend === 'DOWN' ? 'DECLINING' : 'STABLE';
    return p ? { ...p, performanceTrend, openingAccuracy: avgOpening, middlegameAccuracy: avgMiddle, endgameAccuracy: avgEnd } : { performanceTrend: 'STABLE' as const, openingAccuracy: 50, middlegameAccuracy: 50, endgameAccuracy: 50, strongestPhase: 'OPENING' as const, weakestPhase: 'ENDGAME' as const };
  }, [cognitiveStore]);

  // Get mistake stats
  const mistakeStats = useMemo(() => mistakeStore.getMistakeStats(), [mistakeStore]);

  // Weekly trends
  const weeklyActivity = useMemo(() => {
    const days = 7;
    const activity: { day: string; games: number; puzzles: number; study: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayStart = new Date(dateStr).getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;

      const dayGames = gameHistory.filter((g) => g.date >= dayStart && g.date < dayEnd).length;

      activity.push({
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        games: dayGames,
        puzzles: 0, // Would need puzzle history
        study: 0,   // Would need study session history
      });
    }

    return activity;
  }, [gameHistory]);

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton fallback="/" className="mb-4" />

      {/* Header */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
            📊
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
              Performance Dashboard
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Your unified chess performance overview
            </p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {(['7d', '30d', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                timeRange === range ? 'font-medium' : ''
              }`}
              style={{
                background: timeRange === range ? 'rgba(168, 85, 247, 0.2)' : 'var(--bg-secondary)',
                color: timeRange === range ? '#a855f7' : 'var(--text-muted)',
              }}
            >
              {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'All Time'}
            </button>
          ))}
        </div>
      </section>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard label="Games" value={overviewStats.total} icon="🎮" color="#3b82f6" />
        <StatCard label="Win Rate" value={`${overviewStats.winRate}%`} icon="📈" color={overviewStats.winRate >= 50 ? '#22c55e' : '#ef4444'} />
        <StatCard label="Accuracy" value={`${overviewStats.avgAccuracy}%`} icon="🎯" color={overviewStats.avgAccuracy >= 70 ? '#22c55e' : '#f59e0b'} />
        <StatCard label="Streak" value={`${progressStore.progress?.streakDays ?? 0}d`} icon="🔥" color="#f97316" />
        <StatCard label="Puzzles" value={progressStore.progress?.puzzlesSolved ?? 0} icon="🧩" color="#8b5cf6" />
        <StatCard label="XP" value={patternProgress.totalXP + endgameProgress.totalXP} icon="⭐" color="#eab308" />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skill Radar */}
        <div className="lg:col-span-2 card p-6">
          <h3 className="font-medium mb-6" style={{ color: 'var(--text-primary)' }}>
            Skill Composition
          </h3>
          <SkillRadarChart skills={skillRadar} />
        </div>

        {/* Performance Trend */}
        <div className="card p-6">
          <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
            Performance Trend
          </h3>
          <div className="space-y-4">
            <TrendIndicator
              label="Overall"
              trend={cogProfile.performanceTrend}
            />
            <div className="space-y-3">
              <PhaseBar label="Opening" value={cogProfile.openingAccuracy} color="#22c55e" />
              <PhaseBar label="Middlegame" value={cogProfile.middlegameAccuracy} color="#3b82f6" />
              <PhaseBar label="Endgame" value={cogProfile.endgameAccuracy} color="#f59e0b" />
            </div>
            <div className="pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-muted)' }}>Strongest Phase</span>
                <span className="font-medium" style={{ color: '#22c55e' }}>
                  {cogProfile.strongestPhase || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span style={{ color: 'var(--text-muted)' }}>Weakest Phase</span>
                <span className="font-medium" style={{ color: '#ef4444' }}>
                  {cogProfile.weakestPhase || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="card p-6">
          <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
            Weekly Activity
          </h3>
          <WeeklyChart data={weeklyActivity} />
        </div>

        {/* Mistake Analysis */}
        <div className="card p-6">
          <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
            Mistake Analysis
          </h3>
          {mistakeStats.total > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--text-muted)' }}>Total Mistakes Logged</span>
                <span className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                  {mistakeStats.total}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-muted)' }}>Most Common Pattern</span>
                  <span style={{ color: '#f43f5e' }}>{mistakeStats.mostCommonPattern}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-muted)' }}>Most Common Cause</span>
                  <span style={{ color: '#f59e0b' }}>{mistakeStats.mostCommonCause}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--text-muted)' }}>Avg Eval Drop</span>
                  <span style={{ color: '#ef4444' }}>-{mistakeStats.avgEvalDrop.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
              <div className="text-4xl mb-2">📝</div>
              <p>No mistakes logged yet</p>
              <p className="text-sm">Analyze games to start tracking mistakes</p>
            </div>
          )}
        </div>
      </div>

      {/* Training Progress */}
      <div className="card p-6">
        <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          Training Progress
        </h3>
        <div className="grid md:grid-cols-4 gap-6">
          <ProgressModule
            title="Positional Patterns"
            mastered={(Object.values(patternProgress.cards) as SRSCardWithStatus[]).filter((c) => c.status === 'mastered').length}
            total={126}
            icon="📚"
            color="#8b5cf6"
          />
          <ProgressModule
            title="Endgames"
            mastered={(Object.values(endgameProgress.cards || {}) as SRSCardWithStatus[]).filter((c) => c.status === 'mastered').length}
            total={25}
            icon="♚"
            color="#f59e0b"
          />
          <ProgressModule
            title="Openings"
            mastered={progressStore.progress?.completedOpenings?.size ?? 0}
            total={100}
            icon="📖"
            color="#3b82f6"
          />
          <ProgressModule
            title="Puzzles Solved"
            mastered={progressStore.progress?.puzzlesSolved ?? 0}
            total={1000}
            icon="🧩"
            color="#22c55e"
          />
        </div>
      </div>

      {/* Recommendations */}
      <div className="card p-6">
        <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          Recommended Focus Areas
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {cogProfile.weakestPhase && (
            <RecommendationCard
              title={`Practice ${cogProfile.weakestPhase}`}
              description={`Your ${cogProfile.weakestPhase.toLowerCase()} accuracy is below your other phases. Focus on this area.`}
              icon="🎯"
              color="#ef4444"
            />
          )}
          {mistakeStats.mostCommonPattern !== 'NONE' && (
            <RecommendationCard
              title={`Study ${mistakeStats.mostCommonPattern}`}
              description={`You frequently miss this pattern. Dedicate some puzzle time here.`}
              icon="🔍"
              color="#f59e0b"
            />
          )}
          <RecommendationCard
            title="Maintain Your Streak"
            description={`You're on a ${progressStore.progress?.streakDays ?? 0} day streak. Keep the momentum!`}
            icon="🔥"
            color="#22c55e"
          />
        </div>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTS
// ============================================

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-4 text-center"
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
    </motion.div>
  );
}

function SkillRadarChart({ skills }: { skills: SkillData[] }) {
  const size = 280;
  const center = size / 2;
  const radius = 100;
  const levels = 5;

  // Calculate points for each skill
  const points = skills.map((skill, i) => {
    const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
    const r = (skill.value / skill.max) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      labelX: center + (radius + 30) * Math.cos(angle),
      labelY: center + (radius + 30) * Math.sin(angle),
      skill,
    };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid circles */}
        {Array.from({ length: levels }, (_, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={(radius / levels) * (i + 1)}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}

        {/* Grid lines */}
        {skills.map((_, i) => {
          const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={center + radius * Math.cos(angle)}
              y2={center + radius * Math.sin(angle)}
              stroke="var(--border-subtle)"
              strokeWidth="1"
              opacity={0.5}
            />
          );
        })}

        {/* Data polygon */}
        <path
          d={pathD}
          fill="rgba(139, 92, 246, 0.2)"
          stroke="#8b5cf6"
          strokeWidth="2"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="5"
            fill={p.skill.color}
          />
        ))}

        {/* Labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            {p.skill.name}
          </text>
        ))}
      </svg>
    </div>
  );
}

function TrendIndicator({ label, trend }: { label: string; trend: 'IMPROVING' | 'STABLE' | 'DECLINING' | string }) {
  const trendConfig = {
    IMPROVING: { color: '#22c55e', icon: '📈', text: 'Improving' },
    STABLE: { color: '#f59e0b', icon: '➡️', text: 'Stable' },
    DECLINING: { color: '#ef4444', icon: '📉', text: 'Needs Work' },
  };

  const config = trendConfig[trend as keyof typeof trendConfig] || trendConfig.STABLE;

  return (
    <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
      <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <div className="flex items-center gap-2">
        <span>{config.icon}</span>
        <span className="font-medium" style={{ color: config.color }}>{config.text}</span>
      </div>
    </div>
  );
}

function PhaseBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  );
}

function WeeklyChart({ data }: { data: { day: string; games: number }[] }) {
  const maxGames = Math.max(...data.map(d => d.games), 1);

  return (
    <div className="h-40 flex items-end justify-between gap-2">
      {data.map((day, i) => (
        <div key={i} className="flex-1 flex flex-col items-center">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(day.games / maxGames) * 120}px` }}
            className="w-full rounded-t"
            style={{
              background: 'linear-gradient(to top, #8b5cf6, #a78bfa)',
              minHeight: day.games > 0 ? '4px' : '0',
            }}
          />
          <div className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            {day.day}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressModule({ title, mastered, total, icon, color }: { title: string; mastered: number; total: number; icon: string; color: string }) {
  const percentage = Math.round((mastered / total) * 100);

  return (
    <div className="text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{title}</div>
      <div className="text-2xl font-bold mt-1" style={{ color }}>
        {mastered} <span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/ {total}</span>
      </div>
      <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, background: color }}
        />
      </div>
      <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{percentage}% complete</div>
    </div>
  );
}

function RecommendationCard({ title, description, icon, color }: { title: string; description: string; icon: string; color: string }) {
  return (
    <div className="p-4 rounded-xl" style={{ background: `${color}15`, borderLeft: `4px solid ${color}` }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{title}</span>
      </div>
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{description}</p>
    </div>
  );
}

export default PerformanceDashboardPage;
