import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IconWrapper, LoadingSpinner, MarkdownRenderer, PageHeader } from "@/components/common";
import { EmptyStateExample } from "@/components/features/design-system/empty-state-example";
import { PageHeaderExample } from "@/components/features/design-system/page-header-example";
import { Home01Icon } from "@/lib/icons";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { readFile } from "fs/promises";
import { join } from "path";

async function getCommonComponentsDoc(): Promise<string> {
  try {
    const filePath = join(process.cwd(), "docs", "components", "common-components.md");
    const content = await readFile(filePath, "utf-8");
    return content;
  } catch {
    return "";
  }
}

export const dynamic = "force-dynamic";

export default async function CommonComponentsDocsPage() {
  const markdownContent = await getCommonComponentsDoc();
  return (
    <Section className="py-12">
      <Container>
        <PageHeader
          title="Common Components"
          description="Reusable components for consistent UI patterns across the application"
        />

        {markdownContent && (
          <div className="mt-8 mb-12">
            <MarkdownRenderer content={markdownContent} />
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Individual Component Documentation</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
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
            ].map((component) => (
              <Link
                key={component.slug}
                href={`${ROUTES.DOCS}/components/${component.slug}`}
                className="block p-4 border rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-semibold">{component.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">View documentation →</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-12 mt-12">
          {/* Container */}
          <Card>
            <CardHeader>
              <CardTitle>Container</CardTitle>
              <CardDescription>
                Responsive container component with preset sizes (sm, md, lg, xl, full)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Props</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><code>size</code>: &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;full&quot; (default: &quot;xl&quot;)</li>
                    <li><code>className</code>: Additional CSS classes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example</h4>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`import { Container } from "@/components/common/container";

<Container size="lg">
  Content here
</Container>`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section */}
          <Card>
            <CardHeader>
              <CardTitle>Section</CardTitle>
              <CardDescription>
                Page section component with consistent spacing and optional container wrapper
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Props</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><code>spacing</code>: &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; (default: &quot;md&quot;)</li>
                    <li><code>containerSize</code>: Optional container size</li>
                    <li><code>id</code>: Section ID for anchor navigation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Example</h4>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
{`import { Section } from "@/components/common/section";

<Section spacing="lg" id="features">
  Content here
</Section>`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PageHeader */}
          <Card>
            <CardHeader>
              <CardTitle>PageHeader</CardTitle>
              <CardDescription>
                Consistent page header with title, description, and optional actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Props</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><code>title</code>: string (required)</li>
                    <li><code>description</code>: string</li>
                    <li><code>actions</code>: ReactNode</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Live Example</h4>
                  <PageHeaderExample />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EmptyState */}
          <Card>
            <CardHeader>
              <CardTitle>EmptyState</CardTitle>
              <CardDescription>
                Component for displaying empty states with optional action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Props</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><code>title</code>: string (required)</li>
                    <li><code>description</code>: string</li>
                    <li><code>action</code>: {`{ label: string; onClick: () => void }`}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Live Example</h4>
                  <EmptyStateExample />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IconWrapper */}
          <Card>
            <CardHeader>
              <CardTitle>IconWrapper</CardTitle>
              <CardDescription>
                Wrapper for consistent icon sizing. Works with Huge Icons and Hero Icons.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Props</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><code>icon</code>: ComponentType | IconSvgObject (required)</li>
                    <li><code>size</code>: &quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | number</li>
                    <li><code>className</code>: Additional CSS classes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Live Example</h4>
                  <div className="flex gap-4 items-center">
                    <IconWrapper icon={Home01Icon} size="xs" className="text-primary" />
                    <IconWrapper icon={Home01Icon} size="sm" className="text-primary" />
                    <IconWrapper icon={Home01Icon} size="md" className="text-primary" />
                    <IconWrapper icon={Home01Icon} size="lg" className="text-primary" />
                    <IconWrapper icon={Home01Icon} size="xl" className="text-primary" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* LoadingSpinner */}
          <Card>
            <CardHeader>
              <CardTitle>LoadingSpinner</CardTitle>
              <CardDescription>
                Loading spinner component with different sizes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Props</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><code>size</code>: &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; (default: &quot;md&quot;)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Live Example</h4>
                  <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <LoadingSpinner size="sm" />
                      <span className="text-xs text-muted-foreground">Small</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <LoadingSpinner size="md" />
                      <span className="text-xs text-muted-foreground">Medium</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <LoadingSpinner size="lg" />
                      <span className="text-xs text-muted-foreground">Large</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

