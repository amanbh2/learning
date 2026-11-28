# Data Structures & Algorithms — Table of Contents & Notes

> **Purpose:** Practical, end-to-end Data Structures & Algorithms (DSA) curriculum tailored for a **C/C++ systems & 5G RAN engineer** preparing for high-bar product/systems engineering interviews.
> **Scope:** Emphasizes cache locality, contiguous vs pointer-based memory overhead, deterministic real-time latency, pointer arithmetic, and internal mechanics of standard C++ containers.

---

## Phase 1 — Complexity, Memory Hierarchy & Contiguous Sequences

> *"Understanding hardware cache lines, amortized analysis, and contiguous array mechanics before touching high-level structures."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 01 | [Asymptotic Complexity, Cache Locality & std::vector Internals](./01-asymptotic-complexity-and-vector-internals.md) | Very High | Big-O/Ω/Θ, 64-byte L1/L2/L3 cache lines, 3-pointer vector layout, 2x geometric growth proof, iterator invalidation |
| 02 | [Pointer Arithmetic, Two Pointers & Sliding Window Patterns](./02-two-pointers-and-sliding-window.md) | Very High | Memory stride, opposite-ends convergence, variable vs fixed window, fast/slow cycle detection |
| 03 | [Circular Ring Buffers & std::deque Chunked Paged Array Internals](./03-ring-buffers-and-deque-internals.md) | Very High | Power-of-2 modulo bitmasking, map of buffer blocks, FIFO zero-copy RAN queues, lock-free SPSC basics |

---

## Phase 2 — Node-Based Chains, Fast Lookups & Bitwise State

> *"Pointer manipulation, hashing trade-offs, and bitwise state tracking used in embedded telecom runtimes."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 04 | [Linked Lists, Sentinel Nodes & Pointer Manipulation Patterns](./04-linked-lists-and-pointer-patterns.md) | High | Pointer-to-pointer (`Node**`), dummy head/tail sentinels, in-place reversal, cache miss penalty vs vector |
| 05 | [Monotonic Stacks, Queues & Next Greater Element Patterns](./05-monotonic-stacks-and-queues.md) | Very High | LIFO stack frames, monotonic invariant maintenance, Next Greater Element, sliding window maximum |
| 06 | [Hash Tables: std::unordered_map Buckets, Chaining vs Robin Hood & Bit Manipulation](./06-hash-tables-and-bit-manipulation.md) | Very High | Bucket arrays, linked list chaining, load factor & rehashing, bitmasks, XOR swaps, Brian Kernighan |

---

## Phase 3 — Hierarchical Structures, Balanced Trees & Heaps

> *"Non-linear hierarchies, logarithmic invariants, and priority-driven event scheduling."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 07 | [Binary Trees, Traversals & Recursion to Iterative Stack Mechanics](./07-binary-trees-and-traversals.md) | High | Pre/In/Post/Level-order, Morris traversal, call stack limits, tree diameter, lowest common ancestor |
| 08 | [Binary Search Trees, AVL vs Red-Black Trees (std::map) & Order Statistics](./08-bst-and-balanced-trees.md) | High | BST search/insert invariants, tree rotations, Red-Black color rules, `std::map` node allocation cost |
| 09 | [Binary Heaps, std::priority_queue & Event-Driven Real-Time Timers](./09-binary-heaps-and-priority-queues.md) | Very High | Implicit array representation, sift-up/sift-down, O(N) Floyd build-heap, telecom timer wheels vs min-heaps |

---

## Phase 4 — Graphs, Topological Ordering & Network Routing

> *"Modeling interconnected networks, dependency graphs, and optimal packet routing."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 10 | [Graph Representations: Adjacency List vs CSR & BFS/DFS State Machines](./10-graph-representations-and-traversals.md) | Very High | Adjacency list vs matrix vs Compressed Sparse Row (CSR), BFS shortest unweighted path, cycle detection |
| 11 | [Topological Sort, DAG Dependency Resolution & Cycle Detection](./11-topological-sort-and-dags.md) | High | Kahn's algorithm (in-degree queue), DFS postorder reverse, task scheduling, module dependency trees |
| 12 | [Shortest Paths: Dijkstra, Bellman-Ford & Telecom Link Weight Optimization](./12-shortest-paths-dijkstra-bellman-ford.md) | Very High | Greedy relaxation, min-heap Dijkstra, negative edge weights, Bellman-Ford, network routing protocols |
| 13 | [Disjoint Set Union (Union-Find) & Kruskal's MST](./13-disjoint-set-union-and-mst.md) | High | Path compression, union by rank/size, inverse Ackermann α(N), Kruskal's minimum spanning tree |

---

## Phase 5 — Advanced Search, Tries & Dynamic Programming Patterns

> *"Optimal subproblems, prefix lookups, and monotonic answer spaces for high-throughput decision systems."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 14 | [Prefix Tries, Radix Trees & Telecom Longest Prefix Match (LPM)](./14-tries-and-longest-prefix-match.md) | High | 26-ary/256-ary pointer arrays, prefix search, IP routing LPM, Radix tree memory compression |
| 15 | [Binary Search on Ranges & Monotonic Answer Spaces](./15-binary-search-patterns.md) | Very High | `std::lower_bound`/`upper_bound`, predicate-based binary search, capacity/rate allocation optimization |
| 16 | [Dynamic Programming: 1D/2D State Transitions, Knapsack & Interval Scheduling](./16-dynamic-programming-patterns.md) | Very High | Memoization vs tabulation, space optimization, 0/1 Knapsack, Longest Common Subsequence, interval scheduling |

---
*Last updated: 2026-11-24*
