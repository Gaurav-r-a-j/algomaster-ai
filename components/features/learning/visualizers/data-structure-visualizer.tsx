"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  generateLinkedListSteps,
  generateQueueSteps,
  generateStackSteps,
} from "@/utils/algorithm-logic"
import { Squares2X2Icon } from "@heroicons/react/24/outline"
import { motion } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { VisualizerType } from "@/types/curriculum"
import { staggerItem, transitions } from "@/lib/animations"
import { Card, CardContent } from "@/components/ui/card"

import { VisualizerControls } from "./visualizer-controls"
import { VisualizerLayout } from "./visualizer-layout"

const DEFAULT_SPEED_MS = 1000

interface DataStructureVisualizerProps {
  topic: Topic
}

const TreeNode: React.FC<{
  val: number | null
  idx: number
  isActive: boolean
  totalLevels: number
}> = ({ val, idx, isActive, totalLevels: _totalLevels }) => {
  if (val === null) {
    return null
  }
  const level = Math.floor(Math.log2(idx + 1))
  const posInLevel = idx - (Math.pow(2, level) - 1)
  const levelWidth = Math.pow(2, level)
  const left = (posInLevel / levelWidth) * 100

  return (
    <motion.div
      layout
      animate={{
        scale: isActive ? 1.1 : 1,
        borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border))",
        backgroundColor: isActive
          ? "hsl(var(--primary) / 0.1)"
          : "hsl(var(--card))",
        color: isActive ? "hsl(var(--primary))" : "hsl(var(--foreground))",
        boxShadow: isActive
          ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
          : "none",
      }}
      transition={transitions.spring}
      className="absolute flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold"
      style={{
        top: `${level * 80 + 20}px`,
        left: `${left}%`,
        transform: `translateX(-50%)`,
      }}
    >
      {val}
    </motion.div>
  )
}

