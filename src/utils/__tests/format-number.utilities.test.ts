import { describe, expect, it } from 'vitest';
import { formatCompact, formatNumber } from '../format-number.utilities';

describe('formatNumber', () => {
  it('groups thousands with commas', () => {
    expect(formatNumber(1234)).toBe('1,234');
    expect(formatNumber(1_234_567)).toBe('1,234,567');
  });

  it('leaves numbers below 1000 unchanged', () => {
    expect(formatNumber(999)).toBe('999');
  });

  it('returns an empty string for zero', () => {
    expect(formatNumber(0)).toBe('');
  });
});

describe('formatCompact', () => {
  it('returns the plain number below 1000', () => {
    expect(formatCompact(0)).toBe('0');
    expect(formatCompact(999)).toBe('999');
  });

  it('switches to K notation from 1000', () => {
    expect(formatCompact(1000)).toBe('1K');
    expect(formatCompact(1500)).toBe('1.5K');
  });

  it('truncates rather than rounds the decimal', () => {
    expect(formatCompact(1599)).toBe('1.5K');
    expect(formatCompact(12_345)).toBe('12.3K');
  });
});
