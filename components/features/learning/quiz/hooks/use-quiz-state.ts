"use client"

import { useState, useMemo, useCallback } from "react"
import type { QuizQuestion } from "@/types/curriculum"

interface UseQuizStateProps {
  questions: QuizQuestion[]
}

export function useQuizState({ questions }: UseQuizStateProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {}
  )
  const [showResults, setShowResults] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const displayQuestions = questions

  const currentQuestion = displayQuestions[currentStep]
  const progress = ((currentStep + 1) / displayQuestions.length) * 100
  const isLastQuestion = currentStep === displayQuestions.length - 1
  const isFirstQuestion = currentStep === 0

  const score = useMemo(() => {
    if (!showResults) return null
    const correct = displayQuestions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length
    return Math.round((correct / displayQuestions.length) * 100)
  }, [showResults, displayQuestions, selectedAnswers])

  const handleSelect = useCallback(
    (qId: number, optionIdx: number) => {
      if (showResults) return
      setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }))
    },
    [showResults]
  )

  const handleNext = useCallback(() => {
    if (currentStep < displayQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }, [currentStep, displayQuestions.length])

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  const handleSubmit = useCallback(() => {
    setShowResults(true)
  }, [])

  const handleRetake = useCallback(() => {
    setShowResults(false)
    setCurrentStep(0)
    setSelectedAnswers({})
  }, [])

  const allAnswered = displayQuestions.every(
    (q) => selectedAnswers[q.id] !== undefined
  )

  return {
    selectedAnswers,
    showResults,
    currentStep,
    displayQuestions,
    currentQuestion,
    progress,
    isLastQuestion,
    isFirstQuestion,
    score,
    allAnswered,
    handleSelect,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleRetake,
  }
}

