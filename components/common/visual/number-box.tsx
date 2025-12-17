"use client"

import { motion } from "motion/react"
import { transitions } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface NumberBoxProps {
  value: number | string
  index?: number
  isActive?: boolean
  isSorted?: boolean
  isFound?: boolean
  className?: string
  showIndex?: boolean
  size?: "sm" | "md" | "lg"
  layoutId?: string
}

const sizeClasses = {
  sm: "h-10 w-10 text-xs sm:h-12 sm:w-12 sm:text-sm",
  md: "h-12 w-12 text-sm sm:h-14 sm:w-14 sm:text-base",
  lg: "h-14 w-14 text-base sm:h-16 sm:w-16 sm:text-lg",
}

export function NumberBox({
  value,
  index,
  isActive = false,
  isSorted = false,
  isFound = false,
  className,
  showIndex = true,
  size = "md",
  layoutId,
}: NumberBoxProps) {
  const getColors = () => {
    if (isFound) {
      return {
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary))",
        color: "hsl(var(--primary-foreground))",
      }
    }
    if (isActive) {
      return {
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary))",
        color: "hsl(var(--primary-foreground))",
      }
    }
    if (isSorted) {
      return {
        borderColor: "hsl(var(--primary) / 0.5)",
        backgroundColor: "hsl(var(--primary) / 0.1)",
        color: "hsl(var(--primary))",
      }
    }
    return {
      borderColor: "hsl(var(--border))",
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
    }
  }

  const colors = getColors()
  const hasHighlight = isActive || isSorted || isFound

  return (
    <motion.div
      layoutId={layoutId}
      layout
      className={cn("flex flex-col items-center gap-1.5", className)}
      transition={transitions.spring}
    >
      <motion.div
        layout
        animate={{
          scale: hasHighlight ? 1.15 : 1,
          ...colors,
          boxShadow: hasHighlight
            ? "0 8px 20px -4px rgb(0 0 0 / 0.3), 0 4px 8px -2px rgb(0 0 0 / 0.2)"
            : "0 2px 8px -2px rgb(0 0 0 / 0.1)",
        }}
        transition={transitions.smooth}
        className={cn(
          "flex items-center justify-center rounded-xl border-2 font-bold backdrop-blur-sm shadow-md",
          sizeClasses[size]
        )}
      >
        {value}
      </motion.div>
      {showIndex && index !== undefined && (
        <motion.span
          layout
          className="font-mono text-xs font-semibold text-muted-foreground sm:text-sm"
        >
          [{index}]
        </motion.span>
      )}
    </motion.div>
  )
}

