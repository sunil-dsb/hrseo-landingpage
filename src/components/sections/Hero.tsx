"use client";

import { HeroVideoSection } from "@/components/sections/hero-video-section";
import { siteConfig } from "@/lib/config";
import { AnimatedButton } from "@/components/ui/animated-button";
import { NorrisButton } from "@/components/ui/norris-button";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Hero() {
  const { hero } = siteConfig;
  const containerRef = useRef<HTMLElement>(null);
  
  // Simple fade-up animation for hero elements
  useGSAP(() => {
    if (!containerRef.current) return;
    
    const tl = gsap.timeline({ delay: 0.2 });
    
    // 1. Animate heading - simple fade up
    tl.fromTo(
      ".hero-heading",
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        force3D: true,
      }
    );
    
    // 2. Animate description
    tl.fromTo(
      ".hero-description",
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
        force3D: true,
      },
      "-=0.4"
    );
    
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="hero" className="w-full relative">
      <div className="relative flex flex-col items-center w-full px-6 mb-16">
        {/* Orange Gradient Background - Slightly Darker */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 -z-10 h-[600px] md:h-[800px] w-full rounded-b-xl"
            style={{
              background: 'radial-gradient(125% 125% at 50% 10%, #ffffff 25%, #FFF0E6 55%, #FFDBCC 80%, #FFB380 100%)'
            }}
          ></div>
        </div>

        <div className="relative z-10 pt-28 max-w-4xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center">
          <p className="border border-border bg-accent rounded-full text-sm h-8 px-3 flex items-center gap-2 text-muted-foreground">
            <span>{hero.badgeIcon}</span>
            <span>{hero.badge}</span>
          </p>

          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="hero-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter text-balance text-center text-foreground will-change-transform">
              {hero.title}
            </h1>
            <p className="hero-description text-base md:text-lg text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight max-w-5xl will-change-transform">
              {hero.description}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <NorrisButton
              as="a"
              href={hero.cta.primary.href}
              variant="white"
              className="text-sm font-medium tracking-wide will-change-transform"
            >
              {hero.cta.primary.text}
            </NorrisButton>
            <AnimatedButton
              as="a"
              href={hero.cta.secondary.href}
              variant="default"
              className="h-11 text-sm font-medium tracking-wide will-change-transform"
            >
              {hero.cta.secondary.text}
            </AnimatedButton>
          </div>
        </div>
      </div>

      <HeroVideoSection />
    </section>
  );
}
