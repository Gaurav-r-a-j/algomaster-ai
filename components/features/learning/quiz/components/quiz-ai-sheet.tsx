"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import type { QuizQuestion } from "@/types/curriculum"
import { SparklesIcon } from "@/lib/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { QuizQuestionCard } from "./quiz-question-card"

interface QuizAISheetProps {
  topicTitle?: string
  isGenerating: boolean
  onGenerate: () => void
  trigger: React.ReactNode
  aiQuestions?: QuizQuestion[]
  onQuestionSelect?: (questionId: number, optionIdx: number) => void
  selectedAnswers?: Record<number, number>
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function QuizAISheet({
  topicTitle,
  isGenerating,
  onGenerate,
  trigger,
  aiQuestions = [],
  onQuestionSelect,
  selectedAnswers = {},
  open,
  onOpenChange,
}: QuizAISheetProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const hasQuestions = aiQuestions.length > 0
  const currentQuestion = hasQuestions ? aiQuestions[currentQuestionIndex] : null

  // Reset question index when questions change
  React.useEffect(() => {
    if (hasQuestions) {
      setCurrentQuestionIndex(0)
    }
  }, [hasQuestions])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <IconWrapper
              icon={SparklesIcon}
              size={20}
              className="text-yellow-500"
            />
            AI Question Generation
          </SheetTitle>
          <SheetDescription>
            {hasQuestions
              ? `AI-generated questions for ${topicTitle}`
              : `Generate custom quiz questions based on ${topicTitle} using AI.`}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {isGenerating ? (
            <Alert>
              <AlertDescription className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <IconWrapper
                    icon={SparklesIcon}
                    size={16}
                    className="text-yellow-500"
                  />
                </motion.div>
                Generating AI questions...
              </AlertDescription>
            </Alert>
          ) : hasQuestions ? (
            <>
              {/* Show AI Questions in Sheet */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {aiQuestions.length}
                  </p>
                </div>

                {currentQuestion && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">AI-Generated Question</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <QuizQuestionCard
                        question={currentQuestion}
                        questionIndex={currentQuestionIndex}
                        selectedAnswer={selectedAnswers[currentQuestion.id]}
                        correctAnswer={currentQuestion.correctAnswer}
                        showResults={false}
                        onSelect={(optIdx) => {
                          if (onQuestionSelect) {
                            onQuestionSelect(currentQuestion.id, optIdx)
                          }
                        }}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentQuestionIndex((prev) =>
                        Math.min(aiQuestions.length - 1, prev + 1)
                      )
                    }
                    disabled={currentQuestionIndex === aiQuestions.length - 1}
                    className="flex-1"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                AI will generate personalized questions based on the topic content.
              </p>
              <Button onClick={onGenerate} className="w-full" disabled={isGenerating}>
                <IconWrapper icon={SparklesIcon} size={16} className="mr-2" />
                Generate AI Questions
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

