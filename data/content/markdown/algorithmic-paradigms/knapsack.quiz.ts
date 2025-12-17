import type { QuizQuestion } from "@/types/curriculum"

export const knapsackQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the time complexity of 0/1 Knapsack with DP?",
    options: ["O(n)", "O(n × W)", "O(n²)", "O(2^n)"],
    correctAnswer: 1,
    explanation: "0/1 Knapsack with DP has O(n × W) time complexity where n is items and W is capacity."
  },
  {
    id: 2,
    question: "In 0/1 Knapsack, why do we iterate capacity in reverse?",
    options: [
      "No reason",
      "To avoid using the same item multiple times",
      "To make it faster",
      "To use less memory"
    ],
    correctAnswer: 1,
    explanation: "Reverse iteration ensures each item is used at most once. Forward iteration would allow reusing items."
  },
  {
    id: 3,
    question: "What is the difference between 0/1 and Unbounded Knapsack?",
    options: [
      "No difference",
      "0/1 allows one use per item, Unbounded allows unlimited uses",
      "0/1 is faster",
      "Unbounded uses less space"
    ],
    correctAnswer: 1,
    explanation: "0/1 Knapsack: each item can be used at most once. Unbounded: items can be used unlimited times."
  },
  {
    id: 4,
    question: "What is the space-optimized space complexity of 0/1 Knapsack?",
    options: ["O(n × W)", "O(W)", "O(n)", "O(1)"],
    correctAnswer: 1,
    explanation: "Space-optimized 0/1 Knapsack uses only O(W) space by using a 1D array and iterating in reverse."
  },
  {
    id: 5,
    question: "Which problem is a variant of Knapsack?",
    options: [
      "Binary Search",
      "Coin Change",
      "BFS",
      "Merge Sort"
    ],
    correctAnswer: 1,
    explanation: "Coin Change is essentially an Unbounded Knapsack problem - find minimum/maximum ways to make a sum."
  }
]

