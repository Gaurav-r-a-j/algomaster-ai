"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useProgress } from "@/context/progress-context"
import type { Topic } from "@/types/curriculum"
import { fadeIn, slideUpWithDelay, transitions } from "@/lib/animations"
import { getDefaultQuiz } from "@/data/default-quiz"
import { CheckmarkCircleIcon, ClockIcon, CpuChipIcon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { QuizSection } from "@/components/features/learning/quiz"

interface TestViewProps {
  topic: Topic
}

export function TestView({ topic }: TestViewProps) {
  const [useAIQuestions, setUseAIQuestions] = useState(false)
  const { isCompleted } = useProgress()
  
  // Get quiz questions for this topic
  const quizQuestions = topic.quiz || getDefaultQuiz(topic)
  const isTopicCompleted = isCompleted(topic.id)

  return (
    <div className="flex h-full w-full">
      {/* Main Content - Quiz */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={transitions.smooth}
          className="w-full max-w-4xl mx-auto"
        >
          <div className="min-w-0 space-y-8 lg:space-y-10">
            {/* Header Section */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={slideUpWithDelay(0.05)}
              className="px-4 pt-6 md:px-6 md:pt-8 lg:px-8 lg:pt-10"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-lg p-2.5">
                    <IconWrapper
                      icon={CheckmarkCircleIcon}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      Knowledge Check
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Test your understanding of {topic.title}
                    </p>
                  </div>
                </div>
                {isTopicCompleted && (
                  <Badge
                    variant="secondary"
                    className="border-none bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  >
                    Completed
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Quiz Section */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={slideUpWithDelay(0.1)}
            >
              <div className="px-4 pb-8 md:px-6 md:pb-10 lg:px-8 lg:pb-12">
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
        </motion.div>
      </div>

      {/* Right Sidebar - Topic Info */}
      <aside className="sticky top-16 h-[calc(100vh-4rem)] w-72 shrink-0 overflow-hidden border-l border-border/50 bg-gradient-to-b from-background to-muted/20 backdrop-blur-sm">
        <div className="h-full overflow-y-auto px-6 py-10 space-y-6 custom-scrollbar">
          {/* Topic Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-8 bg-primary rounded-full" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                Topic Info
              </h3>
            </div>

            <Card className="border-border/60 bg-gradient-to-br from-background to-muted/30 shadow-sm">
              <CardContent className="p-4 space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Difficulty
                  </p>
                  <Badge
                    variant={topic.difficulty === "Easy" ? "default" : topic.difficulty === "Hard" ? "destructive" : "secondary"}
                    className="w-full justify-center py-2 text-sm font-bold"
                  >
                    {topic.difficulty || "Medium"}
                  </Badge>
                </div>

                {(topic.complexity?.time && topic.complexity.time !== "N/A") || 
                 (topic.complexity?.space && topic.complexity.space !== "N/A") ? (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                      Complexity
                    </p>
                    <div className="space-y-2.5">
                      {topic.complexity?.time && topic.complexity.time !== "N/A" && (
                        <div className="flex items-center gap-2.5 rounded-lg bg-primary/5 p-2.5 border border-primary/10">
                          <ClockIcon className="h-4 w-4 text-primary shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-muted-foreground">Time</p>
                            <p className="text-sm font-mono font-bold text-foreground">
                              {topic.complexity.time}
                            </p>
                          </div>
                        </div>
                      )}
                      {topic.complexity?.space && topic.complexity.space !== "N/A" && (
                        <div className="flex items-center gap-2.5 rounded-lg bg-primary/5 p-2.5 border border-primary/10">
                          <CpuChipIcon className="h-4 w-4 text-primary shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-muted-foreground">Space</p>
                            <p className="text-sm font-mono font-bold text-foreground">
                              {topic.complexity.space}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>

          {/* Quiz Stats */}
          <Separator className="my-6" />
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-1 w-8 bg-primary rounded-full" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                Quiz Info
              </h3>
            </div>
            <Card className="border-border/60 bg-gradient-to-br from-background to-muted/30 shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Total Questions</span>
                    <span className="text-sm font-bold text-foreground">{quizQuestions.length}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Status</span>
                    <Badge
                      variant={isTopicCompleted ? "secondary" : "outline"}
                      className={isTopicCompleted ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" : ""}
                    >
                      {isTopicCompleted ? "Completed" : "Not Started"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </aside>
    </div>
  )
}

