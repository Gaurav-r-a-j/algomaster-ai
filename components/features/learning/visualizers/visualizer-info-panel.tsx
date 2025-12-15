"use client"

import { motion } from "motion/react"
import type { Topic, VisualizationStep } from "@/types/curriculum"
import { fadeIn, slideUp, transitions } from "@/lib/animations"
import { ClockIcon, ComputerIcon, HelpCircleIcon } from "@/lib/icons"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { cn } from "@/lib/utils"

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
      <Card className="border-border/50 flex h-full flex-col border-0 rounded-none shadow-none">
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
             <div className="p-6 pb-2">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {topic.description}
                </p>
             </div>

             {/* Badges */}
             <div className="px-6 pb-6 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                   <Badge variant="outline" className="font-mono font-semibold bg-background">
                     Time: {topic.complexity.time}
                   </Badge>
                   <Badge variant="outline" className="font-mono font-semibold bg-background">
                     Space: {topic.complexity.space}
                   </Badge>
                </div>
             </div>
             
             <Separator />

            <div className="p-6 space-y-6">
                {/* Complexity Details */}
                <motion.div
                  variants={slideUp}
                  transition={{ ...transitions.spring, delay: 0.1 }}
                >
                    <h4 className="text-foreground mb-3 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                        <IconWrapper icon={ComputerIcon} size={14} className="text-primary" />
                        Complexity Analysis
                    </h4>
                    <div className="bg-muted/30 border border-border/50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm font-medium">Time Complexity</span>
                        <code className="text-foreground bg-background rounded px-2 py-0.5 text-sm font-mono font-semibold border border-border/50">
                          {topic.complexity.time}
                        </code>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-sm font-medium">Space Complexity</span>
                        <code className="text-foreground bg-background rounded px-2 py-0.5 text-sm font-mono font-semibold border border-border/50">
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
                    <h4 className="text-foreground mb-3 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                        <IconWrapper icon={ClockIcon} size={14} className="text-primary" />
                        Step Information
                    </h4>
                    <div className="bg-muted/30 border border-border/50 rounded-lg p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm font-medium">Current Step</span>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-16 bg-muted-foreground/20 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-primary transition-all duration-300" 
                                        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                                    />
                                </div>
                                <span className="font-mono text-sm font-semibold">
                                {currentStep + 1} / {totalSteps}
                                </span>
                            </div>
                        </div>
                        {currentData?.description && (
                            <div className="bg-background border border-border/50 rounded-md p-3 min-h-[60px] flex items-start gap-3">
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
                      <h4 className="text-foreground mb-3 text-xs font-bold tracking-wider uppercase">
                          Category
                      </h4>
                      <Badge variant="secondary" className="font-medium px-3 py-1">
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

