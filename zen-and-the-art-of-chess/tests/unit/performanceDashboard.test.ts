import { describe, expect, it } from 'vitest';
import { calculateAccuracyChartX } from '@/components/PerformanceDashboard';

describe('calculateAccuracyChartX', () => {
  it('centers a single point chart', () => {
    expect(calculateAccuracyChartX(0, 1)).toBe(200);
  });

  it('calculates first and last points for multi-point chart', () => {
    expect(calculateAccuracyChartX(0, 5)).toBe(0);
    expect(calculateAccuracyChartX(4, 5)).toBe(400);
  });
});
