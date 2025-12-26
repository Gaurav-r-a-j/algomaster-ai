import { pgTable, text, timestamp, uuid, boolean, integer, pgEnum, index } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Enums
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "moderator"])
export const topicStatusEnum = pgEnum("topic_status", ["not_started", "in_progress", "completed"])
export const userSourceEnum = pgEnum("user_source", ["organic", "referral", "social", "ad", "partner"])
export const authProviderEnum = pgEnum("auth_provider", ["github", "linkedin"]) // GitHub (now), LinkedIn (future)
export const categoryIdEnum = pgEnum("category_id", ["dsa", "frontend", "system-design", "backend", "database", "devops", "mobile"])

// Users Table - Detailed user information for engagement and community
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  
  // Authentication & Basic Info
  email: text("email").notNull().unique(),
  name: text("name"), // Display name
  role: userRoleEnum("role").default("user").notNull(),
  
  // GitHub username (auto-populated from OAuth, for contributions)
  githubUsername: text("github_username"), // GitHub username (for open source contributions)
  
  // Engagement & Growth (Simple)
  source: userSourceEnum("source").default("organic"), // How they found us
  referralCode: text("referral_code"), // Their unique referral code (for growth)
  referredBy: uuid("referred_by"), // Who referred them (for tracking)
  
  // Engagement Tracking
  lastActiveAt: timestamp("last_active_at").defaultNow().notNull(), // Last activity timestamp
  totalSessions: integer("total_sessions").default(0).notNull(), // Total login sessions
  streakDays: integer("streak_days").default(0).notNull(), // Learning streak
  longestStreak: integer("longest_streak").default(0).notNull(), // Best streak
  
  // Preferences (Essential ones only - rest in localStorage)
  preferredLanguage: text("preferred_language").default("en"), // Language preference
  
  // Metadata
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  emailIdx: index("email_idx").on(table.email),
  referralCodeIdx: index("referral_code_idx").on(table.referralCode),
  referredByIdx: index("referred_by_idx").on(table.referredBy),
  lastActiveIdx: index("last_active_idx").on(table.lastActiveAt),
}))

// Accounts Table - OAuth providers (NextAuth pattern)
export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  provider: authProviderEnum("provider").notNull(), // github (now), linkedin (future)
  providerAccountId: text("provider_account_id").notNull(), // OAuth provider's user ID
  accessToken: text("access_token"), // OAuth access token
  refreshToken: text("refresh_token"), // OAuth refresh token
  expiresAt: timestamp("expires_at"), // Token expiration
  tokenType: text("token_type"),
  scope: text("scope"),
  idToken: text("id_token"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("accounts_user_id_idx").on(table.userId),
  providerIdx: index("accounts_provider_idx").on(table.provider, table.providerAccountId), // Unique per provider
}))

// Sessions Table - NextAuth sessions
export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  sessionToken: text("session_token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index("sessions_user_id_idx").on(table.userId),
  sessionTokenIdx: index("sessions_token_idx").on(table.sessionToken),
}))

// Verification Tokens - REMOVED
// Not needed for OAuth-only authentication (GitHub, LinkedIn)
// NextAuth doesn't require this table for OAuth providers

// Topics Table - Topic metadata (content stays in code/MDX files)
// This table manages which topics exist, their order, visibility, etc.
// Content (MDX, quizzes) stays in code for easy contributions
export const topics = pgTable("topics", {
  id: text("id").primaryKey(), // Topic ID (e.g., "bubble-sort", "react-hooks")
  categoryId: categoryIdEnum("category_id").default("dsa").notNull(), // dsa, frontend, system-design, etc.
  title: text("title").notNull(), // Topic title
  description: text("description"), // Short description
  module: text("module"), // Module name (e.g., "Module 1: Foundations")
  order: integer("order").notNull(), // Display order within category
  difficulty: text("difficulty"), // Easy, Medium, Hard
  enabled: boolean("enabled").default(true).notNull(), // Show/hide topic
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  categoryIdIdx: index("topics_category_id_idx").on(table.categoryId),
  categoryOrderIdx: index("topics_category_order_idx").on(table.categoryId, table.order),
  enabledIdx: index("topics_enabled_idx").on(table.enabled),
}))

