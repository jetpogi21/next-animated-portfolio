# Coding guidelines

Reference these guidelines before making any change. They apply to this **single Next.js 14** app (**`src/app/`**, **`src/components/`**, **`src/lib/`**).

**Related skills:** **`.agents/skills/implementation-consistency/SKILL.md`** · **`.agents/skills/codebase-change-hygiene/SKILL.md`** · **`.agents/skills/react-best-practices/SKILL.md`** · **`.agents/skills/next-best-practices/SKILL.md`**

---

## File size rule — lean files as you work

**Before touching a file**, check its size:

- If the target file is **over ~300 lines**, run **`/refactor-file`** on it first, then make the change.
- If a full refactor is **risky** (hot path, RSC boundary), do a **surgical extract** instead: move only the **function, hook, or component** where your change will land into its own file, wire the import, then proceed.

> Goal: files drift toward ~100–200 lines over time through normal work, not dedicated cleanup sprints.

---

## Code quality

1. **Single responsibility** — one clear reason to open a file.
2. **Small functions** — ~20–50 LOC; early returns over deep nesting.
3. **Pure helpers** — functions with no hidden I/O belong in **`src/lib/`** (or colocated `*_helpers.ts`).
4. **DRY** — deduplicate after the second copy.
5. **Descriptive names** — domain language over `utils2`.
6. **Light comments** — only for non-obvious invariants or business rules.

## React / Next.js

7. **RSC / server-only boundaries** — never import server-only modules into client components. See **`.agents/skills/next-best-practices/SKILL.md`**.
8. **No unnecessary `use client`** — push the client boundary down as far as possible.
9. **Stable keys** — avoid unstable list keys; memoize only when there is a measured reason.
10. **Forms** — this starter uses client components and validation patterns in **`contact/`** and elsewhere; if you add **TanStack Form + Zod**, follow **`.agents/skills/tanstack-form/SKILL.md`**.
11. **Minimize server round trips** — prefer one server load per screen where practical; avoid N+1 fetches from many children.

## Repo boundaries

12. **Shared UI** — components reused across routes live under **`src/components/`**; route-specific sections can live in **`src/app/<route>/_components/`**.
13. **Server Actions / route handlers** — validate external input at the boundary (e.g. Zod); do not leak secrets to the client.
14. **Codegen** — this repo has **no** **`npm run codegen`** today. If you introduce generators, document them in **`CLAUDE.md`** and **`.agents/skills/codegen-pattern/SKILL.md`**.

## Safety

15. **No XSS, injection** — treat user and external API input as untrusted at boundaries.
16. **No over-engineering** — implement what the task requires.
17. **No drive-by changes** — stay within the requested scope.
