# Topological Sort

Topological sorting arranges vertices of a Directed Acyclic Graph (DAG) in a linear order such that for every edge (u, v), u comes before v.

## Use Cases

- Build systems (compile order)
- Course scheduling with prerequisites
- Task scheduling
- Package dependency resolution

## Kahn's Algorithm (BFS)

Uses in-degree (number of incoming edges) to determine order.

```python
from collections import deque

def topological_sort_kahn(graph, n):
    # Calculate in-degrees
    in_degree = [0] * n
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1

    # Start with vertices having no dependencies
    queue = deque([i for i in range(n) if in_degree[i] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph.get(node, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # Check for cycle
    if len(result) != n:
        return []  # Graph has a cycle

    return result
```

## DFS-Based Approach

Uses finish times - nodes that finish first go last in order.

```python
def topological_sort_dfs(graph, n):
    visited = set()
    stack = []

    def dfs(node):
        visited.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor)
        stack.append(node)

    for i in range(n):
        if i not in visited:
            dfs(i)

    return stack[::-1]  # Reverse the stack
```

## Detecting Cycles

If topological sort doesn't include all vertices, the graph has a cycle.

```python
def has_cycle(graph, n):
    result = topological_sort_kahn(graph, n)
    return len(result) != n
```

## Time & Space Complexity

- **Time:** O(V + E)
- **Space:** O(V)

## Example

```
Courses: 0, 1, 2, 3
Prerequisites:
  0 -> 1 (take 0 before 1)
  0 -> 2
  1 -> 3
  2 -> 3

Valid orderings: [0, 1, 2, 3] or [0, 2, 1, 3]
```
