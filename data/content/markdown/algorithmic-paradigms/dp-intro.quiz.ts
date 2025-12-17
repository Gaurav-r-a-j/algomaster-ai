import type { QuizQuestion } from "@/types/curriculum"

export const dpIntroQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What are the two key properties a problem must have for DP?",
    options: [
      "Linear structure and sorted data",
      "Overlapping subproblems and optimal substructure",
      "Tree structure and recursion",
      "Graph structure and cycles"
    ],
    correctAnswer: 1,
    explanation: "DP requires overlapping subproblems (same subproblems solved multiple times) and optimal substructure (optimal solution contains optimal subproblems)."
  },
  {
    id: 2,
    question: "What is the difference between memoization and tabulation?",
    options: [
      "No difference",
      "Memoization is top-down, tabulation is bottom-up",
      "Memoization uses arrays, tabulation uses maps",
      "Tabulation is faster"
    ],
    correctAnswer: 1,
    explanation: "Memoization (top-down) starts with the problem and caches results. Tabulation (bottom-up) builds solutions from smallest subproblems."
  },
  {
    id: 3,
    question: "Which problem is a classic DP example?",
    options: [
      "Binary Search",
      "Fibonacci sequence",
      "Linear Search",
      "Bubble Sort"
    ],
    correctAnswer: 1,
    explanation: "Fibonacci is a classic DP example - it has overlapping subproblems (fib(5) calls fib(3) multiple times)."
  },
  {
    id: 4,
    question: "What is the time complexity of naive Fibonacci without DP?",
    options: ["O(n)", "O(n²)", "O(2^n)", "O(log n)"],
    correctAnswer: 2,
    explanation: "Naive recursive Fibonacci without memoization has exponential O(2^n) time due to recalculating the same values repeatedly."
  },
  {
    id: 5,
    question: "When should you use Dynamic Programming?",
    options: [
      "Always",
      "When problem has optimal substructure and overlapping subproblems",
      "Only for sorting",
      "Only for graphs"
    ],
    correctAnswer: 1,
    explanation: "Use DP when the problem exhibits both optimal substructure and overlapping subproblems, allowing you to cache and reuse solutions."
  }
]

