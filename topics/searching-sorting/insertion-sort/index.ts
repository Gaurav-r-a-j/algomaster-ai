import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { insertionSortQuiz } from "@/topics/searching-sorting/insertion-sort/quiz"

export const insertionSort: Topic = {
  id: "insertion-sort",
  title: "Insertion Sort",
  description:
    "Efficient algorithm for small datasets, works like sorting playing cards in your hands.",
  category: AlgorithmType.SORTING,
  complexity: { time: "O(n²)", space: "O(1)" },
  visualizerType: VisualizerType.BAR_CHART,
  module: "3. Searching & Sorting",
  order: 13,
  difficulty: "Easy",
  content: "", // Content loaded from external .md file
  quiz: insertionSortQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Sort an Array",
      url: "https://leetcode.com/problems/sort-an-array/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Insertion Sort",
      url: "https://www.geeksforgeeks.org/insertion-sort/",
      difficulty: "Easy",
    },
    {
      title: "HackerRank: Insertion Sort",
      url: "https://www.hackerrank.com/challenges/insertionsort1/problem",
      difficulty: "Easy",
    },
  ],
}
