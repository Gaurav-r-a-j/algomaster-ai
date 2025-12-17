import type { QuizQuestion } from "@/types/curriculum"

export const insertionSortQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the best-case time complexity of Insertion Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
    correctAnswer: 0,
    explanation: "Insertion Sort is O(n) when the array is already sorted, making it adaptive."
  },
  {
    id: 2,
    question: "What is the worst-case time complexity of Insertion Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
    correctAnswer: 2,
    explanation: "Worst case is O(n²) when array is reverse sorted - each element needs to move to the beginning."
  },
  {
    id: 3,
    question: "Is Insertion Sort stable?",
    options: ["Yes", "No", "Depends on implementation", "Only for small arrays"],
    correctAnswer: 0,
    explanation: "Insertion Sort is stable - equal elements maintain their relative order after sorting."
  },
  {
    id: 4,
    question: "What is the space complexity of Insertion Sort?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Insertion Sort is in-place, requiring only O(1) extra space for temporary variables."
  },
  {
    id: 5,
    question: "When is Insertion Sort most efficient?",
    options: [
      "Large unsorted arrays",
      "Small arrays or nearly sorted arrays",
      "Reverse sorted arrays",
      "Random arrays"
    ],
    correctAnswer: 1,
    explanation: "Insertion Sort excels with small datasets or nearly sorted arrays due to its adaptive nature."
  }
]

