---
name: tanstack-virtual
description: TanStack Virtual (@tanstack/react-virtual) for long lists and grids in Galaxy — useVirtualizer, window vs element scroll, row-based grids, overscan, measurement, Next.js client boundaries.
user-invocable: true
---

# TanStack Virtual (Galaxy)

## Package

- **`@tanstack/react-virtual`** — headless virtualization; **not** bundled with `@tanstack/react-table` or `@tanstack/react-query`. Add it explicitly when you need virtualization.

## When to virtualize

- **Do** when the DOM would hold **many repeated items** (hundreds+) or heavy cells (images, charts) and scroll performance or memory matters.
- **Skip** for short lists: the virtualizer adds layout/scroll-container complexity; this repo uses a **count threshold** on the home roster (`HOME_ROSTER_VIRTUALIZE_MIN_ITEMS` in `lib/home/home-roster-virtualize.ts`).
- **Admin data tables** already use TanStack Table; if the table body must virtualize, combine table column defs with a virtualized body (TanStack Table examples + `@tanstack/react-virtual`), or keep pagination as the primary scale lever.

## APIs (React)

| Hook | Use when |
|------|----------|
| **`useVirtualizer`** | Scroll lives in a **`ref`** on a container with **`overflow: auto`** (or `scroll`). Set **`getScrollElement`** to that node. Prefer only when you **want** an inner scroll pane (e.g. modal). |
| **`useWindowVirtualizer`** | Scroll is the **window** — **no nested scrollbar**; the page grows in height and uses the normal document scroller (“infinite” feel for large lists). Set **`scrollMargin`** to the list anchor’s distance from the document top (`getBoundingClientRect().top + window.scrollY`), and update it on resize / layout shifts. **Position rows with** `transform: translateY(item.start - virtualizer.options.scrollMargin)` (see TanStack window example). Galaxy home roster: **`components/home/home-roster-virtualized-grid.tsx`**. |

Common options:

- **`count`** — logical row count (for a grid, often **rows**, not cells).
- **`estimateSize`** — initial row height before measurement; tune to reduce scroll jank.
- **`gap`** — spacing between items along the scroll axis (TanStack adds it between virtual items).
- **`overscan`** — extra rows rendered above/below the viewport for smoother fast scroll.
- **`measureElement`** — ref callback on each virtual row/cell so **ResizeObserver** can correct variable heights (default measurement uses element size).
- **`getItemKey`** — stable keys when row order or data identity changes.

## Grids (responsive columns)

TanStack Virtual is **1D**. For a **CSS grid** of cards:

1. Pick **column count** in sync with the CSS grid: home roster uses **`homeRosterGridColumnCount(window.innerWidth)`** (viewport breakpoints like Tailwind **`lg` / `xl` / `2xl`**), not the grid element’s width — inside **`max-w-6xl`** the track is narrower than the viewport, but Tailwind still applies **`2xl:grid-cols-5`** from the viewport.
2. Set **`count = ceil(itemCount / columnCount)`** — one virtual item per **row**.
3. Each virtual row renders a **horizontal** `grid` with `gridTemplateColumns: repeat(cols, minmax(0, 1fr))` and **`items.slice(rowIndex * cols, rowIndex * cols + cols)`**.
4. On column count change, call **`virtualizer.measure()`** in **`useLayoutEffect`** so sizes recompute.

Reference implementation: **`components/home/home-roster-virtualized-grid.tsx`** (window scroll + row grid). **Do not** set a fixed **`height`** on the measured row wrapper to match `virtualRow.size` — if the estimate is short of real content (e.g. images), content overflows and rows **visually overlap** while the virtualizer still spaces by the smaller measured height. Let each row’s height come from its content; `measureElement` will read the true `offsetHeight`.

**“Infinite scroll” with data already on the client:** window virtualization is usually enough (smooth scroll through a tall page). **True infinite scroll** that **loads the next page from the server** is separate: use TanStack Query **`useInfiniteQuery`** + an **`IntersectionObserver`** sentinel (see [TanStack Virtual infinite scroll example](https://tanstack.com/virtual/latest/docs/framework/react/examples/infinite-scroll)) and add a paginated public API when you need it.

## Next.js

- Virtualizers run in the **client**: **`"use client"`** components only; pass serializable **props** from RSC parents.
- Avoid running `useVirtualizer` during SSR for scroll-heavy pages without a scroll container — the hook is client-safe but **column count** may **hydrate** from a default until `ResizeObserver` fires; keep defaults aligned with CSS to minimize layout shift.

## Related

- **Principle:** When UI renders **many** similar siblings in a scrollable region, estimate layout, paint, memory, and interaction before mounting every node; use a **minimum count threshold** before enabling a virtualizer (this repo: home roster — see **`HOME_ROSTER_VIRTUALIZE_MIN_ITEMS`**). **Pagination** (server or client) is often enough for admin tables. **`content-visibility: auto`** can help paint but does not replace virtualization for very large trees.
- Motion on public UI: still respect **`useReducedMotion`**; staggered **container** animations often conflict with virtualization — animate **per visible tile** only if needed.

## Docs

- [TanStack Virtual](https://tanstack.com/virtual/latest)
