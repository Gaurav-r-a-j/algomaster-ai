# Loops

Loops allow you to execute a block of code repeatedly, making them essential for processing collections of data and implementing algorithms.

## The Robot Analogy

Imagine you are a robot tasked with washing dishes.

- **For Loop**: You are told, "Wash these 10 plates." You know exactly how many loops to perform.
- **While Loop**: You are told, "Wash plates until the sink is empty." You keep going as long as the condition (sink has plates) is true.

## Real World Application

- **Video Games**: The "Game Loop" runs continuously, processing input, updating physics, and rendering graphics 60 times a second.
- **Data Processing**: A bank's system loops through thousands of transactions to calculate your monthly balance.
- **Music Players**: A "Repeat One" button is literally a loop playing the same song!

## Types of Loops

### For Loop

Used when you know the number of iterations or need to iterate over a collection.

```python
# Iterate a fixed number of times
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Iterate over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Iterate with index
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
```

### While Loop

Used when the number of iterations is unknown and depends on a condition.

```python
count = 0
while count < 5:
    print(count)
    count += 1

# Reading input until condition met
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input == 'quit':
        break
```

## Loop Control Statements

### Break

Exits the loop immediately.

```python
for i in range(10):
    if i == 5:
        break  # Exits when i is 5
    print(i)
```

### Continue

Skips the current iteration and continues to the next.

```python
for i in range(10):
    if i % 2 == 0:
        continue  # Skip even numbers
    print(i)  # Only prints odd numbers
```

## Common Patterns

### 1. Iterating Through Arrays

```python
arr = [1, 2, 3, 4, 5]
for num in arr:
    print(num * 2)
```

### 2. Nested Loops

```python
# 2D array traversal
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
for row in matrix:
    for element in row:
        print(element)
```

### 3. Two Pointers

```python
# Find pairs in sorted array
arr = [1, 2, 3, 4, 5]
left, right = 0, len(arr) - 1
while left < right:
    sum = arr[left] + arr[right]
    if sum == target:
        print(f"Found: {arr[left]}, {arr[right]}")
        break
    elif sum < target:
        left += 1
    else:
        right -= 1
```

## Time Complexity

- Single loop: O(n)
- Nested loops: O(n²) or O(n × m)
- Loop with break: O(n) worst case, but can be better

## Best Practices

1. Use for loops when iterating over known collections
2. Use while loops for condition-based iteration
3. Avoid infinite loops - always have an exit condition
4. Use break/continue judiciously for clarity
