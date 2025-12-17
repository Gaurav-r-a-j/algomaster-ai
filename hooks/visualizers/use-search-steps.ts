"use client"

import { useCallback } from "react"
import {
  generateBinarySearchSteps,
  generateLinearSearchSteps,
} from "@/utils/algorithms/algorithm-logic"
import type { VisualizationStep } from "@/types/curriculum"

export function useSearchSteps(topicId: string) {
  const generateSteps = useCallback(
    (array: number[], target: number): VisualizationStep[] => {
      if (topicId === "binary-search") {
        return generateBinarySearchSteps(array, target)
      } else if (topicId === "linear-search") {
        return generateLinearSearchSteps(array, target)
      } else {
        return [
          {
            array: array,
            activeIndices: [],
            sortedIndices: [],
            description: "Visualization not implemented.",
          },
        ]
      }
    },
    [topicId]
  )

  return { generateSteps }
}

