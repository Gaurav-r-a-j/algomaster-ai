"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { useProgress } from "@/context/progress-context";
import type { Topic } from "@/types/curriculum";
import {
  CheckmarkCircleIcon,
  ChevronRightIcon,
  PlayIcon,
  RefreshCwIcon,
} from "@/lib/icons";
import { ROUTES } from "@/constants/routes";

import { cn } from "@/lib/utils";
import { hoverScaleSmall, transitions } from "@/lib/animations";

interface TopicCardProps {
  topic: Topic;
}

const getDifficultyIcon = (difficulty?: "Easy" | "Medium" | "Hard") => {
  switch (difficulty) {
    case "Easy":
      return "🟢";
    case "Medium":
      return "🟡";
    case "Hard":
      return "🔴";
    default:
      return "⚪";
  }
};

import { generateTopicSlug } from "@/utils/common/slug";

export function TopicCard({ topic }: TopicCardProps) {
  const { isCompleted } = useProgress();
  const isDone = isCompleted(topic.id);
  const topicSlug = generateTopicSlug(topic.title);

  return (
    <Link href={ROUTES.TOPIC(topicSlug)}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={transitions.springGentle}
      >
        <Card
          className={cn(
            "h-full group overflow-hidden shadow-sm border-border/50 transition-shadow hover:shadow-lg",
            isDone
              ? "border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-400"
              : "hover:border-primary"
          )}
        >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors text-lg",
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
                className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none"
              >
                <IconWrapper
                  icon={CheckmarkCircleIcon}
                  size={10}
                  className="mr-1"
                />
                DONE
              </Badge>
            )}
          </div>

          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            <span className="text-muted-foreground mr-2 font-normal text-sm">
              #{topic.order + 1}
            </span>
            {topic.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {topic.description}
          </p>
        </CardContent>
        <CardFooter className="bg-muted/50 px-6 py-3 border-t border-border flex justify-between items-center text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors">
          <div className="flex items-center gap-2">
            {isDone ? (
              <IconWrapper icon={RefreshCwIcon} size={12} />
            ) : (
              <IconWrapper icon={PlayIcon} size={12} />
            )}
            <span className="uppercase tracking-wider">
              {isDone ? "Review" : "Start Lesson"}
            </span>
          </div>
          <IconWrapper
            icon={ChevronRightIcon}
            size={14}
            className="group-hover:translate-x-1 transition-transform"
          />
        </CardFooter>
      </Card>
      </motion.div>
    </Link>
  );
}

