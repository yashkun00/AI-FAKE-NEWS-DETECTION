import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar } from "lucide-react";
import BackgroundGrid from "@/components/BackgroundGrid";
import Navbar from "@/components/Navbar";
import AnalyzerPanel from "@/components/AnalyzerPanel";
import ScanningLoader from "@/components/ScanningLoader";
import ErrorState from "@/components/ErrorState";
import ResultPanel from "@/components/ResultPanel";
import { predictText, predictUrl, predictImage} from "@/lib/api";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [lastRequest, setLastRequest] = useState(null);

  const runScan = useCallback(async (type, payload) => {
    setLoading(true);
    setError(null);
    setResult(null);
    setLastRequest({ type, payload });

    try {
      let data;
      if (type === "text") data = await predictText(payload);
      else if (type === "url") data = await predictUrl(payload);
      else if (type === "image") data = await predictImage(payload);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRetry = useCallback(() => {
    if (lastRequest) runScan(lastRequest.type, lastRequest.payload);
  }, [lastRequest, runScan]);

  return (
    <div className="relative min-h-screen">
      <BackgroundGrid />
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-16">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-signal-cyan/30 bg-signal-cyan/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-signal-cyan">
            <Radar className="h-3.5 w-3.5 animate-[spin_4s_linear_infinite]" />
            Real-time credibility analysis
          </div>
          <h1 className="text-glow font-display text-4xl font-semibold tracking-tight text-signal-text sm:text-5xl">
            Is it signal, or is it noise?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-sm leading-relaxed text-signal-muted sm:text-base">
            Paste a headline, drop a link, or upload a screenshot. The model scores it for
            credibility and tells you exactly why.
          </p>
        </motion.section>

        {/* Analyzer */}
        <section className="mx-auto max-w-2xl">
          <AnalyzerPanel onSubmit={runScan} loading={loading} />

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="loading" exit={{ opacity: 0 }}>
                  <ScanningLoader />
                </motion.div>
              )}
              {!loading && error && (
                <motion.div key="error" exit={{ opacity: 0 }}>
                  <ErrorState message={error} onRetry={handleRetry} />
                </motion.div>
              )}
              {!loading && !error && result && (
                <motion.div key="result" exit={{ opacity: 0 }}>
                  <ResultPanel result={result} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <footer className="border-t border-base-line/70 py-6 text-center font-mono text-[11px] text-signal-muted">
        AI — analysis is model-generated and may be imperfect. Verify critical claims independently.
      </footer>
    </div>
  );
}
