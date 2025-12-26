import Link from "next/link"
import { ROUTES } from "@/constants/routes"

import {
  CheckmarkCircleIcon,
  HeroArrowRightIcon,
  Home01Icon,
  SearchIcon,
  SettingsIcon,
  ShieldIcon,
  StarIcon,
} from "@/lib/icons"
import { Container } from "@/components/common/container"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { Section } from "@/components/common/section"

interface Feature {
  icon: typeof Home01Icon
  title: string
  description: string
  link?: {
    href: string
    text: string
  }
}

const features: Feature[] = [
  {
    icon: Home01Icon,
    title: "Modern Stack",
    description:
      "Built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui for a robust foundation.",
  },
  {
    icon: SearchIcon,
    title: "Type-Safe",
    description:
      "Full TypeScript support with strict mode enabled for better code quality and developer experience.",
  },
  {
    icon: SettingsIcon,
    title: "Customizable",
    description:
      "Well-organized codebase with reusable components and clear architecture for easy customization.",
  },
  {
    icon: StarIcon,
    title: "Best Practices",
    description:
      "Includes ESLint, Prettier, and comprehensive documentation following industry standards.",
  },
  {
    icon: ShieldIcon,
    title: "Production Ready",
    description:
      "Optimized for performance, SEO, accessibility, and scalability right out of the box.",
  },
  {
    icon: CheckmarkCircleIcon,
    title: "Design System",
    description:
      "Complete design system with reusable components, icons, and patterns.",
    link: {
      href: ROUTES.DESIGN_SYSTEM,
      text: "Explore",
    },
  },
]

export function FeaturesGrid() {
  return (
    <Section className="py-20">
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-black tracking-tighter md:text-5xl">
            Everything You Need
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Built with modern tools and best practices for production-ready
            applications
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-card group rounded-2xl border p-10 shadow-none transition-none"
            >
              <div className="bg-muted mb-8 flex h-10 w-10 items-center justify-center rounded-xl">
                <IconWrapper
                  icon={feature.icon}
                  size={20}
                  className="text-foreground"
                />
              </div>
              <h3 className="mb-3 text-2xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
                {feature.link && (
                  <>
                    {" "}
                    <Link
                      href={feature.link.href}
                      className="text-primary inline-flex items-center gap-1 font-medium hover:underline"
                    >
                      {feature.link.text}{" "}
                      <HeroArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
