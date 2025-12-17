import type { QuizQuestion } from "@/types/curriculum"

export const dfsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "Which data structure does DFS use?",
    options: ["Queue", "Stack", "Heap", "Array"],
    correctAnswer: 1,
    explanation: "DFS uses a Stack (explicitly or via recursion) to explore as deep as possible before backtracking."
  },
  {
    id: 2,
    question: "What is the time complexity of DFS?",
    options: ["O(V)", "O(E)", "O(V + E)", "O(V × E)"],
    correctAnswer: 2,
    explanation: "DFS visits each vertex once and each edge once, giving O(V + E) time complexity."
  },
  {
    id: 3,
    question: "DFS can be used to detect what in a graph?",
    options: [
      "Shortest path",
      "Cycles and connected components",
      "Minimum spanning tree",
      "Topological sort only"
    ],
    correctAnswer: 1,
    explanation: "DFS can detect cycles, find connected components, and perform topological sorting."
  },
  {
    id: 4,
    question: "What is the space complexity of DFS?",
    options: ["O(1)", "O(V)", "O(E)", "O(V + E)"],
    correctAnswer: 1,
    explanation: "DFS uses O(V) space for the recursion stack and visited set in the worst case."
  },
  {
    id: 5,
    question: "In DFS, nodes are explored in which order?",
    options: [
      "Level-order",
      "Depth-first (as deep as possible)",
      "Random order",
      "Sorted order"
    ],
    correctAnswer: 1,
    explanation: "DFS explores as deep as possible along each branch before backtracking to explore other branches."
  }
]

