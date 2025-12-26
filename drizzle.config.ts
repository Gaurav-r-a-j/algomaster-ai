import { defineConfig } from "drizzle-kit"

// Database URL is optional - app works in client-side only mode without it
// Only required when running database commands (db:push, db:generate, etc.)
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  // Allow config to be created but warn - commands will fail gracefully
  console.warn("⚠️  DATABASE_URL not set - database commands will not work")
  console.warn("   App will run in client-side only mode (localStorage)")
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl || "postgresql://placeholder", // Placeholder for config validation
  },
  verbose: true,
  strict: true,
})

