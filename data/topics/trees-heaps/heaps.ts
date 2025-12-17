import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { heapsQuiz } from "@/data/content/markdown/trees-heaps/heaps.quiz"

export const heaps: Topic = {
  id: "heaps",
  title: "Heaps",
  description:
    "Complete binary tree that maintains heap property - used for priority queues and efficient sorting.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(log n)", space: "O(n)" },
  visualizerType: VisualizerType.HEAP,
  module: "4. Trees & Heaps",
  order: 17,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  quiz: heapsQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Kth Largest Element",
      url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Merge K Sorted Lists",
      url: "https://leetcode.com/problems/merge-k-sorted-lists/",
      difficulty: "Hard",
    },
    {
      title: "GeeksforGeeks: Binary Heap",
      url: "https://www.geeksforgeeks.org/binary-heap/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Top K Frequent Elements",
      url: "https://leetcode.com/problems/top-k-frequent-elements/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Find Median from Data Stream",
      url: "https://leetcode.com/problems/find-median-from-data-stream/",
      difficulty: "Hard",
    },
  ],
}
