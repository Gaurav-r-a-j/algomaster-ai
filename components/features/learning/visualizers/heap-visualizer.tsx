"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { generateHeapSteps } from "@/utils/algorithm-logic"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { staggerContainer, staggerItem, transitions } from "@/lib/animations"
import { LayersIcon } from "@/lib/icons"
import { Card, CardContent } from "@/components/ui/card"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { VisualizerControls } from "./visualizer-controls"
import { VisualizerLayout } from "./visualizer-layout"

interface HeapVisualizerProps {
  topic: Topic
}

const DEFAULT_SPEED_MS = 800

// eslint-disable-next-line unused-imports/no-unused-vars
export function HeapVisualizer({ topic }: HeapVisualizerProps) {
  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS)
  const timerRef = useRef<number | null>(null)

  const generateData = useCallback(() => {
    const newSteps = generateHeapSteps()
    setSteps(newSteps)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    generateData()
  }, [generateData])

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

  const currentData =
    steps[currentStep] ||
    ({
      array: [],
      activeIndices: [],
      sortedIndices: [],
      description: "Ready",
      auxiliary: { heap: [] },
    } as VisualizationStep)

  const auxiliary = currentData.auxiliary as { heap?: number[] }
  const heap = auxiliary?.heap || []

  const controls = (
    <VisualizerControls
      isPlaying={isPlaying}
      currentStep={currentStep}
      totalSteps={steps.length}
      playbackSpeed={playbackSpeed}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onReset={generateData}
      onPreviousStep={handlePreviousStep}
      onNextStep={handleNextStep}
      onSpeedChange={setPlaybackSpeed}
      onStepChange={handleStepChange}
      disabled={steps.length === 0}
      showSpeedControl={true}
    />
  )

  const description = (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-amber-400"></div>
          <span className="text-muted-foreground">Active / Swapping</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-background border border-border"></div>
          <span className="text-muted-foreground">Heap Node</span>
        </div>
      </div>
      <p className="text-foreground text-sm font-medium">
        {currentData.description}
      </p>
    </div>
  )

  return (
    <VisualizerLayout
      title="Max Heap Visualizer"
      icon={
        <IconWrapper icon={LayersIcon} size={20} className="text-amber-500" />
      }
      controls={controls}
      description={description}
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="flex flex-col gap-4"
      >
        {/* Tree Visualization */}
        <Card>
          <CardContent className="p-4">
            <div className="relative flex h-64 items-start justify-center overflow-hidden rounded-lg">
              {/* Draw connecting lines first */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none">
                {heap.map((_, idx) => {
                  if (idx === 0) return null
                  const parentIdx = Math.floor((idx - 1) / 2)
                  
                  const level = Math.floor(Math.log2(idx + 1))
                  const offset = Math.pow(2, level) - 1
                  const posInLevel = idx - offset
                  const maxInLevel = Math.pow(2, level)
                  const childLeft = (posInLevel / maxInLevel) * 100 + (100 / maxInLevel / 2)
                  const childTop = level * 70 + 20
                  
                  const parentLevel = Math.floor(Math.log2(parentIdx + 1))
                  const parentOffset = Math.pow(2, parentLevel) - 1
                  const parentPosInLevel = parentIdx - parentOffset
                  const parentMaxInLevel = Math.pow(2, parentLevel)
                  const parentLeft = (parentPosInLevel / parentMaxInLevel) * 100 + (100 / parentMaxInLevel / 2)
                  const parentTop = parentLevel * 70 + 20
                  
                  return (
                    <line
                      key={`line-${idx}`}
                      x1={`${parentLeft}%`}
                      y1={`${parentTop + 20}px`}
                      x2={`${childLeft}%`}
                      y2={`${childTop}px`}
                      stroke="hsl(var(--border))"
                      strokeWidth="2"
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
                const top = level * 70 + 20
                const isActive = currentData.activeIndices.includes(idx)
                
                return (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    layout
                    animate={{
                      scale: isActive ? 1.2 : 1,
                      backgroundColor: isActive
                        ? "rgb(251 191 36)"
                        : "hsl(var(--background))",
                      borderColor: isActive
                        ? "rgb(245 158 11)"
                        : "hsl(var(--border))",
                      color: isActive ? "white" : "hsl(var(--foreground))",
                      boxShadow: isActive
                        ? "0 8px 20px -4px rgb(251 191 36 / 0.5)"
                        : "0 2px 4px rgb(0 0 0 / 0.05)",
                    }}
                    transition={transitions.spring}
                    className="absolute z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 font-bold text-sm"
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
          </CardContent>
        </Card>
        
        {/* Array Representation */}
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Array Representation
              </span>
              <motion.div
                variants={staggerContainer}
                className="flex items-center justify-center gap-1 overflow-x-auto py-2"
              >
                {heap.map((val: number, idx: number) => {
                  const isActive = currentData.activeIndices.includes(idx)
                  return (
                    <motion.div
                      key={idx}
                      variants={staggerItem}
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        animate={{
                          backgroundColor: isActive
                            ? "rgb(251 191 36)"
                            : "hsl(var(--background))",
                          borderColor: isActive
                            ? "rgb(245 158 11)"
                            : "hsl(var(--border))",
                          color: isActive ? "white" : "hsl(var(--foreground))",
                        }}
                        transition={transitions.smooth}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border-2 font-bold text-sm"
                      >
                        {val}
                      </motion.div>
                      <span className="text-muted-foreground mt-1 font-mono text-[10px]">
                        [{idx}]
                      </span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </VisualizerLayout>
  )
}
