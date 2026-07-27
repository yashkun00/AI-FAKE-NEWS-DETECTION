import React from "react";
import { Radar } from "lucide-react";
import { BASE_URL } from "@/lib/api";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-base-line/80 bg-base/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-signal-cyan/30 bg-signal-cyan/10">
            <Radar className="h-5 w-5 text-signal-cyan" strokeWidth={1.75} />
          </div>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold tracking-[0.2em] text-signal-text">
              AI
            </p>
            <p className="font-mono text-[10px] tracking-widest text-signal-muted">
              NEWS INTEGRITY SCANNER
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-base-line px-3 py-1.5 font-mono text-[11px] text-signal-muted sm:flex">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-signal-cyan" />
          </span>
          <span>{BASE_URL.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    </header>
  );
}
