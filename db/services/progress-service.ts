import { and, desc, eq } from "drizzle-orm"
import { db, isDatabaseAvailable } from "../index"
import { type NewUserProgress, type UserProgress, userProgress } from "../schema"
import { validateUserAccess } from "@/lib/security/auth-guard"

export class ProgressService {
  // Create or update user progress
  async upsertProgress(
    data: NewUserProgress,
    authenticatedUserId: string
  ): Promise<UserProgress> {
    if (!isDatabaseAvailable || !db) {
      throw new Error("Database not available - app running in client-side only mode")
    }
    
    validateUserAccess(data.userId, authenticatedUserId)
    
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
  async getProgress(
    userId: string,
    topicId: string,
    authenticatedUserId: string
  ): Promise<UserProgress | null> {
    if (!isDatabaseAvailable || !db) {
      throw new Error("Database not available - app running in client-side only mode")
    }
    
    validateUserAccess(userId, authenticatedUserId)
    
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
  async getUserProgress(
    userId: string,
    authenticatedUserId: string
  ): Promise<UserProgress[]> {
    if (!isDatabaseAvailable || !db) {
      throw new Error("Database not available - app running in client-side only mode")
    }
    
    validateUserAccess(userId, authenticatedUserId)
    
    return db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId))
      .orderBy(desc(userProgress.lastAccessedAt))
  }

  // Get completed topics for a user
  async getCompletedTopics(
    userId: string,
    authenticatedUserId: string
  ): Promise<string[]> {
    if (!isDatabaseAvailable || !db) {
      throw new Error("Database not available - app running in client-side only mode")
    }
    
    validateUserAccess(userId, authenticatedUserId)
    
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
  async getProgressStats(userId: string, authenticatedUserId: string) {
    const allProgress = await this.getUserProgress(userId, authenticatedUserId)
    
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
  async markCompleted(
    userId: string,
    topicId: string,
    authenticatedUserId: string
  ): Promise<UserProgress> {
    return this.upsertProgress(
      {
        userId,
        topicId,
        status: "completed",
        completedAt: new Date(),
      },
      authenticatedUserId
    )
  }

  // Update last accessed timestamp
  async updateLastAccessed(
    userId: string,
    topicId: string,
    authenticatedUserId: string
  ): Promise<void> {
    if (!isDatabaseAvailable || !db) {
      throw new Error("Database not available - app running in client-side only mode")
    }
    
    validateUserAccess(userId, authenticatedUserId)
    
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

