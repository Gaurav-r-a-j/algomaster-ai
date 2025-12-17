"use client"

import type { PracticeProblem } from "@/services/content/content-service"
import { motion } from "motion/react"

import type { Topic } from "@/types/curriculum"
import {
  fadeIn,
  slideUp,
  staggerContainer,
  staggerItem,
  transitions,
} from "@/lib/animations"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface InstructionsPanelProps {
  topic: Topic
  practiceProblem?: PracticeProblem
}

export function InstructionsPanel({
  topic,
  practiceProblem,
}: InstructionsPanelProps) {
  const problem = practiceProblem || {
    id: "default",
    title: topic.title,
    description: topic.description,
    difficulty: topic.difficulty || "Medium",
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className="h-full"
    >
      <Card className="border-border/50 flex h-full flex-col rounded-none border-0 shadow-none">
        <CardHeader className="border-border/50 border-b px-6 py-4">
          <motion.div
            variants={slideUp}
            className="flex items-center justify-between gap-3"
          >
            <CardTitle className="text-lg font-bold">{problem.title}</CardTitle>
            <Badge
              variant={
                problem.difficulty === "Easy"
                  ? "default"
                  : problem.difficulty === "Hard"
                    ? "destructive"
                    : "secondary"
              }
              className="shrink-0"
            >
              {problem.difficulty}
            </Badge>
          </motion.div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto px-6 py-5">
          <motion.div variants={staggerContainer} className="space-y-6">
            <div>
              <h4 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                Problem Description
              </h4>
              <p className="text-muted-foreground bg-muted/30 border-border/50 rounded-lg border p-4 text-sm leading-relaxed whitespace-pre-wrap">
                {problem.description}
              </p>
            </div>

            {problem.testCases && problem.testCases.length > 0 && (
              <div>
                <h4 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                  Test Cases
                </h4>
                <motion.div variants={staggerContainer} className="space-y-3.5">
                  {problem.testCases.map((testCase, idx) => (
                    <motion.div
                      key={idx}
                      variants={staggerItem}
                      className="bg-muted/50 border-border/50 space-y-2.5 rounded-lg border p-4 font-mono text-sm"
                    >
                      <div className="mb-3 flex items-center gap-2.5">
                        <motion.span
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={transitions.quick}
                          className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        >
                          {idx + 1}
                        </motion.span>
                        <span className="text-muted-foreground text-xs font-semibold uppercase">
                          Test Case {idx + 1}
                        </span>
                      </div>
                      <div className="space-y-2 pl-8">
                        <div>
                          <span className="text-muted-foreground text-xs font-medium">
                            Input:{" "}
                          </span>
                          <span className="text-foreground break-all">
                            {JSON.stringify(testCase.input)}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs font-medium">
                            Expected:{" "}
                          </span>
                          <span className="text-foreground break-all">
                            {JSON.stringify(testCase.expectedOutput)}
                          </span>
                        </div>
                        {testCase.explanation && (
                          <div className="border-border/50 text-muted-foreground mt-2 border-t pt-2 text-xs italic">
                            {testCase.explanation}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {problem.hints && problem.hints.length > 0 && (
              <div>
                <h4 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                  Hints
                </h4>
                <motion.div variants={staggerContainer} className="space-y-2.5">
                  {problem.hints.map((hint, idx) => (
                    <motion.div
                      key={idx}
                      variants={staggerItem}
                      className="bg-primary/5 border-primary/10 flex gap-3.5 rounded-lg border p-3.5"
                    >
                      <motion.span
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={transitions.quick}
                        className="bg-primary/20 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      >
                        {idx + 1}
                      </motion.span>
                      <p className="text-foreground text-sm leading-relaxed">
                        {hint}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {topic.practiceLinks && topic.practiceLinks.length > 0 && (
              <>
                <Separator className="my-5" />
                <div>
                  <h4 className="text-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
                    Practice Problems
                  </h4>
                  <motion.div variants={staggerContainer} className="space-y-2.5">
                    {topic.practiceLinks.map((link, idx) => (
                      <motion.a
                        key={idx}
                        variants={staggerItem}
                        whileHover={{ x: 4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-border/50 hover:border-primary/50 hover:bg-primary/5 group flex items-center justify-between rounded-lg border p-3.5 transition-colors"
                      >
                        <span className="text-foreground group-hover:text-primary text-sm font-medium transition-colors">
                          {link.title}
                        </span>
                        <Badge
                          variant={
                            link.difficulty === "Easy"
                              ? "default"
                              : link.difficulty === "Hard"
                                ? "destructive"
                                : "secondary"
                          }
                          className="ml-3 h-5 shrink-0 px-2 py-0.5 text-[10px] font-semibold"
                        >
                          {link.difficulty}
                        </Badge>
                      </motion.a>
                    ))}
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
