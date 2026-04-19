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

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        className="w-screen min-h-screen bg-(--color-body-bg)"
      >
        <motion.div
          className={cn(
            "h-screen w-screen fixed bg-[#2d1f14] text-white text-4xl rounded-b-[100px] z-30 flex items-center justify-center",
            {
              hidden: disableAnimation,
            }
          )}
          initial={disableAnimation ? {} : { height: "100vh" }}
          animate={disableAnimation ? {} : { height: "0vh" }}
          exit={disableAnimation ? {} : { height: "140vh" }}
          transition={
            disableAnimation ? {} : { duration: 0.5, ease: "easeOut" }
          }
        />

        <motion.div
          className={cn(
            "m-auto h-fit w-fit fixed flex items-center justify-center text-8xl z-30 text-[#f8f3ed] inset-0 capitalize cursor-default",
            {
              hidden: disableAnimation,
            }
          )}
          initial={disableAnimation ? {} : { opacity: 0 }}
          animate={
            disableAnimation
              ? {}
              : {
                  opacity: 1,
                  zIndex: 30,
                  transition: { delay: 0, duration: 0.5 },
                  transitionEnd: {
                    display: "none",
                  },
                }
          }
          exit={disableAnimation ? {} : { opacity: 0 }}
        >
          {pathName.substring(1) || "Home"}
        </motion.div>

        <motion.div
          className={cn(
            "h-screen w-screen fixed bg-[#2d1f14] text-white text-4xl rounded-t-[100px] z-20 flex items-center justify-center bottom-0",
            {
              hidden: disableAnimation,
            }
          )}
          initial={disableAnimation ? {} : { height: "140vh" }}
          animate={
            disableAnimation
              ? {}
              : { height: "0vh", transition: { delay: 0.5, duration: 0.5 } }
          }
        />
        <div className="h-[--header-h]">
          <Navbar />
        </div>
        <div className="overflow-y-hidden">{children}</div>
      </div>
    </AnimatePresence>
  );
};
