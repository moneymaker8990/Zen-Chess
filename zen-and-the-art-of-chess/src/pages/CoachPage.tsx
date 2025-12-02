// ============================================
// ZEN CHESS COACH PAGE
// A conversational AI coach that feels personal
// ============================================

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { 
  useCoachStore, 
  useCoachRecommendations,
  useTodayStats,
  useCurrentMood,
  useTiltRisk,
  useRefreshRecommendations,
  useProfileConfidence,
} from '@/state/coachStore';
import { 
  useAgentMessages, 
  useAgentStore 
} from '@/lib/agents/agentOrchestrator';
import { AGENT_PERSONALITIES } from '@/lib/agents/agentTypes';
import { 
  AgentsOverviewCard, 
  AgentInsightsSummary,
  RecentAgentActivity,
} from '@/components/AgentDashboard';
import type { ActionType, SessionMood } from '@/lib/coachTypes';

// ============================================
// ACTION ROUTING
// ============================================

const actionRoutes: Partial<Record<ActionType, string>> = {
  START_PUZZLES: '/train',
  START_GAME: '/play',
  START_CALM_PLAY: '/calm-play',
  START_MEDITATION: '/mind',
  START_BREATHING: '/mind',
  START_PATTERN_REVIEW: '/patterns',
  VIEW_MISTAKES: '/mistakes',
  VIEW_OPENINGS: '/openings',
  VIEW_PROGRESS: '/journey',
  START_SPARRING: '/sparring',
  VIEW_NOTES: '/notes',
  VIEW_STUDY_PLAN: '/study-plan',
};

// ============================================
// COACH MESSAGE GENERATOR
// This is where the "AI" personality lives
// ============================================

function generateCoachMessage(
  stats: ReturnType<typeof useTodayStats>,
  mood: SessionMood,
  tiltRisk: boolean,
  confidence: 'LOW' | 'MEDIUM' | 'HIGH',
  sessionMinutes: number,
  insights: {
    bestTime: string | null;
    tiltPattern: string | null;
    strongPhase: string | null;
    sessionLength: string | null;
  }
): { greeting: string; observation: string; advice: string; action: { label: string; route: string } } {
  
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  
  // TILT STATE - highest priority
  if (tiltRisk) {
    return {
      greeting: `${timeGreeting}.`,
      observation: `I've noticed you're on a losing streak. This happens to everyone — even grandmasters. But here's the thing: the next game you play while frustrated is almost always your worst game of the session. Your mind is looking for revenge, not good moves.`,
      advice: `Let's pause for just 5 minutes. A quick breathing exercise can reset your mental state completely. When you come back, you'll see the board differently.`,
      action: { label: 'Start Breathing Exercise', route: '/mind' },
    };
  }
  
  // LONG SESSION - tired state
  if (sessionMinutes > 90) {
    const hours = Math.floor(sessionMinutes / 60);
    const mins = Math.round(sessionMinutes % 60);
    return {
      greeting: `${timeGreeting}.`,
      observation: `You've been training for ${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} and ` : ''}${mins} minutes now. ${insights.sessionLength || "Most players start making more mistakes after 60-90 minutes — not because they're worse players, but because focus naturally fades."}`,
      advice: `I'd suggest taking a real break. Step away from the screen. When you return, you'll be playing at your best again.`,
      action: { label: 'Take a Break', route: '/mind' },
    };
  }
  
  // FRESH START - no activity today
  if (stats.gamesPlayed === 0 && stats.puzzlesSolved === 0) {
    if (confidence === 'LOW') {
      return {
        greeting: `${timeGreeting}! I'm your chess coach.`,
        observation: `I'm still getting to know your playing style. The more we train together, the more personalized my guidance becomes. I'll learn your strengths, when you play best, and what patterns give you trouble.`,
        advice: `Let's start with some puzzles to warm up your tactical vision. This also helps me understand how you think.`,
        action: { label: 'Start Training', route: '/train' },
      };
    }
    
    return {
      greeting: `${timeGreeting}.`,
      observation: `Fresh start today. ${insights.bestTime ? `Based on your history, ${insights.bestTime.toLowerCase()}` : "Your mind is fresh right now."} ${insights.strongPhase ? `I've noticed ${insights.strongPhase.toLowerCase()}` : ""}`,
      advice: `I'd recommend starting with 10-15 minutes of puzzles before your first game. It activates your pattern recognition and helps you find tactics faster.`,
      action: { label: 'Warm Up with Puzzles', route: '/train' },
    };
  }
  
  // WARMED UP - some puzzles done, no games
  if (stats.puzzlesSolved > 0 && stats.gamesPlayed === 0) {
    return {
      greeting: `${timeGreeting}.`,
      observation: `You've solved ${stats.puzzlesSolved} puzzle${stats.puzzlesSolved > 1 ? 's' : ''} today — your tactical vision is warmed up. This is a good time to play.`,
      advice: `Your pattern recognition is active now. A game will feel different than if you jumped straight in cold.`,
      action: { label: 'Play a Game', route: '/play' },
    };
  }
  
  // ACTIVE SESSION - games and puzzles
  if (stats.gamesPlayed > 0) {
    const winRate = stats.gamesPlayed > 0 ? (stats.wins / stats.gamesPlayed) * 100 : 0;
    
    if (stats.wins > stats.losses) {
      return {
        greeting: `${timeGreeting}.`,
        observation: `Strong session so far — ${stats.wins} win${stats.wins > 1 ? 's' : ''} from ${stats.gamesPlayed} game${stats.gamesPlayed > 1 ? 's' : ''}. You're in a good rhythm. ${mood === 'FOCUSED' ? "I can see you're in the zone right now." : ""}`,
        advice: `When you're winning, the temptation is to keep playing until you lose. Consider ending on a high note, or switch to calm play mode to maintain focus.`,
        action: { label: 'Continue with Calm Play', route: '/calm-play' },
      };
    }
    
    if (stats.wins < stats.losses) {
      return {
        greeting: `${timeGreeting}.`,
        observation: `Tough session today — ${stats.losses} loss${stats.losses > 1 ? 'es' : ''} from ${stats.gamesPlayed} game${stats.gamesPlayed > 1 ? 's' : ''}. ${insights.tiltPattern || "Losses are how we learn, but learning requires reflection, not just more games."}`,
        advice: `Let's review what went wrong. Looking at your mistakes when they're fresh helps you avoid them next time.`,
        action: { label: 'Review Mistakes', route: '/mistakes' },
      };
    }
    
    // Even record
    return {
      greeting: `${timeGreeting}.`,
      observation: `Balanced session — ${stats.wins} win${stats.wins > 1 ? 's' : ''}, ${stats.losses} loss${stats.losses > 1 ? 'es' : ''} from ${stats.gamesPlayed} game${stats.gamesPlayed > 1 ? 's' : ''}. You're holding steady.`,
      advice: `This is a good state to be in. Want to work on openings or continue playing?`,
      action: { label: 'Practice Openings', route: '/openings' },
    };
  }
  
  // DEFAULT FALLBACK
  return {
    greeting: `${timeGreeting}.`,
    observation: `Ready when you are.`,
    advice: `What would you like to work on today?`,
    action: { label: 'Start Training', route: '/train' },
  };
}

