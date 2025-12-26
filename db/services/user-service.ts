import { eq } from "drizzle-orm"
import { db } from "../index"
import { type NewUser, type User, users } from "../schema"

// Note: Services should only be used server-side where db is always available
// If DATABASE_URL is not set, db will be null and these will throw
// This is intentional - services require a database connection

export class UserService {
  // Create a new user with referral code generation
  async createUser(data: NewUser): Promise<User> {
    if (!db) {throw new Error("Database not available")}
    const [user] = await db.insert(users).values({
      ...data,
      // Generate referral code if not provided
      referralCode: data.referralCode || this.generateReferralCode(data.email),
    }).returning()
    return user
  }

  // Generate unique referral code
  private generateReferralCode(email: string): string {
    const prefix = email.split("@")[0].toUpperCase().slice(0, 4)
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `${prefix}${random}`
  }

  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    if (!db) {throw new Error("Database not available")}
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1)
    return user || null
  }

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    if (!db) {throw new Error("Database not available")}
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
    return user || null
  }

  // Get user by referral code
  async getUserByReferralCode(code: string): Promise<User | null> {
    if (!db) {throw new Error("Database not available")}
    const [user] = await db.select().from(users).where(eq(users.referralCode, code)).limit(1)
    return user || null
  }

  // Update user
  async updateUser(id: string, data: Partial<Omit<User, "id" | "createdAt">>): Promise<User | null> {
    if (!db) {throw new Error("Database not available")}
    const [updated] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
    
    return updated || null
  }

  // Update last active timestamp
  async updateLastActive(userId: string): Promise<void> {
    if (!db) {throw new Error("Database not available")}
    const user = await this.getUserById(userId)
    if (!user) {return}

    await db
      .update(users)
      .set({ 
        lastActiveAt: new Date(),
        totalSessions: user.totalSessions + 1,
      })
      .where(eq(users.id, userId))
  }

  // Update learning streak
  async updateStreak(userId: string, increment: boolean = true): Promise<void> {
    if (!db) {throw new Error("Database not available")}
    const user = await this.getUserById(userId)
    if (!user) {return}

    const newStreak = increment ? user.streakDays + 1 : 0
    const longestStreak = Math.max(user.longestStreak, newStreak)

    await db
      .update(users)
      .set({
        streakDays: newStreak,
        longestStreak,
      })
      .where(eq(users.id, userId))
  }

  // Get user referrals (users referred by this user)
  async getUserReferrals(userId: string): Promise<User[]> {
    if (!db) {throw new Error("Database not available")}
    return db
      .select()
      .from(users)
      .where(eq(users.referredBy, userId))
  }

  // Get referral stats
  async getReferralStats(userId: string) {
    const referrals = await this.getUserReferrals(userId)
    return {
      totalReferrals: referrals.length,
      activeReferrals: referrals.filter(u => {
        const daysSinceActive = (Date.now() - u.lastActiveAt.getTime()) / (1000 * 60 * 60 * 24)
        return daysSinceActive < 30
      }).length,
    }
  }

  // Search users (for community features)
  async searchUsers(query: string, limit: number = 10): Promise<User[]> {
    if (!db) {throw new Error("Database not available")}
    const allUsers = await db.select().from(users)
    const searchLower = query.toLowerCase()
    
    return allUsers
      .filter(user => 
        user.name?.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.githubUsername?.toLowerCase().includes(searchLower)
      )
      .slice(0, limit)
  }

  // Get active users (for engagement tracking)
  async getActiveUsers(days: number = 7): Promise<User[]> {
    if (!db) {throw new Error("Database not available")}
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    const allUsers = await db.select().from(users)
    return allUsers
      .filter(user => user.lastActiveAt >= cutoffDate)
      .sort((a, b) => b.lastActiveAt.getTime() - a.lastActiveAt.getTime())
  }

  // Delete user
  async deleteUser(id: string): Promise<boolean> {
    if (!db) {throw new Error("Database not available")}
    const result = await db.delete(users).where(eq(users.id, id))
    return result.rowCount > 0
  }
}

export const userService = new UserService()
