"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import { getTopicsByModule, TOPICS } from "@/data/curriculum"
import { getDefaultQuiz } from "@/data/default-quiz"
import type { CodeExample } from "@/services/content/content-service"
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
  PlayIcon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import { useTopicContent } from "@/hooks/use-curriculum"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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

  // useEffect removed as fetch logic is handled by useTopicContent

  // Get related topics and navigation
  const { prevTopic, nextTopic, moduleTopics, moduleProgress } = useMemo(() => {
    const topicIndex = TOPICS.findIndex((t) => t.id === topic.id)
    const prevTopic = topicIndex > 0 ? TOPICS[topicIndex - 1] : null
    const nextTopic =
      topicIndex < TOPICS.length - 1 ? TOPICS[topicIndex + 1] : null

    const moduleTopics = getTopicsByModule(topic.module).sort(
      (a, b) => a.order - b.order
    )
    const completedInModule = moduleTopics.filter((t) =>
      isCompleted(t.id)
    ).length
    const moduleProgress =
      moduleTopics.length > 0
        ? Math.round((completedInModule / moduleTopics.length) * 100)
        : 0

    return { prevTopic, nextTopic, moduleTopics, moduleProgress }
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

      {/* Right Sidebar - Unified & Concise */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...transitions.smooth, delay: 0.2 }}
        className="z-10 space-y-4 py-4 pr-4 md:pr-6 lg:sticky lg:top-[76px] lg:self-start lg:pr-8"
      >
        <Card className="border-border/50 overflow-hidden shadow-none">
          {/* Module Header & Progress */}
          <CardHeader className="border-border/50 bg-muted/10 border-b px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <CardTitle className="text-muted-foreground flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                <BookOpenIcon className="h-3.5 w-3.5" />
                Module Content
              </CardTitle>
              <span className="text-muted-foreground font-mono text-xs font-medium">
                {moduleProgress}%
              </span>
            </div>
            <Progress value={moduleProgress} className="h-1.5" />
          </CardHeader>

          {/* Scrollable Topic List */}
          <CardContent className="p-0">
            <div className="max-h-[300px] space-y-0.5 overflow-y-auto p-2">
              {moduleTopics.map((t) => {
                const isCompletedTopic = isCompleted(t.id)
                const isCurrent = t.id === topic.id
                return (
                  <Link
                    key={t.id}
                    href={ROUTES.TOPIC(generateTopicSlug(t.title))}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-xs transition-colors",
                      isCurrent
                        ? "bg-primary/5 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      isCompletedTopic &&
                        !isCurrent &&
                        "text-muted-foreground/70"
                    )}
                  >
                    <div className="shrink-0">
                      {isCompletedTopic ? (
                        <IconWrapper
                          icon={CheckmarkCircleIcon}
                          className="h-4 w-4 text-emerald-500"
                        />
                      ) : isCurrent ? (
                        <div className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
                      ) : (
                        <div className="bg-border h-1.5 w-1.5 rounded-full" />
                      )}
                    </div>
                    <span className="flex-1 truncate">{t.title}</span>
                  </Link>
                )
              })}
            </div>

            {/* Actions & Navigation Footer */}
            <div className="border-border/50 bg-muted/5 space-y-3 border-t p-3">
              {/* Navigation Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!prevTopic}
                  className="h-8 w-full text-xs"
                  asChild={!!prevTopic}
                >
                  {prevTopic ? (
                    <Link
                      href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}
                    >
                      <ChevronLeftIcon className="mr-1 h-3 w-3" /> Prev
                    </Link>
                  ) : (
                    <span>
                      <ChevronLeftIcon className="mr-1 h-3 w-3" /> Prev
                    </span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!nextTopic}
                  className="h-8 w-full text-xs"
                  asChild={!!nextTopic}
                >
                  {nextTopic ? (
                    <Link
                      href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}
                    >
                      Next <ChevronRightIcon className="ml-1 h-3 w-3" />
                    </Link>
                  ) : (
                    <span>
                      Next <ChevronRightIcon className="ml-1 h-3 w-3" />
                    </span>
                  )}
                </Button>
              </div>

              <Separator className="bg-border/40" />

              {/* Metadata / Complexity */}
              <div className="text-muted-foreground flex items-center justify-between font-mono text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold tracking-wider uppercase">
                    Time:
                  </span>
                  <Badge variant="secondary" className="h-4 px-1 text-[9px]">
                    {topic.complexity.time}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold tracking-wider uppercase">
                    Space:
                  </span>
                  <Badge variant="secondary" className="h-4 px-1 text-[9px]">
                    {topic.complexity.space}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
