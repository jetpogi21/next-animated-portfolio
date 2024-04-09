"use client";
import { Navbar } from "@/components/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type TransitionProviderProps = { children: ReactNode };

export const TransitionProvider = ({ children }: TransitionProviderProps) => {
  const pathName = usePathname();
  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        className="h-screen w-screen bg-gradient-to-b dark:from-slate-950 dark:to-slate-900 from-slate-50 to-red-100"
      >
        <motion.div
          className="h-screen w-screen fixed bg-slate-900 text-white text-4xl rounded-b-[100px] z-30 flex items-center justify-center"
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <motion.div
          className="m-auto h-fit w-fit fixed flex items-center justify-center text-8xl z-30 text-white inset-0 capitalize cursor-default"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            zIndex: 30,
            transition: { delay: 0, duration: 0.5 },
            transitionEnd: {
              display: "none",
            },
          }}
        >
          {pathName.substring(1) || "Home"}
        </motion.div>

        <motion.div
          className="h-screen w-screen fixed bg-slate-900 text-white text-4xl rounded-t-[100px] z-20 flex items-center justify-center bottom-0"
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5, duration: 0.5 } }}
        />

        <div className="h-[--header-h]">
          <Navbar />
        </div>
        <div className="overflow-y-hidden">{children}</div>
      </div>
    </AnimatePresence>
  );
};
