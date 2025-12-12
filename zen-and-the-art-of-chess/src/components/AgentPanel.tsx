// ============================================
// AGENT PANEL COMPONENT
// Shows agent messages as floating notifications
// ============================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  useAgentMessages, 
  useUnreadCount, 
  useAgentStore,
} from '@/lib/agents/agentOrchestrator';
import { AGENT_PERSONALITIES } from '@/lib/agents/agentTypes';
import type { AgentMessage, AgentId } from '@/lib/agents/agentTypes';

// ============================================
// TOAST NOTIFICATION
// ============================================

export function AgentToast({ message, onDismiss }: { message: AgentMessage; onDismiss: () => void }) {
  const navigate = useNavigate();
  const markActedOn = useAgentStore((s) => s.markActedOn);
  const personality = AGENT_PERSONALITIES[message.agentId];

  const handlePrimaryAction = () => {
    markActedOn(message.id);
    if (message.primaryAction?.route) {
      navigate(message.primaryAction.route);
    }
    onDismiss();
  };

  const handleSecondaryAction = () => {
    onDismiss();
  };

  // Auto-dismiss after 10 seconds for non-urgent, non-persistent
  useEffect(() => {
    if (message.priority !== 'urgent' && !message.isPersistent) {
      const timer = setTimeout(onDismiss, 10000);
      return () => clearTimeout(timer);
    }
  }, [message, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="max-w-md w-full rounded-xl shadow-2xl overflow-hidden"
      style={{
        background: 'var(--bg-secondary)',
        border: `2px solid ${personality.color}40`,
        boxShadow: `0 0 30px ${personality.color}20`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ 
          background: `${personality.color}15`,
          borderBottom: `1px solid ${personality.color}30`,
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
          style={{ background: `${personality.color}30` }}
        >
          {personality.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
            {personality.name}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {message.priority === 'urgent' && '🚨 '}
            {message.category === 'celebration' && '🎉 '}
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="p-1 rounded-lg transition-colors hover:bg-white/10"
          style={{ color: 'var(--text-muted)' }}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
          {message.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {message.body}
        </p>
        {message.subtext && (
          <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
            {message.subtext}
          </p>
        )}

        {/* Actions */}
        {(message.primaryAction || message.secondaryAction) && (
          <div className="flex gap-2 pt-2">
            {message.primaryAction && (
              <button
                onClick={handlePrimaryAction}
                className="flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all hover:scale-[1.02]"
                style={{ 
                  background: personality.color,
                  color: 'white',
                }}
              >
                {message.primaryAction.label}
              </button>
            )}
            {message.secondaryAction && (
              <button
                onClick={handleSecondaryAction}
                className="py-2 px-4 rounded-lg text-sm transition-all hover:bg-white/10"
                style={{ 
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                }}
              >
                {message.secondaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ============================================
// AGENT NOTIFICATION CENTER
// ============================================

export function AgentNotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const messages = useAgentMessages();
  const unreadCount = useUnreadCount();
  const navigate = useNavigate();
  const { markRead, markActedOn, dismissMessage } = useAgentStore();

  const handleMessageClick = (message: AgentMessage) => {
    markRead(message.id);
    if (message.primaryAction?.route) {
      markActedOn(message.id);
      navigate(message.primaryAction.route);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg transition-all hover:bg-white/10"
        style={{ color: 'var(--text-secondary)' }}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
          />
        </svg>
        
        {/* Badge */}
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full"
            style={{ background: '#ef4444', color: 'white' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-xl shadow-2xl z-50"
            style={{ 
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* Header */}
            <div 
              className="sticky top-0 px-4 py-3 border-b flex items-center justify-between"
              style={{ 
                background: 'var(--bg-secondary)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                Agent Messages
              </span>
              {messages.length > 0 && (
                <button
                  onClick={() => useAgentStore.getState().clearAllMessages()}
                  className="text-xs hover:underline"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Messages */}
            {messages.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-2">🤖</div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  No messages yet. Your agents are watching...
                </p>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                {messages.map((msg) => {
                  const personality = AGENT_PERSONALITIES[msg.agentId];
                  return (
                    <button
                      key={msg.id}
                      onClick={() => handleMessageClick(msg)}
                      className="w-full text-left p-4 hover:bg-white/5 transition-colors"
                      style={{ 
                        opacity: msg.readAt ? 0.6 : 1,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                          style={{ background: `${personality.color}30` }}
                        >
                          {personality.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span 
                              className="font-medium text-sm truncate"
                              style={{ color: 'var(--text-primary)' }}
                            >
                              {msg.title}
                            </span>
                            {!msg.readAt && (
                              <span 
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ background: personality.color }}
                              />
                            )}
                          </div>
                          <p 
                            className="text-xs line-clamp-2"
                            style={{ color: 'var(--text-tertiary)' }}
                          >
                            {msg.body}
                          </p>
                          <span 
                            className="text-xs mt-1 block"
                            style={{ color: 'var(--text-muted)' }}
                          >
                            {personality.name} • {getTimeAgo(msg.timestamp)}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dismissMessage(msg.id);
                          }}
                          className="p-1 rounded hover:bg-white/10 shrink-0"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          ✕
                        </button>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// FLOATING TOAST CONTAINER
// ============================================

export function AgentToastContainer() {
  const messages = useAgentMessages();
  const dismissMessage = useAgentStore((s) => s.dismissMessage);
  
  // Only show toasts for messages that should show as toast
  const toastMessages = messages.filter(m => m.showAsToast && !m.readAt);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toastMessages.slice(0, 3).map((msg) => (
          <div key={msg.id} className="pointer-events-auto">
            <AgentToast
              message={msg}
              onDismiss={() => dismissMessage(msg.id)}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// INLINE AGENT MESSAGE
// For embedding in pages
// ============================================

export function InlineAgentMessage({ 
  agentId, 
  message 
}: { 
  agentId: AgentId; 
  message: string;
}) {
  const personality = AGENT_PERSONALITIES[agentId];

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl"
      style={{ 
        background: `${personality.color}10`,
        border: `1px solid ${personality.color}30`,
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
        style={{ background: `${personality.color}30` }}
      >
        {personality.icon}
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm mb-1" style={{ color: personality.color }}>
          {personality.name}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {message}
        </p>
      </div>
    </div>
  );
}

// ============================================
// HELPER
// ============================================

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}










