// ============================================
// AGENT DASHBOARD
// Full view of all agents and their status
// ============================================

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  useAgentStore, 
  useAgentMessages,
} from '@/lib/agents/agentOrchestrator';
import { AGENT_PERSONALITIES } from '@/lib/agents/agentTypes';
import type { AgentId, AgentMessage } from '@/lib/agents/agentTypes';

// ============================================
// AGENTS OVERVIEW CARD
// Shows all agents in a compact grid
// ============================================

export function AgentsOverviewCard() {
  const state = useAgentStore((s) => s.state);
  const messages = useAgentMessages();
  const [expanded, setExpanded] = useState(false);
  
  // Group messages by agent
  const messagesByAgent = useMemo(() => {
    const grouped: Record<string, AgentMessage[]> = {};
    messages.forEach(msg => {
      if (!grouped[msg.agentId]) grouped[msg.agentId] = [];
      grouped[msg.agentId].push(msg);
    });
    return grouped;
  }, [messages]);

  const enabledAgents = state.enabledAgents;
  const primaryAgents: AgentId[] = ['coach', 'inner-compass', 'training', 'mindfulness'];
  const backgroundAgents: AgentId[] = ['insight-engine', 'motivator', 'flow-keeper', 'session-manager'];
  const specializedAgents: AgentId[] = ['opening', 'legend', 'pattern', 'journey'];

  return (
    <div 
      className="card overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {primaryAgents.slice(0, 4).map(agentId => {
              const personality = AGENT_PERSONALITIES[agentId];
              const hasMessages = (messagesByAgent[agentId]?.length || 0) > 0;
              return (
                <div
                  key={agentId}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm border-2"
                  style={{ 
                    background: `${personality.color}30`,
                    borderColor: 'var(--bg-secondary)',
                  }}
                  title={personality.name}
                >
                  {personality.icon}
                  {hasMessages && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
              );
            })}
          </div>
          <div>
            <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
              AI Coaching System
            </span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
              {enabledAgents.length} Active
            </span>
          </div>
        </div>
        <span className="text-lg">{expanded ? '▲' : '▼'}</span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t overflow-hidden"
            style={{ borderColor: 'var(--border-subtle)' }}
          >
            <div className="p-4 space-y-4">
              {/* Primary Agents */}
              <div>
                <h4 className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                  Core Agents
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {primaryAgents.map(agentId => (
                    <AgentCard key={agentId} agentId={agentId} messages={messagesByAgent[agentId] || []} />
                  ))}
                </div>
              </div>

              {/* Specialized Agents */}
              <div>
                <h4 className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                  Specialized Agents
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {specializedAgents.map(agentId => (
                    <AgentCard key={agentId} agentId={agentId} messages={messagesByAgent[agentId] || []} compact />
                  ))}
                </div>
              </div>

              {/* Background Agents */}
              <div>
                <h4 className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                  Background Analysis
                </h4>
                <div className="flex flex-wrap gap-2">
                  {backgroundAgents.map(agentId => {
                    const personality = AGENT_PERSONALITIES[agentId];
                    return (
                      <div
                        key={agentId}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                        style={{ background: `${personality.color}15` }}
                      >
                        <span>{personality.icon}</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{personality.name}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// SINGLE AGENT CARD
// ============================================

function AgentCard({ 
  agentId, 
  messages,
  compact = false,
}: { 
  agentId: AgentId; 
  messages: AgentMessage[];
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const personality = AGENT_PERSONALITIES[agentId];
  const latestMessage = messages[0];
  
  if (compact) {
    return (
      <div
        className="p-2 rounded-lg flex items-center gap-2"
        style={{ background: `${personality.color}10` }}
      >
        <span className="text-lg">{personality.icon}</span>
        <div className="min-w-0">
          <div className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>
            {personality.name}
          </div>
          <div className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
            {personality.description}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-3 rounded-lg"
      style={{ background: `${personality.color}10` }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{personality.icon}</span>
        <div>
          <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
            {personality.name}
          </div>
          <div className="text-xs" style={{ color: personality.color }}>
            {messages.length > 0 ? `${messages.length} insights` : 'Watching'}
          </div>
        </div>
      </div>
      
      {latestMessage && (
        <div className="text-xs mt-2 p-2 rounded" style={{ background: 'rgba(0,0,0,0.2)' }}>
          <p className="truncate" style={{ color: 'var(--text-secondary)' }}>
            {latestMessage.body}
          </p>
          {latestMessage.primaryAction && (
            <button
              onClick={() => {
                if (latestMessage.primaryAction?.route) {
                  navigate(latestMessage.primaryAction.route);
                }
              }}
              className="mt-1 text-xs underline"
              style={{ color: personality.color }}
            >
              {latestMessage.primaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// RECENT AGENT ACTIVITY
// ============================================

export function RecentAgentActivity() {
  const messages = useAgentMessages();
  const navigate = useNavigate();
  const { markRead, dismissMessage } = useAgentStore();
  
  const recentMessages = useMemo(() => {
    return messages
      .filter(m => !m.dismissedAt)
      .slice(0, 5);
  }, [messages]);

  if (recentMessages.length === 0) {
    return (
      <div className="card p-6 text-center">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          No recent agent activity. Start playing or training to see insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentMessages.map(message => {
        const personality = AGENT_PERSONALITIES[message.agentId];
        const isUnread = !message.readAt;
        
        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`card p-4 transition-all ${isUnread ? 'ring-1 ring-purple-500' : ''}`}
            style={{ 
              background: 'var(--bg-secondary)',
            }}
            onClick={() => markRead(message.id)}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
                style={{ background: `${personality.color}25` }}
              >
                {personality.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm" style={{ color: personality.color }}>
                    {personality.name}
                  </span>
                  {message.priority === 'urgent' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                      Urgent
                    </span>
                  )}
                  {isUnread && (
                    <span className="w-2 h-2 rounded-full" style={{ background: personality.color }} />
                  )}
                  <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>
                    {formatTimeAgo(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {message.body}
                </p>
                {message.primaryAction && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (message.primaryAction?.route) {
                        navigate(message.primaryAction.route);
                      }
                    }}
                    className="mt-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
                    style={{ 
                      background: `${personality.color}20`,
                      color: personality.color,
                    }}
                  >
                    {message.primaryAction.label}
                  </button>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissMessage(message.id);
                }}
                className="p-1 rounded hover:bg-white/10 transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================
// AGENT INSIGHTS SUMMARY
// Quick stats from agent analysis
// ============================================

export function AgentInsightsSummary() {
  const [insights, setInsights] = useState<{
    bestTime: string | null;
    weakestArea: string | null;
    tiltRisk: 'low' | 'medium' | 'high';
    focusScore: number;
    daysTracked: number;
  }>({
    bestTime: null,
    weakestArea: null,
    tiltRisk: 'low',
    focusScore: 100,
    daysTracked: 0,
  });

  useEffect(() => {
    // Gather insights from agent memories
    try {
      const coachMemory = localStorage.getItem('zenChessCoachMemory');
      const compassMemory = localStorage.getItem('zenChessInnerCompassMemory');
      const flowMemory = localStorage.getItem('zenChessFlowKeeperMemory');
      const insightMemory = localStorage.getItem('zenChessInsightMemory');
      
      let bestTime = null;
      let weakestArea = null;
      let tiltRisk: 'low' | 'medium' | 'high' = 'low';
      let focusScore = 100;
      let daysTracked = 0;

      if (coachMemory) {
        const coach = JSON.parse(coachMemory);
        daysTracked = coach.daysKnown || 0;
      }
      
      if (compassMemory) {
        const compass = JSON.parse(compassMemory);
        if (compass.consecutiveLosses >= 3) tiltRisk = 'high';
        else if (compass.consecutiveLosses >= 2) tiltRisk = 'medium';
      }
      
      if (flowMemory) {
        const flow = JSON.parse(flowMemory);
        focusScore = flow.flowScore || 100;
      }
      
      if (insightMemory) {
        const insight = JSON.parse(insightMemory);
        if (insight.discoveredInsights) {
          const timeInsight = insight.discoveredInsights.find((i: string) => i.startsWith('best_time_'));
          if (timeInsight) {
            const time = timeInsight.replace('best_time_', '');
            const labels: Record<string, string> = {
              MORNING: 'Morning',
              AFTERNOON: 'Afternoon',
              EVENING: 'Evening',
              NIGHT: 'Night',
            };
            bestTime = labels[time] || time;
          }
        }
      }

      setInsights({ bestTime, weakestArea, tiltRisk, focusScore, daysTracked });
    } catch {
      // Use defaults
    }
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <InsightCard
        icon="🕐"
        label="Best Time"
        value={insights.bestTime || 'Learning...'}
        color="#3b82f6"
      />
      <InsightCard
        icon="🧭"
        label="Emotional Balance"
        value={insights.tiltRisk === 'high' ? 'Off Center' : insights.tiltRisk === 'medium' ? 'Wavering' : 'Centered'}
        color={insights.tiltRisk === 'high' ? '#ef4444' : insights.tiltRisk === 'medium' ? '#f59e0b' : '#4ade80'}
      />
      <InsightCard
        icon="🌊"
        label="Flow State"
        value={`${insights.focusScore}%`}
        color="#06b6d4"
      />
      <InsightCard
        icon="📅"
        label="Days Tracked"
        value={`${insights.daysTracked}`}
        color="#a855f7"
      />
    </div>
  );
}

function InsightCard({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) {
  return (
    <div className="card p-4" style={{ background: `${color}10` }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
      </div>
      <div className="text-lg font-medium" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

// Helper function
function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}



