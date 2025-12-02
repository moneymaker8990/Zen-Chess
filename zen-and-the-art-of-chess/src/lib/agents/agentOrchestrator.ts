// ============================================
// AGENT ORCHESTRATOR
// Central brain that manages all agents
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  AgentId, 
  AgentMessage, 
  AgentTrigger, 
  AgentOrchestratorState,
  AgentMemory,
  MessagePriority,
} from './agentTypes';
import { 
  AGENT_COOLDOWNS, 
  AGENT_PERSONALITIES,
  createMessage,
} from './agentTypes';

// Import individual agents
import { 
  createCoachAgent,
  createTiltGuardianAgent,
  createTrainingAgent,
  createPatternAgent,
  createJourneyAgent,
  createMindfulnessAgent,
} from './agents';

// ============================================
// INITIAL STATE
// ============================================

function createInitialMemory(): AgentMemory {
  return {
    preferredTrainingTime: null,
    preferredSessionLength: null,
    respondsWellTo: [],
    ignoresOften: [],
    totalMessages: 0,
    messagesByAgent: {} as Record<AgentId, number>,
    engagementRate: 0,
    lastNoteworthy: [],
    predictedNextAction: null,
    userGoals: [],
    agentMemories: {} as Record<AgentId, Record<string, unknown>>,
  };
}

function createInitialState(): AgentOrchestratorState {
  return {
    activeMessages: [],
    messageQueue: [],
    recentMessages: [],
    agentLastActive: {} as Record<AgentId, number>,
    agentCooldowns: AGENT_COOLDOWNS,
    memory: createInitialMemory(),
    currentPage: '/',
    sessionStartTime: Date.now(),
    lastInteractionTime: Date.now(),
    notificationsEnabled: true,
    agentVerbosity: 'normal',
    enabledAgents: ['coach', 'tilt-guardian', 'training', 'pattern', 'journey', 'mindfulness'],
  };
}

// ============================================
// AGENT REGISTRY
// ============================================

const agents = {
  'coach': createCoachAgent(),
  'tilt-guardian': createTiltGuardianAgent(),
  'training': createTrainingAgent(),
  'pattern': createPatternAgent(),
  'journey': createJourneyAgent(),
  'mindfulness': createMindfulnessAgent(),
};

// ============================================
// STORE INTERFACE
// ============================================

interface AgentStore {
  state: AgentOrchestratorState;
  
  // === MESSAGE MANAGEMENT ===
  
  /** Add a message to the active queue */
  pushMessage: (message: AgentMessage) => void;
  
  /** Remove a message */
  dismissMessage: (messageId: string) => void;
  
  /** Mark message as read */
  markRead: (messageId: string) => void;
  
  /** Mark message as acted upon */
  markActedOn: (messageId: string) => void;
  
  /** Get unread message count */
  getUnreadCount: () => number;
  
  /** Get messages by priority */
  getMessagesByPriority: (priority?: MessagePriority) => AgentMessage[];
  
  /** Clear all messages */
  clearAllMessages: () => void;
  
  // === TRIGGER SYSTEM ===
  
  /** Fire a trigger that agents can respond to */
  trigger: (event: AgentTrigger) => void;
  
  /** Check for proactive messages from agents */
  checkProactiveMessages: () => void;
  
  // === PAGE TRACKING ===
  
  /** Update current page */
  setCurrentPage: (page: string) => void;
  
  // === SETTINGS ===
  
  /** Update notification settings */
  setNotificationsEnabled: (enabled: boolean) => void;
  
  /** Update agent verbosity */
  setVerbosity: (verbosity: 'quiet' | 'normal' | 'chatty') => void;
  
  /** Enable/disable specific agent */
  toggleAgent: (agentId: AgentId, enabled: boolean) => void;
  
  // === MEMORY ===
  
  /** Update agent memory */
  updateMemory: (updates: Partial<AgentMemory>) => void;
  
  /** Add a noteworthy observation */
  addNoteworthy: (note: string) => void;
  
  /** Update user goals */
  setUserGoals: (goals: string[]) => void;
  
  // === LIFECYCLE ===
  
  /** Initialize the orchestrator */
  initialize: () => void;
  
  /** Record user interaction (updates timing) */
  recordInteraction: () => void;
}

// ============================================
// ORCHESTRATOR STORE
// ============================================

