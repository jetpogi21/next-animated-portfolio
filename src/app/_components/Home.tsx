import { PageTransitionContainer } from "@/components/PageTransitionContainer";
import { cn, linkVariants } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type HomeProps = {};

export const Home = ({}: HomeProps) => {
  return (
    <PageTransitionContainer>
      <div className="relative w-full h-full sm:w-1/2">
        <Image
          className="z-0 object-contain"
          src="/hero.png"
          alt="hero"
          fill
        />
      </div>
      <div className="flex flex-col w-full gap-4 sm:gap-8 sm:w-1/2">
        <h1 className="text-3xl font-bold md:text-5xl">
          Crafting Digital Experiences, Designing Tomorrow.
        </h1>
        <p>
          Welcome to my digital oasis! 🌟 Dive into a world where pixels work
          their magic! Whether you&#39;re a developer, explorer, or potential
          collaborator, I&#39;m thrilled to have you here. Expect a symphony of
          code, design, and creativity. Let&#39;s journey through web
          development together. Feel free to explore, ask questions, or chat!
          Happy browsing! 🚀
        </p>
        <div className="flex gap-4">
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
            href="/contact"
            className={cn(
              "px-4 py-2 font-semibold rounded-sm border border-slate-50"
            )}
          >
            Contact Me
          </Link>
        </div>
      </div>
    </PageTransitionContainer>
  );
};
