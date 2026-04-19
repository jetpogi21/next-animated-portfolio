---
name: cursor-claude-command-mirror
description: >-
  Keep Claude Code and Cursor slash-command docs in sync: when adding or editing
  .cursor/commands/*.md, add or update the same-basename file under .claude/commands/.
  Use when authoring project slash commands, /command prompts, or answering where command
  docs should live in this repository.
---

# Cursor ↔ Claude Code command mirror

## When to apply

- You **add** a new file under **`.cursor/commands/`**.
- You **edit** an existing **`.cursor/commands/*.md`** in a way that changes behavior, steps, or links (typos-only can skip if both files stay identical).
- You **rename** or **remove** a Cursor command — do the same under **`.claude/commands/`**.
- The user asks for a **slash command** or **project command** doc and only one tree is mentioned.

## Rules

1. **Same basename** — For **`.cursor/commands/<name>.md`**, maintain **`.claude/commands/<name>.md`** with the **same** **`<name>.md`**.

2. **Equivalent guidance** — The Claude mirror should carry the **same outcomes** as the Cursor file. Style may match existing pairs in this repo:
   - **`.cursor/commands/`** often uses **bold** + backticks for paths (**`CLAUDE.md`**).
   - **`.claude/commands/`** often uses plain backticks (`CLAUDE.md`) and slightly shorter copy.
   - For **very long** commands, the **`.claude`** file may **summarize** and point to **`.cursor/commands/<name>.md`** as canonical — but the Claude doc must still be **actionable** on its own (inputs, order of operations, and critical links).

3. **No Cursor-only commands** — Do **not** add or ship a new **`.cursor/commands/`** file **without** the **`.claude/commands/`** mirror in the **same change** (unless the user explicitly opts out for a one-off experiment — then note it under **Suggested next**).

4. **Verify** — After edits, confirm both paths exist (or both removed) and titles/headings still match the intended **`/<name>`** invocation.

## Related

- Migrating rules into skills + command hygiene: **`.cursor/commands/rule-to-skill.md`** (and **`.claude/commands/rule-to-skill.md`**).
