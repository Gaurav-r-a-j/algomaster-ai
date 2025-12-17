import type { QuizQuestion } from "@/types/curriculum"

export const fenwickTreeQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a Fenwick Tree (Binary Indexed Tree) used for?",
    options: [
      "Sorting",
      "Efficient prefix sum queries and point updates",
      "Graph traversal",
      "String matching"
    ],
    correctAnswer: 1,
    explanation: "Fenwick Tree efficiently handles prefix sum queries and point updates in O(log n) time."
  },
  {
    id: 2,
    question: "What is the time complexity of updating an element in a Fenwick Tree?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Updating an element in a Fenwick Tree takes O(log n) time."
  },
  {
    id: 3,
    question: "What is the time complexity of querying a prefix sum in a Fenwick Tree?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Querying a prefix sum in a Fenwick Tree takes O(log n) time."
  },
  {
    id: 4,
    question: "What is the space complexity of a Fenwick Tree?",
    options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
    correctAnswer: 1,
    explanation: "Fenwick Tree uses O(n) space to store the tree structure."
  },
  {
    id: 5,
    question: "What is the main advantage of Fenwick Tree over Segment Tree?",
    options: [
      "Faster queries",
      "Simpler implementation and less code",
      "More features",
      "Uses less memory"
    ],
    correctAnswer: 1,
    explanation: "Fenwick Tree is simpler to implement and requires less code than Segment Tree, while still being efficient for prefix sums."
  }
]

