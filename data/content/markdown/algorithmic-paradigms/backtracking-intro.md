# Backtracking

Backtracking is a recursive algorithm technique that tries to build a solution incrementally, abandoning paths that don't lead to a valid solution.

## How It Works

1. **Choose:** Make a choice
2. **Explore:** Recursively explore further
3. **Unchoose:** If it doesn't work, undo the choice and try another

## Template

```python
def backtrack(state):
    if is_solution(state):
        process_solution(state)
        return
    
    for choice in get_choices(state):
        if is_valid(choice):
            make_choice(choice)
            backtrack(state)
            undo_choice(choice)  # Backtrack
```

## Classic Problems

### N-Queens
Place N queens on NxN board so no two threaten each other.

```python
def solve_n_queens(n):
    result = []
    
    def backtrack(row, cols, diag1, diag2, board):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        
        for col in range(n):
            d1, d2 = row - col, row + col
            if col in cols or d1 in diag1 or d2 in diag2:
                continue
            
            board[row][col] = 'Q'
            cols.add(col)
            diag1.add(d1)
            diag2.add(d2)
            
            backtrack(row + 1, cols, diag1, diag2, board)
            
            board[row][col] = '.'
            cols.remove(col)
            diag1.remove(d1)
            diag2.remove(d2)
    
    board = [['.' for _ in range(n)] for _ in range(n)]
    backtrack(0, set(), set(), set(), board)
    return result
```

### Subsets
Generate all subsets of a set.

```python
def subsets(nums):
    result = []
    
    def backtrack(start, path):
        result.append(path[:])
        
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    
    backtrack(0, [])
    return result
```

### Permutations

```python
def permutations(nums):
    result = []
    
    def backtrack(path, used):
        if len(path) == len(nums):
            result.append(path[:])
            return
        
        for i in range(len(nums)):
            if used[i]:
                continue
            
            path.append(nums[i])
            used[i] = True
            backtrack(path, used)
            path.pop()
            used[i] = False
    
    backtrack([], [False] * len(nums))
    return result
```

## Time Complexity

Usually exponential: O(k^n) or O(n!)
