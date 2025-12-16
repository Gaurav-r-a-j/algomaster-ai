# Algorithms & Pseudocode

An **algorithm** is a step-by-step procedure for solving a problem. **Pseudocode** is a way to describe algorithms using plain language mixed with programming-like structure.

## What is an Algorithm?

Think of a **recipe** for cooking:
- Clear steps in order
- Specific ingredients (inputs)
- End result (output)
- Anyone can follow it

---

## Characteristics of Good Algorithms

| Property | Description | Example |
|----------|-------------|---------|
| **Finite** | Must terminate | Not infinite loop |
| **Definite** | Each step is clear | No ambiguity |
| **Input** | Takes 0+ inputs | Numbers, text, etc. |
| **Output** | Produces result | Answer, modified data |
| **Effective** | Steps are doable | Basic operations only |

---

## Algorithm Design Process

```
1. Understand the Problem
       ↓
2. Identify Input & Output
       ↓
3. Break into Steps
       ↓
4. Write Pseudocode
       ↓
5. Trace with Examples
       ↓
6. Convert to Code
       ↓
7. Test & Debug
```

---

## Pseudocode Basics

### Keywords

| Keyword | Purpose | Example |
|---------|---------|---------|
| `START/END` | Program boundaries | `START` ... `END` |
| `INPUT/READ` | Get user data | `INPUT name` |
| `OUTPUT/PRINT` | Display result | `PRINT result` |
| `SET/DECLARE` | Create variable | `SET count = 0` |
| `IF/THEN/ELSE` | Decision | `IF x > 0 THEN` |
| `WHILE/DO` | Loop with condition | `WHILE count < 10` |
| `FOR/TO` | Counted loop | `FOR i = 1 TO n` |
| `FUNCTION` | Reusable block | `FUNCTION add(a, b)` |
| `RETURN` | Output from function | `RETURN sum` |

---

## Example 1: Add Two Numbers

### Pseudocode

```text
START
    DECLARE num1, num2, sum
    
    INPUT num1
    INPUT num2
    
    SET sum = num1 + num2
    
    PRINT "Sum is: " + sum
END
```

### Python

```python
num1 = int(input("Enter first number: "))
num2 = int(input("Enter second number: "))

sum = num1 + num2

print(f"Sum is: {sum}")
```

---

## Example 2: Find Maximum of Two Numbers

### Pseudocode

```text
START
    INPUT a, b
    
    IF a > b THEN
        PRINT a + " is larger"
    ELSE IF b > a THEN
        PRINT b + " is larger"
    ELSE
        PRINT "Both are equal"
    ENDIF
END
```

### Python

```python
a = int(input("Enter a: "))
b = int(input("Enter b: "))

if a > b:
    print(f"{a} is larger")
elif b > a:
    print(f"{b} is larger")
else:
    print("Both are equal")
```

---

## Example 3: Calculate Factorial

### Problem

Factorial of n: `n! = n × (n-1) × (n-2) × ... × 1`

### Pseudocode

```text
FUNCTION factorial(n)
    IF n <= 1 THEN
        RETURN 1
    ELSE
        RETURN n × factorial(n - 1)
    ENDIF
END FUNCTION

START
    INPUT n
    SET result = factorial(n)
    PRINT n + "! = " + result
END
```

### Python (Iterative)

```python
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

n = int(input("Enter n: "))
print(f"{n}! = {factorial(n)}")
```

### Python (Recursive)

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120
```

---

## Example 4: Linear Search

### Problem

Find if a target exists in an array.

### Pseudocode

```text
FUNCTION linearSearch(array, target)
    FOR i = 0 TO length(array) - 1 DO
        IF array[i] == target THEN
            RETURN i
        ENDIF
    ENDFOR
    RETURN -1  // Not found
END FUNCTION
```

### Python

```python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

arr = [5, 2, 8, 1, 9]
print(linear_search(arr, 8))  # 2
print(linear_search(arr, 7))  # -1
```

---

## Example 5: Binary Search

### Problem

Find target in a **sorted** array efficiently.

### Pseudocode

```text
FUNCTION binarySearch(array, target)
    SET left = 0
    SET right = length(array) - 1
    
    WHILE left <= right DO
        SET mid = (left + right) / 2
        
        IF array[mid] == target THEN
            RETURN mid
        ELSE IF array[mid] < target THEN
            SET left = mid + 1
        ELSE
            SET right = mid - 1
        ENDIF
    ENDWHILE
    
    RETURN -1  // Not found
END FUNCTION
```

### Python

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 10))  # -1
```

---

## Example 6: Bubble Sort

### Problem

Sort an array in ascending order.

### Pseudocode

```text
FUNCTION bubbleSort(array)
    SET n = length(array)
    
    FOR i = 0 TO n - 1 DO
        FOR j = 0 TO n - i - 2 DO
            IF array[j] > array[j + 1] THEN
                // Swap elements
                SET temp = array[j]
                SET array[j] = array[j + 1]
                SET array[j + 1] = temp
            ENDIF
        ENDFOR
    ENDFOR
    
    RETURN array
END FUNCTION
```

### Python

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
# [11, 12, 22, 25, 34, 64, 90]
```

---

## Algorithm Complexity Comparison

| Algorithm | Time (Best) | Time (Worst) | Space |
|-----------|-------------|--------------|-------|
| Linear Search | O(1) | O(n) | O(1) |
| Binary Search | O(1) | O(log n) | O(1) |
| Bubble Sort | O(n) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n²) | O(log n) |

---

## Pseudocode vs Real Code

| Pseudocode | Python | JavaScript | Java |
|------------|--------|------------|------|
| `IF x > 0 THEN` | `if x > 0:` | `if (x > 0) {` | `if (x > 0) {` |
| `ENDIF` | (indentation) | `}` | `}` |
| `FOR i = 0 TO n` | `for i in range(n):` | `for (let i=0; i<n; i++)` | `for (int i=0; i<n; i++)` |
| `WHILE x > 0` | `while x > 0:` | `while (x > 0) {` | `while (x > 0) {` |
| `PRINT x` | `print(x)` | `console.log(x)` | `System.out.println(x)` |

---

## Common Algorithm Patterns

### Pattern 1: Counting

```text
SET count = 0
FOR each element in collection DO
    IF element matches condition THEN
        count = count + 1
    ENDIF
ENDFOR
RETURN count
```

### Pattern 2: Accumulator

```text
SET total = 0
FOR each element in collection DO
    total = total + element
ENDFOR
RETURN total
```

### Pattern 3: Finding

```text
FOR each element in collection DO
    IF element matches condition THEN
        RETURN element
    ENDIF
ENDFOR
RETURN null  // Not found
```

### Pattern 4: Transform (Map)

```text
SET result = empty collection
FOR each element in collection DO
    SET transformed = transform(element)
    ADD transformed TO result
ENDFOR
RETURN result
```

---

## Key Takeaways

1. **Algorithms** = Step-by-step problem solutions
2. **Pseudocode** = Language-agnostic algorithm description
3. **5 properties**: Finite, Definite, Input, Output, Effective
4. Use **standard keywords**: IF, FOR, WHILE, FUNCTION
5. **Trace** your algorithm with examples before coding
6. Practice converting **pseudocode ↔ code**
