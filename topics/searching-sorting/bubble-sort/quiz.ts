import type { QuizQuestion } from "@/types/curriculum"

export const bubbleSortQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the worst-case time complexity of Bubble Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
    correctAnswer: 2,
    explanation: "Bubble Sort has O(n²) worst-case time complexity due to nested loops comparing all pairs."
  },
  {
    id: 2,
    question: "What is the best-case time complexity of optimized Bubble Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
    correctAnswer: 0,
    explanation: "With optimization (early termination), Bubble Sort is O(n) when array is already sorted."
  },
  {
    id: 3,
    question: "Is Bubble Sort stable?",
    options: ["Yes", "No", "Only for small arrays", "Depends on implementation"],
    correctAnswer: 0,
    explanation: "Bubble Sort is stable - equal elements maintain their relative order as it only swaps adjacent elements."
  },
  {
    id: 4,
    question: "What is the space complexity of Bubble Sort?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Bubble Sort is in-place, requiring only O(1) extra space for temporary variables."
  },
  {
    id: 5,
    question: "Why is Bubble Sort rarely used in practice?",
    options: [
      "It's unstable",
      "It's too slow (O(n²)) compared to better algorithms",
      "It uses too much memory",
      "It only works for integers"
    ],
    correctAnswer: 1,
    explanation: "Bubble Sort's O(n²) time complexity makes it inefficient for large datasets compared to O(n log n) sorts."
  }
]

