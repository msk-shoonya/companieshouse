# Test Plan – automationintesting.online

## Scope

Validate critical user journeys and site quality signals for the public Shady Meadows B&B site:
- Homepage availability & navigation
- Booking widget (date selection and pricing visibility)
- Contact form validation & submission
- Non-functional: accessibility smoke (WCAG 2.1 AA heuristics via axe), basic performance smoke (first-load timings, response sizes), cross-browser sanity

## Out of Scope (for this iteration)
- Admin panel scenarios
- Real bookings or payment flows
- Full performance benchmarking (we do smoke-level checks only)
- Security testing beyond trivial checks

## Risks & Mitigations
- **Demo site instability / shared data** → Use idempotent checks, avoid destructive actions, add retries on navigation.
- **Dynamic UI timing** → Use Playwright auto-waiting, explicit waits for network idle on critical steps.
- **Cross-browser quirks** → Run in Chromium + Firefox by default; WebKit optional.

## Test Strategy

- **UI E2E** with Playwright and Page Objects
- **A11y smoke** with axe-core and per‑page violation snapshot (JSON)
- **Perf smoke**: capture `responseEnd`, `domContentLoadedEventEnd`, `loadEventEnd` via the Performance API and assert thresholds (loose; tuned after baselines)

## Environments
- Base URL: https://automationintesting.online

## Entry / Exit Criteria
- **Entry:** environment online, base URL reachable, Node and browsers installed.
- **Exit:** all smoke tests pass; a11y violations counted and recorded; HTML report generated.

## Test Cases (high-level)

1. **Homepage Smoke**
- Navigate to `/`
- Assert hero, cookie banner (if shown), “Contact” section visible
- Assert key nav links present (Rooms / Contact)

2. **Booking Widget – Date Selection**
- Open date picker; select check‑in today+7, check‑out +8
- Assert selected dates appear in inputs
- Assert nightly price grid (or availability) renders

3. **Contact Form – Validation**
- Attempt submit with empty fields → verify error messages
- Submit with invalid email → verify email validation message

4. **Contact Form – Happy Path**
- Fill valid name, email, phone, subject, message → submit
- Assert success toast/message displayed

5. **A11y – Homepage**
- Inject axe; log violations JSON; assert `critical`/`serious` counts ≤ agreed threshold (initially allow >0 but record)

6. **Performance – Homepage**
- Record timing metrics; assert `domContentLoadedEventEnd < 4s` (tune as needed) and that main document < 1.5MB

## Reporting
- Playwright HTML report
- `artifacts/a11y/*.json` per page
- Known issues captured in BUG_REPORTS.md