# Rule → skill (migrate `.cursor/rules/*.mdc`)

Move guidance from a **Cursor project rule** into a **new or existing** project-local skill (`.agents/skills/<chosen-skill>/SKILL.md`), **rewire every reference** away from the old rule path, then **delete the rule**.

## When the user runs `/rule-to-skill`

### Clarify inputs (if missing)

- **Rule path** — e.g. **`.cursor/rules/foo-bar.mdc`** (must exist).
- **Skill slug** — default: same kebab-case basename as the rule (`foo-bar`), **unless** step 1 picks an existing **`<chosen-skill>`** folder to extend instead.

### Execution order

**Do not delete the rule first.** Decide **create vs extend**, then update the chosen skill (or add a new one), rewire references, and remove the **`.mdc`** file.

---

### 1. Assess existing skills (prefer extend over duplicate)

1. Read the full **`.mdc`** (body + YAML frontmatter) so you know the real scope.
2. **Search for an existing home** before creating **`.agents/skills/<default-slug>/`**:
   - Scan **`.agents/skills/README.md`** and open candidates whose summary or folder name matches the rule’s domain (e.g. testing, admin, codegen, git hygiene).
   - Grep **`.agents/skills/**/*.md`** for overlapping topics, path references, or workflows the rule mentions.
3. **Choose one target skill path** (call it **`<chosen-skill>/SKILL.md`**):
   - **Extend** when an existing skill already covers most of the rule, is the obvious single place for that concern, or merging avoids parallel “rule-sized” duplicates. Add or merge sections, fold in examples, and **widen the YAML `description`** with any new trigger terms (and note in the handoff if **`alwaysApply`** is being dropped).
   - **Create new** only when the rule is a distinct workflow or domain with no good fit, or extending would bloat an unrelated skill. Then use **`.agents/skills/<skill-slug>/SKILL.md`** (default slug = rule basename; avoid colliding folders).
4. If unsure, **prefer one obvious skill** over a second thin skill (aligned with **`.agents/skills/implementation-consistency/SKILL.md`**). The user may override with an explicit “new skill named …” instruction.

---

### 2. Create or extend the skill

1. **If extending:** edit **`.agents/skills/<chosen-skill>/SKILL.md`** — integrate the rule’s substance; dedupe against what is already there; refresh **`description`** if discovery should change.
2. **If creating:** add **`.agents/skills/<skill-slug>/SKILL.md`** with:
   - **YAML frontmatter** (skills format): **`name:`** — lowercase, hyphens, ≤64 chars, matches the folder name; **`description:`** — third person, **what** the skill covers and **when** to use it (include trigger terms: filenames, tools, `user_info`, workflows). Agents use this for discovery; it replaces Cursor’s **`alwaysApply`** injection.
   - **Body** — clear title, **When to apply**, then rules / steps / examples. **Do not** copy Cursor-only rule keys into the skill body as if they were skill metadata (e.g. drop **`globs`** / **`alwaysApply`** from the prose unless you explain migration in one line).
3. If the rule was **`alwaysApply: true`**, note in the skill or handoff: guidance is no longer always injected — the **`description`** must be strong enough that agents read the skill when relevant.

---

### 3. Remove references to the rule

1. **Search** the whole repo for the old rule, including:
   - Full path: **`.cursor/rules/<slug>.mdc`**
   - Basename: **`<slug>.mdc`** (confirm hits are the same rule)
   - Phrases like **“see `.cursor/rules/<slug>`”** or lists in **`CLAUDE.md`**
2. **Update** each hit to **`.agents/skills/<chosen-skill>/SKILL.md`** (the path you actually extended or created — **not** the rule basename when you extended an existing skill).
3. **`.agents/skills/README.md`** — add a **new** table row only if you created a **new** skill folder; if you extended an existing skill, adjust that row’s summary **only** when the rule added a meaningful new scope (keep the table honest).
4. **Check** other **`.cursor/rules/*.mdc`**, **`.cursor/commands/*.md`**, **`.agents/skills/**/*.md`**, and **`.claude/commands/*.md`**. If you change **`.cursor/commands/*`**, follow **`.agents/skills/cursor-claude-command-mirror/SKILL.md`** (same-basename **`.claude/commands/*`** in the same delivery).
5. **Re-grep** until there are **no** remaining references to **`.cursor/rules/<slug>.mdc`** (unless the user asked to keep a deliberate pointer — rare).

---

### 4. Remove the rule

Delete **`.cursor/rules/<slug>.mdc`**.

---

### 5. Verify

- Grep again for **`<slug>.mdc`** and **`.cursor/rules/<slug>`**.
- If the migration only moves agent guidance (no product code), tests are usually unchanged. If the skill documents **new** stable UI or **`data-testid`** contracts, follow **`.agents/skills/proactive-completion/SKILL.md`** and **`.agents/skills/galaxy-testing/SKILL.md`** (lint/build today; Playwright when present).

---

## Out brief

Reply with **Done:** (whether you **extended** an existing skill or **created** a new folder; paths touched) and **Suggested commit:** (one imperative line). Optional **Suggested next:** if anything was deferred.

## See also

**`.agents/skills/README.md`** — index and conventions. Match YAML **`name`** / **`description`** style on an existing skill (e.g. **`.agents/skills/git-commit-handoff/SKILL.md`**). Example of a rule-free workflow skill: **`.agents/skills/windows-shell-commands/SKILL.md`**. **`.agents/skills/cursor-claude-command-mirror/SKILL.md`** — when adding or editing **`.cursor/commands/*`**, mirror under **`.claude/commands/`**.
