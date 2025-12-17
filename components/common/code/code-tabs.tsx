"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"
import { CopyButton } from "./copy-button"

interface CodeBlock {
  language: string
  code: string
  label?: string
}

interface CodeTabsProps {
  blocks: CodeBlock[]
  className?: string
}

// Language display names and colors
const LANGUAGE_CONFIG: Record<string, { label: string; color: string }> = {
  javascript: { label: "JavaScript", color: "bg-yellow-500" },
  js: { label: "JavaScript", color: "bg-yellow-500" },
  typescript: { label: "TypeScript", color: "bg-blue-500" },
  ts: { label: "TypeScript", color: "bg-blue-500" },
  python: { label: "Python", color: "bg-green-500" },
  py: { label: "Python", color: "bg-green-500" },
  java: { label: "Java", color: "bg-orange-500" },
  cpp: { label: "C++", color: "bg-purple-500" },
  c: { label: "C", color: "bg-gray-500" },
  go: { label: "Go", color: "bg-cyan-500" },
  rust: { label: "Rust", color: "bg-orange-600" },
  ruby: { label: "Ruby", color: "bg-red-500" },
  php: { label: "PHP", color: "bg-indigo-500" },
  swift: { label: "Swift", color: "bg-orange-400" },
  kotlin: { label: "Kotlin", color: "bg-violet-500" },
}

export function CodeTabs({ blocks, className }: CodeTabsProps) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const activeBlock = blocks[activeIndex]

  if (!blocks.length) return null

  return (
    <div className={cn("my-4 overflow-hidden rounded-lg border border-border bg-[#0d1117]", className)}>
      {/* Tabs Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5">
        <div className="flex items-center">
          {/* Mac dots */}
          <div className="flex gap-1 px-3 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27ca40]" />
          </div>
          
          {/* Language Tabs */}
          <div className="flex">
            {blocks.map((block, index) => {
              const config = LANGUAGE_CONFIG[block.language] || { 
                label: block.label || block.language.toUpperCase(), 
                color: "bg-gray-500" 
              }
              const isActive = index === activeIndex

              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium transition-colors",
                    isActive 
                      ? "text-white" 
                      : "text-white/40 hover:text-white/70"
                  )}
                >
                  <span className={cn("h-2 w-2 rounded-full", config.color)} />
                  {config.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Copy Button */}
        <div className="pr-2">
          <CopyButton
            value={activeBlock.code}
            className="h-6 w-6 text-white/40 hover:text-white hover:bg-white/10"
          />
        </div>
      </div>

      {/* Code Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15 }}
        >
          <pre className="m-0 overflow-x-auto p-4 font-mono text-sm">
            <code className={`language-${activeBlock.language}`}>
              {activeBlock.code}
            </code>
          </pre>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// Helper to parse grouped code blocks from markdown
export function parseCodeGroups(content: string): Map<string, CodeBlock[]> {
  const groups = new Map<string, CodeBlock[]>()
  
  // Match code blocks with group syntax: ```language:groupName
  const codeBlockRegex = /```(\w+):(\w+)\n([\s\S]*?)```/g
  let match
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const [, language, groupName, code] = match
    
    if (!groups.has(groupName)) {
      groups.set(groupName, [])
    }
    
    groups.get(groupName)!.push({
      language,
      code: code.trim()
    })
  }
  
  return groups
}

