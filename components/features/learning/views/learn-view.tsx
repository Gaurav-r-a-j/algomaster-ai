"use client"

import { useProgress } from "@/context/progress-context"
import { motion } from "motion/react"

import type { Topic } from "@/types/curriculum"
import { fadeIn, slideUpWithDelay, transitions } from "@/lib/animations"
import { PlayIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { useTopicContent } from "@/hooks/curriculum"
import { CodePreview } from "@/components/common/code/code-preview"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { MarkdownRenderer } from "@/components/common/markdown-renderer"

interface LearnViewProps {
  topic: Topic
}

export function LearnView({ topic }: LearnViewProps) {
  const { data: topicContent, isLoading: loading } = useTopicContent(topic)
  const content = topicContent?.markdown || topic.content
  const codeExamples = topicContent?.codeExamples || []

  const { isCompleted } = useProgress()

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-12"
      >
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="border-primary h-8 w-8 rounded-full border-4 border-t-transparent"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm"
          >
            Loading content...
          </motion.p>
        </div>
      </motion.div>
    )
  }

  // Ensure we have content - use topic.content as fallback
  const displayContent =
    content && content.trim() && !content.toLowerCase().includes("coming soon")
      ? content
      : topic.content

  const isTopicCompleted = isCompleted(topic.id)

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Main Content - Full Width */}
      <div className="min-w-0 space-y-8 lg:space-y-10">
        {/* Markdown Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpWithDelay(0.1)}
        >
          <div className="px-4 pt-4 pb-8 md:px-6 md:pt-6 md:pb-10 lg:px-8 lg:pt-8 lg:pb-12">
            {displayContent && displayContent.trim() ? (
              <MarkdownRenderer
                content={displayContent}
                className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted max-w-none"
              />
            ) : (
              <div className="text-muted-foreground py-16 text-center">
                <p>Content is being prepared. Please check back soon.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Code Examples Section */}
        {codeExamples.length > 0 && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={slideUpWithDelay(0.2)}
          >
            <div className="px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12 border-t border-border/50">
              <div className="mb-8">
                <h3 className="flex items-center gap-3 text-xl font-bold text-foreground">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <IconWrapper
                      icon={PlayIcon}
                      size={18}
                      className="text-primary"
                    />
                  </div>
                  Code Examples
                </h3>
              </div>
              <div className="space-y-8">
                {codeExamples.map((example, idx) => (
                  <motion.div
                    key={example.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className={cn(
                      "space-y-4",
                      idx > 0 && "border-border/50 border-t pt-8"
                    )}
                  >
                    <h4 className="text-foreground flex items-center gap-3 text-lg font-semibold">
                      <motion.span
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold shrink-0"
                      >
                        {idx + 1}
                      </motion.span>
                      {example.title}
                    </h4>
                    <CodePreview
                      code={example.code}
                      language={example.language}
                      preview={null}
                    />
                    {example.explanation && (
                      <p className="text-muted-foreground text-sm leading-relaxed pl-9">
                        {example.explanation}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  )
}
