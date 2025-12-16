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
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeIcon,
  PauseIcon,
  PlayIcon,
  RefreshCwIcon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { VisualizerInfoPanel } from "./visualizer-info-panel"
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
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleStepChange = (step: number) => {
    setIsPlaying(false)
    setCurrentStep(step)
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
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

  const renderControls = (
    isPanelOpen: boolean,
    togglePanel: () => void,
    headerDescription?: React.ReactNode
  ) => (
    <div className="flex w-full flex-col gap-3">
      {/* Main Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Toggle + Status */}
        <div className="flex flex-wrap items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={togglePanel}
                className="h-9 w-9 shrink-0"
                aria-label={isPanelOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                <IconWrapper
                  icon={isPanelOpen ? ChevronLeftIcon : ChevronRightIcon}
                  size={18}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {isPanelOpen ? "Hide Info" : "Show Info"}
            </TooltipContent>
          </Tooltip>

          {/* Status Text (Desktop) */}
          {headerDescription && (
            <>
              <Separator
                orientation="vertical"
                className="hidden h-6 sm:block"
              />
              <div className="hidden min-w-0 max-w-[300px] items-center gap-2 overflow-hidden sm:flex">
                <div className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
                <span className="truncate text-sm font-medium text-primary">
                  {headerDescription}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Right: Playback Controls */}
        <div className="flex flex-wrap items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={generateData}
                disabled={steps.length === 0 || isPlaying}
                className="h-9 w-9"
                aria-label="Reset"
              >
                <IconWrapper icon={RefreshCwIcon} size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset</TooltipContent>
          </Tooltip>

          <div className="mx-1 flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousStep}
                  disabled={steps.length === 0 || isPlaying || currentStep === 0}
                  className="h-9 w-9"
                  aria-label="Previous step"
                >
                  <IconWrapper icon={ChevronLeftIcon} size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="default"
                  onClick={() => setIsPlaying(!isPlaying)}
                  disabled={steps.length === 0}
                  className="min-w-[90px] px-4 font-semibold"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  <IconWrapper
                    icon={isPlaying ? PauseIcon : PlayIcon}
                    size={16}
                    className="mr-2"
                  />
                  {isPlaying ? "Pause" : "Play"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isPlaying ? "Pause" : "Play"} animation
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextStep}
                  disabled={
                    steps.length === 0 ||
                    isPlaying ||
                    currentStep >= steps.length - 1
                  }
                  className="h-9 w-9"
                  aria-label="Next step"
                >
                  <IconWrapper icon={ChevronRightIcon} size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Next</TooltipContent>
            </Tooltip>
          </div>

          <div className="hidden items-center rounded-md border border-border/40 bg-muted px-3 py-1.5 sm:flex">
            <span className="font-mono text-xs font-semibold text-muted-foreground">
              {currentStep + 1} <span className="mx-1 text-border">/</span>{" "}
              {steps.length || 1}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Status (if hidden above) */}
      {headerDescription && (
        <div className="flex w-full items-center gap-2 rounded-md border border-primary/10 bg-primary/5 px-3 py-2 sm:hidden">
          <div className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
          <span className="text-sm font-medium text-primary">
            {headerDescription}
          </span>
        </div>
      )}

      {/* Timeline and Speed Controls */}
      {steps.length > 1 && (
        <div className="flex flex-col gap-4 border-t border-border/40 pt-3 sm:flex-row sm:items-center sm:gap-6">
          {/* Timeline */}
          <div className="flex min-w-[180px] flex-1 items-center gap-3">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Timeline
            </span>
            <Slider
              value={[Math.min(currentStep, Math.max(steps.length - 1, 0))]}
              min={0}
              max={Math.max(steps.length - 1, 0)}
              step={1}
              className="flex-1"
              disabled={steps.length === 0 || steps.length <= 1}
              onValueChange={([value]) => handleStepChange(value)}
            />
          </div>

          {/* Speed */}
          <div className="flex w-full min-w-[180px] items-center gap-3 sm:w-auto">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Speed
            </span>
            <Slider
              value={[playbackSpeed]}
              onValueChange={([value]) => setPlaybackSpeed(value)}
              min={100}
              max={2000}
              step={50}
              className="w-[120px]"
              disabled={steps.length === 0}
            />
            <span className="min-w-[55px] rounded bg-muted/50 px-2 py-0.5 text-right font-mono text-xs font-medium text-foreground">
              {playbackSpeed}ms
            </span>
          </div>
        </div>
      )}
    </div>
  )

  const infoPanel = (
    <VisualizerInfoPanel
      topic={topic}
      currentStep={currentStep}
      totalSteps={steps.length}
      currentData={currentData}
      hideStepInfo={false}
    />
  )

  const headerBadges = (
    <>
      {topic.difficulty && (
        <Badge
          variant="outline"
          className={cn("font-semibold", getDifficultyColor(topic.difficulty))}
        >
          {topic.difficulty.toUpperCase()}
        </Badge>
      )}
      <Badge variant="outline" className="font-mono font-semibold">
        {topic.complexity.time}
      </Badge>
    </>
  )

  const description = (
    <div className="flex flex-wrap items-center gap-4 text-xs">
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded bg-green-600 shadow-sm"></div>
        <span className="text-muted-foreground">Start</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded bg-destructive shadow-sm"></div>
        <span className="text-muted-foreground">End</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded bg-foreground"></div>
        <span className="text-muted-foreground">Wall</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded border border-primary/20 bg-primary/20"></div>
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
      renderControls={renderControls}
      infoPanel={infoPanel}
      headerBadges={headerBadges}
      headerDescription={currentData.description}
      description={description}
      hideTitle={false}
      hideDescription={false}
      showInfoPanel={true}
    >
      <motion.div className="mx-auto grid w-full max-w-[350px] grid-cols-5 gap-1.5 p-6 sm:max-w-[400px] sm:gap-2">
        {currentData.array.map((val, idx) => {
          const isStart = val === 2
          const isEnd = val === 3
          const isWall = val === 1
          const isVisited = visitedSet.has(idx)
          const isPath = pathSet.has(idx)
          const isActive = currentData.activeIndices.includes(idx)

          let bgColor = "hsl(var(--muted) / 0.4)"
          let borderColor = "hsl(var(--border) / 0.5)"

          if (isWall) {
            bgColor = "hsl(var(--foreground))"
            borderColor = "hsl(var(--foreground))"
          } else if (isPath) {
            bgColor = "rgb(234 179 8)"
            borderColor = "rgb(202 138 4)"
          } else if (isActive) {
            bgColor = "hsl(var(--primary))"
            borderColor = "hsl(var(--primary))"
          } else if (isStart) {
            bgColor = "rgb(22 163 74)"
            borderColor = "rgb(21 128 61)"
          } else if (isEnd) {
            bgColor = "hsl(var(--destructive))"
            borderColor = "hsl(var(--destructive))"
          } else if (isVisited) {
            bgColor = "hsl(var(--primary) / 0.2)"
            borderColor = "hsl(var(--primary) / 0.3)"
          }

          return (
            <motion.div
              key={idx}
              variants={staggerItem}
              layout
              animate={{
                backgroundColor: bgColor,
                borderColor: borderColor,
                scale: isActive ? 1.1 : 1,
                boxShadow: isActive
                  ? "0 8px 20px -4px rgb(0 0 0 / 0.2)"
                  : "0 2px 8px -2px rgb(0 0 0 / 0.1)",
              }}
              transition={transitions.spring}
              className="aspect-square rounded-lg border backdrop-blur-sm"
            />
          )
        })}
      </motion.div>
    </VisualizerLayout>
  )
}
