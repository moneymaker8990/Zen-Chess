// ============================================
// SOUND SYSTEM
// Audio feedback for moves and notifications
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ============================================
// SOUND STORE
// ============================================

interface SoundSettings {
  enabled: boolean;
  volume: number;
  moveSounds: boolean;
  captureSounds: boolean;
  checkSounds: boolean;
  notificationSounds: boolean;
  achievementSounds: boolean;
}

interface SoundStore {
  settings: SoundSettings;
  updateSettings: (settings: Partial<SoundSettings>) => void;
  toggleSound: () => void;
}

export const useSoundStore = create<SoundStore>()(
  persist(
    (set) => ({
      settings: {
        enabled: true,
        volume: 0.5,
        moveSounds: true,
        captureSounds: true,
        checkSounds: true,
        notificationSounds: true,
        achievementSounds: true,
      },
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
      toggleSound: () => set((state) => ({
        settings: { ...state.settings, enabled: !state.settings.enabled }
      })),
    }),
    { name: 'zen-chess-sounds' }
  )
);

// ============================================
// AUDIO CONTEXT & SYNTHESIS
// Generate sounds programmatically (no external files needed)
// ============================================

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

function playTone(
  frequency: number, 
  duration: number, 
  type: OscillatorType = 'sine',
  volume: number = 0.3
) {
  const settings = useSoundStore.getState().settings;
  if (!settings.enabled) return;
  
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    // Apply volume
    const finalVolume = volume * settings.volume;
    gainNode.gain.setValueAtTime(finalVolume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn('Sound playback failed:', e);
  }
}

function playNoise(duration: number, volume: number = 0.1) {
  const settings = useSoundStore.getState().settings;
  if (!settings.enabled) return;
  
  try {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    filter.type = 'lowpass';
    filter.frequency.value = 1000;
    
    noise.buffer = buffer;
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    const finalVolume = volume * settings.volume;
    gainNode.gain.setValueAtTime(finalVolume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    noise.start();
  } catch (e) {
    console.warn('Noise playback failed:', e);
  }
}

// ============================================
// CHESS SOUNDS
// ============================================

export const ChessSounds = {
  /** Play move sound - soft click */
  move: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.moveSounds) return;
    
    // Soft wooden click
    playTone(800, 0.05, 'sine', 0.15);
    setTimeout(() => playTone(400, 0.08, 'sine', 0.1), 20);
  },
  
  /** Play capture sound - more pronounced */
  capture: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.captureSounds) return;
    
    // Sharp capture sound
    playTone(600, 0.03, 'square', 0.15);
    playNoise(0.08, 0.1);
    setTimeout(() => playTone(300, 0.1, 'sine', 0.1), 30);
  },
  
  /** Play check sound - alert tone */
  check: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.checkSounds) return;
    
    // Alert tone
    playTone(880, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(880, 0.1, 'sine', 0.2), 120);
  },
  
  /** Play checkmate sound - victory fanfare */
  checkmate: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.checkSounds) return;
    
    // Simple fanfare
    playTone(523, 0.15, 'sine', 0.25); // C
    setTimeout(() => playTone(659, 0.15, 'sine', 0.25), 150); // E
    setTimeout(() => playTone(784, 0.3, 'sine', 0.25), 300); // G
  },
  
  /** Play game start sound */
  gameStart: () => {
    playTone(440, 0.1, 'sine', 0.15);
    setTimeout(() => playTone(554, 0.1, 'sine', 0.15), 100);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.2), 200);
  },
  
  /** Play illegal move sound */
  illegal: () => {
    playTone(200, 0.15, 'sawtooth', 0.1);
  },
  
  /** Play castle sound */
  castle: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.moveSounds) return;
    
    playTone(600, 0.04, 'sine', 0.15);
    setTimeout(() => playTone(500, 0.04, 'sine', 0.15), 50);
    setTimeout(() => playTone(700, 0.06, 'sine', 0.12), 100);
  },
  
  /** Play promotion sound */
  promote: () => {
    playTone(523, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(784, 0.15, 'sine', 0.25), 100);
    setTimeout(() => playTone(1047, 0.2, 'sine', 0.2), 200);
  },
};

// ============================================
// UI SOUNDS
// ============================================

export const UISounds = {
  /** Notification sound */
  notification: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.notificationSounds) return;
    
    playTone(880, 0.08, 'sine', 0.15);
    setTimeout(() => playTone(1100, 0.1, 'sine', 0.12), 80);
  },
  
  /** Success sound */
  success: () => {
    playTone(523, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(659, 0.1, 'sine', 0.2), 100);
    setTimeout(() => playTone(784, 0.15, 'sine', 0.15), 200);
  },
  
  /** Error sound */
  error: () => {
    playTone(200, 0.2, 'sawtooth', 0.1);
  },
  
  /** Achievement unlocked */
  achievement: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.achievementSounds) return;
    
    // Triumphant sound
    playTone(523, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(659, 0.1, 'sine', 0.2), 100);
    setTimeout(() => playTone(784, 0.1, 'sine', 0.2), 200);
    setTimeout(() => playTone(1047, 0.3, 'sine', 0.25), 300);
  },
  
  /** Button click */
  click: () => {
    playTone(600, 0.03, 'sine', 0.1);
  },
  
  /** Page transition */
  transition: () => {
    playTone(400, 0.05, 'sine', 0.08);
  },
  
  /** Puzzle correct */
  puzzleCorrect: () => {
    playTone(659, 0.1, 'sine', 0.2);
    setTimeout(() => playTone(784, 0.15, 'sine', 0.2), 100);
  },
  
  /** Puzzle wrong */
  puzzleWrong: () => {
    playTone(300, 0.15, 'sawtooth', 0.1);
    setTimeout(() => playTone(250, 0.2, 'sawtooth', 0.08), 100);
  },
  
  /** Streak milestone */
  streakMilestone: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.achievementSounds) return;
    
    // Ascending tones
    [523, 587, 659, 784, 880].forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.1, 'sine', 0.15), i * 80);
    });
  },
  
  /** Tilt warning */
  tiltWarning: () => {
    playTone(440, 0.2, 'sine', 0.2);
    setTimeout(() => playTone(350, 0.3, 'sine', 0.15), 200);
  },
  
  /** Meditation bell */
  meditationBell: () => {
    playTone(440, 0.5, 'sine', 0.2);
    playTone(880, 0.8, 'sine', 0.1);
    playTone(1320, 1.0, 'sine', 0.05);
  },
  
  /** Breathing prompt */
  breathingPrompt: () => {
    playTone(440, 0.3, 'sine', 0.15);
  },
};

// ============================================
// CONVENIENCE HOOK
// ============================================

export function useSound() {
  const { settings, updateSettings, toggleSound } = useSoundStore();
  
  return {
    settings,
    updateSettings,
    toggleSound,
    chess: ChessSounds,
    ui: UISounds,
    isEnabled: settings.enabled,
  };
}

