import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactForm extends BasePage {
  async ensureFormVisible() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForSelector('#contact form', { state: 'visible', timeout: 15000 });
  }

  elName(): Locator { return this.page.locator('#name'); }
  elEmail(): Locator { return this.page.locator('#email'); }
  elPhone(): Locator { return this.page.locator('#phone'); }
  elSubject(): Locator { return this.page.locator('#subject'); }
  elMessage(): Locator { return this.page.locator('#description'); }
}
