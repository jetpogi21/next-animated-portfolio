# Dependency Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade all npm packages to their latest major versions sequentially, verifying the build passes after each stage before proceeding to the next.

**Architecture:** Pure dependency upgrade — no code architecture changes. Six sequential stages in dependency order: React 19 → Next.js 15 → Next.js 16 → Framer Motion 12 → Tailwind CSS 4 → remaining packages. Each stage ends with a passing `npm run build`.

**Tech Stack:** Next.js 16, React 19, Framer Motion 12, Tailwind CSS 4, TypeScript 5.8, @react-pdf/renderer 4

---

## Files Modified

| File | Stage | Reason |
|------|-------|--------|
| `package.json` | All stages | Version bumps |
| `package-lock.json` | All stages | Auto-updated by npm |
| `src/app/layout.tsx` | Stage 2 | Next.js 15 async params codemod may touch it |
| `src/app/page.tsx` | Stage 2 | Next.js 15 async params codemod |
| `src/app/about/page.tsx` | Stage 2 | Next.js 15 async params codemod |
| `src/app/contact/page.tsx` | Stage 2 | Next.js 15 async params codemod |
| `src/app/portfolio/page.tsx` | Stage 2 | Next.js 15 async params codemod |
| `src/app/resume/page.tsx` | Stage 2 | Next.js 15 async params codemod |
| `src/components/TransitionProvider.tsx` | Stage 4 | Framer Motion 12 breaking changes |
| `src/components/PageTransitionContainer.tsx` | Stage 4 | Framer Motion 12 breaking changes |
| `src/components/ScrollSvg.tsx` | Stage 4 | SVG path animation verification |
| `src/app/about/_components/Brain.tsx` | Stage 4 | SVG path animation verification |
| `src/app/about/_components/About.tsx` | Stage 4 | Framer Motion 12 verification |
| `src/app/contact/_components/Contact.tsx` | Stage 4 | Framer Motion 12 verification |
| `src/app/portfolio/_components/Portfolio.tsx` | Stage 4 | Framer Motion 12 + scroll hooks |
| `src/components/Navbar.tsx` | Stage 4 | Framer Motion 12 verification |
| `tailwind.config.ts` | Stage 5 | Migrated to CSS (deleted by upgrade tool) |
| `postcss.config.js` | Stage 5 | Updated to `@tailwindcss/postcss` |
| `src/app/globals.css` | Stage 5 | CSS-first Tailwind 4 config injected here |
| `src/lib/utils.ts` | Stage 5 | Verify `cn()` still works with tailwind-merge 3 |
| `tsconfig.json` | Stage 6 | `moduleResolution: "bundler"` |
| `src/app/resume/_components/MyDocument.tsx` | Stage 6 | @react-pdf/renderer v4 API check |

---

## Task 1: Stage 1 — Upgrade React to v19

**Files:**
- Modify: `package.json` (react, react-dom, @types/react)

- [ ] **Step 1: Install React 19**

```bash
npm install react@19 react-dom@19 @types/react@^19 --legacy-peer-deps
```

Expected output: `added/changed N packages` with no fatal errors. Peer dep warnings about framer-motion/next-themes are expected and safe to ignore — they'll be fixed in later stages.

- [ ] **Step 2: Run build and verify it passes**

```bash
npm run build
```

Expected: Build completes with `✓ Compiled successfully` or similar. If TypeScript errors appear, read them carefully — most will be in `@types/react` type signature changes. The most common React 19 change is that `children` is no longer implicitly included in component prop types. Fix any such errors by explicitly adding `children: ReactNode` to affected prop types.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade React to v19"
```

---

## Task 2: Stage 2 — Upgrade Next.js to v15 (with official codemod)

**Files:**
- Modify: `package.json`, all `src/app/**/page.tsx`, `src/app/layout.tsx`

- [ ] **Step 1: Run the official Next.js upgrade codemod**

```bash
npx @next/codemod@latest upgrade
```

When prompted, select `15` as the target version. The tool will:
- Update `next` and `eslint-config-next` to `^15`
- Run the `async-request-api` codemod which wraps `params` and `searchParams` in page/layout props with `await`
- Run additional codemods for other 15.x changes

Accept all prompts. If it asks about Turbopack, you can accept or decline — it's optional at this stage.

- [ ] **Step 2: Review codemod changes to page files**

Open each of these files and confirm the codemod made appropriate changes (async params/searchParams wrapped with `await`):
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/portfolio/page.tsx`
- `src/app/resume/page.tsx`

If any page uses `params` or `searchParams`, they should now be awaited. Pages that don't use them will be unchanged.

- [ ] **Step 3: Run build and verify it passes**

```bash
npm run build
```

