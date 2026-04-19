# Portfolio Full Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all 5 pages of the portfolio with a Warm Editorial aesthetic — espresso/terracotta/cream palette, Fraunces + Karla typography, dark immersive hero, results-focused copy.

**Architecture:** CSS custom properties in `globals.css` define the entire palette; fonts are loaded in `layout.tsx` via `next/font/google` and applied globally; every page/component is edited in-place with no new files or dependencies.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Framer Motion 12, next-themes, shadcn/ui

---

## File Map

| File | Change |
|---|---|
| `src/app/globals.css` | Replace color tokens, add `--color-*` variables, remove old gradient background |
| `src/app/layout.tsx` | Replace Inter with Fraunces + Karla via `next/font/google` |
| `src/components/Navbar.tsx` | Restyle logo (Fraunces italic), active link indicator, hamburger stroke, mobile menu bg |
| `src/components/TransitionProvider.tsx` | Change overlay gradient to espresso |
| `src/app/_components/Home.tsx` | Dark hero layout, new copy, result pillars section |
| `src/app/about/_components/About.tsx` | Restyle skills, timeline, closing CTA strip, Brain SVG color |
| `src/app/about/_components/Brain.tsx` | Change SVG stroke color to terracotta |
| `src/app/portfolio/_components/Portfolio.tsx` | Restyle project cards, CTA slide, badges |
| `src/app/contact/_components/Contact.tsx` | Restyle card to espresso, input styles, greeting color |
| `src/app/resume/_components/MyDocument.tsx` | Update PDF colors and font to Fraunces-equivalent (Helvetica bold for display), Karla-equivalent |
| `src/app/resume/_components/ResumeHTML.tsx` | Restyle HTML resume with new palette and typography classes |

---

## Task 1: Design Tokens — globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the CSS variable block in globals.css**

Open `src/app/globals.css`. Replace the entire `:root` and `.dark` blocks (and the `body` gradient background in `TransitionProvider`) with the warm editorial tokens. The file currently has shadcn HSL variables — replace just the color variable section while keeping the `--radius` and animation keyframes.

Replace from line 1 through the end of `.dark { }` with:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --radius: 0.5rem;
  --header-h: 6rem;

  /* Warm Editorial Palette */
  --color-hero-bg: #2d1f14;
  --color-hero-bg-deep: #1a110a;
  --color-body-bg: #f8f3ed;
  --color-body-bg-alt: #ede8e0;
  --color-accent: #d4956a;
  --color-accent-hover: #c07d52;
  --color-text-primary: #2d1f14;
  --color-text-secondary: #7a5c45;
  --color-text-on-dark: #f8f3ed;
  --color-text-on-dark-muted: #c4a882;
  --color-border: #d4b896;
  --color-border-light: #e8d5c0;

  /* shadcn/ui compatibility mappings */
  --background: var(--color-body-bg);
  --foreground: var(--color-text-primary);
  --card: var(--color-body-bg);
  --card-foreground: var(--color-text-primary);
  --popover: var(--color-body-bg);
  --popover-foreground: var(--color-text-primary);
  --primary: var(--color-hero-bg);
  --primary-foreground: var(--color-text-on-dark);
  --secondary: var(--color-body-bg-alt);
  --secondary-foreground: var(--color-text-primary);
  --muted: var(--color-body-bg-alt);
  --muted-foreground: var(--color-text-secondary);
  --accent: var(--color-accent);
  --accent-foreground: var(--color-text-on-dark);
  --destructive: #c0392b;
  --border: var(--color-border-light);
  --input: var(--color-border-light);
  --ring: var(--color-accent);
}

.dark {
  --color-body-bg: #1a110a;
  --color-body-bg-alt: #2d1f14;
  --color-text-primary: #f8f3ed;
  --color-text-secondary: #c4a882;
  --color-border: #4a3020;
  --color-border-light: #3a2418;

  --background: var(--color-body-bg);
  --foreground: var(--color-text-primary);
  --card: var(--color-body-bg-alt);
  --card-foreground: var(--color-text-primary);
  --popover: var(--color-body-bg-alt);
  --popover-foreground: var(--color-text-primary);
  --primary: var(--color-text-on-dark);
  --primary-foreground: var(--color-hero-bg);
  --secondary: var(--color-body-bg-alt);
  --secondary-foreground: var(--color-text-primary);
  --muted: var(--color-body-bg-alt);
  --muted-foreground: var(--color-text-secondary);
  --accent: var(--color-accent);
  --accent-foreground: var(--color-hero-bg);
  --destructive: #e74c3c;
  --border: var(--color-border);
  --input: var(--color-border);
  --ring: var(--color-accent);
}

