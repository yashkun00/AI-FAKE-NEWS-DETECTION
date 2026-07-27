import React from "react";

/**
 * Ambient tech backdrop: a faint drifting grid plus two soft radial glows.
 * Purely decorative, sits fixed behind all content.
 */
export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-base">
      <div className="absolute inset-0 bg-grid-faint bg-grid animate-grid-pan opacity-70" />
      <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-signal-cyan/10 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-signal-red/10 blur-[130px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-base" />
    </div>
  );
}
