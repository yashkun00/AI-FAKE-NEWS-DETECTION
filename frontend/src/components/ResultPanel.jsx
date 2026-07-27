import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldQuestion, Clock, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ConfidenceGauge from "@/components/ConfidenceGauge";
import { getRiskTone, getPredictionTone, normalizeConfidence, formatTimestamp } from "@/lib/risk";

function PredictionIcon({ prediction }) {
  const tone = getPredictionTone(prediction);
  const props = { className: "h-5 w-5", strokeWidth: 1.75, style: { color: tone.color } };
  if (tone.variant === "red") return <ShieldAlert {...props} />;
  if (tone.variant === "cyan") return <ShieldCheck {...props} />;
  return <ShieldQuestion {...props} />;
}

export default function ResultPanel({ result }) {
  const { prediction, confidence, risk_level, summary, advice, timestamp } = result;
  const riskTone = getRiskTone(risk_level);
  const predictionTone = getPredictionTone(prediction);
  const confidenceValue = normalizeConfidence(confidence);
  const displayTime = formatTimestamp(timestamp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="border-glow overflow-hidden">
        <div className="flex items-center justify-between border-b border-base-line px-6 py-3">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-signal-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-signal-cyan" />
            Scan result
          </div>
          {displayTime && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-signal-muted">
              <Clock className="h-3 w-3" />
              {displayTime}
            </div>
          )}
        </div>

        <CardContent className="grid gap-8 p-6 sm:grid-cols-[auto,1fr] sm:items-center">
          <div className="flex justify-center sm:justify-start">
            <ConfidenceGauge value={confidenceValue} color={riskTone.color} />
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-md border border-base-line bg-base-raised px-3 py-1.5">
                <PredictionIcon prediction={prediction} />
                <span
                  className="font-display text-base font-semibold tracking-wide"
                  style={{ color: predictionTone.color }}
                >
                  {prediction || "Unclassified"}
                </span>
              </div>
              <Badge variant={riskTone.variant}>{riskTone.label} risk</Badge>
            </div>

            {summary && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal-muted mb-1">
                  Summary
                </p>
                <p className="text-sm leading-relaxed text-signal-text/90">{summary}</p>
              </div>
            )}
          </div>
        </CardContent>

        {advice && (
          <div className="flex items-start gap-3 border-t border-base-line bg-base-raised/50 px-6 py-4">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-signal-amber" strokeWidth={1.75} />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-signal-amber mb-1">
                Advice
              </p>
              <p className="text-sm leading-relaxed text-signal-text/85">{advice}</p>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
