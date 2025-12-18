"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { VisualizationStep } from "@/types/curriculum"

interface UseVisualizerStateOptions {
  defaultSpeed?: number
  autoPlay?: boolean
}

export function useVisualizerState(options: UseVisualizerStateOptions = {}) {
  const { defaultSpeed = 500, autoPlay = false } = options

  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(defaultSpeed)
  const timerRef = useRef<number | null>(null)

  // Auto-play effect
  useEffect(() => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Start new timer if playing and we have steps
    if (isPlaying && steps.length > 0 && currentStep < steps.length) {
      timerRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, playbackSpeed)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isPlaying, steps.length, playbackSpeed, currentStep])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const handlePreviousStep = useCallback(() => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const handleNextStep = useCallback(() => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))
  }, [steps.length])

  const handleStepChange = useCallback((step: number) => {
    setIsPlaying(false)
    setCurrentStep(step)
  }, [])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setIsPlaying(false)
  }, [])

  const currentData = steps[currentStep] || {
    array: [],
    activeIndices: [],
    sortedIndices: [],
    description: "Ready",
    auxiliary: {},
  }

  return {
    // State
    steps,
    currentStep,
    isPlaying,
    playbackSpeed,
    currentData,

    // Setters
    setSteps,
    setPlaybackSpeed,

    // Actions
    handlePlay,
    handlePause,
    handlePreviousStep,
    handleNextStep,
    handleStepChange,
    reset,
  }
}

