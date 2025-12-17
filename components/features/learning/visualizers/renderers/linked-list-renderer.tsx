import { AnimatePresence, motion } from "motion/react"

import type { VisualizationStep } from "@/types/curriculum"
import { transitions } from "@/lib/animations"

interface LinkedListRendererProps {
  currentData: VisualizationStep
}

export function LinkedListRenderer({ currentData }: LinkedListRendererProps) {
  return (
    <div className="w-full overflow-x-auto p-6 sm:p-8">
      <motion.div className="flex min-w-fit items-center justify-start gap-1">
        <AnimatePresence>
          {currentData.array.map((val, idx) => {
            const isActive = currentData.activeIndices.includes(idx)
            return (
              <motion.div
                key={idx}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="group flex items-center"
              >
                <div className="relative flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      backgroundColor: isActive
                        ? "hsl(var(--primary))"
                        : "hsl(var(--background))",
                      borderColor: isActive
                        ? "hsl(var(--primary))"
                        : "hsl(var(--border))",
                      color: isActive
                        ? "hsl(var(--primary-foreground))"
                        : "hsl(var(--foreground))",
                      boxShadow: isActive
                        ? "0 10px 25px -5px hsl(var(--primary) / 0.4)"
                        : "0 4px 12px -2px rgb(0 0 0 / 0.1)",
                    }}
                    transition={transitions.spring}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 text-lg font-bold backdrop-blur-sm transition-shadow sm:h-16 sm:w-16 sm:text-xl"
                  >
                    {val}
                    {/* Pointer dot */}
                    <div className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-inherit bg-inherit"></div>
                  </motion.div>
                  <div className="mt-2 font-mono text-xs font-medium text-muted-foreground">
                    {idx === 0 ? "HEAD" : `#${idx}`}
                  </div>
                </div>

                {idx < currentData.array.length - 1 && (
                  <div className="relative mx-1 h-0.5 w-10 bg-border/60 sm:w-12">
                    <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        className="-rotate-90 fill-current text-border/60"
                      >
                        <path d="M5 10L0 0h10L5 10z" />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
        <div className="ml-2 flex items-center gap-3 opacity-60">
          <div className="h-0.5 w-6 bg-border/60 sm:w-8"></div>
          <div className="flex h-9 w-14 items-center justify-center rounded-xl border border-dashed border-border/60 bg-muted/30 font-mono text-xs text-muted-foreground backdrop-blur-sm sm:h-10 sm:w-16">
            NULL
          </div>
        </div>
      </motion.div>
    </div>
  )
}
