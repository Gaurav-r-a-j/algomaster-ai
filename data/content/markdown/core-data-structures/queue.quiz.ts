import type { QuizQuestion } from "@/types/curriculum"

export const queueQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the space complexity of Merge Sort?",
    options: [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n²)"
    ],
    correctAnswer: 2,
    explanation: "Merge Sort requires O(n) additional space to store temporary arrays during the merge process."
  },
  {
    id: 2,
    question: "What is the time complexity of enqueue and dequeue operations in a Queue?",
    options: [
      "O(n) for both",
      "O(1) for both",
      "O(log n) for both",
      "O(1) for enqueue, O(n) for dequeue"
    ],
    correctAnswer: 1,
    explanation: "Both enqueue (add to rear) and dequeue (remove from front) operations in a Queue are O(1) when implemented properly with a deque or linked list."
  },
  {
    id: 3,
    question: "Which data structure follows the FIFO (First-In-First-Out) principle?",
    options: [
      "Stack",
      "Queue",
      "Heap",
      "Tree"
    ],
    correctAnswer: 1,
    explanation: "Queue follows FIFO principle - the first element added is the first one to be removed, like a line at a coffee shop."
  },
  {
    id: 4,
    question: "What is the main difference between a Queue and a Stack?",
    options: [
      "Queue uses LIFO, Stack uses FIFO",
      "Queue uses FIFO, Stack uses LIFO",
      "Both use FIFO",
      "Both use LIFO"
    ],
    correctAnswer: 1,
    explanation: "Queue follows FIFO (First-In-First-Out) - elements are added at rear and removed from front. Stack follows LIFO (Last-In-First-Out) - elements are added and removed from the same end (top)."
  },
  {
    id: 5,
    question: "Which algorithm uses a Queue for traversal?",
    options: [
      "Depth-First Search (DFS)",
      "Breadth-First Search (BFS)",
      "Binary Search",
      "Quick Sort"
    ],
    correctAnswer: 1,
    explanation: "Breadth-First Search (BFS) uses a Queue to process nodes level by level, ensuring all nodes at the current level are processed before moving to the next level."
  }
]

