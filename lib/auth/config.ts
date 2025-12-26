// NextAuth.js Configuration - GitHub Only (Developer-Focused)
// NextAuth.js Configuration - GitHub Only (Developer-Focused)
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import { db } from "@/db"
import { accounts } from "@/db/schema"
import { eq, and } from "drizzle-orm"

// Simple auth config - GitHub only for developers
// Configured for future extensibility with proper scopes
export const authConfig: NextAuthConfig = {
  adapter: DrizzleAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true, // Allow linking accounts with same email
      // Scopes for future extensibility:
      // - user:email (default) - Get user email
      // - read:user (default) - Read user profile
      // Additional scopes can be added here if needed:
      // authorization: { params: { scope: "user:email read:user" } }
    }),
    // Only GitHub - no email/password for simplicity
    // Future: Can add LinkedIn, Google, etc. here
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        // Add GitHub username from account
        const [account] = await db
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.userId, user.id),
              eq(accounts.provider, "github")
            )
          )
          .limit(1)
        
        if (account?.providerAccountId) {
          session.user.githubUsername = account.providerAccountId
        }
      }
      return session
    },
  },
  session: {
    strategy: "database", // Use database sessions
  },
}