export const useAgentStore = create<AgentStore>()(
  persist(
    (set, get) => ({
      state: createInitialState(),
      
      // ==========================================
      // MESSAGE MANAGEMENT
      // ==========================================
      
      pushMessage: (message) => {
        set((store) => {
          // Check if similar message already exists
          const hasSimilar = store.state.activeMessages.some(
            m => m.agentId === message.agentId && m.title === message.title
          );
          
          if (hasSimilar) return store;
          
          // Update agent cooldown
          const newCooldowns = {
            ...store.state.agentLastActive,
            [message.agentId]: Date.now(),
          };
          
          // Update message count
          const newMemory = {
            ...store.state.memory,
            totalMessages: store.state.memory.totalMessages + 1,
            messagesByAgent: {
              ...store.state.memory.messagesByAgent,
              [message.agentId]: (store.state.memory.messagesByAgent[message.agentId] || 0) + 1,
            },
          };
          
          return {
            state: {
              ...store.state,
              activeMessages: [message, ...store.state.activeMessages].slice(0, 10),
              recentMessages: [message, ...store.state.recentMessages].slice(0, 50),
              agentLastActive: newCooldowns,
              memory: newMemory,
            },
          };
        });
      },
      
      dismissMessage: (messageId) => {
        set((store) => ({
          state: {
            ...store.state,
            activeMessages: store.state.activeMessages.map(m =>
              m.id === messageId ? { ...m, dismissedAt: Date.now() } : m
            ).filter(m => !m.dismissedAt || m.isPersistent),
          },
        }));
      },
      
      markRead: (messageId) => {
        set((store) => ({
          state: {
            ...store.state,
            activeMessages: store.state.activeMessages.map(m =>
              m.id === messageId ? { ...m, readAt: Date.now() } : m
            ),
          },
        }));
      },
      
      markActedOn: (messageId) => {
        set((store) => {
          // Update engagement rate
          const totalActed = store.state.recentMessages.filter(m => m.actedOnAt).length + 1;
          const totalMessages = store.state.memory.totalMessages || 1;
          const engagementRate = Math.round((totalActed / Math.min(totalMessages, 50)) * 100);
          
          return {
            state: {
              ...store.state,
              activeMessages: store.state.activeMessages.map(m =>
                m.id === messageId ? { ...m, actedOnAt: Date.now() } : m
              ).filter(m => m.id !== messageId || m.isPersistent),
              memory: {
                ...store.state.memory,
                engagementRate,
              },
            },
          };
        });
      },
      
      getUnreadCount: () => {
        return get().state.activeMessages.filter(m => !m.readAt && !m.dismissedAt).length;
      },
      
      getMessagesByPriority: (priority) => {
        const messages = get().state.activeMessages.filter(m => !m.dismissedAt);
        if (priority) {
          return messages.filter(m => m.priority === priority);
        }
        // Sort by priority: urgent > high > normal > low
        const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
        return messages.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      },
      
      clearAllMessages: () => {
        set((store) => ({
          state: {
            ...store.state,
            activeMessages: [],
          },
        }));
      },
      
      // ==========================================
      // TRIGGER SYSTEM
      // ==========================================
      
      trigger: (event) => {
        const store = get();
        const { state } = store;
        
        // Check each enabled agent
        state.enabledAgents.forEach((agentId) => {
          const agent = agents[agentId as keyof typeof agents];
          if (!agent) return;
          
          // Check cooldown
          const lastActive = state.agentLastActive[agentId] || 0;
          const cooldownMs = state.agentCooldowns[agentId] * 60 * 1000;
          
          if (Date.now() - lastActive < cooldownMs) {
            // Still in cooldown, skip (except for urgent triggers)
            if (event.type !== 'TILT_DETECTED' && event.type !== 'LOSING_STREAK') {
              return;
            }
          }
          
          // Let agent handle the trigger
          const message = agent.handleTrigger(event, state);
          
          if (message) {
            // Apply verbosity filter
            if (state.agentVerbosity === 'quiet' && message.priority === 'low') {
              return;
            }
            
            store.pushMessage(message);
          }
        });
      },
      
      checkProactiveMessages: () => {
        const store = get();
        const { state } = store;
        
        // Check each enabled agent for proactive messages
        state.enabledAgents.forEach((agentId) => {
          const agent = agents[agentId as keyof typeof agents];
          if (!agent) return;
          
          // Check cooldown
          const lastActive = state.agentLastActive[agentId] || 0;
          const cooldownMs = state.agentCooldowns[agentId] * 60 * 1000;
          
          if (Date.now() - lastActive < cooldownMs) return;
          
          // Get proactive message
          const message = agent.getProactiveMessage(state);
          
          if (message) {
            // Apply verbosity filter
            if (state.agentVerbosity === 'quiet' && message.priority !== 'urgent') {
              return;
            }
            if (state.agentVerbosity === 'normal' && message.priority === 'low') {
              return;
            }
            
            store.pushMessage(message);
          }
        });
      },
      
      // ==========================================
      // PAGE TRACKING
      // ==========================================
      
      setCurrentPage: (page) => {
        const store = get();
        const previousPage = store.state.currentPage;
        
        // Trigger page events
        if (previousPage !== page) {
          store.trigger({ type: 'PAGE_LEAVE', page: previousPage });
          store.trigger({ type: 'PAGE_ENTER', page });
        }
        
        set((s) => ({
          state: {
            ...s.state,
            currentPage: page,
            lastInteractionTime: Date.now(),
          },
        }));
      },
      
      // ==========================================
      // SETTINGS
      // ==========================================
      
      setNotificationsEnabled: (enabled) => {
        set((store) => ({
          state: { ...store.state, notificationsEnabled: enabled },
        }));
      },
      
      setVerbosity: (verbosity) => {
        set((store) => ({
          state: { ...store.state, agentVerbosity: verbosity },
        }));
      },
      
      toggleAgent: (agentId, enabled) => {
        set((store) => ({
          state: {
            ...store.state,
            enabledAgents: enabled
              ? [...store.state.enabledAgents, agentId]
              : store.state.enabledAgents.filter(id => id !== agentId),
          },
        }));
      },
      
      // ==========================================
      // MEMORY
      // ==========================================
      
      updateMemory: (updates) => {
        set((store) => ({
          state: {
            ...store.state,
            memory: { ...store.state.memory, ...updates },
          },
        }));
      },
      
      addNoteworthy: (note) => {
        set((store) => ({
          state: {
            ...store.state,
            memory: {
              ...store.state.memory,
              lastNoteworthy: [note, ...store.state.memory.lastNoteworthy].slice(0, 10),
            },
          },
        }));
      },
      
      setUserGoals: (goals) => {
        set((store) => ({
          state: {
            ...store.state,
            memory: { ...store.state.memory, userGoals: goals },
          },
        }));
      },
      
      // ==========================================
      // LIFECYCLE
      // ==========================================
      
      initialize: () => {
        const store = get();
        
        // Initialize all agents
        Object.values(agents).forEach(agent => {
          agent.initialize();
        });
        
        // Fire session start
        store.trigger({ type: 'SESSION_START' });
        
        // Check for proactive messages
        setTimeout(() => {
          store.checkProactiveMessages();
        }, 2000);
        
        // Set up periodic check
        setInterval(() => {
          store.checkProactiveMessages();
        }, 5 * 60 * 1000); // Every 5 minutes
      },
      
      recordInteraction: () => {
        set((store) => ({
          state: {
            ...store.state,
            lastInteractionTime: Date.now(),
          },
        }));
      },
    }),
    {
      name: 'zen-chess-agents',
      version: 1,
      partialize: (state) => ({
        state: {
          ...state.state,
          // Don't persist active messages - they're session-specific
          activeMessages: [],
          messageQueue: [],
        },
      }),
    }
  )
);

// ============================================
// HOOKS FOR COMPONENTS
// ============================================

/** Hook to get active messages */
export function useAgentMessages() {
  return useAgentStore((s) => s.state.activeMessages.filter(m => !m.dismissedAt));
}

/** Hook to get unread count */
export function useUnreadCount() {
  return useAgentStore((s) => 
    s.state.activeMessages.filter(m => !m.readAt && !m.dismissedAt).length
  );
}

/** Hook to get urgent messages */
export function useUrgentMessages() {
  return useAgentStore((s) => 
    s.state.activeMessages.filter(m => m.priority === 'urgent' && !m.dismissedAt)
  );
}

/** Hook to trigger agent events */
export function useAgentTrigger() {
  return useAgentStore((s) => s.trigger);
}

/** Initialize agents - call once on app start */
export function initializeAgents() {
  useAgentStore.getState().initialize();
}

// ============================================
// DIRECT AGENT MESSAGES
// For manual triggering from anywhere in app
// ============================================

export function sendAgentMessage(
  agentId: AgentId,
  params: Parameters<typeof createMessage>[1]
) {
  const message = createMessage(agentId, params);
  useAgentStore.getState().pushMessage(message);
  return message;
}

