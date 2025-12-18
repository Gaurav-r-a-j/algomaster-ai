import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { getFirstTopicUrl } from "@/utils/curriculum"

import { HeroArrowRightIcon, StarIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/common/container"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { Section } from "@/components/common/section"

export function HeroSection() {
  return (
    <Section className="from-background via-background to-muted/20 bg-gradient-to-b py-20 md:py-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-primary/10 text-primary animate-in fade-in mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium duration-500">
            <IconWrapper icon={StarIcon} size={16} />
            <span>Production Ready Template</span>
          </div>

          <h1 className="from-foreground via-foreground to-foreground/70 animate-in fade-in slide-in-from-bottom-4 mb-6 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent duration-700 md:text-6xl lg:text-7xl">
            Build Amazing Products
          </h1>

          <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-6 mx-auto mb-12 max-w-2xl text-xl leading-relaxed duration-1000 md:text-2xl">
            A modern, scalable template built with Next.js 16, TypeScript,
            Tailwind CSS, and best practices. Ready to customize for your next
            project.
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-8 flex flex-col items-center justify-center gap-4 delay-300 duration-1000 sm:flex-row">
            <Button size="lg" asChild className="group w-full sm:w-auto">
              <Link href={getFirstTopicUrl()}>
                Get Started
                <HeroArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href={ROUTES.DESIGN_SYSTEM}>View Design System</Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href={ROUTES.FEATURES}>Learn More</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
