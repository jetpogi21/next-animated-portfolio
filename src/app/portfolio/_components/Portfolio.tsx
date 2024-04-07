"use client";
import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/Carousel";
import * as React from "react";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type PortfolioProps = {};

type PortfolioType = {
  name: string;
  description: string;
  url: string;
};

const portfolioItems: PortfolioType[] = [
  {
    name: "Project Alpha",
    description: "A web application for managing tasks and deadlines.",
    url: "/",
  },
  {
    name: "Project Beta",
    description: "A mobile app for tracking personal finances.",
    url: "/",
  },
  {
    name: "Project Gamma",
    description: "An e-commerce platform with advanced search features.",
    url: "/",
  },
  {
    name: "Project Delta",
    description: "A social media platform focused on local communities.",
    url: "/",
  },
];

const CarouselDemo = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

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
            viewBox="0 0 300 300"
            className="w-64 h-64 md:w-[500px] md:h-[500px] "
          >
            <defs>
              <path
                id="circlePath"
                d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
              />
            </defs>
            <text fill="#000">
              <textPath
                xlinkHref="#circlePath"
                className="text-xl stroke-foreground"
              >
                Front-end Developer and UI Designer
              </textPath>
            </text>
          </motion.svg>
          <Link
            href="/contact"
            className="w-32 h-32 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-semibold"
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
        <div
          className="flex h-full flex-col scrollbar-thin overflow-y-auto scrollbar-thumb-white scrollbar-track-transparent"
          ref={containerRef}
        >
          <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
            <h1>My Works</h1>
          </div>

          <div className="flex min-h-[calc(100vh-6rem)]  sticky top-0 overflow-x-hidden">
            <motion.div
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
                        "flex w-full p-20 h-full justify-center flex-col gap-4 items-center"
                      )}
                    >
                      <h1>{item.name}</h1>
                      <div className="relative h-full max-h-[500px] w-full">
                        <Image
                          src={"/placeholder.jpg"}
                          alt="placeholder.jpg"
                          className="object-contain"
                          fill
                        />
                      </div>
                      <p>{item.description}</p>
                      <Link
                        className={buttonVariants()}
                        href={item.url}
                      >
                        View Demo
                      </Link>
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
