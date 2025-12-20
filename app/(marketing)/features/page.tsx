import type { Metadata } from "next"
import Link from "next/link"
import { getFirstTopicUrl } from "@/utils/curriculum"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { LandingNav } from "@/components/features/marketing/landing-nav"
import { LandingFooter } from "@/components/features/marketing/landing-footer"
import { FeaturesGrid } from "@/components/features/marketing/feature-card"

export const metadata: Metadata = {
  title: "Features | AlgoMaster AI",
  description: "Discover all the features of AlgoMaster AI - Interactive visualizations, multi-language support, and more",
}

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      <main className="flex-1">
        <Section className="py-20 md:py-32">
          <Container>
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                  Platform Features
                </h1>
                <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                  Everything you need to master Data Structures and Algorithms
                </p>
              </div>

              <FeaturesGrid />

              <div className="mt-12 text-center">
                <Button asChild size="lg">
                  <Link href={getFirstTopicUrl()}>Get Started</Link>
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
