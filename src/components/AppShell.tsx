"use client";
import { Navbar } from "@/components/Navbar";
import { ReactNode } from "react";

export const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-screen flex flex-col h-screen bg-(--color-body-bg)">
      <div
        className="flex items-center py-5"
        style={{ backgroundColor: "var(--color-hero-bg)" }}
      >
        <Navbar />
      </div>
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};
