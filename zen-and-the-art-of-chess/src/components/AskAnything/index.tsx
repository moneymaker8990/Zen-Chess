// ============================================
// ASK ANYTHING - FLOATING AI BUTTON
// Always-available genius-level help
// Answers persist until explicitly dismissed
// ============================================

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'framer-motion';
import { useAICoach } from '@/hooks/useAICoach';
import { useChessGenius } from '@/hooks/useChessGenius';

interface AskAnythingProps {
  /** Current position FEN for position-aware questions */
  currentPosition?: string;
  /** What the user is currently doing */
  context?: 'puzzle' | 'game' | 'opening' | 'study' | 'general';
  /** Whether to show the button */
  enabled?: boolean;
  /** Position on screen */
  position?: 'bottom-right' | 'bottom-left';
}

// Storage key for button position
const POSITION_STORAGE_KEY = 'zen-chess-ask-button-position';

interface ButtonPosition {
  x: number;
  y: number;
  side: 'left' | 'right';
}

// Default positions
const getDefaultPosition = (): ButtonPosition => {
  if (typeof window === 'undefined') return { x: 0, y: 0, side: 'right' };
  
  // On mobile (narrow screens), position higher to avoid overlapping CTAs
  const isMobile = window.innerWidth <= 768;
  const safeAreaBottom = isMobile ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom')) || 0 : 0;
  const bottomNavHeight = isMobile ? 88 : 64; // Bottom navigation height
  const defaultOffset = isMobile ? 100 : 140; // Higher on mobile
  
  return {
    x: window.innerWidth - 60,
    y: window.innerHeight - defaultOffset - bottomNavHeight - safeAreaBottom,
    side: 'right',
  };
};

// Load saved position from localStorage
const loadSavedPosition = (): ButtonPosition | null => {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(POSITION_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate position is within bounds
      const maxX = window.innerWidth - 48;
      const maxY = window.innerHeight - 100;
      return {
        x: Math.min(Math.max(8, parsed.x), maxX),
        y: Math.min(Math.max(60, parsed.y), maxY),
        side: parsed.side || 'right',
      };
    }
  } catch (e) {
    console.warn('Failed to load button position:', e);
  }
  return null;
};

// Save position to localStorage
const savePosition = (pos: ButtonPosition) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(pos));
  } catch (e) {
    console.warn('Failed to save button position:', e);
  }
};

const QUICK_QUESTIONS = {
  puzzle: [
    "Why is this the right move?",
    "What pattern is this?",
    "How do I spot this faster?",
    "What's the key idea here?",
  ],
  game: [
    "What's the best plan here?",
    "What are the threats?",
    "Should I trade pieces?",
    "Am I better or worse?",
  ],
  opening: [
    "What's the main idea of this opening?",
    "What are common mistakes here?",
    "What should I aim for?",
    "How do I punish deviations?",
  ],
  study: [
    "Why is this important to learn?",
    "How does this connect to other concepts?",
    "What's the most common mistake here?",
    "Can you explain this differently?",
  ],
  general: [
    "How can I improve faster?",
    "What should I focus on today?",
    "Why do I keep making mistakes?",
    "How do I stay calm when losing?",
  ],
};

