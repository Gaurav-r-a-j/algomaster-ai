"use client"

import { motion } from "motion/react"
import { GridCell } from "@/components/common/visual/grid-cell"
import { staggerItem } from "@/lib/animations"
import type { VisualizationStep } from "@/types/curriculum"

interface PathfindingGridViewProps {
  currentData: VisualizationStep
}

export function PathfindingGridView({
  currentData,
}: PathfindingGridViewProps) {
  const visitedSet = new Set(
    (currentData.auxiliary as { visited?: number[] })?.visited || []
  )
  const pathSet = new Set(
    (currentData.auxiliary as { path?: number[] })?.path || []
  )

  return (
    <motion.div className="mx-auto grid w-full max-w-[350px] grid-cols-5 gap-1.5 p-6 sm:max-w-[400px] sm:gap-2">
      {currentData.array.map((val, idx) => {
        const isStart = val === 2
        const isEnd = val === 3
        const isWall = val === 1
        const isVisited = visitedSet.has(idx)
        const isPath = pathSet.has(idx)
        const isActive = currentData.activeIndices.includes(idx)

        return (
          <motion.div key={idx} variants={staggerItem} layout>
            <GridCell
              isStart={isStart}
              isEnd={isEnd}
              isWall={isWall}
              isVisited={isVisited}
              isPath={isPath}
              isActive={isActive}
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

