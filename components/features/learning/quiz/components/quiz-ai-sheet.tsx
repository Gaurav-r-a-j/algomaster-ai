"use client"

import React, { useState } from "react"
import { motion } from "motion/react"
import type { QuizQuestion } from "@/types/curriculum"
import { StarIcon } from "@/lib/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
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
  onGenerate: (questionCount?: number) => void
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
  const [questionCount, setQuestionCount] = useState<number | "auto">("auto")
  const hasQuestions = aiQuestions.length > 0
  const currentQuestion = hasQuestions ? aiQuestions[currentQuestionIndex] : null

  // Reset question index when questions change
  React.useEffect(() => {
    if (hasQuestions) {
      setCurrentQuestionIndex(0)
      setQuestionCount("auto")
    }
  }, [hasQuestions])
  
  // Reset question count when sheet closes
  React.useEffect(() => {
    if (!open && !hasQuestions) {
      setQuestionCount("auto")
      setCurrentQuestionIndex(0)
    }
  }, [open, hasQuestions])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <IconWrapper
              icon={StarIcon}
              size={22}
              className="text-yellow-500"
            />
            AI Question Generation
          </SheetTitle>
          <SheetDescription className="text-sm mt-2">
            {hasQuestions
              ? `AI-generated questions for ${topicTitle}`
              : `Generate custom quiz questions based on ${topicTitle} using AI.`}
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 pb-6 space-y-6">
          {isGenerating ? (
            <div className="space-y-6">
              <Alert className="border-primary/20 bg-primary/5">
                <AlertDescription className="flex items-center gap-3 py-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <IconWrapper
                      icon={StarIcon}
                      size={18}
                      className="text-yellow-500"
                    />
                  </motion.div>
                  <span className="font-medium">Generating AI questions...</span>
                </AlertDescription>
              </Alert>
              
              {/* Skeleton Loading */}
              <div className="space-y-5">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-3">
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <Skeleton className="h-20 w-full rounded-lg" />
                </div>
              </div>
            </div>
          ) : hasQuestions ? (
            <>
              {/* Show AI Questions in Sheet */}
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <p className="text-sm font-semibold text-foreground">
                    Question {currentQuestionIndex + 1} of {aiQuestions.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${((currentQuestionIndex + 1) / aiQuestions.length) * 100}%`,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </div>

                {currentQuestion && (
                  <Card className="border-border/40">
                    <CardHeader className="px-6 py-4">
                      <CardTitle className="text-base font-semibold">AI-Generated Question</CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
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
                {currentQuestion && (
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-border/40">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                      disabled={currentQuestionIndex === 0}
                      className="flex-1"
                    >
                      Previous
                    </Button>
                    {currentQuestionIndex === aiQuestions.length - 1 ? (
                      <Button
                        onClick={() => {
                          if (onOpenChange) {
                            onOpenChange(false)
                          }
                        }}
                        className="flex-1"
                      >
                        Submit Quiz
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCurrentQuestionIndex((prev) =>
                            Math.min(aiQuestions.length - 1, prev + 1)
                          )
                        }
                        className="flex-1"
                      >
                        Next
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="space-y-5 py-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Number of Questions
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Choose how many questions to generate. Leave as "Auto" for AI to decide based on topic complexity.
                  </p>
                </div>
                
                <div className="grid grid-cols-5 gap-2">
                  <Button
                    variant={questionCount === "auto" ? "default" : "outline"}
                    onClick={() => setQuestionCount("auto")}
                    className="h-10 text-xs font-medium"
                    disabled={isGenerating}
                  >
                    Auto
                  </Button>
                  {[3, 5, 7, 10].map((count) => (
                    <Button
                      key={count}
                      variant={questionCount === count ? "default" : "outline"}
                      onClick={() => setQuestionCount(count)}
                      className="h-10 text-xs font-medium"
                      disabled={isGenerating}
                    >
                      {count}
                    </Button>
                  ))}
                </div>

                <div className="pt-2 space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    AI will generate personalized questions based on the topic content.
                  </p>
                  <Button 
                    onClick={() => {
                      const count = questionCount === "auto" ? undefined : questionCount
                      onGenerate(count)
                    }} 
                    className="w-full h-11 gap-2 font-semibold" 
                    disabled={isGenerating}
                  >
                    <IconWrapper icon={StarIcon} size={18} />
                    {isGenerating ? "Generating..." : "Generate AI Questions"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

