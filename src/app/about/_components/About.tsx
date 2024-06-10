"use client";
import Brain from "@/app/about/_components/Brain";
import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { ScrollSvg } from "@/components/ScrollSvg";
import { cn, linkVariants } from "@/lib/utils";
import { motion, useInView, useScroll } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

type AboutProps = {};

const Signature = () => {
  return (
    <svg
      className="stroke-foreground w-[200px] h-[130px]"
      viewBox="0 0 303 156"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M56 50C52.0747 66.2619 44.3745 81.8104 37.6667 97.0556C31.226 111.693 24.0545 127.46 14.4444 140.333C13.2003 142 7.83953 150.321 4.72222 149.167C1.44197 147.952 2.08119 138.957 2.27778 136.5C3.87413 116.546 26.8366 105.594 41.9444 97.3333C54.3244 90.564 67.0324 84.333 79.2222 77.2222C88.3163 71.9173 96.9837 65.718 106.5 61.1667C110.199 59.3978 113.589 58.4113 116.556 55.4445C117.466 54.5338 121.677 50.5594 120.611 54.6111C118.619 62.1818 112.766 69.5871 108.556 75.9445C101.141 87.1398 93.0615 97.8676 85.5556 109C78.9668 118.772 72.255 128.49 65.9444 138.444C62.8107 143.388 60.146 149.385 56.2778 153.833C53.9726 156.484 57.6018 146.865 59.0556 143.667C64.4169 131.872 70.8898 120.709 78.1667 110C90.3931 92.0063 103.272 74.8107 117.833 58.6667C121.563 54.5321 125.396 48.5394 131.444 48.0556C139.571 47.4055 143.729 58.0481 141.833 65C138.778 76.2034 97.1652 76 108.778 76C117.852 76 126.926 76 136 76C140.201 76 143.872 73.0414 147.444 71C149.939 69.5744 152.483 64.1608 153.556 61.5556C154.403 59.4964 156.518 58.7471 158.611 59.1111C163.138 59.8983 163.248 63.7635 162.944 67.5556C162.733 70.2007 161.45 77.6841 160.611 75.1667C159.402 71.5392 169.143 63.555 172.389 63.0556C179.261 61.9983 162.446 79.869 171.278 76.7778C177.99 74.4285 183.22 71.3052 179.556 64.5C179.501 64.3991 176.528 60.6702 176.778 62.1667C177.243 64.96 188.96 69.6082 191.278 71.8333C193.054 73.5386 194.484 75.5506 196.222 77.2222C200.475 81.3112 205.109 75.433 207.778 72.2222C208.769 71.0293 216.254 61.3826 213.333 65.5556C210.771 69.2154 205.657 76.9781 206 81.7778C206.383 87.1396 224.152 69.6709 225 68.5556C234.274 56.3652 238.042 41.189 238.778 26.1111C238.88 24.0216 241.054 3.12524 238 2.00001C230.506 -0.760916 219.434 31.2565 217.778 35.6667C213.857 46.1069 213.589 64.0727 224.222 71.5556C228.849 74.8112 232.325 78.7294 238.222 79.7778C244.484 80.891 251.821 79.5644 255.222 73.5556C257.308 69.8703 261.695 53.9993 252.667 61.2222C248.546 64.519 246.634 72.102 247 77.2222C247.219 80.2869 253.681 79.3635 255.222 77.8889C257.892 75.3353 260 64.1946 260 67.8889C260 72.0716 260.825 77.0216 264 80.1111C265.835 81.8961 271.307 81.2135 273.444 80.3333C279.077 78.014 284.04 71.2796 286.778 66C288.735 62.2246 286.504 56.4705 291 54.2222C292.083 53.6806 293.819 54 295 54C297.269 54 290.446 55.3494 288.889 57C286.027 60.0334 284.669 68.8954 286.222 72.7778C287.206 75.2377 294.845 74 297 74C301.209 74 302.292 78.6156 298.778 81C294.351 84.0039 288.1 84.2666 284 87"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

const skills = [
  "Javascript",
  "Typescript",
  "MySQL",
  "PostrgreSQL",
  "MS Excel",
  "MS Access",
  "Visual Basic",
  "HTML",
  "CSS",
  "Tailwind",
  "React",
  "Next.js",
  "SQL",
];

const JobTimeline = ({
  jobTitle,
  jobDescription,
  jobDate,
  jobCompany,
}: {
  jobTitle: string;
  jobDescription: string[];
  jobDate: string;
  jobCompany: string;
}) => {
  return (
    <div className="flex justify-between gap-4 even:flex-row-reverse">
      <div className="flex-1 flex flex-col gap-2">
        <div className="bg-primary text-primary-foreground p-3 font-semibold rounded-b-lg rounded-s-lg">
          {jobTitle}
        </div>

        <div className="flex flex-col gap-2 relative text-sm italic pl-2">
          {jobDescription.map((item, index) => (
            <div
              key={index}
              className={cn("flex justify-center gap-2", {
                "hidden lg:flex": index > 2,
              })}
            >
              <div className="relative top-[3px] h-3 w-3 bg-foreground shrink-0"></div>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="text-red-400 text-sm font-semibold">{jobDate}</div>

        <div className="p-1 rounded bg-primary text-primary-foreground text-sm font-semibold w-fit">
          {jobCompany}
        </div>
      </div>
      {/* Center Line */}
      <div className="flex justify-center px-8">
        {/* LINE */}
        <div className="w-1 h-full bg-gray-600 rounded relative">
          {/* LINE CIRCLE */}
          <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

const Biography = () => {
  const content =
    "Hello and welcome! I'm Jonathan Pradas, a self-taught full-stack web developer and certified public accountant with a passion for crafting efficient solutions and leveraging technology to drive business success.";
  const subcontent =
    "I am deeply passionate about leveraging technology to solve complex problems and optimize business operations. Whether it's designing intuitive user interfaces, optimizing database performance, or developing custom macros, I thrive on the challenge of turning ideas into reality and delivering tangible results that exceed expectations.";
  return (
    <div className="flex flex-col gap-12 justify-center min-h-[calc(100vh-6rem)]">
      <h1>About me</h1>
      <p>{content}</p>
      <span className="italic">{subcontent}</span>
      <div className="flex justify-between">
        <ScrollSvg elementID="skills-section" />
        {/* <Signature /> */}
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
      <div
        ref={ref}
        className="flex flex-col gap-8"
      >
        <motion.h1 {...enterAnimationProps}>skills</motion.h1>
        <motion.div
          className="flex flex-wrap gap-2"
          {...enterAnimationProps}
        >
          {skills.map((skill) => {
            return (
              <div
                key={skill}
                className="rounded  p-2 text-sm cursor-pointer bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all ease-in-out duration-75"
              >
                {skill}
              </div>
            );
          })}
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
    <div
      className="flex"
      id="experience-section"
    >
      <div
        ref={ref}
        className="flex flex-col gap-8 w-full"
      >
        <motion.h1 {...enterAnimationProps}>experience</motion.h1>
        <motion.div
          className="flex flex-col "
          {...enterAnimationProps}
        >
          {experienceList.map((experience) => {
            return (
              <JobTimeline
                key={experience.jobCompany}
                jobCompany={experience.jobCompany}
                jobDate={experience.jobDate}
                jobDescription={experience.jobDescription}
                jobTitle={experience.jobTitle}
              />
            );
          })}
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
    >
      <div
        ref={ref}
        className="flex flex-row gap-8 items-center"
      >
        <motion.div
          className="flex flex-col gap-8 items-center"
          {...enterAnimationProps}
        >
          <Link
            href="/portfolio"
            className={cn(
              "px-4 py-2 rounded-sm text-3xl",
              linkVariants({ variant: "active" })
            )}
          >
            View My Works
          </Link>
          <Link
            href="/resume"
            className={cn(
              "px-4 py-2 rounded-sm text-3xl",
              linkVariants({ variant: "active" })
            )}
          >
            View My Resume
          </Link>
          <div className="text-2xl">OR</div>
          <Link
            href="/contact"
            className={cn(
              "px-4 py-2 font-semibold rounded-sm border border-border text-3xl "
            )}
          >
            Contact Me
          </Link>
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
      {/* Main container */}
      <div
        className="flex overflow-y-scroll h-full gap-10 scrollbar-thumb-rounded-sm scrollbar-track-rounded-sm  scrollbar-thumb-slate-400 scrollbar-track-transparent scrollbar-thin"
        ref={containerRef}
      >
        {/* Text container */}
        <div className="w-full sm:w-2/3 flex flex-col pr-8 sm:pr-0">
          {/* Biography */}
          <Biography />
          {/* Skill */}
          <Skills />
          {/* Experience */}
          <Experience />
          {/* Last Section */}
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