Expected: Build completes successfully. Common Next.js 15 errors to watch for:
- `params should be awaited` — codemod should have fixed these; if not, manually add `await`
- Any new ESLint rules from `eslint-config-next@15` — fix or suppress as needed

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: upgrade Next.js to v15 with official codemod"
```

---

## Task 3: Stage 3 — Upgrade Next.js to v16

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Next.js 16**

```bash
npm install next@16.2.4 eslint-config-next@16.2.4
```

- [ ] **Step 2: Run build and verify it passes**

```bash
npm run build
```

Expected: Build completes successfully. Next.js 16 stabilizes Turbopack — you may see a notice about it being the new default. No code changes are expected to be required.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade Next.js to v16"
```

---

## Task 4: Stage 4 — Upgrade Framer Motion to v12

**Files:**
- Modify: `package.json`
- Verify/fix: `src/components/TransitionProvider.tsx`, `src/components/PageTransitionContainer.tsx`, `src/components/ScrollSvg.tsx`, `src/app/about/_components/Brain.tsx`, `src/app/about/_components/About.tsx`, `src/app/contact/_components/Contact.tsx`, `src/app/portfolio/_components/Portfolio.tsx`, `src/components/Navbar.tsx`

- [ ] **Step 1: Install Framer Motion 12**

```bash
npm install framer-motion@^12
```

- [ ] **Step 2: Run build and check for TypeScript errors**

```bash
npm run build
```

If TypeScript errors appear, read them carefully. The most common Framer Motion v12 breaking changes:

