"use client";

import React from "react";

interface ViewportFrameProps {
  children: React.ReactNode;
}

export function ViewportFrame({ children }: ViewportFrameProps) {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#111d23] select-none">
      <div className="relative w-full h-full overflow-hidden">
        {children}
      </div>
    </main>
  );
}
