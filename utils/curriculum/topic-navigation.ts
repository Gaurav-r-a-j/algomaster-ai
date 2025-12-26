import type { Topic } from "@/types/curriculum"

// Get previous and next topics from a list
export function getTopicNavigation(
  currentTopic: Topic,
  allTopics: Topic[]
): { prevTopic: Topic | null; nextTopic: Topic | null } {
  const currentIndex = allTopics.findIndex((t) => t.id === currentTopic.id)
  
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null
  
  return { prevTopic, nextTopic }
}

