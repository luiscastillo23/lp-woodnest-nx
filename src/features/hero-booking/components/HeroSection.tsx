"use client";

import React from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
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

      <div className="relative z-30 flex flex-col justify-between w-full h-full min-h-0 px-4 py-4 sm:px-7 sm:py-6 lg:px-[4.4vw] lg:py-[6.6vh]">
        <Navbar items={NAV_ITEMS} isVisible={isLoaded} onReplay={replay} />

        <div className="relative flex flex-col flex-1 min-h-0 justify-between px-5 pb-5 pt-2 sm:px-8 sm:pb-6 lg:px-[2.8vw] lg:pb-[4.5vh] lg:pt-[4.2vh]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.18,
            }}
            className="max-w-xl"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[clamp(3rem,min(5vw,9.6vh),5.4rem)] font-light tracking-[-0.035em] text-white/95 leading-[1.04]">
              {HERO_HEADLINE.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
              className="flex flex-col sm:flex-row sm:items-end justify-between w-full lg:w-[56%] gap-6 sm:gap-10"
            >
              <p className="max-w-[245px] text-xs sm:text-[14.5px] font-light text-white/75 leading-[1.55]">
                {HERO_STATS.description}
              </p>
              <div className="sm:pb-1">
                <RatingBadge
                  rating={HERO_STATS.rating}
                  staysCount={HERO_STATS.staysCount}
                />
              </div>
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
              className="w-full sm:w-auto lg:absolute lg:right-[2.8vw] lg:bottom-[5.2vh] shrink-0"
            >
              <BookingCard data={CABIN_BOOKING_DATA} />
            </motion.div>
          </div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={replay}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="fixed bottom-1.5 right-3.5 z-40 inline-flex items-center gap-1.5 rounded-full bg-[#0d151a]/90 hover:bg-[#162229] border border-white/[0.08] px-3 py-1 text-[11px] font-normal text-white/70 hover:text-white backdrop-blur-md transition-colors shadow-lg"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Replay Intro</span>
      </motion.button>
    </ViewportFrame>
  );
}
