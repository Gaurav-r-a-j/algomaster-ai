"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import { generateTopicSlug } from "@/utils/common/slug"
import { motion } from "motion/react"

import type { Topic } from "@/types/curriculum"
import { transitions } from "@/lib/animations"
import {
  CheckmarkCircleIcon,
  ChevronRightIcon,
  PlayIcon,
  RefreshCwIcon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { IconWrapper } from "@/components/common/icon-wrapper"

interface TopicCardProps {
  topic: Topic
}

const getDifficultyIcon = (difficulty?: "Easy" | "Medium" | "Hard") => {
  switch (difficulty) {
    case "Easy":
      return "🟢"
    case "Medium":
      return "🟡"
    case "Hard":
      return "🔴"
    default:
      return "⚪"
  }
}

export function TopicCard({ topic }: TopicCardProps) {
  const { isCompleted } = useProgress()
  const isDone = isCompleted(topic.id)
  const topicSlug = generateTopicSlug(topic.title)
  const categoryId = topic.categoryId || "dsa"

  return (
    <Link href={ROUTES.TOPIC(categoryId, topicSlug)}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={transitions.springGentle}
      >
        <Card
          className={cn(
            "group border-border/50 h-full overflow-hidden shadow-sm transition-shadow hover:shadow-lg",
            isDone
              ? "border-emerald-200 hover:border-emerald-400 dark:border-emerald-900/50"
              : "hover:border-primary"
          )}
        >
          <CardContent className="p-6">
            <div className="mb-5 flex items-start justify-between">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl text-lg transition-colors shrink-0",
                  isDone
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : "bg-primary/10 text-primary"
                )}
              >
                {getDifficultyIcon(topic.difficulty)}
              </div>
              {isDone && (
                <Badge
                  variant="secondary"
                  className="border-none bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 shrink-0"
                >
                  <IconWrapper
                    icon={CheckmarkCircleIcon}
                    size={12}
                    className="mr-1.5"
                  />
                  DONE
                </Badge>
              )}
            </div>

            <h3 className="text-foreground group-hover:text-primary mb-3 text-lg font-bold transition-colors leading-tight">
              <span className="text-muted-foreground mr-2 text-sm font-normal">
                #{topic.order + 1}
              </span>
              {topic.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
              {topic.description}
            </p>
          </CardContent>
          <CardFooter className="bg-muted/50 border-border text-muted-foreground group-hover:text-primary flex items-center justify-between border-t px-6 py-3.5 text-xs font-bold transition-colors">
            <div className="flex items-center gap-2">
              {isDone ? (
                <IconWrapper icon={RefreshCwIcon} size={12} />
              ) : (
                <IconWrapper icon={PlayIcon} size={12} />
              )}
              <span className="tracking-wider uppercase">
                {isDone ? "Review" : "Start Lesson"}
              </span>
            </div>
            <IconWrapper
              icon={ChevronRightIcon}
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}
