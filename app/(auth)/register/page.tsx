"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { AuthCard } from "@/components/features/auth/auth-card"
import { GitHubAuthButton } from "@/components/features/auth/github-auth-button"

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create an account"
      description="Get started with your DSA learning journey"
      footer={
        <>
          Already have an account?{" "}
          <Link href={ROUTES.LOGIN} className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </>
      }
    >
      <GitHubAuthButton action="signup" />
    </AuthCard>
  )
}

