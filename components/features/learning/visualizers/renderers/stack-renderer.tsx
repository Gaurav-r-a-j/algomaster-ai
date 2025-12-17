import { AnimatePresence, motion } from "motion/react"

import type { VisualizationStep } from "@/types/curriculum"

interface StackRendererProps {
  currentData: VisualizationStep
}

export function StackRenderer({ currentData }: StackRendererProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center p-6 sm:p-8">
      <div className="relative flex min-h-[220px] w-24 flex-col justify-end rounded-t-2xl border-x-2 border-b-2 border-border/60 bg-background/50 p-3 shadow-lg backdrop-blur-sm sm:min-h-[280px] sm:w-32 sm:p-4">
        <div className="absolute top-1/2 -left-8 -translate-y-1/2 rotate-180 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground [writing-mode:vertical-lr] sm:-left-12 sm:text-xs">
          Stack Memory
        </div>
        <AnimatePresence mode="popLayout">
          {currentData.array.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center text-xs italic text-muted-foreground sm:text-sm"
            >
              Empty
            </motion.div>
          ) : (
            currentData.array.map((val, idx) => (
              <motion.div
                key={`${idx}-${val}`}
                layout
                initial={{ opacity: 0, y: -50, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="mb-2 flex h-12 w-full items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 text-base font-bold text-white shadow-lg ring-1 ring-white/20 sm:h-14 sm:text-lg"
              >
                {val}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      <div className="mt-4 rounded-full border border-border/50 bg-background/80 px-4 py-1.5 text-center text-xs font-medium text-muted-foreground backdrop-blur-sm sm:text-sm">
        LIFO: Last In, First Out
      </div>
    </div>
  )
}
