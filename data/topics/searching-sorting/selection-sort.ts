import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

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
  content: `# Selection Sort

Selection Sort works by repeatedly finding the minimum element from the unsorted portion and placing it at the beginning.

## How It Works

1. Find the minimum element in the unsorted array
2. Swap it with the first unsorted element
3. Move the boundary of sorted/unsorted array one position right
4. Repeat until the entire array is sorted

## Implementation

\`\`\`python
def selection_sort(arr):
    n = len(arr)
    
    for i in range(n):
        # Find minimum element in remaining unsorted array
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        
        # Swap the found minimum with the first element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    
    return arr

# Example
arr = [64, 25, 12, 22, 11]
sorted_arr = selection_sort(arr)
print(sorted_arr)  # [11, 12, 22, 25, 64]
\`\`\`

## Time Complexity

- **Best Case:** O(n²) - Still needs to check all elements
- **Average Case:** O(n²)
- **Worst Case:** O(n²)

## Space Complexity

O(1) - In-place sorting algorithm.

## Characteristics

- **Not Stable:** May change relative order of equal elements
- **Not Adaptive:** Performance doesn't improve on nearly sorted data
- **In-place:** Only uses O(1) extra space

## When to Use

- Small arrays
- When memory writes are expensive (minimal swaps)
- Educational purposes

## Advantages

- Simple to understand
- In-place sorting
- Minimal memory writes (O(n) swaps)

## Disadvantages

- Slow: O(n²) time complexity
- Not stable
- Not adaptive
- Many comparisons required
`,
  quiz: [
    {
      id: 1,
      question: "How many swaps does Selection Sort perform?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
      correctAnswer: 0,
      explanation: "Selection Sort performs exactly n-1 swaps, making it O(n).",
    },
  ],
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
}
