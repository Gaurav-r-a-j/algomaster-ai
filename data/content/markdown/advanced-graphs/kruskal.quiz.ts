import type { QuizQuestion } from "@/types/curriculum"

export const kruskalQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What does Kruskal's algorithm find?",
    options: [
      "Shortest path",
      "Minimum Spanning Tree (MST)",
      "Longest path",
      "Maximum flow"
    ],
    correctAnswer: 1,
    explanation: "Kruskal's algorithm finds the Minimum Spanning Tree (MST) of a connected, weighted graph."
  },
  {
    id: 2,
    question: "What data structure does Kruskal use to detect cycles?",
    options: [
      "Stack",
      "Queue",
      "Union-Find (Disjoint Set)",
      "Hash Set"
    ],
    correctAnswer: 2,
    explanation: "Kruskal uses Union-Find (Disjoint Set) data structure to efficiently detect cycles when adding edges."
  },
  {
    id: 3,
    question: "What is the time complexity of Kruskal's algorithm?",
    options: ["O(V)", "O(V + E)", "O(E log E)", "O(V²)"],
    correctAnswer: 2,
    explanation: "Kruskal's time complexity is O(E log E) due to sorting edges, which dominates the algorithm."
  },
  {
    id: 4,
    question: "How does Kruskal select edges?",
    options: [
      "Randomly",
      "By vertex order",
      "Greedily by smallest weight first",
      "By largest weight first"
    ],
    correctAnswer: 2,
    explanation: "Kruskal uses a greedy approach: sort edges by weight and add smallest edges that don't form cycles."
  },
  {
    id: 5,
    question: "What is the difference between Kruskal and Prim's algorithm?",
    options: [
      "No difference",
      "Kruskal works edge-by-edge, Prim works vertex-by-vertex",
      "Kruskal is faster",
      "Prim only works for trees"
    ],
    correctAnswer: 1,
    explanation: "Kruskal adds edges greedily, while Prim grows the MST from a starting vertex by adding minimum edges."
  }
]

