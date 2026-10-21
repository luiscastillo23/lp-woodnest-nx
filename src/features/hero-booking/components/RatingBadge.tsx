import React from "react";
import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
  staysCount: string;
}

export function RatingBadge({ rating, staysCount }: RatingBadgeProps) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
        <span className="text-xl font-semibold text-white tracking-tight">
          {rating}
        </span>
      </div>
      <span className="text-sm text-white/70 mt-0.5">{staysCount}</span>
    </div>
  );
}
