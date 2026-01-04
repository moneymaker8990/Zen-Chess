// ============================================
// AI COACH CHAT INTERFACE
// Beautiful chat UI for talking to AI agents
// Fixed: No longer hijacks page scroll during streaming
// ============================================

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAICoach, AVAILABLE_AGENTS, type AgentId } from '@/hooks/useAICoach';

interface ChatInterfaceProps {
  initialAgent?: AgentId;
  className?: string;
  showAgentSelector?: boolean;
  context?: {
    rating?: number;
    currentStreak?: number;
    tiltLevel?: number;
  };
}

export function ChatInterface({
  initialAgent = 'coach',
  className = '',
  showAgentSelector = true,
  context,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  
  const {
    messages,
    currentResponse,
    isLoading,
    isStreaming,
    error,
    agentId,
    agentName,
    agentRole,
    sendMessageStreaming,
    clearHistory,
    setAgent,
  } = useAICoach({ agentId: initialAgent, context });

  // Check if user is near bottom of messages container
  const checkIfNearBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return true;
    
    const threshold = 100; // px from bottom
    const isNear = container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
    isNearBottomRef.current = isNear;
    setShowJumpToLatest(!isNear && isStreaming);
    return isNear;
  }, [isStreaming]);

  // Handle scroll events
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      checkIfNearBottom();
    };
    
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [checkIfNearBottom]);

  // Auto-scroll to bottom ONLY if user is already near bottom
  // This prevents scroll hijacking when user is reading earlier messages
  useEffect(() => {
    if (isNearBottomRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, currentResponse]);

  // When streaming starts, check position
  useEffect(() => {
    if (isStreaming) {
      checkIfNearBottom();
    } else {
      setShowJumpToLatest(false);
    }
  }, [isStreaming, checkIfNearBottom]);

  // Jump to latest message
  const jumpToLatest = useCallback(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
    isNearBottomRef.current = true;
    setShowJumpToLatest(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const message = input;
    setInput('');
    
    // Scroll to bottom when user sends a message
    isNearBottomRef.current = true;
    
    await sendMessageStreaming(message);
  };

  const currentAgent = AVAILABLE_AGENTS.find(a => a.id === agentId);

  return (
    <div className={`flex flex-col h-full rounded-2xl border ${className}`}
      style={{
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Header - Fixed */}
      <div 
        className="flex items-center justify-between p-3 md:p-4 border-b shrink-0"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <div 
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex-shrink-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
          >
            <span className="text-base md:text-lg">🧘</span>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-sm md:text-base truncate" style={{ color: 'var(--text-primary)' }}>
              {agentName}
            </h3>
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{agentRole}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 md:gap-2 shrink-0">
          {showAgentSelector && (
            <select
              value={agentId}
              onChange={(e) => setAgent(e.target.value as AgentId)}
              className="text-xs md:text-sm rounded-lg px-2 md:px-3 py-1.5 focus:outline-none focus:ring-2 max-w-[150px] md:max-w-none"
              style={{
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                borderColor: 'var(--border-default)',
              }}
            >
              {AVAILABLE_AGENTS.map(agent => (
                <option key={agent.id} value={agent.id}>
                  {agent.name} - {agent.role}
                </option>
              ))}
            </select>
          )}
          
          <button
            onClick={clearHistory}
            className="p-1.5 md:p-2 transition-colors rounded-lg hover:bg-white/10"
            style={{ color: 'var(--text-muted)' }}
            title="Clear chat"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Messages - Scrollable container that doesn't affect page scroll */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 relative"
        style={{
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain', // Prevent scroll chaining to page
        }}
      >
        {/* Opening message */}
        {messages.length === 0 && currentAgent?.openingLine && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div 
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
            >
              <span className="text-sm">🧘</span>
            </div>
            <div className="flex-1">
              <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{agentName}</p>
              <div 
                className="rounded-2xl rounded-tl-none px-4 py-3"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                {currentAgent.openingLine}
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div 
                className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center`}
                style={{
                  background: message.role === 'user' 
                    ? 'linear-gradient(135deg, var(--success), #16a34a)' 
                    : 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
                }}
              >
                <span className="text-sm">{message.role === 'user' ? '♟️' : '🧘'}</span>
              </div>
              <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                <div 
                  className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                    message.role === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'
                  }`}
                  style={{
                    background: message.role === 'user' 
                      ? 'rgba(168, 85, 247, 0.2)' 
                      : 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {message.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Streaming response */}
        {isStreaming && currentResponse && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div 
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
            >
              <span className="text-sm">🧘</span>
            </div>
            <div className="flex-1">
              <div 
                className="rounded-2xl rounded-tl-none px-4 py-3"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                {currentResponse}
                <span 
                  className="inline-block w-2 h-4 ml-1 animate-pulse"
                  style={{ background: 'var(--accent-primary)' }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading indicator */}
        {isLoading && !isStreaming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div 
              className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
            >
              <span className="text-sm">🧘</span>
            </div>
            <div 
              className="rounded-2xl rounded-tl-none px-4 py-3"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--accent-primary)', animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--accent-primary)', animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--accent-primary)', animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg p-3 text-sm"
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: 'var(--error)',
            }}
          >
            {error}
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Jump to Latest button - shows when user scrolled up during streaming */}
      <AnimatePresence>
        {showJumpToLatest && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={jumpToLatest}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-medium shadow-lg z-10"
            style={{
              background: 'var(--accent-primary)',
              color: 'white',
            }}
          >
            ↓ Jump to latest
          </motion.button>
        )}
      </AnimatePresence>

      {/* Input - Fixed */}
      <form 
        onSubmit={handleSubmit} 
        className="p-3 md:p-4 border-t shrink-0"
        style={{ borderColor: 'var(--border-subtle)' }}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${agentName} anything...`}
            disabled={isLoading}
            className="flex-1 text-sm md:text-base rounded-xl px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:ring-2 placeholder-opacity-50 disabled:opacity-50"
            style={{
              background: 'var(--bg-tertiary)',
              color: 'var(--text-primary)',
              borderColor: 'var(--border-default)',
              border: '1px solid var(--border-default)',
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-medium text-sm md:text-base transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              color: 'white',
            }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInterface;
