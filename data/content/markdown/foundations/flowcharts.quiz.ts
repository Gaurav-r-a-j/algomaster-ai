import type { QuizQuestion } from "@/types/curriculum"

export const flowchartsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "Which symbol represents a decision in a flowchart?",
    options: [
      "Rectangle",
      "Oval",
      "Diamond",
      "Parallelogram"
    ],
    correctAnswer: 2,
    explanation: "A diamond shape is used to represent a decision point (like an if/else statement) in a flowchart."
  },
  {
    id: 2,
    question: "What does a rectangle represent in a flowchart?",
    options: [
      "Start/End",
      "Process/Operation",
      "Decision",
      "Input/Output"
    ],
    correctAnswer: 1,
    explanation: "Rectangles represent processes or operations - actions to be performed."
  },
  {
    id: 3,
    question: "What does a parallelogram represent in a flowchart?",
    options: [
      "Process",
      "Decision",
      "Input/Output",
      "Start/End"
    ],
    correctAnswer: 2,
    explanation: "Parallelograms represent input/output operations - reading data or displaying results."
  },
  {
    id: 4,
    question: "What does an oval/ellipse represent in a flowchart?",
    options: [
      "Process",
      "Decision",
      "Start/End",
      "Input/Output"
    ],
    correctAnswer: 2,
    explanation: "Ovals or ellipses represent the start or end points of a flowchart."
  },
  {
    id: 5,
    question: "What is the main purpose of a flowchart?",
    options: [
      "To write code",
      "To visualize the flow of a program or algorithm",
      "To debug programs",
      "To compile code"
    ],
    correctAnswer: 1,
    explanation: "Flowcharts visually represent the flow of control and logic in a program or algorithm."
  }
]

