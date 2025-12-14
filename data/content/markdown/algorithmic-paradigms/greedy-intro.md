# Greedy Algorithms

Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum. They work when the problem has the **greedy choice property**.

## Key Properties

### Greedy Choice Property
A globally optimal solution can be arrived at by making locally optimal choices.

### Optimal Substructure
An optimal solution contains optimal solutions to subproblems.

## When Greedy Works

- Making the best choice now leads to the best overall solution
- No need to reconsider previous choices
- Examples: Huffman coding, Kruskal's MST, Activity selection

## When Greedy Fails

- Coin change (usually)
- Knapsack problem
- Shortest path with negative weights

## Classic Problems

### Activity Selection
Select maximum number of non-overlapping activities.

```python
def activity_selection(activities):
    # activities: list of (start, end)
    # Sort by end time
    activities.sort(key=lambda x: x[1])
    
    selected = [activities[0]]
    last_end = activities[0][1]
    
    for start, end in activities[1:]:
        if start >= last_end:
            selected.append((start, end))
            last_end = end
    
    return selected
```

### Fractional Knapsack
Take fractions of items to maximize value.

```python
def fractional_knapsack(items, capacity):
    # items: list of (value, weight)
    # Sort by value/weight ratio
    items.sort(key=lambda x: x[0]/x[1], reverse=True)
    
    total_value = 0
    for value, weight in items:
        if capacity >= weight:
            total_value += value
            capacity -= weight
        else:
            total_value += (capacity / weight) * value
            break
    
    return total_value
```

### Coin Change (Greedy - for specific denominations)
```python
def coin_change_greedy(coins, amount):
    coins.sort(reverse=True)
    count = 0
    
    for coin in coins:
        if amount >= coin:
            count += amount // coin
            amount %= coin
    
    return count if amount == 0 else -1
```

## Greedy vs DP

| Greedy | Dynamic Programming |
|--------|---------------------|
| Makes one choice | Considers all choices |
| Faster | Slower but accurate |
| May not be optimal | Always optimal |
