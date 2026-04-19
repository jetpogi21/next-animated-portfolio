# Refactor a large file (agent-friendly modules)

Use **`/refactor-file`** when a **single TS/TSX module** is hard to work in: **too long**, mixed concerns, or expensive in context. Goal: **~100–200 lines per file** where it helps, **without** scattering one workflow.

**Related:** **`.agents/skills/codebase-change-hygiene/SKILL.md`** · **`.agents/skills/implementation-consistency/SKILL.md`**

## Modes

### Full refactor
Default when a file is over ~300 lines and risk is low (no fragile RSC boundary, not a generated file).

### Surgical / incremental refactor
When a **full refactor is too risky**:

1. Identify the **single function, hook, or component** where the change will land.
2. Move **only that unit** into a colocated file under **`src/`** (e.g. **`_components/foo-section.tsx`**, **`my-hook.ts`**).
3. Re-import so the public surface stays stable.

**Triggered by:** **`/coding-guidelines`** when the file exceeds ~300 lines and a full split is risky.

---

## From the maintainer

- **Path(s)** to refactor (or “largest file in `<area>`”).
- **Non-goals** (e.g. “do not change public API”).
- **Risk notes** (RSC boundaries, shared imports).

## Principles (apply in order)

1. **Single responsibility per file** — one clear reason to open it.
2. **Target size** — aim for **~100–200 lines** when it improves scanability; do not fragment into tiny one-liner files.
3. **Obvious seams** — split on **stable boundaries**: pure functions, types/constants, subcomponents, hooks.
4. **Shallow dependency chain** — prefer **`feature/x.tsx` → `feature/x-helpers.ts`** over deep chains.
5. **Coupling stays visible** — named imports over vague “utils”.
6. **Naming** — domain language in file and export names.
7. **DRY** — one implementation; dedupe after the second copy.

## Structure (where to put new files)

- **Colocate** — **`src/app/<route>/_components/`** for route-specific UI; **`src/components/`** for reuse across routes; **`src/lib/`** for pure helpers.
- **This repo** — single app at the root; see **`.agents/skills/galaxy-monorepo/SKILL.md`** for layout.
- **Stable entry** — keep **`page.tsx`** thin; import from colocated modules.

## Your job (agent)

### 1. Map before moving

- List concerns (types, data, UI blocks, effects).

### 2. Plan the split (short)

- Numbered plan: new paths, what moves where.
- Reject plans that create circular imports or needless fragmentation.

### 3. Execute

- Extract → wire imports → remove dead code.
- Preserve behavior; respect **Next.js RSC** boundaries (**next-best-practices** skill).

### 4. Verify

- **`npm run lint`** and **`npm run build`** from the repo root.
- When Vitest/Playwright exist, run targeted tests — **`.agents/skills/galaxy-testing/SKILL.md`**.

### 5. Handoff

Reply with: **plan summary**, **new/changed paths**, **commands run**, **Suggested next** if something is deferred.
