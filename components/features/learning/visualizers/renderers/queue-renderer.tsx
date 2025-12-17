import { AnimatePresence, motion } from "motion/react"

import type { VisualizationStep } from "@/types/curriculum"
import { cn } from "@/lib/utils"

interface QueueRendererProps {
  currentData: VisualizationStep
}

export function QueueRenderer({ currentData }: QueueRendererProps) {
  if (!currentData || !currentData.array) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <p className="text-muted-foreground text-center text-sm">
          No data to visualize. Click Reset to generate visualization.
        </p>
      </div>
    )
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 sm:p-8">
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
              currentData.array.map((val, idx) => {
                const isActive = currentData.activeIndices.includes(idx)
                const isFront = idx === 0
                const isBack = idx === currentData.array.length - 1
                return (
                  <motion.div
                    key={`${idx}-${val}`}
                    layout
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: isActive ? 1.1 : 1,
                      backgroundColor: isActive
                        ? "hsl(var(--primary))"
                        : isFront || isBack
                          ? "hsl(var(--primary) / 0.9)"
                          : "hsl(var(--primary) / 0.7)",
                    }}
                    exit={{
                      opacity: 0,
                      x: -50,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white shadow-lg ring-1 ring-white/20 sm:h-16 sm:w-16 sm:text-lg",
                      isActive && "ring-2 ring-primary-foreground/50 shadow-xl z-10"
                    )}
                  >
                    {val}
                  </motion.div>
                )
              })
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
