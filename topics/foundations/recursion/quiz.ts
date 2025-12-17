import type { QuizQuestion } from "@/types/curriculum"

export const recursionQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the base case in recursion?",
    options: [
      "The recursive call",
      "The stopping condition",
      "The function definition",
      "The return statement"
    ],
    correctAnswer: 1,
    explanation: "The base case is the condition that stops the recursion and prevents infinite loops."
  },
  {
    id: 2,
    question: "What happens if a recursive function lacks a base case?",
    options: [
      "It runs faster",
      "It causes a stack overflow",
      "It returns undefined",
      "It works fine"
    ],
    correctAnswer: 1,
    explanation: "Without a base case, recursion continues infinitely, eventually causing a stack overflow error."
  },
  {
    id: 3,
    question: "What is the space complexity of a recursive function with depth n?",
    options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
    correctAnswer: 1,
    explanation: "Recursive functions use O(n) space for the call stack, where n is the maximum recursion depth."
  },
  {
    id: 4,
    question: "What is tail recursion?",
    options: [
      "Recursion at the end of a function",
      "Recursion where the recursive call is the last operation",
      "Recursion with two base cases",
      "Recursion that never stops"
    ],
    correctAnswer: 1,
    explanation: "Tail recursion occurs when the recursive call is the last operation, allowing compiler optimization."
  },
  {
    id: 5,
    question: "Which problem is commonly solved with recursion?",
    options: [
      "Linear search",
      "Tree traversal (DFS)",
      "Bubble sort",
      "Array indexing"
    ],
    correctAnswer: 1,
    explanation: "Tree traversal, especially Depth-First Search (DFS), is naturally implemented using recursion."
  }
]

