# Q&A — Surface ambiguities before implementation

Resolve every ambiguity so the work that follows is scoped correctly. **Do not write feature code, migrations, or tests until the Q&A phase completes** — but **do investigate the repo first** so questions are grounded, not generic.

---

## Phase 1 — Investigate first (required)

Before asking the user anything, do a **short, targeted investigation**:

1. **Orient** — If scope is unclear, read **`CLAUDE.md`** (scripts, **`src/`** layout).
2. **Locate** — Use **grep**, **semantic search**, or the user’s screenshot/route/strings to find owning files under **`src/app/`**, **`src/components/`**, **`src/lib/`**.
3. **Read** — Open the **few files that actually implement** the feature (often 2–6 files): UI, data layer, and any existing tests touching the same flow.
4. **Note facts** — Summarize what you found: routes, types, save paths, tables/columns already involved, and what is **not** yet clear from the code.

**Allowed in this phase:** read/search tools, listing directories, reading MCP tool schemas for later use. **Not allowed yet:** implementing the requested change (application code, schema migrations, new tests).

If the request is too vague to search (no app, no feature name, no file path), ask **one** minimal clarifying question so you can search — then continue Phase 1.

---

## Phase 2 — Ask only what the code did not answer

### Rule: ask about anything that still produces even a hint of confusion

No question is too trivial. If there is any uncertainty after investigation — do not assume, infer, or guess. Assumptions become bugs later.

Skip boilerplate questions that Phase 1 already answered (e.g. which app, which route, whether data is persisted in `schema X`). Ask **targeted** questions about product semantics, edge cases, test strategy, or constraints the codebase cannot encode.

### Question bank (use when still ambiguous)

**Product / scope**

- Exact behavior or copy when the code allows multiple interpretations.
- New feature vs bugfix vs refactor when not obvious from the request.

**Auth / environments**

- Signed-in vs public, or role expectations, when not evident from the code path.
- Whether tests should hit the real DB, mocks, or E2E stubs — when adding or changing tests.

**Data**

- When a **new** column or table might be needed: confirm naming, nullable vs required, and whether to sync with live Supabase (see project schema skills) before editing migrations.

**Edge cases**

- Empty, loading, error, and permission-denied states when the user cares about them.

**UI**

- Breakpoints or design constraints when layout work is requested.

**Process**

- Files or areas explicitly out of scope; deadlines; flaky-test handling.

---

## Format

1. **Brief summary of investigation** (what files, what they do, what’s still unknown).
2. **Numbered questions** — single list. Omit questions already settled by Phase 1.

Wait for the user’s answers before **implementing**. If an answer raises a new ambiguity, ask a follow-up immediately.

Once nothing material is left open, confirm:

> All ambiguities resolved. Ready to proceed.
