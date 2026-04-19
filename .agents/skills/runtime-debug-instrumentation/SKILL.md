---
name: runtime-debug-instrumentation
description: >-
  Temporary [gal-debug] logs and optional scratch logging for local Next.js debugging (client console + dev server terminal).
  Use for runtime branches and handler I/O — not layout-only issues. Works with /debug and /manual-debug commands.
user-invocable: true
---

# Runtime debug trace (instrument → reproduce → collect → fix)

**Shortcuts:** **`/debug`** — **`.cursor/commands/debug.md`**. **`/manual-debug`** — **`.cursor/commands/manual-debug.md`**.

Use this skill when the problem is **what ran, with what values** (client state, branches, server handler input/output), not purely **layout/CSS**. For **visual** issues, use the browser and component inspection first.

## Stable instrumentation contract

- **Prefix:** **`[gal-debug]`** (short, easy to **`grep`** — you may switch to **`[portfolio-debug]`** if you prefer, but stay consistent in one investigation).
- **Shape:** **`console.log('[gal-debug tag]', { step, payload })`** — avoid ambiguous string concatenation.
- **Security:** Do not log secrets, tokens, cookies, or full session objects.

## Where logs appear

| Code runs in | Collection |
|--------------|------------|
| **Browser** | DevTools console while reproducing with **`npm run dev`**, or a future Playwright **`page.on('console', …)`** spec. |
| **Node** (route handlers, server components data path) | Terminal running **`next dev`**, or append one JSON line per hit to a **gitignored** scratch file under **`e2e/.scratch/agent-runtime-debug.log`** only if the agent cannot see the terminal — guard with **`process.env.NODE_ENV === 'development'`**. |

## Single-app paths

- Source: **`src/app/`**, **`src/components/`**, **`src/lib/`**.
- Dev URL: typically **http://localhost:3000** (Next default).

If you later add Playwright at the repo root, disposable specs can live under **`e2e/.scratch/*.spec.ts`** — see **`.agents/skills/windows-shell-commands/SKILL.md`** for Windows shell rules.

## Agent workflow

1. **Hypotheses** — What signal proves each hypothesis?
2. **Instrument** — Smallest set of logs.
3. **Reproduce** — **`npm run dev`** or a scratch spec when Playwright exists.
4. **Collect** — Console / terminal / scratch file.
5. **Report** — hypothesis | expected | observed | verdict.
6. **Fix** — Minimal change.
7. **Remove** — Strip temporary logs before handoff.

## Limits

- **Hydration mismatches** need code inspection and boundary fixes — console alone may be insufficient.
- **Production:** debug instrumentation is for **local dev** only unless explicitly guarded.

## See also

- **`.agents/skills/galaxy-testing/SKILL.md`** — what to run for validation in this repo today.
- **`.agents/skills/browser-regression-e2e/SKILL.md`** — interaction timing and Playwright iteration (when E2E exists).