// ============================================
// MAIN COMPONENT
// ============================================

export function CoachPage() {
  const navigate = useNavigate();
  const recommendations = useCoachRecommendations();
  const refreshRecommendations = useRefreshRecommendations();
  const stats = useTodayStats();
  const mood = useCurrentMood();
  const tiltRisk = useTiltRisk();
  const confidence = useProfileConfidence();
  const { getInsight, getDailyPlan } = useCoachStore();
  const state = useCoachStore((s) => s.state);
  
  // Agent messages
  const agentMessages = useAgentMessages();
  const { markActedOn, dismissMessage } = useAgentStore();
  
  const [isTyping, setIsTyping] = useState(true);
  const [showAgentPanel, setShowAgentPanel] = useState(false);
  
  // Calculate session time
  const sessionMinutes = (Date.now() - state.sessionStartTime) / 60000;
  
  // Get insights
  const insights = {
    bestTime: getInsight('time'),
    tiltPattern: getInsight('tilt'),
    strongPhase: getInsight('phase'),
    sessionLength: getInsight('session'),
  };
  
  // Generate the coach's message
  const message = generateCoachMessage(
    stats,
    mood,
    tiltRisk,
    confidence,
    sessionMinutes,
    insights
  );
  
  useEffect(() => {
    refreshRecommendations();
    // Simulate typing effect
    const timer = setTimeout(() => setIsTyping(false), 800);
    return () => clearTimeout(timer);
  }, [refreshRecommendations]);

  return (
    <div className="min-h-[80vh] flex flex-col px-4 py-8 animate-fade-in max-w-2xl mx-auto">
      
      {/* Coach Header */}
      <div className="flex items-center gap-4 mb-8">
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
          style={{ 
            background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
            boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)',
          }}
        >
          ♔
        </div>
        <div>
          <h1 className="text-xl font-display font-medium" style={{ color: 'var(--text-primary)' }}>
            Your Coach
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {confidence === 'LOW' ? 'Getting to know you' : 
             confidence === 'MEDIUM' ? 'Learning your patterns' :
             'Personalized guidance'}
          </p>
        </div>
      </div>

      {/* Coach Message */}
      <div className="space-y-6 mb-8">
        {/* Greeting */}
        <div 
          className="p-6 rounded-2xl"
          style={{ 
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {isTyping ? (
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <span className="animate-pulse">●</span>
              <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</span>
              <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</span>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg font-serif italic" style={{ color: 'var(--text-secondary)' }}>
                {message.greeting}
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
                {message.observation}
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {message.advice}
              </p>
            </div>
          )}
        </div>

        {/* Primary Action */}
        {!isTyping && (
          <button
            onClick={() => navigate(message.action.route)}
            className="w-full p-4 rounded-xl font-medium text-white transition-all hover:scale-[1.02] hover:brightness-110"
            style={{ 
              background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
            }}
          >
            {message.action.label}
          </button>
        )}
      </div>

      {/* Quick Stats (subtle) */}
      {!isTyping && (
        <div className="flex justify-center gap-8 py-4 mb-6">
          <MiniStat label="Games" value={stats.gamesPlayed} subvalue={`${stats.wins}W/${stats.losses}L`} />
          <MiniStat label="Puzzles" value={stats.puzzlesSolved} />
          <MiniStat label="Mindful" value={`${stats.meditationMinutes}m`} />
        </div>
      )}

      {/* Alternative Actions */}
      {!isTyping && (
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wider text-center" style={{ color: 'var(--text-muted)' }}>
            Or choose your own path
          </p>
          <div className="grid grid-cols-2 gap-3">
            <QuickOption label="Play a Game" icon="⚔" onClick={() => navigate('/play')} />
            <QuickOption label="Solve Puzzles" icon="♟" onClick={() => navigate('/train')} />
            <QuickOption label="Study Openings" icon="📖" onClick={() => navigate('/openings')} />
            <QuickOption label="Mindfulness" icon="🧘" onClick={() => navigate('/mind')} />
          </div>
        </div>
      )}

      {/* Learning Status (for new users) */}
      {!isTyping && confidence === 'LOW' && (
        <div 
          className="mt-8 p-4 rounded-xl text-center"
          style={{ 
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
          }}
        >
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            <strong style={{ color: 'var(--text-secondary)' }}>I'm learning about you.</strong>
            {' '}Play a few games and I'll start noticing your patterns — when you play best, 
            what gives you trouble, and how to help you improve.
          </p>
        </div>
      )}

      {/* Insights (for established users) */}
      {!isTyping && confidence !== 'LOW' && (insights.bestTime || insights.tiltPattern) && (
        <div className="mt-8 space-y-4">
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            What I've learned about you
          </p>
          <div className="space-y-2">
            {insights.bestTime && (
              <InsightPill text={insights.bestTime} />
            )}
            {insights.tiltPattern && (
              <InsightPill text={insights.tiltPattern} />
            )}
            {insights.strongPhase && (
              <InsightPill text={insights.strongPhase} />
            )}
          </div>
        </div>
      )}

      {/* Agent Messages Panel */}
      {!isTyping && agentMessages.length > 0 && (
        <div className="mt-8 space-y-4">
          <button
            onClick={() => setShowAgentPanel(!showAgentPanel)}
            className="flex items-center justify-between w-full"
          >
            <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              🤖 Agent Messages ({agentMessages.length})
            </p>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {showAgentPanel ? '▲' : '▼'}
            </span>
          </button>
          
          {showAgentPanel && (
            <div className="space-y-3">
              {agentMessages.map((msg) => {
                const personality = AGENT_PERSONALITIES[msg.agentId];
                return (
                  <div
                    key={msg.id}
                    className="p-4 rounded-xl"
                    style={{ 
                      background: `${personality.color}10`,
                      border: `1px solid ${personality.color}30`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
                        style={{ background: `${personality.color}30` }}
                      >
                        {personality.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm" style={{ color: personality.color }}>
                            {personality.name}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                            {msg.category}
                          </span>
                        </div>
                        <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                          {msg.title}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          {msg.body}
                        </p>
                        {msg.primaryAction && (
                          <button
                            onClick={() => {
                              markActedOn(msg.id);
                              if (msg.primaryAction?.route) {
                                navigate(msg.primaryAction.route);
                              }
                            }}
                            className="mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-[1.02]"
                            style={{ 
                              background: personality.color,
                              color: 'white',
                            }}
                          >
                            {msg.primaryAction.label}
                          </button>
                        )}
                      </div>
                      <button
                        onClick={() => dismissMessage(msg.id)}
                        className="p-1 rounded hover:bg-white/10 shrink-0"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Agent Insights Summary */}
      {!isTyping && (
        <div className="mt-8 space-y-4">
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Agent Analysis
          </p>
          <AgentInsightsSummary />
        </div>
      )}

      {/* Meet Your Agents */}
      {!isTyping && (
        <div className="mt-8 space-y-4">
          <AgentsOverviewCard />
        </div>
      )}
    </div>
  );
}

// ============================================
// HELPER COMPONENTS
// ============================================

function MiniStat({ label, value, subvalue }: { label: string; value: string | number; subvalue?: string }) {
  return (
    <div className="text-center">
      <div className="text-lg font-light" style={{ color: 'var(--text-primary)' }}>
        {value}
      </div>
      <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
        {label}
      </div>
      {subvalue && (
        <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {subvalue}
        </div>
      )}
    </div>
  );
}

function QuickOption({ label, icon, onClick }: { label: string; icon: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]"
      style={{ 
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </span>
    </button>
  );
}

function InsightPill({ text }: { text: string }) {
  return (
    <div 
      className="p-3 rounded-lg text-sm"
      style={{ 
        background: 'var(--bg-tertiary)',
        color: 'var(--text-tertiary)',
      }}
    >
      {text}
    </div>
  );
}

export default CoachPage;
