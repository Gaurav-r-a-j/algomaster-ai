import type { QuizQuestion } from "@/types/curriculum"

export const selectionSortQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "How many swaps does Selection Sort perform?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
    correctAnswer: 0,
    explanation: "Selection Sort performs exactly n-1 swaps, making it O(n) - fewer swaps than other O(n²) sorts."
  },
  {
    id: 2,
    question: "What is the time complexity of Selection Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
    correctAnswer: 2,
    explanation: "Selection Sort has O(n²) time complexity in all cases - it always scans the entire unsorted portion."
  },
  {
    id: 3,
    question: "Is Selection Sort stable?",
    options: ["Yes", "No", "Only for sorted arrays", "Depends on implementation"],
    correctAnswer: 1,
    explanation: "Standard Selection Sort is not stable - swapping can change the relative order of equal elements."
  },
  {
    id: 4,
    question: "What is the space complexity of Selection Sort?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Selection Sort is in-place, requiring only O(1) extra space."
  },
  {
    id: 5,
    question: "What is the main advantage of Selection Sort?",
    options: [
      "Fast time complexity",
      "Minimal number of swaps",
      "Stable sorting",
      "Works on any data type"
    ],
    correctAnswer: 1,
    explanation: "Selection Sort's main advantage is minimal swaps (O(n)) - useful when write operations are expensive."
  }
]

