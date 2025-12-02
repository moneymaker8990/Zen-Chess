// ============================================
// AI COACH CHAT INTERFACE
// Beautiful chat UI for talking to AI agents
// ============================================

import React, { useState, useRef, useEffect } from 'react';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentResponse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const message = input;
    setInput('');
    await sendMessageStreaming(message);
  };

  const currentAgent = AVAILABLE_AGENTS.find(a => a.id === agentId);

  return (
    <div className={`flex flex-col h-full bg-gray-900/50 rounded-2xl border border-gray-800 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <span className="text-lg">🧘</span>
          </div>
          <div>
            <h3 className="font-semibold text-white">{agentName}</h3>
            <p className="text-xs text-gray-400">{agentRole}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {showAgentSelector && (
            <select
              value={agentId}
              onChange={(e) => setAgent(e.target.value as AgentId)}
              className="bg-gray-800 text-sm text-gray-300 rounded-lg px-3 py-1.5 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
            title="Clear chat"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Opening message */}
        {messages.length === 0 && currentAgent?.openingLine && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex-shrink-0 flex items-center justify-center">
              <span className="text-sm">🧘</span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">{agentName}</p>
              <div className="bg-gray-800/50 rounded-2xl rounded-tl-none px-4 py-3 text-gray-200">
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
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                  : 'bg-gradient-to-br from-purple-500 to-blue-600'
              }`}>
                <span className="text-sm">{message.role === 'user' ? '♟️' : '🧘'}</span>
              </div>
              <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                  message.role === 'user'
                    ? 'bg-purple-600/30 rounded-tr-none text-gray-100'
                    : 'bg-gray-800/50 rounded-tl-none text-gray-200'
                }`}>
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex-shrink-0 flex items-center justify-center">
              <span className="text-sm">🧘</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-800/50 rounded-2xl rounded-tl-none px-4 py-3 text-gray-200">
                {currentResponse}
                <span className="inline-block w-2 h-4 bg-purple-500 ml-1 animate-pulse" />
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex-shrink-0 flex items-center justify-center">
              <span className="text-sm">🧘</span>
            </div>
            <div className="bg-gray-800/50 rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/30 border border-red-800 rounded-lg p-3 text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${agentName} anything...`}
            disabled={isLoading}
            className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInterface;


