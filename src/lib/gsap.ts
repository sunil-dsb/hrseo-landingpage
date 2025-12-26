"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once, client-side only
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  // Global GSAP configuration for optimal performance
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });
  
  // Set default ease for better performance
  gsap.defaults({
    ease: "power2.out",
    duration: 0.6,
  });
}

// Optimized text splitter utility
export const splitTextIntoChars = (element: HTMLElement): void => {
  const text = element.textContent || "";
  const chars = text.split("").map((char, index) => {
    const span = document.createElement("span");
    span.className = "char inline-block will-change-transform";
    span.style.setProperty("--char-index", index.toString());
    span.textContent = char === " " ? "\u00A0" : char;
    
    // Set initial state for GSAP
    gsap.set(span, { 
      y: 100, 
      opacity: 0,
      rotationX: -90,
    });
    
    return span;
  });
  
  element.innerHTML = "";
  element.append(...chars);
};

// Optimized word splitter utility
export const splitTextIntoWords = (element: HTMLElement): void => {
  const text = element.textContent || "";
  const words = text.split(" ").map((word, index) => {
    const span = document.createElement("span");
    span.className = "word inline-block will-change-transform";
    span.style.setProperty("--word-index", index.toString());
    span.textContent = word;
    
    // Set initial state for GSAP
    gsap.set(span, { 
      y: 60, 
      opacity: 0,
      rotationX: -90,
      transformOrigin: "50% 100%",
    });
    
    return span;
  });
  
  element.innerHTML = "";
  
  // Add words with spaces
  words.forEach((wordEl, index) => {
    element.appendChild(wordEl);
    if (index < words.length - 1) {
      element.appendChild(document.createTextNode(" "));
    }
  });
};

// Optimized word animation utility
export const animateWordsIn = (
  selector: string, 
  options: {
    stagger?: number;
    duration?: number;
    ease?: string;
    delay?: number;
  } = {}
) => {
  const {
    stagger = 0.12,
    duration = 0.8,
    ease = "power3.out",
    delay = 0,
  } = options;

  return gsap.to(selector, {
    y: 0,
    opacity: 1,
    rotationX: 0,
    duration,
    stagger,
    ease,
    delay,
    force3D: true,
  });
};

// Optimized batch animation utility
export const animateCharsIn = (
  selector: string, 
  options: {
    stagger?: number;
    duration?: number;
    ease?: string;
    delay?: number;
  } = {}
) => {
  const {
    stagger = 0.02,
    duration = 0.6,
    ease = "power3.out",
    delay = 0,
  } = options;

  return gsap.to(selector, {
    y: 0,
    opacity: 1,
    rotationX: 0,
    duration,
    stagger,
    ease,
    delay,
    force3D: true,
  });
};

// Performance-optimized mouse tracking
export const createMouseTracker = (
  element: HTMLElement,
  target: HTMLElement,
  options: {
    speed?: number;
    ease?: string;
  } = {}
) => {
  const { speed = 0.4, ease = "power2" } = options;
  
  // Use quickSetters for maximum performance
  const xSet = gsap.quickSetter(target, "xPercent");
  const ySet = gsap.quickSetter(target, "yPercent");
  
  const getRelativePosition = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = gsap.utils.mapRange(0, rect.width, 0, 100, e.clientX - rect.left);
    const y = gsap.utils.mapRange(0, rect.height, 0, 100, e.clientY - rect.top);
    
    return {
      x: gsap.utils.clamp(0, 100, x),
      y: gsap.utils.clamp(0, 100, y),
    };
  };
  
  return {
    xSet,
    ySet,
    getRelativePosition,
    animateTo: (x: number, y: number) => {
      gsap.to(target, {
        xPercent: x,
        yPercent: y,
        duration: speed,
        ease,
        force3D: true,
      });
    },
  };
};

// Optimized ScrollTrigger batch utility
export const createScrollBatch = (
  selector: string,
  animation: (elements: Element[]) => void,
  options: {
    start?: string;
    end?: string;
    once?: boolean;
    threshold?: number;
  } = {}
) => {
  const {
    start = "top 80%",
    end = "bottom 20%",
    once = true,
    threshold = 0.1,
  } = options;

  return ScrollTrigger.batch(selector, {
    onEnter: animation,
    start,
    end,
    once,
    interval: threshold,
  });
};

// Memory cleanup utility
export const cleanupGSAP = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
};

// Export configured GSAP and hooks
export { gsap, ScrollTrigger, useGSAP };