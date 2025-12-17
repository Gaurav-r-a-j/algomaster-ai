import type { QuizQuestion } from "@/types/curriculum"

export const bfsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "Which data structure does BFS use?",
    options: ["Stack", "Queue", "Heap", "Array"],
    correctAnswer: 1,
    explanation: "BFS uses a Queue to process nodes level by level, ensuring all nodes at current level are processed before moving to next."
  },
  {
    id: 2,
    question: "What does BFS guarantee?",
    options: [
      "Shortest path in unweighted graphs",
      "Minimum spanning tree",
      "Topological order",
      "All paths"
    ],
    correctAnswer: 0,
    explanation: "BFS finds the shortest path (in terms of number of edges) in unweighted graphs."
  },
  {
    id: 3,
    question: "What is the time complexity of BFS?",
    options: ["O(V)", "O(E)", "O(V + E)", "O(V × E)"],
    correctAnswer: 2,
    explanation: "BFS visits each vertex once and each edge once, giving O(V + E) time complexity."
  },
  {
    id: 4,
    question: "In BFS, nodes are processed in which order?",
    options: [
      "Depth-first order",
      "Level-order (breadth-first)",
      "Random order",
      "Sorted order"
    ],
    correctAnswer: 1,
    explanation: "BFS processes nodes level by level - all nodes at distance k are processed before nodes at distance k+1."
  },
  {
    id: 5,
    question: "What is the space complexity of BFS?",
    options: ["O(1)", "O(V)", "O(E)", "O(V + E)"],
    correctAnswer: 1,
    explanation: "BFS uses O(V) space for the queue and visited set in the worst case."
  }
]

