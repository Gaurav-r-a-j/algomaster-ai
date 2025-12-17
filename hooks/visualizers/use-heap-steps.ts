"use client"

import { useCallback } from "react"
import { generateHeapSteps } from "@/utils/algorithms/algorithm-logic"
import type { VisualizationStep } from "@/types/curriculum"

export function useHeapSteps() {
  const generateSteps = useCallback((): VisualizationStep[] => {
    return generateHeapSteps()
  }, [])

  return { generateSteps }
}

