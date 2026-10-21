import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-slate-950/65 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-2xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
