"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import { TOPICS, getTopicsByModule } from "@/data/curriculum"
import { getTopicContent } from "@/services/content/content-service"
import type { CodeExample } from "@/services/content/content-service"
import { generateTopicSlug } from "@/utils/common/slug"
import { motion } from "motion/react"

import type { Topic } from "@/types/curriculum"
import { VisualizerType } from "@/types/curriculum"
import { fadeIn, slideUpWithDelay, transitions } from "@/lib/animations"
import {
  BookOpenIcon,
  CheckmarkCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
} from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CodePreview } from "@/components/common/code-preview"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { MarkdownRenderer } from "@/components/common/markdown-renderer"
import { QuizSection } from "@/components/features/learning/quiz-section"

interface LearnViewProps {
  topic: Topic
}

// Topic-specific quiz questions for better learning assessment
const getDefaultQuiz = (topic: Topic) => {
  const quizBank: Record<string, typeof baseQuestions> = {
    // Foundations
    "variables-datatypes": [
      { id: 1, question: "Which data type would you use to store a decimal number?", options: ["int", "float/double", "char", "boolean"], correctAnswer: 1, explanation: "Floating point types (float, double) are designed to store decimal numbers." },
      { id: 2, question: "What is the key difference between a primitive and a reference type?", options: ["Size only", "Primitives store values directly, references store memory addresses", "Speed only", "No difference"], correctAnswer: 1, explanation: "Primitives hold the actual value, while references point to where data is stored in memory." },
      { id: 3, question: "Which is NOT a primitive data type in most languages?", options: ["int", "String", "boolean", "char"], correctAnswer: 1, explanation: "String is typically a reference type (object), not a primitive." },
    ],
    "loops": [
      { id: 1, question: "Which loop is best when you don't know the number of iterations in advance?", options: ["for loop", "while loop", "Both are equal", "Neither"], correctAnswer: 1, explanation: "While loops are ideal when the termination condition depends on runtime values." },
      { id: 2, question: "What happens if the loop condition is never false?", options: ["Loop exits immediately", "Infinite loop", "Compile error", "Runtime warning"], correctAnswer: 1, explanation: "An infinite loop occurs when the condition never becomes false, potentially crashing the program." },
      { id: 3, question: "In a for loop 'for(i=0; i<n; i++)', how many times does the loop run?", options: ["n-1 times", "n times", "n+1 times", "Depends on i"], correctAnswer: 1, explanation: "The loop runs n times: when i = 0, 1, 2, ..., n-1." },
    ],
    "recursion": [
      { id: 1, question: "What are the two essential parts of a recursive function?", options: ["Input and output", "Base case and recursive case", "Parameters and return", "Loop and condition"], correctAnswer: 1, explanation: "Every recursive function needs a base case (stopping condition) and a recursive case (calls itself)." },
      { id: 2, question: "What happens without a proper base case?", options: ["Nothing", "Stack overflow", "Faster execution", "Memory optimization"], correctAnswer: 1, explanation: "Without a base case, the function calls itself infinitely, causing stack overflow." },
      { id: 3, question: "Which problem is naturally recursive?", options: ["Finding max in array", "Tree traversal", "Matrix addition", "Array reversal"], correctAnswer: 1, explanation: "Trees have a recursive structure - each node's children are also trees." },
    ],
    "big-o": [
      { id: 1, question: "Which complexity is more efficient: O(n) or O(n²)?", options: ["O(n²)", "O(n)", "Same efficiency", "Cannot compare"], correctAnswer: 1, explanation: "O(n) grows linearly while O(n²) grows quadratically, making O(n) more efficient." },
      { id: 2, question: "What is the time complexity of accessing an array element by index?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], correctAnswer: 1, explanation: "Array access by index is O(1) because arrays use contiguous memory." },
      { id: 3, question: "O(log n) typically indicates which type of algorithm?", options: ["Linear search", "Divide and conquer", "Brute force", "Nested loops"], correctAnswer: 1, explanation: "O(log n) often results from halving the problem size each step, like binary search." },
    ],
    // Data Structures
    "arrays-strings": [
      { id: 1, question: "What is the time complexity to insert at the beginning of an array?", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: 1, explanation: "All elements must shift right, making it O(n)." },
      { id: 2, question: "Strings in most languages are...", options: ["Mutable", "Immutable", "Always arrays", "Always linked lists"], correctAnswer: 1, explanation: "Strings are typically immutable - operations create new strings." },
    ],
    "linked-list": [
      { id: 1, question: "What is the advantage of linked lists over arrays?", options: ["Faster access by index", "Dynamic size and O(1) insertions", "Less memory usage", "Better cache locality"], correctAnswer: 1, explanation: "Linked lists can grow dynamically and insert/delete in O(1) if you have the node." },
      { id: 2, question: "How do you detect a cycle in a linked list?", options: ["Count nodes", "Floyd's (fast/slow pointer)", "Check all pairs", "Not possible"], correctAnswer: 1, explanation: "Floyd's algorithm uses two pointers - if they meet, there's a cycle." },
    ],
    "stack": [
      { id: 1, question: "Which principle does a stack follow?", options: ["FIFO", "LIFO", "Random access", "Priority"], correctAnswer: 1, explanation: "Stack follows Last In First Out - the most recent element is removed first." },
      { id: 2, question: "Which application uses a stack?", options: ["Print queue", "Function call management", "Task scheduling", "Network packets"], correctAnswer: 1, explanation: "The call stack manages function calls and returns in programs." },
    ],
    "queue": [
      { id: 1, question: "Which principle does a queue follow?", options: ["LIFO", "FIFO", "Random access", "Priority"], correctAnswer: 1, explanation: "Queue follows First In First Out - elements are processed in arrival order." },
      { id: 2, question: "BFS uses which data structure?", options: ["Stack", "Queue", "Heap", "Tree"], correctAnswer: 1, explanation: "BFS uses a queue to explore nodes level by level." },
    ],
    "hashing": [
      { id: 1, question: "What is the average time complexity for hash table lookup?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], correctAnswer: 1, explanation: "Hash tables provide O(1) average lookup using hash functions." },
      { id: 2, question: "What is a hash collision?", options: ["Table is full", "Two keys hash to same index", "Key not found", "Memory leak"], correctAnswer: 1, explanation: "A collision occurs when different keys produce the same hash index." },
    ],
    // Searching & Sorting
    "linear-search": [
      { id: 1, question: "What is the time complexity of linear search?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correctAnswer: 2, explanation: "Linear search checks each element once, giving O(n) complexity." },
      { id: 2, question: "When is linear search preferred over binary search?", options: ["Large sorted arrays", "Small or unsorted arrays", "Never", "Always"], correctAnswer: 1, explanation: "Linear search works on unsorted data and is simpler for small datasets." },
    ],
    "binary-search": [
      { id: 1, question: "What is required for binary search to work?", options: ["Large array", "Sorted array", "Integer values only", "Linked list"], correctAnswer: 1, explanation: "Binary search requires the data to be sorted to eliminate half each step." },
      { id: 2, question: "What is the time complexity of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], correctAnswer: 2, explanation: "Binary search halves the search space each step, giving O(log n)." },
    ],
    "bubble-sort": [
      { id: 1, question: "What is the time complexity of bubble sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correctAnswer: 2, explanation: "Bubble sort compares adjacent pairs in nested loops, giving O(n²)." },
      { id: 2, question: "Is bubble sort stable?", options: ["Yes", "No", "Depends", "N/A"], correctAnswer: 0, explanation: "Bubble sort is stable - equal elements maintain their relative order." },
    ],
    "merge-sort": [
      { id: 1, question: "What paradigm does merge sort use?", options: ["Greedy", "Dynamic Programming", "Divide and Conquer", "Backtracking"], correctAnswer: 2, explanation: "Merge sort divides the array, sorts halves, and conquers by merging." },
      { id: 2, question: "What is the space complexity of merge sort?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], correctAnswer: 2, explanation: "Merge sort needs O(n) extra space for the temporary merge array." },
    ],
    "quick-sort": [
      { id: 1, question: "What is the average time complexity of quick sort?", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correctAnswer: 1, explanation: "Quick sort averages O(n log n) with good pivot selection." },
      { id: 2, question: "What causes quick sort's worst case?", options: ["Random data", "Already sorted data with bad pivot", "Large arrays", "Odd sizes"], correctAnswer: 1, explanation: "Poor pivot selection (like first element on sorted data) causes O(n²)." },
    ],
  }

  // Base questions for topics without specific questions
  const baseQuestions = [
    { id: 1, question: `What is the primary use case for ${topic.title}?`, options: ["Data storage only", "Efficient problem solving", "User interface", "Network communication"], correctAnswer: 1, explanation: `${topic.title} is primarily used for efficient algorithmic problem solving.` },
    { id: 2, question: `What is the time complexity of ${topic.title}?`, options: ["O(n!)", "O(2^n)", topic.complexity.time, "O(1)"], correctAnswer: 2, explanation: `The time complexity is ${topic.complexity.time}.` },
    { id: 3, question: `When should you use ${topic.title}?`, options: ["Never", "When it matches the problem requirements", "Always", "Only for strings"], correctAnswer: 1, explanation: "Choose the right algorithm based on the problem constraints and requirements." },
  ]

  return quizBank[topic.id] || baseQuestions
}

export function LearnView({ topic }: LearnViewProps) {
  const [content, setContent] = useState<string>(topic.content)
  const [codeExamples, setCodeExamples] = useState<CodeExample[]>([])
  const [loading, setLoading] = useState(true)
  const [useAIQuestions, setUseAIQuestions] = useState(false)
  const { completedTopics: _completedTopics, isCompleted } = useProgress()

  useEffect(() => {
    async function loadContent() {
      try {
        const topicContent = await getTopicContent(topic)
        setContent(topicContent.markdown)
        setCodeExamples(topicContent.codeExamples)
      } catch {
        // Fallback to topic.content
        setContent(topic.content)
      } finally {
        setLoading(false)
      }
    }
    loadContent()
  }, [topic])

  // Get related topics and navigation
  const { prevTopic, nextTopic, moduleTopics, moduleProgress } = useMemo(() => {
    const topicIndex = TOPICS.findIndex((t) => t.id === topic.id)
    const prevTopic = topicIndex > 0 ? TOPICS[topicIndex - 1] : null
    const nextTopic =
      topicIndex < TOPICS.length - 1 ? TOPICS[topicIndex + 1] : null

    const moduleTopics = getTopicsByModule(topic.module).sort(
      (a, b) => a.order - b.order
    )
    const completedInModule = moduleTopics.filter((t) =>
      isCompleted(t.id)
    ).length
    const moduleProgress =
      moduleTopics.length > 0
        ? Math.round((completedInModule / moduleTopics.length) * 100)
        : 0

    return { prevTopic, nextTopic, moduleTopics, moduleProgress }
  }, [topic, isCompleted])

  // Default to common questions, AI questions are optional (if available in future)
  const commonQuestions = topic.quiz || getDefaultQuiz(topic)
  const quizQuestions = commonQuestions // AI questions can be added later via topic.aiQuiz

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
      className="grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8 xl:grid-cols-[1fr_360px]"
    >
      {/* Main Content - Full Width */}
      <div className="min-w-0 space-y-6 lg:space-y-8">
        {/* Markdown Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpWithDelay(0.1)}
        >
          <div className="border-border/50 border-b px-4 py-6 md:px-6 md:py-8 lg:px-8">
            {displayContent && displayContent.trim() ? (
              <MarkdownRenderer
                content={displayContent}
                className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted max-w-none"
              />
            ) : (
              <div className="text-muted-foreground py-12 text-center">
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
            <div className="border-border/50 border-b px-4 py-6 md:px-6 md:py-8 lg:px-8">
              <div className="mb-6 border-b border-border/50 pb-4">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <div className="bg-primary/10 rounded-md p-1.5">
                    <IconWrapper
                      icon={PlayIcon}
                      size={16}
                      className="text-primary"
                    />
                  </div>
                  Code Examples
                </h3>
              </div>
              <div className="space-y-6">
                {codeExamples.map((example, idx) => (
                  <motion.div
                    key={example.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className={cn(
                      "space-y-3",
                      idx > 0 && "border-border/50 border-t pt-6"
                    )}
                  >
                    <h4 className="text-foreground flex items-center gap-2 text-base font-semibold">
                      <motion.span
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="bg-primary/10 text-primary flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
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
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {example.explanation}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Quiz Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpWithDelay(0.3)}
        >
          <div className="px-4 py-6 md:px-6 md:py-8 lg:px-8">
            <QuizSection
              topicId={topic.id}
              questions={quizQuestions}
              useAIQuestions={useAIQuestions}
              onToggleAIQuestions={setUseAIQuestions}
              hasAIQuestions={false}
            />
          </div>
        </motion.div>
      </div>

      {/* Right Sidebar - Unified & Concise */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...transitions.smooth, delay: 0.2 }}
        className="z-10 space-y-4 lg:sticky lg:top-[76px] lg:self-start py-4 pr-4 md:pr-6 lg:pr-8"
      >
        <Card className="border-border/50 shadow-none overflow-hidden">
          {/* Module Header & Progress */}
          <CardHeader className="border-border/50 bg-muted/10 border-b px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-muted-foreground flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                <BookOpenIcon className="h-3.5 w-3.5" />
                Module Content
              </CardTitle>
              <span className="text-xs font-mono font-medium text-muted-foreground">
                {moduleProgress}%
              </span>
            </div>
            <Progress value={moduleProgress} className="h-1.5" />
          </CardHeader>

          {/* Scrollable Topic List */}
          <CardContent className="p-0">
            <div className="max-h-[300px] overflow-y-auto p-2 space-y-0.5">
              {moduleTopics.map((t) => {
                const isCompletedTopic = isCompleted(t.id)
                const isCurrent = t.id === topic.id
                return (
                  <Link
                    key={t.id}
                    href={ROUTES.TOPIC(generateTopicSlug(t.title))}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-xs transition-colors",
                      isCurrent
                        ? "bg-primary/5 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      isCompletedTopic && !isCurrent && "text-muted-foreground/70"
                    )}
                  >
                    <div className="shrink-0">
                      {isCompletedTopic ? (
                        <CheckmarkCircleIcon className="h-4 w-4 text-emerald-500" />
                      ) : isCurrent ? (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      ) : (
                        <div className="h-1.5 w-1.5 rounded-full bg-border" />
                      )}
                    </div>
                    <span className="truncate flex-1">{t.title}</span>
                  </Link>
                )
              })}
            </div>

            {/* Actions & Navigation Footer */}
            <div className="border-border/50 bg-muted/5 border-t p-3 space-y-3">
              {/* Navigation Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!prevTopic}
                  className="h-8 text-xs w-full"
                  asChild={!!prevTopic}
                >
                  {prevTopic ? (
                    <Link href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}>
                      <ChevronLeftIcon className="mr-1 h-3 w-3" /> Prev
                    </Link>
                  ) : (
                    <span><ChevronLeftIcon className="mr-1 h-3 w-3" /> Prev</span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!nextTopic}
                  className="h-8 text-xs w-full"
                  asChild={!!nextTopic}
                >
                  {nextTopic ? (
                    <Link href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}>
                      Next <ChevronRightIcon className="ml-1 h-3 w-3" />
                    </Link>
                  ) : (
                    <span>Next <ChevronRightIcon className="ml-1 h-3 w-3" /></span>
                  )}
                </Button>
              </div>

              <Separator className="bg-border/40" />

              {/* Metadata / Complexity */}
              <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-semibold uppercase tracking-wider">Time:</span>
                  <Badge variant="secondary" className="h-4 px-1 text-[9px]">{topic.complexity.time}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold uppercase tracking-wider">Space:</span>
                  <Badge variant="secondary" className="h-4 px-1 text-[9px]">{topic.complexity.space}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
