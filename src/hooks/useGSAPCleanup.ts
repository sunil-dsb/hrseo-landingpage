"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cleanupGSAP } from "@/lib/gsap";

/**
 * Hook to cleanup GSAP animations on route changes
 * This prevents memory leaks and ensures smooth navigation
 */
export function useGSAPCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    // Cleanup on route change
    return () => {
      cleanupGSAP();
    };
  }, [pathname]);

  // Also cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupGSAP();
    };
  }, []);
}