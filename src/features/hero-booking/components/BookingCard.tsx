"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Calendar,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CabinBookingDetails } from "../types";

interface BookingCardProps {
  data: CabinBookingDetails;
}

type ActiveDateField = "checkIn" | "checkOut";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const SHORT_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Anchor "Today" to Oct 21, 2026 as shown in the reference design
const MIN_DATE = new Date(2026, 9, 21);
const MAX_DATE = new Date(2027, 9, 21);

function stripTime(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatShortDate(d: Date): string {
  return `${SHORT_MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;
}

function diffNights(start: Date, end: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(
    1,
    Math.round((stripTime(end).getTime() - stripTime(start).getTime()) / msPerDay)
  );
}

export function BookingCard({ data }: BookingCardProps) {
  const [checkInDate, setCheckInDate] = useState<Date>(() => new Date(2026, 9, 21));
  const [checkOutDate, setCheckOutDate] = useState<Date>(() => new Date(2026, 9, 24));
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<ActiveDateField>("checkIn");
  const [viewMonth, setViewMonth] = useState<{ year: number; month: number }>({
    year: 2026,
    month: 9, // October (0-indexed)
  });

  const dateContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isCalendarOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateContainerRef.current &&
        !dateContainerRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCalendarOpen]);

  const nightsCount = useMemo(
    () => diffNights(checkInDate, checkOutDate),
    [checkInDate, checkOutDate]
  );

  const totalPrice = useMemo(
    () => nightsCount * data.pricePerNight,
    [nightsCount, data.pricePerNight]
  );

  const formattedCheckIn = useMemo(() => formatShortDate(checkInDate), [checkInDate]);
  const formattedCheckOut = useMemo(() => formatShortDate(checkOutDate), [checkOutDate]);

  const canGoPrevMonth =
    viewMonth.year > MIN_DATE.getFullYear() ||
    (viewMonth.year === MIN_DATE.getFullYear() &&
      viewMonth.month > MIN_DATE.getMonth());

  const canGoNextMonth =
    viewMonth.year < MAX_DATE.getFullYear() ||
    (viewMonth.year === MAX_DATE.getFullYear() &&
      viewMonth.month < MAX_DATE.getMonth());

  const handlePrevMonth = () => {
    if (!canGoPrevMonth) return;
    setViewMonth((prev) =>
      prev.month === 0
        ? { year: prev.year - 1, month: 11 }
        : { year: prev.year, month: prev.month - 1 }
    );
  };

  const handleNextMonth = () => {
    if (!canGoNextMonth) return;
    setViewMonth((prev) =>
      prev.month === 11
        ? { year: prev.year + 1, month: 0 }
        : { year: prev.year, month: prev.month + 1 }
    );
  };

  const handleOpenField = (field: ActiveDateField) => {
    setActiveField(field);
    const targetDate = field === "checkIn" ? checkInDate : checkOutDate;
    setViewMonth({
      year: targetDate.getFullYear(),
      month: targetDate.getMonth(),
    });
    setIsCalendarOpen(true);
  };

  const handleSelectDay = (day: number) => {
    const clicked = new Date(viewMonth.year, viewMonth.month, day);
    if (clicked < MIN_DATE || clicked > MAX_DATE) return;

    if (activeField === "checkIn") {
      setCheckInDate(clicked);
      if (clicked >= checkOutDate) {
        const nextDay = new Date(clicked.getFullYear(), clicked.getMonth(), clicked.getDate() + 1);
        setCheckOutDate(nextDay <= MAX_DATE ? nextDay : clicked);
      }
      setActiveField("checkOut");
    } else {
      if (clicked <= checkInDate) {
        setCheckInDate(clicked);
        const nextDay = new Date(clicked.getFullYear(), clicked.getMonth(), clicked.getDate() + 1);
        setCheckOutDate(nextDay <= MAX_DATE ? nextDay : clicked);
      } else {
        setCheckOutDate(clicked);
      }
    }
  };

  const calendarCells = useMemo(() => {
    const firstDayOfMonth = new Date(viewMonth.year, viewMonth.month, 1).getDay();
    const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate();
    const cells: Array<number | null> = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(d);
    }
    return cells;
  }, [viewMonth]);

  return (
    <GlassCard
      className={cn(
        "relative w-full sm:w-[340px] lg:w-[356px] bg-[#182227]/90 backdrop-blur-2xl border border-white/[0.1] rounded-[24px] p-5 sm:p-6 text-white shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out",
        isCalendarOpen && "-translate-y-12 sm:-translate-y-14 lg:-translate-y-16 z-50"
      )}
    >
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

      {/* Date Selector + Calendar Popover Container (div:nth-of-type(2)) */}
      <div ref={dateContainerRef} className="relative mb-3">
        <div
          className={cn(
            "rounded-[18px] p-1.5 grid grid-cols-2 gap-1.5 items-center transition-all duration-200",
            isCalendarOpen
              ? "bg-[#343e43]/90 border-[1.5px] border-[#d4a72c]/85 shadow-[0_0_20px_rgba(247,195,46,0.18)]"
              : "bg-white/[0.04] border border-white/[0.09]"
          )}
        >
          <button
            type="button"
            onClick={() => handleOpenField("checkIn")}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-[13px] text-left transition-all duration-200 focus:outline-none",
              isCalendarOpen && activeField === "checkIn"
                ? "bg-[#6d633c]/75 border border-[#c8a642]/75 shadow-inner"
                : "border border-transparent hover:bg-white/[0.04]"
            )}
          >
            <Calendar
              className={cn(
                "w-4 h-4 shrink-0 transition-colors",
                isCalendarOpen && activeField === "checkIn"
                  ? "text-[#f7c32e]"
                  : "text-white/55"
              )}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[9.5px] uppercase tracking-[0.07em] text-white/60 font-semibold leading-none mb-1">
                Check-in
              </span>
              <span className="text-sm sm:text-[15.5px] font-semibold text-white leading-tight truncate">
                {formattedCheckIn}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleOpenField("checkOut")}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 rounded-[13px] text-left transition-all duration-200 focus:outline-none",
              isCalendarOpen && activeField === "checkOut"
                ? "bg-[#6d633c]/75 border border-[#c8a642]/75 shadow-inner"
                : cn(
                    "border border-transparent hover:bg-white/[0.04]",
                    !isCalendarOpen && "border-l border-l-white/[0.09] rounded-l-none pl-3.5"
                  )
            )}
          >
            <Calendar
              className={cn(
                "w-4 h-4 shrink-0 transition-colors",
                isCalendarOpen && activeField === "checkOut"
                  ? "text-[#f7c32e]"
                  : "text-white/55"
              )}
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[9.5px] uppercase tracking-[0.07em] text-white/60 font-semibold leading-none mb-1">
                Check-out
              </span>
              <span className="text-sm sm:text-[15.5px] font-semibold text-white leading-tight truncate">
                {formattedCheckOut}
              </span>
            </div>
          </button>
        </div>

        {isCalendarOpen && (
          <div className="absolute -left-2 -right-2 sm:-left-3 sm:-right-3 top-[calc(100%+10px)] z-50 rounded-[22px] bg-[#161f24]/95 backdrop-blur-2xl border border-[#9e8229]/65 p-3 sm:p-3.5 shadow-[0_28px_65px_rgba(0,0,0,0.85)]">
            {/* Top Diamond Pointer */}
            <div
              className={cn(
                "pointer-events-none absolute -top-[7px] w-3.5 h-3.5 rotate-45 bg-[#11191d] border border-[#9e8229]/60 transition-all duration-200",
                activeField === "checkIn" ? "left-[24%]" : "left-[74%]"
              )}
            />

            {/* Segmented Mode Switcher */}
            <div className="relative z-10 bg-[#263036] border border-white/[0.1] rounded-[13px] p-1 grid grid-cols-2 gap-1 mb-2.5">
              <button
                type="button"
                onClick={() => setActiveField("checkIn")}
                className={cn(
                  "flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-[9px] text-[11.5px] transition-all focus:outline-none",
                  activeField === "checkIn"
                    ? "bg-[#f7c32e] text-[#0f171e] font-semibold shadow-sm"
                    : "text-white/75 hover:text-white"
                )}
              >
                <span className="truncate">Inicial (Che...</span>
                <span className="font-bold shrink-0">{formattedCheckIn}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveField("checkOut")}
                className={cn(
                  "flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-[9px] text-[11.5px] transition-all focus:outline-none",
                  activeField === "checkOut"
                    ? "bg-[#f7c32e] text-[#0f171e] font-semibold shadow-sm"
                    : "text-white/75 hover:text-white"
                )}
              >
                <span className="truncate">Final (Chec...</span>
                <span className="font-bold shrink-0">{formattedCheckOut}</span>
              </button>
            </div>

            {/* Month Header */}
            <div className="flex items-center justify-between px-1 pb-2 border-b border-white/[0.08] mb-1.5">
              <button
                type="button"
                onClick={handleNextOrPrev(handlePrevMonth)}
                disabled={!canGoPrevMonth}
                aria-label="Previous month"
                className={cn(
                  "p-1 rounded-full transition-colors focus:outline-none",
                  canGoPrevMonth
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-white/25 cursor-not-allowed"
                )}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-[13.5px] font-bold text-white tracking-tight">
                {MONTH_NAMES[viewMonth.month]} {viewMonth.year}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleNextOrPrev(handleNextMonth)}
                  disabled={!canGoNextMonth}
                  aria-label="Next month"
                  className={cn(
                    "p-1 rounded-full transition-colors focus:outline-none",
                    canGoNextMonth
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : "text-white/25 cursor-not-allowed"
                  )}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(false)}
                  aria-label="Close calendar"
                  className="p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Calendar Grid with subtle central radial illumination */}
            <div
              className="relative py-0.5"
              style={{
                background:
                  "radial-gradient(circle at 50% 58%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 72%)",
              }}
            >
              <div className="grid grid-cols-7 text-center mb-0.5">
                {WEEKDAYS.map((dayName) => (
                  <span
                    key={dayName}
                    className="text-[11px] font-medium text-white/45 py-1"
                  >
                    {dayName}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-0.5 text-center items-center">
                {calendarCells.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="h-7 sm:h-7" />;
                  }

                  const cellDate = new Date(viewMonth.year, viewMonth.month, day);
                  const isDisabled = cellDate < MIN_DATE || cellDate > MAX_DATE;
                  const isStart = isSameDay(cellDate, checkInDate);
                  const isEnd = isSameDay(cellDate, checkOutDate);
                  const isInRange =
                    cellDate > checkInDate && cellDate < checkOutDate;

                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => handleSelectDay(day)}
                      className={cn(
                        "relative h-7 sm:h-[30px] w-full text-xs flex items-center justify-center transition-all focus:outline-none tabular-nums",
                        isDisabled &&
                          "text-white/25 line-through cursor-not-allowed",
                        !isDisabled &&
                          !isStart &&
                          !isEnd &&
                          !isInRange &&
                          "text-white/95 hover:bg-white/10 rounded-[9px] font-medium",
                        isInRange &&
                          "bg-[#8c8156]/85 text-white font-medium rounded-[3px] mx-[1px]",
                        (isStart || isEnd) &&
                          "bg-[#f7c32e] text-[#0f171e] font-bold rounded-[9px] shadow-sm z-10"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calendar Footer */}
            <div className="border-t border-white/[0.09] pt-2 mt-1.5">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="text-white/50 truncate mr-2">
                  Permitido: Hoy (Oct 21) – Oct 21, &apos;27
                </span>
                <span className="text-[#f7c32e] font-semibold shrink-0 tabular-nums">
                  {nightsCount} {nightsCount === 1 ? "night" : "nights"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-white/95 tracking-tight tabular-nums">
                  {formattedCheckIn} → {formattedCheckOut}
                </span>

                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#f7c32e] hover:bg-[#fbbf24] text-[#0f171e] font-bold text-xs px-4 py-1.5 shadow-md transition-all active:scale-95 focus:outline-none"
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Done</span>
                </button>
              </div>
            </div>
          </div>
        )}
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
          {nightsCount} {nightsCount === 1 ? "night" : "nights"} · ${totalPrice} total
        </p>
      </div>

      <Button
        variant="primary"
        className="w-full py-3 sm:py-3.5 rounded-full text-xs sm:text-[13.5px] font-semibold tracking-[-0.01em] shadow-md"
      >
        Reserve · ${totalPrice}
      </Button>
    </GlassCard>
  );
}

function handleNextOrPrev(fn: () => void) {
  return (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fn();
  };
}
