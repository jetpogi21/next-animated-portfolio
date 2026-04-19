import { cva } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const linkVariants = cva("", {
  variants: {
    variant: {
      default: "text-(--color-text-on-dark) opacity-70 hover:opacity-100 transition-opacity",
      active:
        "text-[#d4956a] border-b border-[#d4956a] transition-all duration-75 ease-in-out",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const containerVariants = cva(
  "max-w-[90vw] lg:max-w-screen-lg mx-auto w-full"
);

export const mainHeight = cva("h-[calc(100vh-var(--header-h))]");
