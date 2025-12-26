"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { gsap, useGSAP, createMouseTracker } from "@/lib/gsap";

interface AnimatedButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "orange" | "default";
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
}

export function AnimatedButton({
  children,
  className,
  variant = "orange",
  onClick,
  href,
  as = "button",
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const flairRef = useRef<HTMLSpanElement>(null);

  // Memoized mouse interaction setup
  const setupMouseInteractions = useCallback(() => {
    if (!buttonRef.current || !flairRef.current) return;

    const button = buttonRef.current;
    const flair = flairRef.current;

    // Create optimized mouse tracker
    const tracker = createMouseTracker(button, flair, {
      speed: 0.4,
      ease: "power2",
    });

    // Optimized event handlers
    const handleMouseEnter = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const { x, y } = tracker.getRelativePosition(mouseEvent);

      // Set initial position instantly
      tracker.xSet(x);
      tracker.ySet(y);

      // Animate scale with optimized settings
      gsap.to(flair, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        force3D: true,
      });
    };

    const handleMouseLeave = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const { x, y } = tracker.getRelativePosition(mouseEvent);

      // Kill any existing tweens for performance
      gsap.killTweensOf(flair);

      // Calculate exit position
      const exitX = x > 90 ? x + 20 : x < 10 ? x - 20 : x;
      const exitY = y > 90 ? y + 20 : y < 10 ? y - 20 : y;

      gsap.to(flair, {
        xPercent: exitX,
        yPercent: exitY,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
        force3D: true,
      });
    };

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const { x, y } = tracker.getRelativePosition(mouseEvent);

      // Use the optimized tracker method
      tracker.animateTo(x, y);
    };

    // Add event listeners
    button.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    button.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    button.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Return cleanup function
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mousemove", handleMouseMove);
      gsap.killTweensOf(flair);
    };
  }, []);

  // Optimized GSAP setup
  useGSAP(
    () => {
      const cleanup = setupMouseInteractions();
      return cleanup;
    },
    { 
      scope: buttonRef,
      dependencies: [], // No dependencies needed
    }
  );

  const baseClasses = cn(
    // Base button styles with performance optimizations
    "animated-button",
    variant === "default" && "variant-default",
    "relative inline-flex items-center justify-center",
    "bg-transparent border-none rounded-[6.25rem] cursor-pointer overflow-hidden",
    "text-[1.2rem] font-semibold gap-[0.363636em] tracking-[-0.01em] leading-[1.04545]",
    "px-6 py-4 no-underline break-words",
    "will-change-transform", // Performance hint
    className
  );

  const flairClasses = cn(
    "button-flair",
    "will-change-transform" // Performance hint
  );

  const labelClasses = cn(
    "relative z-10 text-center transition-colors duration-150"
  );

  if (as === "a" && href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        onClick={onClick}
        data-block="button"
      >
        <span ref={flairRef} className={flairClasses} />
        <span className={labelClasses}>
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={baseClasses}
      onClick={onClick}
      data-block="button"
    >
      <span ref={flairRef} className={flairClasses} />
      <span className={labelClasses}>
        {children}
      </span>
    </button>
  );
}