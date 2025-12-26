"use client"

import { useProgress } from "@/context/progress-context"
import { TOPICS } from "@/data/curriculum"
import { generateTopicSlug } from "@/utils/common/slug"
import { motion } from "motion/react"
import { fadeIn, transitions } from "@/lib/animations"
import { Tabs } from "@/components/ui/tabs"
import { TopicPageContent, TopicPageHeader, TopicPageTabs } from "@/components/features/learning/pages"
import type { Topic } from "@/types/curriculum"

interface TopicPageClientProps {
  topic: Topic
  allTopics: Topic[]
}

export function TopicPageClient({ topic, allTopics }: TopicPageClientProps) {
  const { completedTopics } = useProgress()
  
  const topicIndex = allTopics.findIndex((t) => t.id === topic.id)
  const prevTopic = topicIndex > 0 ? allTopics[topicIndex - 1] : null
  const nextTopic = topicIndex < allTopics.length - 1 ? allTopics[topicIndex + 1] : null

  return (
    <div className="bg-background flex h-full flex-col overflow-y-auto">
      <Tabs defaultValue="learn" className="flex flex-1 flex-col">
        <TopicPageHeader topic={topic} />
        
        <div className="px-4 sm:px-6 lg:px-8">
          <TopicPageTabs topic={topic} />
        </div>

        <TopicPageContent 
          topic={topic} 
          prevTopic={prevTopic} 
          nextTopic={nextTopic} 
        />
      </Tabs>
    </div>
  )
}

