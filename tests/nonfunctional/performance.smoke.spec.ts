import { test, expect } from '@playwright/test';

function getPerf(page: any) {
return page.evaluate(() => {
const t = performance.timing;
// Navigation Timing v1 fallback; modern browsers support v2 but demo site is simple
return {
navigationStart: t.navigationStart,
responseEnd: t.responseEnd,
domContentLoadedEventEnd: t.domContentLoadedEventEnd,
loadEventEnd: t.loadEventEnd
};
});
}

test('@nonfunctional homepage first-load timing within loose thresholds', async ({ page, context }) => {
// Fresh context for cold-ish load
await page.goto('/');
const timings = await getPerf(page);

const dcl = timings.domContentLoadedEventEnd - timings.navigationStart;
const load = timings.loadEventEnd - timings.navigationStart;

// Loose thresholds suitable for a public demo site – tune as needed
expect(dcl).toBeLessThan(4000);
expect(load).toBeLessThan(8000);
});