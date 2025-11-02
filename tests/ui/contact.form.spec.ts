import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { ContactForm } from '../../src/pages/ContactForm';

test.describe('@functional Contact form (BasePage inheritance)', () => {

  test('fills all contact form fields successfully', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto('/');
    await home.acceptCookiesIfPresent();
    await page.waitForLoadState('networkidle');

    const contact = new ContactForm(page);
    await contact.ensureFormVisible();

    // Fill each field (no submit)
    await (await contact.elName()).fill('Alice Example');
    await (await contact.elEmail()).fill('alice@example.com');
    await (await contact.elPhone()).fill('07123456789');
    await (await contact.elSubject()).fill('Booking enquiry');
    await (await contact.elMessage()).fill('Just testing form fields.');

    // Basic check: values persisted correctly
    await expect(await contact.elName()).toHaveValue('Alice Example');
    await expect(await contact.elEmail()).toHaveValue('alice@example.com');
  });

});
