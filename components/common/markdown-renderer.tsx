/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import ReactMarkdown from "react-markdown"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import "highlight.js/styles/github-dark.css"

import { cn } from "@/lib/utils"

import { CodeBlock, SimpleCodeBlock } from "./code-block"
import { CodePreview } from "./code-preview"
import { CopyButton } from "./copy-button"
import { getPreviewComponent } from "./preview-registry"
import { VisualDiagram } from "./visual-diagram"

interface MarkdownRendererProps {
  content: string
  className?: string
}

// Parse multi-language code block
// Format: ```multi\n[javascript]\ncode\n[python]\ncode\n```
function parseMultiLangCode(code: string): Record<string, string> | null {
  // Split by language markers ([languagename])
  const regex = /\[(\w+)\]\s*\n([\s\S]*?)(?=\[\w+\]|$)/g
  const result: Record<string, string> = {}
  
  let match
  while ((match = regex.exec(code)) !== null) {
    const lang = match[1].toLowerCase()
    const content = match[2].trim()
    if (lang && content) {
      result[lang] = content
    }
  }
  
  return Object.keys(result).length > 0 ? result : null
}

// Language display names
const LANGUAGE_NAMES: Record<string, string> = {
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TypeScript",
  jsx: "JavaScript",
  py: "Python",
  python: "Python",
  java: "Java",
  cpp: "C++",
  c: "C",
  cs: "C#",
  csharp: "C#",
  go: "Go",
  rust: "Rust",
  rb: "Ruby",
  ruby: "Ruby",
  php: "PHP",
  swift: "Swift",
  kotlin: "Kotlin",
  sql: "SQL",
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  json: "JSON",
  yaml: "YAML",
  yml: "YAML",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  md: "Markdown",
  markdown: "Markdown",
}

// Languages that should show copy button (actual programming languages)
const COPYABLE_LANGUAGES = new Set([
  "js", "javascript", "ts", "typescript", "tsx", "jsx",
  "py", "python", "java", "cpp", "c", "cs", "csharp",
  "go", "rust", "rb", "ruby", "php", "swift", "kotlin",
  "sql", "bash", "sh", "shell", "json", "yaml", "yml",
  "html", "css", "scss"
])

// Check if code is likely ASCII art/diagram (not actual code)
function isAsciiDiagram(code: string): boolean {
  const lines = code.split('\n')
  // Check for common ASCII art patterns
  const hasBoxChars = /[┌┐└┘├┤┬┴┼─│╱╲▭▱◇⬭⬡→↓↑←]/.test(code)
  const hasArrows = /[→↓↑←↗↘↙↖]/.test(code)
  const hasBorders = /[─│┌┐└┘]/.test(code)
  const hasAsciiArt = /[╱╲▭▱◇]/.test(code)
  
  // If it has lots of special characters, it's likely a diagram
  if (hasBoxChars || hasArrows || hasBorders || hasAsciiArt) {
    return true
  }
  
  // Check if most lines are short and have lots of spaces (formatting)
  const formattedLines = lines.filter(l => l.includes('  ') && l.length < 60)
  if (formattedLines.length > lines.length * 0.5) {
    return true
  }
  
  return false
}

// Split markdown into segments - regular content and multi-lang code blocks
interface ContentSegment {
  type: "markdown" | "multilang"
  content: string
  code?: Record<string, string>
}

