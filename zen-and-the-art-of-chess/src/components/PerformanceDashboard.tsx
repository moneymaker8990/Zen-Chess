// ============================================
// PERFORMANCE DASHBOARD
// Analytics and statistics visualization
// ============================================

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

// ============================================
// TYPES
// ============================================

interface GameData {
  date: number;
  result: 'win' | 'loss' | 'draw';
  accuracy?: number;
  mode?: string;
}

interface PuzzleData {
  date: number;
  solved: boolean;
  timeSeconds: number;
  rating?: number;
}

// ============================================
// MAIN DASHBOARD
// ============================================

export function PerformanceDashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('30d');
  
  // Load data from localStorage
  const gameHistory = useMemo(() => {
    try {
      const data = localStorage.getItem('zenChessGameHistory');
      return data ? JSON.parse(data) as GameData[] : [];
    } catch {
      return [];
    }
  }, []);

  const coachData = useMemo(() => {
    try {
      const data = localStorage.getItem('zen-chess-coach');
      if (!data) return null;
      return JSON.parse(data)?.state?.state || null;
    } catch {
      return null;
    }
  }, []);

  const puzzleStats = useMemo(() => {
    try {
      const data = localStorage.getItem('zenChessPuzzleStats');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, []);

  // Filter by time range
  const filteredGames = useMemo(() => {
    if (timeRange === 'all') return gameHistory;
    
    const now = Date.now();
    const cutoff = timeRange === '7d' 
      ? now - 7 * 24 * 60 * 60 * 1000
      : now - 30 * 24 * 60 * 60 * 1000;
    
    return gameHistory.filter(g => g.date > cutoff);
  }, [gameHistory, timeRange]);

  // Calculate stats
  const stats = useMemo(() => {
    const wins = filteredGames.filter(g => g.result === 'win').length;
    const losses = filteredGames.filter(g => g.result === 'loss').length;
    const draws = filteredGames.filter(g => g.result === 'draw').length;
    const total = filteredGames.length;
    
    const withAccuracy = filteredGames.filter(g => g.accuracy !== undefined);
    const avgAccuracy = withAccuracy.length > 0
      ? Math.round(withAccuracy.reduce((s, g) => s + (g.accuracy || 0), 0) / withAccuracy.length)
      : 0;

    const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;

    return {
      wins,
      losses,
      draws,
      total,
      winRate,
      avgAccuracy,
    };
  }, [filteredGames]);

  // Calculate daily activity for chart
  const dailyActivity = useMemo(() => {
    const days = timeRange === '7d' ? 7 : 30;
    const activity: { date: string; games: number; puzzles: number; wins: number }[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayStart = new Date(dateStr).getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;
      
      const dayGames = gameHistory.filter(g => g.date >= dayStart && g.date < dayEnd);
      
      activity.push({
        date: date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' }),
        games: dayGames.length,
        puzzles: 0, // Would need puzzle history
        wins: dayGames.filter(g => g.result === 'win').length,
      });
    }
    
    return activity;
  }, [gameHistory, timeRange]);

  // Get accuracy trend
  const accuracyTrend = useMemo(() => {
    return filteredGames
      .filter(g => g.accuracy !== undefined)
      .slice(-20)
      .map((g, i) => ({
        game: i + 1,
        accuracy: g.accuracy || 0,
        result: g.result,
      }));
  }, [filteredGames]);

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
          Performance Analytics
        </h2>
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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Games"
          value={stats.total}
          subvalue={`${stats.wins}W / ${stats.losses}L / ${stats.draws}D`}
          icon="🎮"
          color="#3b82f6"
        />
        <StatCard
          label="Win Rate"
          value={`${stats.winRate}%`}
          trend={stats.winRate >= 50 ? 'up' : 'down'}
          icon="📈"
          color={stats.winRate >= 50 ? '#22c55e' : '#ef4444'}
        />
        <StatCard
          label="Avg Accuracy"
          value={`${stats.avgAccuracy}%`}
          trend={stats.avgAccuracy >= 70 ? 'up' : 'neutral'}
          icon="🎯"
          color={stats.avgAccuracy >= 80 ? '#22c55e' : stats.avgAccuracy >= 60 ? '#f59e0b' : '#ef4444'}
        />
        <StatCard
          label="Puzzle Rating"
          value={puzzleStats?.rating || 'N/A'}
          icon="🧩"
          color="#a855f7"
        />
      </div>

      {/* Activity Chart */}
      <div className="card p-6">
        <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
          Daily Activity
        </h3>
        <ActivityChart data={dailyActivity} />
      </div>

      {/* Accuracy Trend */}
      {accuracyTrend.length > 0 && (
        <div className="card p-6">
          <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
            Accuracy Trend (Last {accuracyTrend.length} Games)
          </h3>
          <AccuracyChart data={accuracyTrend} />
        </div>
      )}

      {/* Result Distribution */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
            Result Distribution
          </h3>
          <ResultsPie wins={stats.wins} losses={stats.losses} draws={stats.draws} />
        </div>
        
        <div className="card p-6">
          <h3 className="font-medium mb-4" style={{ color: 'var(--text-primary)' }}>
            Key Insights
          </h3>
          <InsightsList stats={stats} coachData={coachData} />
        </div>
      </div>
    </div>
  );
}

// ============================================
// STAT CARD COMPONENT
// ============================================

function StatCard({ 
  label, 
  value, 
  subvalue,
  trend,
  icon, 
  color 
}: { 
  label: string;
  value: string | number;
  subvalue?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-4"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className={`text-xs ${
            trend === 'up' ? 'text-green-400' : 
            trend === 'down' ? 'text-red-400' : 
            'text-gray-400'
          }`}>
            {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '●'}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold" style={{ color }}>
        {value}
      </div>
      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {label}
      </div>
      {subvalue && (
        <div className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
          {subvalue}
        </div>
      )}
    </motion.div>
  );
}

// ============================================
// ACTIVITY CHART
// ============================================

function ActivityChart({ data }: { data: { date: string; games: number; wins: number }[] }) {
  const maxGames = Math.max(...data.map(d => d.games), 1);
  
  return (
    <div className="h-48">
      <div className="flex items-end justify-between h-full gap-1">
        {data.map((day, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full flex flex-col justify-end"
              style={{ height: '160px' }}
            >
              {/* Games bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(day.games / maxGames) * 100}%` }}
                className="w-full rounded-t relative overflow-hidden"
                style={{ 
                  background: 'var(--bg-tertiary)',
                  minHeight: day.games > 0 ? '4px' : '0',
                }}
              >
                {/* Wins portion */}
                <div 
                  className="absolute bottom-0 w-full"
                  style={{ 
                    height: day.games > 0 ? `${(day.wins / day.games) * 100}%` : '0',
                    background: '#22c55e',
                  }}
                />
              </motion.div>
            </div>
            <div 
              className="text-xs mt-2 truncate w-full text-center"
              style={{ color: 'var(--text-muted)' }}
            >
              {day.date.split(' ')[0]}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ background: 'var(--bg-tertiary)' }} />
          <span>Losses</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ background: '#22c55e' }} />
          <span>Wins</span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ACCURACY CHART
