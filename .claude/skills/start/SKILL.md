---
name: start
description: Use when beginning any development request — especially ambiguous ones like "make X better", "improve Y", "add Z" where the exact requirements are unclear.
---

# /start

Structured workflow for beginning any development request. Enforces investigation and Q&A before a single line of code is written.

## The Iron Rule

**No implementation until all ambiguity is resolved.** Not even "small" changes. Not even "obvious" improvements. If the request could be interpreted two or more ways, it IS ambiguous — ask.

## Workflow

```
1. INVESTIGATE → 2. Q&A LOOP → 3. SPEC → 4. IMPLEMENT → 5. TEST → 6. REPORT
```

### Step 1: Investigate

Before forming any opinion or asking any question, read the relevant code:
- Read the files, components, or pages mentioned in the request
- Check recent git history for context (`git log --oneline -10`)
- Understand what currently exists before assuming what's missing

### Step 2: Q&A Loop

After investigating, identify every ambiguity. Ask about each one — there is no question too small if it could cause confusion or lead you in the wrong direction.

**Ask one question at a time.** Wait for the answer. Then ask the next.

**After each answer, re-investigate if needed** — the answer may reveal new ambiguities. Keep asking until you are fully satisfied that you understand:
- What exactly needs to change
- What "done" looks like
- What must NOT change
- Any constraints (performance, accessibility, design system, mobile)

**Do not proceed to Step 3 until the Q&A loop is complete.**

#### What must be asked about

| Request type | Ask about |
|---|---|
| "Make X better / improve X" | Better *how*? What specific problem are you solving? |
| "Add X" | Where exactly? What behavior? Any edge cases? |
| "Fix X" | What's the current behavior? What's the expected behavior? |
| "Redesign / restyle X" | What's wrong with current? Any reference designs? Stay within design system? |
| Any request touching multiple areas | Which areas are in scope? Which are off-limits? |

#### Red flags — you are NOT done with Q&A if:

- You're making assumptions about what "better" or "improved" means
- You don't know which specific files/components will change
- You could imagine two different valid implementations
- You haven't confirmed what must stay the same

### Step 3: Write Spec

Once all ambiguity is resolved, write a brief spec **without asking permission**. Include:
- What will change and why
- What will NOT change
- **Success criteria** — specific, testable conditions that define "done"

Save to the conversation (no file needed for small tasks). For larger features, save to `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`.

### Step 4: Implement

Use existing skills and workflows. For complex features, invoke `superpowers:brainstorming` or `superpowers:subagent-driven-development` as appropriate.

### Step 5: Test to Verify

Test against the success criteria from the spec. Use whichever method fits:
- Visual review via `/visual-review`
- Build: `npm run build`
- Type check: `npx tsc --noEmit`
- End-to-end in browser via Playwright

**Keep working until tests pass.** Do not hand off incomplete work.

### Step 6: End-of-Session Report

When done (or if blocked and needing user action), report:

1. **Manual verification** — specific steps the user can take to verify the work themselves
2. **Test results** — what was tested and what passed/failed
3. **Suggested nexts** — one concrete improvement spotted while working (file + component + what)

Only hand off early if genuinely blocked on something requiring user action (credentials, design decision, external dependency). State what specifically is blocking and what the user needs to do.

## Common Rationalizations — STOP

| Thought | Reality |
|---|---|
| "The request is clear enough" | Measure against the red flags list above. If any apply, ask. |
| "I'll just make a small improvement" | Unsolicited changes are wasted work. Confirm scope first. |
| "I know what 'better' means here" | You know what YOU think better means. The user may mean something entirely different. |
| "I'll ask after I explore" | Explore THEN ask — before implementing. |
| "It's obvious what to do" | What's obvious to you may be wrong. One question saves hours of rework. |
