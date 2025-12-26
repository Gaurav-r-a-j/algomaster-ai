"use client"

import { motion } from "motion/react"
import { DPCell } from "@/components/common/visual/dp-cell"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface DPArrayViewProps {
  dp: (number | null)[]
  activeIndices: number[]
}

export function DPArrayView({ dp, activeIndices }: DPArrayViewProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 shadow-lg sm:gap-4"
    >
      {dp.map((val: number | null, idx: number) => {
        const isActive = activeIndices.includes(idx)
        const isCalculated = val !== null
        const isDependency =
          activeIndices.length > 1 &&
          activeIndices.slice(1).includes(idx)

        return (
          <motion.div key={idx} variants={staggerItem}>
            <DPCell
              value={val}
              isActive={isActive}
              isDependency={isDependency}
              isCalculated={isCalculated}
              label={`F(${idx})`}
              size="lg"
            />
          </motion.div>
        )
      })}
    </motion.div>
  )
}

