"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CabinSceneBackgroundProps {
  isLit: boolean;
}

export function CabinSceneBackground({ isLit }: CabinSceneBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#2b4c5e]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #5c7f8e 0%, #3d6273 38%, #203d4c 72%, #0d1c24 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(165, 200, 214, 0.35) 0%, rgba(45, 79, 94, 0.1) 60%, transparent 100%)",
        }}
      />

      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="relative w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3c5a69" />
            <stop offset="100%" stopColor="#1d333f" />
          </linearGradient>

          <radialGradient id="warmInteriorGlow" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#ff9d2e" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#ea580c" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="porchSpill" cx="45%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#b45309" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
          </radialGradient>

          <g id="pineTree">
            <rect x="-6" y="0" width="12" height="320" fill="#132833" />
            <polygon points="0,-240 -75,-120 75,-120" fill="#213f4e" />
            <polygon points="0,-180 -95,-40 95,-40" fill="#1c3846" />
            <polygon points="0,-110 -115,40 115,40" fill="#17303d" />
            <polygon points="0,-40 -130,120 130,120" fill="#122733" />
          </g>
        </defs>

        <g opacity="0.28" transform="translate(0, 20)">
          <use href="#pineTree" x="140" y="340" transform="scale(0.9)" />
          <use href="#pineTree" x="310" y="290" transform="scale(1.1)" />
          <use href="#pineTree" x="520" y="270" transform="scale(1.25)" />
          <use href="#pineTree" x="950" y="310" transform="scale(1.05)" />
          <use href="#pineTree" x="1180" y="260" transform="scale(1.3)" />
          <use href="#pineTree" x="1450" y="330" transform="scale(1.1)" />
        </g>

        <g opacity="0.55">
          <use href="#pineTree" x="90" y="370" transform="scale(1.25)" />
          <use href="#pineTree" x="350" y="320" transform="scale(1.45)" />
          <use href="#pineTree" x="585" y="350" transform="scale(1.2)" />
          <use href="#pineTree" x="880" y="390" transform="scale(1.15)" />
          <use href="#pineTree" x="1140" y="310" transform="scale(1.5)" />
          <use href="#pineTree" x="1390" y="360" transform="scale(1.3)" />
        </g>

        <rect
          x="0"
          y="420"
          width="1600"
          height="280"
          fill="url(#roofGrad)"
          opacity="0.35"
        />

        <g transform="translate(1070, 420) scale(1.55)" opacity="0.92">
          <use href="#pineTree" x="0" y="0" />
        </g>

        <path
          d="M0,710 Q420,675 820,715 T1600,730 L1600,1000 L0,1000 Z"
          fill="#0c1820"
        />
        <path
          d="M0,745 Q380,710 790,755 T1600,790 L1600,1000 L0,1000 Z"
          fill="#132128"
        />

        <path
          d="M680,735 Q730,820 920,1000 L1180,1000 Q910,825 760,735 Z"
          fill="#263235"
          opacity="0.7"
        />

        <ellipse
          cx="650"
          cy="785"
          rx="420"
          ry="145"
          fill="url(#porchSpill)"
          className={cn(
            "transition-opacity duration-1000 ease-out",
            isLit ? "opacity-100" : "opacity-0"
          )}
        />

        <g transform="translate(215, 425)">
          <g fill="#0b171f">
            <rect x="20" y="255" width="760" height="12" />
            <rect x="45" y="265" width="10" height="48" />
            <rect x="165" y="265" width="10" height="45" />
            <rect x="305" y="265" width="10" height="46" />
            <rect x="445" y="265" width="10" height="48" />
            <rect x="575" y="265" width="10" height="50" />
            <rect x="695" y="265" width="10" height="52" />
            <rect x="755" y="265" width="10" height="48" />
          </g>

          <polygon
            points="55,115 625,115 745,255 55,255"
            fill="#1a2f3b"
            stroke="#274252"
            strokeWidth="1.5"
          />
          <polygon points="625,85 745,115 745,255 625,255" fill="#132530" />

          <g>
            <rect
              x="105"
              y="150"
              width="92"
              height="52"
              fill="#293d47"
              stroke="#102029"
              strokeWidth="4"
            />
            <line
              x1="151"
              y1="150"
              x2="151"
              y2="202"
              stroke="#102029"
              strokeWidth="4"
            />

            <rect
              x="235"
              y="152"
              width="38"
              height="95"
              fill="#162833"
              stroke="#0e1c24"
              strokeWidth="3"
            />

            <rect
              x="325"
              y="142"
              width="255"
              height="105"
              fill="#2c3e45"
              stroke="#0f1e26"
              strokeWidth="5"
            />
            <line
              x1="410"
              y1="142"
              x2="410"
              y2="247"
              stroke="#0f1e26"
              strokeWidth="5"
            />
            <line
              x1="495"
              y1="142"
              x2="495"
              y2="247"
              stroke="#0f1e26"
              strokeWidth="5"
            />

            <rect
              x="660"
              y="156"
              width="46"
              height="55"
              fill="#1e313b"
              stroke="#0e1c24"
              strokeWidth="3"
            />
          </g>

          <g
            className={cn(
              "transition-opacity duration-1000 ease-in-out",
              isLit ? "opacity-100" : "opacity-0"
            )}
          >
            <ellipse
              cx="435"
              cy="205"
              rx="310"
              ry="120"
              fill="url(#warmInteriorGlow)"
            />

            <rect
              x="105"
              y="150"
              width="92"
              height="52"
              fill="#f59e0b"
              stroke="#1a120b"
              strokeWidth="4"
            />
            <line
              x1="151"
              y1="150"
              x2="151"
              y2="202"
              stroke="#1a120b"
              strokeWidth="4"
            />

            <rect
              x="325"
              y="142"
              width="255"
              height="105"
              fill="#ffedd5"
              stroke="#1f140e"
              strokeWidth="5"
            />
            <rect
              x="328"
              y="145"
              width="249"
              height="99"
              fill="#f97316"
              opacity="0.82"
            />
            <ellipse
              cx="450"
              cy="195"
              rx="95"
              ry="42"
              fill="#fef08a"
              opacity="0.85"
            />
            <line
              x1="410"
              y1="142"
              x2="410"
              y2="247"
              stroke="#1f140e"
              strokeWidth="5"
            />
            <line
              x1="495"
              y1="142"
              x2="495"
              y2="247"
              stroke="#1f140e"
              strokeWidth="5"
            />

            <rect
              x="660"
              y="156"
              width="46"
              height="55"
              fill="#d97706"
              stroke="#1a120b"
              strokeWidth="3"
            />

            <polygon
              points="300,247 600,247 640,262 270,262"
              fill="#fb923c"
              opacity="0.55"
            />
          </g>

          <g stroke="#253f4d" strokeWidth="3" fill="none">
            <line x1="20" y1="212" x2="615" y2="212" />
            <line x1="20" y1="232" x2="615" y2="232" />
            <line x1="20" y1="252" x2="615" y2="252" />
            <line x1="22" y1="210" x2="22" y2="256" strokeWidth="5" />
            <line x1="140" y1="210" x2="140" y2="256" strokeWidth="5" />
            <line x1="265" y1="210" x2="265" y2="256" strokeWidth="5" />
            <line x1="390" y1="210" x2="390" y2="256" strokeWidth="5" />
            <line x1="465" y1="210" x2="465" y2="256" strokeWidth="5" />
            <line x1="612" y1="210" x2="612" y2="256" strokeWidth="5" />
          </g>

          <rect x="378" y="2" width="24" height="75" fill="#12222b" />
          <polygon
            points="15,120 85,35 665,35 615,120"
            fill="url(#roofGrad)"
            stroke="#4d6e7f"
            strokeWidth="1.5"
          />
          <polygon points="665,35 775,118 615,120" fill="#162934" />
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20" />
    </div>
  );
}
