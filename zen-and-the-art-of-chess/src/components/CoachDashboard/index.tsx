// ============================================
// ZEN CHESS COACH DASHBOARD
// Display personalized recommendations, insights, and daily plan
// NOW WITH AI INTELLIGENCE INTEGRATION
// ============================================

import { useState, useEffect, useMemo } from 'react';
import { 
  useCoachStore, 
  useCoachRecommendations,
  useTodayStats,
  useCurrentMood,
  useCurrentFlow,
  useTiltRisk,
  useProfileConfidence,
  useRefreshRecommendations,
} from '@/state/coachStore';
import { 
  useAIIntelligence, 
  useSessionMomentum, 
  useFlowState as useAIFlowState,
  useOptimalActivity,
} from '@/lib/aiIntelligence';
import type { 
  CoachRecommendation, 
  ActionType,
  SessionMood,
  FlowState,
} from '@/lib/coachTypes';

// ============================================
// RECOMMENDATION CARD
// ============================================

interface RecommendationCardProps {
  recommendation: CoachRecommendation;
  onAction?: (actionType: ActionType, data?: Record<string, unknown>) => void;
  onDismiss?: () => void;
}

function RecommendationCard({ recommendation, onAction, onDismiss }: RecommendationCardProps) {
  const { dismissRecommendation, actOnRecommendation } = useCoachStore();
  
  const priorityColors = {
    CRITICAL: 'border-red-500/50 bg-red-500/10',
    HIGH: 'border-amber-500/50 bg-amber-500/10',
    MEDIUM: 'border-blue-500/30 bg-blue-500/5',
    LOW: 'border-zen-700/30 bg-zen-800/30',
  };
  
  const priorityIcons = {
    CRITICAL: '🚨',
    HIGH: '⚠️',
    MEDIUM: '💡',
    LOW: '✨',
  };
  
  const handleAction = () => {
    actOnRecommendation(recommendation.id);
    onAction?.(recommendation.actionType, recommendation.actionData);
  };
  
  const handleDismiss = () => {
    dismissRecommendation(recommendation.id);
    onDismiss?.();
  };

  return (
    <div className={`rounded-xl border p-4 transition-all ${priorityColors[recommendation.priority]}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span>{priorityIcons[recommendation.priority]}</span>
          <h4 className="font-medium text-zen-200">{recommendation.title}</h4>
        </div>
        <button 
          onClick={handleDismiss}
          className="text-zen-600 hover:text-zen-400 text-xs"
        >
          ✕
        </button>
      </div>
      
      {/* Message */}
      <p className="text-zen-400 text-sm mb-3 leading-relaxed">
        {recommendation.message}
      </p>
      
      {/* Reasoning (expandable) */}
      <details className="mb-3">
        <summary className="text-zen-600 text-xs cursor-pointer hover:text-zen-500">
          Why this recommendation?
        </summary>
        <p className="text-zen-500 text-xs mt-1 pl-2 border-l border-zen-700/50">
          {recommendation.reasoning}
        </p>
      </details>
      
      {/* Action button */}
      {recommendation.actionType !== 'NONE' && recommendation.actionLabel && (
        <button
          onClick={handleAction}
          className="w-full py-2 rounded-lg text-sm font-medium transition-all
            bg-zen-700/50 hover:bg-zen-600/50 text-zen-200"
        >
          {recommendation.actionLabel}
        </button>
      )}
    </div>
  );
}

// ============================================
// MOOD INDICATOR
// ============================================

function MoodIndicator({ mood, flow }: { mood: SessionMood; flow: FlowState }) {
  const moodConfig: Record<SessionMood, { icon: string; label: string; color: string }> = {
    FRESH: { icon: '🌅', label: 'Fresh', color: 'text-emerald-400' },
    WARMING_UP: { icon: '🔥', label: 'Warming Up', color: 'text-amber-400' },
    FOCUSED: { icon: '🎯', label: 'Focused', color: 'text-blue-400' },
    FATIGUED: { icon: '😮‍💨', label: 'Fatigued', color: 'text-orange-400' },
    TILTED: { icon: '😤', label: 'Tilted', color: 'text-red-400' },
  };
  
  const flowConfig: Record<FlowState, { icon: string; label: string }> = {
    NONE: { icon: '○', label: '' },
    BUILDING: { icon: '◐', label: 'Building flow' },
    IN_FLOW: { icon: '●', label: 'In flow!' },
    DISRUPTED: { icon: '◔', label: 'Flow disrupted' },
  };
  
  const currentMood = moodConfig[mood];
  const currentFlow = flowConfig[flow];
  
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">{currentMood.icon}</span>
        <span className={`text-sm font-medium ${currentMood.color}`}>
          {currentMood.label}
        </span>
      </div>
      {currentFlow.label && (
        <div className="flex items-center gap-1 text-zen-500 text-xs">
          <span>{currentFlow.icon}</span>
          <span>{currentFlow.label}</span>
        </div>
      )}
    </div>
  );
}

// ============================================
// TODAY'S STATS
// ============================================

function TodayStatsCard() {
  const stats = useTodayStats();
  
  return (
    <div className="glass-card-subtle p-4">
      <h3 className="text-xs uppercase tracking-wider text-zen-500 mb-3">
        Today's Progress
      </h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-light text-zen-200">
            {stats.gamesPlayed}
          </div>
          <div className="text-xs text-zen-500">
            Games ({stats.wins}W/{stats.losses}L)
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-light text-zen-200">
            {stats.puzzlesSolved}
          </div>
          <div className="text-xs text-zen-500">Puzzles</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-light text-zen-200">
            {stats.meditationMinutes}
          </div>
          <div className="text-xs text-zen-500">Mindful min</div>
        </div>
      </div>
      {stats.averageAccuracy > 0 && (
        <div className="mt-3 pt-3 border-t border-zen-700/30 text-center">
          <span className="text-zen-400 text-sm">
            Avg Accuracy: <strong>{stats.averageAccuracy.toFixed(1)}%</strong>
          </span>
        </div>
      )}
    </div>
  );
}

// ============================================
// INSIGHT CARD
// ============================================

function InsightCard({ type, title }: { type: 'time' | 'tilt' | 'phase' | 'session'; title: string }) {
  const { getInsight } = useCoachStore();
  const insight = getInsight(type);
  
  if (!insight) return null;
  
  return (
    <div className="glass-card-subtle p-4">
      <h4 className="text-xs uppercase tracking-wider text-zen-500 mb-2">{title}</h4>
      <p className="text-zen-300 text-sm">{insight}</p>
    </div>
  );
}

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================

interface CoachDashboardProps {
  onAction?: (actionType: ActionType, data?: Record<string, unknown>) => void;
  compact?: boolean;
}

export function CoachDashboard({ onAction, compact = false }: CoachDashboardProps) {
  const recommendations = useCoachRecommendations();
  const refreshRecommendations = useRefreshRecommendations();
  const mood = useCurrentMood();
  const flow = useCurrentFlow();
  const tiltRisk = useTiltRisk();
  const confidence = useProfileConfidence();
  const { getDailyPlan, getTotalGamesTracked } = useCoachStore();
  
  const [showDailyPlan, setShowDailyPlan] = useState(false);
  const dailyPlan = showDailyPlan ? getDailyPlan() : null;
  const totalGames = getTotalGamesTracked();
  
  // Refresh recommendations on mount
  useEffect(() => {
    refreshRecommendations();
  }, [refreshRecommendations]);
  
  if (compact) {
    // Compact mode: just show top recommendation and mood
    return (
      <div className="space-y-3">
        <MoodIndicator mood={mood} flow={flow} />
        
        {tiltRisk && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            ⚠️ Tilt risk detected. Consider taking a break.
          </div>
        )}
        
        {recommendations.length > 0 && (
          <RecommendationCard 
            recommendation={recommendations[0]} 
            onAction={onAction}
          />
        )}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header with mood */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif text-zen-200">Your Coach</h2>
          <p className="text-zen-500 text-sm">
            {confidence === 'LOW' ? 'Building your profile...' :
             confidence === 'MEDIUM' ? 'Learning your patterns...' :
             'Personalized insights ready'}
            {totalGames > 0 && ` (${totalGames} games tracked)`}
          </p>
        </div>
        <MoodIndicator mood={mood} flow={flow} />
      </div>
      
      {/* Tilt warning */}
      {tiltRisk && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚨</span>
            <div>
              <h4 className="font-medium text-red-300">Tilt Risk Detected</h4>
              <p className="text-red-400/80 text-sm">
                You're approaching your tilt threshold. Consider a break or breathing exercise.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Today's stats */}
      <TodayStatsCard />
      
      {/* Recommendations */}
      {recommendations.length > 0 ? (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-zen-300">Recommendations</h3>
          {recommendations.map((rec) => (
            <RecommendationCard 
              key={rec.id} 
              recommendation={rec} 
              onAction={onAction}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card-subtle p-4 text-center text-zen-500 text-sm">
          No recommendations right now. Keep playing to get personalized insights!
        </div>
      )}
      
      {/* Insights */}
      {confidence !== 'LOW' && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-zen-300">Insights</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <InsightCard type="time" title="Best Time to Play" />
            <InsightCard type="tilt" title="Your Tilt Pattern" />
            <InsightCard type="phase" title="Strongest Phase" />
            <InsightCard type="session" title="Session Insights" />
          </div>
        </div>
      )}
      
      {/* Daily Plan toggle */}
      <div>
        <button
          onClick={() => setShowDailyPlan(!showDailyPlan)}
          className="text-sm text-zen-400 hover:text-zen-300 transition-colors"
        >
          {showDailyPlan ? '▼ Hide Daily Plan' : '▶ View Daily Plan'}
        </button>
        
        {showDailyPlan && dailyPlan && (
          <div className="mt-3 p-4 rounded-xl bg-zen-800/30 border border-zen-700/30 space-y-4">
            <p className="text-zen-300 font-serif italic">{dailyPlan.greeting}</p>
            
            <div>
              <h4 className="text-xs uppercase tracking-wider text-zen-500 mb-2">
                Today's Focus
              </h4>
              <p className="text-zen-200 font-medium">{dailyPlan.primaryFocus.area}</p>
              <p className="text-zen-400 text-sm">{dailyPlan.primaryFocus.reason}</p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-wider text-zen-500 mb-2">
                Suggested Schedule
              </h4>
              <div className="space-y-2">
                {dailyPlan.suggestedActivities.map((activity, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-zen-500">{activity.duration}m</span>
                    <span className="text-zen-300">{activity.reason}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {dailyPlan.considerations.length > 0 && (
              <div>
                <h4 className="text-xs uppercase tracking-wider text-zen-500 mb-2">
                  Things to Consider
                </h4>
                <ul className="space-y-1">
                  {dailyPlan.considerations.map((c, i) => (
                    <li key={i} className="text-zen-400 text-sm flex items-start gap-2">
                      <span className="text-amber-400/50">•</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="text-xs text-zen-600 pt-2 border-t border-zen-700/30">
              Based on: {dailyPlan.basedOn.join(' • ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// TODAY'S FOCUS WIDGET (for HomePage)
// NOW WITH AI INTELLIGENCE FOR SMARTER SUGGESTIONS
// ============================================

interface TodaysFocusWidgetProps {
  onAction?: (actionType: ActionType, data?: Record<string, unknown>) => void;
}

export function TodaysFocusWidget({ onAction }: TodaysFocusWidgetProps) {
  const recommendations = useCoachRecommendations();
  const refreshRecommendations = useRefreshRecommendations();
  const { getDailyPlan } = useCoachStore();
  const tiltRisk = useTiltRisk();
  const mood = useCurrentMood();
  
  // === AI INTELLIGENCE INTEGRATION ===
  const momentum = useSessionMomentum();
  const isInFlow = useAIFlowState();
  const optimalActivity = useOptimalActivity();
  const { session, patterns, confidenceLevel } = useAIIntelligence();
  
  const plan = getDailyPlan();
  const topRec = recommendations[0];
  
  // Refresh on mount
  useEffect(() => {
    refreshRecommendations();
  }, [refreshRecommendations]);
  
  // AI-enhanced greeting based on session state
  const smartGreeting = useMemo(() => {
    if (isInFlow) return "You're in the zone. Keep that momentum going! 🔥";
    if (momentum === 'peak') return "Excellent focus today. You're playing at your best.";
    if (momentum === 'building') return "Warming up nicely. Building toward great things.";
    if (session.accuracyTrend === 'declining' && session.puzzlesAttempted > 5) {
      return "Consider mixing things up or taking a short break.";
    }
    if (patterns.puzzleWeaknesses.length > 0 && confidenceLevel === 'confident') {
      return `Ready to work on your ${patterns.puzzleWeaknesses[0].toLowerCase()} patterns?`;
    }
    return plan.greeting;
  }, [isInFlow, momentum, session, patterns, confidenceLevel, plan.greeting]);
  
  // AI-enhanced activity suggestion
  const smartActivitySuggestion = useMemo(() => {
    const activityLabels: Record<string, { label: string; icon: string }> = {
      puzzle: { label: 'Puzzles', icon: '⚡' },
      game: { label: 'Play a game', icon: '♟️' },
      study: { label: 'Study material', icon: '📖' },
      opening: { label: 'Opening practice', icon: '📚' },
      review: { label: 'Review session', icon: '🔄' },
      break: { label: 'Take a break', icon: '☕' },
    };
    return activityLabels[optimalActivity] || activityLabels.puzzle;
  }, [optimalActivity]);
  
  return (
    <div className="card p-4 sm:p-5">
      {/* AI-enhanced greeting */}
      <p className="text-sm sm:text-base mb-3 sm:mb-4" style={{ color: 'var(--text-secondary)' }}>
        {smartGreeting}
      </p>
      
      {/* Flow state indicator - subtle but present */}
      {isInFlow && (
        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3 text-xs sm:text-sm"
          style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80' }}
        >
          <span className="animate-pulse">●</span>
          <span>In flow state</span>
        </div>
      )}
      
      {/* Momentum indicator - very subtle */}
      {momentum === 'peak' && !isInFlow && (
        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg mb-3 text-xs sm:text-sm"
          style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24' }}
        >
          <span>🔥</span>
          <span>Peak performance</span>
        </div>
      )}
      
      {/* Tilt warning takes priority */}
      {tiltRisk ? (
        <div 
          className="p-3 rounded-lg mb-3 sm:mb-4"
          style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}
        >
          <p className="text-sm" style={{ color: '#fca5a5' }}>
            ⚠️ Consider taking a break to reset.
          </p>
        </div>
      ) : topRec && topRec.priority !== 'LOW' ? (
        <RecommendationCard 
          recommendation={topRec} 
          onAction={onAction}
        />
      ) : (
        <div className="space-y-3">
          <div>
            <h4 className="text-[10px] sm:text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
              AI Suggests
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl">{smartActivitySuggestion.icon}</span>
              <p className="font-medium text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>
                {smartActivitySuggestion.label}
              </p>
            </div>
          </div>
          
          {/* Weakness targeting suggestion - only when AI is confident */}
          {confidenceLevel === 'confident' && patterns.puzzleWeaknesses.length > 0 && (
            <div 
              className="px-3 py-2 rounded-lg text-xs sm:text-sm"
              style={{ background: 'var(--bg-elevated)' }}
            >
              <span style={{ color: 'var(--text-muted)' }}>Focus area: </span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {patterns.puzzleWeaknesses.slice(0, 2).join(', ').toLowerCase()}
              </span>
            </div>
          )}
          
          {plan.suggestedActivities.length > 0 && (
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              {plan.suggestedActivities.slice(0, 3).map((activity, i) => (
                <span 
                  key={i}
                  className="px-2 py-1 rounded-lg text-[10px] sm:text-xs"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
                >
                  {activity.duration}m {activity.activity.replace('START_', '').toLowerCase()}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Mood indicator - simplified */}
      <div className="mt-3 sm:mt-4 pt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
        <MoodIndicator mood={mood} flow="NONE" />
        {session.puzzlesAttempted > 0 && (
          <div className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>
            {session.puzzlesSolved}/{session.puzzlesAttempted} today
          </div>
        )}
      </div>
    </div>
  );
}

export default CoachDashboard;




