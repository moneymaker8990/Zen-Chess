// ============================================
// ASK ANYTHING - FLOATING AI BUTTON
// Always-available genius-level help
// ============================================

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAICoach, AVAILABLE_AGENTS } from '@/hooks/useAICoach';
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
  const [answer, setAnswer] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { sendMessageStreaming, currentResponse, isStreaming, clearHistory } = useAICoach({
    agentId: 'coach',
    context: currentPosition ? { currentPosition } : undefined,
  });
  
  const { askGenius, isAnalyzing } = useChessGenius();
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);
  
  // Clear state when closed
  useEffect(() => {
    if (!isOpen) {
      setAnswer(null);
      setInput('');
      setShowQuickQuestions(true);
      clearHistory();
    }
  }, [isOpen, clearHistory]);
  
  const handleAsk = useCallback(async (question: string) => {
    if (!question.trim()) return;
    
    setShowQuickQuestions(false);
    setIsThinking(true);
    setInput('');
    
    try {
      // Use position-aware genius for position questions, general coach otherwise
      if (currentPosition && question.toLowerCase().includes('move') || 
          question.toLowerCase().includes('position') ||
          question.toLowerCase().includes('piece')) {
        const response = await askGenius(currentPosition, question);
        setAnswer(response);
      } else {
        await sendMessageStreaming(question);
      }
    } catch (error) {
      console.error('Ask failed:', error);
      setAnswer("I'm having trouble connecting right now. Please try again.");
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
  
  const positionClass = position === 'bottom-right' ? 'right-6' : 'left-6';
  const quickQuestions = QUICK_QUESTIONS[context] || QUICK_QUESTIONS.general;
  
  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 ${positionClass} z-40 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110`}
        style={{
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={false}
        animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
      >
        <motion.span
          className="text-2xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          🧠
        </motion.span>
        
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
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
            
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className={`fixed bottom-0 ${position === 'bottom-right' ? 'right-0 sm:right-6' : 'left-0 sm:left-6'} sm:bottom-6 z-50 w-full sm:w-[420px] max-h-[80vh] rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl`}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {/* Header */}
              <div 
                className="flex items-center justify-between p-4 border-b"
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
                  <div>
                    <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      Chess Genius
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Ask me anything about chess
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Content Area */}
              <div className="p-4 max-h-[50vh] overflow-y-auto">
                {/* Quick Questions */}
                <AnimatePresence>
                  {showQuickQuestions && !answer && !isStreaming && (
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
                            className="px-3 py-2 text-sm rounded-xl transition-all hover:scale-[1.02]"
                            style={{
                              background: 'var(--bg-hover)',
                              color: 'var(--text-secondary)',
                              border: '1px solid var(--border-subtle)',
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            {q}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Thinking Animation */}
                {isThinking && !isStreaming && (
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
                
                {/* Streaming Response */}
                {(isStreaming || currentResponse) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl"
                    style={{ background: 'var(--bg-hover)' }}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
                      {currentResponse}
                      {isStreaming && (
                        <span 
                          className="inline-block w-2 h-4 ml-1 animate-pulse"
                          style={{ background: 'var(--accent-primary)' }}
                        />
                      )}
                    </p>
                  </motion.div>
                )}
                
                {/* Static Answer */}
                {answer && !isStreaming && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl"
                    style={{ background: 'var(--bg-hover)' }}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-primary)' }}>
                      {answer}
                    </p>
                  </motion.div>
                )}
                
                {/* Ask Another */}
                {(answer || currentResponse) && !isStreaming && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => {
                      setAnswer(null);
                      setShowQuickQuestions(true);
                      clearHistory();
                    }}
                    className="mt-4 w-full py-2 text-sm rounded-xl transition-colors"
                    style={{
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--accent-primary)',
                    }}
                  >
                    Ask another question
                  </motion.button>
                )}
              </div>
              
              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
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

