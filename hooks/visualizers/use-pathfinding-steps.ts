"use client"

import { useCallback } from "react"
import {
  generateBFSSteps,
  generateDFSSteps,
  generateDijkstraSteps,
} from "@/utils/algorithms/algorithm-logic"
import type { VisualizationStep } from "@/types/curriculum"

export function usePathfindingSteps(topicId: string) {
  const generateSteps = useCallback((): VisualizationStep[] => {
    if (topicId === "dfs") {
      return generateDFSSteps()
    } else if (topicId === "dijkstra") {
      return generateDijkstraSteps()
    } else {
      return generateBFSSteps()
    }
  }, [topicId])

  return { generateSteps }
}

