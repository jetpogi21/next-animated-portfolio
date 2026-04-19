"use client";
import { AppShell } from "@/components/AppShell";
import { PageTransitionOverlay } from "@/components/PageTransitionOverlay";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  const prefersReduced =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <AnimatePresence mode="wait">
      <div key={pathName}>
        <PageTransitionOverlay disabled={prefersReduced} />
        <AppShell>{children}</AppShell>
      </div>
    </AnimatePresence>
  );
};
