"use client";

import React, { useEffect, useState, useRef } from "react";
import { MdMenu, MdClose, MdWbSunny, MdNightlight } from "react-icons/md";
import {
  AnimatePresence,
  motion,
  useScroll,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useHasMounted } from "@/hooks/useHasMounted";
import { NorrisButton } from "@/components/ui/norris-button";

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useHasMounted();

  if (!mounted) {
    return (
      <div className="cursor-pointer rounded-full h-8 w-8 border border-border flex items-center justify-center">
        <div className="w-4 h-4" />
      </div>
    );
  }

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    console.log("Theme changed to:", newTheme);
  };

  return (
    <button
      onClick={handleThemeToggle}
      className="cursor-pointer rounded-full h-8 w-8 border border-border flex items-center justify-center hover:bg-accent transition-colors"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <MdWbSunny className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
      <MdNightlight className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

// Navigation configuration
const navLinks = [
  { id: 1, name: "Hero 1", href: "/hero1" },
  { id: 2, name: "Hero 2", href: "/hero2" },
  { id: 3, name: "Hero 3", href: "/hero3" },
  { id: 4, name: "Hero 4", href: "/hero4" },
];

// NavMenu Component with animations
const NavMenu = () => {
  const pathname = usePathname();
  const ref = useRef<HTMLUListElement>(null);
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);

  React.useEffect(() => {
    // Update indicator based on current pathname
    const activeLink = ref.current?.querySelector(
      `[href="${pathname}"]`
    )?.parentElement;
    
    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      setLeft(activeLink.offsetLeft);
      setWidth(rect.width);
      setIsReady(true);
    }
  }, [pathname]);

  return (
    <div className="w-full hidden md:block">
      <ul
        className="relative mx-auto flex w-fit rounded-full h-11 px-2 items-center justify-center"
        ref={ref}
      >
        {navLinks.map((item) => (
          <li
            key={item.name}
            className={`z-10 cursor-pointer h-full flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200 ${
              pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            } tracking-tight`}
          >
            <Link href={item.href}>
              {item.name}
            </Link>
          </li>
        ))}
        {isReady && (
          <motion.li
            animate={{ left, width }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute inset-0 my-1.5 rounded-full bg-accent border border-border"
          />
        )}
      </ul>
    </div>
  );
};

// Main Navbar Component
const INITIAL_WIDTH = "70rem";
const MAX_WIDTH = "800px";

// Animation variants
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200,
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: { duration: 0.1 },
  },
};

const drawerMenuContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerMenuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Header() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 10);
    });
    return unsubscribe;
  }, [scrollY]);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const handleOverlayClick = () => setIsDrawerOpen(false);

  return (
    <header
      className={cn(
        "sticky z-50 flex justify-center transition-all duration-500 ease-out",
        hasScrolled ? "top-6 mx-4 md:mx-0" : "top-4 mx-0"
      )}
    >
      <motion.div
        initial={{ width: INITIAL_WIDTH }}
        animate={{ width: hasScrolled ? MAX_WIDTH : INITIAL_WIDTH }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-2xl transition-all duration-500 ease-out xl:px-0",
            hasScrolled
              ? "px-2 border border-border backdrop-blur-lg bg-background/80 dark:shadow-lg"
              : "shadow-none px-7 bg-background/50 border border-transparent"
          )}
        >
          <div className="flex h-14 items-center justify-between p-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative size-7 md:size-10">
                <Image
                  src="/logo.png"
                  alt="HRSEO Logo"
                  fill
                  className="object-contain dark:hidden"
                  priority
                />
                <Image
                  src="/logo.png"
                  alt="HRSEO Logo"
                  fill
                  className="object-contain hidden dark:block"
                  priority
                />
              </div>
              <p className="text-lg font-bold tracking-tighter text-[#F15A29]">HRSEO</p>
            </Link>

            <NavMenu />

            <div className="flex flex-row items-center gap-1 md:gap-3 shrink-0">
              <LanguageToggle />

              <div className="flex items-center space-x-6">
                <div className="hidden md:block">
                  <NorrisButton
                    as="a"
                    href="#signup"
                    variant="white"
                    className="navbar-button"
                  >
                    Get Started
                  </NorrisButton>
                </div>
              </div>
              <ThemeToggle />
              <button
                className="md:hidden border border-border size-8 rounded-md cursor-pointer flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                onClick={toggleDrawer}
              >
                {isDrawerOpen ? (
                  <MdClose className="size-5" />
                ) : (
                  <MdMenu className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              transition={{ duration: 0.2 }}
              onClick={handleOverlayClick}
            />
            <motion.div
              className="fixed inset-x-0 w-[95%] mx-auto bottom-3 bg-card border border-border p-4 rounded-xl shadow-lg"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
            >
              {/* Mobile menu content */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-3">
                    <div className="relative size-7 md:size-10">
                      <Image
                        src="/logo.png"
                        alt="HRSEO Logo"
                        fill
                        className="object-contain dark:hidden"
                        priority
                      />
                      <Image
                        src="/logo-white.png"
                        alt="HRSEO Logo"
                        fill
                        className="object-contain hidden dark:block"
                        priority
                      />
                    </div>
                    <p className="text-lg font-semibold text-[#F15A29]">
                      HRSEO
                    </p>
                  </Link>
                  <button
                    onClick={toggleDrawer}
                    className="border border-border rounded-md p-1 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <MdClose className="size-5" />
                  </button>
                </div>
                <motion.ul
                  className="flex flex-col text-sm mb-4 border border-border rounded-md"
                  variants={drawerMenuContainerVariants}
                >
                  <AnimatePresence>
                    {navLinks.map((item) => (
                      <motion.li
                        key={item.id}
                        className="p-2.5 border-b border-border last:border-b-0"
                        variants={drawerMenuVariants}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsDrawerOpen(false)}
                          className={`underline-offset-4 hover:text-foreground transition-colors ${
                            pathname === item.href
                              ? "text-foreground font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>
                {/* Action buttons */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Language
                    </span>
                    <LanguageToggle />
                  </div>
                  <NorrisButton
                    as="a"
                    href="#signup"
                    variant="white"
                    className="navbar-button w-full"
                  >
                    Get Started
                  </NorrisButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
