import { eq, and, desc } from "drizzle-orm"
import { type NewQuizAttempt } from "../schema"
import { db } from "../index"
import { quizAttempts, type NewQuizAttempt, type QuizAttempt } from "../schema"

export class QuizService {
  // Create a quiz attempt
  async createAttempt(data: NewQuizAttempt): Promise<QuizAttempt> {
    const [attempt] = await db.insert(quizAttempts).values(data).returning()
    return attempt!
  }

  // Get quiz attempts for a user and topic
  async getAttempts(userId: string, topicId: string): Promise<QuizAttempt[]> {
    return db
      .select()
      .from(quizAttempts)
      .where(
        and(
          eq(quizAttempts.userId, userId),
          eq(quizAttempts.topicId, topicId)
        )
      )
      .orderBy(desc(quizAttempts.completedAt))
  }

  // Get best attempt for a user and topic
  async getBestAttempt(userId: string, topicId: string): Promise<QuizAttempt | null> {
    const attempts = await this.getAttempts(userId, topicId)
    if (attempts.length === 0) return null
    
    // Since we only store best score, return the first (and only) attempt
    return attempts[0]
  }

  // Get all attempts for a user
  async getUserAttempts(userId: string): Promise<QuizAttempt[]> {
    return db
      .select()
      .from(quizAttempts)
      .where(eq(quizAttempts.userId, userId))
      .orderBy(desc(quizAttempts.completedAt))
  }

  // Check if user has passed a quiz
  async hasPassed(userId: string, topicId: string, passingScore: number = 70): Promise<boolean> {
    const bestAttempt = await this.getBestAttempt(userId, topicId)
    if (!bestAttempt) return false
    return bestAttempt.score >= passingScore
  }

  // Upsert quiz attempt - keep only best score per user/topic
  async upsertBestAttempt(data: NewQuizAttempt): Promise<QuizAttempt> {
    const existing = await this.getBestAttempt(data.userId, data.topicId)
    
    if (existing) {
      // Only update if new score is better
      if (data.score > existing.score) {
        const [updated] = await db
          .update(quizAttempts)
          .set({
            score: data.score,
            completedAt: new Date(),
          })
          .where(eq(quizAttempts.id, existing.id))
          .returning()
        
        return updated!
      }
      
      return existing
    }
    
    // Create new attempt
    return this.createAttempt(data)
  }
}

export const quizService = new QuizService()

