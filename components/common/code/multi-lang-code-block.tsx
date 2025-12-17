"use client"

import * as React from "react"
import hljs from "highlight.js"
import { motion } from "motion/react"

import { fadeIn, transitions } from "@/lib/animations"
import { CheckmarkCircleIcon, FloppyDiskIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconWrapper } from "@/components/common/icon-wrapper"

interface CodeBlock {
  language: string
  code: string
  label?: string
}

interface MultiLangCodeBlockProps {
  blocks: CodeBlock[]
  className?: string
}

const LANGUAGE_LABELS: Record<string, string> = {
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
  "c++": "C++",
  c: "C",
  go: "Go",
  rust: "Rust",
  rb: "Ruby",
  ruby: "Ruby",
  swift: "Swift",
  kotlin: "Kotlin",
}

// MultiLangCodeBlock - Component to show code in multiple languages with tabs
// Example: <MultiLangCodeBlock blocks={[{language: "javascript", code: "..."}, {language: "python", code: "..."}]} />
export function MultiLangCodeBlock({
  blocks,
  className,
}: MultiLangCodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState(blocks[0]?.language || "")

  // Get storage key for remembering preference
  const storageKey = "preferred-code-language"

  React.useEffect(() => {
    // Load preferred language from localStorage
    const saved = localStorage.getItem(storageKey)
    if (saved && blocks.some((b) => b.language === saved)) {
      setActiveTab(saved)
    }
  }, [blocks])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    localStorage.setItem(storageKey, value)
  }

  const handleCopy = async () => {
    const activeBlock = blocks.find((b) => b.language === activeTab)
    if (activeBlock) {
      await navigator.clipboard.writeText(activeBlock.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const getLabel = (block: CodeBlock) => {
    return (
      block.label ||
      LANGUAGE_LABELS[block.language.toLowerCase()] ||
      block.language.toUpperCase()
    )
  }

  if (blocks.length === 0) return null

  // Single language - render simple code block
  if (blocks.length === 1) {
    const block = blocks[0]
    const highlighted = hljs.getLanguage(block.language)
      ? hljs.highlight(block.code, { language: block.language }).value
      : block.code

    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        transition={transitions.smooth}
        className={cn(
          "border-border my-4 overflow-hidden rounded-lg border",
          className
        )}
      >
        <div className="bg-muted/50 border-border flex items-center justify-between border-b px-4 py-2">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            {getLabel(block)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2"
          >
            <IconWrapper
              icon={copied ? CheckmarkCircleIcon : FloppyDiskIcon}
              size={14}
              className={copied ? "text-emerald-500" : ""}
            />
          </Button>
        </div>
        <pre className="bg-muted m-0 overflow-x-auto p-4 font-mono text-sm">
          <code
            dangerouslySetInnerHTML={{ __html: highlighted }}
            className={`language-${block.language}`}
          />
        </pre>
      </motion.div>
    )
  }

  // Multiple languages - render tabs
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className={cn(
        "border-border my-4 overflow-hidden rounded-lg border",
        className
      )}
    >
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <div className="bg-muted/50 border-border flex items-center justify-between border-b px-2">
          <TabsList className="h-10 bg-transparent p-0">
            {blocks.map((block) => (
              <TabsTrigger
                key={block.language}
                value={block.language}
                className="data-[state=active]:bg-background data-[state=active]:border-primary rounded-none border-b-2 border-transparent px-3 py-2 text-xs font-semibold tracking-wider uppercase data-[state=active]:shadow-sm"
              >
                {getLabel(block)}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2"
          >
            <IconWrapper
              icon={copied ? CheckmarkCircleIcon : FloppyDiskIcon}
              size={14}
              className={copied ? "text-emerald-500" : ""}
            />
          </Button>
        </div>

        {blocks.map((block) => {
          const highlighted = hljs.getLanguage(block.language)
            ? hljs.highlight(block.code, { language: block.language }).value
            : block.code

          return (
            <TabsContent
              key={block.language}
              value={block.language}
              className="m-0"
            >
              <pre className="bg-muted m-0 overflow-x-auto p-4 font-mono text-sm">
                <code
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                  className={`language-${block.language}`}
                />
              </pre>
            </TabsContent>
          )
        })}
      </Tabs>
    </motion.div>
  )
}
