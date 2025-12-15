# Depth-First Search (DFS)

DFS explores as far as possible along each branch before backtracking. It uses recursion or a **stack** data structure.

## How It Works

1. Start from source vertex, mark as visited
2. For each unvisited neighbor:
   - Recursively visit that neighbor
3. Backtrack when no unvisited neighbors

## Recursive Implementation

```python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()

    visited.add(start)
    result = [start]

    for neighbor in graph[start]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))

    return result
```

## Iterative Implementation (Stack)

```python
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    result = []

    while stack:
        vertex = stack.pop()

        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)

            # Add neighbors in reverse for correct order
            for neighbor in reversed(graph[vertex]):
                if neighbor not in visited:
                    stack.append(neighbor)

    return result
```

## Detecting Cycles

```python
def has_cycle(graph):
    visited = set()
    rec_stack = set()

    def dfs(node):
        visited.add(node)
        rec_stack.add(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True

        rec_stack.remove(node)
        return False

    for node in graph:
        if node not in visited:
            if dfs(node):
                return True
    return False
```

## Path Finding

```python
def find_path(graph, start, end, path=None):
    if path is None:
        path = []

    path = path + [start]

    if start == end:
        return path

    for neighbor in graph[start]:
        if neighbor not in path:
            new_path = find_path(graph, neighbor, end, path)
            if new_path:
                return new_path

    return None
```

## Time & Space Complexity

- **Time:** O(V + E)
- **Space:** O(V) for recursion stack

## Applications

- Cycle detection
- Topological sorting
- Finding connected components
- Maze solving
- Path finding
