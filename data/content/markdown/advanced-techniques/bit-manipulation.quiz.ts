import type { QuizQuestion } from "@/types/curriculum"

export const bitManipulationQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What does the bitwise AND (&) operation do?",
    options: [
      "Adds two numbers",
      "Returns 1 only if both bits are 1",
      "Returns 1 if either bit is 1",
      "Flips all bits"
    ],
    correctAnswer: 1,
    explanation: "Bitwise AND returns 1 only when both corresponding bits are 1, otherwise returns 0."
  },
  {
    id: 2,
    question: "How do you check if a number is a power of 2?",
    options: [
      "n % 2 == 0",
      "(n & (n - 1)) == 0",
      "n / 2 == 0",
      "n * 2 == 0"
    ],
    correctAnswer: 1,
    explanation: "A power of 2 has exactly one bit set. n & (n-1) removes the lowest set bit, so if result is 0, it's a power of 2."
  },
  {
    id: 3,
    question: "What does XOR (^) operation do?",
    options: [
      "Returns 1 if both bits are same",
      "Returns 1 if bits are different",
      "Returns 1 if both are 1",
      "Always returns 0"
    ],
    correctAnswer: 1,
    explanation: "XOR returns 1 when bits are different (0^1 or 1^0), and 0 when they're the same (0^0 or 1^1)."
  },
  {
    id: 4,
    question: "What is the time complexity of counting set bits in a number?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 1,
    explanation: "Counting set bits (popcount) is O(log n) where n is the number, or O(1) with built-in functions."
  },
  {
    id: 5,
    question: "What is a common use case for bit manipulation?",
    options: [
      "Sorting",
      "Set operations, flags, efficient arithmetic",
      "Graph traversal",
      "String matching"
    ],
    correctAnswer: 1,
    explanation: "Bit manipulation is used for set operations, flags, efficient arithmetic, and space-optimized data structures."
  }
]

