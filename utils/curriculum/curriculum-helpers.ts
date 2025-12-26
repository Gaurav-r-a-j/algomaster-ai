/**
 * Helper utilities for curriculum navigation
 */

import { ROUTES } from "@/constants/routes"
import { TOPICS, getModules } from "@/data/curriculum"
import { generateModuleSlug, generateTopicSlug } from "@/utils/common/slug"

/**
 * Get the first topic to start learning
 */
export function getFirstTopicUrl(): string {
  const firstTopic = TOPICS[0]
  if (!firstTopic) {
    return ROUTES.HOME
  }
  return ROUTES.TOPIC(firstTopic.categoryId || "dsa", generateTopicSlug(firstTopic.title))
}

/**
 * Get the first module URL
 */
export function getFirstModuleUrl(): string {
  const modules = getModules()
  const firstModule = modules[0]
  if (!firstModule) {
    return ROUTES.HOME
  }
  return ROUTES.MODULE(generateModuleSlug(firstModule))
}

/**
 * Get a random topic URL for browsing
 */
export function getRandomTopicUrl(): string {
  const randomIndex = Math.floor(Math.random() * TOPICS.length)
  const topic = TOPICS[randomIndex]
  if (!topic) {
    return ROUTES.HOME
  }
  return ROUTES.TOPIC(topic.categoryId || "dsa", generateTopicSlug(topic.title))
}
