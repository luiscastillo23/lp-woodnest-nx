"use client";

import React from "react";
import { motion } from "framer-motion";
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
      className="relative z-30 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8"
    >
      <button
        onClick={onReplay}
        title="Click to replay loading sequence"
        className="flex items-center gap-2.5 group focus:outline-none"
      >
        <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 shadow-[0_0_16px_rgba(251,191,36,0.75)] transition-transform duration-300 group-hover:scale-110" />
        <span className="text-lg font-medium tracking-tight text-white">
          WoodNest
        </span>
      </button>

      <div className="flex items-center gap-6 md:gap-9">
        <nav className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button variant="primary" size="sm">
          Book Now
        </Button>
      </div>
    </motion.header>
  );
}
