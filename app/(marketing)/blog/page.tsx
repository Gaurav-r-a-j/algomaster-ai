import type { Metadata } from "next"
import Link from "next/link"
import { getFirstTopicUrl } from "@/utils/curriculum"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"
import { LandingNav } from "@/components/features/marketing/landing-nav"
import { LandingFooter } from "@/components/features/marketing/landing-footer"

export const metadata: Metadata = {
  title: "Blog | AlgoMaster AI",
  description: "DSA learning tips, tutorials, and insights",
}

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNav />
      <main className="flex-1">
        <Section className="py-20 md:py-32">
          <Container>
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
                Blog
              </h1>
              <p className="text-muted-foreground mb-12 text-lg leading-relaxed">
                DSA learning tips, algorithm explanations, and coding insights
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We&apos;re working on bringing you valuable content about Data Structures
                    and Algorithms. Check back soon!
                  </p>
                  <Button asChild>
                    <Link href={getFirstTopicUrl()}>Start Learning</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </Container>
        </Section>
      </main>
      <LandingFooter />
    </div>
  )
}
