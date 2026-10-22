"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CabinSceneBackgroundProps {
  isLit: boolean;
}

export function CabinSceneBackground({ isLit }: CabinSceneBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#1a282f]">
      <img
        src="/hero-cabin-bg.png"
        alt="Evergreen Pine Family Lodge in Nordic landscape"
        referrerPolicy="no-referrer"
        className={cn(
          "w-full h-full object-cover object-center transition-all duration-1000 ease-out select-none",
          isLit ? "brightness-100 scale-100" : "brightness-75 scale-[1.015]"
        )}
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-out",
          isLit ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "radial-gradient(circle at 46% 62%, rgba(234, 115, 35, 0.22) 0%, rgba(217, 119, 6, 0.08) 26%, transparent 55%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
    </div>
  );
}
