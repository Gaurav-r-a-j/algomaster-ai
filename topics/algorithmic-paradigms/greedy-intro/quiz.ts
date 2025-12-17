import type { QuizQuestion } from "@/types/curriculum"

export const greedyIntroQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the core principle of greedy algorithms?",
    options: [
      "Always find global optimum",
      "Make locally optimal choice at each step",
      "Try all possibilities",
      "Use dynamic programming"
    ],
    correctAnswer: 1,
    explanation: "Greedy algorithms make the best local choice at each step, hoping it leads to a global optimum."
  },
  {
    id: 2,
    question: "When do greedy algorithms work correctly?",
    options: [
      "Always",
      "When problem has greedy choice property and optimal substructure",
      "Only for sorting",
      "Only for graphs"
    ],
    correctAnswer: 1,
    explanation: "Greedy works when: 1) Greedy choice property (local optimum leads to global), 2) Optimal substructure."
  },
  {
    id: 3,
    question: "What is a classic example of a greedy algorithm?",
    options: [
      "Merge Sort",
      "Activity Selection, Fractional Knapsack",
      "Quick Sort",
      "Binary Search"
    ],
    correctAnswer: 1,
    explanation: "Activity Selection and Fractional Knapsack are classic greedy problems where greedy choice leads to optimal solution."
  },
  {
    id: 4,
    question: "What is the main disadvantage of greedy algorithms?",
    options: [
      "They're too slow",
      "They don't always find the globally optimal solution",
      "They use too much memory",
      "They're hard to implement"
    ],
    correctAnswer: 1,
    explanation: "Greedy algorithms don't guarantee global optimum for all problems - they work only when greedy property holds."
  },
  {
    id: 5,
    question: "How do you prove a greedy algorithm is correct?",
    options: [
      "Test on sample data",
      "Prove greedy choice property and optimal substructure",
      "Compare with brute force",
      "Check time complexity"
    ],
    correctAnswer: 1,
    explanation: "Prove: 1) Greedy choice property (optimal solution contains greedy choice), 2) Optimal substructure (subproblems are optimal)."
  }
]

