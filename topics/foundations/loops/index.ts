import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { loopsQuiz } from "@/topics/foundations/loops/quiz"

export const loops: Topic = {
  id: "loops",
  title: "Loops",
  description: "Iterating through data and repeating actions efficiently.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(n)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 4,
  difficulty: "Easy",
  content: "", // Content loaded from data/content/markdown/foundations/loops.md
  quiz: loopsQuiz,
  practiceLinks: [
    {
      title: "LeetCode: Fizz Buzz",
      url: "https://leetcode.com/problems/fizz-buzz/",
      difficulty: "Easy",
    },
    {
      title: "GeeksforGeeks: Loops in Python",
      url: "https://www.geeksforgeeks.org/loops-in-python/",
      difficulty: "Easy",
    },
    {
      title: "HackerRank: Loops",
      url: "https://www.hackerrank.com/challenges/python-loops/problem",
      difficulty: "Easy",
    },
  ],
}
