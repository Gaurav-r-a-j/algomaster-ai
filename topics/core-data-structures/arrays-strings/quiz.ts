import type { QuizQuestion } from "@/types/curriculum"

export const arraysStringsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Array access by index is O(1) - direct memory address calculation allows instant access."
  },
  {
    id: 2,
    question: "What is the time complexity of inserting an element at the beginning of an array?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Inserting at the beginning requires shifting all elements, resulting in O(n) time complexity."
  },
  {
    id: 3,
    question: "What is the main difference between arrays and strings?",
    options: [
      "No difference",
      "Strings are immutable in many languages, arrays are mutable",
      "Arrays are faster",
      "Strings use less memory"
    ],
    correctAnswer: 1,
    explanation: "In many languages (like Java, Python), strings are immutable while arrays are mutable."
  },
  {
    id: 4,
    question: "What is the time complexity of finding a substring in a string?",
    options: ["O(1)", "O(n)", "O(n²)", "Depends on algorithm"],
    correctAnswer: 3,
    explanation: "Substring search depends on algorithm: naive is O(n×m), KMP is O(n+m), where n and m are string lengths."
  },
  {
    id: 5,
    question: "What data structure is best for frequent insertions/deletions in the middle?",
    options: [
      "Array",
      "String",
      "Linked List",
      "Hash Table"
    ],
    correctAnswer: 2,
    explanation: "Linked List allows O(1) insertions/deletions at known positions, unlike arrays which require O(n) shifts."
  }
]

