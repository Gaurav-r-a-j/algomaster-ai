"use client"

import { AnimatePresence } from "motion/react"
import { NumberBox } from "@/components/common/visual/number-box"
import type { VisualizationStep } from "@/types/curriculum"

interface SortingNumbersViewProps {
  currentData: VisualizationStep
}

export function SortingNumbersView({
  currentData,
}: SortingNumbersViewProps) {
  return (
    <div className="flex min-h-[300px] w-full flex-wrap items-center justify-center gap-3 p-6 sm:gap-4">
      <AnimatePresence mode="popLayout">
        {currentData.array.map((value, idx) => {
          const isActive = currentData.activeIndices.includes(idx)
          const isSorted = currentData.sortedIndices.includes(idx)

          return (
            <NumberBox
              key={`num-${value}-${idx}`}
              layoutId={`num-${value}-${idx}`}
              value={value}
              index={idx}
              isActive={isActive}
              isSorted={isSorted}
              size="md"
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

