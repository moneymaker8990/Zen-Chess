import { describe, it, expect, vi, beforeEach } from 'vitest';

// Test the sound system logic (mocked audio context)
describe('Sound System', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe('Sound Store', () => {
    it('should have correct default settings', async () => {
      const { useSoundStore } = await import('@/lib/soundSystem');
      const store = useSoundStore.getState();
      
      expect(store.settings.enabled).toBe(true);
      expect(store.settings.volume).toBe(0.7);
      expect(store.settings.moveSounds).toBe(true);
      expect(store.settings.captureSounds).toBe(true);
      expect(store.settings.checkSounds).toBe(true);
    });

    it('should toggle sound on/off', async () => {
      const { useSoundStore } = await import('@/lib/soundSystem');
      
      // Start enabled
      expect(useSoundStore.getState().settings.enabled).toBe(true);
      
      // Toggle off
      useSoundStore.getState().toggleSound();
      expect(useSoundStore.getState().settings.enabled).toBe(false);
      
      // Toggle back on
      useSoundStore.getState().toggleSound();
      expect(useSoundStore.getState().settings.enabled).toBe(true);
    });

    it('should update individual settings', async () => {
      const { useSoundStore } = await import('@/lib/soundSystem');
      
      useSoundStore.getState().updateSettings({ volume: 0.5 });
      expect(useSoundStore.getState().settings.volume).toBe(0.5);
      
      useSoundStore.getState().updateSettings({ moveSounds: false });
      expect(useSoundStore.getState().settings.moveSounds).toBe(false);
    });
  });

  describe('Chess Sounds API', () => {
    it('should export ChessSounds with all expected methods', async () => {
      const { ChessSounds } = await import('@/lib/soundSystem');
      
      expect(typeof ChessSounds.move).toBe('function');
      expect(typeof ChessSounds.capture).toBe('function');
      expect(typeof ChessSounds.check).toBe('function');
      expect(typeof ChessSounds.checkmate).toBe('function');
      expect(typeof ChessSounds.castle).toBe('function');
      expect(typeof ChessSounds.promote).toBe('function');
      expect(typeof ChessSounds.illegal).toBe('function');
    });
  });

  describe('UI Sounds API', () => {
    it('should export UISounds with all expected methods', async () => {
      const { UISounds } = await import('@/lib/soundSystem');
      
      expect(typeof UISounds.notification).toBe('function');
      expect(typeof UISounds.success).toBe('function');
      expect(typeof UISounds.error).toBe('function');
      expect(typeof UISounds.achievement).toBe('function');
      expect(typeof UISounds.click).toBe('function');
      expect(typeof UISounds.puzzleCorrect).toBe('function');
      expect(typeof UISounds.puzzleWrong).toBe('function');
    });
  });

  describe('Smart Move Sound', () => {
    it('should export playSmartMoveSound function', async () => {
      const { playSmartMoveSound } = await import('@/lib/soundSystem');
      expect(typeof playSmartMoveSound).toBe('function');
    });
  });

  describe('Sound Preloading', () => {
    it('should export preloadSounds function', async () => {
      const { preloadSounds } = await import('@/lib/soundSystem');
      expect(typeof preloadSounds).toBe('function');
    });
  });

  // Note: useSound hook requires React component context
  // This would need to be tested in a component test with proper React rendering
  describe('useSound Export', () => {
    it('should export useSound function', async () => {
      const { useSound } = await import('@/lib/soundSystem');
      expect(typeof useSound).toBe('function');
    });
  });
});
