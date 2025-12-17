import type { QuizQuestion } from "@/types/curriculum"

export const hashingQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the average time complexity for hash table lookup?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
    correctAnswer: 1,
    explanation: "Hash tables provide O(1) average lookup time using hash functions to map keys to indices."
  },
  {
    id: 2,
    question: "What is a hash collision?",
    options: [
      "Table is full",
      "Two different keys hash to the same index",
      "Key not found",
      "Hash function error"
    ],
    correctAnswer: 1,
    explanation: "A collision occurs when different keys produce the same hash index, requiring collision resolution."
  },
  {
    id: 3,
    question: "Which collision resolution technique uses linked lists?",
    options: ["Linear probing", "Quadratic probing", "Chaining", "Double hashing"],
    correctAnswer: 2,
    explanation: "Chaining stores colliding elements in a linked list at each hash table index."
  },
  {
    id: 4,
    question: "What is the worst-case time complexity of hash table operations?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Worst case is O(n) when all keys hash to the same index, requiring linear search through the chain."
  },
  {
    id: 5,
    question: "What makes a good hash function?",
    options: [
      "Always returns 0",
      "Distributes keys uniformly",
      "Only works for integers",
      "Requires sorted keys"
    ],
    correctAnswer: 1,
    explanation: "A good hash function distributes keys uniformly across the table to minimize collisions."
  }
]

