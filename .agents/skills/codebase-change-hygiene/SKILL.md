---
name: codebase-change-hygiene
description: >-
  Splitting large TS/TSX modules, removing dead code, and post-change cleanup for this Next.js portfolio.
  Use after refactors, new features, or when the user asks for maintainability or deprecation passes.
---

# Codebase change hygiene

## When to split files

**Prefer splitting when** several of these are true:

- **~250+ lines** in one file and multiple independent concerns (types + several unrelated components + helpers).
- **Repeated UI patterns** across routes — extract small components or hooks under **`src/components/`** or a colocated **`_components/`** folder.
- **Hard to navigate** imports: public surface mixes unrelated features.

**Prefer keeping one file when** the module is cohesive (one screen or flow), under ~200 lines, or splitting would scatter one workflow.

### Good split targets (when they grow)

| Area | Direction |
|------|-----------|
| Large **`page.tsx`** | Move sections into **`_components/`** next to the route (this repo already uses that pattern under **`resume/`**, **`portfolio/`**, etc.). |
| Shared UI | **`src/components/ui/`** for primitives; feature-specific pieces beside the route or under **`src/components/`**. |
| Utilities | **`src/lib/`** — keep **`utils.ts`** small; add **`src/lib/<topic>.ts`** for non-trivial pure helpers. |

**Do not** split for its own sake: each new file should own one clear responsibility.

## After a behavior or API change — checklist

1. **Stale symbols** — grep for old names, paths, removed env keys across **`src/`**.
2. **Imports** — fix broken imports; remove unused exports.
3. **Routes** — if a route is removed, delete the folder and fix **`Navbar`** / links / metadata.
4. **Verify** — **`npm run lint`** and **`npm run build`** from the repo root.
5. **Tests** — when Vitest/Playwright exist, run the **smallest** set that covers the change; update this skill with real commands.

Also follow **`.agents/skills/proactive-completion/SKILL.md`** for bounded follow-through and handoff structure.

Prefer **removing** dead code in the same change. Use `@deprecated` only for intentional short-term overlap; name the replacement.

## See also

- **`.agents/skills/implementation-consistency/SKILL.md`** — one obvious path and safe boundaries.
- **`.agents/skills/data-testid/SKILL.md`** — if you add or rename stable test ids.
