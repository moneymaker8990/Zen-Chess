// ============================================
// AI COACH HOOK
// React hook for interacting with AI agents
// ============================================

import { useState, useCallback, useRef } from 'react';
import {
  getAgentResponse,
  streamAgentResponse,
  getTiltIntervention,
  getGameInsight,
  getSessionRecommendation,
  getMotivation,
  getMindfulnessExercise,
  AGENT_PERSONAS,
  type AgentMessage,
  type CoachingContext,
} from '@/lib/claude';

// ============================================
// TYPES
// ============================================

export type AgentId = keyof typeof AGENT_PERSONAS;

interface UseAICoachOptions {
  agentId?: AgentId;
  context?: CoachingContext;
  onError?: (error: Error) => void;
}

interface UseAICoachReturn {
  // State
  isLoading: boolean;
  isStreaming: boolean;
  error: string | null;
  messages: AgentMessage[];
  currentResponse: string;
  
  // Actions
  sendMessage: (message: string) => Promise<string>;
  sendMessageStreaming: (message: string) => Promise<void>;
  clearHistory: () => void;
  setAgent: (agentId: AgentId) => void;
  
  // Agent info
  agentId: AgentId;
  agentName: string;
  agentRole: string;
  
  // Specialized functions
  requestTiltIntervention: (tiltLevel: number, recentEvents: string[]) => Promise<string>;
  requestGameInsight: (pgn: string, mistakes: string[], result: 'win' | 'loss' | 'draw') => Promise<string>;
  requestSessionPlan: (timeAvailable: number, energy: 'high' | 'medium' | 'low') => Promise<string>;
  requestMotivation: (situation: string) => Promise<string>;
  requestMindfulness: (situation: 'pre-game' | 'post-loss' | 'tilt' | 'focus' | 'general', duration: number) => Promise<string>;
}

// ============================================
// HOOK IMPLEMENTATION
// ============================================

export function useAICoach(options: UseAICoachOptions = {}): UseAICoachReturn {
  const {
    agentId: initialAgentId = 'coach',
    context,
    onError,
  } = options;

  // State
  const [agentId, setAgentId] = useState<AgentId>(initialAgentId);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ref to track if component is mounted
  const isMounted = useRef(true);

  // Get agent info
  const agent = AGENT_PERSONAS[agentId] || AGENT_PERSONAS.coach;

  // ============================================
  // SEND MESSAGE (non-streaming)
  // ============================================
  
  const sendMessage = useCallback(async (message: string): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    // Add user message to history
    const userMessage: AgentMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const response = await getAgentResponse(
        agentId,
        message,
        messages,
        context
      );
      
      // Add assistant response to history
      const assistantMessage: AgentMessage = { role: 'assistant', content: response };
      if (isMounted.current) {
        setMessages(prev => [...prev, assistantMessage]);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response';
      if (isMounted.current) {
        setError(errorMessage);
      }
      onError?.(err instanceof Error ? err : new Error(errorMessage));
      throw err;
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [agentId, messages, context, onError]);

  // ============================================
  // SEND MESSAGE (streaming)
  // ============================================
  
  const sendMessageStreaming = useCallback(async (message: string): Promise<void> => {
    setIsStreaming(true);
    setIsLoading(true);
    setError(null);
    setCurrentResponse('');
    
    // Add user message to history
    const userMessage: AgentMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      let fullResponse = '';
      
      for await (const chunk of streamAgentResponse(agentId, message, messages, context)) {
        if (isMounted.current) {
          fullResponse += chunk;
          setCurrentResponse(fullResponse);
        }
      }
      
      // Add complete response to history
      const assistantMessage: AgentMessage = { role: 'assistant', content: fullResponse };
      if (isMounted.current) {
        setMessages(prev => [...prev, assistantMessage]);
        setCurrentResponse('');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response';
      if (isMounted.current) {
        setError(errorMessage);
      }
      onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
        setIsStreaming(false);
      }
    }
  }, [agentId, messages, context, onError]);

  // ============================================
  // CLEAR HISTORY
  // ============================================
  
  const clearHistory = useCallback(() => {
    setMessages([]);
    setCurrentResponse('');
    setError(null);
  }, []);

  // ============================================
  // SET AGENT
  // ============================================
  
  const setAgent = useCallback((newAgentId: AgentId) => {
    setAgentId(newAgentId);
    // Optionally clear history when switching agents
    // clearHistory();
  }, []);

  // ============================================
  // SPECIALIZED FUNCTIONS
  // ============================================
  
  const requestTiltIntervention = useCallback(async (
    tiltLevel: number,
    recentEvents: string[]
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await getTiltIntervention(tiltLevel, recentEvents, context);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get tilt intervention';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [context]);

  const requestGameInsight = useCallback(async (
    pgn: string,
    mistakes: string[],
    result: 'win' | 'loss' | 'draw'
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await getGameInsight(pgn, mistakes, result, context);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get game insight';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [context]);

  const requestSessionPlan = useCallback(async (
    timeAvailable: number,
    energy: 'high' | 'medium' | 'low'
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await getSessionRecommendation(timeAvailable, energy, undefined, context);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get session plan';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [context]);

  const requestMotivation = useCallback(async (situation: string): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await getMotivation(situation, context);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get motivation';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [context]);

  const requestMindfulness = useCallback(async (
    situation: 'pre-game' | 'post-loss' | 'tilt' | 'focus' | 'general',
    duration: number
  ): Promise<string> => {
    setIsLoading(true);
    setError(null);
    
    try {
      return await getMindfulnessExercise(situation, duration, context);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get mindfulness exercise';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [context]);

  // ============================================
  // RETURN
  // ============================================
  
  return {
    // State
    isLoading,
    isStreaming,
    error,
    messages,
    currentResponse,
    
    // Actions
    sendMessage,
    sendMessageStreaming,
    clearHistory,
    setAgent,
    
    // Agent info
    agentId,
    agentName: agent.name,
    agentRole: agent.role,
    
    // Specialized functions
    requestTiltIntervention,
    requestGameInsight,
    requestSessionPlan,
    requestMotivation,
    requestMindfulness,
  };
}

// ============================================
// EXPORT AGENT LIST FOR UI
// ============================================

export const AVAILABLE_AGENTS = Object.entries(AGENT_PERSONAS).map(([id, persona]) => ({
  id: id as AgentId,
  name: persona.name,
  role: persona.role,
  expertise: persona.expertise,
  openingLine: persona.openingLine,
}));

export type { AgentMessage, CoachingContext };