export function DataStructureVisualizer({
  topic,
}: DataStructureVisualizerProps) {
  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS)
  const timerRef = useRef<number | null>(null)

  const generateData = useCallback(() => {
    let newSteps: VisualizationStep[] = []
    switch (topic.visualizerType) {
      case VisualizerType.STACK:
        newSteps = generateStackSteps()
        break
      case VisualizerType.QUEUE:
        newSteps = generateQueueSteps()
        break
      case VisualizerType.LINKED_LIST:
        newSteps = generateLinkedListSteps()
        break
      case VisualizerType.BINARY_TREE:
      case VisualizerType.AVL_TREE:
        // TODO: Implement tree visualizations
        newSteps = [
          {
            array: [],
            activeIndices: [],
            sortedIndices: [],
            description: "Tree visualization coming soon.",
            auxiliary: { tree: [] },
          },
        ]
        break
      default:
        newSteps = [
          {
            array: [],
            activeIndices: [],
            sortedIndices: [],
            description: "Visualization not implemented.",
          },
        ]
    }
    setSteps(newSteps)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [topic.visualizerType])

  useEffect(() => {
    // eslint-disable-next-line
    generateData()
  }, [generateData, topic.visualizerType])

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
    generateData()
  }

  const currentData =
    steps[currentStep] ||
    ({
      array: [],
      activeIndices: [],
      sortedIndices: [],
      description: "Ready.",
      auxiliary: {},
    } as VisualizationStep)

  const controls = (
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
      disabled={steps.length === 0}
      showSpeedControl={true}
    />
  )

  const description = (
    <p className="text-foreground text-sm font-medium">
      {currentData.description}
    </p>
  )

  const renderVisualization = () => {
    switch (topic.visualizerType) {
      case VisualizerType.STACK:
        return (
          <div className="w-full">
            <div className="border-border bg-muted/30 relative flex min-h-[180px] flex-col items-center gap-2 rounded-lg border-2 p-4">
              <div className="text-muted-foreground absolute top-1/2 -left-20 -translate-y-1/2 font-mono text-xs font-bold uppercase">
                TOP
              </div>
              {currentData.array.length === 0 ? (
                <div className="text-muted-foreground text-sm italic">
                  Stack is empty
                </div>
              ) : (
                currentData.array.map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...transitions.spring, delay: idx * 0.1 }}
                    layout
                    className="border-primary bg-primary/10 flex h-12 w-16 items-center justify-center rounded-lg border-2 text-base font-bold shadow-sm"
                  >
                    {val}
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )
      case VisualizerType.QUEUE:
        return (
          <div className="w-full">
            <div className="border-border bg-muted/30 relative flex min-h-[100px] items-center gap-2 rounded-lg border-2 p-4">
              <div className="text-muted-foreground absolute top-1/2 -left-20 -translate-y-1/2 font-mono text-xs font-bold uppercase">
                FRONT
              </div>
              {currentData.array.length === 0 ? (
                <div className="text-muted-foreground flex-1 text-center text-sm italic">
                  Queue is empty
                </div>
              ) : (
                currentData.array.map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...transitions.spring, delay: idx * 0.1 }}
                    layout
                    className="flex h-12 w-16 items-center justify-center rounded-lg border-2 border-emerald-500 bg-emerald-500/10 text-base font-bold shadow-sm"
                  >
                    {val}
                  </motion.div>
                ))
              )}
              <div className="text-muted-foreground absolute top-1/2 -right-20 -translate-y-1/2 font-mono text-xs font-bold uppercase">
                BACK
              </div>
            </div>
          </div>
        )
      case VisualizerType.LINKED_LIST:
        return (
          <div className="w-full overflow-x-auto">
            <motion.div className="flex min-w-fit items-center justify-start gap-0 px-2">
              {currentData.array.map((val, idx) => {
                const isActive = currentData.activeIndices.includes(idx)
                return (
                  <motion.div
                    key={idx}
                    variants={staggerItem}
                    className="flex items-center"
                  >
                    {/* Node */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.05 : 1,
                          borderColor: isActive
                            ? "hsl(var(--foreground))"
                            : "hsl(var(--border))",
                          backgroundColor: isActive
                            ? "hsl(var(--muted) / 0.8)"
                            : "hsl(var(--card))",
                          boxShadow: isActive
                            ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                            : "none",
                        }}
                        transition={transitions.spring}
                        className="flex h-14 w-14 items-center justify-center rounded-xl border-2 text-lg font-bold"
                      >
                        {val}
                      </motion.div>
                      <div className="text-muted-foreground mt-2 font-mono text-xs font-semibold">
                        Node {idx}
                      </div>
                    </div>
                    {idx < currentData.array.length - 1 && (
                      <div className="mx-2 flex items-center">
                        <svg
                          width="32"
                          height="2"
                          viewBox="0 0 32 2"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-foreground"
                        >
                          <line
                            x1="0"
                            y1="1"
                            x2="28"
                            y2="1"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path d="M28 1L24 0L24 2L28 1Z" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                )
              })}
              {/* NULL pointer */}
              <div className="ml-2 flex items-center">
                <svg
                  width="32"
                  height="2"
                  viewBox="0 0 32 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-border mr-2"
                >
                  <line
                    x1="0"
                    y1="1"
                    x2="24"
                    y2="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M24 1L20 0L20 2L24 1Z" fill="currentColor" />
                </svg>
                <div className="bg-muted border-border rounded-lg border px-4 py-2">
                  <span className="text-muted-foreground font-mono text-sm font-semibold">
                    NULL
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )
      case VisualizerType.BINARY_TREE:
      case VisualizerType.AVL_TREE:
        const tree =
          (currentData.auxiliary as { tree?: (number | null)[] })?.tree || []
        return (
          <motion.div className="relative h-full min-h-[300px] w-full">
            {tree.map((val, idx) => (
              <motion.div key={idx} variants={staggerItem}>
                <TreeNode
                  val={val}
                  idx={idx}
                  isActive={currentData.activeIndices.includes(idx)}
                  totalLevels={4}
                />
              </motion.div>
            ))}
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <VisualizerLayout
      title="DS Visualizer"
      icon={<Squares2X2Icon className="text-primary h-5 w-5" />}
      controls={controls}
      description={description}
    >
      <Card className="flex-1">
        <CardContent className="flex items-center justify-center p-4">
          {renderVisualization()}
        </CardContent>
      </Card>
    </VisualizerLayout>
  )
}
