"use client"

import { useCallback, useEffect, useState } from "react"
import { useVisualizerState } from "@/hooks/visualizers/use-visualizer-state"
import { useSortingSteps } from "@/hooks/visualizers/use-sorting-steps"
import { ChartBarIcon } from "@heroicons/react/24/outline"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { staggerContainer, staggerItem, transitions } from "@/lib/animations"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  RefreshCwIcon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { VisualizerInfoPanel } from "../shared/visualizer-info-panel"
import { VisualizerLayout } from "../shared/visualizer-layout"
import { VisualizerControls } from "../shared/visualizer-controls"
import { VisualizerHeaderBadges } from "../shared/visualizer-header-badges"
import { SortingBarChart } from "../views/sorting-bar-chart"
import { SortingNumbersView } from "../views/sorting-numbers-view"

const DEFAULT_ARRAY_SIZE = 15
const DEFAULT_SPEED_MS = 500

interface SortingVisualizerProps {
  topic: Topic
}

export function SortingVisualizer({ topic }: SortingVisualizerProps) {
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE)
  const [array, setArray] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"bars" | "numbers">("bars")
  const [isGenerating, setIsGenerating] = useState(false)

  const { generateSteps } = useSortingSteps(topic.id)
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

  // Reset when steps change after generation
  useEffect(() => {
    if (isGenerating && steps.length > 0) {
      reset()
      setIsGenerating(false)
    }
  }, [steps.length, isGenerating, reset])

  const generateArray = useCallback(
    (size: number) => {
      // Pause first to stop any ongoing animation
      handlePause()
      
      // Set generating flag
      setIsGenerating(true)
      
      // Clear current steps immediately to prevent flash
      setSteps([])
      
      // Generate new array
      const newArray = Array.from(
        { length: size },
        () => Math.floor(Math.random() * 90) + 10
      )
      
      // Update array state immediately
      setArray(newArray)
      
      // Generate steps synchronously
      const newSteps = generateSteps(newArray)
      
      // Set new steps - reset will happen in useEffect
      setSteps(newSteps)
    },
    [generateSteps, setSteps, handlePause]
  )

  const handleArraySizeChange = useCallback(
    (size: number) => {
      // Update size state first
      setArraySize(size)
      // Generate new array with new size immediately
      generateArray(size)
    },
    [generateArray]
  )

  const handleReset = useCallback(() => {
    handlePause()
    generateArray(arraySize)
  }, [arraySize, generateArray, handlePause])

  // Only regenerate on topic change, not on arraySize change
  useEffect(() => {
    generateArray(arraySize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id])

  const renderControls = (
    isPanelOpen: boolean,
    togglePanel: () => void,
    headerDescription?: React.ReactNode
  ) => (
    <div className="flex w-full flex-col gap-3">
      <VisualizerControls
        isPlaying={isPlaying}
        currentStep={currentStep}
        totalSteps={steps.length}
        playbackSpeed={playbackSpeed}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={handleReset}
        onPreviousStep={handlePreviousStep}
        onNextStep={handleNextStep}
        onSpeedChange={setPlaybackSpeed}
        onStepChange={handleStepChange}
        disabled={steps.length === 0}
        arraySize={arraySize}
        onArraySizeChange={handleArraySizeChange}
        showArraySizeControl={true}
        extraControlsLeft={
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
        }
      />
      {headerDescription && (
        <div className="flex w-full items-center gap-2 rounded-md border border-primary/10 bg-primary/5 px-3 py-2 sm:hidden">
          <div className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
          <span className="text-sm font-medium text-primary">
            {headerDescription}
          </span>
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

  const headerBadges = <VisualizerHeaderBadges topic={topic} />

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
        {/* View Mode Toggle */}
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "bars" | "numbers")} className="w-full">
          <TabsList className="grid w-full max-w-xs grid-cols-2 mx-auto">
            <TabsTrigger value="bars">Bar Chart</TabsTrigger>
            <TabsTrigger value="numbers">Numbers</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Visualization based on view mode */}
        {viewMode === "bars" ? (
          <SortingBarChart
            data={currentData.array}
            activeIndices={currentData.activeIndices}
            sortedIndices={currentData.sortedIndices}
          />
        ) : (
          <SortingNumbersView currentData={currentData} />
        )}

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
