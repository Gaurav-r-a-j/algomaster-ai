"use client"

import { useState, useMemo } from "react"
import { useProgress } from "@/context/progress-context"
import { motion } from "motion/react"

import type { QuizQuestion } from "@/types/curriculum"
import {
  fadeIn,
  hoverScaleSmall,
  slideUp,
  staggerContainer,
  staggerItem,
  tapScale,
  transitions,
} from "@/lib/animations"
import { CheckmarkCircleIcon, SparklesIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
  
  // Generate AI questions
  const generateAIQuestions = async () => {
    if (!topicTitle) return
    setIsGeneratingAI(true)
    try {
      // Simulate AI generation - replace with actual API call
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

  const handleSubmit = () => {
    setShowResults(true)
    markAsCompleted(topicId)
  }

  const isAlreadyCompleted = isCompleted(topicId)
  const allAnswered = displayQuestions.every(
    (q) => selectedAnswers[q.id] !== undefined
  )

  return (
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
                Complete this quiz to mark the lesson as done.
              </p>
              {/* AI Questions Toggle */}
              <div className="mt-3 flex items-center gap-3">
                {onToggleAIQuestions && (
                  <>
                    <Switch
                      id="ai-questions"
                      checked={useAIQuestions}
                      onCheckedChange={(checked) => {
                        onToggleAIQuestions(checked)
                        if (checked && aiQuestions.length === 0) {
                          generateAIQuestions()
                        }
                      }}
                      disabled={isGeneratingAI}
                    />
                    <Label
                      htmlFor="ai-questions"
                      className="text-muted-foreground cursor-pointer text-xs flex items-center gap-2"
                    >
                      <IconWrapper
                        icon={SparklesIcon}
                        size={14}
                        className={cn(
                          "transition-colors",
                          useAIQuestions ? "text-yellow-500" : "text-muted-foreground"
                        )}
                      />
                      {isGeneratingAI ? "Generating AI questions..." : "AI Mode (Generate custom questions)"}
                    </Label>
                  </>
                )}
              </div>
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
        <CardContent className="space-y-8 p-8">
          {isGeneratingAI && (
            <Alert>
              <AlertDescription className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <IconWrapper icon={SparklesIcon} size={16} className="text-yellow-500" />
                </motion.div>
                Generating AI questions based on {topicTitle}...
              </AlertDescription>
            </Alert>
          )}
          {showResults && score !== null && (
            <Alert className={cn(
              score >= 70 ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20" : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
            )}>
              <AlertDescription>
                <span className="font-semibold">Score: {score}%</span>
                {score >= 70 ? " Great job! " : " Keep practicing! "}
                You got {displayQuestions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length} out of {displayQuestions.length} questions correct.
              </AlertDescription>
            </Alert>
          )}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {displayQuestions.map((q, idx) => {
              const isCorrect = selectedAnswers[q.id] === q.correctAnswer
              const hasAnswered = selectedAnswers[q.id] !== undefined

              return (
                <motion.div
                  key={q.id}
                  variants={staggerItem}
                  className={cn(idx > 0 && "border-border/50 border-t pt-8")}
                >
                  <p className="text-foreground mb-4 flex gap-3 font-medium">
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={transitions.quick}
                      className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                    >
                      {idx + 1}
                    </motion.span>
                    {q.question}
                  </p>
                  <div className="space-y-3 pl-6">
                    {q.options.map((opt, optIdx) => {
                      let btnClass =
                        "w-full text-left p-3 rounded-lg border text-sm transition-all "

                      if (showResults) {
                        if (optIdx === q.correctAnswer) {
                          btnClass +=
                            "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400"
                        } else if (selectedAnswers[q.id] === optIdx) {
                          btnClass +=
                            "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400"
                        } else {
                          btnClass += "bg-background border-border opacity-50"
                        }
                      } else {
                        if (selectedAnswers[q.id] === optIdx) {
                          btnClass +=
                            "bg-primary/10 border-primary text-primary shadow-sm ring-1 ring-primary"
                        } else {
                          btnClass +=
                            "bg-background border-border hover:bg-muted"
                        }
                      }

                      return (
                        <motion.button
                          key={optIdx}
                          whileHover={hoverScaleSmall}
                          whileTap={tapScale}
                          onClick={() => handleSelect(q.id, optIdx)}
                          className={cn(btnClass)}
                          disabled={showResults}
                        >
                          {opt}
                        </motion.button>
                      )
                    })}
                  </div>
                  {showResults && hasAnswered && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={transitions.smooth}
                      className={cn(
                        "mt-3 rounded-lg p-3 pl-6 text-sm",
                        isCorrect
                          ? "border border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                          : "border border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
                      )}
                    >
                      <span className="font-semibold">
                        {isCorrect ? "✓ Correct! " : "✗ Incorrect. "}
                      </span>
                      {q.explanation}
                    </motion.p>
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          {!showResults && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitions.smooth, delay: 0.2 }}
              className="pt-4"
            >
              <motion.div whileHover={hoverScaleSmall} whileTap={tapScale}>
                <Button
                  onClick={handleSubmit}
                  disabled={!allAnswered || isGeneratingAI}
                  className="w-full"
                  size="lg"
                >
                  {allAnswered ? "Submit Answers" : `Answer ${displayQuestions.length - Object.keys(selectedAnswers).length} more question(s)`}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