* {
  border-color: var(--color-border-light);
}

body {
  background-color: var(--color-body-bg);
  color: var(--color-text-primary);
  font-family: var(--font-karla), sans-serif;
}
```

Keep the `@keyframes accordion-down` and `@keyframes accordion-up` blocks at the bottom unchanged.

- [ ] **Step 2: Verify dev server compiles without errors**

```bash
cd c:/Users/ACER/Desktop/web-development/portfolio && npm run dev
```

Expected: Server starts, no CSS compilation errors in terminal.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: replace color tokens with warm editorial palette"
```

---

## Task 2: Typography — layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace Inter with Fraunces + Karla**

Open `src/app/layout.tsx`. Replace the entire file content with:

```tsx
import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import TransitionProvider from "@/components/TransitionProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "700", "900"],
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jonathan Pradas — Full-Stack Developer & CPA",
  description:
    "I build systems that turn your data into decisions. CPA + full-stack developer with 10+ years building financial and web systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${karla.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TransitionProvider disableAnimation={false}>
            {children}
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify fonts load**

Open browser at `http://localhost:3000`. Open DevTools → Network → Fonts. Confirm `fraunces` and `karla` font files are loading. Headings should visibly change from Inter.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "style: replace Inter with Fraunces + Karla variable fonts"
```

---

## Task 3: Navbar Restyling

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Update Navbar with new palette**

Open `src/components/Navbar.tsx`. Make these targeted changes:

**3a. Logo — change "JET.dev" to use Fraunces italic:**

Find the logo JSX (around line 40–52). Replace the logo text span with:
```tsx
<span
  className="text-xl italic font-bold tracking-tight"
  style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-text-primary)" }}
>
  JET.dev
