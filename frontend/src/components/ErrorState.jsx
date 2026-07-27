import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorState({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4 rounded-lg border border-signal-red/40 bg-signal-red/5 p-6"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-signal-red/40 bg-signal-red/10">
        <AlertTriangle className="h-4.5 w-4.5 text-signal-red" strokeWidth={1.75} />
      </div>
      <div className="flex-1 space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-signal-red">
          Scan failed
        </p>
        <p className="text-sm text-signal-text/90">{message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-1">
            <RotateCw className="h-3.5 w-3.5" />
            Try again
          </Button>
        )}
      </div>
    </motion.div>
  );
}
