import type { QuizQuestion } from "@/types/curriculum"

export const graphRepsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "Which representation is best for sparse graphs?",
    options: [
      "Adjacency Matrix",
      "Adjacency List",
      "Edge List",
      "All are equal"
    ],
    correctAnswer: 1,
    explanation: "Adjacency list is most space-efficient for sparse graphs (few edges relative to vertices)."
  },
  {
    id: 2,
    question: "What is the space complexity of an adjacency matrix?",
    options: ["O(V)", "O(V + E)", "O(V²)", "O(E)"],
    correctAnswer: 2,
    explanation: "Adjacency matrix uses O(V²) space as it stores a V×V matrix, regardless of edge count."
  },
  {
    id: 3,
    question: "What is the time complexity of checking if an edge exists in an adjacency matrix?",
    options: ["O(V)", "O(E)", "O(1)", "O(log V)"],
    correctAnswer: 2,
    explanation: "Checking edge existence in adjacency matrix is O(1) - direct array access matrix[u][v]."
  },
  {
    id: 4,
    question: "What is the time complexity of checking if an edge exists in an adjacency list?",
    options: ["O(V)", "O(E)", "O(1)", "O(degree of vertex)"],
    correctAnswer: 3,
    explanation: "In adjacency list, checking edge existence requires scanning the vertex's list, O(degree)."
  },
  {
    id: 5,
    question: "Which representation is best for dense graphs?",
    options: [
      "Adjacency List",
      "Adjacency Matrix",
      "Edge List",
      "All are equal"
    ],
    correctAnswer: 1,
    explanation: "For dense graphs (many edges), adjacency matrix is efficient and allows fast edge queries."
  }
]

