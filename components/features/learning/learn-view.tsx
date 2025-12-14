"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import { TOPICS, getTopicsByModule } from "@/data/curriculum"
import { getTopicContent } from "@/services/content/content-service"
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

// Common/default quiz questions (not AI-generated)
const getDefaultQuiz = (topic: Topic) => [
  {
    id: 1,
    question: `What is the primary characteristic of ${topic.title}?`,
    options: [
      "It runs in O(1) time",
      "It uses fundamental DSA principles",
      "It is only for strings",
      "It requires supercomputers",
    ],
    correctAnswer: 1,
    explanation:
      "Most algorithms build upon fundamental data structure principles.",
  },
  {
    id: 2,
    question: "Which complexity represents this algorithm in the average case?",
    options: ["O(n!)", "O(2^n)", topic.complexity.time, "O(1)"],
    correctAnswer: 2,
    explanation: `The average time complexity is ${topic.complexity.time}.`,
  },
]

export function LearnView({ topic }: LearnViewProps) {
  const [content, setContent] = useState<string>(topic.content)
  const [codeExamples, setCodeExamples] = useState<CodeExample[]>([])
  const [loading, setLoading] = useState(true)
  const [useAIQuestions, setUseAIQuestions] = useState(false)
  const { completedTopics: _completedTopics, isCompleted } = useProgress()

  useEffect(() => {
    async function loadContent() {
      try {
        const topicContent = await getTopicContent(topic)
        setContent(topicContent.markdown)
        setCodeExamples(topicContent.codeExamples)
      } catch {
        // Fallback to topic.content
        setContent(topic.content)
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, [topic])

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
          <div className="border-border/50 border-b pb-8">
            <div className="px-1">
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
          </div>
        </motion.div>

        {/* Code Examples Section */}
        {codeExamples.length > 0 && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={slideUpWithDelay(0.2)}
          >
              <div className="border-border/50 border-b pb-8">
                <div className="mb-6 border-b border-border/50 pb-4">
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
          <QuizSection
            topicId={topic.id}
            questions={quizQuestions}
            useAIQuestions={useAIQuestions}
            onToggleAIQuestions={setUseAIQuestions}
            hasAIQuestions={false}
          />
        </motion.div>
      </div>

      {/* Right Sidebar - Enhanced with More Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...transitions.smooth, delay: 0.2 }}
        className="z-10 space-y-4 lg:sticky lg:top-[76px] lg:space-y-5 lg:self-start"
      >
        {/* Quick Navigation */}
        {(prevTopic || nextTopic) && (
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Card className="border-border/50 shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="border-border/50 border-b pb-3">
                <CardTitle className="text-muted-foreground flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                  <div className="bg-muted rounded p-1">
                    <IconWrapper icon={ChevronRightIcon} size={10} />
                  </div>
                  Quick Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-3">
                {prevTopic && (
                  <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group hover:bg-primary/5 hover:border-primary/20 w-full justify-start transition-all"
                      asChild
                    >
                      <Link
                        href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}
                      >
                        <IconWrapper
                          icon={ChevronLeftIcon}
                          size={14}
                          className="group-hover:text-primary mr-2 transition-colors"
                        />
                        <span className="group-hover:text-primary truncate text-xs transition-colors">
                          {prevTopic.title}
                        </span>
                      </Link>
                    </Button>
                  </motion.div>
                )}
                {nextTopic && (
                  <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group hover:bg-primary/5 hover:border-primary/20 w-full justify-start transition-all"
                      asChild
                    >
                      <Link
                        href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}
                      >
                        <span className="group-hover:text-primary truncate text-xs transition-colors">
                          {nextTopic.title}
                        </span>
                        <IconWrapper
                          icon={ChevronRightIcon}
                          size={14}
                          className="group-hover:text-primary ml-2 transition-colors"
                        />
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Module Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ y: -2 }}
        >
          <Card className="border-border/50 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="border-border/50 border-b pb-3">
              <CardTitle className="text-muted-foreground flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                <div className="bg-muted rounded p-1">
                  <IconWrapper icon={BookOpenIcon} size={10} />
                </div>
                Module Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-3">
              <div>
                <div className="mb-2.5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">
                    {moduleTopics.filter((t) => isCompleted(t.id)).length} /{" "}
                    {moduleTopics.length} completed
                  </span>
                  <span className="text-foreground font-bold">
                    {moduleProgress}%
                  </span>
                </div>
                <Progress value={moduleProgress} className="bg-muted h-2.5" />
              </div>
              <Separator className="my-3" />
              <div>
                <p className="text-muted-foreground mb-2 text-xs">
                  Topics in this module:
                </p>
                <div className="max-h-48 space-y-1 overflow-y-auto">
                  {moduleTopics.map((t, idx) => {
                    const isCompletedTopic = isCompleted(t.id)
                    const isCurrent = t.id === topic.id
                    return (
                      <motion.div
                        key={t.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                        whileHover={{ x: 4 }}
                      >
                        <Link
                          href={ROUTES.TOPIC(generateTopicSlug(t.title))}
                          className={cn(
                            "group flex items-center gap-2 rounded-md p-2 text-xs transition-all",
                            isCurrent
                              ? "bg-primary/10 text-primary border-primary/20 border font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-border border border-transparent"
                          )}
                        >
                          {isCompletedTopic ? (
                            <IconWrapper
                              icon={CheckmarkCircleIcon}
                              size={14}
                              className="shrink-0 text-emerald-500"
                            />
                          ) : (
                            <div className="border-muted-foreground/30 h-3.5 w-3.5 shrink-0 rounded-full border-2" />
                          )}
                          <span
                            className={cn(
                              "flex-1 truncate",
                              !isCompletedTopic &&
                                !isCurrent &&
                                "opacity-70 group-hover:opacity-100"
                            )}
                          >
                            {t.title}
                          </span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Complexity Analysis - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ y: -2 }}
        >
          <Card className="border-border/50 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="border-border/50 border-b pb-3">
              <CardTitle className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Complexity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">
                    Time
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-muted h-5 px-2 py-0.5 font-mono text-[10px] font-bold"
                  >
                    {topic.complexity.time}
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">
                    Space
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-muted h-5 px-2 py-0.5 font-mono text-[10px] font-bold"
                  >
                    {topic.complexity.space}
                  </Badge>
                </div>
              </div>
              <Separator className="my-3" />
              <div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge
                    variant="outline"
                    className="border-border/50 h-5 px-2 py-0.5 text-[10px] font-medium"
                  >
                    {topic.category.replace(/_/g, " ")}
                  </Badge>
                  {topic.visualizerType !== VisualizerType.NONE && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 flex h-5 items-center gap-1 px-2 py-0.5 text-[10px] font-medium"
                    >
                      <IconWrapper icon={PlayIcon} size={10} />
                      Interactive
                    </Badge>
                  )}
                  {isTopicCompleted && (
                    <Badge
                      variant="default"
                      className="flex h-5 items-center gap-1 border-0 bg-emerald-500 px-2 py-0.5 text-[10px] font-medium text-white hover:bg-emerald-600"
                    >
                      <IconWrapper icon={CheckmarkCircleIcon} size={10} />
                      Completed
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
