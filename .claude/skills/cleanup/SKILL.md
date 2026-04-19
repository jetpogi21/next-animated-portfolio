---
name: cleanup
description: End-of-session cleanup for the portfolio project. Commits anything worth saving to memory, and creates or updates project skills based on what was learned. Use when the user types /cleanup or asks to "commit to memory" or "wrap up the session".
---

# /cleanup

End-of-session memory and skill consolidation.

## What to do

### 1. Review the session

Think through what happened this session:
- What decisions were made?
- What preferences or feedback did the user express?
- What bugs or gotchas were discovered?
- What patterns or conventions were used?
- What was built or changed?

### 2. Update memory

Read `MEMORY.md` and all existing memory files first to avoid duplicates.

For each thing worth saving, decide:
- **user** — preferences, working style, expertise
- **feedback** — corrections, approvals of non-obvious approaches
- **project** — what was built, current state, decisions made
- **reference** — where to find things externally

Save to `C:\Users\ACER\.claude\projects\c--Users-ACER-Desktop-web-development-portfolio\memory\`.
Update `MEMORY.md` index with any new files.

**Save if:** non-obvious, would prevent repeated mistakes, or would help future sessions start faster.
**Skip if:** derivable from the code, already in git history, or too ephemeral.

### 3. Create or update project skills

Skills live in `.claude/skills/<skill-name>/SKILL.md`.

Consider creating/updating a skill if the session revealed:
- A repeatable workflow specific to this project (e.g. how to add a new page, how to test visually)
- A pattern that isn't obvious from the code alone
- A gotcha that would trip up future work

Existing skills: `new-component`, `cleanup`.

Skill format:
```md
---
name: skill-name
description: One line — what it does and when to use it.
---

# /skill-name

...content...
```

### 4. Git hygiene

Run these in parallel:
```bash
git status
git diff
```

Then:
- **Uncommitted changes**: stage and commit any meaningful changes that haven't been committed yet. Group logically — one commit per concern.
- **Untracked files**: for each untracked file, decide:
  - Should it be committed? → add and commit it
  - Should it be ignored? → add to `.gitignore` and commit that
  - Is it a temp/screenshot/artifact? → add to `.gitignore`
  - Unsure? → ask the user before acting
- **Push**: after all commits are clean, run `git push` to push the branch to remote.

### 5. Report back

Tell the user:
- What was saved to memory (briefly)
- What skills were created or updated (if any)
- What git actions were taken (commits, push)
- Anything worth noting before the next session
