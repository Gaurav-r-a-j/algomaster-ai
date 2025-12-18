import type { Metadata } from "next"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { getFirstTopicUrl } from "@/utils/curriculum"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { LandingNav } from "@/components/features/marketing/landing-nav"
import { LandingFooter } from "@/components/features/marketing/landing-footer"

export const metadata: Metadata = {
  title: "Contact | AlgoMaster AI",
  description: "Get in touch with AlgoMaster AI",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      <main className="flex-1">
        <Section className="py-20 md:py-32">
          <Container>
            <div className="mx-auto max-w-2xl">
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                Get in Touch
              </h1>
              <p className="text-muted-foreground mb-12 text-lg leading-relaxed">
                Have questions or feedback? We'd love to hear from you!
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold">Email</h3>
                    <p className="text-muted-foreground text-sm">
                      support@algomaster.ai
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">GitHub</h3>
                    <p className="text-muted-foreground text-sm">
                      Visit our repository for issues and contributions
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href={getFirstTopicUrl()}>Start Learning</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <LandingFooter />
    </div>
  )
}
