"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"

import { fadeIn, slideUp, transitions } from "@/lib/animations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VisualizerLayoutProps {
  title: ReactNode
  icon?: ReactNode
  controls: ReactNode
  description: ReactNode
  children: ReactNode
}

export function VisualizerLayout({
  title,
  icon,
  controls,
  description,
  children,
}: VisualizerLayoutProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className="flex h-full flex-col gap-3"
    >
      {/* Header with Controls */}
      <motion.div variants={slideUp} transition={transitions.spring}>
        <Card className="shrink-0 border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    {icon}
                  </div>
                )}
                {typeof title === "string" ? (
                  <CardTitle className="text-xl font-bold tracking-tight">
                    {title}
                  </CardTitle>
                ) : (
                  title
                )}
              </div>
              <div className="flex flex-wrap gap-2">{controls}</div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Visualization Area */}
      <motion.div
        variants={slideUp}
        transition={{ ...transitions.spring, delay: 0.1 }}
        className="flex min-h-0 flex-1 flex-col gap-3"
      >
        {children}
      </motion.div>

      {/* Description Footer */}
      <motion.div
        variants={slideUp}
        transition={{ ...transitions.spring, delay: 0.2 }}
      >
        <Card className="shrink-0 border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4">
            {description}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
