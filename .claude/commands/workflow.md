# Workflow (Q&A → Coding guidelines → E2E → Cleanup)

Run **four phases** in strict order. This combines **`/qa`** + **`/coding-guidelines`** + **`/e2e`** + **`/cleanup`**, with **`/task-list`** discipline throughout.

**Optional:** **`/improvement`** for structured follow-ups.

**Do not skip a phase or declare done early.**

---

## Task list (create at start, update until done)

```
[ ] Phase 0 — Q&A: investigation done, ambiguities resolved (per qa.md)
[ ] Phase 1 — Implement: coding-guidelines applied (lean files, boundaries, no drive-bys)
[ ] Phase 2 — Verification: lint + build green; manual or E2E per e2e.md
[ ] Phase 3 — Cleanup: hygiene + out brief (per cleanup.md)
```

Use **`todo_write`** for multi-step work so the UI checklist stays aligned.

---

## Phase 0 — Q&A (`/qa`)

**Full instructions:** **`.cursor/commands/qa.md`**

Investigate **`src/`** first; ask only what code cannot answer; gate implementation until scope is clear.

---

## Phase 1 — Implement (`/coding-guidelines`)

**Full instructions:** **`.cursor/commands/coding-guidelines.md`**

Apply RSC boundaries, lean files, no drive-by refactors.

---

## Phase 2 — Verification (`/e2e`)

**Full instructions:** **`.cursor/commands/e2e.md`**

Follow **`.agents/skills/galaxy-testing/SKILL.md`**; for flaky UI timing (when Playwright exists), **`.agents/skills/browser-regression-e2e/SKILL.md`**; for selectors, **`.agents/skills/data-testid/SKILL.md`**.

Success factors → **`npm run lint`** + **`npm run build`** → manual spot-check on **`npm run dev`** (or headed Playwright when configured).

---

## Phase 3 — Cleanup (`/cleanup`)

**Full instructions:** **`.cursor/commands/cleanup.md`**

Stale imports, env examples if env vars changed, skills only if stable contracts changed.

---

## Completion gate

Every task-list item **`[x]`**. Final summary: Q&A done, key files, verification commands run, cleanup brief. Optionally **`/commit-message`**.
