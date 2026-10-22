"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderOverlayProps {
  progress: number;
  isLoaded: boolean;
}

export function PreloaderOverlay({ progress, isLoaded }: PreloaderOverlayProps) {
  const normalizedProgress = Math.min(Math.max(progress / 100, 0), 1);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 1600,
    height: 900,
  });

  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    const updateDimensions = () => {
      const rect = svgEl.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    };

    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(svgEl);
    window.addEventListener("resize", updateDimensions);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const rectWidth = Math.max(dimensions.width - 2, 10);
  const rectHeight = Math.max(dimensions.height - 2, 10);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 px-4 py-4 sm:px-7 sm:py-6 lg:px-[4.4vw] lg:py-[6.6vh]">
      <svg
        ref={svgRef}
        className="w-full h-full overflow-visible"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <rect
          x={1}
          y={1}
          width={rectWidth}
          height={rectHeight}
          rx={28}
          ry={28}
          fill="none"
          stroke="rgba(255, 255, 255, 0.48)"
          strokeWidth={1.15}
          pathLength={100}
          strokeDasharray={isLoaded ? "none" : "100"}
          strokeDashoffset={isLoaded ? 0 : 100 - normalizedProgress * 100}
          style={{
            transition: isLoaded ? "none" : "stroke-dashoffset 60ms linear",
          }}
        />
      </svg>

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1, y: isLoaded ? 8 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute bottom-10 left-10 sm:bottom-14 sm:left-14"
      >
        <span className="text-6xl sm:text-7xl font-light tracking-tight text-white/60 tabular-nums">
          {progress}%
        </span>
      </motion.div>
    </div>
  );
}
