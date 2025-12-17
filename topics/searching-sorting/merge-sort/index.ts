import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { mergeSortQuiz } from "@/topics/searching-sorting/merge-sort/quiz"

export const mergeSort: Topic = {
  id: "merge-sort",
  title: "Merge Sort",
  description:
    "Efficient divide-and-conquer sorting algorithm with guaranteed O(n log n) performance.",
  category: AlgorithmType.SORTING,
  complexity: { time: "O(n log n)", space: "O(n)" },
  visualizerType: VisualizerType.BAR_CHART,
  module: "3. Searching & Sorting",
  order: 14,
  difficulty: "Medium",
  content: "", // Content loaded from external .md file
  quiz: mergeSortQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Sort an Array",
      url: "https://leetcode.com/problems/sort-an-array/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Merge Sorted Array",
      url: "https://leetcode.com/problems/merge-sorted-array/",
      difficulty: "Easy",
    },
    {
      title: "GeeksforGeeks: Merge Sort",
      url: "https://www.geeksforgeeks.org/merge-sort/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Sort List",
      url: "https://leetcode.com/problems/sort-list/",
      difficulty: "Medium",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=4VqmGXwpLqc", // Merge Sort
    hi: "https://www.youtube.com/watch?v=jlHkDBEumP0" // Merge Sort Hindi
  }
}
