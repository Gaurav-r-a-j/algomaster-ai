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
    <div className="flex w-full flex-col gap-4">
      {/* Primary Controls Row */}
      <div className="flex flex-wrap items-center gap-2.5">
        {extraControlsLeft && (
          <div className="mr-1 border-r border-border/40 pr-2.5">
            {extraControlsLeft}
          </div>
        )}

        {/* Previous Step */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={onPreviousStep}
              disabled={disabled || isPlaying || !canGoPrevious}
              className="h-10 w-10 rounded-lg"
              aria-label="Previous step"
            >
              <IconWrapper icon={ChevronLeftIcon} size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Previous step</TooltipContent>
        </Tooltip>

        {/* Reset Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              disabled={disabled || isPlaying}
              className="h-10 rounded-lg px-4"
              aria-label="Reset visualization"
            >
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={transitions.quick}
              >
                <IconWrapper icon={RefreshCwIcon} size={16} className="mr-2" />
              </motion.div>
              Reset
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reset visualization</TooltipContent>
        </Tooltip>

        {/* Play/Pause Button - Prominent */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={isPlaying ? onPause : onPlay}
              disabled={disabled}
              className="h-10 min-w-[110px] rounded-lg bg-foreground text-background hover:bg-foreground/90 font-semibold"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <IconWrapper
                icon={isPlaying ? PauseIcon : PlayIcon}
                size={18}
                className="mr-2"
              />
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
              className="h-10 w-10 rounded-lg"
              aria-label="Next step"
            >
              <IconWrapper icon={ChevronRightIcon} size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Next step</TooltipContent>
        </Tooltip>

        {/* Step Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transitions.smooth}
          className="ml-auto hidden items-center gap-2 rounded-lg border border-border/40 bg-muted/50 px-3 py-2 sm:flex"
        >
          <span className="font-mono text-sm font-semibold text-foreground">
            Step {currentStep + 1} / {totalSteps || 1}
          </span>
        </motion.div>
      </div>

      {/* Timeline + Size + Speed Sliders */}
      <div className="flex flex-col gap-4 border-t border-border/40 pt-4">
        {/* Timeline Slider */}
        {showTimelineControl && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                TIMELINE
              </span>
              <span className="font-mono text-sm font-semibold text-foreground">
                {Math.min(currentStep + 1, totalSteps || 1)} / {Math.max(totalSteps, 1)}
              </span>
            </div>
            <Slider
              value={[Math.min(currentStep, maxStep)]}
              min={0}
              max={maxStep}
              step={1}
              className="w-full"
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
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  ARRAY SIZE
                </span>
                <span className="font-mono text-sm font-semibold text-foreground">
                  {arraySize}
                </span>
              </div>
              <Slider
                value={[arraySize]}
                onValueChange={([value]) => onArraySizeChange(value)}
                min={5}
                max={30}
                step={1}
                className="w-full"
                disabled={disabled || isPlaying}
              />
            </div>
          )}

        {/* Speed Control */}
        {showSpeedControl && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                SPEED
              </span>
              <span className="font-mono text-sm font-semibold text-foreground uppercase">
                {playbackSpeed}MS
              </span>
            </div>
            <Slider
              value={[playbackSpeed]}
              onValueChange={([value]) => onSpeedChange(value)}
              min={100}
              max={2000}
              step={50}
              className="w-full"
              disabled={disabled}
            />
          </div>
        )}
      </div>
    </div>
  )
}
