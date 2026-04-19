# Dependency Upgrade Design — Full Major Version Bump

**Date:** 2026-04-19
**Approach:** Sequential staged upgrades (Option A)
**Goal:** Bring all packages to latest major versions with minimal risk by upgrading in dependency order, verifying each stage before proceeding.

---

## Current vs Target Versions

| Package | Current | Target |
|---------|---------|--------|
| react | 18 | 19.2.5 |
| react-dom | 18 | 19.2.5 |
| @types/react | ^18.2.74 | ^19.x |
| next | 14.1.0 | 16.2.4 |
| eslint-config-next | 14.1.0 | 16.2.4 |
| framer-motion | ^11.0.24 | ^12.x |
| tailwindcss | 3.3.0 | 4.x |
| tailwind-merge | ^2.2.2 | ^3.x |
| tailwind-scrollbar | ^3.1.0 | ^4.x |
| tailwindcss-animate | ^1.0.7 | tw-animate-css (if needed) |
| autoprefixer | 10.0.1 | ^10.5.0 |
| postcss | 8 | 8.5.10 |
| lucide-react | ^0.364.0 | ^1.8.0 |
| @react-pdf/renderer | 3.4.2 | ^4.5.1 |
| sharp | ^0.33.4 | ^0.34.5 |
| @emailjs/browser | ^4.3.3 | ^4.4.1 |
| embla-carousel-react | ^8.0.1 | ^8.6.0 |
| @radix-ui/react-dropdown-menu | ^2.0.6 | ^2.1.16 |
| @radix-ui/react-label | ^2.0.2 | ^2.1.8 |
| @radix-ui/react-slot | ^1.0.2 | ^1.2.4 |
| next-themes | ^0.3.0 | ^0.4.6 |
| typescript | ^5.4.3 | ^5.8.x |
| class-variance-authority | ^0.7.0 | ^0.7.1 |
| clsx | ^2.1.0 | ^2.1.1 |
| @types/node | ^20.12.3 | ^25.x |
| eslint | 8 | 8 (keep — ESLint 9 flat config is a large migration, defer) |

---

## Architecture

No architectural changes. This is a pure dependency upgrade — all existing patterns (App Router, "use client" components, Tailwind CSS variables, Framer Motion animations) are preserved. The upgrade is additive: we run official codemods where available and fix any resulting breakage.

---

## Stage Details

### Stage 1 — React 19

**Packages:** `react@19`, `react-dom@19`, `@types/react@^19`

**Install command:**
```bash
npm install react@19 react-dom@19 @types/react@^19 --legacy-peer-deps
```

**Why `--legacy-peer-deps`:** At this stage, some packages (framer-motion 11, next-themes 0.3) still declare `react@18` as a peer dep. The flag allows the install to proceed; these packages will be upgraded in later stages.

**Code changes:** None required. The codebase was audited and contains no deprecated React 18 APIs:
- No `ReactDOM.render()` (uses App Router / Next.js hydration)
- No `findDOMNode()`
- No string refs
- No `defaultProps` on function components
- No `React.FC` with implicit children

**Verification:** `npm run build` must pass.

---

### Stage 2 — Next.js 15

**Packages:** `next@15`, `eslint-config-next@15`

**Install command:**
```bash
npx @next/codemod@latest upgrade
```

The official `@next/codemod upgrade` tool handles the install and applies all codemods automatically. Key codemod it applies:

- **`async-request-api`** — wraps `params` and `searchParams` in page/layout props with `await`. Next.js 15 made these async.

