import { useMemo } from "react"
import { useProgress } from "@/context/progress-context"
import { TOPICS } from "@/data/curriculum"

export function useProgressStats() {
  const { completedTopics, getProgressPercentage } = useProgress()

  const stats = useMemo(() => {
    const total = TOPICS.length
    const completed = completedTopics.length
    const inProgress = 0 // Can be enhanced later
    const notStarted = total - completed - inProgress
    const percentage = getProgressPercentage(total)

    // Group by difficulty
    const byDifficulty = TOPICS.reduce(
      (acc, topic) => {
        const difficulty = topic.difficulty || "Unknown"
        if (!acc[difficulty]) {
          acc[difficulty] = { total: 0, completed: 0 }
        }
        acc[difficulty].total++
        if (completedTopics.includes(topic.id)) {
          acc[difficulty].completed++
        }
        return acc
      },
      {} as Record<string, { total: number; completed: number }>
    )

    // Group by module
    const byModule = TOPICS.reduce(
      (acc, topic) => {
        const moduleName = topic.module
        if (!acc[moduleName]) {
          acc[moduleName] = { total: 0, completed: 0 }
        }
        acc[moduleName].total++
        if (completedTopics.includes(topic.id)) {
          acc[moduleName].completed++
        }
        return acc
      },
      {} as Record<string, { total: number; completed: number }>
    )

    return {
      total,
      completed,
      inProgress,
      notStarted,
      percentage,
      byDifficulty,
      byModule,
    }
  }, [completedTopics, getProgressPercentage])

  return stats
}
