"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { getDefaultQuiz } from "@/data/default-quiz"

import type { Topic } from "@/types/curriculum"
import { fadeIn, transitions } from "@/lib/animations"
import { QuizSection } from "@/components/features/learning/quiz"

interface TestViewProps {
  topic: Topic
}

export function TestView({ topic }: TestViewProps) {
  const [useAIQuestions, setUseAIQuestions] = useState(false)

  // Get quiz questions for this topic
  const quizQuestions = topic.quiz || getDefaultQuiz(topic)

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className="flex h-full w-full flex-col"
    >
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8">
          <QuizSection
            topicId={topic.id}
            questions={quizQuestions}
            useAIQuestions={useAIQuestions}
            onToggleAIQuestions={setUseAIQuestions}
            hasAIQuestions={true}
            topicTitle={topic.title}
          />
        </div>
      </div>
    </motion.div>
  )
}

