"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  generateBFSSteps,
  generateDFSSteps,
  generateDijkstraSteps,
} from "@/utils/algorithm-logic"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { staggerItem, transitions } from "@/lib/animations"
import { CodeIcon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { VisualizerControls } from "./visualizer-controls"
import { VisualizerLayout } from "./visualizer-layout"

interface PathfindingVisualizerProps {
  topic: Topic
}

const DEFAULT_SPEED_MS = 300

export function PathfindingVisualizer({ topic }: PathfindingVisualizerProps) {
  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS)
  const timerRef = useRef<number | null>(null)

  const generateData = useCallback(() => {
    let newSteps: VisualizationStep[] = []
    if (topic.id === "dfs") {
      newSteps = generateDFSSteps()
    } else if (topic.id === "dijkstra") {
      newSteps = generateDijkstraSteps()
    } else {
      newSteps = generateBFSSteps()
    }
    setSteps(newSteps)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [topic.id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      array: Array(25).fill(0),
      activeIndices: [],
      sortedIndices: [],
      description: "Ready",
      auxiliary: { visited: [], path: [] },
    } as VisualizationStep)

  const auxiliary =
    (currentData.auxiliary as { visited?: number[]; path?: number[] }) || {}
  const visitedSet = new Set(auxiliary.visited || [])
  const pathSet = new Set(auxiliary.path || [])

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

  const description = (
    <div className="flex flex-wrap items-center gap-4 text-xs">
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded bg-green-600 shadow-sm"></div>
        <span className="text-muted-foreground">Start</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="bg-destructive h-3 w-3 rounded shadow-sm"></div>
        <span className="text-muted-foreground">End</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="bg-foreground h-3 w-3 rounded"></div>
        <span className="text-muted-foreground">Wall</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="bg-primary/20 border-primary/20 h-3 w-3 rounded border"></div>
        <span className="text-muted-foreground">Visited</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded bg-yellow-500 shadow-sm"></div>
        <span className="text-muted-foreground">Path</span>
      </div>
    </div>
  )

  return (
    <VisualizerLayout
      title={`${topic.title} Visualizer`}
      icon={<IconWrapper icon={CodeIcon} size={20} className="text-primary" />}
      controls={controls}
      description={description}
      headerDescription={currentData.description}
    >
      <motion.div className="mx-auto grid w-full max-w-[400px] grid-cols-5 gap-2">
        {currentData.array.map((val, idx) => {
          const isStart = val === 2
          const isEnd = val === 3
          const isWall = val === 1
          const isVisited = visitedSet.has(idx)
          const isPath = pathSet.has(idx)
          const isActive = currentData.activeIndices.includes(idx)

          let bgColor = "hsl(var(--muted) / 0.3)"
          let borderColor = "transparent"

          if (isWall) {
            bgColor = "hsl(var(--foreground))"
          } else if (isPath) {
            bgColor = "rgb(234 179 8)" // yellow-500
          } else if (isActive) {
            bgColor = "hsl(var(--primary))"
          } else if (isStart) {
            bgColor = "rgb(22 163 74)" // green-600
          } else if (isEnd) {
            bgColor = "hsl(var(--destructive))"
          } else if (isVisited) {
            bgColor = "hsl(var(--primary) / 0.15)"
            borderColor = "hsl(var(--primary) / 0.2)"
          }

          return (
            <motion.div
              key={idx}
              variants={staggerItem}
              layout
              animate={{
                backgroundColor: bgColor,
                borderColor: borderColor,
                scale: isActive ? 1.15 : 1,
                boxShadow: isActive
                  ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                  : "none",
              }}
              transition={transitions.spring}
              className="aspect-square rounded border"
            />
          )
        })}
      </motion.div>
    </VisualizerLayout>
  )
}
