import type { QuizQuestion } from "@/types/curriculum"

export const variablesDatatypesQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of these is a Reference Type?",
    options: ["String", "Number", "Boolean", "Object"],
    correctAnswer: 3,
    explanation: "Objects (and Arrays) are Reference Types, meaning variables store a 'link' to the memory, not the value itself."
  },
  {
    id: 2,
    question: "What is the difference between primitive and reference types?",
    options: [
      "No difference",
      "Primitives store values directly, references store memory addresses",
      "References are faster",
      "Primitives use more memory"
    ],
    correctAnswer: 1,
    explanation: "Primitive types store values directly, while reference types store memory addresses (pointers) to the actual data."
  },
  {
    id: 3,
    question: "What happens when you assign a primitive variable to another?",
    options: [
      "They share the same memory",
      "A copy of the value is created",
      "An error occurs",
      "Nothing happens"
    ],
    correctAnswer: 1,
    explanation: "Assigning primitives creates a copy of the value - changes to one don't affect the other."
  },
  {
    id: 4,
    question: "What happens when you assign a reference variable to another?",
    options: [
      "A copy of the object is created",
      "Both variables point to the same object",
      "An error occurs",
      "Nothing happens"
    ],
    correctAnswer: 1,
    explanation: "Assigning references copies the memory address - both variables point to the same object in memory."
  },
  {
    id: 5,
    question: "Which is typically a primitive type?",
    options: ["Array", "Object", "Integer/Number", "Function"],
    correctAnswer: 2,
    explanation: "Integers/Numbers are primitive types, while Arrays, Objects, and Functions are typically reference types."
  }
]

