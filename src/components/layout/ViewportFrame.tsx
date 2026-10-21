"use client";

import React from "react";

interface ViewportFrameProps {
  children: React.ReactNode;
}

export function ViewportFrame({ children }: ViewportFrameProps) {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0c1a24] p-2 sm:p-4 select-none">
      <div className="relative w-full h-full rounded-[28px] overflow-hidden shadow-2xl border border-white/10">
        {children}
      </div>
    </main>
  );
}
