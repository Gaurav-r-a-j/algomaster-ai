"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { generateDPSteps } from "@/utils/algorithm-logic"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { staggerContainer, staggerItem, transitions } from "@/lib/animations"
import { ArrowUp01Icon } from "@/lib/icons"
import { Card, CardContent } from "@/components/ui/card"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { VisualizerControls } from "./visualizer-controls"
import { VisualizerLayout } from "./visualizer-layout"

interface DPVisualizerProps {
  topic: Topic
}

const DEFAULT_SPEED_MS = 800

// eslint-disable-next-line unused-imports/no-unused-vars
export function DPVisualizer({ topic }: DPVisualizerProps) {
  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS)
  const timerRef = useRef<number | null>(null)

  const generateData = useCallback(() => {
    const newSteps = generateDPSteps()
    setSteps(newSteps)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line
    generateData()
  }, [generateData])

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, playbackSpeed)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, steps.length, playbackSpeed])

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const currentData =
    steps[currentStep] ||
    ({
      array: [],
      activeIndices: [],
      sortedIndices: [],
      description: "Ready",
      auxiliary: { dp: [] },
    } as VisualizationStep)

  const auxiliary = currentData.auxiliary as { dp?: (number | null)[] }
  const dp = auxiliary?.dp || []

  const controls = (
    <VisualizerControls
      isPlaying={isPlaying}
      currentStep={currentStep}
      totalSteps={steps.length}
      playbackSpeed={playbackSpeed}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onReset={generateData}
      onPreviousStep={handlePreviousStep}
      onNextStep={handleNextStep}
      onSpeedChange={setPlaybackSpeed}
      disabled={steps.length === 0}
      showSpeedControl={true}
    />
  )

  const description = (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
          <span className="text-muted-foreground">Active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-blue-400"></div>
          <span className="text-muted-foreground">Dependency</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full border border-emerald-300 bg-background"></div>
          <span className="text-muted-foreground">Calculated</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-muted border border-border"></div>
          <span className="text-muted-foreground">Pending</span>
        </div>
      </div>
      <p className="text-foreground text-sm font-medium">
        {currentData.description}
      </p>
    </div>
  )

  return (
    <VisualizerLayout
      title="DP Visualizer (Fibonacci)"
      icon={
        <IconWrapper
          icon={ArrowUp01Icon}
          size={20}
          className="text-emerald-500"
        />
      }
      controls={controls}
      description={description}
    >
      <Card className="flex-1">
        <CardContent className="p-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="flex min-h-[180px] items-center justify-center overflow-x-auto"
          >
            <div className="flex gap-3">
              {dp.map((val: number | null, idx: number) => {
                const isActive = currentData.activeIndices.includes(idx)
                const isCalculated = val !== null
                const isDependency =
                  currentData.activeIndices.length > 1 &&
                  currentData.activeIndices.slice(1).includes(idx)
                return (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="flex flex-col items-center"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        backgroundColor: isActive
                          ? "rgb(16 185 129)"
                          : isDependency
                            ? "rgb(96 165 250)"
                            : isCalculated
                              ? "hsl(var(--background))"
                              : "hsl(var(--muted))",
                        borderColor: isActive
                          ? "rgb(5 150 105)"
                          : isDependency
                            ? "rgb(59 130 246)"
                            : isCalculated
                              ? "rgb(167 243 208)"
                              : "hsl(var(--border))",
                        color: isActive
                          ? "white"
                          : isDependency
                            ? "white"
                            : isCalculated
                              ? "hsl(var(--foreground))"
                              : "hsl(var(--muted-foreground))",
                        boxShadow: isActive
                          ? "0 10px 25px -5px rgb(16 185 129 / 0.4), 0 8px 10px -6px rgb(16 185 129 / 0.3)"
                          : isDependency
                            ? "0 4px 15px -3px rgb(96 165 250 / 0.3)"
                            : "none",
                      }}
                      transition={transitions.spring}
                      className="flex h-14 w-14 items-center justify-center rounded-xl border-2 text-lg font-bold"
                    >
                      {val !== null ? val : "?"}
                    </motion.div>
                    <span className="text-muted-foreground mt-2 font-mono text-xs font-medium">
                      F({idx})
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </VisualizerLayout>
  )
}
