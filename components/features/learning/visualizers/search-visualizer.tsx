"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  generateBinarySearchSteps,
  generateLinearSearchSteps,
} from "@/utils/algorithm-logic"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { staggerItem, transitions } from "@/lib/animations"
import { SearchIcon } from "@/lib/icons"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { VisualizerLayout } from "./visualizer-layout"
import { VisualizerInfoPanel } from "./visualizer-info-panel"
import { cn } from "@/lib/utils"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
  RefreshCwIcon,
} from "@/lib/icons"

const DEFAULT_SPEED_MS = 800

interface SearchVisualizerProps {
  topic: Topic
}

export function SearchVisualizer({ topic }: SearchVisualizerProps) {
  const [array] = useState<number[]>(
    Array.from({ length: 8 }, (_, i) => (i + 1) * 5).sort((a, b) => a - b)
  )
  const [target, setTarget] = useState<number>(25)
  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS)
  const timerRef = useRef<number | null>(null)

  const generateSteps = useCallback(() => {
    let newSteps: VisualizationStep[] = []
    if (topic.id === "binary-search") {
      newSteps = generateBinarySearchSteps(array, target)
    } else if (topic.id === "linear-search") {
      newSteps = generateLinearSearchSteps(array, target)
    } else {
      newSteps = [
        {
          array: array,
          activeIndices: [],
          sortedIndices: [],
          description: "Visualization not implemented.",
        },
      ]
    }
    setSteps(newSteps)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [topic.id, array, target])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateSteps()
  }, [generateSteps, topic.id, target])

  useEffect(() => {
    if (isPlaying && steps.length > 0) {
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
      timerRef.current = null
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isPlaying, steps.length, playbackSpeed])

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepChange = (step: number) => {
    setIsPlaying(false)
    setCurrentStep(step)
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    generateSteps()
  }

  const currentData =
    steps[currentStep] ||
    ({
      array: array,
      activeIndices: [],
      sortedIndices: [],
      description: "Ready to search",
    } as VisualizationStep)

  const renderControls = (isPanelOpen: boolean, togglePanel: () => void) => (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Toggle + Target Input */}
        <div className="flex items-center gap-3">
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

          <Separator orientation="vertical" className="h-6" />

          {/* Target Input Group */}
          <div className="flex items-center gap-3 bg-muted/40 p-1.5 rounded-lg border border-border/40">
            <IconWrapper icon={SearchIcon} size={14} className="ml-2 text-muted-foreground" />
            <label className="text-muted-foreground text-xs font-bold uppercase tracking-wider">
              Target
            </label>
            <Input
              type="number"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-[80px] h-8 text-sm bg-background border-border/50"
              min={Math.min(...array)}
              max={Math.max(...array)}
              disabled={isPlaying}
              aria-label="Search target"
            />
          </div>
        </div>

        {/* Playback Controls Group */}
        <div className="flex items-center gap-1">
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

          <div className="flex items-center gap-1 mx-2">
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
              <TooltipContent>Previous step</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="default"
                  onClick={isPlaying ? handlePause : handlePlay}
                  disabled={steps.length === 0}
                  className="px-6 font-semibold min-w-[100px]"
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
              <TooltipContent>{isPlaying ? "Pause" : "Play"} animation</TooltipContent>
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

          <div className="bg-muted flex items-center rounded-md px-3 py-1.5 border border-border/40">
            <span className="text-muted-foreground font-mono text-xs font-semibold">
              Step {currentStep + 1} <span className="text-border mx-1">/</span> {steps.length || 1}
            </span>
          </div>
        </div>
      </div>

      {/* Timeline and Speed Controls Row */}
      {steps.length > 1 && (
        <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-border/40">
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
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

          <div className="flex items-center gap-3 w-full sm:w-auto min-w-[200px]">
            <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
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
            <span className="font-mono text-xs font-medium text-foreground min-w-[60px] text-right bg-muted/50 px-2 py-0.5 rounded">
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
        <p className="text-foreground text-sm font-medium leading-relaxed">
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
      <div className="flex-1 flex items-center justify-center min-h-0 p-6">
        <Card className="w-full border border-border/50 bg-card">
          <CardContent className="p-8">
            <div className="flex min-h-[400px] flex-wrap items-center justify-center gap-6">
              {currentData.array.map((value, idx) => {
                const isActive = currentData.activeIndices.includes(idx)
                const isFound = currentData.sortedIndices.includes(idx)

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
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      animate={{
                        borderColor: isFound
                          ? "rgb(16 185 129)"
                          : isActive
                            ? "rgb(245 158 11)"
                            : "hsl(var(--border))",
                        backgroundColor: isFound
                          ? "rgb(16 185 129 / 0.12)"
                          : isActive
                            ? "rgb(245 158 11 / 0.12)"
                            : "hsl(var(--card))",
                        color: isFound
                          ? "rgb(5 150 105)"
                          : isActive
                            ? "rgb(180 83 9)"
                            : "hsl(var(--foreground))",
                        boxShadow:
                          isFound || isActive
                            ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                            : "none",
                      }}
                      transition={transitions.smooth}
                      className="flex h-14 w-14 items-center justify-center rounded-xl border-2 text-lg font-bold"
                    >
                      {value}
                    </motion.div>
                    <span className="text-muted-foreground font-mono text-xs font-semibold">
                      [{idx}]
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </VisualizerLayout>
  )
}
