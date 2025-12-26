import { ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/common/logo"

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="w-full space-y-6">
      <div className="flex justify-center">
        <Logo />
      </div>
      
      <Card>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
          <p className="text-muted-foreground text-center text-sm">
            By {title.toLowerCase().includes("sign in") ? "signing in" : "signing up"}, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>

      {footer && (
        <div className="text-muted-foreground text-center text-sm">
          {footer}
        </div>
      )}
    </div>
  )
}

