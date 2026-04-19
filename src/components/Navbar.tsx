"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { cn, containerVariants, linkVariants } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { links, socials } from "@/components/navbarData";
import { ResponsiveMenuButton, FullScreenMenu } from "@/components/NavbarMobile";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center"
    >
      <span
        className="text-xl italic font-bold tracking-tight"
        style={{ fontFamily: "var(--font-fraunces)", color: "var(--color-navbar-text)" }}
      >
        JET.dev
      </span>
    </Link>
  );
};

const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="border border-white/20 hover:bg-white/10 hover:border-white/40 hover:text-(--color-text-on-dark)"
          style={{ color: "var(--color-navbar-text)" }}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Socials = () => {
  return (
    <>
      {socials.map((social) => {
        return (
          <a
            href={social.url}
            key={social.title}
            target="_blank"
          >
            <div className="relative w-8 h-8">
              <Image
                src={social.src}
                alt={social.title}
                fill
                className={cn("object-contain", {
                  "invert": social.needsInvert,
                })}
              />
            </div>
          </a>
        );
      })}
    </>
  );
};

const HeaderMenu = () => {
  const pathName = usePathname();
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2 font-semibold">
        {links.map((link) => {
          return (
            <Link
              className={cn(
                "capitalize px-2 py-1 rounded-sm",
                linkVariants({
                  variant: pathName === link.url ? "active" : "default",
                })
              )}
              href={link.url}
              key={link.url}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleToggleOpen = () => setOpen(!open);
  return (
    <div
      className={cn(
        "flex items-center justify-between h-full gap-2",
        containerVariants()
      )}
    >
      <div
        className={cn(
          "flex items-center justify-start flex-1 gap-4 md:gap-8 md:justify-between"
        )}
      >
        <div className="md:hidden">
          <ResponsiveMenuButton
            onToggleOpen={handleToggleOpen}
            open={open}
          />
        </div>
        <Logo />

        <div className="flex-1 hidden md:block">
          <HeaderMenu />
        </div>
        <div className="hidden md:flex gap-4 ml-auto mr-2 pr-8">
          <Socials />
        </div>
      </div>
      <ModeToggle />
      <div className="md:hidden">
        <FullScreenMenu open={open} />
      </div>
    </div>
  );
};
