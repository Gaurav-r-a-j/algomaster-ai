import type { QuizQuestion } from "@/types/curriculum"

export const unionFindQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is Union-Find (Disjoint Set) used for?",
    options: [
      "Sorting",
      "Finding connected components and detecting cycles",
      "Shortest path",
      "Graph coloring"
    ],
    correctAnswer: 1,
    explanation: "Union-Find efficiently tracks disjoint sets, useful for finding connected components and cycle detection."
  },
  {
    id: 2,
    question: "What is the time complexity of Union-Find with path compression and union by rank?",
    options: ["O(n)", "O(log n)", "O(α(n)) - nearly constant", "O(n²)"],
    correctAnswer: 2,
    explanation: "With path compression and union by rank, Union-Find operations are nearly O(1) - O(α(n)) where α is inverse Ackermann."
  },
  {
    id: 3,
    question: "What does the Find operation do?",
    options: [
      "Merges two sets",
      "Finds the root representative of a set",
      "Checks if two elements are in same set",
      "Removes an element"
    ],
    correctAnswer: 1,
    explanation: "Find operation finds the root representative (parent) of the set containing a given element."
  },
  {
    id: 4,
    question: "What does the Union operation do?",
    options: [
      "Finds an element",
      "Merges two sets into one",
      "Splits a set",
      "Checks connectivity"
    ],
    correctAnswer: 1,
    explanation: "Union operation merges two sets by making one root point to the other root."
  },
  {
    id: 5,
    question: "Which algorithm uses Union-Find?",
    options: [
      "Dijkstra",
      "Kruskal's MST algorithm",
      "BFS",
      "DFS"
    ],
    correctAnswer: 1,
    explanation: "Kruskal's algorithm uses Union-Find to efficiently detect cycles when building the Minimum Spanning Tree."
  }
]

