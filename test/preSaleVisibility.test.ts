import { describe, expect, it } from 'vitest';

import { isPreSaleVisible } from '../src/config/preSale';

describe('isPreSaleVisible', () => {
  it('returns true within the configured window', () => {
    const visible = isPreSaleVisible(
      {
        startsAt: '2026-01-01T00:00:00.000Z',
        endsAt: '2026-12-31T23:59:59.999Z'
      },
      new Date('2026-06-15T10:00:00.000Z')
    );

    expect(visible).toBe(true);
  });

  it('returns false before the start date', () => {
    const visible = isPreSaleVisible(
      {
        startsAt: '2026-01-01T00:00:00.000Z',
        endsAt: '2026-12-31T23:59:59.999Z'
      },
      new Date('2025-12-31T23:59:59.000Z')
    );

    expect(visible).toBe(false);
  });

  it('returns false after the end date', () => {
    const visible = isPreSaleVisible(
      {
        startsAt: '2026-01-01T00:00:00.000Z',
        endsAt: '2026-12-31T23:59:59.999Z'
      },
      new Date('2027-01-01T00:00:00.000Z')
    );

    expect(visible).toBe(false);
  });

  it('ignores invalid dates and stays visible', () => {
    const visible = isPreSaleVisible(
      {
        startsAt: 'invalid-date',
        endsAt: 'invalid-date'
      },
      new Date('2026-06-15T10:00:00.000Z')
    );

    expect(visible).toBe(true);
  });
});
