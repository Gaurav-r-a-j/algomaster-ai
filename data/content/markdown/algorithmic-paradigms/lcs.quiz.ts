import type { QuizQuestion } from "@/types/curriculum"

export const lcsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What does LCS stand for?",
    options: [
      "Longest Common String",
      "Longest Common Subsequence",
      "Least Common Subsequence",
      "Longest Common Substring"
    ],
    correctAnswer: 1,
    explanation: "LCS stands for Longest Common Subsequence - elements maintain relative order but don't need to be contiguous."
  },
  {
    id: 2,
    question: "What is the time complexity of LCS using DP?",
    options: ["O(n)", "O(n²)", "O(m × n)", "O(2^n)"],
    correctAnswer: 2,
    explanation: "LCS with DP has O(m × n) time complexity where m and n are the lengths of the two sequences."
  },
  {
    id: 3,
    question: "What is the key difference between LCS and Longest Common Substring?",
    options: [
      "No difference",
      "LCS elements must be contiguous, substring doesn't",
      "LCS elements don't need to be contiguous, substring must be",
      "LCS is faster"
    ],
    correctAnswer: 2,
    explanation: "LCS (subsequence) doesn't require contiguous elements, while substring requires them to be consecutive."
  },
  {
    id: 4,
    question: "What is the recurrence relation for LCS when characters match?",
    options: [
      "dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
      "dp[i][j] = dp[i-1][j-1] + 1",
      "dp[i][j] = dp[i-1][j] + 1",
      "dp[i][j] = 0"
    ],
    correctAnswer: 1,
    explanation: "When characters match, LCS includes this character: dp[i][j] = dp[i-1][j-1] + 1."
  },
  {
    id: 5,
    question: "Which problem can be solved using LCS?",
    options: [
      "Shortest path",
      "Longest Palindromic Subsequence",
      "Binary Search",
      "Quick Sort"
    ],
    correctAnswer: 1,
    explanation: "Longest Palindromic Subsequence can be found using LCS of the string with its reverse."
  }
]

