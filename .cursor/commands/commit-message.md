# Commit message

Suggest a **single-line** subject (≤72 chars) from **`git diff`** / **`git status`**. Imperative mood; optional **`feat:`** / **`fix:`** / **`chore:`** prefix.

Do **not** run **`git commit`** unless the user explicitly asks.

## Steps

1. From repo root: **`git status`**, **`git diff --stat`** (and **`git diff`** if needed).
2. Output **Suggested commit:** one line; optional short body for large scopes.
