import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const linkedList: Topic = {
  id: "linked-list",
  title: "Linked Lists",
  description: "Dynamic data structure with nodes connected by pointers.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(n)", space: "O(n)" },
  visualizerType: VisualizerType.LINKED_LIST,
  module: "2. Core Data Structures",
  order: 5,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  practiceLinks: [
    {
      title: "LeetCode: Reverse Linked List",
      url: "https://leetcode.com/problems/reverse-linked-list/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Merge Two Sorted Lists",
      url: "https://leetcode.com/problems/merge-two-sorted-lists/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Linked List Cycle",
      url: "https://leetcode.com/problems/linked-list-cycle/",
      difficulty: "Easy",
    },
    {
      title: "GeeksforGeeks: Linked List",
      url: "https://www.geeksforgeeks.org/data-structures/linked-list/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Remove Nth Node From End",
      url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
      difficulty: "Medium",
    },
  ],
  quiz: [],
}
