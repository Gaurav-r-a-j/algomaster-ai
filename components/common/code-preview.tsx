"use client"

import * as React from "react"
import { motion } from "motion/react"

import { fadeIn, transitions } from "@/lib/animations"
import { FileIcon, PlayIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { CopyButton } from "./copy-button"

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
  go: "Go",
  rust: "Rust",
  sql: "SQL",
  bash: "Bash",
  shell: "Shell",
  json: "JSON",
}

interface CodePreviewProps {
  code: string
  language?: string
  preview?: React.ReactNode
  className?: string
  title?: string
}

// CodePreview - Component to show code with preview/run option
// Example: <CodePreview code={codeString} preview={<ComponentExample />} />
export function CodePreview({
  code,
  language = "tsx",
  preview,
  className,
  title,
}: CodePreviewProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    preview ? "preview" : "code"
  )

  const displayName = LANGUAGE_NAMES[language] || language

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className={cn(
        "border-border/50 group my-4 overflow-hidden rounded-lg border shadow-sm",
        className
      )}
    >
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "preview" | "code")}
      >
        <div className="border-border/50 bg-muted/50 flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-3">
            <TabsList className="h-8">
              {preview && (
                <TabsTrigger value="preview" className="text-xs">
                  <IconWrapper icon={PlayIcon} size={14} className="mr-1.5" />
                  Preview
                </TabsTrigger>
              )}
              <TabsTrigger value="code" className="text-xs">
                <IconWrapper icon={FileIcon} size={14} className="mr-1.5" />
                Code
              </TabsTrigger>
            </TabsList>
            {title && (
              <span className="text-xs font-medium text-muted-foreground">
                {title}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{displayName}</span>
            <CopyButton
              value={code}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>

        {preview && (
          <TabsContent value="preview" className="bg-background m-0 p-6">
            <div className="flex min-h-[200px] w-full items-center justify-center">
              {preview}
            </div>
          </TabsContent>
        )}

        <TabsContent value="code" className="m-0">
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transitions.smooth}
            className="bg-[#0d1117] m-0 overflow-x-auto p-4 font-mono text-sm"
          >
            <code className={`language-${language}`}>{code}</code>
          </motion.pre>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
