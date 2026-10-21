"use client";

import { useState, useEffect, useCallback } from "react";

interface UsePreloaderProgressReturn {
  progress: number;
  isLoaded: boolean;
  replay: () => void;
}

export function usePreloaderProgress(durationMs = 2200): UsePreloaderProgressReturn {
  const [progress, setProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [runId, setRunId] = useState<number>(0);

  const replay = useCallback(() => {
    setIsLoaded(false);
    setProgress(0);
    setRunId((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const easeInOutCubic = (t: number): number =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawRatio = Math.min(elapsed / durationMs, 1);
      const easedRatio = easeInOutCubic(rawRatio);
      const currentPercentage = Math.round(easedRatio * 100);

      setProgress(currentPercentage);

      if (rawRatio < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        const timeout = setTimeout(() => {
          setIsLoaded(true);
        }, 180);
        return () => clearTimeout(timeout);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [durationMs, runId]);

  return { progress, isLoaded, replay };
}
