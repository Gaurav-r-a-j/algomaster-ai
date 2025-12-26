"use client"

import { motion } from "motion/react"
import { GridCell } from "@/components/common/visual/grid-cell"
import { staggerItem } from "@/lib/animations"
import type { PathfindingAuxiliary, VisualizationStep } from "@/types/curriculum"

interface PathfindingGridViewProps {
  currentData: VisualizationStep
}

export function PathfindingGridView({
  currentData,
}: PathfindingGridViewProps) {
  const auxiliary = (currentData.auxiliary || {}) as PathfindingAuxiliary
  const visitedSet = new Set(auxiliary.visited || [])
  const pathSet = new Set(auxiliary.path || [])

  return (
    <motion.div className="mx-auto grid w-full max-w-[350px] grid-cols-5 gap-2 rounded-xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 shadow-lg sm:max-w-[400px] sm:gap-2.5">
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

