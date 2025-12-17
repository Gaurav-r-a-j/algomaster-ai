import type { QuizQuestion } from "@/types/curriculum"

export const loopsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "When should you use a for loop?",
    options: [
      "When the number of iterations is unknown",
      "When you know the number of iterations",
      "Only for arrays",
      "Never"
    ],
    correctAnswer: 1,
    explanation: "For loops are ideal when you know how many times you want to iterate."
  },
  {
    id: 2,
    question: "What is the difference between while and do-while loops?",
    options: [
      "No difference",
      "do-while executes at least once, while may not",
      "while is faster",
      "do-while only works for arrays"
    ],
    correctAnswer: 1,
    explanation: "do-while checks the condition after execution, so it runs at least once, unlike while loops."
  },
  {
    id: 3,
    question: "What is the time complexity of a single loop iterating n times?",
    options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
    correctAnswer: 1,
    explanation: "A single loop that iterates n times has O(n) time complexity - linear time."
  },
  {
    id: 4,
    question: "What does a 'break' statement do in a loop?",
    options: [
      "Skips to next iteration",
      "Exits the loop immediately",
      "Continues the loop",
      "Restarts the loop"
    ],
    correctAnswer: 1,
    explanation: "The break statement immediately exits the loop, regardless of the loop condition."
  },
  {
    id: 5,
    question: "What does a 'continue' statement do in a loop?",
    options: [
      "Exits the loop",
      "Skips current iteration and continues to next",
      "Restarts the loop",
      "Pauses the loop"
    ],
    correctAnswer: 1,
    explanation: "The continue statement skips the rest of the current iteration and moves to the next iteration."
  }
]

