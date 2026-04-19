# UI / UX audit (portfolio)

Perform a structured pass on a **public page** in this Next.js app.

## Inputs

- **Route path** (e.g. **`/contact`**, **`/portfolio`**) — if missing, ask once.

## Process

1. **Read code** — **`src/app/<segment>/`**, shared **`src/components/`** (navbar, theme, layout).
2. **Checklist** (manual or DevTools):
   - Responsive breakpoints (mobile / tablet / desktop).
   - Tap targets and focus visibility for interactive controls.
   - Images: meaningful **`alt`** text (**`NextJsImage`** / **`next/image`** usage).
   - Contrast and motion: respect **`prefers-reduced-motion`** where animations exist.
3. **Optional automation** — when Playwright exists, scripted viewport checks can live under **`e2e/`**; until then, document findings in the reply.

## Output

Short report: **PASS / FAIL / WARN** per category, file references for any issues, and **Suggested next** fixes ordered by impact.
