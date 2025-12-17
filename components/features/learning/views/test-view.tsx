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
        <div className="mx-auto w-full max-w-5xl px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Quiz
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Test your understanding of {topic.title}
            </p>
          </motion.div>

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

