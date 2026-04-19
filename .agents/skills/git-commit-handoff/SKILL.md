---
name: git-commit-handoff
description: >-
  End coding handoffs with a short, copy-paste git commit line. Use when a task changed
  tracked source files, when the user asks for a commit message, or before they run git commit.
---

# Git commit handoff

## When to apply

- You **finished** a task that modified files the user will commit (code, tests, skills, rules — not chat-only).
- The user asks: **commit message**, **what to commit**, **conventional commit**, **changelog line**, etc.
- They invoked **`/commit-message`** (see **`.cursor/commands/commit-message.md`**) for the **current** diff only.

## What to output

Add **Suggested commit** as the **last** section of your reply (after the technical summary). When **`.agents/skills/proactive-completion/SKILL.md`** applies, put **Suggested next** **above** this block — do not omit **Suggested next** and only output **Suggested commit**.

```markdown
**Suggested commit:** Add docked Input VAT list footer with period-wide sums
```

Rules:

1. **One line** (or rarely **two** if the user explicitly asked to split commits). Prefer **≤ ~72 characters** so it fits `git commit -m` comfortably.
2. **Imperative mood** — *Add*, *Fix*, *Refactor*, *Document*, not *Added* / *Adds*.
3. **Conventional Commits** prefix when it helps history: **`feat:`**, **`fix:`**, **`docs:`**, **`test:`**, **`chore:`**, **`refactor:`** — pick the **dominant** change. Optional scope: **`fix(admin): …`**, **`feat(vibram-purchase): …`**.
4. **Plain text** — no surrounding backticks on the message line (so copy-paste into terminal or Git UI is one action).
5. **Specific but short** — mention the area (e.g. **Input VAT**, **`EntityDataTable`**, **Playwright spec**) not every file.

## If scope is mixed

- Prefer **one** message that captures the **main** outcome; note refactors/tests in the body of the commit if the user writes a multi-line message later.
- If truly unrelated changes landed in one session, offer **Suggested commits (split):** with 2 lines — only when obvious.

## Slash command

**`/commit-message`** — user runs it when they want a message from **`git status` / `git diff`** without re-explaining the task. Use the shell from the repo root, then apply the same formatting rules above.

## See also

- **`.agents/skills/proactive-completion/SKILL.md`** — same-PR follow-through and handoff structure (**Suggested next** + **Suggested commit**).
- **`.cursor/commands/merge.md`** — integrating finished topic branches into **`main`** (**`/merge`**); do not merge into **`main`** unprompted.
- **User preference** — complete sentences and good grammar in prose; **commit subject** stays short and imperative.
