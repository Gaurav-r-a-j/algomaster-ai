"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { generateDPSteps } from "@/utils/algorithm-logic"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { staggerContainer, staggerItem, transitions } from "@/lib/animations"
import { ArrowUp01Icon, PauseIcon, PlayIcon, RefreshCwIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { IconWrapper } from "@/components/common/icon-wrapper"

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
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={generateData}
        disabled={isPlaying}
      >
        <IconWrapper icon={RefreshCwIcon} size={16} className="mr-2" />
        Reset
      </Button>
      <Button
        variant="default"
        size="sm"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <IconWrapper
          icon={isPlaying ? PauseIcon : PlayIcon}
          size={16}
          className="mr-2"
        />
        {isPlaying ? "Pause" : "Play"}
      </Button>
    </div>
  )

  const description = (
    <div className="space-y-2">
      <p className="text-primary font-mono text-sm">
        Step {currentStep + 1} / {steps.length}
      </p>
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
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="bg-muted border-border flex items-center justify-center overflow-x-auto rounded-lg border p-8"
      >
        <div className="flex gap-2">
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
                whileHover={{ scale: 1.1, y: -4 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isActive
                      ? "rgb(16 185 129)"
                      : isDependency
                        ? "rgb(191 219 254)"
                        : isCalculated
                          ? "hsl(var(--background))"
                          : "hsl(var(--muted))",
                    borderColor: isActive
                      ? "rgb(5 150 105)"
                      : isDependency
                        ? "rgb(96 165 250)"
                        : isCalculated
                          ? "rgb(167 243 208)"
                          : "hsl(var(--border))",
                    color: isActive
                      ? "white"
                      : isDependency
                        ? "rgb(30 64 175)"
                        : isCalculated
                          ? "hsl(var(--foreground))"
                          : "hsl(var(--muted-foreground))",
                    boxShadow: isActive
                      ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                      : "none",
                  }}
                  transition={transitions.spring}
                  className="flex h-14 w-14 items-center justify-center rounded-lg border-2 text-lg font-bold"
                >
                  {val !== null ? val : "?"}
                </motion.div>
                <span className="text-muted-foreground mt-2 font-mono text-xs">
                  index {idx}
                </span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </VisualizerLayout>
  )
}
