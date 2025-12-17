"use client"

import React from "react"
import { useState, useMemo, useCallback } from "react"
import { useProgress } from "@/context/progress-context"
import { motion } from "motion/react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

import type { QuizQuestion } from "@/types/curriculum"
import {
  fadeIn,
  transitions,
} from "@/lib/animations"
import { SparklesIcon } from "@/lib/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  const [isAISheetOpen, setIsAISheetOpen] = useState(false)

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
      // Keep sheet open and switch to AI questions
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
        className="w-full"
      >
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Main Quiz Content */}
          <div className="flex-1 min-w-0">
            <Card className="border-border/40 shadow-sm h-full flex flex-col">
              {/* Header with Progress and Controls */}
              <div className="border-border/40 border-b px-6 py-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Progress Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Question {currentStep + 1} of {displayQuestions.length}
                        </span>
                        {isAlreadyCompleted && (
                          <Badge
                            variant="secondary"
                            className="shrink-0 border-none bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          >
                            Completed
                          </Badge>
                        )}
                      </div>
                      <Progress value={progress} className="h-1.5" />
                    </div>
                  </div>
                  
                  {/* AI Mode Button */}
                  {hasAIQuestions && onToggleAIQuestions && (
                    <div className="shrink-0">
                      <QuizAISheet
                        topicTitle={topicTitle}
                        isGenerating={isGeneratingAI}
                        onGenerate={generateAIQuestions}
                        aiQuestions={aiQuestions}
                        onQuestionSelect={handleSelect}
                        selectedAnswers={selectedAnswers}
                        open={isAISheetOpen}
                        onOpenChange={setIsAISheetOpen}
                        trigger={
                          <Button variant="outline" size="sm" className="gap-2">
                            <IconWrapper
                              icon={SparklesIcon}
                              size={14}
                              className="text-yellow-500"
                            />
                            AI Mode
                          </Button>
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <CardContent className="p-6 flex-1 flex flex-col">

                {showResults && score !== null ? (
                  <div className="flex-1 overflow-y-auto">
                    <QuizResults
                      questions={displayQuestions}
                      selectedAnswers={selectedAnswers}
                      score={score}
                      onRetake={handleRetake}
                    />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col">
                    <motion.div
                      key={currentQuestion.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={transitions.smooth}
                      className="flex-1 flex flex-col"
                    >
                      <div className="flex-1">
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
                      </div>

                      {/* Navigation */}
                      <div className="mt-6 pt-6 border-t border-border/40 flex items-center justify-between gap-4">
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
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </>
  )
}
