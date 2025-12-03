// ============================================
// SOUND SYSTEM
// Authentic wooden chess piece sounds
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
        volume: 0.7,
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
// AUDIO LOADING & PLAYBACK
// Use actual audio samples for authentic sound
// ============================================

// Lichess-style sound URLs (open source, CC licensed)
const SOUND_URLS = {
  // Standard wooden piece sounds
  move: 'https://lichess1.org/assets/sound/standard/Move.mp3',
  capture: 'https://lichess1.org/assets/sound/standard/Capture.mp3',
  check: 'https://lichess1.org/assets/sound/lisp/Check.mp3',
  castle: 'https://lichess1.org/assets/sound/standard/Castles.mp3',
  promote: 'https://lichess1.org/assets/sound/standard/Promote.mp3',
  gameStart: 'https://lichess1.org/assets/sound/standard/GenericNotify.mp3',
  gameEnd: 'https://lichess1.org/assets/sound/standard/GenericNotify.mp3',
  illegal: 'https://lichess1.org/assets/sound/standard/Error.mp3',
  // UI sounds
  success: 'https://lichess1.org/assets/sound/standard/Confirmation.mp3',
  lowTime: 'https://lichess1.org/assets/sound/standard/LowTime.mp3',
};

// Preloaded audio buffers
const audioCache: Map<string, AudioBuffer> = new Map();
let audioContext: AudioContext | null = null;
let loadingPromises: Map<string, Promise<AudioBuffer | null>> = new Map();

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

// Load a sound from URL into an AudioBuffer
async function loadSound(name: string, url: string): Promise<AudioBuffer | null> {
  // Return cached buffer if available
  if (audioCache.has(name)) {
    return audioCache.get(name)!;
  }
  
  // Return existing loading promise if already loading
  if (loadingPromises.has(name)) {
    return loadingPromises.get(name)!;
  }
  
  // Start loading
  const loadPromise = (async () => {
    try {
      const ctx = getAudioContext();
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      audioCache.set(name, audioBuffer);
      return audioBuffer;
    } catch (e) {
      console.warn(`Failed to load sound "${name}":`, e);
      return null;
    }
  })();
  
  loadingPromises.set(name, loadPromise);
  return loadPromise;
}

// Preload all sounds on first interaction
let soundsPreloaded = false;
export function preloadSounds(): void {
  if (soundsPreloaded) return;
  soundsPreloaded = true;
  
  Object.entries(SOUND_URLS).forEach(([name, url]) => {
    loadSound(name, url);
  });
}

// Play a preloaded sound
async function playSound(name: keyof typeof SOUND_URLS, volumeMultiplier: number = 1): Promise<void> {
  const settings = useSoundStore.getState().settings;
  if (!settings.enabled) return;
  
  // Ensure sounds are preloading
  preloadSounds();
  
  try {
    const ctx = getAudioContext();
    const buffer = await loadSound(name, SOUND_URLS[name]);
    
    if (!buffer) {
      // Fallback to synthesized sound if load failed
      playSynthesizedFallback(name);
      return;
    }
    
    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    
    source.buffer = buffer;
    gainNode.gain.value = settings.volume * volumeMultiplier;
    
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    source.start(0);
  } catch (e) {
    console.warn(`Sound playback failed for "${name}":`, e);
    playSynthesizedFallback(name);
  }
}

// Fallback synthesized sounds if audio files fail to load
function playSynthesizedFallback(name: string): void {
  const settings = useSoundStore.getState().settings;
  if (!settings.enabled) return;
  
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const volume = settings.volume * 0.4;
    
    if (name === 'move' || name === 'castle') {
      // Wooden knock
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (name === 'capture') {
      // Heavier knock
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
      gain.gain.setValueAtTime(volume * 1.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (name === 'check') {
      // Alert tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(volume * 0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {
    console.warn('Fallback sound failed:', e);
  }
}

// ============================================
// CHESS SOUNDS
// Authentic wooden piece sounds
// ============================================

export const ChessSounds = {
  /** Play move sound - wooden piece placement */
  move: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.moveSounds) return;
    playSound('move');
  },
  
  /** Play capture sound - aggressive piece capture */
  capture: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.captureSounds) return;
    playSound('capture');
  },
  
  /** Play check sound */
  check: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.checkSounds) return;
    playSound('check');
  },
  
  /** Play checkmate sound */
  checkmate: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.checkSounds) return;
    // Play capture for the final blow, then success
    playSound('capture');
    setTimeout(() => playSound('success'), 300);
  },
  
  /** Play game start sound */
  gameStart: () => {
    playSound('gameStart', 0.7);
  },
  
  /** Play illegal move sound */
  illegal: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.enabled) return;
    playSound('illegal', 0.5);
  },
  
  /** Play castle sound - two piece movement */
  castle: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.moveSounds) return;
    playSound('castle');
  },
  
  /** Play promotion sound */
  promote: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.moveSounds) return;
    playSound('promote');
  },
};

// ============================================
// UI SOUNDS
// Interface feedback sounds
// ============================================

let uiAudioContext: AudioContext | null = null;

