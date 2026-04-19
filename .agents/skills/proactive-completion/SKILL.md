---
name: proactive-completion
description: >-
  Prefer cheap follow-through in the same task or PR (lint/build, Vitest when present,
  data-testid and future E2E per galaxy-testing skill, consistent error copy, hygiene)
  without silent scope creep. On coding handoffs,
  include Suggested next before Suggested commit per git-commit-handoff. Use when
  wrapping up a change, answering “what else?” or “any cleanup?”, steering quality,
  or noting incidental findings while investigating. Replaces the former Cursor
  alwaysApply rule — read when relevant; not auto-injected.
---

# Proactive completion and steering

The maintainer prefers **not to defer** work that is very likely to be needed soon. Agents should **steer** toward quality and completeness without waiting for explicit prompts every time.

**Note:** This skill is the source of truth for what used to live in **`.cursor/rules/proactive-completion.mdc`** (`alwaysApply: true`). That rule was removed — use this file when triggers match; it is **not** injected into every session automatically.

**Quality bar for features:** run **`npm run lint`** and **`npm run build`** before handoff on substantive UI work. When Playwright exists in this repo, follow **`.agents/skills/galaxy-testing/SKILL.md`** for targeted vs full-suite scope; until then, use clear **manual** verification steps in **Suggested next** if automation is missing.

## Do now (same task / same PR), when low cost

After the user’s requested change works, spend a **short bounded pass** on obvious follow-through that usually becomes mandatory later:

1. **New pure helpers or public exports** — when Vitest exists, add unit tests; until then, rely on **TypeScript** + **`npm run build`** and keep helpers small and typed.
2. **New UI or flows** — run **`npm run lint`** / **`npm run build`**; add **Playwright** coverage in the same delivery **once** the repo has an E2E setup (**`.agents/skills/galaxy-testing/SKILL.md`**). Align **`data-testid`**s if you add automation — **`.agents/skills/data-testid/SKILL.md`**. If E2E does not exist yet, say so under **Suggested next** instead of silently skipping verification.
3. **Error / edge paths** — consistent user-visible messages (e.g. shared `formatUnknownErrorMessage` from `lib/admin/read-api-error.ts` or the same pattern elsewhere); avoid `error.message` on `unknown` without narrowing.
4. **Hygiene** — grep for stale imports and duplicate implementations; remove dead code when safe. When merging similar UI patterns, follow **`.agents/skills/implementation-consistency/SKILL.md`** (one obvious path under **`src/components/`** / **`src/lib/`**). See **`.agents/skills/codebase-change-hygiene/SKILL.md`**.
5. **Suggested next** — on **coding handoffs** (you changed tracked source or delivered a substantive implementation), include a **Suggested next** section **before** **Suggested commit** (see **`.agents/skills/git-commit-handoff/SKILL.md`** for commit formatting). Use a short ordered list (**most important first**), one concrete action per line (test, e2e, perf, a11y, security, config). If there is truly nothing worth flagging, write a single line under the same heading (e.g. **Nothing obvious.**) — do **not** skip this heading and only emit **Suggested commit**; that pattern misses maintainer preference.
6. **Suggested commit** — when the task **changed tracked source** (code, tests, config, skills, rules), end the handoff with **Suggested commit:** plus **one short imperative line** (optional **`feat:`** / **`fix:`** / …), per **`.agents/skills/git-commit-handoff/SKILL.md`**. Skip for chat-only or doc questions with no file edits. The user can run **`/commit-message`** for a message from **`git diff`** only.

Stay **proportional**: do not turn a 20-line fix into a large refactor. If a follow-up is medium/large, **say it clearly** instead of silently expanding scope.

## Proactively suggest (brief, prioritized)

**Suggested next** is the standard place for optional follow-ups: the user can ignore or pick items. This is **not** “engagement” copy — it is a **structured handoff** alongside **Suggested commit**.

Good triggers: new API routes, new client boundaries, dynamic imports, money/auth/data mutations, or anything that duplicates patterns elsewhere in the repo.

## Incidental findings while investigating

While **searching or reading files** for the main task, if you notice a **clear** improvement (bug risk, inconsistency with nearby code, missing test coverage for a fragile path, stale comment, duplicate logic), **tell the user in passing** even when it is **not** part of the requested change. Keep it **short** (a sentence or one bullet); put larger or optional work under **“Suggested next”** instead of expanding the diff. Do not block the primary answer on tangents.

Do **not** use engagement-style closings; optional follow-ups are fine as a direct question.

## Tension with “minimal diff”

The project also values **focused diffs**. Resolve this by: **(a)** implementing only what’s clearly tied to the change, **(b)** batching tiny, same-file or same-module cleanups, **(c)** listing larger ideas under “Suggested next” rather than doing them unprompted.
