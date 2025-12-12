// ============================================
// VOICE CHAT COMPONENT
// Hands-free AI coaching - truly cutting edge
// ============================================

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceChat } from '@/hooks/useVoiceChat';
import { AVAILABLE_AGENTS, type AgentId } from '@/hooks/useAICoach';

interface VoiceChatProps {
  initialAgent?: AgentId;
  onClose?: () => void;
}

export function VoiceChat({ initialAgent = 'coach', onClose }: VoiceChatProps) {
  const [selectedAgent, setSelectedAgent] = useState<AgentId>(initialAgent);
  
  const {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    sendVoiceMessage,
    isSupported,
    aiCoach,
  } = useVoiceChat({ agentId: selectedAgent, autoSpeak: true });

  const currentAgent = AVAILABLE_AGENTS.find(a => a.id === selectedAgent);

  // Auto-send after silence
  useEffect(() => {
    if (!isListening || !transcript) return;
    
    const timeout = setTimeout(() => {
      if (transcript.length > 5) {
        sendVoiceMessage();
      }
    }, 2000); // 2 second silence triggers send

    return () => clearTimeout(timeout);
  }, [transcript, isListening, sendVoiceMessage]);

  if (!isSupported) {
    return (
      <div className="p-8 text-center">
        <div className="text-6xl mb-4">🎤</div>
        <h3 className="text-xl font-bold text-white mb-2">Voice Chat Not Supported</h3>
        <p className="text-gray-400">
          Your browser doesn't support voice features. Try Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[500px] p-8">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      )}

      {/* Agent selector */}
      <select
        value={selectedAgent}
        onChange={(e) => setSelectedAgent(e.target.value as AgentId)}
        className="absolute top-4 left-4 bg-gray-800 text-sm text-gray-300 rounded-lg px-3 py-2 border border-gray-700"
      >
        {AVAILABLE_AGENTS.map(agent => (
          <option key={agent.id} value={agent.id}>
            {agent.name}
          </option>
        ))}
      </select>

      {/* Agent avatar with pulsing effect */}
      <motion.div
        className="relative mb-8"
        animate={{
          scale: isListening ? [1, 1.1, 1] : isSpeaking ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: isListening ? 1 : 0.5,
          repeat: isListening || isSpeaking ? Infinity : 0,
        }}
      >
        {/* Outer glow rings */}
        <AnimatePresence>
          {(isListening || isSpeaking) && (
            <>
              <motion.div
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: isListening 
                    ? 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
                }}
              />
              <motion.div
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 1.5, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: isListening 
                    ? 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
                }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Main avatar */}
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center text-5xl relative z-10"
          style={{
            background: isListening 
              ? 'linear-gradient(135deg, #22c55e, #16a34a)'
              : isSpeaking 
                ? 'linear-gradient(135deg, #a855f7, #7c3aed)'
                : 'linear-gradient(135deg, #6366f1, #4f46e5)',
            boxShadow: isListening
              ? '0 0 40px rgba(34, 197, 94, 0.5)'
              : isSpeaking
                ? '0 0 40px rgba(168, 85, 247, 0.5)'
                : '0 0 20px rgba(99, 102, 241, 0.3)',
          }}
        >
          {isListening ? '🎤' : isSpeaking ? '🔊' : '🧘'}
        </div>
      </motion.div>

      {/* Agent name and status */}
      <h2 className="text-2xl font-bold text-white mb-2">
        {currentAgent?.name || 'AI Coach'}
      </h2>
      <p className="text-gray-400 mb-6">
        {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Tap to talk'}
      </p>

      {/* Transcript display */}
      <AnimatePresence mode="wait">
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 px-6 py-4 bg-gray-800/50 rounded-2xl max-w-md"
          >
            <p className="text-gray-300 text-center italic">"{transcript}"</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Last AI response */}
      <AnimatePresence mode="wait">
        {aiCoach.messages.length > 0 && !isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 px-6 py-4 bg-purple-900/30 rounded-2xl max-w-md border border-purple-700/30"
          >
            <p className="text-gray-200 text-center">
              {aiCoach.messages[aiCoach.messages.length - 1]?.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main action button */}
      <motion.button
        onClick={() => {
          if (isSpeaking) {
            stopSpeaking();
          } else if (isListening) {
            sendVoiceMessage();
          } else {
            startListening();
          }
        }}
        className="w-20 h-20 rounded-full flex items-center justify-center text-2xl transition-all"
        style={{
          background: isListening 
            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
            : isSpeaking
              ? 'linear-gradient(135deg, #f59e0b, #d97706)'
              : 'linear-gradient(135deg, #22c55e, #16a34a)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isListening ? '⏹' : isSpeaking ? '⏸' : '🎤'}
      </motion.button>

      {/* Instructions */}
      <p className="mt-6 text-sm text-gray-500 text-center max-w-xs">
        {isListening 
          ? 'Speak now... Tap again to send'
          : isSpeaking 
            ? 'Tap to stop playback'
            : 'Tap the microphone to start talking to your AI coach'}
      </p>

      {/* Loading indicator */}
      {aiCoach.isLoading && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      {/* Waveform visualization */}
      {isListening && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-green-500 rounded-full"
              animate={{
                height: [10, 30, 10],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default VoiceChat;







