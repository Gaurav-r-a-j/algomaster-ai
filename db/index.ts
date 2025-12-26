// NeonDB Connection for Next.js - Best Practices
// Using @neondatabase/serverless for optimal Next.js performance

import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

// Configure Neon for Next.js serverless environment
// This optimizes connection handling for edge/serverless functions
neonConfig.fetchConnectionCache = true

// Get database URL from environment
const databaseUrl = process.env.DATABASE_URL

// Database is optional - app works in client-side only mode without it
// Progress tracking uses localStorage when database is not available
if (!databaseUrl && process.env.NODE_ENV === "production") {
  // Only warn in production, but don't throw - allow graceful degradation
  console.warn("⚠️  DATABASE_URL not set - running in client-side only mode")
}

// Create Neon HTTP client (best for Next.js serverless/edge)
// HTTP is faster and more efficient than WebSocket in serverless environments
const sql = databaseUrl ? neon(databaseUrl) : null

// Create Drizzle instance with schema
// Only create if database URL is available (for client-side only mode fallback)
// Note: Services should only be used server-side where db is always available
import type { NeonHttpDatabase } from "drizzle-orm/neon-http"
import type { ExtractTablesWithRelations } from "drizzle-orm"

type Database = NeonHttpDatabase<typeof schema> & {
  $client: ReturnType<typeof neon>
}

export const db: Database | null = sql 
  ? (drizzle(sql, { schema }) as Database)
  : null

// Export schema for use in migrations and queries
export * from "./schema"
export { sql }

// Helper to check if database is available
export const isDatabaseAvailable = !!databaseUrl && !!sql && !!db
