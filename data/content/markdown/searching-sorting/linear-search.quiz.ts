import type { QuizQuestion } from "@/types/curriculum"

export const linearSearchQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the time complexity of linear search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Linear search has O(n) time complexity as it may need to check all n elements in the worst case."
  },
  {
    id: 2,
    question: "What is the space complexity of linear search?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Linear search uses O(1) extra space - it only needs a few variables to track position."
  },
  {
    id: 3,
    question: "When is linear search preferred over binary search?",
    options: [
      "Always",
      "When data is unsorted or small",
      "When data is sorted",
      "Never"
    ],
    correctAnswer: 1,
    explanation: "Linear search works on unsorted data and is simple for small datasets, unlike binary search which requires sorted data."
  },
  {
    id: 4,
    question: "What is the best-case time complexity of linear search?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Best case is O(1) when the target element is found at the first position."
  },
  {
    id: 5,
    question: "Is linear search stable?",
    options: [
      "Yes, it maintains relative order",
      "No, it doesn't maintain order",
      "Only for sorted arrays",
      "Not applicable - it's a search algorithm"
    ],
    correctAnswer: 3,
    explanation: "Stability is a property of sorting algorithms, not search algorithms. Linear search just finds elements."
  }
]

