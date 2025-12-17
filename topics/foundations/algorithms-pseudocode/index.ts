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
  practiceLinks: [],
  youtubeLink: {
    en: "https://www.youtube.com/watch?v=6h2b-O0DMCo", // Algorithms & Pseudocode
    hi: "https://www.youtube.com/watch?v=wn49b9Y0FYM" // Pseudocode Hindi
  }
}
