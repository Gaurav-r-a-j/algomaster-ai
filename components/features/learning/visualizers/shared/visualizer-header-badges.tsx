"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Topic } from "@/types/curriculum"

interface VisualizerHeaderBadgesProps {
  topic: Topic
}

export function VisualizerHeaderBadges({
  topic,
}: VisualizerHeaderBadgesProps) {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
      case "hard":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <>
      {topic.difficulty && (
        <Badge
          variant="outline"
          className={cn("font-semibold", getDifficultyColor(topic.difficulty))}
        >
          {topic.difficulty.toUpperCase()}
        </Badge>
      )}
      {topic.complexity.time !== "N/A" && (
        <Badge variant="outline" className="font-mono font-semibold">
          {topic.complexity.time}
        </Badge>
      )}
    </>
  )
}