function getUIAudioContext(): AudioContext {
  if (!uiAudioContext) {
    uiAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (uiAudioContext.state === 'suspended') {
    uiAudioContext.resume();
  }
  return uiAudioContext;
}

function playTone(
  frequency: number,
  duration: number,
  options: {
    type?: OscillatorType;
    volume?: number;
    attack?: number;
    decay?: number;
    harmonics?: number[];
  } = {}
) {
  const settings = useSoundStore.getState().settings;
  if (!settings.enabled) return;
  
  const {
    type = 'sine',
    volume = 0.2,
    attack = 0.005,
    decay = duration * 0.8,
    harmonics = [],
  } = options;
  
  try {
    const ctx = getUIAudioContext();
    const now = ctx.currentTime;
    const finalVolume = volume * settings.volume;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(finalVolume, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration);
    
    harmonics.forEach((h, i) => {
      const hOsc = ctx.createOscillator();
      const hGain = ctx.createGain();
      hOsc.type = type;
      hOsc.frequency.setValueAtTime(frequency * h, now);
      hGain.gain.setValueAtTime(0, now);
      hGain.gain.linearRampToValueAtTime(finalVolume * (0.3 / (i + 2)), now + attack);
      hGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.7);
      hOsc.connect(hGain);
      hGain.connect(ctx.destination);
      hOsc.start(now);
      hOsc.stop(now + duration);
    });
  } catch (e) {
    console.warn('Tone playback failed:', e);
  }
}

export const UISounds = {
  /** Notification sound */
  notification: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.notificationSounds) return;
    playTone(880, 0.12, { volume: 0.15, harmonics: [2] });
    setTimeout(() => playTone(1100, 0.15, { volume: 0.12 }), 100);
  },
  
  /** Success sound */
  success: () => {
    playSound('success', 0.8);
  },
  
  /** Error sound */
  error: () => {
    playSound('illegal', 0.6);
  },
  
  /** Achievement unlocked */
  achievement: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.achievementSounds) return;
    playTone(523, 0.12, { volume: 0.2, harmonics: [2] });
    setTimeout(() => playTone(659, 0.12, { volume: 0.22, harmonics: [2] }), 100);
    setTimeout(() => playTone(784, 0.15, { volume: 0.24, harmonics: [2, 3] }), 200);
    setTimeout(() => playTone(1047, 0.35, { volume: 0.28, harmonics: [2, 3, 4] }), 320);
  },
  
  /** Button click */
  click: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.enabled) return;
    
    try {
      const ctx = getUIAudioContext();
      const now = ctx.currentTime;
      const volume = 0.06 * settings.volume;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.025);
      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      console.warn('Click sound failed:', e);
    }
  },
  
  /** Page transition */
  transition: () => {},
  
  /** Puzzle correct */
  puzzleCorrect: () => {
    playTone(659, 0.12, { volume: 0.22, harmonics: [2] });
    setTimeout(() => playTone(880, 0.18, { volume: 0.25, harmonics: [2, 3] }), 100);
  },
  
  /** Puzzle wrong */
  puzzleWrong: () => {
    playSound('illegal', 0.5);
  },
  
  /** Streak milestone */
  streakMilestone: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.achievementSounds) return;
    
    const notes = [523, 587, 659, 784, 880];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        playTone(freq, 0.15, { volume: 0.15 + i * 0.02, harmonics: [2] });
      }, i * 80);
    });
  },
  
  /** Tilt warning */
  tiltWarning: () => {
    playTone(440, 0.25, { volume: 0.18, harmonics: [2] });
    setTimeout(() => playTone(350, 0.35, { volume: 0.15, harmonics: [2] }), 250);
  },
  
  /** Meditation bell */
  meditationBell: () => {
    const settings = useSoundStore.getState().settings;
    if (!settings.enabled) return;
    playTone(440, 1.5, { volume: 0.2, attack: 0.005, decay: 1.2, harmonics: [2, 3, 4.2, 5.4] });
  },
  
  /** Breathing prompt */
  breathingPrompt: () => {
    playTone(440, 0.4, { volume: 0.15, attack: 0.1, decay: 0.3, harmonics: [2] });
  },
};

// ============================================
// SMART MOVE SOUND
// Automatically plays the right sound based on game state
// ============================================

import type { Chess, Move } from 'chess.js';

export function playSmartMoveSound(
  game: Chess,
  move: Move | { from: string; to: string; captured?: string; san?: string } | null,
  options: { isCapture?: boolean } = {}
): void {
  const settings = useSoundStore.getState().settings;
  if (!settings.enabled || !settings.moveSounds) return;
  
  // Ensure sounds are preloading
  preloadSounds();
  
  if (!move) {
    ChessSounds.move();
    return;
  }
  
  // Check for checkmate first
  if (game.isCheckmate()) {
    ChessSounds.checkmate();
    return;
  }
  
  // Check for check
  if (game.inCheck()) {
    ChessSounds.check();
    return;
  }
  
  // Check for castling
  const san = 'san' in move ? move.san : '';
  if (san.includes('O-O') || san.includes('0-0')) {
    ChessSounds.castle();
    return;
  }
  
  // Check if king moved 2 squares (manual castling detection)
  if (move.from && move.to) {
    const fromFile = move.from.charCodeAt(0);
    const toFile = move.to.charCodeAt(0);
    const piece = game.get(move.to as any);
    if (piece?.type === 'k' && Math.abs(toFile - fromFile) >= 2) {
      ChessSounds.castle();
      return;
    }
  }
  
  // Check for promotion
  if (san.includes('=') || ('promotion' in move && move.promotion)) {
    ChessSounds.promote();
    return;
  }
  
  // Check for capture
  const isCapture = options.isCapture ?? ('captured' in move && move.captured) ?? san.includes('x');
  if (isCapture) {
    ChessSounds.capture();
    return;
  }
  
  // Regular move
  ChessSounds.move();
}

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
    playMoveSound: playSmartMoveSound,
    preloadSounds,
  };
}
