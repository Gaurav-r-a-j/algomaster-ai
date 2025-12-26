import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { env } from "@/config/common/env"
import * as schema from "./schema"

neonConfig.fetchConnectionCache = true

const databaseUrl = env.DATABASE_URL

if (!databaseUrl && env.NODE_ENV === "production") {
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
