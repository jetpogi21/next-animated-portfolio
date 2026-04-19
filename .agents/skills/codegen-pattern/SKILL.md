---
name: codegen-pattern
description: >-
  This portfolio repo has no admin/codegen pipeline in package.json. Use when considering deterministic codegen
  (scripts that regenerate files from a manifest); otherwise skip. For ideas, see tools/ + lint-staged patterns in larger Next repos.
user-invocable: true
---

# Codegen pattern (not enabled in this repo)

The **lama-dev-portfolio-starter** does **not** ship **`npm run codegen`**, **`tools/codegen/`**, or admin entity registry generation.

## When this skill matters

- You are **adding** a small deterministic generator (e.g. build-time list from a JSON manifest) and want to avoid hand-duplicating files.
- Prefer **simple Node scripts** under **`scripts/`** (or **`tools/`**) plus an **`npm run codegen`** script if you introduce that pattern.

## Principles (if you add codegen)

- Generators should be **deterministic** (no LLM file-watchers for production output).
- Run the generator in CI or via **`npm run codegen:check`** so drift fails the build.
- Document new scripts in **`CLAUDE.md`**.

Until then, **maintain config and types by hand** like a normal app.
