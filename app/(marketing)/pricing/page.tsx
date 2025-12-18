import type { Metadata } from "next"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { getFirstTopicUrl } from "@/utils/curriculum"
import { CheckmarkCircleIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/common/container"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { Section } from "@/components/common/section"
import { LandingNav } from "@/components/features/marketing/landing-nav"
import { LandingFooter } from "@/components/features/marketing/landing-footer"

export const metadata: Metadata = {
  title: "Pricing | AlgoMaster AI",
  description: "AlgoMaster AI is completely free. Start learning DSA today!",
}

const features = [
  "All topics and content",
  "Interactive visualizations",
  "Code examples in 4 languages",
  "Practice problems",
  "Knowledge checks",
  "Progress tracking",
]

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      <main className="flex-1">
        <Section className="py-20 md:py-32">
          <Container>
            <div className="mx-auto max-w-4xl">
              <div className="mb-16 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                  Simple, Transparent Pricing
                </h1>
                <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                  Everything you need to master DSA is completely free
                </p>
              </div>

              <div className="flex justify-center">
                <Card className="w-full max-w-md border-primary/20">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Free Forever</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">$0</span>
                      <span className="text-muted-foreground ml-2">/forever</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <IconWrapper
                            icon={CheckmarkCircleIcon}
                            size={20}
                            className="text-primary shrink-0"
                          />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild size="lg" className="w-full mt-6">
                      <Link href={getFirstTopicUrl()}>Start Learning Free</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground text-sm">
                  No credit card required. No hidden fees. Start learning today.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <LandingFooter />
    </div>
  )
}
