import type { Metadata } from "next"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { getFirstTopicUrl } from "@/utils/curriculum"
import { BookOpenIcon, CodeIcon, PlayIcon, SparklesIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/common/container"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { Section } from "@/components/common/section"
import { LandingNav } from "@/components/features/marketing/landing-nav"
import { LandingFooter } from "@/components/features/marketing/landing-footer"

export const metadata: Metadata = {
  title: "Features | AlgoMaster AI",
  description: "Discover all the features of AlgoMaster AI - Interactive visualizations, multi-language support, and more",
}

const features = [
  {
    icon: PlayIcon,
    title: "Interactive Visualizations",
    description: "Step-by-step algorithm visualizations with D3.js and React Flow. Watch algorithms execute in real-time with beautiful animations.",
  },
  {
    icon: CodeIcon,
    title: "Multi-Language Support",
    description: "Every code example available in JavaScript, Python, Java, and C++. Learn concepts in your preferred language.",
  },
  {
    icon: BookOpenIcon,
    title: "Structured Learning Path",
    description: "Follow a carefully curated curriculum from basics to advanced topics. Track your progress as you learn.",
  },
  {
    icon: SparklesIcon,
    title: "Knowledge Checks",
    description: "Test your understanding with quizzes for each topic. AI-powered question generation available.",
  },
]

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

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {features.map((feature, idx) => (
                  <Card key={idx} className="border-border/50">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <IconWrapper
                          icon={feature.icon}
                          size={24}
                          className="text-primary"
                        />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

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
