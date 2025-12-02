// ============================================
// AGENT PRESENCE COMPONENTS
// Subtle agent UI elements throughout the app
// ============================================

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAgentStore, useAgentMessages } from '@/lib/agents/agentOrchestrator';
import { AGENT_PERSONALITIES } from '@/lib/agents/agentTypes';
import type { AgentId } from '@/lib/agents/agentTypes';

// ============================================
// AGENT STATUS BAR
// Shows which agents are active (subtle footer)
// ============================================

export function AgentStatusBar() {
  const state = useAgentStore((s) => s.state);
  const activeAgents = state.enabledAgents;
  
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate session stats
  const sessionMinutes = Math.floor((Date.now() - state.sessionStartTime) / 60000);
  const focusScore = useMemo(() => {
    // Simple focus score based on activity
    const messagesActedOn = state.recentMessages.filter(m => m.actedOnAt).length;
    const totalMessages = state.recentMessages.length;
    if (totalMessages === 0) return 100;
    return Math.round((messagesActedOn / totalMessages) * 100);
  }, [state.recentMessages]);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none"
      style={{ paddingLeft: 'var(--sidebar-width, 0px)' }}
    >
      <div className="max-w-6xl mx-auto px-4 pb-4 flex justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto"
        >
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-3 px-4 py-2 rounded-full text-xs backdrop-blur-sm transition-all hover:scale-105"
            style={{ 
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            {/* Pulsing indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            
            <span style={{ color: 'var(--text-muted)' }}>
              {activeAgents.length} Agents Active
            </span>
            
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            
            <span style={{ color: 'var(--text-muted)' }}>
              {sessionMinutes}m
            </span>
            
            <span className="text-sm">{showDetails ? '▼' : '▲'}</span>
          </button>
          
          {/* Expanded details */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute bottom-full right-0 mb-2 w-72 rounded-xl overflow-hidden"
                style={{ 
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
                }}
              >
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      AI Coaching System
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                      Active
                    </span>
                  </div>
                  
                  {/* Agent grid */}
                  <div className="grid grid-cols-6 gap-2">
                    {activeAgents.slice(0, 12).map((agentId) => {
                      const personality = AGENT_PERSONALITIES[agentId as AgentId] || {
                        icon: '🤖',
                        color: '#888',
                        name: agentId,
                      };
                      return (
                        <div
                          key={agentId}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm relative group"
                          style={{ background: `${personality.color}20` }}
                          title={personality.name}
                        >
                          {personality.icon}
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-black text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            {personality.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div style={{ color: 'var(--text-muted)' }}>Session</div>
                      <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {sessionMinutes} min
                      </div>
                    </div>
                    <div className="p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <div style={{ color: 'var(--text-muted)' }}>Insights</div>
                      <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {state.memory.totalMessages}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================
// CONTEXTUAL AGENT TIP
// Shows relevant tip for current page
// ============================================

interface PageTip {
  page: string;
  tips: { agent: AgentId; message: string; icon: string }[];
}

const PAGE_TIPS: PageTip[] = [
  {
    page: '/play',
    tips: [
      { agent: 'tilt-guardian', message: 'Remember to breathe between moves', icon: '🛡️' },
      { agent: 'coach', message: 'Think before you move. Blitz mind, classical time.', icon: '♔' },
      { agent: 'mindfulness', message: 'Stay present. Each position is new.', icon: '☯' },
    ],
  },
  {
    page: '/train',
    tips: [
      { agent: 'training', message: 'Accuracy over speed. Find the pattern.', icon: '🎯' },
      { agent: 'pattern', message: 'Patterns learned today become instinct tomorrow.', icon: '🧠' },
      { agent: 'focus-guardian', message: 'Stay focused. Quality reps build skill.', icon: '🎯' },
    ],
  },
  {
    page: '/openings',
    tips: [
      { agent: 'opening', message: 'Know the ideas, not just the moves.', icon: '📖' },
      { agent: 'coach', message: 'Openings are about understanding, not memorization.', icon: '♔' },
    ],
  },
  {
    page: '/greats',
    tips: [
      { agent: 'legend', message: 'Watch how the masters think, not just what they play.', icon: '👑' },
      { agent: 'coach', message: 'One deeply studied game teaches more than ten skimmed.', icon: '♔' },
    ],
  },
  {
    page: '/calm-play',
    tips: [
      { agent: 'mindfulness', message: 'Breathe. The board will wait.', icon: '☯' },
      { agent: 'tilt-guardian', message: 'This is where emotional mastery is forged.', icon: '🛡️' },
    ],
  },
  {
    page: '/mind',
    tips: [
      { agent: 'mindfulness', message: 'The calm mind sees what the agitated mind misses.', icon: '☯' },
      { agent: 'session-manager', message: 'Rest is training. Recovery is progress.', icon: '⏱️' },
    ],
  },
  {
    page: '/courses',
    tips: [
      { agent: 'training', message: 'Structured learning beats random study.', icon: '🎯' },
      { agent: 'journey', message: 'Each lesson is a step on the path.', icon: '🧭' },
    ],
  },
];

export function ContextualAgentTip({ currentPage }: { currentPage: string }) {
  const [tipIndex, setTipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const pageTips = useMemo(() => {
    const match = PAGE_TIPS.find(p => currentPage.includes(p.page));
    return match?.tips || [];
  }, [currentPage]);
  
  // Rotate tips
  useEffect(() => {
    if (pageTips.length <= 1) return;
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setTipIndex(i => (i + 1) % pageTips.length);
        setIsVisible(true);
      }, 300);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [pageTips.length]);
  
  if (pageTips.length === 0) return null;
  
  const tip = pageTips[tipIndex];
  const personality = AGENT_PERSONALITIES[tip.agent];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{ 
            background: `${personality?.color || '#888'}10`,
            border: `1px solid ${personality?.color || '#888'}20`,
          }}
        >
          <span className="text-lg">{tip.icon}</span>
          <span style={{ color: 'var(--text-secondary)' }}>{tip.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// FLOATING AGENT AVATAR
// Subtle avatar that appears in corners
// ============================================

export function FloatingAgentAvatar({ 
  agentId, 
  message,
  position = 'bottom-right',
  autoHide = true,
}: { 
  agentId: AgentId; 
  message?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  autoHide?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(!!message);
  const [isVisible, setIsVisible] = useState(true);
  const personality = AGENT_PERSONALITIES[agentId];
  
  useEffect(() => {
    if (autoHide && message) {
      const timer = setTimeout(() => setIsExpanded(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [message, autoHide]);
  
  useEffect(() => {
    if (autoHide && !isExpanded) {
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isExpanded, autoHide]);
  
  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`fixed ${positionClasses[position]} z-40`}
    >
      <div className="flex items-end gap-3">
        {/* Message bubble */}
        <AnimatePresence>
          {isExpanded && message && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="max-w-xs p-3 rounded-xl text-sm"
              style={{ 
                background: 'rgba(15, 23, 42, 0.95)',
                border: `1px solid ${personality.color}40`,
                boxShadow: `0 4px 20px ${personality.color}20`,
              }}
            >
              <p style={{ color: 'var(--text-secondary)' }}>{message}</p>
              <p className="text-xs mt-1" style={{ color: personality.color }}>
                — {personality.name}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Avatar */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-transform hover:scale-110"
          style={{ 
            background: `linear-gradient(135deg, ${personality.color}, ${personality.color}80)`,
            boxShadow: `0 4px 20px ${personality.color}40`,
          }}
        >
          {personality.icon}
        </button>
      </div>
    </motion.div>
  );
}

// ============================================
// PRE-GAME AGENT BRIEFING
// Quick agent advice before starting an activity
// ============================================

export function AgentBriefing({ 
  activity, 
  onDismiss,
}: { 
  activity: 'game' | 'puzzles' | 'study' | 'meditation';
  onDismiss: () => void;
}) {
  const navigate = useNavigate();
  
  const briefings: Record<string, { agent: AgentId; title: string; advice: string; focus: string }> = {
    game: {
      agent: 'coach',
      title: 'Before You Play',
      advice: "Take three deep breaths. Clear your mind. Remember: think first, then move.",
      focus: "Stay calm. Play your game.",
    },
    puzzles: {
      agent: 'training',
      title: 'Puzzle Session',
      advice: "Accuracy matters more than speed. Look for all candidate moves before deciding.",
      focus: "Find the pattern. Trust your vision.",
    },
    study: {
      agent: 'journey',
      title: 'Study Session',
      advice: "Active learning beats passive reading. Try to predict moves, then see why you were wrong.",
      focus: "Understand, don't memorize.",
    },
    meditation: {
      agent: 'mindfulness',
      title: 'Mindfulness Practice',
      advice: "There is nothing to achieve. Just be present with your breath.",
      focus: "Now is enough.",
    },
  };
  
  const briefing = briefings[activity];
  const personality = AGENT_PERSONALITIES[briefing.agent];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)' }}
      onClick={onDismiss}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-md w-full rounded-2xl p-6 text-center"
        style={{ 
          background: 'var(--bg-secondary)',
          border: `2px solid ${personality.color}40`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Agent avatar */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"
          style={{ 
            background: `linear-gradient(135deg, ${personality.color}, ${personality.color}80)`,
          }}
        >
          {personality.icon}
        </div>
        
        <h2 className="text-xl font-display font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          {briefing.title}
        </h2>
        
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          {briefing.advice}
        </p>
        
        <div 
          className="px-4 py-2 rounded-lg text-sm font-medium mb-6"
          style={{ 
            background: `${personality.color}20`,
            color: personality.color,
          }}
        >
          "{briefing.focus}"
        </div>
        
        <button
          onClick={onDismiss}
          className="w-full py-3 rounded-xl font-medium text-white transition-all hover:scale-[1.02]"
          style={{ background: personality.color }}
        >
          I'm Ready
        </button>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// AGENT WATCHING INDICATOR
// Shows that agents are monitoring (very subtle)
// ============================================

export function AgentWatching({ agents = ['coach', 'tilt-guardian'] }: { agents?: AgentId[] }) {
  return (
    <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
      </span>
      <span className="ml-1">
        {agents.map(a => AGENT_PERSONALITIES[a]?.icon).join(' ')} watching
      </span>
    </div>
  );
}

// ============================================
// AGENT QUICK ACTIONS
// Quick access to agent features
// ============================================

export function AgentQuickActions() {
  const navigate = useNavigate();
  
  const actions = [
    { agent: 'coach' as AgentId, label: 'Ask Coach', route: '/coach', icon: '♔' },
    { agent: 'mindfulness' as AgentId, label: 'Breathe', route: '/mind', icon: '☯' },
    { agent: 'training' as AgentId, label: 'Quick Train', route: '/train', icon: '🎯' },
  ];

  return (
    <div className="flex gap-2">
      {actions.map(action => {
        const personality = AGENT_PERSONALITIES[action.agent];
        return (
          <button
            key={action.agent}
            onClick={() => navigate(action.route)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all hover:scale-105"
            style={{ 
              background: `${personality.color}15`,
              border: `1px solid ${personality.color}30`,
            }}
          >
            <span>{action.icon}</span>
            <span style={{ color: 'var(--text-secondary)' }}>{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}



