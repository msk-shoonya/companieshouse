# Bug Reports – automationintesting.online
> This file captures issues observed when running the suite. Use the template below.

## Template
- **Title:** <concise summary>
- **Environment:** URL, browser, OS, viewport
- **Steps to Reproduce:**
- **Expected Result:**
- **Actual Result:**
- **Evidence:** screenshots / trace / console logs / a11y JSON snippet
- **Severity:** (S1–S4)
- **Notes/Workarounds:**

## Example Reports (from this suite)

1) **Contact form accepts phone with letters**
- **Env:** https://automationintesting.online, Chromium 130, macOS, 1280×800
- **Steps:** Open Home → Contact → enter `abc` in Phone → submit
- **Expected:** Client-side validation rejects non‑numeric phone
- **Actual:** Form submits / proceeds without highlighting phone error (observed intermittently)
- **Evidence:** See trace in `artifacts/traces/contact-invalid-phone.zip`
- **Severity:** S3 (validation defect)

2) **Cookie banner lacks focus trap**
- **Env:** as above
- **Steps:** On first load with fresh storage, tab away while cookie banner visible
- **Expected:** Keyboard focus remains within banner until dismissed (WCAG 2.1 2.1.2)
- **Actual:** Focus moves to page content behind the banner
- **Evidence:** A11y JSON shows focus-related violations
- **Severity:** S3 (a11y)

> Note: As the site is a shared demo, defects may be transient. Keep evidence in repo artifacts.