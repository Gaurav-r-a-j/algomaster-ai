import Link from "next/link"
import { ROUTES } from "@/constants/routes"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"

const docSections = [
  {
    title: "Components",
    description: "Comprehensive documentation for all reusable components",
    href: `${ROUTES.DOCS}/components`,
    items: ["Common Components", "Form Components", "UI Components"],
  },
  {
    title: "Getting Started",
    description: "Learn how to get started with the design system",
    href: `${ROUTES.DOCS}/getting-started`,
    items: ["Installation", "Setup", "Basic Usage"],
  },
  {
    title: "Design Tokens",
    description: "Colors, typography, spacing, and other design tokens",
    href: `${ROUTES.DOCS}/design-tokens`,
    items: ["Colors", "Typography", "Spacing", "Shadows"],
  },
]

export default function DocsPage() {
  return (
    <Section className="py-12">
      <Container>
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">Documentation</h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Comprehensive documentation for the design system, components, and
            best practices.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {docSections.map((section) => (
            <Link key={section.title} href={section.href}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="text-muted-foreground text-sm">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}
