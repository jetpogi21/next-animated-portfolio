---
name: browser-regression-e2e
description: >-
  When a UI bug needs real browser timing (focus, portals, Radix, async layout), reproduce with Playwright
  once this repo has E2E wired. Until then, use manual dev checks. Complements galaxy-testing and data-testid skills.
user-invocable: true
---

# Browser regression testing (Playwright)

## When to use this

- **Persistent or flaky** issues (focus traps, `Tab` after popovers/selects, dialog stacking, portaled content).
- The **repro is clearer in the browser** than in prose — lock it with **`expect(locator).toBeFocused()`** and **`expect.poll`** when Playwright exists.

## This repo today

There is **no** Playwright config or **`npm run test:e2e`** yet. Until you add one:

1. Reproduce with **`npm run dev`** and DevTools.
2. Track **`data-testid`** needs in **`.agents/skills/data-testid/SKILL.md`**.
3. Add **`playwright.config.ts`** + **`e2e/*.spec.ts`** + scripts, then follow **`.agents/skills/galaxy-testing/SKILL.md`**.

## When Playwright exists

1. Use **`npx playwright test <path-to-spec>`** with your repo’s **`--config`** (typically a **root** `playwright.config.ts`). Avoid running the **entire** suite during small fixes unless blast radius requires it — see **galaxy-testing**.
2. Prefer **stable `data-testid`** selectors (**data-testid** skill).
3. **Mock or stub** network when timing-after-fetch matters; use **`expect.poll`** for async UI.
4. Prefer **small new spec files** for isolated bugs so iteration stays fast.

## Related skills

- **`.agents/skills/admin-related-inline-focus-sync/SKILL.md`** — only if you add complex admin-style dialogs with inline grids (not in this starter).
- **`.agents/skills/galaxy-testing/SKILL.md`** — validation commands for this portfolio.
- **`.agents/skills/playwright/SKILL.md`** — Playwright API reference.
