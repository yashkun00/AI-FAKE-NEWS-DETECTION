import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STAGES = [
  "Establishing connection to model...",
  "Parsing source content...",
  "Cross-referencing language patterns...",
  "Scoring credibility signals...",
];

export default function ScanningLoader() {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex((i) => (i + 1 < STAGES.length ? i + 1 : i));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-lg border border-signal-cyan/30 bg-base-panel/80 p-8">
      {/* sweeping scanline */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 h-24 w-full bg-gradient-to-b from-transparent via-signal-cyan/10 to-transparent animate-scanline" />
      </div>

      <div className="relative flex flex-col items-center gap-5 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-cyan/20" />
          <span className="absolute h-full w-full rounded-full border border-signal-cyan/40" />
          <span className="h-9 w-9 rounded-full border-2 border-signal-cyan border-t-transparent animate-spin" />
        </div>

        <div className="space-y-1">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-signal-cyan">
            Analyzing
          </p>
          <motion.p
            key={stageIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-sm text-signal-muted"
          >
            {STAGES[stageIndex]}
            <span className="animate-blink">_</span>
          </motion.p>
        </div>

        <div className="h-1 w-full max-w-xs overflow-hidden rounded-full bg-base-raised">
          <motion.div
            className="h-full bg-signal-cyan"
            initial={{ width: "5%" }}
            animate={{ width: `${((stageIndex + 1) / STAGES.length) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
