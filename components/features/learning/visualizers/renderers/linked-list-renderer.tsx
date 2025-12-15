import { AnimatePresence, motion } from "motion/react"

import type { VisualizationStep } from "@/types/curriculum"
import { transitions } from "@/lib/animations"

interface LinkedListRendererProps {
  currentData: VisualizationStep
}

export function LinkedListRenderer({ currentData }: LinkedListRendererProps) {
  return (
    <div className="w-full overflow-x-auto p-8">
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
                        : "hsl(var(--card))",
                      borderColor: isActive
                        ? "hsl(var(--primary))"
                        : "hsl(var(--border))",
                      color: isActive
                        ? "hsl(var(--primary-foreground))"
                        : "hsl(var(--foreground))",
                      boxShadow: isActive
                        ? "0 4px 12px hsl(var(--primary)/0.3)"
                        : "0 1px 2px rgb(0 0 0 / 0.05)",
                    }}
                    transition={transitions.spring}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border-2 text-lg font-bold transition-shadow"
                  >
                    {val}
                    {/* Pointer dot */}
                    <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full border border-inherit bg-inherit"></div>
                  </motion.div>
                  <div className="text-muted-foreground mt-2 font-mono text-xs font-medium">
                    {idx === 0 ? "HEAD" : `#${idx}`}
                  </div>
                </div>

                {idx < currentData.array.length - 1 && (
                  <div className="bg-border relative mx-1 h-0.5 w-12">
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        className="text-border rotate-[-90deg] fill-current"
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
          <div className="bg-border h-0.5 w-8"></div>
          <div className="border-border bg-muted/50 text-muted-foreground flex h-10 w-16 items-center justify-center rounded border border-dashed font-mono text-xs">
            NULL
          </div>
        </div>
      </motion.div>
    </div>
  )
}
