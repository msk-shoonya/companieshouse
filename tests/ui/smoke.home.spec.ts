import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test.describe('@functional Homepage smoke', () => {
  test('loads hero and contact section', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto('/');                  // BasePage builds absolute URL
    await home.acceptCookiesIfPresent();
    await page.waitForLoadState('networkidle');

    // Header nav has Rooms/Contact (avoid footer duplicates)
    const headerNavLinks = page.locator('#navbarNav').getByRole('link', { name: /Rooms|Contact/i });
    await expect(headerNavLinks.first()).toBeVisible({ timeout: 15_000 });

    // Contact section should exist
    const contactSection = typeof (home as any).contactSection === 'function'
      ? (home as any).contactSection()
      : page.locator('#contact');
    await expect(contactSection).toBeVisible({ timeout: 15_000 });

    // Accept the actual title while remaining future-proof
    await expect(page).toHaveTitle(/restful[- ]booker.*demo|shady|automation.*testing/i);

    // Optional: basic network sanity (ignore errors from 3rd-party calls)
    const resp = await page.request.get('/');
    expect.soft(resp.status(), 'homepage HTTP status').toBeLessThan(500);
  });
});
