"use client";
import Link from "next/link";
import { SVGMotionProps, Variants, motion } from "framer-motion";
import { links } from "@/components/navbarData";

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="var(--color-text-primary)"
    strokeLinecap="round"
    {...props}
  />
);

export const ResponsiveMenuButton = ({
  onToggleOpen,
  open,
}: {
  onToggleOpen: () => void;
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
          initial="closed"
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

export const FullScreenMenu = ({ open }: { open: boolean }) => {
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
      className="fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-screen h-screen text-center bg-[#f8f3ed] text-secondary-foreground dark:bg-[#1a110a] dark:text-slate-50 space-y-14"
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
