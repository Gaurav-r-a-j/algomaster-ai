"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import "highlight.js/styles/github-dark.css"

import { CodePreview } from "./code-preview"
import { getPreviewComponent } from "./preview-registry"

interface MarkdownRendererProps {
  content: string
  className?: string
}

// MarkdownRenderer - Component to render markdown content with syntax highlighting
// Uses remark-gfm for GitHub flavored markdown
// Uses rehype-highlight for syntax highlighting (client-compatible)
// Uses rehype-slug and rehype-autolink-headings for heading links
// Example: <MarkdownRenderer content={markdownContent} />
export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div
      className={`prose prose-slate dark:prose-invert w-full max-w-none ${className || ""}`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor"],
              },
            },
          ],
          rehypeHighlight,
        ]}
        components={{
          h1: ({ ...props }: any) => (
            <h1
              className="text-foreground border-border mt-0 mb-6 scroll-mt-24 border-b pb-4 text-3xl font-bold tracking-tight md:text-4xl"
              {...props}
            />
          ),
          h2: ({ ...props }: any) => (
            <h2
              className="text-foreground border-border mt-10 mb-4 scroll-mt-24 border-t pt-6 text-2xl font-bold tracking-tight first:mt-0 first:border-t-0 first:pt-0 md:text-3xl"
              {...props}
            />
          ),
          h3: ({ ...props }: any) => (
            <h3
              className="text-foreground mt-8 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight md:text-2xl"
              {...props}
            />
          ),
          h4: ({ ...props }: any) => (
            <h4
              className="text-foreground mt-6 mb-2 scroll-mt-24 text-lg font-semibold tracking-tight md:text-xl"
              {...props}
            />
          ),
          p: ({ ...props }: any) => (
            <p
              className="text-foreground/90 mb-5 text-base leading-relaxed md:text-lg"
              {...props}
            />
          ),
          ul: ({ ...props }: any) => (
            <ul
              className="text-foreground mb-5 ml-6 list-outside list-disc space-y-2.5 text-base md:text-lg"
              {...props}
            />
          ),
          ol: ({ ...props }: any) => (
            <ol
              className="text-foreground mb-5 ml-6 list-outside list-decimal space-y-2.5 text-base md:text-lg"
              {...props}
            />
          ),
          li: ({ ...props }: any) => (
            <li
              className="text-foreground/90 mb-2 pl-1 leading-relaxed"
              {...props}
            />
          ),
          a: ({ ...props }: any) => (
            <a
              className="text-primary font-medium transition-colors hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          blockquote: ({ ...props }: any) => (
            <blockquote
              className="border-primary/50 bg-primary/5 text-foreground/80 my-6 rounded-r-lg border-l-4 py-3 pr-4 pl-6 italic"
              {...props}
            />
          ),
          hr: ({ ...props }: any) => (
            <hr className="border-border my-8" {...props} />
          ),
          table: ({ ...props }: any) => (
            <div className="my-4 overflow-x-auto">
              <table
                className="border-border min-w-full border-collapse rounded-lg border"
                {...props}
              />
            </div>
          ),
          th: ({ ...props }: any) => (
            <th
              className="border-border bg-muted text-foreground border p-3 text-left font-semibold"
              {...props}
            />
          ),
          td: ({ ...props }: any) => (
            <td
              className="border-border text-foreground/90 border p-3"
              {...props}
            />
          ),
          strong: ({ ...props }: any) => (
            <strong className="text-foreground font-semibold" {...props} />
          ),
          em: ({ ...props }: any) => (
            <em className="text-foreground/90 italic" {...props} />
          ),
          pre: ({ children, ...props }: any) => {
            // Check if this is a code block with preview
            const codeElement = React.Children.toArray(children).find(
              (child: any) => child?.type === "code"
            ) as any

            if (codeElement?.props?.className) {
              const className = codeElement.props.className
              const languageMatch = className.match(
                /language-([^:]+)(:preview)?/
              )

              if (languageMatch && languageMatch[2] === ":preview") {
                // This is a preview code block
                const language = languageMatch[1]
                const code = String(codeElement.props.children || "").trim()

                // Try to render a preview from the code
                let preview: React.ReactNode = null

                // Simple JSX parser for common patterns
                if (language === "tsx" || language === "jsx") {
                  // Try to extract component usage and render it
                  const jsxMatch = code.match(/<(\w+)([^>]*)>([\s\S]*?)<\/\1>/)
                  if (jsxMatch) {
                    const componentName = jsxMatch[1]
                    const Component = getPreviewComponent(componentName)

                    if (Component) {
                      // Parse props (simple implementation)
                      const propsString = jsxMatch[2]
                      const props: Record<string, any> = {}

                      // Extract props like variant="default" or size="lg"
                      const propMatches = propsString.matchAll(
                        /(\w+)=["']([^"']+)["']/g
                      )
                      for (const match of propMatches) {
                        props[match[1]] = match[2]
                      }

                      // Extract children
                      const childrenText = jsxMatch[3]?.trim()
                      if (childrenText) {
                        props.children = childrenText
                      }

                      preview = <Component {...props} />
                    }
                  }
                }

                return (
                  <CodePreview
                    code={code}
                    language={language}
                    preview={preview || undefined}
                    className="my-4"
                  />
                )
              }
            }

            // Regular code block
            return (
              <pre
                className="bg-muted border-border my-4 overflow-x-auto rounded-lg border p-4 font-mono text-sm"
                {...props}
              >
                {children}
              </pre>
            )
          },
          code: ({ className, children, ...props }: any) => {
            const isInline = !className || !className.includes("language-")
            if (isInline) {
              return (
                <code
                  className="bg-muted text-primary border-border/50 rounded border px-1.5 py-0.5 font-mono text-sm"
                  {...props}
                >
                  {children}
                </code>
              )
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
