"use client";

import React from "react";
import { Calendar, Edit2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { CabinBookingDetails } from "../types";

interface BookingCardProps {
  data: CabinBookingDetails;
}

export function BookingCard({ data }: BookingCardProps) {
  return (
    <GlassCard className="w-full sm:w-[360px] text-white">
      <div className="flex items-start justify-between gap-4 mb-5">
        <h2 className="text-xl font-normal text-white leading-snug">
          {data.titleLines[0]}
          <br />
          {data.titleLines[1]}
        </h2>
        <IconBadge aria-label="Edit dates or cabin preferences">
          <Edit2 className="w-3.5 h-3.5" />
        </IconBadge>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 flex items-center gap-2.5 text-sm text-white/90">
          <Calendar className="w-4 h-4 text-white/60 shrink-0" />
          <span>{data.startDate}</span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 flex items-center gap-2.5 text-sm text-white/90">
          <Calendar className="w-4 h-4 text-white/60 shrink-0" />
          <span>{data.endDate}</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex flex-col justify-center">
          <span className="text-[11px] text-white/50 leading-tight">
            Check-in
          </span>
          <span className="text-xs text-white/90 font-medium mt-0.5">
            {data.checkInTime}
          </span>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex flex-col justify-center">
          <span className="text-[11px] text-white/50 leading-tight">
            Check-out
          </span>
          <span className="text-xs text-white/90 font-medium mt-0.5">
            {data.checkOutTime}
          </span>
        </div>
      </div>

      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="text-2xl font-semibold text-white">
            ${data.pricePerNight}
          </span>
          <span className="text-sm text-white/70">/night</span>
        </div>
        <span className="text-xs text-white/70">{data.guestsRange}</span>
      </div>

      <Button variant="primary" className="w-full py-3 rounded-lg font-medium">
        Reserve
      </Button>
    </GlassCard>
  );
}