**`motion` component type changes:** If you see errors like `Property 'X' does not exist on type 'HTMLMotionProps'`, the prop may have been renamed or removed. Check the [Framer Motion changelog](https://www.framer.com/motion/changelog/) for v12.

**`AnimatePresence` in `TransitionProvider.tsx`:** The current code at `src/components/TransitionProvider.tsx:20` uses `<AnimatePresence mode="wait">` — this API is unchanged in v12, no fix needed.

**`transition` prop:** The current `TransitionProvider.tsx` passes `transition` as a direct prop on `motion.div` — this remains valid in v12.

**`useScroll` / `useTransform`:** If `src/app/portfolio/_components/Portfolio.tsx` uses these hooks, their signatures are unchanged in v12.

Fix any TypeScript errors before proceeding.

- [ ] **Step 3: Start dev server and visually verify all animated pages**

```bash
npm run dev
```

Open `http://localhost:3000` in your browser and verify each page:

1. **Home (`/`)** — page load transition (slide animation from `TransitionProvider`) works
2. **About (`/about`)** — page transition works, Brain SVG path animation draws correctly
3. **Contact (`/contact`)** — page transition works, form renders
4. **Portfolio (`/portfolio`)** — page transition works, scroll-based animations work as you scroll
5. **Navbar** — hamburger menu animation works on mobile viewport (resize browser to < 768px), theme toggle works

Stop the dev server when done (`Ctrl+C`).

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: upgrade Framer Motion to v12"
```

---

## Task 5: Stage 5 — Upgrade Tailwind CSS to v4

**Files:**
- Delete: `tailwind.config.ts` (upgrade tool removes it)
- Modify: `postcss.config.js`, `src/app/globals.css`
- Modify: `package.json`
- Verify: `src/lib/utils.ts`

- [ ] **Step 1: Run the official Tailwind CSS upgrade tool**

```bash
npx @tailwindcss/upgrade@next
```

Accept all prompts. The tool will:
- Install `tailwindcss@^4` and `@tailwindcss/postcss`
- Migrate `tailwind.config.ts` into `src/app/globals.css` as a `@theme` block
- Update `postcss.config.js` to use `@tailwindcss/postcss`
- Rename any utility classes that changed between v3 and v4

- [ ] **Step 2: Verify `postcss.config.js` was updated correctly**

After the tool runs, `postcss.config.js` should look like:

```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

If it still shows `tailwindcss: {}`, replace it with the above.

- [ ] **Step 3: Verify `globals.css` has the migrated theme**

Open `src/app/globals.css`. It should now start with `@import "tailwindcss"` instead of `@tailwind base/components/utilities` directives, and contain a `@theme` block with the color variables. The dark mode variant should be present. If the HSL color variables (`--background`, `--foreground`, etc.) are missing, re-add them under `:root` and `.dark` inside `@layer base` as they were originally.

- [ ] **Step 4: Handle `tailwindcss-animate` compatibility**

Check if `tailwindcss-animate` was automatically replaced by the upgrade tool. If `globals.css` does not import animation utilities, install the Tailwind 4 compatible package:

```bash
npm install tw-animate-css
```

Then add this import at the top of `src/app/globals.css`:

```css
@import "tw-animate-css";
```

Remove `tailwindcss-animate` from `package.json` if it's still listed.

- [ ] **Step 5: Upgrade `tailwind-scrollbar` and `tailwind-merge`**

```bash
npm install tailwind-scrollbar@^4 tailwind-merge@^3
```

In Tailwind 4, plugins are registered in CSS, not in a config file. Add the scrollbar plugin import to `src/app/globals.css`:

```css
@plugin "tailwind-scrollbar";
```

- [ ] **Step 6: Verify `cn()` helper in `src/lib/utils.ts` still works**

Open `src/lib/utils.ts`. The `cn()` function uses `twMerge` from `tailwind-merge`. In tailwind-merge v3, the merge behavior for some conflict groups changed (e.g. `gap-*` vs `gap-x-*`/`gap-y-*`). The function signature is unchanged:

```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

No code change needed — just verify the file looks like this after the upgrade.

- [ ] **Step 7: Run build and verify it passes**

```bash
npm run build
```

Common Tailwind 4 build errors:
- `Cannot find module 'tailwindcss'` — the postcss config still points to old plugin; fix `postcss.config.js` per Step 2
- Unknown utility classes — Tailwind 4 renamed some utilities (e.g. `shadow-sm` behavior changes). Fix by updating the class names in the flagged files
- `@apply` with unknown utilities — Tailwind 4 is stricter about `@apply`; replace with direct CSS if needed

- [ ] **Step 8: Start dev server and visually verify all pages for styling regressions**

```bash
npm run dev
```

Check each page at `http://localhost:3000` for:
- Colors (light/dark mode toggle still works, HSL color scheme intact)
- Typography (font sizes, weights, uppercase headings)
- Layout (navbar height, page container max-widths, scroll behavior)
- Animations (`tailwindcss-animate` keyframes still work — check any components using `animate-*` classes)
- Scrollbar styling (if `tailwind-scrollbar` classes are used, verify they render)

Stop dev server when done.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: upgrade Tailwind CSS to v4"
```

---

## Task 6: Stage 6 — Upgrade remaining packages

**Files:**
- Modify: `package.json`, `tsconfig.json`
- Verify: `src/app/resume/_components/MyDocument.tsx`

- [ ] **Step 1: Install remaining dependency upgrades**

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
```

- [ ] **Step 2: Install dev dependency upgrades**

```bash
npm install -D \
  typescript@^5.8 \
  @types/node@^25 \
  autoprefixer@^10.5.0 \
  postcss@8.5.10
```

- [ ] **Step 3: Update `tsconfig.json` moduleResolution**

Open `tsconfig.json`. Change line 12:

```json
"moduleResolution": "node",
```

to:

```json
"moduleResolution": "bundler",
```

The full `compilerOptions` block should look like:

```json
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Check `@react-pdf/renderer` v4 API in `MyDocument.tsx`**

Open `src/app/resume/_components/MyDocument.tsx`. The v4 release of `@react-pdf/renderer` updated some font and layout APIs. Verify:

- `Font.register({ family, src })` — unchanged, still valid
- `Font.registerHyphenationCallback` — unchanged, still valid
- `Document`, `Page`, `View`, `Image`, `Link` imports from `@react-pdf/renderer` — unchanged
- The `@ts-ignore` comment on line 78 (above `<Image>`) may no longer be needed in v4 — try removing it and see if TypeScript is happy; if not, leave it

If TypeScript errors appear after the upgrade, read the `@react-pdf/renderer` v4 changelog for renamed props or changed types.

- [ ] **Step 5: Run build and verify it passes**

```bash
npm run build
```

Fix any TypeScript errors that appear. Common issues:
- `lucide-react` v1.x renamed some icons — if any icon import fails (e.g. `Loader2`, `Sun`, `Moon`, `Check`, `ChevronRight`, `Circle`, `ArrowLeft`, `ArrowRight`), check the lucide-react v1 icon list and find the new name
- `next-themes` v0.4 changed the `ThemeProvider` props — open `src/components/ThemeProvider.tsx` and verify props match the new API

- [ ] **Step 6: Start dev server and do final full verification**

```bash
npm run dev
```

Go through the complete manual testing checklist:

- [ ] Home page loads, scroll animations work
- [ ] About page loads, Brain SVG animation draws on scroll
- [ ] Contact page loads, EmailJS form submission works (you can test the UI without actually sending)
- [ ] Portfolio page loads, lightbox opens on image click, carousel navigation works
- [ ] Resume page loads, PDF renders in the viewer, download button works
- [ ] Navbar: theme toggle switches light/dark, mobile hamburger menu animates open/close
- [ ] Page transitions animate when navigating between pages

Stop dev server.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: upgrade remaining packages to latest versions"
```

---

## Final Build Verification

- [ ] **Run production build one final time**

```bash
npm run build
```

Expected: Clean build with no errors or warnings that weren't present before the upgrade. The output should show all routes compiled successfully.
