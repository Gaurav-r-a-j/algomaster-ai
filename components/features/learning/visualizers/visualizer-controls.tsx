"use client";

import { Button } from "@/components/ui/button";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon, RefreshCwIcon } from "@/lib/icons";
import { Slider } from "@/components/ui/slider";

interface VisualizerControlsProps {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  playbackSpeed: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
  onSpeedChange: (speed: number) => void;
  disabled?: boolean;
  showSpeedControl?: boolean;
  arraySize?: number;
  onArraySizeChange?: (size: number) => void;
  showArraySizeControl?: boolean;
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
  const canGoPrevious = currentStep > 0;
  const canGoNext = currentStep < totalSteps - 1;

  return (
    <div className="flex flex-col gap-3">
      {/* Main Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          disabled={disabled || isPlaying}
          title="Reset visualization"
        >
          <IconWrapper icon={RefreshCwIcon} size={16} className="mr-2" />
          Reset
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onPreviousStep}
          disabled={disabled || isPlaying || !canGoPrevious}
          title="Previous step"
        >
          <IconWrapper icon={ChevronLeftIcon} size={16} />
        </Button>

        <Button
          size="sm"
          onClick={isPlaying ? onPause : onPlay}
          disabled={disabled}
          title={isPlaying ? "Pause" : "Play"}
          className="min-w-[100px]"
        >
          <IconWrapper
            icon={isPlaying ? PauseIcon : PlayIcon}
            size={16}
            className="mr-2"
          />
          {isPlaying ? "Pause" : "Play"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onNextStep}
          disabled={disabled || isPlaying || !canGoNext}
          title="Next step"
        >
          <IconWrapper icon={ChevronRightIcon} size={16} />
        </Button>

        {/* Step Counter */}
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md">
          <span className="text-xs font-mono text-muted-foreground">
            Step {currentStep + 1} / {totalSteps}
          </span>
        </div>
      </div>

      {/* Array Size Control */}
      {showArraySizeControl && arraySize !== undefined && onArraySizeChange && (
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[80px]">
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
          <span className="text-xs font-mono text-muted-foreground min-w-[40px] text-right">
            {arraySize}
          </span>
        </div>
      )}

      {/* Speed Control */}
      {showSpeedControl && (
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[60px]">
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
          <span className="text-xs font-mono text-muted-foreground min-w-[50px] text-right">
            {playbackSpeed}ms
          </span>
        </div>
      )}
    </div>
  );
}

