import React from "react";
import { cn } from "@/lib/utils";

interface IconBadgeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function IconBadge({ children, className, ...props }: IconBadgeProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center bg-white/10 border border-white/15 rounded-full p-2.5 text-white/85 hover:text-white hover:bg-white/20 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