function splitContent(markdown: string): ContentSegment[] {
  const segments: ContentSegment[] = []
  const regex = /```multi\s*\n([\s\S]*?)```/g
  let lastIndex = 0
  let match
  
  while ((match = regex.exec(markdown)) !== null) {
    // Add markdown before this match
    if (match.index > lastIndex) {
      segments.push({
        type: "markdown",
        content: markdown.slice(lastIndex, match.index)
      })
    }
    
    // Parse and add the multi-lang block
    const parsed = parseMultiLangCode(match[1])
    if (parsed) {
      segments.push({
        type: "multilang",
        content: "",
        code: parsed
      })
    }
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining markdown
  if (lastIndex < markdown.length) {
    segments.push({
      type: "markdown",
      content: markdown.slice(lastIndex)
    })
  }
  
  return segments
}

// Single markdown section renderer
function MarkdownSection({ content }: { content: string }) {
  return (
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
              className="text-foreground border-border mt-0 mb-4 scroll-mt-24 border-b pb-2 text-2xl font-bold tracking-tight md:text-3xl"
              {...props}
            />
          ),
          h2: ({ ...props }: any) => (
            <h2
              className="text-foreground mt-8 mb-3 scroll-mt-24 text-xl font-bold tracking-tight first:mt-0 md:text-2xl"
              {...props}
            />
          ),
          h3: ({ ...props }: any) => (
            <h3
              className="text-foreground mt-6 mb-2 scroll-mt-24 text-lg font-semibold tracking-tight md:text-xl"
              {...props}
            />
          ),
          h4: ({ ...props }: any) => (
            <h4
              className="text-foreground mt-5 mb-2 scroll-mt-24 text-base font-semibold tracking-tight md:text-lg"
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
            <hr className="border-border my-6" {...props} />
          ),
          table: ({ ...props }: any) => (
            <div className="my-6 overflow-x-auto rounded-lg border border-border">
              <table
                className="min-w-full border-collapse text-sm"
                {...props}
              />
            </div>
          ),
          thead: ({ ...props }: any) => (
            <thead className="bg-muted/50" {...props} />
          ),
          th: ({ ...props }: any) => (
            <th
              className="border-border bg-muted text-foreground border-b px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider"
              {...props}
            />
          ),
          td: ({ ...props }: any) => (
            <td
              className="border-border text-foreground/90 border-b px-4 py-3"
              {...props}
            />
          ),
          tr: ({ ...props }: any) => (
            <tr
              className="hover:bg-muted/30 transition-colors"
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
            const codeElement = React.Children.toArray(children).find(
              (child: any) => child?.type === "code"
            ) as any

            const code = String(codeElement?.props?.children || "").trim()
            const className = codeElement?.props?.className || ""
            const languageMatch = className.match(/language-([^:\s]+)(:preview)?/)
            
            const language = languageMatch?.[1] || ""
            const isPreview = languageMatch?.[2] === ":preview"
            const displayName = LANGUAGE_NAMES[language] || language.toUpperCase()
            
            // Check for multi-language code block
            if (language === "multi") {
              const multiCode = parseMultiLangCode(code)
              if (multiCode) {
                return <CodeBlock code={multiCode} defaultLanguage="javascript" />
              }
            }
            
            // Check for visual diagram types
            const isVisualDiagram = language === "diagram" || language === "visual"
            const isDiagram = isAsciiDiagram(code) || language === "text" || language === "" || isVisualDiagram
            const shouldShowCopy = !isDiagram && COPYABLE_LANGUAGES.has(language)
            
            // Render visual diagrams
            if (isVisualDiagram) {
              try {
                const diagramData = JSON.parse(code)
                return (
                  <VisualDiagram
                    type={diagramData.type || "array"}
                    data={diagramData.data}
                  />
                )
              } catch {
                // If not JSON, try to infer type from code
                const lowerCode = code.toLowerCase()
                let diagramType: "array" | "queue" | "stack" | "linked-list" = "array"
                if (lowerCode.includes("queue")) diagramType = "queue"
                else if (lowerCode.includes("stack")) diagramType = "stack"
                else if (lowerCode.includes("linked") || lowerCode.includes("list")) diagramType = "linked-list"
                
                return <VisualDiagram type={diagramType} />
              }
            }

            if (isPreview && language) {
              // Preview code block
              let preview: React.ReactNode = null

              if (language === "tsx" || language === "jsx") {
                const jsxMatch = code.match(/<(\w+)([^>]*)>([\s\S]*?)<\/\1>/)
                if (jsxMatch) {
                  const componentName = jsxMatch[1]
                  const Component = getPreviewComponent(componentName)

                  if (Component) {
                    const propsString = jsxMatch[2]
                    const componentProps: Record<string, any> = {}

                    const propMatches = propsString.matchAll(
                      /(\w+)=["']([^"']+)["']/g
                    )
                    for (const match of propMatches) {
                      componentProps[match[1]] = match[2]
                    }

                    const childrenText = jsxMatch[3]?.trim()
                    if (childrenText) {
                      componentProps.children = childrenText
                    }

                    preview = <Component {...componentProps} />
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

            // Regular code block with language - use SimpleCodeBlock for consistent VS Code-like styling
            if (shouldShowCopy) {
              return <SimpleCodeBlock code={code} language={language} />
            }

            // ASCII diagram / visual - no copy button, simpler style
            return (
              <div className="my-4 overflow-hidden rounded-lg border border-border bg-muted/30">
                <pre
                  className="m-0 overflow-x-auto p-4 font-mono text-sm leading-relaxed"
                  {...props}
                >
                  {children}
                </pre>
              </div>
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
  )
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  // Split content into segments
  const segments = React.useMemo(() => splitContent(content), [content])

  return (
    <div
      className={cn(
        "prose prose-slate dark:prose-invert w-full max-w-none",
        className
      )}
    >
      {segments.map((segment, index) => {
        if (segment.type === "multilang" && segment.code) {
          return (
            <CodeBlock 
              key={index} 
              code={segment.code} 
              defaultLanguage="javascript" 
            />
          )
        }
        return <MarkdownSection key={index} content={segment.content} />
      })}
    </div>
  )
}
