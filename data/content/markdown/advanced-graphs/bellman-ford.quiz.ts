import type { QuizQuestion } from "@/types/curriculum"

export const bellmanFordQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main advantage of Bellman-Ford over Dijkstra?",
    options: [
      "It's faster",
      "It can handle negative edge weights",
      "It uses less memory",
      "It works for unweighted graphs"
    ],
    correctAnswer: 1,
    explanation: "Bellman-Ford can handle negative edge weights, unlike Dijkstra which requires non-negative weights."
  },
  {
    id: 2,
    question: "What is the time complexity of Bellman-Ford?",
    options: ["O(V)", "O(V + E)", "O(V × E)", "O(V²)"],
    correctAnswer: 2,
    explanation: "Bellman-Ford has O(V × E) time complexity - it relaxes all edges V-1 times."
  },
  {
    id: 3,
    question: "How does Bellman-Ford detect negative cycles?",
    options: [
      "It can't detect them",
      "By checking if distances can still be improved after V-1 iterations",
      "By using DFS",
      "By checking vertex colors"
    ],
    correctAnswer: 1,
    explanation: "If distances can still be improved after V-1 iterations, a negative cycle exists in the graph."
  },
  {
    id: 4,
    question: "How many iterations does Bellman-Ford need?",
    options: [
      "1",
      "V-1",
      "V",
      "E"
    ],
    correctAnswer: 1,
    explanation: "Bellman-Ford needs V-1 iterations to guarantee finding shortest paths (if no negative cycles)."
  },
  {
    id: 5,
    question: "When should you use Bellman-Ford over Dijkstra?",
    options: [
      "Always",
      "When graph has negative weights or you need to detect negative cycles",
      "When graph is unweighted",
      "When you need faster algorithm"
    ],
    correctAnswer: 1,
    explanation: "Use Bellman-Ford when the graph has negative edge weights or when you need to detect negative cycles."
  }
]

