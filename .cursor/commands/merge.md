# Merge (integrate topic branches)

Consolidate **finished** work from **one or more branches** into a **target branch** (default **`main`**), resolving conflicts by **integrating behavior** so nothing silently breaks.

## When the user runs `/merge`

1. Read **`.agents/skills/windows-shell-commands/SKILL.md`** for Windows shell rules.

2. **Clarify** if missing: **target branch** (default **`main`**), **source branch(es)**, merge vs rebase preference.

3. **Manual flow** (this repo has no **`npm run worktree:merge-to-main`** helper):
   - **`git status`** — clean or stash WIP the user accepts.
   - **`git fetch`** and **`git checkout <target>`** — fast-forward when safe.
   - **`git merge <topic>`** (or merge multiple topics in dependency order).
   - Resolve conflicts without bulk-accepting one side — merge semantics, then **`npm run lint`** and **`npm run build`**.

4. **Report** — branches merged, notable edits, commands run, remaining risks.

5. **Branch cleanup** — suggest **`git branch -d`** only if the user asked; never force-push **`main`** without explicit consent.

## See also

**`/cleanup`**, **`/commit-message`**