**Affected files to verify after codemod:**
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/portfolio/page.tsx`
- `src/app/resume/page.tsx`

**Verification:** `npm run build` must pass.

---

### Stage 3 — Next.js 16

**Packages:** `next@16.2.4`, `eslint-config-next@16.2.4`

**Install command:**
```bash
npm install next@16.2.4 eslint-config-next@16.2.4
```

No codemod required between 15→16. Next.js 16 stabilizes Turbopack as the default bundler.

**Verification:** `npm run build` must pass.

---

### Stage 4 — Framer Motion 12

**Packages:** `framer-motion@^12`

**Install command:**
```bash
npm install framer-motion@^12
```

**Files affected (8 total):**
- `src/app/about/_components/About.tsx`
- `src/app/about/_components/Brain.tsx`
- `src/app/contact/_components/Contact.tsx`
- `src/app/portfolio/_components/Portfolio.tsx`
- `src/components/Navbar.tsx`
- `src/components/PageTransitionContainer.tsx`
- `src/components/ScrollSvg.tsx`
- `src/components/TransitionProvider.tsx`

**Known breaking changes in v12:**
- `MotionConfig` and `AnimatePresence` API adjustments
- `useScroll` / `useTransform` hook signatures unchanged but verify usage
- `motion` component `transition` prop behavior — verify `TransitionProvider.tsx` and `PageTransitionContainer.tsx`
- SVG path animation (`pathLength`, `pathOffset`) — verify `ScrollSvg.tsx` and `Brain.tsx`

**Verification:** `npm run build` + manual visual inspection of all animated pages (Home, About, Contact, Portfolio, Navbar transitions).

---

### Stage 5 — Tailwind CSS 4

**Packages:** `tailwindcss@^4`, `@tailwindcss/postcss`, `tailwind-merge@^3`, `tailwind-scrollbar@^4`

**Install command (run upgrade tool first):**
```bash
npx @tailwindcss/upgrade@next
```

The upgrade tool:
- Migrates `tailwind.config.ts` content into CSS (`src/app/globals.css` or equivalent)
- Updates `postcss.config.js` to use `@tailwindcss/postcss` instead of `tailwindcss`
- Migrates `@apply` directives and utility class renames

**Key breaking changes:**
- No more `tailwind.config.ts` — configuration moves to CSS `@theme` block
- `darkMode: ["class"]` becomes `@variant dark (&:is(.dark *))` in CSS
- `tailwindcss-animate` may need replacement with `tw-animate-css` (check compatibility post-upgrade)
- `tailwind-merge` v3 has changed merge behavior for some conflict groups — verify `src/lib/utils.ts` `cn()` helper still works correctly
- CSS variable color scheme (HSL variables) should migrate cleanly via the tool

**Verification:** `npm run build` + visual inspection of all pages for layout/color/animation regressions.

---

### Stage 6 — Remaining Packages

**Install command:**
```bash
npm install \
  lucide-react@^1.8.0 \
  @react-pdf/renderer@^4.5.1 \
  sharp@^0.34.5 \
  @emailjs/browser@^4.4.1 \
  embla-carousel-react@^8.6.0 \
  @radix-ui/react-dropdown-menu@^2.1.16 \
  @radix-ui/react-label@^2.1.8 \
  @radix-ui/react-slot@^1.2.4 \
  next-themes@^0.4.6 \
  class-variance-authority@^0.7.1 \
  clsx@^2.1.1

npm install -D \
  typescript@^5.8 \
  @types/node@^25 \
  autoprefixer@^10.5.0 \
  postcss@8.5.10
```

**`tsconfig.json` update:**
Change `"moduleResolution": "node"` → `"moduleResolution": "bundler"` (recommended for Next.js 15+).

**`@react-pdf/renderer` v3→v4:** Check resume components (`src/app/resume/_components/`) for any API changes — v4 has updated font and layout APIs.

**Verification:** `npm run build` + test resume PDF generation and carousel/lightbox functionality.

---

## Error Handling

Each stage ends with `npm run build`. If the build fails:
1. Read the TypeScript/ESLint error output
2. Fix the specific files flagged
3. Re-run build before moving to the next stage

Do not proceed to the next stage with a broken build.

---

## Testing Checklist

After all stages complete, manually verify:

- [ ] Home page loads, scroll animations work
- [ ] About page loads, Brain SVG animation works
- [ ] Contact page loads, form submits via EmailJS
- [ ] Portfolio page loads, lightbox opens images, carousel works
- [ ] Resume page loads, PDF renders and downloads
- [ ] Navbar theme toggle (light/dark) works
- [ ] Page transitions animate correctly
- [ ] Mobile responsive layout intact
