import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const bst: Topic = {
  id: "bst",
  title: "Binary Search Tree",
  description:
    "Tree data structure where each node has at most two children, maintaining sorted order.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(log n)", space: "O(n)" },
  visualizerType: VisualizerType.BINARY_TREE,
  module: "4. Trees & Heaps",
  order: 16,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  quiz: [
    {
      id: 1,
      question: "What property must a Binary Search Tree maintain?",
      options: [
        "All nodes have exactly two children",
        "Left subtree < node < Right subtree",
        "All leaves are at the same level",
        "Tree is always balanced",
      ],
      correctAnswer: 1,
      explanation:
        "BST maintains the property that left subtree values are less and right subtree values are greater than the node.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Validate Binary Search Tree",
      url: "https://leetcode.com/problems/validate-binary-search-tree/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Kth Smallest Element in BST",
      url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Binary Search Tree",
      url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Convert Sorted Array to BST",
      url: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Lowest Common Ancestor of BST",
      url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
      difficulty: "Easy",
    },
  ],
}