export function AskAnything({
  currentPosition,
  context = 'general',
  enabled = true,
  position = 'bottom-right',
}: AskAnythingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  // Persisted answer state - survives panel close
  const [persistedAnswer, setPersistedAnswer] = useState<string | null>(null);
  const [persistedQuestion, setPersistedQuestion] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Draggable button position
  const [buttonPosition, setButtonPosition] = useState<ButtonPosition>(getDefaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();
  
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Load saved position on mount - adjust for mobile if needed
  useEffect(() => {
    const saved = loadSavedPosition();
    if (saved) {
      // Adjust saved position for mobile screens if on mobile
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        const safeAreaBottom = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom')) || 0;
        const bottomNavHeight = 88;
        const buttonHeight = 44;
        const padding = 8;
        const maxY = window.innerHeight - bottomNavHeight - buttonHeight - padding - safeAreaBottom;
        
        // If saved position would overlap, adjust it
        if (saved.y > maxY) {
          saved.y = maxY;
        }
      }
      setButtonPosition(saved);
    }
  }, []);
  
  // Handle window resize - keep button in bounds
  useEffect(() => {
    const handleResize = () => {
      setButtonPosition(prev => {
        const isMobile = window.innerWidth <= 768;
        const safeAreaBottom = isMobile ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom')) || 0 : 0;
        const bottomNavHeight = isMobile ? 88 : 64;
        const buttonHeight = 44;
        const padding = 8;
        
        const maxX = window.innerWidth - buttonHeight - padding;
        // Ensure FAB doesn't overlap bottom nav or CTAs - higher minimum on mobile
        const minY = 60; // Below header
        const maxY = window.innerHeight - bottomNavHeight - buttonHeight - padding - safeAreaBottom;
        
        return {
          x: Math.min(Math.max(padding, prev.x), maxX),
          y: Math.min(Math.max(minY, prev.y), maxY),
          side: prev.x < window.innerWidth / 2 ? 'left' : 'right',
        };
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle drag end - snap to edge
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const buttonSize = 44;
    const padding = 8;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isMobile = viewportWidth <= 768;
    const safeAreaBottom = isMobile ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom')) || 0 : 0;
    const bottomNavHeight = isMobile ? 88 : 64;
    
    // Calculate final position
    let finalX = buttonPosition.x + info.offset.x;
    let finalY = buttonPosition.y + info.offset.y;
    
    // Snap to nearest edge (left or right)
    const side: 'left' | 'right' = finalX < viewportWidth / 2 ? 'left' : 'right';
    finalX = side === 'left' ? padding : viewportWidth - buttonSize - padding;
    
    // Clamp Y position - ensure FAB doesn't overlap bottom nav or CTAs
    const minY = 60; // Below header
    const maxY = viewportHeight - bottomNavHeight - buttonSize - padding - safeAreaBottom;
    finalY = Math.min(Math.max(minY, finalY), maxY);
    
    const newPosition: ButtonPosition = { x: finalX, y: finalY, side };
    setButtonPosition(newPosition);
    savePosition(newPosition);
  }, [buttonPosition]);
  
  const { sendMessageStreaming, currentResponse, isStreaming, clearHistory } = useAICoach({
    agentId: 'coach',
    context: currentPosition ? { currentPosition } : undefined,
  });
  
  const { askGenius } = useChessGenius();
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Copy answer to clipboard
  const handleCopy = useCallback(async () => {
    const textToCopy = persistedAnswer || currentResponse;
    if (!textToCopy) return;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [persistedAnswer, currentResponse]);

  // Clear answer and reset state
  const handleDismissAnswer = useCallback(() => {
    setPersistedAnswer(null);
    setPersistedQuestion(null);
    setShowQuickQuestions(true);
    clearHistory();
  }, [clearHistory]);
  
  const handleAsk = useCallback(async (question: string) => {
    if (!question.trim()) return;
    
    setShowQuickQuestions(false);
    setIsThinking(true);
    setInput('');
    setPersistedQuestion(question);
    setPersistedAnswer(null);
    
    try {
      // Use position-aware genius for position questions, general coach otherwise
      if (currentPosition && (question.toLowerCase().includes('move') || 
          question.toLowerCase().includes('position') ||
          question.toLowerCase().includes('piece'))) {
        const response = await askGenius(currentPosition, question);
        setPersistedAnswer(response);
      } else {
        const response = await sendMessageStreaming(question);
        setPersistedAnswer(response);
      }
    } catch (error) {
      console.error('Ask failed:', error);
      setPersistedAnswer("I'm having trouble connecting right now. Please try again.");
    } finally {
      setIsThinking(false);
    }
  }, [currentPosition, askGenius, sendMessageStreaming]);
  
  const handleQuickQuestion = useCallback((question: string) => {
    setInput(question);
    handleAsk(question);
  }, [handleAsk]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAsk(input);
  };
  
  if (!enabled) return null;
  
  const quickQuestions = QUICK_QUESTIONS[context] || QUICK_QUESTIONS.general;
  
  // Check if we have an answer to display
  const displayAnswer = persistedAnswer || (currentResponse && currentResponse.length > 0 ? currentResponse : null);
  const hasAnswer = !!displayAnswer;
  
  return (
    <>
      {/* Floating Button - Draggable with snap-to-edge */}
      <motion.button
        ref={buttonRef}
        onClick={() => {
          if (!isDragging) {
            setIsOpen(true);
          }
        }}
        drag
        dragControls={dragControls}
        dragMomentum={false}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        className="fixed z-40 w-11 h-11 rounded-full shadow-2xl flex items-center justify-center touch-none"
        style={{
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          left: buttonPosition.x,
          top: buttonPosition.y,
          cursor: isDragging ? 'grabbing' : 'grab',
          bottom: 'auto', // Ensure bottom is not set when using top positioning
        }}
        whileHover={{ scale: isDragging ? 1 : 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={false}
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
        aria-label="Ask Chess Genius (drag to reposition)"
        tabIndex={0}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid var(--accent-primary)';
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
      >
        <motion.span
          className="text-lg pointer-events-none"
          animate={isDragging ? {} : { rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          🧠
        </motion.span>
        
        {/* Indicator dot if there's a persisted answer */}
        {persistedAnswer && !isOpen && (
          <span 
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full pointer-events-none"
            style={{ background: 'var(--success)' }}
          />
        )}
        
        {/* Pulse ring - only when not dragging */}
        {!isDragging && (
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              border: '2px solid var(--accent-primary)',
            }}
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        )}
      </motion.button>
      
      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            {/* Panel - position based on button side */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className={`fixed bottom-0 ${buttonPosition.side === 'right' ? 'right-0 sm:right-6' : 'left-0 sm:left-6'} sm:bottom-6 z-50 w-full sm:w-[420px] max-h-[80vh] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col`}
              style={{
                background: 'var(--bg-elevated, var(--bg-secondary))',
                border: '1px solid var(--border-subtle)',
                maxWidth: '100vw',
              }}
            >
              {/* Header */}
              <div 
                className="flex items-center justify-between p-4 border-b shrink-0"
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    }}
                  >
                    <span className="text-xl">🧠</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                      Chess Genius
                    </h3>
                    <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                      Ask me anything about chess
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Content Area - scrollable */}
              <div 
                ref={contentRef}
                className="p-4 overflow-y-auto overflow-x-hidden flex-1 min-h-0 hide-scrollbar"
                style={{ maxHeight: 'calc(80vh - 140px)' }}
              >
                {/* Quick Questions - show when no answer */}
                <AnimatePresence>
                  {showQuickQuestions && !hasAnswer && !isStreaming && !isThinking && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                        Quick Questions
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {quickQuestions.map((q, i) => (
                          <motion.button
                            key={i}
                            onClick={() => handleQuickQuestion(q)}
                            className="px-3 py-2 text-sm rounded-xl transition-all hover:scale-[1.02] max-w-full"
                            style={{
                              background: 'var(--bg-hover)',
                              color: 'var(--text-secondary)',
                              border: '1px solid var(--border-subtle)',
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <span className="truncate block">{q}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Thinking Animation */}
                {isThinking && !isStreaming && !currentResponse && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ background: 'var(--bg-hover)' }}
                  >
                    <div className="flex gap-1">
                      <motion.span
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--accent-primary)' }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--accent-primary)' }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--accent-primary)' }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      Thinking deeply...
                    </span>
                  </motion.div>
                )}
                
                {/* Answer Display - Persisted */}
                {(hasAnswer || isStreaming) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    {/* Question shown */}
                    {persistedQuestion && (
                      <div className="text-xs break-words" style={{ color: 'var(--text-muted)' }}>
                        <span className="font-medium">You asked:</span> {persistedQuestion}
                      </div>
                    )}
                    
                    {/* Answer content with action buttons */}
                    <div 
                      className="p-4 rounded-xl relative"
                      style={{ background: 'var(--bg-hover)' }}
                    >
                      {/* Action buttons - top right */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        {/* Copy button */}
                        <button
                          onClick={handleCopy}
                          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                          style={{ color: copySuccess ? 'var(--success)' : 'var(--text-muted)' }}
                          title="Copy answer"
                          aria-label="Copy answer to clipboard"
                        >
                          {copySuccess ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                        </button>
                        
                        {/* Dismiss button */}
                        {!isStreaming && (
                          <button
                            onClick={handleDismissAnswer}
                            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                            style={{ color: 'var(--text-muted)' }}
                            title="Dismiss answer"
                            aria-label="Dismiss answer"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      {/* Answer text */}
                      <p 
                        className="text-sm leading-relaxed whitespace-pre-wrap pr-16 break-words" 
                        style={{ color: 'var(--text-primary)', overflowWrap: 'break-word' }}
                      >
                        {displayAnswer}
                        {isStreaming && (
                          <span 
                            className="inline-block w-2 h-4 ml-1 animate-pulse"
                            style={{ background: 'var(--accent-primary)' }}
                          />
                        )}
                      </p>
                    </div>
                    
                    {/* Ask Another button */}
                    {!isStreaming && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={handleDismissAnswer}
                        className="w-full py-2 text-sm rounded-xl transition-colors hover:bg-white/5"
                        style={{
                          color: 'var(--accent-primary)',
                          border: '1px solid var(--accent-primary)',
                        }}
                      >
                        Ask another question
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </div>
              
              {/* Input - always visible */}
              <form 
                onSubmit={handleSubmit} 
                className="p-4 border-t shrink-0" 
                style={{ borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about chess..."
                    disabled={isThinking || isStreaming}
                    className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
                    style={{
                      background: 'var(--bg-hover)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isThinking || isStreaming}
                    className="px-4 py-3 rounded-xl font-medium text-sm transition-all disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                      color: 'white',
                    }}
                  >
                    {isThinking || isStreaming ? '...' : 'Ask'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default AskAnything;
