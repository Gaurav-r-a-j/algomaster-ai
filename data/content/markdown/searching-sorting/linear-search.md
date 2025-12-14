# Linear Search

Linear Search is the simplest search algorithm. It checks each element in the array sequentially until it finds the target or reaches the end.

## How It Works

1. Start from the first element
2. Compare each element with the target
3. If found, return the index
4. If not found after checking all elements, return -1

## Implementation

```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1  # Not found

# Example
arr = [3, 1, 4, 1, 5, 9, 2, 6]
index = linear_search(arr, 5)  # Returns 4
```

## Time Complexity

- **Best Case:** O(1) - Target is at the first position
- **Average Case:** O(n) - Target is in the middle
- **Worst Case:** O(n) - Target is at the end or not present

## Space Complexity

O(1) - Only uses a constant amount of extra space.

## When to Use

- Small arrays
- Unsorted data
- When simplicity is more important than speed
- When you need to find all occurrences

## Advantages

- Simple to understand and implement
- Works on unsorted arrays
- No preprocessing required

## Disadvantages

- Slow for large arrays
- Inefficient compared to binary search for sorted data

## Variations

### Find All Occurrences
```python
def linear_search_all(arr, target):
    indices = []
    for i in range(len(arr)):
        if arr[i] == target:
            indices.append(i)
    return indices
```

### Search in 2D Array
```python
def linear_search_2d(matrix, target):
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] == target:
                return (i, j)
    return (-1, -1)
```
