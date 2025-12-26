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
// Note: adapter is only used when db is available (database mode)
export const authConfig: NextAuthConfig = {
  adapter: db ? DrizzleAdapter(db) : undefined,
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
        // Add GitHub username from account (only if db is available)
        if (db) {
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
            // Add GitHub username to session (type extended in types/next-auth.d.ts)
            session.user.githubUsername = account.providerAccountId
          }
        }
      }
      return session
    },
  },
  session: {
    strategy: "database", // Use database sessions
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  // Security settings
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" 
        ? "__Secure-next-auth.session-token" 
        : "next-auth.session-token",
      options: {
        httpOnly: true, // Prevent XSS
        sameSite: "lax", // CSRF protection
        path: "/",
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
      },
    },
  },
}

