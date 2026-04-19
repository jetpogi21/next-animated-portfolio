---
name: visual-review
description: Visually review a page in the dev server using Playwright. Captures all sections including inner-scroll containers, then gives structured UI/UX feedback.
---

# /visual-review

Capture and review a page from the running dev server at `http://localhost:3000`.

## Important: Inner-Scroll Containers

Several pages (especially `/about`) use an **inner scroll container** (`overflow-y-scroll` on a div, not `window`). Scrolling `window` via keyboard or `window.scrollTo` won't work — scroll the container directly:

```js
// Get scroll height of the inner container
const el = document.querySelector('.overflow-y-scroll');
el.scrollHeight // total scrollable height

// Scroll to a position
el.scrollTop = 900;
```

## Steps

1. **Navigate** to the page with `browser_navigate`
2. **Screenshot** with `browser_take_screenshot` (fullPage: true for a first overview)
3. **Find scroll height** via `browser_evaluate`:
   ```js
   () => {
     const el = document.querySelector('.overflow-y-scroll');
     return el ? el.scrollHeight : document.body.scrollHeight;
   }
   ```
4. **Scroll and capture** each section:
   ```js
   () => {
     const el = document.querySelector('.overflow-y-scroll');
     if (el) el.scrollTop = <position>;
     else window.scrollTo(0, <position>);
   }
   ```
   Take a screenshot after each scroll.
5. **Read the component source** to understand the full section structure (not just what's visible).
6. **Report** structured feedback per section:
   - Section name
   - Issue (Visual Hierarchy / Contrast / Spacing / UX / Accessibility)
   - Severity (High / Medium / Low)
   - Specific suggestion

## Pages and Their Scroll Patterns

| Page | Scroll type | Selector |
|---|---|---|
| `/about` | Inner container | `.overflow-y-scroll` |
| `/` | Window | `window` |
| `/portfolio` | Window | `window` |
| `/resume` | Window | `window` |
| `/contact` | Inner container (maybe) | `.overflow-y-scroll` |

## Dev Server

Make sure `npm run dev` is running. If the browser session is closed, `browser_navigate` will reopen it.
