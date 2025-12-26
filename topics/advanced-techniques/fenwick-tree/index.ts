import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { fenwickTreeQuiz } from "@/topics/advanced-techniques/fenwick-tree/quiz"

export const fenwickTree: Topic = {
  id: "fenwick-tree",
  title: "Fenwick Tree",
  description: "Binary Indexed Tree for efficient prefix sum queries.",
  category: AlgorithmType.RANGE_QUERY,
  complexity: { time: "O(log n)", space: "O(n)" },
  visualizerType: VisualizerType.BINARY_TREE,
  module: "8. Advanced Techniques",
  order: 34,
  difficulty: "Hard",
  content: "", // Content loaded from external .mdx file
  quiz: fenwickTreeQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Range Sum Query - Mutable",
      url: "https://leetcode.com/problems/range-sum-query-mutable/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Binary Indexed Tree",
      url: "https://www.geeksforgeeks.org/binary-indexed-tree-or-fenwick-tree-2/",
      difficulty: "Hard",
    },
    {
      title: "LeetCode: Count of Smaller Numbers After Self",
      url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
      difficulty: "Hard",
    },
    {
      title: "LeetCode: Reverse Pairs",
      url: "https://leetcode.com/problems/reverse-pairs/",
      difficulty: "Hard",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=kPaJfAUwViY", // Fenwick Tree
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Fenwick Tree Hindi
  }
}
