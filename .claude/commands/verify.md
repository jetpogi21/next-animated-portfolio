# Feature verification loop

Validate a change in this **Next.js portfolio** without assuming Playwright exists.

## Steps

1. **Orient** — read **`CLAUDE.md`**; find routes under **`src/app/`** and components under **`src/components/`**.
2. **Reproduce** — **`npm run dev`** (default **http://localhost:3000**); exercise the flow manually or describe checks for the user when no browser is available.
3. **Automate when possible** — **`npm run lint`** and **`npm run build`** from the repo root.
4. **Future E2E** — when Playwright is added, put specs in **`e2e/`** and run **`npx playwright test`** on the smallest set that covers the feature (**`.agents/skills/galaxy-testing/SKILL.md`**).

## Handoff

List commands run, URLs checked, and any remaining risks.
