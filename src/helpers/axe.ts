import { test as base } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import fs from 'node:fs/promises';

export const test = base.extend<{ axeScan: () => Promise<void> }>({
axeScan: async ({ page }, use, testInfo) => {
await use(async () => {
const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
const outDir = `artifacts/a11y`;
await fs.mkdir(outDir, { recursive: true });
await fs.writeFile(`${outDir}/${testInfo.title.replace(/\s+/g, '_')}.json`, JSON.stringify(results, null, 2));

// Soft-assert: allow known violations but fail if egregious
const critical = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
if (critical.length > 25) {
throw new Error(`High count of serious/critical a11y violations: ${critical.length}`);
}
});
}
});