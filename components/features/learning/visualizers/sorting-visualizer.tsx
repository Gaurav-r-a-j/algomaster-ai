"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateSelectionSortSteps,
} from "@/utils/algorithm-logic"
import { ChartBarIcon } from "@heroicons/react/24/outline"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { staggerContainer, staggerItem, transitions } from "@/lib/animations"
import { Card, CardContent } from "@/components/ui/card"

import { VisualizerControls } from "./visualizer-controls"
import { VisualizerLayout } from "./visualizer-layout"

const DEFAULT_ARRAY_SIZE = 15
const DEFAULT_SPEED_MS = 500

interface SortingVisualizerProps {
  topic: Topic
}

export function SortingVisualizer({ topic }: SortingVisualizerProps) {
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE)
  const [array, setArray] = useState<number[]>([])
  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS)
  const timerRef = useRef<number | null>(null)

  const generateArray = useCallback(
    (size: number = arraySize) => {
      const newArray = Array.from(
        { length: size },
        () => Math.floor(Math.random() * 90) + 10
      )
      setArray(newArray)

      let newSteps: VisualizationStep[] = []
      switch (topic.id) {
        case "bubble-sort":
          newSteps = generateBubbleSortSteps(newArray)
          break
        case "selection-sort":
          newSteps = generateSelectionSortSteps(newArray)
          break
        case "insertion-sort":
          newSteps = generateInsertionSortSteps(newArray)
          break
        case "merge-sort":
          newSteps = generateMergeSortSteps(newArray)
          break
        case "quick-sort":
          newSteps = generateQuickSortSteps(newArray)
          break
        default:
          newSteps = [
            {
              array: newArray,
              activeIndices: [],
              sortedIndices: [],
              description: "Visualization not implemented.",
            },
          ]
      }

      setSteps(newSteps)
      setCurrentStep(0)
      setIsPlaying(false)
    },
    [topic.id, arraySize]
  )

  const handleArraySizeChange = useCallback(
    (size: number) => {
      setArraySize(size)
      generateArray(size)
    },
    [generateArray]
  )

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
    generateArray()
  }

  useEffect(() => {
    // Initialize on mount and when topic changes
    // Use setTimeout to defer state updates and avoid cascading renders
    const timer = setTimeout(() => {
      const newArray = Array.from(
        { length: arraySize },
        () => Math.floor(Math.random() * 90) + 10
      )
      setArray(newArray)

      let newSteps: VisualizationStep[] = []
      switch (topic.id) {
        case "bubble-sort":
          newSteps = generateBubbleSortSteps(newArray)
          break
        case "selection-sort":
          newSteps = generateSelectionSortSteps(newArray)
          break
        case "insertion-sort":
          newSteps = generateInsertionSortSteps(newArray)
          break
        case "merge-sort":
          newSteps = generateMergeSortSteps(newArray)
          break
        case "quick-sort":
          newSteps = generateQuickSortSteps(newArray)
          break
        default:
          newSteps = [
            {
              array: newArray,
              activeIndices: [],
              sortedIndices: [],
              description: "Visualization not implemented.",
            },
          ]
      }

      setSteps(newSteps)
      setCurrentStep(0)
      setIsPlaying(false)
    }, 0)

    return () => clearTimeout(timer)
  }, [topic.id, arraySize])

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
      array: array,
      activeIndices: [],
      sortedIndices: [],
      description: "Ready to sort",
    } as VisualizationStep)

  const controls = (
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
      arraySize={arraySize}
      onArraySizeChange={handleArraySizeChange}
      showArraySizeControl={true}
    />
  )

  const description = (
    <>
      <div className="mb-2 flex items-center gap-4">
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span className="bg-primary h-3 w-3 rounded-full"></span> Unsorted
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span className="h-3 w-3 rounded-full bg-amber-500"></span> Active
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <span className="h-3 w-3 rounded-full bg-emerald-500"></span> Sorted
        </div>
      </div>
      <p className="text-foreground text-sm font-medium">
        {currentData.description}
      </p>
    </>
  )

  return (
    <VisualizerLayout
      title="Sorting Visualization"
      icon={<ChartBarIcon className="text-primary h-5 w-5" />}
      controls={controls}
      description={description}
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="flex flex-col gap-6"
      >
        {/* Number-based visualization */}
        <Card>
          <CardContent className="p-8">
            <div className="flex min-h-[200px] flex-wrap items-center justify-center gap-4">
              {currentData.array.map((value, idx) => {
                const isActive = currentData.activeIndices.includes(idx)
                const isSorted = currentData.sortedIndices.includes(idx)

                return (
                  <motion.div
                    key={`${idx}-${value}`}
                    variants={staggerItem}
                    layout
                    animate={{
                      scale: isActive ? 1.15 : 1,
                      zIndex: isActive ? 10 : 1,
                      opacity: isSorted ? 0.75 : 1,
                    }}
                    transition={transitions.spring}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      animate={{
                        borderColor: isActive
                          ? "rgb(245 158 11)"
                          : isSorted
                            ? "rgb(16 185 129)"
                            : "hsl(var(--border))",
                        backgroundColor: isActive
                          ? "rgb(245 158 11 / 0.1)"
                          : isSorted
                            ? "rgb(16 185 129 / 0.1)"
                            : "hsl(var(--card))",
                        color: isActive
                          ? "rgb(180 83 9)"
                          : isSorted
                            ? "rgb(5 150 105)"
                            : "hsl(var(--foreground))",
                        boxShadow: isActive
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

        {/* Array representation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transitions.smooth}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Array:
                </span>
                <code className="text-foreground bg-muted rounded px-2 py-1 font-mono text-sm">
                  [{currentData.array.join(", ")}]
                </code>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </VisualizerLayout>
  )
}
