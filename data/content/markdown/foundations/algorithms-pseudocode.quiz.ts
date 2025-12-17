import type { QuizQuestion } from "@/types/curriculum"

export const algorithmsPseudocodeQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is an algorithm?",
    options: [
      "A specific programming language",
      "A step-by-step procedure to solve a problem",
      "A hardware component",
      "A secret code"
    ],
    correctAnswer: 1,
    explanation: "An algorithm is a finite sequence of well-defined instructions to solve a class of problems."
  },
  {
    id: 2,
    question: "What is pseudocode?",
    options: [
      "A programming language",
      "A way to write algorithms in plain language",
      "Machine code",
      "A type of error"
    ],
    correctAnswer: 1,
    explanation: "Pseudocode is a simplified way to write algorithms using natural language mixed with programming-like syntax."
  },
  {
    id: 3,
    question: "What are the key properties of a good algorithm?",
    options: [
      "Fast and complex",
      "Correct, efficient, and easy to understand",
      "Uses many variables",
      "Only works for one problem"
    ],
    correctAnswer: 1,
    explanation: "Good algorithms are correct (solve the problem), efficient (use resources wisely), and readable (easy to understand)."
  },
  {
    id: 4,
    question: "What is the purpose of writing pseudocode before coding?",
    options: [
      "To waste time",
      "To plan the logic without worrying about syntax",
      "To make code run faster",
      "To impress others"
    ],
    correctAnswer: 1,
    explanation: "Pseudocode helps plan the algorithm's logic and structure before dealing with programming language syntax."
  },
  {
    id: 5,
    question: "Which is NOT a characteristic of pseudocode?",
    options: [
      "Language-independent",
      "Easy to understand",
      "Requires specific compiler",
      "Focuses on logic, not syntax"
    ],
    correctAnswer: 2,
    explanation: "Pseudocode doesn't require a compiler - it's meant to be read by humans, not executed by computers."
  }
]

