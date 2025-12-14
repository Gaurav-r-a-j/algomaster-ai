import type { Topic } from "@/types/curriculum"

// For client-side, we'll use API routes or fetch from public folder
// For now, we'll return empty/default values and let components handle fallbacks

export interface TopicContent {
  markdown: string
  codeExamples: CodeExample[]
  practiceProblems: PracticeProblem[]
  visualizationData?: VisualizationData
}

export interface CodeExample {
  id: string
  language: string
  title: string
  code: string
  explanation?: string
}

export interface PracticeProblem {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  starterCode?: Record<string, string>
  testCases?: TestCase[]
  hints?: string[]
  solution?: string
}

export interface TestCase {
  input: unknown
  expectedOutput: unknown
  explanation?: string
}

export interface VisualizationData {
  type: string
  config: Record<string, unknown>
  steps?: unknown[]
}

/**
 * Get markdown content for a topic
 * In client components, this will fetch from API or use topic.content as fallback
 */
export async function getTopicMarkdown(topicId: string): Promise<string> {
  // Client-side: Try to fetch from API, fallback to empty
  if (typeof window !== "undefined") {
    try {
      const response = await fetch(`/api/content/markdown/${topicId}`)
      if (response.ok) {
        return await response.text()
      }
    } catch {
      // Fallback handled below
    }
    return ""
  }

  // Server-side: Read from file system (dynamic import to avoid client bundle)
  try {
    const fs = await import("fs/promises")
    const path = await import("path")
    const filePath = path.join(
      process.cwd(),
      "data",
      "content",
      "markdown",
      `${topicId}.md`
    )
    const content = await fs.readFile(filePath, "utf-8")
    return content
  } catch {
    return ""
  }
}

/**
 * Get code examples for a topic
 */
export async function getTopicCodeExamples(
  topicId: string
): Promise<CodeExample[]> {
  // Client-side: Fetch from API
  if (typeof window !== "undefined") {
    try {
      const response = await fetch(`/api/content/code/${topicId}`)
      if (response.ok) {
        return await response.json()
      }
    } catch {
      // Fallback handled below
    }
    return []
  }

  // Server-side: Read from file system
  try {
    const fs = await import("fs/promises")
    const path = await import("path")
    const filePath = path.join(
      process.cwd(),
      "data",
      "content",
      "code",
      `${topicId}.json`
    )
    const content = await fs.readFile(filePath, "utf-8")
    return JSON.parse(content)
  } catch {
    return []
  }
}

/**
 * Get practice problems for a topic
 */
export async function getTopicPracticeProblems(
  topicId: string
): Promise<PracticeProblem[]> {
  // Client-side: Fetch from API
  if (typeof window !== "undefined") {
    try {
      const response = await fetch(`/api/content/practice/${topicId}`)
      if (response.ok) {
        return await response.json()
      }
    } catch {
      // Fallback handled below
    }
    return []
  }

  // Server-side: Read from file system
  try {
    const fs = await import("fs/promises")
    const path = await import("path")
    const filePath = path.join(
      process.cwd(),
      "data",
      "content",
      "practice",
      `${topicId}.json`
    )
    const content = await fs.readFile(filePath, "utf-8")
    return JSON.parse(content)
  } catch {
    return []
  }
}

/**
 * Get visualization data for a topic
 */
export async function getTopicVisualizationData(
  topicId: string
): Promise<VisualizationData | null> {
  // Client-side: Fetch from API
  if (typeof window !== "undefined") {
    try {
      const response = await fetch(`/api/content/visualizations/${topicId}`)
      if (response.ok) {
        return await response.json()
      }
    } catch {
      // Fallback handled below
    }
    return null
  }

  // Server-side: Read from file system
  try {
    const fs = await import("fs/promises")
    const path = await import("path")
    const filePath = path.join(
      process.cwd(),
      "data",
      "content",
      "visualizations",
      `${topicId}.json`
    )
    const content = await fs.readFile(filePath, "utf-8")
    return JSON.parse(content)
  } catch {
    return null
  }
}

/**
 * Get all content for a topic
 */
export async function getTopicContent(topic: Topic): Promise<TopicContent> {
  const [markdown, codeExamples, practiceProblems, visualizationData] =
    await Promise.all([
      getTopicMarkdown(topic.id),
      getTopicCodeExamples(topic.id),
      getTopicPracticeProblems(topic.id),
      getTopicVisualizationData(topic.id),
    ])

  return {
    markdown: markdown || topic.content, // Fallback to topic.content
    codeExamples,
    practiceProblems,
    visualizationData: visualizationData || undefined,
  }
}
