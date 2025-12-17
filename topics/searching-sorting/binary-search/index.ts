import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { binarySearchQuiz } from "@/topics/searching-sorting/binary-search/quiz"

export const binarySearch: Topic = {
  id: "binary-search",
  title: "Binary Search",
  description: "Efficient search algorithm for sorted arrays.",
  category: AlgorithmType.SEARCHING,
  complexity: { time: "O(log n)", space: "O(1)" },
  visualizerType: VisualizerType.GRID,
  module: "3. Searching & Sorting",
  order: 10,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  quiz: binarySearchQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Binary Search",
      url: "https://leetcode.com/problems/binary-search/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Search Insert Position",
      url: "https://leetcode.com/problems/search-insert-position/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Find First and Last Position",
      url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Binary Search",
      url: "https://www.geeksforgeeks.org/binary-search/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Search in Rotated Sorted Array",
      url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      difficulty: "Medium",
    },
  ],
}
