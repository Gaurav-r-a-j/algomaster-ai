import { readFile } from "fs/promises"
import { join } from "path"
import { notFound } from "next/navigation"

import { MarkdownRenderer } from "@/components/common/markdown-renderer"
import { DesignSystemLayout } from "@/components/features/design-system/design-system-layout"

interface DesignSystemPageProps {
  params: Promise<{ slug?: string[] }>
}

// Map slug to markdown file
const slugToMarkdown: Record<string, string> = {
  // Foundations
  icons: "icons",
  buttons: "buttons",
  badges: "badges",

  // Common Components
  "common-components": "common-components",
  container: "container",
  section: "section",
  "page-header": "page-header",
  "empty-state": "empty-state",
  "icon-wrapper": "icon-wrapper",
  "card-wrapper": "card-wrapper",
  "adaptive-wrapper": "adaptive-wrapper",
  "loading-spinner": "loading-spinner",
  "error-message": "error-message",
  "success-message": "success-message",

  // Forms
  forms: "forms",
  form: "form",
  "form-field": "form-field",
  "input-field": "input-field",
  "textarea-field": "textarea-field",
  "select-field": "select-field",
}

async function getDesignSystemContent(slug: string): Promise<string | null> {
  // For overview, return null to show default content
  if (slug === "overview" || !slug) {
    return null
  }

  const markdownFile = slugToMarkdown[slug]
  if (!markdownFile) {
    return null
  }

  try {
    const filePath = join(
      process.cwd(),
      "docs",
      "components",
      `${markdownFile}.md`
    )
    const content = await readFile(filePath, "utf-8")
    return content
  } catch {
    return null
  }
}

export default async function DesignSystemPage({
  params,
}: DesignSystemPageProps) {
  const { slug } = await params
  const sectionSlug = slug?.[0] || "overview"

  const content = await getDesignSystemContent(sectionSlug)

  // If content is null and it's not overview, show 404
  if (content === null && sectionSlug !== "overview") {
    notFound()
  }

  // If it's overview or no content, show the default overview page
  if (sectionSlug === "overview" || !content) {
    const { default: OverviewContent } = await import("../overview-content")
    return (
      <DesignSystemLayout>
        <OverviewContent />
      </DesignSystemLayout>
    )
  }



  // Otherwise render markdown content
  return (
    <DesignSystemLayout>
      <MarkdownRenderer content={content} />
    </DesignSystemLayout>
  )
}
