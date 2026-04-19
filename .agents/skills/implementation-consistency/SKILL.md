---
name: implementation-consistency
description: >-
  Prefer one shared implementation in this Next.js portfolio: reuse src/lib and src/components,
  keep server-only secrets on the server, and avoid duplicate client/server logic. Use when
  consolidating code, reviewing drift, or when the user asks about DRY, boundaries, Server Actions,
  route handlers, or duplicate logic.
---

# Implementation consistency (one obvious path)

## Goal

**Same product behavior should use the same code path** (or the same declarative config that drives one engine). Avoid “another way” that drifts, doubles bug fixes, and breaks E2E or types in one place only.

This skill also carries **reuse, DRY, and security boundaries** (formerly the always-applied Cursor rule **`.cursor/rules/dry-reuse-security.mdc`** — that guidance is **no longer auto-injected**; read this file when the task touches consolidation, shared modules, or public boundaries).

This complements **`.agents/skills/codegen-pattern/SKILL.md`** (if you add deterministic codegen) and **`.agents/skills/codebase-change-hygiene/SKILL.md`**. It is about **recognizing duplication early**, **routing work to the right layer**, and **not trading correctness for shorter code**.

## Reuse, DRY, and security (trust boundaries)

**Prefer** extending existing helpers, shared modules, and established patterns over copy-paste or parallel implementations.

**Prioritize small shared modules** over copy-paste: extract repeated JSX into **`src/components/`**, repeated logic into **`src/lib/`**, and keep route files (**`src/app/**/page.tsx`**) thin orchestrators. If you later introduce config-driven patterns (CMS, feature flags), centralize keys/types in one module instead of scattering magic strings.

**Do not** sacrifice security or correctness for brevity:

- **Mutations and privileged reads** (Server Actions, route handlers, webhooks, contact forms): keep **authentication and authorization** at every **public boundary**. Shared inner functions may assume invariants only when callers are documented and enforced (e.g. server-only modules, already-checked session).
- **Validation and parsing**: do not bypass or weaken Zod/schema checks, input sanitization, or SQL parameterization when consolidating; factor shared **validators** and **query builders**, not “skip validation because we already did it somewhere.”
- **Secrets and server-only data**: env vars, service keys, and raw DB access stay on the server; shared code must not force sensitive values into client bundles or serialized props.
- **When in doubt**, duplicate a few lines of explicit checks at the boundary rather than one “magic” shared entry that hides who is allowed to call it.

Treat this as complementary to **`.agents/skills/react-best-practices/rules/server-auth-actions.md`** (Server Actions like public API endpoints) and normal API handler auth patterns.

## Where logic should live

| Layer | Put here |
|-------|-----------|
| **`src/components/ui/`** | Reusable primitives (Button, Input, …) — presentation only. |
| **`src/components/`** | Shared chrome (**`Navbar`**, **`ThemeProvider`**, section layouts) used on multiple routes. |
| **`src/lib/`** | Pure helpers, formatting, small shared types — no JSX unless you intentionally colocate. |
| **`src/app/**`** | Route entrypoints (**`page.tsx`**, **`layout.tsx`**) — keep thin; push heavy UI into colocated **`_components/`** or **`src/components/`**. |

If you are about to **copy a large block** between routes, **stop** and extract a shared component or helper first (**`.agents/skills/codegen-pattern/SKILL.md`** only if you add deterministic codegen).

## Before writing “similar” code

1. **Search** — `grep` / codebase search for the same API shape, UI pattern, or error message.
2. **Prefer extend** — add a prop to an existing component, or a named export in **`src/lib/`**, instead of duplicating.
3. **Reject near-duplicates** — two functions that differ only in copy or constants should usually be **one function** with parameters.
4. **Tests** — when Vitest exists, add coverage on shared helpers; until then, rely on **`npm run build`** and lint.

## Red flags (likely drift)

- Two different contact-form handlers or validation schemas for the same UX.
- Copy-pasted animation or carousel markup across pages instead of one component.
- Parallel **`data-testid`** schemes for the same widget (align with **`.agents/skills/data-testid/SKILL.md`**).
- New env vars that duplicate an existing concept — **grep** `process.env` and Next **`NEXT_PUBLIC_*`** usage.

## After you consolidate

Follow **`.agents/skills/codebase-change-hygiene/SKILL.md`**: remove dead imports and old symbols; update skills if stable **`data-testid`** contracts changed.

## See also

- **`.agents/skills/README.md`** — index of project-local skills.
- **`.agents/skills/codebase-change-hygiene/SKILL.md`**
- **`.agents/skills/galaxy-monorepo/SKILL.md`** — folder layout for this repo.
- **`.agents/skills/codegen-pattern/SKILL.md`**
