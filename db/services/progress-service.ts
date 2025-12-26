import { eq, and, desc } from "drizzle-orm"
import { db } from "../index"
import { userProgress, type NewUserProgress, type UserProgress } from "../schema"

export class ProgressService {
  // Create or update progress
  async upsertProgress(data: NewUserProgress): Promise<UserProgress> {
    const existing = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, data.userId),
          eq(userProgress.topicId, data.topicId)
        )
      )
      .limit(1)

    if (existing.length > 0) {
      const [updated] = await db
        .update(userProgress)
        .set({
          ...data,
          lastAccessedAt: new Date(),
        })
        .where(eq(userProgress.id, existing[0].id))
        .returning()
      
      return updated!
    }

    const [created] = await db.insert(userProgress).values(data).returning()
    return created!
  }

  // Get progress for a user and topic
  async getProgress(userId: string, topicId: string): Promise<UserProgress | null> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.topicId, topicId)
        )
      )
      .limit(1)
    
    return progress || null
  }

  // Get all progress for a user
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId))
      .orderBy(desc(userProgress.lastAccessedAt))
  }

  // Get completed topics for a user
  async getCompletedTopics(userId: string): Promise<string[]> {
    const completed = await db
      .select({ topicId: userProgress.topicId })
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.status, "completed")
        )
      )
    
    return completed.map((p) => p.topicId)
  }

  // Get progress statistics for a user
  async getProgressStats(userId: string) {
    const allProgress = await this.getUserProgress(userId)
    
    const total = allProgress.length
    const completed = allProgress.filter((p) => p.status === "completed").length
    const inProgress = allProgress.filter((p) => p.status === "in_progress").length
    const notStarted = allProgress.filter((p) => p.status === "not_started").length
    
    return {
      total,
      completed,
      inProgress,
      notStarted,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    }
  }

  // Mark topic as completed
  async markCompleted(userId: string, topicId: string): Promise<UserProgress> {
    return this.upsertProgress({
      userId,
      topicId,
      status: "completed",
      completedAt: new Date(),
    })
  }

  // Update last accessed
  async updateLastAccessed(userId: string, topicId: string): Promise<void> {
    await db
      .update(userProgress)
      .set({ lastAccessedAt: new Date() })
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.topicId, topicId)
        )
      )
  }
}

export const progressService = new ProgressService()

