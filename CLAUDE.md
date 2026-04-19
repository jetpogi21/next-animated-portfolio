# Claude Code — Portfolio (Next.js)

**Agent entry point.** Project-local skills live in **`.agents/skills/<name>/SKILL.md`**; the index is **`.agents/skills/README.md`**. Read a skill when its description matches the task.

---

## What this repo is

- **Single Next.js 14** app (**`package.json`** name: `lama-dev-portfolio-starter`), **App Router** under **`src/app/`**.
- **UI:** **`src/components/`** (shared pieces), **`src/components/ui/`** (shadcn-style primitives), **Tailwind** in **`src/app/globals.css`**.
- **No** npm workspaces, **no** `apps/*` monorepo, **no** bundled Drizzle/Supabase/Playwright/Vitest scripts in the starter **`package.json`**.

---

## Automation policy

**Default:** the agent does the work (search, read, run **`npm run lint`** / **`npm run build`** / **`npm run dev`**) instead of handing checklists to the user.

- **Discovery:** use codebase search and reads before asking product questions the code can answer.
- **Validation:** after substantive edits, run **`npm run lint`** and **`npm run build`** from the repo root. If you add Vitest/Playwright later, document and run those scripts the same way.
- **When asking the user is OK:** irreversible decisions, secrets you must not store, or confirmation after you show failing output you cannot fix without their input.

---

## Common commands (repo root)

| Script | Purpose |
|--------|---------|
| **`npm run dev`** | Next dev server (default **http://localhost:3000**) |
| **`npm run build`** | Production build |
| **`npm run start`** | Start production server (after **`build`**) |
| **`npm run lint`** | ESLint (**`next lint`**) |

---

## Where things live

| Area | Path |
|------|------|
| Routes / pages | **`src/app/**`** |
| Shared React components | **`src/components/**`** |
| Utilities | **`src/lib/utils.ts`** |
| App config | **`next.config.mjs`**, **`tailwind.config.ts`**, **`tsconfig.json`** |

---

## Skills and commands (high level)

- **Repo layout (single app):** **`.agents/skills/galaxy-monorepo/SKILL.md`** — folder name is historical; content describes **this** project layout.
- **Testing / QA until E2E exists:** **`.agents/skills/galaxy-testing/SKILL.md`** — same note; use **lint + build** today.
- **Windows shells:** **`.agents/skills/windows-shell-commands/SKILL.md`**
- **Slash commands:** **`.cursor/commands/`** — keep **`.claude/commands/`** in sync when you edit commands (**`.agents/skills/cursor-claude-command-mirror/SKILL.md`**).

---

## Repo metadata

- **Default branch:** **`main`** (do not force-push shared defaults unless the user asks).
- **Cursor ↔ Claude:** mirror new or materially changed **`.cursor/commands/*.md`** to **`.claude/commands/*.md`** in the same change when possible.
