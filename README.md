# 🧭 Playwright + TypeScript automation for automationintesting.online

![Playwright Tests](https://github.com/msk-shoonya/companieshouse/actions/workflows/ci.yml/badge.svg)

This repository contains a pragmatic UI automation suite (plus basic non-functional checks) for the **Restful Booker Platform** demo site at [https://automationintesting.online/](https://automationintesting.online/).


## ✅ Highlights
- **Playwright + TypeScript**
- **Page Object Model** with shared `BasePage` inheritance
- **Cross-browser:** Chromium, Firefox, (optionally WebKit)
- **Accessibility smoke tests** (axe-core)
- **Performance smoke tests** (Navigation Timing API)
- **Functional smoke coverage** for core user flows
- **HTML report, traces, videos, screenshots**

## 🧩 Project Structure
src/
pages/
BasePage.ts
HomePage.ts
ContactForm.ts
tests/
ui/
nonfunctional/
artifacts/
playwright.config.ts


## 🏷️ Test Tagging
| Tag | Purpose | Example Files |
|------|----------|---------------|
| `@functional` | Core UI smoke and user flow validation | `tests/ui/*.spec.ts` |
| `@nonfunctional` | Accessibility & performance checks | `tests/nonfunctional/*.spec.ts` |

 1) Prerequisites
- Node.js ≥ 18  
- macOS / Linux / Windows  
npm ci
npx playwright install --with-deps

2) Run Tests
Full Suite (Functional + Non-Functional):
npm test
# or
npx playwright test

Only Functional UI Tests:
npx playwright test --grep @functional
# or
npm run test:ui

Only Accessibility Tests:
npx playwright test --grep @nonfunctional --grep "accessibility"
# or
npm run test:a11y

Only Performance Smoke:
npm run test:perf

Open the Playwright HTML Report:
npm run report


3) Configuration
Base URL: set in playwright.config.ts → https://automationintesting.online
Projects: Chromium & Firefox enabled
Artifacts: output to artifacts/

4) What’s Covered (v1)
Functional:
Homepage smoke
Booking widget (rooms visible)
Contact form (fields filled)

Non-Functional:
Accessibility via axe-core
Performance via Navigation Timing API