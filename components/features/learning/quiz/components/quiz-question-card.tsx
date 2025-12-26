"use client"

import { cn } from "@/lib/utils"
import type { QuizQuestion } from "@/types/curriculum"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { CheckmarkCircleIcon } from "@/lib/icons"

interface QuizQuestionCardProps {
  question: QuizQuestion
  questionIndex: number
  selectedAnswer?: number
  correctAnswer: number
  showResults: boolean
  onSelect: (optionIndex: number) => void
}

export function QuizQuestionCard({
  question,
  questionIndex,
  selectedAnswer,
  correctAnswer,
  showResults,
  onSelect,
}: QuizQuestionCardProps) {
  const isCorrect = selectedAnswer === correctAnswer
  const hasAnswered = selectedAnswer !== undefined

  return (
    <div className="space-y-5">
      <div>
        <p className="text-foreground mb-5 text-lg font-semibold leading-relaxed lg:text-xl">
          {question.question}
        </p>
        <div className="space-y-2.5">
          {question.options.map((opt, optIdx) => {
            const isCorrectOption = optIdx === correctAnswer
            const isUserAnswer = selectedAnswer === optIdx

            let optionClass =
              "p-3.5 rounded-lg border text-sm transition-all cursor-pointer "

            if (showResults) {
              if (isCorrectOption) {
                optionClass +=
                  "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-400 text-emerald-800 dark:text-emerald-300 font-medium"
              } else if (isUserAnswer && !isCorrect) {
                optionClass +=
                  "bg-red-100 dark:bg-red-900/30 border-red-400 text-red-800 dark:text-red-300"
              } else {
                optionClass += "bg-muted/50 border-border text-muted-foreground"
              }
            } else {
              if (isUserAnswer) {
                optionClass +=
                  "bg-primary/10 border-primary text-primary font-medium"
              } else {
                optionClass +=
                  "bg-background border-border hover:bg-muted/50 hover:border-primary/50"
              }
            }

            return (
              <div key={optIdx}>
                <button
                  onClick={() => !showResults && onSelect(optIdx)}
                  disabled={showResults}
                  className={cn(optionClass, "w-full text-left")}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="shrink-0 w-7 h-7 rounded-full border-2 border-current flex items-center justify-center text-xs font-semibold">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                    {showResults && isCorrectOption && (
                      <IconWrapper
                        icon={CheckmarkCircleIcon}
                        size={18}
                        className="ml-auto text-emerald-600 dark:text-emerald-400 shrink-0"
                      />
                    )}
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

