---
name: motion
description: Motion (motion/react) for public-facing Galaxy UI — staggered lists, springs, reduced-motion, and Next.js client boundaries. Use when animating the home page, marketing-style sections, or any non-admin surface where expressive motion is desired.
user-invocable: true
allowed-tools: Bash(npm install motion), Bash(npm run typecheck)
---

# Motion (Galaxy — public UI)

This project uses the **`motion`** package (successor to Framer Motion for React). Import from **`motion/react`**.

## When to use

- **Public / home UI** — hero sections, card grids (captains, cards), page entrances.
- Prefer **subtle, purposeful** motion: staggered reveals, spring hovers, layout-friendly transitions.
- **Admin CRUD** — keep motion minimal unless explicitly requested; tables and dialogs should stay fast and predictable.

## Patterns

1. **Client boundary** — Motion components need **`"use client"`**. Keep **data fetching in Server Components** and pass **serializable props** into a small client shell (see **`components/home/home-roster-section.tsx`**).
2. **`useReducedMotion()`** — Respect **`prefers-reduced-motion`**: shorten or disable stagger, hover physics, and long fades when the hook returns **`true`**.
3. **Variants** — Use **`variants`** on list parents (`staggerChildren`) and children for consistent orchestration. For TypeScript, give spring transitions **`type: "spring" as const`** so literal types satisfy Motion’s **`Transition`** types.
4. **Lists** — Stable **`key`** on each item; prefer **`data-testid`** scoped by id (e.g. **`home-captain-card--${id}`**) for Playwright.
5. **Images** — Arbitrary remote URLs from the DB may use **`<img>`** with a meaningful **`alt`**; add **`remotePatterns`** to **`next.config`** if switching to **`next/image`** for known hosts.

## Install

```bash
npm install motion
```

**Next.js:** `next.config.mjs` may include **`motion/react`** in **`experimental.optimizePackageImports`** to trim barrel imports.

## Workspace

Canonical Motion guidance for this repo lives in this skill (public / marketing surfaces; minimal motion in admin unless asked).

## References

- [Motion for React docs](https://motion.dev/docs/react)
