"use client";

/**
 * Performance monitoring utilities for GSAP animations
 */

// Performance observer for animation monitoring
export const createAnimationObserver = () => {
  if (typeof window === "undefined" || !window.PerformanceObserver) return;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      if (entry.entryType === "measure" && entry.name.includes("gsap")) {
        console.log(`GSAP Animation: ${entry.name} took ${entry.duration}ms`);
      }
    });
  });

  observer.observe({ entryTypes: ["measure"] });
  return observer;
};

// FPS monitoring for smooth animations
export const createFPSMonitor = (callback?: (fps: number) => void) => {
  if (typeof window === "undefined") return;

  let lastTime = performance.now();
  let frameCount = 0;
  let fps = 0;

  const measureFPS = (currentTime: number) => {
    frameCount++;
    
    if (currentTime >= lastTime + 1000) {
      fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      frameCount = 0;
      lastTime = currentTime;
      
      if (callback) callback(fps);
      
      // Warn if FPS drops below 30
      if (fps < 30) {
        console.warn(`Low FPS detected: ${fps}fps`);
      }
    }
    
    requestAnimationFrame(measureFPS);
  };

  requestAnimationFrame(measureFPS);
  return { getFPS: () => fps };
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if (typeof window === "undefined" || !("memory" in performance)) return;

  const memory = (performance as any).memory;
  
  return {
    used: Math.round(memory.usedJSHeapSize / 1048576), // MB
    total: Math.round(memory.totalJSHeapSize / 1048576), // MB
    limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
  };
};

// Debounced resize handler for responsive animations
export const createResizeHandler = (
  callback: () => void,
  delay: number = 250
) => {
  let timeoutId: NodeJS.Timeout;
  
  const debouncedCallback = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
  
  window.addEventListener("resize", debouncedCallback, { passive: true });
  
  return () => {
    clearTimeout(timeoutId);
    window.removeEventListener("resize", debouncedCallback);
  };
};

// Intersection Observer for performance-conscious animations
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  if (typeof window === "undefined" || !window.IntersectionObserver) return;

  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};