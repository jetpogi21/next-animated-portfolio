# Task list (`/task-list`)

Use **`/task-list`** when you want the agent to **systematically track everything you asked for** across a long or multi-part session. The agent must not “lose” requests in the noise of implementation.

---

## When this command applies

- Invoked explicitly by the user (`/task-list`), **or**
- The user’s message contains **multiple distinct asks** (even small ones), **or**
- Work is expected to span **many tool rounds** or touch **several files / areas**.

If only one trivial change is requested, still **name the single task** once so completion is unambiguous.

---

## Non-negotiable rules

1. **Inventory first** — Before substantive work, turn the user’s message (and any follow-ups in the thread) into a **numbered list of concrete tasks**. Each item must be **specific enough to verify** (what file, route, behavior, or artifact — not vague “fix it”).
2. **Nothing dropped** — If the user adds mid-session requests, **append** them to the list. Do not replace or silently discard earlier items. If something is **deferred or out of scope**, say so explicitly and leave it marked deferred — do not pretend it was done.
3. **One source of truth** — For **multi-step** work, maintain a structured task list with the **`todo_write`** tool (`merge: true` when updating). Task text should mirror the user-facing inventory so the UI checklist and mental model stay aligned.
4. **Review before act** — At the start of each assistant turn that continues the same thread of work, **read open tasks** and pick work from **incomplete** items unless the user just changed direction (then reconcile the list in the same turn).
5. **Update after progress** — When a task is **fully** done (including tests or checks the user asked for), mark it **completed** immediately. Do **not** leave items **`in_progress`** if they are actually finished.
6. **Close honestly** — Do not say “done” or hand off while **any** user-requested item is still open, unless the user explicitly accepted deferral or cancellation for that item.

---

## Format (user-visible)

In the **first** reply after `/task-list` (or after detecting multi-part work), include a checklist like:

```
Tasks (source: user request + thread)
[ ] 1. …
[ ] 2. …
```

As items complete, either update via **`todo_write`** (preferred for multi-step) **or** show the same list with `[x]` in a short recap when useful. Prefer **not** spamming the full list every message — but **always** surface it again when:

- Starting after a long pause,
- The user asks for status,
- You are about to declare completion or hand off.

---

## Edge cases

- **Ambiguity** — If a task cannot be executed as written, add a sub-bullet “blocked: needs clarification on …” and ask **one** focused question; do not delete the parent task.
- **User cancels** — Remove or mark cancelled with a one-line reason.
- **Duplicate asks** — Deduplicate in the list but mention that two phrasings map to one task.

---

## Relation to other commands

- **`/workflow`** already mandates a phase checklist (Q&A → coding guidelines → E2E → cleanup) — **combine** with this command by treating each phase as tasks **plus** any extra user asks as separate lines.
- **`/handoff`** — If stopping mid-work, the handoff must include **remaining tasks** in order.

---

## Goal

**Zero forgotten asks:** every user instruction maps to a tracked line item until done, deferred with consent, or cancelled explicitly.
