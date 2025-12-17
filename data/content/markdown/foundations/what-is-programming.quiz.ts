import type { QuizQuestion } from "@/types/curriculum"

export const whatIsProgrammingQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a program?",
    options: [
      "A physical part of the computer",
      "A set of instructions for the computer to execute",
      "A video game",
      "A type of computer virus"
    ],
    correctAnswer: 1,
    explanation: "A program is a specific set of ordered operations for a computer to perform."
  },
  {
    id: 2,
    question: "What does the CPU do?",
    options: [
      "Stores data permanently",
      "Executes instructions",
      "Displays images on screen",
      "Connects to the internet"
    ],
    correctAnswer: 1,
    explanation: "The Central Processing Unit (CPU) is the brain of the computer that fetches, decodes, and executes instructions."
  },
  {
    id: 3,
    question: "What is the difference between high-level and low-level languages?",
    options: [
      "No difference",
      "High-level is closer to human language, low-level is closer to machine code",
      "High-level is faster",
      "Low-level is easier"
    ],
    correctAnswer: 1,
    explanation: "High-level languages (Python, Java) are human-readable, while low-level languages (Assembly) are closer to machine code."
  },
  {
    id: 4,
    question: "What is a compiler?",
    options: [
      "A program that translates source code to machine code",
      "A type of variable",
      "A data structure",
      "A loop"
    ],
    correctAnswer: 0,
    explanation: "A compiler translates high-level source code into machine code that the computer can execute."
  },
  {
    id: 5,
    question: "What is the purpose of programming?",
    options: [
      "To break computers",
      "To solve problems and automate tasks",
      "To make money",
      "To create viruses"
    ],
    correctAnswer: 1,
    explanation: "Programming is used to solve problems, automate tasks, and create software applications that help people."
  }
]

