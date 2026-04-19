# Contact Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Contact page with a split two-column layout, underline-only inputs, social links panel, and generous top spacing.

**Architecture:** Single file change — rewrite `Contact.tsx` layout only. The EmailJS logic, loading/success/error state, and `PageTransitionContainer` wrapper are preserved. The `Greetings` animated component is removed. No new files or components needed.

**Tech Stack:** Next.js 16, React 19, Framer Motion 12, Tailwind CSS 4, EmailJS, Lucide React

---

## Files Modified

| File | Change |
|------|--------|
| `src/app/contact/_components/Contact.tsx` | Full layout rewrite — split two-column, underline inputs, social links, top padding. EmailJS logic unchanged. |

---

## Task 1: Rewrite Contact.tsx layout

**Files:**
- Modify: `src/app/contact/_components/Contact.tsx`

- [ ] **Step 1: Read the current file**

Open `src/app/contact/_components/Contact.tsx` and note:
- The `sendEmail` handler, `loading`, `success`, `error` state, and `form` ref — these are preserved exactly
- The `getButtonCaption` helper — preserved exactly
- The `Greetings` component — removed in new design
- The `useScroll` import — no longer needed, remove it

- [ ] **Step 2: Replace the file with the new layout**

Replace the entire file contents with:

```tsx
"use client";
import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { FormEventHandler, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2, Github, Linkedin, Globe } from "lucide-react";

const getButtonCaption = (
  success: boolean,
  error: boolean,
  loading: boolean
) => {
  if (loading) return <Loader2 className="size-4 animate-spin" />;
  if (error) return "something went wrong!";
  return success ? "message sent" : "send message →";
};

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const buttonCaption = getButtonCaption(success, error, loading);

  const sendEmail: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!form.current) return;
    setLoading(true);
    try {
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;
      if (!publicKey) throw new Error("EmailJS public key is missing");
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      if (!serviceID) throw new Error("EmailJS service ID is missing");
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      if (!templateID) throw new Error("EmailJS template ID is missing");
      emailjs
        .sendForm(serviceID, templateID, form.current, { publicKey })
        .then(() => setSuccess(true))
        .catch((err) => {
          console.error("Failed to send email:", err);
          setError(true);
        });
    } catch (err) {
      console.error("Error sending email:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={sendEmail}
      ref={form}
      className="flex flex-col gap-7"
    >
      <input type="hidden" name="contact_number" value="1" />

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="user_name"
          className="text-[0.6rem] uppercase tracking-widest"
          style={{ color: "var(--color-accent)" }}
        >
          Name
        </label>
        <input
          required
          type="text"
          name="user_name"
          id="user_name"
          placeholder="Your full name"
          className="bg-transparent border-b pb-2 text-sm outline-none placeholder:opacity-30 focus:border-b-[var(--color-accent)]"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-on-dark)",
            fontFamily: "var(--font-karla)",
          }}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="user_email"
          className="text-[0.6rem] uppercase tracking-widest"
          style={{ color: "var(--color-accent)" }}
        >
          Email
        </label>
        <input
          required
          type="email"
          name="user_email"
          id="user_email"
          placeholder="you@example.com"
          className="bg-transparent border-b pb-2 text-sm outline-none placeholder:opacity-30 focus:border-b-[var(--color-accent)]"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-on-dark)",
            fontFamily: "var(--font-karla)",
          }}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="message"
          className="text-[0.6rem] uppercase tracking-widest"
          style={{ color: "var(--color-accent)" }}
        >
          Message
        </label>
        <textarea
          required
          rows={5}
          name="message"
          id="message"
          placeholder="Your message..."
          className="bg-transparent border-b pb-2 text-sm outline-none resize-none placeholder:opacity-30 focus:border-b-[var(--color-accent)]"
          style={{
            borderColor: "var(--color-border)",
            color: "var(--color-text-on-dark)",
            fontFamily: "var(--font-karla)",
          }}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || success}
        className="self-end mt-1 px-5 py-2 rounded text-xs uppercase tracking-widest font-bold transition-opacity disabled:opacity-60"
        style={{
          backgroundColor: "var(--color-accent)",
          color: "var(--color-hero-bg-deep)",
          fontFamily: "var(--font-karla)",
        }}
      >
        {buttonCaption}
      </button>
    </form>
  );
};

export const Contact = () => {
  return (
    <PageTransitionContainer>
      <div
        className="min-h-screen w-full"
        style={{ backgroundColor: "var(--color-hero-bg-deep)" }}
      >
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-16 flex flex-col sm:flex-row gap-12">

          {/* LEFT — info panel */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p
                className="text-[0.6rem] uppercase tracking-widest mb-3"
                style={{ color: "var(--color-accent)" }}
              >
                Get in touch
              </p>
              <h1
                className="text-4xl font-bold leading-tight mb-3"
                style={{
                  color: "var(--color-text-on-dark)",
                  fontFamily: "var(--font-fraunces)",
                }}
              >
                Let&apos;s work<br />together.
              </h1>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--color-text-on-dark-muted)",
                  fontFamily: "var(--font-karla)",
                }}
              >
                Open to freelance projects, consulting engagements, and full-time roles. I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Divider + contact details */}
            <div
              className="flex flex-col gap-5 pt-5"
              style={{ borderTop: "1px solid var(--color-hero-bg)" }}
            >
              <div>
                <p
                  className="text-[0.6rem] uppercase tracking-widest mb-1"
                  style={{ color: "var(--color-accent)" }}
                >
                  Email
                </p>
                <p
                  className="text-sm"
                  style={{
                    color: "var(--color-text-on-dark)",
                    fontFamily: "var(--font-karla)",
                  }}
                >
                  jet_pradas@yahoo.com
                </p>
              </div>

              <div>
                <p
                  className="text-[0.6rem] uppercase tracking-widest mb-2"
                  style={{ color: "var(--color-accent)" }}
                >
                  Find me on
                </p>
                <div className="flex gap-2 flex-wrap">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    style={{
                      borderColor: "var(--color-hero-bg)",
                      color: "var(--color-text-on-dark-muted)",
                      fontFamily: "var(--font-karla)",
                    }}
                  >
                    <Github className="size-3" /> GitHub
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    style={{
                      borderColor: "var(--color-hero-bg)",
                      color: "var(--color-text-on-dark-muted)",
                      fontFamily: "var(--font-karla)",
                    }}
                  >
                    <Linkedin className="size-3" /> LinkedIn
                  </a>
                  <a
                    href="https://freelancer.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    style={{
                      borderColor: "var(--color-hero-bg)",
                      color: "var(--color-text-on-dark-muted)",
                      fontFamily: "var(--font-karla)",
                    }}
                  >
                    <Globe className="size-3" /> Freelancer
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — form card */}
          <div
            className="flex-[1.1] rounded-xl p-7"
            style={{ backgroundColor: "var(--color-hero-bg)" }}
          >
            <ContactForm />
          </div>

        </div>
      </div>
    </PageTransitionContainer>
  );
};
```

- [ ] **Step 3: Run build and verify it passes**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no TypeScript errors. If a lucide-react icon name is wrong (e.g. `Linkedin` vs `LinkedinIcon`), check available exports with:

```bash
node -e "const l = require('lucide-react'); console.log(Object.keys(l).filter(k => k.toLowerCase().includes('linkedin')))"
```

Fix icon names as needed.

- [ ] **Step 4: Visual check in browser**

```bash
npm run dev
```

Open `http://localhost:3000/contact`. Verify:
- [ ] Page has generous top spacing (content not jammed against navbar)
- [ ] Two columns side by side on desktop — info left, form right
- [ ] Underline-only inputs (no box borders)
- [ ] Social link pills visible with GitHub, LinkedIn, Freelancer icons
- [ ] Send button is terracotta, right-aligned
- [ ] On mobile viewport (resize to < 640px): columns stack vertically

Stop dev server when done.

- [ ] **Step 5: Commit**

```bash
git add src/app/contact/_components/Contact.tsx
git commit -m "style: redesign contact page — split layout, underline inputs, social links"
```
