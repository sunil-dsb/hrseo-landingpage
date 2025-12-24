import { cn } from "@/lib/utils";

interface TypographyProps {
  children: React.ReactNode;
  variant?: "default" | "modern" | "brand";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function Typography({
  children,
  variant = "default",
  className,
  as: Component = "p",
}: TypographyProps) {
  const fontClass = variant === "modern" 
    ? "font-modern" 
    : variant === "brand" 
    ? "font-brand" 
    : "font-sans";

  return (
    <Component className={cn(fontClass, className)}>
      {children}
    </Component>
  );
}