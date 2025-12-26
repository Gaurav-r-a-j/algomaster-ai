"use client"

import { motion } from "motion/react"
import { transitions } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface GridCellProps {
  isStart?: boolean
  isEnd?: boolean
  isWall?: boolean
  isVisited?: boolean
  isPath?: boolean
  isActive?: boolean
  className?: string
}

export function GridCell({
  isStart = false,
  isEnd = false,
  isWall = false,
  isVisited = false,
  isPath = false,
  isActive = false,
  className,
}: GridCellProps) {
  let bgColor = "hsl(var(--muted) / 0.4)"
  let borderColor = "hsl(var(--border) / 0.5)"

  if (isWall) {
    bgColor = "hsl(var(--foreground))"
    borderColor = "hsl(var(--foreground))"
  } else if (isPath) {
    bgColor = "rgb(234 179 8)"
    borderColor = "rgb(202 138 4)"
  } else if (isActive) {
    bgColor = "hsl(var(--primary))"
    borderColor = "hsl(var(--primary))"
  } else if (isStart) {
    bgColor = "rgb(22 163 74)"
    borderColor = "rgb(21 128 61)"
  } else if (isEnd) {
    bgColor = "hsl(var(--destructive))"
    borderColor = "hsl(var(--destructive))"
  } else if (isVisited) {
    bgColor = "hsl(var(--primary) / 0.2)"
    borderColor = "hsl(var(--primary) / 0.3)"
  }

  return (
    <motion.div
      layout
      animate={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        scale: isActive ? 1.1 : 1,
        boxShadow: isActive
          ? "0 8px 20px -4px rgb(0 0 0 / 0.2)"
          : "0 2px 8px -2px rgb(0 0 0 / 0.1)",
      }}
      transition={transitions.spring}
      className={cn("aspect-square rounded-lg border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105", className)}
    />
  )
}

