"use client"

import { Tabs } from "@/components/ui/tabs"
import { TopicPageContent, TopicPageHeader, TopicPageTabs } from "@/components/features/learning/pages"
import { getTopicNavigation } from "@/utils/curriculum/topic-navigation"
import type { Topic } from "@/types/curriculum"

interface TopicPageClientProps {
  topic: Topic
  allTopics: Topic[]
}

export function TopicPageClient({ topic, allTopics }: TopicPageClientProps) {
  const { prevTopic, nextTopic } = getTopicNavigation(topic, allTopics)

  return (
    <div className="bg-background flex h-full flex-col overflow-y-auto">
      <Tabs defaultValue="learn" className="flex flex-1 flex-col">
        <TopicPageHeader topic={topic} />

        <TopicPageTabs topic={topic} />

        <TopicPageContent
          topic={topic}
          prevTopic={prevTopic}
          nextTopic={nextTopic}
        />
      </Tabs>
    </div>
  )
}

