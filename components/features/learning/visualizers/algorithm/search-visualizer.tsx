"use client"

import { useCallback, useEffect, useState } from "react"
import { useVisualizerState } from "@/hooks/visualizers/use-visualizer-state"
import { useSearchSteps } from "@/hooks/visualizers/use-search-steps"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { staggerItem, transitions } from "@/lib/animations"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  RefreshCwIcon,
  SearchIcon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { SearchNumbersView } from "../views/search-numbers-view"

const DEFAULT_SPEED_MS = 800

interface SearchVisualizerProps {
  topic: Topic
}

export function SearchVisualizer({ topic }: SearchVisualizerProps) {
  const [array] = useState<number[]>(
    Array.from({ length: 8 }, (_, i) => (i + 1) * 5).sort((a, b) => a - b)
  )
  const [target, setTarget] = useState<number>(25)

  const { generateSteps } = useSearchSteps(topic.id)
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
    const newSteps = generateSteps(array, target)
    setSteps(newSteps)
    reset()
  }, [array, target, generateSteps, setSteps, reset])

  useEffect(() => {
    updateSteps()
  }, [updateSteps, topic.id, target])

  const handleReset = () => {
    updateSteps()
  }

  const renderControls = (
    isPanelOpen: boolean,
    togglePanel: () => void,
    headerDescription?: React.ReactNode
  ) => (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Toggle + Target Input */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Sidebar Toggle */}
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

          <Separator orientation="vertical" className="hidden h-6 sm:block" />

          {/* Target Input Group */}
          <div className="bg-muted/40 border-border/40 flex items-center gap-3 rounded-lg border p-1.5">
            <IconWrapper
              icon={SearchIcon}
              size={14}
              className="text-muted-foreground ml-2"
            />
            <label className="text-muted-foreground hidden text-xs font-bold tracking-wider uppercase sm:block">
              Target
            </label>
            <Input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="bg-background border-border/50 h-8 w-[70px] text-sm sm:w-[80px]"
              min={Math.min(...array)}
              max={Math.max(...array)}
              disabled={isPlaying}
              aria-label="Search target"
            />
          </div>

          {/* Status Text (Inline) */}
          {headerDescription && (
            <>
              <Separator orientation="vertical" className="hidden h-6 sm:block" />
              <div className="hidden min-w-0 max-w-[300px] items-center gap-2 overflow-hidden sm:flex">
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                <span className="truncate text-sm font-medium text-primary">
                  {headerDescription}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Playback Controls Group */}
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

          <div className="mx-2 flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePreviousStep}
                  disabled={
                    steps.length === 0 || isPlaying || currentStep === 0
                  }
                  className="h-9 w-9"
                  aria-label="Previous step"
                >
                  <IconWrapper icon={ChevronLeftIcon} size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Previous step</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="default"
                  onClick={isPlaying ? handlePause : handlePlay}
                  disabled={steps.length === 0}
                  className="min-w-[100px] px-6 font-semibold"
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
              <TooltipContent>Next step</TooltipContent>
            </Tooltip>
          </div>

          <div className="bg-muted border-border/40 hidden items-center rounded-md border px-3 py-1.5 sm:flex">
            <span className="text-muted-foreground font-mono text-xs font-semibold">
              Step {currentStep + 1} <span className="text-border mx-1">/</span>{" "}
              {steps.length || 1}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Status (if hidden above) */}
      {headerDescription && (
        <div className="flex w-full items-center gap-2 rounded-md border border-primary/10 bg-primary/5 px-3 py-2 sm:hidden">
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">
            {headerDescription}
          </span>
        </div>
      )}

      {/* Timeline and Speed Controls Row */}
      {steps.length > 1 && (
        <div className="border-border/40 flex flex-wrap items-center gap-6 border-t pt-2">
          <div className="flex min-w-[200px] flex-1 items-center gap-3">
            <span className="text-muted-foreground text-xs font-semibold tracking-wider whitespace-nowrap uppercase">
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

          <div className="flex w-full min-w-[200px] items-center gap-3 sm:w-auto">
            <span className="text-muted-foreground text-xs font-semibold tracking-wider whitespace-nowrap uppercase">
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
            <span className="text-foreground bg-muted/50 min-w-[60px] rounded px-2 py-0.5 text-right font-mono text-xs font-medium">
              {playbackSpeed}ms
            </span>
          </div>
        </div>
      )}
    </div>
  )

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

  const infoPanel = (
    <VisualizerInfoPanel
      topic={topic}
      currentStep={currentStep}
      totalSteps={steps.length}
      currentData={currentData}
      hideStepInfo={true}
    />
  )

  const description = (
    <div className="flex items-start gap-3">
      <div className="flex-1">
        <p className="text-foreground text-sm leading-relaxed font-medium">
          {currentData.description}
        </p>
      </div>
    </div>
  )

  return (
    <VisualizerLayout
      title="Search Visualization"
      icon={
        <IconWrapper icon={SearchIcon} size={20} className="text-primary" />
      }
      renderControls={renderControls}
      infoPanel={infoPanel}
      headerBadges={headerBadges}
      headerDescription={currentData.description}
      description={description}
      hideTitle={false}
      hideDescription={true}
      showInfoPanel={true}
    >
      <SearchNumbersView currentData={currentData} />
    </VisualizerLayout>
  )
}
