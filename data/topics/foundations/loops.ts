import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const loops: Topic = {
  id: "loops",
  title: "Loops",
  description: "Iterating through data and repeating actions efficiently.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(n)", space: "O(1)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 1,
  difficulty: "Easy",
  content: "", // Content loaded from data/content/markdown/foundations/loops.md
  quiz: [
    {
      id: 1,
      question: "When should you use a for loop?",
      options: [
        "When the number of iterations is unknown",
        "When you know the number of iterations",
        "Only for arrays",
        "Never",
      ],
      correctAnswer: 1,
      explanation:
        "For loops are ideal when you know how many times you want to iterate.",
    },
  ],
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
