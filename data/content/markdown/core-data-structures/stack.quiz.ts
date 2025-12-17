import type { QuizQuestion } from "@/types/curriculum"

export const stackQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "Which principle does a Stack follow?",
    options: ["FIFO (First-In-First-Out)", "LIFO (Last-In-First-Out)", "Random access", "Priority-based"],
    correctAnswer: 1,
    explanation: "Stack follows LIFO - the most recently added element is removed first, like a stack of plates."
  },
  {
    id: 2,
    question: "What is the time complexity of push() and pop() operations in a Stack?",
    options: ["O(n) for both", "O(1) for both", "O(log n) for both", "O(1) for push, O(n) for pop"],
    correctAnswer: 1,
    explanation: "Both push (add to top) and pop (remove from top) operations are O(1) when implemented with an array or linked list."
  },
  {
    id: 3,
    question: "Which application uses a Stack?",
    options: ["Print queue", "Function call management", "Task scheduling", "Network routing"],
    correctAnswer: 1,
    explanation: "The call stack manages function calls and returns - when a function calls another, it's pushed onto the stack."
  },
  {
    id: 4,
    question: "What happens when you try to pop from an empty stack?",
    options: ["Returns null", "Returns undefined", "Stack underflow error", "Automatically adds 0"],
    correctAnswer: 2,
    explanation: "Popping from an empty stack causes a stack underflow error - always check isEmpty() before popping."
  },
  {
    id: 5,
    question: "Which algorithm uses a Stack for traversal?",
    options: ["Breadth-First Search (BFS)", "Depth-First Search (DFS)", "Binary Search", "Quick Sort"],
    correctAnswer: 1,
    explanation: "Depth-First Search (DFS) uses a Stack to explore as deep as possible before backtracking."
  }
]

