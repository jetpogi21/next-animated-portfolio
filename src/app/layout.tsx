import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TransitionProvider } from "@/components/TransitionProvider";
import { Toaster } from "sonner";
import type { Metadata } from "next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Jonathan Pradas | Portfolio",
  description: "Jonathan Pradas' Portfolio Website",
};

type RootLayoutProps = { children: ReactNode };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={cn(
          "font-sans bg-background antialiased min-h-screen",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TransitionProvider disableAnimation={false}>
            {children}
            <Toaster
              position="bottom-right"
              theme="system"
              closeButton
            />
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
