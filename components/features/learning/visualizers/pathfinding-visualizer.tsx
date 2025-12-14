"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { generateBFSSteps, generateDFSSteps } from "@/utils/algorithm-logic"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { cellAnimation, staggerContainer, transitions } from "@/lib/animations"
import { CodeIcon, PauseIcon, PlayIcon, RefreshCwIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { IconWrapper } from "@/components/common/icon-wrapper"

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
    const newSteps =
      topic.id === "dfs" ? generateDFSSteps() : generateBFSSteps()
    setSteps(newSteps)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [topic.id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-emerald-500"></div>
          <span className="text-muted-foreground">Start</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-red-500"></div>
          <span className="text-muted-foreground">End</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-slate-800 dark:bg-slate-600"></div>
          <span className="text-muted-foreground">Wall</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-blue-200 dark:bg-blue-900"></div>
          <span className="text-muted-foreground">Visited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-yellow-400"></div>
          <span className="text-muted-foreground">Path</span>
        </div>
      </div>
      <p className="text-foreground text-sm font-medium">
        {currentData.description}
      </p>
      <div className="text-muted-foreground text-xs">
        Step {currentStep + 1} / {steps.length}
      </div>
    </div>
  )

  return (
    <VisualizerLayout
      title={`${topic.title} Visualizer`}
      icon={<IconWrapper icon={CodeIcon} size={20} className="text-primary" />}
      controls={controls}
      description={description}
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="mx-auto grid w-full max-w-[400px] grid-cols-5 gap-2"
      >
        {currentData.array.map((val, idx) => {
          const isStart = val === 2
          const isEnd = val === 3
          const isWall = val === 1
          const isVisited = visitedSet.has(idx)
          const isPath = pathSet.has(idx)
          const isActive = currentData.activeIndices.includes(idx)

          let bgColor = "hsl(var(--muted))"
          if (isWall) {
            bgColor = "rgb(30 41 59)"
          } else if (isPath) {
            bgColor = "rgb(250 204 21)"
          } else if (isActive) {
            bgColor = "hsl(var(--primary))"
          } else if (isStart) {
            bgColor = "rgb(16 185 129)"
          } else if (isEnd) {
            bgColor = "rgb(239 68 68)"
          } else if (isVisited) {
            bgColor = "rgb(191 219 254)"
          }

          return (
            <motion.div
              key={idx}
              variants={cellAnimation}
              layout
              animate={{
                backgroundColor: bgColor,
                scale: isActive ? 1.15 : 1,
                boxShadow: isActive
                  ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                  : "none",
              }}
              transition={transitions.spring}
              className="border-border aspect-square rounded border"
            />
          )
        })}
      </motion.div>
    </VisualizerLayout>
  )
}
