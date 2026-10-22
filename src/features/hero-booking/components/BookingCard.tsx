"use client";

import React from "react";
import { Calendar, Maximize2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { CabinBookingDetails } from "../types";

interface BookingCardProps {
  data: CabinBookingDetails;
}

export function BookingCard({ data }: BookingCardProps) {
  return (
    <GlassCard className="w-full sm:w-[340px] lg:w-[352px] bg-[#182227]/90 backdrop-blur-2xl border border-white/[0.1] rounded-[24px] p-5 sm:p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h2 className="text-[20px] sm:text-[22px] font-normal tracking-[-0.02em] text-white/95 leading-[1.22]">
          {data.titleLines[0]}
          <br />
          {data.titleLines[1]}
        </h2>
        <IconBadge
          aria-label="Expand cabin details"
          className="w-10 h-10 bg-white/[0.05] border-white/[0.12] text-white/80 hover:text-white hover:bg-white/15 shrink-0"
        >
          <Maximize2 className="w-4 h-4" />
        </IconBadge>
      </div>

      <div className="bg-white/[0.04] border border-white/[0.09] rounded-2xl px-3.5 py-3 mb-3 grid grid-cols-2 items-center">
        <div className="flex items-center gap-2.5 pr-3">
          <Calendar className="w-4 h-4 text-white/55 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[9.5px] uppercase tracking-[0.07em] text-white/50 font-medium leading-none mb-1">
              Check-in
            </span>
            <span className="text-sm font-semibold text-white leading-tight">
              {data.startDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 pl-3.5 border-l border-white/[0.09]">
          <Calendar className="w-4 h-4 text-white/55 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[9.5px] uppercase tracking-[0.07em] text-white/50 font-medium leading-none mb-1">
              Check-out
            </span>
            <span className="text-sm font-semibold text-white leading-tight">
              {data.endDate}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white/[0.04] border border-white/[0.09] rounded-2xl px-4 py-3 mb-4 grid grid-cols-2 items-center">
        <div className="flex flex-col pr-3">
          <span className="text-[11px] text-white/50 leading-tight">
            Check-in
          </span>
          <span className="text-xs sm:text-[13px] text-white/95 font-normal mt-1.5 leading-tight">
            {data.checkInTime}
          </span>
        </div>

        <div className="flex flex-col pl-4 border-l border-white/[0.09]">
          <span className="text-[11px] text-white/50 leading-tight">
            Check-out
          </span>
          <span className="text-xs sm:text-[13px] text-white/95 font-normal mt-1.5 leading-tight">
            {data.checkOutTime}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline">
            <span className="text-[28px] sm:text-[31px] font-medium tracking-[-0.03em] text-white leading-none tabular-nums">
              ${data.pricePerNight}
            </span>
            <span className="text-xs sm:text-[13px] text-white/65 ml-1 font-normal">
              /night
            </span>
          </div>
          <span className="text-xs sm:text-[13px] text-white/70">
            {data.guestsRange}
          </span>
        </div>
        <p className="text-[11.5px] text-[#d4a843] mt-1.5 font-normal tabular-nums">
          {data.nightsCount} nights · ${data.totalPrice} total
        </p>
      </div>

      <Button
        variant="primary"
        className="w-full py-3 sm:py-3.5 rounded-full text-xs sm:text-[13.5px] font-semibold tracking-[-0.01em] shadow-md"
      >
        Reserve · ${data.totalPrice}
      </Button>
    </GlassCard>
  );
}
