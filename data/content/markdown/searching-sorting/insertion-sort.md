# Insertion Sort

Insertion Sort builds the sorted array one element at a time, similar to how you sort playing cards in your hands.

## How It Works

1. Start with the second element (first is already "sorted")
2. Compare with elements in the sorted portion
3. Shift larger elements to the right
4. Insert the current element in its correct position
5. Repeat for all elements

## Implementation

```python
def insertion_sort(arr):
    n = len(arr)

    for i in range(1, n):
        key = arr[i]  # Element to be inserted
        j = i - 1

        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        # Insert key in correct position
        arr[j + 1] = key

    return arr

# Example
arr = [12, 11, 13, 5, 6]
sorted_arr = insertion_sort(arr)
print(sorted_arr)  # [5, 6, 11, 12, 13]
```

## Time Complexity

- **Best Case:** O(n) - Array is already sorted
- **Average Case:** O(n²)
- **Worst Case:** O(n²) - Array is reverse sorted

## Space Complexity

O(1) - In-place sorting algorithm.

## Characteristics

- **Stable:** Maintains relative order of equal elements
- **Adaptive:** Efficient for nearly sorted data
- **In-place:** Only uses O(1) extra space
- **Online:** Can sort as it receives input

## When to Use

- Small datasets (<50 elements)
- Nearly sorted data
- When stability is required
- Hybrid algorithms (used in Timsort)

## Advantages

- Simple implementation
- Efficient for small arrays
- Adaptive (fast on nearly sorted data)
- Stable sorting
- In-place
- Online algorithm

## Disadvantages

- Slow for large arrays: O(n²)
- Many shifts required in worst case

## Real-World Use

- Used in Timsort (Python's default sort)
- Efficient for small subarrays in hybrid sorts
- Good for real-time data where elements arrive one by one
