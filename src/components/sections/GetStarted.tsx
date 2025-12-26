"use client";

import Image from "next/image";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useRef, useCallback, useMemo } from "react";
import { gsap, useGSAP, splitTextIntoChars, animateCharsIn } from "@/lib/gsap";
import { AnimatedButton } from "@/components/ui/animated-button";
import { NorrisButton } from "@/components/ui/norris-button";

// Memoized SplitText component for better performance
interface SplitTextProps {
  text: string;
  className?: string;
}

const SplitText = ({ text, className }: SplitTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  // Split text on mount
  useGSAP(() => {
    if (textRef.current) {
      splitTextIntoChars(textRef.current);
    }
  }, [text]);

  return (
    <span ref={textRef} className={className} aria-label={text}>
      {text}
    </span>
  );
};

export default function GetStarted() {
  const mounted = useHasMounted();
  const containerRef = useRef<HTMLElement>(null);

  // Memoize animation timeline for performance
  const createAnimationTimeline = useCallback(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        once: true, // Performance: only trigger once
        fastScrollEnd: true, // Performance: handle fast scrolling
      },
    });

    // 1. Animate Logo with optimized transform
    tl.fromTo(
      ".logo-anim",
      {
        opacity: 0,
        scale: 0.8,
        rotationY: -45,
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        force3D: true,
      }
    );

    // 2. Animate Heading Characters (optimized)
    tl.add(
      animateCharsIn("h2 .char", {
        stagger: 0.025,
        duration: 0.6,
        ease: "power3.out",
      }),
      "-=0.4"
    );

    // 3. Animate Description Characters (optimized)
    tl.add(
      animateCharsIn("p .char", {
        stagger: 0.008, // Faster for long text
        duration: 0.4,
        ease: "power2.out",
      }),
      "-=0.3"
    );

    return tl;
  }, []);

  // Optimized GSAP hook with proper cleanup
  useGSAP(
    () => {
      const timeline = createAnimationTimeline();

      // Cleanup function
      return () => {
        timeline?.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [mounted], // Only re-run when mounted changes
    }
  );

  // Memoize static content
  const logoContent = useMemo(
    () =>
      mounted && (
        <>
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
        </>
      ),
    [mounted]
  );

  return (
    <section
      ref={containerRef}
      id="get-started"
      className="w-full py-20 px-6 bg-gray-50"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo with White Box and Shadow */}
        <div className="mb-8 logo-anim will-change-transform">
          <div className="relative w-20 h-20 mx-auto mb-6 bg-white rounded-2xl shadow-md border border-gray-200 flex items-center justify-center p-4">
            <div className="relative w-12 h-12">
              <Image
                src="/logo.png"
                alt="HRSEO Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Heading with Split Text */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          <SplitText text="Get Started" />
        </h2>

        {/* Description with Split Text */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          <SplitText text="Turn information into advantage! Start using HRSEO today. Sign up for a free trial." />
        </p>

        {/* CTA Buttons with Same Height */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <AnimatedButton
            as="a"
            href="#demo"
            className="btn-anim will-change-transform h-11"
          >
            Request a demo
          </AnimatedButton>
          <NorrisButton
            as="a"
            href="#signup"
            variant="white"
            className="btn-anim will-change-transform text-sm font-medium tracking-wide h-11"
          >
            Start for free
          </NorrisButton>
        </div>
      </div>
    </section>
  );
}
