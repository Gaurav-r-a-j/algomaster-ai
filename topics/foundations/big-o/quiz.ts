import type { QuizQuestion } from "@/types/curriculum"

export const bigOQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What does O(1) mean?",
    options: [
      "Linear time",
      "Constant time",
      "Quadratic time",
      "Exponential time"
    ],
    correctAnswer: 1,
    explanation: "O(1) means constant time - the operation takes the same time regardless of input size."
  },
  {
    id: 2,
    question: "What is the time complexity of binary search?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Binary search has O(log n) time complexity as it eliminates half the search space each iteration."
  },
  {
    id: 3,
    question: "What does Big O notation describe?",
    options: [
      "Best case performance",
      "Worst case performance (upper bound)",
      "Average case only",
      "Memory usage only"
    ],
    correctAnswer: 1,
    explanation: "Big O describes the worst-case time complexity - the upper bound of how an algorithm performs."
  },
  {
    id: 4,
    question: "What is the time complexity of nested loops?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctAnswer: 1,
    explanation: "Nested loops typically result in O(n²) time complexity when both loops iterate n times."
  },
  {
    id: 5,
    question: "Which is faster: O(n log n) or O(n²)?",
    options: [
      "O(n²)",
      "O(n log n)",
      "They're the same",
      "Depends on n"
    ],
    correctAnswer: 1,
    explanation: "O(n log n) is faster than O(n²) for large n, as log n grows much slower than n."
  }
]

