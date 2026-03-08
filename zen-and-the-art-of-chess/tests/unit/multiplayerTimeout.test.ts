import { describe, expect, it } from 'vitest';
import { resolveTimeoutResult } from '@/lib/multiplayer/gameEngine';

describe('resolveTimeoutResult', () => {
  it('returns black win when white flags', () => {
    const result = resolveTimeoutResult('w');
    expect(result.winnerColor).toBe('b');
    expect(result.result).toBe('black_wins');
  });

  it('returns white win when black flags', () => {
    const result = resolveTimeoutResult('b');
    expect(result.winnerColor).toBe('w');
    expect(result.result).toBe('white_wins');
  });
});
