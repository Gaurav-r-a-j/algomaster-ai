"use client"

import { motion } from "motion/react"

import { transitions } from "@/lib/animations"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  RefreshCwIcon,
} from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconWrapper } from "@/components/common/icon-wrapper"

interface VisualizerControlsProps {
  isPlaying: boolean
  currentStep: number
  totalSteps: number
  playbackSpeed: number
  onPlay: () => void
  onPause: () => void
  onReset: () => void
  onPreviousStep: () => void
  onNextStep: () => void
  onSpeedChange: (speed: number) => void
  onStepChange?: (step: number) => void
  disabled?: boolean
  showSpeedControl?: boolean
  showTimelineControl?: boolean
  arraySize?: number
  onArraySizeChange?: (size: number) => void
  showArraySizeControl?: boolean
  extraControlsLeft?: React.ReactNode
  compact?: boolean
}

export function VisualizerControls({
  isPlaying,
  currentStep,
  totalSteps,
  playbackSpeed,
  onPlay,
  onPause,
  onReset,
  onPreviousStep,
  onNextStep,
  onSpeedChange,
  onStepChange,
  disabled = false,
  showSpeedControl = true,
  showTimelineControl = true,
  arraySize,
  onArraySizeChange,
  showArraySizeControl = false,
  extraControlsLeft,
  compact = false,
}: VisualizerControlsProps) {
  const canGoPrevious = currentStep > 0
  const canGoNext = currentStep < totalSteps - 1
  const maxStep = Math.max(totalSteps - 1, 0)

  if (compact) {
    // Compact mode - inline controls without sliders
    return (
      <div className="flex flex-wrap items-center gap-2">
        {extraControlsLeft && (
          <div className="mr-1 border-r border-border/40 pr-2">
            {extraControlsLeft}
          </div>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onReset}
              disabled={disabled || isPlaying}
              className="h-8 w-8"
              aria-label="Reset"
            >
              <IconWrapper icon={RefreshCwIcon} size={14} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reset</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onPreviousStep}
              disabled={disabled || isPlaying || !canGoPrevious}
              className="h-8 w-8"
              aria-label="Previous step"
            >
              <IconWrapper icon={ChevronLeftIcon} size={14} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Previous</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              onClick={isPlaying ? onPause : onPlay}
              disabled={disabled}
              className="h-8 min-w-[80px] px-3"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <IconWrapper
                icon={isPlaying ? PauseIcon : PlayIcon}
                size={14}
                className="mr-1.5"
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
              onClick={onNextStep}
              disabled={disabled || isPlaying || !canGoNext}
              className="h-8 w-8"
              aria-label="Next step"
            >
              <IconWrapper icon={ChevronRightIcon} size={14} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next</TooltipContent>
        </Tooltip>

        <div className="hidden items-center rounded-md border border-border/40 bg-muted px-2 py-1 sm:flex">
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            {currentStep + 1} / {totalSteps || 1}
          </span>
        </div>
      </div>
    )
  }

  // Full mode - with sliders and detailed controls
  return (
    <div className="flex w-full flex-col gap-3">
      {/* Primary Controls Row */}
      <div className="flex flex-wrap items-center gap-2">
        {extraControlsLeft && (
          <div className="mr-2 border-r border-border/40 pr-2">
            {extraControlsLeft}
          </div>
        )}

        {/* Reset Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              disabled={disabled || isPlaying}
              className="h-9"
              aria-label="Reset visualization"
            >
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={transitions.quick}
              >
                <IconWrapper icon={RefreshCwIcon} size={16} className="mr-2" />
              </motion.div>
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reset visualization</TooltipContent>
        </Tooltip>

        {/* Previous Step */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onPreviousStep}
              disabled={disabled || isPlaying || !canGoPrevious}
              className="h-9 w-9"
              aria-label="Previous step"
            >
              <IconWrapper icon={ChevronLeftIcon} size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Previous step</TooltipContent>
        </Tooltip>

        {/* Play/Pause Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              onClick={isPlaying ? onPause : onPlay}
              disabled={disabled}
              className="h-9 min-w-[100px]"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <motion.div
                animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <IconWrapper
                  icon={isPlaying ? PauseIcon : PlayIcon}
                  size={16}
                  className="mr-2"
                />
              </motion.div>
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isPlaying ? "Pause animation" : "Play animation"}
          </TooltipContent>
        </Tooltip>

        {/* Next Step */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onNextStep}
              disabled={disabled || isPlaying || !canGoNext}
              className="h-9 w-9"
              aria-label="Next step"
            >
              <IconWrapper icon={ChevronRightIcon} size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next step</TooltipContent>
        </Tooltip>

        {/* Step Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transitions.smooth}
          className="hidden items-center gap-2 rounded-md border border-border/40 bg-muted px-2.5 py-1.5 sm:flex"
        >
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            Step {currentStep + 1} / {totalSteps || 1}
          </span>
        </motion.div>
      </div>

      {/* Timeline + Size + Speed Sliders */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:gap-6">
        {/* Timeline Slider */}
        {showTimelineControl && (
          <div className="flex min-w-[180px] flex-1 flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Timeline</span>
              <span className="font-mono">
                {Math.min(currentStep + 1, totalSteps || 1)} /{" "}
                {Math.max(totalSteps, 1)}
              </span>
            </div>
            <Slider
              value={[Math.min(currentStep, maxStep)]}
              min={0}
              max={maxStep}
              step={1}
              className="flex-1"
              disabled={disabled || totalSteps <= 1}
              onValueChange={([value]) => {
                if (onStepChange) {
                  onStepChange(value)
                }
              }}
            />
          </div>
        )}

        {/* Array Size Control */}
        {showArraySizeControl &&
          arraySize !== undefined &&
          onArraySizeChange && (
            <div className="flex min-w-[150px] flex-col gap-1.5 sm:w-[180px]">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span>Array Size</span>
                <span className="font-mono">{arraySize}</span>
              </div>
              <Slider
                value={[arraySize]}
                onValueChange={([value]) => onArraySizeChange(value)}
                min={5}
                max={30}
                step={1}
                className="flex-1"
                disabled={disabled || isPlaying}
              />
            </div>
          )}

        {/* Speed Control */}
        {showSpeedControl && (
          <div className="flex min-w-[150px] flex-col gap-1.5 sm:w-[180px]">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span>Speed</span>
              <span className="font-mono">{playbackSpeed}ms</span>
            </div>
            <Slider
              value={[playbackSpeed]}
              onValueChange={([value]) => onSpeedChange(value)}
              min={100}
              max={2000}
              step={50}
              className="flex-1"
              disabled={disabled}
            />
          </div>
        )}
      </div>
    </div>
  )
}
