import type { QuizQuestion } from "@/types/curriculum"

export const backtrackingIntroQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the key characteristic of backtracking?",
    options: [
      "Always finds optimal solution",
      "Explores all possibilities and undoes invalid choices",
      "Uses memoization",
      "Only works for sorted data"
    ],
    correctAnswer: 1,
    explanation: "Backtracking explores solution space, and when a path fails, it backtracks (undoes) and tries alternatives."
  },
  {
    id: 2,
    question: "What is a common application of backtracking?",
    options: [
      "Sorting arrays",
      "N-Queens, Sudoku, generating permutations",
      "Finding shortest path",
      "Binary search"
    ],
    correctAnswer: 1,
    explanation: "Backtracking is perfect for constraint satisfaction problems like N-Queens, Sudoku, and generating combinations."
  },
  {
    id: 3,
    question: "What is the typical time complexity of backtracking?",
    options: ["O(n)", "O(n log n)", "O(2^n) or exponential", "O(1)"],
    correctAnswer: 2,
    explanation: "Backtracking often has exponential time complexity (O(2^n) or worse) as it explores many possibilities."
  },
  {
    id: 4,
    question: "What happens when backtracking finds an invalid solution?",
    options: [
      "Continues anyway",
      "Backtracks to previous state and tries next option",
      "Stops completely",
      "Restarts from beginning"
    ],
    correctAnswer: 1,
    explanation: "When a path is invalid, backtracking undoes the last choice (backtracks) and tries the next possibility."
  },
  {
    id: 5,
    question: "How does backtracking differ from brute force?",
    options: [
      "No difference",
      "Backtracking prunes invalid paths early, brute force tries everything",
      "Backtracking is faster",
      "Brute force uses recursion"
    ],
    correctAnswer: 1,
    explanation: "Backtracking prunes (stops exploring) invalid paths early, making it more efficient than pure brute force."
  }
]

