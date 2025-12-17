import { AnimatePresence, motion } from "motion/react"

import type { VisualizationStep } from "@/types/curriculum"

interface HashTableRendererProps {
  currentData: VisualizationStep
}

export function HashTableRenderer({ currentData }: HashTableRendererProps) {
  const buckets = (currentData.auxiliary as any)?.buckets || []
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 p-6 sm:p-8">
      {buckets.map((bucket: number[], idx: number) => {
        const isTargetBucket =
          (currentData.auxiliary as any)?.currentBucket === idx
        return (
          <div key={idx} className="flex items-center gap-3 sm:gap-4">
            {/* Index Bucket */}
            <motion.div
              animate={{
                backgroundColor: isTargetBucket
                  ? "hsl(var(--primary))"
                  : "hsl(var(--background))",
                borderColor: isTargetBucket
                  ? "hsl(var(--primary))"
                  : "hsl(var(--border))",
                color: isTargetBucket
                  ? "hsl(var(--primary-foreground))"
                  : "hsl(var(--foreground))",
                boxShadow: isTargetBucket
                  ? "0 8px 20px -4px hsl(var(--primary) / 0.4)"
                  : "0 4px 12px -2px rgb(0 0 0 / 0.1)",
              }}
              className="flex h-10 w-12 shrink-0 items-center justify-center rounded-xl border-2 font-mono text-sm font-bold backdrop-blur-sm sm:h-12 sm:w-14"
            >
              {idx}
            </motion.div>

            {/* Connector */}
            <div className="relative h-0.5 w-4 bg-border/60 sm:w-6">
              <div className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-border/60"></div>
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
                    className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-border bg-background text-base font-bold shadow-lg backdrop-blur-sm sm:h-14 sm:w-14 sm:text-lg"
                  >
                    {val}
                  </motion.div>
                ))}
              </AnimatePresence>
              {bucket.length === 0 && (
                <span className="self-center px-2 text-xs italic text-muted-foreground">
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
