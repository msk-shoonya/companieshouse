import { Page } from '@playwright/test';

export class Header {
constructor(private page: Page) {}

async goToContact() {
await this.page.getByRole('link', { name: /contact/i }).click();
}
}