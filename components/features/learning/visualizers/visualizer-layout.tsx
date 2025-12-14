"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"

import { fadeIn, slideUp, transitions } from "@/lib/animations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
      className="flex h-full flex-col gap-6"
    >
      {/* Header */}
      <motion.div variants={slideUp} transition={transitions.spring}>
        <Card className="shrink-0">
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {icon && <div className="text-primary">{icon}</div>}
                {typeof title === "string" ? (
                  <CardTitle className="text-xl font-bold">{title}</CardTitle>
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
        className="flex min-h-0 flex-1 flex-col gap-6"
      >
        {children}
      </motion.div>

      {/* Description */}
      <motion.div
        variants={slideUp}
        transition={{ ...transitions.spring, delay: 0.2 }}
      >
        <Card className="shrink-0">
          <CardContent className="p-4">
            <Separator className="mb-4" />
            {description}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
