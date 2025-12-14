"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  generateBinarySearchSteps,
  generateLinearSearchSteps,
} from "@/utils/algorithm-logic"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { staggerItem, transitions } from "@/lib/animations"
import { SearchIcon } from "@/lib/icons"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { VisualizerControls } from "./visualizer-controls"
import { VisualizerLayout } from "./visualizer-layout"

const DEFAULT_SPEED_MS = 800

interface SearchVisualizerProps {
  topic: Topic
}

export function SearchVisualizer({ topic }: SearchVisualizerProps) {
  const [array] = useState<number[]>(
    Array.from({ length: 15 }, (_, i) => (i + 1) * 5).sort((a, b) => a - b)
  )
  const [target, setTarget] = useState<number>(40)
  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS)
  const timerRef = useRef<number | null>(null)

  const generateSteps = useCallback(() => {
    let newSteps: VisualizationStep[] = []
    if (topic.id === "binary-search") {
      newSteps = generateBinarySearchSteps(array, target)
    } else if (topic.id === "linear-search") {
      newSteps = generateLinearSearchSteps(array, target)
    } else {
      newSteps = [
        {
          array: array,
          activeIndices: [],
          sortedIndices: [],
          description: "Visualization not implemented.",
        },
      ]
    }
    setSteps(newSteps)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [topic.id, array, target])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
    generateSteps()
  }, [generateSteps, topic.id, target])

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

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    generateSteps()
  }

  const currentData =
    steps[currentStep] ||
    ({
      array: array,
      activeIndices: [],
      sortedIndices: [],
      description: "Ready to search",
    } as VisualizationStep)

  const controls = (
    <div className="flex items-center gap-2">
      <Input
        type="number"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        className="w-24"
        min={Math.min(...array)}
        max={Math.max(...array)}
        disabled={isPlaying}
      />
      <VisualizerControls
        isPlaying={isPlaying}
        currentStep={currentStep}
        totalSteps={steps.length}
        playbackSpeed={playbackSpeed}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onPreviousStep={handlePreviousStep}
        onNextStep={handleNextStep}
        onSpeedChange={setPlaybackSpeed}
        disabled={steps.length === 0}
        showSpeedControl={true}
      />
    </div>
  )

  const description = (
    <p className="text-foreground text-sm font-medium">
      {currentData.description}
    </p>
  )

  return (
    <VisualizerLayout
      title="Search Visualization"
      icon={
        <IconWrapper icon={SearchIcon} size={20} className="text-primary" />
      }
      controls={controls}
      description={description}
    >
      <motion.div className="flex flex-col gap-6">
        <Card>
          <CardContent className="p-8">
            <div className="flex min-h-[200px] flex-wrap items-center justify-center gap-4">
              {currentData.array.map((value, idx) => {
                const isActive = currentData.activeIndices.includes(idx)
                const isFound = currentData.sortedIndices.includes(idx)

                return (
                  <motion.div
                    key={`${idx}-${value}`}
                    variants={staggerItem}
                    layout
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      zIndex: isActive ? 10 : 1,
                    }}
                    transition={transitions.spring}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      animate={{
                        borderColor: isFound
                          ? "rgb(16 185 129)"
                          : isActive
                            ? "rgb(245 158 11)"
                            : "hsl(var(--border))",
                        backgroundColor: isFound
                          ? "rgb(16 185 129 / 0.1)"
                          : isActive
                            ? "rgb(245 158 11 / 0.1)"
                            : "hsl(var(--card))",
                        color: isFound
                          ? "rgb(5 150 105)"
                          : isActive
                            ? "rgb(180 83 9)"
                            : "hsl(var(--foreground))",
                        boxShadow:
                          isFound || isActive
                            ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                            : "none",
                      }}
                      transition={transitions.smooth}
                      className="flex h-20 w-20 items-center justify-center rounded-xl border-2 text-xl font-bold"
                    >
                      {value}
                    </motion.div>
                    <span className="text-muted-foreground font-mono text-xs font-semibold">
                      [{idx}]
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transitions.smooth}
        >
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <span className="text-muted-foreground text-sm">
                  Searching for:{" "}
                </span>
                <motion.span
                  key={target}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={transitions.spring}
                  className="text-foreground text-lg font-bold"
                >
                  {target}
                </motion.span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </VisualizerLayout>
  )
}
