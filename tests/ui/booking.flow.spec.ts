// tests/ui/booking.flow.spec.ts
import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('@functional Booking widget / Rooms availability', () => {
  test('rooms section shows at least one bookable room', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto('/');                       
    await home.acceptCookiesIfPresent();
    await page.waitForLoadState('networkidle');

    // Prefer the header link to jump to rooms; if not present, just scroll.
    const roomsLink = page.locator('a[href="#rooms"]').first();
    if (await roomsLink.isVisible().catch(() => false)) {
      await roomsLink.click({ noWaitAfter: true }).catch(() => {});
    }

    // Strict, single target: the #rooms section
    const roomsSection = page.locator('#rooms').first();
    await roomsSection.scrollIntoViewIfNeeded();
    await expect(roomsSection).toBeVisible({ timeout: 15_000 });

    // Heuristics for a "bookable" room: a book button or price/room card visible.
    const bookButton = roomsSection.getByRole('button', { name: /book/i }).first();
    const priceText  = roomsSection.locator('text=/£|price/i').first();
    const roomCard   = roomsSection.locator('.card, .room, [class*="room"] , [class*="card"]').first();

    // Wait briefly for images/layout to settle
    await page.waitForTimeout(300);

    // Pass if ANY of these affordances are visible
    const anyVisible =
      (await bookButton.isVisible().catch(() => false)) ||
      (await priceText.isVisible().catch(() => false)) ||
      (await roomCard.isVisible().catch(() => false));

    expect(anyVisible).toBeTruthy();
  });
});
