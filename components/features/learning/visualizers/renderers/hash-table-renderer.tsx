import { AnimatePresence, motion } from "motion/react"

import type { VisualizationStep } from "@/types/curriculum"

interface HashTableRendererProps {
  currentData: VisualizationStep
}

export function HashTableRenderer({ currentData }: HashTableRendererProps) {
  const buckets = (currentData.auxiliary as any)?.buckets || []
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-6">
      {buckets.map((bucket: number[], idx: number) => {
        const isTargetBucket =
          (currentData.auxiliary as any)?.currentBucket === idx
        return (
          <div key={idx} className="flex items-center gap-4">
            {/* Index Bucket */}
            <motion.div
              animate={{
                backgroundColor: isTargetBucket
                  ? "hsl(var(--primary)/0.1)"
                  : "hsl(var(--muted))",
                borderColor: isTargetBucket
                  ? "hsl(var(--primary))"
                  : "transparent",
              }}
              className="bg-muted text-muted-foreground flex h-12 w-16 shrink-0 items-center justify-center rounded-lg border font-mono text-sm font-bold shadow-sm"
            >
              {idx}
            </motion.div>

            {/* Connector */}
            <div className="bg-border relative h-0.5 w-6">
              <div className="bg-border absolute top-1/2 right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full"></div>
            </div>

            {/* Chain */}
            <div className="flex flex-1 flex-wrap gap-2">
              <AnimatePresence mode="popLayout">
                {bucket.map((val, bIdx) => (
                  <motion.div
                    key={`${idx}-${bIdx}-${val}`}
                    initial={{ opacity: 0, scale: 0.5, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ type: "spring" }}
                    className="bg-card flex h-12 w-12 items-center justify-center rounded-lg border font-bold shadow-sm"
                  >
                    {val}
                  </motion.div>
                ))}
              </AnimatePresence>
              {bucket.length === 0 && (
                <span className="text-muted-foreground self-center px-2 text-xs italic">
                  Null
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
