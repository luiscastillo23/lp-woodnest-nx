"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePreloaderProgress } from "@/hooks/usePreloaderProgress";
import { Navbar } from "@/components/layout/Navbar";
import { ViewportFrame } from "@/components/layout/ViewportFrame";
import { CabinSceneBackground } from "./CabinSceneBackground";
import { PreloaderOverlay } from "./PreloaderOverlay";
import { RatingBadge } from "./RatingBadge";
import { BookingCard } from "./BookingCard";
import {
  CABIN_BOOKING_DATA,
  HERO_HEADLINE,
  HERO_STATS,
  NAV_ITEMS,
} from "../data/cabinData";

export function HeroSection() {
  const { progress, isLoaded, replay } = usePreloaderProgress(2200);

  return (
    <ViewportFrame>
      <CabinSceneBackground isLit={isLoaded} />
      <PreloaderOverlay progress={progress} isLoaded={isLoaded} />

      <div className="relative z-30 flex flex-col justify-between w-full h-full p-5 sm:p-7">
        <Navbar items={NAV_ITEMS} isVisible={isLoaded} onReplay={replay} />

        <div className="flex flex-col flex-1 justify-between px-6 pb-6 pt-4 sm:px-10 sm:pb-9">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.18,
            }}
            className="mt-2 sm:mt-4"
          >
            <h1 className="text-5xl sm:text-7xl md:text-[84px] font-light tracking-tight text-white/90 leading-[1.04]">
              {HERO_HEADLINE.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
              className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12"
            >
              <p className="max-w-[260px] text-sm text-white/75 leading-relaxed">
                {HERO_STATS.description}
              </p>
              <RatingBadge
                rating={HERO_STATS.rating}
                staysCount={HERO_STATS.staysCount}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={
                isLoaded
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 22, scale: 0.98 }
              }
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.38,
              }}
            >
              <BookingCard data={CABIN_BOOKING_DATA} />
            </motion.div>
          </div>
        </div>
      </div>
    </ViewportFrame>
  );
}
