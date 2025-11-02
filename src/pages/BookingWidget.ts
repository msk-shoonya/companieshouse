import { Page, Locator, expect } from '@playwright/test';
import { addDays, formatISODate } from '../helpers/dates';

export class BookingWidget {
  constructor(private page: Page) {}

  private async firstVisible(locators: Locator[], timeout = 2000) {
    for (const loc of locators) {
      try {
        await loc.first().waitFor({ state: 'visible', timeout });
        return loc.first();
      } catch {
        /* try next */
      }
    }
    throw new Error('No locator candidate became visible for booking field.');
  }

  private async resolveCheckIn(): Promise<Locator> {
    return this.firstVisible([
      this.page.getByLabel(/check[\s-]?in/i),
      this.page.getByPlaceholder(/check[\s-]?in/i),
      this.page.getByRole('textbox', { name: /check[\s-]?in/i }),
      this.page.locator('input[name="checkin"]'),
      this.page.locator('#checkin'),
    ]);
  }

  private async resolveCheckOut(): Promise<Locator> {
    return this.firstVisible([
      this.page.getByLabel(/check[\s-]?out/i),
      this.page.getByPlaceholder(/check[\s-]?out/i),
      this.page.getByRole('textbox', { name: /check[\s-]?out/i }),
      this.page.locator('input[name="checkout"]'),
      this.page.locator('#checkout'),
    ]);
  }

  async selectDates(daysFromTodayIn = 7, nights = 1) {
    const checkInDate = addDays(new Date(), daysFromTodayIn);
    const checkOutDate = addDays(checkInDate, nights);

    const checkIn = await this.resolveCheckIn();
    const checkOut = await this.resolveCheckOut();

    await checkIn.click();
    await checkIn.fill(formatISODate(checkInDate));

    await checkOut.click();
    await checkOut.fill(formatISODate(checkOutDate));

    await this.page.keyboard.press('Tab');

    await expect(checkIn).toHaveValue(/\d{4}-\d{2}-\d{2}/);
    await expect(checkOut).toHaveValue(/\d{4}-\d{2}-\d{2}/);
  }
}
