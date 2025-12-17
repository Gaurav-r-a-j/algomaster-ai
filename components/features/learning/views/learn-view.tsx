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
  CheckmarkCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  LayersIcon,
  PlayIcon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import { useTopicContent } from "@/hooks/curriculum"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { CodePreview } from "@/components/common/code/code-preview"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { MarkdownRenderer } from "@/components/common/markdown-renderer"
import { QuizSection } from "@/components/features/learning/quiz"

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
      className="w-full max-w-4xl mx-auto"
    >
      {/* Main Content - Full Width */}
      <div className="min-w-0 space-y-8 lg:space-y-10">
        {/* Markdown Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpWithDelay(0.1)}
        >
          <div className="px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
            {displayContent && displayContent.trim() ? (
              <MarkdownRenderer
                content={displayContent}
                className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted max-w-none"
              />
            ) : (
              <div className="text-muted-foreground py-16 text-center">
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
            <div className="px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12 border-t border-border/50">
              <div className="mb-8">
                <h3 className="flex items-center gap-3 text-xl font-bold text-foreground">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <IconWrapper
                      icon={PlayIcon}
                      size={18}
                      className="text-primary"
                    />
                  </div>
                  Code Examples
                </h3>
              </div>
              <div className="space-y-8">
                {codeExamples.map((example, idx) => (
                  <motion.div
                    key={example.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className={cn(
                      "space-y-4",
                      idx > 0 && "border-border/50 border-t pt-8"
                    )}
                  >
                    <h4 className="text-foreground flex items-center gap-3 text-lg font-semibold">
                      <motion.span
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shrink-0"
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
                      <p className="text-muted-foreground text-sm leading-relaxed pl-9">
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
          <div className="px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12 border-t border-border/50">
            <QuizSection
              topicId={topic.id}
              questions={quizQuestions}
              useAIQuestions={useAIQuestions}
              onToggleAIQuestions={setUseAIQuestions}
              hasAIQuestions={true}
              topicTitle={topic.title}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation - Moved from sidebar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transitions.smooth, delay: 0.3 }}
        className="mt-12 px-4 md:px-6 lg:px-8 flex items-center justify-between border-t border-border/50 pt-8"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <IconWrapper icon={ClockIcon} size={16} className="text-muted-foreground/70" />
            <span className="font-medium">Time:</span>
            <code className="font-mono text-foreground">{topic.complexity.time}</code>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <IconWrapper icon={LayersIcon} size={16} className="text-muted-foreground/70" />
            <span className="font-medium">Space:</span>
            <code className="font-mono text-foreground">{topic.complexity.space}</code>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={!prevTopic}
            className="h-9"
            asChild={!!prevTopic}
          >
            {prevTopic ? (
              <Link href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}>
                <IconWrapper icon={ChevronLeftIcon} size={14} className="mr-1" />
                Previous
              </Link>
            ) : (
              <span>
                <IconWrapper icon={ChevronLeftIcon} size={14} className="mr-1" />
                Previous
              </span>
            )}
          </Button>
          <Button
            variant={nextTopic ? "default" : "outline"}
            size="sm"
            disabled={!nextTopic}
            className="h-9"
            asChild={!!nextTopic}
          >
            {nextTopic ? (
              <Link href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}>
                Next
                <IconWrapper icon={ChevronRightIcon} size={14} className="ml-1" />
              </Link>
            ) : (
              <span>
                Next
                <IconWrapper icon={ChevronRightIcon} size={14} className="ml-1" />
              </span>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
