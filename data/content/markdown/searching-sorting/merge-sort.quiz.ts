import type { QuizQuestion } from "@/types/curriculum"

export const mergeSortQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What paradigm does Merge Sort use?",
    options: [
      "Greedy",
      "Dynamic Programming",
      "Divide and Conquer",
      "Backtracking"
    ],
    correctAnswer: 2,
    explanation: "Merge Sort uses Divide and Conquer - it divides the array, sorts halves recursively, then merges them."
  },
  {
    id: 2,
    question: "What is the space complexity of Merge Sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Merge Sort requires O(n) extra space for temporary arrays during the merge process."
  },
  {
    id: 3,
    question: "What is the time complexity of Merge Sort in all cases?",
    options: ["O(n)", "O(n log n)", "O(n²)", "Varies"],
    correctAnswer: 1,
    explanation: "Merge Sort has consistent O(n log n) time complexity in best, average, and worst cases."
  },
  {
    id: 4,
    question: "Is Merge Sort stable?",
    options: ["Yes", "No", "Depends on implementation", "Only for small arrays"],
    correctAnswer: 0,
    explanation: "Merge Sort is stable - equal elements maintain their relative order after sorting."
  },
  {
    id: 5,
    question: "What is the main disadvantage of Merge Sort?",
    options: [
      "Slow time complexity",
      "High space complexity",
      "Unstable sorting",
      "Only works for integers"
    ],
    correctAnswer: 1,
    explanation: "Merge Sort's main disadvantage is O(n) space complexity, unlike in-place sorts like Quick Sort."
  }
]

