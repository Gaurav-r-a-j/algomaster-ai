"use client"

import { useCallback } from "react"
import {
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateSelectionSortSteps,
} from "@/utils/algorithms/algorithm-logic"
import type { VisualizationStep } from "@/types/curriculum"

export function useSortingSteps(topicId: string) {
  const generateSteps = useCallback(
    (array: number[]): VisualizationStep[] => {
      switch (topicId) {
        case "bubble-sort":
          return generateBubbleSortSteps(array)
        case "selection-sort":
          return generateSelectionSortSteps(array)
        case "insertion-sort":
          return generateInsertionSortSteps(array)
        case "merge-sort":
          return generateMergeSortSteps(array)
        case "quick-sort":
          return generateQuickSortSteps(array)
        default:
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

