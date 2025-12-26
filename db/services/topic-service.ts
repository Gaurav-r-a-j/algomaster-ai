// Topic Service - Manage topics metadata
// Note: Content (MDX, quizzes) stays in code, this only manages metadata

import { eq, and, asc } from "drizzle-orm"
import { db, isDatabaseAvailable } from "../index"
import { topics, type NewTopic, type Topic } from "../schema"
import type { CategoryId } from "@/types/category"

export class TopicService {
  // Create or update topic
  async upsertTopic(data: NewTopic): Promise<Topic> {
    if (!isDatabaseAvailable || !db) {
      throw new Error("Database not available - app running in client-side only mode")
    }
    
    const [topic] = await db
      .insert(topics)
      .values({
        ...data,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: topics.id,
        set: {
          title: data.title,
          description: data.description,
          module: data.module,
          order: data.order,
          difficulty: data.difficulty,
          enabled: data.enabled,
          updatedAt: new Date(),
        },
      })
      .returning()
    
    return topic!
  }

  // Get topic by ID
  async getTopicById(id: string): Promise<Topic | null> {
    if (!isDatabaseAvailable || !db) {
      throw new Error("Database not available - app running in client-side only mode")
    }
    
    const [topic] = await db
      .select()
      .from(topics)
      .where(eq(topics.id, id))
      .limit(1)
    
    return topic || null
  }

  // Get all topics for a category (ordered)
  async getTopicsByCategory(categoryId: string, enabledOnly: boolean = true): Promise<Topic[]> {
    if (!isDatabaseAvailable || !db) {
      throw new Error("Database not available - app running in client-side only mode")
    }
    
    const conditions = [eq(topics.categoryId, categoryId as CategoryId)]
    if (enabledOnly) {
      conditions.push(eq(topics.enabled, true))
    }

    return db
      .select()
      .from(topics)
      .where(and(...conditions))
      .orderBy(asc(topics.order))
  }

  // Get all enabled topics (for sidebar)
  async getAllEnabledTopics(): Promise<Topic[]> {
    if (!isDatabaseAvailable || !db) {
      throw new Error("Database not available - app running in client-side only mode")
    }
    
    return db
      .select()
      .from(topics)
      .where(eq(topics.enabled, true))
      .orderBy(asc(topics.categoryId), asc(topics.order))
  }

  // Get topics grouped by category (for sidebar)
  async getTopicsGroupedByCategory(): Promise<Record<string, Topic[]>> {
    const allTopics = await this.getAllEnabledTopics()
    
    return allTopics.reduce((acc, topic) => {
      if (!acc[topic.categoryId]) {
        acc[topic.categoryId] = []
      }
      acc[topic.categoryId].push(topic)
      return acc
    }, {} as Record<string, Topic[]>)
  }

  // Enable/disable topic
  async setTopicEnabled(id: string, enabled: boolean): Promise<Topic | null> {
    if (!isDatabaseAvailable || !db) {
      throw new Error("Database not available - app running in client-side only mode")
    }
    
    const [topic] = await db
      .update(topics)
      .set({ enabled, updatedAt: new Date() })
      .where(eq(topics.id, id))
      .returning()
    
    return topic || null
  }

  // Delete topic (soft delete - set enabled to false)
  async deleteTopic(id: string): Promise<boolean> {
    if (!isDatabaseAvailable || !db) {
      throw new Error("Database not available - app running in client-side only mode")
    }
    
    const result = await db
      .update(topics)
      .set({ enabled: false, updatedAt: new Date() })
      .where(eq(topics.id, id))
    
    return result.rowCount > 0
  }

  // Sync topics from code (import from curriculum.ts)
  // This syncs topic metadata from code to database
  async syncTopicsFromCode(topicData: Array<{
    id: string
    title: string
    description: string
    categoryId: string
    module: string
    order: number
    difficulty?: string
    youtubeLink?: string | { en?: string; hi?: string }
  }>): Promise<number> {
    let synced = 0
    
    for (const data of topicData) {
      await this.upsertTopic({
        id: data.id,
        title: data.title,
        description: data.description,
        categoryId: data.categoryId as CategoryId,
        module: data.module,
        order: data.order,
        difficulty: data.difficulty || null,
        enabled: true,
      })
      
      if (data.youtubeLink) {
        const { topicVideoService } = await import("./topic-video-service")
        await topicVideoService.syncVideos(data.id, data.youtubeLink)
      }
      
      synced++
    }
    
    return synced
  }
}

export const topicService = new TopicService()

