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
  arraySize?: number
  onArraySizeChange?: (size: number) => void
  onArraySizeChange?: (size: number) => void
  showArraySizeControl?: boolean
  extraControlsLeft?: React.ReactNode
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
  arraySize,
  onArraySizeChange,
  showArraySizeControl = false,
  extraControlsLeft,
}: VisualizerControlsProps) {
  const canGoPrevious = currentStep > 0
  const canGoNext = currentStep < totalSteps - 1
  const maxStep = Math.max(totalSteps - 1, 0)

  return (
    <div className="flex w-full flex-col gap-3">
      {/* Primary Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Extra Controls (Left) */}
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

        {/* Previous Step Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviousStep}
              disabled={disabled || isPlaying || !canGoPrevious}
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
              className="min-w-[100px]"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <motion.div
                animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
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
          <TooltipContent>{isPlaying ? "Pause animation" : "Play animation"}</TooltipContent>
        </Tooltip>

        {/* Next Step Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={onNextStep}
              disabled={disabled || isPlaying || !canGoNext}
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
          className="bg-muted flex items-center gap-2 rounded-md px-2.5 py-1.5 border border-border/40"
        >
          <span className="text-muted-foreground font-mono text-xs font-semibold">
            Step {currentStep + 1} / {totalSteps}
          </span>
        </motion.div>
      </div>

      {/* Timeline + Size + Speed */}
      <div className="flex flex-col gap-3">
        {/* Step slider */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <span>Timeline</span>
            <span className="font-mono">
              Step {Math.min(currentStep + 1, totalSteps || 1)} / {Math.max(totalSteps, 1)}
            </span>
          </div>
          <div className="flex items-center gap-3">
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
        </div>

        {/* Array Size Control */}
        {showArraySizeControl && arraySize !== undefined && onArraySizeChange && (
          <div className="flex flex-col gap-2">
            <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
              Array Size
              <span className="font-mono">{arraySize}</span>
            </div>
            <div className="flex items-center gap-3">
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
          </div>
        )}

        {/* Speed Control */}
        {showSpeedControl && (
          <div className="flex flex-col gap-2">
            <div className="text-muted-foreground flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
              Speed
              <span className="font-mono">{playbackSpeed}ms</span>
            </div>
            <div className="flex items-center gap-3">
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
          </div>
        )}
      </div>
    </div>
  )
}
