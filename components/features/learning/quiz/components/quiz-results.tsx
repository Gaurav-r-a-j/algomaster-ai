"use client"

import { motion } from "motion/react"
import type { QuizQuestion } from "@/types/curriculum"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface QuizResultsProps {
  questions: QuizQuestion[]
  selectedAnswers: Record<number, number>
  score: number
  onRetake: () => void
}

export function QuizResults({
  questions,
  selectedAnswers,
  score,
  onRetake,
}: QuizResultsProps) {
  const correctCount = questions.filter(
    (q) => selectedAnswers[q.id] === q.correctAnswer
  ).length

  return (
    <div className="space-y-6">
      <Alert
        className={cn(
          "mb-6",
          score >= 70
            ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20"
            : "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
        )}
      >
        <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-semibold text-xl">Score: {score}%</span>
            <p className="text-sm text-muted-foreground">
              {score >= 70 ? "🎉 Great job! " : "💪 Keep practicing! "}
              You got {correctCount} out of {questions.length} questions correct.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onRetake} className="shrink-0">
            Retake Quiz
          </Button>
        </AlertDescription>
      </Alert>

      <div className="space-y-5">
        {questions.map((question, qIdx) => {
          const userAnswer = selectedAnswers[question.id]
          const isCorrect = userAnswer === question.correctAnswer

          return (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: qIdx * 0.1 }}
              className={cn(
                "rounded-xl border p-5 space-y-4",
                isCorrect
                  ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/10"
                  : "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10"
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm",
                    isCorrect ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
                  )}
                >
                  {isCorrect ? "✓" : "✗"}
                </div>
                <div className="flex-1 space-y-3 min-w-0">
                  <p className="text-foreground font-semibold text-base leading-relaxed">
                    Question {qIdx + 1}: {question.question}
                  </p>
                  <div className="space-y-2">
                      {question.options.map((opt, optIdx) => {
                        const isCorrectOption = optIdx === question.correctAnswer
                        const isUserAnswer = userAnswer === optIdx

                        let optionClass = "p-3 rounded-lg border text-sm transition-all "

                        if (isCorrectOption) {
                          optionClass +=
                            "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-medium"
                        } else if (isUserAnswer && !isCorrect) {
                          optionClass +=
                            "bg-red-100 dark:bg-red-900/30 border-red-400 text-red-800 dark:text-red-300"
                        } else {
                          optionClass +=
                            "bg-muted/50 border-border text-muted-foreground"
                        }

                        return (
                          <div key={optIdx} className={cn(optionClass, "p-3.5")}>
                            <div className="flex items-center gap-3">
                              <span className="shrink-0 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-semibold">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span className="text-sm leading-relaxed">{opt}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {question.explanation && (
                      <div className="mt-4 p-3.5 rounded-lg bg-muted/50 border border-border">
                        <p className="text-sm font-semibold text-foreground mb-1.5">
                          Explanation:
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

