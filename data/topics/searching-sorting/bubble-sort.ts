import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum";

export const bubbleSort: Topic = {
  id: "bubble-sort",
  title: "Bubble Sort",
  description: "Simple sorting algorithm that repeatedly steps through the list.",
  category: AlgorithmType.SORTING,
  complexity: { time: "O(n²)", space: "O(1)" },
  visualizerType: VisualizerType.BAR_CHART,
  module: "3. Searching & Sorting",
  order: 11,
  difficulty: "Easy",
  content: `# Bubble Sort

Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.

## How It Works

1. Compare adjacent elements
2. Swap if they are in wrong order
3. Repeat for all pairs
4. After each pass, the largest element "bubbles" to the end
5. Continue until no swaps are needed

## Implementation

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n):
        swapped = False
        # Last i elements are already in place
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        # If no swaps, array is sorted
        if not swapped:
            break
    
    return arr

# Example
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr)
print(sorted_arr)  # [11, 12, 22, 25, 34, 64, 90]
\`\`\`

## Step-by-Step Example

Initial: [64, 34, 25, 12, 22, 11, 90]

Pass 1: [34, 25, 12, 22, 11, 64, 90] (64 bubbles to end)
Pass 2: [25, 12, 22, 11, 34, 64, 90] (34 bubbles to position)
Pass 3: [12, 22, 11, 25, 34, 64, 90] (25 bubbles to position)
...and so on

## Time Complexity

- **Best Case:** O(n) - Array is already sorted (with optimization)
- **Average Case:** O(n²)
- **Worst Case:** O(n²) - Array is reverse sorted

## Space Complexity

O(1) - Only uses a constant amount of extra space.

## Optimization

The optimized version stops early if no swaps occur in a pass, making best case O(n).

## When to Use

- Educational purposes (easy to understand)
- Small datasets
- When simplicity is more important than speed
- Nearly sorted data (with optimization)

## Advantages

- Simple to understand and implement
- In-place sorting (O(1) space)
- Stable (maintains relative order of equal elements)
- Adaptive (can detect sorted array early)

## Disadvantages

- Very slow for large arrays: O(n²)
- Many comparisons and swaps
- Not practical for real-world applications

## Comparison with Other Sorts

- **vs Selection Sort:** Both O(n²), but Bubble Sort is adaptive
- **vs Insertion Sort:** Insertion Sort is generally faster
- **vs Quick Sort:** Quick Sort is much faster: O(n log n)
`,
  quiz: [
    {
      id: 1,
      question: "What is the worst-case time complexity of Bubble Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
      correctAnswer: 2,
      explanation: "Bubble Sort has O(n²) worst-case time complexity due to nested loops.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Sort an Array",
      url: "https://leetcode.com/problems/sort-an-array/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Bubble Sort",
      url: "https://www.geeksforgeeks.org/bubble-sort/",
      difficulty: "Easy",
    },
    {
      title: "HackerRank: Sorting Tutorial",
      url: "https://www.hackerrank.com/challenges/tutorial-intro/problem",
      difficulty: "Easy",
    },
  ],
};
