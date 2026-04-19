---
name: data-testid
description: >-
  Stable data-testid naming for this Next.js portfolio and future Playwright/RTL tests.
  Use when adding selectors, debugging flaky tests, or auditing interactive UI.
user-invocable: true
---

# data-testid conventions (portfolio)

## Scope

This site is a **marketing/portfolio** Next.js app (**`src/app/`**). Prefer **`data-testid`** on:

- Primary navigation links and mobile menu controls (**`Navbar`**).
- Theme toggle (light/dark/system).
- Contact form fields, submit control, and success/error regions.
- Carousel/lightbox controls on **`/portfolio`** if you need stable automation.

Use **kebab-case** values: **`portfolio-section-about`**, **`contact-form-submit`**, etc.

## Patterns

| Use case | Suggested shape | Example |
|----------|------------------|---------|
| Page section | **`<area>-section-<name>`** | **`home-section-hero`** |
| Reusable widget | **`<widget>-<role>`** | **`theme-toggle-trigger`** |
| Form | **`<form-name>-field-<fieldName>`** | **`contact-field-email`** |
| List item (dynamic) | **`<list>-item-<stableId>`** only when id is stable | prefer role + name for static copy |

**Principles**

- Prefer **stable** ids that do not embed display strings that change with locale or CMS content, unless that string is the contract under test.
- Do **not** use **`data-testid`** for styling — Tailwind/CSS only.
- When you **rename** ids, update any tests or skills that reference the old id in the same change.

## Future Playwright

If you add **`e2e/`**, document env and base URL in **`CLAUDE.md`**. For timing and flake patterns, see **`.agents/skills/browser-regression-e2e/SKILL.md`** (generic browser guidance).

## Historical note

A much longer version of this skill documented admin-grid ids from another product. **Ignore** that material unless you port similar admin UI into this repo — this file is the source of truth **here**.
