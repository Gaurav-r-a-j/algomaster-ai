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

const componentCategories = [
  {
    title: "Common Components",
    description: "Reusable components for consistent UI patterns",
    href: `${ROUTES.DOCS}/components/common`,
    components: [
      { name: "Container", slug: "container" },
      { name: "Section", slug: "section" },
      { name: "PageHeader", slug: "page-header" },
      { name: "EmptyState", slug: "empty-state" },
      { name: "IconWrapper", slug: "icon-wrapper" },
      { name: "LoadingSpinner", slug: "loading-spinner" },
      { name: "ErrorMessage", slug: "error-message" },
      { name: "SuccessMessage", slug: "success-message" },
      { name: "CardWrapper", slug: "card-wrapper" },
      { name: "AdaptiveWrapper", slug: "adaptive-wrapper" },
    ],
  },
  {
    title: "Form Components",
    description: "Form fields with react-hook-form integration",
    href: `${ROUTES.DOCS}/components/forms`,
    components: [
      { name: "Form", slug: "form" },
      { name: "InputField", slug: "input-field" },
      { name: "TextareaField", slug: "textarea-field" },
      { name: "SelectField", slug: "select-field" },
      { name: "FormField", slug: "form-field" },
    ],
  },
  {
    title: "UI Components",
    description: "Base UI components from shadcn/ui",
    href: `${ROUTES.DOCS}/components/ui`,
    components: [
      { name: "Button", slug: "button" },
      { name: "Card", slug: "card" },
      { name: "Input", slug: "input" },
      { name: "Select", slug: "select" },
      { name: "Badge", slug: "badge" },
    ],
  },
]

export const dynamic = "force-dynamic"

export default function ComponentsDocsPage() {
  return (
    <Section className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">Components Documentation</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive documentation for all reusable components in the
            design system.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {componentCategories.map((category) => (
            <Card key={category.title} className="h-full">
              <CardHeader>
                <CardTitle>
                  <Link href={category.href} className="hover:underline">
                    {category.title}
                  </Link>
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.components.map((component) => (
                    <li key={component.slug}>
                      <Link
                        href={`${ROUTES.DOCS}/components/${component.slug}`}
                        className="text-muted-foreground hover:text-foreground text-sm hover:underline"
                      >
                        • {component.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
