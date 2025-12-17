import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { dpIntroQuiz } from "@/topics/algorithmic-paradigms/dp-intro/quiz"

export const dpIntro: Topic = {
  id: "dp-intro",
  title: "Dynamic Programming",
  description:
    "Solving complex problems by breaking them into simpler subproblems.",
  category: AlgorithmType.DP,
  complexity: { time: "O(n²)", space: "O(n)" },
  visualizerType: VisualizerType.DP,
  module: "7. Algorithmic Paradigms",
  order: 29,
  difficulty: "Medium",
  content: "", // Content loaded from external .mdx file
  quiz: dpIntroQuiz,
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=oBt53YbR9Kk", // Dynamic Programming
    hi: "https://www.youtube.com/watch?v=nqowUJzG-iM" // DP Hindi
  }
}
