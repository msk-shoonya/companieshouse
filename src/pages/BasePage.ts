import { Page, expect } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  protected baseUrl: string;

  constructor(page: Page, baseUrl: string = 'https://automationintesting.online') {
    this.page = page;
    this.baseUrl = baseUrl;
  }
  

  async goto(path: string = '/') {
    const targetUrl = path.startsWith('http')
      ? path
      : `${this.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
    await this.page.goto(targetUrl);
    await this.page.waitForLoadState('networkidle');
  }
  
  async acceptCookiesIfPresent() {
    const cookieButton = this.page.locator('button:has-text(/accept|agree/i)');
    if (await cookieButton.isVisible({ timeout: 3000 }).catch(() => false)) {
      await cookieButton.click();
    }
  }

  async scrollTo(locator: string) {
    const element = this.page.locator(locator).first();
    if (await element.isVisible()) {
      await element.scrollIntoViewIfNeeded();
    }
  }

  async assertTitleContains(text: string) {
    await expect(this.page).toHaveTitle(new RegExp(text, 'i'));
  }
}
