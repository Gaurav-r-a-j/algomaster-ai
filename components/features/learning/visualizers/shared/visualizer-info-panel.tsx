"use client"

import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { fadeIn, slideUp, transitions } from "@/lib/animations"
import { ClockIcon, ComputerIcon, HelpCircleIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { IconWrapper } from "@/components/common/icon-wrapper"

interface VisualizerInfoPanelProps {
  topic: Topic
  currentStep: number
  totalSteps: number
  currentData?: VisualizationStep
  className?: string
  hideStepInfo?: boolean
}

export function VisualizerInfoPanel({
  topic,
  currentStep,
  totalSteps,
  currentData,
  className,
  hideStepInfo = false,
}: VisualizerInfoPanelProps) {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
      case "hard":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className={cn("h-full", className)}
    >
      <Card className="border-border/50 flex h-full flex-col rounded-none border-0 shadow-none">
        <CardHeader className="border-border/50 border-b px-6 py-4">
          <motion.div
            variants={slideUp}
            className="flex items-center justify-between gap-3"
          >
            <CardTitle className="text-lg font-bold">{topic.title}</CardTitle>
            {topic.difficulty && (
              <Badge
                variant={
                  topic.difficulty.toLowerCase() === "easy"
                    ? "default"
                    : topic.difficulty.toLowerCase() === "hard"
                      ? "destructive"
                      : "secondary"
                }
                className="shrink-0"
              >
                {topic.difficulty.toUpperCase()}
              </Badge>
            )}
          </motion.div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0">
          <div className="flex flex-col">
            {/* Description Section */}
            <div className="p-6 pb-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {topic.description}
              </p>
            </div>

            {/* Badges */}
            <div className="px-6 pt-2 pb-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge
                  variant="outline"
                  className="bg-background font-mono font-semibold"
                >
                  Time: {topic.complexity.time}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-background font-mono font-semibold"
                >
                  Space: {topic.complexity.space}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-6 p-6">
              {/* Complexity Details */}
              <motion.div
                variants={slideUp}
                transition={{ ...transitions.spring, delay: 0.1 }}
              >
                <h4 className="text-foreground mb-4 flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase">
                  <IconWrapper
                    icon={ComputerIcon}
                    size={14}
                    className="text-primary shrink-0"
                  />
                  Complexity Analysis
                </h4>
                <div className="bg-muted/30 border-border/50 space-y-3.5 rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm font-medium">
                      Time Complexity
                    </span>
                    <code className="text-foreground bg-background border-border/50 rounded border px-2 py-0.5 font-mono text-sm font-semibold">
                      {topic.complexity.time}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm font-medium">
                      Space Complexity
                    </span>
                    <code className="text-foreground bg-background border-border/50 rounded border px-2 py-0.5 font-mono text-sm font-semibold">
                      {topic.complexity.space}
                    </code>
                  </div>
                </div>
              </motion.div>

              {/* Current Step Information */}
              {!hideStepInfo && (
                <motion.div
                  variants={slideUp}
                  transition={{ ...transitions.spring, delay: 0.15 }}
                >
                <h4 className="text-foreground mb-4 flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase">
                  <IconWrapper
                    icon={ClockIcon}
                    size={14}
                    className="text-primary shrink-0"
                  />
                  Step Information
                </h4>
                <div className="bg-muted/30 border-border/50 space-y-4 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground text-sm font-medium">
                        Current Step
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="bg-muted-foreground/20 h-1.5 w-16 overflow-hidden rounded-full">
                          <div
                            className="bg-primary h-full transition-all duration-300"
                            style={{
                              width: `${((currentStep + 1) / totalSteps) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="font-mono text-sm font-semibold">
                          {currentStep + 1} / {totalSteps}
                        </span>
                      </div>
                    </div>
                    {currentData?.description && (
                      <div className="bg-background border-border/50 flex min-h-[60px] items-start gap-3.5 rounded-md border p-3.5">
                        <IconWrapper
                          icon={HelpCircleIcon}
                          size={16}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        <p className="text-foreground text-sm leading-relaxed">
                          {currentData.description}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Category */}
              {topic.category && (
                <motion.div
                  variants={slideUp}
                  transition={{ ...transitions.spring, delay: 0.2 }}
                >
                  <h4 className="text-foreground mb-4 text-xs font-bold tracking-wider uppercase">
                    Category
                  </h4>
                  <Badge variant="secondary" className="px-3 py-1.5 font-medium">
                    {topic.category}
                  </Badge>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
