"use client"

import * as React from "react"
import hljs from "highlight.js"
import { motion } from "motion/react"

import { fadeIn, transitions } from "@/lib/animations"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButtonWrapper } from "@/components/common/ui/copy-button-wrapper"
import { useLocalStorage } from "@/hooks/common/use-local-storage"

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

export function MultiLangCodeBlock({
  blocks,
  className,
}: MultiLangCodeBlockProps) {
  const [activeTab, setActiveTab] = useLocalStorage("preferred-code-language", blocks[0]?.language || "")

  React.useEffect(() => {
    if (blocks.length > 0 && !blocks.some((b) => b.language === activeTab)) {
      setActiveTab(blocks[0].language)
    }
  }, [blocks, activeTab, setActiveTab])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const getLabel = (block: CodeBlock) => {
    return (
      block.label ||
      LANGUAGE_LABELS[block.language.toLowerCase()] ||
      block.language.toUpperCase()
    )
  }

  if (blocks.length === 0) {
    return null
  }

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
          <CopyButtonWrapper
            value={block.code}
            variant="ghost"
            size="sm"
            className="h-7 px-2"
          />
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
          <CopyButtonWrapper
            value={blocks.find((b) => b.language === activeTab)?.code || ""}
            variant="ghost"
            size="sm"
            className="h-7 px-2"
          />
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
