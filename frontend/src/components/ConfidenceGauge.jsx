import React from "react";
import { motion } from "framer-motion";

const RADIUS = 80;
const STROKE = 12;
const CIRCUMFERENCE = Math.PI * RADIUS; // half circle length

export default function ConfidenceGauge({ value = 0, color = "#2BF3D6" }) {
  const clamped = Math.min(100, Math.max(0, value));
  const offset = CIRCUMFERENCE - (clamped / 100) * CIRCUMFERENCE;
  const size = RADIUS * 2 + STROKE;

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size / 2 + STROKE / 2}
        viewBox={`0 0 ${size} ${size / 2 + STROKE / 2}`}
        className="overflow-visible"
      >
        {/* track */}
        <path
          d={`M ${STROKE / 2} ${size / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${size - STROKE / 2} ${size / 2}`}
          fill="none"
          stroke="#1B2740"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        {/* value arc */}
        <motion.path
          d={`M ${STROKE / 2} ${size / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${size - STROKE / 2} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color}90)` }}
        />
      </svg>

      <div className="-mt-11 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-3xl font-semibold tabular-nums text-signal-text"
          style={{ color }}
        >
          {clamped}
          <span className="text-base">%</span>
        </motion.span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal-muted">
          confidence
        </span>
      </div>
    </div>
  );
}
