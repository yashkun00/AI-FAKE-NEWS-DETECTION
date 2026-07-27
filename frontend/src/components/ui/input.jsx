import React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "flex h-11 w-full rounded-md border border-base-line bg-base/60 px-4 py-2 text-sm font-body text-signal-text placeholder:text-signal-muted/70",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-cyan focus-visible:border-signal-cyan",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };
