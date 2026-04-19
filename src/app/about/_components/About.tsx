"use client";
import Brain from "@/app/about/_components/Brain";
import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { ScrollSvg } from "@/components/ScrollSvg";
import { motion, useInView, useScroll } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

type AboutProps = {};

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
        <div className="w-3 h-3 rounded-full bg-(--color-accent) mt-1 shrink-0" />
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
          <span className="text-2xl font-bold text-(--color-accent)">10+</span>
          <span className="text-xs text-muted-foreground">Years Experience</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-(--color-accent)">CPA</span>
          <span className="text-xs text-muted-foreground">Certified</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-(--color-accent)">50+</span>
          <span className="text-xs text-muted-foreground">Projects</span>
        </div>
      </div>
      <div className="flex justify-between">
        <ScrollSvg elementID="skills-section" />
      </div>
    </div>
  );
};

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
                    className="rounded-sm px-3 py-1 text-sm border border-(--color-accent) text-(--color-accent) hover:bg-[#2d1f14] hover:text-[#f8f3ed] hover:scale-[1.04] transition-all duration-200 cursor-default"
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

type ExperienceType = {
  jobCompany: string;
  jobDate: string;
  jobDescription: string[];
  jobTitle: string;
};

const experienceList: ExperienceType[] = [
  {
    jobCompany: "Freelancer.ph",
    jobDate: "2016 - Present",
    jobDescription: [
      "Develop and maintain responsive web applications using JavaScript, HTML, and CSS.",
      "Design and implement efficient database solutions using MySQL and PostgreSQL.",
      "Collaborate with clients to understand their financial management needs and challenges.",
      "Develop custom solutions using MS Access, MS Excel, and VBA to automate financial processes and improve reporting accuracy.",
      "Provide ongoing support and maintenance for existing web applications and financial systems.",
    ],
    jobTitle: "Freelance Full-stack developer",
  },
  {
    jobCompany: "Vibram Manufacturing Corporation",
    jobDate: "2014 - Present",
    jobDescription: [
      "Design, develop, and implement robust financial systems and processes to streamline accounting operations.",
      "Collaborate with cross-functional teams to understand business requirements and translate them into functional financial system specifications.",
      "Evaluate existing financial systems and identify areas for improvement, automation, and optimization.",
      "Customize and configure accounting software to align with organizational workflows and reporting requirements.",
    ],
    jobTitle: "Accounting Officer",
  },
];

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
          <p className="text-sm text-muted-foreground text-center max-w-xs">
            Explore my work, download my resume, or reach out directly.
          </p>
          <div className="flex flex-col gap-3 w-48">
            <Link
              href="/portfolio"
              className="px-6 py-3 rounded-sm text-base font-bold text-center bg-(--color-accent) text-[#2d1f14] transition-opacity duration-200 hover:opacity-80"
            >
              View My Works →
            </Link>
            <Link
              href="/resume"
              className="px-6 py-3 rounded-sm text-base text-center border border-(--color-accent) text-(--color-accent) transition-opacity duration-200 hover:opacity-80"
            >
              View My Resume →
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-sm text-base text-center border border-foreground/20 text-muted-foreground transition-opacity duration-200 hover:opacity-70"
            >
              Contact Me →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <PageTransitionContainer margin="right">
      <div
        className="flex flex-col overflow-y-scroll h-full scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm scrollbar-thumb-(--color-accent) scrollbar-track-transparent scrollbar-thin"
        ref={containerRef}
        style={{ backgroundColor: "var(--color-body-bg)" }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="sticky top-0 left-0 h-0.5 bg-(--color-accent) z-10 w-full origin-left shrink-0"
          style={{ scaleX: scrollYProgress }}
        />
        {/* Columns */}
        <div className="flex gap-10 flex-1">
          {/* Text container */}
          <div className="w-full sm:w-2/3 flex flex-col pr-8 sm:pr-0">
            <Biography />
            <Skills />
            <Experience />
            <LastSection />
          </div>
          {/* SVG */}
          <div className="hidden sm:flex w-1/3 lg:w-1/2 self-start sticky top-0 h-screen">
            <Brain scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </PageTransitionContainer>
  );
};
