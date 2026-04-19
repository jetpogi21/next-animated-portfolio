# Cleanup pass

Use **`/cleanup`** after a feature or before handoff: tighten code, align docs, run checks.

## Checklist

1. **Imports and dead code** — Remove unused exports and imports; fix broken module paths in the application source tree (layout varies by repo: **`src/`**, **`app/`**, **`packages/*/src`**, etc.).

2. **User-facing surfaces** — Remove or redirect obsolete entry points (routes, pages, screens, handlers). Update navigation, deep links, and any framework-specific routing or metadata if URLs or flows moved.

3. **Configuration** — If you added environment variables, feature flags, or config keys, update the repo’s example env or config template (**`.env.example`**, **`.env.sample`**, etc.) when the project maintains one.

4. **Contributor and agent docs** — When low cost, sync **README**, **CONTRIBUTING**, **`AGENTS.md`**, **`CLAUDE.md`**, or skills under **`.agents/skills/`** if the repo keeps them and your change affects shared contracts (e.g. test IDs, API shapes, conventions).

5. **Verification** — Run this repository’s documented quality gate: read **`package.json`** scripts and **README** / CI config, then run the appropriate lint, typecheck, test, and build commands for the change. Prefer the same sequence CI uses when it is obvious.

## Git hygiene (optional)

If the user wants branch cleanup after merges, mention **`git branch`** / **`git branch -d`** — do **not** delete branches unless they ask.

## See also

Any repo-local hygiene or testing guidance (**CONTRIBUTING**, **`AGENTS.md`**, **`.cursor/rules`**, or skills under **`.agents/skills/`**).
