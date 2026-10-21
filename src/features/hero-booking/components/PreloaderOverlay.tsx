"use client";

import React from "react";
import { motion } from "framer-motion";

interface PreloaderOverlayProps {
  progress: number;
  isLoaded: boolean;
}

export function PreloaderOverlay({ progress, isLoaded }: PreloaderOverlayProps) {
  const normalizedProgress = Math.min(Math.max(progress / 100, 0), 1);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 p-5 sm:p-7">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 1000 650"
        preserveAspectRatio="none"
      >
        <rect
          x="1"
          y="1"
          width="998"
          height="648"
          rx="24"
          ry="24"
          fill="none"
          stroke="rgba(255, 255, 255, 0.42)"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={100 - normalizedProgress * 100}
          style={{
            transition: "stroke-dashoffset 60ms linear",
          }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1, y: isLoaded ? 8 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute bottom-11 left-11 sm:bottom-14 sm:left-14"
      >
        <span className="text-6xl sm:text-7xl font-light tracking-tight text-white/60 tabular-nums">
          {progress}%
        </span>
      </motion.div>
    </div>
  );
}
