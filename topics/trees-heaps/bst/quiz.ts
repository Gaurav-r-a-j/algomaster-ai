import type { QuizQuestion } from "@/types/curriculum"

export const bstQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What property defines a Binary Search Tree?",
    options: [
      "All nodes have two children",
      "Left child < parent < right child",
      "Complete binary tree",
      "Balanced tree"
    ],
    correctAnswer: 1,
    explanation: "BST property: all nodes in left subtree are less than parent, all in right subtree are greater."
  },
  {
    id: 2,
    question: "What is the time complexity of search in a balanced BST?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 1,
    explanation: "In a balanced BST, search eliminates half the tree each step, giving O(log n) time."
  },
  {
    id: 3,
    question: "What is the worst-case time complexity of BST operations?",
    options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "Worst case occurs when the tree is a linear chain (skewed), giving O(n) time."
  },
  {
    id: 4,
    question: "Which traversal gives sorted order for a BST?",
    options: [
      "Preorder",
      "Inorder",
      "Postorder",
      "Level-order"
    ],
    correctAnswer: 1,
    explanation: "Inorder traversal (left, root, right) visits nodes in sorted order for a BST."
  },
  {
    id: 5,
    question: "What is the space complexity of BST operations?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 1,
    explanation: "Recursive BST operations use O(log n) space for the call stack in balanced trees, O(n) in worst case."
  }
]

