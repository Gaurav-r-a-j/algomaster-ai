# Selection Sort

Selection Sort works by repeatedly finding the minimum element from the unsorted portion and placing it at the beginning.

## How It Works

1. Find the minimum element in the unsorted array
2. Swap it with the first unsorted element
3. Move the boundary of sorted/unsorted array one position right
4. Repeat until the entire array is sorted

## Implementation

```python
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
```

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
