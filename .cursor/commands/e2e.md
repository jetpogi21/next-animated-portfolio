# E2E coverage for a feature or change

Work from the **correct workspace**: the repo root, or the package whose **`package.json`** owns the app you are testing (in a monorepo, that may be a subfolder).

## Discover tooling

1. Read that **`package.json`** — **`scripts`** and devDependencies — for **Playwright**, **Vitest**, Cypress, or other test runners already in use.
2. If the repo documents verification (**`AGENTS.md`**, **`README`**, **`CONTRIBUTING.md`**, **`.agents/skills/**/SKILL.md`**, etc.), follow it instead of guessing commands.

## When the user runs `/e2e`

1. **Baseline quality** — Run scripted checks that apply to the change (**`lint`**, **`typecheck`**, **`build`**, **`test`**, etc.) when those scripts exist; do not assume a specific stack or invent scripts.
2. **Until browser E2E exists** — Keep those checks green and list **manual** verification (routes, viewports, critical flows) in the handoff.
3. **Adding Playwright** — Add **`playwright.config.ts`** where your layout expects it, specs (often **`e2e/**/*.spec.ts`** or paths in config), an **`npm`** script such as **`test:e2e`**, and document required env vars next to the code (**`README`**, **`.env.example`**, or your project’s agent docs).
4. **Selectors** — Prefer stable **`data-testid`** (or whatever selector policy the project documents).
5. **Windows + PowerShell** — Avoid **`cd … && …`**; use the shell/tool **`working_directory`** or **`;`** chaining unless the project documents otherwise.

## If Playwright (or similar) is already configured

- Add or extend specs under the directory your config uses (often **`e2e/`** beside that **`package.json`**).
- Run **`npx playwright test <path-to-spec>`** (with **`--config`** when the config is not at the default path) — avoid the full suite unless the blast radius requires it.
- Inspect **`test-results/`** on failure (**`error-context.md`**, traces) per Playwright defaults.
