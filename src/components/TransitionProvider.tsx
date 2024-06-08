"use client";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type TransitionProviderProps = {
  children: ReactNode;
  disableAnimation?: boolean;
};

export const TransitionProvider = ({
  children,
  disableAnimation,
}: TransitionProviderProps) => {
  const pathName = usePathname();

  // Define default properties for when animation is disabled
  const defaultMotionProps = {
    initial: {},
    animate: {},
    exit: {},
    transition: {},
  };

  // Define animated properties
  const animatedMotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0, duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  // Conditionally apply animation properties based on disableAnimation
  const motionProps = disableAnimation
    ? defaultMotionProps
    : animatedMotionProps;

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        className="h-screen w-screen bg-gradient-to-b dark:from-slate-950 dark:to-slate-900 from-slate-50 to-red-100"
      >
        <motion.div
          className={cn(
            "h-screen w-screen fixed bg-slate-900 text-white text-4xl rounded-b-[100px] z-30 flex items-center justify-center",
            {
              hidden: disableAnimation,
            }
          )}
          {...motionProps}
        />

        <motion.div
          className={cn(
            "m-auto h-fit w-fit fixed flex items-center justify-center text-8xl z-30 text-white inset-0 capitalize cursor-default",
            {
              hidden: disableAnimation,
            }
          )}
          {...motionProps}
        >
          {pathName.substring(1) || "Home"}
        </motion.div>

        <motion.div
          className={cn(
            "h-screen w-screen fixed bg-slate-900 text-white text-4xl rounded-t-[100px] z-20 flex items-center justify-center bottom-0",
            {
              hidden: disableAnimation,
            }
          )}
          {...motionProps}
        />
        <div className="h-[--header-h]">
          <Navbar />
        </div>
        <div className="overflow-y-hidden">{children}</div>
      </div>
    </AnimatePresence>
  );
};
