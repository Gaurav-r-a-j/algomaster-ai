import type { QuizQuestion } from "@/types/curriculum"

export const heapsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What property does a Min Heap maintain?",
    options: [
      "Parent > children",
      "Parent < children",
      "Left child < right child",
      "All nodes equal"
    ],
    correctAnswer: 1,
    explanation: "Min Heap maintains the property that parent is always less than or equal to its children."
  },
  {
    id: 2,
    question: "What is the time complexity to find the minimum in a Min Heap?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
    correctAnswer: 2,
    explanation: "Finding the minimum (root) in a Min Heap is O(1) since it's always at the root."
  },
  {
    id: 3,
    question: "What is the time complexity of heapify (building a heap)?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
    correctAnswer: 0,
    explanation: "Building a heap from an array can be done in O(n) time using bottom-up heapify."
  },
  {
    id: 4,
    question: "Which algorithm uses a heap?",
    options: [
      "Binary Search",
      "Heap Sort",
      "Linear Search",
      "Bubble Sort"
    ],
    correctAnswer: 1,
    explanation: "Heap Sort uses a heap data structure to sort elements in O(n log n) time."
  },
  {
    id: 5,
    question: "What is the space complexity of Heap Sort?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Heap Sort is an in-place algorithm, requiring only O(1) extra space."
  }
]

