"use client";
import { cn, containerVariants } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type PageTransitionContainerProps = {
  children: ReactNode;
  margin?: "right" | "none" | "both";
  disableAnimation?: boolean;
};

export const PageTransitionContainer = ({
  children,
  margin = "both",
  disableAnimation = false, // Default to false if not provided
}: PageTransitionContainerProps) => {
  const animationProps = disableAnimation
    ? {}
    : {
        initial: { y: "-200vh" },
        animate: { y: "0%" },
        transition: { duration: 1 },
      };

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center gap-8 mx-auto sm:gap-2 sm:flex-row h-[calc(100vh-6rem)]",
        containerVariants(),
        {
          "mr-0 max-w-[95%] lg:ml-[calc((100vw-1024px)/2)] lg:max-w-[calc(1024px+((100vw-1024px)/2))]":
            margin === "right",
          "max-w-full lg:mx-0 lg:max-w-full": margin === "none",
        }
      )}
      {...animationProps}
    >
      {children}
    </motion.div>
  );
};
