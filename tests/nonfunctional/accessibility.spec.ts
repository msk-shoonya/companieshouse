import { expect } from '@playwright/test';
import { test } from '../../src/helpers/axe';

test.describe('@nonfunctional A11y smoke', () => {
test('homepage has reasonable axe score', async ({ page, axeScan }) => {
await page.goto('/');
await axeScan();
// If axeScan throws, test fails. Otherwise we pass and keep JSON.
await expect(true).toBeTruthy();
});
});