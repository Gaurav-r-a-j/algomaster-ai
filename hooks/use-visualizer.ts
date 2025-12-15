import { useCallback, useEffect, useRef, useState } from "react"
import { VisualizationStep, VisualizerType } from "@/types/curriculum"
import {
  generateAVLTreeSteps,
  generateBinaryTreeSteps,
  generateGraphSteps,
  generateHashTableSteps,
  generateLinkedListSteps,
  generateQueueSteps,
  generateStackSteps,
  generateTrieSteps,
} from "@/utils/algorithm-logic"

const DEFAULT_SPEED_MS = 1000

export function useVisualizer(topicId: string, visualizerType: VisualizerType) {
  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS)
  const timerRef = useRef<number | null>(null)

  const generateData = useCallback(() => {
    let newSteps: VisualizationStep[] = []
    switch (visualizerType) {
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
        newSteps = generateBinaryTreeSteps()
        break
      case VisualizerType.AVL_TREE:
        newSteps = generateAVLTreeSteps()
        break
      case VisualizerType.HASH_TABLE:
        newSteps = generateHashTableSteps()
        break
      case VisualizerType.TRIE:
        newSteps = generateTrieSteps()
        break
      case VisualizerType.GRAPH:
        newSteps = generateGraphSteps(topicId)
        break
      default:
        newSteps = []
    }
    setSteps(newSteps)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [topicId, visualizerType])

  useEffect(() => {
    generateData()
  }, [generateData])

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
    generateData()
  }

  const currentData = steps[currentStep] || {
    array: [],
    activeIndices: [],
    sortedIndices: [],
    description: "Ready.",
    auxiliary: {},
  }

  return {
    // State
    steps,
    currentStep,
    isPlaying,
    playbackSpeed,
    currentData,
    
    // Actions
    setPlaybackSpeed,
    handlePlay,
    handlePause,
    handleReset,
    handlePreviousStep,
    handleNextStep,
    handleStepChange,
  }
}
