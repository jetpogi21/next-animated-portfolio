# Portfolio Full Redesign — Design Spec

**Date:** 2026-04-19  
**Author:** Jonathan Pradas  
**Scope:** Full visual overhaul of all 5 pages (Home, About, Portfolio, Resume, Contact)

---

## 1. Design Direction

### Aesthetic
**Warm Editorial** — sophisticated warmth that bridges professional credibility (CPA) with technical craft (full-stack developer). Dark immersive hero entry, transitioning to a warm cream body throughout the rest of the site.

### Copy Tone
**Results-focused** — headlines and subheadlines emphasize what Jonathan delivers for clients (outcomes, revenue, systems), not titles or credentials.

---

## 2. Visual Identity

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--color-hero-bg` | `#2d1f14` | Hero section, dark accents, page transition overlay |
| `--color-body-bg` | `#f8f3ed` | Main page background |
| `--color-body-bg-alt` | `#ede8e0` | Alternating section background |
| `--color-accent` | `#d4956a` | Terracotta — buttons, borders, highlights, active states |
| `--color-text-primary` | `#2d1f14` | Body text on light backgrounds |
| `--color-text-secondary` | `#7a5c45` | Subheadings, captions, meta text |
| `--color-text-on-dark` | `#f8f3ed` | Text on espresso backgrounds |
| `--color-text-on-dark-muted` | `#c4a882` | Secondary text on dark backgrounds |

**Dark mode:** Espresso backgrounds (`#2d1f14`, `#1a110a`) with cream text (`#f8f3ed`), accent stays `#d4956a`.

### Typography

| Role | Font | Weights | Notes |
|---|---|---|---|
| Display / Headings | **Fraunces** | 300, 700, 900 | Variable font, optical size enabled |
| Body / UI | **Karla** | 400, 500, 700 | Variable font |
| Accent labels | Karla | 500 | All-caps, letter-spacing: 3-4px |

Both loaded from Google Fonts as variable fonts.

---

## 3. Page-by-Page Design

### 3.1 Home (`/`)

**Hero Section (dark):**
- Full-viewport dark espresso background (`#2d1f14`)
- `hero.png` positioned right, bleeds to edge with a subtle warm gradient overlay (espresso → transparent left-to-right)
- Left column: eyebrow label (Karla, all-caps, terracotta) + headline (Fraunces 900) + subheadline + 3 CTAs
- Headline: *"I build systems that turn your data into decisions."*
- Subheadline: *"CPA + full-stack developer with 10+ years building financial and web systems for Filipino businesses."*
- CTAs: View Works (filled terracotta button), About Me (outlined), Contact Me (text link)
- Scroll indicator SVG recolored terracotta; animates entry from dark into light body below

**Result Pillars Section (light cream):**
- 3 cards on warm cream: Finance Systems · Web Applications · Data Pipelines
- Each card: Fraunces heading, Karla body, terracotta icon/accent
- Stagger-reveal animation on scroll entry (Framer Motion)

### 3.2 About (`/about`)

- Warm cream body throughout
- **Opening statement:** Results-first paragraph replacing generic bio
- **Skills grid:** Pill badges — cream fill, terracotta border on rest; hover fills to espresso with cream text + slight scale
- **Experience timeline:** Two-column card layout; terracotta left border per card, cream card background, subtle shadow
- **Brain SVG:** Retains scroll-progress rotation animation; recolored stroke to terracotta
- **Closing CTA strip:** Full-width espresso band, cream Fraunces heading, terracotta button

### 3.3 Portfolio (`/portfolio`)

- Horizontal scroll mechanic retained
- **Project cards:** Warm cream background, Fraunces project name, Karla description, terracotta tech-stack pill badges
- **Lightbox:** Overlay darkened to espresso tone, terracotta close/nav accents
- **"Hire Me" rotating SVG text:** Recolored to terracotta
- **"Do you have a project?" CTA slide:** Espresso background, cream + terracotta text

### 3.4 Resume (`/resume`)

- **HTML resume:** Fraunces for name + section headers, Karla for all body text; terracotta section dividers and accent lines
- **PDF export:** Updated to match — same font/color choices applied to `@react-pdf/renderer` styles
- Background: warm cream; section separators use `--color-body-bg-alt`

### 3.5 Contact (`/contact`)

- Warm cream page background
- **Contact card:** Espresso card (`#2d1f14`), cream text, terracotta input focus borders
- **"Hello World!" animation:** Retained, recolored to terracotta on dark card background
- **Form inputs:** Dark warm fill (`#1a110a`) with terracotta focus ring, cream placeholder text
- **Submit button:** Filled terracotta, espresso text, loading/success states retained

### Navbar

- Light mode: cream background, espresso text, terracotta active link underline
- Dark mode: espresso background, cream text
- Logo "JET.dev" in Fraunces italic
- Theme toggle (sun/moon) styled to match palette
- Mobile hamburger menu: SVG morph animation retained, recolored

### Page Transitions

- Existing slide overlay retained; overlay color changed from dark slate → `#2d1f14` (espresso)

---

## 4. Animations

All existing Framer Motion animations are retained and recolored to match the new palette. New additions:

| Animation | Where | Details |
|---|---|---|
| Hero photo parallax | Home hero | `hero.png` scrolls at 0.85x speed relative to content |
| Result pillars stagger | Home below hero | Each pillar fades + slides up with 0.15s delay between them, triggered by scroll entry |
| Skill badge hover | About skills grid | `background` fill transition 200ms ease + `scale(1.04)` |
| Page transition color | All transitions | Overlay color updated to `#2d1f14` |

---

## 5. Technical Notes

- CSS custom properties (`--color-*`) defined in `globals.css` for both light and dark modes
- Fraunces + Karla loaded via `next/font/google` in `layout.tsx`, replacing current Inter
- Tailwind config extended with new color tokens matching CSS variables
- No new dependencies required — all changes use existing stack (Framer Motion, Tailwind, shadcn/ui)
- Existing component file structure preserved; files edited in-place

---

## 6. Out of Scope

- New pages or routes
- Content changes beyond headline/subheadline copy
- EmailJS configuration changes
- New npm packages
