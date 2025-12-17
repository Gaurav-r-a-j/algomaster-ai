import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { quickSortQuiz } from "@/topics/searching-sorting/quick-sort/quiz"

export const quickSort: Topic = {
  id: "quick-sort",
  title: "Quick Sort",
  description:
    "Efficient divide-and-conquer algorithm, often faster than Merge Sort in practice.",
  category: AlgorithmType.SORTING,
  complexity: { time: "O(n log n)", space: "O(log n)" },
  visualizerType: VisualizerType.BAR_CHART,
  module: "3. Searching & Sorting",
  order: 15,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  quiz: quickSortQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Sort an Array",
      url: "https://leetcode.com/problems/sort-an-array/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Quick Sort",
      url: "https://www.geeksforgeeks.org/quick-sort/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Kth Largest Element",
      url: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Sort Colors",
      url: "https://leetcode.com/problems/sort-colors/",
      difficulty: "Medium",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=Hoixgm4-P4M", // Quick Sort
    hi: "https://www.youtube.com/watch?v=PgBzjlCcFvc" // Quick Sort Hindi
  }
}