// ============================================

function AccuracyChart({ data }: { data: { game: number; accuracy: number; result: string }[] }) {
  const max = 100;
  const min = Math.min(...data.map(d => d.accuracy), 40);
  const range = max - min;
  
  return (
    <div className="h-40">
      <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line
            key={y}
            x1="0"
            y1={160 - (y / 100) * 160}
            x2="400"
            y2={160 - (y / 100) * 160}
            stroke="var(--border-subtle)"
            strokeWidth="1"
            strokeDasharray={y === 50 ? "0" : "4"}
          />
        ))}
        
        {/* Line */}
        <polyline
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
          points={data.map((d, i) => 
            `${(i / (data.length - 1)) * 400},${160 - ((d.accuracy - min) / range) * 140}`
          ).join(' ')}
        />
        
        {/* Points */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={(i / (data.length - 1)) * 400}
            cy={160 - ((d.accuracy - min) / range) * 140}
            r="4"
            fill={d.result === 'win' ? '#22c55e' : d.result === 'loss' ? '#ef4444' : '#f59e0b'}
          />
        ))}
      </svg>
      <div className="flex justify-between text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
        <span>Game 1</span>
        <span>Game {data.length}</span>
      </div>
    </div>
  );
}

// ============================================
// RESULTS PIE CHART
// ============================================

