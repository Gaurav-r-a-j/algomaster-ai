"use client"

import { AnimatePresence } from "motion/react"
import { NumberBox } from "@/components/common/visual/number-box"

interface HeapArrayViewProps {
  heap: number[]
  activeIndices: number[]
}

export function HeapArrayView({ heap, activeIndices }: HeapArrayViewProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border/50 bg-gradient-to-br from-background to-muted/20 px-6 py-4 shadow-lg backdrop-blur-sm sm:gap-4">
      <AnimatePresence mode="popLayout">
        {heap.map((val: number, idx: number) => {
          const isActive = activeIndices.includes(idx)
          return (
            <NumberBox
              key={`heap-${val}-${idx}`}
              layoutId={`heap-${val}-${idx}`}
              value={val}
              index={idx}
              isActive={isActive}
              size="sm"
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

