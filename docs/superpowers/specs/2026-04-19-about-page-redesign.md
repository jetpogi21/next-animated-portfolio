# About Page Redesign — Spec

**Date:** 2026-04-19
**Scope:** UI/UX improvements to `/about` page only. No changes to routing, layout shell, navbar, or other pages.

---

## Context

The About page uses a two-column layout: left column scrolls through 4 sections (Biography, Skills, Experience, CTA), right column is a sticky animated gears SVG (`Brain`) driven by `scrollYProgress`. The gears animation is the hero element and must not be touched.

All changes are confined to `src/app/about/_components/About.tsx`.

---

## Section 1 — Biography

**Current:** Plain `<h1>About me</h1>`, two text paragraphs (second in italic), scroll indicator at bottom-left.

**Changes:**
- Below `<h1>About me</h1>`, add a bold display-size role headline: `"Full-Stack Developer & Certified CPA"` styled at ~`text-3xl font-bold text-foreground`
- Remove `italic` from the second paragraph (`subcontent`); use regular weight
- Add a stats row below the two paragraphs, before the scroll indicator:
  - Three stat items: `10+ Years`, `CPA Certified`, `50+ Projects`
  - Each item: large accent number/label (`text-2xl font-bold text-[#d4956a]`) + small muted descriptor below (`text-xs text-muted-foreground`)
  - Row uses `flex gap-8`

**What stays:** Existing prose content, `ScrollSvg` scroll indicator, overall spacing.

---

## Section 2 — Skills

**Current:** Lowercase `"skills"` heading, 13 flat tags with low-contrast color `text-[#7a5c45]`, typo `"PostrgreSQL"`.

**Changes:**
- Fix heading capitalization: `"Skills"`
- Fix typo: `"PostrgreSQL"` → `"PostgreSQL"`
- Replace flat `skills` array with a grouped structure:

```ts
const skillGroups = [
  {
    label: "Languages",
    skills: ["JavaScript", "TypeScript", "SQL", "Visual Basic"],
  },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "Tailwind", "HTML", "CSS"],
  },
  {
    label: "Database & Tools",
    skills: ["MySQL", "PostgreSQL", "MS Excel", "MS Access"],
  },
];
```

- Render each group as: muted uppercase sub-label (`text-xs text-muted-foreground tracking-widest`) + wrapped tag row
- Tag styles: `border border-[#d4956a] text-[#d4956a]` (fixes contrast), `px-3 py-1 text-sm rounded-sm`, existing hover effect retained

---

## Section 3 — Experience

**Current:** Alternating `flex-row-reverse` layout with broken dot alignment, italic small bullet text, date more prominent than company name.

**Replace `JobTimeline` component entirely** with a clean left-aligned vertical timeline:

**New `JobTimeline` layout per entry:**
```
[dot]─[line]
             date · company   ← text-xs muted uppercase
             Job Title        ← text-base font-bold text-foreground
             • bullet         ← text-sm text-muted-foreground (normal weight, not italic)
             • bullet
```

**Implementation:**
- Outer wrapper: `flex gap-4`
- Left gutter: `flex flex-col items-center` containing:
  - Dot: `w-3 h-3 rounded-full bg-[#d4956a] mt-1 shrink-0`
  - Line: `w-0.5 flex-1 bg-gray-600 mt-1` (omit on last item)
- Right content: `flex flex-col gap-1 pb-8`
  - Date + company: `text-xs text-muted-foreground uppercase tracking-wide` — format: `"2016 – Present · Freelancer.ph"`
  - Job title: `text-base font-bold text-foreground`
  - Bullets: `ul` with `list-disc list-inside text-sm text-muted-foreground space-y-1` (normal weight, not italic)
  - Show all bullets (remove the `hidden lg:flex` truncation on index > 2)

**Add** a brief intro line above the entries: `"Professional roles I've held"` in `text-sm text-muted-foreground italic`.

---

## Section 4 — CTA (LastSection)

**Current:** 3 identical large salmon buttons stacked vertically, centered, no heading.

**Changes:**
- Add heading: `"What's next?"` — `text-3xl font-bold text-foreground`
- Add subtitle: `"Explore my work, download my resume, or reach out directly."` — `text-sm text-muted-foreground text-center max-w-xs`
- Replace 3 identical buttons with descending visual hierarchy (stacked, `w-48` each, centered):
  1. **View My Works →** — `bg-[#d4956a] text-[#2d1f14] font-bold` (filled, primary)
  2. **View My Resume →** — `border border-[#d4956a] text-[#d4956a]` (outlined, secondary)
  3. **Contact Me →** — `border border-gray-600 text-muted-foreground` (muted, tertiary)
- All buttons: `px-6 py-3 rounded-sm text-base text-center`

---

## Section 5 — Scroll Progress Bar

**Current:** `scrollYProgress` is tracked but not visualized.

**Add** a thin progress bar at the top of the scrollable container:
- A `motion.div` positioned `sticky top-0 left-0 h-0.5 bg-[#d4956a] z-10`
- `style={{ scaleX: scrollYProgress, transformOrigin: "left" }}`
- Placed as the first child inside the scrollable container div, before the text container

---

## What Does Not Change

- `Brain` component and gears SVG animation
- `PageTransitionContainer` and layout shell
- Framer Motion entrance animations (`enterAnimationProps`) on section headings
- Overall two-column layout (`w-2/3` left + `w-1/3` sticky right)
- Color palette and dark theme
- `ScrollSvg` scroll-down indicators between sections

---

## Files Changed

| File | Change |
|---|---|
| `src/app/about/_components/About.tsx` | All changes above |

No new files. No new dependencies.
