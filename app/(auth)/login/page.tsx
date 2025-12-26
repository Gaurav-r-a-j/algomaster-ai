"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { AuthCard } from "@/components/features/auth/auth-card"
import { GitHubAuthButton } from "@/components/features/auth/github-auth-button"

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to continue your learning journey"
      footer={
        <>
          Don't have an account?{" "}
          <Link href={ROUTES.REGISTER} className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </>
      }
    >
      <GitHubAuthButton action="signin" />
    </AuthCard>
  )
}

