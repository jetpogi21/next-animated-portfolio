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
