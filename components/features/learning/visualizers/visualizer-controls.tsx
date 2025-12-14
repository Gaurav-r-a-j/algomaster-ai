"use client"

import { motion } from "motion/react"

import { hoverScaleSmall, tapScale, transitions } from "@/lib/animations"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  RefreshCwIcon,
} from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
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
  disabled?: boolean
  showSpeedControl?: boolean
  arraySize?: number
  onArraySizeChange?: (size: number) => void
  showArraySizeControl?: boolean
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
  disabled = false,
  showSpeedControl = true,
  arraySize,
  onArraySizeChange,
  showArraySizeControl = false,
}: VisualizerControlsProps) {
  const canGoPrevious = currentStep > 0
  const canGoNext = currentStep < totalSteps - 1

  return (
    <div className="flex flex-col gap-3">
      {/* Main Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <motion.div whileHover={hoverScaleSmall} whileTap={tapScale}>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            disabled={disabled || isPlaying}
            title="Reset visualization"
          >
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={transitions.quick}
            >
              <IconWrapper icon={RefreshCwIcon} size={16} className="mr-2" />
            </motion.div>
            Reset
          </Button>
        </motion.div>

        <motion.div whileHover={hoverScaleSmall} whileTap={tapScale}>
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviousStep}
            disabled={disabled || isPlaying || !canGoPrevious}
            title="Previous step"
          >
            <IconWrapper icon={ChevronLeftIcon} size={16} />
          </Button>
        </motion.div>

        <motion.div whileHover={hoverScaleSmall} whileTap={tapScale}>
          <Button
            size="sm"
            onClick={isPlaying ? onPause : onPlay}
            disabled={disabled}
            title={isPlaying ? "Pause" : "Play"}
            className="min-w-[100px]"
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
        </motion.div>

        <motion.div whileHover={hoverScaleSmall} whileTap={tapScale}>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextStep}
            disabled={disabled || isPlaying || !canGoNext}
            title="Next step"
          >
            <IconWrapper icon={ChevronRightIcon} size={16} />
          </Button>
        </motion.div>

        {/* Step Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transitions.smooth}
          className="bg-muted ml-auto flex items-center gap-2 rounded-md px-3 py-1.5"
        >
          <span className="text-muted-foreground font-mono text-xs">
            Step {currentStep + 1} / {totalSteps}
          </span>
        </motion.div>
      </div>

      {/* Array Size Control */}
      {showArraySizeControl && arraySize !== undefined && onArraySizeChange && (
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground min-w-[80px] text-xs font-semibold tracking-wider uppercase">
            Array Size
          </span>
          <Slider
            value={[arraySize]}
            onValueChange={([value]) => onArraySizeChange(value)}
            min={5}
            max={30}
            step={1}
            className="flex-1"
            disabled={disabled || isPlaying}
          />
          <span className="text-muted-foreground min-w-[40px] text-right font-mono text-xs">
            {arraySize}
          </span>
        </div>
      )}

      {/* Speed Control */}
      {showSpeedControl && (
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground min-w-[60px] text-xs font-semibold tracking-wider uppercase">
            Speed
          </span>
          <Slider
            value={[playbackSpeed]}
            onValueChange={([value]) => onSpeedChange(value)}
            min={100}
            max={2000}
            step={50}
            className="flex-1"
            disabled={disabled}
          />
          <span className="text-muted-foreground min-w-[50px] text-right font-mono text-xs">
            {playbackSpeed}ms
          </span>
        </div>
      )}
    </div>
  )
}
