import type { QuizQuestion } from "@/types/curriculum"

export const linkedListQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the main advantage of linked lists over arrays?",
    options: [
      "Faster access by index",
      "Dynamic size and O(1) insertions/deletions at known positions",
      "Less memory usage",
      "Better cache locality"
    ],
    correctAnswer: 1,
    explanation: "Linked lists can grow dynamically and insert/delete in O(1) if you have a reference to the node."
  },
  {
    id: 2,
    question: "What is the time complexity to find an element in a linked list?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Finding an element requires traversing from head to target, giving O(n) time complexity."
  },
  {
    id: 3,
    question: "How do you detect a cycle in a linked list?",
    options: [
      "Count the nodes",
      "Floyd's Cycle Detection (fast/slow pointer)",
      "Check all pairs of nodes",
      "Not possible"
    ],
    correctAnswer: 1,
    explanation: "Floyd's algorithm uses two pointers moving at different speeds - if they meet, there's a cycle."
  },
  {
    id: 4,
    question: "What is the space complexity of a linked list with n nodes?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Each node stores data and a pointer, requiring O(n) space for n nodes."
  },
  {
    id: 5,
    question: "What is the difference between a singly and doubly linked list?",
    options: [
      "No difference",
      "Singly has one pointer, doubly has two (next and prev)",
      "Doubly is faster",
      "Singly uses less memory"
    ],
    correctAnswer: 1,
    explanation: "Singly linked lists have only a next pointer, while doubly linked lists have both next and previous pointers."
  }
]

