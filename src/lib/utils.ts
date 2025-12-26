import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRGBA = (
  cssColor: React.CSSProperties["color"],
  fallback: string = "rgba(180, 180, 180)",
): string => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor) return fallback;

  try {
    if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
      const element = document.createElement("div");
      element.style.color = cssColor;
      document.body.appendChild(element);
      const computedColor = window.getComputedStyle(element).color;
      document.body.removeChild(element);
      
      // Simple RGBA conversion for computed colors
      const match = computedColor.match(/rgba?\(([^)]+)\)/);
      if (match) {
        const values = match[1].split(',').map(v => v.trim());
        if (values.length >= 3) {
          const alpha = values[3] || '1';
          return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${alpha})`;
        }
      }
      return fallback;
    }
    
    // Handle hex colors
    if (typeof cssColor === "string" && cssColor.startsWith("#")) {
      const hex = cssColor.replace("#", "");
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      return `rgba(${r}, ${g}, ${b}, 1)`;
    }
    
    return cssColor as string;
  } catch (e) {
    console.error("Color parsing failed:", e);
    return fallback;
  }
};

export const colorWithOpacity = (color: string, opacity: number): string => {
  if (!color.startsWith("rgb")) return color;
  
  const match = color.match(/rgba?\(([^)]+)\)/);
  if (match) {
    const values = match[1].split(',').map(v => v.trim());
    if (values.length >= 3) {
      return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${opacity})`;
    }
  }
  
  return color;
};
