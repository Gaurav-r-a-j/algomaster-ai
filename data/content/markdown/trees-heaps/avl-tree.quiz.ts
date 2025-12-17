import type { QuizQuestion } from "@/types/curriculum"

export const avlTreeQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the maximum allowed balance factor in an AVL tree?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 1,
    explanation: "AVL trees allow balance factors of -1, 0, or 1. If it becomes ±2, rotations are needed."
  },
  {
    id: 2,
    question: "What is the purpose of AVL tree rotations?",
    options: [
      "To speed up searches",
      "To maintain balance and keep height O(log n)",
      "To reduce memory usage",
      "To sort elements"
    ],
    correctAnswer: 1,
    explanation: "Rotations maintain the AVL property (balance factor ≤ 1), ensuring O(log n) height and operations."
  },
  {
    id: 3,
    question: "What is the time complexity of insertion in AVL tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "AVL tree insertion is O(log n) - find position O(log n) + rotations O(1) = O(log n)."
  },
  {
    id: 4,
    question: "How many types of rotations are there in AVL trees?",
    options: ["1", "2", "4", "8"],
    correctAnswer: 2,
    explanation: "There are 4 rotation types: Left, Right, Left-Right, and Right-Left rotations."
  },
  {
    id: 5,
    question: "What is the advantage of AVL tree over regular BST?",
    options: [
      "Faster insertion",
      "Guaranteed O(log n) height and operations",
      "Uses less memory",
      "Easier to implement"
    ],
    correctAnswer: 1,
    explanation: "AVL trees guarantee O(log n) height through self-balancing, preventing worst-case O(n) BST performance."
  }
]

