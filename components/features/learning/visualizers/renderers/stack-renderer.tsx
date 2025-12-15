import { AnimatePresence, motion } from "motion/react"

import type { VisualizationStep } from "@/types/curriculum"

interface StackRendererProps {
  currentData: VisualizationStep
}

export function StackRenderer({ currentData }: StackRendererProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center p-8">
      <div className="relative flex min-h-[300px] w-40 flex-col justify-end rounded-t-lg border-x-4 border-b-4 border-slate-300 bg-slate-50/50 p-4 shadow-inner dark:border-slate-700 dark:bg-slate-900/50">
        <div className="text-muted-foreground absolute top-1/2 -left-12 -translate-y-1/2 rotate-180 py-2 text-xs font-bold tracking-widest uppercase [writing-mode:vertical-lr]">
          Stack Memory
        </div>
        <AnimatePresence mode="popLayout">
          {currentData.array.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-muted-foreground absolute inset-0 flex items-center justify-center text-sm italic"
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
                className="mb-2 flex h-12 w-full items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-indigo-600 font-bold text-white shadow-md ring-1 ring-white/20"
              >
                {val}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      <div className="text-muted-foreground mt-4 text-center text-sm">
        LIFO: Last In, First Out
      </div>
    </div>
  )
}
