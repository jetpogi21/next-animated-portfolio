"use client";
import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { FormEventHandler, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2, GitBranch, Globe } from "lucide-react";

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
      await emailjs.sendForm(serviceID, templateID, form.current, { publicKey });
      setSuccess(true);
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
    <PageTransitionContainer margin="none">
      <div
        className="w-full"
        style={{ backgroundColor: "var(--color-hero-bg-deep)" }}
      >
        <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col sm:flex-row gap-12 items-center">

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
                    href="https://github.com/jetpogi21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    style={{
                      borderColor: "var(--color-hero-bg)",
                      color: "var(--color-text-on-dark-muted)",
                      fontFamily: "var(--font-karla)",
                    }}
                  >
                    <GitBranch className="size-3" /> GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/jet-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    style={{
                      borderColor: "var(--color-hero-bg)",
                      color: "var(--color-text-on-dark-muted)",
                      fontFamily: "var(--font-karla)",
                    }}
                  >
                    <Globe className="size-3" /> LinkedIn
                  </a>
                  <a
                    href="https://www.freelancer.com/u/jonathanpradas"
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
