import { AnimatePresence, motion } from "motion/react"

import type { VisualizationStep } from "@/types/curriculum"

interface QueueRendererProps {
  currentData: VisualizationStep
}

export function QueueRenderer({ currentData }: QueueRendererProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center p-6 sm:p-8">
      <div className="relative flex min-h-[80px] w-full max-w-xl items-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed border-border/60 bg-background/50 px-6 py-4 shadow-lg backdrop-blur-sm sm:min-h-[100px] sm:gap-4 sm:px-10 sm:py-6">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-muted-foreground sm:left-4 sm:text-xs">
          Front
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-muted-foreground sm:right-4 sm:text-xs">
          Back
        </div>

        <div className="no-scrollbar flex flex-1 items-center justify-start gap-2 overflow-x-auto p-2 sm:gap-3">
          <AnimatePresence mode="popLayout">
            {currentData.array.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full text-center text-xs italic text-muted-foreground sm:text-sm"
              >
                Queue is empty
              </motion.div>
            ) : (
              currentData.array.map((val, idx) => (
                <motion.div
                  key={`${idx}-${val}`}
                  layout
                  initial={{ opacity: 0, x: 50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    x: -50,
                    scale: 0.8,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 font-bold text-white shadow-lg ring-1 ring-white/20 sm:h-14 sm:w-14"
                >
                  {val}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-4 rounded-full border border-border/50 bg-background/80 px-4 py-1.5 text-center text-xs font-medium text-muted-foreground backdrop-blur-sm sm:text-sm">
        FIFO: First In, First Out
      </div>
    </div>
  )
}
