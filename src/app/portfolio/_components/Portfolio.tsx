"use client";
import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn, containerVariants } from "@/lib/utils";
import Link from "next/link";
import { ScrollSvg } from "@/components/ScrollSvg";
import { LightboxDemo } from "@/app/portfolio/_components/LightboxDemo";

type PortfolioProps = {};

type PortfolioType = {
  name: string;
  description: string;
  url: string;
  images: StaticImageData[];
  technologies: string[];
};

import bb1 from "/public/Backpack Battles/image-1.png";
import bb2 from "/public/Backpack Battles/image-2.png";
import bb3 from "/public/Backpack Battles/image-3.png";
import bb4 from "/public/Backpack Battles/image-4.png";

import md1 from "/public/Marvel Duel/image-1.png";
import md2 from "/public/Marvel Duel/image-2.png";
import md3 from "/public/Marvel Duel/image-3.png";

import sd1 from "/public/Sales Database Web/image-1.png";
import sd2 from "/public/Sales Database Web/image-2.png";
import sd3 from "/public/Sales Database Web/image-3.png";
import sd4 from "/public/Sales Database Web/image-4.png";

import s1 from "/public/Sales Database/image-1.png";
import s2 from "/public/Sales Database/image-2.png";
import s3 from "/public/Sales Database/image-3.png";

import { StaticImageData } from "next/image";

//local file link: C:\Users\User\Desktop\Upwork Files\Portfolio
const portfolioItems: PortfolioType[] = [
  {
    name: "Backpack Battle Item Database",
    description:
      "A web application for viewing available backpack battle items.",
    images: [bb1, bb2, bb3, bb4],
    technologies: [
      "Next.js",
      "React",
      "Javascript",
      "HTML",
      "CSS",
      "Tailwind",
      "PostgreSQL",
      "Supabase",
    ],
    url: "/",
  },
  {
    name: "Marvel Duel Card Database",
    description: "A web application for viewing available marvel duel cards.",
    images: [md1, md2, md3],
    technologies: [
      "Next.js",
      "React",
      "Javascript",
      "HTML",
      "CSS",
      "Tailwind",
      "PostgreSQL",
      "Supabase",
    ],
    url: "/",
  },
  {
    name: "Sales Database",
    description:
      "A web application for viewing sales analytics. It also allows for creation, retrieval, update and deletion of various sales data.",
    images: [sd1, sd2, sd3, sd4],
    technologies: [
      "Next.js",
      "React",
      "Javascript",
      "HTML",
      "CSS",
      "Tailwind",
      "PostgreSQL",
      "Supabase",
    ],
    url: "/",
  },
  {
    name: "MS Access-based Sales Database",
    description:
      "A desktop application made with MS Access that tracks various Sales data important to the business.",
    images: [s1, s2, s3],
    technologies: ["MS Access", "VBA", "Excel"],
    url: "/",
  },
];

const LastSlide = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center w-screen ">
      <div
        className={cn(
          "flex w-full p-20 h-full justify-center flex-col gap-4 items-center"
        )}
      >
        <h1 className="text-6xl text-center">Do you have a project?</h1>
        <div className="relative">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            viewBox="0 0 500 500" // Adjusted viewBox size
            className="w-[600px] h-[600px]" // Adjusted className dimensions
          >
            <defs>
              <path
                id="circlePath"
                d="M 250, 250 m -100, 0 a 100,100 0 0,1 200,0 a 100,100 0 0,1 -200,0 " // Adjusted path to match the new viewBox size
              />
            </defs>
            <text className="fill-foreground">
              <textPath
                xlinkHref="#circlePath"
                className="text-2xl font-semibold"
              >
                Do you need a Full-stack Web and VBA Developer?
              </textPath>
            </text>
          </motion.svg>
          <Link
            href="/contact"
            className="w-48 h-48 md:w-48 md:h-48 absolute top-0 left-0 right-0 bottom-0 m-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-4xl text-center font-semibold"
          >
            Hire Me
          </Link>
        </div>
      </div>
    </div>
  );
};

export const Portfolio = ({}: PortfolioProps) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  /* const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75.3%"]); */
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.35%"]);

  return (
    <PageTransitionContainer margin="none">
      {/* Main container */}
      <div
        className="h-full w-screen relative"
        /* style={{ height: pageHeight }} */
      >
        {/* <LightboxDemo /> */}
        <div
          className="flex h-full flex-col scrollbar-thin overflow-y-auto scrollbar-thumb-white scrollbar-track-transparent"
          ref={containerRef}
        >
          <div className="flex flex-col min-h-[calc(100vh-6rem)] items-center justify-center gap-16">
            <h1 className="text-8xl text-center">My Works</h1>
            <ScrollSvg elementID="scrollable" />
          </div>

          <div className="flex min-h-[calc(100vh-6rem)]  sticky top-0 overflow-hidden">
            <motion.div
              id="scrollable"
              className="flex"
              style={{ x }}
            >
              <div className="flex w-screen"></div>
              {/* <div className="flex w-[calc(100vw/2)]"></div> */}
              {portfolioItems.map((item) => {
                return (
                  <div
                    className="min-h-[calc(100vh-6rem)] flex items-center justufy-center w-screen"
                    key={item.name}
                  >
                    <div
                      className={cn(
                        "flex w-full p-5 h-full justify-center flex-col gap-8 items-center cursor-pointer",
                        containerVariants()
                      )}
                    >
                      <h1 className="font-semibold text-5xl text-center">
                        {item.name}
                      </h1>
                      <div className="h-[400px] w-full flex items-center justify-center overflow-hidden rounded-lg">
                        <LightboxDemo slides={item.images} />
                        {/* <div
                          className="rounded-lg peer cursor-pointer absolute inset-0 h-full w-full opacity-50 z-20 bg-slate-900 hover:opacity-0 transition-opacity duration-75" // Added hover effect
                        ></div>
                        <h1 className="absolute z-10 text-7xl peer-hover:scale-105 duration-75 text-center text-slate-900 bg-slate-50">
                          {item.name}
                        </h1>
                        <div className="relative h-full max-h-[400px] w-full">
                          <div className="object-cover relative w-full h-full ">
                            <Image
                              className="object-contain"
                              src="/Backpack Battles/image-1.png"
                              alt=""
                              fill
                            />
                          </div>
                        </div> */}
                      </div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
              <LastSlide />
            </motion.div>
          </div>
          {Array.from({ length: portfolioItems.length }).map((_, index) => {
            return (
              <div
                id={`scroll-div-${index}`}
                key={index}
                className="min-h-[calc(100vh)]"
              ></div>
            );
          })}
        </div>
      </div>
    </PageTransitionContainer>
  );
};
