import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { segmentTreeQuiz } from "@/topics/advanced-techniques/segment-tree/quiz"

export const segmentTree: Topic = {
  id: "segment-tree",
  title: "Segment Tree",
  description: "Efficient data structure for range queries and updates.",
  category: AlgorithmType.RANGE_QUERY,
  complexity: { time: "O(log n)", space: "O(n)" },
  visualizerType: VisualizerType.BINARY_TREE,
  module: "8. Advanced Techniques",
  order: 33,
  difficulty: "Hard",
  content: "", // Content loaded from external .mdx file
  quiz: segmentTreeQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Range Sum Query - Mutable",
      url: "https://leetcode.com/problems/range-sum-query-mutable/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Segment Tree",
      url: "https://www.geeksforgeeks.org/segment-tree-data-structure/",
      difficulty: "Hard",
    },
    {
      title: "LeetCode: Count of Smaller Numbers After Self",
      url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
      difficulty: "Hard",
    },
    {
      title: "LeetCode: Range Sum Query 2D - Mutable",
      url: "https://leetcode.com/problems/range-sum-query-2d-mutable/",
      difficulty: "Hard",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=2bSS8rtFym4", // Segment Tree
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Segment Tree Hindi
  }
}
