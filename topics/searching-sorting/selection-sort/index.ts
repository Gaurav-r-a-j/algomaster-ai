import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { selectionSortQuiz } from "@/topics/searching-sorting/selection-sort/quiz"

export const selectionSort: Topic = {
  id: "selection-sort",
  title: "Selection Sort",
  description:
    "Simple sorting algorithm that finds the minimum element and places it at the beginning.",
  category: AlgorithmType.SORTING,
  complexity: { time: "O(n²)", space: "O(1)" },
  visualizerType: VisualizerType.BAR_CHART,
  module: "3. Searching & Sorting",
  order: 12,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  quiz: selectionSortQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Sort an Array",
      url: "https://leetcode.com/problems/sort-an-array/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Selection Sort",
      url: "https://www.geeksforgeeks.org/selection-sort/",
      difficulty: "Easy",
    },
  ],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=g-PGLbMth_g", // Selection Sort
    hi: "https://www.youtube.com/watch?v=xWBP4lzkoyM" // Selection Sort Hindi
  }
}
