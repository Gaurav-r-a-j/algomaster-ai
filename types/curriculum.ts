export enum AlgorithmType {
  BASICS = "BASICS",
  SORTING = "SORTING",
  SEARCHING = "SEARCHING",
  DATA_STRUCTURE = "DATA_STRUCTURE",
  GRAPH = "GRAPH",
  DP = "DP",
  GREEDY = "GREEDY",
  BACKTRACKING = "BACKTRACKING",
  BIT_MANIPULATION = "BIT_MANIPULATION",
  STRING = "STRING",
  MATH = "MATH",
  RANGE_QUERY = "RANGE_QUERY",
  NETWORK_FLOW = "NETWORK_FLOW",
  GEOMETRY = "GEOMETRY",
}

export enum VisualizerType {
  BAR_CHART = "BAR_CHART",
  GRID = "GRID",
  LINKED_LIST = "LINKED_LIST",
  STACK = "STACK",
  QUEUE = "QUEUE",
  PATHFINDING = "PATHFINDING",
  BINARY_TREE = "BINARY_TREE",
  AVL_TREE = "AVL_TREE",
  HEAP = "HEAP",
  DP = "DP",
  HASH_TABLE = "HASH_TABLE",
  TRIE = "TRIE",
  GRAPH = "GRAPH",
  NONE = "NONE",
}

export type SupportedLanguage = "cpp" | "java" | "python" | "javascript"

export interface PracticeLink {
  title: string
  url: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Topic {
  id: string
  title: string
  description: string
  category: AlgorithmType
  complexity: {
    time: string
    space: string
  }
  visualizerType: VisualizerType
  content: string // Markdown or MDX text
  module: string // "Module 1: Foundations"
  order: number
  practiceLinks?: PracticeLink[]
  starterCode?: Record<SupportedLanguage, string> // Starter code for the runner
  difficulty?: "Easy" | "Medium" | "Hard"
  quiz?: QuizQuestion[]
  practiceProblems?: PracticeProblem[]
  tags?: string[] // Search tags for fuzzy matching
}

export interface PracticeProblem {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  starterCode?: Record<SupportedLanguage, string>
}

export interface ChatMessage {
  id: string
  role: "user" | "model"
  text: string
  timestamp: number
}

export interface VisualizationStep {
  array: number[]
  activeIndices: number[]
  sortedIndices: number[]
  description: string
  auxiliary?: unknown
}
