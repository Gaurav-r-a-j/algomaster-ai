import type { QuizQuestion } from "@/types/curriculum"

export const dijkstraQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What does Dijkstra's algorithm find?",
    options: [
      "Shortest path in unweighted graphs",
      "Shortest path in weighted graphs with non-negative weights",
      "Longest path in graphs",
      "Minimum spanning tree"
    ],
    correctAnswer: 1,
    explanation: "Dijkstra's algorithm finds shortest paths from a source to all vertices in weighted graphs with non-negative edge weights."
  },
  {
    id: 2,
    question: "Why doesn't Dijkstra work with negative weights?",
    options: [
      "It's too slow",
      "It assumes once a node is processed, shortest path is found",
      "It requires positive numbers",
      "It only works for trees"
    ],
    correctAnswer: 1,
    explanation: "Dijkstra assumes once a node is marked with shortest distance, it won't be updated. Negative edges can invalidate this assumption."
  },
  {
    id: 3,
    question: "What data structure is typically used for Dijkstra?",
    options: [
      "Stack",
      "Queue",
      "Priority Queue (Min Heap)",
      "Hash Set"
    ],
    correctAnswer: 2,
    explanation: "Priority Queue (Min Heap) is used to always process the vertex with minimum distance next."
  },
  {
    id: 4,
    question: "What is the time complexity of Dijkstra with a binary heap?",
    options: ["O(V)", "O(V + E)", "O((V + E) log V)", "O(V²)"],
    correctAnswer: 2,
    explanation: "With binary heap, Dijkstra has O((V + E) log V) time complexity due to heap operations."
  },
  {
    id: 5,
    question: "What algorithm should you use for graphs with negative weights?",
    options: [
      "Dijkstra",
      "Bellman-Ford",
      "BFS",
      "DFS"
    ],
    correctAnswer: 1,
    explanation: "Bellman-Ford algorithm can handle negative weights and detect negative cycles, unlike Dijkstra."
  }
]

