"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export const PageTransitionOverlay = ({ disabled }: { disabled: boolean }) => {
  const pathName = usePathname();

  return (
    <>
      <motion.div
        className={cn(
          "h-screen w-screen fixed bg-(--color-hero-bg) text-white text-4xl rounded-b-[100px] z-30 flex items-center justify-center",
          { hidden: disabled }
        )}
        initial={disabled ? {} : { height: "100vh" }}
        animate={disabled ? {} : { height: "0vh" }}
        exit={disabled ? {} : { height: "140vh" }}
        transition={disabled ? {} : { duration: 0.5, ease: "easeOut" }}
      />

      <motion.div
        className={cn(
          "m-auto h-fit w-fit fixed flex items-center justify-center text-8xl z-30 text-(--color-text-on-dark) inset-0 capitalize cursor-default",
          { hidden: disabled }
        )}
        initial={disabled ? {} : { opacity: 0 }}
        animate={
          disabled
            ? {}
            : {
                opacity: 1,
                zIndex: 30,
                transition: { delay: 0, duration: 0.5 },
                transitionEnd: { display: "none" },
              }
        }
        exit={disabled ? {} : { opacity: 0 }}
      >
        {pathName.substring(1) || "Home"}
      </motion.div>

      <motion.div
        className={cn(
          "h-screen w-screen fixed bg-(--color-hero-bg) text-white text-4xl rounded-t-[100px] z-20 flex items-center justify-center bottom-0",
          { hidden: disabled }
        )}
        initial={disabled ? {} : { height: "140vh" }}
        animate={
          disabled
            ? {}
            : { height: "0vh", transition: { delay: 0.5, duration: 0.5 } }
        }
      />
    </>
  );
};
