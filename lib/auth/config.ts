import { DrizzleAdapter } from "@auth/drizzle-adapter"
import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import { and, eq } from "drizzle-orm"
import { db } from "@/db"
import { accounts } from "@/db/schema"
import { env } from "@/config/common/env"

export const authConfig: NextAuthConfig = {
  adapter: db ? DrizzleAdapter(db) : undefined,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
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
            session.user.githubUsername = account.providerAccountId
          }
        }
      }
      return session
    },
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: env.NEXTAUTH_SECRET,
  useSecureCookies: env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" 
        ? "__Secure-next-auth.session-token" 
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
}
