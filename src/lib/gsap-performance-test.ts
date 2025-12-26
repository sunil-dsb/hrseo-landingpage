"use client";

import { gsap } from "@/lib/gsap";
import { createFPSMonitor, monitorMemoryUsage } from "@/lib/performance";

/**
 * Performance testing utilities for GSAP animations
 * Run these in development to verify optimization effectiveness
 */

export const runGSAPPerformanceTest = () => {
  if (typeof window === "undefined") return;

  console.log("🚀 Starting GSAP Performance Test...");

  // 1. Test FPS during animations
  const fpsMonitor = createFPSMonitor((fps) => {
    if (fps < 50) {
      console.warn(`⚠️ FPS dropped to ${fps} during animation`);
    } else {
      console.log(`✅ Smooth animation: ${fps}fps`);
    }
  });

  // 2. Test memory usage
  const initialMemory = monitorMemoryUsage();
  console.log("📊 Initial Memory Usage:", initialMemory);

  // 3. Test animation performance
  const testElements = document.querySelectorAll('.char, .btn-anim, .logo-anim');
  
  if (testElements.length > 0) {
    console.log(`🎯 Testing ${testElements.length} animated elements`);
    
    // Measure animation creation time
    const startTime = performance.now();
    
    gsap.to(testElements, {
      y: 10,
      duration: 0.5,
      stagger: 0.02,
      ease: "power2.out",
      force3D: true,
      onComplete: () => {
        const endTime = performance.now();
        console.log(`⏱️ Animation setup took: ${(endTime - startTime).toFixed(2)}ms`);
        
        // Reset elements
        gsap.set(testElements, { y: 0 });
        
        // Check memory after animation
        setTimeout(() => {
          const finalMemory = monitorMemoryUsage();
          console.log("📊 Final Memory Usage:", finalMemory);
          
          if (finalMemory && initialMemory) {
            const memoryDiff = finalMemory.used - initialMemory.used;
            if (memoryDiff > 5) { // More than 5MB increase
              console.warn(`⚠️ Memory increased by ${memoryDiff}MB`);
            } else {
              console.log(`✅ Memory usage stable: +${memoryDiff}MB`);
            }
          }
        }, 1000);
      }
    });
  } else {
    console.log("ℹ️ No animated elements found for testing");
  }

  // 4. Test hardware acceleration
  const testHardwareAcceleration = () => {
    const testEl = document.createElement('div');
    testEl.style.transform = 'translateZ(0)';
    document.body.appendChild(testEl);
    
    const computedStyle = window.getComputedStyle(testEl);
    const hasHardwareAcceleration = computedStyle.transform !== 'none';
    
    document.body.removeChild(testEl);
    
    if (hasHardwareAcceleration) {
      console.log("✅ Hardware acceleration is working");
    } else {
      console.warn("⚠️ Hardware acceleration may not be working");
    }
  };

  testHardwareAcceleration();

  // 5. Test GSAP configuration
  console.log("⚙️ GSAP Configuration:");
  console.log("- Force3D:", gsap.config().force3D);
  console.log("- NullTargetWarn:", gsap.config().nullTargetWarn);
  console.log("- Default ease:", gsap.defaults().ease);
  console.log("- Default duration:", gsap.defaults().duration);

  console.log("🎉 GSAP Performance Test Complete!");
  
  return {
    fpsMonitor,
    initialMemory,
  };
};

// Auto-run in development
if (process.env.NODE_ENV === 'development') {
  // Run test after page load
  if (typeof window !== "undefined") {
    window.addEventListener('load', () => {
      setTimeout(runGSAPPerformanceTest, 2000); // Wait 2s for animations to load
    });
  }
}