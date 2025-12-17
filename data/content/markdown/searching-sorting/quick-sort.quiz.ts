import type { QuizQuestion } from "@/types/curriculum"

export const quickSortQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the average time complexity of Quick Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: 1,
    explanation: "Quick Sort averages O(n log n) with good pivot selection, making it very efficient in practice."
  },
  {
    id: 2,
    question: "What causes Quick Sort's worst case O(n²)?",
    options: [
      "Random data",
      "Already sorted data with bad pivot selection",
      "Large arrays",
      "Duplicate elements"
    ],
    correctAnswer: 1,
    explanation: "Poor pivot selection (like always choosing first element) on sorted data causes O(n²) worst case."
  },
  {
    id: 3,
    question: "What is the space complexity of Quick Sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "Quick Sort uses O(log n) space for the recursion stack in average case, O(n) in worst case."
  },
  {
    id: 4,
    question: "Is Quick Sort stable?",
    options: ["Yes", "No", "Only with special implementation", "Depends on pivot"],
    correctAnswer: 1,
    explanation: "Standard Quick Sort is not stable - equal elements may change relative order during partitioning."
  },
  {
    id: 5,
    question: "Which pivot selection strategy is best for Quick Sort?",
    options: [
      "Always first element",
      "Random pivot",
      "Always last element",
      "Always middle element"
    ],
    correctAnswer: 1,
    explanation: "Random pivot selection helps avoid worst-case scenarios and gives expected O(n log n) performance."
  }
]

