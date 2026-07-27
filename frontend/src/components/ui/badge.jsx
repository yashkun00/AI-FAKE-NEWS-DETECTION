import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono font-medium uppercase tracking-wider",
  {
    variants: {
      variant: {
        neutral: "border-base-line bg-base-raised text-signal-muted",
        cyan: "border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan",
        amber: "border-signal-amber/40 bg-signal-amber/10 text-signal-amber",
        red: "border-signal-red/40 bg-signal-red/10 text-signal-red",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
));
Badge.displayName = "Badge";

export { Badge, badgeVariants };
