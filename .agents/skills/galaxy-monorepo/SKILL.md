---
name: galaxy-monorepo
description: >-
  Single Next.js 14 portfolio app: src/app routes, src/components UI, root package.json scripts.
  Historical folder name only — not a monorepo. Use when orienting in this repo or explaining where code lives.
user-invocable: false
---

# Repository layout (portfolio)

The folder name **`galaxy-monorepo`** is legacy. This project is **one** Next.js application at the repository root.

## Layout

| Path | Role |
|------|------|
| **`src/app/`** | App Router: **`page.tsx`**, **`layout.tsx`**, route segments (**`about/`**, **`contact/`**, **`portfolio/`**, **`resume/`**, …). |
| **`src/components/`** | Shared React components (e.g. **`Navbar`**, **`ThemeProvider`**, **`ui/*`** primitives). |
| **`src/lib/`** | Small shared helpers (**`utils.ts`** with **`cn`**, etc.). |
| **`public/`** | Static assets served as-is. |
| **Root** | **`package.json`**, **`next.config.mjs`**, **`tailwind.config.ts`**, **`tsconfig.json`**, **`postcss.config.js`**. |

## Scripts

From the repo root: **`npm run dev`**, **`npm run build`**, **`npm run start`**, **`npm run lint`**.

There are **no** **`-w <workspace>`** flags or **`apps/*`** workspaces in this starter.

## Adding structure later

If the project grows (e.g. **`src/features/`**, **`src/hooks/`**, design tokens), extend this layout in **`CLAUDE.md`** and keep **one obvious import path** per concern — same spirit as **implementation-consistency**, without assuming **`packages/admin`** or **`@repo/ui`**.
