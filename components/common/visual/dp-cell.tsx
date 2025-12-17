"use client"

import { motion } from "motion/react"
import { transitions } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface DPCellProps {
  value: number | string | null
  isActive?: boolean
  isDependency?: boolean
  isCalculated?: boolean
  label?: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm sm:h-12 sm:w-12 sm:text-base",
  md: "h-12 w-12 text-base sm:h-14 sm:w-14 sm:text-lg",
  lg: "h-14 w-14 text-lg sm:h-16 sm:w-16 sm:text-xl",
}

export function DPCell({
  value,
  isActive = false,
  isDependency = false,
  isCalculated = false,
  label,
  size = "md",
  className,
}: DPCellProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <motion.div
        animate={{
          scale: isActive ? 1.15 : 1,
          backgroundColor: isActive
            ? "hsl(var(--primary))"
            : isDependency
              ? "hsl(var(--secondary))"
              : isCalculated
                ? "hsl(var(--background))"
                : "hsl(var(--muted) / 0.5)",
          borderColor: isActive
            ? "hsl(var(--primary))"
            : isDependency
              ? "hsl(var(--secondary))"
              : isCalculated
                ? "hsl(var(--border))"
                : "hsl(var(--border) / 0.5)",
          color: isActive
            ? "hsl(var(--primary-foreground))"
            : isDependency
              ? "hsl(var(--secondary-foreground))"
              : isCalculated
                ? "hsl(var(--foreground))"
                : "hsl(var(--muted-foreground))",
          boxShadow: isActive
            ? "0 10px 25px -5px rgb(0 0 0 / 0.2)"
            : "0 4px 12px -2px rgb(0 0 0 / 0.1)",
        }}
        transition={transitions.spring}
        className={cn(
          "flex items-center justify-center rounded-2xl border-2 font-bold backdrop-blur-sm",
          sizeClasses[size]
        )}
      >
        {value !== null ? value : "?"}
      </motion.div>
      {label && (
        <span className="mt-2 font-mono text-xs font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </div>
  )
}

