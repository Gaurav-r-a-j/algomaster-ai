import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const avlTree: Topic = {
  id: "avl-tree",
  title: "AVL Tree",
  description:
    "Self-balancing binary search tree that maintains O(log n) height through rotations.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(log n)", space: "O(n)" },
  visualizerType: VisualizerType.AVL_TREE,
  module: "4. Trees & Heaps",
  order: 18,
  difficulty: "Hard",
  content: "", // Content loaded from external .md file
  quiz: [
    {
      id: 1,
      question: "What is the maximum allowed balance factor in an AVL tree?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      explanation:
        "AVL trees allow balance factors of -1, 0, or 1. If it becomes ±2, rotations are needed.",
    },
  ],
  practiceLinks: [
    {
      title: "GeeksforGeeks: AVL Tree",
      url: "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/",
      difficulty: "Hard",
    },
    {
      title: "LeetCode: Balance a Binary Search Tree",
      url: "https://leetcode.com/problems/balance-a-binary-search-tree/",
      difficulty: "Medium",
    },
  ],
}
