# Contact Page Redesign — Design Spec

**Date:** 2026-04-19  
**Status:** Approved

## Problem

Two issues with the current Contact page:
1. Content sits too close to the top of the screen — no breathing room below the navbar
2. The form layout feels flat and dated — a single centered card with labeled box inputs

## Solution

Redesign the Contact page with a **split two-column layout** on desktop, stacking to single column on mobile. Fix top spacing with generous padding.

---

## Layout

**Page background:** `var(--color-hero-bg-deep)` (dark espresso `#1a1008`) — matches current dark tone.

**Top padding:** `pt-20` (5rem) to push content well below the navbar.

**Two columns** side by side on `sm:` and above, stacked on mobile:

### Left Panel (`flex: 1`)

- Terracotta uppercase eyebrow: `"Get in touch"`
- Large Fraunces serif headline: `"Let's work together."` (two lines, bold)
- Muted body copy: availability statement (freelance, consulting, full-time, 24h response)
- Divider line (`border-top`)
- Email address with terracotta uppercase label
- Social links row: GitHub, LinkedIn, Freelancer — each as a small pill/badge (`border border-[var(--color-border)] rounded text-xs`)

### Right Panel (`flex: 1.1`)

- Background: `var(--color-hero-bg)` (espresso `#2d1f14`), `rounded-xl`, padding `p-7`
- **Inputs:** underline-only style — `border-b border-[var(--color-border)]`, transparent background, no box border. Labels are terracotta uppercase xs tracking-wide.
- Fields: Name, Email, Message (textarea, ~5 rows)
- **Send button:** `bg-[var(--color-accent)] text-[var(--color-hero-bg-deep)]`, uppercase, letter-spaced, `rounded`, self-aligned right. Shows spinner on loading, "message sent" on success, error text on failure.

---

## Responsive

- **Mobile:** columns stack — left panel on top, form card below. Left panel padding-right removed.
- **Desktop (`sm:flex-row`):** side by side with `gap-12` between panels.

---

## Files Changed

| File | Change |
|------|--------|
| `src/app/contact/_components/Contact.tsx` | Full layout rewrite — split two-column, new input style, social links, top padding |

The `Greetings` component (animated "Hello World!") is removed — it's not part of the new design. The `ContactForm` logic (emailjs, loading/success/error states) is preserved exactly.

---

## What Does NOT Change

- EmailJS integration logic (`sendEmail`, env vars, loading/success/error state)
- `PageTransitionContainer` wrapper
- Navbar, page transitions, font stack
