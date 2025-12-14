import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum";

export const recursion: Topic = {
  id: "recursion",
  title: "Recursion",
  description: "Functions that call themselves to solve problems.",
  category: AlgorithmType.BASICS,
  complexity: { time: "O(2^n)", space: "O(n)" },
  visualizerType: VisualizerType.NONE,
  module: "1. Foundations",
  order: 2,
  difficulty: "Medium",
  content: `# Recursion

Recursion is a technique where a function calls itself to solve a problem.

## Key Concepts

- Base case: The stopping condition
- Recursive case: The function calls itself
- Call stack: How recursive calls are managed

## Example: Factorial

\`\`\`python
def factorial(n):
    if n <= 1:  # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case
\`\`\`
`,
  quiz: [
    {
      id: 1,
      question: "What is the base case in recursion?",
      options: [
        "The recursive call",
        "The stopping condition",
        "The function definition",
        "The return statement",
      ],
      correctAnswer: 1,
      explanation:
        "The base case is the condition that stops the recursion.",
    },
  ],
};

