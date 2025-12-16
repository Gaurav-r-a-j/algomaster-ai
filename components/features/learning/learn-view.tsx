"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import { getTopicsByModule, TOPICS } from "@/data/curriculum"
import { getDefaultQuiz } from "@/data/default-quiz"
import { generateTopicSlug } from "@/utils/common/slug"
import { motion } from "motion/react"

import type { Topic } from "@/types/curriculum"
import { VisualizerType } from "@/types/curriculum"
import { fadeIn, slideUpWithDelay, transitions } from "@/lib/animations"
import {
  BookOpenIcon,
  CheckmarkCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  LayersIcon,
  PlayIcon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import { useTopicContent } from "@/hooks/use-curriculum"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CodePreview } from "@/components/common/code-preview"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { MarkdownRenderer } from "@/components/common/markdown-renderer"
import { QuizSection } from "@/components/features/learning/quiz-section"

interface LearnViewProps {
  topic: Topic
}

export function LearnView({ topic }: LearnViewProps) {
  const { data: topicContent, isLoading: loading } = useTopicContent(topic)
  const content = topicContent?.markdown || topic.content
  const codeExamples = topicContent?.codeExamples || []

  const [useAIQuestions, setUseAIQuestions] = useState(false)
  const { completedTopics: _completedTopics, isCompleted } = useProgress()

  // Get related topics and navigation
  const { prevTopic, nextTopic, moduleTopics, moduleProgress, completedCount } =
    useMemo(() => {
      const topicIndex = TOPICS.findIndex((t) => t.id === topic.id)
      const prevTopic = topicIndex > 0 ? TOPICS[topicIndex - 1] : null
      const nextTopic =
        topicIndex < TOPICS.length - 1 ? TOPICS[topicIndex + 1] : null

      const moduleTopics = getTopicsByModule(topic.module).sort(
        (a, b) => a.order - b.order
      )
      const completedCount = moduleTopics.filter((t) =>
        isCompleted(t.id)
      ).length
      const moduleProgress =
        moduleTopics.length > 0
          ? Math.round((completedCount / moduleTopics.length) * 100)
          : 0

      return { prevTopic, nextTopic, moduleTopics, moduleProgress, completedCount }
    }, [topic, isCompleted])

  // Default to common questions, AI questions are optional (if available in future)
  const commonQuestions = topic.quiz || getDefaultQuiz(topic)
  const quizQuestions = commonQuestions // AI questions can be added later via topic.aiQuiz

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-12"
      >
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="border-primary h-8 w-8 rounded-full border-4 border-t-transparent"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm"
          >
            Loading content...
          </motion.p>
        </div>
      </motion.div>
    )
  }

  // Ensure we have content - use topic.content as fallback
  const displayContent =
    content && content.trim() && !content.toLowerCase().includes("coming soon")
      ? content
      : topic.content

  const isTopicCompleted = isCompleted(topic.id)

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8 xl:grid-cols-[1fr_360px]"
    >
      {/* Main Content - Full Width */}
      <div className="min-w-0 space-y-6 lg:space-y-8">
        {/* Markdown Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpWithDelay(0.1)}
        >
          <div className="border-border/50 border-b px-4 py-6 md:px-6 md:py-8 lg:px-8">
            {displayContent && displayContent.trim() ? (
              <MarkdownRenderer
                content={displayContent}
                className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted max-w-none"
              />
            ) : (
              <div className="text-muted-foreground py-12 text-center">
                <p>Content is being prepared. Please check back soon.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Code Examples Section */}
        {codeExamples.length > 0 && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={slideUpWithDelay(0.2)}
          >
            <div className="border-border/50 border-b px-4 py-6 md:px-6 md:py-8 lg:px-8">
              <div className="border-border/50 mb-6 border-b pb-4">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <div className="bg-primary/10 rounded-md p-1.5">
                    <IconWrapper
                      icon={PlayIcon}
                      size={16}
                      className="text-primary"
                    />
                  </div>
                  Code Examples
                </h3>
              </div>
              <div className="space-y-6">
                {codeExamples.map((example, idx) => (
                  <motion.div
                    key={example.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className={cn(
                      "space-y-3",
                      idx > 0 && "border-border/50 border-t pt-6"
                    )}
                  >
                    <h4 className="text-foreground flex items-center gap-2 text-base font-semibold">
                      <motion.span
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="bg-primary/10 text-primary flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
                      >
                        {idx + 1}
                      </motion.span>
                      {example.title}
                    </h4>
                    <CodePreview
                      code={example.code}
                      language={example.language}
                      preview={null}
                    />
                    {example.explanation && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {example.explanation}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Quiz Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpWithDelay(0.3)}
        >
          <div className="px-4 py-6 md:px-6 md:py-8 lg:px-8">
            <QuizSection
              topicId={topic.id}
              questions={quizQuestions}
              useAIQuestions={useAIQuestions}
              onToggleAIQuestions={setUseAIQuestions}
              hasAIQuestions={false}
            />
          </div>
        </motion.div>
      </div>

      {/* Right Sidebar - Compact Design */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...transitions.smooth, delay: 0.2 }}
        className="z-10 space-y-3 py-4 pr-4 md:pr-6 lg:sticky lg:top-[76px] lg:self-start lg:pr-8"
      >
        <Card className="border-border/50 overflow-hidden shadow-sm">
          {/* Compact Module Header */}
          <CardHeader className="bg-muted/30 p-3">
            <div className="flex items-center gap-3">
              {/* Small Progress Ring */}
              <div className="relative h-10 w-10 shrink-0">
                <svg className="h-10 w-10 -rotate-90 transform">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="3"
                    fill="transparent"
                    r="16"
                    cx="20"
                    cy="20"
                  />
                  <circle
                    className="text-primary stroke-current transition-all duration-500"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="transparent"
                    r="16"
                    cx="20"
                    cy="20"
                    strokeDasharray={`${2 * Math.PI * 16}`}
                    strokeDashoffset={`${2 * Math.PI * 16 * (1 - moduleProgress / 100)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-foreground text-[10px] font-bold">
                    {moduleProgress}%
                  </span>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-muted-foreground text-xs">
                  {completedCount}/{moduleTopics.length} topics
                </p>
              </div>
            </div>
          </CardHeader>

          {/* Topic List - Compact */}
          <CardContent className="p-0">
            <ScrollArea className="h-[200px]">
              <div className="p-1.5">
                {moduleTopics.map((t) => {
                  const isCompletedTopic = isCompleted(t.id)
                  const isCurrent = t.id === topic.id

                  return (
                    <Link
                      key={t.id}
                      href={ROUTES.TOPIC(generateTopicSlug(t.title))}
                      className={cn(
                        "group flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors",
                        isCurrent
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {/* Compact Status Dot */}
                      <span className={cn(
                        "h-1.5 w-1.5 shrink-0 rounded-full",
                        isCompletedTopic ? "bg-emerald-500" :
                        isCurrent ? "bg-primary animate-pulse" : "bg-border"
                      )} />
                      <span className="truncate">{t.title}</span>
                    </Link>
                  )
                })}
              </div>
            </ScrollArea>

            {/* Compact Footer */}
            <div className="border-t border-border/50 p-2 space-y-2">
              {/* Nav Buttons */}
              <div className="grid grid-cols-2 gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!prevTopic}
                  className="h-7 text-[11px]"
                  asChild={!!prevTopic}
                >
                  {prevTopic ? (
                    <Link href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}>
                      <IconWrapper icon={ChevronLeftIcon} size={12} className="mr-1" />
                      Prev
                    </Link>
                  ) : (
                    <span>
                      <IconWrapper icon={ChevronLeftIcon} size={12} className="mr-1" />
                      Prev
                    </span>
                  )}
                </Button>
                <Button
                  variant={nextTopic ? "default" : "outline"}
                  size="sm"
                  disabled={!nextTopic}
                  className="h-7 text-[11px]"
                  asChild={!!nextTopic}
                >
                  {nextTopic ? (
                    <Link href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}>
                      Next
                      <IconWrapper icon={ChevronRightIcon} size={12} className="ml-1" />
                    </Link>
                  ) : (
                    <span>
                      Next
                      <IconWrapper icon={ChevronRightIcon} size={12} className="ml-1" />
                    </span>
                  )}
                </Button>
              </div>

              {/* Complexity - Inline */}
              <div className="flex items-center justify-between text-[10px] text-muted-foreground bg-muted/30 rounded px-2 py-1.5">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <IconWrapper icon={ClockIcon} size={12} className="opacity-70" />
                    <code className="font-mono text-foreground">{topic.complexity.time}</code>
                  </span>
                  <span className="flex items-center gap-1">
                    <IconWrapper icon={LayersIcon} size={12} className="opacity-70" />
                    <code className="font-mono text-foreground">{topic.complexity.space}</code>
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
