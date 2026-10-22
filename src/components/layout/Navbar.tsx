"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NavItem } from "@/features/hero-booking/types";

interface NavbarProps {
  items: NavItem[];
  isVisible: boolean;
  onReplay?: () => void;
}

export function Navbar({ items, isVisible, onReplay }: NavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="relative z-30 flex items-center justify-between px-5 pt-4 sm:px-8 sm:pt-5 lg:px-[2.8vw] lg:pt-[3.8vh]"
    >
      <button
        onClick={onReplay}
        title="Click to replay loading sequence"
        className="flex items-center gap-2.5 group focus:outline-none"
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/45 border border-white/10 transition-transform duration-300 group-hover:scale-105">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.65)]" />
        </span>
        <span className="text-lg sm:text-[19px] font-semibold tracking-[-0.02em] text-white">
          WoodNest
        </span>
      </button>

      <div className="flex items-center gap-6 md:gap-10 lg:gap-11">
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs sm:text-[13.5px] font-normal text-white/85 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button
          variant="primary"
          size="sm"
          className="px-6 py-2.5 text-xs sm:text-[13.5px] font-semibold shadow-sm"
        >
          Book Now
        </Button>
      </div>
    </motion.header>
  );
}
