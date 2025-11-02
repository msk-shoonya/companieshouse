import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 * ----------------------------------------
 * Target: https://automationintesting.online
 * Reports, traces, and screenshots saved under ./artifacts/
 */

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },

  // ✅ Run tests fully parallel unless in CI
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'artifacts/html-report', open: 'never' }],
  ],

  // ✅ Shared options for all tests
  use: {
    baseURL: 'https://automationintesting.online',
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',     // keep trace on failure
    screenshot: 'only-on-failure',  // keep screenshots on failure
    video: 'retain-on-failure',     // keep videos for failed tests
    actionTimeout: 0,
    navigationTimeout: 30_000,
  },

  // ✅ Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // Uncomment if you want Safari coverage
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

  outputDir: 'artifacts/test-output',

  // ✅ Optional local dev server (only enable if you host locally)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
