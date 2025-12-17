import type { QuizQuestion } from "@/types/curriculum"

export const segmentTreeQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a Segment Tree used for?",
    options: [
      "Sorting arrays",
      "Efficient range queries and range updates",
      "Graph traversal",
      "String searching"
    ],
    correctAnswer: 1,
    explanation: "Segment Tree efficiently handles range queries (sum, min, max) and range updates in O(log n) time."
  },
  {
    id: 2,
    question: "What is the time complexity of building a Segment Tree?",
    options: ["O(1)", "O(n)", "O(n log n)", "O(n²)"],
    correctAnswer: 1,
    explanation: "Building a Segment Tree from an array takes O(n) time."
  },
  {
    id: 3,
    question: "What is the time complexity of a range query in a Segment Tree?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Range queries in a Segment Tree take O(log n) time."
  },
  {
    id: 4,
    question: "What is the space complexity of a Segment Tree?",
    options: ["O(1)", "O(n)", "O(4n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Segment Tree typically uses O(4n) space in worst case, though often O(2n) is sufficient."
  },
  {
    id: 5,
    question: "What operations can Segment Tree efficiently support?",
    options: [
      "Only sum queries",
      "Any associative operation (sum, min, max, gcd, etc.)",
      "Only multiplication",
      "Only division"
    ],
    correctAnswer: 1,
    explanation: "Segment Tree can support any associative operation like sum, min, max, gcd, etc., making it very versatile."
  }
]

