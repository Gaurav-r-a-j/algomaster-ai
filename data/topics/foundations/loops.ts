import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum";

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
  content: `# Loops

Loops allow you to execute a block of code repeatedly.

## Types of Loops

### For Loop
Used when you know the number of iterations.

\`\`\`python
for i in range(5):
    print(i)
\`\`\`

### While Loop
Used when the number of iterations is unknown.

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## Common Patterns

- Iterating through arrays
- Nested loops for 2D structures
- Loop control with break/continue
`,
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
};

