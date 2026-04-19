---
name: galaxy-testing
description: >-
  Validation for this Next.js portfolio: npm run lint and npm run build from repo root; manual browser checks via npm run dev.
  Placeholder for future Vitest/Playwright — add scripts and e2e/ when needed. Historical folder name only.
user-invocable: false
---

# Testing and verification (portfolio)

The folder name **`galaxy-testing`** is legacy. This starter **does not** define **`npm run test`**, **`vitest`**, or **`playwright`** in **`package.json`**.

## What to run today

| Step | Command | When |
|------|---------|------|
| Lint | **`npm run lint`** | After most edits touching TS/TSX. |
| Build | **`npm run build`** | Before handoff on substantive changes (catches type and Next build issues). |
| Dev | **`npm run dev`** | Local manual QA at **http://localhost:3000** (or the URL Next prints). |

## Agents: scope

- Prefer **fast feedback** (**`lint`** → **`build`**) over asking the user to click through unless the change is purely visual.
- If you add **Vitest** or **Playwright**, add **`npm run test`** / **`npm run test:e2e`** (or similar) to **`package.json`**, document required env in **`CLAUDE.md`**, and update this file with real commands.

## Future E2E (when Playwright exists)

- Keep specs under **`e2e/*.spec.ts`** (or another single tree at the repo root) with one **`playwright.config.ts`**.
- Use stable **`data-testid`** — **`.agents/skills/data-testid/SKILL.md`**.
- On Windows, follow **`.agents/skills/windows-shell-commands/SKILL.md`** (no **`cd … && …`**).

## Visual / pixel checks

Until Playwright is configured, use **manual** browser verification with **`npm run dev`**, or describe what to screenshot for the user if the environment cannot run a browser.
