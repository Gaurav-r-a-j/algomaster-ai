# Merge Sort

Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts them, and then merges them back together.

## How It Works

1. **Divide:** Split the array into two halves
2. **Conquer:** Recursively sort both halves
3. **Combine:** Merge the two sorted halves

## Implementation

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    # Divide
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    # Conquer and Combine
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    # Merge two sorted arrays
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Add remaining elements
    result.extend(left[i:])
    result.extend(right[j:])

    return result

# Example
arr = [38, 27, 43, 3, 9, 82, 10]
sorted_arr = merge_sort(arr)
print(sorted_arr)  # [3, 9, 10, 27, 38, 43, 82]
```

## Time Complexity

- **Best Case:** O(n log n)
- **Average Case:** O(n log n)
- **Worst Case:** O(n log n)

**Consistent performance** - always O(n log n) regardless of input.

## Space Complexity

O(n) - Requires additional space for the temporary arrays during merging.

## Characteristics

- **Stable:** Maintains relative order of equal elements
- **Not In-place:** Requires O(n) extra space
- **Predictable:** Always O(n log n) performance
- **Divide and Conquer:** Recursive approach

## When to Use

- When stable sorting is required
- When consistent O(n log n) performance is needed
- Sorting linked lists (efficient for linked lists)
- External sorting (can sort data too large for memory)

## Advantages

- Guaranteed O(n log n) performance
- Stable sorting
- Good for large datasets
- Parallelizable
- Works well with linked lists

## Disadvantages

- Requires O(n) extra space
- Not in-place
- Slower than Quick Sort in practice (more memory operations)

## Comparison with Quick Sort

- **Merge Sort:** Stable, predictable, O(n) space
- **Quick Sort:** Unstable, faster average case, O(log n) space

## Real-World Use

- Used in many standard library implementations
- External sorting (sorting large files)
- Stable sorting requirements
