import React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex w-full rounded-md border border-base-line bg-base/60 px-4 py-3 text-sm font-body text-signal-text placeholder:text-signal-muted/70",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-cyan focus-visible:border-signal-cyan",
      "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
