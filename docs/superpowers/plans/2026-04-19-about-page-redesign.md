# About Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the UI/UX of the `/about` page across 5 areas: Biography (headline + stats), Skills (grouping + contrast), Experience (timeline rewrite), CTA (hierarchy + heading), and a scroll progress bar.

**Architecture:** All changes are in a single file — `src/app/about/_components/About.tsx`. Each section is a self-contained React component; we update them one at a time. No new files, no new dependencies.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion

---

### Task 1: Biography — role headline + stats row + remove italic

**Files:**
- Modify: `src/app/about/_components/About.tsx` (the `Biography` component, lines 96–112)

- [ ] **Step 1: Replace the `Biography` component**

Open `src/app/about/_components/About.tsx` and replace the entire `Biography` component (the `const Biography = () => { ... }` block) with:

```tsx
const Biography = () => {
  const content =
    "Hello and welcome! I'm Jonathan Pradas, a self-taught full-stack web developer and certified public accountant with a passion for crafting efficient solutions and leveraging technology to drive business success.";
  const subcontent =
    "I am deeply passionate about leveraging technology to solve complex problems and optimize business operations. Whether it's designing intuitive user interfaces, optimizing database performance, or developing custom macros, I thrive on the challenge of turning ideas into reality and delivering tangible results that exceed expectations.";
  return (
    <div className="flex flex-col gap-8 justify-center min-h-[calc(100vh-6rem)]">
      <h1>About me</h1>
      <p className="text-3xl font-bold text-foreground leading-tight">
        Full-Stack Developer &amp; Certified CPA
      </p>
      <p>{content}</p>
      <p>{subcontent}</p>
      <div className="flex gap-8">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-[#d4956a]">10+</span>
          <span className="text-xs text-muted-foreground">Years Experience</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-[#d4956a]">CPA</span>
          <span className="text-xs text-muted-foreground">Certified</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-[#d4956a]">50+</span>
          <span className="text-xs text-muted-foreground">Projects</span>
        </div>
      </div>
      <div className="flex justify-between">
        <ScrollSvg elementID="skills-section" />
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/about`. Confirm:
- "Full-Stack Developer & Certified CPA" appears in large bold text below "About me"
- Both bio paragraphs are in normal (non-italic) weight
- Three stat items (10+, CPA, 50+) appear in accent color with muted labels below
- Scroll indicator still present

- [ ] **Step 3: Commit**

```bash
git add src/app/about/_components/About.tsx
git commit -m "feat(about): add role headline and stats row to biography section"
```

---

### Task 2: Skills — grouped categories + fixed contrast + typo fix

**Files:**
- Modify: `src/app/about/_components/About.tsx` (the `skills` array and `Skills` component, lines 29–154)

- [ ] **Step 1: Replace the `skills` array with `skillGroups`**

Remove the entire `const skills = [...]` array (lines 29–43) and replace it with:

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

- [ ] **Step 2: Replace the `Skills` component**

Replace the entire `const Skills = () => { ... }` block with:

```tsx
const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "100px" });

  const enterAnimationProps = {
    initial: { x: "-300px" },
    animate: inView ? { x: 0 } : {},
    transition: { delay: 0.2 },
  };

  return (
    <div
      className="flex min-h-[calc(100vh-6rem)] items-center"
      id="skills-section"
    >
      <div ref={ref} className="flex flex-col gap-8">
        <motion.h1 {...enterAnimationProps}>Skills</motion.h1>
        <motion.div className="flex flex-col gap-6" {...enterAnimationProps}>
          {skillGroups.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                {group.label}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <div
                    key={skill}
                    className="rounded-sm px-3 py-1 text-sm border border-[#d4956a] text-[#d4956a] hover:bg-[#2d1f14] hover:text-[#f8f3ed] hover:scale-[1.04] transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
        <div>
          <ScrollSvg elementID="experience-section" />
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Verify in browser**

Scroll to the Skills section. Confirm:
- Heading is "Skills" (capitalized)
- Three category sub-labels visible: "LANGUAGES", "FRONTEND", "DATABASE & TOOLS"
- Tags are accent-colored (`#d4956a`) with visible contrast on the dark background
- "PostgreSQL" is spelled correctly (no "PostrgreSQL")
- Hover effect still works

