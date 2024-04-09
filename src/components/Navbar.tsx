"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { cn, containerVariants, linkVariants } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { SVGMotionProps, Variants, motion } from "framer-motion";

const links = [
  { url: "/", title: "home" },
  { url: "/about", title: "about" },
  { url: "/portfolio", title: "portfolio" },
  { url: "/contact", title: "contact" },
];

const socials = [
  {
    src: "/freelancer-icon.png",
    title: "freelancer",
    url: "https://www.freelancer.com/u/jonathanpradas",
  },
  {
    src: "/facebook.png",
    title: "facebook",
    url: "https://www.facebook.com/jetpogi21",
  },
  { src: "/github.png", title: "github", url: "https://github.com/jetpogi21" },
];

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center h-8 text-sm font-bold rounded-sm dark:bg-slate-200 dark:text-slate-900 bg-slate-900 text-slate-200"
    >
      <span className="flex items-center justify-center w-10 ">JET</span>
      <span className="flex self-stretch items-center justify-center w-10 m-0.5 bg-secondary rounded-r-sm dark:text-slate-100 text-slate-900">
        .dev
      </span>
    </Link>
  );
};

const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

export const ResponsiveMenuButton = ({
  onToggleOpen,
  open,
}: {
  onToggleOpen: VoidFunction;
  open: boolean;
}) => {
  const svgDimension = 34;
  return (
    <button
      onClick={onToggleOpen}
      className="z-20 relative flex items-center justify-center"
    >
      <svg
        width={svgDimension}
        height={svgDimension}
        viewBox="0 -2 22 22"
      >
        <Path
          initial="closed"
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
          animate={open ? "open" : "closed"}
          className="stroke-foreground"
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
          animate={open ? "open" : "closed"}
          className="stroke-foreground"
        />
        <Path
          initial="closed"
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
          animate={open ? "open" : "closed"}
          className="stroke-foreground"
        />
      </svg>
    </button>
  );
};

const FullScreenMenu = ({ open }: { open: boolean }) => {
  const listVariants: Variants = {
    closed: {
      x: "100vw",
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    open: {
      x: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const listItemVariants: Variants = {
    closed: {
      x: "-20",
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={listVariants}
      initial="closed"
      animate={open ? "open" : "closed"}
      className="fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-screen h-screen text-center bg-secondary text-secondary-foreground dark:bg-slate-950 dark:text-slate-50 space-y-14"
    >
      {links.map((link) => {
        return (
          <motion.div
            variants={listItemVariants}
            key={link.url}
          >
            <Link
              className="text-5xl capitalize"
              href={link.url}
            >
              {link.title}
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const Socials = () => {
  return (
    <>
      {socials.map((social) => {
        return (
          <a
            href={social.url}
            key={social.title}
            target="_blank"
          >
            <div className="relative w-8 h-8">
              <Image
                src={social.src}
                alt={social.title}
                fill
                className={cn("object-contain", {
                  "dark:invert": social.title === "github",
                })}
              />
            </div>
          </a>
        );
      })}
    </>
  );
};

const HeaderMenu = () => {
  const pathName = usePathname();
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 font-semibold">
        {links.map((link) => {
          return (
            <Link
              className={cn(
                "capitalize px-2 py-1 rounded-sm",
                linkVariants({
                  variant: pathName === link.url ? "active" : "default",
                })
              )}
              href={link.url}
              key={link.url}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
      <div className="gap-4 pr-8 lg:flex md:hidden">
        <Socials />
      </div>
    </div>
  );
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleToggleOpen = () => setOpen(!open);
  return (
    <div
      className={cn(
        "flex items-center justify-between h-full gap-2",
        containerVariants()
      )}
    >
      <div
        className={cn(
          "flex items-center justify-start flex-1 gap-4 md:gap-8 md:justify-between"
        )}
      >
        <div className="md:hidden">
          <ResponsiveMenuButton
            onToggleOpen={handleToggleOpen}
            open={open}
          />
        </div>
        <Logo />

        <div className="flex-1 hidden md:block">
          <HeaderMenu />
        </div>
        <div className="flex gap-4 ml-auto mr-2 lg:hidden">
          <Socials />
        </div>
      </div>
      <ModeToggle />
      <div className="md:hidden">
        <FullScreenMenu open={open} />
      </div>
    </div>
  );
};
