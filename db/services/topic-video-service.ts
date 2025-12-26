import { db } from "@/db"
import { topicVideos, type NewTopicVideo } from "@/db/schema"
import { eq, and } from "drizzle-orm"
import { sql } from "drizzle-orm"

export class TopicVideoService {
  // Get all videos for a topic
  async getVideosByTopic(topicId: string) {
    if (!db) return []
    
    return await db
      .select()
      .from(topicVideos)
      .where(eq(topicVideos.topicId, topicId))
  }

  // Get video for a specific topic and language
  async getVideoByTopicAndLanguage(topicId: string, language: string = "en") {
    if (!db) return null
    
    const [video] = await db
      .select()
      .from(topicVideos)
      .where(
        and(
          eq(topicVideos.topicId, topicId),
          eq(topicVideos.language, language)
        )
      )
      .limit(1)
    
    return video || null
  }

  // Upsert video for a topic and language
  async upsertVideo(data: NewTopicVideo) {
    if (!db) return null
    
    const existing = await this.getVideoByTopicAndLanguage(
      data.topicId,
      data.language
    )
    
    if (existing) {
      const [updated] = await db
        .update(topicVideos)
        .set({
          videoUrl: data.videoUrl,
          updatedAt: new Date(),
        })
        .where(eq(topicVideos.id, existing.id))
        .returning()
      
      return updated || null
    }
    
    const [created] = await db
      .insert(topicVideos)
      .values(data)
      .returning()
    
    return created || null
  }

  // Sync videos from topic data (supports string or object format)
  async syncVideos(topicId: string, youtubeLink?: string | { en?: string; hi?: string }) {
    if (!db || !youtubeLink) return []
    
    const synced: typeof topicVideos.$inferSelect[] = []
    
    if (typeof youtubeLink === "string") {
      const video = await this.upsertVideo({
        topicId,
        language: "en",
        videoUrl: youtubeLink,
      })
      if (video) synced.push(video)
    } else {
      for (const [lang, url] of Object.entries(youtubeLink)) {
        if (url) {
          const video = await this.upsertVideo({
            topicId,
            language: lang,
            videoUrl: url,
          })
          if (video) synced.push(video)
        }
      }
    }
    
    return synced
  }

  // Delete video for a topic and language
  async deleteVideo(topicId: string, language: string) {
    if (!db) return false
    
    await db
      .delete(topicVideos)
      .where(
        and(
          eq(topicVideos.topicId, topicId),
          eq(topicVideos.language, language)
        )
      )
    
    return true
  }

  // Delete all videos for a topic
  async deleteVideosByTopic(topicId: string) {
    if (!db) return false
    
    await db
      .delete(topicVideos)
      .where(eq(topicVideos.topicId, topicId))
    
    return true
  }
}

export const topicVideoService = new TopicVideoService()

