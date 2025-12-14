import { readFile } from "fs/promises"
import { join } from "path"
import { notFound } from "next/navigation"

import { Container } from "@/components/common/container"
import { MarkdownRenderer } from "@/components/common/markdown-renderer"
import { PageHeader } from "@/components/common/page-header"
import { Section } from "@/components/common/section"

const componentDocs = [
  "adaptive-wrapper",
  "card-wrapper",
  "container",
  "empty-state",
  "error-message",
  "form",
  "form-field",
  "icon-wrapper",
  "input-field",
  "loading-spinner",
  "page-header",
  "section",
  "select-field",
  "success-message",
  "textarea-field",
  "common-components",
  "forms",
] as const

interface ComponentDocsPageProps {
  params: Promise<{ component: string }>
}

async function getComponentDoc(component: string): Promise<string | null> {
  try {
    const filePath = join(
      process.cwd(),
      "docs",
      "components",
      `${component}.md`
    )
    const content = await readFile(filePath, "utf-8")
    return content
  } catch {
    return null
  }
}

export default async function ComponentDocsPage({
  params,
}: ComponentDocsPageProps) {
  const { component } = await params

  if (!componentDocs.includes(component as any)) {
    notFound()
  }

  const content = await getComponentDoc(component)

  if (!content) {
    notFound()
  }

  const title = component
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return (
    <Section className="py-12">
      <Container>
        <PageHeader title={title} />
        <div className="mt-8">
          <MarkdownRenderer content={content} />
        </div>
      </Container>
    </Section>
  )
}
