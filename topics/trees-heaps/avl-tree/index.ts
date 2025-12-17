import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { avlTreeQuiz } from "@/topics/trees-heaps/avl-tree/quiz"

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
  quiz: avlTreeQuiz,
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
