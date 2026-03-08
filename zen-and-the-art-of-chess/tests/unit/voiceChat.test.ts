import { describe, expect, it } from 'vitest';
import { shouldSpeakAutoResponse } from '@/hooks/useVoiceChat';

describe('shouldSpeakAutoResponse', () => {
  it('is false when autoSpeak is disabled', () => {
    expect(shouldSpeakAutoResponse(false, 'hello')).toBe(false);
  });

  it('is false for empty responses', () => {
    expect(shouldSpeakAutoResponse(true, '')).toBe(false);
    expect(shouldSpeakAutoResponse(true, '   ')).toBe(false);
    expect(shouldSpeakAutoResponse(true, null)).toBe(false);
  });

  it('is true when autoSpeak is enabled and response has content', () => {
    expect(shouldSpeakAutoResponse(true, 'ok')).toBe(true);
  });
});
