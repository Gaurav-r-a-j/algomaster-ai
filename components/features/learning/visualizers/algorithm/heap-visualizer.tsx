"use client"

import { useCallback, useEffect } from "react"
import { useVisualizerState } from "@/hooks/visualizers/use-visualizer-state"
import { useHeapSteps } from "@/hooks/visualizers/use-heap-steps"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { staggerContainer, staggerItem, transitions } from "@/lib/animations"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LayersIcon,
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

import { VisualizerInfoPanel } from "../shared/visualizer-info-panel"
import { VisualizerLayout } from "../shared/visualizer-layout"
import { HeapArrayView } from "../views/heap-array-view"

interface HeapVisualizerProps {
  topic: Topic
}

const DEFAULT_SPEED_MS = 800

export function HeapVisualizer({ topic }: HeapVisualizerProps) {
  const { generateSteps } = useHeapSteps()
  const {
    steps,
    currentStep,
    isPlaying,
    playbackSpeed,
    currentData,
    setSteps,
    setPlaybackSpeed,
    handlePlay,
    handlePause,
    handlePreviousStep,
    handleNextStep,
    handleStepChange,
    reset,
  } = useVisualizerState({ defaultSpeed: DEFAULT_SPEED_MS })

  const updateSteps = useCallback(() => {
    const newSteps = generateSteps()
    setSteps(newSteps)
    reset()
    // Start from step 1 to show initial heap with first element (skip empty heap)
    if (newSteps.length > 1) {
      handleStepChange(1)
    }
  }, [generateSteps, setSteps, reset, handleStepChange])

  useEffect(() => {
    updateSteps()
  }, [updateSteps])

  const auxiliary = currentData.auxiliary as { heap?: number[] }
  const heap = auxiliary?.heap || []

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
                <div className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-amber-500" />
                <span className="truncate text-sm font-medium text-amber-600 dark:text-amber-400">
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
                  className="min-w-[90px] bg-amber-500 px-4 font-semibold text-white hover:bg-amber-600"
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
        <div className="flex w-full items-center gap-2 rounded-md border border-amber-500/20 bg-amber-500/10 px-3 py-2 sm:hidden">
          <div className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-amber-500" />
          <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
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
        <div className="h-3 w-3 rounded-full bg-amber-400"></div>
        <span className="text-muted-foreground">Active / Swapping</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-3 rounded-full border border-border bg-background"></div>
        <span className="text-muted-foreground">Heap Node</span>
      </div>
    </div>
  )

  return (
    <VisualizerLayout
      title="Max Heap Visualizer"
      icon={
        <IconWrapper icon={LayersIcon} size={20} className="text-amber-500" />
      }
      renderControls={renderControls}
      infoPanel={infoPanel}
      headerBadges={headerBadges}
      headerDescription={currentData.description}
      description={description}
      hideTitle={false}
      hideDescription={false}
      showInfoPanel={true}
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="flex w-full flex-col items-center gap-8 p-6"
      >
        {/* Tree Visualization */}
        <div className="relative flex h-56 w-full max-w-[700px] items-start justify-center overflow-hidden sm:h-72">
          {/* Draw connecting lines first */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {heap.map((_, idx) => {
              if (idx === 0) return null
              const parentIdx = Math.floor((idx - 1) / 2)

              const level = Math.floor(Math.log2(idx + 1))
              const offset = Math.pow(2, level) - 1
              const posInLevel = idx - offset
              const maxInLevel = Math.pow(2, level)
              const childLeft =
                (posInLevel / maxInLevel) * 100 + 100 / maxInLevel / 2
              const childTop = level * 65 + 25

              const parentLevel = Math.floor(Math.log2(parentIdx + 1))
              const parentOffset = Math.pow(2, parentLevel) - 1
              const parentPosInLevel = parentIdx - parentOffset
              const parentMaxInLevel = Math.pow(2, parentLevel)
              const parentLeft =
                (parentPosInLevel / parentMaxInLevel) * 100 +
                100 / parentMaxInLevel / 2
              const parentTop = parentLevel * 65 + 25

              return (
                <motion.line
                  key={`line-${idx}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={transitions.spring}
                  x1={`${parentLeft}%`}
                  y1={`${parentTop + 22}px`}
                  x2={`${childLeft}%`}
                  y2={`${childTop}px`}
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-muted-foreground"
                />
              )
            })}
          </svg>

          {/* Nodes */}
          {heap.map((val: number, idx: number) => {
            const level = Math.floor(Math.log2(idx + 1))
            const offset = Math.pow(2, level) - 1
            const posInLevel = idx - offset
            const maxInLevel = Math.pow(2, level)
            const width = 100 / maxInLevel
            const left = posInLevel * width + width / 2
            const top = level * 65 + 25
            const isActive = currentData.activeIndices.includes(idx)

            return (
              <motion.div
                key={idx}
                variants={staggerItem}
                layout
                animate={{
                  scale: isActive ? 1.3 : 1,
                  backgroundColor: isActive
                    ? "rgb(251 191 36)"
                    : "hsl(var(--background))",
                  borderColor: isActive
                    ? "rgb(245 158 11)"
                    : "hsl(var(--border))",
                  color: isActive ? "white" : "hsl(var(--foreground))",
                  boxShadow: isActive
                    ? "0 10px 25px -5px rgb(251 191 36 / 0.6)"
                    : "0 4px 12px -2px rgb(0 0 0 / 0.1)",
                }}
                transition={transitions.spring}
                className="absolute z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 text-base font-bold backdrop-blur-sm shadow-lg sm:h-16 sm:w-16 sm:text-lg md:h-18 md:w-18 md:text-xl"
                style={{
                  left: `${left}%`,
                  top: `${top}px`,
                  transform: "translateX(-50%)",
                }}
              >
                {val}
              </motion.div>
            )
          })}
        </div>

        {/* Array Representation - subtle pill */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Array Representation
          </span>
          <HeapArrayView
            heap={heap}
            activeIndices={currentData.activeIndices}
          />
        </div>
      </motion.div>
    </VisualizerLayout>
  )
}
