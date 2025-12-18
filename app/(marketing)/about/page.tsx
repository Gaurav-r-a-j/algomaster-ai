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
  title: "About | AlgoMaster AI",
  description: "Learn about AlgoMaster AI - Your comprehensive DSA learning platform",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      <main className="flex-1">
        <Section className="py-20 md:py-32">
          <Container>
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                About AlgoMaster AI
              </h1>
              <p className="text-muted-foreground mb-12 text-lg leading-relaxed">
                AlgoMaster AI is a comprehensive Data Structures and Algorithms learning platform
                designed to help you master DSA concepts through interactive visualizations,
                hands-on practice, and structured learning paths.
              </p>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      To make Data Structures and Algorithms accessible to everyone through
                      interactive learning, visual explanations, and practical coding exercises.
                      We believe that understanding DSA is fundamental to becoming a better
                      programmer.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What We Offer</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="mb-2 font-semibold">Interactive Visualizations</h3>
                      <p className="text-muted-foreground text-sm">
                        Step-by-step algorithm visualizations with D3.js and React Flow to help
                        you understand how algorithms work.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Multi-Language Support</h3>
                      <p className="text-muted-foreground text-sm">
                        Code examples in JavaScript, Python, Java, and C++ for every concept.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Hands-On Practice</h3>
                      <p className="text-muted-foreground text-sm">
                        Practice problems with an integrated code editor and real-time execution.
                      </p>
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold">Knowledge Checks</h3>
                      <p className="text-muted-foreground text-sm">
                        Quiz yourself on each topic to reinforce your learning.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button asChild size="lg">
                    <Link href={getFirstTopicUrl()}>Start Learning</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href={ROUTES.FEATURES}>View Features</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <LandingFooter />
    </div>
  )
}
