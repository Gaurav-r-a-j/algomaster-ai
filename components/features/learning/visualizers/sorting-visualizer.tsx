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
import { staggerItem, transitions } from "@/lib/animations"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
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
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleStepChange = (step: number) => {
    setIsPlaying(false)
    setCurrentStep(step)
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
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
                onClick={handleReset}
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
                  onClick={isPlaying ? handlePause : handlePlay}
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

      {/* Timeline, Array Size, and Speed Controls */}
      {steps.length > 1 && (
        <div className="flex flex-col gap-4 border-t border-border/40 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
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

          {/* Array Size */}
          <div className="flex w-full min-w-[150px] items-center gap-3 sm:w-auto">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Size
            </span>
            <Slider
              value={[arraySize]}
              onValueChange={([value]) => handleArraySizeChange(value)}
              min={5}
              max={30}
              step={1}
              className="w-[100px]"
              disabled={isPlaying}
            />
            <span className="min-w-[30px] rounded bg-muted/50 px-2 py-0.5 text-center font-mono text-xs font-medium text-foreground">
              {arraySize}
            </span>
          </div>

          {/* Speed */}
          <div className="flex w-full min-w-[150px] items-center gap-3 sm:w-auto">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Speed
            </span>
            <Slider
              value={[playbackSpeed]}
              onValueChange={([value]) => setPlaybackSpeed(value)}
              min={100}
              max={2000}
              step={50}
              className="w-[100px]"
              disabled={steps.length === 0}
            />
            <span className="min-w-[50px] rounded bg-muted/50 px-2 py-0.5 text-right font-mono text-xs font-medium text-foreground">
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
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1 rounded-full border border-border/60 px-2 py-1">
        <span className="h-2 w-2 rounded-full bg-primary" /> Unsorted
      </span>
      <span className="inline-flex items-center gap-1 rounded-full border border-border/60 px-2 py-1">
        <span className="h-2 w-2 rounded-full bg-amber-500" /> Active
      </span>
      <span className="inline-flex items-center gap-1 rounded-full border border-border/60 px-2 py-1">
        <span className="h-2 w-2 rounded-full bg-emerald-500" /> Sorted
      </span>
    </div>
  )

  return (
    <VisualizerLayout
      title="Sorting Visualization"
      icon={<ChartBarIcon className="h-5 w-5 text-primary" />}
      renderControls={renderControls}
      infoPanel={infoPanel}
      headerBadges={headerBadges}
      headerDescription={currentData.description}
      description={description}
      hideTitle={false}
      hideDescription={false}
      showInfoPanel={true}
    >
      <motion.div className="flex w-full flex-col items-center gap-6 p-4 sm:p-6">
        {/* Number-based visualization */}
        <div className="flex min-h-[200px] flex-wrap items-center justify-center gap-2 sm:gap-3">
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
                }}
                transition={transitions.spring}
                className="flex flex-col items-center gap-1 sm:gap-2"
              >
                <motion.div
                  animate={{
                    borderColor: isActive
                      ? "rgb(245 158 11)"
                      : isSorted
                        ? "rgb(16 185 129)"
                        : "hsl(var(--border))",
                    backgroundColor: isActive
                      ? "rgb(245 158 11 / 0.15)"
                      : isSorted
                        ? "rgb(16 185 129 / 0.15)"
                        : "hsl(var(--background))",
                    color: isActive
                      ? "rgb(180 83 9)"
                      : isSorted
                        ? "rgb(5 150 105)"
                        : "hsl(var(--foreground))",
                    boxShadow: isActive
                      ? "0 10px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                      : "0 4px 12px -2px rgb(0 0 0 / 0.1)",
                  }}
                  transition={transitions.smooth}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 text-xs font-bold backdrop-blur-sm sm:h-12 sm:w-12 sm:text-sm md:h-14 md:w-14 md:text-lg"
                >
                  {value}
                </motion.div>
                <span className="font-mono text-[10px] font-semibold text-muted-foreground sm:text-xs">
                  [{idx}]
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Array representation - subtle pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transitions.smooth}
          className="flex flex-wrap items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 backdrop-blur-sm"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Array:
          </span>
          <code className="font-mono text-xs text-foreground sm:text-sm">
            [{currentData.array.join(", ")}]
          </code>
        </motion.div>
      </motion.div>
    </VisualizerLayout>
  )
}
