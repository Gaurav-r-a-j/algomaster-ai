"use client"

import { AnimatePresence } from "motion/react"
import { NumberBox } from "@/components/common/visual/number-box"
import type { VisualizationStep } from "@/types/curriculum"

interface SearchNumbersViewProps {
  currentData: VisualizationStep
}

export function SearchNumbersView({ currentData }: SearchNumbersViewProps) {
  return (
    <div className="flex min-h-[300px] w-full flex-wrap items-center justify-center gap-3 rounded-xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 shadow-lg sm:gap-4">
      <AnimatePresence mode="popLayout">
        {currentData.array.map((value, idx) => {
          const isActive = currentData.activeIndices.includes(idx)
          const isFound = currentData.sortedIndices.includes(idx)

          return (
            <NumberBox
              key={`search-${value}-${idx}`}
              layoutId={`search-${value}-${idx}`}
              value={value}
              index={idx}
              isActive={isActive}
              isFound={isFound}
              size="md"
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

