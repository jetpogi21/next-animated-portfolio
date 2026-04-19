# Portfolio — project-local agent skills

Skills live in **`.agents/skills/<skill-name>/SKILL.md`**. They ship with this repo. Each file’s YAML **`description`** is the primary trigger hint for when to read it.

**Discovery:** **`CLAUDE.md`** summarizes this app; this index lists folders with a one-line summary.

**Note:** Several folders keep **historical names** from another codebase (**`galaxy-*`**). Their **`SKILL.md`** bodies are rewritten for **this** repository.

## Always relevant here

| Skill | Summary |
|--------|---------|
| **windows-shell-commands** | **win32** + PowerShell 5.x: no **`cd … && …`**; use tool **`working_directory`** or **`;`**. |
| **galaxy-monorepo** | **Single-app layout** for this portfolio (see file — not a monorepo). |
| **galaxy-testing** | **Lint/build-first** validation; placeholder for future Vitest/Playwright. |
| **next-best-practices** | Next.js App Router, hydration pitfalls (e.g. Radix/shadcn **Select**). |
| **react-best-practices** | React performance patterns. |
| **tailwind** | Tailwind setup, themes, component styling. |
| **shadcn** | shadcn/ui-style components and **`components.json`** patterns. |
| **motion** | **framer-motion** / motion on public surfaces, reduced motion. |
| **data-testid** | Stable **`data-testid`** conventions for future tests. |
| **codebase-change-hygiene** | Splitting large files, post-change cleanup, deprecation checks. |
| **implementation-consistency** | One obvious path, DRY, safe client/server boundaries. |
| **proactive-completion** | Bounded follow-through, **Suggested next** / **Suggested commit**. |
| **git-commit-handoff** | Short imperative **Suggested commit** line. |
| **cursor-claude-command-mirror** | Keep **`.cursor/commands/`** and **`.claude/commands/`** aligned. |

## Reference-only (other stacks; read only if you add similar tech)

These skills describe patterns **not** currently in this starter (admin engines, Drizzle, codegen, Panda/Vibram workflows). Use them when you **introduce** matching structure — otherwise skip.

| Skill | Summary |
|--------|---------|
| **codegen-pattern** | Deterministic codegen pipelines — **not** wired in this repo yet. |
| **drizzle**, **supabase-schema-sync**, **project-specific/supabase-schema-introspection** | Database schema workflows. |
| **tanstack-form**, **tanstack-query**, **tanstack-table**, **tanstack-virtual**, **tanstack-ai** | Client data and forms (use when you add these libraries). |
| **playwright**, **vitest**, **browser-regression-e2e** | Browser/unit testing references. |
| **admin-***, **panda-kanban**, **runtime-debug-instrumentation**, **domain-business-logic-doc**, **access-odbc-query-json** | Legacy domain/admin documentation. |

## Personal / global: find-skills

The **`find-skills`** skill under **`~/.agents/skills/find-skills/`** covers the **`npx skills`** ecosystem. It may point back to project-local skills when this workspace is open.
