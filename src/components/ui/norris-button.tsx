"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

interface NorrisButtonProps {
  children: string;
  className?: string;
  variant?: "orange" | "white";
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
}

export function NorrisButton({
  children,
  className,
  variant = "orange",
  onClick,
  href,
  as = "button",
}: NorrisButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const element = buttonRef.current;
    const text = children;
    
    // Use Intl.Segmenter for proper character segmentation
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    const segments = [...segmenter.segment(text)];
    
    // Clear existing content
    element.innerHTML = "";
    
    // Create character spans with GSAP-optimized structure
    segments.forEach((segment, i) => {
      const char = segment.segment;
      
      if (char === " ") {
        const space = document.createElement("span");
        space.className = "letter space";
        space.innerHTML = "&nbsp;";
        element.appendChild(space);
        return;
      }
      
      const wrapper = document.createElement("span");
      wrapper.className = "letter";
      wrapper.style.setProperty("--i", i.toString());
      
      // Create top and bottom spans
      const topSpan = document.createElement("span");
      topSpan.className = "top";
      topSpan.textContent = char;
      
      const bottomSpan = document.createElement("span");
      bottomSpan.className = "bottom";
      bottomSpan.textContent = char;
      
      wrapper.appendChild(topSpan);
      wrapper.appendChild(bottomSpan);
      element.appendChild(wrapper);
    });

    // GSAP hover animations for smoother performance
    const topSpans = element.querySelectorAll('.letter .top');
    const bottomSpans = element.querySelectorAll('.letter .bottom');
    
    const handleMouseEnter = () => {
      gsap.to(topSpans, {
        y: "-100%",
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
        force3D: true,
      });
      
      gsap.to(bottomSpans, {
        y: "0%",
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
        force3D: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(topSpans, {
        y: "0%",
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
        force3D: true,
      });
      
      gsap.to(bottomSpans, {
        y: "100%",
        duration: 0.4,
        stagger: 0.03,
        ease: "power2.out",
        force3D: true,
      });
    };

    // Click animation + navigation
    const handleClick = (e: Event) => {
      if (href) e.preventDefault();
      
      // Smooth scale animation
      gsap.to(element, {
        scale: 0.95,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          if (href) {
            if (href.startsWith("#")) {
              // Internal anchor link
              const targetElement = document.getElementById(href.substring(1));
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
              }
            } else {
              // External link
              window.location.href = href;
            }
          }
          if (onClick) onClick();
        }
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("click", handleClick);
    };
  }, [children, href, onClick]);

  const baseClasses = cn(
    "norris-hover-gsap", // New class for GSAP version
    variant === "white" && "variant-white",
    className
  );

  if (as === "a" && href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
      >
        {/* Content will be replaced by useEffect */}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={baseClasses}
    >
      {/* Content will be replaced by useEffect */}
    </button>
  );
}