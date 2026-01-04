// ============================================
// AGENT DRAWER COMPONENT
// Mobile-friendly drawer for agent notifications
// Uses BottomSheet on mobile, side drawer on desktop
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { 
  useAgentMessages, 
  useUnreadCount, 
  useAgentStore,
} from '@/lib/agents/agentOrchestrator';
import { AGENT_PERSONALITIES } from '@/lib/agents/agentTypes';
import type { AgentMessage } from '@/lib/agents/agentTypes';

// ============================================
// TYPES
// ============================================

interface AgentDrawerProps {
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback when drawer should close */
  onClose?: () => void;
}

// ============================================
// HOOKS
// ============================================

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });
  
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  
  return matches;
}

function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;
    
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Get scrollbar width
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}

// ============================================
// TRIGGER BUTTON
// ============================================

export function AgentDrawerTrigger({ onClick }: { onClick: () => void }) {
  const unreadCount = useUnreadCount();
  
  return (
    <button
      onClick={onClick}
      data-testid="agents-trigger"
      className="relative p-2 rounded-lg transition-all hover:bg-white/10"
      style={{ color: 'var(--text-secondary)' }}
      aria-label={`Agent messages${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
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
          style={{ background: 'var(--error)', color: 'white' }}
        >
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}

// ============================================
// DRAWER CONTENT
// ============================================

function DrawerContent({ onClose }: { onClose: () => void }) {
  const messages = useAgentMessages();
  const navigate = useNavigate();
  const { markRead, markActedOn, dismissMessage, clearAllMessages } = useAgentStore();
  
  const handleMessageClick = (message: AgentMessage) => {
    markRead(message.id);
    if (message.primaryAction?.route) {
      markActedOn(message.id);
      navigate(message.primaryAction.route);
      onClose();
    }
  };
  
  return (
    <>
      {/* Header */}
      <div 
        className="sticky top-0 px-4 py-3 border-b flex items-center justify-between z-10"
        style={{ 
          background: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)',
        }}
      >
        <span className="font-medium text-lg" style={{ color: 'var(--text-primary)' }}>
          Agent Messages
        </span>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={() => clearAllMessages()}
              className="text-xs px-2 py-1 rounded hover:bg-white/10 transition-colors"
              style={{ color: 'var(--text-muted)' }}
            >
              Clear All
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Close drawer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
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
                  style={{ opacity: msg.readAt ? 0.6 : 1 }}
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
                        className="text-sm line-clamp-2"
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
                      aria-label="Dismiss message"
                    >
                      ✕
                    </button>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

// ============================================
// MOBILE BOTTOM SHEET
// ============================================

function MobileBottomSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [dragY, setDragY] = useState(0);
  
  useBodyScrollLock(isOpen);
  
  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    if (info.velocity.y > 500 || info.offset.y > 200) {
      onClose();
    }
    setDragY(0);
  }, [onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          {/* Bottom Sheet */}
          <motion.div
            data-testid="agents-panel"
            initial={{ y: '100%' }}
            animate={{ y: dragY }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDrag={(_, info) => setDragY(Math.max(0, info.offset.y))}
            onDragEnd={handleDragEnd}
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-2xl shadow-2xl"
            style={{
              background: 'var(--bg-secondary)',
              maxHeight: '80dvh',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
              <div 
                className="w-10 h-1 rounded-full"
                style={{ background: 'var(--border-default)' }}
              />
            </div>
            
            <DrawerContent onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// DESKTOP SIDE DRAWER
// ============================================

function DesktopSideDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40"
          />
          
          {/* Side Drawer */}
          <motion.div
            data-testid="agents-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col w-80 shadow-2xl"
            style={{
              background: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border-subtle)',
            }}
          >
            <DrawerContent onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function AgentDrawer({ isOpen: controlledOpen, onClose: controlledOnClose }: AgentDrawerProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  
  const isOpen = controlledOpen ?? internalOpen;
  const handleClose = controlledOnClose ?? (() => setInternalOpen(false));
  const handleOpen = () => setInternalOpen(true);
  
  return (
    <>
      {/* Trigger button (only if not controlled) */}
      {controlledOpen === undefined && (
        <AgentDrawerTrigger onClick={handleOpen} />
      )}
      
      {/* Drawer (responsive) */}
      {isDesktop ? (
        <DesktopSideDrawer isOpen={isOpen} onClose={handleClose} />
      ) : (
        <MobileBottomSheet isOpen={isOpen} onClose={handleClose} />
      )}
    </>
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

export default AgentDrawer;



