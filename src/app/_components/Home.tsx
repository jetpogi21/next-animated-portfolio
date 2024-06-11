"use client";
import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { cn, linkVariants } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Home = () => {
  const heading = "Data-driven Solutions Expert";
  const description =
    "Welcome to JET.dev, where financial expertise meets technical innovation.\nAs a certified public accountant and self-taught full-stack developer, I specialize in crafting dynamic, data-driven solutions that empower businesses to thrive in today's digital landscape.\nWith mastery in MS Office and Javascript,HTML and CSS, I transform raw data into actionable insights, driving strategic decision-making and maximizing efficiency.\nLet's unlock your data's potential together for unparalleled success.";
  return (
    <PageTransitionContainer>
      <div className="h-full justify-around md:h-auto flex flex-col md:flex-row gap-8">
        <div className="relative w-full h-1/2 md:h-[500px] lg:w-1/2">
          <Image
            className="z-0 object-contain"
            src="/hero.png"
            alt="hero"
            fill
          />
        </div>
        <div className="flex flex-col w-full gap-8 lg:gap-8 lg:w-1/2 md:justify-around">
          <h1 className="text-4xl font-extrabold md:text-5xl">{heading}</h1>
          <p className="whitespace-pre-wrap">{description}</p>
          <div className="flex gap-4 pb-16 md:pb-0">
            <Link
              href="/portfolio"
              className={cn(
                "px-4 py-2 rounded-sm",
                linkVariants({ variant: "active" })
              )}
            >
              View My Works
            </Link>
            <Link
              href="/about"
              className={cn(
                "px-4 py-2 font-semibold rounded-sm border border-border"
              )}
            >
              About Me
            </Link>
            <Link
              href="/contact"
              className={cn(
                "px-4 py-2 font-semibold rounded-sm border border-border"
              )}
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </PageTransitionContainer>
  );
};
