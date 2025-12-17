import type { QuizQuestion } from "@/types/curriculum"

export const topoSortQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of graph does topological sort work on?",
    options: [
      "Any graph",
      "Undirected graph",
      "DAG (Directed Acyclic Graph)",
      "Complete graph"
    ],
    correctAnswer: 2,
    explanation: "Topological sort only works on Directed Acyclic Graphs (DAGs) - graphs with no cycles."
  },
  {
    id: 2,
    question: "What is the time complexity of topological sort?",
    options: ["O(V)", "O(V + E)", "O(V²)", "O(V log V)"],
    correctAnswer: 1,
    explanation: "Topological sort has O(V + E) time complexity where V is vertices and E is edges."
  },
  {
    id: 3,
    question: "Which algorithm can be used for topological sort?",
    options: [
      "Only BFS",
      "Only DFS",
      "Both BFS (Kahn's) and DFS",
      "Only Dijkstra"
    ],
    correctAnswer: 2,
    explanation: "Topological sort can be implemented using both BFS (Kahn's algorithm) and DFS approaches."
  },
  {
    id: 4,
    question: "What does a cycle in the graph mean for topological sort?",
    options: [
      "No effect",
      "Multiple valid orderings",
      "No valid topological ordering exists",
      "Faster execution"
    ],
    correctAnswer: 2,
    explanation: "If a graph has a cycle, no valid topological ordering exists because there's a circular dependency."
  },
  {
    id: 5,
    question: "What is a common application of topological sort?",
    options: [
      "Finding shortest paths",
      "Task scheduling with dependencies",
      "Finding cycles",
      "Graph coloring"
    ],
    correctAnswer: 1,
    explanation: "Topological sort is commonly used for task scheduling where tasks have dependencies (prerequisites)."
  }
]