function ResultsPie({ wins, losses, draws }: { wins: number; losses: number; draws: number }) {
  const total = wins + losses + draws;
  if (total === 0) {
    return (
      <div className="h-48 flex items-center justify-center" style={{ color: 'var(--text-muted)' }}>
        No games played yet
      </div>
    );
  }

  const winPct = (wins / total) * 100;
  const lossPct = (losses / total) * 100;
  const drawPct = (draws / total) * 100;

  // Calculate SVG arc parameters
  const winAngle = (winPct / 100) * 360;
  const lossAngle = (lossPct / 100) * 360;
  
  return (
    <div className="flex items-center gap-8">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {/* Win arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#22c55e"
            strokeWidth="20"
            strokeDasharray={`${winPct * 2.51} 251`}
          />
          {/* Loss arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#ef4444"
            strokeWidth="20"
            strokeDasharray={`${lossPct * 2.51} 251`}
            strokeDashoffset={-winPct * 2.51}
          />
          {/* Draw arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="20"
            strokeDasharray={`${drawPct * 2.51} 251`}
            strokeDashoffset={-(winPct + lossPct) * 2.51}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {total}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              games
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ background: '#22c55e' }} />
          <span style={{ color: 'var(--text-secondary)' }}>
            Wins: {wins} ({winPct.toFixed(1)}%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ background: '#ef4444' }} />
          <span style={{ color: 'var(--text-secondary)' }}>
            Losses: {losses} ({lossPct.toFixed(1)}%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ background: '#f59e0b' }} />
          <span style={{ color: 'var(--text-secondary)' }}>
            Draws: {draws} ({drawPct.toFixed(1)}%)
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================
// INSIGHTS LIST
// ============================================

function InsightsList({ stats, coachData }: { stats: any; coachData: any }) {
  const insights: { icon: string; text: string; type: 'positive' | 'negative' | 'neutral' }[] = [];
  
  // Generate insights based on data
  if (stats.winRate >= 60) {
    insights.push({ icon: '🎉', text: `Excellent win rate of ${stats.winRate}%!`, type: 'positive' });
  } else if (stats.winRate < 40 && stats.total > 5) {
    insights.push({ icon: '💪', text: 'Win rate below 40% - focus on fundamentals', type: 'negative' });
  }
  
  if (stats.avgAccuracy >= 80) {
    insights.push({ icon: '🎯', text: 'Great accuracy! You play clean games.', type: 'positive' });
  } else if (stats.avgAccuracy < 60 && stats.total > 5) {
    insights.push({ icon: '📚', text: 'Accuracy below 60% - try slower time controls', type: 'negative' });
  }
  
  if (coachData?.emotionalProfile?.chessProfile?.weakestPhase) {
    insights.push({ 
      icon: '🔍', 
      text: `Focus area: ${coachData.emotionalProfile.chessProfile.weakestPhase.toLowerCase()}`,
      type: 'neutral',
    });
  }
  
  if (stats.total === 0) {
    insights.push({ icon: '🎮', text: 'Play some games to see insights!', type: 'neutral' });
  }
  
  return (
    <div className="space-y-3">
      {insights.map((insight, i) => (
        <div 
          key={i}
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{ 
            background: insight.type === 'positive' ? 'rgba(34, 197, 94, 0.1)' :
                       insight.type === 'negative' ? 'rgba(239, 68, 68, 0.1)' :
                       'var(--bg-tertiary)',
          }}
        >
          <span className="text-xl">{insight.icon}</span>
          <span style={{ color: 'var(--text-secondary)' }}>{insight.text}</span>
        </div>
      ))}
    </div>
  );
}





