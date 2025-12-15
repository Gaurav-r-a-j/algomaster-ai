import {
  getModuleBySlug,
  getModules,
  getTopicBySlug,
  TOPICS,
} from "@/data/curriculum"

import { Topic } from "@/types/curriculum"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const CurriculumService = {
  getModules: async (): Promise<string[]> => {
    await delay(500) // Simulate network latency
    return getModules()
  },

  getAllTopics: async (): Promise<Topic[]> => {
    await delay(600)
    return TOPICS
  },

  getTopicById: async (id: string): Promise<Topic | undefined> => {
    await delay(300)
    return TOPICS.find((t) => t.id === id)
  },

  getTopicsByModule: async (module: string): Promise<Topic[]> => {
    await delay(400)
    return TOPICS.filter((t) => t.module === module)
  },

  getTopicBySlug: async (slug: string): Promise<Topic | undefined> => {
    await delay(300)
    return getTopicBySlug(slug)
  },

  getModuleBySlug: async (slug: string): Promise<string | undefined> => {
    await delay(300)
    return getModuleBySlug(slug)
  },

  getTopicContent: async (topic: Topic) => {
    const { getTopicContent: fetchContent } =
      await import("@/services/content/content-service")
    return fetchContent(topic)
  },
}
