import type { QuizQuestion } from "@/types/curriculum"

export const binarySearchQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is required for binary search to work?",
    options: [
      "Large array",
      "Sorted array",
      "Integer values only",
      "Linked list structure"
    ],
    correctAnswer: 1,
    explanation: "Binary search requires the data to be sorted to eliminate half the search space each step."
  },
  {
    id: 2,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    correctAnswer: 2,
    explanation: "Binary search halves the search space each step, giving O(log n) time complexity."
  },
  {
    id: 3,
    question: "What is the space complexity of iterative binary search?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Iterative binary search uses only a few variables, giving O(1) space complexity."
  },
  {
    id: 4,
    question: "When is binary search preferred over linear search?",
    options: [
      "Small arrays",
      "Unsorted arrays",
      "Large sorted arrays",
      "Never"
    ],
    correctAnswer: 2,
    explanation: "Binary search is preferred for large sorted arrays due to its O(log n) efficiency."
  },
  {
    id: 5,
    question: "What happens if the array is not sorted in binary search?",
    options: [
      "Works correctly",
      "May return incorrect results",
      "Faster execution",
      "No difference"
    ],
    correctAnswer: 1,
    explanation: "Binary search on unsorted data may skip the target element, returning incorrect results."
  }
]

