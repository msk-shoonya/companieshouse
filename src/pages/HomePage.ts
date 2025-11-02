import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  heroSection(): Locator {
    return this.page.locator('.hero, section.hero');
  }

  contactSection(): Locator {
    return this.page.locator('#contact');
  }

  async gotoHome() {
    await this.goto('/');
  }
}
