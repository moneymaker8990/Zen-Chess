// ============================================
// VOICE CHAT HOOK
// Hands-free AI coaching with speech recognition
// ============================================

import { useState, useCallback, useRef, useEffect } from 'react';
import { useAICoach, type AgentId } from './useAICoach';

interface UseVoiceChatOptions {
  agentId?: AgentId;
  language?: string;
  continuous?: boolean;
  autoSpeak?: boolean;
}

interface UseVoiceChatReturn {
  // State
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  
  // Controls
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  
  // AI Coach integration
  sendVoiceMessage: () => Promise<void>;
  
  // Support check
  isSupported: boolean;
  
  // Underlying AI coach
  aiCoach: ReturnType<typeof useAICoach>;
}

// ============================================
// VOICE SYNTHESIS SETTINGS
// ============================================

const VOICE_SETTINGS = {
  coach: { pitch: 1.0, rate: 0.9, voiceName: 'English' }, // Calm, measured
  innerCompass: { pitch: 0.9, rate: 0.85, voiceName: 'English' }, // Centering, grounded
  motivator: { pitch: 1.1, rate: 1.0, voiceName: 'English' }, // Energetic
  mindfulness: { pitch: 0.95, rate: 0.8, voiceName: 'English' }, // Peaceful
  flowKeeper: { pitch: 0.95, rate: 0.9, voiceName: 'English' }, // Steady, flowing
  default: { pitch: 1.0, rate: 0.95, voiceName: 'English' },
};

// ============================================
// HOOK IMPLEMENTATION
// ============================================

export function useVoiceChat(options: UseVoiceChatOptions = {}): UseVoiceChatReturn {
  const {
    agentId = 'coach',
    language = 'en-US',
    continuous = false,
    autoSpeak = true,
  } = options;

  // State
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  // Refs
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // AI Coach
  const aiCoach = useAICoach({ agentId });

  // Check support
  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) &&
    'speechSynthesis' in window;

  // ============================================
  // INITIALIZE SPEECH RECOGNITION
  // ============================================
  
  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    synthRef.current = window.speechSynthesis;

    return () => {
      recognition.abort();
    };
  }, [isSupported, continuous, language]);

  // ============================================
  // START LISTENING
  // ============================================
  
  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    
    setTranscript('');
    recognitionRef.current.start();
  }, [isListening]);

  // ============================================
  // STOP LISTENING
  // ============================================
  
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
  }, []);

  // ============================================
  // SPEAK TEXT
  // ============================================
  
  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get voice settings for current agent
    const settings = VOICE_SETTINGS[agentId as keyof typeof VOICE_SETTINGS] || VOICE_SETTINGS.default;
    
    // Try to find a good voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.startsWith('en') && 
      (v.name.includes('Natural') || v.name.includes('Premium') || v.name.includes('Neural'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  }, [agentId]);

  // ============================================
  // STOP SPEAKING
  // ============================================
  
  const stopSpeaking = useCallback(() => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsSpeaking(false);
  }, []);

  // ============================================
  // SEND VOICE MESSAGE TO AI
  // ============================================
  
  const sendVoiceMessage = useCallback(async () => {
    if (!transcript.trim()) return;
    
    stopListening();
    
    try {
      const response = await aiCoach.sendMessage(transcript);
      
      if (autoSpeak && response) {
        speak(response);
      }
    } catch (error) {
      console.error('Failed to get AI response:', error);
      speak("I'm having trouble responding right now. Please try again.");
    }

    setTranscript('');
  }, [transcript, stopListening, aiCoach, autoSpeak, speak]);

  // ============================================
  // RETURN
  // ============================================
  
  return {
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
  };
}

// ============================================
// TYPE DECLARATIONS
// ============================================

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default useVoiceChat;

