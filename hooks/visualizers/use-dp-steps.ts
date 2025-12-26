"use client"

import { useCallback } from "react"
import {
  generateDPSteps,
  generateKnapsackSteps,
  generateLCSSteps,
} from "@/utils/algorithms/algorithm-logic"
import type { VisualizationStep } from "@/types/curriculum"

export function useDPSteps(topicId: string) {
  const generateSteps = useCallback((): VisualizationStep[] => {
    if (topicId === "knapsack") {
      return generateKnapsackSteps()
    } else if (topicId === "lcs") {
      return generateLCSSteps()
    } else {
      return generateDPSteps()
    }
  }, [topicId])

  return { generateSteps }
}