- [ ] **Step 4: Commit**

```bash
git add src/app/about/_components/About.tsx
git commit -m "feat(about): group skills by category, fix contrast and PostgreSQL typo"
```

---

### Task 3: Experience — rewrite JobTimeline as left-aligned vertical timeline

**Files:**
- Modify: `src/app/about/_components/About.tsx` (the `JobTimeline` component and `Experience` component, lines 45–230)

- [ ] **Step 1: Replace the `JobTimeline` component**

Replace the entire `const JobTimeline = ({ ... }) => { ... }` block with:

```tsx
const JobTimeline = ({
  jobTitle,
  jobDescription,
  jobDate,
  jobCompany,
  isLast = false,
}: {
  jobTitle: string;
  jobDescription: string[];
  jobDate: string;
  jobCompany: string;
  isLast?: boolean;
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-[#d4956a] mt-1 shrink-0" />
        {!isLast && <div className="w-0.5 flex-1 bg-gray-600 mt-1" />}
      </div>
      <div className="flex flex-col gap-1 pb-8">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {jobDate} · {jobCompany}
        </span>
        <span className="text-base font-bold text-foreground">{jobTitle}</span>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
          {jobDescription.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Update the `Experience` component to pass `isLast` and add intro line**

Replace the entire `const Experience = () => { ... }` block with:

```tsx
const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const enterAnimationProps = {
    initial: { x: "-300px" },
    animate: inView ? { x: 0 } : {},
    transition: { delay: 0.2 },
  };

  return (
    <div className="flex" id="experience-section">
      <div ref={ref} className="flex flex-col gap-8 w-full">
        <motion.h1 {...enterAnimationProps}>Experience</motion.h1>
        <motion.div className="flex flex-col" {...enterAnimationProps}>
          <p className="text-sm text-muted-foreground italic mb-6">
            Professional roles I&apos;ve held
          </p>
          {experienceList.map((experience, index) => (
            <JobTimeline
              key={experience.jobCompany}
              jobCompany={experience.jobCompany}
              jobDate={experience.jobDate}
              jobDescription={experience.jobDescription}
              jobTitle={experience.jobTitle}
              isLast={index === experienceList.length - 1}
            />
          ))}
        </motion.div>
        <div>
          <ScrollSvg elementID="last-section" />
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Verify in browser**

Scroll to the Experience section. Confirm:
- Heading is "Experience" (capitalized)
- "Professional roles I've held" intro line visible
- Two jobs shown as a vertical timeline with accent dots and connecting line
- Last entry has no dangling line below its dot
- Date and company on the same line, in muted uppercase small text
- Job title bold, bullets in normal weight (not italic)
- All bullets visible (no truncation)

- [ ] **Step 4: Commit**

```bash
git add src/app/about/_components/About.tsx
git commit -m "feat(about): rewrite experience as left-aligned vertical timeline"
```

---

### Task 4: CTA — add heading, subtitle, and button hierarchy

**Files:**
- Modify: `src/app/about/_components/About.tsx` (the `LastSection` component, lines 232–278)

- [ ] **Step 1: Replace the `LastSection` component**

Replace the entire `const LastSection = () => { ... }` block with:

```tsx
const LastSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "100px" });

  const enterAnimationProps = {
    initial: { x: "-300px" },
    animate: inView ? { x: 0 } : {},
    transition: { delay: 0.2 },
  };

  return (
    <div
      className="flex min-h-[calc(100vh-6rem)] w-full items-center justify-center"
      id="last-section"
      style={{ backgroundColor: "var(--color-hero-bg)" }}
    >
      <div ref={ref}>
        <motion.div
          className="flex flex-col gap-6 items-center text-center"
          {...enterAnimationProps}
        >
          <h2 className="text-3xl font-bold text-foreground">What&apos;s next?</h2>
          <p className="text-sm text-muted-foreground max-w-xs">
            Explore my work, download my resume, or reach out directly.
          </p>
          <div className="flex flex-col gap-3 w-48">
            <Link
              href="/portfolio"
              className="px-6 py-3 rounded-sm text-base font-bold text-center bg-[#d4956a] text-[#2d1f14]"
            >
              View My Works →
            </Link>
            <Link
              href="/resume"
              className="px-6 py-3 rounded-sm text-base text-center border border-[#d4956a] text-[#d4956a]"
            >
              View My Resume →
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-sm text-base text-center border border-gray-600 text-muted-foreground"
            >
              Contact Me →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Verify in browser**

Scroll to the bottom CTA section. Confirm:
- "What's next?" heading is visible and bold
- Subtitle text appears below
- Three buttons stacked with clear visual weight difference:
  - "View My Works →" is filled accent (salmon background, dark text)
  - "View My Resume →" is outlined accent (salmon border + text)
  - "Contact Me →" is muted (gray border + muted text)
- All three links navigate correctly

- [ ] **Step 3: Commit**

```bash
git add src/app/about/_components/About.tsx
git commit -m "feat(about): add heading, subtitle, and button hierarchy to CTA section"
```

---

### Task 5: Scroll progress bar

**Files:**
- Modify: `src/app/about/_components/About.tsx` (the `About` component, lines 280–311)

- [ ] **Step 1: Add the progress bar inside the scrollable container**

In the `About` component, find the outer scrollable `div` (the one with `overflow-y-scroll` and `ref={containerRef}`). Add a `motion.div` as its **first child**, before the text container div:

```tsx
export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <PageTransitionContainer margin="right">
      <div
        className="flex overflow-y-scroll h-full gap-10 scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm scrollbar-thumb-[#d4956a] scrollbar-track-transparent scrollbar-thin"
        ref={containerRef}
        style={{ backgroundColor: "var(--color-body-bg)" }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="sticky top-0 left-0 h-0.5 bg-[#d4956a] z-10 w-full"
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
        />
        {/* Text container */}
        <div className="w-full sm:w-2/3 flex flex-col pr-8 sm:pr-0">
          <Biography />
          <Skills />
          <Experience />
          <LastSection />
        </div>
        {/* SVG */}
        <div className="hidden sm:flex w-1/3 lg:w-1/2 sticky top-0">
          <Brain scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </PageTransitionContainer>
  );
};
```

- [ ] **Step 2: Verify in browser**

Scroll through the about page slowly. Confirm:
- A thin `#d4956a` (salmon) bar is visible at the top of the content area
- It grows from left to right as you scroll down
- It reaches full width at the bottom of the page
- It does not appear above the navbar

- [ ] **Step 3: Commit**

```bash
git add src/app/about/_components/About.tsx
git commit -m "feat(about): add scroll progress bar driven by scrollYProgress"
```

---

## Self-Review

**Spec coverage:**
- ✅ Biography: headline, stats row, italic removed — Task 1
- ✅ Skills: grouping, contrast fix, typo fix, capitalization — Task 2
- ✅ Experience: left-aligned timeline, intro line, no truncation, proper hierarchy — Task 3
- ✅ CTA: heading, subtitle, button hierarchy — Task 4
- ✅ Scroll progress bar — Task 5

**Placeholder scan:** None found. All steps contain exact code.

**Type consistency:**
- `JobTimeline` props: `jobTitle`, `jobDescription`, `jobDate`, `jobCompany`, `isLast` — consistent across Task 3 component definition and `experienceList.map()` call
- `skillGroups` defined in Task 2 Step 1, consumed in Task 2 Step 2 — consistent
- `scrollYProgress` defined in `About` component, passed to both `Brain` and the progress bar `motion.div` — consistent with existing usage
