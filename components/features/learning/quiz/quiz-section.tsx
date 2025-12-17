"use client"

import { useState, useMemo, useCallback } from "react"
import { useProgress } from "@/context/progress-context"
import { motion } from "motion/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

import type { QuizQuestion } from "@/types/curriculum"
import {
  fadeIn,
  hoverScaleSmall,
  slideUp,
  tapScale,
  transitions,
} from "@/lib/animations"
import { CheckmarkCircleIcon, SparklesIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { Progress } from "@/components/ui/progress"

import { QuizQuestionCard, QuizResults, QuizAISheet } from "./components"
import { useQuizState } from "./hooks"

interface QuizSectionProps {
  topicId: string
  questions: QuizQuestion[]
  useAIQuestions?: boolean
  onToggleAIQuestions?: (useAI: boolean) => void
  hasAIQuestions?: boolean
  topicTitle?: string
}

export function QuizSection({
  topicId,
  questions,
  useAIQuestions = false,
  onToggleAIQuestions,
  hasAIQuestions = false,
  topicTitle,
}: QuizSectionProps) {
  const { markAsCompleted, isCompleted } = useProgress()
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiQuestions, setAiQuestions] = useState<QuizQuestion[]>([])
  const [showAISheet, setShowAISheet] = useState(false)

  const displayQuestions = useMemo(() => {
    if (useAIQuestions && aiQuestions.length > 0) {
      return aiQuestions
    }
    return questions
  }, [useAIQuestions, aiQuestions, questions])

  const {
    selectedAnswers,
    showResults,
    currentStep,
    currentQuestion,
    progress,
    isLastQuestion,
    isFirstQuestion,
    score,
    handleSelect,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleRetake,
  } = useQuizState({
    questions: displayQuestions,
  })

  const generateAIQuestions = useCallback(async () => {
    if (!topicTitle) return
    setIsGeneratingAI(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      const generated: QuizQuestion[] = [
        {
          id: questions.length + 1,
          question: `What is a key concept related to ${topicTitle}?`,
          options: [
            "Basic understanding",
            "Core principle",
            "Advanced technique",
            "All of the above",
          ],
          correctAnswer: 3,
          explanation: `All options represent important aspects of ${topicTitle}.`,
        },
        {
          id: questions.length + 2,
          question: `When would you apply ${topicTitle} in practice?`,
          options: [
            "Never",
            "In specific problem scenarios",
            "Always",
            "Only for beginners",
          ],
          correctAnswer: 1,
          explanation: `${topicTitle} should be applied when it matches the problem requirements.`,
        },
      ]
      setAiQuestions(generated)
      setShowAISheet(false)
      if (onToggleAIQuestions) {
        onToggleAIQuestions(true)
      }
    } catch (error) {
      console.error("Failed to generate AI questions:", error)
    } finally {
      setIsGeneratingAI(false)
    }
  }, [topicTitle, questions.length, onToggleAIQuestions])

  const handleSubmitQuiz = useCallback(() => {
    handleSubmit()
    markAsCompleted(topicId)
  }, [handleSubmit, markAsCompleted, topicId])

  const isAlreadyCompleted = isCompleted(topicId)
  const currentAnswer = currentQuestion
    ? selectedAnswers[currentQuestion.id]
    : undefined
  const hasAnsweredCurrent = currentAnswer !== undefined

  if (!currentQuestion) {
    return null
  }

  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        transition={transitions.smooth}
      >
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="border-border/50 border-b">
            <motion.div
              variants={slideUp}
              className="flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <CardTitle className="flex items-center gap-2 text-xl font-bold">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <IconWrapper
                      icon={CheckmarkCircleIcon}
                      size={20}
                      className="text-emerald-500"
                    />
                  </motion.div>
                  Knowledge Check
                </CardTitle>
                <p className="text-muted-foreground mt-1 text-sm">
                  Question {currentStep + 1} of {displayQuestions.length}
                </p>
                {hasAIQuestions && onToggleAIQuestions && (
                  <QuizAISheet
                    topicTitle={topicTitle}
                    isGenerating={isGeneratingAI}
                    onGenerate={generateAIQuestions}
                    trigger={
                      <Button variant="outline" size="sm" className="mt-3 gap-2">
                        <IconWrapper
                          icon={SparklesIcon}
                          size={14}
                          className="text-yellow-500"
                        />
                        AI Mode
                      </Button>
                    }
                  />
                )}
              </div>
              {isAlreadyCompleted && (
                <Badge
                  variant="secondary"
                  className="shrink-0 border-none bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                >
                  Completed
                </Badge>
              )}
            </motion.div>
          </CardHeader>
          <CardContent className="p-8">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progress</span>
                <span className="text-sm font-medium">
                  {currentStep + 1} / {displayQuestions.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {showResults && score !== null ? (
              <QuizResults
                questions={displayQuestions}
                selectedAnswers={selectedAnswers}
                score={score}
                onRetake={handleRetake}
              />
            ) : (
              <>
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={transitions.smooth}
                  className="space-y-6"
                >
                  <QuizQuestionCard
                    question={currentQuestion}
                    questionIndex={currentStep}
                    selectedAnswer={selectedAnswers[currentQuestion.id]}
                    correctAnswer={currentQuestion.correctAnswer}
                    showResults={false}
                    onSelect={(optIdx) =>
                      handleSelect(currentQuestion.id, optIdx)
                    }
                  />
                </motion.div>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={isFirstQuestion}
                    className="gap-2"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                    Previous
                  </Button>

                  <Button
                    onClick={isLastQuestion ? handleSubmitQuiz : handleNext}
                    disabled={!hasAnsweredCurrent}
                    className="gap-2"
                  >
                    {isLastQuestion ? "Submit Quiz" : "Next"}
                    {!isLastQuestion && (
                      <ChevronRightIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </>
  )
}
