# Cleanup pass (portfolio)

Use **`/cleanup`** after a feature or before handoff: tighten imports, align docs, run checks.

## Checklist

1. **Imports and dead code** — remove unused exports; fix broken paths under **`src/`**.
2. **Public routes** — remove dead pages; fix **`Navbar`** links and metadata if routes moved.
3. **Env** — if you added **`NEXT_PUBLIC_*`** or server env vars, update **`.env.example`** when you maintain one.
4. **Agent docs** — if **`data-testid`** or future E2E contracts changed, update **`.agents/skills/data-testid/SKILL.md`** and **`CLAUDE.md`** when low cost.
5. **Tests** — run **`npm run lint`** and **`npm run build`**. When Vitest/Playwright exist, run affected specs (**`.agents/skills/galaxy-testing/SKILL.md`**).

## Git hygiene (optional)

If the user wants branch cleanup after merges, mention **`git branch`** / **`git branch -d`** — do **not** delete branches unless they ask.

## See also

**`.agents/skills/codebase-change-hygiene/SKILL.md`**
