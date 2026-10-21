import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "glass";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98]",
          variant === "primary" &&
            "bg-white text-slate-950 hover:bg-white/90 shadow-sm",
          variant === "glass" &&
            "bg-white/10 text-white border border-white/15 hover:bg-white/20 backdrop-blur-md",
          size === "sm" && "px-5 py-2 text-sm rounded-full",
          size === "md" && "px-6 py-3 text-sm rounded-lg",
          size === "lg" && "px-8 py-3.5 text-base rounded-xl",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