</span>
```

**3b. Hamburger stroke color — change from hardcoded gray to espresso:**

Find `stroke: "hsl(0, 0%, 18%)"` (line ~88). Replace with:
```tsx
stroke: "var(--color-text-primary)"
```

**3c. Mobile fullscreen menu background — replace slate colors:**

Find the `FullScreenMenu` component. Change its outer div className from:
```
bg-secondary dark:bg-slate-950
```
to:
```
bg-[#f8f3ed] dark:bg-[#1a110a]
```

**3d. Active nav link indicator — replace red/blue with terracotta:**

Find the active link styling. Replace any `text-red-400` or similar accent with:
```
text-[#d4956a]
```
And any active underline/border with:
```
border-[#d4956a]
```

- [ ] **Step 2: Verify navbar renders correctly**

Visit `http://localhost:3000`. Check:
- Logo renders in Fraunces italic
- Mobile menu (resize to < 768px) shows cream/espresso background
- No hardcoded slate colors visible

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "style: restyle navbar with warm editorial palette and Fraunces logo"
```

---

## Task 4: Page Transition Overlay

**Files:**
- Modify: `src/components/TransitionProvider.tsx`

- [ ] **Step 1: Change transition overlay color and page background**

Open `src/components/TransitionProvider.tsx`.

**4a. Change the outer wrapper background gradient** (currently `dark:from-slate-950 dark:to-slate-900 from-slate-50 to-red-100`):

Find the main wrapper div className containing that gradient string. Replace it with:
```tsx
className="w-screen min-h-screen bg-[var(--color-body-bg)]"
```

**4b. Change the two transition overlay divs** from dark slate to espresso. Find the two animated `motion.div` elements that create the slide-in/out overlay. Their className likely contains `bg-black` or `bg-slate-950`. Replace with:
```
bg-[#2d1f14]
```

- [ ] **Step 2: Verify transition**

Navigate between pages (e.g. Home → About). The slide overlay should be espresso brown, not black/slate. Background should be warm cream.

- [ ] **Step 3: Commit**

```bash
git add src/components/TransitionProvider.tsx
git commit -m "style: change page transition overlay to espresso and body bg to warm cream"
```

---

## Task 5: Home Page — Dark Hero + Result Pillars

**Files:**
- Modify: `src/app/_components/Home.tsx`

- [ ] **Step 1: Replace Home.tsx with dark hero + pillars layout**

Open `src/app/_components/Home.tsx`. Replace the entire file with:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const pillars = [
  {
    title: "Finance Systems",
    body: "Accounting workflows, reporting dashboards, and data pipelines built on a decade of CPA practice.",
    icon: "₱",
  },
  {
    title: "Web Applications",
    body: "Full-stack Next.js apps — from database schema to deployed product, end to end.",
    icon: "⬡",
  },
  {
    title: "Data Pipelines",
    body: "SQL, PostgreSQL, Supabase — structured data that flows cleanly from source to insight.",
    icon: "◈",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div className="flex flex-col">
      {/* Dark Hero */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "var(--color-hero-bg)" }}
      >
        {/* Photo — bleeds to right edge */}
        <motion.div
          style={{ y: imageY }}
          className="absolute right-0 top-0 h-full w-1/2 hidden md:block"
        >
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to right, var(--color-hero-bg) 0%, transparent 50%)",
            }}
          />
          <Image
            src="/hero.png"
            alt="Jonathan Pradas"
            fill
            className="object-cover object-top"
            priority
          />
        </motion.div>

        {/* Text content */}
        <div className="relative z-20 px-8 md:px-16 lg:px-24 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs tracking-[4px] uppercase mb-4 font-medium"
            style={{
              fontFamily: "var(--font-karla)",
              color: "var(--color-accent)",
            }}
          >
            Full-Stack Developer · CPA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] mb-6"
            style={{
              fontFamily: "var(--font-fraunces)",
              color: "var(--color-text-on-dark)",
            }}
          >
            I build systems that turn your data into{" "}
            <span style={{ color: "var(--color-accent)" }}>decisions.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base md:text-lg leading-relaxed mb-10"
            style={{
              fontFamily: "var(--font-karla)",
              color: "var(--color-text-on-dark-muted)",
            }}
          >
            CPA + full-stack developer with 10+ years building financial and web
            systems for Filipino businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/portfolio"
              className="px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors duration-200"
              style={{
                fontFamily: "var(--font-karla)",
                backgroundColor: "var(--color-accent)",
                color: "var(--color-hero-bg)",
              }}
            >
              View Works →
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 text-sm font-semibold tracking-wide uppercase border transition-colors duration-200"
              style={{
                fontFamily: "var(--font-karla)",
                borderColor: "var(--color-accent)",
                color: "var(--color-accent)",
              }}
            >
              About Me
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors duration-200"
              style={{
                fontFamily: "var(--font-karla)",
                color: "var(--color-text-on-dark-muted)",
              }}
            >
              Contact Me
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Result Pillars */}
      <section
        className="py-24 px-8 md:px-16 lg:px-24"
        style={{ backgroundColor: "var(--color-body-bg)" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[4px] uppercase font-medium mb-12"
          style={{
            fontFamily: "var(--font-karla)",
            color: "var(--color-accent)",
          }}
        >
          What I deliver
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-8 border"
              style={{
                borderColor: "var(--color-border-light)",
                backgroundColor: "var(--color-body-bg-alt)",
              }}
            >
              <div
                className="text-3xl mb-4"
                style={{ color: "var(--color-accent)" }}
              >
                {pillar.icon}
              </div>
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "var(--font-fraunces)",
                  color: "var(--color-text-primary)",
                }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: "var(--font-karla)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify home page visually**

Visit `http://localhost:3000`. Check:
- Dark espresso hero with photo bleeding right
- Fraunces headline with terracotta accent word
- Three cream pillars below with stagger animation on scroll
- All three CTAs visible

- [ ] **Step 3: Restyle ScrollSvg to terracotta**

Open `src/components/ScrollSvg.tsx`. Find any hardcoded stroke or fill color on the SVG paths/circles. Replace with `#d4956a` so the scroll indicator matches the hero.

- [ ] **Step 4: Commit**

```bash
git add src/app/_components/Home.tsx src/components/ScrollSvg.tsx
git commit -m "feat: redesign home page with dark immersive hero and result pillars"
```

---

## Task 6: About Page Restyling

**Files:**
- Modify: `src/app/about/_components/About.tsx`
- Modify: `src/app/about/_components/Brain.tsx`

- [ ] **Step 1: Restyle About.tsx**

Open `src/app/about/_components/About.tsx`. Make these targeted changes (do not rewrite the whole file — the animation logic and scroll behavior must be preserved):

**6a. Biography section heading and text — find and update color classes:**

Replace `text-red-400` (used on "BIOGRAPHY", "SKILLS", "EXPERIENCE" headings) with:
```
text-[#d4956a]
```

Replace `bg-primary text-primary-foreground` on skill badges with:
```
border border-[#d4956a] text-[#7a5c45] hover:bg-[#2d1f14] hover:text-[#f8f3ed] hover:scale-[1.04] transition-all duration-200 cursor-default
```

**6b. Timeline circle indicator — replace `ring-red-400` with terracotta:**

Find `ring-4 ring-red-400 bg-white`. Replace with:
```
ring-4 ring-[#d4956a] bg-[#f8f3ed]
```

**6c. Experience card left border — find the timeline card container.** Add a left border:
```
border-l-2 border-[#d4956a] pl-4
```

**6d. Closing CTA strip (LastSection) — replace its background.** Find the section with links to portfolio/resume/contact. Wrap its outer div with:
```
style={{ backgroundColor: "var(--color-hero-bg)" }}
```
And change text colors inside to `text-[#f8f3ed]` for headings and `text-[#c4a882]` for body text. Change CTA link button to terracotta:
```
bg-[#d4956a] text-[#2d1f14]
```

**6e. Main container background:**

Find the outermost div of the About component. Add:
```
style={{ backgroundColor: "var(--color-body-bg)" }}
```

- [ ] **Step 2: Restyle Brain.tsx stroke color**

Open `src/app/about/_components/Brain.tsx`. Find all `stroke` attributes on the SVG paths. Replace their values with `#d4956a` (or the CSS variable string `"var(--color-accent)"`). There will likely be a single stroke color applied to all paths — change it to terracotta.

- [ ] **Step 3: Verify About page**

Visit `http://localhost:3000/about`. Check:
- Cream background body
- Terracotta section labels
- Skill badges with terracotta border, hover to espresso fill
- Timeline has terracotta ring and left border
- Brain SVG is terracotta
- Closing strip is dark espresso with cream text

- [ ] **Step 4: Commit**

```bash
git add src/app/about/_components/About.tsx src/app/about/_components/Brain.tsx
git commit -m "style: restyle about page with warm editorial palette and terracotta accents"
```

---

## Task 7: Portfolio Page Restyling

**Files:**
- Modify: `src/app/portfolio/_components/Portfolio.tsx`

- [ ] **Step 1: Restyle project cards and CTA slide**

Open `src/app/portfolio/_components/Portfolio.tsx`. Make these targeted changes:

**7a. Page/section background:**

Find the outermost wrapper div. Add:
```
style={{ backgroundColor: "var(--color-body-bg)" }}
```

**7b. Project name headings — apply Fraunces:**

Find each project title `<h2>` or `<h3>`. Add:
```
style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-text-primary)" }}
```

**7c. Tech stack badges — replace any `bg-primary` or slate/gray classes:**

Replace tech badge className with:
```
px-2 py-1 text-xs font-medium border rounded-sm
```
And add:
```
style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-karla)" }}
```

**7d. Lightbox overlay — darken to espresso:**

Find the `LightboxDemo` component usage or import in `Portfolio.tsx`. Open `src/app/portfolio/_components/LightboxDemo.tsx`. Add a `styles` prop to the `<Lightbox>` component:
```tsx
styles={{
  container: { backgroundColor: "rgba(26, 17, 10, 0.95)" },
  navigationPrev: { color: "#d4956a" },
  navigationNext: { color: "#d4956a" },
}}
```

**7e. "Do you have a project?" CTA slide — restyle to espresso:**

Find the last slide div. Replace its background class with:
```
style={{ backgroundColor: "var(--color-hero-bg)" }}
```
Change the heading text to `text-[#f8f3ed]`.

Find the rotating SVG text element (`<textPath>`). Change its fill to `#d4956a`.

Find the "Hire Me" button/link. Change to:
```
bg-[#d4956a] text-[#2d1f14]
```

**7e. Slide background for each project card:**

Find each project slide container. Add:
```
style={{ backgroundColor: "var(--color-body-bg-alt)" }}
```

- [ ] **Step 2: Verify portfolio page**

Visit `http://localhost:3000/portfolio`. Check:
- Project cards have cream background
- Fraunces project names
- Terracotta tech badges
- Last "Hire Me" slide is dark espresso with terracotta rotating text
- Lightbox opens (click an image to confirm it still works)

- [ ] **Step 3: Commit**

```bash
git add src/app/portfolio/_components/Portfolio.tsx
git commit -m "style: restyle portfolio page with warm editorial palette"
```

---

## Task 8: Contact Page Restyling

**Files:**
- Modify: `src/app/contact/_components/Contact.tsx`

- [ ] **Step 1: Restyle contact card and form**

Open `src/app/contact/_components/Contact.tsx`. Make these targeted changes:

**8a. Page background:**

Find the outermost wrapper div. Add:
```
style={{ backgroundColor: "var(--color-body-bg)" }}
```

**8b. Contact card background — change to espresso:**

Find the card/container div that wraps the form. Replace its background class (likely `bg-white dark:bg-...`) with:
```
style={{ backgroundColor: "var(--color-hero-bg)" }}
```

**8c. "Hello World!" greeting text — recolor to terracotta:**

Find the `Greeting` component or the span with the animated text. Change its color class to:
```
style={{ color: "var(--color-accent)" }}
```

**8d. Form input backgrounds and borders:**

Find Input and Textarea elements. Replace their className styling with dark warm inputs:
```
style={{ backgroundColor: "var(--color-hero-bg-deep)", color: "var(--color-text-on-dark)", borderColor: "var(--color-border)" }}
```
Add focus ring override:
```
className="focus:ring-[#d4956a] focus:border-[#d4956a]"
```

**8e. Labels — change to cream:**
```
style={{ color: "var(--color-text-on-dark-muted)", fontFamily: "var(--font-karla)" }}
```

**8f. Submit button — change to terracotta:**

Find the submit button. Replace its variant styling with inline style:
```
style={{ backgroundColor: "var(--color-accent)", color: "var(--color-hero-bg)" }}
```

**8g. Card text (headings/subtext) — change to cream:**

Any headings inside the card: `style={{ color: "var(--color-text-on-dark)" }}`
Secondary text: `style={{ color: "var(--color-text-on-dark-muted)" }}`

- [ ] **Step 2: Verify contact page**

Visit `http://localhost:3000/contact`. Check:
- Cream page background
- Espresso card with cream text
- Terracotta "Hello World!" greeting
- Dark input fields with terracotta focus border
- Terracotta submit button

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/_components/Contact.tsx
git commit -m "style: restyle contact page — espresso card, terracotta accents"
```

---

## Task 9: Resume Page Restyling

**Files:**
- Modify: `src/app/resume/_components/ResumeHTML.tsx`
- Modify: `src/app/resume/_components/MyDocument.tsx`

- [ ] **Step 1: Restyle ResumeHTML.tsx**

Open `src/app/resume/_components/ResumeHTML.tsx`. Replace the file content with a fully styled HTML resume:

```tsx
import { resumeInfo } from "../_lib/resume-info";

export default function ResumeHTML() {
  const r = resumeInfo;
  return (
    <div
      className="max-w-4xl mx-auto my-8 shadow-lg"
      style={{ backgroundColor: "var(--color-body-bg)", fontFamily: "var(--font-karla)" }}
    >
      {/* Header */}
      <div
        className="px-10 py-8"
        style={{ backgroundColor: "var(--color-hero-bg)" }}
      >
        <h1
          className="text-4xl font-black tracking-tight mb-1"
          style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-text-on-dark)" }}
        >
          {r.name}
        </h1>
        <p
          className="text-sm tracking-[3px] uppercase mb-4"
          style={{ color: "var(--color-accent)" }}
        >
          {r.title} · Full-Stack Developer
        </p>
        <div className="flex flex-wrap gap-4 text-xs" style={{ color: "var(--color-text-on-dark-muted)" }}>
          <span>{r.phoneNumber}</span>
          <span>{r.emailAddress}</span>
          <span>{r.location}</span>
          <span>{r.website}</span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className="w-2/5 px-8 py-8 border-r"
          style={{ borderColor: "var(--color-border-light)", backgroundColor: "var(--color-body-bg-alt)" }}
        >
          <section className="mb-8">
            <h2
              className="text-xs tracking-[3px] uppercase font-semibold mb-4"
              style={{ color: "var(--color-accent)" }}
            >
              Education
            </h2>
            <p className="font-semibold text-sm" style={{ color: "var(--color-text-primary)" }}>
              {r.education.school}
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
              {r.education.degree}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
              {r.education.year} · Magna Cum Laude
            </p>
          </section>

          <section>
            <h2
              className="text-xs tracking-[3px] uppercase font-semibold mb-4"
              style={{ color: "var(--color-accent)" }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {r.skills.map((skill: string) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs border"
                  style={{
                    borderColor: "var(--color-accent)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Main */}
        <div className="w-3/5 px-8 py-8">
          <section className="mb-8">
            <h2
              className="text-xs tracking-[3px] uppercase font-semibold mb-6"
              style={{ color: "var(--color-accent)" }}
            >
              Experience
            </h2>
            {r.workExperiences.map((job: { company: string; role: string; period: string; responsibilities: string[] }, i: number) => (
              <div
                key={i}
                className="mb-6 pl-4 border-l-2"
                style={{ borderColor: "var(--color-accent)" }}
              >
                <p
                  className="font-bold text-sm"
                  style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-text-primary)" }}
                >
                  {job.company}
                </p>
                <p className="text-xs mb-1" style={{ color: "var(--color-accent)" }}>
                  {job.role}
                </p>
                <p className="text-xs mb-2" style={{ color: "var(--color-text-secondary)" }}>
                  {job.period}
                </p>
                <ul className="space-y-1">
                  {job.responsibilities.map((r: string, j: number) => (
                    <li key={j} className="text-xs leading-relaxed flex gap-2" style={{ color: "var(--color-text-secondary)" }}>
                      <span style={{ color: "var(--color-accent)" }}>·</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update PDF color constants in MyDocument.tsx**

Open `src/app/resume/_components/MyDocument.tsx`. Find the color constant declarations near the top (lines ~30–65). Replace the color values:

```tsx
// Replace existing color constants with:
const ESPRESSO = "#2d1f14";
const CREAM = "#f8f3ed";
const CREAM_ALT = "#ede8e0";
const TERRACOTTA = "#d4956a";
const TEXT_SECONDARY = "#7a5c45";
const BORDER_LIGHT = "#e8d5c0";
```

Then find and replace color usages:
- `#685D5D` (text color) → `ESPRESSO`
- `#E5E5E5` (border/bg color) → `CREAM_ALT`
- Any dark background color on the sidebar → `CREAM_ALT`
- Section header colors → `TERRACOTTA`
- Name/title color → `ESPRESSO`

- [ ] **Step 3: Verify resume page**

Visit `http://localhost:3000/resume`. Check:
- HTML resume shows with espresso header, cream body, terracotta accents
- PDF viewer loads (may take a moment — it uses dynamic import)

- [ ] **Step 4: Commit**

```bash
git add src/app/resume/_components/ResumeHTML.tsx src/app/resume/_components/MyDocument.tsx
git commit -m "style: restyle resume — HTML and PDF versions with warm editorial palette"
```

---

## Task 10: Final Polish Pass

**Files:**
- Modify: `src/app/globals.css` (scrollbar colors)
- Modify: `src/components/TransitionProvider.tsx` (text color during transition)

- [ ] **Step 1: Update scrollbar styling**

Open `src/app/globals.css`. Find any `scrollbar-*` utility classes or CSS. Add custom scrollbar colors at the bottom of the file:

```css
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-body-bg-alt);
}
::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);
}
```

- [ ] **Step 2: Fix TransitionProvider text color**

Open `src/components/TransitionProvider.tsx`. Find the animated text element shown during transition (the text between the two overlay divs). Change its text color to `text-[#f8f3ed]` (cream on espresso overlay).

- [ ] **Step 3: Check dark mode on all pages**

Toggle dark mode via the navbar theme button. Verify on each page:
- `/` — hero stays dark, pillars go to deep espresso bg
- `/about` — body goes dark espresso
- `/portfolio` — cards go dark espresso
- `/contact` — card stays dark, page bg goes dark
- `/resume` — HTML resume goes dark

Fix any pages where colors break in dark mode by auditing hardcoded hex values and replacing with CSS variables.

- [ ] **Step 4: Mobile responsiveness check**

Resize browser to 375px wide. Verify:
- Home hero: text readable, photo hidden (mobile), CTAs stack vertically
- About: skill badges wrap correctly
- Portfolio: horizontal scroll still works
- Contact: card full-width

- [ ] **Step 5: Final commit**

```bash
git add src/app/globals.css src/components/TransitionProvider.tsx
git commit -m "style: scrollbar theming and transition text color polish"
```

---

## Verification Checklist

After all tasks complete:

- [ ] All 5 pages use Fraunces for headings, Karla for body
- [ ] Color palette: espresso, cream, terracotta — no leftover slate/red-400/blue
- [ ] Dark mode works across all pages
- [ ] Home hero parallax works on scroll
- [ ] Result pillars animate in on scroll (stagger)
- [ ] About skill badge hover: fills espresso
- [ ] Portfolio lightbox still opens images
- [ ] Contact form submits (EmailJS — test with real email if env vars set)
- [ ] Resume HTML renders correctly
- [ ] All page transitions use espresso overlay
- [ ] No console errors on any page
- [ ] Mobile layout intact on all pages
