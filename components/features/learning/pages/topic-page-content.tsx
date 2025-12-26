"use client"

import { motion } from "motion/react"
import { fadeIn, transitions } from "@/lib/animations"
import { TabsContent } from "@/components/ui/tabs"
import { LearnView, PracticeView, TestView, VisualizeView } from "@/components/features/learning/views"
import { TopicSidebar } from "@/components/features/docs/topic-sidebar"
import type { Topic } from "@/types/curriculum"

interface TopicPageContentProps {
  topic: Topic
  prevTopic: Topic | null
  nextTopic: Topic | null
}

export function TopicPageContent({ topic, prevTopic, nextTopic }: TopicPageContentProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className="relative h-full flex-1"
    >
      {/* Learn Tab - With Sidebar */}
      <TabsContent value="learn" className="mt-0">
        <motion.div
          key="learn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitions.smooth}
          className="flex h-full w-full"
        >
          <div className="flex-1 min-w-0 overflow-y-auto">
            <LearnView topic={topic} />
          </div>
          <TopicSidebar
            topic={topic}
            prevTopic={prevTopic}
            nextTopic={nextTopic}
          />
        </motion.div>
      </TabsContent>

      {/* Visualize Tab - Full Width */}
      <TabsContent value="visualize" className="mt-0">
        <motion.div
          key="visualize"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitions.smooth}
          className="h-full w-full"
        >
          <VisualizeView topic={topic} />
        </motion.div>
      </TabsContent>

      {/* Practice Tab - Full Width */}
      <TabsContent
        value="code"
        className="mt-0 h-[calc(100vh-120px)] w-full"
      >
        <motion.div
          key="code"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitions.smooth}
          className="h-full w-full"
        >
          <PracticeView topic={topic} />
        </motion.div>
      </TabsContent>

      {/* Quiz Tab - Knowledge Check */}
      <TabsContent value="quiz" className="mt-0">
        <motion.div
          key="quiz"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitions.smooth}
          className="h-full w-full"
        >
          <TestView topic={topic} />
        </motion.div>
      </TabsContent>
    </motion.div>
  )
}

