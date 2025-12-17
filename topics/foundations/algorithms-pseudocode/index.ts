import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"
import { algorithmsPseudocodeQuiz } from "@/topics/foundations/algorithms-pseudocode/quiz"

export const algorithmsPseudocode: Topic = {
  id: "algorithms-pseudocode",
  title: "Algorithms & Pseudocode",
  description: "Writing logic without syntax constraints using pseudocode.",
  category: AlgorithmType.BASICS,
  complexity: { time: "N/A", space: "N/A" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 2,
  difficulty: "Easy",
  content: "", // Content loaded dynamically
  quiz: algorithmsPseudocodeQuiz,
  practiceLinks: []
}
