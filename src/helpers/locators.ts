import type { Page, Locator } from '@playwright/test';

/** Return the first locator from `candidates` that is attached and visible. */
export async function firstVisible(page: Page, candidates: string[]): Promise<Locator> {
  for (const sel of candidates) {
    const loc = page.locator(sel).first();
    try {
      await loc.waitFor({ state: 'visible', timeout: 1500 });
      return loc;
    } catch { /* try next */ }
  }
  throw new Error(`None of the locator candidates became visible:\n${candidates.join('\n')}`);
}
