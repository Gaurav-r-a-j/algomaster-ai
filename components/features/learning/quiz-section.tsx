"use client"

import { useState, useMemo } from "react"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"

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
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({})
  const [showResults, setShowResults] = useState(false)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiQuestions, setAiQuestions] = useState<QuizQuestion[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showAISheet, setShowAISheet] = useState(false)
  
  // Generate AI questions
  const generateAIQuestions = async () => {
    if (!topicTitle) return
    setIsGeneratingAI(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const generated: QuizQuestion[] = [
        {
          id: questions.length + 1,
          question: `What is a key concept related to ${topicTitle}?`,
          options: [
            "Basic understanding",
            "Core principle",
            "Advanced technique",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: `All options represent important aspects of ${topicTitle}.`
        },
        {
          id: questions.length + 2,
          question: `When would you apply ${topicTitle} in practice?`,
          options: [
            "Never",
            "In specific problem scenarios",
            "Always",
            "Only for beginners"
          ],
          correctAnswer: 1,
          explanation: `${topicTitle} should be applied when it matches the problem requirements.`
        }
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
  }
  
  const displayQuestions = useMemo(() => {
    if (useAIQuestions && aiQuestions.length > 0) {
      return aiQuestions
    }
    return questions
  }, [useAIQuestions, aiQuestions, questions])
  
  const currentQuestion = displayQuestions[currentStep]
  const progress = ((currentStep + 1) / displayQuestions.length) * 100
  const isLastQuestion = currentStep === displayQuestions.length - 1
  const isFirstQuestion = currentStep === 0
  
  const score = useMemo(() => {
    if (!showResults) return null
    const correct = displayQuestions.filter(
      q => selectedAnswers[q.id] === q.correctAnswer
    ).length
    return Math.round((correct / displayQuestions.length) * 100)
  }, [showResults, displayQuestions, selectedAnswers])

  const handleSelect = (qId: number, optionIdx: number) => {
    if (showResults) {
      return
    }
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }))
  }

  const handleNext = () => {
    if (currentStep < displayQuestions.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    setShowResults(true)
    markAsCompleted(topicId)
  }

  const isAlreadyCompleted = isCompleted(topicId)
  const currentAnswer = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined
  const hasAnsweredCurrent = currentAnswer !== undefined
  const allAnswered = displayQuestions.every(
    (q) => selectedAnswers[q.id] !== undefined
  )

  if (!currentQuestion) {
    return null
  }

  const isCorrect = selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer
  const hasAnswered = selectedAnswers[currentQuestion.id] !== undefined

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
                  <Sheet open={showAISheet} onOpenChange={setShowAISheet}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 gap-2"
                      >
                        <IconWrapper
                          icon={SparklesIcon}
                          size={14}
                          className="text-yellow-500"
                        />
                        AI Mode
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:max-w-md">
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
                          Generate custom quiz questions based on {topicTitle} using AI.
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        {isGeneratingAI ? (
                          <Alert>
                            <AlertDescription className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <IconWrapper icon={SparklesIcon} size={16} className="text-yellow-500" />
                              </motion.div>
                              Generating AI questions...
                            </AlertDescription>
                          </Alert>
                        ) : (
                          <>
                            <p className="text-sm text-muted-foreground">
                              AI will generate personalized questions based on the topic content.
                            </p>
                            <Button
                              onClick={generateAIQuestions}
                              className="w-full"
                              disabled={isGeneratingAI}
                            >
                              <IconWrapper icon={SparklesIcon} size={16} className="mr-2" />
                              Generate AI Questions
                            </Button>
                          </>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
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
                <span className="text-sm font-medium">{currentStep + 1} / {displayQuestions.length}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {showResults && score !== null ? (
              /* Results View - Show All Questions */
              <div className="space-y-6">
                <Alert className={cn(
                  "mb-6",
                  score >= 70 ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
                )}>
                  <AlertDescription className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-lg">Score: {score}%</span>
                      <p className="text-sm mt-1">
                        {score >= 70 ? "🎉 Great job! " : "💪 Keep practicing! "}
                        You got {displayQuestions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length} out of {displayQuestions.length} questions correct.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowResults(false)
                        setCurrentStep(0)
                        setSelectedAnswers({})
                      }}
                    >
                      Retake Quiz
                    </Button>
                  </AlertDescription>
                </Alert>

                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                  {displayQuestions.map((question, qIdx) => {
                    const userAnswer = selectedAnswers[question.id]
                    const isCorrect = userAnswer === question.correctAnswer
                    const hasAnswered = userAnswer !== undefined

                    return (
                      <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: qIdx * 0.1 }}
                        className={cn(
                          "rounded-lg border p-6 space-y-4",
                          isCorrect
                            ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/10"
                            : "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10"
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={cn(
                              "shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm",
                              isCorrect
                                ? "bg-emerald-500 text-white"
                                : "bg-red-500 text-white"
                            )}>
                              {isCorrect ? "✓" : "✗"}
                            </div>
                            <div className="flex-1">
                              <p className="text-foreground font-semibold mb-4">
                                Question {qIdx + 1}: {question.question}
                              </p>
                              <div className="space-y-2">
                                {question.options.map((opt, optIdx) => {
                                  const isCorrectOption = optIdx === question.correctAnswer
                                  const isUserAnswer = userAnswer === optIdx
                                  
                                  let optionClass = "p-3 rounded-lg border text-sm transition-all "
                                  
                                  if (isCorrectOption) {
                                    optionClass += "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-medium"
                                  } else if (isUserAnswer && !isCorrect) {
                                    optionClass += "bg-red-100 dark:bg-red-900/30 border-red-400 text-red-800 dark:text-red-300"
                                  } else {
                                    optionClass += "bg-background border-border opacity-60"
                                  }

                                  return (
                                    <div
                                      key={optIdx}
                                      className={cn(optionClass, "flex items-center gap-2")}
                                    >
                                      {isCorrectOption && (
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                                      )}
                                      {isUserAnswer && !isCorrect && (
                                        <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                                      )}
                                      <span>{opt}</span>
                                    </div>
                                  )
                                })}
                              </div>
                              {question.explanation && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.3 }}
                                  className={cn(
                                    "mt-4 rounded-lg p-4 text-sm",
                                    isCorrect
                                      ? "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                                      : "border border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                  )}
                                >
                                  <span className="font-semibold">
                                    {isCorrect ? "Explanation: " : "Correct Answer: "}
                                  </span>
                                  {question.explanation}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            ) : (
              /* Question View - Stepper */
              <>
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={transitions.smooth}
                  className="space-y-6"
                >
                  <div>
                    <p className="text-foreground mb-6 text-lg font-semibold">
                      {currentQuestion.question}
                    </p>
                    <div className="space-y-3">
                      {currentQuestion.options.map((opt, optIdx) => {
                        let btnClass =
                          "w-full text-left p-4 rounded-lg border text-sm transition-all "

                        if (selectedAnswers[currentQuestion.id] === optIdx) {
                          btnClass +=
                            "bg-primary/10 border-primary text-primary shadow-sm ring-1 ring-primary"
                        } else {
                          btnClass +=
                            "bg-background border-border hover:bg-muted"
                        }

                        return (
                          <motion.button
                            key={optIdx}
                            whileHover={hoverScaleSmall}
                            whileTap={tapScale}
                            onClick={() => handleSelect(currentQuestion.id, optIdx)}
                            className={cn(btnClass)}
                          >
                            {opt}
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
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
                    onClick={isLastQuestion ? handleSubmit : handleNext}
                    disabled={!hasAnsweredCurrent}
                    className="gap-2"
                  >
                    {isLastQuestion ? "Submit Quiz" : "Next"}
                    {!isLastQuestion && <ChevronRightIcon className="h-4 w-4" />}
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
