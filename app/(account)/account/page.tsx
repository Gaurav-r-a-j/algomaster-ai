import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/common/container"
import { PageHeader } from "@/components/common/page-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"

export default function AccountPage() {
  return (
    <Container className="py-8">
      <PageHeader
        title="Account Settings"
        description="Manage your account preferences and settings"
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Update your profile information and preferences
            </p>
            <Button asChild>
              <Link href={ROUTES.PROFILE}>Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage your subscription and billing information
            </p>
            <Button asChild variant="outline">
              <Link href={ROUTES.BILLING}>View Billing</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Configure your notification preferences
            </p>
            <Button asChild variant="outline">
              <Link href={ROUTES.NOTIFICATIONS}>Manage Notifications</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              View and manage your subscription plan
            </p>
            <Button asChild variant="outline">
              <Link href={ROUTES.SUBSCRIPTION}>View Subscription</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  )
}
