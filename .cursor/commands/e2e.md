# E2E coverage for a feature or change

This repo is a **single Next.js 14** app. The starter **`package.json`** has **no** Playwright or Vitest scripts yet.

## When the user runs `/e2e`

1. Read **`.agents/skills/galaxy-testing/SKILL.md`** for the validation bar today (**`lint`**, **`build`**, manual checks) and future automation notes.
2. Until Playwright exists: ship **`npm run lint`** + **`npm run build`** green, and list **manual** checks (routes, breakpoints) in the handoff.
3. When adding Playwright: root **`playwright.config.ts`**, specs under **`e2e/*.spec.ts`**, **`npm run test:e2e`**, document env in **`CLAUDE.md`**.
4. For selectors, follow **`.agents/skills/data-testid/SKILL.md`**.
5. **Windows + PowerShell 5.x:** **`.agents/skills/windows-shell-commands/SKILL.md`** (no **`cd … && …`**).

## If Playwright is already configured

- Add or extend **`e2e/<area>.spec.ts`** at the repo root (or the tree your config uses).
- Run **`npx playwright test <path-to-spec>`** with the project **`--config`** — avoid the full suite unless blast radius requires it (**galaxy-testing** skill).
- Inspect **`test-results/`** on failure (**`error-context.md`**, traces) per Playwright defaults.
