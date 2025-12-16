"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  generateDPSteps,
  generateKnapsackSteps,
  generateLCSSteps,
} from "@/utils/algorithm-logic"
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

export function DPVisualizer({ topic }: DPVisualizerProps) {
  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS)
  const timerRef = useRef<number | null>(null)

  const generateData = useCallback(() => {
    let newSteps: VisualizationStep[] = []
    if (topic.id === "knapsack") {
      newSteps = generateKnapsackSteps()
    } else if (topic.id === "lcs") {
      newSteps = generateLCSSteps()
    } else {
      newSteps = generateDPSteps()
    }
    setSteps(newSteps)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [topic.id])

  useEffect(() => {
    // eslint-disable-next-line
    generateData()
  }, [generateData, topic.id])

  useEffect(() => {
    if (isPlaying && steps.length > 0) {
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
      timerRef.current = null
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isPlaying, steps.length, playbackSpeed])

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepChange = (step: number) => {
    setIsPlaying(false)
    setCurrentStep(step)
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

  // Detect mode: 2D Table vs 1D Array
  const auxiliary = currentData.auxiliary as {
    dp?: (number | null)[]
    dpTable?: (number | null)[][]
    row?: number
    col?: number
  }
  const is2D = !!auxiliary.dpTable
  const dp = auxiliary.dp || []
  const dpTable = auxiliary.dpTable || []
  const { row, col } = auxiliary

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
      onStepChange={handleStepChange}
      disabled={steps.length === 0}
      showSpeedControl={true}
    />
  )

  return (
    <VisualizerLayout
      title={`${topic.title} Visualizer`}
      icon={
        <IconWrapper icon={ArrowUp01Icon} size={20} className="text-primary" />
      }
      controls={controls}
      headerDescription={currentData.description}
    >
      <Card className="flex-1 overflow-hidden">
        <CardContent className="p-4">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="flex min-h-[180px] items-center justify-center overflow-auto"
          >
            {is2D ? (
              <div className="flex flex-col gap-2">
                {dpTable.map((rowArr, rowIndex) => (
                  <div key={rowIndex} className="flex gap-2">
                    {rowArr.map((val, colIndex) => {
                      const isActive = rowIndex === row && colIndex === col
                      return (
                        <motion.div
                          key={`${rowIndex}-${colIndex}`}
                          animate={{
                            scale: isActive ? 1.1 : 1,
                            backgroundColor: isActive
                              ? "hsl(var(--primary))"
                              : "hsl(var(--card))",
                            borderColor: isActive
                              ? "hsl(var(--primary))"
                              : "hsl(var(--border))",
                            color: isActive
                              ? "hsl(var(--primary-foreground))"
                              : "hsl(var(--foreground))",
                          }}
                          className="flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium shadow-sm"
                        >
                          {val}
                        </motion.div>
                      )
                    })}
                  </div>
                ))}
              </div>
            ) : (
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
                            ? "hsl(var(--primary))"
                            : isDependency
                              ? "hsl(var(--secondary))"
                              : isCalculated
                                ? "hsl(var(--card))"
                                : "hsl(var(--muted))",
                          borderColor: isActive
                            ? "hsl(var(--primary))"
                            : isDependency
                              ? "hsl(var(--secondary))"
                              : isCalculated
                                ? "hsl(var(--border))"
                                : "hsl(var(--border))",
                          color: isActive
                            ? "hsl(var(--primary-foreground))"
                            : isDependency
                              ? "hsl(var(--secondary-foreground))"
                              : isCalculated
                                ? "hsl(var(--foreground))"
                                : "hsl(var(--muted-foreground))",
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
            )}
          </motion.div>
        </CardContent>
      </Card>
    </VisualizerLayout>
  )
}