// User Progress Table - Essential for tracking learning (category-aware)
export const userProgress = pgTable("user_progress", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  topicId: text("topic_id").notNull().references(() => topics.id, { onDelete: "cascade" }), // Reference to topics table
  status: topicStatusEnum("status").default("not_started").notNull(),
  completedAt: timestamp("completed_at"), // Only set when completed
  lastAccessedAt: timestamp("last_accessed_at").defaultNow().notNull(), // For "continue learning"
}, (table) => ({
  userIdIdx: index("user_progress_user_id_idx").on(table.userId),
  topicIdIdx: index("user_progress_topic_id_idx").on(table.topicId),
  userTopicIdx: index("user_progress_user_topic_idx").on(table.userId, table.topicId), // Unique constraint
}))

// Quiz Attempts Table - OPTIONAL: only best score per topic
// Space: ~100 bytes per topic per user (50 topics = 5 KB per user)
// 
// DECISION: Keep it - provides valuable gamification data
// Alternative: Remove and calculate from progress status only
// 
// If you want to remove: Delete this table and update quiz-service.ts
export const quizAttempts = pgTable("quiz_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  topicId: text("topic_id").notNull().references(() => topics.id, { onDelete: "cascade" }), // Reference to topics table
  score: integer("score").notNull(), // Best score (0-100)
  completedAt: timestamp("completed_at").defaultNow().notNull(), // When best score achieved
}, (table) => ({
  userIdIdx: index("quiz_attempts_user_id_idx").on(table.userId),
  topicIdIdx: index("quiz_attempts_topic_id_idx").on(table.topicId),
  userTopicIdx: index("quiz_attempts_user_topic_idx").on(table.userId, table.topicId), // Unique: one best score per user/topic
}))

// Topic Videos Table - YouTube video links with language support
export const topicVideos = pgTable("topic_videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  topicId: text("topic_id").notNull().references(() => topics.id, { onDelete: "cascade" }),
  language: text("language").notNull().default("en"), // Language code: en, hi, etc.
  videoUrl: text("video_url").notNull(), // YouTube URL
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  topicIdIdx: index("topic_videos_topic_id_idx").on(table.topicId),
  topicLanguageIdx: index("topic_videos_topic_language_idx").on(table.topicId, table.language),
  // Unique constraint: one video per topic per language (enforced in application layer via upsert logic)
}))

// Note: Groups are managed externally (WhatsApp, Discord, etc.)
// We only track referral codes for community growth
// No need for complex group management in database

// Relations
export const topicsRelations = relations(topics, ({ many }) => ({
  progress: many(userProgress),
  quizAttempts: many(quizAttempts),
  videos: many(topicVideos),
}))

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  progress: many(userProgress),
  quizAttempts: many(quizAttempts),
  referrer: one(users, {
    fields: [users.referredBy],
    references: [users.id],
    relationName: "referrer",
  }),
  referrals: many(users, {
    relationName: "referrer",
  }),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}))

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
  topic: one(topics, {
    fields: [userProgress.topicId],
    references: [topics.id],
  }),
}))

export const quizAttemptsRelations = relations(quizAttempts, ({ one }) => ({
  user: one(users, {
    fields: [quizAttempts.userId],
    references: [users.id],
  }),
  topic: one(topics, {
    fields: [quizAttempts.topicId],
    references: [topics.id],
  }),
}))

export const topicVideosRelations = relations(topicVideos, ({ one }) => ({
  topic: one(topics, {
    fields: [topicVideos.topicId],
    references: [topics.id],
  }),
}))


// Type exports
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Account = typeof accounts.$inferSelect
export type NewAccount = typeof accounts.$inferInsert
export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert
export type Topic = typeof topics.$inferSelect
export type NewTopic = typeof topics.$inferInsert
export type UserProgress = typeof userProgress.$inferSelect
export type NewUserProgress = typeof userProgress.$inferInsert
export type QuizAttempt = typeof quizAttempts.$inferSelect
export type NewQuizAttempt = typeof quizAttempts.$inferInsert
export type TopicVideo = typeof topicVideos.$inferSelect
export type NewTopicVideo = typeof topicVideos.$inferInsert
