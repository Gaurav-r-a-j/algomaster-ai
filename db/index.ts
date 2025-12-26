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

if (!databaseUrl) {
  // In development, allow client-side only mode
  if (process.env.NODE_ENV === "development") {
    console.warn("⚠️  DATABASE_URL not set - running in client-side only mode")
  } else {
    throw new Error("DATABASE_URL environment variable is required")
  }
}

// Create Neon HTTP client (best for Next.js serverless/edge)
// HTTP is faster and more efficient than WebSocket in serverless environments
const sql = databaseUrl ? neon(databaseUrl) : null

// Create Drizzle instance with schema
// Only create if database URL is available (for client-side only mode fallback)
// Note: Services should only be used server-side where db is always available
export const db = sql ? drizzle(sql, { schema }) : null as any

// Export schema for use in migrations and queries
export * from "./schema"
export { sql }

// Helper to check if database is available
export const isDatabaseAvailable = !!databaseUrl && !!sql && !!db
